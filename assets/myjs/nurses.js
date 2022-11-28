$(function () {
    generateNursesCode();
    getAllNursesAndAddItToTheTable();
    
    tabsHighlightForNurses();
//    highlightTabs(); //Load function after browser load
//     allowadmission if checked

    $('#allowadmission').change(function () {
        if ($(this).is(":checked")) {

            $(this).attr("checked");
        }
    });

});

/**
 * Get all nurses data from the controller and add it to the datatable
 * @version 2019-01-29
 * @author LJ Roa
 */
function getAllNursesAndAddItToTheTable() {
    $('#nurses-masterlist-table').dataTable().fnDestroy();

    var table = $('#nurses-masterlist-table').dataTable({


        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax: {

            url: BASE_URL + 'Nurses/GetAllNurses',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }

    });
//
//    $('#nurses-masterlist-table_filter input').unbind();
//    $('#nurses-masterlist-table_filter input').bind('keyup', function (e) {
//        if (e.keyCode == 13)
//        {
//            table.fnFilter(this.value);
//        }
//    });
}

/**
 * Showing the add nurses modal that has the nurses forms
 * @version 2019-01-29
 * @author LJ Roa
 */
function showAddNursesModal() {
    $('#addnursesmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#savebutton').removeClass('d-none');
    $('#updatebutton').addClass('d-none');

    $('.addnurse_title').removeClass('d-none');
    $('.edtnurse_title').addClass('d-none');
    
    $('.nav-tabs a[href="#nurprof"]').tab('show');
}

