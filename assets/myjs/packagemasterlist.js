var selectedPackageFromMasterlist;

$(function ()
{

});

function addPackageToMasterlist() 
{
    $('#addpackagemasterlistbutton').prop("disabled",true);
    
    var error = 0;
    
    var addpackageloader = swal
    ({
        title: "Please wait!",
        text: "Processing of data is still ongoing.",
        imageUrl: BASE_URL + "assets/images/loading.gif",
        imageSize: '200x200',
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false
    });

    interval = setInterval(function ()
    {
        if (error !== 0 || $('#addpackagemasterlist').hasClass('hide'))
        {
            addpackageloader.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);
    
    var packageMasterlistDeal = $('#packagemasterlistdeal').val();
    var packageMasterlistCode = $('#packagemasterlistcode').val();
    var packageMasterlistIncharge = $('#packagemasterlistincharge').val();
    var packageMasterlistPrice = $('#packagemasterlistprice').val();
    var packageMasterlistMemo = $('#packagemasterlistmemo').val();
    var packageMasterlistCodeOfMain = $('#packagemasterlistcodeofmain').val();
    var packageMasterlistAccountId = $('#packagemasterlistaccountid').val();
    var packageMasterlistAccountName = $('#packagemasterlistaccountname').val();

    $.ajax
    ({
        type: 'POST',
        data: 
        {
            packageMasterlistDeal: packageMasterlistDeal,
            packageMasterlistCode: packageMasterlistCode,
            packageMasterlistIncharge: packageMasterlistIncharge,
            packageMasterlistPrice: packageMasterlistPrice,
            packageMasterlistMemo: packageMasterlistMemo,
            packageMasterlistCodeOfMain: packageMasterlistCodeOfMain,
            packageMasterlistAccountId: packageMasterlistAccountId,
            packageMasterlistAccountName: packageMasterlistAccountName
        },
        url: BASE_URL + 'PackageMasterlist/AddPackageToMasterlist',
        dataType: 'json'
    })
    .done(function (result) 
    {
        if (result.status == false) 
        {
            $('#addpackagemasterlistbutton').prop("disabled",false);
            
            checkFieldValidations(result.errors.packagemasterlistdeal, 'packagemasterlistdealerror', 'packagemasterlistdeal');
            checkFieldValidations(result.errors.packagemasterlistcode, 'packagemasterlistcodeerror', 'packagemasterlistcode');
            checkFieldValidations(result.errors.packagemasterlistincharge, 'packagemasterlistinchargeerror', 'packagemasterlistincharge');
            checkFieldValidations(result.errors.packagemasterlistprice, 'packagemasterlistpriceerror', 'packagemasterlistprice');
            checkFieldValidations(result.errors.packagemasterlistmemo, 'packagemasterlistmemoerror', 'packagemasterlistmemo');
        
            swal
            ({
                title: "Validation Notice!",
                text: "Some field requires your attention!!",
                type: "warning",
                allowOutsideClick: false
            });
        } 
        else
        {
            $('#addpackagemasterlistbutton').prop("disabled",true);
            hideAddPackageMasterlistForm();

            setTimeout(function ()
            {
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully saved!",
                    type: "success",
                    allowOutsideClick: false,
                    confirmButtonText: "OK"
                },
                function (isConfirm)
                {
                    if (isConfirm)
                    {
                        packagx_table.ajax.reload();
                        $('#package-masterlist-table_filter [type="search"]').val(packageMasterlistCode);
                        $('#package-masterlist-table_filter [type="search"]').focus();
                        packagx_table.search(packageMasterlistCode).draw();

                        $('#addpackagemasterlistbutton').prop("disabled",false);
                        clearAllPackageFormFields();
                    }
                });
            }, 1000);
        }
    });
}

function clearAllPackageFormFields()
{
    $('#packagemasterlistcode').val("");
    $('#packagemasterlistincharge').val("");
    $('#packagemasterlistprice').val("");
    $('#packagemasterlistdeal').val("");
    $('#packagemasterlistmemo').val("");
    $('#packagemasterlistcodeofmain').val("");
    
    $('#packagemasterlistcode').css("border-color","");
    $('#packagemasterlistincharge').css("border-color","");
    $('#packagemasterlistprice').css("border-color","");
    $('#packagemasterlistdeal').css("border-color","");
    $('#packagemasterlistmemo').css("border-color","");
    $('#packagemasterlistcodeofmain').css("border-color","");
    
    $('#packagemasterlistcodeerror').html("");
    $('#packagemasterlistinchargeerror').html("");
    $('#packagemasterlistpriceerror').html("");
    $('#packagemasterlistdealerror').html("");
    $('#packagemasterlistmemoerror').html("");
    $('#packagemasterlistcodeofmainerror').html("");
}

