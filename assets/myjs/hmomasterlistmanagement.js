var selectedHMO;
var hmo_table = null;

$(function () 
{
    getAllHMOAndAddItToTheTable();
    selectHMO();

    $('#selecthmobutton').click(function () 
    {
        $('#hmopatient').val(selectedHMO[4] + ' - ' + selectedHMO[2]);
        hideHMOMasterlistModal();
    });

    $('#allowopdtransactions').change(function () 
    {
        if ($(this).is(":checked")) 
        {
            $(this).attr("checked");
        }
    });
});

function getAllHMOAndAddItToTheTable() 
{
    hmo_table = $('#hmo-masterlist-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        ajax: 
        {
            url: BASE_URL + 'HMOManagement/GetAllHMO',
            type: 'POST'
        },

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }
    });
    
    hmo_table.on('dblclick', 'tr', function ()
    {
        var data = hmo_table.row(this).data();
        var hmodata = data[4] + " - " + data[2];
        var hmocode = data[2];
        var duplicate = 0;
        
        $("#hmo-management-table tbody tr").each(function()
        {
            var hmocode_col = $(this).find("td:nth-child(9)").html();

            if(hmocode === hmocode_col)
            {
                duplicate++;
            }
        });
        
        if(duplicate > 0 )
        {
            swal
            ({
                title: "Validation Notice!",
                text: "Already Exist!",
                type: "warning",
                allowOutsideClick: false
            });
        }
        else
        {
            swal
            ({
                title: "Success!",
                text: "Record is successfully selected!",
                type: "success",
                allowOutsideClick: false
            });

            $('#hmopatient').val(hmodata.toUpperCase());
            hideSearchHMOModalForAdmission();
        }
    });
}

function addHMOMasterlist()
{
    var allowOPDIsChecked = false;

    if ($('#allowopdtransactions').is(":checked"))
    {
        allowOPDIsChecked = true;
    } else {
        allowOPDIsChecked = false;
    }

    var allowOPDTransactions;

    if (allowOPDIsChecked === true) 
    {
        allowOPDTransactions = 1;
    }
    else
    {
        allowOPDTransactions = 0;
    }


    var hmoMasterlistName = $('#hmomasterlistname').val();
    var hmoMneomonic = $('#hmomneomonic').val();
    var hmoAddress = $('#hmoaddress').val();
    var hmoLicenseNumber = $('#hmolicensenumber').val();
    var hmoAccountID = $('#accountidhmo').val();
    var hmoAccountName = $('#accountnamehmo').val();

    $.ajax({

        type: 'POST',
        data:
        {
            hmoMasterlistName: hmoMasterlistName,
            hmoMneomonic: hmoMneomonic,
            hmoAddress: hmoAddress,
            hmoLicenseNumber: hmoLicenseNumber,
            allowOPDTransactions: allowOPDTransactions,
            hmoAccountID: hmoAccountID,
            hmoAccountName: hmoAccountName
        },
        dataType: 'json',
        url: BASE_URL + 'HMOManagement/AddHMOToMasterlist'
    })
    .done(function (result)
    {
        if (result.status === false)
        {
            checkFieldValidations(result.errors.hmomasterlistname, 'hmomasterlistnameerror', 'hmomasterlistname');
            checkFieldValidations(result.errors.hmomneomonic, 'hmomneomonicerror', 'hmomneomonic');
            checkFieldValidations(result.errors.hmoaddress, 'hmoaddresserror', 'hmoaddress');
            checkFieldValidations(result.errors.hmolicensenumber, 'hmolicensenumbererror', 'hmolicensenumber');
        }
        else 
        {
            hideAddHMOMasterlistFields();
            clearHMOMasterlistFields();

            hmo_table.ajax.reload();
                        
            swal
            ({
                title: "Success!",
                text: "Record is successfully saved!",
                type: "success",
                allowOutsideClick: false
            },
            function ()
            {
                $('#hmo-masterlist-table_filter [type="search"]').val(hmoMneomonic);
                $('#hmo-masterlist-table_filter [type="search"]').focus();
                hmo_table.search(hmoMneomonic).draw();
            });
            $('#savehmomasterlist').removeAttr('disabled');
        }
    });
}

function editHMO(id)
{
    $('#hmoid').val(id);

    $.ajax
    ({
        type: 'POST',
        data: {id: id},
        url: BASE_URL + 'HMOManagement/SearchSelectedHMO',
        dataType: 'json'
    })
    .done(function (result)
    {
        showAddHMOMasterlistFields();
        
        $('#savehmomasterlist').addClass('d-none');
        $('#updatehmomasterlist').removeClass('d-none');

        $('#hmomasterlistname').val(result[0].hmoname);
        $('#hmomneomonic').val(result[0].mneomonic);
        $('#hmoaddress').val(result[0].adrs);
        $('#hmolicensenumber').val(result[0].PTR);

        if (result[0].admitallow === 0)
        {
            $('#allowopdtransactions').removeAttr("checked");
        }
        else 
        {
            $('#allowopdtransactions').attr("checked", true);
        }
    });
}

