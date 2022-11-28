var walkinpx_table = null;
var pxmasterlist_table = null;
var slcode_table = null;
var selectedPatient;
var opdno_value = "";

var quickadmittedpx_table = null;
var comanage_table = null;
var diagnosis_table = null;
var confinecause_table = null;
var slcode_table = null;
var selectedPatient;
var selectedDiagnosis;
var selectedCausesOfConfinement;
var counterfortble = 1;
var counterfortext = 1;
var counterfortblecauses = 1;
var counterfortextcauses = 1;
var counterfortblecausesadmedt = 1;
var counterfortextcausesadmedt = 1;
var counterfortbleadmedt = 1;
var counterfortextadmedt = 1;
var counterfortblehmoadmedt = 1;
var counterfortexthmoadmedt = 1;
var counterforhmo = 1;
var comanagecreateboxindicator = false;
var hmoinsurcreateboxindicator = false;
var causeconcreateboxindicator = false;
var addoreditadmissionindicator = "";

$(function () 
{
    $('[data-toggle="tooltip"]').tooltip();
    
    getAllPatientMasterlistAndAddItToTheTable();
    tabsHighlightForEROPDcharges();
    getAllOPDWalkinPatient();
    generateOPDnumber();
    selectPatient();
    getAllSLCodeAndAddItToTheTable();
    generateSLCode();
    
    $('#inputid_birthdayeoc').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    $('#inputid_oldrecrdqck').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
   
    $('#inputid_oldrecrd').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    $('#inputid_oldrecrdedt').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    $('#inputid_spousebday').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    $('#inputid_spousebdayedt').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });

    $('#inputid_birthday').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });

    $('#inputid_birthdayedt').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    $('#inputid_oldrecrdqck').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    $('.supvinputedtadm').keypress(function (e) 
    {
        if (e.keyCode === 13)
        checkAuthorizationFromSupervisorForEdtAdm();
    });
    
    $('.supvinputedtmas').keypress(function (e) 
    {
        if (e.keyCode === 13)
        checkAuthorizationFromSupervisor();
    });
});

function tabsHighlightForEROPDcharges()
{
    $("#eropdchargessidetab").addClass("active");
}

function getAllOPDWalkinPatient()
{
    walkinpx_table = $('#walkin-patients-masterlist-table').DataTable
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
            url: BASE_URL + 'EROPDcharges/GetAllWalkinPatientList',
            type: 'POST',
            dataType: 'json'
        },
        createdRow: function (row, data, dataIndex)
        {
            var data = dataIndex+1;
            $('td', row).eq(0).html("&nbsp;&nbsp;&nbsp;&nbsp;" + data);
            
        },
        initComplete: function (settings, json)
        {

        }
    });
    
    walkinpx_table.on('dblclick', 'tr', function ()
    {
//        var data = inpatient_table.row(this).data();
//        var caseno = data[2];
//        
//        $.ajax
//        ({
//            type: 'POST',
//            url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
//            data: {casenox: caseno},
//            dataType: 'json'
//        })
//        .done(function (data)
//        {
//            $('#acctcode').val(data.inpatientlistdata['casecode']);
//            $('#admit').val(data.inpatientlistdata['admitdate']);
//            $('#acctno').val(caseno);
//            $('#pincode').val(data.inpatientlistdata['pincode']);
//
//            window.open(BASE_URL + 'LaboratoryResults/laboratorymaster?cc=' + data.inpatientlistdata['casecode'] + '&ad=' + data.inpatientlistdata['admitdate'], '_blank');
//
//            getPatientLaboratoryResultMasterlist();
//        });
    });
}

function showAddNewWalkinPatientModal()
{
    setToDefaultWalkinPatientManagementModal();
    
    $("#buttonid_addwalkinpxeoc").removeClass("d-none");
    $("#buttonid_edtwalkinpxeoc").addClass("d-none");
    
    $(".insertwalkintitle").removeClass("d-none");
    $(".updatewalkintitle").addClass("d-none");
    
    $("#buttonid_inpataccteoc").prop('disabled',false);
    
    $('#walkinmanagementmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
    
    $("#anchorid_forgeneraltabadd").tab('show');
    $('#hiddboxid_pictureeoc').val("");
    generateOPDnumber();
    
    var imagepath = BASE_URL + 'assets/images/uploads/walkinpx/default.png';

    $.ajax
    ({
        url: imagepath,
        type: 'HEAD',
        success: function ()
        {
            var img = $('#patientimguploadforaddpx').attr('src', imagepath);
            var src = img.attr('src');
            var i = src.indexOf('?dummy=');
            src = i !== -1 ? src.substring(0, i) : src;
            var d = new Date();
            img.attr('src', src + '?dummy=' + d.getTime());
        }
    });
}

function hideAddNewWalkinPatientModal()
{
    $('#walkinmanagementmodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function AddNewWalkinPatient()
{
    $("#buttonid_addwalkinpxeoc").prop("disabled", true);
    
    generateOPDnumber();
    
    var inpatPIN = $("#inpusid_inpataccteoc").val();
    var fname = $("#inputid_fnameeoc").val();
    var mname = $("#inputid_mnameeoc").val();
    var lname = $("#inputid_lnameeoc").val();
    var suffix = $("#inputid_suffixeoc").val();
    var memberid = $("#inputid_memberideoc").val();
    var gender = $("#selectid_gendereoc").val();
    var birthday = $("#inputid_birthdayeoc").val();
    var pxage = $("#inputid_wipxageeoc").val();
    var provadd = $("#selectid_provaddeoc").val();
    var citymun = $("#selectid_citymuneoc").val();
    var barangay = $("#selectid_barangayeoc").val();
    var street = $("#inputid_streeteoc").val();
    var cellphone = $("#inputid_cellphoneeoc").val();
    var date = $("#inputid_dateeoc").val();
    
    var dateformat = moment().format("MMDDYYYYHHmmss");
    var opid = dateformat + "OPDWI";
    var opdno = $("#hiddboxid_opdcodeeoc").val();
    var image = $("#hiddboxid_pictureeoc").val();
    
    var slcode = $("#hiddboxid_slaccnteoc").val();
    var membercode = $("#hiddboxid_mmbrnumeoc").val();
    var pincode = $("#hiddboxid_pincodeeoc").val();
    
    $.ajax
    ({
        type: 'POST',
        data: 
        {
            slcode: slcode,
            membercode: membercode,
            pincode: pincode,
            image: image,
            opdno: opdno,
            opid: opid,
            inpatPIN: inpatPIN,
            fname: fname,
            mname: mname,
            lname: lname,
            suffix: suffix,
            memberid: memberid,
            gender: gender,
            birthday: birthday,
            pxage: pxage,
            provadd: provadd,
            citymun: citymun,
            barangay: barangay,
            street: street,
            cellphone: cellphone,
            date: date
        },
        url: BASE_URL + 'EROPDcharges/AddNewWalkinPatient',
        dataType: 'json',
        success: function (result)
        {
            if (result.status === false) 
            {
                swal
                ({
                    title: "WARNING!",
                    text: "Some field requires your attention!",
                    type: "warning",
                    allowOutsideClick: false
                });
                
                checkFieldValidations(result.errors.inpatPIN, 'inpusid_inpataccteocerror', 'inpusid_inpataccteoc');
                checkFieldValidations(result.errors.fname, 'inputid_fnameeocerror', 'inputid_fnameeoc');
                checkFieldValidations(result.errors.mname, 'inputid_mnameeocerror', 'inputid_mnameeoc');
                checkFieldValidations(result.errors.lname, 'inputid_lnameeocerror', 'inputid_lnameeoc');
                checkFieldValidations(result.errors.gender, 'selectid_gendereocerror', 'selectid_gendereoc');
                checkFieldValidations(result.errors.birthday, 'inputid_birthdayeocerror', 'inputid_birthdayeoc');
                checkFieldValidations(result.errors.pxage, 'inputid_wipxageeocerror', 'inputid_wipxageeoc');
                checkFieldValidations(result.errors.provadd, 'selectid_provaddeocerror', 'selectid_provaddeoc');
                checkFieldValidations(result.errors.citymun, 'selectid_citymuneocerror', 'selectid_citymuneoc');
                checkFieldValidations(result.errors.barangay, 'selectid_barangayeocerror', 'selectid_barangayeoc');
                checkFieldValidations(result.errors.street, 'inputid_streeteocerror', 'inputid_streeteoc');
                checkFieldValidations(result.errors.cellphone, 'inputid_cellphoneeocerror', 'inputid_cellphoneeoc');
                checkFieldValidations(result.errors.image, 'hiddboxid_pictureeocerror', 'hiddboxid_pictureeoc');
                
                $("#buttonid_addwalkinpxeoc").prop("disabled", false);
            } 
            else
            { 
                $("#buttonid_addwalkinpxeoc").prop("disabled", true);
                
                uploadWalkinPatientImagetoDirectory();
                hideAddNewWalkinPatientModal();
                
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully saved!",
                    type: "success",
                    allowOutsideClick: false
                }, 
                function () 
                {
                    setToDefaultWalkinPatientManagementModal();
                    
                    walkinpx_table.ajax.reload();
                    $('#walkin-patients-masterlist-table_filter [type="search"]').val(opdno);
                    $('#walkin-patients-masterlist-table_filter [type="search"]').focus();
                    walkinpx_table.search(opdno).draw();
                });
            }
        }
    });
}

function checkFieldValidations(resultError, errorfield, field)
{
    var field1st5char = field.substring(0, 5);
    
    if (resultError !== '')
    {
        $('#' + errorfield).empty();
        $('#' + errorfield).append(resultError).removeAttr('hidden');
        
        if(field1st5char === "input")
        {
            $('#' + field).css('border-color', 'red');
        }
        else if(field1st5char === "selec")
        {
            $('#' + field).selectpicker('setStyle', 'btn-danger', 'add');
            $('#' + field).selectpicker('refresh');
        }
        else if(field1st5char === "hiddb")
        {
            $('#patientimguploadforaddpx').css("border-color", "red");
        }
        else
        {
            $('#inpusid_inpataccteoc').css('border-color', 'red');
            $('#spanid_inpataccteoc').css('border-top', '1px solid red');
            $('#spanid_inpataccteoc').css('border-bottom', '1px solid red');
            $('#spanid_inpataccteoc').css('border-right', '1px solid red');
        }
    } 
    else
    {
        $('#' + errorfield).attr('hidden', true);
        
        if(field1st5char === "input")
        {
            $('#' + field).css('border-color', '');
        }
        else if(field1st5char === "selec")
        {
            $('#' + field).selectpicker('setStyle', 'btn-danger', 'remove');
            $('#' + field).selectpicker('refresh');
        }
        else if(field1st5char === "hiddb")
        {
            $('#patientimguploadforaddpx').css("border-color", "#02bec0");
        }
        else
        {
            $('#inpusid_inpataccteoc').css('border-color', '');
            $('#spanid_inpataccteoc').css('border-color', '');
        }
    }
}

function generateOPDnumber()
{
    $.ajax
    ({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'EROPDcharges/GenerateOPDCode'
    })
    .done(function (result)
    {
        var opdcode = result[0].OPDno;
        var splitopdcode = opdcode.split('P');
        var incrementedNumber = incrementLeadingZeroNumber(splitopdcode[1], 1);
        var opdno = "OP" + incrementedNumber;
        opdno_value = opdno;
        $('#hiddboxid_opdcodeeoc').val(opdno);
    });
}

function incrementLeadingZeroNumber(leadingZeroString, amountToIncrement)
{
    var amountOfZerosToAdd = leadingZeroString.length;
    var stringToNumber = (+leadingZeroString);
    var zerosToAdd = new Array(amountOfZerosToAdd + 1).join( '0' );

    var zerosAndNewNumber = zerosToAdd + ( stringToNumber + amountToIncrement );
    var amountToSlice = (-1 * amountOfZerosToAdd);
    var newString = zerosAndNewNumber.slice(amountToSlice);
    return newString;
}

function setToDefaultWalkinPatientManagementModal()
{
    $("#buttonid_addwalkinpxeoc").prop("disabled", false);
    $("#anchorid_forgeneraltabadd").tab('show');
    $('#inpusid_inpataccteoc').val("").css('border-color', '');
    $('#inputid_fnameeoc').val("").css('border-color', '');
    $('#inputid_mnameeoc').val("").css('border-color', '');
    $('#inputid_lnameeoc').val("").css('border-color', '');
    $('#inputid_suffixeoc').val("").css('border-color', '');
    $('#inputid_memberideoc').val("").css('border-color', '');
    $('#selectid_gendereoc').selectpicker("val","");
    $('#selectid_gendereoc').selectpicker('setStyle', 'btn-danger', 'remove');
    $('#selectid_gendereoc').selectpicker("refresh");
    $('#inputid_birthdayeoc').val("").css('border-color', '');
    $('#inputid_wipxageeoc').val("").css('border-color', '');
    $('#selectid_provaddeoc').selectpicker("val","");
    $('#selectid_provaddeoc').selectpicker('setStyle', 'btn-danger', 'remove');
    $('#selectid_provaddeoc').selectpicker("refresh");
    $('#selectid_citymuneoc').selectpicker("val","");
    $('#selectid_citymuneoc').selectpicker('setStyle', 'btn-danger', 'remove');
    $('#selectid_citymuneoc').selectpicker("refresh");
    $('#selectid_barangayeoc').selectpicker("val","");
    $('#selectid_barangayeoc').selectpicker('setStyle', 'btn-danger', 'remove');
    $('#selectid_barangayeoc').selectpicker("refresh");
    $('#inputid_streeteoc').val("").css('border-color', '');
    $('#inputid_cellphoneeoc').val("").css('border-color', '');
    $('#inputid_dateeoc').val("").css('border-color', '');
    
    $('#inpusid_inpataccteocerror').html("").attr('hidden', true);
    $('#inputid_fnameeocerror').html("").attr('hidden', true);
    $('#inputid_mnameeocerror').html("").attr('hidden', true);
    $('#inputid_lnameeocerror').html("").attr('hidden', true);
    $('#selectid_gendereocerror').html("").attr('hidden', true);
    $('#inputid_birthdayeocerror').html("").attr('hidden', true);
    $('#inputid_wipxageeocerror').html("").attr('hidden', true);
    $('#selectid_provaddeocerror').html("").attr('hidden', true);
    $('#selectid_citymuneocerror').html("").attr('hidden', true);
    $('#selectid_barangayeocerror').html("").attr('hidden', true);
    $('#inputid_streeteocerror').html("").attr('hidden', true);
    $('#inputid_cellphoneeocerror').html("").attr('hidden', true);
    $('#inpusid_inpataccteoc').css('border-color', '');
    $('#spanid_inpataccteoc').css('border-color', '');
    
    var imagepath = BASE_URL + 'assets/images/uploads/walkinpx/default.png';

    $.ajax
    ({
        url: imagepath,
        type: 'HEAD',
        success: function ()
        {
            var img = $('#patientimguploadforaddpx').attr('src', imagepath);
            var src = img.attr('src');
            var i = src.indexOf('?dummy=');
            src = i !== -1 ? src.substring(0, i) : src;
            var d = new Date();
            img.attr('src', src + '?dummy=' + d.getTime());
        }
    });
    
    $('#hiddboxid_pictureeoc').val("");
}

function patientImageUploadForAddPatient()
{
    $('#openpatientimguploadforaddpx').trigger('click');
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
        
        $('#hiddboxid_pictureeoc').val("HASIMAGE");
    }
}

