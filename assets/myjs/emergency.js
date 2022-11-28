var pxmasterlist_table = null;
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
    tabsHighlightForEmergency();

    $('[data-toggle="tooltip"]').tooltip();
    
    getAllPatientMasterlistAndAddItToTheTable();
    getAllQuickAdmittedPatientAndAddItToTheTable();
    getAllMembershipDataAndAddItToTheTable();
    getAllDoctorsAndAddItToTheTable();
    getdoctorscomanagement();
    getAllNursesAndAddItToTheTable();
    getAllRoomsAndAddItToTheTable();
    getAllDiagnosisAndAddItToTheTable();
    getcausesofconfinement();
    getAllSLCodeAndAddItToTheTable();
    
    selectCausesConfinement();
    selectDiagnosis();
    
    selectPatient();
    selectDoctor();
    selectNurse();
    selectRoom();
    generateCasenoForAdmission();
    generateSLCode();
   
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
    
//    $('#timeadmittxtemr').val(moment().format("HH:mm A"));
    $('#timeadmittxtemr').bootstrapMaterialDatePicker
    ({
        date: false,
        format: 'hh:mm A',
        switchOnClick : true,
        shortTime: true
    });
    
    
//    $('#dateadmittxtemr').val(moment().format("MMMM DD, YYYY"));
    $('#dateadmittxtemr').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
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
    
//    var todaydate = moment().format('YYYY-MM-DD');
//    var todaytime = moment().format('HH:mm:ss');
//    
//    var todaydate = moment().format('MMMM DD, YYYY');
//    var todaytime = moment().format('HH:mm A');
//    
//    $('#dateadmittxtemr').val(todaydate);
//    $('#timeadmittxtemr').val(todaytime);

    $('#birthdayemer').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    });
    
    comanage_table = $('#comanagement-masterlist-table').DataTable();
    $('#comanagement-masterlist-table tbody').on('click', '.btn-adm-add', function ()
    {
        var comanagedeletebtn = this;
        var tbldataarr = comanage_table.row($(comanagedeletebtn).parents('tr')).data();
        var textiddata = tbldataarr[7];

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
                comanage_table.row($(comanagedeletebtn).parents('tr')).remove().draw(false);
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    });
    
    $('input[name="radioname_restriction"]').change(function ()
    {
        if ($('#radio_non').prop('checked'))
        {
            $('#divid_oic').addClass('d-none');
        } else
        {
            $('#divid_oic').removeClass('d-none');
        }
    });
    
    $('#inputid_docmancomanagement').on('change', function ()
    {
        var doctrfield = $("#inputid_docmancomanagement").val();
        var doctrarray = doctrfield.split("-");
        var doctorname = doctrarray[0];
        var doctorcode = doctrarray[1];

        if (doctrfield === "Select")
        {
            $("#hiddenid_doctornamecomanagement").val("");
            $("#hiddenid_doctorcodecomanagement").val("");
        } else
        {
            $("#hiddenid_doctornamecomanagement").val(doctorname);
            $("#hiddenid_doctorcodecomanagement").val(doctorcode);
        }
    });
    
    $('#guardiannumadm').bind('keypress keyup blur', function ()
    {
        $('#billingrecipientadm').val($(this).val());
    });
});

function generateCasenoForAdmission()
{
    $.ajax
    ({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Admission/GenerateCaseNumber'
    })
    .done(function (result)
    {
        var recentcaseno = result[0].recentacctno;
        var splitcasenum = recentcaseno.split('-');
        var plus1casenum = parseInt(splitcasenum[1]) + 1;
        var currentyear = new Date().getFullYear();
        
        var currentyearstring = currentyear.toString();
        var casenumyearstring = splitcasenum[0].toString();
        
        if(currentyearstring === casenumyearstring)
        {
            $('#accountnoemr').val(casenumyearstring + "-" + plus1casenum);
        }
        else
        {
            $('#accountnoemr').val(currentyearstring + "-1");
        }
    });
}

function tabsHighlightForEmergency()
{
    $("#emergencysidetab").addClass("active");
}

function showPatientMasterlistModalForEmergency()
{
    $('#pxmasterlistforemergency').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');

    pxmasterlist_table.on('dblclick', 'tr', function ()
    {
        var data = pxmasterlist_table.row(this).data();
        var pinnum = data[3];
        
        checkDuplicateForEmergencyAdmitPatient(pinnum);
    });
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

function selectPatientForEmergencyOrQuickAdmitPatient()
{
    if (pxmasterlist_table.rows('.bg-blue').any())
    {
        var pinnum = selectedPatient[3];
        checkDuplicateForEmergencyAdmitPatient(pinnum);
    }
    else
    {
        swal
         ({
             title: "Notification",
             text: "Select patient first to be admitted!",
             type: "warning"
         });
    }
}

function checkDuplicateForEmergencyAdmitPatient(pin)
{
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Emergency/getPatientlistDataForCheckDuplicateOfEmergencyAdmitPatient",
        data: {pinx: pin},
        dataType: 'json'
    })
    .done
    (
        function (data)
        {
            if (data.status)
            {
                var quickadmitval = data.inpatientlistdata['Quikadmit'];
                
                if(quickadmitval === "1")
                {
                    swal
                    ({
                        title: "Duplicate Notice!",
                        text: "Patient is currently admitted \nthrough quick admission!",
                        type: "warning",
                        allowOutsideClick: false,
                        confirmButtonText: "OK"
                    });
                }
                else
                {
                    swal
                    ({
                        title: "Duplicate Notice!",
                        text: "Patient is currently admitted \nthrough normal admission!",
                        type: "warning",
                        allowOutsideClick: false,
                        confirmButtonText: "OK"
                    });
                }
            }
            else
            {
                importPatientlistDataToEmergencyAdmissionForm(pin);
            }
        }
    );
}

function importPatientlistDataToEmergencyAdmissionForm(pinnum)
{
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Emergency/getPatientListDataForEmergencyAdmitPatient",
        data: {pinnum: pinnum},
        dataType: 'json'
    })
    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {
            swal
            ({
                title: "Success!",
                text: "Patient Data is successfully fetched!",
                type: "success",
                allowOutsideClick: false
            });
            
            var imagepath = BASE_URL + 'assets/images/uploads/patients/' + data.patientmasterlistdata['PIN'] + 'p.jpg';
            var imgdefaul = BASE_URL + 'assets/images/uploads/patients/' + 'default.png';
            
            $.ajax
            ({
                url: imagepath,
                type: 'HEAD',
                error: function ()
                {
                    var img = $('#imageid_pxpictureidb').attr('src', imgdefaul);
                    var src = img.attr('src');
                    var i = src.indexOf('?dummy=');
                    src = i != -1 ? src.substring(0, i) : src;
                    var d = new Date();
                    img.attr('src', src + '?dummy=' + d.getTime());
                },
                success: function ()
                {
                    var img = $('#imageid_pxpictureidb').attr('src', imagepath);
                    var src = img.attr('src');
                    var i = src.indexOf('?dummy=');
                    src = i != -1 ? src.substring(0, i) : src;
                    var d = new Date();
                    img.attr('src', src + '?dummy=' + d.getTime());
                }
            });           
            
            var pin = data.patientmasterlistdata['PIN'];
            var fname = data.patientmasterlistdata['fname'];
            var mname = data.patientmasterlistdata['mname'];
            var lname = data.patientmasterlistdata['lname'];
            var suffix = data.patientmasterlistdata['suffix'];
            
            var bday = moment(data.patientmasterlistdata['bday']).format("MMMM DD, YYYY");
            var sex = data.patientmasterlistdata['sex'];
            var civil = data.patientmasterlistdata['civilstatus'];
            var religion = data.patientmasterlistdata['religion'];
            
            var zipcode = data.patientmasterlistdata['zipcode'];
            var street = data.patientmasterlistdata['adrs'];
            var contact = data.patientmasterlistdata['mobileno'];
            var fatname = data.patientmasterlistdata['father'];
            var motname = data.patientmasterlistdata['mother'];

            $("#textid_pxpincodeemr").html(data.patientmasterlistdata['PIN']);
            
            $("#patientpin1emr").val(pin.toUpperCase());
            $("#patientpin2emr").val(pin.toUpperCase());
            $("#accountnoemr").val();
            $("#fnameemr").val(fname.toUpperCase());
            $("#mnameemr").val(mname.toUpperCase());
            $("#lnameemr").val(lname.toUpperCase());
            $("#suffixemr").val(suffix.toUpperCase());

            $("#genderselemr").selectpicker('val',sex.toUpperCase());
            $("#civilselemr").selectpicker('val',civil.toUpperCase());
            $("#religionselemr").selectpicker('val',religion.toUpperCase());
            
            if(data.patientmasterlistdata['provcode'] === "" || data.patientmasterlistdata['provcode'] === null)
            {
                $("#provinceselemr").selectpicker('val', "");
                
                $("#citymunselemr").prop('disabled', true);
                $("#citymunselemr").selectpicker('val', "");
                $("#citymunselemr").selectpicker('refresh');
                
                $("#barangayselemr").prop('disabled', true);
                $("#barangayselemr").selectpicker('val', "");
                $("#barangayselemr").selectpicker('refresh');
                
                $("#streettxtemr").prop('disabled', true);
                $("#streettxtemr").val("");
                
                $("#zipcodetxtemr").val("");
            }
            else
            {
                var province = data.patientmasterlistdata['provadd'] + "-" + data.patientmasterlistdata['provcode'];
                $("#provinceselemr").selectpicker('val',province.toUpperCase());
                
                var provid = $("#provinceselemr").val();
                
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
                    $('#citymunselemr').empty();
                    $('#citymunselemr').append('<option value="">' + "Select from List" + '</option>');
                    for (var cv = 0; cv < data.length; cv++)
                    {
                        $('#citymunselemr').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
                    }
                    $('#citymunselemr').selectpicker('refresh');

                    $.ajax
                    ({
                        type: 'POST',
                        url: BASE_URL + "Emergency/getPatientListDataForEmergencyAdmitPatient",
                        data: {pinnum: pinnum},
                        dataType: 'json'
                    })
                    .done(function (data)
                    {
                        $('#citymunselemr').selectpicker('val', data.patientmasterlistdata['cityadd'] + "-" + data.patientmasterlistdata['citycode']);
                        $('#citymunselemr').removeAttr('disabled');
                        $('#citymunselemr').selectpicker('refresh');

                        var citymunid = $("#citymunselemr").val();
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
                            $('#barangayselemr').empty();
                            $('#barangayselemr').append('<option value="">' + "Select from List" + '</option>');
                            for (var cv = 0; cv < data.length; cv++)
                            {
                                $('#barangayselemr').append('<option value="' + data[cv]['BRGY_NAME'] + '">' + data[cv]['BRGY_NAME'] + '</option>');
                            }
                            $('#barangayselemr').selectpicker('refresh');

                            $.ajax
                            ({
                                type: 'POST',
                                url: BASE_URL + "Emergency/getPatientListDataForEmergencyAdmitPatient",
                                data: {pinnum: pinnum},
                                dataType: 'json'
                            })
                            .done(function (data)
                            {
                                $('#barangayselemr').selectpicker('val', data.patientmasterlistdata['brgy']);
                                $('#barangayselemr').removeAttr('disabled');
                                $('#barangayselemr').selectpicker('refresh');

                                $("#zipcodetxtemr").removeAttr('disabled');
                                $("#streettxtemr").removeAttr('disabled');
                            });
                        });
                    });
                });
                
                $("#zipcodetxtemr").val(zipcode.toUpperCase());
                $("#streettxtemr").val(street.toUpperCase());
            }

            $("#contactnotxtemr").val(contact.toUpperCase());
            $("#fatnametxtemr").val(fatname.toUpperCase());
            $("#motnametxtemr").val(motname.toUpperCase());
            $("#birthdayemer").val(bday.toUpperCase());
            
            var birthval = moment(bday).format("YYYY-MM-DD");
            calculateAge(birthval);

            
        }
    });

    hidePatientMasterlistModalForEmergency();
}

function hidePatientMasterlistModalForEmergency()
{
    $('#pxmasterlistforemergency').modal("hide");
    $('body').css('overflow', 'auto');
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
            $('td', row).eq(0).html("&nbsp;&nbsp;" + data);
        },
        initComplete: function (settings, json)
        {

        }
    });
}

function onChangeProvinceSelectForEmergencyAdmitPx()
{
    var provid = $("#provinceselemr").val();
    var provarr = provid.split("-");
    var provcode = provarr[1];

    if (provid === "")
    {
        $('#citymunselemr').attr("disabled", true);
        $('#citymunselemr').selectpicker('val', 'Select');
        $('#citymunselemr').selectpicker('refresh');
        
        $('#barangayselemr').attr("disabled", true);
        $('#barangayselemr').selectpicker('val', 'Select');
        $('#barangayselemr').selectpicker('refresh');
        
        $('#zipcodetxtemr').val("");
        $('#zipcodetxtemr').attr("disabled", true);
        
        $('#streettxtemr').val("");
        $('#streettxtemr').attr("disabled", true);
    }
    else
    {
        $('#citymunselemr').removeAttr("disabled");
        $('#citymunselemr').selectpicker('refresh');
        
        $('#barangayselemr').attr("disabled", true);
        $('#barangayselemr').selectpicker('val', 'Select');
        $('#barangayselemr').selectpicker('refresh');
        
        $('#zipcodetxtemr').val("");
        $('#zipcodetxtemr').attr("disabled", true);
        
        $('#streettxtemr').val("");
        $('#streettxtemr').attr("disabled", true);

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getMunicipality",
            data: {providex: provcode},
            dataType: 'json'
        })
        .done(function (data)
        {
            $('#citymunselemr').empty();
            $('#citymunselemr').append('<option value="Select">' + "Select From List" + '</option>');
            for (var cv = 0; cv < data.length; cv++)
            {
                $('#citymunselemr').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
            }
            $('#citymunselemr').selectpicker('refresh');
        });
    }
}

function onChangeMunicipalitySelectForEmergencyAdmitPx()
{
    var provid = $("#provinceselemr").val();
    var provarr = provid.split("-");
    var provcode = provarr[1];

    var citymunid = $("#citymunselemr").val();
    var citymunarr = citymunid.split("-");
    var citymuncode = citymunarr[1];

    if (citymunid === "")
    {
        $('#barangayselemr').attr("disabled", true);
        $('#barangayselemr').selectpicker('val', 'Select');
        $('#barangayselemr').selectpicker('refresh');
        
        $('#zipcodetxtemr').val("");
        $('#zipcodetxtemr').attr("disabled", true);
        
        $('#streettxtemr').val("");
        $('#streettxtemr').attr("disabled", true);
    }
    else
    {
        $('#barangayselemr').removeAttr("disabled");
        $('#barangayselemr').selectpicker('refresh');
        
        $('#zipcodetxtemr').removeAttr("disabled");
        
        $('#streettxtemr').val("");
        $('#streettxtemr').attr("disabled", true);

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
            for (var cv = 0; cv < data.length; cv++)
            {
                $('#zipcodetxtemr').val(data[cv]['ZIP_CODE']);
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
            $('#barangayselemr').empty();
            $('#barangayselemr').append('<option value="Select">' + "Select from List" + '</option>');
            for (var cv = 0; cv < data.length; cv++)
            {
                $('#barangayselemr').append('<option value="' + data[cv]['BRGY_NAME'] + '">' + data[cv]['BRGY_NAME'] + '</option>');
            }
            $('#barangayselemr').selectpicker('refresh');
        });
    }
}

function onChangeBarangaySelectForEmergencyAdmitPx()
{
    var brgy = $("#barangayselemr").val();

    if (brgy === "")
    {
        $('#streettxtemr').val("");
        $('#streettxtemr').attr("disabled", true);
    }
    else
    {
        $('#streettxtemr').val("");
        $('#streettxtemr').removeAttr("disabled");
    }
}

function generateCasenoCode() 
{    
    $.ajax
    ({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Emergency/GenerateCasenoCode'
    })
    .done(function (result) 
    {
        var now = new Date();
        var currentYear = now.getFullYear();
        
        var caseno = result[0].caseno;
        
        var splitcaseno = caseno.split('-');
        
        var casenoyear = parseInt(splitcaseno[0]);        
        var todaysyear = parseInt(currentYear);

        if(casenoyear === todaysyear)
        {
            var convertCasenoToInt = parseInt(splitcaseno[1]);
            var incrementCasenoCode = convertCasenoToInt + 1;
            $('#accountnoemr').val(splitcaseno[0] + '-' + incrementCasenoCode);
        }
        else
        {
            $('#accountnoemr').val(todaysyear + '-' + "1");
        }
    });
}

function admitPatientThroughEmergencyOrQuickAdmission()
{    
    $('#quickAdmitPatientButton').prop('disabled',true);
    
    var patientpin1emr  = $('#patientpin1emr').val();
    var patientpin2emr  = $('#patientpin2emr').val();
    var accountnoemr    = $('#accountnoemr').val();
    var fnameemr        = $('#fnameemr').val();
    var mnameemr        = $('#mnameemr').val();
    var lnameemr        = $('#lnameemr').val();
    var suffixemr       = $('#suffixemr').val();
    var birthdayemer    = $('#birthdayemer').val();
    var ageemr          = $('#ageemr').val();
    var genderselemr    = $('#genderselemr').val();
    var civilselemr     = $('#civilselemr').val();
    var religionselemr  = $('#religionselemr').val();
    var provinceselemr  = $('#provinceselemr').val();
    var citymunselemr   = $('#citymunselemr').val();
    var barangayselemr  = $('#barangayselemr').val();
    var zipcodetxtemr   = $('#zipcodetxtemr').val();
    var streettxtemr    = $('#streettxtemr').val();
    var contactnotxtemr = $('#contactnotxtemr').val();
    var fatnametxtemr   = $('#fatnametxtemr').val();
    var motnametxtemr   = $('#motnametxtemr').val();
    var dateadmittxtemr = $('#dateadmittxtemr').val();
    var timeadmittxtemr = $('#timeadmittxtemr').val();
    var newtimeformat = convertTime12to24(timeadmittxtemr);

    $.ajax
    ({
        type: 'POST',
        data: 
        {
            patientpin1emrx: patientpin1emr,
            patientpin2emrx: patientpin2emr,
            accountnoemrx: accountnoemr,
            fnameemrx: fnameemr,
            mnameemrx: mnameemr,
            lnameemrx: lnameemr,
            suffixemrx: suffixemr,
            birthdayemerx: moment(birthdayemer).format("YYYY-MM-DD"),
            ageemrx: ageemr,
            genderselemrx: genderselemr,
            civilselemrx: civilselemr,
            religionselemrx: religionselemr,
            provinceselemrx: provinceselemr,
            citymunselemrx: citymunselemr,
            barangayselemrx: barangayselemr,
            zipcodetxtemrx: zipcodetxtemr,
            streettxtemrx: streettxtemr,
            contactnotxtemrx: contactnotxtemr,
            fatnametxtemrx: fatnametxtemr,
            motnametxtemrx: motnametxtemr,
            dateadmittxtemrx: moment(dateadmittxtemr).format("YYYY-MM-DD"),
            timeadmittxtemrx: newtimeformat + ":" + "00"
        },
        url: BASE_URL + 'Emergency/AdmitPatientForQuickOrEmergencyAdmission',
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

                checkFieldValidations(result.errors.patientpin2emrx, 'patientpin2emrerror', 'patientpin2emr');
                checkFieldValidations(result.errors.accountnoemrx, 'accountnoemrerror', 'accountnoemr');
                checkFieldValidations(result.errors.fnameemrx, 'fnameemrerror', 'fnameemr');
                checkFieldValidations(result.errors.mnameemrx, 'mnameemrerror', 'mnameemr');
                checkFieldValidations(result.errors.lnameemrx, 'lnameemrerror', 'lnameemr');
                checkFieldValidations(result.errors.birthdayemerx, 'birthdayemererror', 'birthdayemer');
                checkFieldValidations(result.errors.ageemrx, 'ageemrerror', 'ageemr');
                checkFieldValidations(result.errors.genderselemrx, 'genderselemrerror', 'genderselemr');
                checkFieldValidations(result.errors.civilselemrx, 'civilselemrerror', 'civilselemr');
                checkFieldValidations(result.errors.religionselemrx, 'religionselemrerror', 'religionselemr');
                checkFieldValidations(result.errors.provinceselemrx, 'provinceselemrerror', 'provinceselemr');
                checkFieldValidations(result.errors.citymunselemrx, 'citymunselemrerror', 'citymunselemr');
                checkFieldValidations(result.errors.barangayselemrx, 'barangayselemrerror', 'barangayselemr');
                checkFieldValidations(result.errors.zipcodetxtemrx, 'zipcodetxtemrerror', 'zipcodetxtemr');
                checkFieldValidations(result.errors.streettxtemrx, 'streettxtemrerror', 'streettxtemr');
                checkFieldValidations(result.errors.contactnotxtemrx, 'contactnotxtemrerror', 'contactnotxtemr');
                checkFieldValidations(result.errors.fatnametxtemrx, 'fatnametxtemrerror', 'fatnametxtemr');
                checkFieldValidations(result.errors.motnametxtemrx, 'motnametxtemrerror', 'motnametxtemr');
                checkFieldValidations(result.errors.dateadmittxtemrx, 'dateadmittxtemrerror', 'dateadmittxtemr');
                checkFieldValidations(result.errors.timeadmittxtemrx, 'timeadmittxtemrerror', 'timeadmittxtemr');  
                
                $('#quickAdmitPatientButton').prop('disabled',false);
            } 
            else
            {
                $('#quickAdmitPatientButton').attr('disabled', true);

                swal
                ({
                    title: "Success!",
                    text: "Record is successfully saved!",
                    type: "success",
                    allowOutsideClick: false
                });

                $('#patientpin1emr').val("");
                $('#patientpin2emr').val("");
                $('#fnameemr').val("");
                $('#mnameemr').val("");
                $('#lnameemr').val("");
                $('#suffixemr').val("");
                $('#birthdayemer').val("");
                $('#ageemr').val("");
                $('#genderselemr').selectpicker("val","");
                $('#civilselemr').selectpicker("val","");
                $('#religionselemr').selectpicker("val","");
                $('#provinceselemr').selectpicker("val","");
                $('#citymunselemr').selectpicker("val","");
                $('#barangayselemr').selectpicker("val","");
                $('#zipcodetxtemr').val("");
                $('#streettxtemr').val("");
                $('#contactnotxtemr').val("");
                $('#fatnametxtemr').val("");
                $('#motnametxtemr').val("");
                $('#textid_pxpincodeemr').html("");
                $('#patientpin1emrerror').html("");
                $('#patientpin2emrerror').html("");
                $('#fnameemrerror').html("");
                $('#mnameemrerror').html("");
                $('#lnameemrerror').html("");
                $('#suffixemrerror').html("");
                $('#birthdayemererror').html("");
                $('#ageemrerror').html("");
                $('#genderselemrerror').html("");
                $('#civilselemrerror').html("");
                $('#religionselemrerror').html("");
                $('#provinceselemrerror').html("");
                $('#citymunselemrerror').html("");
                $('#barangayselemrerror').html("");
                $('#zipcodetxtemrerror').html("");
                $('#streettxtemrerror').html("");
                $('#contactnotxtemrerror').html("");
                $('#fatnametxtemrerror').html("");
                $('#motnametxtemrerror').html("");

                $('#quickAdmitPatientButton').prop('disabled',false);
                generateCasenoForAdmission();
            }
        }
    });
}

