var counterfortblemedication = 1;
var counterfortextmedication = 1;
var takehome_table = null;
var inpatient_table = null;
var extitems_table = null;
var doctors_table = null;
var labledgersale_table = null;
var labmasterlist_table = null;
var selectedPatient;
var selectedDoctor;
var selectedmasterresult;
var selectedledgerresult;
var selectedlaboraresult;
var textmessage = "";
var lastrequestdate = "";


$(function () 
{
    $('#textboxid_instructdatehom').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    }); 

    tabsHighlightForHomeInstruction();
    getAllInpatientAndAddItToTheTable();
    getPatientLaboratoryResultMasterlist();
    getPatientLaboratoryResultLedgerlist();
    getPatientLaboratoryResultResultlist();
    selectPatient();
    selectmasterlistresult();
    selectledgerlistresult();
    selectlaboratoryresult();
});

function tabsHighlightForHomeInstruction()
{
    $("#viewresultsidetab").addClass("active");
    $('#viewresultanchor').click();
    $("#labresultliid").css("font-weight","bold");
}

function selectPatient()
{
    var data;

    $('#inpatient-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#inpatient-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#inpatient-masterlist-table').DataTable().row('.bg-grey').data();
        selectedPatient = data;
    });
}

function getAllInpatientAndAddItToTheTable()
{
//    inpatient_table = $('#inpatient-masterlist-table').DataTable
//    ({
//        responsive: true,
//        processing: true,
//        serverSide: true,
//        retrieve: true,
//        destroy: true,
//        order: [],
//        language: 
//        {
//            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
//        },
//        ajax:
//        {
//            url: BASE_URL + 'LaboratoryResults/GetAllInPatientList',
//            type: 'POST',
//            dataType: 'json'
//        },
//        createdRow: function (row, data, dataIndex)
//        {
//
//        },
//        initComplete: function (settings, json)
//        {
//
//        }
//    });
    
    inpatient_table = $('#inpatient-masterlist-table').DataTable
    ({
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        retrieve: true,
        destroy: true,
        order: [],
        language: 
        {
            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
        },
        ajax:
        {
            url: BASE_URL + 'RXcreatormaker/GetAllInPatientList',
            type: 'POST',
            data: 
            {
                patientstatus: "x",
                phclaimstatus: "x"
            },
            dataType: 'json'
        },
        createdRow: function (row, data, dataIndex)
        {

        },
        initComplete: function (settings, json)
        {

        }
    });
    
    inpatient_table.on('click', 'tr', function ()
    {
        var data = inpatient_table.row(this).data();
        var caseno = data[2];
        
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
            data: {casenox: caseno},
            dataType: 'json'
        })
        .done(function (data)
        {
            $('#acctcode').val(data.inpatientlistdata['casecode']);
            $('#admit').val(data.inpatientlistdata['admitdate']);
            $('#acctno').val(caseno);
            $('#pincode').val(data.inpatientlistdata['pincode']);

            window.open(BASE_URL + 'LaboratoryResults/laboratorymaster?cc=' + data.inpatientlistdata['casecode'] + '&ad=' + data.inpatientlistdata['admitdate'], '_blank');

            getPatientLaboratoryResultMasterlist();
        });
    });
}

function selectmasterlistresult()
{
    var data;

    $('#laboratory-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#laboratory-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#laboratory-masterlist-table').DataTable().row('.bg-grey').data();
        selectedmasterresult = data;
    });
}

function getPatientLaboratoryResultMasterlist() 
{
    var pxcode = $('#pxcodelab').val();
    
    labmasterlist_table = $('#laboratory-masterlist-table').DataTable();
    labmasterlist_table.clear().destroy();
            
    labmasterlist_table = $('#laboratory-masterlist-table').DataTable
    ({
        responsive: true,
        processing: true,
        serverSide: true,
        retrieve: true,
        destroy: true,
        order: [],
        ajax: 
        {
            url: BASE_URL + "LaboratoryResults/fetchPxLabMasterlist",
            type: "POST",
            data: 
            {
                acctcodex: pxcode
            }
        },
        createdRow: function (row, data, dataIndex)
        {
            $('td', row).eq(0).html(dataIndex+1);
        },
        initComplete: function (settings, json)
        {

        }
    });
    
    selectmasterlistresult();
    
    labmasterlist_table.on('click', 'tr', function ()
    {
        var data = labmasterlist_table.row(this).data();
        var casecode = data[10];
        var reqxcode = data[14];
        var date = data[15];
        var reqxdate = moment(date).format('YYYYMMDDHHmm');
        
        window.open(BASE_URL + 'LaboratoryResults/laboratoryledger?cc=' + casecode + '&rn=' + reqxcode + '&rd=' + reqxdate, '_blank');
    });
}

function selectledgerlistresult()
{
    var data;

    $('#laboratory-ledgerlist-table tbody').on('click', 'tr', function ()
    {
        $('#laboratory-ledgerlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#laboratory-ledgerlist-table').DataTable().row('.bg-grey').data();
        selectedledgerresult = data;
    });
}

