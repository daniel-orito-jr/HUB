var counterfortblehmo = 1;
var counterfortexthmo = 1;
var totalcredithmo = parseFloat(0);
var hmomanagement_table = null;
var hmotblrowforupdate;

$(function () 
{
    getAllHMODataAndAddItToTheTable();
    
    hmomanagement_table = $('#hmo-management-table').DataTable();
    $('#hmo-management-table tbody').on('click', '.btn-hmo-adm-add-delete', function ()
    {
        var hmodeletebtn = this;
        var tbldataarr = hmomanagement_table.row($(hmodeletebtn).parents('tr')).data();
        var textboxidtblhmo = tbldataarr[12];
        var hmoCRLine = tbldataarr[2];
        
        var hmoCRLinesplit = hmoCRLine.split(" ");
        var hmoCRLinevalue = hmoCRLinesplit[1];
        var newcreditlinevalue = hmoCRLinevalue.replace(/,/g , '');

        swal
        ({
            title: "Are you sure?",
            text: "You will not be able to recover the selected patient record!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No",
            closeOnConfirm: false
        },
        function (isConfirm)
        {
            $(".confirm").attr('disabled', 'disabled'); 
            if (isConfirm)
            {
                var newcreditval = (parseFloat(totalcredithmo)) - (parseFloat(newcreditlinevalue));
                totalcredithmo = parseFloat(newcreditval);
                $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());

                swal
                ({
                    title: "Success!",
                    text: "Record is successfully deleted!",
                    type: "success",
                    allowOutsideClick: false
                });
                
                hmomanagement_table.row($(hmodeletebtn).parents('tr')).remove().draw(false);
                $('#myFormHMOInsurAdmitAdd').empty();
                
                var rownum = $('#hmo-management-table').DataTable().rows().count();

                for(var i = 0; i < rownum; i++)
                {
                    var counter = parseInt(i) + 1;
                    
                    var rowanddata = hmomanagement_table.row(i).data();
                    var creditlinesplit = rowanddata[2].split(" ");
                    var cerditlinenumbr = creditlinesplit[1];
                    var newhmocrlineval = cerditlinenumbr.replace(/,/g , '');
                    
                    hmomanagement_table.row(i).data
                    ([
                        "<button class='btn btn-sm btn-warning waves-effect btn-hmo-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                         <button class='btn btn-sm btn-danger waves-effect btn-hmo-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                        rowanddata[1],
                        rowanddata[2],
                        rowanddata[3],
                        counter,
                        rowanddata[5],
                        rowanddata[6],
                        rowanddata[7],
                        rowanddata[8],
                        rowanddata[9],
                        rowanddata[10],
                        rowanddata[11],
                        rowanddata[12],
                    ]).order([4,'asc']).draw();
                    
                    var hmoalldata = rowanddata[1] + "|" + rowanddata[8] + "|" +
                                     rowanddata[7] + "|" + newhmocrlineval + "|" +
                                     counter + "|" + rowanddata[9] + "|" +
                                     rowanddata[3] + "|" + rowanddata[10] + "|" +
                                     rowanddata[11] + "|" + rowanddata[12];           

                    textBoxCreatehmo(hmoalldata);
                }
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    });
    
    
    hmomanagement_table = $('#hmo-management-table').DataTable();
    $('#hmo-management-table tbody').on('click', '.btn-hmo-adm-add-update', function ()
    {
        hmotblrowforupdate = this;
        var hmoupdatebutton = this;

        var tbldataarr = hmomanagement_table.row($(hmoupdatebutton).parents('tr')).data();
        var hmoname = tbldataarr[1];
        var hmoCRLine = tbldataarr[2];
        
        var hmoCRLinesplit = hmoCRLine.split(" ");
        var hmoCRLinevalue = hmoCRLinesplit[1];
        
        var hmoLOA = tbldataarr[3];
        var hmoPriority = tbldataarr[4];
        var updatedhmo = tbldataarr[5];
        var recbyhmo = tbldataarr[6];
        var refnohmo = tbldataarr[7];
        var hmocode = tbldataarr[8];
        var hmoCardNo = tbldataarr[9];
        var hmoApprovalDate = tbldataarr[10];
        var hmoCardHolderNo = tbldataarr[11];
        var textboxidtblhmo = tbldataarr[12];
        
        var hmoalldataforupdate = hmoname + "|" + hmoCRLinevalue + "|" +
                                  hmoLOA + "|" + hmoPriority + "|" +
                                  updatedhmo + "|" + recbyhmo + "|" +
                                  refnohmo + "|" + hmocode + "|" +
                                  hmoCardNo + "|" + hmoApprovalDate + "|" +
                                  hmoCardHolderNo + "|" + textboxidtblhmo;
        
        editHMOForInsertAdmission(hmoalldataforupdate);
    });
    
    hmomanagement_table = $('#hmo-management-table').DataTable();
    $('#hmo-management-table tbody').on('click', '.btn-hmo-adm-edt-delete', function ()
    {
        var hmodeletebtn = this;
        var tbldataarr = hmomanagement_table.row($(hmodeletebtn).parents('tr')).data();
        var textboxidtblhmo = tbldataarr[12];
        var hmoCRLine = tbldataarr[2];
        
        var hmoCRlinenew = hmoCRLine.replace("₱ ", "");
        var hmoCRlineFinal = hmoCRlinenew.replace(/,/g, '');

        swal
        ({
            title: "Are you sure?",
            text: "You will not be able to recover the selected patient record!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No",
            closeOnConfirm: false
        },
        function (isConfirm)
        {
            $(".confirm").attr('disabled', 'disabled'); 
            if (isConfirm)
            {
                var newcreditval = (parseFloat(totalcredithmo)) - (parseFloat(hmoCRlineFinal));
                totalcredithmo = parseFloat(newcreditval);
                $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());

                swal
                ({
                    title: "Success!",
                    text: "Record is successfully deleted!",
                    type: "success",
                    allowOutsideClick: false
                });
                
                hmomanagement_table.row($(hmodeletebtn).parents('tr')).remove().draw(false);
                $("#" + textboxidtblhmo).remove();
                $("#" + textboxidtblhmo).remove();
                $("#" + textboxidtblhmo).remove();
                $("#" + textboxidtblhmo).remove();
                $("#" + textboxidtblhmo).remove();
                $("#" + textboxidtblhmo).remove();
                $("#" + textboxidtblhmo).remove();
                $("#" + textboxidtblhmo).remove();
                $("#" + textboxidtblhmo).remove();
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    });

    hmomanagement_table = $('#hmo-management-table').DataTable();
    $('#hmo-management-table tbody').on('click', '.btn-hmo-adm-edt-update', function ()
    {
        hmotblrowforupdate = this;
        var hmoupdatebutton = this;

        var tbldataarr = hmomanagement_table.row($(hmoupdatebutton).parents('tr')).data();
        var hmoname = tbldataarr[1];
        var hmoCRLine = tbldataarr[2];
        var hmoLOA = tbldataarr[3];
        var hmoPriority = tbldataarr[4];
        var updatedhmo = tbldataarr[5];
        var recbyhmo = tbldataarr[6];
        var refnohmo = tbldataarr[7];
        var hmocode = tbldataarr[8];
        var hmoCardNo = tbldataarr[9];
        var hmoApprovalDate = tbldataarr[10];
        var hmoCardHolderNo = tbldataarr[11];
        var textboxidtblhmo = tbldataarr[12];
        
        var hmoCRlinenew = hmoCRLine.replace("₱ ", "");
        var hmoCRlineFinal = hmoCRlinenew.replace(/,/g, '');
        var hmocreditline = parseFloat(hmoCRlineFinal);

        var hmoalldataforupdate = hmoname + "|" + 
                                  hmocreditline + "|" +
                                  hmoLOA + "|" + 
                                  hmoPriority + "|" +
                                  updatedhmo + "|" + 
                                  recbyhmo + "|" +
                                  refnohmo + "|" + 
                                  hmocode + "|" +
                                  hmoCardNo + "|" + 
                                  hmoApprovalDate + "|" +
                                  hmoCardHolderNo + "|" + 
                                  textboxidtblhmo;
        
        editHMOForUpdateAdmission(hmoalldataforupdate);
    });
});

function addNewHMOForInsertAdmission()
{
    $('#inserthmofrompatient').prop("disabled",true);
    
    swal
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
        if ($('#addhmo').hasClass('d-none'))
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);
    
    var refnohmo = $('#refnohmo').val();
    var updatedhmo = $('#updatedhmo').val();
    var recbyhmo = $('#recbyhmo').val();
    var hmoPatient = $('#hmopatient').val();
    var hmoCRLine = $('#hmocrline').val();
    var hmoPriority = $('#hmopriority').val();
    var hmoCardNo = $('#hmocardno').val();
    var hmoLOA = $('#hmoloa').val();
    var hmoApprovalDate = $('#hmoapprovaldate').val();
    var hmoCardHolderNo = $('#hmocardholderno').val();
    var hmoManagementId = $('#hmomanagementid').val();
    var hmoManagementName = $('#hmomanagementname').val();
    
    $.ajax
    ({
        type: 'POST',
        data:
        {
            hmoPatient: hmoPatient,
            hmoCRLine: hmoCRLine,
            hmoPriority: hmoPriority,
            hmoCardNo: hmoCardNo,
            hmoLOA: hmoLOA,
            hmoApprovalDate: hmoApprovalDate,
            hmoCardHolderNo: hmoCardHolderNo,
            hmoManagementId: hmoManagementId,
            hmoManagementName: hmoManagementName
        },
        url: BASE_URL + 'HMOManagement/AddNewHMOPatient',
        dataType: 'json'
    })
    .done(function (result) 
    {
        if (result.status === false) 
        {
            checkFieldValidations(result.errors.hmopatient, 'hmopatienterror', 'hmopatient');
            checkFieldValidations(result.errors.hmocrline, 'hmocrlineerror', 'hmocrline');
            checkFieldValidations(result.errors.hmopriority, 'hmopriorityerror', 'hmopriority');
            checkFieldValidations(result.errors.hmocardno, 'hmocardnoerror', 'hmocardno');
            checkFieldValidations(result.errors.hmoloa, 'hmoloaerror', 'hmoloa');
            checkFieldValidations(result.errors.hmoapprovaldate, 'hmoapprovaldateerror', 'hmoapprovaldate');
            checkFieldValidations(result.errors.hmocardholderno, 'hmocardholdernoerror', 'hmocardholderno');
            
            swal.close();
            $('#inserthmofrompatient').prop("disabled",false);
        }
        else 
        {
            $('#addhmo').addClass('d-none');
            $('#hmo-table-and-header').removeClass('d-none');
            $('#hmoreturnbuttondiv').removeClass('d-none');
            
            totalcredithmo = (parseFloat(totalcredithmo)) + (parseFloat(hmoCRLine));
            $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());
            
            var hmosplit = hmoPatient.split(" - ");
            var hmoname = hmosplit[0];   
            var hmocode = hmosplit[1];   
            
            var rownum = $('#hmo-management-table').DataTable().rows().count();            
            if (rownum === 0)
            {
                var textboxidtblhmo = hmocode + "-" + "1";
            }
            else
            {
                var hmomanagement_tablex = $('#hmo-management-table').DataTable();
                var priorityval = hmomanagement_tablex.row(":last").data()[4];
                var priorityvalplusone = parseInt(priorityval) + 1;
                var textboxidtblhmo = hmocode + "-" + priorityvalplusone;
            }

            emptyAllFields();
            
            $('#inserthmofrompatient').prop("disabled",false);

            var hmomanagement_table = $('#hmo-management-table').DataTable();
            var rownum = $('#hmo-management-table').DataTable().rows().count();
            
            swal
            ({
                title: "Success!",
                text: "Record is successfully submitted!",
                type: "success",
                allowOutsideClick: false
            });
            
            if (rownum === 0)
            {
                hmomanagement_table.row.add
                ([ 
                    "<button class='btn btn-sm btn-warning waves-effect btn-hmo-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                    <button class='btn btn-sm btn-danger waves-effect btn-hmo-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                    hmoname,
                    "₱ " + parseFloat(hmoCRLine).toLocaleString(),
                    hmoLOA,
                    "1",
                    moment(updatedhmo).format("MMMM DD, YYYY HH:mm A"),
                    recbyhmo,
                    refnohmo,
                    hmocode,
                    hmoCardNo,
                    moment(hmoApprovalDate).format("MMMM DD, YYYY"),
                    hmoCardHolderNo,
                    textboxidtblhmo
                ]).order([4, 'asc']).draw(false);

                var hmoalldata = hmoname + "|" + hmocode + "|" +
                                 refnohmo + "|" + parseFloat(hmoCRLine) + "|" +
                                 hmoPriority + "|" + hmoCardNo + "|" +
                                 hmoLOA + "|" + hmoApprovalDate + "|" +
                                 hmoCardHolderNo + "|" + textboxidtblhmo;           

                textBoxCreatehmo(hmoalldata);
            }        
            else
            {
                var newpriorityval = hmomanagement_table.row(":last").data()[4];
                var newpriorityvalplusone = parseInt(newpriorityval) + 1;
                
                hmomanagement_table.row.add
                ([ 
                    "<button class='btn btn-sm btn-warning waves-effect btn-hmo-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                    <button class='btn btn-sm btn-danger waves-effect btn-hmo-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                    hmoname,
                    "₱ " + parseFloat(hmoCRLine).toLocaleString(),
                    hmoLOA,
                    newpriorityvalplusone,
                    moment(updatedhmo).format("MMMM DD, YYYY HH:mm A"),
                    recbyhmo,
                    refnohmo,
                    hmocode,
                    hmoCardNo,
                    moment(hmoApprovalDate).format("MMMM DD, YYYY"),
                    hmoCardHolderNo,
                    textboxidtblhmo
                ]).order([4, 'asc']).draw(false);

                var hmoalldata = hmoname + "|" + hmocode + "|" +
                                 refnohmo + "|" + parseFloat(hmoCRLine) + "|" +
                                 newpriorityvalplusone + "|" + hmoCardNo + "|" +
                                 hmoLOA + "|" + hmoApprovalDate + "|" +
                                 hmoCardHolderNo + "|" + textboxidtblhmo;           

                textBoxCreatehmo(hmoalldata);
            }
            
        }
    });
}

function showHMOManagementModalForInsertAdmission() 
{
    $('#hmomanagementmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#hmomanagementmodal').css('overflow-y', 'scroll');
    
    $('#addhmo').addClass('d-none');
    $('#hmo-table-and-header').removeClass('d-none');
    $('#hmoreturnbuttondiv').removeClass('d-none');

    var rownum = $('#hmo-management-table').DataTable().rows().count();

    if (rownum == 0)
    {
        $('#hmopriority').val("1");
    }
    else
    {
        var newpriorityval = hmomanagement_table.row(":last").data()[4];
        var newpriorityvalplusone = parseInt(newpriorityval) + 1;
        $('#hmopriority').val(newpriorityvalplusone);
    }

    $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());
}

function hideHMOManagementModal()
{    
    $('#hmomanagementmodal').modal("hide");

    $('#admitpatientmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    emptyAllFields();
}

function showAddHMOFieldsForInsertAdmission() 
{
    $('#addhmo').removeClass('d-none');
    $('#hmo-table-and-header').addClass('d-none');
    $('#hmoreturnbuttondiv').addClass('d-none');
    
    $('#addoreditindicator').val('ADD');
    
    $('#inserthmofrompatient').removeClass('d-none');
    $('#updatehmofrompatient').addClass('d-none');
    $('#inserthmofromadmedit').addClass('d-none');
    $('#updatehmofromadmedit').addClass('d-none');
    
    
    $('#hiddentextid_updateparameterforhmo').val("");
    
    var date = moment();
    var datecode = date.format("YYYYMMDDhhmm");
    
    var datesplit = datecode.split("");
    var shuffledate = shuffle(datesplit);
    var finalformat = shuffledate.join('');

    $('#updatedhmo').val(date.format("YYYY-MM-DD hh:mm:ss"));
    $('#refnohmo').val(finalformat + "HMRJ");

    var hmotable = $('#hmo-management-table').DataTable();
    if ( ! hmotable.data().count() )
    {
        $('#hmopriority').val("1");
    }
    else
    {
        var newpriorityval = hmomanagement_table.row(":last").data()[4];
        var newpriorityvalplusone = parseInt(newpriorityval) + 1;
        $('#hmopriority').val(newpriorityvalplusone);
    }
}

function hideAddHMOFields()
{
    $('#addhmo').addClass('d-none');
    $('#hmo-table-and-header').removeClass('d-none');
    $('#hmoreturnbuttondiv').removeClass('d-none');
    
    emptyAllFields();
}


function getAllHMODataAndAddItToTheTable() 
{
    hmomanagement_table = $('#hmo-management-table').DataTable
    ({
        sScrollY: "150px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        searching: true,

        createdRow: function (row, data, dataIndex) 
        {
            $('td', row).eq(4).html(dataIndex+1);
        },

        initComplete: function (settings, json) 
        {

        }
    });
}

function updateHMOForInsertAdmission()
{
    $("#updatehmofrompatient").prop("disabled",true);
    
    swal
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
        if ($('#addhmo').hasClass('d-none'))
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);

    var refnohmo = $('#refnohmo').val();
    var updatedhmo = $('#updatedhmo').val();
    var recbyhmo = $('#recbyhmo').val();
    var hmoPatient = $('#hmopatient').val();
    var hmoCRLine = $('#hmocrline').val();
    var hmoPriority = $('#hmopriority').val();
    var hmoCardNo = $('#hmocardno').val();
    var hmoLOA = $('#hmoloa').val();
    var hmoApprovalDate = $('#hmoapprovaldate').val();
    var hmoCardHolderNo = $('#hmocardholderno').val();
    var hmoManagementId = $('#hmomanagementid').val();
    var hmoManagementName = $('#hmomanagementname').val();

    $.ajax
    ({
        type: 'POST',
        data:
        {
            hmoPatient: hmoPatient,
            hmoCRLine: hmoCRLine,
            hmoPriority: hmoPriority,
            hmoCardNo: hmoCardNo,
            hmoLOA: hmoLOA,
            hmoApprovalDate: hmoApprovalDate,
            hmoCardHolderNo: hmoCardHolderNo,
            hmoManagementId: hmoManagementId,
            hmoManagementName: hmoManagementName
        },
        url: BASE_URL + 'HMOManagement/AddNewHMOPatient',
        dataType: 'json'
    })
    .done(function (result) 
    {
        if (result.status === false) 
        {
            swal.close();
            $("#updatehmofrompatient").prop("disabled",false);
            
            checkFieldValidations(result.errors.hmopatient, 'hmopatienterror', 'hmopatient');
            checkFieldValidations(result.errors.hmocrline, 'hmocrlineerror', 'hmocrline');
            checkFieldValidations(result.errors.hmopriority, 'hmopriorityerror', 'hmopriority');
            checkFieldValidations(result.errors.hmocardno, 'hmocardnoerror', 'hmocardno');
            checkFieldValidations(result.errors.hmoloa, 'hmoloaerror', 'hmoloa');
            checkFieldValidations(result.errors.hmoapprovaldate, 'hmoapprovaldateerror', 'hmoapprovaldate');
            checkFieldValidations(result.errors.hmocardholderno, 'hmocardholdernoerror', 'hmocardholderno');
        }
        else 
        {
            $('#addhmo').addClass('d-none');
            $('#hmo-table-and-header').removeClass('d-none');
            $('#hmoreturnbuttondiv').removeClass('d-none');
            
            var hmosplit = hmoPatient.split(" - ");
            var hmoname = hmosplit[0];   
            var hmocode = hmosplit[1];   
            var textboxidtblhmo = $('#hiddentextid_updateparameterforhmo').val();
            
            var oldcreditval = $('#hiddentextid_previouscreditval').val();
            var newcreditval = hmoCRLine;
            
            if(oldcreditval < newcreditval)
            {
                var oldandnewdifference1 = (parseFloat(newcreditval)) - (parseFloat(oldcreditval));
                var newcreditvalue1 = (parseFloat(oldandnewdifference1)) + (parseFloat(totalcredithmo));
                totalcredithmo = newcreditvalue1;
                $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());
            }
            else
            {
                var oldandnewdifference2 = (parseFloat(oldcreditval)) - (parseFloat(newcreditval));
                var newcreditvalue2 = (parseFloat(totalcredithmo)) - (parseFloat(oldandnewdifference2));
                totalcredithmo = newcreditvalue2;
                $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());
            }

            swal
            ({
                title: "Success!",
                text: "Record is successfully submitted!",
                type: "success",
                allowOutsideClick: false
            });
            
            emptyAllFields();
            
            var newcreditvalue = "₱ " + parseFloat(hmoCRLine).toLocaleString();
            
            var hmomanagement_table = $('#hmo-management-table').DataTable();
            var index = hmomanagement_table.row($(hmotblrowforupdate).parents('tr')).index();
            
            $("#updatehmofrompatient").prop("disabled",false);

            hmomanagement_table.row(index).data
            ([ "<button class='btn btn-sm btn-warning waves-effect btn-hmo-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                <button class='btn btn-sm btn-danger waves-effect btn-hmo-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                hmoname,
                newcreditvalue,
                hmoLOA,
                hmoPriority,
                updatedhmo,
                recbyhmo,
                refnohmo,
                hmocode,
                hmoCardNo,
                hmoApprovalDate,
                hmoCardHolderNo,
                textboxidtblhmo
            ]).order([4,'asc']).draw();
            
            $('.hmoname_hmo'+ hmoPriority).val(hmoname);
            $('.hmocode_hmo'+ hmoPriority).val(hmocode);
            $('.hmorefno_hmo'+ hmoPriority).val(refnohmo);
            $('.hmocredit_hmo'+ hmoPriority).val(hmoCRLine);
            $('.priorityno_hmo'+ hmoPriority).val(hmoPriority);
            $('.hmocardno_hmo'+ hmoPriority).val(hmoCardNo);
            $('.hmoloa_hmo'+ hmoPriority).val(hmoLOA);
            $('.hmoapprovaldate_hmo'+ hmoPriority).val(hmoApprovalDate);
            $('.hmocardholder_hmo'+ hmoPriority).val(hmoCardHolderNo);
        }
    });
}

