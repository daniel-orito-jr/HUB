var prescription_table = null;
var prescribedmeds_table = null;
var doctors_table = null;
var extitems_table = null;
var inpatient_table = null;
var outpatient_table = null;
var counterforgenerictble = 1;
var counterforgenerictext = 1;
var counterfortbleprescriptions = 1;
var counterfortextprescriptions = 1;
var selectedInPatientForRXCreator;
var selectedOutPatientForRXCreator;
var selectedExternalItemForRXCreator;
var selectedPrescribedMedForRXCreator;

$(function () 
{   
    var searchdate = $('#inputid_searchdaterxc').val();
    
    $('#inputid_searchdaterxc').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    $('#inputid_birthdaterxc').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    $('#inputid_todaydaterxc').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    $('#doctorimguploadbtn').click(function ()
    {
        $('#opendoctorimgupload').trigger('click');
    });
    
    tabsHighlightForRXCreator();   
    
    getAllPrescriptionsInstructionsAndAddItToTheTable(searchdate);
    getAllExternalItemsListingAndAddItToTheTable();
    getAllOutpatientAndAddItToTheTable();
    getAllInpatientAndAddItToTheTable();
    getPrescribedMedsOrTestOrInstruction();
    getAllDoctorsAndAddItToTheTable();
    
    selectDoctor();
    selectInPatient();
    selectOutPatient();
    selectExternalItem();
    selectPrescribedMed();
    
    generateDoctorsCode();
    
    $('[data-toggle="tooltip"]').tooltip();
});

function tabsHighlightForRXCreator()
{
    $("#rxcreatormkrsidetab").addClass("active");
}

function getAllPrescriptionsInstructionsAndAddItToTheTable(searchdate)
{
    prescription_table = $('#prescription-instruction-masterlist-table').DataTable
    ({
        responsive: true,
        processing: true,
        serverSide: true,
        retrieve: true,
        destroy: true,
        order: [],
        language: 
        {
            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
        },
        ajax:
        {
            url: BASE_URL + 'RXcreatormaker/GetAllRXMasterlist',
            type: 'POST',
            data: {searchdatex: searchdate},
            dataType: 'json'
        },
        createdRow: function ( row, data, index )
        {
            $('td', row).eq(1).html(index+1);
        },
        initComplete: function (settings, json)
        {

        }
    });
    
//    prescription_table.columns([8]).visible(false);
}

function searxhrxmasterviadate()
{
    var searchdate = $('#inputid_searchdaterxc').val();
    
    prescription_table = $('#prescription-instruction-masterlist-table').DataTable();
    prescription_table.clear().destroy();
    getAllPrescriptionsInstructionsAndAddItToTheTable(searchdate);
}

function showCreateNewRxModalForRxCreatorMaker()
{
    $('#createnewrxmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('body').css('overflow', 'hidden');
    $('#createnewrxmodal').css('overflow-y', 'scroll');
    
    $('#hiddenid_rxoperationindicatorrxc').val("CREATE PRESCRIPTION");
    
    var counterforgenerictblevar = parseInt(counterforgenerictble) - parseInt(counterforgenerictble);
    counterforgenerictble = parseInt(counterforgenerictblevar) + 1;

    var counterforgenerictextvar = parseInt(counterforgenerictext) - parseInt(counterforgenerictext);
    counterforgenerictext = parseInt(counterforgenerictextvar) + 1;
    
    var dateforbatch = moment();
    var datecode = dateforbatch.format("MMDDYYYY");
    var numbrseq = "1234567890";
    
    var numbsplit = numbrseq.split("");
    var datesplit = datecode.split("");
    
    var shuffledate = shuffle(datesplit);
    var shufflenumb = shuffle(numbsplit);
    
    var finalformatdate = shuffledate.join('');
    var finalformatnumb = shufflenumb.join('');

    var finalformatnumbsplit = finalformatnumb.split("");
    var finalformatnumbval1 = finalformatnumbsplit[0];
    var finalformatnumbval2 = finalformatnumbsplit[1];
    var finalformatnumbval3 = finalformatnumbsplit[2];
    var finalformatnumbval4 = finalformatnumbsplit[3];
    var finalformatnumbval5 = finalformatnumbsplit[4];
    
    var finalformatnumbunite = finalformatnumbval1 + finalformatnumbval2 + finalformatnumbval3 + finalformatnumbval4 + finalformatnumbval5;

    $('#inputid_batchrxc').val(finalformatdate + finalformatnumbunite);
    
    $('#inputid_genericrxc').val("");
    $('#inputid_gen200rxc').val("");
    $('#inputid_instructrxc').val("");
    $('#inputid_quantityrxc').val("");
    $('#inputid_unitrxc').val("");

    $('#inputid_genericrxc').prop('disabled',true);
    $('#inputid_gen200rxc').prop('disabled',true);
    $('#inputid_instructrxc').prop('disabled',true);
    $('#inputid_quantityrxc').prop('disabled',true);
    $('#inputid_unitrxc').prop('disabled',true);

    $('#spanid_genericrxc').css('background','#e3e3e3');
    $('#buttonid_genericrxc').prop('disabled',true);  
    
    $('#hiddivid_hiddenfield').load(document.URL + ' #hiddivid_hiddenfield');
}

function hideCreateNewRxModalForRxCreatorMaker()
{
    swal
    ({
        title: "Are you sure?",
        text: "All elements from form will be set to default!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, pls. proceed!",
        cancelButtonText: "No",
        closeOnConfirm: true
    },
    function (isConfirm)
    {
        $(".confirm").attr('disabled', 'disabled'); 

        if (isConfirm)
        {   
            $('#createnewrxmodal').modal("hide");
            $('body').css('overflow', 'auto');
            
            setToDefaultCreateRXModal();
        }
    });
}

function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

  return array;
}

function createNewRxForRxCreatorOrMaker()
{
    var dateforbatch = moment();
    var datecode = dateforbatch.format("MMDDYYYY");
    var numbrseq = "1234567890";
    
    var numbsplit = numbrseq.split("");
    var datesplit = datecode.split("");
    
    var shuffledate = shuffle(datesplit);
    var shufflenumb = shuffle(numbsplit);
    
    var finalformatdate = shuffledate.join('');
    var finalformatnumb = shufflenumb.join('');

    var finalformatnumbsplit = finalformatnumb.split("");
    var finalformatnumbval1 = finalformatnumbsplit[0];
    var finalformatnumbval2 = finalformatnumbsplit[1];
    var finalformatnumbval3 = finalformatnumbsplit[2];
    var finalformatnumbval4 = finalformatnumbsplit[3];
    var finalformatnumbval5 = finalformatnumbsplit[4];
    
    var finalformatnumbunite = finalformatnumbval1 + finalformatnumbval2 + finalformatnumbval3 + finalformatnumbval4 + finalformatnumbval5;
    
    $('#inputid_batchrxc').val(finalformatdate + finalformatnumbunite);
    
    $('#inputid_batchrxc').val();
    $('#inputid_batchrxc').val();
    $('#inputid_batchrxc').val();
    $('#inputid_batchrxc').val();
    
}

function searchAttendingDoctorForRxCreatorOrMaker()
{
    alert("ONGOING!");
}

function getPrescribedMedsOrTestOrInstruction()
{
    prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable
    ({
        sScrollY: "100px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        searching: false,
        bPaginate: false,
        bFilter: false,
        bInfo: false,
        language: 
        {
            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
        },
        createdRow: function (row, data, dataIndex) 
        {
            $('td', row).eq(0).html(dataIndex+1);
        },
        initComplete: function (settings, json)
        {

        }
    });
}

//----------------Doctors Management------------------------------------------>
function showSearchDoctorModalForAdmission()
{
    $('#searchdoctorforRXmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#createnewrxmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#searchdoctorforRXmodal').css('overflow-y', 'scroll');
}

function hideSearchDoctorModalForAdmission()
{
    $('#searchdoctorforRXmodal').modal("hide");

    $('#createnewrxmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function getAllDoctorsAndAddItToTheTable()
{
    doctors_table = $('#doctors-masterlist2-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        language: 
        {
            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
        },
        ajax: 
        {
            url: BASE_URL + 'RXcreatormaker/GetAllDoctors',
            type: 'POST'
        },
        createdRow: function (row, data, dataIndex) 
        {
            
        },
        initComplete: function (settings, json)
        {

        }
    });

    doctors_table.on('dblclick', 'tr', function ()
    {
        var data = doctors_table.row(this).data();
        var doctordata = data[2] + ", " + data[1] + " " + data[3] + " - " + data[15];
        $('#inputid_attenddocrxc').val(doctordata.toUpperCase());
        hideSearchDoctorModalForAdmission();
    });
}

function showAddDoctorsModal()
{
    $('#adddoctorsmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#doctorimgupload').attr('src', 'http://192.168.2.100:3777/HUBv19/assets/images/doctor.png');
    $('#clinicimgupload').attr('src', 'http://192.168.2.100:3777/HUBv19/assets/images/hospital.png');

    $('#searchdoctormodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#adddoctorsmodal').css('overflow-y', 'scroll');
}

function hideDoctorsModal()
{
    $('#adddoctorsmodal').modal('hide');
    clearAllDoctorsFields();

    $('#searchdoctormodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
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

    $.ajax
    ({
        type: 'POST',
        data:
        {
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
        success: function (result) 
        {
            if (result.status == false)
            {
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
                $('#adddoctorsmodal').modal('hide');
                clearAllDoctorsFields();

                setTimeout(function ()
                {
                    swal
                    ({
                        title: "Success!",
                        text: "Record is successfully saved!",
                        type: "success",
                        allowOutsideClick: false,
                        confirmButtonText: "OK"
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $('#searchdoctormodal').modal
                            ({
                                show: true,
                                backdrop: 'static',
                                keyboard: false
                            });
                                    
                            $('#doctors-masterlist2-table').DataTable().ajax.reload();
                        }
                    });
                }, 1000);
            }
        }
    });
}

function editDoctors(docCode)
{
    $.ajax
    ({

        type: 'POST',
        data: {docCode: docCode},
        url: BASE_URL + 'Doctors/SearchSelectedDoctors',
        dataType: 'json'
    })
    .done(function (result)
    {
        showAddDoctorsModal();

        $('#savebutton').addClass('d-none');
        $('#updatebutton').removeClass('d-none');

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

        $.ajax
        ({
            url: BASE_URL + 'assets/images/uploads/doctors/' + result[0].doccode + 'd.jpg',
            type: 'HEAD',
            success: function ()
            {
                $('#doctorimgupload').attr('src', BASE_URL + 'assets/images/uploads/doctors/' + result[0].doccode + 'd.jpg');
            }
        });

        $.ajax
        ({
            url: BASE_URL + 'assets/images/uploads/clinics/' + result[0].doccode + 'c.jpg',
            type: 'HEAD',
            success: function ()
            {
                $('#clinicimgupload').attr('src', BASE_URL + 'assets/images/uploads/clinics/' + result[0].doccode + 'c.jpg');
            }
        });
    });
}

function updateDoctors() 
{
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
            success: function (result)
            {
                if (result.status == false)
                {
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
                    setTimeout(function ()
                    {
                        swal
                        ({
                            title: "Success!",
                            text: "Record is successfully updated!",
                            type: "success",
                            allowOutsideClick: false,
                            confirmButtonText: "OK"
                        },
                        function (isConfirm)
                        {
                            if (isConfirm)
                            {
                                hideDoctorsModal();
                            }
                        });
                    }, 1000);
                }
            }
        });
    });
}

function deleteDoctors(docCode)
{
    swal
    ({
        title: "Are you sure?",
        text: "You will not be able to recover the selected record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }, 
    function () 
    {
        $.ajax
        ({

            type: 'POST',
            data: {docCode: docCode},
            url: BASE_URL + 'Doctors/DeleteDoctors',
            dataType: 'json'
        })
        .done(function (result)
        {
            if (result === false) 
            {
                swal("Error!", "Record was not deleted", "error");
            }
            else
            {
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully deleted!",
                    type: "success",
                    allowOutsideClick: false
                });
                
                $('#doctors-masterlist2-table').DataTable().ajax.reload();
            }
        });
    });
}

function clearAllDoctorsFields()
{
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
    $('#suffix').val();
    $('#title').val('');
    $('#docname').val('');
    $('#address').val('');
    $('#professiontype').val('');
    $('#hospitalor').val('');
    $('#doccode').val('');
    $('#savebutton').removeClass('d-none');
    $('#updatebutton').addClass('d-none');
    generateDoctorsCode();
}

function generateDoctorsCode()
{
    $.ajax
    ({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Doctors/GenerateDoctorsCode'
    })
    .done(function (result)
    {
        var docCode = result[0].doccode;
        var splitDoccode = docCode.split('D');
        var convertDocCodeToInt = parseInt(splitDoccode[1]);
        var incrementDocCode = convertDocCodeToInt + 1;

        $('#doccode').val('PFMD' + incrementDocCode);
    });
}

function readImageURL(selectedFiles, img)
{
    if (selectedFiles.files && selectedFiles.files[0])
    {
        var reader = new FileReader();

        reader.onload = function (e)
        {
            $('#' + img).attr('src', e.target.result).width(87).height(87);
        };
        reader.readAsDataURL(selectedFiles.files[0]);
    }
}

function uploadDoctorImage()
{
    if ($('#opendoctorimgupload').val() === '')
    {
        alert('Empty');
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
        })
        .done(function (data) 
        {
            uploadClinicImage();
        });
    }
}

function uploadClinicImage()
{
    if ($('#openclinicimgupload').val() === '')
    {
        alert('Empty');
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
        })
        .done(function (data)
        {
            swal
            ({
                title: "Success!",
                text: "File Upload Successfully",
                type: "success",
                allowOutsideClick: false
            },
            function ()
            {

            });
        });
    }
}

