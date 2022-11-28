var selectedSLCode;

$(function () {
    getAllSLCodeAndAddItToTheTable();
    generateSLCode();
    selectSLCode();

    $('#selectcoabutton').click(function () {
        $('#coareference').val(selectedCOAData[1]);
        hideCOAModal();
    });

    $('#patientselectbutton').click(function () {
        $('#pinreference').val(selectedPatientData[2]);
        $('#sldescription').val(selectedPatientData[1]);
        $('#sladdress').val(selectedPatientData[8]);
        $('#pin').val(selectedPatientData[9]);
        hidePatientMasterlistModal();
    });
});

/**
 * Get all slcode data from the controller and add it to the datatable
 * @version 2019-02-15
 * @author LJ Roa
 */
function getAllSLCodeAndAddItToTheTable() {
    $('#slcode-masterlist-table').dataTable().fnDestroy();

    var table = $('#slcode-masterlist-table').dataTable({

        sScrollY: "200px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        ajax: {

            url: BASE_URL + 'SLCode/GetAllSLCode',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }

    });
}

/**
 * Get all the inputted data and send it to the sl code controller
 * @version 2019-02-19
 * @auhor LJ Roa
 */
function addSLCode() {
    var activeIsChecked = false;

    //Check if allowadmission is clicked/checked
    if ($('#active').is(":checked"))
    {
        activeIsChecked = true;
    } else {
        activeIsChecked = false;
    }

    var slCode = $('#slcode').val();
    var coaReference = $('#coareference').val();
    var pinReference = $('#pinreference').val();
    var slDescription = $('#sldescription').val();
    var slAddress = $('#sladdress').val();
    var accountName = $('#accountname').val();
    var pin = $('#pin').val();

    $.ajax({

        type: 'POST',
        data: {
            slCode: slCode, coaReference: coaReference, pinReference: pinReference
            , slDescription: slDescription, slAddress: slAddress,
            activeIsChecked: activeIsChecked, accountName: accountName, pin: pin
        },
        dataType: 'json',
        url: BASE_URL + 'SLCode/AddSLCode'

    }).done(function (result) {
        if (result.status == false) { //If data is failed to saved

            //Check every field if has error
            checkFieldValidations(result.errors.coareference, 'coareferenceerror', 'coareference');
            checkFieldValidations(result.errors.pinreference, 'pinreferenceerror', 'pinreference');
            checkFieldValidations(result.errors.sldescription, 'sldescriptionerror', 'sldescription');
            checkFieldValidations(result.errors.sladdress, 'sladdresserror', 'sladdress');

        } else { //If success

            swal({
                title: "Success!",
                text: "Record is successfully saved!",
                type: "success",
                allowOutsideClick: false
            }, function () {
                location.reload();
            });

        }
    });

}

/**
 * Auto generate a slcode
 * @version 2019-02-18
 * @author LJ Roa
 */
function generateSLCode() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'SLCode/GenerateSLCode'
    }).done(function (result) {
        var SLCODE = result[0].SLCODE;

        var splitDoccode = SLCODE.split('L');

        var convertSLCodeToInt = parseInt(splitDoccode[1]);

        var incrementSLCode = convertSLCodeToInt + 1;

        $('#slcode').val('SL' + incrementSLCode);

    });
}

/**
 * For testing rani siya. Ayaw lang sa e delete
 * @version 2019-02-15
 * @author LJ Roa
 */
function showSLCodeModal() {
    $('#slcodemanagementmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

/**
 * Hide the SL Code Modal
 * @version 2019-02-19
 * @author LJ Roa
 */
function hideSLCodeModal() {
    $('#slcodemanagementmodal').modal('hide');

    $('#adddoctorsmodal').css('overflow-y', 'scroll');
}

/**
 * Show add sl code form
 * @version 2019-02-18
 * @author LJ Roa
 */
function showAddSLCode() {
    $('#addslcode').removeClass('d-none');
}

/**
 * Check every field if the inputs are correct.
 * @param {type} resultError = error result from the controller
 * @param {type} errorfield = error paragraph
 * @param {type} field = specified input field
 * @version 2019-01-29
 * @author LJ Roa
 */
function checkFieldValidations(resultError, errorfield, field) {
    if (resultError != '') { //If has error
        $('#' + errorfield).empty();
        $('#' + errorfield).append(resultError).removeAttr('hidden');
        $('#' + field).css('border-color', 'red');
    } else { //if no errors
        $('#' + errorfield).attr('hidden', true);
        $('#' + field).removeAttr('style');
    }
}

/**
 * Make the sl code table row selected when click.
 * @version 2019-02-19
 * @author LJ Roa
 */
function selectSLCode() {
    var data;
    $('#slcode-masterlist-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('bg-blue')) {
            $(this).removeClass('bg-blue');

        } else {
            $('#slcode-masterlist-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#slcode-masterlist-table').DataTable().row('.bg-blue').data();
            selectedSLCode = data;
        }
    });

}

/**
 * Show SL Code modal for IPD
 * @version 2019-02-19
 * @author LJ Roa
 */
function showSLCodeIPDModal() {
    $('#selectslcodeipdbutton').removeClass('d-none');
    $('#selectslcodeopdbutton').addClass('d-none');
}

/**
 * Show SL Code modal for OPD
 * @version 2019-02-19
 * @author LJ Roa
 */
function showSLCodeOPDModal() {
    $('#selectslcodeopdbutton').removeClass('d-none');
    $('#selectslcodeipdbutton').addClass('d-none');
}