function checkDuplicateCasenoForQuickAdmitPatient()
{
    swal
    ({
        title: "Please wait!",
        text: "Reading of data is still ongoing.",
        imageUrl: BASE_URL + "assets/images/loading.gif",
        imageSize: '200x200',
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false
    });
    
    $('#quickAdmitPatientButton').prop('disabled',true);
    
    var caseno = $('#accountnoemr').val();
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getInPatientlistDataForCheckDuplicateCasenoOfAdmitPatient",
        data: {casenox: caseno},
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
                text: "Case No. already exists!\nCase No. will be refreshed!",
                type: "warning",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            },
            function () 
            {
                generateCasenoForAdmission();
                
                setTimeout(function () 
                {
                    swal
                    ({
                        title: "Success",
                        text: "Case number is successfully refreshed!",
                        type: "success",
                        confirmButtonText: "OK"
                    });
                }, 2000);
            });
            
            $('#clickgeneralid').tab('show');
            
            $('#quickAdmitPatientButton').prop('disabled',false);
        }
        else
        {
            admitPatientThroughEmergencyOrQuickAdmission(caseno);
        }
    });
}

function checkFieldValidations(resultError, errorfield, field)
{
    if (resultError !== '')
    {
        
        $('#' + errorfield).empty();
        $('#' + errorfield).append(resultError).removeAttr('hidden');
//        $('#' + field).css('border-color', 'red');
    } 
    else
    {
        $('#' + errorfield).attr('hidden', true);
//        $('#' + field).removeAttr('style');
    }
}

function clearerrors()
{
    $('#patientpin1emrerror').html("");
    $('#patientpin2emrerror').html("");
    $('#accountnoemrerror').html("");
    $('#fnameemrerror').html("");
    $('#mnameemrerror').html("");
    $('#lnameemrerror').html("");
    $('#suffixemrerror').html("");
    $('#birthdayemererror').html("");
    $('#ageemrerror').html("");
    $('#genderselemrerror').html("");
    $('#civilselemrerror').html("");
    $('#religionselemrerror').html("");
    $('#provinceselemrerror').html("");
    $('#citymunselemrerror').html("");
    $('#barangayselemrerror').html("");
    $('#zipcodetxtemrerror').html("");
    $('#streettxtemrerror').html("");
    $('#contactnotxtemrerror').html("");
    $('#fatnametxtemrerror').html("");
    $('#motnametxtemrerror').html("");
    $('#dateadmittxtemrerror').html("");
    $('#timeadmittxtemrerror').html("");
}

function clearform()
{
    swal
    ({
        title: "Success!",
        text: "Quick Admit Form is successfully reset!",
        type: "success",
        allowOutsideClick: false
    });
    
    $('#textid_pxpincodeemr').html("");
    $('#patientpin1emr').val("");
    $('#patientpin2emr').val("");
    $('#fnameemr').val("");
    $('#mnameemr').val("");
    $('#lnameemr').val("");
    $('#suffixemr').val("");
    $('#birthdayemer').val("");
    $('#ageemr').val("");
    $('#genderselemr').selectpicker("val","");
    $('#civilselemr').selectpicker("val","");
    $('#religionselemr').selectpicker("val","");
    $('#provinceselemr').selectpicker("val","");
    $('#citymunselemr').selectpicker("val","");
    $('#barangayselemr').selectpicker("val","");
    $('#zipcodetxtemr').val("");
    $('#streettxtemr').val("");
    $('#contactnotxtemr').val("");
    $('#fatnametxtemr').val("");
    $('#motnametxtemr').val("");
    
    
    
//    var todaydate = moment().format("YYYY-MM-DD");
//    var todaytime = moment().format("hh:mm:ss");
//
//    $('#dateadmittxtemr').val(todaydate);
//    $('#timeadmittxtemr').val(todaytime);
    
    clearerrors();
}

function delete24hourslapsedquickadmitpatient()
{   
    var discharged = 0;
    var quickadmit = 1;
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Emergency/getQuickAdmittedPatientDataFromInpatientTable",
        data: 
        {
            discharged: discharged,
            quickadmit: quickadmit
        },
        dataType: 'json'
    })
    .done(function (data)
    {
        for (var cv = 0; cv < data.length; cv++)
        {
            var admitteddate = data[cv]['admitdate'] + " " + data[cv]['admittime'];
            var formateddate = moment(admitteddate);
            var tomorrowdate = formateddate.add('days', 1).format('YYYY-MM-DD HH:mm:ss');
            var currentsdate = moment().format('YYYY-MM-DD HH:mm:ss');
            
            var caseno = data[cv]['caseno'];
            
            var todaydate = new Date(currentsdate);
            var tomrwdate = new Date(tomorrowdate);
            
            if(todaydate > tomrwdate)
            {
                $.ajax
                ({
                    type: 'POST',
                    data: {casenox: caseno},
                    url: BASE_URL + 'Emergency/DeleteQuickAdmittedPatient',
                    dataType: 'json'
                });
            }
        }
    });
}

function showQuickAdmittedPatientMasterlistModalForEmergency()
{
    $('#quickpxmasterlist').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
    
    quickadmittedpx_table.ajax.reload();
    $('#quick-admitted-patients-masterlist-table [type="search"]').val("");
    $('#quick-admitted-patients-masterlist-table [type="search"]').focus();
    quickadmittedpx_table.search("").draw();
}

function getAllQuickAdmittedPatientAndAddItToTheTable()
{
    quickadmittedpx_table = $('#quick-admitted-patients-masterlist-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        ajax:
                {
                    url: BASE_URL + 'Emergency/GetAllQuickAdmittedPatients',
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

function hideQuickAdmittedPatientMasterlistModalForEmergency()
{
    $('#quickpxmasterlist').modal("hide");
    $('body').css('overflow', 'auto');
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
            closeOnConfirm: true,
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
        $('#ageemr').val("Invalid birthday - Please try again!");
    }
    else 
    {
        $('#ageemr').val(year_age + "." + month_age);
        
//        alert(  year_age + " years " + "\n" +
//                month_age + " months " + "\n" +
//                day_age + " days" + "\n\n" +
//                tMnt + " months " + "\n" +
//                day_age + " days" + "\n\n" +
//                tDays + " days" + "\n" +
//                tDays*24 + " hours" + "\n" +
//                tDays*24*3600 + " seconds" + "\n" +
//                tDays*24*3600*1000 + " miliseconds");
    }
}

function onchangeCalculateAge()
{
    var birthdate = moment($('#birthdayemer').val()).format("YYYY-MM-DD");
    
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
            closeOnConfirm: true,
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
        $('#ageemr').val("Invalid birthday - Please try again!");
    }
    else 
    {
        $('#ageemr').val(year_age + "." + month_age);
    }
}

function showEditAdmittedPatientModal(caseno)
{
    setToDefaultViewEditAdmittedPatientModal();
    
    $('#admitpatientmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#quickpxmasterlist').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#admitpatientmodal').css('overflow-y', 'scroll');

    $("#prof").css('background', '#168C94');
    $("#cont").css('background', '');
    $("#loca").css('background', '');
    $("#fami").css('background', '');

    $("#guar").css('background', '#168C94');
    $("#admi").css('background', '');
    $("#atte").css('background', '');
    $("#acco").css('background', '');

    $("#phhm").css('background', '#168C94');
    $("#pxcl").css('background', '');
    $("#vipm").css('background', '');

    $("#comp").css('background', '#168C94');
    $("#diag").css('background', '');
    $("#diet").css('background', '');
    $("#conf").css('background', '');
    
    addoreditadmissionindicator = "ADD";

    $("#profileCollapse").collapse('show');
    $("#contactCollapse").collapse('hide');
    $("#locationCollapse").collapse('hide');
    $("#familyCollapse").collapse('hide');

    $("#guardianCollapse").collapse('show');
    $("#admissionCollapse").collapse('hide');
    $("#attendantCollapse").collapse('hide');
    $("#accomodationCollapse").collapse('hide');

    $("#philhealthandHMOCollapse").collapse('show');
    $("#ClassificationCollapse").collapse('hide');
    $("#PackagesandVIPCollapse").collapse('hide');

    $("#ComplaintsIPDCollapse").collapse('show');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('hide');
    $("#ConfinementIPDCollapse").collapse('hide');
    
    $("#ComplaintsOPDCollapse").collapse('show');
    $("#DiagnosisOPDCollapse").collapse('hide');
    $("#ImpressionOPDCollapse").collapse('hide');

    $("#compopd").css('background', '#168C94');
    $("#diagopd").css('background', '');
    $("#dietopd").css('background', '');
    
    $('#selectid_entrytypeadm').prop('disabled', true);
    $('#selectid_entrytypeadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
    $('#selectid_entrytypeadm').selectpicker('val','Disabled');
    $('#selectid_entrytypeadm').selectpicker('refresh');
    
    $('#admissiontypehiddentext').val('Normal');
    $('#inputid_pathologyadm').val('NON-PATHOLOGY');
    $('#textboxid_forminororadm').val(0);
    
    $('#editquickadmitPatientButton').removeClass('d-none');
    $('#editadmitPatientButton').addClass('d-none');
    $('#admitPatientButton').addClass('d-none');

    $('#hideeditadmitpxmodalbtnid').addClass('d-none');
    $('#hideadmitpxmodalbtnid').removeClass('d-none');
    
    $('#InsertAdmissionButtonForComanagement').removeClass('d-none');
    $('#UpdateAdmissionButtonForComanagement').addClass('d-none');
    
    $('#showHMOManagementModalButtonForInsertAdmission').removeClass('d-none');
    $('#showHMOManagementModalButtonForUpdateAdmission').addClass('d-none');
    
    $('#showDiagnosisManagementModalButtonForAdmissionInsert').removeClass('d-none');
    $('#showDiagnosisManagementModalButtonForAdmissionUpdate').addClass('d-none');  
    
    $('#selectCausesOfConfinementButtonForDeleteAdmAdd').removeClass('d-none');
    $('#selectCausesOfConfinementButtonForDeleteAdmEdt').addClass('d-none');   

    $('#addNewComanageDoctorBtnForAdmAdd').removeClass('d-none');
    $('#addNewComanageDoctorBtnForAdmEdt').addClass('d-none');
    
    $('#AddHMOForInsertAdmission').removeClass('d-none');
    $('#AddHMOForUpdateAdmission').addClass('d-none');

    $('#inputid_comanagedataadm').val("");
    $('#inputid_hmoinsurdataadm').val("");
    $('#inputid_causecondataadm').val("");
    $('#inputid_finalcomanagedataadm').val("");
    $('#inputid_finalhmoinsurdataadm').val("");
    $('#inputid_finalcausecondataadm').val("");
    $('#inputid_vipsecuritydataadm').val("");
    $('#inputid_packagemanadataadm').val("");
    $('#inputid_pckgpatientdataadm').val("");
    
    $('.insertadmitpatientheader').prop('hidden', false);
    $('.updateadmitpatientheader').prop('hidden', true);
    
    $('#insertadmitpatientformheader').prop('hidden', false);
    $('#updateadmitpatientformheader').prop('hidden', true);
    
    $("#AddPackageForm").removeClass('d-none');
    
    $('#textid_deleteindicatorforpxpkgupdateadmedt').val("");
    $('#textid_updateindicatorforpxpkgupdateadmedt').val("");
    
    $("#addNewVIPButtonForAdmissionInsert").removeClass('d-none');
    $("#edtOldVIPButtonForAdmissionUpdate").addClass('d-none');

    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getInPatientlistDataForEditAdmitPatient",
        data: {casenox: caseno},
        dataType: 'json'
    })
    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {
            $('#inputid_hiddenIDadm').val(data.inpatientlistdata['caseno']);
            $('#accountnumberadm').val(data.inpatientlistdata['caseno']);
            $('#hiddeninputid_slcodeadm').val(data.inpatientlistdata['slcode']);
            $('#pxindexnoadm').val(data.inpatientlistdata['PIN']);
            $('#hiddeninputid_pincodeadm').val(data.inpatientlistdata['pincode']);
            $('#hiddeninputid_pinformatadm').val(data.inpatientlistdata['pinformat']);
            $('#inputid_vmembershipadm').val(data.inpatientlistdata['memberrefno']);
            $('#selectid_patienttypeadm').selectpicker('val',data.inpatientlistdata['pxtype']);
            $('#selectid_entrytypeadm').selectpicker('val',data.inpatientlistdata['casetype']);
            $('#lastnameadm').val(data.inpatientlistdata['lname']);
            $('#firstnameadm').val(data.inpatientlistdata['fname']);
            $('#suffixadm').val(data.inpatientlistdata['suffix']);
            $('#middlenameadm').val(data.inpatientlistdata['mname']);
            $('#genderadm').val(data.inpatientlistdata['sex']);
            $('#nationalityadm').val(data.inpatientlistdata['nationality']);
            $('#hiddeninputid_casecodexadm').val(data.inpatientlistdata['casecode']);
            $('#religionselectadm').selectpicker('val',data.inpatientlistdata['religion']);
            
            $('#hiddenid_pxfnameupdadm').val(data.inpatientlistdata['fname']);
            $('#hiddenid_pxmnameupdadm').val(data.inpatientlistdata['mname']);
            $('#hiddenid_pxlnameupdadm').val(data.inpatientlistdata['lname']);
            $('#hiddenid_pxsuffxupdadm').val(data.inpatientlistdata['suffix']);
            $('#hiddenid_casenumupdadm').val(data.inpatientlistdata['caseno']);
            $('#hiddenid_pincodeupdadm').val(data.inpatientlistdata['pincode']);

            var bday = $('#birthdayadm').val(data.inpatientlistdata['bday']);
            var birthdate = new Date(bday.val());
            var todaydate = new Date();
            var age = Math.floor((todaydate - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
            $("#inputid_ageadm").val(age);
            
            $('#civilstatusselectadm').selectpicker('val',data.inpatientlistdata['civilstatus']);
            
            var PIN = data.inpatientlistdata['PIN'];
            
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Emergency/getPatientlistDataForEditQuickAdmittedPatient",
                data: {pin: PIN},
                dataType: 'json'
            })
            .done(function (data)
            {
                console.log(data);

                if (data.status)
                {
                    $('#contactnoadm').val(data.patientlistdata['contactno']);
                    $('#passportnoadm').val(data.patientlistdata['passportno']);
                    $('#emailadm').val(data.patientlistdata['email']);
                    $('#fatheradm').val(data.patientlistdata['father']);
                    $('#motheradm').val(data.patientlistdata['mother']);
                    $('#fatheradrsadm').val(data.patientlistdata['fatheradrs']);
                    $('#motheradrsadm').val(data.patientlistdata['motheradrs']);
                    $('#fathernationalityadm').val(data.patientlistdata['fathernationality']);
                    $('#mothernationalityadm').val(data.patientlistdata['mothernationality']);
                    $('#hiddeninputid_slcodeadm').val(data.patientlistdata['SLaccount']);
                    $('#hiddeninputid_pincodeadm').val(data.patientlistdata['pincode']);
                    $('#hiddeninputid_pinformatadm').val(data.patientlistdata['pinformat']);
                    $('#hiddeninputid_tinadm').val(data.patientlistdata['tin']);
                    $('#inputid_vmembershipadm').val(data.patientlistdata['memberrefno']);
                    $('#phmembershipselectadm').selectpicker('val', data.patientlistdata['phicmembr'] + ":" + data.patientlistdata['phiccode']);
                    $('#phmembernameadm').val(data.patientlistdata['phicmembrname']);
                    $('#phicnumberadm').val(data.patientlistdata['phicno']);
                    $('#inputid_spousenameadm').val(data.patientlistdata['spouse']);
                    $('#inputid_spousebirthadm').val(data.patientlistdata['spousebday']);
                }
            });

            $("#mobilenoadm").val(data.inpatientlistdata['mobileno']);
            $('#provinceselectadm').selectpicker('val',data.inpatientlistdata['provadd']);
            var provid = data.inpatientlistdata['provadd'];

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
                $('#selectidcitymuniadm').empty();
                $('#selectidcitymuniadm').append('<option value="Select">' + "Select from List" + '</option>');
                for (var cv = 0; cv < data.length; cv++)
                {
                    $('#selectidcitymuniadm').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
                }
                $('#selectidcitymuniadm').selectpicker('refresh');

                $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Admission/getInPatientlistDataForEditAdmitPatient",
                    data: {casenox: caseno},
                    dataType: 'json'
                })
                .done(function (data)
                {
                    $('#selectidcitymuniadm').selectpicker('val', data.inpatientlistdata['cityadd']);
                    $('#selectidcitymuniadm').selectpicker('refresh');
                    var citymunid = $("#selectidcitymuniadm").val();
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
                        for (var cv = 0; cv < data.length; cv++)
                        {
                            $('#zipcodexadm').val(data[cv]['ZIP_CODE']);
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
                        $('#selectid_barangayadm').empty();
                        $('#selectid_barangayadm').append('<option value="Select">' + "Select from List" + '</option>');
                        for (var cv = 0; cv < data.length; cv++)
                        {
                            $('#selectid_barangayadm').append('<option value="' + data[cv]['BRGY_NAME'] + '">' + data[cv]['BRGY_NAME'] + '</option>');
                        }
                        $('#selectid_barangayadm').selectpicker('refresh');

                        $.ajax
                        ({
                            type: 'POST',
                            url: BASE_URL + "Admission/getInPatientlistDataForEditAdmitPatient",
                            data: {casenox: caseno},
                            dataType: 'json'
                        })
                        .done(function (data)
                        {
                            $('#selectid_barangayadm').selectpicker('val', data.inpatientlistdata['brgy']);
                            $('#selectid_barangayadm').selectpicker('refresh');
                        });
                    });
                });
            });
            
            $('#addressadm').val(data.inpatientlistdata['adrs']);
            $('#patientrecipientadm').val(data.inpatientlistdata['mobileno']);
            $('#admissiondateadm').val(data.inpatientlistdata['admitdate']);
            $('#admissiontimeadm').val(data.inpatientlistdata['admittime']);
            $('#inputid_spousenameadm').val(data.inpatientlistdata['spouse']);
            $('#inputid_spousebirthadm').val(data.inpatientlistdata['spousebday']);

            var imagepath = BASE_URL + 'assets/images/uploads/patients/' + data.inpatientlistdata['PIN'] + 'p.jpg';
            
            $.ajax
            ({
                url: imagepath,
                type: 'HEAD',
                success: function ()
                {
                    var img = $('#patientimguploadforadmpx').attr('src', imagepath);
                    var src = img.attr('src');
                    var i = src.indexOf('?dummy=');
                    src = i != -1 ? src.substring(0, i) : src;
                    var d = new Date();
                    img.attr('src', src + '?dummy=' + d.getTime());
                }
            });
        }
    });
}