function selectDoctor()
{
    var data;

    $('#doctors-masterlist2-table tbody').on('click', 'tr', function ()
    {
        $('#doctors-masterlist2-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
        $(this).addClass('bg-blue');

        var data = $('#doctors-masterlist2-table').DataTable().row('.bg-blue').data();
        selectedDoctor = data;
    });
}

function selectDoctorForAdmitPatient()
{
    var doctordata = selectedDoctor[2] + ", " + selectedDoctor[1] + " " + selectedDoctor[3] + " - " + selectedDoctor[15];
    $('#inputid_attenddocrxc').val(doctordata.toUpperCase());
    hideSearchDoctorModalForAdmission();
}

//----------------Patient Management------------------------------------------>
function searchPatientForRxCreatorOrMaker()
{
    var patienttype = $('#pxtyperxchiddentext').val();
    
    if(patienttype === "Inpatient")
    {
        showInpatientMasterlistForRxCreatorMaker();
    }
    else
    {
        showOutpatientMasterlistForRxCreatorMaker();
    }
}

function showOutpatientMasterlistForRxCreatorMaker()
{
    $('#outpatientlistforrxcreator').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#createnewrxmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#outpatientlistforrxcreator').css('overflow-y', 'scroll');
    
    outpatient_table.on('dblclick', 'tr', function ()
    {
        var data = outpatient_table.row(this).data();
        var patientname = data[1];
        var pxbirthdays = data[4];
        var patientgend = data[5];
        var patiaddress = data[6] + ", " + data[7];
        var doctornamex = data[8];
        var doctorrefno = data[9];

        hideOutpatientMasterlistForRxCreatorMaker();
        
        if(patientgend === "MALE" || patientgend === "Male")
        {
            $('#selectid_genderrxc').selectpicker('val',"MALE");
        }
        else
        {
            $('#selectid_genderrxc').selectpicker('val',"FEMALE");
        }

        $('#selectid_genderrxc').selectpicker('refresh');

        var ageofpatient = CalculateAge(pxbirthdays);

        $('#inputid_attenddocrxc').val(doctornamex + " - " + doctorrefno);
        $('#inputid_pxnamerxc').val(patientname);
        $('#inputid_birthdaterxc').val(pxbirthdays);
        $('#inputid_addressrxc').val(patiaddress);
        $('#inputid_agerxc').val(ageofpatient);
    });
}

function hideOutpatientMasterlistForRxCreatorMaker()
{
    $('#outpatientlistforrxcreator').modal("hide");

    $('#createnewrxmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function showInpatientMasterlistForRxCreatorMaker()
{
    $('#inpatientlistforrxcreator').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#createnewrxmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#inpatientlistforrxcreator').css('overflow-y', 'scroll');
    
    inpatient_table.on('dblclick', 'tr', function ()
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
            hideInpatientMasterlistForRxCreatorMaker();
            
            var fullname = data.inpatientlistdata['name'];
            var birthday = data.inpatientlistdata['bday'];
            var pxdoctor = data.inpatientlistdata['doctorname'] + " - " + data.inpatientlistdata['doctorid'];
            var fulladrs = data.inpatientlistdata['adrs'] + " " + 
                           data.inpatientlistdata['brgy'] + ", " +
                           data.inpatientlistdata['cityadd'] + " " +
                           data.inpatientlistdata['provadd'];
            var gendersx = data.inpatientlistdata['sex'];
            var casenumb = data.inpatientlistdata['caseno'];
            var admtdate = data.inpatientlistdata['admitdate'];
            var dschdate = data.inpatientlistdata['dischadate'];
            var roomrefr = data.inpatientlistdata['roombrief'];
            var casecode = data.inpatientlistdata['casecode'];
            var pinnumbr = data.inpatientlistdata['PIN'];

            $('#hiddenid_casenumrxc').val(casenumb);
            $('#hiddenid_admdaterxc').val(admtdate);
            $('#hiddenid_disdaterxc').val(dschdate);
            $('#hiddenid_roomrefrxc').val(roomrefr); 
            $('#hiddenid_casecodrxc').val(casecode);
            $('#hiddenid_PINnumbrxc').val(pinnumbr);
            
            if(gendersx === "MALE" || gendersx === "Male")
            {
                $('#selectid_genderrxc').selectpicker('val',"MALE");
            }
            else
            {
                $('#selectid_genderrxc').selectpicker('val',"FEMALE");
            }
            
            $('#selectid_genderrxc').prop('disabled',false);
            $('#inputid_pxnamerxc').prop('disabled',false);
            $('#inputid_birthdaterxc').prop('disabled',false);
            $('#inputid_addressrxc').prop('disabled',false);
            $('#inputid_attenddocrxc').prop('disabled',false);
            $('#selectid_genderrxc').selectpicker('refresh');
            
            var ageofpatient = CalculateAge(birthday);
            
            $('#inputid_attenddocrxc').val(pxdoctor);
            $('#inputid_pxnamerxc').val(fullname);
            $('#inputid_birthdaterxc').val(birthday);
            $('#inputid_addressrxc').val(fulladrs);
            $('#inputid_agerxc').val(ageofpatient);
        });
        
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "RXcreatormaker/getBalanceAndPaymentsMadeDataForRXCreatorFormDataImport",
            data: {casenox: caseno},
            dataType: 'json'
        })
        .done(function (data)
        {
            var balance = data.pxbalance_data['balance'];
            if(balance === "-0.00" || balance === null)
            {
                var zerobal1 = parseFloat("0.00");
                $('#inputid_balancerxc').val(zerobal1.toFixed(2));
            }
            else
            {
                $('#inputid_balancerxc').val(balance);
            }


            if(data.paymentstatus === true)
            {
                var payment = data.pxpayment_data['payment'];
                $('#inputid_paymentrxc').val(payment);
            }
            else
            {
                var zerobal2 = parseFloat("0.00");
                $('#inputid_paymentrxc').val(zerobal2.toFixed(2));
            }
        });
    });
}

function onChangeDateofBirthRXCreatorMaker()
{
    var ageofpatient = CalculateAge($('#inputid_birthdaterxc').val());
    $('#inputid_agerxc').val(ageofpatient);
}

function hideInpatientMasterlistForRxCreatorMaker()
{
    $('#inpatientlistforrxcreator').modal("hide");

    $('#createnewrxmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function getAllInpatientAndAddItToTheTable()
{
    var patientstatus = $("#hiddenboxid_patientstatrxc").val();
    var phclaimstatus = $("#hiddenboxid_phclaimstatrxc").val();
    
    inpatient_table = $('#inpatient-masterlist-table').DataTable
    ({
        sScrollY: "150px",
        sScrollX: "100%",
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
                patientstatus: patientstatus,
                phclaimstatus: phclaimstatus
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
}

function selectInPatient()
{
    var data;

    $('#inpatient-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#inpatient-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#inpatient-masterlist-table').DataTable().row('.bg-grey').data();
        selectedInPatientForRXCreator = data;
    });
}

function selectPatientForRXCreatorMaker()
{
    var caseno = selectedInPatientForRXCreator[2];
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
        data: {casenox: caseno},
        dataType: 'json'
    })
    .done(function (data)
    {
        hideInpatientMasterlistForRxCreatorMaker();

        var fullname = data.inpatientlistdata['name'];
        var birthday = data.inpatientlistdata['bday'];
        var pxdoctor = data.inpatientlistdata['doctorname'] + " - " + data.inpatientlistdata['doctorid'];
        var fulladrs = data.inpatientlistdata['adrs'] + " " + 
                       data.inpatientlistdata['brgy'] + ", " +
                       data.inpatientlistdata['cityadd'] + " " +
                       data.inpatientlistdata['provadd'];
        var gendersx = data.inpatientlistdata['sex'];
        var casenumb = data.inpatientlistdata['caseno'];
        var admtdate = data.inpatientlistdata['admitdate'];
        var dschdate = data.inpatientlistdata['dischadate'];
        var roomrefr = data.inpatientlistdata['roombrief'];
        var casecode = data.inpatientlistdata['casecode'];
        var pinnumbr = data.inpatientlistdata['PIN'];

        $('#hiddenid_casenumrxc').val(casenumb);
        $('#hiddenid_admdaterxc').val(admtdate);
        $('#hiddenid_disdaterxc').val(dschdate);
        $('#hiddenid_roomrefrxc').val(roomrefr); 
        $('#hiddenid_casecodrxc').val(casecode);
        $('#hiddenid_PINnumbrxc').val(pinnumbr);

        if(gendersx === "MALE" || gendersx === "Male")
        {
            $('#selectid_genderrxc').selectpicker('val',"MALE");
        }
        else
        {
            $('#selectid_genderrxc').selectpicker('val',"FEMALE");
        }

        $('#selectid_genderrxc').prop('disabled',false);
        $('#inputid_pxnamerxc').prop('disabled',false);
        $('#inputid_birthdaterxc').prop('disabled',false);
        $('#inputid_addressrxc').prop('disabled',false);
        $('#inputid_attenddocrxc').prop('disabled',false);
        $('#selectid_genderrxc').selectpicker('refresh');

        var ageofpatient = CalculateAge(birthday);

        $('#inputid_attenddocrxc').val(pxdoctor);
        $('#inputid_pxnamerxc').val(fullname);
        $('#inputid_birthdaterxc').val(birthday);
        $('#inputid_addressrxc').val(fulladrs);
        $('#inputid_agerxc').val(ageofpatient);
    });
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "RXcreatormaker/getBalanceAndPaymentsMadeDataForRXCreatorFormDataImport",
        data: {casenox: caseno},
        dataType: 'json'
    })
    .done(function (data)
    {
        var balance = data.pxbalance_data['balance'];
        if(balance === "-0.00" || balance === null)
        {
            var zerobal1 = parseFloat("0.00");
            $('#inputid_balancerxc').val(zerobal1.toFixed(2));
        }
        else
        {
            $('#inputid_balancerxc').val(balance);
        }

        if(data.paymentstatus === true)
        {
            var payment = data.pxpayment_data['payment'];
            $('#inputid_paymentrxc').val(payment);
        }
        else
        {
            var zerobal2 = parseFloat("0.00");
            $('#inputid_paymentrxc').val(zerobal2.toFixed(2));
        }
    });
}

function onChangeUnclaimStatusRadio()
{
    $('#hiddenboxid_phclaimstatrxc').val('UNCLAIM');

    inpatient_table = $('#inpatient-masterlist-table').DataTable();
    inpatient_table.clear().destroy();
    
    getAllInpatientAndAddItToTheTable();
}

function onChangeClaimStatusRadio()
{
    $('#hiddenboxid_phclaimstatrxc').val('CLAIM');

    inpatient_table = $('#inpatient-masterlist-table').DataTable();
    inpatient_table.clear().destroy();
    
    getAllInpatientAndAddItToTheTable();
}

function onChangeAdmittedStatusRadio()
{
    $('#hiddenboxid_patientstatrxc').val('ADMITTED');
    
    inpatient_table = $('#inpatient-masterlist-table').DataTable();
    inpatient_table.clear().destroy();
    
    getAllInpatientAndAddItToTheTable();
}

function onChangeDischargedStatusRadio()
{
    $('#hiddenboxid_patientstatrxc').val('DISCHARGED');
    
    inpatient_table = $('#inpatient-masterlist-table').DataTable();
    inpatient_table.clear().destroy();
    
    getAllInpatientAndAddItToTheTable();
}

function CalculateAge(birthdate)
{
    var mdate = birthdate.toString();
    var yearThen = parseInt(mdate.substring(0,4), 10);
    var monthThen = parseInt(mdate.substring(5,7), 10);
    var dayThen = parseInt(mdate.substring(8,10), 10);

    var today = new Date();
    var birthday = new Date(yearThen, monthThen-1, dayThen);
    var differenceInMilisecond = today.valueOf() - birthday.valueOf();

    var year_age = Math.floor(differenceInMilisecond / 31536000000);
    var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);

    if ((today.getMonth() === birthday.getMonth()) && (today.getDate() === birthday.getDate())) 
    {
        Swal.fire
        ({
            title: "HAPPY BIRTHDAY!",
            text: "From Your Drainwiz Family!",       
            imageUrl: BASE_URL + 'assets/images/happybday.webp',
            imageWidth: 300,
            imageHeight: 150,
            imageAlt: 'Custom image',
            animation: false,
            customClass: 
            {
                popup: 'animated tada'
            }
        });
    }

    var month_age = Math.floor(day_age/30);

    day_age = day_age % 30;

    var tMnt= (month_age + (year_age*12));
    var tDays =(tMnt*30) + day_age;
    
    var finalage = year_age + "." + month_age;
    return finalage;
}

function checkFieldValidations(resultError, errorfield, field)
{
    if (resultError !== '') 
    {
        $('#' + errorfield).empty();
        $('#' + errorfield).append(resultError).removeAttr('hidden');
        $('#' + field).css('border-color', 'red');
    } 
    else
    {
        $('#' + errorfield).attr('hidden', true);
        $('#' + field).removeAttr('style');
    }
}

