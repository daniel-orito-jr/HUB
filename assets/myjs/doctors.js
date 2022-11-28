var docmanage_table = null;

$(function () {
//    highlightTabs(); //Load function after browser load

    getAllDoctorsAndAddItToTheTable();
    generateDoctorsCode();
    
    tabsHighlightForDoctors();

    $('#doctorimguploadbtn').click(function () {
        $('#opendoctorimgupload').trigger('click');
    });

    $('#clinicimgupload').click(function () {
        $('#openclinicimgupload').trigger('click');
    });

    $('#selectslcodeipdbutton').click(function () {
        $('#coaipd').val(selectedSLCode[2]);
        hideSLCodeModal();
    });

    $('#selectslcodeopdbutton').click(function () {
        $('#coaopd').val(selectedSLCode[2]);
        hideSLCodeModal();
    });

});


/**
 * Get data from the controller and add it to the datatable
 * @version 2019-01-17
 * @author LJ Roa
 */
function getAllDoctorsAndAddItToTheTable() 
{
    docmanage_table = $('#doctors-masterlist-table').DataTable({


        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax: {

            url: BASE_URL + 'Doctors/GetAllDoctors',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }

    });
}

/**
 * Showing the add doctors modal that has the doctors forms
 * @version 2019-01-17
 * @author LJ Roa
 */
function showAddDoctorsModal() {
    $('#adddoctorsmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
//
//    $('#doctorimgupload').attr('src', 'http://192.168.2.100:3777/HUBv19/assets/images/doctor.png');
//    $('#clinicimgupload').attr('src', 'http://192.168.2.100:3777/HUBv19/assets/images/hospital.png');
    
    $('#savebutton').removeClass('d-none');
    $('#updatebutton').addClass('d-none');

    $('.adddoctor_title').removeClass('d-none');
    $('.edtdoctor_title').addClass('d-none');
    
    $('.nav-tabs a[href="#docprof"]').tab('show');
}

/**
 * Serialize the form and pass it to the controller using ajax.
 * @version 2019-01-17
 * @author LJ Roa
 */
function imgupload() 
{
    if ($('#opendoctorimgupload').val() == '') 
    {
        swal
        ({
            title: "WARNING!",
            text: "Please choose a doctor photo!",
            type: "warning",
            allowOutsideClick: false
        });
    }
    else 
    {
        var doctorImage = $('#opendoctorimgupload').prop('files')[0];
        var extension = doctorImage.name.substr((doctorImage.name.lastIndexOf('.') + 1));


        var form_data = new FormData();
        form_data.append("file", doctorImage, $('#doccode').val() + 'd.' + extension);

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Uploads/UploadDoctorImage",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json'
        });
        
        if ($('#openclinicimgupload').val() == '') 
        {
            swal
            ({
                title: "WARNING!",
                text: "Please choose a clinic photo!",
                type: "warning",
                allowOutsideClick: false
            });
        } 
        else
        {
            var clinicImage = $('#openclinicimgupload').prop('files')[0];
            var extension = clinicImage.name.substr((clinicImage.name.lastIndexOf('.') + 1));

            var form_data = new FormData();
            form_data.append("file", clinicImage, $('#doccode').val() + 'c.' + extension);

            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Uploads/UploadClinicImage",
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                dataType: 'json'
            });
            
            addDoctors();
        }
    }
}
    