function hideAdmitPatientModal()
{
    $('#admitpatientmodal').modal("hide");
    $('#quickpxmasterlist').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#quickpxmasterlist').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');

    $("#clickgeneralid").tab('show');
    $("#generalerrtabindicator").html("");
    $("#profileerrtabindicator").html("");
    $("#admissionerrtabindicator").html("");
    $("#insuranceerrtabindicator").html("");
    $("#otherserrtabindicator").html("");

    $("#contacterrcolapseindicator").html("");
    $("#locationerrcolapseindicator").html("");

    $("#guardianerrcolapseindicator").html("");
    $("#admissionerrcolapseindicator").html("");
    $("#attendanterrcolapseindicator").html("");
    $("#accomodaerrcolapseindicator").html("");

    $("#philhmoerrcolapseindicator").html("");
    $("#pxclasserrcolapseindicator").html("");
    $("#pckgviperrcolapseindicator").html("");

    $("#complainterrcolapseindicator").html("");
    $("#diagnosiserrcolapseindicator").html("");
    $("#dietguideerrcolapseindicator").html("");
    $("#cnfinemnterrcolapseindicator").html("");

    $("#complaopderrcolapseindicator").html("");
    $("#diagnoopderrcolapseindicator").html("");
    $("#impresopderrcolapseindicator").html(""); 

    $("#healthrecnoadmerr").html("");
    $("#admixontypeselectadmerr").html("");
    $("#casenumberadmerr").html("");
    $("#stationnameadmerr").html("");
    $("#selectid_patienttypeadmerr").html("");
    $("#inputid_entrytypeadmerr").html("");
    $("#religionselectadmerr").html("");
    $("#civilstatusselectadmerr").html("");
    $("#contactnoadmerr").html("");
    $("#mobilenoadmerr").html("");
    $("#provinceselectadmerr").html("");
    $("#selectidcitymuniadmerr").html("");
    $("#zipcodexadmerr").html("");
    $("#selectid_barangayadmerr").html("");
    $("#addressadmerr").html("");
    $("#watchernameadmerr").html("");
    $("#watcherbirthadmerr").html("");
    $("#reltopatientadmerr").html("");
    $("#guardiannumadmerr").html("");
    $("#billingrecipientadmerr").html("");
    $("#patientrecipientadmerr").html("");
    $("#weightadmerr").html("");
    $("#cautionsadmerr").html("");
    $("#inputid_tbdotsstatusadmerr").html("");
    $("#linkaccountadmerr").html("");
    $("#attendingdoctoradmerr").html("");
    $("#inputid_finalcomanagedataadmerr").html("");
    $("#attendingnurseadmerr").html("");
    $("#nurseinchargeadmerr").html("");
    $("#selectid_roomadmerr").html("");
    $("#inputid_roominfoadmerr").html("");
    $("#inputid_ancilaryadmerr").html("");
    $("#inputid_roomrateadmerr").html("");
    $("#inputid_roomcredadmerr").html("");
    $("#phmembershipselectadmerr").html("");
    $("#phmembernameadmerr").html("");
    $("#inputid_mdfrefnumadmerr").html("");
    $("#phicnumberadmerr").html("");
    $("#reltomemberadmerr").html("");
    $("#inputid_finalhmoinsurdataadmerr").html("");
    $("#patientclassadmerr").html("");
    $("#inputid_obgyneprocedureadmerr").html("");
    $("#admissionreasonadmerr").html("");
    $("#admittingdiagnosisadmerr").html("");
    $("#dietaryadmerr").html("");
    $("#inputid_finalcausecondataadmerr").html("");

    $('#healthrecnoadm').val("");
    $('#casenumberadm').val("");
    $('#admixontypeselectadm').selectpicker("val", "Select");
    $('#stationnameadm').selectpicker("val", "Select");
    $('#selectid_patienttypeadm').selectpicker("val", "IPD");
    $('#reltopatientadm').selectpicker("val", "Select");
    $('#watchernameadm').val("");
    $('#watcherbirthadm').val("");
    $('#guardiannumadm').val("");
    $('#billingrecipientadm').val("");
    $('#selectid_entrytypeadm').val("");
    $('#weightadm').val("");
    $('#linkaccountadm').val("");
    $('#cautionsadm').selectpicker("val", "Select");
    $('#inputid_tbdotsstatusadm').selectpicker("val", "Select");
    $('#attendingdoctoradm').val("");
    $('#attendingnurseadm').val("");
    $('#nurseinchargeadm').selectpicker("val", "Select");
    $('#radioid_normaltypeadm').prop('checked',true);
    $('#radioid_emergencytypeadm').prop('checked',false);
    $('#admissiontypehiddentext').val("Normal");
    $('#selectid_roomadm').val("");
    $('#selectid_roomadmhid').val("");
    $('#inputid_roominfoadm').val("");
    $('#inputid_ancilaryadm').val("");
    $('#inputid_roomrateadm').val("");
    $('#inputid_roomcredadm').val("");
    $('#inputid_mdfrefnumadm').val("");
    $('#reltomemberadm').selectpicker("val", "Select");
    $('#patientclassadm').selectpicker("val", "Select");

    $("#prof").css('background', '#168C94');
    $("#cont").css('background', '');
    $("#loca").css('background', '');
    $("#fami").css('background', '');

    $("#guar").css('background', '#168C94');
    $("#admi").css('background', '');
    $("#atte").css('background', '');
    $("#acco").css('background', '');

    $("#phhm").css('background', '#168C94');
    $("#pxcl").css('background', '');
    $("#vipm").css('background', '');

    $("#comp").css('background', '#168C94');
    $("#diag").css('background', '');
    $("#diet").css('background', '');
    $("#conf").css('background', '');

    $("#profileCollapse").collapse('show');
    $("#contactCollapse").collapse('hide');
    $("#locationCollapse").collapse('hide');
    $("#familyCollapse").collapse('hide');

    $("#guardianCollapse").collapse('show');
    $("#admissionCollapse").collapse('hide');
    $("#attendantCollapse").collapse('hide');
    $("#accomodationCollapse").collapse('hide');

    $("#philhealthandHMOCollapse").collapse('show');
    $("#ClassificationCollapse").collapse('hide');
    $("#PackagesandVIPCollapse").collapse('hide');

    $("#ComplaintsIPDCollapse").collapse('show');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('hide');
    $("#ConfinementIPDCollapse").collapse('hide');

    $("#ComplaintsOPDCollapse").collapse('show');
    $("#DiagnosisOPDCollapse").collapse('hide');
    $("#ImpressionOPDCollapse").collapse('hide');

    $("#compopd").css('background', '#168C94');
    $("#diagopd").css('background', '');
    $("#dietopd").css('background', '');

    $('#editadmitPatientButton').addClass('d-none');
    $('#admitPatientButton').removeClass('d-none');

    $('#hideeditadmitpxmodalbtnid').addClass('d-none');
    $('#hideadmitpxmodalbtnid').removeClass('d-none');

    $('#InsertAdmissionButtonForComanagement').removeClass('d-none');
    $('#UpdateAdmissionButtonForComanagement').addClass('d-none');

    $('#showHMOManagementModalButtonForInsertAdmission').removeClass('d-none');
    $('#showHMOManagementModalButtonForUpdateAdmission').addClass('d-none');

    $('#showDiagnosisManagementModalButtonForAdmissionInsert').removeClass('d-none');
    $('#showDiagnosisManagementModalButtonForAdmissionUpdate').addClass('d-none');  

    $('#selectCausesOfConfinementButtonForDeleteAdmAdd').removeClass('d-none');
    $('#selectCausesOfConfinementButtonForDeleteAdmEdt').addClass('d-none');   

    $('#addNewComanageDoctorBtnForAdmAdd').removeClass('d-none');
    $('#addNewComanageDoctorBtnForAdmEdt').addClass('d-none');

    $('#AddHMOForInsertAdmission').removeClass('d-none');
    $('#AddHMOForUpdateAdmission').addClass('d-none');

    $('#inputid_hiddencoman').html("");
    $('#inputid_hiddenhmoin').html("");
    $('#inputid_hiddencause').html("");
    $('#inputid_comanagedataadm').val("");
    $('#inputid_hmoinsurdataadm').val("");
    $('#inputid_causecondataadm').val("");
    $('#inputid_finalcomanagedataadm').val("");
    $('#inputid_finalcomanagedataupd').val("");
    $('#inputid_finalhmoinsurdataadm').val("");
    $('#inputid_finalhmoinsurdataupd').val("");
    $('#inputid_finalcausecondataadm').val("");
    $('#inputid_finalcausecondataupd').val("");
    $('#inputid_vipsecuritydataadm').val("");
    $('#inputid_packagemanadataadm').val("");
    $('#inputid_pckgpatientdataadm').val("");
    $('#hiddeninputid_slcodeadm').val("");
    $('#hiddeninputid_tinadm').val("");
    $('#hiddeninputid_pincodeadm').val("");
    $('#hiddeninputid_pinformatadm').val("");
    $('#hiddeninputid_healrecnoadm').val("");
    $('#hiddeninputid_lastadmitdateadm').val("");
    $('#hiddeninputid_lastadmittimeadm').val("");
    $('#hiddeninputid_lastdischdateadm').val("");
    $('#hiddeninputid_lastdischtimeadm').val("");
    $('#hiddenid_confinement_deleteparameter').val("");
    $('#hiddentextid_deleteparameterforcomanage').val("");

    $('.insertadmitpatientheader').prop('hidden', false);
    $('.updateadmitpatientheader').prop('hidden', true);

    $('#insertadmitpatientformheader').prop('hidden', false);
    $('#updateadmitpatientformheader').prop('hidden', true);

//            comanage_table.clear().draw();
//            $('#myFormComanageAdmitEdt').empty();
//            $('#myFormComanageAdmitAdd').empty();
//
//            hmomanagement_table.clear().draw();
//            $('#myFormHMOInsurAdmitEdt').empty();
//            $('#myFormHMOInsurAdmitAdd').empty();
//
//            confinecause_table.clear().draw();
//            $('#myFormCauseConAdmitEdt').empty();
//            $('#myFormCauseConAdmitAdd').empty();    
//
//            totalcredithmo = 0;

    $('#inputid_obgyneprocedureadm').prop('disabled', true);
    $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
    $('#inputid_obgyneprocedureadm').selectpicker('val','Disabled');
    $('#inputid_obgyneprocedureadm').selectpicker('refresh');
    $('#inputid_obgyneprocedureadmerr').html("");

    $('#inputid_adultpediaadm').prop('disabled', true);
    $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
    $('#inputid_adultpediaadm').selectpicker('val','Disabled');
    $('#inputid_adultpediaadm').selectpicker('refresh');
    $('#inputid_adultpediaadmerr').html("");

    if($('#pathologychkboxidadm').is(':checked'))
    {
        $("#pathologychkboxidadm").click();
    }
    $("#pathologychkboxidadm").attr('disabled', true);
    $("#pathologylabelid").html("N/A");

    $("#inputid_othersadm").attr('disabled', true);
    $("#gravidaadm").attr('disabled', true);
    $("#paraadm").attr('disabled', true);
    $("#abortionadm").attr('disabled', true);
    $("#iufdadm").attr('disabled', true);
    $("#diedadm").attr('disabled', true);

    $("#inputid_othersadm").val("N/A");
    $("#gravidaadm").val("N/A");
    $("#paraadm").val("N/A");
    $("#abortionadm").val("N/A");
    $("#iufdadm").val("N/A");
    $("#diedadm").val("N/A");

    $("#inputid_othersadmerr").html("");
    $("#gravidaadmerr").html("");
    $("#paraadmerr").html("");
    $("#abortionadmerr").html("");
    $("#iufdadmerr").html("");
    $("#diedadmerr").html("");

    $('#inputid_creditmaxlimitadm').val("");
    $('#selectid_hospcareinsadm').selectpicker("val", "Select");
    $('#packageoverviewadm').val("");
    $('#admissionreasonadm').val("");
    $('#chckboxid_forminororadm').prop('checked',false);
    $('#textboxid_forminororadm').val(0);
    $('#admittingdiagnosisadm').val("");
    $('#dietaryadm').val("");
}

function setToDefaultViewEditAdmittedPatientModal()
{
    $("#clickgeneralid").tab('show');
    $("#generalerrtabindicator").html("");
    $("#profileerrtabindicator").html("");
    $("#admissionerrtabindicator").html("");
    $("#insuranceerrtabindicator").html("");
    $("#otherserrtabindicator").html("");

    $("#contacterrcolapseindicator").html("");
    $("#locationerrcolapseindicator").html("");

    $("#guardianerrcolapseindicator").html("");
    $("#admissionerrcolapseindicator").html("");
    $("#attendanterrcolapseindicator").html("");
    $("#accomodaerrcolapseindicator").html("");

    $("#philhmoerrcolapseindicator").html("");
    $("#pxclasserrcolapseindicator").html("");
    $("#pckgviperrcolapseindicator").html("");

    $("#complainterrcolapseindicator").html("");
    $("#diagnosiserrcolapseindicator").html("");
    $("#dietguideerrcolapseindicator").html("");
    $("#cnfinemnterrcolapseindicator").html("");

    $("#complaopderrcolapseindicator").html("");
    $("#diagnoopderrcolapseindicator").html("");
    $("#impresopderrcolapseindicator").html(""); 

    $("#healthrecnoadmerr").html("");
    $("#admixontypeselectadmerr").html("");
    $("#casenumberadmerr").html("");
    $("#stationnameadmerr").html("");
    $("#selectid_patienttypeadmerr").html("");
    $("#inputid_entrytypeadmerr").html("");
    $("#religionselectadmerr").html("");
    $("#civilstatusselectadmerr").html("");
    $("#contactnoadmerr").html("");
    $("#mobilenoadmerr").html("");
    $("#provinceselectadmerr").html("");
    $("#selectidcitymuniadmerr").html("");
    $("#zipcodexadmerr").html("");
    $("#selectid_barangayadmerr").html("");
    $("#addressadmerr").html("");
    $("#watchernameadmerr").html("");
    $("#watcherbirthadmerr").html("");
    $("#reltopatientadmerr").html("");
    $("#guardiannumadmerr").html("");
    $("#billingrecipientadmerr").html("");
    $("#patientrecipientadmerr").html("");
    $("#weightadmerr").html("");
    $("#cautionsadmerr").html("");
    $("#inputid_tbdotsstatusadmerr").html("");
    $("#linkaccountadmerr").html("");
    $("#attendingdoctoradmerr").html("");
    $("#inputid_finalcomanagedataadmerr").html("");
    $("#attendingnurseadmerr").html("");
    $("#nurseinchargeadmerr").html("");
    $("#selectid_roomadmerr").html("");
    $("#inputid_roominfoadmerr").html("");
    $("#inputid_ancilaryadmerr").html("");
    $("#inputid_roomrateadmerr").html("");
    $("#inputid_roomcredadmerr").html("");
    $("#phmembershipselectadmerr").html("");
    $("#phmembernameadmerr").html("");
    $("#inputid_mdfrefnumadmerr").html("");
    $("#phicnumberadmerr").html("");
    $("#reltomemberadmerr").html("");
    $("#inputid_finalhmoinsurdataadmerr").html("");
    $("#patientclassadmerr").html("");
    $("#inputid_obgyneprocedureadmerr").html("");
    $("#admissionreasonadmerr").html("");
    $("#admittingdiagnosisadmerr").html("");
    $("#dietaryadmerr").html("");
    $("#inputid_finalcausecondataadmerr").html("");

    $('#healthrecnoadm').val("");
    $('#casenumberadm').val("");
    $('#admixontypeselectadm').selectpicker("val", "Select");
    $('#stationnameadm').selectpicker("val", "Select");
    $('#selectid_patienttypeadm').selectpicker("val", "IPD");
    $('#reltopatientadm').selectpicker("val", "Select");
    $('#watchernameadm').val("");
    $('#watcherbirthadm').val("");
    $('#guardiannumadm').val("");
    $('#billingrecipientadm').val("");
    $('#selectid_entrytypeadm').val("");
    $('#weightadm').val("");
    $('#linkaccountadm').val("");
    $('#cautionsadm').selectpicker("val", "Select");
    $('#inputid_tbdotsstatusadm').selectpicker("val", "Select");
    $('#attendingdoctoradm').val("");
    $('#attendingnurseadm').val("");
    $('#nurseinchargeadm').selectpicker("val", "Select");
    $('#radioid_normaltypeadm').prop('checked',true);
    $('#radioid_emergencytypeadm').prop('checked',false);
    $('#admissiontypehiddentext').val("Normal");
    $('#selectid_roomadm').val("");
    $('#selectid_roomadmhid').val("");
    $('#inputid_roominfoadm').val("");
    $('#inputid_ancilaryadm').val("");
    $('#inputid_roomrateadm').val("");
    $('#inputid_roomcredadm').val("");
    $('#inputid_mdfrefnumadm').val("");
    $('#reltomemberadm').selectpicker("val", "Select");
    $('#patientclassadm').selectpicker("val", "Select");

    $("#prof").css('background', '#168C94');
    $("#cont").css('background', '');
    $("#loca").css('background', '');
    $("#fami").css('background', '');

    $("#guar").css('background', '#168C94');
    $("#admi").css('background', '');
    $("#atte").css('background', '');
    $("#acco").css('background', '');

    $("#phhm").css('background', '#168C94');
    $("#pxcl").css('background', '');
    $("#vipm").css('background', '');

    $("#comp").css('background', '#168C94');
    $("#diag").css('background', '');
    $("#diet").css('background', '');
    $("#conf").css('background', '');

    $("#profileCollapse").collapse('show');
    $("#contactCollapse").collapse('hide');
    $("#locationCollapse").collapse('hide');
    $("#familyCollapse").collapse('hide');

    $("#guardianCollapse").collapse('show');
    $("#admissionCollapse").collapse('hide');
    $("#attendantCollapse").collapse('hide');
    $("#accomodationCollapse").collapse('hide');

    $("#philhealthandHMOCollapse").collapse('show');
    $("#ClassificationCollapse").collapse('hide');
    $("#PackagesandVIPCollapse").collapse('hide');

    $("#ComplaintsIPDCollapse").collapse('show');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('hide');
    $("#ConfinementIPDCollapse").collapse('hide');

    $("#ComplaintsOPDCollapse").collapse('show');
    $("#DiagnosisOPDCollapse").collapse('hide');
    $("#ImpressionOPDCollapse").collapse('hide');

    $("#compopd").css('background', '#168C94');
    $("#diagopd").css('background', '');
    $("#dietopd").css('background', '');

    $('#editadmitPatientButton').addClass('d-none');
    $('#admitPatientButton').removeClass('d-none');

    $('#hideeditadmitpxmodalbtnid').addClass('d-none');
    $('#hideadmitpxmodalbtnid').removeClass('d-none');

    $('#InsertAdmissionButtonForComanagement').removeClass('d-none');
    $('#UpdateAdmissionButtonForComanagement').addClass('d-none');

    $('#showHMOManagementModalButtonForInsertAdmission').removeClass('d-none');
    $('#showHMOManagementModalButtonForUpdateAdmission').addClass('d-none');

    $('#showDiagnosisManagementModalButtonForAdmissionInsert').removeClass('d-none');
    $('#showDiagnosisManagementModalButtonForAdmissionUpdate').addClass('d-none');  

    $('#selectCausesOfConfinementButtonForDeleteAdmAdd').removeClass('d-none');
    $('#selectCausesOfConfinementButtonForDeleteAdmEdt').addClass('d-none');   

    $('#addNewComanageDoctorBtnForAdmAdd').removeClass('d-none');
    $('#addNewComanageDoctorBtnForAdmEdt').addClass('d-none');

    $('#AddHMOForInsertAdmission').removeClass('d-none');
    $('#AddHMOForUpdateAdmission').addClass('d-none');

    $('#inputid_hiddencoman').html("");
    $('#inputid_hiddenhmoin').html("");
    $('#inputid_hiddencause').html("");
    $('#inputid_comanagedataadm').val("");
    $('#inputid_hmoinsurdataadm').val("");
    $('#inputid_causecondataadm').val("");
    $('#inputid_finalcomanagedataadm').val("");
    $('#inputid_finalcomanagedataupd').val("");
    $('#inputid_finalhmoinsurdataadm').val("");
    $('#inputid_finalhmoinsurdataupd').val("");
    $('#inputid_finalcausecondataadm').val("");
    $('#inputid_finalcausecondataupd').val("");
    $('#inputid_vipsecuritydataadm').val("");
    $('#inputid_packagemanadataadm').val("");
    $('#inputid_pckgpatientdataadm').val("");
    $('#hiddeninputid_slcodeadm').val("");
    $('#hiddeninputid_tinadm').val("");
    $('#hiddeninputid_pincodeadm').val("");
    $('#hiddeninputid_pinformatadm').val("");
    $('#hiddeninputid_healrecnoadm').val("");
    $('#hiddeninputid_lastadmitdateadm').val("");
    $('#hiddeninputid_lastadmittimeadm').val("");
    $('#hiddeninputid_lastdischdateadm').val("");
    $('#hiddeninputid_lastdischtimeadm').val("");
    $('#hiddenid_confinement_deleteparameter').val("");
    $('#hiddentextid_deleteparameterforcomanage').val("");

    $('.insertadmitpatientheader').prop('hidden', false);
    $('.updateadmitpatientheader').prop('hidden', true);

    $('#insertadmitpatientformheader').prop('hidden', false);
    $('#updateadmitpatientformheader').prop('hidden', true);

    comanage_table.clear().draw();
    $('#myFormComanageAdmitEdt').empty();
    $('#myFormComanageAdmitAdd').empty();

    hmomanagement_table.clear().draw();
    $('#myFormHMOInsurAdmitEdt').empty();
    $('#myFormHMOInsurAdmitAdd').empty();

    confinecause_table.clear().draw();
    $('#myFormCauseConAdmitEdt').empty();
    $('#myFormCauseConAdmitAdd').empty();    

    totalcredithmo = 0;

    $('#inputid_obgyneprocedureadm').prop('disabled', true);
    $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
    $('#inputid_obgyneprocedureadm').selectpicker('val','Disabled');
    $('#inputid_obgyneprocedureadm').selectpicker('refresh');
    $('#inputid_obgyneprocedureadmerr').html("");

    $('#inputid_adultpediaadm').prop('disabled', true);
    $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
    $('#inputid_adultpediaadm').selectpicker('val','Disabled');
    $('#inputid_adultpediaadm').selectpicker('refresh');
    $('#inputid_adultpediaadmerr').html("");

    if($('#pathologychkboxidadm').is(':checked'))
    {
        $("#pathologychkboxidadm").click();
    }
    $("#pathologychkboxidadm").attr('disabled', true);
    $("#pathologylabelid").html("N/A");

    $("#inputid_othersadm").attr('disabled', true);
    $("#gravidaadm").attr('disabled', true);
    $("#paraadm").attr('disabled', true);
    $("#abortionadm").attr('disabled', true);
    $("#iufdadm").attr('disabled', true);
    $("#diedadm").attr('disabled', true);

    $("#inputid_othersadm").val("N/A");
    $("#gravidaadm").val("N/A");
    $("#paraadm").val("N/A");
    $("#abortionadm").val("N/A");
    $("#iufdadm").val("N/A");
    $("#diedadm").val("N/A");

    $("#inputid_othersadmerr").html("");
    $("#gravidaadmerr").html("");
    $("#paraadmerr").html("");
    $("#abortionadmerr").html("");
    $("#iufdadmerr").html("");
    $("#diedadmerr").html("");

    $('#inputid_creditmaxlimitadm').val("");
    $('#selectid_hospcareinsadm').selectpicker("val", "Select");
    $('#packageoverviewadm').val("");
    $('#admissionreasonadm').val("");
    $('#chckboxid_forminororadm').prop('checked',false);
    $('#textboxid_forminororadm').val(0);
    $('#admittingdiagnosisadm').val("");
    $('#dietaryadm').val("");
}

function collapseProfileCollapseDiv()
{
    $("#profileCollapse").collapse('show');
    $("#contactCollapse").collapse('hide');
    $("#locationCollapse").collapse('hide');
    $("#familyCollapse").collapse('hide');

    $("#prof").css('background', '#168C94');
    $("#cont").css('background', '');
    $("#loca").css('background', '');
    $("#fami").css('background', '');
}

function collapseContactCollapseDiv()
{
    $("#profileCollapse").collapse('hide');
    $("#contactCollapse").collapse('show');
    $("#locationCollapse").collapse('hide');
    $("#familyCollapse").collapse('hide');

    $("#prof").css('background', '');
    $("#cont").css('background', '#168C94');
    $("#loca").css('background', '');
    $("#fami").css('background', '');
}

function collapseLocationCollapseDiv()
{
    $("#profileCollapse").collapse('hide');
    $("#contactCollapse").collapse('hide');
    $("#locationCollapse").collapse('show');
    $("#familyCollapse").collapse('hide');

    $("#prof").css('background', '');
    $("#cont").css('background', '');
    $("#loca").css('background', '#168C94');
    $("#fami").css('background', '');
}

function collapseFamilyCollapseDiv()
{
    $("#profileCollapse").collapse('hide');
    $("#contactCollapse").collapse('hide');
    $("#locationCollapse").collapse('hide');
    $("#familyCollapse").collapse('show');

    $("#prof").css('background', '');
    $("#cont").css('background', '');
    $("#loca").css('background', '');
    $("#fami").css('background', '#168C94');
}