function calculateAge(birthdate)
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

    if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age)) 
    {
        $('#inputid_wipxageeoc').val("Invalid birthday - Please try again!");
    }
    else 
    {
        $('#inputid_wipxageeoc').val(year_age + "." + month_age);
    }
}

function uploadWalkinPatientImagetoDirectory()
{
    var patientImage = $('#openpatientimguploadforaddpx').prop('files')[0];
    var extension = patientImage.name.substr((patientImage.name.lastIndexOf('.') + 1));
    var form_data = new FormData();
    form_data.append("file", patientImage, $('#hiddboxid_opdcodeeoc').val() + 'w.' + extension);

    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Uploads/UploadWalkinPatientImage",
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json'
    })
    .done(function (data)
    {
        console.log(data);
    });
}

function showPatientMasterlistModalForEmergency()
{
    $('#pxmasterlistforemergency').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#walkinmanagementmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#pxmasterlistforemergency').css('overflow-y', 'scroll');

    pxmasterlist_table.on('dblclick', 'tr', function ()
    {
        var data = pxmasterlist_table.row(this).data();
        var pinnum = data[2];
        
        hidePatientMasterlistModalForEmergency();
    
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getPatientlistDataForQuickDataEdit",
            data: {pin: pinnum},
            dataType: 'json'
        })
        .done(function (data)
        {
            console.log(data);

            if (data.status)
            {
                $("#hiddboxid_slaccnteoc").val(data.patientlistdata['SLaccount']);
                $("#hiddboxid_mmbrnumeoc").val(data.patientlistdata['memberrefno']);
                $("#hiddboxid_pincodeeoc").val(data.patientlistdata['pincode']);
                $("#inpusid_inpataccteoc").val(data.patientlistdata['PIN']);
                $("#inputid_fnameeoc").val(data.patientlistdata['fname']);
                $("#inputid_mnameeoc").val(data.patientlistdata['mname']);
                $("#inputid_lnameeoc").val(data.patientlistdata['lname']);
                $("#inputid_suffixeoc").val(data.patientlistdata['suffix']);
                $("#inputid_memberideoc").val(data.patientlistdata['membercardno']);
                $("#selectid_gendereoc").selectpicker("val",data.patientlistdata['sex']);
                $("#inputid_birthdayeoc").val(data.patientlistdata['bday']);
                calculateAge(data.patientlistdata['bday']);
                $("#selectid_provaddeoc").selectpicker("val",data.patientlistdata['provadd']);
                $("#inputid_streeteoc").val(data.patientlistdata['adrs']);
                $("#inputid_cellphoneeoc").val(data.patientlistdata['mobileno']);

                var provid = data.patientlistdata['provadd'];
                var provarr = provid.split("-");
                var provcode = provarr[1];

                $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Admission/getMunicipality",
                    data: {providex: provcode},
                    dataType: 'json'
                })
                .done(function (data)
                {
                    $('#selectid_citymuneoc').empty();
                    $('#selectid_citymuneoc').append('<option value="">' + "Select from List" + '</option>');
                    for (var cv = 0; cv < data.length; cv++)
                    {
                        $('#selectid_citymuneoc').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
                    }
                    $('#selectid_citymuneoc').selectpicker('refresh');

                    $.ajax
                    ({
                        type: 'POST',
                        url: BASE_URL + "Emergency/getPatientListDataForEmergencyAdmitPatient",
                        data: {pinnum: pinnum},
                        dataType: 'json'
                    })
                    .done(function (data)
                    {
                        $('#selectid_citymuneoc').selectpicker('val', data.patientmasterlistdata['cityadd']);
                        $('#selectid_citymuneoc').removeAttr('disabled');
                        $('#selectid_citymuneoc').selectpicker('refresh');

                        var citymunid = $("#selectid_citymuneoc").val();
                        var citymunarr = citymunid.split("-");
                        var citymuncode = citymunarr[1];

                        $.ajax
                        ({
                            type: 'POST',
                            url: BASE_URL + "Admission/getBarangay",
                            data:
                            {
                                citymuncodex: citymuncode,
                                provcodex: provcode
                            },
                            dataType: 'json'
                        })
                        .done(function (data)
                        {
                            $('#selectid_barangayeoc').empty();
                            $('#selectid_barangayeoc').append('<option value="">' + "Select from List" + '</option>');
                            for (var cv = 0; cv < data.length; cv++)
                            {
                                $('#selectid_barangayeoc').append('<option value="' + data[cv]['BRGY_NAME'] + '">' + data[cv]['BRGY_NAME'] + '</option>');
                            }
                            $('#selectid_barangayeoc').selectpicker('refresh');

                            $.ajax
                            ({
                                type: 'POST',
                                url: BASE_URL + "Emergency/getPatientListDataForEmergencyAdmitPatient",
                                data: {pinnum: pinnum},
                                dataType: 'json'
                            })
                            .done(function (data)
                            {
                                $('#selectid_barangayeoc').selectpicker('val', data.patientmasterlistdata['brgy']);
                                $('#selectid_barangayeoc').removeAttr('disabled');
                                $('#selectid_barangayeoc').selectpicker('refresh');

                                $("#inputid_streeteoc").removeAttr('disabled');
                            });
                        });
                    });
                });
            }
        });
    });
}

function hidePatientMasterlistModalForEmergency()
{
    $('#pxmasterlistforemergency').modal("hide");

    $('#walkinmanagementmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#walkinmanagementmodal').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
}

function selectPatient()
{
    var data;

    $('#search-allpatient-table-foremergency-admission tbody').on('click', 'tr', function ()
    {
        $('#search-allpatient-table-foremergency-admission').dataTable().$('tr.bg-blue').removeClass('bg-blue');
        $(this).addClass('bg-blue');

        var data = $('#search-allpatient-table-foremergency-admission').DataTable().row('.bg-blue').data();
        selectedPatient = data;
    });
}

function getAllPatientMasterlistAndAddItToTheTable()
{
    pxmasterlist_table = $('#search-allpatient-table-foremergency-admission').DataTable
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
            url: BASE_URL + 'Emergency/GetAllPatientFromMasterlist',
            type: 'POST'
        },
        createdRow: function (row, data, dataIndex)
        {
            var data = dataIndex + 1;
            $('td', row).eq(0).html("&nbsp;&nbsp;&nbsp;&nbsp;" + data);
        },
        initComplete: function (settings, json)
        {

        }
    });
}

function selectPatientForEmergencyOrQuickAdmitPatient()
{
    var pinnum = selectedPatient[2];
    
    hidePatientMasterlistModalForEmergency();
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getPatientlistDataForQuickDataEdit",
        data: {pin: pinnum},
        dataType: 'json'
    })
    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {
            $("#hiddboxid_slaccnteoc").val(data.patientlistdata['SLaccount']);
            $("#hiddboxid_mmbrnumeoc").val(data.patientlistdata['memberrefno']);
            $("#hiddboxid_pincodeeoc").val(data.patientlistdata['pincode']);
            $("#inpusid_inpataccteoc").val(data.patientlistdata['PIN']);
            $("#inputid_fnameeoc").val(data.patientlistdata['fname']);
            $("#inputid_mnameeoc").val(data.patientlistdata['mname']);
            $("#inputid_lnameeoc").val(data.patientlistdata['lname']);
            $("#inputid_suffixeoc").val(data.patientlistdata['suffix']);
            $("#inputid_memberideoc").val(data.patientlistdata['membercardno']);
            $("#selectid_gendereoc").selectpicker("val",data.patientlistdata['sex']);
            $("#inputid_birthdayeoc").val(data.patientlistdata['bday']);
            calculateAge(data.patientlistdata['bday']);
            $("#selectid_provaddeoc").selectpicker("val",data.patientlistdata['provadd']);
            $("#inputid_streeteoc").val(data.patientlistdata['adrs']);
            $("#inputid_cellphoneeoc").val(data.patientlistdata['mobileno']);
            
            var provid = data.patientlistdata['provadd'];
            var provarr = provid.split("-");
            var provcode = provarr[1];

            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getMunicipality",
                data: {providex: provcode},
                dataType: 'json'
            })
            .done(function (data)
            {
                $('#selectid_citymuneoc').empty();
                $('#selectid_citymuneoc').append('<option value="">' + "Select from List" + '</option>');
                for (var cv = 0; cv < data.length; cv++)
                {
                    $('#selectid_citymuneoc').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
                }
                $('#selectid_citymuneoc').selectpicker('refresh');

                $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Emergency/getPatientListDataForEmergencyAdmitPatient",
                    data: {pinnum: pinnum},
                    dataType: 'json'
                })
                .done(function (data)
                {
                    $('#selectid_citymuneoc').selectpicker('val', data.patientmasterlistdata['cityadd']);
                    $('#selectid_citymuneoc').removeAttr('disabled');
                    $('#selectid_citymuneoc').selectpicker('refresh');

                    var citymunid = $("#selectid_citymuneoc").val();
                    var citymunarr = citymunid.split("-");
                    var citymuncode = citymunarr[1];

                    $.ajax
                    ({
                        type: 'POST',
                        url: BASE_URL + "Admission/getBarangay",
                        data:
                        {
                            citymuncodex: citymuncode,
                            provcodex: provcode
                        },
                        dataType: 'json'
                    })
                    .done(function (data)
                    {
                        $('#selectid_barangayeoc').empty();
                        $('#selectid_barangayeoc').append('<option value="">' + "Select from List" + '</option>');
                        for (var cv = 0; cv < data.length; cv++)
                        {
                            $('#selectid_barangayeoc').append('<option value="' + data[cv]['BRGY_NAME'] + '">' + data[cv]['BRGY_NAME'] + '</option>');
                        }
                        $('#selectid_barangayeoc').selectpicker('refresh');

                        $.ajax
                        ({
                            type: 'POST',
                            url: BASE_URL + "Emergency/getPatientListDataForEmergencyAdmitPatient",
                            data: {pinnum: pinnum},
                            dataType: 'json'
                        })
                        .done(function (data)
                        {
                            $('#selectid_barangayeoc').selectpicker('val', data.patientmasterlistdata['brgy']);
                            $('#selectid_barangayeoc').removeAttr('disabled');
                            $('#selectid_barangayeoc').selectpicker('refresh');

                            $("#inputid_streeteoc").removeAttr('disabled');
                        });
                    });
                });
            });
        }
    });
}

function onChangeProvinceSelectForAddPxEoc()
{
    var provid = $("#selectid_provaddeoc").val();
    var provarr = provid.split("-");
    var provcode = provarr[1];

    if (provid === "")
    {
        $('#selectid_citymuneoc').prop('disabled', true);
        $('#selectid_barangayeoc').prop('disabled', true);
        $('#inputid_streeteoc').prop('disabled', true);
        
        $('#selectid_citymuneoc').selectpicker('val', '');
        $('#selectid_barangayeoc').selectpicker('val', '');
        $('#inputid_streeteoc').val('');

        $('#selectid_citymuneoc').selectpicker('refresh');
        $('#selectid_barangayeoc').selectpicker('refresh');
    } 
    else
    {
        $('#selectid_citymuneoc').prop('disabled', false);
        $('#selectid_citymuneoc').selectpicker('refresh');
        
        $('#selectid_barangayeoc').prop('disabled', true);
        $('#inputid_streeteoc').prop('disabled', true);
        
        $('#selectid_barangayeoc').selectpicker('val', '');
        $('#inputid_streeteoc').val('');
        
        $('#selectid_citymuneoc').selectpicker('refresh');
        $('#selectid_barangayeoc').selectpicker('refresh');

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getMunicipality",
            data: {providex: provcode},
            dataType: 'json'
        })
        .done(function (data)
        {
            console.log(data);
            $('#selectid_citymuneoc').empty();
            $('#selectid_citymuneoc').append('<option value="">' + "Select From List" + '</option>');
            for (var cv = 0; cv < data.length; cv++)
            {
                console.log(data[cv]['MUN_NAME']);
                $('#selectid_citymuneoc').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
            }
            $('#selectid_citymuneoc').selectpicker('refresh');
        });
    }
}

function onChangeMunicipalSelectForAddPxEoc()
{
    var provid = $("#selectid_provaddeoc").val();
    var citymunid = $("#selectid_citymuneoc").val();
    var provarr = provid.split("-");
    var citymunarr = citymunid.split("-");
    var provcode = provarr[1];
    var citymuncode = citymunarr[1];
    if (citymunid === "")
    {        
        $('#selectid_barangayeoc').prop('disabled', true);
        $('#inputid_streeteoc').prop('disabled', true);

        $('#selectid_barangayeoc').selectpicker('val', 'select');
        $('#inputid_streeteoc').val('');
        
        $('#selectid_barangayeoc').selectpicker('refresh');
    } 
    else
    {
        $('#selectid_barangayeoc').prop('disabled', false);
        $('#selectid_barangayeoc').selectpicker('refresh');
        
        $('#inputid_streeteoc').prop('disabled', true);
        $('#inputid_streeteoc').val('');

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getBarangay",
            data:
            {
                citymuncodex: citymuncode,
                provcodex: provcode
            },
            dataType: 'json'
        })
        .done(function (data)
        {
            $('#selectid_barangayeoc').empty();
            $('#selectid_barangayeoc').append('<option value="">' + "Select From List" + '</option>');
            for (var cv = 0; cv < data.length; cv++)
            {
                console.log(data[cv]['MUN_NAME']);
                $('#selectid_barangayeoc').append('<option value="' + data[cv]['BRGY_NAME'] + '">' + data[cv]['BRGY_NAME'] + '</option>');
            }
            $('#selectid_barangayeoc').selectpicker('refresh');
        });
    }
}

function onChangeBarangaySelectForAddPxEoc()
{
    var brgay = $("#selectid_barangayeoc").val();
    if (brgay === "")
    {
        $('#inputid_streeteoc').prop('disabled', true);
        $('#inputid_streeteoc').val('');
    } 
    else
    {
        $('#inputid_streeteoc').prop('disabled', false);
        $('#inputid_streeteoc').val('');
    }
}

function deletePatient(PIN)
{
    swal
    ({
        title: "Are you sure?",
        text: "You will not be able to recover the selected patient record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No",
        closeOnConfirm: false
    },
    function ()
    {
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/deletePatient",
            data: {pin: PIN},
            dataType: 'json'
        })

        .done(function (data)
        {
            $(".confirm").attr('disabled', 'disabled'); 
            $(".cancel").attr('disabled', 'disabled'); 

            if (data.status)
            {
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully deleted!",
                    type: "success",
                    allowOutsideClick: false
                });
                $('#search-allpatient-table-foremergency-admission').DataTable().ajax.reload();
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    });
}