function editHMOForInsertAdmission(hmoalldata) 
{
    var hmosplit = hmoalldata.split("|");
    var hmoname = hmosplit[0];
    var hmoCRLine = hmosplit[1];
    var hmoLOA = hmosplit[2];
    var hmoPriority = hmosplit[3];
    var hmorefno = hmosplit[6];
    var hmocode = hmosplit[7];
    var hmoCardNo = hmosplit[8];
    var hmoApprovalDate = hmosplit[9];
    var hmoCardHolderNo = hmosplit[10];
    var textboxidtblhmo = hmosplit[11];
    
    showAddHMOFieldsForInsertAdmission();
    
    $('#inserthmofrompatient').addClass('d-none');
    $('#updatehmofrompatient').removeClass('d-none');
    $('#inserthmofromadmedit').addClass('d-none');
    $('#updatehmofromadmedit').addClass('d-none');
    
    $('#addoreditindicator').val('EDT');

    $('#refnohmo').val(hmorefno);
    $('#hmopatient').val(hmoname + " - " + hmocode);
    $('#hmopriority').val(hmoPriority);
    $('#hmocardno').val(hmoCardNo);
    $('#hmoloa').val(hmoLOA);
    $('#hmoapprovaldate').val(hmoApprovalDate);
    $('#hmocardholderno').val(hmoCardHolderNo);
    $('#hiddentextid_updateparameterforhmo').val(textboxidtblhmo);
    
    var newhmocrlineval = hmoCRLine.replace(/,/g , '');
    
    var previouscreditvalue = $('#hmocrline').val(newhmocrlineval);
    $('#hiddentextid_previouscreditval').val(previouscreditvalue.val());
}