function addNurses() {
    var allowIsChecked = false;

    //Check if allowadmission is clicked/checked
    if ($('#allowadmission').is(":checked"))
    {
        allowIsChecked = true;
    } else {
        allowIsChecked = false;
    }

    var allowAdmission;

    if (allowIsChecked == true) {
        allowAdmission = 1;
    } else {
        allowAdmission = 0;
    }

    var lastName = $('#lastname').val();
    var firstName = $('#firstname').val();
    var hospCode = $('#hospcode').val();
    var address = $('#address').val();
    var licenseNumber = $('#licensenumber').val();
    var profType = $('#proftype').val();
    var accountId = $('#accountid').val();
    var accountName = $('#accountname').val();

    $.ajax({
        type: 'POST',
        data: {
            lastName: lastName, firstName: firstName,
            hospCode: hospCode, address: address,
            licenseNumber: licenseNumber, profType: profType,
            allowAdmission: allowAdmission, accountId: accountId,
            accountName: accountName
        },
        dataType: 'json',
        url: BASE_URL + 'Nurses/AddNurses',
        success: function (result) {
            if (result.status == false) { //If data is failed to saved

                //Check every field if has error
                checkFieldValidations(result.errors.lastname, 'lastnameerror', 'lastname');
                checkFieldValidations(result.errors.licensenumber, 'licensenumbererror', 'licensenumber');
                checkFieldValidations(result.errors.firstname, 'firstnameerror', 'firstname');
                checkFieldValidations(result.errors.address, 'addresserror', 'address');

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
        }
    });
}

/**
 * Get the selected data that needs to be edited and send the doc code the nurses controller.
 * @param {int} code = The variable that the table will identify to get its data
 * @version 2019-01-30
 * @author LJ Roa
 */
function editNurses(code) {

    $.ajax
    ({

        type: 'POST',
        data: {code: code},
        url: BASE_URL + 'Nurses/SearchSelectedNurses',
        dataType: 'json'
    })
    .done(function (result)
    {
        showAddNursesModal(); //Show the modal form
        $('#savebutton').addClass('d-none');
        $('#updatebutton').removeClass('d-none');

        $('.addnurse_title').addClass('d-none');
        $('.edtnurse_title').removeClass('d-none');

        $('.nav-tabs a[href="#nurprof"]').tab('show');

        $('#doccd').val(result[0].doccd);
        $('#lastname').val(result[0].doclname);
        $('#firstname').val(result[0].docfname);
        $('#hospcode').val(result[0].doccode);
        $('#address').val(result[0].adrs);
        $('#licensenumber').val(result[0].PTR);
        $('#proftype').val(result[0].proftype);
//        $('#admission').css('checked');
        //If admit allow = 0 then checkbox is not check else checked
//        if (result[0].admitallow == 0) {
//            $('#allowadmission').prop('checked', false);
//        } else {
//            $('#allowadmission').prop('checked', true);
//        }


    });

}

/**
 * Send all the new data to the nurses controller to be updated.
 * @version 2019-01-30
 * @author LJ Roa
 */
function updateNurses() {
    var allowIsChecked = false;

    //Check if allowadmission is clicked/checked
    if ($('#allowadmission').is(":checked"))
    {
        allowIsChecked = true;
    } else {
        allowIsChecked = false;
    }

    var allowAdmission;

    if (allowIsChecked == true) {
        allowAdmission = 1;
    } else {
        allowAdmission = 0;
    }

    var code = $('#doccd').val();
    var lastName = $('#lastname').val();
    var firstName = $('#firstname').val();
    var hospCode = $('#hospcode').val();
    var address = $('#address').val();
    var licenseNumber = $('#licensenumber').val();
    var profType = $('#proftype').val();
    var accountId = $('#accountid').val();
    var accountName = $('#accountname').val();

    swal({
        title: "Are you sure?",
        text: "Data will be change and you will not be able to recover it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
    }, function () {

        $.ajax({
            type: 'POST',
            data: {
                lastName: lastName, firstName: firstName,
                hospCode: hospCode, address: address,
                licenseNumber: licenseNumber, profType: profType,
                allowAdmission: allowAdmission, accountId: accountId,
                accountName: accountName, code: code
            },
            dataType: 'json',
            url: BASE_URL + 'Nurses/UpdateNurses',
            success: function (result) {
                if (result.status == false) { //If data is failed to saved

                    //Check every field if has error
                    checkFieldValidations(result.errors.lastname, 'lastnameerror', 'lastname');
                    checkFieldValidations(result.errors.licensenumber, 'licensenumbererror', 'licensenumber');
                    checkFieldValidations(result.errors.firstname, 'firstnameerror', 'firstname');
                    checkFieldValidations(result.errors.address, 'addresserror', 'address');

                } else { //If success

                    swal({
                        title: "Success!",
                        text: "Record is successfully updated!",
                        type: "success",
                        allowOutsideClick: false

                    }, function () {
                        location.reload();
                    });

                }
            }
        });
    });
}

/**
 * Send the selected code to the controller and use it to delete the selected data.
 * @param {int} code = selected data row
 * @version 2019-01-30
 * @author LJ Roa
 */
function deleteNurses(code) {

    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the selected record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
    }, function () {

        $.ajax({

            type: 'POST',
            data: {code: code},
            url: BASE_URL + 'Nurses/DeleteNurses',
            dataType: 'json'

        }).done(function (result) {
            swal({
                title: "Success!",
                text: "Record is successfully deleted!",
                type: "success",
                allowOutsideClick: false

            }, function () {
                location.reload();
            });
        });

    });

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
 * Auto generate a nursescode
 * @version 2019-01-29
 * @author LJ Roa
 */
function generateNursesCode() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Nurses/GenerateNursesCode'
    }).done(function (result) {
        var docCode = result[0].doccode;

        var splitDoccode = docCode.split('N');

        var convertDocCodeToInt = parseInt(splitDoccode[1]);

        var incrementDocCode = convertDocCodeToInt + 1;

        $('#hospcode').val('PFRN' + incrementDocCode);

    });
}

/**
 * Hide the nuses form modal
 * @version 2019-02-14
 * @author LJ Roa
 */
function hideNursesModal() {
    $('#addnursesmodal').modal('hide');
    clearAllNursesFields();

}

/**
 * Clear/Empty the nurses form fields
 * @version 2019-02-14
 * @author LJ Roa
 */
function clearAllNursesFields() {

    $('#firstname').val('');
    $('#lastname').val('');
    $('#hospcode').val('');
    $('#address').val('');
    $('#licensenumber').val('');
    $('#savebutton').removeClass('d-none');
    $('#updatebutton').addClass('d-none');
    generateNursesCode();

}

///**
// * Highlight the tabs selected in the navbar.
// * @version 2019-01-31
// * @author LJ Roa
// */
//function highlightTabs() {
//    $('#tools-tab').addClass('active');
//    $('#Tools').addClass('active');
//    $('#nurses').addClass('active-marker');
//}

function tabsHighlightForNurses()
{
    $("#managesidetab").addClass("active");
    $('#manageanchor').click();
    $("#nurseliid").css("font-weight","bold");
}