function showQuickEditModal(PIN)
{
    $('#quickdataeditmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#pxmasterlistforemergency').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#quickdataeditmodal').css('overflow-y', 'scroll');
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getPatientlistDataForQuickDataEdit",
        data: {pin: PIN},
        dataType: 'json'
    })
    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {
            $("#inputid_pxnameqck").html(data.patientlistdata['name']);
            $("#inputid_pincodeqck").html(data.patientlistdata['pincode']);
            $("#inputid_indexnoqck").val(PIN);
            
            var hrncode = data.patientlistdata['HRNcode'];
            var hrnnumber = hrncode.toString().replace(/\B(?=(?:\d{2})+(?!\d))/g, "-");
            $("#inputid_healthrecnoqck").val(hrnnumber);
            
            var lastdischdate = data.patientlistdata['lastdischdate'];
            $("#inputid_oldrecrdqck").val(lastdischdate);
            
            var oldrecord = data.patientlistdata['oldrecord'];
            if(oldrecord === "0")
            {
                $('#inputid_oldrecrdqck').prop('disabled',true);
                $('#oldrecordswitchvalueindicatorqck').val("OFF");
                $('#oldrecordchkboxqck').prop('checked',false);
            }
            else
            {
                $('#inputid_oldrecrdqck').prop('disabled',false);
                $('#oldrecordswitchvalueindicatorqck').val("ON");
                $('#oldrecordchkboxqck').prop('checked',true);
            }
            
            var hrnverify = data.patientlistdata['HRNverified'];
            if(hrnverify === "0")
            {
                $('#healthrecnumswitchvalueindicatorqck').val("NO");
                $('#healthrecnumchkboxqck').prop('checked',false);
            }
            else
            {
                $('#healthrecnumswitchvalueindicatorqck').val("YES");
                $('#healthrecnumchkboxqck').prop('checked',true);
            }
        }
    });
    
}

function hideQuickEditModal()
{
    $('#quickdataeditmodal').modal("hide");

    $('#pxmasterlistforemergency').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#pxmasterlistforemergency').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');

}

function showAddPatientsModal()
{
    $('#addpatientsmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $(".modal-body").css("padding-top", 'none');
    $(".modal-body").css("margin-top", 'none');

    $('#pxmasterlistforemergency').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#addpatientsmodal').css('overflow-y', 'scroll');
}

function hideAddPatientModal()
{
    $('#addpatientsmodal').modal("hide");

    $('#pxmasterlistforemergency').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    clearAllAddPatientFields();

    $('#search-patient-table').DataTable().ajax.reload();
    $('#pxmasterlistforemergency').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
    
    setAddPatientModalToDefaultView();
}

function clearAllAddPatientFields()
{
    $("#taxerr").text("");
    $("#hrnerr").text("");
    $("#fnaerr").text("");
    $("#lnaerr").text("");
    $("#mnaerr").text("");
    $("#moberr").text("");
    $("#birerr").text("");
    $("#civerr").text("");
    $("#sexerr").text("");
    $("#relerr").text("");
    $("#naterr").text("");
    $("#proverr").text("");
    $("#cityerr").text("");
    $("#ziperr").text("");
    $("#barerr").text("");
    $("#strerr").text("");
    $("#motnerr").text("");
    $("#fatnerr").text("");
    $("#motrerr").text("");
    $("#fatrerr").text("");
    $("#motnaterr").text("");
    $("#fatnaterr").text("");
    $("#phmemerr").text("");
    $("#slcerr").text("");

    $("#inputid_fname").val("");
    $("#inputid_mname").val("");
    $("#inputid_mname").val("");
    $("#inputid_lname").val("");
    $("#inputid_suffix").val("");
    $("#inputid_emailadd").val("");
    $("#inputid_mobile").val("");
    $("#inputid_landline").val("");
    $("#inputid_birthday").val("");
    $("#inputid_passport").val("");
    $("#inputid_zipcodex").val("");
    $("#inputid_street").val("");
    $("#inputid_phmember").val("");
    $("#inputid_phidnumb").val("");
    $("#inputid_tinnum").val("");
    $("#inputid_slcode").val("");
    $("#inputid_healthrecno").val("");
    $("#inputid_oldrecrd").val("");
    $("#inputid_mothersname").val("");
    $("#inputid_fathersname").val("");
    $("#inputid_spouse").val("");
    $("#inputid_spousebday").val("");
    $("#inputid_mothersadrs").val("");
    $("#inputid_fathersadrs").val("");

    $('#selectid_mothernation').selectpicker('val', "");
    $('#selectid_fathernation').selectpicker('val', "");
    $('#selectid_membership').selectpicker('val', "");
    $('#selectid_civilstatusx').selectpicker('val', "");
    $('#selectid_genderoption').selectpicker('val', "");
    $('#selectid_religionsele').selectpicker('val', "");
    $('#selectid_nationalityx').selectpicker('val', "");
    $('#selectid_province').selectpicker('val', "");
    $('#selectid_citymuni').selectpicker('val', "");
    $('#selectid_phmembership').selectpicker('val', "");
    $('#selectid_barangay').selectpicker('val', "");
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

function validateAddPatientForm()
{
    var error = 0;
    var general = 0;
    var profile = 0;
    var account = 0;
    var others = 0;


    var tax = $("#inputid_tinnum").val();
    if (tax === "")
    {
        $("#taxerr").text("Required Field!");
        error++;
        account++;
    }
    else
    {
        $("#taxerr").text("");
    }

    var hrn = $("#inputid_healthrecno").val();
    if (hrn === "")
    {
        $("#hrnerr").text("Required Field!");
        error++;
        account++;
    }
    else
    {
        $("#hrnerr").text("");
    }

    var slc = $("#inputid_slcode").val();
    if (slc === "")
    {
        $("#slcerr").text("Required Field!");
        error++;
        account++;
    } else
    {
        $("#slcerr").text("");
    }

    var fname = $("#inputid_fname").val();
    if (fname === "")
    {
        $("#fnaerr").text("Required Field!");
        error++;
        general++;
    } else
    {
        $("#fnaerr").text("");
    }

    var lname = $("#inputid_lname").val();
    if (lname === "")
    {
        $("#lnaerr").text("Required Field!");
        error++;
        general++;
    } else
    {
        $("#lnaerr").text("");
    }

    var mname = $("#inputid_mname").val();
    if (mname === "")
    {
        $("#mnaerr").text("Required Field!");
        error++;
        general++;
    } else
    {
        $("#mnaerr").text("");
    }

    var mob = $("#inputid_mobile").val();
    if (mob === "" || mob === "--")
    {
        $("#moberr").text("Required Field!");
        error++;
        general++;
    } else
    {
        $("#moberr").text("");
    }

    var bir = $("#inputid_birthday").val();
    if (bir === "")
    {
        $("#birerr").text("Required Field!");
        error++;
        others++;
    } else
    {
        $("#birerr").text("");
    }

    var civ = $("#selectid_civilstatusx").val();
    if (civ === "Select")
    {
        $("#civerr").text("Required Field!");
        error++;
        profile++;
    } else
    {
        $("#civerr").text("");
    }


    var gender = $("#selectid_genderoption").val();
    if (gender === "Select From List")
    {
        $("#sexerr").text("Required Field!");
        error++;
        profile++;
    } else
    {
        $("#sexerr").text("");
    }


    var rel = $("#selectid_religionsele").val();
    if (rel === "Select from List")
    {
        $("#relerr").text("Required Field!");
        error++;
        profile++;
    } else
    {
        $("#relerr").text("");
    }


    var nat = $("#selectid_nationalityx").val();
    if (nat === "Select from List")
    {
        $("#naterr").text("Required Field!");
        error++;
        profile++;
    } else
    {
        $("#naterr").text("");
    }


    var prov = $("#selectid_province").val();
    if (prov === "select")
    {
        $("#proverr").text("Required Field!");
        error++;
        profile++;
    }
    else
    {
        $("#proverr").text("");
    }


    var city = $("#selectid_citymuni").val();
    if (city === "select")
    {
        $("#cityerr").text("Required Field!");
        error++;
        profile++;
    }
    else
    {
        $("#cityerr").text("");
    }


    var zip = $("#inputid_zipcodex").val();
    if (zip === "")
    {
        $("#ziperr").text("Required Field!");
        error++;
        profile++;
    } else
    {
        $("#ziperr").text("");
    }


    var bar = $("#selectid_barangay").val();
    if (bar === "select")
    {
        $("#barerr").text("Required Field!");
        error++;
        profile++;
    } 
    else
    {
        $("#barerr").text("");
    }


    var str = $("#inputid_street").val();
    if (str === "")
    {
        $("#strerr").text("Required Field!");
        error++;
        profile++;
    } else
    {
        $("#strerr").text("");
    }


    var motn = $("#inputid_mothersname").val();
    if (motn === "")
    {
        $("#motnerr").text("Required Field!");
        error++;
        others++;
    } else
    {
        $("#motnerr").text("");
    }


    var fatn = $("#inputid_fathersname").val();
    if (fatn === "")
    {
        $("#fatnerr").text("Required Field!");
        error++;
        others++;
    } else
    {
        $("#fatnerr").text("");
    }

    var motr = $("#inputid_mothersadrs").val();
    if (motr === "")
    {
        $("#motrerr").text("Required Field!");
        error++;
        others++;
    } else
    {
        $("#motrerr").text("");
    }


    var fatr = $("#inputid_fathersadrs").val();
    if (fatr === "")
    {
        $("#fatrerr").text("Required Field!");
        error++;
        others++;
    } else
    {
        $("#fatrerr").text("");
    }


    var motnat = $("#selectid_mothernation").val();
    if (motnat === "Select from List")
    {
        $("#motnaterr").text("Required Field!");
        error++;
        others++;
    } else
    {
        $("#motnaterr").text("");
    }


    var fatnat = $("#selectid_fathernation").val();
    if (fatnat === "Select from List")
    {
        $("#fatnaterr").text("Required Field!");
        error++;
        others++;
    } else
    {
        $("#fatnaterr").text("");
    }


    var phmem = $("#selectid_phmembership").val();
    if (phmem === "Select from List")
    {
        $("#phmemerr").text("Required Field!");
        error++;
        account++;
    } else
    {
        $("#phmemerr").text("");
    }
    
    if (others > 0)
    {
        $("#anchorid_forotherstabadd").tab('show');
        $("#otherserrtabindicatoradd").html("*");
    }
    else
    {
        $("#otherserrtabindicatoradd").html("");
    }
    
    if (account > 0)
    {
        $("#anchorid_foraccounttabadd").tab('show');
        $("#accounterrtabindicatoradd").html("*");
    }
    else
    {
        $("#accounterrtabindicatoradd").html("");
    }
    
    if (profile > 0)
    {
        $("#anchorid_forprofiletabadd").tab('show');
        $("#profileerrtabindicatoradd").html("*");
    }
    else
    {
        $("#profileerrtabindicatoradd").html("");
    }

    if (general > 0)
    {
        $("#anchorid_forgeneraltabadd").tab('show');
        $("#generalerrtabindicatoradd").html("*");
    }
    else
    {
        $("#generalerrtabindicatoradd").html("");
    }

    if (error > 0)
    {
        swal
        ({
            title: "Validation Notice!",
            text: "Some field requires your attention!!",
            type: "warning",
            allowOutsideClick: false
        });
        
        $('.addPatientButton').removeAttr('disabled');
    }
    else
    {
        $('.addPatientButton').attr('disabled', true);

        var suffix = $("#inputid_suffix").val();
        var fullname = (lname + ", " + fname + " " + suffix + " " + mname).toUpperCase();

        checkDuplicateNameForAddPatient(fullname);
    }
}

function checkDuplicateNameForAddPatient(completename)
{
    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getPatientlistDataForCheckDuplicateOfAddPatient",
                data: {completenamex: completename},
                dataType: 'json'
            })

            .done(function (data)
            {
                console.log(data);

                if (data.status)
                {
                    swal
                            ({
                                title: "Duplicate Notice!",
                                text: "Name already exists!",
                                type: "warning",
                                allowOutsideClick: false
                            });
                            
                    $('.addPatientButton').removeAttr('disabled');
                }
                else
                {
                    $('.addPatientButton').attr('disabled', true);
                    var indexno = $("#inputid_pxindex").val();
                    checkDuplicateIndexForAddPatient(indexno);
                }
            });
}

function checkDuplicateIndexForAddPatient(pxindexno)
{    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getPatientlistDataForCheckDuplicateIndexOfAddPatient",
        data: {pxindexnox: pxindexno},
        dataType: 'json'
    })

    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {
            swal
            ({
                title: "Duplicate Notice!",
                text: "Index No.already exists!\nIndex Field will be refreshed!",
                type: "info",
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            },
            function () 
            {             
                $('#indexreloadifduplicatedivid').load(document.URL + ' #indexreloadifduplicatedivid');
                
                setTimeout(function () 
                {
                    swal
                    ({
                        title: "Success",
                        text: "Index number is successfully refreshed!",
                        type: "success",
                        confirmButtonText: "OK"
                    });
                }, 2000);
            });
            
            $('#anchorid_forgeneraltabadd').tab('show');
            $('.addPatientButton').removeAttr('disabled');
        }
        else
        {
            $('.addPatientButton').attr('disabled', true);
            checkDuplicateSLCodeForAddPatient();
        }
    });
}

function checkDuplicateSLCodeForAddPatient()
{    
    var slCode = $('#inputid_slcode').val();
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getSLAccountDataForCheckDuplicateSLCodeOfAddPatient",
        data: {slCodex: slCode},
        dataType: 'json'
    })
    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {
            swal
            ({
                title: "Duplicate Notice!",
                text: "The submitted SL Code " + slCode + ", already exists!\nSL Code Field will be refreshed!",
                type: "info",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            },
            function () 
            {             
                $.ajax
                ({
                    type: 'POST',
                    dataType: 'json',
                    url: BASE_URL + 'SLCode/GenerateSLCode'
                })

                .done(function (result)
                {
                    var SLCODE = result[0].SLCODE;
                    var splitDoccode = SLCODE.split('L');
                    var convertSLCodeToInt = parseInt(splitDoccode[1]);
                    var incrementSLCode = convertSLCodeToInt + 1;

                    $('#inputid_slcode').val('SL' + incrementSLCode);
                });
                
                setTimeout(function () 
                {
                    var newslcode = $('#inputid_slcode').val();
                    
                    swal
                    ({
                        title: "Success",
                        text: "SL Code is successfully refreshed!\nNew SL Code value is " + newslcode,
                        type: "success",
                        confirmButtonText: "OK"
                    });
                    
                    $('#anchorid_foraccounttabadd').tab('show');
                }, 2000);
            });
            
            $('.savebuttonsl').removeAttr('disabled');
            $('#slcodecheckadd').removeClass('d-none');
            $('.addPatientButton').removeAttr('disabled');
        }
        else
        {
            $('.addPatientButton').attr('disabled', true);
            uploadPatientImageForAddPatient();
        }
    });
}


