var selectedPatientData;

$(function () {
    getAllPatientAndAddItToTheTable();
    selectPatient();
});

/**
 * Get all patient data from the controller and add it to the datatable
 * @version 2019-02-19
 * @author LJ Roa
 */
function getAllPatientAndAddItToTheTable() {
    $('#patient-masterlist-table').dataTable().fnDestroy();

    var table = $('#patient-masterlist-table').dataTable({

        dom: 'frtip',
        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax: {

            url: BASE_URL + 'PatientMasterlist/GetAllPatient',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }

    });

    $('#patient-masterlist-table_filter input').unbind();
    $('#patient-masterlist-table_filter input').bind('keyup', function (e) {
        if (e.keyCode == 13)
        {
            table.fnFilter(this.value);
        }
    });
}

/**
 * Show patientmasterlist modal
 * @version 2019-02-19
 * @author LJ Roa
 */
function showPatientMasterlistModal() {
    $('#patientmasterlistmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#slcodemanagementmodal').css('overflow-y', 'scroll');
}

/**
 * Make the patient masterlist table row selected when click.
 * @version 2019-02-19
 * @author LJ Roa
 */
function selectPatient() {
    var data;
    $('#patient-masterlist-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('bg-blue')) {
            $(this).removeClass('bg-blue');

        } else {
            $('#patient-masterlist-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#patient-masterlist-table').DataTable().row('.bg-blue').data();
            selectedPatientData = data;
        }
    });

}

function hidePatientMasterlistModal() {
    $('#patientmasterlistmodal').modal('hide');
}