function collapseGuardianCollapseDiv()
{
    $("#guardianCollapse").collapse('show');
    $("#admissionCollapse").collapse('hide');
    $("#attendantCollapse").collapse('hide');
    $("#accomodationCollapse").collapse('hide');

    $("#guar").css('background', '#168C94');
    $("#admi").css('background', '');
    $("#atte").css('background', '');
    $("#acco").css('background', '');
}
function collapseAdmissionCollapseDiv()
{
    $("#guardianCollapse").collapse('hide');
    $("#admissionCollapse").collapse('show');
    $("#attendantCollapse").collapse('hide');
    $("#accomodationCollapse").collapse('hide');

    $("#guar").css('background', '');
    $("#admi").css('background', '#168C94');
    $("#atte").css('background', '');
    $("#acco").css('background', '');
}
function collapseAttendantCollapseDiv()
{
    $("#guardianCollapse").collapse('hide');
    $("#admissionCollapse").collapse('hide');
    $("#attendantCollapse").collapse('show');
    $("#accomodationCollapse").collapse('hide');

    $("#guar").css('background', '');
    $("#admi").css('background', '');
    $("#atte").css('background', '#168C94');
    $("#acco").css('background', '');
}
function collapseAccomodationCollapseDiv()
{
    $("#guardianCollapse").collapse('hide');
    $("#admissionCollapse").collapse('hide');
    $("#attendantCollapse").collapse('hide');
    $("#accomodationCollapse").collapse('show');

    $("#guar").css('background', '');
    $("#admi").css('background', '');
    $("#atte").css('background', '');
    $("#acco").css('background', '#168C94');
}

function collapsePhilhealthandHMOCollapseDiv()
{
    $("#philhealthandHMOCollapse").collapse('show');
    $("#ClassificationCollapse").collapse('hide');
    $("#PackagesandVIPCollapse").collapse('hide');

    $("#phhm").css('background', '#168C94');
    $("#pxcl").css('background', '');
    $("#vipm").css('background', '');
}
function collapseClassificationCollapseDiv()
{
    $("#philhealthandHMOCollapse").collapse('hide');
    $("#ClassificationCollapse").collapse('show');
    $("#PackagesandVIPCollapse").collapse('hide');

    $("#phhm").css('background', '');
    $("#pxcl").css('background', '#168C94');
    $("#vipm").css('background', '');
}
function collapsePackagesandVIPCollapseDiv()
{
    $("#philhealthandHMOCollapse").collapse('hide');
    $("#ClassificationCollapse").collapse('hide');
    $("#PackagesandVIPCollapse").collapse('show');

    $("#phhm").css('background', '');
    $("#pxcl").css('background', '');
    $("#vipm").css('background', '#168C94');
}

function collapseComplaintsCollapseDiv()
{
    $("#ComplaintsIPDCollapse").collapse('show');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('hide');
    $("#ConfinementIPDCollapse").collapse('hide');

    $("#comp").css('background', '#168C94');
    $("#diag").css('background', '');
    $("#diet").css('background', '');
    $("#conf").css('background', '');
}

function collapseComplaintsCollapseDivOPD()
{
    $("#ComplaintsOPDCollapse").collapse('show');
    $("#DiagnosisOPDCollapse").collapse('hide');
    $("#ImpressionOPDCollapse").collapse('hide');

    $("#compopd").css('background', '#168C94');
    $("#diagopd").css('background', '');
    $("#dietopd").css('background', '');
}

function collapseDiagnosisCollapseDiv()
{
    $("#ComplaintsIPDCollapse").collapse('hide');
    $("#DiagnosisIPDCollapse").collapse('show');
    $("#DietaryIPDCollapse").collapse('hide');
    $("#ConfinementIPDCollapse").collapse('hide');

    $("#comp").css('background', '');
    $("#diag").css('background', '#168C94');
    $("#diet").css('background', '');
    $("#conf").css('background', '');
}

function collapseDiagnosisCollapseDivOPD()
{
    $("#ComplaintsOPDCollapse").collapse('hide');
    $("#DiagnosisOPDCollapse").collapse('show');
    $("#ImpressionOPDCollapse").collapse('hide');

    $("#compopd").css('background', '');
    $("#diagopd").css('background', '#168C94');
    $("#dietopd").css('background', '');
}

function collapseDietaryCollapseDiv()
{
    $("#ComplaintsIPDCollapse").collapse('hide');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('show');
    $("#ConfinementIPDCollapse").collapse('hide');

    $("#comp").css('background', '');
    $("#diag").css('background', '');
    $("#diet").css('background', '#168C94');
    $("#conf").css('background', '');
}

function collapseImpressionCollapseDivOPD()
{
    $("#ComplaintsOPDCollapse").collapse('hide');
    $("#DiagnosisOPDCollapse").collapse('hide');
    $("#ImpressionOPDCollapse").collapse('show');

    $("#compopd").css('background', '');
    $("#diagopd").css('background', '');
    $("#dietopd").css('background', '#168C94');
}

function collapseConfinementCollapseDiv()
{
    $("#ComplaintsIPDCollapse").collapse('hide');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('hide');
    $("#ConfinementIPDCollapse").collapse('show');

    $("#comp").css('background', '');
    $("#diag").css('background', '');
    $("#diet").css('background', '');
    $("#conf").css('background', '#168C94');
}

function showBillingCPInfoModal()
{
    $('#billingcpinfomodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#billingcpinfomodal').css('overflow-y', 'scroll');
}

function hideBillingCPInfoModal()
{
    $('#billingcpinfomodal').modal("hide");

    $('#admitpatientmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
}


function showPatientCPInfoModal()
{
    $('#patientcpinfomodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#patientcpinfomodal').css('overflow-y', 'scroll');
}

function hidePatientCPInfoModal()
{
    $('#patientcpinfomodal').modal("hide");

    $('#admitpatientmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
}

function tabsHighlightForAdmission()
{
    $("#patientsidetab").addClass("active");
    $('#patientanchor').click();
    $("#admitliid").css("font-weight","bold");
}

function clickgeneraltab()
{
    $('.nav-tabs a[href="#generalinfo"]').tab('show');
    $('#clickgeneralid').tab('show');
    $('#clickgeneralid').click();
}

function hideShowPatientType()
{
    var patienttype = $("#selectid_patienttypeadm").val();
    
    if(patienttype === "IPD")
    {
        $('#otherinfoopd').addClass('d-none');
        $('#otherinfoipd').removeClass('d-none');
                
        $('#selectid_entrytypeadm').prop('disabled', true);
        $('#selectid_entrytypeadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
        $('#selectid_entrytypeadm').selectpicker('val','Disabled');
        $('#selectid_entrytypeadm').selectpicker('refresh');
        $('#selectid_entrytypeadmerr').html("");

        $("#watchernameadm").prop('disabled', false);
        $("#watchernameadm").val('');
        $("#watchernameadmerr").html("");
        
        $("#watcherbirthadm").prop('disabled', false);
        $("#watcherbirthadm").val('');
        $("#watcherbirthadmerr").html('');
        
        $("#guardiannumadm").prop('disabled', false);
        $("#guardiannumadm").val('');
        $("#guardiannumadmerr").html('');
        
        $("#weightadm").prop('disabled', false);
        $("#weightadm").val('');
        $("#weightadmerr").html('');

        $("#linkaccountadm").prop('disabled', false);
        $("#linkaccountadm").val('');
        $("#linkaccountadmerr").html('');

        $("#billingrecipientadm").prop('disabled', false);
        $("#billingrecipientadm").val('');
        $("#billingcpbtn").prop('disabled', false);
        $("#billingcpspanid").css('background', 'white');
        $("#billingrecipientadmerr").html('');
        
        $("#patientrecipientadm").prop('disabled', false);
        $("#patientrecipientadm").val('');
        $("#pxcprecipientbtn").prop('disabled', false);
        $("#pxcprecipientspanid").css('background', 'white');
        $("#patientrecipientadm").html('');

        $('#reltopatientadm').prop('disabled', false);
        $("#reltopatientadm option[value='Disabled']").remove();
        $('#reltopatientadm').selectpicker('val','Select');
        $('#reltopatientadm').selectpicker('refresh');
        $('#reltopatientadmerr').html('');
        
        $("#inputid_tbdotsstatusadm").prop('disabled', false);
        $("#inputid_tbdotsstatusadm option[value='Disabled']").remove();
        $('#inputid_tbdotsstatusadm').selectpicker('val','Select');
        $('#inputid_tbdotsstatusadm').selectpicker('refresh');
        $('#inputid_tbdotsstatusadmerr').html('');

        $('#cautionsadm').prop('disabled', false);
        $("#cautionsadm option[value='Disabled']").remove();
        $('#cautionsadm').selectpicker('val','Select');
        $('#cautionsadm').selectpicker('refresh');
        $('#cautionsadmerr').html('');
        
        $('#nurseinchargeadm').prop('disabled', false);
        $("#nurseinchargeadm option[value='Disabled']").remove();
        $('#nurseinchargeadm').selectpicker('val','Select');
        $('#nurseinchargeadm').selectpicker('refresh');
        $('#nurseinchargeadmerr').html('');
        
        $('#radioid_normaltypeadm').prop('disabled', false);
        $('#radioid_normaltypeadm').prop('checked', true);
        $('#radioid_emergencytypeadm').prop('disabled', false);
        
        $('#admissiontypehiddentext').val('Normal');
        
        $('#disableforopdindicator').html('');
    }
    else
    {
        $('#otherinfoopd').removeClass('d-none');
        $('#otherinfoipd').addClass('d-none');

        $('#selectid_entrytypeadm').prop('disabled', false);
        $("#selectid_entrytypeadm option[value='Disabled']").remove();
        $('#selectid_entrytypeadm').selectpicker('val','Select');
        $('#selectid_entrytypeadm').selectpicker('refresh');
        $('#selectid_entrytypeadmerr').html("");
        
//        $('#admixontypeselectadm').prop('disabled', false);
//        $("#admixontypeselectadm option[value='Disabled']").remove();
//        $('#admixontypeselectadm').selectpicker('val','Select');
//        $('#admixontypeselectadm').selectpicker('refresh');
//        $('#admixontypeselectadm').html("");
        
        $("#watchernameadm").prop('disabled', true);
        $("#watchernameadm").val('Disabled for OPD type');
        $("#watchernameadmerr").html("");
        
        $("#watcherbirthadm").prop('disabled', true);
        $("#watcherbirthadm").val('Disabled for OPD type');
        $("#watcherbirthadmerr").html("");
        
        $("#guardiannumadm").prop('disabled', true);
        $("#guardiannumadm").val('Disabled for OPD type');
        $("#guardiannumadmerr").html("");
        
        $("#patientrecipientadm").prop('disabled', true);
        $("#patientrecipientadm").val('Disabled for OPD type');
        $("#patientrecipientadmerr").html("");

        $("#linkaccountadm").prop('disabled', true);
        $("#linkaccountadm").val('Disabled for OPD type');
        $("#linkaccountadmerr").html("");
        
        $("#billingrecipientadm").prop('disabled', true);
        $("#billingrecipientadm").val('Disabled for OPD type');
        $("#billingrecipientadmerr").html("");
        
        $("#weightadm").prop('disabled', true);
        $("#weightadm").val('Disabled for OPD type');
        $("#weightadmerr").html("");
        
        $('#reltopatientadm').prop('disabled', true);
        $('#reltopatientadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
        $('#reltopatientadm').selectpicker('val','Disabled');
        $('#reltopatientadm').selectpicker('refresh');
        $('#reltopatientadmerr').html('');
        
        
        $("#inputid_tbdotsstatusadm").prop('disabled', true);
        $('#inputid_tbdotsstatusadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
        $('#inputid_tbdotsstatusadm').selectpicker('val','Disabled');
        $('#inputid_tbdotsstatusadm').selectpicker('refresh');
        $('#inputid_tbdotsstatusadmerr').html('');
        
        $('#cautionsadm').prop('disabled', true);
        $('#cautionsadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
        $('#cautionsadm').selectpicker('val','Disabled');
        $('#cautionsadm').selectpicker('refresh');
        $('#cautionsadmerr').html('');
        
        $('#nurseinchargeadm').prop('disabled', true);
        $('#nurseinchargeadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
        $('#nurseinchargeadm').selectpicker('val','Disabled');
        $('#nurseinchargeadm').selectpicker('refresh');
        $('#nurseinchargeadmerr').html('');
        
        $('#guardianerrcolapseindicator').html('');
        $('#admissionerrcolapseindicator').html('');
        
        var attendant = $("#accomodaerrcolapseindicator").html();
        var accomodat = $("#accomodaerrcolapseindicator").html();
        
        if(attendant === "" && accomodat === "")
        {
            $("#admissionerrtabindicator").html("");
        }

        $("#pxcprecipientbtn").prop('disabled', true);
        $("#pxcprecipientspanid").css('background', '#e3e3e3');
        
        $("#billingcpbtn").prop('disabled', true);
        $("#billingcpspanid").css('background', '#e3e3e3');

        $('#radioid_normaltypeadm').prop('disabled', true);
        $('#radioid_normaltypeadm').prop('checked', false);
        $('#radioid_emergencytypeadm').prop('disabled', true);
        $('#radioid_emergencytypeadm').prop('checked', false);
        
        $('#admissiontypehiddentext').val('');
        
        $('#disableforopdindicator').html('(Disabled for OPD Type)');
    }
}

function hideShowPatientClass()
{
    var patientclass = $("#patientclassadm").val();
    if (patientclass === "GYNECOLOGY")
    {
        $("#inputid_obgyneprocedureadm").prop('disabled', false);
        $("#inputid_obgyneprocedureadm option[value='Disabled']").remove();
        $('#inputid_obgyneprocedureadm').selectpicker('val','Select');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html('');
        
        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val','Disabled');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html("");

        $("#pathologychkboxidadm").removeAttr('disabled');
        $("#pathologylabelid").html("Pathology");
        
        $("#inputid_othersadm").attr('disabled', true);
        $("#inputid_othersadm").val("N/A");
        $('#inputid_othersadmerr').html("");
        
        $("#gravidaadm").removeAttr('disabled');
        $("#paraadm").removeAttr('disabled');
        $("#abortionadm").removeAttr('disabled');
        $("#iufdadm").removeAttr('disabled');
        $("#diedadm").removeAttr('disabled');
        
        $("#gravidaadm").val('');
        $("#paraadm").val('');
        $("#abortionadm").val('');
        $("#iufdadm").val('');
        $("#diedadm").val('');
        
        $("#gravidaadmerr").html('');
        $("#paraadmerr").html('');
        $("#abortionadmerr").html('');
        $("#iufdadmerr").html('');
        $("#diedadmerr").html('');
    }
    else if (patientclass === "MEDICAL")
    {
        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val','Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");
        
        $("#inputid_adultpediaadm").prop('disabled', false);
        $("#inputid_adultpediaadm option[value='Disabled']").remove();
        $('#inputid_adultpediaadm').selectpicker('val','Select');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html('');
        
        if($('#pathologychkboxidadm').is(':checked'))
        {
            $("#pathologychkboxidadm").click();
        }
        $("#pathologychkboxidadm").attr('disabled', true);
        $("#pathologylabelid").html("N/A");
        
        $("#inputid_othersadm").attr('disabled', true);
        $("#inputid_othersadm").val("N/A");
        $("#inputid_othersadmerr").html("");
        
        $("#gravidaadm").attr('disabled', true);
        $("#gravidaadm").val("N/A");
        $("#gravidaadmerr").html("");
        
        $("#paraadm").attr('disabled', true);
        $("#paraadm").val("N/A");
        $("#paraadmerr").html("");
        
        $("#abortionadm").attr('disabled', true);
        $("#abortionadm").val("N/A");
        $("#abortionadmerr").html("");
        
        $("#iufdadm").attr('disabled', true);
        $("#iufdadm").val("N/A");
        $("#iufdadmerr").html("");
        
        $("#diedadm").attr('disabled', true);
        $("#diedadm").val("N/A");
        $("#diedadmerr").html("");
    }
    else if (patientclass === "OBSTETRICS")
    {
        $("#inputid_obgyneprocedureadm").prop('disabled', false);
        $("#inputid_obgyneprocedureadm option[value='Disabled']").remove();
        $('#inputid_obgyneprocedureadm').selectpicker('val','Select');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html('');
        
        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val','Disabled');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html("");
        
        if($('#pathologychkboxidadm').is(':checked'))
        {
            $("#pathologychkboxidadm").click();
        }
        $("#pathologychkboxidadm").attr('disabled', true);
        $("#pathologylabelid").html("N/A");
        
        $("#inputid_othersadm").attr('disabled', true);
        $("#inputid_othersadm").val("N/A");
        $("#inputid_othersadmerr").html("");
        
        $("#gravidaadm").removeAttr('disabled');
        $("#paraadm").removeAttr('disabled');
        $("#abortionadm").removeAttr('disabled');
        $("#iufdadm").removeAttr('disabled');
        $("#diedadm").removeAttr('disabled');
        
        $("#gravidaadm").val('');
        $("#paraadm").val('');
        $("#abortionadm").val('');
        $("#iufdadm").val('');
        $("#diedadm").val('');
        
        $("#gravidaadmerr").html('');
        $("#paraadmerr").html('');
        $("#abortionadmerr").html('');
        $("#iufdadmerr").html('');
        $("#diedadmerr").html('');
    }
    else if (patientclass === "OTHERS")
    {
        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val','Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");
        
        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val','Disabled');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html("");
        
        if($('#pathologychkboxidadm').is(':checked'))
        {
            $("#pathologychkboxidadm").click();
        }
        $("#pathologychkboxidadm").attr('disabled', true);
        $("#pathologylabelid").html("N/A");
        
        $("#inputid_othersadm").removeAttr('disabled');
        $("#inputid_othersadm").val('');
        $("#inputid_othersadmerr").html('');
        
        $("#gravidaadm").attr('disabled', true);
        $("#paraadm").attr('disabled', true);
        $("#abortionadm").attr('disabled', true);
        $("#iufdadm").attr('disabled', true);
        $("#diedadm").attr('disabled', true);
        
        $("#gravidaadm").val("N/A");
        $("#paraadm").val("N/A");
        $("#abortionadm").val("N/A");
        $("#iufdadm").val("N/A");
        $("#diedadm").val("N/A");
        
        $("#gravidaadmerr").html("");
        $("#paraadmerr").html("");
        $("#abortionadmerr").html("");
        $("#iufdadmerr").html("");
        $("#diedadmerr").html("");
    }
    else if (patientclass === "SURGICAL")
    {
        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val','Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");
        
        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val','Disabled');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html("");
        
        $("#pathologychkboxidadm").removeAttr('disabled');
        $("#pathologylabelid").html("Pathology");
        
        $("#inputid_othersadm").attr('disabled', true);
        $("#gravidaadm").attr('disabled', true);
        $("#paraadm").attr('disabled', true);
        $("#abortionadm").attr('disabled', true);
        $("#iufdadm").attr('disabled', true);
        $("#diedadm").attr('disabled', true);
        
        $("#inputid_othersadm").val("N/A");
        $("#gravidaadm").val("N/A");
        $("#paraadm").val("N/A");
        $("#abortionadm").val("N/A");
        $("#iufdadm").val("N/A");
        $("#diedadm").val("N/A");
        
        $("#inputid_othersadmerr").html("");
        $("#gravidaadmerr").html("");
        $("#paraadmerr").html("");
        $("#abortionadmerr").html("");
        $("#iufdadmerr").html("");
        $("#diedadmerr").html("");
    }
    else
    {
        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val','Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");
        
        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val','Disabled');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html("");
        
        if($('#pathologychkboxidadm').is(':checked'))
        {
            $("#pathologychkboxidadm").click();
        }
        $("#pathologychkboxidadm").attr('disabled', true);
        $("#pathologylabelid").html("N/A");

        $("#inputid_othersadm").attr('disabled', true);
        $("#gravidaadm").attr('disabled', true);
        $("#paraadm").attr('disabled', true);
        $("#abortionadm").attr('disabled', true);
        $("#iufdadm").attr('disabled', true);
        $("#diedadm").attr('disabled', true);
        
        $("#inputid_othersadm").val("N/A");
        $("#gravidaadm").val("N/A");
        $("#paraadm").val("N/A");
        $("#abortionadm").val("N/A");
        $("#iufdadm").val("N/A");
        $("#diedadm").val("N/A");
        
        $("#inputid_othersadmerr").html("");
        $("#gravidaadmerr").html("");
        $("#paraadmerr").html("");
        $("#abortionadmerr").html("");
        $("#iufdadmerr").html("");
        $("#diedadmerr").html("");
    }
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

function patientImageUploadForAdmitPatient()
{
    $('#openpatientimguploadforadmpx').trigger('click');
}

//----------------------Membership Section------------------------------------------
function getAllMembershipDataAndAddItToTheTable()
{
    membership_table = $('#membership-masterlist-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "70%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        ajax:
                {
                    url: BASE_URL + 'Membership/DisplayMembership',
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

function hideSearchMembershipModalForAdmission()
{
    $('#searchmembershipmodal').modal("hide");

    $('#admitpatientmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function showSearchMembershipModalForAdmission()
{
    $('#searchmembershipmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#searchmembershipmodal').css('overflow-y', 'scroll');

    $('#membership-masterlist-div').removeClass('d-none');
    $('#membershipmodalfooter').removeClass('d-none');
    $('#addmembershipbuttondiv').removeClass('d-none');
    $('#membershiptitleheader').addClass('d-none');
    $('#addmembership').addClass('d-none');

    var memberlastname = $("#lastnameadm").val();
    var memberfrstname = $("#firstnameadm").val();
    var memberfullname = memberlastname + ", " + memberfrstname;

    membership_table.ajax.reload();
    $('#membership-masterlist-table_filter [type="search"]').val(memberfullname);
    $('#membership-masterlist-table_filter [type="search"]').focus();
    membership_table.search(memberfullname).draw();

    membership_table.on('dblclick', 'tr', function ()
    {
        var data = membership_table.row(this).data();
        var memberRefno = data[2];
        $("#inputid_vmembershipadm").val(memberRefno.toUpperCase());
        hideSearchMembershipModalForAdmission();
    });
}

function selectMembership()
{
    var data;

    $('#membership-masterlist-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } else
        {
            $('#membership-masterlist-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#membership-masterlist-table').DataTable().row('.bg-blue').data();
            selectedMembership = data;
        }
    });
}

function selectMembershipForAdmitPatient()
{
    var memberRefno = selectedMembership[2];
    $("#inputid_vmembershipadm").val(memberRefno.toUpperCase());
    hideSearchMembershipModalForAdmission();
}

function showAddMembershipForm()
{
    $('#addmembership').removeClass('d-none');
    $('#membershiptitleheader').removeClass('d-none');

    $('#membership-masterlist-div').addClass('d-none');
    $('#membershipmodalfooter').addClass('d-none');
    $('#addmembershipbuttondiv').addClass('d-none');
}

function hideAddMembershipForm()
{
    $('#addmembership').addClass('d-none');
    $('#membershiptitleheader').addClass('d-none');

    $('#membership-masterlist-div').removeClass('d-none');
    $('#membershipmodalfooter').removeClass('d-none');
    $('#addmembershipbuttondiv').removeClass('d-none');
}

function addNewMembership()
{
    var cancelledbool = false;

    if ($('#cancelled').is(":checked"))
    {
        cancelledbool = true;
    } else
    {
        cancelledbool = false;
    }

    var fullnamemem = $('#fullnamemembr').val();
    var gendermemb = $('#gendermembr').val();
    var birthmemb = $('#birthmembr').val();
    var mobilememb = $('#mobilemembr').val();
    var mailaddmemb = $('#mailaddmembr').val();
    var citymunmemb = $('#citymunmembr').val();
    var opdrefmemb = $('#opdrefmembr').val();
    var pinnummemb = $('#pinnummembr').val();
    var memidmemb = $('#memidmembr').val();
    var tinnummemb = $('#tinnummembr').val();
    var transtomemb = $('#transtomembr').val();

    $.ajax
            ({
                type: 'POST',
                data:
                        {
                            fullnamemem: fullnamemem,
                            gendermemb: gendermemb,
                            birthmemb: birthmemb,
                            mobilememb: mobilememb,
                            mailaddmemb: mailaddmemb,
                            citymunmemb: citymunmemb,
                            opdrefmemb: opdrefmemb,
                            pinnummemb: pinnummemb,
                            memidmemb: memidmemb,
                            tinnummemb: tinnummemb,
                            transtomemb: transtomemb,
                            cancelacct: cancelledbool
                        },
                dataType: 'json',
                url: BASE_URL + 'Admission/AddNewMember'

            })

            .done(function (result)
            {
                if (result.status == false)
                {
                    checkFieldValidations(result.errors.fullnamememget, 'fullnamememberror', 'fullnamemembr');
                    checkFieldValidations(result.errors.gendermembget, 'gendermemberror', 'gendermembr');
                    checkFieldValidations(result.errors.birthmembget, 'birthmemberror', 'birthmemb');
                    checkFieldValidations(result.errors.mobilemembget, 'mobilememberror', 'mobilemembr');
                    checkFieldValidations(result.errors.mailaddmembget, 'mailaddmemberror', 'mailaddmembr');
                    checkFieldValidations(result.errors.citymunmembget, 'citymunmemberror', 'citymunmembr');
                    checkFieldValidations(result.errors.opdrefmembget, 'opdrefmemberror', 'opdrefmembr');
                    checkFieldValidations(result.errors.pinnummembget, 'pinnummemberror', 'pinnummembr');
                    checkFieldValidations(result.errors.memidmembget, 'memidmemberror', 'memidmembr');
                    checkFieldValidations(result.errors.tinnummembget, 'tinnummemberror', 'tinnummembr');
                    checkFieldValidations(result.errors.transtomembget, 'transtomemberror', 'transtomembr');
                } else
                {
                    hideAddMembershipForm();

                    swal
                            ({
                                title: "Success!",
                                text: "Record is successfully saved!",
                                type: "success",
                                allowOutsideClick: false
                            });

                    membership_table.ajax.reload();
                    $('#membership-masterlist-table_filter [type="search"]').val(fullnamemem);
                    $('#membership-masterlist-table_filter [type="search"]').focus();
                    membership_table.search(fullnamemem).draw();

                    membership_table.on('dblclick', 'tr', function ()
                    {
                        var data = membership_table.row(this).data();
                        $('#inputid_vmembershipadm').val(data[2] + "-" + data[1]);
                        hideSearchMembershipModalForAdmission();
                    });
                }
            });
}

//----------------------Doctors Section------------------------------------------
function showSearchDoctorModalForAdmission()
{
    $('#searchdoctormodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#searchdoctormodal').css('overflow-y', 'scroll');
}

function hideSearchDoctorModalForAdmission()
{
    $('#searchdoctormodal').modal("hide");

    $('#admitpatientmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function getAllDoctorsAndAddItToTheTable()
{
    var doctors_table = $('#doctors-masterlist2-table').DataTable({

        sScrollY: "200px",
        sScrollX: "70%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
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

    doctors_table.on('dblclick', 'tr', function ()
    {
        var data = doctors_table.row(this).data();
        var doctordata = data[2] + ", " + data[1] + " " + data[3] + " - " + data[15];
//        alert(doctordata);
        $('#attendingdoctoradm').val(doctordata.toUpperCase());
        hideSearchDoctorModalForAdmission();
    });
}

function showAddDoctorsModal()
{
    $('#adddoctorsmodal').modal({
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

function hideDoctorsModal() {
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
                success: function (result) {
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
                    } else
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
                                                    doctors_table.DataTable().ajax.reload();
                                                }
                                            });
                        }, 1000);
                    }
                }
            });
}

function editDoctors(docCode)
{
    $.ajax({

        type: 'POST',
        data: {docCode: docCode},
        url: BASE_URL + 'Doctors/SearchSelectedDoctors',
        dataType: 'json'
    }).done(function (result) {

        showAddDoctorsModal(); //Show the modal form


        $('#savebutton').addClass('d-none');
        $('#updatebutton').removeClass('d-none');

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

                } else
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

function deleteDoctors(docCode) {

    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the selected record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }, function () {
        $.ajax({

            type: 'POST',
            data: {docCode: docCode},
            url: BASE_URL + 'Doctors/DeleteDoctors',
            dataType: 'json'
        }).done(function (result) {
            if (result == false) {
                swal("Error!", "Record was not deleted", "error");
            } else
            {
                swal
                        ({
                            title: "Success!",
                            text: "Record is successfully deleted!",
                            type: "success",
                            allowOutsideClick: false
                        });
                doctors_table.DataTable().ajax.reload();
            }
        });
    });



}

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

function uploadDoctorImage() {

    if ($('#opendoctorimgupload').val() == '') {

        alert('Empty');

    } else {
        var doctorImage = $('#opendoctorimgupload').prop('files')[0];
        var extension = doctorImage.name.substr((doctorImage.name.lastIndexOf('.') + 1));


        var form_data = new FormData();
        form_data.append("file", doctorImage, $('#doccode').val() + 'd.' + extension);

        $.ajax({
            type: 'POST',
            url: BASE_URL + "Uploads/UploadDoctorImage",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json'
        }).done(function (data) {

            uploadClinicImage();
        });
    }

}

function uploadClinicImage()
{
    if ($('#openclinicimgupload').val() == '')
    {
        alert('Empty');
    } else
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
//                                        location.reload();
                });
        });
    }
}

function selectDoctor()
{
    var data;

    $('#doctors-masterlist2-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } else
        {
            $('#doctors-masterlist2-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#doctors-masterlist2-table').DataTable().row('.bg-blue').data();
            selectedDoctor = data;
        }
    });
}

function selectDoctorForAdmitPatient()
{
    var doctordata = selectedDoctor[2] + ", " + selectedDoctor[1] + " " + selectedDoctor[3] + " - " + selectedDoctor[15];
    $('#attendingdoctoradm').val(doctordata.toUpperCase());
    hideSearchDoctorModalForAdmission();
}

//----------------------Co-Management Section------------------------------------------
function showCoManagementModalForInsertAdmission()
{
    $('#comanagementmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#comanagementmodal').css('overflow-y', 'scroll');

    $('#comanagementform').addClass('d-none');
    $('#comanagetablediv').removeClass('d-none');
    $('#comanagereturnbtn').removeClass('d-none');
    $('#comanagebuttondiv').removeClass('d-none');
    
    var accountnum = $("#accountnumberadm").val();
    var patientype = $("#selectid_patienttypeadm").val();
    var pxlastname = $("#lastnameadm").val();
    var pxfrstname = $("#firstnameadm").val();
    var pxmidlname = $("#middlenameadm").val();
    var pxsuffname = $("#suffixadm").val();
    var pincodenum = $("#hiddeninputid_pincodeadm").val();
    var pccodexnum = $("#hiddeninputid_pccodexadm").val();
    var casecodeno = $("#hiddeninputid_casecodexadm").val();
    var pxfullname = pxlastname + ", " + pxfrstname + " " + pxmidlname + " " + pxsuffname;

    $("#hiddentextid_pincodexcomanage").val(pincodenum);
    $('#hiddentextid_pccodexcomanage').val(pccodexnum);
    $("#hiddentextid_casecodexcomanage").val(casecodeno);
    $('#inputid_pxnamexcomanagement').val(pxfullname);
    $('#inputid_accntnocomanagement').val(accountnum);
    $('#inputid_pxtypexcomanagement').val(patientype);
}

function hideCoManagementModal()
{
    $('#comanagementmodal').modal("hide");

    $('#admitpatientmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function addNewComanageDoctorForAdmAdd()
{
    var error = 0;
    var duplicate = 0;
    var doctrfield = $("#inputid_docmancomanagement").val();
    var doctrarray = doctrfield.split("-");
    var doctorname = doctrarray[0];
    var doctorcode = doctrarray[1];
    var typeofmana = $("#inputid_typmancomanagement").val();
    var startofser = $("#inputid_startcomanagement").val();
    var curentdate = $("#hiddentextid_datenow").val();
    var accountnum = $("#accountnumberadm").val();
    var patientype = $("#selectid_patienttypeadm").val();
    var pincodenum = $("#hiddeninputid_pincodeadm").val();
    var textboxidtbl = doctorcode + accountnum + counterfortble;
    var casecodeno = $("#hiddentextid_casecodexcomanage").val();

    $("#hiddentextid_deleteparameterforcomanage").val(patientype + "," + accountnum + "," + pincodenum + "," + doctorcode + "," + typeofmana + "," + startofser + "," + casecodeno);

    if (doctrfield === "Select")
    {
        $("#docmancomanagementerr").text("Required Field!");
        error++;
    } else
    {
        $("#docmancomanagementerr").text("");
    }

    if (typeofmana === "Select")
    {
        $("#typmancomanagementerr").text("Required Field!");
        error++;
    } else
    {
        $("#typmancomanagementerr").text("");
    }

    if (startofser === "")
    {
        $("#startcomanagementerr").text("Required Field!");
        error++;
    } else
    {
        $("#startcomanagementerr").text("");
    }
    
    $("#comanagement-masterlist-table tbody tr").each(function()
    {
        var docname_col = $(this).find("td:nth-child(3)").html();
        
        if(doctorname === docname_col)
        {
            duplicate++;
            error++;
        }
        
        if(duplicate > 0 )
        {
            $("#docmancomanagementdup").text("Already Exist!");
        }
        else
        {
            $("#docmancomanagementdup").text("");
        }
    });

    if (error > 0)
    {
        swal
        ({
            title: "Validation Notice!",
            text: "Some field requires your attention!!",
            type: "warning",
            allowOutsideClick: false
        });
    }
    else
    {
        swal
        ({
            title: "Success!",
            text: "Record is successfully saved!",
            type: "success",
            allowOutsideClick: false
        });

        $('#comanagementform').addClass('d-none');
        $('#comanagetablediv').removeClass('d-none');
        $('#comanagereturnbtn').removeClass('d-none');
        $('#comanagebuttondiv').removeClass('d-none');
        
        $("#inputid_docmancomanagement").selectpicker("val", "Select");
        $("#inputid_typmancomanagement").selectpicker("val", "Select");
        $("#inputid_startcomanagement").val("");

        comanage_table = $('#comanagement-masterlist-table').DataTable();
        comanage_table.row.add
        ([
            "<button class='btn btn-sm btn-danger waves-effect btn-adm-add' title='Remove from list' style='margin-left:15px'><i class='zmdi zmdi-delete'></i></button>",
            typeofmana,
            doctorname,
            startofser,
            "no",
            curentdate,
            doctorcode,
            textboxidtbl
        ]).draw(false);
        
        var comaalldata = doctorname + "|" +
                          doctorcode + "|" +
                          typeofmana + "|" +
                          startofser + "|" +
                          textboxidtbl;
                          
        
        counterfortble++;
        textBoxCreate(comaalldata);
    }
}

function getdoctorscomanagement() 
{
    comanage_table = $('#comanagement-masterlist-table').DataTable
    ({
        sScrollY: "150px",
        sScrollX: "70%",
        responsive: true,
        processing: true,
        searching: true,
        createdRow: function (row, data, dataIndex) {

        },
        initComplete: function (settings, json) {

        }
    });
}

function showComanageDoctorForm()
{
    $('#comanagementform').removeClass('d-none');
    $('#comanagetablediv').addClass('d-none');
    $('#comanagereturnbtn').addClass('d-none');
    $('#comanagebuttondiv').addClass('d-none');
}

function HideComanageDoctorForm()
{
    $('#comanagementform').addClass('d-none');
    $('#comanagetablediv').removeClass('d-none');
    $('#comanagereturnbtn').removeClass('d-none');
    $('#comanagebuttondiv').removeClass('d-none');
}

function textBoxCreate(comaalldata)
{
    var comasplit = comaalldata.split('|');
    var docname = comasplit[0];
    var doccode = comasplit[1];
    var typeman = comasplit[2];
    var startco = comasplit[3];
    var textboxidtbl = comasplit[4];

    var x = document.createElement("INPUT");
    x.setAttribute("type", "hidden");
    x.setAttribute("id", textboxidtbl);
    x.setAttribute("name", "docname_comanage" + counterfortext);
    x.setAttribute("class", "docname_comanage" + counterfortext);
    x.setAttribute("value", docname);
    document.getElementById("myFormComanageAdmitAdd").appendChild(x);
    
    var y = document.createElement("INPUT");
    y.setAttribute("type", "hidden");
    y.setAttribute("id", textboxidtbl);
    y.setAttribute("name", "doccode_comanage" + counterfortext);
    y.setAttribute("class", "doccode_comanage" + counterfortext);
    y.setAttribute("value", doccode);
    document.getElementById("myFormComanageAdmitAdd").appendChild(y);
    
    var z = document.createElement("INPUT");
    z.setAttribute("type", "hidden");
    z.setAttribute("id", textboxidtbl);
    z.setAttribute("name", "typeman_comanage" + counterfortext);
    z.setAttribute("class", "typeman_comanage" + counterfortext);
    z.setAttribute("value", typeman);
    document.getElementById("myFormComanageAdmitAdd").appendChild(z);
    
    var a = document.createElement("INPUT");
    a.setAttribute("type", "hidden");
    a.setAttribute("id", textboxidtbl);
    a.setAttribute("name", "startco_comanage" + counterfortext);
    a.setAttribute("class", "startco_comanage" + counterfortext);
    a.setAttribute("value", startco);
    document.getElementById("myFormComanageAdmitAdd").appendChild(a);
    
    counterfortext++; 
}

//----------------------Nurses Section------------------------------------------
function showSearchNurseModalForAdmission()
{
    $('#searchnursemodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#searchnursemodal').css('overflow-y', 'scroll');
}

function hideSearchNurseModalForAdmission()
{
    $('#searchnursemodal').modal("hide");

    $('#admitpatientmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function getAllNursesAndAddItToTheTable()
{
    var nurses_table = $('#nurses-masterlist2-table').DataTable({

        sScrollY: "190px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
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

    nurses_table.on('dblclick', 'tr', function ()
    {
        var data = nurses_table.row(this).data();
        var nursedata = data[2] + ", " + data[3] + " " + data[4] + " - " + data[1];
        $('#attendingnurseadm').val(nursedata.toUpperCase());
        hideSearchNurseModalForAdmission();
    });
}

function addNurses()
{
    var allowIsChecked = false;
    if ($('#allowadmission').is(":checked"))
    {
        allowIsChecked = true;
    } else
    {
        allowIsChecked = false;
    }

    var allowAdmission;
    if (allowIsChecked == true)
    {
        allowAdmission = 1;
    } else
    {
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
//                    location.reload();
                });

            }
        }
    });
}

function editNurses(code)
{
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

                //Add all the result values to the specified form
                $('#doccd').val(result[0].doccd);
                $('#lastname').val(result[0].doclname);
                $('#firstname').val(result[0].docfname);
                $('#hospcode').val(result[0].doccode);
                $('#address').val(result[0].adrs);
                $('#licensenumber').val(result[0].PTR);
                $('#proftype').val(result[0].proftype);
            });
}

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
//                        location.reload();
                    });

                }
            }
        });
    });
}