function updateHMOMasterlist()
{
    var allowOPDIsChecked = false;

    if ($('#allowopdtransactions').is(":checked"))
    {
        allowOPDIsChecked = true;
    }
    else
    {
        allowOPDIsChecked = false;
    }

    var allowOPDTransactions;

    if (allowOPDIsChecked === true)
    {
        allowOPDTransactions = 1;
    }
    else
    {
        allowOPDTransactions = 0;
    }

    var hmoMasterlistName = $('#hmomasterlistname').val();
    var hmoMneomonic = $('#hmomneomonic').val();
    var hmoAddress = $('#hmoaddress').val();
    var hmoLicenseNumber = $('#hmolicensenumber').val();
    var hmoAccountID = $('#accountidhmo').val();
    var hmoAccountName = $('#accountnamehmo').val();
    var hmoID = $('#hmoid').val();

    swal
    ({
        title: "Are you sure?",
        text: "Data will be change and you will not be able to recover it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!"
    },
    function () 
    {
        $.ajax
        ({
            type: 'POST',
            data:
            {
                hmoID: hmoID,
                hmoMasterlistName: hmoMasterlistName,
                hmoMneomonic: hmoMneomonic,
                hmoAddress: hmoAddress,
                hmoLicenseNumber: hmoLicenseNumber,
                allowOPDTransactions: allowOPDTransactions,
                hmoAccountID: hmoAccountID,
                hmoAccountName: hmoAccountName
            },
            dataType: 'json',
            url: BASE_URL + 'HMOManagement/UpdateHMOMasterlist'
        })
        .done(function (result) 
        {
            if (result.status === false) 
            {
                checkFieldValidations(result.errors.hmomasterlistname, 'hmomasterlistnameerror', 'hmomasterlistname');
                checkFieldValidations(result.errors.hmomneomonic, 'hmomneomonicerror', 'hmomneomonic');
                checkFieldValidations(result.errors.hmoaddress, 'hmoaddresserror', 'hmoaddress');
                checkFieldValidations(result.errors.hmolicensenumber, 'hmolicensenumbererror', 'hmolicensenumber');
            } 
            else 
            {
                hideAddHMOMasterlistFields();
                clearHMOMasterlistFields();

                hmo_table.ajax.reload();
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully updated!",
                    type: "success",
                    allowOutsideClick: false
                },
                function ()
                {
                    $('#hmo-masterlist-table_filter [type="search"]').val(hmoMneomonic);
                    $('#hmo-masterlist-table_filter [type="search"]').focus();
                    hmo_table.search(hmoMneomonic).draw();
                });
                $('#updatehmomasterlist').removeAttr('disabled');
            }
        });
    });
}

function deleteHMOMasterlist(id)
{
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
    function () 
    {
        $.ajax
        ({
            type: 'POST',
            data: {id: id},
            url: BASE_URL + 'HMOManagement/DeleteHMOFromMasterlist',
            dataType: 'json'
        })
        .done(function (result) 
        {
            $(".confirm").attr('disabled', 'disabled'); 
            $(".cancel").attr('disabled', 'disabled'); 
            
            swal
            ({
                title: "Success!",
                text: "Record is successfully deleted!",
                type: "success",
                allowOutsideClick: false
            },
            function ()
            {
                hmo_table.ajax.reload();
            });
        });
    });
}

function showSearchHMOModalForAdmission()
{
    $('#hmomasterlistmanagementmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#hmomanagementmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#hmomasterlistmanagementmodal').css('overflow-y', 'scroll');
}

function hideSearchHMOModalForAdmission()
{
    $('#hmomasterlistmanagementmodal').modal("hide");

    $('#hmomanagementmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#hmomanagementmodal').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
}

function selectHMO()
{
    var data;
    $('#hmo-masterlist-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue')) 
        {
            $(this).removeClass('bg-blue');
        }
        else 
        {
            $('#hmo-masterlist-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#hmo-masterlist-table').DataTable().row('.bg-blue').data();
            selectedHMO = data;
        }
    });
}

function selectHMOForAdmitPatient()
{
    var hmodata = selectedHMO[4] + " - " + selectedHMO[2];
    var hmocode = selectedHMO[2];
    
    var duplicate = 0;
        
    $("#hmo-management-table tbody tr").each(function()
    {
        var hmocode_col = $(this).find("td:nth-child(9)").html();

        if(hmocode === hmocode_col)
        {
            duplicate++;
        }
    });

    if(duplicate > 0 )
    {
        swal
        ({
            title: "Validation Notice!",
            text: "Already Exist!",
            type: "warning",
            allowOutsideClick: false
        });
    }
    else
    {
        swal
        ({
            title: "Success!",
            text: "Record is successfully selected!",
            type: "success",
            allowOutsideClick: false
        });

        $('#hmopatient').val(hmodata.toUpperCase());
        hideSearchHMOModalForAdmission();
    }
}

function hideHMOMasterlistModal()
{
    $('#hmomasterlistmanagementmodal').modal('hide');
    $('#hmomanagement').css('overflow-y', 'scroll');
}

function showAddHMOMasterlistFields()
{
    $('#addhmomasterlist').removeClass('d-none');
    $('#hmomasterlist-tablediv').addClass('d-none');
    $('#hmomasterlistbuttondiv').addClass('d-none');
}

function hideAddHMOMasterlistFields()
{
    $('#addhmomasterlist').addClass('d-none');
    $('#hmomasterlist-tablediv').removeClass('d-none');
    $('#hmomasterlistbuttondiv').removeClass('d-none');
    clearHMOMasterlistFields();
}

function clearHMOMasterlistFields()
{
    $('#hmomasterlistname').val('');
    $('#hmomneomonic').val('');
    $('#hmoaddress').val('');
    $('#hmolicensenumber').val('');
}