function deleteHMOFromPatient(id) {

    swal({
        title: "Are you sure?",
        text: "Data will be deleted and you will not be able to recover it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
    }, function () {

        $.ajax({

            type: 'POST',
            data: {
                id: id
            },
            dataType: 'json',
            url: BASE_URL + 'HMOManagement/DeleteHMOFromPatient'

        }).done(function (result) 
        {
            swal
                    ({
                        title: "Success!",
                        text: "Record is successfully deleted!",
                        type: "success",
                        allowOutsideClick: false
                    },
                            function ()
                            {
                                getSpecifiedHMOAndAddItToTheTable();
                            });
        });

    });
}

function emptyAllFields()
{   
    $('#hmopatient').val('');
    $('#hmocrline').val('');
    $('#hmocardno').val('');
    $('#hmoloa').val('');
    $('#hmoapprovaldate').val('');
    $('#hmocardholderno').val('');
    $('#hiddentextid_previouscreditval').val('');

    $('#hmopatient').css('border-color','');
    $('#hmocrline').css('border-color','');
    $('#hmocardno').css('border-color','');
    $('#hmoloa').css('border-color','');
    $('#hmoapprovaldate').css('border-color','');
    $('#hmocardholderno').css('border-color','');
    
    $('#hmopatienterror').html('');
    $('#hmocrlineerror').html('');
    $('#hmocardnoerror').html('');
    $('#hmoloaerror').html('');
    $('#hmoapprovaldateerror').html('');
    $('#hmocardholdernoerror').html('');
}