function deletePackageMasterlist(id) 
{
    swal
    ({
        title: "Are you sure?",
        text: "You will not be able to recover the selected record!",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes, delete it!"
    },
    function (isConfirm)
    {
        if (isConfirm)
        {
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + 'PackageMasterlist/DeletePackageFromMasterlist',
                data: {id: id},
                dataType: 'json'
            })
            .done(function (result)
            {
                if (result == false)
                {
                    swal("Error!", "Record was not deleted", "error");
                } 
                else
                {
                    swal
                    ({
                        title: "Success!",
                        text: "Record is successfully deleted!",
                        type: "success",
                        allowOutsideClick: false
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $('#package-masterlist-table').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
}

function editPackageMasterlist(id) 
{
    showAddPackageMasterlistForm();
    
    $('#addpackagemasterlistbutton').addClass('d-none');
    $('#updatepackagemasterlistbutton').removeClass('d-none');
    
    $('#packagemasterlistid').val(id);

    $.ajax({

        type: 'POST',
        data: {id: id},
        url: BASE_URL + 'PackageMasterlist/SearchSelectedPackageFromMasterlist',
        dataType: 'json'

    }).done(function (result) {

        $('#addpackagemasterlistbutton').addClass('d-none');
        $('#updatepackagemasterlistbutton').removeClass('d-none');

        $('#packagemasterlistdeal').val(result[0].description);
        $('#packagemasterlistcode').val(result[0].packageCODE);
        $('#packagemasterlistincharge').val(result[0].incharge);
        $('#packagemasterlistprice').val(result[0].packageprice);
        $('#packagemasterlistmemo').val(result[0].referenceno);
        $('#packagemasterlistcodeofmain').val(result[0].linkedpackagecode);

        $('#addpackagemasterlist').removeClass('d-none');

    });

}

function updatePackageMasterlist()
{
    var packageMasterlistID = $('#packagemasterlistid').val();
    var packageMasterlistDeal = $('#packagemasterlistdeal').val();
    var packageMasterlistCode = $('#packagemasterlistcode').val();
    var packageMasterlistIncharge = $('#packagemasterlistincharge').val();
    var packageMasterlistPrice = $('#packagemasterlistprice').val();
    var packageMasterlistMemo = $('#packagemasterlistmemo').val();
    var packageMasterlistCodeOfMain = $('#packagemasterlistcodeofmain').val();
    var packageMasterlistAccountId = $('#packagemasterlistaccountid').val();
    var packageMasterlistAccountName = $('#packagemasterlistaccountname').val();

    swal
    ({
        title: "Are you sure?",
        text: "Data will be change and you will not be able to recover it!",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "Yes, update it!"
    }, 
    function (isConfirm)
    {
        if (isConfirm)
        {
            $('#updatepackagemasterlistbutton').prop("disabled",true);
            
            var updatepackageloader = swal
            ({
                title: "Please wait!",
                text: "Processing of data is still ongoing.",
                imageUrl: BASE_URL + "assets/images/loading.gif",
                imageSize: '200x200',
                showCancelButton: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false
            });

            interval = setInterval(function ()
            {
                if (error !== 0 || $('#adddoctorsmodal').hasClass('hide'))
                {
                    updatepackageloader.close();

                    setTimeout(function ()
                    {
                        clearInterval(interval);
                    });
                }
            }, 5000);
            
            
            $.ajax
            ({

                type: 'POST',
                data:
                {
                    packageMasterlistID: packageMasterlistID,
                    packageMasterlistDeal: packageMasterlistDeal,
                    packageMasterlistCode: packageMasterlistCode,
                    packageMasterlistIncharge: packageMasterlistIncharge,
                    packageMasterlistPrice: packageMasterlistPrice,
                    packageMasterlistMemo: packageMasterlistMemo,
                    packageMasterlistCodeOfMain: packageMasterlistCodeOfMain,
                    packageMasterlistAccountId: packageMasterlistAccountId,
                    packageMasterlistAccountName: packageMasterlistAccountName
                },
                url: BASE_URL + 'PackageMasterlist/UpdatePackageMasterlist',
                dataType: 'json'
            })
            .done(function (result)
            {
                if (result.status == false)
                {
                    $('#updatepackagemasterlistbutton').prop("disabled",false);
                    
                    checkFieldValidations(result.errors.packagemasterlistdeal, 'packagemasterlistdealerror', 'packagemasterlistdeal');
                    checkFieldValidations(result.errors.packagemasterlistcode, 'packagemasterlistcodeerror', 'packagemasterlistcode');
                    checkFieldValidations(result.errors.packagemasterlistincharge, 'packagemasterlistinchargeerror', 'packagemasterlistincharge');
                    checkFieldValidations(result.errors.packagemasterlistprice, 'packagemasterlistpriceerror', 'packagemasterlistprice');
                    checkFieldValidations(result.errors.packagemasterlistmemo, 'packagemasterlistmemoerror', 'packagemasterlistmemo');
                    
                    swal
                    ({
                        title: "Validation Notice!",
                        text: "Some field requires your attention!!",
                        type: "warning",
                        allowOutsideClick: false
                    });
                }
                else
                {
                    $('#updatepackagemasterlistbutton').prop("disabled",true);
                    hideAddPackageMasterlistForm();

                    setTimeout(function ()
                    {
                        swal
                        ({
                            title: "Success!",
                            text: "Record is successfully saved!",
                            type: "success",
                            allowOutsideClick: false,
                            confirmButtonText: "OK"
                        },
                        function (isConfirm)
                        {
                            if (isConfirm)
                            {
                                packagx_table.ajax.reload();
                                $('#package-masterlist-table_filter [type="search"]').val(packageMasterlistCode);
                                $('#package-masterlist-table_filter [type="search"]').focus();
                                packagx_table.search(packageMasterlistCode).draw();

                                $('#updatepackagemasterlistbutton').prop("disabled",false);
                                clearAllPackageFormFields();
                            }
                        });
                    }, 1000);
                }
            });
        }
    });
}
    
function clearAllPackageMasterlistFields()
{
    $('#packagemasterlistdeal').val('');
    $('#packagemasterlistcode').val('');
    $('#packagemasterlistincharge').val('');
    $('#packagemasterlistprice').val('');
    $('#packagemasterlistmemo').val('');
    $('#packagemasterlistcodeofmain').val('');
}