function addDoctors()
{
    var docCode = $('#doccode').val();
    var tax = $('#tax').val();
    var licenseNumber = $('#licensenumber').val();
    var ptrNo = $('#ptrno').val();
    var s2No = $('#s2no').val();
    var phicNo = $('#phicno').val();
    var tin = $('#tin').val();
    var phicEnable = $('#phicenable').val();
    var phicRate = $('#phicrate').val();
    var pfRate = $('#pfrate').val();
    var coaOPD = $('#coaopd').val();
    var coaIPD = $('#coaipd').val();
    var accountNo = $('#accountno').val();
    var firstName = $('#firstname').val();
    var lastName = $('#lastname').val();
    var middleName = $('#middlename').val();
    var suffix = $('#suffix').val();
    var title = $('#title').val();
    var docName = $('#docname').val();
    var address = $('#address').val();
    var professionType = $('#professiontype').val();
    var hospitalOR = $('#hospitalor').val();
    var accountId = $('#accountid').val();
    var accountName = $('#accountname').val();
    var expertise = $('#expertise').val();
    var profGroup = $('#profgroup').val();
    var schedule = $('#schedule').val();
    var biodata = $('#biodata').val();
    var otherInformation = $('#otherinformation').val();
    var clinicRoom = $('#clinicroom').val();

    $.ajax({

        type: 'POST',
        data: {
            docCode: docCode, tax: tax, licenseNumber: licenseNumber,
            ptrNo: ptrNo, s2No: s2No, phicNo: phicNo, tin: tin,
            phicEnable: phicEnable, phicRate: phicRate, pfRate: pfRate,
            coaOPD: coaOPD, coaIPD: coaIPD, accountNo: accountNo,
            firstName: firstName, lastName: lastName, middleName: middleName,
            suffix: suffix, title: title, docName: docName, address: address,
            professionType: professionType, hospitalOR: hospitalOR,
            accountId: accountId, accountName: accountName, expertise: expertise,
            profGroup: profGroup, schedule: schedule, biodata: biodata,
            otherInformation: otherInformation, clinicRoom: clinicRoom
        },
        url: BASE_URL + 'Doctors/AddDoctors',
        dataType: 'json',
        success: function (result) {
            if (result.status == false) 
            {
                swal
                ({
                    title: "WARNING!",
                    text: "Some field requires your attention!",
                    type: "warning",
                    allowOutsideClick: false
                });
                
                checkFieldValidations(result.errors.tax, 'taxerror', 'tax');
                checkFieldValidations(result.errors.licensenumber, 'licensenumbererror', 'licensenumber');
                checkFieldValidations(result.errors.ptrno, 'ptrnoerror', 'ptrno');
                checkFieldValidations(result.errors.s2no, 's2noerror', 's2no');
                checkFieldValidations(result.errors.phicno, 'phicnoerror', 'phicno');
                checkFieldValidations(result.errors.tin, 'tinerror', 'tin');
                checkFieldValidations(result.errors.phicrate, 'phicrateerror', 'phicrate');
                checkFieldValidations(result.errors.pfrate, 'pfrateerror', 'pfrate');
                checkFieldValidations(result.errors.coaopd, 'coaopderror', 'coaopd');
                checkFieldValidations(result.errors.coaipd, 'coaipderror', 'coaipd');
                checkFieldValidations(result.errors.accountno, 'accountnoerror', 'accountno');
                checkFieldValidations(result.errors.firstname, 'firstnameerror', 'firstname');
                checkFieldValidations(result.errors.lastname, 'lastnameerror', 'lastname');
                checkFieldValidations(result.errors.middlename, 'middlenameerror', 'middlename');
                checkFieldValidations(result.errors.title, 'titleerror', 'title');
                checkFieldValidations(result.errors.docname, 'docnameerror', 'docname');
                checkFieldValidations(result.errors.address, 'addresserror', 'address');

            } 
            else
            { 
                hideDoctorsModal();
                
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully saved!",
                    type: "success",
                    allowOutsideClick: false
                }, 
                function () 
                {
                    clearerrors();
                    
                    docmanage_table.ajax.reload();
                    $('#doctors-masterlist-table_filter [type="search"]').val(docCode);
                    $('#doctors-masterlist-table_filter [type="search"]').focus();
                    docmanage_table.search(docCode).draw();
                });
            }
        }
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
 * Get the selected data that needs to be edited and send the doc code the doctors controller.
 * @param {int} docCode = The variable that the table will identify to get its data
 * @version 2019-01-17
 * @author LJ Roa
 */
function editDoctors(docCode) {

    $.ajax({

        type: 'POST',
        data: {docCode: docCode},
        url: BASE_URL + 'Doctors/SearchSelectedDoctors',
        dataType: 'json'
    }).done(function (result) {

        showAddDoctorsModal(); //Show the modal form
        


        $('#savebutton').addClass('d-none');
        $('#updatebutton').removeClass('d-none');
        
        $('.adddoctor_title').addClass('d-none');
        $('.edtdoctor_title').removeClass('d-none');

        //Add all the result values to the specified form
        $('#doccd').val(result[0].doccd);
        $('#tax').val(result[0].tax);
        $('#licensenumber').val(result[0].Licno);
        $('#ptrno').val(result[0].PTR);
        $('#s2no').val(result[0].S2no);
        $('#phicno').val(result[0].phicno);
        $('#tin').val(result[0].tin);
        $('#phicenable').val(result[0].phicenable);
        $('#phicrate').val(result[0].phicrate);
        $('#pfrate').val(result[0].pfrate);
        $('#coaopd').val(result[0].coaOPD);
        $('#coaipd').val(result[0].coaIPD);
        $('#accountno').val(result[0].accountno);
        $('#firstname').val(result[0].docfname);
        $('#lastname').val(result[0].doclname);
        $('#middlename').val(result[0].docmname);
        $('#suffix').val(result[0].suffix);
        $('#title').val(result[0].titlename);
        $('#docname').val(result[0].docname);
        $('#address').val(result[0].adrs);
        $('#professiontype').val(result[0].proftype);
        $('#hospitalor').val(result[0].issuehospOR);
        $('#doccode').val(result[0].doccode);
        
        $('#biodata').val(result[0].biodata);
        $('#otherinformation').val(result[0].otherinfo);
        $('#clinicroom').val(result[0].clinicroom);
        $('#schedule').val(result[0].clinichours);


        $.ajax({
            url: BASE_URL + 'assets/images/uploads/doctors/' + result[0].doccode + 'd.jpg',
            type: 'HEAD',

            success: function ()
            {
                $('#doctorimgupload').attr('src', BASE_URL + 'assets/images/uploads/doctors/' + result[0].doccode + 'd.jpg');
            }
        });

        $.ajax({
            url: BASE_URL + 'assets/images/uploads/clinics/' + result[0].doccode + 'c.jpg',
            type: 'HEAD',

            success: function ()
            {
                $('#clinicimgupload').attr('src', BASE_URL + 'assets/images/uploads/clinics/' + result[0].doccode + 'c.jpg');
            }
        });


    });

}

/**
 * Send all the new data to the controller to be updated.
 * @version 2019-01-17
 * @author LJ Roa
 */
function updateDoctors() {

    var doccd = $('#doccd').val();
    var docCode = $('#doccode').val();
    var tax = $('#tax').val();
    var licenseNumber = $('#licensenumber').val();
    var ptrNo = $('#ptrno').val();
    var s2No = $('#s2no').val();
    var phicNo = $('#phicno').val();
    var tin = $('#tin').val();
    var phicEnable = $('#phicenable').val();
    var phicRate = $('#phicrate').val();
    var pfRate = $('#pfrate').val();
    var coaOPD = $('#coaopd').val();
    var coaIPD = $('#coaipd').val();
    var accountNo = $('#accountno').val();
    var firstName = $('#firstname').val();
    var lastName = $('#lastname').val();
    var middleName = $('#middlename').val();
    var suffix = $('#suffix').val();
    var title = $('#title').val();
    var docName = $('#docname').val();
    var address = $('#address').val();
    var professionType = $('#professiontype').val();
    var hospitalOR = $('#hospitalor').val();
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
                docCode: docCode, tax: tax, licenseNumber: licenseNumber,
                ptrNo: ptrNo, s2No: s2No, phicNo: phicNo, tin: tin,
                phicEnable: phicEnable, phicRate: phicRate, pfRate: pfRate,
                coaOPD: coaOPD, coaIPD: coaIPD, accountNo: accountNo,
                firstName: firstName, lastName: lastName, middleName: middleName,
                suffix: suffix, title: title, docName: docName, address: address,
                professionType: professionType, hospitalOR: hospitalOR,
                accountId: accountId, accountName: accountName, doccd: doccd
            },
            url: BASE_URL + 'Doctors/UpdateDoctors',
            dataType: 'json',
            success: function (result) {

                if (result.status == false) { //If data is failed to saved

                    //Check every field if has error
                    checkFieldValidations(result.errors.tax, 'taxerror', 'tax');
                    checkFieldValidations(result.errors.licensenumber, 'licensenumbererror', 'licensenumber');
                    checkFieldValidations(result.errors.ptrno, 'ptrnoerror', 'ptrno');
                    checkFieldValidations(result.errors.s2no, 's2noerror', 's2no');
                    checkFieldValidations(result.errors.phicno, 'phicnoerror', 'phicno');
                    checkFieldValidations(result.errors.tin, 'tinerror', 'tin');
                    checkFieldValidations(result.errors.phicrate, 'phicrateerror', 'phicrate');
                    checkFieldValidations(result.errors.pfrate, 'pfrateerror', 'pfrate');
                    checkFieldValidations(result.errors.coaopd, 'coaopderror', 'coaopd');
                    checkFieldValidations(result.errors.coaipd, 'coaipderror', 'coaipd');
                    checkFieldValidations(result.errors.accountno, 'accountnoerror', 'accountno');
                    checkFieldValidations(result.errors.firstname, 'firstnameerror', 'firstname');
                    checkFieldValidations(result.errors.lastname, 'lastnameerror', 'lastname');
                    checkFieldValidations(result.errors.middlename, 'middlenameerror', 'middlename');
                    checkFieldValidations(result.errors.title, 'titleerror', 'title');
                    checkFieldValidations(result.errors.docname, 'docnameerror', 'docname');
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
 * Send the selected doccode to the controller and use it to delete the selected data.
 * @param {int} docCode = selected data row
 * @version 2019-01-17
 * @author LJ Roa
 */
function deleteDoctors(docCode) {

    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the selected record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
    }, function () {
        $.ajax({

            type: 'POST',
            data: {docCode: docCode},
            url: BASE_URL + 'Doctors/DeleteDoctors',
            dataType: 'json'
        }).done(function (result) {
            if (result == false) {
                swal("Error!", "Record was not deleted", "error");
            } else {
                swal({
                    title: "Success!",
                    text: "Record is successfully deleted!",
                    type: "success",
                    allowOutsideClick: false

                }, function () 
                {
                    docmanage_table.ajax.reload();
                });
            }

        });
    });



}

/**
 * Clear all the fields value.
 * @version 2019-01-17
 * @author LJ Roa
 */
function clearAllDoctorsFields() {
    $('#tax').val('');
    $('#licensenumber').val('');
    $('#ptrno').val('');
    $('#s2no').val('');
    $('#phicno').val('');
    $('#tin').val('');
    $('#phicenable').val('');
    $('#phicrate').val('');
    $('#pfrate').val('');
    $('#coaopd').val('');
    $('#coaipd').val('');
    $('#accountno').val('');
    $('#firstname').val('');
    $('#lastname').val('');
    $('#middlename').val('');
    $('#suffix').val('');
    $('#title').val('');
    $('#docname').val('');
    $('#address').val('');
    $('#professiontype').val('');
    $('#hospitalor').val('');
    $('#doccode').val('');
    $('#biodata').val('');
    $('#otherinformation').val('');
    $('#clinicroom').val('');
    $('#schedule').val('');

    generateDoctorsCode();
}

/**
 * Auto generate a doctorscode
 * @version 2019-01-17
 * @author LJ Roa
 */
function generateDoctorsCode() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Doctors/GenerateDoctorsCode'
    }).done(function (result) {
        var docCode = result[0].doccode;

        var splitDoccode = docCode.split('D');

        var convertDocCodeToInt = parseInt(splitDoccode[1]);

        var incrementDocCode = convertDocCodeToInt + 1;

        $('#doccode').val('PFMD' + incrementDocCode);

    });
}