function textBoxCreatehmo(hmoalldata)
{
    var hmosplit = hmoalldata.split("|");
    var hmoname = hmosplit[0]; 
    var hmocode = hmosplit[1];   
    var hmorefno = hmosplit[2];   
    var hmocredit = hmosplit[3];   
    var priorityno = hmosplit[4];   
    var hmocardno = hmosplit[5];   
    var hmoloa = hmosplit[6];   
    var hmoapprovaldate = hmosplit[7];   
    var hmocardholder = hmosplit[8];   
    var textboxidtblhmo = hmosplit[9];   
       
    var a = document.createElement("INPUT");
    a.setAttribute("type", "hidden");
    a.setAttribute("id", textboxidtblhmo);
    a.setAttribute("name", "hmoname_hmo" + priorityno);
    a.setAttribute("class", "hmoname_hmo" + priorityno);
    a.setAttribute("value", hmoname);
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(a);
    
    var b = document.createElement("INPUT");
    b.setAttribute("type", "hidden");
    b.setAttribute("id", textboxidtblhmo);
    b.setAttribute("name", "hmocode_hmo" + priorityno);
    b.setAttribute("class", "hmocode_hmo" + priorityno);
    b.setAttribute("value", hmocode);
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(b);
    
    var c = document.createElement("INPUT");
    c.setAttribute("type", "hidden");
    c.setAttribute("id", textboxidtblhmo);
    c.setAttribute("name", "hmorefno_hmo" + priorityno);
    c.setAttribute("class", "hmorefno_hmo" + priorityno);
    c.setAttribute("value", hmorefno);
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(c);
    
    var d = document.createElement("INPUT");
    d.setAttribute("type", "hidden");
    d.setAttribute("id", textboxidtblhmo);
    d.setAttribute("name", "hmocredit_hmo" + priorityno);
    d.setAttribute("class", "hmocredit_hmo" + priorityno);
    d.setAttribute("value", hmocredit);
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(d);
    
    var e = document.createElement("INPUT");
    e.setAttribute("type", "hidden");
    e.setAttribute("id", textboxidtblhmo);
    e.setAttribute("name", "priorityno_hmo" + priorityno);
    e.setAttribute("class", "priorityno_hmo" + priorityno);
    e.setAttribute("value", priorityno);
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(e);
    
    var f = document.createElement("INPUT");
    f.setAttribute("type", "hidden");
    f.setAttribute("id", textboxidtblhmo);
    f.setAttribute("name", "hmocardno_hmo" + priorityno);
    f.setAttribute("class", "hmocardno_hmo" + priorityno);
    f.setAttribute("value", hmocardno);
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(f);
    
    var g = document.createElement("INPUT");
    g.setAttribute("type", "hidden");
    g.setAttribute("id", textboxidtblhmo);
    g.setAttribute("name", "hmoloa_hmo" + priorityno);
    g.setAttribute("class", "hmoloa_hmo" + priorityno);
    g.setAttribute("value", hmoloa);
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(g);
    
    var h = document.createElement("INPUT");
    h.setAttribute("type", "hidden");
    h.setAttribute("id", textboxidtblhmo);
    h.setAttribute("name", "hmoapprovaldate_hmo" + priorityno);
    h.setAttribute("class", "hmoapprovaldate_hmo" + priorityno);
    h.setAttribute("value", hmoapprovaldate);
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(h);
    
    var i = document.createElement("INPUT");
    i.setAttribute("type", "hidden");
    i.setAttribute("id", textboxidtblhmo);
    i.setAttribute("name", "hmocardholder_hmo" + priorityno);
    i.setAttribute("class", "hmocardholder_hmo" + priorityno);
    i.setAttribute("value", hmocardholder);
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(i);
    
    var br = document.createElement("BR");
    document.getElementById("myFormHMOInsurAdmitAdd").appendChild(br);
}

