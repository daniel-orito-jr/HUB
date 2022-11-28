$(function () {
    getRooms();
    generateRoomsCode();
    
    tabsHighlightForRooms();
});

/* 
 * @version 01-18-2019
 * @author: Reymar S. Putian
 * @function discription: display rooms using dataTables
 */


function getRooms() {
    $('#rooms-masterlist-table').dataTable().fnDestroy();

    var table = $('#rooms-masterlist-table').dataTable({

        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax: {

            url: BASE_URL + 'Rooms/DisplayRooms',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }

    });
}

/**
 * Showing the add rooms modal that has the rooms forms
 * @version 2019-01-30
 * @author LJ Roa
 */
function showAddRoomsModal()
{
    $('#addroomsmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#savebutton').removeClass('d-none');
    $('#updatebutton').addClass('d-none');

    $('.addnurse_title').removeClass('d-none');
    $('.edtnurse_title').addClass('d-none');

    $('.nav-tabs a[href="#roominfo"]').tab('show');
}

/**
 * Process all the information from the form and pass it to the rooms controller using ajax.
 * @version 2019-01-30
 * @author LJ Roa
 */
function addRooms() {
    var perDayIsChecked = false;

    //Check if allowadmission is clicked/checked
    if ($('#perday').is(":checked"))
    {
        perDayIsChecked = true;
    } else {
        perDayIsChecked = false;
    }

    var perDay;

    if (perDayIsChecked == true) {
        perDay = 1;
    } else {
        perDay = 0;
    }

    var roomsType = $('#roomstype').val();
    var roomsName = $('#roomsname').val();
    var bedNo = $('#bedno').val();
    var description = $('#description').val();
    var roomsCode = $('#roomscode').val();
    var roomsRate = $('#roomsrate').val();
    var creditMaximum = $('#creditmaximum').val();
    var station = $('#station').val();
    var phicRoomsType = $('#phicroomstype').val();
    var nursingServices = $('#nursingservices').val();
    var accountId = $('#accountid').val();
    var accountName = $('#accountname').val();

    $.ajax({
        type: 'POST',
        data: {
            roomsType: roomsType, roomsName: roomsName,
            bedNo: bedNo, description: description,
            roomsCode: roomsCode, roomsRate: roomsRate,
            perDay: perDay, accountId: accountId, creditMaximum: creditMaximum,
            station: station, phicRoomsType: phicRoomsType,
            nursingServices: nursingServices, accountName: accountName
        },
        dataType: 'json',
        url: BASE_URL + 'Rooms/AddRooms',
        success: function (result) {
            if (result.status == false) { //If data is failed to saved

                //Check every field if has error
                checkFieldValidations(result.errors.roomsname, 'roomsnameerror', 'roomsname');
                checkFieldValidations(result.errors.bedno, 'bednoerror', 'bedno');
                checkFieldValidations(result.errors.description, 'descriptionerror', 'description');
                checkFieldValidations(result.errors.creditmaximum, 'creditmaximumerror', 'creditmaximum');
                checkFieldValidations(result.errors.nursingservices, 'nursingserviceserror', 'nursingservices');
                checkFieldValidations(result.errors.roomsrate, 'roomsrateerror', 'roomsrate');

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
 * Get the selected data that needs to be edited and send the doc code the rooms controller.
 * @param {int} code = The variable that the table will identify to get its data
 * @version 2019-01-31
 * @author LJ Roa
 */
function editRooms(code) {

    $.ajax({

        type: 'POST',
        data: {code: code},
        url: BASE_URL + 'Rooms/SearchSelectedRooms',
        dataType: 'json'
    }).done(function (result) {
        showAddRoomsModal(); //Show the modal form
    
        $('#savebutton').addClass('d-none');
        $('#updatebutton').removeClass('d-none');

        $('.addnurse_title').addClass('d-none');
        $('.edtnurse_title').removeClass('d-none');

        $('.nav-tabs a[href="#roominfo"]').tab('show');

        //Add all the result values to the specified form
        $('#doccd').val(result[0].rmid);
        $('#roomstype').val(result[0].rmtype);
        $('#roomsname').val(result[0].rmno);
        $('#bedno').val(result[0].rmbed);
        $('#description').val(result[0].rmdscr);
        $('#roomscode').val(result[0].rmcode);
        $('#roomsrate').val(result[0].rmrate);
        $('#creditmaximum').val(result[0].crmaxlimit);
        $('#station').val(result[0].stationname);
        $('#phicroomstype').val(result[0].RmPHICtype);
        $('#nursingservices').val(result[0].nursing);
//        $('#admission').css('checked');
        //If admit allow = 0 then checkbox is not check else checked
//        if (result[0].admitallow == 0) {
//            $('#perday').prop('checked', false);
//        } else {
//            $('#perday').prop('checked', true);
//        }


    });

}

/**
 * Send all the new data to the rooms controller to be updated.
 * @version 2019-01-31
 * @author LJ Roa
 */
function updateRooms() {
    var perDayIsChecked = false;

    //Check if allowadmission is clicked/checked
    if ($('#perday').is(":checked"))
    {
        perDayIsChecked = true;
    } else {
        perDayIsChecked = false;
    }

    var perDay;

    if (perDayIsChecked == true) {
        perDay = 1;
    } else {
        perDay = 0;
    }

    var code = $('#doccd').val();
    var roomsType = $('#roomstype').val();
    var roomsName = $('#roomsname').val();
    var bedNo = $('#bedno').val();
    var description = $('#description').val();
    var roomsCode = $('#roomscode').val();
    var roomsRate = $('#roomsrate').val();
    var creditMaximum = $('#creditmaximum').val();
    var station = $('#station').val();
    var phicRoomsType = $('#phicroomstype').val();
    var nursingServices = $('#nursingservices').val();
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
                roomsType: roomsType, roomsName: roomsName,
                bedNo: bedNo, description: description,
                roomsCode: roomsCode, roomsRate: roomsRate,
                perDay: perDay, accountId: accountId, creditMaximum: creditMaximum,
                station: station, phicRoomsType: phicRoomsType,
                nursingServices: nursingServices, accountName: accountName,
                code: code
            },
            dataType: 'json',
            url: BASE_URL + 'Rooms/UpdateRooms',
            success: function (result) {
                if (result.status == false) { //If data is failed to saved

                    //Check every field if has error
                    checkFieldValidations(result.errors.roomsname, 'roomsnameerror', 'roomsname');
                    checkFieldValidations(result.errors.bedno, 'bednoerror', 'bedno');
                    checkFieldValidations(result.errors.description, 'descriptionerror', 'description');
                    checkFieldValidations(result.errors.creditmaximum, 'creditmaximumerror', 'creditmaximum');
                    checkFieldValidations(result.errors.nursingservices, 'nursingserviceserror', 'nursingservices');
                    checkFieldValidations(result.errors.roomsrate, 'roomsrateerror', 'roomsrate');

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
 * @version 2019-01-31
 * @author LJ Roa
 */
function deleteRooms(code) {

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
            url: BASE_URL + 'Rooms/DeleteRooms',
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
 * Auto generate a roomscode
 * @version 2019-01-30
 * @author LJ Roa
 */
function generateRoomsCode() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Rooms/GenerateRoomsCode'
    }).done(function (result) {
        var docCode = result[0].rmcode;

        var splitDoccode = docCode.split('D');

        var convertDocCodeToInt = parseInt(splitDoccode[1]);

        var incrementDocCode = convertDocCodeToInt + 1;

        $('#roomscode').val('RMBD' + incrementDocCode);

    });
}

/**
 * Clear all the fields value.
 * @version 2019-01-17
 * @author LJ Roa
 */
function clearAllRoomsFields() {
    $('#roomstype').val('');
    $('#roomsname').val('');
    $('#bedno').val('');
    $('#description').val('');
    $('#roomscode').val('');
    $('#roomsrate').val('');
    $('#creditmaximum').val('');
    $('#station').val('');
    $('#phicroomstype').val('');
    $('#nursingservices').val('');

    $('#savebutton').removeClass('d-none');
    $('#updatebutton').addClass('d-none');
    generateRoomsCode();
}

/**
 * Hide the doctors form modal
 * @version 2019-02-14
 * @author LJ Roa
 */
function hideRoomsModal() {
    $('#addroomsmodal').modal('hide');
    clearAllRoomsFields();

}


function tabsHighlightForRooms()
{
    $("#managesidetab").addClass("active");
    $('#manageanchor').click();
    $("#roomsliid").css("font-weight","bold");
}