/**
 * Hide the doctors form modal
 * @version 2019-02-14
 * @author LJ Roa
 */
function hideDoctorsModal() {
    $('#adddoctorsmodal').modal('hide');
    clearAllDoctorsFields();
}

/**
 * Highlight the tabs selected in the navbar.
 * @version 2019-01-31
 * @author LJ Roa
 */
function highlightTabs() {
    $('#tools-tab').addClass('active');
    $('#Tools').addClass('active');
    $('#doctors').addClass('active-marker');
}

/**
 * Read the image url and change the image picture
 * @version 2019-02-20
 * @author LJ Roa
 */
function readImageURL(selectedFiles, img) 
{
    if (selectedFiles.files && selectedFiles.files[0]) 
    {
        var reader = new FileReader();
        reader.onload = function (e)
        {
            $('#' + img)
                    .attr('src', e.target.result)
                    .width(87)
                    .height(87);
        };
        reader.readAsDataURL(selectedFiles.files[0]);
    }
}


function clearerrors()
{
    $('#tax').css('border-color', '');
    $('#licensenumber').css('border-color', '');
    $('#ptrno').css('border-color', '');
    $('#s2no').css('border-color', '');
    $('#phicno').css('border-color', '');
    $('#tin').css('border-color', '');
    $('#phicenable').css('border-color', '');
    $('#phicrate').css('border-color', '');
    $('#pfrate').css('border-color', '');
    $('#coaopd').css('border-color', '');
    $('#coaipd').css('border-color', '');
    $('#accountno').css('border-color', '');
    $('#firstname').css('border-color', '');
    $('#lastname').css('border-color', '');
    $('#middlename').css('border-color', '');
    $('#suffix').css('border-color', '');
    $('#title').css('border-color', '');
    $('#docname').css('border-color', '');
    $('#address').css('border-color', '');
    $('#professiontype').css('border-color', '');
    $('#hospitalor').css('border-color', '');
    $('#doccode').css('border-color', '');
    $('#biodata').css('border-color', '');
    $('#otherinformation').css('border-color', '');
    $('#clinicroom').css('border-color', '');
    $('#schedule').css('border-color', '');
    
    $('#taxerror').attr('hidden', true);
    $('#licensenumbererror').attr('hidden', true);
    $('#ptrnoerror').attr('hidden', true);
    $('#s2noerror').attr('hidden', true);
    $('#phicnoerror').attr('hidden', true);
    $('#tinerror').attr('hidden', true);
    $('#phicenableerror').attr('hidden', true);
    $('#phicrateerror').attr('hidden', true);
    $('#pfrateerror').attr('hidden', true);
    $('#coaopderror').attr('hidden', true);
    $('#coaipderror').attr('hidden', true);
    $('#accountnoerror').attr('hidden', true);
    $('#firstnameerror').attr('hidden', true);
    $('#lastnameerror').attr('hidden', true);
    $('#middlenameerror').attr('hidden', true);
    $('#suffixerror').attr('hidden', true);
    $('#titleerror').attr('hidden', true);
    $('#docnameerror').attr('hidden', true);
    $('#addresserror').attr('hidden', true);
    $('#professiontypeerror').attr('hidden', true);
    $('#hospitalorerror').attr('hidden', true);
    $('#doccodeerror').attr('hidden', true);
    $('#biodataerror').attr('hidden', true);
    $('#otherinformationerror').attr('hidden', true);
    $('#clinicroomerror').attr('hidden', true);
    $('#scheduleerror').attr('hidden', true);
}


function tabsHighlightForDoctors()
{
    $("#managesidetab").addClass("active");
    $('#manageanchor').click();
    $("#doctrliid").css("font-weight","bold");
}