function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

  return array;
}

function showHMOManagementModalForUpdateAdmission()
{
    $('#hmomanagementmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#hmomanagementmodal').css('overflow-y', 'scroll');
    
    $('#addhmo').addClass('d-none');
    $('#hmo-table-and-header').removeClass('d-none');
    $('#hmoreturnbuttondiv').removeClass('d-none');

    $('#hmopriority').val(counterfortblehmoadmedt);
    $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());
}

function showAddHMOFieldsForUpdateAdmission() 
{
    $('#addhmo').removeClass('d-none');
    $('#hmo-table-and-header').addClass('d-none');
    $('#hmoreturnbuttondiv').addClass('d-none');
    
    $('#addoreditindicator').val('ADD');
    
    $('#inserthmofrompatient').addClass('d-none');
    $('#updatehmofrompatient').addClass('d-none');
    $('#inserthmofromadmedit').removeClass('d-none');
    $('#updatehmofromadmedit').addClass('d-none');
    
    var rownum = $('#hmo-management-table').DataTable().rows().count();            
    if (rownum === 0)
    {
        $('#hmopriority').val("1");
    }
    else
    {
        var hmomanagement_tablex = $('#hmo-management-table').DataTable();
        var priorityval = hmomanagement_tablex.row(":last").data()[4];
        var priorityvalplusone = parseInt(priorityval) + 1;
        $('#hmopriority').val(priorityvalplusone);
    }
    
    $('#hiddentextid_updateparameterforhmo').val("");
    
    var date = moment();
    var datecode = date.format("YYYYMMDDhhmm");
    
    var datesplit = datecode.split("");
    var shuffledate = shuffle(datesplit);
    var finalformat = shuffledate.join('');

    $('#updatedhmo').val(date.format("YYYY-MM-DD hh:mm:ss"));
    $('#refnohmo').val(finalformat + "HMRJ");
}