function deleteNurses(code)
{
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
            });
            $('#nurses-masterlist2-table').DataTable().ajax.reload();
        });
    });
}

function generateNursesCode()
{
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Nurses/GenerateNursesCode'
    })

            .done(function (result)
            {
                var docCode = result[0].doccode;
                var splitDoccode = docCode.split('N');
                var convertDocCodeToInt = parseInt(splitDoccode[1]);
                var incrementDocCode = convertDocCodeToInt + 1;

                $('#hospcode').val('PFRN' + incrementDocCode);
            });
}

function clearAllNursesFields()
{
    $('#firstname').val('');
    $('#lastname').val('');
    $('#hospcode').val('');
    $('#address').val('');
    $('#licensenumber').val('');
    $('#savebutton').removeClass('d-none');
    $('#updatebutton').addClass('d-none');
    generateNursesCode();
}

function showAddNursesModal()
{
    $('#addnursesmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#searchnursemodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#addnursesmodal').css('overflow-y', 'scroll');
}

function hideAddNursesModal() {
    $('#addnursesmodal').modal('hide');
    clearAllNursesFields();

    $('#searchnursemodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
}

function selectNurse()
{
    var data;

    $('#nurses-masterlist2-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } else
        {
            $('#nurses-masterlist2-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#nurses-masterlist2-table').DataTable().row('.bg-blue').data();
            selectedNurse = data;
        }
    });
}

function selectNurseForAdmitPatient()
{
    var nursedata = selectedNurse[2] + ", " + selectedNurse[3] + " " + selectedNurse[4] + " - " + selectedNurse[1];
    $('#attendingnurseadm').val(nursedata.toUpperCase());
    hideSearchNurseModalForAdmission();
}

//----------------------Rooms Section------------------------------------------
function getAllRoomsAndAddItToTheTable()
{
    rooms_table = $('#rooms-masterlist2-table').DataTable
            ({
                sScrollY: "200px",
                sScrollX: "100%",
                responsive: true,
                processing: true,
                serverSide: true,
                searching: true,
                order: [],
                ajax:
                        {
                            url: BASE_URL + 'Rooms/DisplayRooms',
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

function addRooms()
{
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

                hideAddRoomsModal();

                swal
                        ({
                            title: "Success!",
                            text: "Record is successfully saved!",
                            type: "success",
                            allowOutsideClick: false
                        });

                rooms_table.ajax.reload();
                $('#rooms-masterlist2-table_filter [type="search"]').val(roomsName);
                $('#rooms-masterlist2-table_filter [type="search"]').focus();
                rooms_table.search(roomsName).draw();

                rooms_table.on('dblclick', 'tr', function ()
                {
                    var data = rooms_table.row(this).data();
                    var roomdata1 = data[3] + ":" + data[4] + ":" + data[5] + ":" + data[6];
                    var roomdata2 = data[1] + ":" + data[2] + ":" + data[3] + ":" + data[4] + ":" +
                            data[5] + ":" + data[6] + ":" + data[7] + ":" + data[8] + ":" +
                            data[9] + ":" + data[10] + ":" + data[11];

                    $('#selectid_roomadm').val(roomdata1.toUpperCase());
                    $('#selectid_roomadmhid').val(roomdata2.toUpperCase());
                    $("#inputid_roomrateadm").val(data[7]);
                    $("#inputid_ancilaryadm").val(data[8]);
                    $("#inputid_roominfoadm").val(data[6]);
                    $("#inputid_roomcredadm").val(data[10]);

                    hideSearchRoomModalForAdmission();
                });
            }
        }
    });
}

function editRooms(code)
{
    $.ajax({

        type: 'POST',
        data: {code: code},
        url: BASE_URL + 'Rooms/SearchSelectedRooms',
        dataType: 'json'
    }).done(function (result) {
        showAddRoomsModal(); //Show the modal form
        $('#savebutton').addClass('d-none');
        $('#updatebutton').removeClass('d-none');

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
//                        location.reload();
                    });

                }
            }
        });
    });
}

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
//                location.reload();
            });
        });

    });
}