function uploadPatientImageForAddPatient()
{
    if ($('#openpatientimguploadforaddpx').val() === '')
    {
        $('.addPatientButton').removeAttr('disabled');
        $('#patientimguploadforaddpx').css("border-color", "red");

        swal
        ({
            title: "Picture Notice!",
            text: "You haven't choose a photo!",
            type: "warning",
            allowOutsideClick: false
        });
    }
    else
    {
        $('.addPatientButton').attr('disabled', true);
        $('#patientimguploadforaddpx').css("border-color", "#02bec0");
        
        var patientImage = $('#openpatientimguploadforaddpx').prop('files')[0];
        var extension = patientImage.name.substr((patientImage.name.lastIndexOf('.') + 1));
        var form_data = new FormData();
        form_data.append("file", patientImage, $('#inputid_pxindex').val() + 'p.' + extension);

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Uploads/UploadPatientImage",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json'
        })
        .done(function (data)
        {
            console.log(data);
            addPatients();
        });
    }
}

function addPatients()
{
    $.ajax
            (
                    {
                        type: 'POST',
                        url: BASE_URL + "Admission/addNewPatient",
                        data: $('#insert-patient-form').serialize(),
                        dataType: 'json'
                    }
            )

            .done
            (
                    function (data)
                    {
                        console.log(data);

                        $('#addpatientsmodal').modal("hide");
                        
                        showPatientMasterlistModalForEmergency();

                        pxmasterlist_table.ajax.reload();

                        swal
                        ({
                            title: "Success!",
                            text: "Record is successfully saved!",
                            type: "success",
                            allowOutsideClick: false
                        },
                        function ()
                        {
                            var indexno = $("#inputid_pxindex").val();

                            $('#search-allpatient-table-foremergency-admission_filter [type="search"]').val(indexno);
                            $('#search-allpatient-table-foremergency-admission_filter [type="search"]').focus();
                            pxmasterlist_table.search(indexno).draw();
                        });
                        
                        $('.addPatientButton').removeAttr('disabled');
                        setAddPatientModalToDefaultView();
                    }
            );
}

function setAddPatientModalToDefaultView()
{
    var imagepath = BASE_URL + 'assets/images/px.png';
    
    $.ajax
    ({
        url: imagepath,
        type: 'HEAD',
        success: function ()
        {
            var img = $('#patientimguploadforaddpx').attr('src', imagepath);
            var src = img.attr('src');
            var i = src.indexOf('?dummy=');
            src = i !== -1 ? src.substring(0, i) : src;
            var d = new Date();
            img.attr('src', src + '?dummy=' + d.getTime());
        }
    });
    
    $("#fatheradrschkbox").prop('checked', false);
    $("#motheradrschkbox").prop('checked', false);
    $("#oldrecordchkbox").prop('checked', false);
    $("#healthrecnumchkbox").prop('checked', false);
    $("#archivechkbox").prop('checked', false);
    
    $("#motheradrsvalueindicator").val("NO");
    $("#fatheradrsvalueindicator").val("NO");
    $("#healthrecnumswitchvalueindicator").val("NO");
    $("#oldrecordswitchvalueindicator").val("OFF");
    $("#inputid_archive").val("NONE");
    
    $("#inputid_oldrecrd").prop('disabled', true);
    $("#inputid_oldrecrd").prop('placeholder', 'Old Record');
    
    $('#indexreloadifduplicatedivid').load(document.URL + ' #indexreloadifduplicatedivid');
    $("#patientimguploadforaddpx").css("border-color", "#02bec0");
    
    $("#anchorid_forgeneraltabadd").tab('show');
    
    $("#openpatientimguploadforaddpx").val("");
    $("#generalerrtabindicatoradd").html("");
    $("#profileerrtabindicatoradd").html("");
    $("#accounterrtabindicatoradd").html("");
    $("#otherserrtabindicatoradd").html("");
    
    $("#taxerr").html("");
    $("#hrnerr").html("");
    $("#fnaerr").html("");
    $("#lnaerr").html("");
    $("#mnaerr").html("");
    $("#moberr").html("");
    $("#birerr").html("");
    $("#civerr").html("");
    $("#sexerr").html("");
    $("#relerr").html("");
    $("#naterr").html("");
    $("#proverr").html("");
    $("#cityerr").html("");
    $("#ziperr").html("");
    $("#barerr").html("");
    $("#strerr").html("");
    $("#motnerr").html("");
    $("#fatnerr").html("");
    $("#motrerr").html("");
    $("#fatrerr").html("");
    $("#motnaterr").html("");
    $("#fatnaterr").html("");
    $("#phmemerr").html("");
    $("#slcerr").html("");

    $("#inputid_fname").val("");
    $("#inputid_mname").val("");
    $("#inputid_mname").val("");
    $("#inputid_lname").val("");
    $("#inputid_suffix").val("");
    $("#inputid_emailadd").val("");
    $("#inputid_mobile").val("");
    $("#inputid_landline").val("");
    $("#inputid_birthday").val("");
    $("#inputid_passport").val("");
    $("#inputid_zipcodex").val("");
    $("#inputid_street").val("");
    $("#inputid_phmember").val("");
    $("#inputid_phidnumb").val("");
    $("#inputid_tinnum").val("");
    $("#inputid_slcode").val("");
    $("#inputid_healthrecno").val("");
    $("#inputid_oldrecrd").val("");
    $("#inputid_mothersname").val("");
    $("#inputid_fathersname").val("");
    $("#inputid_spouse").val("");
    $("#inputid_spousebday").val("");
    $("#inputid_mothersadrs").val("");
    $("#inputid_fathersadrs").val("");

    $('#selectid_mothernation').selectpicker('val', "Select from List");
    $('#selectid_fathernation').selectpicker('val', "Select from List");
    $('#selectid_membership').selectpicker('val', "Select from List");
    $('#selectid_civilstatusx').selectpicker('val', "Select");
    $('#selectid_genderoption').selectpicker('val', "Select From List");
    $('#selectid_religionsele').selectpicker('val', "Select from List");
    $('#selectid_nationalityx').selectpicker('val', "Select from List");
    $('#selectid_province').selectpicker('val', "select");
    $('#selectid_phmembership').selectpicker('val', "Select from List");

    $('#selectid_citymuni').prop('disabled', true);
    $('#selectid_barangay').prop('disabled', true);
    $('#inputid_street').prop('disabled', true);
    $('#inputid_phmember').prop('disabled', true);
    $('#inputid_phidnumb').prop('disabled', true);
    $('#selectid_citymuni').selectpicker('val', 'select');
    $('#selectid_barangay').selectpicker('val', 'select');
    $('#selectid_citymuni').selectpicker('refresh');
    $('#selectid_barangay').selectpicker('refresh');
}

function enableDisableLastDischargedText()
{
    var lastdischargeswitch = $('#oldrecordswitchvalueindicator').val();
    
    if(lastdischargeswitch === "ON")
    {
        $('#oldrecordswitchvalueindicator').val("OFF");
        $('#inputid_oldrecrd').prop('disabled', true);
        $('#inputid_oldrecrd').prop('placeholder', "Old Record");
        $('#inputid_oldrecrd').val("");
    }
    else
    {
        $('#oldrecordswitchvalueindicator').val("ON");
        $('#inputid_oldrecrd').prop('disabled', false);
        $('#inputid_oldrecrd').prop('placeholder', "YYYY-MM-DD");
    }
}

function enableDisableHRNisVerified()
{
    var healthrecnumswitch = $('#healthrecnumswitchvalueindicator').val();
    
    if(healthrecnumswitch === "YES")
    {
        $('#healthrecnumswitchvalueindicator').val("NO");
    }
    else
    {
        $('#healthrecnumswitchvalueindicator').val("YES");
    }
}

function enableDisableSameasPatientAddressSwitchForMotherAdress()
{
    var motheradrsswitch = $('#motheradrsvalueindicator').val();
    
    var selectid_province = $('#selectid_province').val();
    var provsplit = selectid_province.split("-");
    var provvalue = provsplit[0];
    var selectid_citymuni = $('#selectid_citymuni').val();
    var citysplit = selectid_citymuni.split("-");
    var cityvalue = citysplit[0];
    var selectid_barangay = $('#selectid_barangay').val();
    var inputid_street    = $('#inputid_street').val();
    
    var patientfulladdress = inputid_street + " " + selectid_barangay + " " + cityvalue + ", " + provvalue;
    
    if(motheradrsswitch === "YES")
    {
        $('#motheradrsvalueindicator').val("NO");
        $('#inputid_mothersadrs').val("");
    }
    else
    {
        if(provvalue === "select" || cityvalue === "select" || selectid_barangay === "select" || inputid_street === "")
        {
            $('#motrerr').html("Complete px address first!");
            $('#inputid_mothersadrs').val("");
            $('#motheradrsvalueindicator').val("NO");
            $('#motheradrschkbox').prop('checked', false);
            $('#motheradrschkbox').prop('checked', false);
        }
        else
        {
            $('#motrerr').html("");
            $('#inputid_mothersadrs').val(patientfulladdress);
            $('#motheradrsvalueindicator').val("YES");
        }
    }
}

function enableDisableSameasPatientAddressSwitchForFatherAdress()
{
    var fatheradrsswitch = $('#fatheradrsvalueindicator').val();
    
    var selectid_province = $('#selectid_province').val();
    var provsplit = selectid_province.split("-");
    var provvalue = provsplit[0];
    var selectid_citymuni = $('#selectid_citymuni').val();
    var citysplit = selectid_citymuni.split("-");
    var cityvalue = citysplit[0];
    var selectid_barangay = $('#selectid_barangay').val();
    var inputid_street    = $('#inputid_street').val();
    
    var patientfulladdress = inputid_street + " " + selectid_barangay + " " + cityvalue + ", " + provvalue;
    
    if(fatheradrsswitch === "YES")
    {
        $('#fatheradrsvalueindicator').val("NO");
        $('#inputid_fathersadrs').val("");
    }
    else
    {
        if(provvalue === "select" || cityvalue === "select" || selectid_barangay === "select" || inputid_street === "")
        {
            $('#fatrerr').html("Complete px address first!");
            $('#inputid_fathersadrs').val("");
            $('#fatheradrsvalueindicator').val("NO");
            $('#fatheradrschkbox').prop('checked', false);
            $('#fatheradrschkbox').prop('checked', false);
        }
        else
        {
            $('#fatrerr').html("");
            $('#inputid_fathersadrs').val(patientfulladdress);
            $('#fatheradrsvalueindicator').val("YES");
        }
    }
}

function enableDisableSameasPatientAddressSwitchForMotherAdressForEdtPx()
{
    var motheradrsswitch = $('#motheradrsvalueindicatoredt').val();
    
    var selectid_province = $('#selectid_provinceedt').val();
    var provsplit = selectid_province.split("-");
    var provvalue = provsplit[0];
    var selectid_citymuni = $('#selectid_citymuniedt').val();
    var citysplit = selectid_citymuni.split("-");
    var cityvalue = citysplit[0];
    var selectid_barangay = $('#selectid_barangayedt').val();
    var inputid_street    = $('#inputid_streetedt').val();
    
    var patientfulladdress = inputid_street + " " + selectid_barangay + " " + cityvalue + ", " + provvalue;
    
    if(motheradrsswitch === "YES")
    {
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");
    }
    else
    {
        if(provvalue === "select" || cityvalue === "select" || selectid_barangay === "select" || inputid_street === "")
        {
            $('#motrerredt').html("Complete px address first!");
            $('#inputid_mothersadrsedt').val("");
            $('#motheradrsvalueindicatoredt').val("NO");
            $('#motheradrschkboxedt').prop('checked', false);
            $('#motheradrschkboxedt').prop('checked', false);
        }
        else
        {
            $('#motrerredt').html("");
            $('#inputid_mothersadrsedt').val(patientfulladdress);
            $('#motheradrsvalueindicatoredt').val("YES");
        }
    }
}

function enableDisableSameasPatientAddressSwitchForFatherAdressForEdtPx()
{
    var fatheradrsswitch = $('#fatheradrsvalueindicatoredt').val();
    
    var selectid_province = $('#selectid_provinceedt').val();
    var provsplit = selectid_province.split("-");
    var provvalue = provsplit[0];
    var selectid_citymuni = $('#selectid_citymuniedt').val();
    var citysplit = selectid_citymuni.split("-");
    var cityvalue = citysplit[0];
    var selectid_barangay = $('#selectid_barangayedt').val();
    var inputid_street    = $('#inputid_streetedt').val();
    
    var patientfulladdress = inputid_street + " " + selectid_barangay + " " + cityvalue + ", " + provvalue;
    
    if(fatheradrsswitch === "YES")
    {
        $('#fatheradrsvalueindicatoredt').val("NO");
        $('#inputid_fathersadrsedt').val("");
    }
    else
    {
        if(provvalue === "select" || cityvalue === "select" || selectid_barangay === "select" || inputid_street === "")
        {
            $('#fatrerredt').html("Complete px address first!");
            $('#inputid_fathersadrsedt').val("");
            $('#fatheradrsvalueindicatoredt').val("NO");
            $('#fatheradrschkboxedt').prop('checked', false);
            $('#fatheradrschkboxedt').prop('checked', false);
        }
        else
        {
            $('#fatrerredt').html("");
            $('#inputid_fathersadrsedt').val(patientfulladdress);
            $('#fatheradrsvalueindicatoredt').val("YES");
        }
    }
}

function enableDisableLastDischargedTextforEdtPx()
{
    var lastdischargeswitch = $('#oldrecordswitchvalueindicatoredt').val();
    
    if(lastdischargeswitch === "ON")
    {
        $('#oldrecordswitchvalueindicatoredt').val("OFF");
        $('#inputid_oldrecrdedt').prop('disabled', true);
        $('#inputid_oldrecrdedt').prop('placeholder', "Old Record");
        $('#inputid_oldrecrdedt').val("");
    }
    else
    {
        $('#oldrecordswitchvalueindicatoredt').val("ON");
        $('#inputid_oldrecrdedt').prop('disabled', false);
        $('#inputid_oldrecrdedt').prop('placeholder', "YYYY-MM-DD");
    }
}

function enableDisableArchivedPatientTextforEdtPx()
{
    var archivedswitch = $('#inputid_archiveedt').val();
    
    if(archivedswitch === "ARCHIVED")
    {
        $('#inputid_archiveedt').val("NONE");
    }
    else
    {
        $('#inputid_archiveedt').val("ARCHIVED");
    }
}

function enableDisableArchivedPatientText()
{
    var archivedswitch = $('#inputid_archive').val();
    
    if(archivedswitch === "ARCHIVED")
    {
        $('#inputid_archive').val("NONE");
    }
    else
    {
        $('#inputid_archive').val("ARCHIVED");
    }
}

function enableDisableHRNisVerifiedforEdtPx()
{
    var hrnverifiedhiddentextbox = $('#healthrecnumswitchvalueindicatoredt').val();
    
    if(hrnverifiedhiddentextbox === "YES")
    {
        $('#healthrecnumswitchvalueindicatoredt').val("NO");
    }
    else
    {
        $('#healthrecnumswitchvalueindicatoredt').val("YES");
    }
}

function enableDisableHRNisVerifiedForQuickDataEdit()
{
    var hrnverifiedhiddentextbox = $('#healthrecnumswitchvalueindicatorqck').val();
    
    if(hrnverifiedhiddentextbox === "YES")
    {
        $('#healthrecnumswitchvalueindicatorqck').val("NO");
    }
    else
    {
        $('#healthrecnumswitchvalueindicatorqck').val("YES");
    }
}