function getPatientLaboratoryResultLedgerlist()
{
    var casecode = $('#casecodeledlab').val();
    var reqscode = $('#reqscodeledlab').val();
    
    labledgerlist_table = $('#laboratory-ledgerlist-table').DataTable();
    labledgerlist_table.clear().destroy();
            
    labledgerlist_table = $('#laboratory-ledgerlist-table').DataTable
    ({
        responsive: true,
        processing: true,
        serverSide: true,
        retrieve: true,
        destroy: true,
        order: [],
        ajax: 
        {
            url: BASE_URL + "LaboratoryResults/fetchPxLabLedgerlist",
            type: "POST",
            data: 
            {
                casecodex: casecode,
                reqscodex: reqscode
            }
        },
        createdRow: function (row, data, dataIndex)
        {
            $('td', row).eq(0).html(dataIndex+1);
        },
        initComplete: function (settings, json)
        {

        }
    });
    
    selectledgerlistresult();
    
    labledgerlist_table.on('click', 'tr', function ()
    {
        var data = labledgerlist_table.row(this).data();
        var casecode = data[22];
        var resucode = data[23];
        var formcode = data[8];
        var date = $('#requestdatereslab').html();
        var reqxdate = moment(date).format('YYYYMMDDHHmm');

        window.open(BASE_URL + 'LaboratoryResults/laboratoryresult?cc=' + casecode + '&fn=' + formcode + '&rc=' + resucode + '&rd=' + reqxdate + '&rn=' + reqscode, '_blank');
    });
}

function selectlaboratoryresult()
{
    var data;

    $('#laboratory-resultlist-table tbody').on('click', 'tr', function ()
    {
        $('#laboratory-resultlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#laboratory-resultlist-table').DataTable().row('.bg-grey').data();
        selectedlaboraresult = data;
    });
}

function getPatientLaboratoryResultResultlist()
{
    var casecode = $('#casecodereslab').val();
    var reportno = $('#reportcodexreslab').html();
    var reqscode = $('#reqscodereslab').val();
    
    labresultlist_table = $('#laboratory-resultlist-table').DataTable();
    labresultlist_table.clear().destroy();
            
    labresultlist_table = $('#laboratory-resultlist-table').DataTable
    ({
        sScrollY: "250px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        retrieve: true,
        destroy: true,
        order: [],
        ajax: 
        {
            url: BASE_URL + "LaboratoryResults/fetchPxLabResultlist",
            type: "POST",
            data: 
            {
                casecodex: casecode,
                reportnox: reportno,
                reqscodex: reqscode
            }
        },
        createdRow: function (row, data, dataIndex)
        {
            $('td', row).eq(0).html(dataIndex+1);
        },
        initComplete: function (settings, json)
        {

        }
    });
    
    selectlaboratoryresult();
    
    labresultlist_table.on('dblclick', 'tr', function ()
    {
        var data = labresultlist_table.row(this).data();
        var deptmain = data[13];
        var testname = data[1];
        var tsresult = data[2];
        var testunit = data[3];
        var refernce = data[4];
        
        var fulltest = deptmain + " -> " + 
                       testname + " -> RESULT: " + 
                       tsresult + " " + 
                       testunit + " (NV: " +
                       refernce + " ) ##\n";
        
        textmessage = textmessage + fulltest;
        $("#textareaid_smstxtboxreslab").val(textmessage);
    });
}

function cleartextdata()
{
    $("#textareaid_smstxtboxreslab").val("");
    textmessage = "";
}

function showSendTextMessageModal()
{
    var pcnamex = $("#patientnamereslab").html();
    var textmsg = $("#textareaid_smstxtboxreslab").val();
    var reqdate = $("#reqsdatereslab").val();
    var repcode = $("#reportcodexreslab").html();
    
    var fullmessage = pcnamex + " " + 
                      textmsg + "AS OF " +
                      reqdate + " REPORT#" + 
                      repcode;

    $('#sendsmslabtestresultmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
    $('#sendsmslabtestresultmodal').css('overflow-y', 'scroll');
    
    $('#textareaid_txtmessagereslab').val(fullmessage);
}

function hideSendTextMessageModal()
{   
    $('#sendsmslabtestresultmodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function sendLabResultThoughSMSToDoctor()
{
    $('#sentSMSNowButton').prop('disabled', true);
    var textmessage = $('#textareaid_txtmessagereslab').val();
    var mobilenumbr = $('#inputid_contactnoreslab').val();
    var doctorrecip = $('#selectid_doctorreslab').val();
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "LaboratoryResults/sendResultThroughSMSToDoctor",
        data: 
        {
            textmessagex: textmessage,
            mobilenumbrx: mobilenumbr,
            doctorrecipx: doctorrecip
        },
        dataType: 'json'
    })
    .done(function (result)
    {
        if(result.status === true)
        {
            swal
            ({
                title: "Success!",
                text: "Message sent successfully!",
                type: "success",
                allowOutsideClick: false
            });
            
            hideSendTextMessageModal();
            cleartextdata();
            $('#sentSMSNowButton').prop('disabled', false);
        }
        else
        {
            swal
            ({
                title: "Error!",
                text: "Message sent not sent!",
                type: "error",
                allowOutsideClick: false
            });
            
            hideSendTextMessageModal();
            cleartextdata();
            $('#sentSMSNowButton').prop('disabled', false);
        }
    });
}