function editHMOForUpdateAdmission(hmoalldata) 
{
    var hmosplit = hmoalldata.split("|");
    var hmoname = hmosplit[0];
    var hmoCRLine = hmosplit[1];
    var hmoLOA = hmosplit[2];
    var hmoPriority = hmosplit[3];
    var hmorefno = hmosplit[6];
    var hmocode = hmosplit[7];
    var hmoCardNo = hmosplit[8];
    var hmoApprovalDate = hmosplit[9];
    var hmoCardHolderNo = hmosplit[10];
    var textboxidtblhmo = hmosplit[11];
    
    showAddHMOFieldsForUpdateAdmission();
    
    $('#inserthmofrompatient').addClass('d-none');
    $('#updatehmofrompatient').addClass('d-none');
    $('#inserthmofromadmedit').addClass('d-none');
    $('#updatehmofromadmedit').removeClass('d-none');
    
    $('#addoreditindicator').val('EDT');

    $('#refnohmo').val(hmorefno);
    $('#hmopatient').val(hmoname + " - " + hmocode);
    $('#hmopriority').val(hmoPriority);
    $('#hmocardno').val(hmoCardNo);
    $('#hmoloa').val(hmoLOA);
    $('#hmoapprovaldate').val(hmoApprovalDate);
    $('#hmocardholderno').val(hmoCardHolderNo);
    $('#hiddentextid_updateparameterforhmo').val(textboxidtblhmo);
    $('#hmocrline').val(parseFloat(hmoCRLine));
    $('#hiddentextid_previouscreditval').val(parseFloat(hmoCRLine));
}


//String.prototype.reverse = function () 
//{
//    return this.split("").reverse().join("");
//};
//
//function reformatText(input) 
//{        
//    var x = input.value;
//    x = x.replace(/,/g, ""); // Strip out all commas
//    x = x.reverse();
//    x = x.replace(/.../g, function (e) {
//        return e + ",";
//    }); // Insert new commas
//    x = x.reverse();
//    x = x.replace(/^,/, ""); // Remove leading comma
//    input.value = x;
//}