function onChangeProvinceSelectForAddPx()
{
    var provid = $("#selectid_province").val();
    var provarr = provid.split("-");
    var provcode = provarr[1];

    if (provid === "select")
    {
        $('#selectid_citymuni').prop('disabled', true);
        $('#selectid_barangay').prop('disabled', true);
        $('#inputid_street').prop('disabled', true);
        
        $('#selectid_citymuni').selectpicker('val', 'select');
        $('#selectid_barangay').selectpicker('val', 'select');
        $('#inputid_street').val('');
        $('#inputid_zipcodex').val('');

        $('#selectid_citymuni').selectpicker('refresh');
        $('#selectid_barangay').selectpicker('refresh');
    } 
    else
    {
        $('#selectid_citymuni').prop('disabled', false);
        $('#selectid_citymuni').selectpicker('refresh');

        $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Admission/getMunicipality",
                    data: {providex: provcode},
                    dataType: 'json'
                })
                .done(function (data)
                {
                    console.log(data);
                    $('#selectid_citymuni').empty();
                    $('#selectid_citymuni').append('<option value="select">' + "Select From List" + '</option>');
                    for (var cv = 0; cv < data.length; cv++)
                    {
                        console.log(data[cv]['MUN_NAME']);
                        $('#selectid_citymuni').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
                    }
                    $('#selectid_citymuni').selectpicker('refresh');
                });
    }
}

function onChangeMunicipalSelectForAddPx()
{
    var provid = $("#selectid_province").val();
    var citymunid = $("#selectid_citymuni").val();
    var provarr = provid.split("-");
    var citymunarr = citymunid.split("-");
    var provcode = provarr[1];
    var citymuncode = citymunarr[1];
    if (citymunid === "select")
    {        
        $('#inputid_zipcodex').prop('disabled', true);
        $('#selectid_barangay').prop('disabled', true);
        $('#inputid_street').prop('disabled', true);

        $('#selectid_barangay').selectpicker('val', 'select');
        $('#inputid_street').val('');
        $('#inputid_zipcodex').val('');
        
        $('#selectid_barangay').selectpicker('refresh');
    } 
    else
    {
        $('#inputid_zipcodex').prop('disabled', false);
        $('#selectid_barangay').prop('disabled', false);
        
        $('#selectid_barangay').selectpicker('refresh');

        $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Admission/getZipcode",
                    data:
                            {
                                citymuncodex: citymuncode,
                                provcodex: provcode
                            },
                    dataType: 'json'
                })
                .done(function (data)
                {
                    console.log(data);
                    for (var cv = 0; cv < data.length; cv++)
                    {
                        $('#inputid_zipcodex').val(data[cv]['ZIP_CODE']);
                    }
                });

        $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Admission/getBarangay",
                    data:
                            {
                                citymuncodex: citymuncode,
                                provcodex: provcode
                            },
                    dataType: 'json'
                })
                .done(function (data)
                {
                    $('#selectid_barangay').empty();
                    $('#selectid_barangay').append('<option value="select">' + "Select From List" + '</option>');
                    for (var cv = 0; cv < data.length; cv++)
                    {
                        console.log(data[cv]['MUN_NAME']);
                        $('#selectid_barangay').append('<option value="' + data[cv]['BRGY_NAME'] + '">' + data[cv]['BRGY_NAME'] + '</option>');
                    }
                    $('#selectid_barangay').selectpicker('refresh');
                });
    }
}

function onChangeBarangaySelectForAddPx()
{
    var brgay = $("#selectid_barangay").val();
    if (brgay === "select")
    {
        $('#inputid_street').prop('disabled', true);
        $('#inputid_street').val('');
    } 
    else
    {
        $('#inputid_street').prop('disabled', false);
    }
}

function hideShowPhmembership()
{
    var phmem = $("#selectid_phmembership").val();
    if (phmem === "Select from List" || phmem === "NON-NHIP:NHP")
    {
        $("#inputid_phmember").prop('disabled', true);
        $("#inputid_phidnumb").prop('disabled', true);
        
        $("#inputid_phmember").val("");
        $("#inputid_phidnumb").val("");
    } 
    else
    {
        $("#inputid_phmember").prop('disabled', false);
        $("#inputid_phidnumb").prop('disabled', false);
        
        $("#inputid_phmember").val("");
        $("#inputid_phidnumb").val("");
    }
}

function showSLCodeModalForAddPatient()
{
    $('#slcodeforaddpxmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#addpatientsmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#slcodeforaddpxmodal').css('overflow-y', 'scroll');

    var indexno = $("#inputid_pxindex").val();

    slcode_table.ajax.reload();
    $('#slcodemasterlist-table_filter [type="search"]').val(indexno);
    $('#slcodemasterlist-table_filter [type="search"]').focus();
    slcode_table.search(indexno).draw();

    slcode_table.on('dblclick', 'tr', function ()
    {
        var data = slcode_table.row(this).data();
        $('#inputid_slcode').val(data[2]);
        hideSLCodeModalForAddPatient();
    });
}

function hideSLCodeModalForAddPatient()
{
    $('#slcodeforaddpxmodal').modal("hide");

    $('#addpatientsmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function showSLCodeModalForEdtPatient()
{
    $('#slcodeforaddpxmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#editpatientsmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#slcodeforaddpxmodal').css('overflow-y', 'scroll');

    var indexno = $("#inputid_pxindexedt").val();

    slcode_table.ajax.reload();
    $('#slcodemasterlist-table_filter [type="search"]').val(indexno);
    $('#slcodemasterlist-table_filter [type="search"]').focus();
    slcode_table.search(indexno).draw();

    slcode_table.on('dblclick', 'tr', function ()
    {
        var data = slcode_table.row(this).data();
        $('#inputid_slcode').val(data[2]);
        hideSLCodeModalForAddPatient();
    });
}

function hideSLCodeModalForEdtPatient()
{
    $('#slcodeforaddpxmodal').modal("hide");

    $('#editpatientsmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function getAllSLCodeAndAddItToTheTable()
{
    slcode_table = $('#slcodemasterlist-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax: 
        {
            url: BASE_URL + 'SLCode/GetAllSLCode',
            type: 'POST'
        },

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }

    });
}

function showAddSLCodeFormForAddPatient()
{
    $('#slcodeformmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#slcodeforaddpxmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#slcodeformmodal').css('overflow-y', 'scroll');

    var fname = $('#inputid_fname').val();
    var mname = $('#inputid_mname').val();
    var lname = $('#inputid_lname').val();
    var suffix = $('#inputid_suffix').val();
    var indexno = $('#inputid_pxindex').val();
    var province = $('#selectid_province').val();
    var municipal = $('#selectid_citymuni').val();
    var barangay = $('#selectid_barangay').val();
    var purok = $('#inputid_street').val();
    var fulladres = purok + " " + barangay + ", " + municipal + ", " + province;
    var fullname2 = lname + ", " + fname + " " + mname + " " + suffix;
    $('#slindexnoadd').val(indexno);
    $('#sldescriptionadd').val(fullname2);
    $('#sladdressadd').val(fulladres);
}

function showAddSLCodeFormForHMOAdmitPatient()
{
    $('#slcodeformmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#slcodeforaddpxmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#slcodeformmodal').css('overflow-y', 'scroll');

    var fname = $('#inputid_fname').val();
    var mname = $('#inputid_mname').val();
    var lname = $('#inputid_lname').val();
    var suffix = $('#inputid_suffix').val();
    var indexno = $('#inputid_pxindex').val();
    var province = $('#selectid_province').val();
    var municipal = $('#selectid_citymuni').val();
    var barangay = $('#selectid_barangay').val();
    var purok = $('#inputid_street').val();
    var fulladres = purok + " " + barangay + ", " + municipal + ", " + province;
    var fullname2 = lname + ", " + fname + " " + mname + " " + suffix;
    $('#slindexnoadd').val(indexno);
    $('#sldescriptionadd').val(fullname2);
    $('#sladdressadd').val(fulladres);
}

function hideAddSLCodeFormForAddPatient()
{
    $('#slcodeformmodal').modal("hide");
    
    $('#addpatientsmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function addNewSLCodeForAddPatient()
{
    $('.savebuttonsl').attr('disabled', true);
    
    var activeIsChecked = false;
    var status = 0;

    if ($('#activeadd').is(":checked"))
    {
        activeIsChecked = true;
    }
    else
    {
        activeIsChecked = false;
    }

    var slCode = $('#slcodeadd').val();
    var slindexnoadd = $('#slindexnoadd').val();
    var slDescription = $('#sldescriptionadd').val();
    var slAddress = $('#sladdressadd').val();
    var accountName = $('#accountnameadd').val();
    var accountID = $('#accountidadd').val();
    var coareference = $('#coarefnoadd').val();
    var slcodealldata = slCode + "|" + 
                        slindexnoadd + "|" + 
                        slDescription + "|" + 
                        slAddress + "|" + 
                        accountName + "|" + 
                        accountID + "|" + 
                        coareference + "|" + 
                        status;
                
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getSLAccountDataForCheckDuplicateSLCodeOfAddPatient",
        data: {slCodex: slCode},
        dataType: 'json'
    })
    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {
            swal
            ({
                title: "Duplicate Notice!",
                text: "SL Code already exists!\nSL Code Field will be refreshed!",
                type: "info",
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            },
            function () 
            {             
                generateSLCode();
                
                $('.savebuttonsl').removeAttr('disabled');
                
                setTimeout(function () 
                {
                    swal
                    ({
                        title: "Success",
                        text: "SL Code is successfully refreshed!",
                        type: "success",
                        confirmButtonText: "OK"
                    });
                }, 2000);
            });
            
        }
        else
        {
            $('.savebuttonsl').attr('disabled', true);
            
            $.ajax
            ({
                type: 'POST',
                data:
                {
                    slCodex: slCode,
                    pinReferencex: slindexnoadd,
                    slDescriptionx: slDescription,
                    slAddressx: slAddress,
                    activeIsCheckedx: activeIsChecked,
                    accountNamex: accountName,
                    accountIDx: accountID,
                    coareferencex: coareference
                },
                dataType: 'json',
                url: BASE_URL + 'Admission/AddSLCode'

            })
            .done(function (result)
            {
                if (result.status == false)
                {
                    checkFieldValidations(result.errors.sldescriptionget, 'sldescriptionadderror', 'sldescriptionadd');
                    checkFieldValidations(result.errors.sladdressget, 'sladdressadderror', 'sladdressadd');
                    checkFieldValidations(result.errors.pinreferenceget, 'slindexnoadderror', 'slindexnoadd');
                    $('.savebuttonsl').removeAttr('disabled');
                }
                else
                {
                    $('.savebuttonsl').attr('disabled', true);
            
                    hideAddSLCodeFormForAddPatient();
                    
                    $('#slformalldataforaddpatient').val(slcodealldata);

                    swal
                    ({
                        title: "Success!",
                        text: "Record is successfully submitted!",
                        type: "success",
                        allowOutsideClick: false
                    });
                    
                    $('#inputid_slcode').val(slCode);
                    $('.savebuttonsl').removeAttr('disabled');
                }
            });
        }
    });
}

function selectSLCode()
{
    var data;

    $('#slcodemasterlist-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        }
        else
        {
            $('#slcodemasterlist-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#slcodemasterlist-table').DataTable().row('.bg-blue').data();
            selectedSLCode = data;
        }
    });
}

function generateSLCode()
{
    $.ajax
    ({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'SLCode/GenerateSLCode'
    })

    .done(function (result)
    {
        var SLCODE = result[0].SLCODE;
        var splitDoccode = SLCODE.split('L');
        var convertSLCodeToInt = parseInt(splitDoccode[1]);
        var incrementSLCode = convertSLCodeToInt + 1;

        $('#slcodeadd').val('SL' + incrementSLCode);
    });
}

function selectSLCodeForAddPatient()
{
    $('#inputid_slcode').val(selectedSLCode[2]);
    hideSLCodeModalForAddPatient();
}

function patientImageUploadForAddPatient()
{
    $('#openpatientimguploadforaddpx').trigger('click');
}

function patientImageUploadForEditPatient()
{
    $('#openpatientimguploadforedtpx').trigger('click');
}