function generateRoomsCode()
{
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

function showAddRoomsModal()
{
    $('#addroomsmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#searchroommodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#addroomsmodal').css('overflow-y', 'scroll');
}

function hideAddRoomsModal()
{
    $('#addroomsmodal').modal('hide');
    clearAllRoomsFields();

    $('#searchroommodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
}

function selectRoom()
{
    var data;

    $('#rooms-masterlist2-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } else
        {
            $('#rooms-masterlist2-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#rooms-masterlist2-table').DataTable().row('.bg-blue').data();
            selectedRoom = data;
        }
    });
}

function selectRoomForAdmitPatient()
{
    var roomdata = selectedRoom[3] + ":" + selectedRoom[4] + ":" + selectedRoom[5] + ":" + selectedRoom[6];
    var roomdata2 = selectedRoom[1] + ":" + selectedRoom[2] + ":" + selectedRoom[3] + ":" + selectedRoom[4] + ":" +
            selectedRoom[5] + ":" + selectedRoom[6] + ":" + selectedRoom[7] + ":" + selectedRoom[8] + ":" +
            selectedRoom[9] + ":" + selectedRoom[10] + ":" + selectedRoom[11];

    $('#selectid_roomadm').val(roomdata.toUpperCase());
    $('#selectid_roomadmhid').val(roomdata2.toUpperCase());
    $("#inputid_roomrateadm").val(selectedRoom[7]);
    $("#inputid_ancilaryadm").val(selectedRoom[8]);
    $("#inputid_roominfoadm").val(selectedRoom[6]);
    $("#inputid_roomcredadm").val(selectedRoom[10]);
    $("#inputid_creditmaxlimitadm").val(selectedRoom[10]);

    hideSearchRoomModalForAdmission();
}

function showSearchRoomModalForAdmission()
{
    $('#searchroommodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#searchroommodal').css('overflow-y', 'scroll');

    rooms_table.on('dblclick', 'tr', function ()
    {
        var data = rooms_table.row(this).data();
        var roomdata1 = data[3] + ":" + data[4] + ":" + data[5] + ":" + data[6];
        var roomdata2 = data[1] + ":" + data[2] + ":" + data[3] + ":" + data[4] + ":" +
                data[5] + ":" + data[6] + ":" + data[7] + ":" + data[8] + ":" +
                data[9] + ":" + data[10] + ":" + data[11];

        $('#selectid_roomadm').val(roomdata1.toUpperCase());
        $('#selectid_roomadmhid').val(roomdata2.toUpperCase());
        $("#inputid_roomrateadm").val(data[7]);
        $("#inputid_ancilaryadm").val(data[8]);
        $("#inputid_roominfoadm").val(data[6]);
        $("#inputid_roomcredadm").val(data[10]);
        $("#inputid_creditmaxlimitadm").val(data[10]);

        hideSearchRoomModalForAdmission();
    });
}

function hideSearchRoomModalForAdmission()
{
    $('#searchroommodal').modal("hide");

    $('#admitpatientmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
}

//----------------------Security Management Section------------------------------------------
function showSecurityManagementModalForAdmission()
{
    $('#vipmanagementmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#vipmanagementmodal').css('overflow-y', 'scroll');

    var accountnum = $("#accountnumberadm").val();
    var casecodeno = $("#hiddeninputid_casecodexadm").val();

    var pxlastname = $("#lastnameadm").val();
    var pxfrstname = $("#firstnameadm").val();
    var pxmidlname = $("#middlenameadm").val();
    var pxsuffname = $("#suffixadm").val();
    var pxfullname = pxlastname + ", " + pxfrstname + " " + pxmidlname + " " + pxsuffname;

    $('#inputid_pxnamexvipmanagement').val(pxfullname);
    $('#inputid_casecodevipmanagement').val(casecodeno);
    $('#inputid_accntnovipmanagement').val(accountnum);
}

function hideSecurityManagementModalForAdmission()
{
    $('#vipmanagementmodal').modal("hide");

    $('#admitpatientmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    clearAllVIPModalField();
}

function clearAllVIPModalField()
{
//    $('#selectid_oicinchargevipmanagement').selectpicker('val', "Select From List");
//    $('#txtareaid_remarksvipmanagement').val("");
//    $('#radio_vip').prop('checked', true);
}

function addNewVIPForAdmissionInsert()
{
    var casecode = $('#inputid_casecodevipmanagement').val();
    var casenumb = $('#inputid_accntnovipmanagement').val();

    if ($("#radio_vip").is(":checked"))
    {
        var vipvalue = 1;
        var secvalue = 0;
        var nonvalue = 0;
    } 
    else if ($("#radio_sec").is(":checked"))
    {
        var vipvalue = 0;
        var secvalue = 1;
        var nonvalue = 0;
    } 
    else
    {
        var vipvalue = 0;
        var secvalue = 0;
        var nonvalue = 1;
    }

    var remarks = $('#txtareaid_remarksvipmanagement').val();
    var pxnamex = $('#inputid_pxnamexvipmanagement').val();

    var oicincharval = $('#selectid_oicinchargevipmanagement').val();
    var oicinchararr = oicincharval.split("-");
    var oicnamex = oicinchararr[0];
    var oiccodex = oicinchararr[1];

    var updatedby = $('#hiddenid_updatedbyvipmanagement').val();
    var station = $('#hiddenid_stationnamevipmanagement').val();
    var confirmed = 0;

    if(nonvalue === 1)
    {
        swal
        ({
            title: "No Restriction?",
            text: "VIP Management form will exit now!",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "OK! Proceed!"
        },
        function (isConfirm)
        {
            if (isConfirm)
            {
                $("#inputid_vipsecuritydataadm").val("");
                hideSecurityManagementModalForAdmission();
            }
        });
    }
    else
    {   
        var error = 0;

        if (oicincharval === "Select From List")
        {
            $("#oicinchargeviperr").text("Required Field!");
            error++;
        }
        else
        {
            $("#oicinchargeviperr").text("");
        }

        if (remarks == "")
        {
            $("#remarksviperr").text("Required Field!");
            error++;
        }
        else
        {
            $("#remarksviperr").text("");
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
        }
        else
        {
            var vipalldata = casecode + "|" + 
                             casenumb + "|" + 
                             vipvalue + "|" +
                             secvalue + "|" + 
                             remarks + "|" + 
                             pxnamex + "|" +
                             oicnamex + "|" + 
                             oiccodex + "|" + 
                             updatedby + "|" +
                             station + "|" + 
                             confirmed;

            $("#inputid_vipsecuritydataadm").val(vipalldata);

            hideSecurityManagementModalForAdmission();

            swal
            ({
                title: "Success!",
                text: "Record is successfully submitted!",
                type: "success",
                allowOutsideClick: false
            });
        }
    }
}

//----------------------Diagnosis Management Section------------------------------------------
function showDiagnosisManagementModalForAdmissionInsert()
{
    $('#searchdiagnosismodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#searchdiagnosismodal').css('overflow-y', 'scroll');

    $("#diagnosis-masterlist-div").removeClass('d-none');
    $("#diagnosismodalfooter").removeClass('d-none');
}

function hideDiagnosisManagementModalForAdmission()
{
    $('#searchdiagnosismodal').modal("hide");

    $('#admitpatientmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function showDiagnosisForm()
{
    $('#diagnosis-button').addClass('d-none');
    $('#diagnosis-form').removeClass('d-none');
    $('#diagnosis-table').addClass('d-none');
    $('#diagnosis-footer').addClass('d-none');
    
    $('#adddiagnosis_button').removeClass('d-none');
    $('#edtdiagnosis_button').addClass('d-none');
}

function hideDiagnosisForm()
{
    $('#diagnosis-button').removeClass('d-none');
    $('#diagnosis-form').addClass('d-none');
    $('#diagnosis-table').removeClass('d-none');
    $('#diagnosis-footer').removeClass('d-none');
    
    clearalldiagnosisfield();
}

function getAllDiagnosisAndAddItToTheTable()
{
    diagnosis_table = $('#diagnosis-masterlist-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        ajax:
                {
                    url: BASE_URL + 'Diagnosis/DisplayDiagnosis',
                    type: 'POST'
                },

        createdRow: function (row, data, dataIndex)
        {

        },

        initComplete: function (settings, json)
        {

        }
    });

    diagnosis_table.on('dblclick', 'tr', function ()
    {
        var data = diagnosis_table.row(this).data();
        var category = data[1];
        var icddiag = data[2];
        var group = data[3];
        var refno = data[4];

        var date = moment();
        var datecode = date.format("MMDDYYYYhhmmss");
        var datesplit = datecode.split("");
        var shuffledate = shuffle(datesplit);
        var finalformat = shuffledate.join('');
        var causescode = finalformat + "CATGADMT";
        var textboxidtblcausesadd = causescode + "-" + counterfortblecauses;

        confinecause_table = $('#causesof-confinement-table').DataTable();
        confinecause_table.row.add
        ([
            category,
            icddiag,
            group,
            refno,
            causescode,
            textboxidtblcausesadd,
            counterfortblecauses
        ]).order([6,'asc']).draw(false);

        hideDiagnosisManagementModalForAdmission();

        swal
        ({
            title: "Success!",
            text: "Record is successfully stored!",
            type: "success",
            allowOutsideClick: false
        });

        counterfortblecauses++;
        var causesalldata = category + "|" + icddiag + "|" + group + "|" + refno + "|" + causescode + "|" + textboxidtblcausesadd;    
        textBoxCreateForCauses(causesalldata);
    });
}

function selectDiagnosis()
{
    var data;

    $('#diagnosis-masterlist-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        }
        else
        {
            $('#diagnosis-masterlist-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#diagnosis-masterlist-table').DataTable().row('.bg-blue').data();
            selectedDiagnosis = data;
        }
    });
}

function selectDiagnosisForAdmitPatient()
{
    var category = selectedDiagnosis[1];
    var icddiag = selectedDiagnosis[2];
    var group = selectedDiagnosis[3];
    var refno = selectedDiagnosis[4];

    var date = moment();
    var datecode = date.format("MMDDYYYYhhmmss");
    var datesplit = datecode.split("");
    var shuffledate = shuffle(datesplit);
    var finalformat = shuffledate.join('');
    var causescode = finalformat + "CATGADMT";
    var textboxidtblcauses = causescode + "-" + counterfortblecauses;
    
    confinecause_table = $('#causesof-confinement-table').DataTable();
    confinecause_table.row.add
    ([
        category,
        icddiag,
        group,
        refno,
        causescode,
        textboxidtblcauses,
        counterfortblecauses
    ]).order([6,'asc']).draw(false);

    hideDiagnosisManagementModalForAdmission();

    swal
    ({
        title: "Success!",
        text: "Record is successfully stored!",
        type: "success",
        allowOutsideClick: false
    });

    counterfortblecauses++;
    var causesalldata = category + "|" + icddiag + "|" + group + "|" + refno + "|" + causescode + "|" + textboxidtblcauses;    
    textBoxCreateForCauses(causesalldata);
}

function textBoxCreateForCauses(causesalldata)
{
    var causessplit = causesalldata.split("|");
    var category = causessplit[0]; 
    var icddiag = causessplit[1]; 
    var group = causessplit[2]; 
    var refno = causessplit[3]; 
    var causescode = causessplit[4];
    var textboxidtblcauses = causessplit[5]; 
       
    var category_input = document.createElement("INPUT");
    category_input.setAttribute("type", "hidden");
    category_input.setAttribute("id", textboxidtblcauses);
    category_input.setAttribute("name", "category_causes" + counterfortextcauses);
    category_input.setAttribute("class", "category_causes" + counterfortextcauses);
    category_input.setAttribute("value", category);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(category_input);
    
    var icddiag_input = document.createElement("INPUT");
    icddiag_input.setAttribute("type", "hidden");
    icddiag_input.setAttribute("id", textboxidtblcauses);
    icddiag_input.setAttribute("name", "icddiag_causes" + counterfortextcauses);
    icddiag_input.setAttribute("class", "icddiag_causes" + counterfortextcauses);
    icddiag_input.setAttribute("value", icddiag);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(icddiag_input);
    
    var group_input = document.createElement("INPUT");
    group_input.setAttribute("type", "hidden");
    group_input.setAttribute("id", textboxidtblcauses);
    group_input.setAttribute("name", "group_causes" + counterfortextcauses);
    group_input.setAttribute("class", "group_causes" + counterfortextcauses);
    group_input.setAttribute("value", group);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(group_input);
    
    var refno_input = document.createElement("INPUT");
    refno_input.setAttribute("type", "hidden");
    refno_input.setAttribute("id", textboxidtblcauses);
    refno_input.setAttribute("name", "refno_causes" + counterfortextcauses);
    refno_input.setAttribute("class", "refno_causes" + counterfortextcauses);
    refno_input.setAttribute("value", refno);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(refno_input);
    
    var causescode_input = document.createElement("INPUT");
    causescode_input.setAttribute("type", "hidden");
    causescode_input.setAttribute("id", textboxidtblcauses);
    causescode_input.setAttribute("name", "causescode_causes" + counterfortextcauses);
    causescode_input.setAttribute("class", "causescode_causes" + counterfortextcauses);
    causescode_input.setAttribute("value", causescode);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(causescode_input);
    
    counterfortextcauses++;
}

function getcausesofconfinement() 
{
    confinecause_table = $('#causesof-confinement-table').DataTable
    ({
        sScrollY: "70px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        searching: false,
        bPaginate: false,
        bFilter: false,
        bInfo: false,

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }
    });
    confinecause_table.columns([5,6]).visible(false);
}

function selectCausesConfinement()
{
    var data;

    $('#causesof-confinement-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        }
        else
        {
            $('#causesof-confinement-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#causesof-confinement-table').DataTable().row('.bg-blue').data();
            selectedCausesOfConfinement = data;
        }
    });
}

function selectCausesOfConfinementForDeleteAdmAdd()
{
    var textboxidtblcauses = selectedCausesOfConfinement[5];

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

            confinecause_table.row('.bg-blue').remove().draw( false );
            $("#" + textboxidtblcauses).remove();
            $("#" + textboxidtblcauses).remove();
            $("#" + textboxidtblcauses).remove();
            $("#" + textboxidtblcauses).remove();
            $("#" + textboxidtblcauses).remove();
        }
        else
        {
            swal("Error", "Error in saving. Please try again!", "error");
        }
    });
}

function addNewDiagnosis()
{
    var date = moment();
    var datecode = date.format("MMDDYYYYhhmmss");
    var refnodiagnose = datecode + "ADMTCATG";
    var diagnosisdiag = $('#diagnosisdiag').val();
    var groupingdiag1 = $('#groupingdiag1').val();
    var groupingdiag2 = $('#groupingdiag2').val();
    var recordsiddiag = $('#recordsiddiag').val();
    var recordsbydiag = $('#recordsbydiag').val();
    
    $.ajax
    ({
        type: 'POST',
        data:
        {
            diagnosisdiag: diagnosisdiag,
            groupingdiag1: groupingdiag1,
            groupingdiag2: groupingdiag2,
            recordsiddiag: recordsiddiag,
            recordsbydiag: recordsbydiag,
            refnodiagnose: refnodiagnose
        },
        url: BASE_URL + 'Admission/addNewDiagnosis',
        dataType: 'json'
    })
    .done(function (result) 
    {
        if (result.status === false) 
        {
            checkFieldValidations(result.errors.diagnosisdiag, 'diagnosisdiagerror', 'diagnosisdiag');
            checkFieldValidations(result.errors.groupingdiag1, 'groupingdiag1error', 'groupingdiag1');
        }
        else 
        {
            $('.adddiagnosis_button').attr('disabled', true);
            
            hideDiagnosisForm();
            clearalldiagnosisfield();

            diagnosis_table.ajax.reload();

            swal
            ({
                title: "Success!",
                text: "Record is successfully saved!",
                type: "success",
                allowOutsideClick: false
            },
            function ()
            {
                $('#diagnosis-masterlist-table_filter [type="search"]').val(refnodiagnose);
                $('#diagnosis-masterlist-table_filter [type="search"]').focus();
                diagnosis_table.search(refnodiagnose).draw();
            });
            $('.adddiagnosis_button').removeAttr('disabled');
        }
    });
}

function clearalldiagnosisfield()
{
    $('#diagnosisdiag').val("");
    $('#groupingdiag1').selectpicker("val","");
    $('#groupingdiag2').val("");

    $('#diagnosisdiag').css("border-color","");
    $('#groupingdiag1').css("border-color","");
    $('#groupingdiag2').css("border-color","");
    
    $('#diagnosisdiagerror').html("");
    $('#groupingdiag1error').html("");
    $('#groupingdiag2error').html("");
}

function editDiagnosis(diagid)
{
    $.ajax
    ({
        type: 'POST',
        data: {diagcode: diagid},
        url: BASE_URL + 'Diagnosis/SearchSelectedDiagnosis',
        dataType: 'json'
    })
    .done(function (result)
    {
        showDiagnosisForm();

        $('#adddiagnosis_button').addClass('d-none');
        $('#edtdiagnosis_button').removeClass('d-none');
        
        $('#diagid').val(result[0].diagcd);
        $('#refnodiag').val(result[0].refno);
        $('#diagnosisdiag').val(result[0].categdiag);
        $('#groupingdiag1').selectpicker("val",result[0].Groupname);
    });
}

function updateDiagnosis()
{
    var diagcode = $('#diagid').val();
    var refnodiag = $('#refnodiag').val();
    var diagnosisdiag = $('#diagnosisdiag').val();
    var groupingdiag1 = $('#groupingdiag1').val();
    var groupingdiag2 = $('#groupingdiag2').val();
    var recordsiddiag = $('#recordsiddiag').val();
    var recordsbydiag = $('#recordsbydiag').val();

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
        $.ajax({

            type: 'POST',
            data:
            {
                diagcode: diagcode,
                refnodiag: refnodiag,
                diagnosisdiag: diagnosisdiag,
                groupingdiag1: groupingdiag1,
                groupingdiag2: groupingdiag2,
                recordsiddiag: recordsiddiag,
                recordsbydiag: recordsbydiag
            },
            url: BASE_URL + 'Diagnosis/UpdateDiagnosis',
            dataType: 'json',
            success: function (result)
            {
                if (result.status == false)
                {
                    checkFieldValidations(result.errors.diagnosisdiag, 'diagnosisdiagerror', 'diagnosisdiag');
                    checkFieldValidations(result.errors.groupingdiag1, 'groupingdiag1error', 'groupingdiag1');
                }
                else
                {
                    $('.edtdiagnosis_button').attr('disabled', true);
                    
                    hideDiagnosisForm();
                    clearalldiagnosisfield();

                    diagnosis_table.ajax.reload();

                    swal
                    ({
                        title: "Success!",
                        text: "Record is successfully updated!",
                        type: "success",
                        allowOutsideClick: false
                    },
                    function ()
                    {
                        $('#diagnosis-masterlist-table_filter [type="search"]').val(refnodiag);
                        $('#diagnosis-masterlist-table_filter [type="search"]').focus();
                        diagnosis_table.search(refnodiag).draw();
                    });
                    $('.edtdiagnosis_button').removeAttr('disabled');
                }
            }
        });
    });
}

function deleteDiagnosis(diagid)
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
            data: 
            {
                diagcode: diagid
            },
            url: BASE_URL + 'Diagnosis/DeleteDiagnosis',
            dataType: 'json'
        })
        .done(function (result) 
        {
            if (result == false) 
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
                diagnosis_table.ajax.reload();
            }
        });
    });
}