function onChangeTypeofDocumentSelectElement()
{
    var doctype = $('#selectid_doctyperxc').val();
    
    if(doctype === "RX PRESCRIPTION")
    {
        $('#inputid_genericrxc').val("");
        $('#inputid_gen200rxc').val("");
        $('#inputid_instructrxc').val("");
        $('#inputid_quantityrxc').val("");
        $('#inputid_unitrxc').val("");
        
        $('#inputid_genericrxcerror').html("");
        $('#inputid_gen200rxcerror').html("");
        $('#inputid_instructrxcerror').html("");
        $('#inputid_quantityrxcerror').html("");
        $('#inputid_unitrxcerror').html("");
        
        $('#inputid_genericrxcerror').addClass("d-none");
        $('#inputid_gen200rxcerror').addClass("d-none");
        $('#inputid_instructrxcerror').addClass("d-none");
        $('#inputid_quantityrxcerror').addClass("d-none");
        $('#inputid_unitrxcerror').addClass("d-none");
        
        $('#inputid_genericrxc').prop('disabled',false);
        $('#inputid_gen200rxc').prop('disabled',false);
        $('#inputid_instructrxc').prop('disabled',false);
        $('#inputid_quantityrxc').prop('disabled',false);
        $('#inputid_unitrxc').prop('disabled',false);
        
        $('#spanid_genericrxc').css('background','');
        $('#buttonid_genericrxc').prop('disabled',false);  
        
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable(doctype);
    }
    else if(doctype === "LABORATORY REQUEST")
    {
        $('#inputid_genericrxc').val("");
        $('#inputid_gen200rxc').val("");
        $('#inputid_instructrxc').val("");
        $('#inputid_quantityrxc').val("");
        $('#inputid_unitrxc').val("");
        
        $('#inputid_genericrxcerror').html("");
        $('#inputid_gen200rxcerror').html("");
        $('#inputid_instructrxcerror').html("");
        $('#inputid_quantityrxcerror').html("");
        $('#inputid_unitrxcerror').html("");
        
        $('#inputid_genericrxcerror').addClass("d-none");
        $('#inputid_gen200rxcerror').addClass("d-none");
        $('#inputid_instructrxcerror').addClass("d-none");
        $('#inputid_quantityrxcerror').addClass("d-none");
        $('#inputid_unitrxcerror').addClass("d-none");
        
        $('#inputid_genericrxc').prop('disabled',false);
        $('#inputid_gen200rxc').prop('disabled',false);
        $('#inputid_instructrxc').prop('disabled',false);
        $('#inputid_quantityrxc').prop('disabled',false);
        $('#inputid_unitrxc').prop('disabled',false);
        
        $('#spanid_genericrxc').css('background','');
        $('#buttonid_genericrxc').prop('disabled',false);  
        
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable(doctype);
    }
    else if(doctype === "RADIOLOGY REQUEST")
    {
        $('#inputid_genericrxc').val("");
        $('#inputid_gen200rxc').val("");
        $('#inputid_instructrxc').val("");
        $('#inputid_quantityrxc').val("");
        $('#inputid_unitrxc').val("");
        
        $('#inputid_genericrxcerror').html("");
        $('#inputid_gen200rxcerror').html("");
        $('#inputid_instructrxcerror').html("");
        $('#inputid_quantityrxcerror').html("");
        $('#inputid_unitrxcerror').html("");
        
        $('#inputid_genericrxcerror').addClass("d-none");
        $('#inputid_gen200rxcerror').addClass("d-none");
        $('#inputid_instructrxcerror').addClass("d-none");
        $('#inputid_quantityrxcerror').addClass("d-none");
        $('#inputid_unitrxcerror').addClass("d-none");
        
        $('#inputid_genericrxc').prop('disabled',false);
        $('#inputid_gen200rxc').prop('disabled',false);
        $('#inputid_instructrxc').prop('disabled',false);
        $('#inputid_quantityrxc').prop('disabled',false);
        $('#inputid_unitrxc').prop('disabled',false);
        
        $('#spanid_genericrxc').css('background','');
        $('#buttonid_genericrxc').prop('disabled',false);  
        
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable(doctype);
    }
    else if(doctype === "TEST/EXAM REQUEST")
    {
        $('#inputid_genericrxc').val("");
        $('#inputid_gen200rxc').val("");
        $('#inputid_instructrxc').val("");
        $('#inputid_quantityrxc').val("");
        $('#inputid_unitrxc').val("");
        
        $('#inputid_genericrxcerror').html("");
        $('#inputid_gen200rxcerror').html("");
        $('#inputid_instructrxcerror').html("");
        $('#inputid_quantityrxcerror').html("");
        $('#inputid_unitrxcerror').html("");
        
        $('#inputid_genericrxcerror').addClass("d-none");
        $('#inputid_gen200rxcerror').addClass("d-none");
        $('#inputid_instructrxcerror').addClass("d-none");
        $('#inputid_quantityrxcerror').addClass("d-none");
        $('#inputid_unitrxcerror').addClass("d-none");
                
        $('#inputid_genericrxc').prop('disabled',false);
        $('#inputid_gen200rxc').prop('disabled',false);
        $('#inputid_instructrxc').prop('disabled',false);
        $('#inputid_quantityrxc').prop('disabled',false);
        $('#inputid_unitrxc').prop('disabled',false); 
        
        $('#spanid_genericrxc').css('background','');
        $('#buttonid_genericrxc').prop('disabled',false);  
        
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable(doctype);
    }
    else if(doctype === "TAKE HOME INSTRUCTIONS")
    {
        $('#inputid_genericrxc').val("N/A");
        $('#inputid_gen200rxc').val("N/A");
        $('#inputid_instructrxc').val("");
        $('#inputid_quantityrxc').val("N/A");
        $('#inputid_unitrxc').val("N/A");
        
        $('#inputid_genericrxcerror').html("");
        $('#inputid_gen200rxcerror').html("");
        $('#inputid_instructrxcerror').html("");
        $('#inputid_quantityrxcerror').html("");
        $('#inputid_unitrxcerror').html("");
        
        $('#inputid_genericrxcerror').addClass("d-none");
        $('#inputid_gen200rxcerror').addClass("d-none");
        $('#inputid_instructrxcerror').addClass("d-none");
        $('#inputid_quantityrxcerror').addClass("d-none");
        $('#inputid_unitrxcerror').addClass("d-none");
        
        $('#inputid_genericrxc').prop('disabled',true);
        $('#inputid_gen200rxc').prop('disabled',true);
        $('#inputid_instructrxc').prop('disabled',false);
        $('#inputid_quantityrxc').prop('disabled',true);
        $('#inputid_unitrxc').prop('disabled',true);
        
        $('#spanid_genericrxc').css('background','#e3e3e3');
        $('#buttonid_genericrxc').prop('disabled',true);  
        
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable(doctype);
    }
    else 
    {
        $('#inputid_genericrxc').val("");
        $('#inputid_gen200rxc').val("");
        $('#inputid_instructrxc').val("");
        $('#inputid_quantityrxc').val("");
        $('#inputid_unitrxc').val("");
        
        $('#inputid_genericrxc').prop('disabled',true);
        $('#inputid_gen200rxc').prop('disabled',true);
        $('#inputid_instructrxc').prop('disabled',true);
        $('#inputid_quantityrxc').prop('disabled',true);
        $('#inputid_unitrxc').prop('disabled',true);
        
        $('#spanid_genericrxc').css('background','#e3e3e3');
        $('#buttonid_genericrxc').prop('disabled',true);  
        
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable(doctype);
    }
}

function getAllOutpatientAndAddItToTheTable()
{
    outpatient_table = $('#outpatient-masterlist-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        language: 
        {
            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
        },
        ajax:
        {
            url: BASE_URL + 'RXcreatormaker/DisplayOutpatientMasterlist',
            type: 'POST'
        },

        createdRow: function (row, data, dataIndex)
        {

        },

        initComplete: function (settings, json)
        {

        }
    });
}

function selectOutPatient()
{
    var data;

    $('#outpatient-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#outpatient-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#outpatient-masterlist-table').DataTable().row('.bg-grey').data();
        selectedOutPatientForRXCreator = data;
    });
}

function selectOutPatientForRXCreatorMaker()
{
    var patientname = selectedOutPatientForRXCreator[1];
    var pxbirthdays = selectedOutPatientForRXCreator[4];
    var patientgend = selectedOutPatientForRXCreator[5];
    var patiaddress = selectedOutPatientForRXCreator[6] + ", " + selectedOutPatientForRXCreator[7];
    var doctornamex = selectedOutPatientForRXCreator[8];
    var doctorrefno = selectedOutPatientForRXCreator[9];
    
    hideOutpatientMasterlistForRxCreatorMaker();

    if(patientgend === "MALE" || patientgend === "Male")
    {
        $('#selectid_genderrxc').selectpicker('val',"MALE");
    }
    else
    {
        $('#selectid_genderrxc').selectpicker('val',"FEMALE");
    }

    $('#selectid_genderrxc').selectpicker('refresh');

    var ageofpatient = CalculateAge(pxbirthdays);

    $('#inputid_attenddocrxc').val(doctornamex + " - " + doctorrefno);
    $('#inputid_pxnamerxc').val(patientname);
    $('#inputid_birthdaterxc').val(pxbirthdays);
    $('#inputid_addressrxc').val(patiaddress);
    $('#inputid_agerxc').val(ageofpatient);
}

function showExternalItemsListingModal()
{
    $('#externalitemsforrxcreator').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#createnewrxmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#externalitemsforrxcreator').css('overflow-y', 'scroll');

    extitems_table.on('dblclick', 'tr', function ()
    {
        hideExternalItemsListingModal();
        
        var data = extitems_table.row(this).data();
        var generic = data[4];
        var brand = data[3];
        var unit = data[5];
        var productid = data[7];
        var hospcode = data[8];
        
        $("#hiddenid_prodidxrxc").val(productid);
        $("#hiddenid_hospcodrxc").val(hospcode);
        $("#inputid_genericrxc").val(generic);
        $("#inputid_gen200rxc").val(brand);
        $("#inputid_unitrxc").val(unit);
        $("#inputid_quantityrxc").val(1);
        $("#inputid_instructrxc").val("");
    });
}

function selectExternalItem()
{
    var data;

    $('#external-items-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#external-items-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#external-items-masterlist-table').DataTable().row('.bg-grey').data();
        selectedExternalItemForRXCreator = data;
    });
}

function selectExternalItemForRXCreatorMaker()
{
    hideExternalItemsListingModal();

    var generic = selectedExternalItemForRXCreator[4];
    var brand = selectedExternalItemForRXCreator[3];
    var unit = selectedExternalItemForRXCreator[5];
    var productid = selectedExternalItemForRXCreator[7];
    var hospcode = selectedExternalItemForRXCreator[8];
        
    $("#hiddenid_prodidxrxc").val(productid);
    $("#hiddenid_hospcodrxc").val(hospcode);
    $("#inputid_genericrxc").val(generic);
    $("#inputid_gen200rxc").val(brand);
    $("#inputid_unitrxc").val(unit);
    $("#inputid_quantityrxc").val(1);
    $("#inputid_instructrxc").val("");
}