function updateHMOForUpdateAdmission()
{
    var refnohmo = $('#refnohmo').val();
    var updatedhmo = $('#updatedhmo').val();
    var recbyhmo = $('#recbyhmo').val();
    var hmoPatient = $('#hmopatient').val();
    var hmoCRLine = $('#hmocrline').val();
    var hmoPriority = $('#hmopriority').val();
    var hmoCardNo = $('#hmocardno').val();
    var hmoLOA = $('#hmoloa').val();
    var hmoApprovalDate = $('#hmoapprovaldate').val();
    var hmoCardHolderNo = $('#hmocardholderno').val();
    var hmoManagementId = $('#hmomanagementid').val();
    var hmoManagementName = $('#hmomanagementname').val();

    $.ajax
    ({
        type: 'POST',
        data:
        {
            hmoPatient: hmoPatient,
            hmoCRLine: hmoCRLine,
            hmoPriority: hmoPriority,
            hmoCardNo: hmoCardNo,
            hmoLOA: hmoLOA,
            hmoApprovalDate: hmoApprovalDate,
            hmoCardHolderNo: hmoCardHolderNo,
            hmoManagementId: hmoManagementId,
            hmoManagementName: hmoManagementName
        },
        url: BASE_URL + 'HMOManagement/AddNewHMOPatient',
        dataType: 'json'
    })
    .done(function (result) 
    {
        if (result.status === false) 
        {
            checkFieldValidations(result.errors.hmopatient, 'hmopatienterror', 'hmopatient');
            checkFieldValidations(result.errors.hmocrline, 'hmocrlineerror', 'hmocrline');
            checkFieldValidations(result.errors.hmopriority, 'hmopriorityerror', 'hmopriority');
            checkFieldValidations(result.errors.hmocardno, 'hmocardnoerror', 'hmocardno');
            checkFieldValidations(result.errors.hmoloa, 'hmoloaerror', 'hmoloa');
            checkFieldValidations(result.errors.hmoapprovaldate, 'hmoapprovaldateerror', 'hmoapprovaldate');
            checkFieldValidations(result.errors.hmocardholderno, 'hmocardholdernoerror', 'hmocardholderno');
        }
        else 
        {
            var hmosplit = hmoPatient.split(" - ");
            var hmoname = hmosplit[0];   
            var hmocode = hmosplit[1];   
            var textboxidtblhmo = $('#hiddentextid_updateparameterforhmo').val();
            
            var oldcreditval = $('#hiddentextid_previouscreditval').val();
            var newcreditval = hmoCRLine;
            
//            alert(oldcreditval);
//            alert(newcreditval);
            
            if(oldcreditval < newcreditval)
            {
                var oldandnewdifference1 = (parseFloat(newcreditval)) - (parseFloat(oldcreditval));
                var newcreditvalue1 = (parseFloat(oldandnewdifference1)) + (parseFloat(totalcredithmo));
                totalcredithmo = newcreditvalue1;
                $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());
            }
            else
            {
                var oldandnewdifference2 = (parseFloat(oldcreditval)) - (parseFloat(newcreditval));
                var newcreditvalue2 = (parseFloat(totalcredithmo)) - (parseFloat(oldandnewdifference2));
                totalcredithmo = newcreditvalue2;
                $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());
            }

            swal
            ({
                title: "Success!",
                text: "Record is successfully submitted!",
                type: "success",
                allowOutsideClick: false
            });
            
            $('#addhmo').addClass('d-none');
            $('#hmo-table-and-header').removeClass('d-none');
            $('#hmoreturnbuttondiv').removeClass('d-none');

            emptyAllFields();
            var newcreditvalue = "₱ " + parseFloat(hmoCRLine).toLocaleString();
            var hmomanagement_table = $('#hmo-management-table').DataTable();
            var index = hmomanagement_table.row($(hmotblrowforupdate).parents('tr')).index();
            hmomanagement_table.row(index).data
            ([ "<button class='btn btn-sm btn-warning waves-effect btn-hmo-adm-edt-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                <button class='btn btn-sm btn-danger waves-effect btn-hmo-adm-edt-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                hmoname,
                newcreditvalue,
                hmoLOA,
                hmoPriority,
                updatedhmo,
                recbyhmo,
                refnohmo,
                hmocode,
                hmoCardNo,
                hmoApprovalDate,
                hmoCardHolderNo,
                textboxidtblhmo
            ]).order([4,'asc']).draw();
            
            $('.hmoname_hmo'+ hmoPriority).val(hmoname);
            $('.hmocode_hmo'+ hmoPriority).val(hmocode);
            $('.hmorefno_hmo'+ hmoPriority).val(refnohmo);
            $('.hmocredit_hmo'+ hmoPriority).val(hmoCRLine);
            $('.priorityno_hmo'+ hmoPriority).val(hmoPriority);
            $('.hmocardno_hmo'+ hmoPriority).val(hmoCardNo);
            $('.hmoloa_hmo'+ hmoPriority).val(hmoLOA);
            $('.hmoapprovaldate_hmo'+ hmoPriority).val(hmoApprovalDate);
            $('.hmocardholder_hmo'+ hmoPriority).val(hmoCardHolderNo);
        }
    });
}

function showCreditAdvisoryModal()
{
    var caseno = $('#accountnumberadm').val();
    var name =  $('#lastnameadm').val() + ", " +
                $('#firstnameadm').val() + " " +
                $('#middlenameadm').val() + " " +
                $('#suffixadm').val();
        
    var room = $('#selectid_roomadm').val();

    $('#smallid_patientname').html(name);
    $('#smallid_patientroom').html(room);
    $('#hiddid_patientno').html(caseno);

    
    $('#creditadvisorymodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#hmomanagementmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#creditadvisorymodal').css('overflow-y', 'scroll');

    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getInPatientlistDataForEditAdmitPatient",
        data: {casenox: caseno},
        dataType: 'json'
    })
    .done(function (data)
    {
        if (data.status)
        {                
            $('#textid_creditline').val(data.inpatientlistdata['creditmax']);
            $('#textid_needeposit').val(data.inpatientlistdata['NeedDepoamt'].toLocaleString());

            if(data.inpatientlistdata['needdeposit'] === "HIGH")
            {
                $('#smallid_instruction').html("PRESCRIBED ALL MEDS AND OTHER REQUESTS NUMBER FURTHER REQUEST ARE ALLOWED BY THE SYSTEM UNTIL PARTIAL PAYMENT HAS BEEN DONE.");
            }
            else if(data.inpatientlistdata['needdeposit'] === "LOW")
            {
                $('#smallid_instruction').html("ADVISE PARTIAL PAYMENT TO PATIENT IF POSSIBLE. REQUEST CAN STILL BE PROCESSED.");
            }
            else if(data.inpatientlistdata['needdeposit'] === "MID")
            {
                $('#smallid_instruction').html("ADVISE PARTIAL PAYMENT AS SOONEST AS POSSIBLE. REQUEST CAN STILL BE PROCESSED.");
            }
            else
            {
                $('#smallid_instruction').html("NO INSTRUCTION FOR NONE CREDIT STATUS.");
            }

            if(data.inpatientlistdata['needdeposit'] === "")
            {
                $('#textid_creditstat').val("NONE");
            }
            else
            {
                $('#textid_creditstat').val(data.inpatientlistdata['needdeposit']);
            }
        }
    });

    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "RXcreatormaker/getBalanceAndPaymentsMadeDataForRXCreatorFormDataImport",
        data: {casenox: caseno},
        dataType: 'json'
    })
    .done(function (data)
    {
        var balance = data.pxbalance_data['balance'];
        if(balance === "-0.00" || balance === null)
        {
            var zerobal1 = parseFloat("0.00");
            $('#textid_currentbal').val(zerobal1.toFixed(2));
        }
        else
        {
            $('#textid_currentbal').val(balance);
        }
    });
}