function validateUpdateAdmitPatient()
{
    $('#editquickadmitPatientButton').prop('disabled', true);
    
    //------comanage------------------------------------------------------------>
    var datacomanage = '';
    for(var i=1; i<counterfortext; i++)
    {
        datacomanage += "?:" + $('.docname_comanage' + i).val() + "|" 
                             + $('.doccode_comanage' + i).val() + "|" 
                             + $('.startco_comanage' + i).val() + "|"
                             + $('.typeman_comanage' + i).val();
    }
    $("#inputid_hiddencoman").text(datacomanage);
    var myStr = $("#inputid_hiddencoman").text();
    var newStr = replaceAll(myStr, '?:undefined|undefined|undefined|undefined', '');
    var comanagealldata = $("#inputid_comanagedataadm").val(newStr);
    var result = comanagealldata.val().split(":");
    var finalcomanagedata = cleanArray(result);
    $("#inputid_finalcomanagedataadm").val(finalcomanagedata);
    
    //------hmo/insurance-------------------------------------------------------->
    var datahmo = '';
    for(var cv=1; cv<counterfortexthmo; cv++)
    {
        datahmo += "?:" + $('.hmoname_hmo' + cv).val() + "|"
                        + $('.hmocode_hmo' + cv).val() + "|" 
                        + $('.hmorefno_hmo' + cv).val() + "|" 
                        + $('.hmocredit_hmo' + cv).val() + "|"
                        + $('.priorityno_hmo' + cv).val() + "|"
                        + $('.hmocardno_hmo' + cv).val() + "|" 
                        + $('.hmoloa_hmo' + cv).val() + "|" 
                        + $('.hmoapprovaldate_hmo' + cv).val() + "|"
                        + $('.hmocardholder_hmo' + cv).val();
    }
    $("#inputid_hiddenhmoin").text(datahmo);
    var myStrhmo = $("#inputid_hiddenhmoin").text();
    var newStrhmo = replaceAll(myStrhmo, '?:undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined', '');
    var hmoinsualldata = $("#inputid_hmoinsurdataadm").val(newStrhmo);
    var resulthmo = hmoinsualldata.val().split(":");
    var finalhmodata = cleanArray(resulthmo);
    $("#inputid_finalhmoinsurdataadm").val(finalhmodata);
    
    //------causesofconfinement------------------------------------------------->
    var datacauses = '';
    for(var causescv=1; causescv<counterfortextcauses; causescv++)
    {
        datacauses += "?:"  + $('.category_causes' + causescv).val() + "|"
                            + $('.icddiag_causes' + causescv).val() + "|" 
                            + $('.group_causes' + causescv).val() + "|" 
                            + $('.refno_causes' + causescv).val() + "|"
                            + $('.causescode_causes' + causescv).val();
    }
    $("#inputid_hiddencause").text(datacauses);
    var myStrcauses = $("#inputid_hiddencause").text();
    var newStrcauses = replaceAll(myStrcauses, '?:undefined|undefined|undefined|undefined|undefined', '');
    var causesalldata = $("#inputid_causecondataadm").val(newStrcauses);
    var resultcauses = causesalldata.val().split(":");
    var finalcausesdata = cleanArray(resultcauses);
    $("#inputid_finalcausecondataadm").val(finalcausesdata);
    
    //------EditAdmitPatientModalValidation------------------------------------>

    //------General Tab-------------------------------------------->
    var error = 0;
    var generaltab = 0;
        
    var healthrecnoadm = $("#healthrecnoadm").val();
    if (healthrecnoadm === "")
    {
        $("#healthrecnoadmerr").html("Required Field!");
        error++;
        generaltab++;
    }
    else
    {
        $("#healthrecnoadmerr").html("");
    }

    var admixontypeselectadm = $("#admixontypeselectadm").val();
    if (admixontypeselectadm === "Select")
    {
        $("#admixontypeselectadmerr").html("Required Field!");
        error++;
        generaltab++;
    }
    else
    {
        $("#admixontypeselectadmerr").html("");
    }

    var casenumberadm = $("#casenumberadm").val();
    if (casenumberadm === "")
    {
        $("#casenumberadmerr").html("Required Field!");
        error++;
        generaltab++;
    }
    else
    {
        $("#casenumberadmerr").html("");
    }

    var stationnameadm = $("#stationnameadm").val();
    if (stationnameadm === "Select")
    {
        $("#stationnameadmerr").html("Required Field!");
        error++;
        generaltab++;
    }
    else
    {
        $("#stationnameadmerr").html("");
    }

    var selectid_patienttypeadm = $("#selectid_patienttypeadm").val();
    if (selectid_patienttypeadm === "Select")
    {
        $("#selectid_patienttypeadmerr").html("Required Field!");
        error++;
        generaltab++;
    }
    else
    {
        $("#selectid_patienttypeadmerr").html("");
    }
    
    //------Profile Tab-------------------------------------------->
    
    var profiletab = 0;
    var contactcolapse = 0;
    var locatiocolapse = 0;
    
    var religionselectadm = $("#religionselectadm").val();
    if (religionselectadm === "Select")
    {
        $("#religionselectadmerr").html("Required Field!");
        error++;
        profiletab++;
        contactcolapse++;
    }
    else
    {
        $("#religionselectadmerr").html("");
    }
    
    var civilstatusselectadm = $("#civilstatusselectadm").val();
    if (civilstatusselectadm === "Select")
    {
        $("#civilstatusselectadmerr").html("Required Field!");
        error++;
        profiletab++;
        contactcolapse++;
    }
    else
    {
        $("#civilstatusselectadmerr").html("");
    }
    
    var mobilenoadm = $("#mobilenoadm").val();
    if (mobilenoadm === "")
    {
        $("#mobilenoadmerr").html("Required Field!");
        error++;
        profiletab++;
        contactcolapse++;
    }
    else
    {
        $("#mobilenoadmerr").html("");
    }
    
    var contactnoadm = $("#contactnoadm").val();
    if (contactnoadm === "")
    {
        $("#contactnoadmerr").html("Required Field!");
        error++;
        profiletab++;
        contactcolapse++;
    }
    else
    {
        $("#contactnoadmerr").html("");
    }
    
    var provinceselectadm = $("#provinceselectadm").val();
    if (provinceselectadm === "Select")
    {
        $("#provinceselectadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    }
    else
    {
        $("#provinceselectadmerr").html("");
    }
    
    var selectidcitymuniadm = $("#selectidcitymuniadm").val();
    if (selectidcitymuniadm === "Select")
    {
        $("#selectidcitymuniadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    }
    else
    {
        $("#selectidcitymuniadmerr").html("");
    }
    
    var zipcodexadm = $("#zipcodexadm").val();
    if (zipcodexadm === "")
    {
        $("#zipcodexadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    }
    else
    {
        $("#zipcodexadmerr").html("");
    }
    
    var selectid_barangayadm = $("#selectid_barangayadm").val();
    if (selectid_barangayadm === "Select")
    {
        $("#selectid_barangayadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    }
    else
    {
        $("#selectid_barangayadmerr").html("");
    }
    
    var addressadm = $("#addressadm").val();
    if (addressadm === "")
    {
        $("#addressadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    }
    else
    {
        $("#addressadmerr").html("");
    }
    
    //------Admission Tab-------------------------------------------->
    
    var admissiontab = 0;
    var guradiancolapse = 0;
    var admixioncolapse = 0;
    var attendntcolapse = 0;
    var accomodacolapse = 0;
    
    if (selectid_patienttypeadm === "IPD")
    {
        var watchernameadm = $("#watchernameadm").val();
        if (watchernameadm === "")
        {
            $("#watchernameadmerr").html("Required Field!");
            error++;
            admissiontab++;
            guradiancolapse++;
        }
        else
        {
            $("#watchernameadmerr").html("");
        }
        
        var watcherbirthadm = $("#watcherbirthadm").val();
        if (watcherbirthadm === "")
        {
            $("#watcherbirthadmerr").html("Required Field!");
            error++;
            admissiontab++;
            guradiancolapse++;
        }
        else
        {
            $("#watcherbirthadmerr").html("");
        }
        
        var reltopatientadm = $("#reltopatientadm").val();
        if (reltopatientadm === "Select")
        {
            $("#reltopatientadmerr").html("Required Field!");
            error++;
            admissiontab++;
            guradiancolapse++;
        }
        else
        {
            $("#reltopatientadmerr").html("");
        }
        
        var guardiannumadm = $("#guardiannumadm").val();
        if (guardiannumadm === "")
        {
            $("#guardiannumadmerr").html("Required Field!");
            error++;
            admissiontab++;
            guradiancolapse++;
        }
        else
        {
            $("#guardiannumadmerr").html("");
        }
        
        var billingrecipientadm = $("#billingrecipientadm").val();
        if (billingrecipientadm === "")
        {
            $("#billingrecipientadmerr").html("Required Field!");
            error++;
            admissiontab++;
            guradiancolapse++;
        }
        else
        {
            $("#billingrecipientadmerr").html("");
        }
        
        var patientrecipientadm = $("#patientrecipientadm").val();
        if (patientrecipientadm === "")
        {
            $("#patientrecipientadmerr").html("Required Field!");
            error++;
            admissiontab++;
            guradiancolapse++;
        }
        else
        {
            $("#patientrecipientadmerr").html("");
        }
        
        
        var weightadm = $("#weightadm").val();
        if (weightadm === "")
        {
            $("#weightadmerr").html("Required Field!");
            error++;
            admissiontab++;
            admixioncolapse++;
        }
        else
        {
            $("#weightadmerr").html("");
        }
        
        var cautionsadm = $("#cautionsadm").val();
        if (cautionsadm === "Select")
        {
            $("#cautionsadmerr").html("Required Field!");
            error++;
            admissiontab++;
            admixioncolapse++;
        }
        else
        {
            $("#cautionsadmerr").html("");
        }
        
        var inputid_tbdotsstatusadm = $("#inputid_tbdotsstatusadm").val();
        if (inputid_tbdotsstatusadm === "Select")
        {
            $("#inputid_tbdotsstatusadmerr").html("Required Field!");
            error++;
            admissiontab++;
            admixioncolapse++;
        }
        else
        {
            $("#inputid_tbdotsstatusadmerr").html("");
        }
        
        var linkaccountadm = $("#linkaccountadm").val();
        if (linkaccountadm === "")
        {
            $("#linkaccountadmerr").html("Required Field!");
            error++;
            admissiontab++;
            admixioncolapse++;
        }
        else
        {
            $("#linkaccountadmerr").html("");
        }
        
        
        var attendingdoctoradm = $("#attendingdoctoradm").val();
        if (attendingdoctoradm === "")
        {
            $("#attendingdoctoradmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        }
        else
        {
            $("#attendingdoctoradmerr").html("");
        }
        
        var attendingnurseadm = $("#attendingnurseadm").val();
        if (attendingnurseadm === "")
        {
            $("#attendingnurseadmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        }
        else
        {
            $("#attendingnurseadmerr").html("");
        }
        
        var inputid_finalcomanagedataadm = $("#inputid_finalcomanagedataadm").val();
        if (inputid_finalcomanagedataadm === "")
        {
            $("#inputid_finalcomanagedataadmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        }
        else
        {
            $("#inputid_finalcomanagedataadmerr").html("");
        }
        
        var nurseinchargeadm = $("#nurseinchargeadm").val();
        if (nurseinchargeadm === "Select")
        {
            $("#nurseinchargeadmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        }
        else
        {
            $("#nurseinchargeadmerr").html("");
        }
        
        var selectid_roomadm = $("#selectid_roomadm").val();
        if (selectid_roomadm === "")
        {
            $("#selectid_roomadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#selectid_roomadmerr").html("");
        }
        
        var inputid_roominfoadm = $("#inputid_roominfoadm").val();
        if (inputid_roominfoadm === "")
        {
            $("#inputid_roominfoadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#inputid_roominfoadmerr").html("");
        }
        
        var inputid_ancilaryadm = $("#inputid_ancilaryadm").val();
        if (inputid_ancilaryadm === "")
        {
            $("#inputid_ancilaryadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#inputid_ancilaryadmerr").html("");
        }
        
        var inputid_roomrateadm = $("#inputid_roomrateadm").val();
        if (inputid_roomrateadm === "")
        {
            $("#inputid_roomrateadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#inputid_roomrateadmerr").html("");
        }
        
        var inputid_roomcredadm = $("#inputid_roomcredadm").val();
        if (inputid_roomcredadm === "")
        {
            $("#inputid_roomcredadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#inputid_roomcredadmerr").html("");
        }
    }
    else
    {
        var attendingdoctoradm = $("#attendingdoctoradm").val();
        if (attendingdoctoradm === "")
        {
            $("#attendingdoctoradmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        }
        else
        {
            $("#attendingdoctoradmerr").html("");
        }
        
        var attendingnurseadm = $("#attendingnurseadm").val();
        if (attendingnurseadm === "")
        {
            $("#attendingnurseadmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        }
        else
        {
            $("#attendingnurseadmerr").html("");
        }
        
        var inputid_finalcomanagedataadm = $("#inputid_finalcomanagedataadm").val();
        if (inputid_finalcomanagedataadm === "")
        {
            $("#inputid_finalcomanagedataadmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        }
        else
        {
            $("#inputid_finalcomanagedataadmerr").html("");
        }
        
        var selectid_roomadm = $("#selectid_roomadm").val();
        if (selectid_roomadm === "")
        {
            $("#selectid_roomadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#selectid_roomadmerr").html("");
        }
        
        var inputid_roominfoadm = $("#inputid_roominfoadm").val();
        if (inputid_roominfoadm === "")
        {
            $("#inputid_roominfoadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#inputid_roominfoadmerr").html("");
        }
        
        var inputid_ancilaryadm = $("#inputid_ancilaryadm").val();
        if (inputid_ancilaryadm === "")
        {
            $("#inputid_ancilaryadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#inputid_ancilaryadmerr").html("");
        }
        
        var inputid_roomrateadm = $("#inputid_roomrateadm").val();
        if (inputid_roomrateadm === "")
        {
            $("#inputid_roomrateadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#inputid_roomrateadmerr").html("");
        }
        
        var inputid_roomcredadm = $("#inputid_roomcredadm").val();
        if (inputid_roomcredadm === "")
        {
            $("#inputid_roomcredadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        }
        else
        {
            $("#inputid_roomcredadmerr").html("");
        }
    }

    //------Insurance Tab-------------------------------------------->    
    var insurancetab = 0;
    var philhmocolapse = 0;
    var pxclasscolapse = 0;
    var pckgvipcolapse = 0;
    
    var phmembershipselectadm = $("#phmembershipselectadm").val();
    if (phmembershipselectadm === "Select")
    {
        $("#phmembershipselectadmerr").html("Required Field!");
        error++;
        insurancetab++;
        philhmocolapse++;
    }
    else
    {
        $("#phmembershipselectadmerr").html("");
    }
    
    var patientclassadm = $("#patientclassadm").val();
    if (patientclassadm === "Select")
    {
        $("#patientclassadmerr").html("Required Field!");
        error++;
        insurancetab++;
        pxclasscolapse++;
    }
    else
    {
        $("#patientclassadmerr").html("");
    }
    
    var inputid_creditmaxlimitadm = $("#inputid_creditmaxlimitadm").val();
    if (inputid_creditmaxlimitadm === "Select")
    {
        $("#inputid_creditmaxlimitadmerr").html("Required Field!");
        error++;
        insurancetab++;
        pckgvipcolapse++;
    }
    else
    {
        $("#inputid_creditmaxlimitadmerr").html("");
    }
    
    //------Admission Tab-------------------------------------------->
    
    var otherstab = 0;
    
    var complaintcolapse = 0;
    var diagnosiscolapse = 0;
    var dietguidecolapse = 0;
    var cnfinemntcolapse = 0;
    
    var complaopdcolapse = 0;
    var diagnsopdcolapse = 0;
    var impresopdcolapse = 0;
    
    if (selectid_patienttypeadm === "IPD")
    {
        var admissionreasonadm = $("#admissionreasonadm").val();
        if (admissionreasonadm === "")
        {
            $("#admissionreasonadmerr").html("Required Field!");
            error++;
            otherstab++;
            complaintcolapse++;
        }
        else
        {
            $("#admissionreasonadmerr").html("");
        }
        
        var admittingdiagnosisadm = $("#admittingdiagnosisadm").val();
        if (admittingdiagnosisadm === "")
        {
            $("#admittingdiagnosisadmerr").html("Required Field!");
            error++;
            otherstab++;
            diagnosiscolapse++;
        }
        else
        {
            $("#admittingdiagnosisadmerr").html("");
        }
        
        var dietaryadm = $("#dietaryadm").val();
        if (dietaryadm === "")
        {
            $("#dietaryadmerr").html("Required Field!");
            error++;
            otherstab++;
            dietguidecolapse++;
        }
        else
        {
            $("#dietaryadmerr").html("");
        }
        
        var inputid_finalcausecondataadm = $("#inputid_finalcausecondataadm").val();
        if (inputid_finalcausecondataadm === "")
        {
            $("#inputid_finalcausecondataadmerr").html("Required Field!");
            error++;
            otherstab++;
            cnfinemntcolapse++;
        }
        else
        {
            $("#inputid_finalcausecondataadmerr").html("");
        }
    }
    else
    {   
        var complaintsopdadm = $("#complaintsopdadm").val();
        if (complaintsopdadm === "")
        {
            $("#complaintsopdadmerr").html("Required Field!");
            error++;
            otherstab++;
            complaopdcolapse++;
        }
        else
        {
            $("#complaintsopdadmerr").html("");
        }
        
        var diagnosisopdadm = $("#diagnosisopdadm").val();
        if (diagnosisopdadm === "")
        {
            $("#diagnosisopdadmerr").html("Required Field!");
            error++;
            otherstab++;
            diagnsopdcolapse++;
        }
        else
        {
            $("#diagnosisopdadmerr").html("");
        }
        
        var impressionopdadm = $("#impressionopdadm").val();
        if (impressionopdadm === "")
        {
            $("#impressionopdadmerr").html("Required Field!");
            error++;
            otherstab++;
            impresopdcolapse++;
        }
        else
        {
            $("#impressionopdadmerr").html("");
        }
    }

    if (otherstab > 0)
    {
        $("#clickothersid").tab('show');
        $("#otherserrtabindicator").html("*");

        if(complaintcolapse !==0 && diagnosiscolapse !==0 && dietguidecolapse !==0 && cnfinemntcolapse !==0)
        {
            $("#complainterrcolapseindicator").html("*");
            $("#diagnosiserrcolapseindicator").html("*");
            $("#dietguideerrcolapseindicator").html("*");
            $("#cnfinemnterrcolapseindicator").html("*");

            $("#ComplaintsIPDCollapse").collapse('show');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '#168C94');
            $("#diag").css('background', '');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse ===0 && diagnosiscolapse !==0 && dietguidecolapse !==0 && cnfinemntcolapse !==0)
        {
            $("#complainterrcolapseindicator").html("");
            $("#diagnosiserrcolapseindicator").html("*");
            $("#dietguideerrcolapseindicator").html("*");
            $("#cnfinemnterrcolapseindicator").html("*");

            $("#ComplaintsIPDCollapse").collapse('hide');
            $("#DiagnosisIPDCollapse").collapse('show');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '');
            $("#diag").css('background', '#168C94');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse ===0 && diagnosiscolapse ===0 && dietguidecolapse !==0 && cnfinemntcolapse !==0)
        {
            $("#complainterrcolapseindicator").html("");
            $("#diagnosiserrcolapseindicator").html("");
            $("#dietguideerrcolapseindicator").html("*");
            $("#cnfinemnterrcolapseindicator").html("*");

            $("#ComplaintsIPDCollapse").collapse('hide');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('show');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '');
            $("#diag").css('background', '');
            $("#diet").css('background', '#168C94');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse ===0 && diagnosiscolapse ===0 && dietguidecolapse ===0 && cnfinemntcolapse !==0)
        {
            $("#complainterrcolapseindicator").html("");
            $("#diagnosiserrcolapseindicator").html("");
            $("#dietguideerrcolapseindicator").html("");
            $("#cnfinemnterrcolapseindicator").html("*");

            $("#ComplaintsIPDCollapse").collapse('hide');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('show');

            $("#comp").css('background', '');
            $("#diag").css('background', '');
            $("#diet").css('background', '');
            $("#conf").css('background', '#168C94');
        }
        else if(complaintcolapse !==0 && diagnosiscolapse !==0 && dietguidecolapse !==0 && cnfinemntcolapse ===0)
        {
            $("#complainterrcolapseindicator").html("*");
            $("#diagnosiserrcolapseindicator").html("*");
            $("#dietguideerrcolapseindicator").html("*");
            $("#cnfinemnterrcolapseindicator").html("");

            $("#ComplaintsIPDCollapse").collapse('show');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '#168C94');
            $("#diag").css('background', '');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse !==0 && diagnosiscolapse !==0 && dietguidecolapse ===0 && cnfinemntcolapse ===0)
        {
            $("#complainterrcolapseindicator").html("*");
            $("#diagnosiserrcolapseindicator").html("*");
            $("#dietguideerrcolapseindicator").html("");
            $("#cnfinemnterrcolapseindicator").html("");

            $("#ComplaintsIPDCollapse").collapse('show');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '#168C94');
            $("#diag").css('background', '');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse !==0 && diagnosiscolapse ===0 && dietguidecolapse ===0 && cnfinemntcolapse ===0)
        {
            $("#complainterrcolapseindicator").html("*");
            $("#diagnosiserrcolapseindicator").html("");
            $("#dietguideerrcolapseindicator").html("");
            $("#cnfinemnterrcolapseindicator").html("");

            $("#ComplaintsIPDCollapse").collapse('show');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '#168C94');
            $("#diag").css('background', '');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse !==0 && diagnosiscolapse ===0 && dietguidecolapse ===0 && cnfinemntcolapse !==0)
        {
            $("#complainterrcolapseindicator").html("*");
            $("#diagnosiserrcolapseindicator").html("");
            $("#dietguideerrcolapseindicator").html("");
            $("#cnfinemnterrcolapseindicator").html("*");

            $("#ComplaintsIPDCollapse").collapse('show');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '#168C94');
            $("#diag").css('background', '');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse !==0 && diagnosiscolapse !==0 && dietguidecolapse ===0 && cnfinemntcolapse !==0)
        {
            $("#complainterrcolapseindicator").html("*");
            $("#diagnosiserrcolapseindicator").html("*");
            $("#dietguideerrcolapseindicator").html("");
            $("#cnfinemnterrcolapseindicator").html("*");

            $("#ComplaintsIPDCollapse").collapse('show');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '#168C94');
            $("#diag").css('background', '');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse !==0 && diagnosiscolapse ===0 && dietguidecolapse !==0 && cnfinemntcolapse !==0)
        {
            $("#complainterrcolapseindicator").html("*");
            $("#diagnosiserrcolapseindicator").html("");
            $("#dietguideerrcolapseindicator").html("*");
            $("#cnfinemnterrcolapseindicator").html("*");

            $("#ComplaintsIPDCollapse").collapse('show');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '#168C94');
            $("#diag").css('background', '');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse ===0 && diagnosiscolapse !==0 && dietguidecolapse ===0 && cnfinemntcolapse !==0)
        {
            $("#complainterrcolapseindicator").html("");
            $("#diagnosiserrcolapseindicator").html("*");
            $("#dietguideerrcolapseindicator").html("");
            $("#cnfinemnterrcolapseindicator").html("*");

            $("#ComplaintsIPDCollapse").collapse('hide');
            $("#DiagnosisIPDCollapse").collapse('show');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '');
            $("#diag").css('background', '#168C94');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse ===0 && diagnosiscolapse !==0 && dietguidecolapse ===0 && cnfinemntcolapse ===0)
        {
            $("#complainterrcolapseindicator").html("");
            $("#diagnosiserrcolapseindicator").html("*");
            $("#dietguideerrcolapseindicator").html("");
            $("#cnfinemnterrcolapseindicator").html("");

            $("#ComplaintsIPDCollapse").collapse('hide');
            $("#DiagnosisIPDCollapse").collapse('show');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '');
            $("#diag").css('background', '#168C94');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse !==0 && diagnosiscolapse ===0 && dietguidecolapse !==0 && cnfinemntcolapse ===0)
        {
            $("#complainterrcolapseindicator").html("*");
            $("#diagnosiserrcolapseindicator").html("");
            $("#dietguideerrcolapseindicator").html("*");
            $("#cnfinemnterrcolapseindicator").html("");

            $("#ComplaintsIPDCollapse").collapse('show');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '#168C94');
            $("#diag").css('background', '');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse ===0 && diagnosiscolapse ===0 && dietguidecolapse !==0 && cnfinemntcolapse ===0)
        {
            $("#complainterrcolapseindicator").html("");
            $("#diagnosiserrcolapseindicator").html("");
            $("#dietguideerrcolapseindicator").html("*");
            $("#cnfinemnterrcolapseindicator").html("");

            $("#ComplaintsIPDCollapse").collapse('hide');
            $("#DiagnosisIPDCollapse").collapse('hide');
            $("#DietaryIPDCollapse").collapse('show');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '');
            $("#diag").css('background', '');
            $("#diet").css('background', '#168C94');
            $("#conf").css('background', '');
        }
        else if(complaintcolapse ===0 && diagnosiscolapse !==0 && dietguidecolapse !==0 && cnfinemntcolapse ===0)
        {
            $("#complainterrcolapseindicator").html("");
            $("#diagnosiserrcolapseindicator").html("*");
            $("#dietguideerrcolapseindicator").html("*");
            $("#cnfinemnterrcolapseindicator").html("");

            $("#ComplaintsIPDCollapse").collapse('hide');
            $("#DiagnosisIPDCollapse").collapse('show');
            $("#DietaryIPDCollapse").collapse('hide');
            $("#ConfinementIPDCollapse").collapse('hide');

            $("#comp").css('background', '');
            $("#diag").css('background', '#168C94');
            $("#diet").css('background', '');
            $("#conf").css('background', '');
        }

        if(complaopdcolapse !==0 && diagnsopdcolapse !==0 && impresopdcolapse !==0)
        {
            $("#complaopderrcolapseindicator").html("*");
            $("#diagnoopderrcolapseindicator").html("*");
            $("#impresopderrcolapseindicator").html("*");
            
            $("#ComplaintsOPDCollapse").collapse('show');
            $("#DiagnosisOPDCollapse").collapse('hide');
            $("#ImpressionOPDCollapse").collapse('hide');

            $("#compopd").css('background', '#168C94');
            $("#diagopd").css('background', '');
            $("#dietopd").css('background', '');
        }
        else if(complaopdcolapse ===0 && diagnsopdcolapse !==0 && impresopdcolapse !==0)
        {
            $("#complaopderrcolapseindicator").html("");
            $("#diagnoopderrcolapseindicator").html("*");
            $("#impresopderrcolapseindicator").html("*"); 
            
            $("#ComplaintsOPDCollapse").collapse('hide');
            $("#DiagnosisOPDCollapse").collapse('show');
            $("#ImpressionOPDCollapse").collapse('hide');

            $("#compopd").css('background', '');
            $("#diagopd").css('background', '#168C94');
            $("#dietopd").css('background', '');
        }
        else if(complaopdcolapse ===0 && diagnsopdcolapse ===0 && impresopdcolapse !==0)
        {
            $("#complaopderrcolapseindicator").html("");
            $("#diagnoopderrcolapseindicator").html("");
            $("#impresopderrcolapseindicator").html("*"); 
            
            $("#ComplaintsOPDCollapse").collapse('hide');
            $("#DiagnosisOPDCollapse").collapse('hide');
            $("#ImpressionOPDCollapse").collapse('show');

            $("#compopd").css('background', '');
            $("#diagopd").css('background', '');
            $("#dietopd").css('background', '#168C94');
        }
        else if(complaopdcolapse !==0 && diagnsopdcolapse !==0 && impresopdcolapse ===0)
        {
            $("#complaopderrcolapseindicator").html("*");
            $("#diagnoopderrcolapseindicator").html("*");
            $("#impresopderrcolapseindicator").html(""); 
            
            $("#ComplaintsOPDCollapse").collapse('show');
            $("#DiagnosisOPDCollapse").collapse('hide');
            $("#ImpressionOPDCollapse").collapse('hide');

            $("#compopd").css('background', '#168C94');
            $("#diagopd").css('background', '');
            $("#dietopd").css('background', '');
        }
        else if(complaopdcolapse !==0 && diagnsopdcolapse ===0 && impresopdcolapse ===0)
        {
            $("#complaopderrcolapseindicator").html("*");
            $("#diagnoopderrcolapseindicator").html("");
            $("#impresopderrcolapseindicator").html(""); 
            
            $("#ComplaintsOPDCollapse").collapse('show');
            $("#DiagnosisOPDCollapse").collapse('hide');
            $("#ImpressionOPDCollapse").collapse('hide');

            $("#compopd").css('background', '#168C94');
            $("#diagopd").css('background', '');
            $("#dietopd").css('background', '');
        }
        else if(complaopdcolapse !==0 && diagnsopdcolapse ===0 && impresopdcolapse !==0)
        {
            $("#complaopderrcolapseindicator").html("*");
            $("#diagnoopderrcolapseindicator").html("");
            $("#impresopderrcolapseindicator").html("*"); 
            
            $("#ComplaintsOPDCollapse").collapse('show');
            $("#DiagnosisOPDCollapse").collapse('hide');
            $("#ImpressionOPDCollapse").collapse('hide');

            $("#compopd").css('background', '#168C94');
            $("#diagopd").css('background', '');
            $("#dietopd").css('background', '');
        }
        else if(complaopdcolapse ===0 && diagnsopdcolapse !==0 && impresopdcolapse ===0)
        {
            $("#complaopderrcolapseindicator").html("");
            $("#diagnoopderrcolapseindicator").html("*");
            $("#impresopderrcolapseindicator").html(""); 
            
            $("#ComplaintsOPDCollapse").collapse('hide');
            $("#DiagnosisOPDCollapse").collapse('show');
            $("#ImpressionOPDCollapse").collapse('hide');

            $("#compopd").css('background', '');
            $("#diagopd").css('background', '#168C94');
            $("#dietopd").css('background', '');
        }
    }
    else
    {        
        $("#otherserrtabindicator").html("");
        
        $("#complainterrcolapseindicator").html("");
        $("#diagnosiserrcolapseindicator").html("");
        $("#dietguideerrcolapseindicator").html("");
        $("#cnfinemnterrcolapseindicator").html("");
        
        $("#complaopderrcolapseindicator").html("");
        $("#diagnoopderrcolapseindicator").html("");
        $("#impresopderrcolapseindicator").html(""); 
    }

    if (insurancetab > 0)
    {
        $("#clickinsuranceid").tab('show');
        $("#insuranceerrtabindicator").html("*");
        
        if(philhmocolapse !==0 && pxclasscolapse !==0 && pckgvipcolapse !==0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("*");
            
            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
        }
        else if(philhmocolapse ===0 && pxclasscolapse !==0 && pckgvipcolapse !==0)
        {
            $("#philhmoerrcolapseindicator").html("");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("*"); 
            
            $("#philhealthandHMOCollapse").collapse('hide');
            $("#ClassificationCollapse").collapse('show');
            $("#PackagesandVIPCollapse").collapse('hide');

            $("#phhm").css('background', '');
            $("#pxcl").css('background', '#168C94');
            $("#vipm").css('background', '');
        }
        else if(philhmocolapse ===0 && pxclasscolapse ===0 && pckgvipcolapse !==0)
        {
            $("#philhmoerrcolapseindicator").html("");
            $("#pxclasserrcolapseindicator").html("");
            $("#pckgviperrcolapseindicator").html("*"); 
            
            $("#philhealthandHMOCollapse").collapse('hide');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('show');

            $("#phhm").css('background', '');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '#168C94');
        }
        else if(philhmocolapse !==0 && pxclasscolapse !==0 && pckgvipcolapse ===0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html(""); 
            
            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
        }
        else if(philhmocolapse !==0 && pxclasscolapse ===0 && pckgvipcolapse ===0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("");
            $("#pckgviperrcolapseindicator").html(""); 
            
            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
        }
        else if(philhmocolapse !==0 && pxclasscolapse ===0 && pckgvipcolapse !==0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("");
            $("#pckgviperrcolapseindicator").html("*"); 
            
            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
        }
        else if(philhmocolapse ===0 && pxclasscolapse !==0 && pckgvipcolapse ===0)
        {
            $("#philhmoerrcolapseindicator").html("");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html(""); 
            
            $("#philhealthandHMOCollapse").collapse('hide');
            $("#ClassificationCollapse").collapse('show');
            $("#PackagesandVIPCollapse").collapse('hide');

            $("#phhm").css('background', '');
            $("#pxcl").css('background', '#168C94');
            $("#vipm").css('background', '');
        }
    }
    else
    {        
        $("#insuranceerrtabindicator").html("");
        
        $("#philhmoerrcolapseindicator").html("");
        $("#pxclasserrcolapseindicator").html("");
        $("#pckgviperrcolapseindicator").html("");
    }

    if (admissiontab > 0)
    {
        $("#clickadmissionid").tab('show');
        $("#admissionerrtabindicator").html("*");

        if(guradiancolapse !==0 && admixioncolapse !==0 && attendntcolapse !==0 && accomodacolapse !==0)
        {
            $("#guardianerrcolapseindicator").html("*");
            $("#admissionerrcolapseindicator").html("*");
            $("#attendanterrcolapseindicator").html("*");
            $("#accomodaerrcolapseindicator").html("*");

            $("#guardianCollapse").collapse('show');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '#168C94');
            $("#admi").css('background', '');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse ===0 && admixioncolapse !==0 && attendntcolapse !==0 && accomodacolapse !==0)
        {
            $("#guardianerrcolapseindicator").html("");
            $("#admissionerrcolapseindicator").html("*");
            $("#attendanterrcolapseindicator").html("*");
            $("#accomodaerrcolapseindicator").html("*");

            $("#guardianCollapse").collapse('hide');
            $("#admissionCollapse").collapse('show');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '');
            $("#admi").css('background', '#168C94');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse ===0 && admixioncolapse ===0 && attendntcolapse !==0 && accomodacolapse !==0)
        {
            $("#guardianerrcolapseindicator").html("");
            $("#admissionerrcolapseindicator").html("");
            $("#attendanterrcolapseindicator").html("*");
            $("#accomodaerrcolapseindicator").html("*");

            $("#guardianCollapse").collapse('hide');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('show');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '');
            $("#admi").css('background', '');
            $("#atte").css('background', '#168C94');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse ===0 && admixioncolapse ===0 && attendntcolapse ===0 && accomodacolapse !==0)
        {
            $("#guardianerrcolapseindicator").html("");
            $("#admissionerrcolapseindicator").html("");
            $("#attendanterrcolapseindicator").html("");
            $("#accomodaerrcolapseindicator").html("*");

            $("#guardianCollapse").collapse('hide');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('show');

            $("#guar").css('background', '');
            $("#admi").css('background', '');
            $("#atte").css('background', '');
            $("#acco").css('background', '#168C94');
        }
        else if(guradiancolapse !==0 && admixioncolapse !==0 && attendntcolapse !==0 && accomodacolapse ===0)
        {
            $("#guardianerrcolapseindicator").html("*");
            $("#admissionerrcolapseindicator").html("*");
            $("#attendanterrcolapseindicator").html("*");
            $("#accomodaerrcolapseindicator").html("");

            $("#guardianCollapse").collapse('show');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '#168C94');
            $("#admi").css('background', '');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse !==0 && admixioncolapse !==0 && attendntcolapse ===0 && accomodacolapse ===0)
        {
            $("#guardianerrcolapseindicator").html("*");
            $("#admissionerrcolapseindicator").html("*");
            $("#attendanterrcolapseindicator").html("");
            $("#accomodaerrcolapseindicator").html("");

            $("#guardianCollapse").collapse('show');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '#168C94');
            $("#admi").css('background', '');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse !==0 && admixioncolapse ===0 && attendntcolapse ===0 && accomodacolapse ===0)
        {
            $("#guardianerrcolapseindicator").html("*");
            $("#admissionerrcolapseindicator").html("");
            $("#attendanterrcolapseindicator").html("");
            $("#accomodaerrcolapseindicator").html("");

            $("#guardianCollapse").collapse('show');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '#168C94');
            $("#admi").css('background', '');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse !==0 && admixioncolapse ===0 && attendntcolapse ===0 && accomodacolapse !==0)
        {
            $("#guardianerrcolapseindicator").html("*");
            $("#admissionerrcolapseindicator").html("");
            $("#attendanterrcolapseindicator").html("");
            $("#accomodaerrcolapseindicator").html("*");

            $("#guardianCollapse").collapse('show');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '#168C94');
            $("#admi").css('background', '');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse !==0 && admixioncolapse !==0 && attendntcolapse ===0 && accomodacolapse !==0)
        {
            $("#guardianerrcolapseindicator").html("*");
            $("#admissionerrcolapseindicator").html("*");
            $("#attendanterrcolapseindicator").html("");
            $("#accomodaerrcolapseindicator").html("*");

            $("#guardianCollapse").collapse('show');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '#168C94');
            $("#admi").css('background', '');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse !==0 && admixioncolapse ===0 && attendntcolapse !==0 && accomodacolapse !==0)
        {
            $("#guardianerrcolapseindicator").html("*");
            $("#admissionerrcolapseindicator").html("");
            $("#attendanterrcolapseindicator").html("*");
            $("#accomodaerrcolapseindicator").html("*");

            $("#guardianCollapse").collapse('show');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '#168C94');
            $("#admi").css('background', '');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse ===0 && admixioncolapse !==0 && attendntcolapse ===0 && accomodacolapse !==0)
        {
            $("#guardianerrcolapseindicator").html("");
            $("#admissionerrcolapseindicator").html("*");
            $("#attendanterrcolapseindicator").html("");
            $("#accomodaerrcolapseindicator").html("*");

            $("#guardianCollapse").collapse('hide');
            $("#admissionCollapse").collapse('show');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '');
            $("#admi").css('background', '#168C94');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse ===0 && admixioncolapse !==0 && attendntcolapse ===0 && accomodacolapse ===0)
        {
            $("#guardianerrcolapseindicator").html("");
            $("#admissionerrcolapseindicator").html("*");
            $("#attendanterrcolapseindicator").html("");
            $("#accomodaerrcolapseindicator").html("");

            $("#guardianCollapse").collapse('hide');
            $("#admissionCollapse").collapse('show');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '');
            $("#admi").css('background', '#168C94');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse !==0 && admixioncolapse ===0 && attendntcolapse !==0 && accomodacolapse ===0)
        {
            $("#guardianerrcolapseindicator").html("*");
            $("#admissionerrcolapseindicator").html("");
            $("#attendanterrcolapseindicator").html("*");
            $("#accomodaerrcolapseindicator").html("");

            $("#guardianCollapse").collapse('show');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '#168C94');
            $("#admi").css('background', '');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse ===0 && admixioncolapse ===0 && attendntcolapse !==0 && accomodacolapse ===0)
        {
            $("#guardianerrcolapseindicator").html("");
            $("#admissionerrcolapseindicator").html("");
            $("#attendanterrcolapseindicator").html("*");
            $("#accomodaerrcolapseindicator").html("");

            $("#guardianCollapse").collapse('hide');
            $("#admissionCollapse").collapse('hide');
            $("#attendantCollapse").collapse('show');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '');
            $("#admi").css('background', '');
            $("#atte").css('background', '#168C94');
            $("#acco").css('background', '');
        }
        else if(guradiancolapse ===0 && admixioncolapse !==0 && attendntcolapse !==0 && accomodacolapse ===0)
        {
            $("#guardianerrcolapseindicator").html("");
            $("#admissionerrcolapseindicator").html("*");
            $("#attendanterrcolapseindicator").html("*");
            $("#accomodaerrcolapseindicator").html("");

            $("#guardianCollapse").collapse('hide');
            $("#admissionCollapse").collapse('show');
            $("#attendantCollapse").collapse('hide');
            $("#accomodationCollapse").collapse('hide');

            $("#guar").css('background', '');
            $("#admi").css('background', '#168C94');
            $("#atte").css('background', '');
            $("#acco").css('background', '');
        }
    }
    else
    {        
        $("#admissionerrtabindicator").html("");
        $("#guardianerrcolapseindicator").html("");
        $("#admissionerrcolapseindicator").html("");
        $("#attendanterrcolapseindicator").html("");
        $("#accomodaerrcolapseindicator").html("");
    }

    if (profiletab > 0)
    {
        $("#clickpersonalid").tab('show');
        $("#profileerrtabindicator").html("*");
        
        if(locatiocolapse !==0 && contactcolapse !== 0)
        {
            $("#profileCollapse").collapse('hide');
            $("#contactCollapse").collapse('show');
            $("#locationCollapse").collapse('hide');
            $("#familyCollapse").collapse('hide');
            
            $("#contacterrcolapseindicator").html("*");
            $("#locationerrcolapseindicator").html("*");

            $("#prof").css('background', '');
            $("#cont").css('background', '#168C94');
            $("#loca").css('background', '');
            $("#fami").css('background', '');
        }
        else if(locatiocolapse !==0 && contactcolapse === 0)
        {
            $("#profileCollapse").collapse('hide');
            $("#contactCollapse").collapse('hide');
            $("#locationCollapse").collapse('show');
            $("#familyCollapse").collapse('hide');
            
            $("#contacterrcolapseindicator").html("");
            $("#locationerrcolapseindicator").html("*");
            
            $("#prof").css('background', '');
            $("#cont").css('background', '');
            $("#loca").css('background', '#168C94');
            $("#fami").css('background', '');
        }
        else if(contactcolapse !==0 && locatiocolapse === 0)
        {
            $("#profileCollapse").collapse('hide');
            $("#contactCollapse").collapse('show');
            $("#locationCollapse").collapse('hide');
            $("#familyCollapse").collapse('hide');
            
            $("#contacterrcolapseindicator").html("*");
            $("#locationerrcolapseindicator").html("");
            
            $("#prof").css('background', '');
            $("#cont").css('background', '#168C94');
            $("#loca").css('background', '');
            $("#fami").css('background', '');
        }
    }
    else
    {        
        $("#profileerrtabindicator").html("");
        $("#contacterrcolapseindicator").html("");
        $("#locationerrcolapseindicator").html("");
    }
    
    if (generaltab > 0)
    {
        $("#clickgeneralid").tab('show');
        $("#generalerrtabindicator").html("*");
    }
    else
    {
        $("#generalerrtabindicator").html("");
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

        $('#editquickadmitPatientButton').removeAttr('disabled');
    }
    else
    {
        $('#editquickadmitPatientButton').attr('disabled', true);
        showSupervisorPermissionModalForEdtAdm();
    }
}