function hideExternalItemsListingModal()
{
    $('#externalitemsforrxcreator').modal("hide");

    $('#createnewrxmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function getAllExternalItemsListingAndAddItToTheTable(doctype)
{
    extitems_table = $('#external-items-masterlist-table').DataTable
    ({
        sScrollY: "190px",
        sScrollX: "100%",
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
            url: BASE_URL + 'RXcreatormaker/GetAllExternalItemsList',
            type: 'POST',
            data: 
            {
                doctypex: doctype
            },
            dataType: 'json'
        },
        createdRow: function ( row, data, index )
        {
            $('td', row).eq(1).html(index+1);
        },
        initComplete: function (settings, json)
        {

        }
    });
}

function onChangeDocumentTypeSelectOfCreateRxModule()
{
    var doctype = $('#selectid_doctyperxc').val();
    
    if(doctype === "LABORATORY REQUEST")
    {
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable();
        
    }
    else if(doctype === "Select")
    {
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable();
    }
    else
    {
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable();
    }
}

function onChangeFindAllCategoryCheckBox()
{
    if ($('#chckboxid_findallcategrxc').is(':checked'))
    { 
        $('#textboxid_findallcategrxc').val(1);
        
        var doctype = "Select";
        
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable(doctype);
    } 
    else 
    { 
        $('#textboxid_findallcategrxc').val(0); 
        
        var doctype = $('#selectid_doctyperxc').val();
        
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable(doctype);
    }
}

    
function onClickProfilingTab()
{
    if (!($("#ProfilingContent").hasClass("active"))) 
    {
        $("#step1buttonrxc").removeClass('d-none');
        $("#step2buttonrxc").addClass('d-none');
        $("#step3buttonrxc").addClass('d-none');

        $("#back1buttonrxc").removeClass('d-none');
        $("#back2buttonrxc").addClass('d-none');
        $("#back3buttonrxc").addClass('d-none');
        
        $("#ProfilingTab").removeClass('disabledTab');
        $("#GenericsTab").removeClass('disabledTab');
        $("#ConfirmTab").addClass('disabledTab');
    }
}

function onClickGenericsxTab()
{
    if (!($("#GenericsContent").hasClass("active"))) 
    {
        var error = 0;
        
        var attenddoc = $("#inputid_attenddocrxc").val();
        if(attenddoc.length === 0)
        {
            $("#inputid_attenddocrxcerror").html("Field is Required!");
            $("#inputid_attenddocrxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_attenddocrxcerror").html("");
            $("#inputid_attenddocrxcerror").addClass('d-none');
        }
        
        var patntname = $("#inputid_pxnamerxc").val();
        if(patntname.length === 0)
        {
            $("#inputid_pxnamerxcerror").html("Field is Required!");
            $("#inputid_pxnamerxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_pxnamerxcerror").html("");
            $("#inputid_pxnamerxcerror").addClass('d-none');
        }
        
        var birthdayx = $("#inputid_birthdaterxc").val();
        if(birthdayx.length === 0)
        {
            $("#inputid_birthdaterxcerror").html("Field is Required!");
            $("#inputid_birthdaterxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_birthdaterxcerror").html("");
            $("#inputid_birthdaterxcerror").addClass('d-none');
        }
        
        
        var patntagex = $("#inputid_agerxc").val();
        if(patntagex.length === 0)
        {
            $("#inputid_agerxcerror").html("Field is Required!");
            $("#inputid_agerxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_agerxcerror").html("");
            $("#inputid_agerxcerror").addClass('d-none');
        }
        
        var pxaddress = $("#inputid_addressrxc").val();
        if(pxaddress.length === 0)
        {
            $("#inputid_addressrxcerror").html("Field is Required!");
            $("#inputid_addressrxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_addressrxcerror").html("");
            $("#inputid_addressrxcerror").addClass('d-none');
        }
        
        var todaydate = $("#inputid_todaydaterxc").val();
        if(todaydate.length === 0)
        {
            $("#inputid_todaydaterxcerror").html("Field is Required!");
            $("#inputid_todaydaterxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_todaydaterxcerror").html("");
            $("#inputid_todaydaterxcerror").addClass('d-none');
        }
        
        var gendersel = $("#selectid_genderrxc").val();
        if(gendersel === "Select")
        {
            $("#selectid_genderrxcerror").html("Field is Required!");
            $("#selectid_genderrxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#selectid_genderrxcerror").html("");
            $("#selectid_genderrxcerror").addClass('d-none');
        }
        
        if (error > 0)
        {
            swal
            ({
                title: "Validation Notice!",
                text: "Some field requires your attention!",
                type: "warning",
                allowOutsideClick: false,
                confirmButtonText: "OK"
            },
            function (isConfirm)
            {
                if (isConfirm)
                {
                    $("#anchorid_forprofilingtab").tab('show');
                    
                    $("#step1buttonrxc").removeClass('d-none');
                    $("#step2buttonrxc").addClass('d-none');
                    $("#step3buttonrxc").addClass('d-none');

                    $("#back1buttonrxc").removeClass('d-none');
                    $("#back2buttonrxc").addClass('d-none');
                    $("#back3buttonrxc").addClass('d-none');
                    
                    $("#ProfilingTab").removeClass('disabledTab');
                    $("#GenericsTab").removeClass('disabledTab');
                    $("#ConfirmTab").addClass('disabledTab');
                }
            });
        }
        else
        {
            $("#step1buttonrxc").addClass('d-none');
            $("#step2buttonrxc").removeClass('d-none');
            $("#step3buttonrxc").addClass('d-none');

            $("#back1buttonrxc").addClass('d-none');
            $("#back2buttonrxc").removeClass('d-none');
            $("#back3buttonrxc").addClass('d-none');
            
            $("#ProfilingTab").removeClass('disabledTab');
            $("#GenericsTab").removeClass('disabledTab');
            $("#ConfirmTab").removeClass('disabledTab');
        }
    }
}

function onClickConfirmatTab()
{
    if (!($("#ConfirmContent").hasClass("active"))) 
    {
        var error1 = 0;
        var error2 = 0;
        
        var doctype = $("#selectid_doctyperxc").val();
        if(doctype === "Select")
        {
            $("#selectid_doctyperxcerror").html("Field is Required!");
            $("#selectid_doctyperxcerror").removeClass('d-none');
            error1++;
        }
        else
        {
            $("#selectid_doctyperxcerror").html("");
            $("#selectid_doctyperxcerror").addClass('d-none');
        }
        
        var prescripreason = $("#selectid_presreasonrxc").val();
        if(prescripreason === "Select")
        {
            $("#selectid_presreasonrxcerror").html("Field is Required!");
            $("#selectid_presreasonrxcerror").removeClass('d-none');
            error1++;
        }
        else
        {
            $("#selectid_presreasonrxcerror").html("");
            $("#selectid_presreasonrxcerror").addClass('d-none');
        }
        
        if(error1 > 0)
        {
            swal
            ({
                title: "Validation Notice!",
                text: "Some field requires your attention!",
                type: "warning",
                allowOutsideClick: false,
                confirmButtonText: "OK"
            },
            function (isConfirm)
            {
                if (isConfirm)
                {
                    $("#anchorid_forgenericstab").tab('show');

                    $("#step1buttonrxc").addClass('d-none');
                    $("#step2buttonrxc").removeClass('d-none');
                    $("#step3buttonrxc").addClass('d-none');

                    $("#back1buttonrxc").addClass('d-none');
                    $("#back2buttonrxc").removeClass('d-none');
                    $("#back3buttonrxc").addClass('d-none');
                    
                    $("#ProfilingTab").removeClass('disabledTab');
                    $("#GenericsTab").removeClass('disabledTab');
                    $("#ConfirmTab").removeClass('disabledTab');
                }
            });
        }
        else
        {
            if(doctype === "TAKE HOME INSTRUCTIONS")
            {
                var instruction = $("#inputid_instructrxc").val();
                if(instruction === "")
                {
                    $("#inputid_instructrxcerror").html("Field is Required!");
                    $("#inputid_instructrxcerror").removeClass('d-none');
                    error2++;
                }
                else if(instruction.length < 10 && instruction.length !== 0)
                {
                    $("#inputid_instructrxcerror").html("At least 10 characters is Required!");
                    $("#inputid_instructrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_instructrxcerror").html("");
                    $("#inputid_instructrxcerror").addClass('d-none');
                }

                if(error2 > 0)
                {
                    swal
                    ({
                        title: "Validation Notice!",
                        text: "Some field requires your attention!",
                        type: "warning",
                        allowOutsideClick: false,
                        confirmButtonText: "OK"
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $("#anchorid_forgenericstab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").removeClass('d-none');
                            $("#step3buttonrxc").addClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").removeClass('d-none');
                            $("#back3buttonrxc").addClass('d-none');
                            
                            $("#ProfilingTab").removeClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                        }
                    });
                }
                else
                {
                    swal
                    ({
                        title: "Option Notice!",
                        text: "Would you like to add data to list?",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonText: "Yes, proceed!",
                        cancelButtonText: "No",
                        closeOnConfirm: true
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $("#boldid_createrxrxc").html("NEXT RX");
                            
                            $("#selectid_doctyperxc").prop('disabled', true);
                            $("#selectid_presreasonrxc").prop('disabled', true);

                            $("#selectid_doctyperxc").selectpicker('refresh');
                            $("#selectid_presreasonrxc").selectpicker('refresh');
                            
                            $("#anchorid_forconfirmtab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").addClass('d-none');
                            $("#step3buttonrxc").removeClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").addClass('d-none');
                            $("#back3buttonrxc").removeClass('d-none');
                            
                            $("#ProfilingTab").addClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                            
                            var rxoperationindicator = $("#hiddenid_rxoperationindicatorrxc").val();
                            
                            if(rxoperationindicator === "CREATE PRESCRIPTION")
                            {
                                var textboxidtbl = "GENERIC" + counterforgenerictble;
                            }
                            else
                            {
                                var textboxidtbl = "GENERIC" + counterfortbleprescriptions;
                            }

                            var date = moment().format('MMDDYYYY');
                            var time = moment().format('HHmmss');
                            var reference = date + "MDDRAIN" + time;

                            var productid = $("#hiddenid_prodidxrxc").val();
                            var hospcode = $("#hiddenid_hospcodrxc").val();

                            prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                            prescribedmeds_table.row.add
                            ([
                                "",
                                instruction,
                                "",
                                "",
                                "1.00",
                                productid,
                                hospcode,
                                reference,
                                textboxidtbl
                            ]).draw(false);

                            var genericdata = instruction + "|" +
                                              "" + "|" +
                                              "" + "|" +
                                              "1.00" + "|" +
                                              doctype + "|" +
                                              prescripreason + "|" +
                                              "" + "|" +
                                              productid + "|" +
                                              hospcode + "|" +
                                              reference + "|" +
                                              textboxidtbl;      
                                          
                            if(rxoperationindicator === "CREATE PRESCRIPTION")
                            {
                                counterforgenerictble++;
                                textBoxCreateForCreatePrescription(genericdata);
                            }
                            else
                            {
                                counterfortbleprescriptions++;
                                textBoxCreateForUpdatePrescription(genericdata);
                            }
                        }
                        else
                        {
                            prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                            if ( ! prescribedmeds_table.data().any() ) 
                            {
                                $("#boldid_createrxrxc").html("ADD NEW RX");
                            }
                            else
                            {
                                $("#boldid_createrxrxc").html("NEXT RX");
                            }

                            $("#anchorid_forconfirmtab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").addClass('d-none');
                            $("#step3buttonrxc").removeClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").addClass('d-none');
                            $("#back3buttonrxc").removeClass('d-none');
                            
                            $("#ProfilingTab").addClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                        }
                    });
                }
            }
            else
            {
                var generic = $("#inputid_genericrxc").val();
                if(generic === "")
                {
                    $("#inputid_genericrxcerror").html("Field is Required!");
                    $("#inputid_genericrxcerror").removeClass('d-none');
                    error2++;
                }
                else if(generic.length < 5 && generic.length !== 0)
                {
                    $("#inputid_genericrxcerror").html("More than 5 characters is Required!");
                    $("#inputid_genericrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_genericrxcerror").html("");
                    $("#inputid_genericrxcerror").addClass('d-none');
                }

                var brand = $("#inputid_gen200rxc").val();
                if(brand === "")
                {
                    $("#inputid_gen200rxcerror").html("Field is Required!");
                    $("#inputid_gen200rxcerror").removeClass('d-none');
                    error2++;
                }
                else if(brand.length < 5 && brand.length !== 0)
                {
                    $("#inputid_gen200rxcerror").html("More than 5 characters is Required!");
                    $("#inputid_gen200rxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_gen200rxcerror").html("");
                    $("#inputid_gen200rxcerror").addClass('d-none');
                }

                var quantity = $("#inputid_quantityrxc").val();
                if(quantity === "")
                {
                    $("#inputid_quantityrxcerror").html("Field is Required!");
                    $("#inputid_quantityrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_quantityrxcerror").html("");
                    $("#inputid_quantityrxcerror").addClass('d-none');
                }

                var unit = $("#inputid_unitrxc").val();
                if(unit === "")
                {
                    $("#inputid_unitrxcerror").html("Field is Required!");
                    $("#inputid_unitrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_unitrxcerror").html("");
                    $("#inputid_unitrxcerror").addClass('d-none');
                }
                
                var instruction = $("#inputid_instructrxc").val();
                if(instruction === "")
                {
                    $("#inputid_instructrxcerror").html("Field is Required!");
                    $("#inputid_instructrxcerror").removeClass('d-none');
                    error2++;
                }
                else if(instruction.length < 10 && instruction.length !== 0)
                {
                    $("#inputid_instructrxcerror").html("At least 10 characters is Required!");
                    $("#inputid_instructrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_instructrxcerror").html("");
                    $("#inputid_instructrxcerror").addClass('d-none');
                }

                if(error2 > 0)
                {
                    swal
                    ({
                        title: "Validation Notice!",
                        text: "Some field requires your attention!",
                        type: "warning",
                        allowOutsideClick: false,
                        confirmButtonText: "OK"
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $("#anchorid_forgenericstab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").removeClass('d-none');
                            $("#step3buttonrxc").addClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").removeClass('d-none');
                            $("#back3buttonrxc").addClass('d-none');
                            
                            $("#ProfilingTab").removeClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                        }
                    });
                }
                else
                {                    
                    swal
                    ({
                        title: "Option Notice!",
                        text: "Would you like to add data to list?",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonText: "Yes, proceed!",
                        cancelButtonText: "No",
                        closeOnConfirm: true
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $("#boldid_createrxrxc").html("NEXT RX");
                            
                            $("#selectid_doctyperxc").prop('disabled', true);
                            $("#selectid_presreasonrxc").prop('disabled', true);

                            $("#selectid_doctyperxc").selectpicker('refresh');
                            $("#selectid_presreasonrxc").selectpicker('refresh');
                            
                            $("#anchorid_forconfirmtab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").addClass('d-none');
                            $("#step3buttonrxc").removeClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").addClass('d-none');
                            $("#back3buttonrxc").removeClass('d-none');
                            
                            $("#ProfilingTab").addClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                            
                            var rxoperationindicator = $("#hiddenid_rxoperationindicatorrxc").val();
                            
                            if(rxoperationindicator === "CREATE PRESCRIPTION")
                            {
                                var textboxidtbl = "GENERIC" + counterforgenerictble;
                            }
                            else
                            {
                                var textboxidtbl = "GENERIC" + counterfortbleprescriptions;
                            }
                            
                            var date = moment().format('MMDDYYYY');
                            var time = moment().format('HHmmss');
                            var reference = date + "MDDRAIN" + time;
                            
                            var productid = $("#hiddenid_prodidxrxc").val();
                            var hospcode = $("#hiddenid_hospcodrxc").val();
                            
                            prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                            prescribedmeds_table.row.add
                            ([
                                "",
                                generic,
                                brand,
                                instruction,
                                quantity,
                                productid,
                                hospcode,
                                reference,
                                textboxidtbl
                            ]).draw(false);

                            var genericdata = generic + "|" +
                                              brand + "|" +
                                              instruction + "|" +
                                              quantity + "|" +
                                              doctype + "|" +
                                              prescripreason + "|" +
                                              unit + "|" +
                                              productid + "|" +
                                              hospcode + "|" +
                                              reference + "|" +
                                              textboxidtbl;

                            if(rxoperationindicator === "CREATE PRESCRIPTION")
                            {
                                counterforgenerictble++;
                                textBoxCreateForCreatePrescription(genericdata);
                            }
                            else
                            {
                                counterfortbleprescriptions++;
                                textBoxCreateForUpdatePrescription(genericdata);
                            }
                        }
                        else
                        {
                            prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                            if ( ! prescribedmeds_table.data().any() ) 
                            {
                                $("#boldid_createrxrxc").html("ADD NEW RX");
                            }
                            else
                            {
                                $("#boldid_createrxrxc").html("NEXT RX");
                            }
                            
                            $("#anchorid_forconfirmtab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").addClass('d-none');
                            $("#step3buttonrxc").removeClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").addClass('d-none');
                            $("#back3buttonrxc").removeClass('d-none');
                            
                            $("#ProfilingTab").addClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                        }
                    });
                }
            }
        }
    }
}

function onClickProceedButton1()
{
    if (!($("#GenericsContent").hasClass("active"))) 
    {
        var error = 0;
        
        var attenddoc = $("#inputid_attenddocrxc").val();
        if(attenddoc.length === 0)
        {
            $("#inputid_attenddocrxcerror").html("Field is Required!");
            $("#inputid_attenddocrxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_attenddocrxcerror").html("");
            $("#inputid_attenddocrxcerror").addClass('d-none');
        }
        
        var patntname = $("#inputid_pxnamerxc").val();
        if(patntname.length === 0)
        {
            $("#inputid_pxnamerxcerror").html("Field is Required!");
            $("#inputid_pxnamerxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_pxnamerxcerror").html("");
            $("#inputid_pxnamerxcerror").addClass('d-none');
        }
        
        var birthdayx = $("#inputid_birthdaterxc").val();
        if(birthdayx.length === 0)
        {
            $("#inputid_birthdaterxcerror").html("Field is Required!");
            $("#inputid_birthdaterxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_birthdaterxcerror").html("");
            $("#inputid_birthdaterxcerror").addClass('d-none');
        }
        
        
        var patntagex = $("#inputid_agerxc").val();
        if(patntagex.length === 0)
        {
            $("#inputid_agerxcerror").html("Field is Required!");
            $("#inputid_agerxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_agerxcerror").html("");
            $("#inputid_agerxcerror").addClass('d-none');
        }
        
        var pxaddress = $("#inputid_addressrxc").val();
        if(pxaddress.length === 0)
        {
            $("#inputid_addressrxcerror").html("Field is Required!");
            $("#inputid_addressrxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_addressrxcerror").html("");
            $("#inputid_addressrxcerror").addClass('d-none');
        }
        
        var todaydate = $("#inputid_todaydaterxc").val();
        if(todaydate.length === 0)
        {
            $("#inputid_todaydaterxcerror").html("Field is Required!");
            $("#inputid_todaydaterxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_todaydaterxcerror").html("");
            $("#inputid_todaydaterxcerror").addClass('d-none');
        }
        
        var gendersel = $("#selectid_genderrxc").val();
        if(gendersel === "Select")
        {
            $("#selectid_genderrxcerror").html("Field is Required!");
            $("#selectid_genderrxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#selectid_genderrxcerror").html("");
            $("#selectid_genderrxcerror").addClass('d-none');
        }

        if (error > 0)
        {
            swal
            ({
                title: "Validation Notice!",
                text: "Some field requires your attention!",
                type: "warning",
                allowOutsideClick: false,
                confirmButtonText: "OK"
            },
            function (isConfirm)
            {
                if (isConfirm)
                {
                    $("#anchorid_forprofilingtab").tab('show');

                    $("#step1buttonrxc").removeClass('d-none');
                    $("#step2buttonrxc").addClass('d-none');
                    $("#step3buttonrxc").addClass('d-none');

                    $("#back1buttonrxc").removeClass('d-none');
                    $("#back2buttonrxc").addClass('d-none');
                    $("#back3buttonrxc").addClass('d-none');
                    
                    $("#ProfilingTab").removeClass('disabledTab');
                    $("#GenericsTab").removeClass('disabledTab');
                    $("#ConfirmTab").addClass('disabledTab');
                }
            });
        }
        else
        {
            $("#anchorid_forgenericstab").tab('show');
            
            $("#step1buttonrxc").addClass('d-none');
            $("#step2buttonrxc").removeClass('d-none');
            $("#step3buttonrxc").addClass('d-none');

            $("#back1buttonrxc").addClass('d-none');
            $("#back2buttonrxc").removeClass('d-none');
            $("#back3buttonrxc").addClass('d-none');
            
            $("#ProfilingTab").removeClass('disabledTab');
            $("#GenericsTab").removeClass('disabledTab');
            $("#ConfirmTab").removeClass('disabledTab');
        }
    }
}

