$(function () {
//    highlightTabs(); //Load function after browser load
    getAllPatientsAndAddItToTheTable();
    getAdmittedPatientAndAddItToTheTable();
    getDischargedPatientAndAddItToTheTable();
    
    tabsHighlightForAllPatient();
});

function getAllPatientsAndAddItToTheTable() {
    $('#all-inpatient-masterlist-table').dataTable().fnDestroy();

    var table = $('#all-inpatient-masterlist-table').dataTable({

        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax: {

            url: BASE_URL + 'Patients/GetAllInPatients',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) 
        {
            $(row).children().eq(1).css('color', 'transparent');
        },

        initComplete: function (settings, json) {

        }

    });
}

function getAdmittedPatientAndAddItToTheTable()
{
    $('#admitted-inpatient-masterlist-table').dataTable().fnDestroy();

    var table = $('#admitted-inpatient-masterlist-table').dataTable({

        
        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax: {

            url: BASE_URL + 'Patients/GetAdmittedInPatients',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) 
        {
            var data = dataIndex + 1;
            $('td', row).eq(0).html("&nbsp;&nbsp;" + data);
        },

        initComplete: function (settings, json) {

        }

    });
}

function getDischargedPatientAndAddItToTheTable()
{
    $('#discharged-inpatient-masterlist-table').dataTable().fnDestroy();

    var table = $('#discharged-inpatient-masterlist-table').dataTable({

        
        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax: {

            url: BASE_URL + 'Patients/GetDischargedInPatients',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) 
        {
            var data = dataIndex + 1;
            $('td', row).eq(0).html("&nbsp;&nbsp;" + data);
        },

        initComplete: function (settings, json) {

        }

    });
}

function tabsHighlightForAllPatient()
{
    $("#patientsidetab").addClass("active");
    $('#patientanchor').click();
    $("#allpxliid").css("font-weight","bold");
}