function hideCreditAdvisoryModal()
{
    $('#creditadvisorymodal').modal("hide");
    $('#hmomanagementmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#hmomanagementmodal').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
}


function updatePatientStatusCreditLine() 
{
    alert("Currently under development!")
//    $('#updatePatientStatusCreditLineButton').prop('disabled',true);
//    
//    var caseno = $('#hiddid_patientno').val();
//    var creditval = $('#textid_creditline').val();
//
//    swal
//    ({
//        title: "Are you sure?",
//        text: "Data will be change and you will not be able to recover it!",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonText: "Yes, update it!",
//        cancelButtonText: "No",
//        closeOnConfirm: false
//    },
//    function (isConfirm) 
//    {
//        $(".confirm").attr('disabled', 'disabled'); 
//        $(".cancel").attr('disabled', 'disabled'); 
//        
//        if (isConfirm) 
//        {
//            $.ajax
//            ({
//                type: 'POST',
//                url: BASE_URL + 'HMOManagement/updatePatientStatusCreditLine',
//                data:
//                {
//                    casenox: caseno,
//                    creditval: creditval
//                },
//                dataType: 'json',
//                success: function (result)
//                {
//                    if (result.status === false) 
//                    {
//                        $('#updatePatientStatusCreditLineButton').prop('disabled',false);
//                        
//                        swal
//                        ({
//                            title: "Warning",
//                            text: "Some field requires your attention!",
//                            type: "warning",
//                            confirmButtonText: "OK"
//                        },
//                        function (isConfirm)
//                        {
//                            if (isConfirm)
//                            {
//                                checkFieldValidations(result.errors.creditlineval, 'textid_creditlineerror', 'textid_creditline');
//                            }
//                        });
//                    }
//                    else
//                    {
//                        $('#updatePatientStatusCreditLineButton').prop('disabled',true);
//                        hideCreditAdvisoryModal();
//                        
//                        swal
//                        ({
//                            title: "Success",
//                            text: "Record is successfully updated!",
//                            type: "success",
//                            confirmButtonText: "OK"
//                        },
//                        function (isConfirm)
//                        {
//                            if (isConfirm)
//                            {
//                                inpatient_table.ajax.reload();
//                                $('#inpatient-masterlist-table_filter [type="search"]').val(caseno);
//                                $('#inpatient-masterlist-table_filter [type="search"]').focus();
//                                inpatient_table.search(caseno).draw();
//                            }
//                        });
//                    }
//                }
//            });
//        }
//        else
//        {
//            $('#updatePatientStatusCreditLineButton').prop('disabled',false);
//        }
//    });
}



function textBoxCreate(comaalldata)
{
    var comasplit = comaalldata.split('|');
    var docname = comasplit[0];
    var doccode = comasplit[1];
    var typeman = comasplit[2];
    var startco = comasplit[3];
    var sorting = comasplit[4];
    var textboxidtbl = comasplit[5];

    var x = document.createElement("INPUT");
    x.setAttribute("type", "hidden");
    x.setAttribute("id", textboxidtbl);
    x.setAttribute("name", "docname_comanage" + sorting);
    x.setAttribute("class", "docname_comanage" + sorting);
    x.setAttribute("value", docname);
    document.getElementById("myFormComanageAdmitAdd").appendChild(x);
    
    var y = document.createElement("INPUT");
    y.setAttribute("type", "hidden");
    y.setAttribute("id", textboxidtbl);
    y.setAttribute("name", "doccode_comanage" + sorting);
    y.setAttribute("class", "doccode_comanage" + sorting);
    y.setAttribute("value", doccode);
    document.getElementById("myFormComanageAdmitAdd").appendChild(y);
    
    var z = document.createElement("INPUT");
    z.setAttribute("type", "hidden");
    z.setAttribute("id", textboxidtbl);
    z.setAttribute("name", "typeman_comanage" + sorting);
    z.setAttribute("class", "typeman_comanage" + sorting);
    z.setAttribute("value", typeman);
    document.getElementById("myFormComanageAdmitAdd").appendChild(z);
    
    var a = document.createElement("INPUT");
    a.setAttribute("type", "hidden");
    a.setAttribute("id", textboxidtbl);
    a.setAttribute("name", "startco_comanage" + sorting);
    a.setAttribute("class", "startco_comanage" + sorting);
    a.setAttribute("value", startco);
    document.getElementById("myFormComanageAdmitAdd").appendChild(a);
    
    var br = document.createElement("BR");
    document.getElementById("myFormComanageAdmitAdd").appendChild(br);
}