function showEditPatientModal(id)
{
    $('#editpatientsmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#pxmasterlistforemergency').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#editpatientsmodal').css('overflow-y', 'scroll');
    
    $('#openpatientimguploadforedtpx').val("");
    
    $('#closedbtnforaddpxs').addClass('d-none');
    $('#closedbtnforedtpxs').removeClass('d-none');

    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getPatientlistDataForUpdatePatient",
        data: {iden: id},
        dataType: 'json'
    })

    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {
            $("#inputid_hiddenIDedt").val(data.patientlistdata['id']);
            $('#inputid_tinnumedt').val(data.patientlistdata['tin']);
            $('#inputid_slcodeedt').val(data.patientlistdata['SLaccount']);
            $('#inputid_pxindexedt').val(data.patientlistdata['PIN']);
            $('#inputid_phmemberedt').val(data.patientlistdata['phicmembrname']);
            $('#inputid_phidnumbedt').val(data.patientlistdata['phicno']);
            $('#inputid_oldrecrdedt').val(data.patientlistdata['lastdischdate']);
            
            var oldrecord = data.patientlistdata['oldrecord'];
            if(oldrecord === "0")
            {
                $('#inputid_oldrecrdedt').prop('disabled',true);
                $('#oldrecordswitchvalueindicatoredt').val("OFF");
                $('#oldrecordchkboxedt').prop('checked',false);
            }
            else
            {
                $('#inputid_oldrecrdedt').prop('disabled',false);
                $('#oldrecordswitchvalueindicatoredt').val("ON");
                $('#oldrecordchkboxedt').prop('checked',true);
            }
            
            var archived = data.patientlistdata['archived'];
            if(archived === "0")
            {
                $('#inputid_archiveedt').val("NONE");
                $('#archivechkboxedt').prop('checked',false);
            }
            else
            {
                $('#inputid_archiveedt').val("ARCHIVED");
                $('#archivechkboxedt').prop('checked',true);
            }
            
            var hrnverify = data.patientlistdata['HRNverified'];
            if(hrnverify === "0")
            {
                $('#healthrecnumswitchvalueindicatoredt').val("NO");
                $('#healthrecnumchkboxedt').prop('checked',false);
            }
            else
            {
                $('#healthrecnumswitchvalueindicatoredt').val("YES");
                $('#healthrecnumchkboxedt').prop('checked',true);
            }
            
            var cityaddsplit = data.patientlistdata['cityadd'].split("-");
            var cityaddvalue = cityaddsplit[0];
            
            var provaddsplit = data.patientlistdata['provadd'].split("-");
            var provaddvalue = provaddsplit[0];
            
            var pxaddress = data.patientlistdata['adrs'] + " " +
                            data.patientlistdata['brgy'] + " " +
                            cityaddvalue + ", " +
                            provaddvalue;
          
            if(pxaddress === data.patientlistdata['motheradrs'])
            {
                $('#motheradrschkboxedt').prop('checked',true);
                $('#motheradrsvalueindicatoredt').val("YES");
            }
            else
            {
                $('#motheradrschkboxedt').prop('checked',false);
                $('#motheradrsvalueindicatoredt').val("NO");
            }
            
            if(pxaddress === data.patientlistdata['fatheradrs'])
            {
                $('#fatheradrschkboxedt').prop('checked',true);
                $('#fatheradrsvalueindicatoredt').val("YES");
            }
            else
            {
                $('#fatheradrschkboxedt').prop('checked',false);
                $('#fatheradrsvalueindicatoredt').val("NO");
            }
            
            $('#inputid_fnameedt').val(data.patientlistdata['fname']);
            $('#inputid_lnameedt').val(data.patientlistdata['lname']);
            $('#inputid_mnameedt').val(data.patientlistdata['mname']);
            $('#inputid_suffixedt').val(data.patientlistdata['suffix']);
            $('#hiddenid_pxfnamesup').val(data.patientlistdata['fname']);
            $('#hiddenid_pxmnamesup').val(data.patientlistdata['mname']);
            $('#hiddenid_pxlnamesup').val(data.patientlistdata['lname']);
            $('#hiddenid_pxsuffxsup').val(data.patientlistdata['suffix']);
            $('#inputid_emailaddedt').val(data.patientlistdata['email']);
            $('#inputid_mobileedt').val(data.patientlistdata['mobileno']);
            $('#inputid_landlineedt').val(data.patientlistdata['contactno']);
            $('#inputid_birthdayedt').val(data.patientlistdata['bday']);
            $('#inputid_passportedt').val(data.patientlistdata['passportno']);
            $('#inputid_zipcodexedt').val(data.patientlistdata['zipcode']);
            $('#inputid_barangayedt').val(data.patientlistdata['brgy']);
            $('#inputid_streetedt').val(data.patientlistdata['adrs']);
            $('#inputid_mothersnameedt').val(data.patientlistdata['mother']);
            $('#inputid_fathersnameedt').val(data.patientlistdata['father']);
            $('#inputid_mothersadrsedt').val(data.patientlistdata['motheradrs']);
            $('#inputid_fathersadrsedt').val(data.patientlistdata['fatheradrs']);
            $('#inputid_spouseedt').val(data.patientlistdata['spouse']);
            $('#inputid_spousebdayedt').val(data.patientlistdata['spousebday']);
            $('#selectid_membershipedt').selectpicker('val', data.patientlistdata['memberrefno']);
            $('#selectid_civilstatusxedt').selectpicker('val', data.patientlistdata['civilstatus']);
            $('#selectid_genderoptionedt').selectpicker('val', data.patientlistdata['sex']);
            $('#selectid_religionseleedt').selectpicker('val', data.patientlistdata['religion']);
            $('#selectid_nationalityxedt').selectpicker('val', data.patientlistdata['nationality']);

            $('#selectid_provinceedt').selectpicker('val', data.patientlistdata['provadd']);
            $('#citydivedt').removeClass('d-none');
            $('#zipcodedivedt').removeClass('d-none');
            $('#brgydivedt').removeClass('d-none');
            $('#purokdivedt').removeClass('d-none');

            var provid = $("#selectid_provinceedt").val();
            var provarr = provid.split("-");
            var provcode = provarr[1];

            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getMunicipality",
                data: {providex: provcode},
                dataType: 'json'
            })
            .done(function (data)
            {
                $('#selectid_citymuniedt').empty();
                $('#selectid_citymuniedt').append('<option value="select">' + "Select from List" + '</option>');
                for (var cv = 0; cv < data.length; cv++)
                {
                    $('#selectid_citymuniedt').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
                }
                $('#selectid_citymuniedt').selectpicker('refresh');

                $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Admission/getPatientlistDataForUpdatePatient",
                    data: {iden: id},
                    dataType: 'json'
                })
                .done(function (data)
                {
                    $('#selectid_citymuniedt').selectpicker('val', data.patientlistdata['cityadd']);
                    var citymunid = $("#selectid_citymuniedt").val();
                    var citymunarr = citymunid.split("-");
                    var citymuncode = citymunarr[1];
                    $.ajax
                    ({
                        type: 'POST',
                        url: BASE_URL + "Admission/getZipcode",
                        data:
                        {
                            citymuncodex: citymuncode,
                            provcodex: provcode
                        },
                        dataType: 'json'
                    })
                    .done(function (data)
                    {
                        console.log(data);
                        for (var cv = 0; cv < data.length; cv++)
                        {
                            $('#inputid_zipcodexedt').val(data[cv]['ZIP_CODE']);
                        }
                    });
                    $.ajax
                    ({
                        type: 'POST',
                        url: BASE_URL + "Admission/getBarangay",
                        data:
                        {
                            citymuncodex: citymuncode,
                            provcodex: provcode
                        },
                        dataType: 'json'
                    })
                    .done(function (data)
                    {
                        $('#selectid_barangayedt').empty();
                        $('#selectid_barangayedt').append('<option value="select">' + "Select from List" + '</option>');
                        for (var cv = 0; cv < data.length; cv++)
                        {
                            $('#selectid_barangayedt').append('<option value="' + data[cv]['BRGY_NAME'] + '">' + data[cv]['BRGY_NAME'] + '</option>');
                        }
                        $('#selectid_barangayedt').selectpicker('refresh');

                        $.ajax
                        ({
                            type: 'POST',
                            url: BASE_URL + "Admission/getPatientlistDataForUpdatePatient",
                            data: {iden: id},
                            dataType: 'json'
                        })
                        .done(function (data)
                        {
                            $('#selectid_barangayedt').selectpicker('val', data.patientlistdata['brgy']);
                        });
                    });
                });
            });

            $('#selectid_mothernationedt').selectpicker('val', data.patientlistdata['mothernationality']);
            $('#selectid_fathernationedt').selectpicker('val', data.patientlistdata['fathernationality']);

            var healrecno = $('#inputid_healthrecnohid').val(data.patientlistdata['HRNcode']);
            var hrnnumber = healrecno.val().toString().replace(/\B(?=(?:\d{2})+(?!\d))/g, "-");
            $('#inputid_healthrecnoedt').val(hrnnumber);
            
            var phmrmberfetch = data.patientlistdata['phicmembr'] + ":" + data.patientlistdata['phiccode'];
            var phmember = $('#selectid_phmembershipedt').selectpicker('val', phmrmberfetch.toString());

            $("#inputid_phmemberedt").removeClass("hidden");
            $("#inputid_phidnumbedt").removeClass("hidden");
            $("#spacewhenhidden_phmemberedt").removeClass("padding-bottom-class");
            $("#spacewhenhidden_phidnumbedt").removeClass("padding-bottom-class");

            $('#selectid_phmembershipedt').on('change', function ()
            {   
                if (phmember.val() === "- - Select from List - -" || phmember.val() === "NON-NHIP:NHP")
                {
                    $("#inputid_phmemberedt").prop('disabled', true);
                    $("#inputid_phidnumbedt").prop('disabled', true);
                    
                    $("#inputid_phmemberedt").val("");
                    $("#inputid_phidnumbedt").val("");
                }
                else
                {
                    $("#inputid_phmemberedt").prop('disabled', false);
                    $("#inputid_phidnumbedt").prop('disabled', false);

                    $("#inputid_phmemberedt").val("");
                    $("#inputid_phidnumbedt").val("");
                }
            });

            var imagepath = BASE_URL + 'assets/images/uploads/patients/' + data.patientlistdata['PIN'] + 'p.jpg';

            $.ajax
            ({
                url: imagepath,
                type: 'HEAD',
                success: function ()
                {
                    var img = $('#patientimguploadforedtpx').attr('src', imagepath);
                    var src = img.attr('src');
                    var i = src.indexOf('?dummy=');
                    src = i != -1 ? src.substring(0, i) : src;
                    var d = new Date();
                    img.attr('src', src + '?dummy=' + d.getTime());
                }
            });
        } else
        {
            console.log('fail');
        }
    });
}

function hideEditPatientModal()
{
    $('#editpatientsmodal').modal("hide");
    
    $('#pxmasterlistforemergency').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#search-allpatient-table-foremergency-admission').DataTable().ajax.reload();
    $('#pxmasterlistforemergency').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');

    $("#taxerredt").text("");
    $("#hrnerredt").text("");
    $("#fnaerredt").text("");
    $("#lnaerredt").text("");
    $("#mnaerredt").text("");
    $("#moberredt").text("");
    $("#birerredt").text("");
    $("#civerredt").text("");
    $("#sexerredt").text("");
    $("#relerredt").text("");
    $("#naterredt").text("");
    $("#proverredt").text("");
    $("#cityerredt").text("");
    $("#ziperredt").text("");
    $("#barerredt").text("");
    $("#strerredt").text("");
    $("#motnerredt").text("");
    $("#fatnerredt").text("");
    $("#motrerredt").text("");
    $("#fatrerredt").text("");
    $("#motnaterredt").text("");
    $("#fatnaterredt").text("");
    
    $("#anchorid_forgeneraltabedt").tab('show');
}

function onChangeProvinceSelectForEditPx()
{
    var provid = $("#selectid_provinceedt").val();
    var provarr = provid.split("-");
    var provcode = provarr[1];

    if (provid === "select")
    {
        $('#inputid_mothersadrsedt').val("");
        $('#inputid_fathersadrsedt').val("");
        
        $('#motheradrschkboxedt').prop('checked',false);
        $('#motheradrsvalueindicatoredt').val("NO");
        
        $('#fatheradrschkboxedt').prop('checked',false);
        $('#fatheradrsvalueindicatoredt').val("NO");
        
        $('#selectid_citymuniedt').prop('disabled', true);
        $('#selectid_barangayedt').prop('disabled', true);
        $('#inputid_streetedt').prop('disabled', true);
        
        $('#selectid_citymuniedt').selectpicker('val', 'select');
        $('#selectid_barangayedt').selectpicker('val', 'select');
        $('#inputid_streetedt').val('');
        $('#inputid_zipcodexedt').val('');

        $('#selectid_citymuniedt').selectpicker('refresh');
        $('#selectid_barangayedt').selectpicker('refresh');
    } 
    else
    {
        $('#inputid_mothersadrsedt').val("");
        $('#inputid_fathersadrsedt').val("");
        
        $('#motheradrschkboxedt').prop('checked',false);
        $('#motheradrsvalueindicatoredt').val("NO");
        
        $('#fatheradrschkboxedt').prop('checked',false);
        $('#fatheradrsvalueindicatoredt').val("NO");
        
        $('#selectid_citymuniedt').prop('disabled', false);
        $('#selectid_citymuniedt').selectpicker('refresh');
        
        $('#selectid_barangayedt').prop('disabled', true);
        $('#inputid_streetedt').prop('disabled', true);
        
        $('#selectid_barangayedt').selectpicker('val', 'select');
        $('#inputid_streetedt').val('');
        $('#inputid_zipcodexedt').val('');
        
        $('#selectid_barangayedt').selectpicker('refresh');

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getMunicipality",
            data: {providex: provcode},
            dataType: 'json'
        })
        .done(function (data)
        {
            console.log(data);
            $('#selectid_citymuniedt').empty();
            $('#selectid_citymuniedt').append('<option value="select">' + "Select From List" + '</option>');
            for (var cv = 0; cv < data.length; cv++)
            {
                console.log(data[cv]['MUN_NAME']);
                $('#selectid_citymuniedt').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
            }
            $('#selectid_citymuniedt').selectpicker('refresh');
        });
    }
}

function onChangeMunicipalitySelectForEditPx()
{
    var provid = $("#selectid_provinceedt").val();
    var citymunid = $("#selectid_citymuniedt").val();
    var provarr = provid.split("-");
    var citymunarr = citymunid.split("-");
    var provcode = provarr[1];
    var citymuncode = citymunarr[1];
    
    if (citymunid === "select")
    {
        $('#motheradrschkboxedt').prop('checked',false);
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");
        
        $('#fatheradrschkboxedt').prop('checked',false);
        $('#fatheradrsvalueindicatoredt').val("NO");
        $('#inputid_fathersadrsedt').val("");

        $('#inputid_zipcodexedt').val('');
        $('#inputid_streetedt').val('');
        $('#inputid_streetedt').prop('disabled', true);
        
        $('#selectid_barangayedt').selectpicker('val', 'select');
        $('#selectid_barangayedt').prop('disabled', true);
        $('#selectid_barangayedt').selectpicker('refresh');
    } 
    else
    {
        $('#motheradrschkboxedt').prop('checked',false);
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");
        
        $('#fatheradrschkboxedt').prop('checked',false);
        $('#fatheradrsvalueindicatoredt').val("NO");
        $('#inputid_fathersadrsedt').val("");

        $('#selectid_barangayedt').selectpicker('val', 'select');
        $('#selectid_barangayedt').prop('disabled', false);
        $('#selectid_barangayedt').selectpicker('refresh');
        
        $('#inputid_streetedt').val('');
        $('#inputid_streetedt').prop('disabled', true);
        
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getZipcode",
            data:
                    {
                        citymuncodex: citymuncode,
                        provcodex: provcode
                    },
            dataType: 'json'
        })
        .done(function (data)
        {
            console.log(data);
            for (var cv = 0; cv < data.length; cv++)
            {
                $('#inputid_zipcodexedt').val(data[cv]['ZIP_CODE']);
            }
        });

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getBarangay",
            data:
                    {
                        citymuncodex: citymuncode,
                        provcodex: provcode
                    },
            dataType: 'json'
        })
        .done(function (data)
        {
            $('#selectid_barangayedt').empty();
            $('#selectid_barangayedt').append('<option value="select">' + "Select From List" + '</option>');
            for (var cv = 0; cv < data.length; cv++)
            {
                console.log(data[cv]['MUN_NAME']);
                $('#selectid_barangayedt').append('<option value="' + data[cv]['BRGY_NAME'] + '">' + data[cv]['BRGY_NAME'] + '</option>');
            }
            $('#selectid_barangayedt').selectpicker('refresh');
        });
    }
}

function onChangeBarangaySelectForEditPx()
{
    var brgay = $("#selectid_barangayedt").val();
    if (brgay === "select")
    {
        $('#motheradrschkboxedt').prop('checked',false);
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");
        
        $('#fatheradrschkboxedt').prop('checked',false);
        $('#fatheradrsvalueindicatoredt').val("NO");
        $('#inputid_fathersadrsedt').val("");
        
        $('#inputid_streetedt').prop('disabled', true);
        $('#inputid_streetedt').val('');
    } 
    else
    {
        $('#motheradrschkboxedt').prop('checked',false);
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");
        
        $('#fatheradrschkboxedt').prop('checked',false);
        $('#fatheradrsvalueindicatoredt').val("NO");
        $('#inputid_fathersadrsedt').val("");
        
        $('#inputid_streetedt').prop('disabled', false);
        $('#inputid_streetedt').val('');
    }
}

function deletePatient(PIN)
{
    swal
    ({
        title: "Are you sure?",
        text: "You will not be able to recover the selected patient record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No",
        closeOnConfirm: false
    },
    function ()
    {
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/deletePatient",
            data: {pin: PIN},
            dataType: 'json'
        })

        .done(function (data)
        {
            $(".confirm").attr('disabled', 'disabled'); 
            $(".cancel").attr('disabled', 'disabled'); 

            if (data.status)
            {
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully deleted!",
                    type: "success",
                    allowOutsideClick: false
                });
                $('#search-allpatient-table-foremergency-admission').DataTable().ajax.reload();
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    });
}