function showSupervisorPermissionModalForEdtAdm()
{
    $('#editquickadmitPatientButton').attr('disabled', false);
    
    $('#supervisorpermitmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#supervisorpermitmodal').css('overflow-y', 'scroll');
    
    $('#cancelButtonForSuprvisrPermitEdtMas').addClass('d-none');
    $('#cancelButtonForSuprvisrPermitEdtAdm').removeClass('d-none');

    $('#checkAuthorizationButtonForEdtMas').addClass('d-none');
    $('#checkAuthorizationButtonForEdtAdm').removeClass('d-none');
    
    $('.supvinputedtmas').addClass('d-none');
    $('.supvinputedtadm').removeClass('d-none');

    var prevpxfname = $('#hiddenid_pxfnameupdadm').val();
    var prevpxmname = $('#hiddenid_pxmnameupdadm').val();
    var prevpxlname = $('#hiddenid_pxlnameupdadm').val();
    var prevpxsufix = $('#hiddenid_pxsuffxupdadm').val();
    var prevcasenum = $('#hiddenid_casenumupdadm').val();
    var prevpincode = $('#hiddenid_pincodeupdadm').val();

    var reasontxt = "CN: " + 
                    prevcasenum + " " + 
                    prevpxlname + ", " + 
                    prevpxfname + " " + 
                    prevpxsufix + " " + 
                    prevpxmname + 
                    " Patient Data Editing!";
            
    var description =   "CN: " + 
                        prevcasenum + 
                        "/PIN:" + 
                        prevpincode +
                        "/PxName:" +
                        prevpxlname + 
                        ", " + 
                        prevpxfname +
                        " " + 
                        prevpxsufix + 
                        " " + 
                        prevpxmname;
    
    $('#txtareaid_reasonsup').val(reasontxt);
    $('#descriptionnsup').val(description);
}

function hideSupervisorPermissionModalForEdtAdm()
{
    $('#supervisorpermitmodal').modal("hide");
    
    $('#admitpatientmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
    
    $('#suprvisoridadm').val("");
    $('#suppasswordadm').val("");
    $('#logbooksupadm').val("");
    
    $('#suprvisoriderror').html("");
    $('#suprvisoriderror').addClass('d-none');

    $('#suppassworderror').html("");
    $('#suppassworderror').addClass('d-none');

    $('#accounterror').html("");
    $('#accounterror').addClass('d-none');

    $('#checkAuthorizationButtonForEdtAdm').prop('disabled',false);
}

function checkAuthorizationFromSupervisorForEdtAdm()
{
    $('#checkAuthorizationButtonForEdtAdm').prop('disabled', true);
    
    var suprvisorid = $('#suprvisoridadm').val();
    var suppassword = $('#suppasswordadm').val();
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
            
            $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
        }

        if (result.status)
        {
            $('#checkAuthorizationButtonForEdtAdm').prop('disabled', true);
            
            $('#suprvisoriderror').html("");
            $('#suprvisoriderror').addClass('d-none');
            
            $('#suppassworderror').html("");
            $('#suppassworderror').addClass('d-none');
            
            $('#accounterror').html("");
            $('#accounterror').addClass('d-none');
         
//            var stopChecking24hoursIndicator = $('#stopChecking24hoursIndicator').val("1");
//            var stopChecking24hoursIndicatortoInt = parseInt(stopChecking24hoursIndicator);
//            alert(stopChecking24hoursIndicatortoInt);
            
            createLogForAdmittedPatientUpdate();
        }
        

        if (result.error_acct)
        {
            $('#suprvisoriderror').html("");
            $('#suprvisoriderror').addClass('d-none');

            $('#suppassworderror').html("");
            $('#suppassworderror').addClass('d-none');

            $('#accounterror').html("Account does not exists!");
            $('#accounterror').removeClass('d-none');
            
            $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
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
                
                $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
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
                    
                    $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
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
                        
                        $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
                    }
                }
            }
        }

    });
}

function createLogForAdmittedPatientUpdate()
{
    var suprvisorid = $('#suprvisoridadm').val();
    var suppassword = $('#suppasswordadm').val();
    var userempname = $('#currentusersup').val();
    var reasonofedt = $('#txtareaid_reasonsup').val();
    var userpascode = $('#userpasscodesup').val();
    var description = $('#descriptionnsup').val();
    var logbooksupr = $('#logbooksupadm').val();
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + 'Admission/CreateLogForEditAdmittedPatient',
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
            var caseno = $("#accountnumberadm").val();
            uploadPatientImageForEditAdmitPatient(caseno);
        }
    });
}

function uploadPatientImageForEditAdmitPatient(caseno)
{
    if ($('#openpatientimguploadforadmpx').val() === '')
    {
        updateAdmittedPatient(caseno);
    }
    else
    {
        $('#editquickadmitPatientButton').attr('disabled', true);
        
        var patientImage = $('#openpatientimguploadforadmpx').prop('files')[0];
        var extension = patientImage.name.substr((patientImage.name.lastIndexOf('.') + 1));

        var form_data = new FormData();
        form_data.append("file", patientImage, $('#pxindexnoadm').val() + 'p.' + extension);

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Uploads/DeleteUploadedPatientImage",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json'
        })
        .done(function (data)
        {
            insertImageToLocationForEditAdmittedPx(caseno);
        });
    }
}

function insertImageToLocationForEditAdmittedPx(casenox)
{
    var patientImage = $('#openpatientimguploadforadmpx').prop('files')[0];
    var extension = patientImage.name.substr((patientImage.name.lastIndexOf('.') + 1));

    var form_data = new FormData();
    form_data.append("file", patientImage, $('#pxindexnoadm').val() + 'p.' + extension);
    
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
        updateAdmittedPatient(casenox);
    });
}

function updateAdmittedPatient(casenox)
{
    $.ajax
    (
        {
            type: 'POST',
            url: BASE_URL + "Admission/updateAdmittedPatient",
            data: $('#admit-patient-form').serialize(),
            dataType: 'json'
        }
    )
    .done
    (
        function (data)
        {
            console.log(data);

            $('#supervisorpermitmodal').modal("hide");
            
            setTimeout(function ()
            {
                swal
                ({
                    title: "Success",
                    text: "Admitted Patient is successfully updated!",
                    type: "success",
                    confirmButtonText: "OK"
                },
                function (isConfirm)
                {
                    if (isConfirm)
                    {
                        showDiagnosticDataModal(casenox);
                    }
                });
            }, 1000);

            $('#suprvisoridadm').val("");
            $('#suppasswordadm').val("");
            $('#logbooksupadm').val("");

            $('#editquickadmitPatientButton').removeAttr('disabled');
            $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
        }
    );
}

function showDiagnosticDataModal(casenum)
{
    $('#diagnosticdatamodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getInPatientDataForAdmitPatientGenerateData",
                data: {casenumber: casenum},
                dataType: 'json'
            })

            .done(function (data)
            {
                $("#inputid_hiddencasenogenerate").val(data.getcaseno['caseno']);
            });

    $('body').css('overflow', 'hidden');
    $('#diagnosticdatamodal').css('overflow-y', 'scroll');
}

function hideDiagnosticDataModal()
{
    $('#diagnosticdatamodal').modal("hide");
    $('body').css('overflow', 'auto');

    var pxlastname = $("#lastnameadm").val();
    var pxfrstname = $("#firstnameadm").val();
    var pxfullname = pxlastname + ", " + pxfrstname;

    admittedpx_table.ajax.reload();
    $('#admitted-patients-masterlist-table_filter [type="search"]').val(pxfullname);
    $('#admitted-patients-masterlist-table_filter [type="search"]').focus();
    admittedpx_table.search(pxfullname).draw();
}

function printAdmissionData()
{
    var caseno = $("#inputid_hiddencasenogenerate").val();

    if ($("#admission").is(":checked"))
    {
        $('#generate-patient-admission-sheet-form input[name=hiddennameforprintadmission]').val(caseno);
        $("#generate-patient-admission-sheet-form").submit();
    } else
    {
        $('#generate-patient-diagnostic-data-form input[name=hiddennameforprintdiagnostic]').val(caseno);
        $("#generate-patient-diagnostic-data-form").submit();
    }
}

function converttimetoarmytime()
{

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


const convertTime12to24 = (time12h) => 
{
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') 
    {
        hours = '00';
    }

    if (modifier === 'PM') 
    {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}