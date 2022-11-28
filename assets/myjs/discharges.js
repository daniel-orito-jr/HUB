$(function () {
//    highlightTabs(); //Load function after browser load
    getAllDischargedPatientAndAddItToTheTable();
    tabsHighlightForDischarges();
});


function getAllDischargedPatientAndAddItToTheTable() {
    $('#discharged-patients-masterlist-table').dataTable().fnDestroy();

    var table = $('#discharged-patients-masterlist-table').dataTable({


        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax: {

            url: BASE_URL + 'Discharges/GetAllDischargedPatients',
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

$(function () {
    highlightTabs(); //Load function after browser load 
});

function highlightTabs() {
    $('#tools-tab').addClass('active');
    $('#Tools').addClass('active');
    $('#admission').addClass('active-marker');
}

function tabsHighlightForDischarges()
{
    $("#patientsidetab").addClass("active");
    $('#patientanchor').click();
    $("#dischliid").css("font-weight","bold");
}