function validateEditPatientForm()
{
    var error = 0;

    var tax = $("#inputid_tinnumedt").val();
    if (tax === "")
    {
        $("#taxerredt").text("Required Field!");
        error++;
    } else
    {
        $("#taxerredt").text("");
    }

    var hrn = $("#inputid_healthrecnoedt").val();
    if (hrn === "")
    {
        $("#hrnerredt").text("Required Field!");
        error++;
    } else
    {
        $("#hrnerredt").text("");
    }

    var fname = $("#inputid_fnameedt").val();
    if (fname === "")
    {
        $("#fnaerredt").text("Required Field!");
        error++;
    } else
    {
        $("#fnaerredt").text("");
    }

    var lname = $("#inputid_lnameedt").val();
    if (lname === "")
    {
        $("#lnaerredt").text("Required Field!");
        error++;
    } else
    {
        $("#lnaerredt").text("");
    }

    var mname = $("#inputid_mnameedt").val();
    if (mname === "")
    {
        $("#mnaerredt").text("Required Field!");
        error++;
    } else
    {
        $("#mnaerredt").text("");
    }

    var mob = $("#inputid_mobileedt").val();
    if (mob === "")
    {
        $("#moberredt").text("Required Field!");
        error++;
    } else
    {
        $("#moberredt").text("");
    }

    var bir = $("#inputid_birthdayedt").val();
    if (bir === "")
    {
        $("#birerredt").text("Required Field!");
        error++;
    } else
    {
        $("#birerredt").text("");
    }


    var civ = $("#selectid_civilstatusxedt").val();
    if (civ === "Select from List")
    {
        $("#civerredt").text("Required Field!");
        error++;
    } else
    {
        $("#civerredt").text("");
    }

    var gender = $("#selectid_genderoptionedt").val();
    if (gender === "Select From List")
    {
        $("#sexerredt").text("Required Field!");
        error++;
    } else
    {
        $("#sexerredt").text("");
    }

    var rel = $("#selectid_religionseleedt").val();
    if (rel === "Select from List")
    {
        $("#relerredt").text("Required Field!");
        error++;
    } else
    {
        $("#relerredt").text("");
    }

    var nat = $("#selectid_nationalityxedt").val();
    if (nat === "Select from List")
    {
        $("#naterredt").text("Required Field!");
        error++;
    } else
    {
        $("#naterredt").text("");
    }

    var prov = $("#selectid_provinceedt").val();
    if (prov === "Select from List")
    {
        $("#proverredt").text("Required Field!");
        error++;
    } else
    {
        $("#proverredt").text("");
    }

    var city = $("#selectid_citymuniedt").val();
    if (city === "Select from List")
    {
        $("#cityerredt").text("Required Field!");
        error++;
    } else
    {
        $("#cityerredt").text("");
    }

    var zip = $("#inputid_zipcodexedt").val();
    if (zip === "")
    {
        $("#ziperredt").text("Required Field!");
        error++;
    } else
    {
        $("#ziperredt").text("");
    }

    var bar = $("#inputid_barangayedt").val();
    if (bar === "")
    {
        $("#barerredt").text("Required Field!");
        error++;
    } else
    {
        $("#barerredt").text("");
    }

    var str = $("#inputid_streetedt").val();
    if (str === "")
    {
        $("#strerredt").text("Required Field!");
        error++;
    } else
    {
        $("#strerredt").text("");
    }

    var motn = $("#inputid_mothersnameedt").val();
    if (motn === "")
    {
        $("#motnerredt").text("Required Field!");
        error++;
    } else
    {
        $("#motnerredt").text("");
    }

    var fatn = $("#inputid_fathersnameedt").val();
    if (fatn === "")
    {
        $("#fatnerredt").text("Required Field!");
        error++;
    } else
    {
        $("#fatnerredt").text("");
    }

    var motr = $("#inputid_mothersadrsedt").val();
    if (motr === "")
    {
        $("#motrerredt").text("Required Field!");
        error++;
    } else
    {
        $("#motrerredt").text("");
    }

    var fatr = $("#inputid_fathersadrsedt").val();
    if (fatr === "")
    {
        $("#fatrerredt").text("Required Field!");
        error++;
    } else
    {
        $("#fatrerredt").text("");
    }

    var motnat = $("#selectid_mothernationedt").val();
    if (motnat === "")
    {
        $("#motnaterredt").text("Required Field!");
        error++;
    } else
    {
        $("#motnaterredt").text("");
    }

    var fatnat = $("#selectid_fathernationedt").val();
    if (fatnat === "")
    {
        $("#fatnaterredt").text("Required Field!");
        error++;
    } else
    {
        $("#fatnaterredt").text("");
    }

    if (error > 0)
    {
        swal
        ({
            title: "Validation Notice!",
            text: "Some field requires your attention!",
            type: "warning",
            allowOutsideClick: false
        });
    }
    else
    {
        $("#editPatientButton").prop("disabled", true);
        showSupervisorPermissionModal();
    }
}

function showSupervisorPermissionModal()
{
    $("#editPatientButton").prop("disabled", false);
    
    $('#supervisorpermitmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#editpatientsmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#supervisorpermitmodal').css('overflow-y', 'scroll');
    
    $('#cancelButtonForSuprvisrPermitEdtMas').removeClass('d-none');
    $('#cancelButtonForSuprvisrPermitEdtAdm').addClass('d-none');

    $('#checkAuthorizationButtonForEdtMas').removeClass('d-none');
    $('#checkAuthorizationButtonForEdtAdm').addClass('d-none');
    
    $('.supvinputedtmas').removeClass('d-none');
    $('.supvinputedtadm').addClass('d-none');

    var prevpxfname = $('#hiddenid_pxfnamesup').val();
    var prevpxmname = $('#hiddenid_pxmnamesup').val();
    var prevpxlname = $('#hiddenid_pxlnamesup').val();
    var prevpxsufix = $('#hiddenid_pxsuffxsup').val();
    
    var newpxfname = $('#inputid_fnameedt').val().toUpperCase();
    var newpxlname = $('#inputid_lnameedt').val().toUpperCase();
    var newpxmname = $('#inputid_mnameedt').val().toUpperCase();
    var newpxsufix = $('#inputid_suffixedt').val().toUpperCase();
    
    var reasontxt = "Edit Patient data from masterlist: " + 
                    prevpxlname + ", " + prevpxfname + " " + prevpxsufix + " MName: " + prevpxmname + " " + 
                    "to " + newpxlname + ", " + newpxfname + " " + newpxsufix + " " + newpxmname
            
    var description = "Patient Edited Name " + prevpxlname + ", " + prevpxfname + " " + prevpxsufix + " MName: " + prevpxmname;
    
    $('#txtareaid_reasonsup').val(reasontxt);
    $('#descriptionnsup').val(description);
}

function hideSupervisorPermissionModal()
{
    $('#supervisorpermitmodal').modal("hide");
    
    $('#editpatientsmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#editpatientsmodal').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
    
    $('#suprvisorid').val("");
    $('#suppassword').val("");
    $('#logbooksup').val("");
    
    $('#suprvisoriderror').html("");
    $('#suprvisoriderror').addClass('d-none');

    $('#suppassworderror').html("");
    $('#suppassworderror').addClass('d-none');

    $('#accounterror').html("");
    $('#accounterror').addClass('d-none');

    $('#checkAuthorizationButtonForEdtMas').prop('disabled',false);
}

function checkAuthorizationFromSupervisor()
{
    $('#checkAuthorizationButtonForEdtMas').prop('disabled',true);
    
    var suprvisorid = $('#suprvisorid').val();
    var suppassword = $('#suppassword').val();
    var userpascode = $('#userpasscodesup').val();

    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + 'Admission/SupervisorAccess',
        data: 
        {
            suprvisorid: suprvisorid,
            suppassword: suppassword,
            userpascodex: userpascode
        },
        dataType: 'json'
    })   
    .done(function (result) 
    {
        if (result.error_status === false) 
        {
            var supervisorid = result.errors.suprvisorid;
            var supervpasswd = result.errors.suppassword;
            
            var suprvidtrimptag = supervisorid.replace(/<[\/]{0,1}(p)[^><]*>/ig,"");
            var suprasstrimptag = supervpasswd.replace(/<[\/]{0,1}(p)[^><]*>/ig,"");

            if (supervisorid.toString() !== '')
            {
                $('#suprvisoriderror').html(suprvidtrimptag.toString());
                $('#suprvisoriderror').removeClass('d-none');
            } 
            else
            {
                $('#accounterror').html("");
                $('#accounterror').addClass('d-none');
                
                $('#suprvisoriderror').html("");
                $('#suprvisoriderror').addClass('d-none');
            }

            if (supervpasswd.toString() !== '') 
            {
                $('#suppassworderror').html(suprasstrimptag.toString());
                $('#suppassworderror').removeClass('d-none');
            } 
            else 
            {
                $('#accounterror').html("");
                $('#accounterror').addClass('d-none');
                
                $('#suppassworderror').html("");
                $('#suppassworderror').addClass('d-none');
            }
            
            $('#checkAuthorizationButtonForEdtMas').prop('disabled',false);
        }

        if (result.status)
        {
            $('#checkAuthorizationButtonForEdtMas').prop('disabled',true);
            
            $('#suprvisoriderror').html("");
            $('#suprvisoriderror').addClass('d-none');
            
            $('#suppassworderror').html("");
            $('#suppassworderror').addClass('d-none');
            
            $('#accounterror').html("");
            $('#accounterror').addClass('d-none');
            
            createLogForPatientMasterlistUpdate();
        }
        

        if (result.error_acct)
        {
            $('#suprvisoriderror').html("");
            $('#suprvisoriderror').addClass('d-none');

            $('#suppassworderror').html("");
            $('#suppassworderror').addClass('d-none');

            $('#accounterror').html("Account does not exists!");
            $('#accounterror').removeClass('d-none');
            
            $('#checkAuthorizationButtonForEdtMas').prop('disabled',false);
        } 
        else 
        {
            if(result.error_head)
            {
                $('#suprvisoriderror').html("");
                $('#suprvisoriderror').addClass('d-none');

                $('#suppassworderror').html("");
                $('#suppassworderror').addClass('d-none');

                $('#accounterror').html("Wrong supervisor account!");
                $('#accounterror').removeClass('d-none');
                
                $('#checkAuthorizationButtonForEdtMas').prop('disabled',false);
            }
            else
            {
                if (result.error_access) 
                {
                    $('#accounterror').html("Access Denied!");
                    $('#accounterror').removeClass('d-none');

                    $('#suprvisoriderror').html("");
                    $('#suprvisoriderror').addClass('d-none');

                    $('#suppassworderror').html("");
                    $('#suppassworderror').addClass('d-none');
                    
                    $('#checkAuthorizationButtonForEdtMas').prop('disabled',false);
                } 
                else 
                {
                    if (result.error_pass) 
                    {
                        $('#accounterror').html("Incorrect Username or Password!");
                        $('#accounterror').removeClass('d-none');

                        $('#suprvisoriderror').html("");
                        $('#suprvisoriderror').addClass('d-none');

                        $('#suppassworderror').html("");
                        $('#suppassworderror').addClass('d-none');
                        
                        $('#checkAuthorizationButtonForEdtMas').prop('disabled',false);
                    }
                }
            }
        }

    });
}

function createLogForPatientMasterlistUpdate()
{
    var suprvisorid = $('#suprvisorid').val();
    var suppassword = $('#suppassword').val();
    var userempname = $('#currentusersup').val();
    var reasonofedt = $('#txtareaid_reasonsup').val();
    var userpascode = $('#userpasscodesup').val();
    var description = $('#descriptionnsup').val();
    var logbooksupr = $('#logbooksup').val();
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + 'Admission/CreateLogForEditPatientMasterlist',
        data:
        {
            suprvisoridx: suprvisorid,
            suppasswordx: suppassword,
            userempnamex: userempname,
            reasonofedtx: reasonofedt,
            userpascodex: userpascode,
            descriptionx: description,
            logbooksuprx: logbooksupr
        },
        dataType: 'json'
    })
    .done(function (result)
    {
        if (result.status == false)
        {
            checkFieldValidations(result.errors.userempnamex, 'currentusersuperror', 'currentusersup');
            checkFieldValidations(result.errors.reasonofedtx, 'txtareaid_reasonsuperror', 'txtareaid_reasonsup');
        }
        else
        {
            uploadPatientImageForEditPatient();
        }
    });
}

function uploadPatientImageForEditPatient()
{
    if ($('#openpatientimguploadforedtpx').val() === '')
    {
        updatePatient();
    }
    else
    {
        $('.editPatientButton').attr('disabled', true);
        
        var patientImage = $('#openpatientimguploadforedtpx').prop('files')[0];
        var extension = patientImage.name.substr((patientImage.name.lastIndexOf('.') + 1));

        var form_data = new FormData();
        form_data.append("file", patientImage, $('#inputid_pxindexedt').val() + 'p.' + extension);

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Uploads/UploadPatientImage",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json'
        })
        .done(function (data)
        {
            updatePatient();
        });
    }
}

function updatePatient()
{
    $.ajax
    (
        {
            type: 'POST',
            url: BASE_URL + "Admission/updatePatient",
            data: $('#update-patient-form').serialize(),
            dataType: 'json'
        }
    )
    .done
    (
        function (data)
        {
            console.log(data);

            $('#supervisorpermitmodal').modal("hide");
            
            showPatientMasterlistModalForEmergency();

            swal
            ({
                title: "Success!",
                text: "Record is successfully updated!",
                type: "success",
                allowOutsideClick: false
            },
            function ()
            {
                var indexno = $("#inputid_pxindexedt").val();

                pxmasterlist_table.ajax.reload();
                $('#search-allpatient-table-foremergency-admission_filter [type="search"]').val(indexno);
                $('#search-allpatient-table-foremergency-admission_filter [type="search"]').focus();
                pxmasterlist_table.search(indexno).draw();
            });

            $('.editPatientButton').removeAttr('disabled');
            
            $('#suprvisorid').val("");
            $('#suppassword').val("");
            $('#logbooksup').val("");
            
            $('#checkAuthorizationButtonForEdtMas').prop('disabled',false);
            
            $("#anchorid_forgeneraltabedt").tab('show');
        }      
    );
}

function enableDisableLastDischargedTextForQuickDataEdit()
{
    var lastdischargeswitch = $('#oldrecordswitchvalueindicatorqck').val();
    
    if(lastdischargeswitch === "ON")
    {
        $('#oldrecordswitchvalueindicatorqck').val("OFF");
        $('#inputid_oldrecrdqck').prop('disabled', true);
        $('#inputid_oldrecrdqck').prop('placeholder', "Old Record");
        $('#inputid_oldrecrdqck').val("");
    }
    else
    {
        $('#oldrecordswitchvalueindicatorqck').val("ON");
        $('#inputid_oldrecrdqck').prop('disabled', false);
        $('#inputid_oldrecrdqck').prop('placeholder', "YYYY-MM-DD");
    }
}