function onClickProceedButton2()
{
    if (!($("#ConfirmContent").hasClass("active"))) 
    {
        var error1 = 0;
        var error2 = 0;
        
        var doctype = $("#selectid_doctyperxc").val();
        if(doctype === "Select")
        {
            $("#selectid_doctyperxcerror").html("Field is Required!");
            $("#selectid_doctyperxcerror").removeClass('d-none');
            error1++;
        }
        else
        {
            $("#selectid_doctyperxcerror").html("");
            $("#selectid_doctyperxcerror").addClass('d-none');
        }
        
        var prescripreason = $("#selectid_presreasonrxc").val();
        if(prescripreason === "Select")
        {
            $("#selectid_presreasonrxcerror").html("Field is Required!");
            $("#selectid_presreasonrxcerror").removeClass('d-none');
            error1++;
        }
        else
        {
            $("#selectid_presreasonrxcerror").html("");
            $("#selectid_presreasonrxcerror").addClass('d-none');
        }
        
        if(error1 > 0)
        {
            swal
            ({
                title: "Validation Notice!",
                text: "Some field requires your attention!",
                type: "warning",
                allowOutsideClick: false,
                confirmButtonText: "OK"
            },
            function (isConfirm)
            {
                if (isConfirm)
                {
                    $("#anchorid_forgenericstab").tab('show');

                    $("#step1buttonrxc").addClass('d-none');
                    $("#step2buttonrxc").removeClass('d-none');
                    $("#step3buttonrxc").addClass('d-none');

                    $("#back1buttonrxc").addClass('d-none');
                    $("#back2buttonrxc").removeClass('d-none');
                    $("#back3buttonrxc").addClass('d-none');
                    
                    $("#ProfilingTab").removeClass('disabledTab');
                    $("#GenericsTab").removeClass('disabledTab');
                    $("#ConfirmTab").removeClass('disabledTab');
                }
            });
        }
        else
        {
            if(doctype === "TAKE HOME INSTRUCTIONS")
            {
                var instruction = $("#inputid_instructrxc").val();
                if(instruction === "")
                {
                    $("#inputid_instructrxcerror").html("Field is Required!");
                    $("#inputid_instructrxcerror").removeClass('d-none');
                    error2++;
                }
                else if(instruction.length < 10 && instruction.length !== 0)
                {
                    $("#inputid_instructrxcerror").html("At least 10 characters is Required!");
                    $("#inputid_instructrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_instructrxcerror").html("");
                    $("#inputid_instructrxcerror").addClass('d-none');
                }

                if(error2 > 0)
                {
                    swal
                    ({
                        title: "Validation Notice!",
                        text: "Some field requires your attention!",
                        type: "warning",
                        allowOutsideClick: false,
                        confirmButtonText: "OK"
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $("#anchorid_forgenericstab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").removeClass('d-none');
                            $("#step3buttonrxc").addClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").removeClass('d-none');
                            $("#back3buttonrxc").addClass('d-none');
                            
                            $("#ProfilingTab").removeClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                        }
                    });
                }
                else
                {
                    swal
                    ({
                        title: "Option Notice!",
                        text: "Would you like to add data to list?",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonText: "Yes, proceed!",
                        cancelButtonText: "No",
                        closeOnConfirm: true
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $("#boldid_createrxrxc").html("NEXT RX");
                            
                            $("#selectid_doctyperxc").prop('disabled', true);
                            $("#selectid_presreasonrxc").prop('disabled', true);

                            $("#selectid_doctyperxc").selectpicker('refresh');
                            $("#selectid_presreasonrxc").selectpicker('refresh');
                            
                            $("#anchorid_forconfirmtab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").addClass('d-none');
                            $("#step3buttonrxc").removeClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").addClass('d-none');
                            $("#back3buttonrxc").removeClass('d-none');
                            
                            $("#ProfilingTab").addClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                            
                            var rxoperationindicator = $("#hiddenid_rxoperationindicatorrxc").val();
                            
                            if(rxoperationindicator === "CREATE PRESCRIPTION")
                            {
                                var textboxidtbl = "GENERIC" + counterforgenerictble;
                            }
                            else
                            {
                                var textboxidtbl = "GENERIC" + counterfortbleprescriptions;
                            }

                            var date = moment().format('MMDDYYYY');
                            var time = moment().format('HHmmss');
                            var reference = date + "MDDRAIN" + time;
                            
                            var productid = $("#hiddenid_prodidxrxc").val();
                            var hospcode = $("#hiddenid_hospcodrxc").val();
                            
                            prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                            prescribedmeds_table.row.add
                            ([
                                "",
                                instruction,
                                "",
                                "",
                                "1.00",
                                productid,
                                hospcode,
                                reference,
                                textboxidtbl
                            ]).draw(false);

                            var genericdata = instruction + "|" +
                                              "" + "|" +
                                              "" + "|" +
                                              "1.00" + "|" +
                                              doctype + "|" +
                                              prescripreason + "|" +
                                              "" + "|" +
                                              productid + "|" +
                                              hospcode + "|" +
                                              reference + "|" +
                                              textboxidtbl;

                            if(rxoperationindicator === "CREATE PRESCRIPTION")
                            {
                                counterforgenerictble++;
                                textBoxCreateForCreatePrescription(genericdata);
                            }
                            else
                            {
                                counterfortbleprescriptions++;
                                textBoxCreateForUpdatePrescription(genericdata);
                            }
                        }
                        else
                        {
                            prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                            if ( ! prescribedmeds_table.data().any() ) 
                            {
                                $("#boldid_createrxrxc").html("ADD NEW RX");
                            }
                            else
                            {
                                $("#boldid_createrxrxc").html("NEXT RX");
                            }
                            
                            $("#anchorid_forconfirmtab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").addClass('d-none');
                            $("#step3buttonrxc").removeClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").addClass('d-none');
                            $("#back3buttonrxc").removeClass('d-none');
                            
                            $("#ProfilingTab").addClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                        }
                    });
                }
            }
            else
            {
                var generic = $("#inputid_genericrxc").val();
                if(generic === "")
                {
                    $("#inputid_genericrxcerror").html("Field is Required!");
                    $("#inputid_genericrxcerror").removeClass('d-none');
                    error2++;
                }
                else if(generic.length < 5 && generic.length !== 0)
                {
                    $("#inputid_genericrxcerror").html("More than 5 characters is Required!");
                    $("#inputid_genericrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_genericrxcerror").html("");
                    $("#inputid_genericrxcerror").addClass('d-none');
                }

                var brand = $("#inputid_gen200rxc").val();
                if(brand === "")
                {
                    $("#inputid_gen200rxcerror").html("Field is Required!");
                    $("#inputid_gen200rxcerror").removeClass('d-none');
                    error2++;
                }
                else if(brand.length < 5 && brand.length !== 0)
                {
                    $("#inputid_gen200rxcerror").html("More than 5 characters is Required!");
                    $("#inputid_gen200rxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_gen200rxcerror").html("");
                    $("#inputid_gen200rxcerror").addClass('d-none');
                }

                var quantity = $("#inputid_quantityrxc").val();
                if(quantity === "")
                {
                    $("#inputid_quantityrxcerror").html("Field is Required!");
                    $("#inputid_quantityrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_quantityrxcerror").html("");
                    $("#inputid_quantityrxcerror").addClass('d-none');
                }

                var unit = $("#inputid_unitrxc").val();
                if(unit === "")
                {
                    $("#inputid_unitrxcerror").html("Field is Required!");
                    $("#inputid_unitrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_unitrxcerror").html("");
                    $("#inputid_unitrxcerror").addClass('d-none');
                }
                
                var instruction = $("#inputid_instructrxc").val();
                if(instruction === "")
                {
                    $("#inputid_instructrxcerror").html("Field is Required!");
                    $("#inputid_instructrxcerror").removeClass('d-none');
                    error2++;
                }
                else if(instruction.length < 10 && instruction.length !== 0)
                {
                    $("#inputid_instructrxcerror").html("At least 10 characters is Required!");
                    $("#inputid_instructrxcerror").removeClass('d-none');
                    error2++;
                }
                else
                {
                    $("#inputid_instructrxcerror").html("");
                    $("#inputid_instructrxcerror").addClass('d-none');
                }

                if(error2 > 0)
                {
                    swal
                    ({
                        title: "Validation Notice!",
                        text: "Some field requires your attention!",
                        type: "warning",
                        allowOutsideClick: false,
                        confirmButtonText: "OK"
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $("#anchorid_forgenericstab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").removeClass('d-none');
                            $("#step3buttonrxc").addClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").removeClass('d-none');
                            $("#back3buttonrxc").addClass('d-none');
                            
                            $("#ProfilingTab").removeClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                        }
                    });
                }
                else
                {                    
                    swal
                    ({
                        title: "Option Notice!",
                        text: "Would you like to add data to list?",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonText: "Yes, proceed!",
                        cancelButtonText: "No",
                        closeOnConfirm: true
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $("#boldid_createrxrxc").html("NEXT RX");
                            
                            $("#selectid_doctyperxc").prop('disabled', true);
                            $("#selectid_presreasonrxc").prop('disabled', true);

                            $("#selectid_doctyperxc").selectpicker('refresh');
                            $("#selectid_presreasonrxc").selectpicker('refresh');
                            
                            $("#anchorid_forconfirmtab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").addClass('d-none');
                            $("#step3buttonrxc").removeClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").addClass('d-none');
                            $("#back3buttonrxc").removeClass('d-none');
                            
                            $("#ProfilingTab").addClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                            
                            var rxoperationindicator = $("#hiddenid_rxoperationindicatorrxc").val();
                            
                            if(rxoperationindicator === "CREATE PRESCRIPTION")
                            {
                                var textboxidtbl = "GENERIC" + counterforgenerictble;
                            }
                            else
                            {
                                var textboxidtbl = "GENERIC" + counterfortbleprescriptions;
                            }

                            var date = moment().format('MMDDYYYY');
                            var time = moment().format('HHmmss');
                            var reference = date + "MDDRAIN" + time;
                            
                            var productid = $("#hiddenid_prodidxrxc").val();
                            var hospcode = $("#hiddenid_hospcodrxc").val();
                            
                            prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                            prescribedmeds_table.row.add
                            ([
                                "",
                                generic,
                                brand,
                                instruction,
                                quantity,
                                productid,
                                hospcode,
                                reference,
                                textboxidtbl
                            ]).draw(false);

                            var genericdata = generic + "|" +
                                              brand + "|" +
                                              instruction + "|" +
                                              quantity + "|" +
                                              doctype + "|" +
                                              prescripreason + "|" +
                                              unit + "|" +
                                              productid + "|" +
                                              hospcode + "|" +
                                              reference + "|" +
                                              textboxidtbl;

                            if(rxoperationindicator === "CREATE PRESCRIPTION")
                            {
                                counterforgenerictble++;
                                textBoxCreateForCreatePrescription(genericdata);
                            }
                            else
                            {
                                counterfortbleprescriptions++;
                                textBoxCreateForUpdatePrescription(genericdata);
                            }
                        }
                        else
                        {
                            prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                            if ( ! prescribedmeds_table.data().any() ) 
                            {
                                $("#boldid_createrxrxc").html("ADD NEW RX");
                            }
                            else
                            {
                                $("#boldid_createrxrxc").html("NEXT RX");
                            }
                            
                            $("#anchorid_forconfirmtab").tab('show');

                            $("#step1buttonrxc").addClass('d-none');
                            $("#step2buttonrxc").addClass('d-none');
                            $("#step3buttonrxc").removeClass('d-none');

                            $("#back1buttonrxc").addClass('d-none');
                            $("#back2buttonrxc").addClass('d-none');
                            $("#back3buttonrxc").removeClass('d-none');
                            
                            $("#ProfilingTab").addClass('disabledTab');
                            $("#GenericsTab").removeClass('disabledTab');
                            $("#ConfirmTab").removeClass('disabledTab');
                        }
                    });
                }
            }
        }
    }
}

function onClickBackButton1()
{
    if (!($("#ProfilingContent").hasClass("active"))) 
    {
        $("#anchorid_forprofilingtab").tab('show');
        
        $("#step1buttonrxc").removeClass('d-none');
        $("#step2buttonrxc").addClass('d-none');
        $("#step3buttonrxc").addClass('d-none');

        $("#back1buttonrxc").removeClass('d-none');
        $("#back2buttonrxc").addClass('d-none');
        $("#back3buttonrxc").addClass('d-none');
        
        $("#ProfilingTab").removeClass('disabledTab');
        $("#GenericsTab").removeClass('disabledTab');
        $("#ConfirmTab").addClass('disabledTab');
    }
}

