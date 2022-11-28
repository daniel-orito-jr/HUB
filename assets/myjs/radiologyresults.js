var counterfortblemedication = 1;
var radmasterlist_table = null;
var selectedRadiologyMasterlistPatient;

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
    
    $('#radioid_currentpxlrad').prop('checked', true);

    var type = "current record";
    
    tabsHighlightForHomeInstruction();
    getAllPatientFromHrsvMasterlistTable(type);
    selectRadiologyMasterlistPatient();
    getPatientRadiologyResultLedgersales();
});

function tabsHighlightForHomeInstruction()
{
    $("#viewresultsidetab").addClass("active");
    $('#viewresultanchor').click();
    $("#radresultliid").css("font-weight","bold");
}

function selectRadiologyMasterlistPatient()
{
    var data;

    $('#radiology-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#radiology-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#radiology-masterlist-table').DataTable().row('.bg-grey').data();
    });
}

function getAllPatientFromHrsvMasterlistTable(type)
{  
    radmasterlist_table = $('#radiology-masterlist-table').DataTable
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
            url: BASE_URL + 'RadiologyResults/GetAllRadPxMasterlist',
            type: 'POST',
            data: 
            { 
                typex: type 
            },
            dataType: 'json'
        },
        createdRow: function (row, data, dataIndex)
        {
            $('td', row).eq(1).html(dataIndex+1);
        },
        initComplete: function (settings, json)
        {

        }
    });
    
    radmasterlist_table.on('click', 'tr', function ()
    {
        var data = radmasterlist_table.row(this).data();
        var id = data[15];
        
        window.open(BASE_URL + 'RadiologyResults/radpatientdetails?id=' + id, '_blank');

        getPatientRadiologyResultLedgersales();
    });
}

function onChangeCurrentRecordRadioButton()
{
    var type = "current record";
    
    radmasterlist_table = $('#radiology-masterlist-table').DataTable();
    radmasterlist_table.clear().destroy();
    
    getAllPatientFromHrsvMasterlistTable(type);
}

function onChangeArchiveRecordRadioButton()
{
    var type = "archive record";
    
    radmasterlist_table = $('#radiology-masterlist-table').DataTable();
    radmasterlist_table.clear().destroy();
    
    getAllPatientFromHrsvMasterlistTable(type);
}

function getPatientRadiologyResultLedgersales()
{
    var transno = $('#smallid_transnumrad').val();
    
    radledgerlist_table = $('#radiologyy-ledgersales-table').DataTable();
    radledgerlist_table.clear().destroy();
            
    radledgerlist_table = $('#radiologyy-ledgersales-table').DataTable
    ({
        sScrollY: "130px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        searching: false,
        bPaginate: false,
        bFilter: false,
        bInfo: false,
        serverSide: true,
        retrieve: true,
        destroy: true,
        order: [],
        ajax: 
        {
            url: BASE_URL + "RadiologyResults/fetchPxRadLedgerSales",
            type: "POST",
            data: 
            {
                transnox: transno
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
    
    selectrowledgersalesdatatable();
    
    radledgerlist_table.on('dblclick', 'tr', function ()
    {
        var data = radledgerlist_table.row(this).data();
        var resultrefno = data[20];
        
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "RadiologyResults/getRadResultsDataForDataImport",
            data: {resultrefnox: resultrefno},
            dataType: 'json'
        })
        .done(function (data)
        {
            $('#textareaid_findingsrad').val(data.radiologyresultdata['result']);
            $('#textareaid_impressxrad').val(data.radiologyresultdata['impression']);
            $('#textareaid_remarksxrad').val(data.radiologyresultdata['remarks']);
            
            $('#underlineid_resultstatus').html(data.radiologyresultdata['status']);
            $('#underlineid_templatename').html(data.radiologyresultdata['template'] + " : " + data.radiologyresultdata['templatecode']);
            
        });
    });
}

function selectrowledgersalesdatatable()
{
    $('#radiologyy-ledgersales-table tbody').on('click', 'tr', function ()
    {
        $('#radiologyy-ledgersales-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        $('#radiologyy-ledgersales-table').DataTable().row('.bg-grey').data();
    });
}