function quickUpdatePatientMastelist()
{
    var pinnumqck = $('#inputid_indexnoqck').val();
    var hrnnumqck = $('#inputid_healthrecnoqck').val();
    var newhrnqck = hrnnumqck.replace(/-/g, "");
    
    var oldrecqck = $('#inputid_oldrecrdqck').val();
    var hrnhidqck = $('#healthrecnumswitchvalueindicatorqck').val();
    var oldhidqck = $('#oldrecordswitchvalueindicatorqck').val();

    if(hrnhidqck === "YES")
    {
        var HRNverified = 1;
    }
    else
    {
        var HRNverified = 0;
    }
    
    if(oldhidqck === "ON")
    {
        var oldrecord = 1;
    }
    else
    {
        var oldrecord = 0;
    }

    swal
    ({
        title: "Are you sure?",
        text: "Data will be change and you will not be able to recover it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!"
    },
    function()
    {
        $.ajax
        ({
            url: BASE_URL + 'Emergency/UpdatePatientViaQuickDataEdit',
            type: 'POST',
            data: 
            {
                pinnumqck: pinnumqck,
                hrnnumqck: newhrnqck,
                oldrecqck: oldrecqck,
                hrnhidqck: HRNverified,
                oldhidqck: oldrecord
            },
            dataType: 'json',
            success: function (result)
            {
                if (result.status === false)
                {
                    checkFieldValidations(result.errors.hrnnumqck, 'inputid_healthrecnoqckerror', 'inputid_healthrecnoqck');
                    checkFieldValidations(result.errors.oldrecqck, 'inputid_oldrecrdqckerror', 'inputid_oldrecrdqck');
                } 
                else
                {
                    $('#quickdataeditmodal').modal("hide");
                    showPatientMasterlistModalForEmergency();
                    
                    swal
                    ({
                        title: "Success!",
                        text: "Record is successfully updated!",
                        type: "success",
                        allowOutsideClick: false

                    },
                    function () 
                    {
                        pxmasterlist_table.ajax.reload();
                        $('#search-allpatient-table-foremergency-admission_filter [type="search"]').val(pinnumqck);
                        $('#search-allpatient-table-foremergency-admission_filter [type="search"]').focus();
                        pxmasterlist_table.search(pinnumqck).draw();
                    });

                }
            }
        });
    });
}

function deleteWalkinPatient(opdid)
{
    swal
    ({
        title: "Are you sure?",
        text: "You will not be able to recover the selected patient record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No",
        closeOnConfirm: false
    },
    function ()
    {
        $(".confirm").attr('disabled', 'disabled'); 
        $(".cancel").attr('disabled', 'disabled'); 
        
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "EROPDcharges/deleteWalkinPatient",
            data: {opdidx: opdid},
            dataType: 'json'
        })

        .done(function (data)
        {
            if (data.status)
            {
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully deleted!",
                    type: "success",
                    allowOutsideClick: false
                });
                
                $('#walkin-patients-masterlist-table').DataTable().ajax.reload();
                
                var patientImage = $('#' + opdid + 'w').prop('src');
                var patientImageSplit = patientImage.split("/");
                var patientfilename = patientImageSplit[8];

                if(patientfilename !== "default.png")
                {
                    var patientfilenameSplit = patientfilename.split("?");

                    $.ajax
                    ({
                        type: 'POST',
                        url: BASE_URL + "Uploads/DeleteUploadedWalkinPatientImage",
                        data: {filename: patientfilenameSplit[0]},
                        dataType: 'json'
                    });
                }
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    });
}


function showEditWalkinPatientModal(opdno)
{
    showAddNewWalkinPatientModal();
    
    var datetoday = moment().format("YYYY-MM-DD HH:mm:ss");
    $("#inputid_dateeoc").val(datetoday);
    
    $("#buttonid_addwalkinpxeoc").addClass("d-none");
    $("#buttonid_edtwalkinpxeoc").removeClass("d-none");
    
    $(".insertwalkintitle").addClass("d-none");
    $(".updatewalkintitle").removeClass("d-none");
    
    $("#buttonid_inpataccteoc").prop('disabled',true);
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "EROPDcharges/getWalkinPatientlistData",
        data: {opdnox: opdno},
        dataType: 'json'
    })
    .done(function (data)
    {
        $("#hiddboxid_opdcodeeoc").val(opdno);
        $("#hiddboxid_slaccnteoc").val(data.opdwalkindata['Slrefno']);
        $("#hiddboxid_mmbrnumeoc").val(data.opdwalkindata['memberrefno']);
        $("#hiddboxid_pincodeeoc").val(data.opdwalkindata['patientno']);
        $("#inpusid_inpataccteoc").val(data.opdwalkindata['inpatPIN']);
        $("#inputid_memberideoc").val(data.opdwalkindata['membercardno']);
        $("#selectid_gendereoc").selectpicker("val",data.opdwalkindata['sex']);
        $("#inputid_birthdayeoc").val(data.opdwalkindata['bday']);
        $("#inputid_wipxageeoc").val(data.opdwalkindata['age']);
        $("#selectid_provaddeoc").selectpicker("val",data.opdwalkindata['province']);
        $("#inputid_streeteoc").val(data.opdwalkindata['Streetadrs']);
        $("#inputid_cellphoneeoc").val(data.opdwalkindata['cellphone']);
        
        if(data.opdwalkindata['fname'] === "" || data.opdwalkindata['mname'] === "" || data.opdwalkindata['lname'] === "")
        {
            var name = data.opdwalkindata['name'];
            var namesplit = name.split(", ");
            var lastname = namesplit[0];
            var lastmid = namesplit[1];
            
            var numOfWords = lastmid.replace(/^[\s,.;]+/, "").replace(/[\s,.;]+$/, "").split(/[\s,.;]+/).length;
            var lastmidsplit = lastmid.split(" ");
            
            if(numOfWords === 3)
            {
                $("#inputid_fnameeoc").val(lastmidsplit[0] + " " + lastmidsplit[1]);
                $("#inputid_mnameeoc").val(lastmidsplit[2]);
                $("#inputid_lnameeoc").val(lastname);
                $("#inputid_suffixeoc").val("");
            }
            else if(numOfWords === 2)
            {
                $("#inputid_fnameeoc").val(lastmidsplit[0]);
                $("#inputid_mnameeoc").val(lastmidsplit[1]);
                $("#inputid_lnameeoc").val(lastname);
                $("#inputid_suffixeoc").val("");
            }
        }
        else
        {
            $("#inputid_fnameeoc").val(data.opdwalkindata['fname']);
            $("#inputid_mnameeoc").val(data.opdwalkindata['mname']);
            $("#inputid_lnameeoc").val(data.opdwalkindata['lname']);
            $("#inputid_suffixeoc").val(data.opdwalkindata['suffix']);
        }
        
        var provid = data.opdwalkindata['province'];
        var provarr = provid.split("-");
        var provcode = provarr[1];
        
        var PIN = data.opdwalkindata['inpatPIN'];

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getMunicipality",
            data: {providex: provcode},
            dataType: 'json'
        })
        .done(function (data)
        {
            $('#selectid_citymuneoc').empty();
            $('#selectid_citymuneoc').append('<option value="">' + "Select from List" + '</option>');
            for (var cv = 0; cv < data.length; cv++)
            {
                $('#selectid_citymuneoc').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
            }
            $('#selectid_citymuneoc').selectpicker('refresh');
            
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "EROPDcharges/getWalkinPatientlistData",
                data: {opdnox: opdno},
                dataType: 'json'
            })
            .done(function (data)
            {
                $('#selectid_citymuneoc').selectpicker('val', data.opdwalkindata['cityadd']);
                $('#selectid_citymuneoc').removeAttr('disabled');
                $('#selectid_citymuneoc').selectpicker('refresh');

                var citymunid = $("#selectid_citymuneoc").val();
                var citymunarr = citymunid.split("-");
                var citymuncode = citymunarr[1];

                $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Admission/getBarangay",
                    data:
                    {
                        citymuncodex: citymuncode,
                        provcodex: provcode
                    },
                    dataType: 'json'
                })
                .done(function (databrgy)
                {
                    $('#selectid_barangayeoc').empty();
                    $('#selectid_barangayeoc').append('<option value="">' + "Select from List" + '</option>');
                    
                    for (var cv = 0; cv < databrgy.length; cv++)
                    {
                        $('#selectid_barangayeoc').append('<option value="' + databrgy[cv]['BRGY_NAME'] + '">' + databrgy[cv]['BRGY_NAME'] + '</option>');
                    }
                    $('#selectid_barangayeoc').selectpicker('refresh');

                    $.ajax
                    ({
                        type: 'POST',
                        url: BASE_URL + "EROPDcharges/getWalkinPatientlistData",
                        data: {opdnox: opdno},
                        dataType: 'json'
                    })
                    .done(function (data)
                    {
                        $('#selectid_barangayeoc').selectpicker('val', data.opdwalkindata['barangay']);
                        $('#selectid_barangayeoc').removeAttr('disabled');
                        $('#selectid_barangayeoc').selectpicker('refresh');

                        $("#inputid_streeteoc").removeAttr('disabled');
                    });
                });
            });
        });
    });
    
    var imagepath = BASE_URL + 'assets/images/uploads/walkinpx/' + opdno + 'w.jpg';

    $.ajax
    ({
        url: imagepath,
        type: 'HEAD',
        error: function()
        {
            $('#hiddboxid_pictureeoc').val("");
        },
        success: function ()
        {
            var img = $('#patientimguploadforaddpx').attr('src', imagepath);
            var src = img.attr('src');
            var i = src.indexOf('?dummy=');
            src = i !== -1 ? src.substring(0, i) : src;
            var d = new Date();
            img.attr('src', src + '?dummy=' + d.getTime());
            
            $('#hiddboxid_pictureeoc').val("HASIMAGE");
        }
    });
}

function UpdateSelectedWalkinPatient()
{
    $("#buttonid_edtwalkinpxeoc").prop("disabled", true);
    
    var inpatPIN = $("#inpusid_inpataccteoc").val();
    var fname = $("#inputid_fnameeoc").val();
    var mname = $("#inputid_mnameeoc").val();
    var lname = $("#inputid_lnameeoc").val();
    var suffix = $("#inputid_suffixeoc").val();
    var memberid = $("#inputid_memberideoc").val();
    var gender = $("#selectid_gendereoc").val();
    var birthday = $("#inputid_birthdayeoc").val();
    var pxage = $("#inputid_wipxageeoc").val();
    var provadd = $("#selectid_provaddeoc").val();
    var citymun = $("#selectid_citymuneoc").val();
    var barangay = $("#selectid_barangayeoc").val();
    var street = $("#inputid_streeteoc").val();
    var cellphone = $("#inputid_cellphoneeoc").val();
    var date = $("#inputid_dateeoc").val();
    var dateformat = moment().format("MMDDYYYYHHmmss");
    var opid = dateformat + "OPDWI";
    var opdno = $("#hiddboxid_opdcodeeoc").val();
    var image = $("#hiddboxid_pictureeoc").val();
    var slcode = $("#hiddboxid_slaccnteoc").val();
    var membercode = $("#hiddboxid_mmbrnumeoc").val();
    var pincode = $("#hiddboxid_pincodeeoc").val();
    
    $.ajax
    ({
        type: 'POST',
        data: 
        {
            slcode: slcode,
            membercode: membercode,
            pincode: pincode,
            image: image,
            opdno: opdno,
            opid: opid,
            inpatPIN: inpatPIN,
            fname: fname,
            mname: mname,
            lname: lname,
            suffix: suffix,
            memberid: memberid,
            gender: gender,
            birthday: birthday,
            pxage: pxage,
            provadd: provadd,
            citymun: citymun,
            barangay: barangay,
            street: street,
            cellphone: cellphone,
            date: date
        },
        url: BASE_URL + 'EROPDcharges/UpdateSelectedWalkinPatient',
        dataType: 'json',
        success: function (result)
        {
            if (result.status === false) 
            {
                $("#buttonid_edtwalkinpxeoc").prop("disabled", false);
                
                swal
                ({
                    title: "WARNING!",
                    text: "Some field requires your attention!",
                    type: "warning",
                    allowOutsideClick: false
                });
                
                checkFieldValidations(result.errors.fname, 'inputid_fnameeocerror', 'inputid_fnameeoc');
                checkFieldValidations(result.errors.mname, 'inputid_mnameeocerror', 'inputid_mnameeoc');
                checkFieldValidations(result.errors.lname, 'inputid_lnameeocerror', 'inputid_lnameeoc');
                checkFieldValidations(result.errors.gender, 'selectid_gendereocerror', 'selectid_gendereoc');
                checkFieldValidations(result.errors.birthday, 'inputid_birthdayeocerror', 'inputid_birthdayeoc');
                checkFieldValidations(result.errors.pxage, 'inputid_wipxageeocerror', 'inputid_wipxageeoc');
                checkFieldValidations(result.errors.provadd, 'selectid_provaddeocerror', 'selectid_provaddeoc');
                checkFieldValidations(result.errors.citymun, 'selectid_citymuneocerror', 'selectid_citymuneoc');
                checkFieldValidations(result.errors.barangay, 'selectid_barangayeocerror', 'selectid_barangayeoc');
                checkFieldValidations(result.errors.street, 'inputid_streeteocerror', 'inputid_streeteoc');
                checkFieldValidations(result.errors.cellphone, 'inputid_cellphoneeocerror', 'inputid_cellphoneeoc');
                checkFieldValidations(result.errors.image, 'hiddboxid_pictureeocerror', 'hiddboxid_pictureeoc');
            } 
            else
            { 
                $("#buttonid_edtwalkinpxeoc").prop("disabled", true);
                
                UploadWalkinPatientForEditWalkin();
                hideAddNewWalkinPatientModal();
                
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully saved!",
                    type: "success",
                    allowOutsideClick: false
                }, 
                function () 
                {
                    walkinpx_table.ajax.reload();
                    $('#walkin-patients-masterlist-table_filter [type="search"]').val(opdno);
                    $('#walkin-patients-masterlist-table_filter [type="search"]').focus();
                    walkinpx_table.search(opdno).draw();
                    
                    setToDefaultWalkinPatientManagementModal();
                    $("#buttonid_edtwalkinpxeoc").prop("disabled", false);
                    $("#buttonid_inpataccteoc").prop('disabled',false);
                });
            }
        }
    });
}

function UploadWalkinPatientForEditWalkin()
{
    if ($('#openpatientimguploadforaddpx').val() !== '')
    {
        var patientImage = $('#openpatientimguploadforaddpx').prop('files')[0];
        var extension = patientImage.name.substr((patientImage.name.lastIndexOf('.') + 1));
        var form_data = new FormData();
        form_data.append("file", patientImage, $('#hiddboxid_opdcodeeoc').val() + 'w.' + extension);

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Uploads/UploadWalkinPatientImage",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json'
        });
    }
}

function generateWalkinPatient(opdno)
{
    var fullpath = BASE_URL + 'EROPDcharges/Generate_Walkin_Patient_Info?opdno=' + opdno;
    window.open(fullpath, "_blank");
}