function onClickBackButton2()
{
    if (!($("#GenericsContent").hasClass("active"))) 
    {
        var error = 0;
        
        var attenddoc = $("#inputid_attenddocrxc").val();
        if(attenddoc.length === 0)
        {
            $("#inputid_attenddocrxcerror").html("Field is Required!");
            $("#inputid_attenddocrxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_attenddocrxcerror").html("");
            $("#inputid_attenddocrxcerror").addClass('d-none');
        }
        
        var patntname = $("#inputid_pxnamerxc").val();
        if(patntname.length === 0)
        {
            $("#inputid_pxnamerxcerror").html("Field is Required!");
            $("#inputid_pxnamerxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_pxnamerxcerror").html("");
            $("#inputid_pxnamerxcerror").addClass('d-none');
        }
        
        var birthdayx = $("#inputid_birthdaterxc").val();
        if(birthdayx.length === 0)
        {
            $("#inputid_birthdaterxcerror").html("Field is Required!");
            $("#inputid_birthdaterxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_birthdaterxcerror").html("");
            $("#inputid_birthdaterxcerror").addClass('d-none');
        }
        
        
        var patntagex = $("#inputid_agerxc").val();
        if(patntagex.length === 0)
        {
            $("#inputid_agerxcerror").html("Field is Required!");
            $("#inputid_agerxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_agerxcerror").html("");
            $("#inputid_agerxcerror").addClass('d-none');
        }
        
        var pxaddress = $("#inputid_addressrxc").val();
        if(pxaddress.length === 0)
        {
            $("#inputid_addressrxcerror").html("Field is Required!");
            $("#inputid_addressrxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_addressrxcerror").html("");
            $("#inputid_addressrxcerror").addClass('d-none');
        }
        
        var todaydate = $("#inputid_todaydaterxc").val();
        if(todaydate.length === 0)
        {
            $("#inputid_todaydaterxcerror").html("Field is Required!");
            $("#inputid_todaydaterxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#inputid_todaydaterxcerror").html("");
            $("#inputid_todaydaterxcerror").addClass('d-none');
        }
        
        var gendersel = $("#selectid_genderrxc").val();
        if(gendersel === "Select")
        {
            $("#selectid_genderrxcerror").html("Field is Required!");
            $("#selectid_genderrxcerror").removeClass('d-none');
            error++;
        }
        else
        {
            $("#selectid_genderrxcerror").html("");
            $("#selectid_genderrxcerror").addClass('d-none');
        }
        
        if (error > 0)
        {
            swal
            ({
                title: "Validation Notice!",
                text: "Some field requires your attention!",
                type: "warning",
                allowOutsideClick: false,
                confirmButtonText: "OK"
            },
            function (isConfirm)
            {
                if (isConfirm)
                {
                    $("#anchorid_forprofilingtab").tab('show');
                    
                    $("#step1buttonrxc").removeClass('d-none');
                    $("#step2buttonrxc").addClass('d-none');
                    $("#step3buttonrxc").addClass('d-none');

                    $("#back1buttonrxc").removeClass('d-none');
                    $("#back2buttonrxc").addClass('d-none');
                    $("#back3buttonrxc").addClass('d-none');
                    
                    $("#ProfilingTab").removeClass('disabledTab');
                    $("#GenericsTab").removeClass('disabledTab');
                    $("#ConfirmTab").addClass('disabledTab');
                }
            });
        }
        else
        {
            $("#anchorid_forgenericstab").tab('show');
            
            $("#step1buttonrxc").addClass('d-none');
            $("#step2buttonrxc").removeClass('d-none');
            $("#step3buttonrxc").addClass('d-none');

            $("#back1buttonrxc").addClass('d-none');
            $("#back2buttonrxc").removeClass('d-none');
            $("#back3buttonrxc").addClass('d-none');
            
            $("#ProfilingTab").removeClass('disabledTab');
            $("#GenericsTab").removeClass('disabledTab');
            $("#ConfirmTab").removeClass('disabledTab');
        }
    }
}

function onClickCreateNewRxButton()
{
    onClickBackButton2();
}

function selectPrescribedMed()
{
    var data;

    $('#prescribed-medstestins-listings-table tbody').on('click', 'tr', function ()
    {
        $('#prescribed-medstestins-listings-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#prescribed-medstestins-listings-table').DataTable().row('.bg-grey').data();
        selectedPrescribedMedForRXCreator = data;
    });
}

function onClickDeleteOldRxButton()
{
    if (prescribedmeds_table.rows( '.bg-grey' ).any())
    {   
        var textboxidtblpresmeds = selectedPrescribedMedForRXCreator[8];

        swal
        ({
            title: "Are you sure?",
            text: "You will not be able to recover\nthe selected prescribed meds record!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No",
            closeOnConfirm: false
        },
        function (isConfirm)
        {
            $(".confirm").attr('disabled', 'disabled'); 

            if (isConfirm)
            {                
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully deleted!",
                    type: "success",
                    allowOutsideClick: false
                });

                prescribedmeds_table.row('.bg-grey').remove().draw( false );

                $("#" + textboxidtblpresmeds).remove();
                $("#" + textboxidtblpresmeds).remove();
                $("#" + textboxidtblpresmeds).remove();
                $("#" + textboxidtblpresmeds).remove();
                $("#" + textboxidtblpresmeds).remove();
                $("#" + textboxidtblpresmeds).remove();
                $("#" + textboxidtblpresmeds).remove();
                $("#" + textboxidtblpresmeds).remove();
                $("#" + textboxidtblpresmeds).remove();
                $("#" + textboxidtblpresmeds).remove();
                
                var rownum = $('#prescribed-medstestins-listings-table').DataTable().rows().count();
                
                for(var i = 0; i < rownum; i++)
                {
                    var counter = parseInt(i) + 1;
                    $('#prescribed-medstestins-listings-table tbody tr:eq('+ i +') td:eq(0)').html(parseInt(counter));
                }
                
                prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                if ( ! prescribedmeds_table.data().any() ) 
                {
                    $("#boldid_createrxrxc").html("ADD NEW RX");
                    $("#selectid_doctyperxc").prop("disabled",false);
                    $("#selectid_presreasonrxc").prop("disabled",false);
                    $("#selectid_doctyperxc").selectpicker("refresh");
                    $("#selectid_presreasonrxc").selectpicker("refresh");
                }
                else
                {
                    $("#boldid_createrxrxc").html("NEXT RX");
                    $("#selectid_doctyperxc").prop("disabled",true);
                    $("#selectid_presreasonrxc").prop("disabled",true);
                    $("#selectid_doctyperxc").selectpicker("refresh");
                    $("#selectid_presreasonrxc").selectpicker("refresh");
                }
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    }
    else
    {
        swal
        ({
            title: "Notification",
            text: "Select prescribed meds first to be deleted!",
            type: "warning"
        });
    }
}

function textBoxCreateForCreatePrescription(genericdata)
{
    var genericsplit = genericdata.split('|');  
    var generic = genericsplit[0];
    var brand = genericsplit[1];
    var instruction = genericsplit[2];
    var quantity = genericsplit[3];
    var doctype = genericsplit[4];
    var prescripreason = genericsplit[5];
    var unit = genericsplit[6];
    var prodid = genericsplit[7];
    var hospcd = genericsplit[8];
    var reference = genericsplit[9];
    var textboxidtbl = genericsplit[10];

    var gen = document.createElement("INPUT");
    gen.setAttribute("type", "hidden");
    gen.setAttribute("id", textboxidtbl);
    gen.setAttribute("name", "generic" + counterforgenerictext);
    gen.setAttribute("class", "generic" + counterforgenerictext);
    gen.setAttribute("value", generic);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(gen);
    
    var brn = document.createElement("INPUT");
    brn.setAttribute("type", "hidden");
    brn.setAttribute("id", textboxidtbl);
    brn.setAttribute("name", "brand" + counterforgenerictext);
    brn.setAttribute("class", "brand" + counterforgenerictext);
    brn.setAttribute("value", brand);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(brn);
    
    var ins = document.createElement("INPUT");
    ins.setAttribute("type", "hidden");
    ins.setAttribute("id", textboxidtbl);
    ins.setAttribute("name", "instruction" + counterforgenerictext);
    ins.setAttribute("class", "instruction" + counterforgenerictext);
    ins.setAttribute("value", instruction);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(ins);
    
    var qty = document.createElement("INPUT");
    qty.setAttribute("type", "hidden");
    qty.setAttribute("id", textboxidtbl);
    qty.setAttribute("name", "quantity" + counterforgenerictext);
    qty.setAttribute("class", "quantity" + counterforgenerictext);
    qty.setAttribute("value", quantity);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(qty);
    
    var doc = document.createElement("INPUT");
    doc.setAttribute("type", "hidden");
    doc.setAttribute("id", textboxidtbl);
    doc.setAttribute("name", "doctype" + counterforgenerictext);
    doc.setAttribute("class", "doctype" + counterforgenerictext);
    doc.setAttribute("value", doctype);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(doc);
    
    var prs = document.createElement("INPUT");
    prs.setAttribute("type", "hidden");
    prs.setAttribute("id", textboxidtbl);
    prs.setAttribute("name", "prescripreason" + counterforgenerictext);
    prs.setAttribute("class", "prescripreason" + counterforgenerictext);
    prs.setAttribute("value", prescripreason);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(prs);
    
    var unt = document.createElement("INPUT");
    unt.setAttribute("type", "hidden");
    unt.setAttribute("id", textboxidtbl);
    unt.setAttribute("name", "unit" + counterforgenerictext);
    unt.setAttribute("class", "unit" + counterforgenerictext);
    unt.setAttribute("value", unit);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(unt);
    
    var prd = document.createElement("INPUT");
    prd.setAttribute("type", "hidden");
    prd.setAttribute("id", textboxidtbl);
    prd.setAttribute("name", "prodid" + counterforgenerictext);
    prd.setAttribute("class", "prodid" + counterforgenerictext);
    prd.setAttribute("value", prodid);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(prd);
    
    var hos = document.createElement("INPUT");
    hos.setAttribute("type", "hidden");
    hos.setAttribute("id", textboxidtbl);
    hos.setAttribute("name", "hospcd" + counterforgenerictext);
    hos.setAttribute("class", "hospcd" + counterforgenerictext);
    hos.setAttribute("value", hospcd);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(hos);
    
    var ref = document.createElement("INPUT");
    ref.setAttribute("type", "hidden");
    ref.setAttribute("id", textboxidtbl);
    ref.setAttribute("name", "reference" + counterforgenerictext);
    ref.setAttribute("class", "reference" + counterforgenerictext);
    ref.setAttribute("value", reference);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(ref);
    
    counterforgenerictext++; 
}

function addNewPrescription()
{
    $('#step3buttonrxc').prop('disabled',true);
    
    var error = 0;

    var specialins = $('#textareaid_specialinsrxc').val();
    if(specialins === "")
    {
        $("#textareaid_specialinsrxcerror").html("Field is Required!");
        $("#textareaid_specialinsrxcerror").removeClass('d-none');
        error++;
    }
    else if(specialins.length < 10 && specialins.length !== 0)
    {
        $("#textareaid_specialinsrxcerror").html("More than 10 characters is Required!");
        $("#textareaid_specialinsrxcerror").removeClass('d-none');
        error++;
    }
    else
    {
        $("#textareaid_specialinsrxcerror").html("");
        $("#textareaid_specialinsrxcerror").addClass('d-none');
    }
    
    if ($('#myFormGenericMultipleDataStorage').is(':empty'))
    { 
        $("#inputid_finalgenericdatarxcerror").html("RX Listing is Required!");
        $("#inputid_finalgenericdatarxcerror").removeClass('d-none');
        error++;
    }
    else
    {
        $("#inputid_finalgenericdatarxcerror").html("");
        $("#inputid_finalgenericdatarxcerror").addClass('d-none');
    }

    if(error > 0)
    {
        swal
        ({
            title: "Validation Notice!",
            text: "Some field requires your attention!",
            type: "warning",
            allowOutsideClick: false,
            confirmButtonText: "OK"
        },
        function (isConfirm)
        {
            if (isConfirm)
            {
                $("#anchorid_forconfirmtab").tab('show');

                $("#step1buttonrxc").addClass('d-none');
                $("#step2buttonrxc").addClass('d-none');
                $("#step3buttonrxc").removeClass('d-none');

                $("#back1buttonrxc").addClass('d-none');
                $("#back2buttonrxc").addClass('d-none');
                $("#back3buttonrxc").removeClass('d-none');

                $("#ProfilingTab").addClass('disabledTab');
                $("#GenericsTab").removeClass('disabledTab');
                $("#ConfirmTab").removeClass('disabledTab');
                
                $('#step3buttonrxc').prop('disabled',false);
            }
        });
    }
    else
    {   
        $('#step3buttonrxc').prop('disabled',true);
        
        //============================== PRESCRIPTION PART ====================================>
        var rxoperationindicator = $("#hiddenid_rxoperationindicatorrxc").val();
                            
        if(rxoperationindicator === "CREATE PRESCRIPTION")
        {
            var genericdata = '';
            for(var i=1; i<counterforgenerictext; i++)
            {
                genericdata += "?:" + $('.generic' + i).val() + "|" 
                                    + $('.brand' + i).val() + "|" 
                                    + $('.instruction' + i).val() + "|"
                                    + $('.quantity' + i).val() + "|"
                                    + $('.doctype' + i).val() + "|"
                                    + $('.prescripreason' + i).val() + "|"
                                    + $('.unit' + i).val() + "|"
                                    + $('.prodid' + i).val() + "|"
                                    + $('.hospcd' + i).val() + "|"
                                    + $('.reference' + i).val();
            }
        }
        else
        {
            var genericdata = '';
            for(var i=1; i<counterfortextprescriptions; i++)
            {
                genericdata += "?:" + $('.generic' + i).val() + "|" 
                                    + $('.brand' + i).val() + "|" 
                                    + $('.instruction' + i).val() + "|"
                                    + $('.quantity' + i).val() + "|"
                                    + $('.doctype' + i).val() + "|"
                                    + $('.prescripreason' + i).val() + "|"
                                    + $('.unit' + i).val() + "|"
                                    + $('.prodid' + i).val() + "|"
                                    + $('.hospcd' + i).val() + "|"
                                    + $('.reference' + i).val();
            }
        }

        $("#inputid_hiddengenericrxc").text(genericdata);
        var mygenericstr = $("#inputid_hiddengenericrxc").text();
        var newgenericstr = replaceAll(mygenericstr, '?:undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined', '');
        var genericalldata = $("#inputid_genericdatarxc").val(newgenericstr);
        var genericresult = genericalldata.val().split(":");
        var finalgenericdata = cleanArray(genericresult);
        $("#inputid_finalgenericdatarxc").val(finalgenericdata);

        //============================== RXMASTER PART ====================================>
        var pxtype = $('#pxtyperxchiddentext').val();
        if(pxtype === "Inpatient")
        {
            var pattype = "IPD";
        }
        else
        {
            var pattype = "OPD";
        }

        var doctorstr = $('#inputid_attenddocrxc').val();
        var doctorstrsplit = doctorstr.split(" - ");

        var docutype = $('#selectid_doctyperxc').val();
        if(docutype === "RX PRESCRIPTION")
        {
            var transtype = "RXPRESCRIP";
            var reqsttype = "Rx Prescription";
            var groupingx = "MED";
            var departmnt = "PH";
        }
        else if(docutype === "LABORATORY REQUEST")
        {
            var transtype = "LABREQ";
            var reqsttype = "Laboratory Request";
            var groupingx = "LAB";
            var departmnt = "LT";
        }
        else if(docutype === "RADIOLOGY REQUEST")
        {
            var transtype = "RADREQ";
            var reqsttype = "Radiology Request";
            var groupingx = "MED";
            var departmnt = "PH";
        }
        else if(docutype === "TEST/EXAM REQUEST")
        {
            var transtype = "OTHERREQ";
            var reqsttype = "Test/Exam Request";
            var groupingx = "615";
            var departmnt = "IN";
        }
        else if(docutype === "TAKE HOME INSTRUCTIONS")
        {
            var transtype = "TAKEHOMEINS";
            var reqsttype = "Take Home Instructions";
            var groupingx = "";
            var departmnt = "IN";
        }
        
        var dataparameter = pattype + "|" + 
                            doctorstrsplit[0] + "|" + 
                            doctorstrsplit[1] + "|" + 
                            transtype + "|" + 
                            reqsttype + "|" + 
                            groupingx + "|" + 
                            departmnt;
        
        if(rxoperationindicator === "CREATE PRESCRIPTION")
        {
            CreateNewPrescription(dataparameter);
        }
        else
        {
            UpdateOldPrescription(dataparameter);
        }
        
        
    }    
}

function CreateNewPrescription(dataparameter)
{
    var dataparametersplit = dataparameter.split("|");
    var pattype = dataparametersplit[0];
    var doctorname = dataparametersplit[1];
    var doctorcode = dataparametersplit[2];
    var transtype = dataparametersplit[3];
    var reqsttype = dataparametersplit[4];
    var groupingx = dataparametersplit[5];
    var departmnt = dataparametersplit[6];
    
    $.ajax
    ({
        type: 'POST',
        data:
        {
            Patnamex: $('#inputid_pxnamerxc').val(),
            sexx: $('#selectid_genderrxc').val(),
            agex: $('#inputid_agerxc').val(),
            addressx: $('#inputid_addressrxc').val(),
            bdayx: $('#inputid_birthdaterxc').val(),
            dateadmittedx: $('#hiddenid_admdaterxc').val(),
            datedischargedx: $('#hiddenid_disdaterxc').val(),
            roomreferencex: $('#hiddenid_roomrefrxc').val(),
            specialinstructionx: "",
            RxBatchx: $('#inputid_batchrxc').val(),
            RxDatex: $('#inputid_todaydaterxc').val(),
            phicrefcodex: $('#hiddenid_phicrefrxc').val(),
            pattypex: pattype,
            patacctcodex: $('#hiddenid_casecodrxc').val(),
            patacctnox: $('#hiddenid_casenumrxc').val(),
            pincodex: $('#hiddenid_PINnumbrxc').val(),
            reasonofrxx: $('#selectid_presreasonrxc').val(),
            Doctorx: doctorname,
            DrRefnox: doctorcode,
            S2nox: "0",
            PTRnox: "0",
            Licnox: "",
            footersx: $('#textareaid_specialinsrxc').val(),
            transactiontypex: transtype,
            reqtypex: reqsttype,
            groupingx: groupingx,
            deptx: departmnt,
            balancex: $('#inputid_balancerxc').val(),
            genericmultidata: $("#inputid_finalgenericdatarxc").val()
        },
        url: BASE_URL + 'RXcreatormaker/AddPrescription',
        dataType: 'json',
        success: function (result) 
        {
            if (result.status === false)
            {
                checkFieldValidations(result.errors.rxbatchx, 'inputid_batchrxcerror', 'inputid_batchrxc');
            }
            else
            {
                $('#createnewrxmodal').modal("hide");
                $('body').css('overflow', 'auto');

                var RxBatch = $('#inputid_batchrxc').val();

                swal
                ({
                    title: "Success!",
                    text: "Record is successfully saved!",
                    type: "success",
                    allowOutsideClick: false,
                    confirmButtonText: "OK"
                },
                function (isConfirm)
                {
                    if (isConfirm)
                    {
                        showPrescriptionDataModal(RxBatch);
                    }
                });
            }
        }
    });
}

function UpdateOldPrescription(dataparameter)
{
    var dataparametersplit = dataparameter.split("|");
    var pattype = dataparametersplit[0];
    var doctorname = dataparametersplit[1];
    var doctorcode = dataparametersplit[2];
    var transtype = dataparametersplit[3];
    var reqsttype = dataparametersplit[4];
    var groupingx = dataparametersplit[5];
    var departmnt = dataparametersplit[6];
    
    $.ajax
    ({
        type: 'POST',
        data:
        {
            Patnamex: $('#inputid_pxnamerxc').val(),
            sexx: $('#selectid_genderrxc').val(),
            agex: $('#inputid_agerxc').val(),
            addressx: $('#inputid_addressrxc').val(),
            bdayx: $('#inputid_birthdaterxc').val(),
            dateadmittedx: $('#hiddenid_admdaterxc').val(),
            datedischargedx: $('#hiddenid_disdaterxc').val(),
            roomreferencex: $('#hiddenid_roomrefrxc').val(),
            specialinstructionx: "",
            RxBatchx: $('#inputid_batchrxc').val(),
            RxDatex: $('#inputid_todaydaterxc').val(),
            phicrefcodex: $('#hiddenid_phicrefrxc').val(),
            pattypex: pattype,
            patacctcodex: $('#hiddenid_casecodrxc').val(),
            patacctnox: $('#hiddenid_casenumrxc').val(),
            pincodex: $('#hiddenid_PINnumbrxc').val(),
            reasonofrxx: $('#selectid_presreasonrxc').val(),
            Doctorx: doctorname,
            DrRefnox: doctorcode,
            S2nox: "0",
            PTRnox: "0",
            Licnox: "",
            footersx: $('#textareaid_specialinsrxc').val(),
            transactiontypex: transtype,
            reqtypex: reqsttype,
            groupingx: groupingx,
            deptx: departmnt,
            balancex: $('#inputid_balancerxc').val(),
            genericmultidata: $("#inputid_finalgenericdatarxc").val()
        },
        url: BASE_URL + 'RXcreatormaker/EditPrescription',
        dataType: 'json',
        success: function (result) 
        {
            if (result.status === false)
            {
                checkFieldValidations(result.errors.rxbatchx, 'inputid_batchrxcerror', 'inputid_batchrxc');
            }
            else
            {
                $('#createnewrxmodal').modal("hide");
                $('body').css('overflow', 'auto');


                var RxBatch = $('#inputid_batchrxc').val();

                swal
                ({
                    title: "Success!",
                    text: "Record is successfully updated!",
                    type: "success",
                    allowOutsideClick: false,
                    confirmButtonText: "OK"
                },
                function (isConfirm)
                {
                    if (isConfirm)
                    {
                        showPrescriptionDataModal(RxBatch);
                    }
                });
            }
        }
    });
}

function showPrescriptionDataModal(RxBatch)
{
    $('#hiddenboxid_rxbatchcoderxc').val(RxBatch);
    
    $('#printrxdatamodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#createnewrxmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#printrxdatamodal').css('overflow-y', 'scroll');
}

function hidePrescriptionDataModal()
{
    var RxBatch = $('#hiddenboxid_rxbatchcoderxc').val();
    
    $('#printrxdatamodal').modal("hide");
    $('body').css('overflow', 'auto');

    prescription_table.ajax.reload();
    $('#prescription-instruction-masterlist-table_filter [type="search"]').val(RxBatch);
    $('#prescription-instruction-masterlist-table_filter [type="search"]').focus();
    prescription_table.search(RxBatch).draw();
    
    setToDefaultCreateRXModal();
}

function onclickRxOptionButtonFromSelectedRadioElement()
{
    if ($("#radioid_createrxrxc").is(":checked"))
    {
        $('#printrxdatamodal').modal("hide");
        $('body').css('overflow', 'auto');
    
        setToDefaultCreateRXModal();
        showCreateNewRxModalForRxCreatorMaker();
    }
    else
    {
        alert("PRINT RX!");
//        $('#generate-patient-diagnostic-data-form input[name=hiddennameforprintdiagnostic]').val(caseno);
//        $("#generate-patient-diagnostic-data-form").submit();
    }
}

function setToDefaultCreateRXModal()
{
    $('#hiddenid_casenumrxc').val("");
    $('#hiddenid_admdaterxc').val("");
    $('#hiddenid_disdaterxc').val("");
    $('#hiddenid_roomrefrxc').val("");
    $('#hiddenid_casecodrxc').val("");
    $('#hiddenid_PINnumbrxc').val("");
    $('#hiddenid_prodidxrxc').val("");
    $('#hiddenid_hospcodrxc').val("");
    $('#radioid_inpatientrxc').prop('checked',true);
    $('#radioid_outpatientrxc').prop('checked',false);
    $('#pxtyperxchiddentext').val("Inpatient");
    $('#inputid_attenddocrxc').val("");
    $('#inputid_batchrxcerror').html("");
    $('#inputid_batchrxcerror').addClass("d-none");
    $('#inputid_attenddocrxcerror').html("");
    $('#inputid_attenddocrxcerror').addClass("d-none");
    $('#inputid_pxnamerxc').val("");
    $('#inputid_pxnamerxcerror').html("");
    $('#inputid_pxnamerxcerror').addClass("d-none");
    $('#inputid_birthdaterxc').val("");
    $('#inputid_birthdaterxcerror').html("");
    $('#inputid_birthdaterxcerror').addClass("d-none");
    $('#inputid_agerxc').val("");
    $('#inputid_agerxcerror').html("");
    $('#inputid_agerxcerror').addClass("d-none");
    $('#inputid_addressrxc').val("");
    $('#inputid_addressrxcerror').html("");
    $('#inputid_addressrxcerror').addClass("d-none");
    var nowdate = moment().format('YYYY-MM-DD');
    $('#inputid_todaydaterxc').val(nowdate);
    $('#inputid_todaydaterxcerror').html("");
    $('#inputid_todaydaterxcerror').addClass("d-none");
    $('#selectid_genderrxc').selectpicker("val","Select");
    $('#selectid_genderrxcerror').html("");
    $('#selectid_genderrxcerror').addClass("d-none");
    $('#selectid_doctyperxc').selectpicker('val','Select');
    $('#selectid_doctyperxc').prop('disabled',false);
    $('#selectid_doctyperxc').selectpicker('refresh');
    $('#selectid_doctyperxcerror').html("");
    $('#selectid_doctyperxcerror').addClass("d-none");
    $('#selectid_presreasonrxc').selectpicker('val','Select');
    $('#selectid_presreasonrxc').prop('disabled',false);
    $('#selectid_presreasonrxc').selectpicker('refresh');
    $('#selectid_presreasonrxcerror').html("");
    $('#selectid_presreasonrxcerror').addClass("d-none");
    $('#inputid_genericrxc').val("");
    $('#inputid_genericrxcerror').html("");
    $('#inputid_genericrxcerror').addClass("d-none");
    $('#inputid_gen200rxc').val("");
    $('#inputid_gen200rxcerror').html("");
    $('#inputid_gen200rxcerror').addClass("d-none");
    $('#inputid_instructrxc').val("");
    $('#inputid_instructrxcerror').html("");
    $('#inputid_instructrxcerror').addClass("d-none");
    $('#inputid_quantityrxc').val("");
    $('#inputid_quantityrxcerror').html("");
    $('#inputid_quantityrxcerror').addClass("d-none");
    $('#inputid_unitrxc').val("");
    $('#inputid_unitrxcerror').html("");
    $('#inputid_unitrxcerror').addClass("d-none");
    $('#inputid_balancerxc').val("");
    $('#inputid_paymentrxc').val("");
    $('#textareaid_specialinsrxc').val("");
    $('#textareaid_specialinsrxcerror').html("");
    $('#textareaid_specialinsrxcerror').addClass("d-none");
    $('#textareaid_specialinsrxcerror').addClass("d-none");
    $('#myFormGenericMultipleDataStorage').empty();
    $('#inputid_hiddengenericrxc').empty();
    $('#inputid_genericdatarxc').val("");
    $('#inputid_finalgenericdatarxc').val("");
    $('#step3buttonrxc').prop("disabled",false);
    
    prescribedmeds_table.clear().draw();
    onClickBackButton1();
}

function escapeRegExp(string)
{
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceAll(str, term, replacement)
{
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

function cleanArray(actual) 
{
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) 
    {
        if (actual[i]) 
        {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

function titleCase(str) 
{
   var splitStr = str.toLowerCase().split(' ');
   
   for (var i = 0; i < splitStr.length; i++) 
   {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   
   return splitStr.join(' '); 
}

function onClickInpatientRadio()
{
    $('#pxtyperxchiddentext').val('Inpatient');
    $('#inputid_attenddocrxc').val("");
    $('#inputid_batchrxcerror').html("");
    $('#inputid_batchrxcerror').addClass("d-none");
    $('#inputid_attenddocrxcerror').html("");
    $('#inputid_attenddocrxcerror').addClass("d-none");
    $('#inputid_pxnamerxc').val("");
    $('#inputid_pxnamerxcerror').html("");
    $('#inputid_pxnamerxcerror').addClass("d-none");
    $('#inputid_birthdaterxc').val("");
    $('#inputid_birthdaterxcerror').html("");
    $('#inputid_birthdaterxcerror').addClass("d-none");
    $('#inputid_agerxc').val("");
    $('#inputid_agerxcerror').html("");
    $('#inputid_agerxcerror').addClass("d-none");
    $('#inputid_addressrxc').val("");
    $('#inputid_addressrxcerror').html("");
    $('#inputid_addressrxcerror').addClass("d-none");
    var nowdate = moment().format('YYYY-MM-DD');
    $('#inputid_todaydaterxc').val(nowdate);
    $('#inputid_todaydaterxcerror').html("");
    $('#inputid_todaydaterxcerror').addClass("d-none");
    $('#selectid_genderrxc').selectpicker("val","Select");
    $('#selectid_genderrxcerror').html("");
    $('#selectid_genderrxcerror').addClass("d-none");
}

function onClickOutpatientRadio()
{
    $('#pxtyperxchiddentext').val('Outpatient');
    $('#inputid_attenddocrxc').val("");
    $('#inputid_batchrxcerror').html("");
    $('#inputid_batchrxcerror').addClass("d-none");
    $('#inputid_attenddocrxcerror').html("");
    $('#inputid_attenddocrxcerror').addClass("d-none");
    $('#inputid_pxnamerxc').val("");
    $('#inputid_pxnamerxcerror').html("");
    $('#inputid_pxnamerxcerror').addClass("d-none");
    $('#inputid_birthdaterxc').val("");
    $('#inputid_birthdaterxcerror').html("");
    $('#inputid_birthdaterxcerror').addClass("d-none");
    $('#inputid_agerxc').val("");
    $('#inputid_agerxcerror').html("");
    $('#inputid_agerxcerror').addClass("d-none");
    $('#inputid_addressrxc').val("");
    $('#inputid_addressrxcerror').html("");
    $('#inputid_addressrxcerror').addClass("d-none");
    var nowdate = moment().format('YYYY-MM-DD');
    $('#inputid_todaydaterxc').val(nowdate);
    $('#inputid_todaydaterxcerror').html("");
    $('#inputid_todaydaterxcerror').addClass("d-none");
    $('#selectid_genderrxc').selectpicker("val","Select");
    $('#selectid_genderrxcerror').html("");
    $('#selectid_genderrxcerror').addClass("d-none");
}

function deleteRX(RxBatch)
{
    swal
    ({
        title: "Are you sure?",
        text: "You will not be able to recover the selected rx record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No",
        closeOnConfirm: false
    },
    function (isConfirm)
    {
        $(".confirm").attr('disabled', 'disabled'); 

        if (isConfirm)
        {
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "RXcreatormaker/deleteRXFromMasterlist",
                data: {RxBatchCode: RxBatch},
                dataType: 'json'
            })
            .done(function (result) 
            {
                if (result === false) 
                {
                    swal("Error!", "Record was not deleted", "error");
                } 
                else
                {
                    $(".confirm").attr('disabled', 'disabled');

                    swal
                    ({
                        title: "Success!",
                        text: "Record is successfully deleted!",
                        type: "success",
                        allowOutsideClick: false
                    });

                    prescription_table.ajax.reload();
                }
            });
        }
    });
}

function editRX(RxBatch)
{
    setToDefaultCreateRXModal();
    showCreateNewRxModalForRxCreatorMaker();
    
    $('#hiddenid_rxoperationindicatorrxc').val("UPDATE PRESCRIPTION");
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "RXcreatormaker/getRXMasterDataForEditRX",
        data: {RxBatchCode: RxBatch},
        dataType: 'json'
    })
    .done(function (data)
    {
        if (data.status)
        {
            $('#hiddenid_casenumrxc').val(data.rxmasterdata['patacctno']);
            $('#hiddenid_admdaterxc').val(data.rxmasterdata['dateadmitted']);
            $('#hiddenid_disdaterxc').val(data.rxmasterdata['datedischarged']);
            $('#hiddenid_roomrefrxc').val(data.rxmasterdata['roomreference']);
            $('#hiddenid_casecodrxc').val(data.rxmasterdata['patacctcode']);
            $('#hiddenid_PINnumbrxc').val(data.rxmasterdata['pincode']);
            
            var pattype = data.rxmasterdata['pattype'];
            if(pattype === "OPD")
            {
                $('#radioid_inpatientrxc').prop('checked',false);
                $('#radioid_outpatientrxc').prop('checked',true);
                $('#pxtyperxchiddentext').val("Outpatient");
            }
            else
            {
                $('#radioid_inpatientrxc').prop('checked',true);
                $('#radioid_outpatientrxc').prop('checked',false);
                $('#pxtyperxchiddentext').val("Inpatient");
            }
            
            $('#inputid_batchrxc').val(data.rxmasterdata['RxBatch']);
            $('#inputid_attenddocrxc').val(data.rxmasterdata['Doctor'] + " - " + data.rxmasterdata['DrRefno']);
            $('#inputid_pxnamerxc').val(data.rxmasterdata['Patname']);
            $('#inputid_birthdaterxc').val(data.rxmasterdata['bday']);
            $('#inputid_agerxc').val(data.rxmasterdata['age']);
            $('#inputid_addressrxc').val(data.rxmasterdata['address']);
            $('#inputid_todaydaterxc').val(data.rxmasterdata['RxDate']);
            
            if(data.rxmasterdata['sex'] === "M")
            {
                $('#selectid_genderrxc').selectpicker("val","MALE");
            }
            else
            {
                $('#selectid_genderrxc').selectpicker("val","FEMALE");
            }
            
            var reqtype = data.rxmasterdata['reqtype'];
            if(reqtype === "Rx Prescription" || reqtype === "RX PRESCRIPTION")
            {
                $('#selectid_doctyperxc').selectpicker('val','RX PRESCRIPTION');
                $('#selectid_doctyperxc').selectpicker('refresh');
            }
            else if(reqtype === "Laboratory Request" || reqtype === "LABORATORY REQUEST")
            {
                $('#selectid_doctyperxc').selectpicker('val','LABORATORY REQUEST');
                $('#selectid_doctyperxc').selectpicker('refresh');
            }
            else if(reqtype === "Radiology Request" || reqtype === "RADIOLOGY REQUEST")
            {
                $('#selectid_doctyperxc').selectpicker('val','RADIOLOGY REQUEST');
                $('#selectid_doctyperxc').selectpicker('refresh');
            }
            else if(reqtype === "Test/Exam Request" || reqtype === "TEST/EXAM REQUEST")
            {
                $('#selectid_doctyperxc').selectpicker('val','TEST/EXAM REQUEST');
                $('#selectid_doctyperxc').selectpicker('refresh');
            }
            else
            {
                $('#selectid_doctyperxc').selectpicker('val','TAKE HOME INSTRUCTIONS');
                $('#selectid_doctyperxc').selectpicker('refresh');
            }

            var rxreason = data.rxmasterdata['reasonofrx'];
            if(rxreason === "Over Credit Limit. Need Deposit" || rxreason === "OVER CREDIT LIMIT/NEED DEPOSIT")
            {
                $('#selectid_presreasonrxc').selectpicker('val','Over Credit Limit/Need Deposit');
                $('#selectid_presreasonrxc').selectpicker('refresh');
            }
            else if(rxreason === "No Item on Stock." || rxreason === "NO. ITEM OF STOCK")
            {
                $('#selectid_presreasonrxc').selectpicker('val','No. Item of Stock');
                $('#selectid_presreasonrxc').selectpicker('refresh');
            }
            else
            {
                $('#selectid_presreasonrxc').selectpicker('val','Other Reason');
                $('#selectid_presreasonrxc').selectpicker('refresh');
            }

            if(reqtype === "Take Home Instructions" || reqtype === "TAKE HOME INSTRUCTIONS")
            {
                $('#inputid_genericrxc').prop("disabled",true);
                $('#inputid_gen200rxc').prop("disabled",true);
                $('#inputid_instructrxc').prop("disabled",false);
                $('#inputid_quantityrxc').prop("disabled",true);
                $('#inputid_unitrxc').prop("disabled",true);
                $('#spanid_genericrxc').css('background','#e3e3e3');
                $('#buttonid_genericrxc').prop("disabled",true);
            }
            else
            {
                $('#inputid_genericrxc').prop("disabled",false);
                $('#inputid_gen200rxc').prop("disabled",false);
                $('#inputid_instructrxc').prop("disabled",false);
                $('#inputid_quantityrxc').prop("disabled",false);
                $('#inputid_unitrxc').prop("disabled",false);
                $('#spanid_genericrxc').css('background','');
                $('#buttonid_genericrxc').prop("disabled",false);
            }
            
            $('#inputid_genericrxc').val("");
            $('#inputid_gen200rxc').val("");
            $('#inputid_instructrxc').val("");
            $('#inputid_quantityrxc').val("");
            $('#inputid_unitrxc').val("");
            $('#textareaid_specialinsrxc').val(data.rxmasterdata['footers']);
            
            var acctno = data.rxmasterdata['patacctno'];
            
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "RXcreatormaker/getBalanceAndPaymentsMadeDataForRXCreatorFormDataImport",
                data: {casenox: acctno},
                dataType: 'json'
            })
            .done(function (data)
            {
                var balance = data.pxbalance_data['balance'];
                if(balance === "-0.00" || balance === null)
                {
                    var zerobal1 = parseFloat("0.00");
                    $('#inputid_balancerxc').val(zerobal1.toFixed(2));
                }
                else
                {
                    $('#inputid_balancerxc').val(balance);
                }


                if(data.paymentstatus === true)
                {
                    var payment = data.pxpayment_data['payment'];
                    $('#inputid_paymentrxc').val(payment);
                }
                else
                {
                    var zerobal2 = parseFloat("0.00");
                    $('#inputid_paymentrxc').val(zerobal2.toFixed(2));
                }
            });

            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "RXcreatormaker/getPrescriptionsMultipleData",
                data: {RxBatchCode: RxBatch},
                dataType: 'json'
            })
            .done(function (data)
            {
                prescribedmeds_table = $('#causesof-confinement-table').DataTable();
                prescribedmeds_table.clear().draw();
                
                var counterfortbleprescriptionsvar = parseInt(counterfortbleprescriptions) - parseInt(counterfortbleprescriptions);
                counterfortbleprescriptions = parseInt(counterfortbleprescriptionsvar) + 1;
                
                var counterfortextprescriptionsvar = parseInt(counterfortextprescriptions) - parseInt(counterfortextprescriptions);
                counterfortextprescriptions = parseInt(counterfortextprescriptionsvar) + 1;
                
                for (var cv = 0; cv < data.length; cv++)
                {
                    var textboxidtbl = "GENERIC" + counterfortbleprescriptions;

                    prescribedmeds_table = $('#prescribed-medstestins-listings-table').DataTable();
                    prescribedmeds_table.row.add
                    ([
                        "",
                        data[cv]['itemgeneric'],
                        data[cv]['brand'],
                        data[cv]['freqdscr'],
                        data[cv]['qty'],
                        data[cv]['productid'],
                        data[cv]['hospcode'],
                        data[cv]['phicrefcode'],
                        textboxidtbl
                    ]).draw(false);
                    
                    var genericdata = data[cv]['itemgeneric'] + "|" +
                                      data[cv]['brand'] + "|" +
                                      data[cv]['freqdscr'] + "|" +
                                      data[cv]['qty'] + "|" +
                                      reqtype + "|" +
                                      rxreason + "|" +
                                      data[cv]['unit'] + "|" +
                                      data[cv]['productid'] + "|" +
                                      data[cv]['hospcode'] + "|" +
                                      data[cv]['phicrefcode'] + "|" +
                                      textboxidtbl;

                    textBoxCreateForUpdatePrescription(genericdata);
                    counterfortbleprescriptions++;
                    
                }
            });
        }
    });
}

function textBoxCreateForUpdatePrescription(genericdata)
{
    var genericsplit = genericdata.split('|');  
    var generic = genericsplit[0];
    var brand = genericsplit[1];
    var instruction = genericsplit[2];
    var quantity = genericsplit[3];
    var doctype = genericsplit[4];
    var prescripreason = genericsplit[5];
    var unit = genericsplit[6];
    var prodid = genericsplit[7];
    var hospcd = genericsplit[8];
    var reference = genericsplit[9];
    var textboxidtbl = genericsplit[10];

    var gen = document.createElement("INPUT");
    gen.setAttribute("type", "text");
    gen.setAttribute("id", textboxidtbl);
    gen.setAttribute("name", "generic" + counterfortextprescriptions);
    gen.setAttribute("class", "generic" + counterfortextprescriptions);
    gen.setAttribute("value", generic);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(gen);
    
    var brn = document.createElement("INPUT");
    brn.setAttribute("type", "text");
    brn.setAttribute("id", textboxidtbl);
    brn.setAttribute("name", "brand" + counterfortextprescriptions);
    brn.setAttribute("class", "brand" + counterfortextprescriptions);
    brn.setAttribute("value", brand);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(brn);
    
    var ins = document.createElement("INPUT");
    ins.setAttribute("type", "text");
    ins.setAttribute("id", textboxidtbl);
    ins.setAttribute("name", "instruction" + counterfortextprescriptions);
    ins.setAttribute("class", "instruction" + counterfortextprescriptions);
    ins.setAttribute("value", instruction);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(ins);
    
    var qty = document.createElement("INPUT");
    qty.setAttribute("type", "text");
    qty.setAttribute("id", textboxidtbl);
    qty.setAttribute("name", "quantity" + counterfortextprescriptions);
    qty.setAttribute("class", "quantity" + counterfortextprescriptions);
    qty.setAttribute("value", quantity);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(qty);
    
    var doc = document.createElement("INPUT");
    doc.setAttribute("type", "text");
    doc.setAttribute("id", textboxidtbl);
    doc.setAttribute("name", "doctype" + counterfortextprescriptions);
    doc.setAttribute("class", "doctype" + counterfortextprescriptions);
    doc.setAttribute("value", doctype);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(doc);
    
    var prs = document.createElement("INPUT");
    prs.setAttribute("type", "text");
    prs.setAttribute("id", textboxidtbl);
    prs.setAttribute("name", "prescripreason" + counterfortextprescriptions);
    prs.setAttribute("class", "prescripreason" + counterfortextprescriptions);
    prs.setAttribute("value", prescripreason);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(prs);
    
    var unt = document.createElement("INPUT");
    unt.setAttribute("type", "text");
    unt.setAttribute("id", textboxidtbl);
    unt.setAttribute("name", "unit" + counterfortextprescriptions);
    unt.setAttribute("class", "unit" + counterfortextprescriptions);
    unt.setAttribute("value", unit);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(unt);
    
    var prd = document.createElement("INPUT");
    prd.setAttribute("type", "text");
    prd.setAttribute("id", textboxidtbl);
    prd.setAttribute("name", "prodid" + counterfortextprescriptions);
    prd.setAttribute("class", "prodid" + counterfortextprescriptions);
    prd.setAttribute("value", prodid);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(prd);
    
    var hos = document.createElement("INPUT");
    hos.setAttribute("type", "text");
    hos.setAttribute("id", textboxidtbl);
    hos.setAttribute("name", "hospcd" + counterfortextprescriptions);
    hos.setAttribute("class", "hospcd" + counterfortextprescriptions);
    hos.setAttribute("value", hospcd);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(hos);
    
    var ref = document.createElement("INPUT");
    ref.setAttribute("type", "text");
    ref.setAttribute("id", textboxidtbl);
    ref.setAttribute("name", "reference" + counterfortextprescriptions);
    ref.setAttribute("class", "reference" + counterfortextprescriptions);
    ref.setAttribute("value", reference);
    document.getElementById("myFormGenericMultipleDataStorage").appendChild(ref);
    
    counterfortextprescriptions++; 
}

function editOutpatient(opid)
{
    alert("Under Development!");
}

function deleteOutpatient(opid)
{
    alert("Under Development!");
}


function editExtItem(rxid)
{
    alert("Under Development!");
}

function deleteExtItem(rxid)
{
    alert("Under Development!");
}

function editDoctorsforrx(docid)
{
    alert("Under Development!");
}

function deleteDoctorsforrx(docid)
{
    alert("Under Development!");
}

function checkBalance()
{
    alert("Under Development!");
}