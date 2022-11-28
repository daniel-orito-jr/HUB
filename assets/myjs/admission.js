var selectedSLCode;
var selectedDoctor;
var selectedNurse;
var selectedRoom;
var selectedDiagnosis;
var selectedICD10;
var selectedICD10RVSDiagnosis;
var selectedCausesOfConfinement;
var selectedMembership;
var selectedOPDWalkin;
var icd10_table = null;
var slcode_table = null;
var doctors_table = null;
var nurses_table = null;
var rooms_table = null;
var membership_table = null;
var opdwalkin_table = null;
var diagnosis_table = null;
var pxmasterlist_table = null;
var admittedpx_table = null;
var confinecause_table = null;
var comanage_table = null;
var quickadmittedpx_table = null;
var diagicd10rvs_table = null;
var counterfortble = 1;
var counterfortext = 0;
var counterfortbleadmedt = 1;
var counterfortextadmedt = 1;
var counterfortblehmoadmedt = 1;
var counterfortexthmoadmedt = 1;
var counterforhmo = 1;
var counterfortblecauses = 1;
var counterfortextcauses = 1;
var counterfortblecausesadmedt = 1;
var counterfortextcausesadmedt = 1;
var comanagecreateboxindicator = false;
var hmoinsurcreateboxindicator = false;
var causeconcreateboxindicator = false;
var addoreditadmissionindicator = "";
var fetchedPasscodeFromEmpmasterlist;
var fetchedPasscodeFromUsersrights;
var comatblrowforupdate;

var interval;

$(function ()
{
    tabsHighlightForAdmission();

    getAllOPDWalkinDataAndAddItToTheTable();
    getAllMembershipDataAndAddItToTheTable();
    getAllRoomsAndAddItToTheTable();
    getAllNursesAndAddItToTheTable();
    getAllDoctorsAndAddItToTheTable();
    getAllAdmittedPatientAndAddItToTheTable();
    getAllPatientMasterlistAndAddItToTheTable();
    getAllSLCodeAndAddItToTheTable();
    getAllDiagnosisAndAddItToTheTable();
    getAllQuickAdmittedPatientAndAddItToTheTable();
    importAdmissionTypeForAdmitPatient();
    getAllICD10AndAddItToTheTable();
    getcausesofconfinement();
    getdoctorscomanagement();
    selectOPDWalkin();
    selectSLCode();
    selectNurse();
    selectICD10();
    selectDoctor();
    selectDiagnosis();
    selectCausesConfinement();
    selectICD10RVSDiagnosis();
    selectRoom();
    selectMembership();
    selectPatientForQuickEdit();
    generateSLCode();
    generateDoctorsCode();
    generateNursesCode();
    generateRoomsCode();
    generateCasenoForAdmission();
    generatePINForAdmission();

    var type = "NONE";
    getAllDiagnosisWithICD10RVSAndAddItToTable(type);

    $('[data-toggle="tooltip"]').tooltip();

    $('#doctorimguploadbtn').click(function ()
    {
        $('#opendoctorimgupload').trigger('click');
    });

    $('.supvinputedtmas').keypress(function (e)
    {
        if (e.keyCode == 13)
            checkAuthorizationFromSupervisor();
    });

    $('.supvinputedtadm').keypress(function (e)
    {
        if (e.keyCode == 13)
            checkAuthorizationFromSupervisorForEdtAdm();
    });

    $('#inputid_oldrecrdqck').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#inputid_oldrecrd').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#inputid_oldrecrdedt').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#inputid_spousebday').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#inputid_spousebdayedt').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#inputid_birthday').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#inputid_lmpdateadm').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#inputid_birthdayedt').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#watcherbirthadm').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#inputid_spousebirthadm').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });
    
    $('#inputid_startcomanagement').bootstrapMaterialDatePicker
    ({
        format: 'MMMM DD, YYYY',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick: true
    });

    $('#patientselectbutton').click(function ()
    {
        $('#pinreferenceadd').val(selectedPatientData[2]);
        $('#sldescriptionadd').val(selectedPatientData[1]);
        $('#sladdressadd').val(selectedPatientData[8]);
        $('#pinadd').val(selectedPatientData[9]);
        hidePatientMasterlistModal();
    });

    comanage_table = $('#comanagement-masterlist-table').DataTable();
    $('#comanagement-masterlist-table tbody').on('click', '.btn-com-adm-add-delete', function ()
    {
        
        var comdeletebtn = this;
        var tbldataarr = comanage_table.row($(comdeletebtn).parents('tr')).data();
        var textboxid = tbldataarr[7];
        var sortingno = tbldataarr[8];

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

                                comanage_table.row($(comdeletebtn).parents('tr')).remove().draw(false);

                                $('#myFormComanageAdmitAdd').empty();

                                var rownum = $('#comanagement-masterlist-table').DataTable().rows().count();

                                for (var i = 0; i < rownum; i++)
                                {
                                    var counter = parseInt(i) + 1;

                                    var rowanddata = comanage_table.row(i).data();

                                    comanage_table.row(i).data
                                            ([
                                                "<button class='btn btn-sm btn-warning waves-effect btn-com-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                         <button class='btn btn-sm btn-danger waves-effect btn-com-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                                                rowanddata[1],
                                                rowanddata[2],
                                                rowanddata[3],
                                                rowanddata[4],
                                                rowanddata[5],
                                                rowanddata[6],
                                                rowanddata[7],
                                                counter
                                            ]).order([8, 'asc']).draw();

                                    var startofser = moment(rowanddata[3]).format("YYYY-MM-DD");

                                    var comaalldata =
                                            rowanddata[2] + "|" +
                                            rowanddata[6] + "|" +
                                            rowanddata[1] + "|" +
                                            startofser + "|" +
                                            counter + "|" +
                                            rowanddata[7];

                                    textBoxCreate(comaalldata);
                                }
                            } else
                            {
                                swal("Error", "Error in saving. Please try again!", "error");
                            }
                        });
    });

    comanage_table = $('#comanagement-masterlist-table').DataTable();
    $('#comanagement-masterlist-table tbody').on('click', '.btn-com-adm-add-update', function ()
    {
        comatblrowforupdate = this;
        var comaupdatebutton = this;

        var tbldataarr = comanage_table.row($(comaupdatebutton).parents('tr')).data();
        var managetype = tbldataarr[1];
        var doctorname = tbldataarr[2];
        var effectived = tbldataarr[3];
        var attendingx = tbldataarr[4];
        var updatedcom = tbldataarr[5];
        var doctorcode = tbldataarr[6];
        var textboxidx = tbldataarr[7];
        var sortingnum = tbldataarr[8];


        var comaalldata = managetype + "|" + doctorname + "|" +
                effectived + "|" + attendingx + "|" +
                updatedcom + "|" + doctorcode + "|" +
                textboxidx + "|" + sortingnum;

        editComanageForInsertAdmission(comaalldata);
    });


    comanage_table = $('#comanagement-masterlist-table').DataTable();
    $('#comanagement-masterlist-table tbody').on('click', '.btn-adm-edt', function ()
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
                            } else
                            {
                                swal("Error", "Error in saving. Please try again!", "error");
                            }
                        });
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

    $('#guardiannumadm').bind('keypress keyup blur', function ()
    {
        $('#billingrecipientadm').val($(this).val());
    });
});

function getAllAdmittedPatientAndAddItToTheTable()
{
    admittedpx_table = $('#admitted-patients-masterlist-table').DataTable
            ({
                responsive: true,
                processing: true,
                serverSide: true,
                order: [],
                language:
                        {
                            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"

                        },
                ajax:
                        {
                            url: BASE_URL + 'Admission/GetAllAdmittedPatients',
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

//    $('#admitted-patients-masterlist-table').tooltip({selector: '[data-toggle="tooltip"]'});
}

function getAllPatientMasterlistAndAddItToTheTable()
{
    pxmasterlist_table = $('#search-allpatient-table').DataTable
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
                            url: BASE_URL + 'Admission/GetAllPatientFromMasterlist',
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

function checkFieldValidations(resultError, errorfield, field)
{
    if (resultError != '') { //If has error
        $('#' + errorfield).empty();
        $('#' + errorfield).append(resultError).removeAttr('hidden');
        $('#' + field).css('border-color', 'red');
    } else { //if no errors
        $('#' + errorfield).attr('hidden', true);
        $('#' + field).removeAttr('style');
    }
}

function showNewAdmissionModal()
{
    $('#newadmissionmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
    
    $('#typicalid').tab('show');
    $('#quickortypicaladmissionindicator').val('TYP');

//    pxmasterlist_table.ajax.reload();
//    $('#search-allpatient-table_filter [type="search"]').val("");
//    $('#search-allpatient-table_filter [type="search"]').focus();
//    pxmasterlist_table.search("").draw();
//
//    pxmasterlist_table.on('selectstart', 'tr', function (event)
//    {
//        event.preventDefault();
//    });

//    pxmasterlist_table.on('dblclick', 'tr', function ()
//    {
//        var data = pxmasterlist_table.row(this).data();
//        var pinnum = data[2];
//        showQuickEditModal(pinnum);
//    });
}

function showQuickEditModal(PIN)
{

    $('#quickdataeditmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#newadmissionmodal').modal("hide");
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
                    if (oldrecord === "0")
                    {
                        $('#inputid_oldrecrdqck').prop('disabled', true);
                        $('#oldrecordswitchvalueindicatorqck').val("OFF");
                        $('#oldrecordchkboxqck').prop('checked', false);
                    } else
                    {
                        $('#inputid_oldrecrdqck').prop('disabled', false);
                        $('#oldrecordswitchvalueindicatorqck').val("ON");
                        $('#oldrecordchkboxqck').prop('checked', true);
                    }

                    var hrnverify = data.patientlistdata['HRNverified'];
                    if (hrnverify === "0")
                    {
                        $('#healthrecnumswitchvalueindicatorqck').val("NO");
                        $('#healthrecnumchkboxqck').prop('checked', false);
                    } else
                    {
                        $('#healthrecnumswitchvalueindicatorqck').val("YES");
                        $('#healthrecnumchkboxqck').prop('checked', true);
                    }
                }
            });
}

function hideQuickEditModal()
{
    $('#quickdataeditmodal').modal("hide");

    $('#newadmissionmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#newadmissionmodal').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
}

function selectPatientForQuickEdit()
{
    var data;

    $('#search-allpatient-table tbody').on('click', 'tr', function ()
    {
        $('#search-allpatient-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#search-allpatient-table').DataTable().row('.bg-grey').data();
        selectedPatientForQuickEdit = data;
    });
}

function hideNewAdmissionModal()
{
    $('#newadmissionmodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function enableDisableLastDischargedTextForQuickDataEdit()
{
    var lastdischargeswitch = $('#oldrecordswitchvalueindicatorqck').val();

    if (lastdischargeswitch === "ON")
    {
        $('#oldrecordswitchvalueindicatorqck').val("OFF");
        $('#inputid_oldrecrdqck').prop('disabled', true);
        $('#inputid_oldrecrdqck').prop('placeholder', "Old Record");
        $('#inputid_oldrecrdqck').val("");
    } else
    {
        $('#oldrecordswitchvalueindicatorqck').val("ON");
        $('#inputid_oldrecrdqck').prop('disabled', false);
        $('#inputid_oldrecrdqck').prop('placeholder', "YYYY-MM-DD");
    }
}

function enableDisableHRNisVerifiedForQuickDataEdit()
{
    var hrnverifiedhiddentextbox = $('#healthrecnumswitchvalueindicatorqck').val();

    if (hrnverifiedhiddentextbox === "YES")
    {
        $('#healthrecnumswitchvalueindicatorqck').val("NO");
    } else
    {
        $('#healthrecnumswitchvalueindicatorqck').val("YES");
    }
}

//----------------------AddPatient Section------------------------------------------
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

    $('#newadmissionmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#addpatientsmodal').css('overflow-y', 'scroll');

    $('#closedbtnforaddpxs').removeClass('d-none');
    $('#closedbtnforedtpxs').addClass('d-none');
    
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
    
    $.ajax
    ({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Admission/GeneratePatientIndexno'
    })
    .done(function (result)
    {
        var recentpin = result[0].recentpin;
        var splitpinnum = recentpin.split('-');
        var plus1pinnum = parseInt(splitpinnum[1]) + 1;
        var currentyear = new Date().getFullYear();

        var currentyearstring = currentyear.toString();
        var indexnoyearstring = splitpinnum[0].toString();

        if(currentyearstring === indexnoyearstring)
        {
            $('#inputid_pxindex').val(indexnoyearstring + "-" + plus1pinnum);
        }
        else
        {
            $('#inputid_pxindex').val(currentyearstring + "-1");
        }
    });
}

function hideAddPatientModal()
{
    $('#addpatientsmodal').modal("hide");

    $('#newadmissionmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    setAddPatientModalToDefaultView();

    $('#search-patient-table').DataTable().ajax.reload();
    $('#newadmissionmodal').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
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
    } else
    {
        $("#inputid_phmember").prop('disabled', false);
        $("#inputid_phidnumb").prop('disabled', false);

        $("#inputid_phmember").val("");
        $("#inputid_phidnumb").val("");
    }
}

function enableDisableLastDischargedText()
{
    var lastdischargeswitch = $('#oldrecordswitchvalueindicator').val();

    if (lastdischargeswitch === "ON")
    {
        $('#oldrecordswitchvalueindicator').val("OFF");
        $('#inputid_oldrecrd').prop('disabled', true);
        $('#inputid_oldrecrd').prop('placeholder', "Old Record");
        $('#inputid_oldrecrd').val("");
    } else
    {
        $('#oldrecordswitchvalueindicator').val("ON");
        $('#inputid_oldrecrd').prop('disabled', false);
        $('#inputid_oldrecrd').prop('placeholder', "YYYY-MM-DD");
    }
}

function enableDisableHRNisVerified()
{
    var healthrecnumswitch = $('#healthrecnumswitchvalueindicator').val();

    if (healthrecnumswitch === "YES")
    {
        $('#healthrecnumswitchvalueindicator').val("NO");
    } else
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
    var inputid_street = $('#inputid_street').val();

    var patientfulladdress = inputid_street + " " + selectid_barangay + " " + cityvalue + ", " + provvalue;

    if (motheradrsswitch === "YES")
    {
        $('#motheradrsvalueindicator').val("NO");
        $('#inputid_mothersadrs').val("");
    } else
    {
        if (provvalue === "select" || cityvalue === "select" || selectid_barangay === "select" || inputid_street === "")
        {
            $('#motrerr').html("Complete px address first!");
            $('#inputid_mothersadrs').val("");
            $('#motheradrsvalueindicator').val("NO");
            $('#motheradrschkbox').prop('checked', false);
            $('#motheradrschkbox').prop('checked', false);
        } else
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
    var inputid_street = $('#inputid_street').val();

    var patientfulladdress = inputid_street + " " + selectid_barangay + " " + cityvalue + ", " + provvalue;

    if (fatheradrsswitch === "YES")
    {
        $('#fatheradrsvalueindicator').val("NO");
        $('#inputid_fathersadrs').val("");
    } else
    {
        if (provvalue === "select" || cityvalue === "select" || selectid_barangay === "select" || inputid_street === "")
        {
            $('#fatrerr').html("Complete px address first!");
            $('#inputid_fathersadrs').val("");
            $('#fatheradrsvalueindicator').val("NO");
            $('#fatheradrschkbox').prop('checked', false);
            $('#fatheradrschkbox').prop('checked', false);
        } else
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
    var inputid_street = $('#inputid_streetedt').val();

    var patientfulladdress = inputid_street + " " + selectid_barangay + " " + cityvalue + ", " + provvalue;

    if (motheradrsswitch === "YES")
    {
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");
    } else
    {
        if (provvalue === "select" || cityvalue === "select" || selectid_barangay === "select" || inputid_street === "")
        {
            $('#motrerredt').html("Complete px address first!");
            $('#inputid_mothersadrsedt').val("");
            $('#motheradrsvalueindicatoredt').val("NO");
            $('#motheradrschkboxedt').prop('checked', false);
            $('#motheradrschkboxedt').prop('checked', false);
        } else
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
    var inputid_street = $('#inputid_streetedt').val();

    var patientfulladdress = inputid_street + " " + selectid_barangay + " " + cityvalue + ", " + provvalue;

    if (fatheradrsswitch === "YES")
    {
        $('#fatheradrsvalueindicatoredt').val("NO");
        $('#inputid_fathersadrsedt').val("");
    } else
    {
        if (provvalue === "select" || cityvalue === "select" || selectid_barangay === "select" || inputid_street === "")
        {
            $('#fatrerredt').html("Complete px address first!");
            $('#inputid_fathersadrsedt').val("");
            $('#fatheradrsvalueindicatoredt').val("NO");
            $('#fatheradrschkboxedt').prop('checked', false);
            $('#fatheradrschkboxedt').prop('checked', false);
        } else
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

    if (lastdischargeswitch === "ON")
    {
        $('#oldrecordswitchvalueindicatoredt').val("OFF");
        $('#inputid_oldrecrdedt').prop('disabled', true);
        $('#inputid_oldrecrdedt').prop('placeholder', "Old Record");
        $('#inputid_oldrecrdedt').val("");
    } else
    {
        $('#oldrecordswitchvalueindicatoredt').val("ON");
        $('#inputid_oldrecrdedt').prop('disabled', false);
        $('#inputid_oldrecrdedt').prop('placeholder', "YYYY-MM-DD");
    }
}

function enableDisableArchivedPatientTextforEdtPx()
{
    var archivedswitch = $('#inputid_archiveedt').val();

    if (archivedswitch === "ARCHIVED")
    {
        $('#inputid_archiveedt').val("NONE");
    } else
    {
        $('#inputid_archiveedt').val("ARCHIVED");
    }
}

function enableDisableArchivedPatientText()
{
    var archivedswitch = $('#inputid_archive').val();

    if (archivedswitch === "ARCHIVED")
    {
        $('#inputid_archive').val("NONE");
    } else
    {
        $('#inputid_archive').val("ARCHIVED");
    }
}

function validateAddPatientForm()
{
    var error = 0;
    var general = 0;
    var profile = 0;
    var account = 0;
    var others = 0;


//    var tax = $("#inputid_tinnum").val();
//    if (tax === "")
//    {
//        $("#taxerr").text("Required Field!");
//        error++;
//        account++;
//    } else
//    {
//        $("#taxerr").text("");
//    }

//    var hrn = $("#inputid_healthrecno").val();
//    if (hrn === "")
//    {
//        $("#hrnerr").text("Required Field!");
//        error++;
//        account++;
//    } else
//    {
//        $("#hrnerr").text("");
//    }

//    var slc = $("#inputid_slcode").val();
//    if (slc === "")
//    {
//        $("#slcerr").text("Required Field!");
//        error++;
//        account++;
//    } else
//    {
//        $("#slcerr").text("");
//    }

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
    } else
    {
        $("#proverr").text("");
    }


    var city = $("#selectid_citymuni").val();
    if (city === "select")
    {
        $("#cityerr").text("Required Field!");
        error++;
        profile++;
    } else
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
    } else
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

//    var motr = $("#inputid_mothersadrs").val();
//    if (motr === "")
//    {
//        $("#motrerr").text("Required Field!");
//        error++;
//        others++;
//    } else
//    {
//        $("#motrerr").text("");
//    }
//
//
//    var fatr = $("#inputid_fathersadrs").val();
//    if (fatr === "")
//    {
//        $("#fatrerr").text("Required Field!");
//        error++;
//        others++;
//    } else
//    {
//        $("#fatrerr").text("");
//    }


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


//    var phmem = $("#selectid_phmembership").val();
//    if (phmem === "Select from List")
//    {
//        $("#phmemerr").text("Required Field!");
//        error++;
//        account++;
//    } else
//    {
//        $("#phmemerr").text("");
//    }

    if (others > 0)
    {
        $("#anchorid_forotherstabadd").tab('show');
        $("#otherserrtabindicatoradd").html("*");
    } else
    {
        $("#otherserrtabindicatoradd").html("");
    }

    if (account > 0)
    {
        $("#anchorid_foraccounttabadd").tab('show');
        $("#accounterrtabindicatoradd").html("*");
    } else
    {
        $("#accounterrtabindicatoradd").html("");
    }

    if (profile > 0)
    {
        $("#anchorid_forprofiletabadd").tab('show');
        $("#profileerrtabindicatoradd").html("*");
    } else
    {
        $("#profileerrtabindicatoradd").html("");
    }

    if (general > 0)
    {
        $("#anchorid_forgeneraltabadd").tab('show');
        $("#generalerrtabindicatoradd").html("*");
    } else
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
                } else
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
                        $.ajax
                        ({
                            type: 'POST',
                            dataType: 'json',
                            url: BASE_URL + 'Admission/GeneratePatientIndexno'
                        })
                        .done(function (result)
                        {
                            var recentpin = result[0].recentpin;
                            var splitpinnum = recentpin.split('-');
                            var plus1pinnum = parseInt(splitpinnum[1]) + 1;
                            var currentyear = new Date().getFullYear();

                            var currentyearstring = currentyear.toString();
                            var indexnoyearstring = splitpinnum[0].toString();

                            if(currentyearstring === indexnoyearstring)
                            {
                                $('#inputid_pxindex').val(indexnoyearstring + "-" + plus1pinnum);
                            }
                            else
                            {
                                $('#inputid_pxindex').val(currentyearstring + "-1");
                            }
                        });

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
                } else
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
                } else
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
        addPatients();
//        $('.addPatientButton').removeAttr('disabled');
//        $('#patientimguploadforaddpx').css("border-color", "red");
//
//        swal
//                ({
//                    title: "Picture Notice!",
//                    text: "You haven't choose a photo!",
//                    type: "warning",
//                    allowOutsideClick: false
//                });
    } else
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
    swal
            ({
                title: "Please wait!",
                text: "Processing of data is still ongoing.",
                imageUrl: BASE_URL + "assets/images/loading.gif",
                imageSize: '200x200',
                showCancelButton: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false
            });

    interval = setInterval(function ()
    {
        if ($('#addpatientsmodal').hasClass('hide'))
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);


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
            $('#addpatientsmodal').modal("hide");

            setTimeout(function ()
            {
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully saved!",
                    type: "success",
                    confirmButtonText: "OK",
                    allowOutsideClick: false
                },
                function (isConfirm)
                {
                    if (isConfirm)
                    {
                        var indexno = $("#inputid_pxindex").val();
                        
                        showNewAdmissionModal();
                        
                        pxmasterlist_table.ajax.reload();
                        $('#search-allpatient-table_filter [type="search"]').val(indexno);
                        $('#search-allpatient-table_filter [type="search"]').focus();
                        pxmasterlist_table.search(indexno).draw();
                        
                        setAddPatientModalToDefaultView();
                        $('.addPatientButton').removeAttr('disabled');
                    }
                });
            }, 1000);
            
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

    $('#selectid_mothernation').selectpicker('val', "FILIPINO");
    $('#selectid_fathernation').selectpicker('val', "FILIPINO");
    $('#selectid_membership').selectpicker('val', "Select from List");
    $('#selectid_civilstatusx').selectpicker('val', "Select");
    $('#selectid_genderoption').selectpicker('val', "Select From List");
    $('#selectid_religionsele').selectpicker('val', "Select from List");
    $('#selectid_nationalityx').selectpicker('val', "FILIPINO");
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

function showEditPatientModal(id)
{
    $('#editpatientsmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#newadmissionmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#editpatientsmodal').css('overflow-y', 'scroll');

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

    interval = setInterval(function ()
    {
        if ($('#inputid_slcodeedt').val())
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);

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

                    if (data.patientlistdata['SLaccount'] === "")
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

                                    $('#inputid_slcodeedt').val('SL' + incrementSLCode);
                                });
                    } 
                    else
                    {
                        $('#inputid_slcodeedt').val(data.patientlistdata['SLaccount']);
                    }

                    $('#inputid_pxindexedt').val(data.patientlistdata['PIN']);
                    
                    var lastdischarge = moment(new Date(data.patientlistdata['lastdischdate'])).format("MMMM DD, YYYY");
                    $('#inputid_oldrecrdedt').val(lastdischarge);

                    var oldrecord = data.patientlistdata['oldrecord'];
                    if (oldrecord === "0")
                    {
                        $('#inputid_oldrecrdedt').prop('disabled', true);
                        $('#oldrecordswitchvalueindicatoredt').val("OFF");
                        $('#oldrecordchkboxedt').prop('checked', false);
                    } else
                    {
                        $('#inputid_oldrecrdedt').prop('disabled', false);
                        $('#oldrecordswitchvalueindicatoredt').val("ON");
                        $('#oldrecordchkboxedt').prop('checked', true);
                    }

                    var archived = data.patientlistdata['archived'];
                    if (archived === "0")
                    {
                        $('#inputid_archiveedt').val("NONE");
                        $('#archivechkboxedt').prop('checked', false);
                    } else
                    {
                        $('#inputid_archiveedt').val("ARCHIVED");
                        $('#archivechkboxedt').prop('checked', true);
                    }

                    var hrnverify = data.patientlistdata['HRNverified'];
                    if (hrnverify === "0")
                    {
                        $('#healthrecnumswitchvalueindicatoredt').val("NO");
                        $('#healthrecnumchkboxedt').prop('checked', false);
                    } else
                    {
                        $('#healthrecnumswitchvalueindicatoredt').val("YES");
                        $('#healthrecnumchkboxedt').prop('checked', true);
                    }

                    var cityaddsplit = data.patientlistdata['cityadd'].split("-");
                    var cityaddvalue = cityaddsplit[0];

                    var provaddsplit = data.patientlistdata['provadd'].split("-");
                    var provaddvalue = provaddsplit[0];

                    var pxaddress = data.patientlistdata['adrs'] + " " +
                            data.patientlistdata['brgy'] + " " +
                            cityaddvalue + ", " +
                            provaddvalue;

                    if (pxaddress === data.patientlistdata['motheradrs'])
                    {
                        $('#motheradrschkboxedt').prop('checked', true);
                        $('#motheradrsvalueindicatoredt').val("YES");
                    } else
                    {
                        $('#motheradrschkboxedt').prop('checked', false);
                        $('#motheradrsvalueindicatoredt').val("NO");
                    }

                    if (pxaddress === data.patientlistdata['fatheradrs'])
                    {
                        $('#fatheradrschkboxedt').prop('checked', true);
                        $('#fatheradrsvalueindicatoredt').val("YES");
                    } else
                    {
                        $('#fatheradrschkboxedt').prop('checked', false);
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
                    
                    var pxbday = moment(new Date(data.patientlistdata['bday'])).format("MMMM DD, YYYY");
                    var bdayedt = data.patientlistdata['bday'];
                    $('#pxagexforaddpatientedt').val(calculateAge(bdayedt));
                    $('#inputid_birthdayedt').val(pxbday);
                    $('#inputid_passportedt').val(data.patientlistdata['passportno']);
                    $('#inputid_zipcodexedt').val(data.patientlistdata['zipcode']);
                    $('#inputid_barangayedt').val(data.patientlistdata['brgy']);
                    $('#inputid_streetedt').val(data.patientlistdata['adrs']);
                    $('#inputid_mothersnameedt').val(data.patientlistdata['mother']);
                    $('#inputid_fathersnameedt').val(data.patientlistdata['father']);
                    $('#inputid_mothersadrsedt').val(data.patientlistdata['motheradrs']);
                    $('#inputid_fathersadrsedt').val(data.patientlistdata['fatheradrs']);
                    $('#inputid_spouseedt').val(data.patientlistdata['spouse']);

                    if (data.patientlistdata['spousebday'] === "1970-01-01")
                    {
                        $('#inputid_spousebdayedt').val("");
                    }
                    else
                    {
                        var spousebday = moment(new Date(data.patientlistdata['spousebday'])).format("MMMM DD, YYYY");
                        $('#inputid_spousebdayedt').val(spousebday);
                    }

                    if (data.patientlistdata['memberrefno'] === "" || data.patientlistdata['memberrefno'] === null)
                    {
                        $('#selectid_membershipedt').selectpicker('val', "Select from List");
                    } else
                    {
                        $('#selectid_membershipedt').selectpicker('val', data.patientlistdata['memberrefno']);
                    }

                    $('#selectid_civilstatusxedt').selectpicker('val', data.patientlistdata['civilstatus']);
                    $('#selectid_genderoptionedt').selectpicker('val', data.patientlistdata['sex']);
                    $('#selectid_religionseleedt').selectpicker('val', data.patientlistdata['religion']);
                    $('#selectid_nationalityxedt').selectpicker('val', data.patientlistdata['nationality']);

                    $('#selectid_provinceedt').selectpicker('val', data.patientlistdata['provadd'] + "-" + data.patientlistdata['provcode']);
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
                                            $('#selectid_citymuniedt').selectpicker('val', data.patientlistdata['cityadd'] + "-" + data.patientlistdata['citycode']);
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
                    
                    if(phmrmberfetch === "NON-NHIP:NHP")
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
                        $('#inputid_phmemberedt').val(data.patientlistdata['phicmembrname']);
                        $('#inputid_phidnumbedt').val(data.patientlistdata['phicno']);
                    }
                    
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
                                    src = i !== -1 ? src.substring(0, i) : src;
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


    $('#newadmissionmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#search-patient-table').DataTable().ajax.reload();
    $('#newadmissionmodal').css('overflow-y', 'scroll');
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

function enableDisableHRNisVerifiedforEdtPx()
{
    var hrnverifiedhiddentextbox = $('#healthrecnumswitchvalueindicatoredt').val();

    if (hrnverifiedhiddentextbox === "YES")
    {
        $('#healthrecnumswitchvalueindicatoredt').val("NO");
    } else
    {
        $('#healthrecnumswitchvalueindicatoredt').val("YES");
    }
}

function validateEditPatientForm()
{
    var error = 0;
    var general = 0;
    var profile = 0;
    var account = 0;
    var others = 0;

//    var tax = $("#inputid_tinnumedt").val();
//    if (tax === "")
//    {
//        $("#taxerredt").text("Required Field!");
//        error++;
//    } else
//    {
//        $("#taxerredt").text("");
//    }
//
//    var hrn = $("#inputid_healthrecnoedt").val();
//    if (hrn === "")
//    {
//        $("#hrnerredt").text("Required Field!");
//        error++;
//    } else
//    {
//        $("#hrnerredt").text("");
//    }

    var fname = $("#inputid_fnameedt").val();
    if (fname === "")
    {
        $("#fnaerredt").text("Required Field!");
        error++;
        general++;
        
    }
    else
    {
        $("#fnaerredt").text("");
    }

    var lname = $("#inputid_lnameedt").val();
    if (lname === "")
    {
        $("#lnaerredt").text("Required Field!");
        error++;
        general++;
    }
    else
    {
        $("#lnaerredt").text("");
    }

    var mname = $("#inputid_mnameedt").val();
    if (mname === "")
    {
        $("#mnaerredt").text("Required Field!");
        error++;
        general++;
    } 
    else
    {
        $("#mnaerredt").text("");
    }

    var mob = $("#inputid_mobileedt").val();
    if (mob === "")
    {
        $("#moberredt").text("Required Field!");
        error++;
        general++;
    } 
    else
    {
        $("#moberredt").text("");
    }

    var bir = $("#inputid_birthdayedt").val();
    if (bir === "")
    {
        $("#birerredt").text("Required Field!");
        error++;
        others++;
    } 
    else
    {
        $("#birerredt").text("");
    }


    var civ = $("#selectid_civilstatusxedt").val();
    if (civ === "Select from List")
    {
        $("#civerredt").text("Required Field!");
        error++;
        profile++;
    } 
    else
    {
        $("#civerredt").text("");
    }

    var gender = $("#selectid_genderoptionedt").val();
    if (gender === "Select From List")
    {
        $("#sexerredt").text("Required Field!");
        error++;
        profile++;
    }
    else
    {
        $("#sexerredt").text("");
    }

    var rel = $("#selectid_religionseleedt").val();
    if (rel === "Select From List")
    {
        $("#relerredt").text("Required Field!");
        error++;
        profile++;
    }
    else
    {
        $("#relerredt").text("");
    }

    var nat = $("#selectid_nationalityxedt").val();
    if (nat === "Select from list")
    {
        $("#naterredt").text("Required Field!");
        error++;
        profile++;
    }
    else
    {
        $("#naterredt").text("");
    }

    var prov = $("#selectid_provinceedt").val();
    if (prov === "select")
    {
        $("#proverredt").text("Required Field!");
        error++;
        profile++;
    }
    else
    {
        $("#proverredt").text("");
    }

    var city = $("#selectid_citymuniedt").val();
    if (city === "select")
    {
        $("#cityerredt").text("Required Field!");
        error++;
        profile++;
    } 
    else
    {
        $("#cityerredt").text("");
    }

    var zip = $("#inputid_zipcodexedt").val();
    if (zip === "")
    {
        $("#ziperredt").text("Required Field!");
        error++;
        profile++;
    }
    else
    {
        $("#ziperredt").text("");
    }

    var bar = $("#selectid_barangayedt").val();
    if (bar === "select")
    {
        $("#barerredt").text("Required Field!");
        error++;
        profile++;
    } 
    else
    {
        $("#barerredt").text("");
    }

    var str = $("#inputid_streetedt").val();
    if (str === "")
    {
        $("#strerredt").text("Required Field!");
        error++;
        profile++;
    }
    else
    {
        $("#strerredt").text("");
    }

    var motn = $("#inputid_mothersnameedt").val();
    if (motn === "")
    {
        $("#motnerredt").text("Required Field!");
        error++;
        others++;
        
    }
    else
    {
        $("#motnerredt").text("");
    }

    var fatn = $("#inputid_fathersnameedt").val();
    if (fatn === "")
    {
        $("#fatnerredt").text("Required Field!");
        error++;
        others++;
    }
    else
    {
        $("#fatnerredt").text("");
    }

//    var motr = $("#inputid_mothersadrsedt").val();
//    if (motr === "")
//    {
//        $("#motrerredt").text("Required Field!");
//        error++;
//        others++;
//    }
//    else
//    {
//        $("#motrerredt").text("");
//    }
//
//    var fatr = $("#inputid_fathersadrsedt").val();
//    if (fatr === "")
//    {
//        $("#fatrerredt").text("Required Field!");
//        error++;
//        others++;
//    }
//    else
//    {
//        $("#fatrerredt").text("");
//    }

    var motnat = $("#selectid_mothernationedt").val();
    if (motnat === "")
    {
        $("#motnaterredt").text("Required Field!");
        error++;
        others++;
    } 
    else
    {
        $("#motnaterredt").text("");
    }

    var fatnat = $("#selectid_fathernationedt").val();
    if (fatnat === "")
    {
        $("#fatnaterredt").text("Required Field!");
        error++;
        others++;
    } 
    else
    {
        $("#fatnaterredt").text("");
    }
    
    if (others > 0)
    {
        $("#anchorid_forotherstabedt").tab('show');
        $("#otherserrtabindicatoredt").html("*");
    } 
    else
    {
        $("#otherserrtabindicatoredt").html("");
    }

    if (account > 0)
    {
        $("#anchorid_foraccounttabedt").tab('show');
        $("#accounterrtabindicatoredt").html("*");
    }
    else
    {
        $("#accounterrtabindicatoredt").html("");
    }

    if (profile > 0)
    {
        $("#anchorid_forprofiletabedt").tab('show');
        $("#profileerrtabindicatoredt").html("*");
    }
    else
    {
        $("#profileerrtabindicatoredt").html("");
    }

    if (general > 0)
    {
        $("#anchorid_forgeneraltabedt").tab('show');
        $("#generalerrtabindicatoredt").html("*");
    }
    else
    {
        $("#generalerrtabindicatoredt").html("");
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
    } else
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

    $('#checkAuthorizationButtonForEdtMas').prop('disabled', false);
}

function checkAuthorizationFromSupervisor()
{
    $('#checkAuthorizationButtonForEdtMas').prop('disabled', true);

    swal
            ({
                title: "Please wait!",
                text: "Processing of data is still ongoing.",
                imageUrl: BASE_URL + "assets/images/loading.gif",
                imageSize: '200x200',
                showCancelButton: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false
            });

    interval = setInterval(function ()
    {
        if ($('#supervisorpermitmodal').hasClass('hide'))
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);

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

                    var suprvidtrimptag = supervisorid.replace(/<[\/]{0,1}(p)[^><]*>/ig, "");
                    var suprasstrimptag = supervpasswd.replace(/<[\/]{0,1}(p)[^><]*>/ig, "");

                    if (supervisorid.toString() !== '')
                    {
                        $('#suprvisoriderror').html(suprvidtrimptag.toString());
                        $('#suprvisoriderror').removeClass('d-none');
                    } else
                    {
                        swal.close();

                        $('#accounterror').html("");
                        $('#accounterror').addClass('d-none');

                        $('#suprvisoriderror').html("");
                        $('#suprvisoriderror').addClass('d-none');
                    }

                    if (supervpasswd.toString() !== '')
                    {
                        $('#suppassworderror').html(suprasstrimptag.toString());
                        $('#suppassworderror').removeClass('d-none');
                    } else
                    {
                        swal.close();

                        $('#accounterror').html("");
                        $('#accounterror').addClass('d-none');

                        $('#suppassworderror').html("");
                        $('#suppassworderror').addClass('d-none');
                    }

                    $('#checkAuthorizationButtonForEdtMas').prop('disabled', false);
                    swal.close();
                }

                if (result.status)
                {
                    $('#checkAuthorizationButtonForEdtMas').prop('disabled', true);

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
                    swal.close();

                    $('#suprvisoriderror').html("");
                    $('#suprvisoriderror').addClass('d-none');

                    $('#suppassworderror').html("");
                    $('#suppassworderror').addClass('d-none');

                    $('#accounterror').html("Account does not exists!");
                    $('#accounterror').removeClass('d-none');

                    $('#checkAuthorizationButtonForEdtMas').prop('disabled', false);
                } else
                {
                    if (result.error_head)
                    {

                        $('#suprvisoriderror').html("");
                        $('#suprvisoriderror').addClass('d-none');

                        $('#suppassworderror').html("");
                        $('#suppassworderror').addClass('d-none');

                        $('#accounterror').html("Wrong supervisor account!");
                        $('#accounterror').removeClass('d-none');

                        swal.close();

                        $('#checkAuthorizationButtonForEdtMas').prop('disabled', false);
                    } else
                    {
                        if (result.error_access)
                        {
                            swal.close();

                            $('#accounterror').html("Access Denied!");
                            $('#accounterror').removeClass('d-none');

                            $('#suprvisoriderror').html("");
                            $('#suprvisoriderror').addClass('d-none');

                            $('#suppassworderror').html("");
                            $('#suppassworderror').addClass('d-none');

                            $('#checkAuthorizationButtonForEdtMas').prop('disabled', false);
                        } else
                        {
                            if (result.error_pass)
                            {
                                swal.close();

                                $('#accounterror').html("Incorrect Username or Password!");
                                $('#accounterror').removeClass('d-none');

                                $('#suprvisoriderror').html("");
                                $('#suprvisoriderror').addClass('d-none');

                                $('#suppassworderror').html("");
                                $('#suppassworderror').addClass('d-none');

                                $('#checkAuthorizationButtonForEdtMas').prop('disabled', false);
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
                } else
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
    } else
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
                        showNewAdmissionModal();

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
                                            $('#search-allpatient-table_filter [type="search"]').val(indexno);
                                            $('#search-allpatient-table_filter [type="search"]').focus();
                                            pxmasterlist_table.search(indexno).draw();
                                        });

                        $('.editPatientButton').removeAttr('disabled');

                        $('#suprvisorid').val("");
                        $('#suppassword').val("");
                        $('#logbooksup').val("");

                        $('#checkAuthorizationButtonForEdtMas').prop('disabled', false);

                        $("#anchorid_forgeneraltabedt").tab('show');
                        setAddPatientModalToDefaultView();
                    }
            );
}

function checkDuplicateForAdmitPatient(idandpinumber)
{
    var pinandidsplit = idandpinumber.split(",");
    var id = pinandidsplit[0];
    var pin = pinandidsplit[1];

    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getPatientlistDataForCheckDuplicateOfAdmitPatient",
                data: {pinx: pin},
                dataType: 'json'
            })

            .done
            (
                    function (data)
                    {
                        if (data.status)
                        {
                            var quickadmitval = data.inpatientlist['Quikadmit'];

                            if (quickadmitval === "1")
                            {
                                swal
                                        ({
                                            title: "Duplicate Notice!",
                                            text: "Patient is currently admitted \nthrough quick admission!",
                                            type: "warning",
                                            allowOutsideClick: false,
                                            confirmButtonText: "OK"
                                        });
                            } else
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
                        } else
                        {
                            showAdmitPatientModal(id);
//                            getAdmissionType();
                        }
                    }
            );
}

function showAdmitPatientModal(id)
{
    setToDefaultAllFieldsOfAdmitPatientModal();

    $('#admitpatientmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#newadmissionmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#admitpatientmodal').css('overflow-y', 'scroll');

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

    interval = setInterval(function ()
    {
        if ($('#pxindexnoadm').val() !== "" && $('#inputid_slcodeadm').val() !== "")
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);

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
    $("#vips").css('background', '');

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
    $("#VisualInfusionCollapse").collapse('hide');

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

    $('#opdtypebutton').prop('disabled', true);

    $('#selectid_entrytypeadm').prop('disabled', true);
    $('#selectid_entrytypeadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
    $('#selectid_entrytypeadm').selectpicker('val', 'Disabled');
    $('#selectid_entrytypeadm').selectpicker('refresh');

    $('#admissiontypehiddentext').val('Normal');
    $('#inputid_pathologyadm').val('NON-PATHOLOGY');
    $('#textboxid_forminororadm').val(0);

    $('#editadmitPatientButton').addClass('d-none');
    $('#editquickadmitPatientButton').addClass('d-none');
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

    $('#buttonid_indirectcancelbutton').removeClass("d-none");
    $('#buttonid_directcancelbutton').addClass("d-none");

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

    $("#AddPackageForm").removeClass('d-none');

    $('#textid_deleteindicatorforpxpkgupdateadmedt').val("");
    $('#textid_updateindicatorforpxpkgupdateadmedt').val("");

    $("#addNewVIPButtonForAdmissionInsert").removeClass('d-none');
    $("#edtOldVIPButtonForAdmissionUpdate").addClass('d-none');

    hideShowPatientClass();
    hideShowPatientType();
    
    var randompickno = randomInteger(1, 9);
    var datetimetext = moment().format("MMDDYYYYHHmmss");
    
    var generatedcasecode = "CN" + datetimetext + randompickno;
    $("#hiddeninputid_casecodexadm").val(generatedcasecode);

    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getPatientlistDataForAdmitPatient",
                data: {idex: id},
                dataType: 'json'
            })

            .done(function (data)
            {
                console.log(data);

                if (data.status)
                {
                    var imagepath = BASE_URL + 'assets/images/uploads/patients/' + data.adpin['PIN'] + 'p.jpg';
                    var imgdefaul = BASE_URL + 'assets/images/uploads/patients/' + 'default.png';

                    $.ajax
                    ({
                        url: imagepath,
                        type: 'HEAD',
                        error: function ()
                        {
                            var img = $('#patientimguploadforadmpx').attr('src', imgdefaul);
                            var src = img.attr('src');
                            var i = src.indexOf('?dummy=');
                            src = i != -1 ? src.substring(0, i) : src;
                            var d = new Date();
                            img.attr('src', src + '?dummy=' + d.getTime());
                        },
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

                    $("#inputid_hiddenIDadm").val(data.adtid['id']);
                    $("#hiddenid_tindadm").val(data.adtid['tin']);
                    $('#hiddeninputid_pincodeadm').val(data.adpincode['pincode']);
                    
                    $('#hiddeninputid_tinadm').val(data.adtin['tin']);
                    $('#hiddeninputid_pinformatadm').val(data.adpinformat['pinformat']);
                    $('#hiddeninputid_lastadmitdateadm').val(data.adlastadmdate['lastadmitdate']);
                    $('#hiddeninputid_lastadmitdateadm').val(data.adlastadmtime['lastadmittime']);
                    $('#hiddeninputid_lastadmitdateadm').val(data.adlastdischdate['lastdischdate']);
                    $('#hiddeninputid_lastadmitdateadm').val(data.adlastdischtime['lastdischtime']);
                    $('#pxindexnoadm').val(data.adpin['PIN']);
                    $('#lastnameadm').val(data.adlname['lname']);
                    $('#firstnameadm').val(data.adfname['fname']);
                    $('#middlenameadm').val(data.admname['mname']);
                    $('#suffixadm').val(data.adsuffix['suffix']);
                    $('#genderadm').val(data.adsex['sex']);
                    $('#nationalityadm').val(data.adnationality['nationality']);
                    $('#mobilenoadm').val(data.admobileno['mobileno']);
                    $('#contactnoadm').val(data.adcontactno['contactno']);
                    $('#passportnoadm').val(data.adpassportno['passportno']);
                    $('#emailadm').val(data.ademail['email']);
                    $('#fatheradm').val(data.adfather['father']);
                    $('#motheradm').val(data.admother['mother']);
                    $('#fatheradrsadm').val(data.adfatheradrs['fatheradrs']);
                    $('#motheradrsadm').val(data.admotheradrs['motheradrs']);
                    $('#fathernationalityadm').val(data.adfathernationality['fathernationality']);
                    $('#mothernationalityadm').val(data.admothernationality['mothernationality']);
                    $('#zipcodexadm').val(data.adzipcode['zipcode']);
                    $('#addressadm').val(data.adadrs['adrs']);
                    $('#membershipadm').val(data.admemberrefno['memberrefno']);
                    $('#patientrecipientadm').val(data.admobileno['mobileno']);
                    $('#inputid_spousenameadm').val(data.adspouse['spouse']);

                    var spousebday = moment(data.adspousebday['spousebday']).format("MMMM DD, YYYY");
                    $('#inputid_spousebirthadm').val(spousebday);

                    if (data.admemberrefno['memberrefno'] === "SELECT FROM LIST")
                    {
                        $('#inputid_vmembershipadm').val("");
                    } else
                    {
                        $('#inputid_vmembershipadm').val(data.admemberrefno['memberrefno']);
                    }

                    $('#religionselectadm').selectpicker('val', data.adreligion['religion']);
                    $('#civilstatusselectadm').selectpicker('val', data.adcivilstatus['civilstatus']);

                    $('#provinceselectadm').selectpicker('val', data.adprovadd['provadd'] + "-" + data.adprovadd['provcode']);
                    $('#citydivadm').removeClass('d-none');
                    $('#zipcodedivadm').removeClass('d-none');
                    $('#brgydivadm').removeClass('d-none');
                    $('#purokdivadm').removeClass('d-none');

                    var slaccountx = data.adslaccount['SLaccount'];
                    if (slaccountx === "" || slaccountx === null)
                    {
                        generateSLCodeForAdmission();
                    }
                    else
                    {
                        $("#inputid_slcodeadm").val(slaccountx);
                        $('#hiddeninputid_slcodeadm').val(slaccountx);
                    }

                    var provid = $("#provinceselectadm").val();
                    if (provid === null)
                    {
                        $('#provinceselectadm').selectpicker('val', "Select");

                        $('#selectidcitymuniadm').empty();
                        $('#selectidcitymuniadm').append('<option value="Select">' + "Select from List" + '</option>');
                        $('#selectidcitymuniadm').selectpicker('val', "Select");

                        $('#selectid_barangayadm').empty();
                        $('#selectid_barangayadm').append('<option value="Select">' + "Select from List" + '</option>');
                        $('#selectid_barangayadm').selectpicker('val', "Select");

                        $('#zipcodexadm').val("");
                        $('#addressadm').val("");

                        $('#selectidcitymuniadm').prop('disabled', true);
                        $('#selectid_barangayadm').prop('disabled', true);
                        $('#addressadm').prop('disabled', true);

                        $('#provinceselectadm').selectpicker('refresh');
                        $('#selectidcitymuniadm').selectpicker('refresh');
                        $('#selectid_barangayadm').selectpicker('refresh');
                    } else
                    {
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
                                            url: BASE_URL + "Admission/getPatientlistDataForAdmitPatient",
                                            data: {idex: id},
                                            dataType: 'json'
                                        })
                                        .done(function (data)
                                        {
                                            $('#selectidcitymuniadm').selectpicker('val', data.adcityadd['cityadd'] + "-" + data.adcityadd['citycode']);
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
                                                                    url: BASE_URL + "Admission/getPatientlistDataForAdmitPatient",
                                                                    data: {idex: id},
                                                                    dataType: 'json'
                                                                })
                                                                .done(function (data)
                                                                {
                                                                    $('#selectid_barangayadm').selectpicker('val', data.adbrgy['brgy']);
                                                                    $('#selectid_barangayadm').selectpicker('refresh');
                                                                });
                                                    });
                                        });
                            });
                    }

                    $('#phmembershipselectadm').selectpicker('val', data.adphicmembr['phicmembr'] + ":" + data.adphiccode['phiccode']);

                    var phictype = data.adphicmembr['phicmembr'] + ":" + data.adphiccode['phiccode'];
                    if
                            (
                                    phictype === "GOVERNMENT DEPENDENT:GDE" ||
                                    phictype === "PRIVATE DEPENDENT:PDE" ||
                                    phictype === "SELF-EMPLOYED DEPENDENT:SDI" ||
                                    phictype === "OFW DEPENDENT:OFD" ||
                                    phictype === "OTHERS DEPENDENT:OTD" ||
                                    phictype === "INDIGENT DEPENDENT:IDI" ||
                                    phictype === "LGU/PVT SPONSORED DEPENDENT:LGD" ||
                                    phictype === "PENSIONER/RETIREE DEPENDENT:PRD"
                            )
                    {
                        $('#phmembernameadm').val(data.adphicmembrname['phicmembrname']);
                        $('#phmembernameadm').prop("disabled", false);
                        $('#reltomemberadm').prop("disabled", false);
                        $('#reltomemberadm').selectpicker("val", "Select");
                        $('#reltomemberadm').selectpicker("refresh");
                        $('#inputid_mdfrefnumadm').val("");
                        $('#inputid_mdfrefnumadm').prop("disabled", false);
                        $('#phicnumberadm').val(data.adphicno['phicno']);
                        $('#phicnumberadm').prop("disabled", false);
                    }
                    else if (phictype === "NON-NHIP:NHP" || phictype === "Select")
                    {
                        $('#phmembernameadm').val("");
                        $('#phmembernameadm').prop("disabled", true);
                        $('#reltomemberadm').prop("disabled", true);
                        $('#reltomemberadm').selectpicker("val", "Select");
                        $('#reltomemberadm').selectpicker("refresh");
                        $('#inputid_mdfrefnumadm').val("");
                        $('#inputid_mdfrefnumadm').prop("disabled", true);
                        $('#phicnumberadm').val("");
                        $('#phicnumberadm').prop("disabled", true);
                    } else
                    {
                        $('#phmembernameadm').val(data.adphicmembrname['phicmembrname']);
                        $('#phmembernameadm').prop("disabled", false);
                        $('#reltomemberadm').prop("disabled", true);
                        $('#reltomemberadm').selectpicker("val", "Select");
                        $('#reltomemberadm').selectpicker("refresh");
                        $('#inputid_mdfrefnumadm').val("");
                        $('#inputid_mdfrefnumadm').prop("disabled", false);
                        $('#phicnumberadm').val(data.adphicno['phicno']);
                        $('#phicnumberadm').prop("disabled", false);
                    }

                    var fetchbday = moment(data.adbday['bday']).format("MMMM DD, YYYY");
                    $('#birthdayadm').val(fetchbday);
                    
                    var age = calculateAge(data.adbday['bday']);
                    $("#inputid_ageadm").val(age);
//                    
//                    var birthdate = new Date(bday.val());
//                    var todaydate = new Date();
//                    var age = Math.floor((todaydate - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
                    

                    pinCodeForHMO = data.adpincode['pincode'];
                    caseCodeForHMO = data.adcasecode['casecode'];
                    caseCodeForHMO = data.adpxtype['pxtype'];
                } else
                {
                    console.log('fail');
                }
            });
}

function hideAdmitPatientModal()
{
    swal
    ({
        title: "Are you sure you want to exit?",
        text: "You will not be able to recover inserted data of admission form!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, pls. proceed!",
        cancelButtonText: "No, Pls. cancel",
        closeOnConfirm: true
    },
    function (isConfirm)
    {
        if (isConfirm)
        {
            $('#admitpatientmodal').modal("hide");
            $('#newadmissionmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

            $('#search-patient-table').DataTable().ajax.reload();
            $('#newadmissionmodal').css('overflow-y', 'scroll');
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
            $('#radioid_normaltypeadm').prop('checked', true);
            $('#radioid_emergencytypeadm').prop('checked', false);
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
            $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
            $('#inputid_obgyneprocedureadm').selectpicker('refresh');
            $('#inputid_obgyneprocedureadmerr').html("");

            $('#inputid_adultpediaadm').prop('disabled', true);
            $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
            $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
            $('#inputid_adultpediaadm').selectpicker('refresh');
            $('#inputid_adultpediaadmerr').html("");

            if ($('#pathologychkboxidadm').is(':checked'))
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
            $('#chckboxid_forminororadm').prop('checked', false);
            $('#textboxid_forminororadm').val(0);
            $('#admittingdiagnosisadm').val("");
            $('#dietaryadm').val("");
            
            setToDefaultAllFieldsOfAdmitPatientModal();
        } 
        else
        {
            swal("Error", "Error in saving. Please try again!", "error");
        }
    });
}

function hideShowPatientType()
{
    var patienttype = $("#selectid_patienttypeadm").val();

    if (patienttype === "IPD")
    {
        $('#buttonid_linkacctadm').prop("disabled", false);
        
        $('#textid_reasontext').html("Reason of Admission");
        $('#textid_admitdiagtext').html("Admitting Diagnosis");
        $('#textid_minorortext').html("For Minor OR");
        $('#chckboxid_forminororadm').prop("disabled", false);
        $('#textid_causeconfine').html("Causes of Confinement");

        $('#inputid_opdtypexdataadm').prop('disabled', true);
        $('#opdtypebutton').prop('disabled', true);

        $('#stationnameadm').prop('disabled', false);
        $('#stationnameadm').selectpicker('refresh');

        $("#inputid_opdtypeadmerr").html("");
        $("#inputid_entrytypeadmerr").html("");

        $("#inputid_opdtypexdataadm").val("IPDPX");
        $("#hiddenid_opdtypeadm").val("IPDPX");
        $("#radioid_emergencyadm").prop("checked", false);
        $("#radioid_checkupopdadm").prop("checked", false);
        $("#radioid_outsideadm").prop("checked", false);

        $('#dietopd').addClass('d-none');
        $('#diet').removeClass('d-none');

        $('#ImpressionOPDCollapse').addClass('d-none');
        $('#DietaryIPDCollapse').removeClass('d-none');

        $('#selectid_entrytypeadm').prop('disabled', true);
        $('#selectid_entrytypeadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
        $('#selectid_entrytypeadm').selectpicker('val', 'Disabled');
        $('#selectid_entrytypeadm').selectpicker('refresh');
        $('#selectid_entrytypeadmerr').html("");

        //        $('#selectid_entrytypeadm').prop('disabled', true);
//        $('#selectid_entrytypeadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
//        $('#selectid_entrytypeadm').selectpicker('val', 'Disabled');
//        $('#selectid_entrytypeadm').selectpicker('refresh');
//        $('#selectid_entrytypeadmerr').html("");

//        importAdmissionTypeForAdmitPatient();
//        $('#admixontypeselectadm').html("");

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
        $('#reltopatientadm').selectpicker('val', 'Select');
        $('#reltopatientadm').selectpicker('refresh');
        $('#reltopatientadmerr').html('');

        $("#inputid_tbdotsstatusadm").prop('disabled', false);
        $("#inputid_tbdotsstatusadm option[value='Disabled']").remove();
        $('#inputid_tbdotsstatusadm').selectpicker('val', 'Select');
        $('#inputid_tbdotsstatusadm').selectpicker('refresh');
        $('#inputid_tbdotsstatusadmerr').html('');

        $('#cautionsadm').prop('disabled', false);
        $("#cautionsadm option[value='Disabled']").remove();
        $('#cautionsadm').selectpicker('val', 'Select');
        $('#cautionsadm').selectpicker('refresh');
        $('#cautionsadmerr').html('');

        $('#nurseinchargeadm').prop('disabled', false);
        $("#nurseinchargeadm option[value='Disabled']").remove();
        $('#nurseinchargeadm').selectpicker('val', 'Select');
        $('#nurseinchargeadm').selectpicker('refresh');
        $('#nurseinchargeadmerr').html('');

        $('#radioid_normaltypeadm').prop('disabled', false);
        $('#radioid_normaltypeadm').prop('checked', true);
        $('#radioid_emergencytypeadm').prop('disabled', false);

        $('#admissiontypehiddentext').val('Normal');

        $('#disableforopdindicator').html('');
    } else
    {
        $('#buttonid_linkacctadm').prop("disabled", true);
        
        $('#textid_reasontext').html("Complaints");
        $('#textid_admitdiagtext').html("Reason of OPD Consultation");
        $('#textid_minorortext').html("Disabled for OPD");
        $('#chckboxid_forminororadm').prop("disabled", true);
        $('#textid_causeconfine').html("OPD Consultation Category");

        $('#inputid_opdtypexdataadm').prop('disabled', false);
        $('#opdtypebutton').prop('disabled', false);

        $("#stationnameadm").selectpicker("val", "Select");
        $('#stationnameadm').prop('disabled', true);
        $('#stationnameadm').selectpicker('refresh');

        $("#stationnameadmerr").html("");

        $('#dietopd').removeClass('d-none');
        $('#diet').addClass('d-none');

        $('#ImpressionOPDCollapse').removeClass('d-none');
        $('#DietaryIPDCollapse').addClass('d-none');

        $('#selectid_entrytypeadm').prop('disabled', false);
        $("#selectid_entrytypeadm option[value='Disabled']").remove();
        $('#selectid_entrytypeadm').selectpicker('val', 'Select');
        $('#selectid_entrytypeadm').selectpicker('refresh');
        $('#selectid_entrytypeadmerr').html("");

//        importAdmissionTypeForAdmitPatient();
//        $('#admixontypeselectadm').selectpicker('val', 'Select');
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
        $('#reltopatientadm').selectpicker('val', 'Disabled');
        $('#reltopatientadm').selectpicker('refresh');
        $('#reltopatientadmerr').html('');


        $("#inputid_tbdotsstatusadm").prop('disabled', true);
        $('#inputid_tbdotsstatusadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
        $('#inputid_tbdotsstatusadm').selectpicker('val', 'Disabled');
        $('#inputid_tbdotsstatusadm').selectpicker('refresh');
        $('#inputid_tbdotsstatusadmerr').html('');

        $('#cautionsadm').prop('disabled', true);
        $('#cautionsadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
        $('#cautionsadm').selectpicker('val', 'Disabled');
        $('#cautionsadm').selectpicker('refresh');
        $('#cautionsadmerr').html('');

        $('#nurseinchargeadm').prop('disabled', true);
        $('#nurseinchargeadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
        $('#nurseinchargeadm').selectpicker('val', 'Disabled');
        $('#nurseinchargeadm').selectpicker('refresh');
        $('#nurseinchargeadmerr').html('');

        $('#guardianerrcolapseindicator').html('');
        $('#admissionerrcolapseindicator').html('');

        var attendant = $("#accomodaerrcolapseindicator").html();
        var accomodat = $("#accomodaerrcolapseindicator").html();

        if (attendant === "" && accomodat === "")
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

function showOPDTypeOprtionModal()
{
    $('#opdtypeoptionmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#opdtypeoptionmodal').css('overflow-y', 'scroll');
}

function onchangeemergencyradio()
{
    $("#hiddenid_opdtypeadm").val("EMERG");
}

function onchangecheckupradio()
{
    $("#hiddenid_opdtypeadm").val("CHKUP");
}

function onchangeotherradio()
{
    $("#hiddenid_opdtypeadm").val("OTHER");
}

function onclickDoneButtonOPDTypeSelection()
{
    var opdtypeval = $("#hiddenid_opdtypeadm").val();

    if (opdtypeval === "IPDPX")
    {
        swal("Error!", "Opps! Need to choose option for OPD type!", "error");

        $("#inputid_opdtypexdataadm").val(opdtypeval);
    } else
    {
        $("#inputid_opdtypexdataadm").val(opdtypeval);

        $('#opdtypeoptionmodal').modal("hide");
        $('#admitpatientmodal').modal
                ({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });

        $('#admitpatientmodal').css('overflow-y', 'scroll');
        $('body').css('overflow', 'hidden');

        swal
                ({
                    title: "Success!",
                    text: "OPD type selected successfully!",
                    type: "success",
                    showCancelButton: false
                },
                        function (isConfirm)
                        {
                            if (isConfirm)
                            {

                            }
                        });
    }
}

function hideShowPatientClass()
{
    var patientclass = $("#patientclassadm").val();
    if (patientclass === "GYNECOLOGY")
    {
        $("#buttonid_motheradm").prop("disabled", true);
        $("#textid_motheradm").prop("disabled", true);

        $('#motherhide').addClass("d-none");
        $('#pathologyhide').removeClass("d-none");

        $('#obprocedurehide').removeClass("d-none");
        $('#adultpediahide').addClass("d-none");

        $('#othershide').addClass("d-none");
        $('#lmpdatehide').removeClass("d-none");

        $('#paradiv').removeClass("d-none");
        $('#gravidadiv').removeClass("d-none");

        $('#radioid_admissionadm').prop("disabled", true);
        $('#radioid_admissionadm').prop("checked", false);
        $('#radioid_infacilityadm').prop("disabled", true);
        $('#radioid_infacilityadm').prop("checked", false);
        $('#hiddboxid_infalityvalueadm').val("0");

        $("#inputid_obgyneprocedureadm").prop('disabled', true);
        $('#inputid_obgyneprocedureadm').empty();
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html('');

        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
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
        $("#inputid_lmpdateadm").removeAttr('disabled');

        $("#gravidaadm").val('');
        $("#paraadm").val('');
        $("#abortionadm").val('');
        $("#iufdadm").val('');
        $("#diedadm").val('');
        $("#inputid_lmpdateadm").val('');

        $("#gravidaadmerr").html('');
        $("#paraadmerr").html('');
        $("#abortionadmerr").html('');
        $("#iufdadmerr").html('');
        $("#diedadmerr").html('');
        $("#inputid_lmpdateadm").html('');
    } else if (patientclass === "MEDICAL")
    {
        $("#buttonid_motheradm").prop("disabled", true);
        $("#textid_motheradm").prop("disabled", true);

        $('#motherhide').removeClass("d-none");
        $('#pathologyhide').addClass("d-none");

        $('#obprocedurehide').addClass("d-none");
        $('#adultpediahide').removeClass("d-none");

        $('#othershide').addClass("d-none");
        $('#lmpdatehide').removeClass("d-none");

        $('#paradiv').removeClass("d-none");
        $('#gravidadiv').removeClass("d-none");

        $('#radioid_admissionadm').prop("disabled", true);
        $('#radioid_admissionadm').prop("checked", false);
        $('#radioid_infacilityadm').prop("disabled", true);
        $('#radioid_infacilityadm').prop("checked", false);
        $('#hiddboxid_infalityvalueadm').val("0");

        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').empty();
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");

        $("#inputid_adultpediaadm").prop('disabled', false);
        $("#inputid_adultpediaadm option[value='Disabled']").remove();
        $('#inputid_adultpediaadm').selectpicker('val', 'Select');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html('');

        if ($('#pathologychkboxidadm').is(':checked'))
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

        $("#inputid_lmpdateadm").attr('disabled', true);
        $("#inputid_lmpdateadm").val("N/A");
        $("#inputid_lmpdateadm").html("");
    } else if (patientclass === "OBSTETRICS")
    {
        $("#buttonid_motheradm").prop("disabled", true);
        $("#textid_motheradm").prop("disabled", true);

        $('#motherhide').removeClass("d-none");
        $('#pathologyhide').addClass("d-none");

        $('#obprocedurehide').removeClass("d-none");
        $('#adultpediahide').addClass("d-none");

        $('#othershide').addClass("d-none");
        $('#lmpdatehide').removeClass("d-none");

        $('#paradiv').removeClass("d-none");
        $('#gravidadiv').removeClass("d-none");

        $('#radioid_admissionadm').prop("disabled", true);
        $('#radioid_admissionadm').prop("checked", false);
        $('#radioid_infacilityadm').prop("disabled", true);
        $('#radioid_infacilityadm').prop("checked", false);
        $('#hiddboxid_infalityvalueadm').val("0");

        $("#inputid_obgyneprocedureadm").prop('disabled', false);
        $('#inputid_obgyneprocedureadm').empty();
        $('#inputid_obgyneprocedureadm').append('<option value="Select">' + "Select" + '</option>');
        $('#inputid_obgyneprocedureadm').append('<option value="NORMAL">' + "NORMAL" + '</option>');
        $('#inputid_obgyneprocedureadm').append('<option value="CEASAREAN">' + "CEASAREAN" + '</option>');
        $('#inputid_obgyneprocedureadm').append('<option value="OTHERS">' + "OTHERS" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Select');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html('');

        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html("");

        if ($('#pathologychkboxidadm').is(':checked'))
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
        $("#inputid_lmpdateadm").removeAttr('disabled');

        $("#gravidaadm").val('');
        $("#paraadm").val('');
        $("#abortionadm").val('');
        $("#iufdadm").val('');
        $("#diedadm").val('');
        $("#inputid_lmpdateadm").val('');

        $("#gravidaadmerr").html('');
        $("#paraadmerr").html('');
        $("#abortionadmerr").html('');
        $("#iufdadmerr").html('');
        $("#diedadmerr").html('');
        $("#inputid_lmpdateadmerr").html('');
    } else if (patientclass === "OTHERS")
    {
        $("#buttonid_motheradm").prop("disabled", true);
        $("#textid_motheradm").prop("disabled", true);

        $('#motherhide').removeClass("d-none");
        $('#pathologyhide').addClass("d-none");

        $('#obprocedurehide').removeClass("d-none");
        $('#adultpediahide').addClass("d-none");

        $('#othershide').removeClass("d-none");
        $('#lmpdatehide').addClass("d-none");

        $('#paradiv').removeClass("d-none");
        $('#gravidadiv').removeClass("d-none");

        $('#radioid_admissionadm').prop("disabled", true);
        $('#radioid_admissionadm').prop("checked", false);
        $('#radioid_infacilityadm').prop("disabled", true);
        $('#radioid_infacilityadm').prop("checked", false);
        $('#hiddboxid_infalityvalueadm').val("0");

        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').empty();
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");

        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html("");

        if ($('#pathologychkboxidadm').is(':checked'))
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
        $("#inputid_lmpdateadm").attr('disabled', true);

        $("#gravidaadm").val("N/A");
        $("#paraadm").val("N/A");
        $("#abortionadm").val("N/A");
        $("#iufdadm").val("N/A");
        $("#diedadm").val("N/A");
        $("#inputid_lmpdateadm").val("N/A");

        $("#gravidaadmerr").html("");
        $("#paraadmerr").html("");
        $("#abortionadmerr").html("");
        $("#iufdadmerr").html("");
        $("#diedadmerr").html("");
        $("#inputid_lmpdateadmerr").html("");
    } else if (patientclass === "SURGICAL")
    {
        $("#buttonid_motheradm").prop("disabled", true);
        $("#textid_motheradm").prop("disabled", true);

        $('#motherhide').addClass("d-none");
        $('#pathologyhide').removeClass("d-none");

        $('#obprocedurehide').removeClass("d-none");
        $('#adultpediahide').addClass("d-none");

        $('#othershide').addClass("d-none");
        $('#lmpdatehide').removeClass("d-none");

        $('#paradiv').removeClass("d-none");
        $('#gravidadiv').removeClass("d-none");

        $('#radioid_admissionadm').prop("disabled", true);
        $('#radioid_admissionadm').prop("checked", false);
        $('#radioid_infacilityadm').prop("disabled", true);
        $('#radioid_infacilityadm').prop("checked", false);
        $('#hiddboxid_infalityvalueadm').val("0");

        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').empty();
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");

        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
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
        $("#inputid_lmpdateadm").attr('disabled', true);

        $("#inputid_othersadm").val("N/A");
        $("#gravidaadm").val("N/A");
        $("#paraadm").val("N/A");
        $("#abortionadm").val("N/A");
        $("#iufdadm").val("N/A");
        $("#diedadm").val("N/A");
        $("#inputid_lmpdateadm").val("N/A");

        $("#inputid_othersadmerr").html("");
        $("#gravidaadmerr").html("");
        $("#paraadmerr").html("");
        $("#abortionadmerr").html("");
        $("#iufdadmerr").html("");
        $("#diedadmerr").html("");
        $("#inputid_lmpdateadmerr").html("");
    } else if (patientclass === "NEW BORN")
    {
        $("#buttonid_motheradm").prop("disabled", true);
        $("#textid_motheradm").prop("disabled", true);

        $('#motherhide').removeClass("d-none");
        $('#pathologyhide').removeClass("d-none");

        $('#obprocedurehide').removeClass("d-none");
        $('#adultpediahide').addClass("d-none");

        $('#othershide').addClass("d-none");
        $('#lmpdatehide').removeClass("d-none");

        $('#paradiv').addClass("d-none");
        $('#gravidadiv').addClass("d-none");

        $('#radioid_admissionadm').prop("disabled", false);
        $('#radioid_admissionadm').prop("checked", false);
        $('#radioid_infacilityadm').prop("disabled", false);
        $('#radioid_infacilityadm').prop("checked", false);
        $('#hiddboxid_infalityvalueadm').val("0");

        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').empty();
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");

        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
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
        $("#inputid_lmpdateadm").attr('disabled', true);

        $("#inputid_othersadm").val("N/A");
        $("#gravidaadm").val("N/A");
        $("#paraadm").val("N/A");
        $("#abortionadm").val("N/A");
        $("#iufdadm").val("N/A");
        $("#diedadm").val("N/A");
        $("#inputid_lmpdateadm").val("N/A");

        $("#inputid_othersadmerr").html("");
        $("#gravidaadmerr").html("");
        $("#paraadmerr").html("");
        $("#abortionadmerr").html("");
        $("#iufdadmerr").html("");
        $("#diedadmerr").html("");
        $("#inputid_lmpdateadmerr").html("");
    } else if (patientclass === "STILL BIRTH")
    {
        $("#buttonid_motheradm").prop("disabled", true);
        $("#textid_motheradm").prop("disabled", true);

        $('#motherhide').removeClass("d-none");
        $('#pathologyhide').removeClass("d-none");

        $('#obprocedurehide').removeClass("d-none");
        $('#adultpediahide').addClass("d-none");

        $('#othershide').addClass("d-none");
        $('#lmpdatehide').removeClass("d-none");

        $('#paradiv').addClass("d-none");
        $('#gravidadiv').addClass("d-none");

        $('#radioid_admissionadm').prop("disabled", false);
        $('#radioid_admissionadm').prop("checked", false);
        $('#radioid_infacilityadm').prop("disabled", false);
        $('#radioid_infacilityadm').prop("checked", false);
        $('#hiddboxid_infalityvalueadm').val("0");

        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').empty();
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");

        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
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
        $("#inputid_lmpdateadm").attr('disabled', true);

        $("#inputid_othersadm").val("N/A");
        $("#gravidaadm").val("N/A");
        $("#paraadm").val("N/A");
        $("#abortionadm").val("N/A");
        $("#iufdadm").val("N/A");
        $("#diedadm").val("N/A");
        $("#inputid_lmpdateadm").val("N/A");

        $("#inputid_othersadmerr").html("");
        $("#gravidaadmerr").html("");
        $("#paraadmerr").html("");
        $("#abortionadmerr").html("");
        $("#iufdadmerr").html("");
        $("#diedadmerr").html("");
        $("#inputid_lmpdateadmerr").html("");
    } else
    {
        $("#buttonid_motheradm").prop("disabled", true);
        $("#textid_motheradm").prop("disabled", true);

        $('#motherhide').removeClass("d-none");
        $('#pathologyhide').addClass("d-none");

        $('#obprocedurehide').removeClass("d-none");
        $('#adultpediahide').addClass("d-none");

        $('#paradiv').removeClass("d-none");
        $('#gravidadiv').removeClass("d-none");

        $('#othershide').addClass("d-none");
        $('#lmpdatehide').removeClass("d-none");

        $('#radioid_admissionadm').prop("disabled", true);
        $('#radioid_admissionadm').prop("checked", false);
        $('#radioid_infacilityadm').prop("disabled", true);
        $('#radioid_infacilityadm').prop("checked", false);
        $('#hiddboxid_infalityvalueadm').val("0");

        $('#inputid_obgyneprocedureadm').prop('disabled', true);
        $('#inputid_obgyneprocedureadm').empty();
        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
        $('#inputid_obgyneprocedureadmerr').html("");

        $('#inputid_adultpediaadm').prop('disabled', true);
        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
        $('#inputid_adultpediaadm').selectpicker('refresh');
        $('#inputid_adultpediaadmerr').html("");

        if ($('#pathologychkboxidadm').is(':checked'))
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
        $("#inputid_lmpdateadm").attr('disabled', true);

        $("#inputid_othersadm").val("N/A");
        $("#gravidaadm").val("N/A");
        $("#paraadm").val("N/A");
        $("#abortionadm").val("N/A");
        $("#iufdadm").val("N/A");
        $("#diedadm").val("N/A");
        $("#inputid_lmpdateadm").val("N/A");

        $("#inputid_othersadmerr").html("");
        $("#gravidaadmerr").html("");
        $("#paraadmerr").html("");
        $("#abortionadmerr").html("");
        $("#iufdadmerr").html("");
        $("#diedadmerr").html("");
        $("#inputid_lmpdateadmerr").html("");
    }
}

function onchangeadmissioncheckbox()
{
    $("#hiddboxid_infalityvalueadm").val("0");

    $("#buttonid_motheradm").prop("disabled", true);
    $("#textid_motheradm").prop("disabled", true);

    $("#inputid_obgyneprocedureadm").prop("disabled", true);
    $('#inputid_obgyneprocedureadm').empty();
    $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
    $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
    $("#inputid_obgyneprocedureadm").selectpicker("refresh");
}


function onchangeinfacilitycheckbox()
{
    $("#hiddboxid_infalityvalueadm").val("1");

    $("#buttonid_motheradm").prop("disabled", false);
    $("#textid_motheradm").prop("disabled", false);

    $("#inputid_obgyneprocedureadm").prop("disabled", false);
    $('#inputid_obgyneprocedureadm').empty();
    $('#inputid_obgyneprocedureadm').append('<option value="Select">' + "Select" + '</option>');
    $('#inputid_obgyneprocedureadm').append('<option value="NORMAL">' + "NORMAL" + '</option>');
    $('#inputid_obgyneprocedureadm').append('<option value="CEASAREAN">' + "CEASAREAN" + '</option>');
    $('#inputid_obgyneprocedureadm').append('<option value="OTHERS">' + "OTHERS" + '</option>');
    $('#inputid_obgyneprocedureadm').selectpicker('val', 'Select');
    $("#inputid_obgyneprocedureadm").selectpicker("refresh");
}


function validateAdmitPatientForm()
{
    swal
    ({
        title: "Please wait!",
        text: "Processing of data is still ongoing.",
        imageUrl: BASE_URL + "assets/images/loading.gif",
        imageSize: '200x200',
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false
    });

    interval = setInterval(function ()
    {
        if ($('#admitpatientmodal').hasClass('hide'))
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);
    
    //------comanage------------------------------------------------------------>
    var rownumcom = $('#comanagement-masterlist-table').DataTable().rows().count();
    if (rownumcom !== 0)
    {
        var comanagement_table = $('#comanagement-masterlist-table').DataTable();
        var totalcomanage = comanagement_table.row(":last").data()[8];

        var datacomanage = '';
        for (var i = 1; i < parseInt(totalcomanage) + 1; i++)
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
    }

    //------hmo/insurance-------------------------------------------------------->
    var rownumhmo = $('#hmo-management-table').DataTable().rows().count();
    if (rownumhmo !== 0)
    {
        var hmomanagement_table = $('#hmo-management-table').DataTable();
        var totalhmo = hmomanagement_table.row(":last").data()[4];

        var datahmo = '';
        for (var cv = 1; cv < parseInt(totalhmo) + 1; cv++)
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

        var hmomanagementtable = $('#hmo-management-table').DataTable();
        var hmoname = hmomanagementtable.rows(0).data()[1];
        var hmocode = hmomanagementtable.rows(0).data()[8];
        var hmonoxx = hmomanagementtable.rows(0).data()[4];
        var holname = hmomanagementtable.rows(0).data()[7];
        var apprnum = hmomanagementtable.rows(0).data()[11];

        $('#hiddboxid_hmonameadm').val(hmoname);
        $('#hiddboxid_hmocodeadm').val(hmocode);
        $('#hiddboxid_hmoprioadm').val(hmonoxx);
        $('#hiddboxid_holnameadm').val(holname);
        $('#hiddboxid_apprnumadm').val(apprnum);
    } else
    {
        $('#hiddboxid_hmonameadm').val("");
        $('#hiddboxid_hmocodeadm').val("");
        $('#hiddboxid_hmoprioadm').val("");
        $('#hiddboxid_holnameadm').val("");
        $('#hiddboxid_apprnumadm').val("");
    }

    //------causesofconfinement------------------------------------------------->
    var rownumcause = $('#causesof-confinement-table').DataTable().rows().count();
    if (rownumcause !== 0)
    {
        var confinecause_tablex = $('#causesof-confinement-table').DataTable();
        var totalcauses = confinecause_tablex.row(":last").data()[9];

        var datacauses = '';
        for (var causescv = 1; causescv < parseInt(totalcauses) + 1; causescv++)
        {
            datacauses += "?:" + $('.category_causes' + causescv).val() + "|"
                    + $('.icddiag_causes' + causescv).val() + "|"
                    + $('.dohicd_causes' + causescv).val() + "|"
                    + $('.dohref_causes' + causescv).val() + "|"
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
    }
    //------validate admission fields-------------------------------------------->

    //------General Tab-------------------------------------------->
    var error = 0;
    var generaltab = 0;

    var healthrecnoadm = $("#healthrecnoadm").val();
    if (healthrecnoadm === "")
    {
        $("#healthrecnoadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
    {
        $("#healthrecnoadmerr").html("");
    }

    var admixontypeselectadm = $("#admixontypeselectadm").val();
    if (admixontypeselectadm === "Select" || admixontypeselectadm === null)
    {
        $("#admixontypeselectadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
    {
        $("#admixontypeselectadmerr").html("");
    }

//    var casenumberadm = $("#casenumberadm").val();
//    if (casenumberadm === "")
//    {
//        $("#casenumberadmerr").html("Required Field!");
//        error++;
//        generaltab++;
//    } else
//    {
//        $("#casenumberadmerr").html("");
//    }

    var selectid_patienttypeadm = $("#selectid_patienttypeadm").val();
    if (selectid_patienttypeadm === "IPD")
    {
        $("#inputid_opdtypeadmerr").html("");
        $("#inputid_entrytypeadmerr").html("");

        var stationnameadm = $("#stationnameadm").val();
        if (stationnameadm === "Select" || stationnameadm === null)
        {
            $("#stationnameadmerr").html("Required Field!");
            error++;
            generaltab++;
        } else
        {
            $("#stationnameadmerr").html("");
        }
    } 
    else
    {
        $("#stationnameadmerr").html("");

        var opdtypehid = $("#inputid_opdtypexdataadm").val();
        if (opdtypehid === "IPDPX")
        {
            $("#inputid_opdtypeadmerr").html("Required Field!");
            error++;
            generaltab++;
        } else
        {
            $("#inputid_opdtypeadmerr").html("");
        }

        var entrytypeadm = $("#selectid_entrytypeadm").val();
        if (entrytypeadm === "Select" || entrytypeadm === null)
        {
            $("#inputid_entrytypeadmerr").html("Required Field!");
            error++;
            generaltab++;
        } else
        {
            $("#inputid_entrytypeadmerr").html("");
        }
    }

    var selectid_patienttypeadm = $("#selectid_patienttypeadm").val();
    if (selectid_patienttypeadm === "Select" || selectid_patienttypeadm === null)
    {
        $("#selectid_patienttypeadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
    {
        $("#selectid_patienttypeadmerr").html("");
    }

    //------Profile Tab-------------------------------------------->

    var profiletab = 0;
    var contactcolapse = 0;
    var locatiocolapse = 0;

    var religionselectadm = $("#religionselectadm").val();
    if (religionselectadm === "Select" || religionselectadm === null)
    {
        $("#religionselectadmerr").html("Required Field!");
        error++;
        profiletab++;
        contactcolapse++;
    } else
    {
        $("#religionselectadmerr").html("");
    }

    var civilstatusselectadm = $("#civilstatusselectadm").val();
    if (civilstatusselectadm === "Select" || civilstatusselectadm === null)
    {
        $("#civilstatusselectadmerr").html("Required Field!");
        error++;
        profiletab++;
        contactcolapse++;
    } else
    {
        $("#civilstatusselectadmerr").html("");
    }

//    var mobilenoadm = $("#mobilenoadm").val();
//    if (mobilenoadm === "")
//    {
//        $("#mobilenoadmerr").html("Required Field!");
//        error++;
//        profiletab++;
//        contactcolapse++;
//    }
//    else
//    {
//        $("#mobilenoadmerr").html("");
//    }

//    var contactnoadm = $("#contactnoadm").val();
//    if (contactnoadm === "")
//    {
//        $("#contactnoadmerr").html("Required Field!");
//        error++;
//        profiletab++;
//        contactcolapse++;
//    }
//    else
//    {
//        $("#contactnoadmerr").html("");
//    }

    var provinceselectadm = $("#provinceselectadm").val();
    if (provinceselectadm === "Select" || provinceselectadm === null)
    {
        $("#provinceselectadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    } else
    {
        $("#provinceselectadmerr").html("");
    }

    var selectidcitymuniadm = $("#selectidcitymuniadm").val();
    if (selectidcitymuniadm === "Select" || selectidcitymuniadm === null)
    {
        $("#selectidcitymuniadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    } else
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
    } else
    {
        $("#zipcodexadmerr").html("");
    }

    var selectid_barangayadm = $("#selectid_barangayadm").val();
    if (selectid_barangayadm === "Select" || selectid_barangayadm === null)
    {
        $("#selectid_barangayadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    } else
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
    } else
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
        } else
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
        } else
        {
            $("#watcherbirthadmerr").html("");
        }

        var reltopatientadm = $("#reltopatientadm").val();
        if (reltopatientadm === "Select" || reltopatientadm === null)
        {
            $("#reltopatientadmerr").html("Required Field!");
            error++;
            admissiontab++;
            guradiancolapse++;
        } else
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
        } else
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
        } else
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
        } else
        {
            $("#patientrecipientadmerr").html("");
        }


//        var weightadm = $("#weightadm").val();
//        if (weightadm === "")
//        {
//            $("#weightadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            admixioncolapse++;
//        } else
//        {
//            $("#weightadmerr").html("");
//        }

        var cautionsadm = $("#cautionsadm").val();
        if (cautionsadm === "Select" || cautionsadm === null)
        {
            $("#cautionsadmerr").html("Required Field!");
            error++;
            admissiontab++;
            admixioncolapse++;
        } else
        {
            $("#cautionsadmerr").html("");
        }

        var inputid_tbdotsstatusadm = $("#inputid_tbdotsstatusadm").val();
        if (inputid_tbdotsstatusadm === "Select" || inputid_tbdotsstatusadm === null)
        {
            $("#inputid_tbdotsstatusadmerr").html("Required Field!");
            error++;
            admissiontab++;
            admixioncolapse++;
        } else
        {
            $("#inputid_tbdotsstatusadmerr").html("");
        }

//        var linkaccountadm = $("#linkaccountadm").val();
//        if (linkaccountadm === "")
//        {
//            $("#linkaccountadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            admixioncolapse++;
//        }
//        else
//        {
//            $("#linkaccountadmerr").html("");
//        }


        var attendingdoctoradm = $("#attendingdoctoradm").val();
        if (attendingdoctoradm === "")
        {
            $("#attendingdoctoradmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        } else
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
        } else
        {
            $("#attendingnurseadmerr").html("");
        }

//        var inputid_finalcomanagedataadm = $("#inputid_finalcomanagedataadm").val();
//        if (inputid_finalcomanagedataadm === "")
//        {
//            $("#inputid_finalcomanagedataadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            attendntcolapse++;
//        } else
//        {
//            $("#inputid_finalcomanagedataadmerr").html("");
//        }

//        var nurseinchargeadm = $("#nurseinchargeadm").val();
//        if (nurseinchargeadm === "Select" || nurseinchargeadm === null)
//        {
//            $("#nurseinchargeadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            attendntcolapse++;
//        } else
//        {
//            $("#nurseinchargeadmerr").html("");
//        }

        var selectid_roomadm = $("#selectid_roomadm").val();
        if (selectid_roomadm === "")
        {
            $("#selectid_roomadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        } else
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
        } else
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
        } else
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
        } else
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
        } else
        {
            $("#inputid_roomcredadmerr").html("");
        }
    } else
    {
        var attendingdoctoradm = $("#attendingdoctoradm").val();
        if (attendingdoctoradm === "")
        {
            $("#attendingdoctoradmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        } else
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
        } else
        {
            $("#attendingnurseadmerr").html("");
        }

//        var inputid_finalcomanagedataadm = $("#inputid_finalcomanagedataadm").val();
//        if (inputid_finalcomanagedataadm === "")
//        {
//            $("#inputid_finalcomanagedataadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            attendntcolapse++;
//        } else
//        {
//            $("#inputid_finalcomanagedataadmerr").html("");
//        }

        var selectid_roomadm = $("#selectid_roomadm").val();
        if (selectid_roomadm === "")
        {
            $("#selectid_roomadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
    if (phmembershipselectadm === "Select" || phmembershipselectadm === null)
    {
        $("#phmembernameadmerr").html("");
        $("#inputid_mdfrefnumadmerr").html("");
        $("#phicnumberadmerr").html("");
        $("#reltomemberadmerr").html("");

        $("#phmembershipselectadmerr").html("Required Field!");
        error++;
        insurancetab++;
        philhmocolapse++;
    } else if (phmembershipselectadm === "NON-NHIP:NHP")
    {
        $("#phmembershipselectadmerr").html("");
        $("#phmembernameadmerr").html("");
        $("#inputid_mdfrefnumadmerr").html("");
        $("#phicnumberadmerr").html("");
        $("#reltomemberadmerr").html("");
    } else
    {
        $("#phmembershipselectadmerr").html("");

//        var phmembernameadm = $("#phmembernameadm").val();
//        if (phmembernameadm === "")
//        {
//            $("#phmembernameadmerr").html("Required Field!");
//            error++;
//            insurancetab++;
//            philhmocolapse++;
//        } else
//        {
//            $("#phmembernameadmerr").html("");
//        }
//
//        var mdfrefnumadm = $("#inputid_mdfrefnumadm").val();
//        if (mdfrefnumadm === "")
//        {
//            $("#inputid_mdfrefnumadmerr").html("Required Field!");
//            error++;
//            insurancetab++;
//            philhmocolapse++;
//        } else
//        {
//            $("#inputid_mdfrefnumadmerr").html("");
//        }
//
//
//        var phicnumberadm = $("#phicnumberadm").val();
//        if (phicnumberadm === "")
//        {
//            $("#phicnumberadmerr").html("Required Field!");
//            error++;
//            insurancetab++;
//            philhmocolapse++;
//        } else
//        {
//            $("#phicnumberadmerr").html("");
//        }
//
//        var reltomemberadm = $("#reltomemberadm").val();
//        if (reltomemberadm === "Select" || reltomemberadm === null)
//        {
//            $("#reltomemberadmerr").html("Required Field!");
//            error++;
//            insurancetab++;
//            philhmocolapse++;
//        } else
//        {
//            $("#reltomemberadmerr").html("");
//        }
    }

    var patientclassadm = $("#patientclassadm").val();
    if (patientclassadm === "Select" || patientclassadm === null)
    {
        $("#patientclassadmerr").html("Required Field!");
        error++;
        insurancetab++;
        pxclasscolapse++;
    } else
    {
        $("#patientclassadmerr").html("");
    }

    var inputid_creditmaxlimitadm = $("#inputid_creditmaxlimitadm").val();
    if (inputid_creditmaxlimitadm === "Select" || inputid_creditmaxlimitadm === null)
    {
        $("#inputid_creditmaxlimitadmerr").html("Required Field!");
        error++;
        insurancetab++;
        pckgvipcolapse++;
    } else
    {
        $("#inputid_creditmaxlimitadmerr").html("");
    }

    //------Admission Tab-------------------------------------------->

    var otherstab = 0;

    var complaintcolapse = 0;
    var diagnosiscolapse = 0;
    var dietguidecolapse = 0;
    var cnfinemntcolapse = 0;
    var impresopdcolapse = 0;


//    var admissionreasonadm = $("#admissionreasonadm").val();
//    if (admissionreasonadm === "")
//    {
//        $("#admissionreasonadmerr").html("Required Field!");
//        error++;
//        otherstab++;
//        complaintcolapse++;
//    } else
//    {
//        $("#admissionreasonadmerr").html("");
//    }

//    var admittingdiagnosisadm = $("#admittingdiagnosisadm").val();
//    if (admittingdiagnosisadm === "")
//    {
//        $("#admittingdiagnosisadmerr").html("Required Field!");
//        error++;
//        otherstab++;
//        diagnosiscolapse++;
//    } else
//    {
//        $("#admittingdiagnosisadmerr").html("");
//    }

    if (selectid_patienttypeadm === "IPD")
    {
//        var dietaryadm = $("#dietaryadm").val();
//        if (dietaryadm === "")
//        {
//            $("#dietaryadmerr").html("Required Field!");
//            error++;
//            otherstab++;
//            dietguidecolapse++;
//        } else
//        {
//            $("#dietaryadmerr").html("");
//        }
    } 
    else
    {
//        var impressionopdadm = $("#impressionopdadm").val();
//        if (impressionopdadm === "")
//        {
//            $("#impressionopdadmerr").html("Required Field!");
//            error++;
//            otherstab++;
//            impresopdcolapse++;
//        } else
//        {
//            $("#impressionopdadmerr").html("");
//        }
    }

//    var inputid_finalcausecondataadm = $("#inputid_finalcausecondataadm").val();
//    if (inputid_finalcausecondataadm === "")
//    {
//        $("#inputid_finalcausecondataadmerr").html("Required Field!");
//        error++;
//        otherstab++;
//        cnfinemntcolapse++;
//    } else
//    {
//        $("#inputid_finalcausecondataadmerr").html("");
//    }


    if (otherstab > 0)
    {
        $("#clickothersid").tab('show');
        $("#otherserrtabindicator").html("*");

        if (selectid_patienttypeadm === "IPD")
        {
            if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse === 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
            else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
        } else
        {
            if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && impresopdcolapse !== 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && impresopdcolapse !== 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('show');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '#168C94');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && impresopdcolapse !== 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('show');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '#168C94');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && impresopdcolapse === 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('show');

                $("#comp").css('background', '');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '#168C94');
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && impresopdcolapse !== 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && impresopdcolapse === 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && impresopdcolapse === 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && impresopdcolapse === 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && impresopdcolapse === 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && impresopdcolapse !== 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && impresopdcolapse === 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('show');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '#168C94');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && impresopdcolapse === 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('show');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '#168C94');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && impresopdcolapse !== 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && impresopdcolapse !== 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '#168C94');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && impresopdcolapse !== 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('show');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '#168C94');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            }
        }
    } else
    {
        $("#otherserrtabindicator").html("");

        $("#complainterrcolapseindicator").html("");
        $("#diagnosiserrcolapseindicator").html("");
        $("#cnfinemnterrcolapseindicator").html("");

        if (selectid_patienttypeadm === "IPD")
        {
            $("#dietguideerrcolapseindicator").html("");
        } else
        {
            $("#impresopderrcolapseindicator").html("");
        }
    }

    if (insurancetab > 0)
    {
        $("#clickinsuranceid").tab('show');
        $("#insuranceerrtabindicator").html("*");

        if (philhmocolapse !== 0 && pxclasscolapse !== 0 && pckgvipcolapse !== 0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("*");

            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');


            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse === 0 && pxclasscolapse !== 0 && pckgvipcolapse !== 0)
        {
            $("#philhmoerrcolapseindicator").html("");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("*");

            $("#philhealthandHMOCollapse").collapse('hide');
            $("#ClassificationCollapse").collapse('show');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');


            $("#phhm").css('background', '');
            $("#pxcl").css('background', '#168C94');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse === 0 && pxclasscolapse === 0 && pckgvipcolapse !== 0)
        {
            $("#philhmoerrcolapseindicator").html("");
            $("#pxclasserrcolapseindicator").html("");
            $("#pckgviperrcolapseindicator").html("*");

            $("#philhealthandHMOCollapse").collapse('hide');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('show');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '#168C94');
            $("#vips").css('background', '');
        } else if (philhmocolapse !== 0 && pxclasscolapse !== 0 && pckgvipcolapse === 0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("");

            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse !== 0 && pxclasscolapse === 0 && pckgvipcolapse === 0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("");
            $("#pckgviperrcolapseindicator").html("");

            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse !== 0 && pxclasscolapse === 0 && pckgvipcolapse !== 0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("");
            $("#pckgviperrcolapseindicator").html("*");

            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse === 0 && pxclasscolapse !== 0 && pckgvipcolapse === 0)
        {
            $("#philhmoerrcolapseindicator").html("");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("");

            $("#philhealthandHMOCollapse").collapse('hide');
            $("#ClassificationCollapse").collapse('show');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '');
            $("#pxcl").css('background', '#168C94');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        }
    } else
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

        if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse === 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse === 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
    } else
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

        if (locatiocolapse !== 0 && contactcolapse !== 0)
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
        } else if (locatiocolapse !== 0 && contactcolapse === 0)
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
        } else if (contactcolapse !== 0 && locatiocolapse === 0)
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
    } else
    {
        $("#profileerrtabindicator").html("");
        $("#contacterrcolapseindicator").html("");
        $("#locationerrcolapseindicator").html("");
    }

    if (generaltab > 0)
    {
        $("#clickgeneralid").tab('show');
        $("#generalerrtabindicator").html("*");
    } else
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

        $('#admitPatientButton').removeAttr('disabled');
    }
    else
    {
        $('#admitPatientButton').attr('disabled', true);
        var caseno = $("#accountnumberadm").val();
        checkDuplicateCasenoForAdmitPatient(caseno);
    }
}

function checkDuplicateCasenoForAdmitPatient(caseno)
{
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
                text: "Case No. already exists!\nCase No. will generate!",
                type: "warning",
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            },
            function ()
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
                        $('#accountnumberadm').val(casenumyearstring + "-" + plus1casenum);
                    }
                    else
                    {
                        $('#accountnumberadm').val(currentyearstring + "-1");
                    }
                });

                setTimeout(function ()
                {
                    swal
                    ({
                        title: "Success",
                        text: "Case number is successfully generated!",
                        type: "success",
                        confirmButtonText: "OK"
                    });
                }, 2000);
            });

            $('#clickgeneralid').tab('show');
            $('#admitPatientButton').removeAttr('disabled');
        }
        else
        {
            $('#admitPatientButton').attr('disabled', true);
            checkDuplicatePackageAcctnoForAdmitPatient(caseno);
        }
    });
}

function checkDuplicatePackageAcctnoForAdmitPatient(caseno)
{
    var packageacctno = $("#packageacctnoadm").val();
    if(packageacctno === "" || packageacctno === null)
    {
        uploadPatientImageForAdmitPatient(caseno);
    }
    else
    {
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Packages/getPackageDataForCheckDuplicateAcctnoOfAdmitPatient",
            data: {packageacctnox: packageacctno},
            dataType: 'json'
        })
        .done(function (data)
        {
            if (data.status)
            {
                $('#clickinsuranceid').tab('show');
                collapsePackagesandVIPCollapseDiv();

                swal
                ({
                    title: "Duplicate Notice!",
                    text: "The submitted Package Account No. " + packageacctno + ", already exists!\nPackage Account No. Field will be refreshed!",
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
                                url: BASE_URL + 'Packages/GeneratePackageCode'
                            })
                            .done(function (result)
                            {
                                var packageacctnum = result[0].acctno;

                                var convertAcctnoToInt = parseInt(packageacctnum);
                                var incrementAcctno = convertAcctnoToInt + 1;

                                $('#packageacctnoadm').val(incrementAcctno);
                            });

                    setTimeout(function ()
                    {
                        var newpckgacctno = $('#packageacctnoadm').val();

                        swal
                        ({
                            title: "Success",
                            text: "Package Account No. is successfully refreshed!\nNew Package Account No. value is " + newpckgacctno,
                            type: "success",
                            confirmButtonText: "OK"
                        });
                    }, 2000);
                });

                $('.admitPatientButton').removeAttr('disabled');
            } 
            else
            {
                $('.admitPatientButton').attr('disabled', true);
                uploadPatientImageForAdmitPatient(caseno);
            }
        });
    }

    
}

function uploadPatientImageForAdmitPatient(caseno)
{
    if ($('#openpatientimguploadforadmpx').val() === '')
    {
        admitPatient(caseno);
    }
    else
    {
        $('.admitPatientButton').attr('disabled', true);
        $('#photoerradm').html("");

        var patientImage = $('#openpatientimguploadforadmpx').prop('files')[0];
        var extension = patientImage.name.substr((patientImage.name.lastIndexOf('.') + 1));

        var form_data = new FormData();
        form_data.append("file", patientImage, $('#pxindexnoadm').val() + 'p.' + extension);

        var imagepath = BASE_URL + 'assets/images/uploads/patients/' + $('#pxindexnoadm').val() + 'p.jpg';

        $.ajax
        ({
            url: imagepath,
            type: 'HEAD',
            error: function ()
            {
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
                    admitPatient(caseno);
                });
            },
            success: function ()
            {
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
                        admitPatient(caseno);
                    });
                });
            }
        });
    }
}

function admitPatient(casenox)
{
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/admitPatient",
        data: $('#admit-patient-form').serialize(),
        dataType: 'json'
    })
    .done
    (
        function (data)
        {
            $('#admitpatientmodal').modal("hide");

            setTimeout(function ()
            {
                swal
                ({
                    title: "Success",
                    text: "Patient is successfully admitted!",
                    type: "success",
                    confirmButtonText: "OK"
                },
                function (isConfirm)
                {
                    if (isConfirm)
                    {
                        showDiagnosticDataModal(casenox);

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
                                $('#accountnumberadm').val(casenumyearstring + "-" + plus1casenum);
                            }
                            else
                            {
                                $('#accountnumberadm').val(currentyearstring + "-1");
                            }
                        });
                    }
                });
            }, 1000);

            $('.admitPatientButton').removeAttr('disabled');
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

    $("#normalanchorid").tab('show');

    if (addoreditadmissionindicator === "ADD")
    {
        swal
        ({
            title: "Admission Option",
            text: "Would you like to add another new admission?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, please proceed!',
            cancelButtonText: "No, please cancel",
        },
        function (isConfirm)
        {
            if (isConfirm)
            {
                showNewAdmissionModal();

                pxmasterlist_table.ajax.reload();
                $('#search-allpatient-table_filter [type="search"]').val("");
                $('#search-allpatient-table_filter [type="search"]').focus();
                pxmasterlist_table.search("").draw();
            }
            else
            {
                var pxlastname = $("#lastnameadm").val();
                var pxfrstname = $("#firstnameadm").val();
                var pxfullname = pxlastname + ", " + pxfrstname;

                admittedpx_table.ajax.reload();
                $('#admitted-patients-masterlist-table_filter [type="search"]').val(pxfullname);
                $('#admitted-patients-masterlist-table_filter [type="search"]').focus();
                admittedpx_table.search(pxfullname).draw();
            }
        });
    }
    else
    {
        var quickadmissionindicator = $('#quickortypicaladmissionindicator').val();
        
        var pxlastname = $("#lastnameadm").val();
        var pxfrstname = $("#firstnameadm").val();
        var pxfullname = pxlastname + ", " + pxfrstname;

        if(quickadmissionindicator === "TYP")
        {
            admittedpx_table.ajax.reload();
            $('#admitted-patients-masterlist-table_filter [type="search"]').val(pxfullname);
            $('#admitted-patients-masterlist-table_filter [type="search"]').focus();
            admittedpx_table.search(pxfullname).draw();
        }
        else
        {
            quickadmittedpx_table.ajax.reload();
            $('#quick-admitted-patients-masterlist-table_filter [type="search"]').val(pxfullname);
            $('#quick-admitted-patients-masterlist-table_filter [type="search"]').focus();
            quickadmittedpx_table.search(pxfullname).draw();
        }
    }
}

function printAdmissionData()
{
    var caseno = $("#inputid_hiddencasenogenerate").val();

    if ($("#admission").is(":checked"))
    {
        $('#generate-patient-admission-sheet-form input[name=hiddennameforprintadmission]').val(caseno);
        $("#generate-patient-admission-sheet-form").submit();
    }
    else if ($("#clinical").is(":checked"))
    {
        $('#generate-patient-clinical-diagnostic-data-form input[name=hiddennameforprintclinicaldiagnostic]').val(caseno);
        $("#generate-patient-clinical-diagnostic-data-form").submit();
    } 
    else
    {
        $('#generate-patient-diagnostic-data-form input[name=hiddennameforprintdiagnostic]').val(caseno);
        $("#generate-patient-diagnostic-data-form").submit();
    }
}

function deletePatient(PIN)
{
    swal
            ({
                title: "Are you sure?",
                text: "You will not be able to recover the selected record!",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonText: "Yes, delete it!"
            },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $.ajax
                                    ({
                                        type: 'POST',
                                        url: BASE_URL + "Admission/deletePatient",
                                        data: {pin: PIN},
                                        dataType: 'json'
                                    })
                                    .done(function (result)
                                    {
                                        if (result == false)
                                        {
                                            swal("Error!", "Record was not deleted", "error");
                                        } else
                                        {
                                            swal
                                                    ({
                                                        title: "Success!",
                                                        text: "Record is successfully deleted!",
                                                        type: "success",
                                                        allowOutsideClick: false
                                                    },
                                                            function (isConfirm)
                                                            {
                                                                if (isConfirm)
                                                                {
                                                                    $('#search-allpatient-table').DataTable().ajax.reload();
                                                                }
                                                            });
                                        }
                                    });
                        }
                    });

//    swal
//            ({
//                title: "Are you sure?",
//                text: "You will not be able to recover the selected patient record!",
//                type: "warning",
//                showCancelButton: true,
//                confirmButtonText: "Yes, delete it!",
//                cancelButtonText: "No",
//                closeOnConfirm: false
//            },
//                    function ()
//                    {
//                        $.ajax
//                                ({
//                                    type: 'POST',
//                                    url: BASE_URL + "Admission/deletePatient",
//                                    data: {pin: PIN},
//                                    dataType: 'json'
//                                })
//
//                                .done(function (data)
//                                {
//                                    $(".confirm").attr('disabled', 'disabled');
//                                    $(".cancel").attr('disabled', 'disabled');
//
//                                    if (data.status)
//                                    {
//                                        swal
//                                                ({
//                                                    title: "Success!",
//                                                    text: "Record is successfully deleted!",
//                                                    type: "success",
//                                                    allowOutsideClick: false
//                                                });
//                                        
//                                    } else
//                                    {
//                                        swal("Error", "Error in saving. Please try again!", "error");
//                                    }
//                                });
//                    });
}

function patientImageUploadForAddPatient()
{
    $('#openpatientimguploadforaddpx').trigger('click');
}

function patientImageUploadForEditPatient()
{
    $('#openpatientimguploadforedtpx').trigger('click');
}

function patientImageUploadForAdmitPatient()
{
    $('#openpatientimguploadforadmpx').trigger('click');
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
    doctors_table = $('#doctors-masterlist2-table').DataTable({

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
        var lname = data[1];
        var fname = data[2];
        var mname = data[3];
        var suffx = data[4];
        var refno = data[24];

        var rownumcom = $('#comanagement-masterlist-table').DataTable().rows().count();
        if (rownumcom !== 0)
        {
            var samecomanagedoc = 0;
            var rownum = $('#comanagement-masterlist-table').DataTable().rows().count();
            for (var i = 0; i < rownum; i++)
            {
                var rowanddata = comanage_table.row(i).data();
                if (refno === rowanddata[6])
                {
                    samecomanagedoc++;
                }
            }

            if (samecomanagedoc > 0)
            {
                swal
                        ({
                            title: "This is a Comanage Doctor!",
                            text: "Please select other Doctor!!",
                            type: "warning",
                            allowOutsideClick: false
                        });
            } else
            {
                if (suffx === "" && mname !== "")
                {
                    var doctordata = lname + ", " + fname + " " + mname + " - " + refno;
                    $('#attendingdoctoradm').val(doctordata.toUpperCase());
                    hideSearchDoctorModalForAdmission();
                } else if (suffx !== "" && mname === "")
                {
                    var doctordata = lname + ", " + fname + " " + suffx + " - " + refno;
                    $('#attendingdoctoradm').val(doctordata.toUpperCase());
                    hideSearchDoctorModalForAdmission();
                } else if (suffx === "" && mname === "")
                {
                    var doctordata = lname + ", " + fname + " - " + refno;
                    $('#attendingdoctoradm').val(doctordata.toUpperCase());
                    hideSearchDoctorModalForAdmission();
                } else
                {
                    var doctordata = lname + ", " + fname + " " + mname + " " + suffx + " - " + refno;
                    $('#attendingdoctoradm').val(doctordata.toUpperCase());
                    hideSearchDoctorModalForAdmission();
                }
            }
        } else
        {
            if (suffx === "" && mname !== "")
            {
                var doctordata = lname + ", " + fname + " " + mname + " - " + refno;
                $('#attendingdoctoradm').val(doctordata.toUpperCase());
                hideSearchDoctorModalForAdmission();
            } else if (suffx !== "" && mname === "")
            {
                var doctordata = lname + ", " + fname + " " + suffx + " - " + refno;
                $('#attendingdoctoradm').val(doctordata.toUpperCase());
                hideSearchDoctorModalForAdmission();
            } else if (suffx === "" && mname === "")
            {
                var doctordata = lname + ", " + fname + " - " + refno;
                $('#attendingdoctoradm').val(doctordata.toUpperCase());
                hideSearchDoctorModalForAdmission();
            } else
            {
                var doctordata = lname + ", " + fname + " " + mname + " " + suffx + " - " + refno;
                $('#attendingdoctoradm').val(doctordata.toUpperCase());
                hideSearchDoctorModalForAdmission();
            }
        }
    });
}

function showAddDoctorsModal()
{
    $('#adddoctorsmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#savebuttondoc').removeClass('d-none');
    $('#updatebuttondoc').addClass('d-none');

    $('.adddoctor_title').removeClass('d-none');
    $('.edtdoctor_title').addClass('d-none');

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
    $('#savebuttondoc').prop("disabled", true);

    var error = 0;

    var adddoctorloader = swal
            ({
                title: "Please wait!",
                text: "Processing of data is still ongoing.",
                imageUrl: BASE_URL + "assets/images/loading.gif",
                imageSize: '200x200',
                showCancelButton: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false
            });

    interval = setInterval(function ()
    {
        if (error !== 0 || $('#adddoctorsmodal').hasClass('hide'))
        {
            adddoctorloader.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);

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
                        $('#savebuttondoc').prop("disabled", false);

                        error++;
                        var profiletab = 0;
                        var detailstab = 0;
                        var accounttab = 0;

                        //------------account section---------
                        if (result.errors.phicrate !== "")
                        {
                            accounttab++;
                        }

                        if (result.errors.pfrate !== "")
                        {
                            accounttab++;
                        }

                        if (result.errors.accountno !== "")
                        {
                            accounttab++;
                        }

                        if (accounttab > 0)
                        {
                            $('#accounttaberrordoc').html("*");
                            $('#accounttabiddoc').tab('show');
                        } else
                        {
                            $('#accounttaberrordoc').html("");
                        }

                        //------------details section---------
                        if (result.errors.licensenumber !== "")
                        {
                            detailstab++;
                        }

                        if (result.errors.ptrno !== "")
                        {
                            detailstab++;
                        }

                        if (result.errors.s2no !== "")
                        {
                            detailstab++;
                        }

                        if (result.errors.tax !== "")
                        {
                            detailstab++;
                        }

                        if (result.errors.tin !== "")
                        {
                            detailstab++;
                        }

                        if (result.errors.phicno !== "")
                        {
                            detailstab++;
                        }

                        if (detailstab > 0)
                        {
                            $('#detailstaberrordoc').html("*");
                            $('#detailstabiddoc').tab('show');
                        } else
                        {
                            $('#detailstaberrordoc').html("");
                        }

                        //------------profile section---------
                        if (result.errors.firstname !== "")
                        {
                            profiletab++;
                        }

                        if (result.errors.lastname !== "")
                        {
                            profiletab++;
                        }

                        if (result.errors.middlename !== "")
                        {
                            profiletab++;
                        }

                        if (result.errors.title !== "")
                        {
                            profiletab++;
                        }

                        if (result.errors.docname !== "")
                        {
                            profiletab++;
                        }

                        if (result.errors.address !== "")
                        {
                            profiletab++;
                        }

                        if (profiletab > 0)
                        {
                            $('#profiletaberrordoc').html("*");
                            $('#profiletabiddoc').tab('show');
                        } else
                        {
                            $('#profiletaberrordoc').html("");
                        }

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

                        swal
                                ({
                                    title: "Validation Notice!",
                                    text: "Some field requires your attention!!",
                                    type: "warning",
                                    allowOutsideClick: false
                                });
                    } else
                    {
                        $('#savebuttondoc').prop("disabled", true);

                        $('#adddoctorsmodal').modal('hide');

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

                                                    doctors_table.ajax.reload();
                                                    $('#doctors-masterlist2-table_filter [type="search"]').val(docCode);
                                                    $('#doctors-masterlist2-table_filter [type="search"]').focus();
                                                    doctors_table.search(docCode).draw();

                                                    $('#savebuttondoc').prop("disabled", false);
                                                    clearAllDoctorsFields();
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

                $('#savebuttondoc').addClass('d-none');
                $('#updatebuttondoc').removeClass('d-none');

                $('.adddoctor_title').addClass('d-none');
                $('.edtdoctor_title').removeClass('d-none');

                $('#doccd').val(result[0].doccd);
                $('#tax').val(result[0].tax);
                $('#licensenumber').val(result[0].Licno);
                $('#ptrno').val(result[0].PTR);
                $('#s2no').val(result[0].S2no);
                $('#phicno').val(result[0].phicno);
                $('#tin').val(result[0].tin);
                $('#phicenable').selectpicker('val', result[0].phicenable);
                $('#phicenable').selectpicker('refresh');
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
                $('#professiontype').selectpicker('val', result[0].proftype);
                $('#professiontype').selectpicker('refresh');
                $('#hospitalor').selectpicker('val', result[0].issuehospOR);
                $('#hospitalor').selectpicker('refresh');
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

function updateDoctors()
{
    var error = 0;

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
                closeOnConfirm: false,
                confirmButtonText: "Yes, update it!"
            },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $('#updatebuttondoc').prop("disabled", true);

                            var updatedoctorloader = swal
                                    ({
                                        title: "Please wait!",
                                        text: "Processing of data is still ongoing.",
                                        imageUrl: BASE_URL + "assets/images/loading.gif",
                                        imageSize: '200x200',
                                        showCancelButton: false,
                                        showConfirmButton: false,
                                        allowEscapeKey: false,
                                        allowOutsideClick: false
                                    });

                            interval = setInterval(function ()
                            {
                                if (error !== 0 || $('#adddoctorsmodal').hasClass('hide'))
                                {
                                    updatedoctorloader.close();

                                    setTimeout(function ()
                                    {
                                        clearInterval(interval);
                                    });
                                }
                            }, 5000);

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
                                                $('#updatebuttondoc').prop("disabled", false);

                                                error++;

                                                var profiletab = 0;
                                                var detailstab = 0;
                                                var accounttab = 0;

                                                //------------account section---------
                                                if (result.errors.phicrate !== "")
                                                {
                                                    accounttab++;
                                                }

                                                if (result.errors.pfrate !== "")
                                                {
                                                    accounttab++;
                                                }

                                                if (result.errors.accountno !== "")
                                                {
                                                    accounttab++;
                                                }

                                                if (accounttab > 0)
                                                {
                                                    $('#accounttaberrordoc').html("*");
                                                    $('#accounttabiddoc').tab('show');
                                                } else
                                                {
                                                    $('#accounttaberrordoc').html("");
                                                }

                                                //------------details section---------
                                                if (result.errors.licensenumber !== "")
                                                {
                                                    detailstab++;
                                                }

                                                if (result.errors.ptrno !== "")
                                                {
                                                    detailstab++;
                                                }

                                                if (result.errors.s2no !== "")
                                                {
                                                    detailstab++;
                                                }

                                                if (result.errors.tax !== "")
                                                {
                                                    detailstab++;
                                                }

                                                if (result.errors.tin !== "")
                                                {
                                                    detailstab++;
                                                }

                                                if (result.errors.phicno !== "")
                                                {
                                                    detailstab++;
                                                }

                                                if (detailstab > 0)
                                                {
                                                    $('#detailstaberrordoc').html("*");
                                                    $('#detailstabiddoc').tab('show');
                                                } else
                                                {
                                                    $('#detailstaberrordoc').html("");
                                                }

                                                //------------profile section---------
                                                if (result.errors.firstname !== "")
                                                {
                                                    profiletab++;
                                                }

                                                if (result.errors.lastname !== "")
                                                {
                                                    profiletab++;
                                                }

                                                if (result.errors.middlename !== "")
                                                {
                                                    profiletab++;
                                                }

                                                if (result.errors.title !== "")
                                                {
                                                    profiletab++;
                                                }

                                                if (result.errors.docname !== "")
                                                {
                                                    profiletab++;
                                                }

                                                if (result.errors.address !== "")
                                                {
                                                    profiletab++;
                                                }

                                                if (profiletab > 0)
                                                {
                                                    $('#profiletaberrordoc').html("*");
                                                    $('#profiletabiddoc').tab('show');
                                                } else
                                                {
                                                    $('#profiletaberrordoc').html("");
                                                }

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

                                                swal
                                                        ({
                                                            title: "Validation Notice!",
                                                            text: "Some field requires your attention!!",
                                                            type: "warning",
                                                            allowOutsideClick: false
                                                        });

                                            } else
                                            {
                                                $('#updatebuttondoc').prop("disabled", true);
                                                $('#adddoctorsmodal').modal('hide');

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
                                                                            $('#searchdoctormodal').modal
                                                                                    ({
                                                                                        show: true,
                                                                                        backdrop: 'static',
                                                                                        keyboard: false
                                                                                    });

                                                                            doctors_table.ajax.reload();
                                                                            $('#doctors-masterlist2-table_filter [type="search"]').val(docCode);
                                                                            $('#doctors-masterlist2-table_filter [type="search"]').focus();
                                                                            doctors_table.search(docCode).draw();

                                                                            $('#updatebuttondoc').prop("disabled", false);
                                                                            clearAllDoctorsFields();
                                                                        }
                                                                    });
                                                }, 1000);
                                            }
                                        }
                                    });
                        }
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
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonText: "Yes, delete it!"
            },
                    function (isConfirm)
                    {
                        if (isConfirm)
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
                                        if (result == false)
                                        {
                                            swal("Error!", "Record was not deleted", "error");
                                        } else
                                        {
                                            swal
                                                    ({
                                                        title: "Success!",
                                                        text: "Record is successfully deleted!",
                                                        type: "success",
                                                        allowOutsideClick: false
                                                    },
                                                            function (isConfirm)
                                                            {
                                                                if (isConfirm)
                                                                {
                                                                    $('#doctors-masterlist2-table').DataTable().ajax.reload();
                                                                }
                                                            });
                                        }
                                    });
                        }
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
    $('#suffix').val('');
    $('#title').val('MD');
    $('#docname').val('');
    $('#address').val('');
    $('#professiontype').val('');
    $('#hospitalor').val('');
    $('#otherinformation').val('');
    $('#biodata').val('');

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

    $('#taxerror').html('');
    $('#licensenumbererror').html('');
    $('#ptrnoerror').html('');
    $('#s2noerror').html('');
    $('#phicnoerror').html('');
    $('#tinerror').html('');
    $('#phicenableerror').html('');
    $('#phicrateerror').html('');
    $('#pfrateerror').html('');
    $('#coaopderror').html('');
    $('#coaipderror').html('');
    $('#accountnoerror').html('');
    $('#firstnameerror').html('');
    $('#lastnameerror').html('');
    $('#middlenameerror').html('');
    $('#suffixerror').html('');
    $('#titleerror').html('');
    $('#docnameerror').html('');
    $('#addresserror').html('');
    $('#professiontypeerror').html('');
    $('#hospitalorerror').html('');
    $('#doccode').val('');
    $('#profiletabiddoc').tab('show');

    $('#profiletaberrordoc').html("");
    $('#detailstaberrordoc').html("");
    $('#accounttaberrordoc').html("");
    $('#scheduletaberrordoc').html("");
    $('#clinictaberrordoc').html("");

    generateDoctorsCode();
}

function generateDoctorsCode()
{
    $.ajax
            ({
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

//function readImageURL(selectedFiles, img) {
//    if (selectedFiles.files && selectedFiles.files[0]) {
//        var reader = new FileReader();
//
//        reader.onload = function (e) {
//            $('#' + img)
//                    .attr('src', e.target.result)
//                    .width(180)
//                    .height(180);
//        };
//
//        reader.readAsDataURL(selectedFiles.files[0]);
//
//    }
//}

function uploadDoctorImage() {

    if ($('#opendoctorimgupload').val() == '')
    {
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
    var lname = selectedDoctor[1];
    var fname = selectedDoctor[2];
    var mname = selectedDoctor[3];
    var suffx = selectedDoctor[4];
    var refno = selectedDoctor[24];

    var rownumcom = $('#comanagement-masterlist-table').DataTable().rows().count();
    if (rownumcom !== 0)
    {
        var samecomanagedoc = 0;
        var rownum = $('#comanagement-masterlist-table').DataTable().rows().count();
        for (var i = 0; i < rownum; i++)
        {
            var rowanddata = comanage_table.row(i).data();
            if (refno === rowanddata[6])
            {
                samecomanagedoc++;
            }
        }

        if (samecomanagedoc > 0)
        {
            swal
                    ({
                        title: "This is a Comanage Doctor!",
                        text: "Please select other Doctor!!",
                        type: "warning",
                        allowOutsideClick: false
                    });
        } else
        {
            if (suffx === "" && mname !== "")
            {
                var doctordata = lname + ", " + fname + " " + mname + " - " + refno;
                $('#attendingdoctoradm').val(doctordata.toUpperCase());
                hideSearchDoctorModalForAdmission();
            } else if (suffx !== "" && mname === "")
            {
                var doctordata = lname + ", " + fname + " " + suffx + " - " + refno;
                $('#attendingdoctoradm').val(doctordata.toUpperCase());
                hideSearchDoctorModalForAdmission();
            } else if (suffx === "" && mname === "")
            {
                var doctordata = lname + ", " + fname + " - " + refno;
                $('#attendingdoctoradm').val(doctordata.toUpperCase());
                hideSearchDoctorModalForAdmission();
            } else
            {
                var doctordata = lname + ", " + fname + " " + mname + " " + suffx + " - " + refno;
                $('#attendingdoctoradm').val(doctordata.toUpperCase());
                hideSearchDoctorModalForAdmission();
            }
        }
    } else
    {
        if (suffx === "" && mname !== "")
        {
            var doctordata = lname + ", " + fname + " " + mname + " - " + refno;
            $('#attendingdoctoradm').val(doctordata.toUpperCase());
            hideSearchDoctorModalForAdmission();
        } else if (suffx !== "" && mname === "")
        {
            var doctordata = lname + ", " + fname + " " + suffx + " - " + refno;
            $('#attendingdoctoradm').val(doctordata.toUpperCase());
            hideSearchDoctorModalForAdmission();
        } else if (suffx === "" && mname === "")
        {
            var doctordata = lname + ", " + fname + " - " + refno;
            $('#attendingdoctoradm').val(doctordata.toUpperCase());
            hideSearchDoctorModalForAdmission();
        } else
        {
            var doctordata = lname + ", " + fname + " " + mname + " " + suffx + " - " + refno;
            $('#attendingdoctoradm').val(doctordata.toUpperCase());
            hideSearchDoctorModalForAdmission();
        }
    }
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
    nurses_table = $('#nurses-masterlist2-table').DataTable({

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
        var nursedata = data[2] + ", " + data[3] + " " + data[4] + " - " + data[9];
        $('#attendingnurseadm').val(nursedata.toUpperCase());
        hideSearchNurseModalForAdmission();
    });
}

function addNurses()
{
    $('#savebuttonnur').prop("disabled", true);

    var error = 0;

    var addnurseloader = swal
            ({
                title: "Please wait!",
                text: "Processing of data is still ongoing.",
                imageUrl: BASE_URL + "assets/images/loading.gif",
                imageSize: '200x200',
                showCancelButton: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false
            });

    interval = setInterval(function ()
    {
        if (error !== 0 || $('#adddoctorsmodal').hasClass('hide'))
        {
            addnurseloader.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);


    var allowIsChecked = false;
    if ($('#allowadmissionnur').is(":checked"))
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

    var lastName = $('#lastnamenur').val();
    var firstName = $('#firstnamenur').val();
    var hospCode = $('#hospcodenur').val();
    var address = $('#addressnur').val();
    var licenseNumber = $('#licensenumbernur').val();
    var profType = $('#proftypenur').val();
    var accountId = $('#accountidnur').val();
    var accountName = $('#accountnamenur').val();

    $.ajax
            ({
                type: 'POST',
                data:
                        {
                            lastName: lastName, firstName: firstName,
                            hospCode: hospCode, address: address,
                            licenseNumber: licenseNumber, profType: profType,
                            allowAdmission: allowAdmission, accountId: accountId,
                            accountName: accountName
                        },
                dataType: 'json',
                url: BASE_URL + 'Nurses/AddNurses',
                success: function (result)
                {
                    if (result.status == false)
                    {
                        $('#savebuttonnur').prop("disabled", false);

                        error++;

                        var detailstab = 0;
                        var profiletab = 0;

                        //------------details section---------
                        if (result.errors.licensenumber !== "")
                        {
                            detailstab++;
                        }

                        if (detailstab > 0)
                        {
                            $('#detailstaberrornur').html("*");
                            $('#detailstabidnur').tab('show');
                        } else
                        {
                            $('#detailstaberrornur').html("");
                        }

                        //------------profile section---------
                        if (result.errors.lastname !== "")
                        {
                            profiletab++;
                        }

                        if (result.errors.firstname !== "")
                        {
                            profiletab++;
                        }

                        if (result.errors.address !== "")
                        {
                            profiletab++;
                        }

                        if (profiletab > 0)
                        {
                            $('#profiletaberrornur').html("*");
                            $('#profiletabidnur').tab('show');
                        } else
                        {
                            $('#profiletaberrornur').html("");
                        }

                        checkFieldValidations(result.errors.lastname, 'lastnamenurerror', 'lastnamenur');
                        checkFieldValidations(result.errors.licensenumber, 'licensenumbernurerror', 'licensenumbernur');
                        checkFieldValidations(result.errors.firstname, 'firstnamenurerror', 'firstnamenur');
                        checkFieldValidations(result.errors.address, 'addressnurerror', 'addressnur');

                        swal
                                ({
                                    title: "Validation Notice!",
                                    text: "Some field requires your attention!!",
                                    type: "warning",
                                    allowOutsideClick: false
                                });
                    } else
                    {
                        $('#savebuttonnur').prop("disabled", true);

                        $('#addnursesmodal').modal('hide');

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
                                                    $('#searchnursemodal').modal
                                                            ({
                                                                show: true,
                                                                backdrop: 'static',
                                                                keyboard: false
                                                            });

                                                    nurses_table.ajax.reload();
                                                    $('#nurses-masterlist2-table_filter [type="search"]').val(hospCode);
                                                    $('#nurses-masterlist2-table_filter [type="search"]').focus();
                                                    nurses_table.search(hospCode).draw();

                                                    $('#savebuttonnur').prop("disabled", false);
                                                    clearAllNursesFields();
                                                }
                                            });
                        }, 1000);
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
                showAddNursesModal();

                $('.addnurse_title').addClass("d-none");
                $('.edtnurse_title').removeClass("d-none");

                $('#savebuttonnur').addClass("d-none");
                $('#updatebuttonnur').removeClass("d-none");

                $('#nurcd').val(result[0].doccd);
                $('#lastnamenur').val(result[0].doclname);
                $('#firstnamenur').val(result[0].docfname);
                $('#hospcodenur').val(result[0].doccode);
                $('#addressnur').val(result[0].adrs);
                $('#licensenumbernur').val(result[0].PTR);

                if (result[0].proftype === "")
                {
                    $('#proftypenur').selectpicker("val", "RN");
                } else
                {
                    $('#proftypenur').selectpicker("val", result[0].proftype);
                }
            });
}

function updateNurses()
{
    var error = 0;

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

    var code = $('#nurcd').val();
    var lastName = $('#lastnamenur').val();
    var firstName = $('#firstnamenur').val();
    var hospCode = $('#hospcodenur').val();
    var address = $('#addressnur').val();
    var licenseNumber = $('#licensenumbernur').val();
    var profType = $('#proftypenur').val();
    var accountId = $('#accountidnur').val();
    var accountName = $('#accountnamenur').val();

    swal
            ({
                title: "Are you sure?",
                text: "Data will be change and you will not be able to recover it!",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "Yes, update it!",
            },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $('#updatebuttonnur').prop("disabled", true);

                            var updatenurseloader = swal
                                    ({
                                        title: "Please wait!",
                                        text: "Processing of data is still ongoing.",
                                        imageUrl: BASE_URL + "assets/images/loading.gif",
                                        imageSize: '200x200',
                                        showCancelButton: false,
                                        showConfirmButton: false,
                                        allowEscapeKey: false,
                                        allowOutsideClick: false
                                    });

                            interval = setInterval(function ()
                            {
                                if (error !== 0 || $('#addnursesmodal').hasClass('hide'))
                                {
                                    updatenurseloader.close();

                                    setTimeout(function ()
                                    {
                                        clearInterval(interval);
                                    });
                                }
                            }, 5000);


                            $.ajax
                                    ({
                                        type: 'POST',
                                        data:
                                                {
                                                    lastName: lastName, firstName: firstName,
                                                    hospCode: hospCode, address: address,
                                                    licenseNumber: licenseNumber, profType: profType,
                                                    allowAdmission: allowAdmission, accountId: accountId,
                                                    accountName: accountName, code: code
                                                },
                                        dataType: 'json',
                                        url: BASE_URL + 'Nurses/UpdateNurses',
                                        success: function (result)
                                        {
                                            if (result.status === false)
                                            {
                                                $('#updatebuttonnur').prop("disabled", false);

                                                error++;

                                                var detailstab = 0;
                                                var profiletab = 0;

                                                //------------details section---------
                                                if (result.errors.licensenumber !== "")
                                                {
                                                    detailstab++;
                                                }

                                                if (detailstab > 0)
                                                {
                                                    $('#detailstaberrornur').html("*");
                                                    $('#detailstabidnur').tab('show');
                                                } else
                                                {
                                                    $('#detailstaberrornur').html("");
                                                }

                                                //------------profile section---------
                                                if (result.errors.lastname !== "")
                                                {
                                                    profiletab++;
                                                }

                                                if (result.errors.firstname !== "")
                                                {
                                                    profiletab++;
                                                }

                                                if (result.errors.address !== "")
                                                {
                                                    profiletab++;
                                                }

                                                if (profiletab > 0)
                                                {
                                                    $('#profiletaberrornur').html("*");
                                                    $('#profiletabidnur').tab('show');
                                                } else
                                                {
                                                    $('#profiletaberrornur').html("");
                                                }

                                                checkFieldValidations(result.errors.lastname, 'lastnamenurerror', 'lastnamenur');
                                                checkFieldValidations(result.errors.licensenumber, 'licensenumbernurerror', 'licensenumbernur');
                                                checkFieldValidations(result.errors.firstname, 'firstnamenurerror', 'firstnamenur');
                                                checkFieldValidations(result.errors.address, 'addressnurerror', 'addressnur');

                                                swal
                                                        ({
                                                            title: "Validation Notice!",
                                                            text: "Some field requires your attention!!",
                                                            type: "warning",
                                                            allowOutsideClick: false
                                                        });
                                            } else
                                            {
                                                $('#updatebuttonnur').prop("disabled", true);

                                                $('#addnursesmodal').modal('hide');

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
                                                                            $('#searchnursemodal').modal
                                                                                    ({
                                                                                        show: true,
                                                                                        backdrop: 'static',
                                                                                        keyboard: false
                                                                                    });

                                                                            nurses_table.ajax.reload();
                                                                            $('#nurses-masterlist2-table_filter [type="search"]').val(hospCode);
                                                                            $('#nurses-masterlist2-table_filter [type="search"]').focus();
                                                                            nurses_table.search(hospCode).draw();

                                                                            $('#updatebuttonnur').prop("disabled", false);
                                                                            clearAllNursesFields();
                                                                        }
                                                                    });
                                                }, 1000);
                                            }
                                        }
                                    });
                        }
                    });
}

function deleteNurses(code)
{
    swal
            ({
                title: "Are you sure?",
                text: "You will not be able to recover the selected record!",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonText: "Yes, delete it!"
            },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $.ajax
                                    ({
                                        type: 'POST',
                                        data: {code: code},
                                        url: BASE_URL + 'Nurses/DeleteNurses',
                                        dataType: 'json'
                                    })
                                    .done(function (result)
                                    {
                                        if (result == false)
                                        {
                                            swal("Error!", "Record was not deleted", "error");
                                        } else
                                        {
                                            swal
                                                    ({
                                                        title: "Success!",
                                                        text: "Record is successfully deleted!",
                                                        type: "success",
                                                        allowOutsideClick: false
                                                    },
                                                            function (isConfirm)
                                                            {
                                                                if (isConfirm)
                                                                {
                                                                    $('#nurses-masterlist2-table').DataTable().ajax.reload();
                                                                }
                                                            });
                                        }
                                    });
                        }
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

                $('#hospcodenur').val('PFRN' + incrementDocCode);
            });
}

function clearAllNursesFields()
{
    $('#firstnamenur').val('');
    $('#lastnamenur').val('');
    $('#hospcodenur').val('');
    $('#addressnur').val('');
    $('#licensenumbernur').val('');

    $('#firstnamnure').css('border-color', '');
    $('#lastnamenur').css('border-color', '');
    $('#hospcodenur').css('border-color', '');
    $('#addressnur').css('border-color', '');
    $('#licensenumbernur').css('border-color', '');

    $('#firstnamenurerror').html('');
    $('#lastnamenurerror').html('');
    $('#hospcodenurerror').html('');
    $('#addressnurerror').html('');
    $('#licensenumbernurerror').html('');

    $('#profiletaberrornur').html('');
    $('#detailstaberrornur').html('');

    $('#profiletabidnur').tab('show');

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

    $('.addnurse_title').removeClass("d-none");
    $('.edtnurse_title').addClass("d-none");

    $('#savebuttonnur').removeClass("d-none");
    $('#updatebuttonnur').addClass("d-none");
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
    var nursedata = selectedNurse[2] + ", " + selectedNurse[3] + " " + selectedNurse[4] + " - " + selectedNurse[9];

    $('#attendingnurseadm').val(nursedata.toUpperCase());
    hideSearchNurseModalForAdmission();
}

//----------------------SLcode Section------------------------------------------
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
                language:
                        {
                            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
                        },
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

    $('#addslcodesmallheader').removeClass("d-none");
    $('#edtslcodesmallheader').addClass("d-none");

    $('#addslcodebigheader').removeClass("d-none");
    $('#edtslcodebigheader').addClass("d-none");

    $('#savebuttonaddpx').removeClass("d-none");
    $('#editbuttonaddpx').addClass("d-none");

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

    $('#addslcodesmallheader').removeClass("d-none");
    $('#edtslcodesmallheader').addClass("d-none");

    $('#addslcodebigheader').removeClass("d-none");
    $('#edtslcodebigheader').addClass("d-none");

    $('#savebuttonaddpx').removeClass("d-none");
    $('#editbuttonaddpx').addClass("d-none");

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

//    $('#slcodeforaddpxmodal').modal({
//        show: true,
//        backdrop: 'static',
//        keyboard: false
//    });

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
    } else
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

                } else
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
                                } else
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
        } else
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

                $('#inputid_slcode').val('SL' + incrementSLCode);
            });
}

function generateSLCodeForAdmission()
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

        $('#inputid_slcodeadm').val('SL' + incrementSLCode);
        $('#hiddeninputid_slcodeadm').val('SL' + incrementSLCode);
    });
}


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
            $('#accountnumberadm').val(casenumyearstring + "-" + plus1casenum);
        }
        else
        {
            $('#accountnumberadm').val(currentyearstring + "-1");
        }
    });
}

function generatePINForAdmission()
{
    $.ajax
    ({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Admission/GeneratePatientIndexno'
    })
    .done(function (result)
    {
        var recentpin = result[0].recentpin;
        var splitpinnum = recentpin.split('-');
        var plus1pinnum = parseInt(splitpinnum[1]) + 1;
        var currentyear = new Date().getFullYear();

        var currentyearstring = currentyear.toString();
        var indexnoyearstring = splitpinnum[0].toString();

        if(currentyearstring === indexnoyearstring)
        {
            $('#inputid_pxindex').val(indexnoyearstring + "-" + plus1pinnum);
        }
        else
        {
            $('#inputid_pxindex').val(currentyearstring + "-1");
        }
    });
}

function selectSLCodeForAddPatient()
{
    $('#inputid_slcode').val(selectedSLCode[2]);
    hideSLCodeModalForAddPatient();
}

function showSLCodeModalForAddPatient()
{
    var error = 0;
    var general = 0;
    var profile = 0

    //----------general---------------- 

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

    //----------profile----------------    

    var prov = $("#selectid_province").val();
    if (prov === "select")
    {
        $("#proverr").text("Required Field!");
        error++;
        profile++;
    } else
    {
        $("#proverr").text("");
    }


    var city = $("#selectid_citymuni").val();
    if (city === "select")
    {
        $("#cityerr").text("Required Field!");
        error++;
        profile++;
    } else
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
    } else
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

    if (profile > 0)
    {
        $("#anchorid_forprofiletabadd").tab('show');
        $("#profileerrtabindicatoradd").html("*");
    } else
    {
        $("#profileerrtabindicatoradd").html("");
    }

    if (general > 0)
    {
        $("#anchorid_forgeneraltabadd").tab('show');
        $("#generalerrtabindicatoradd").html("*");
    } else
    {
        $("#generalerrtabindicatoradd").html("");
    }

    if (error > 0)
    {
        swal
                ({
                    title: "Validation Notice!",
                    text: "Patient name and address are required for SL Management",
                    type: "warning",
                    allowOutsideClick: false
                });
    } else
    {
        $("#profileerrtabindicatoradd").html("");

        $('#slcodeforaddpxmodal').modal
                ({
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
                language:
                        {
                            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
                        },
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
    alert("Under Development");

//    var perDayIsChecked = false;
//
//    //Check if allowadmission is clicked/checked
//    if ($('#perday').is(":checked"))
//    {
//        perDayIsChecked = true;
//    } else {
//        perDayIsChecked = false;
//    }
//
//    var perDay;
//
//    if (perDayIsChecked == true) {
//        perDay = 1;
//    } else {
//        perDay = 0;
//    }
//
//    var roomsType = $('#roomstype').val();
//    var roomsName = $('#roomsname').val();
//    var bedNo = $('#bedno').val();
//    var description = $('#description').val();
//    var roomsCode = $('#roomscode').val();
//    var roomsRate = $('#roomsrate').val();
//    var creditMaximum = $('#creditmaximum').val();
//    var station = $('#station').val();
//    var phicRoomsType = $('#phicroomstype').val();
//    var nursingServices = $('#nursingservices').val();
//    var accountId = $('#accountid').val();
//    var accountName = $('#accountname').val();
//
//    $.ajax({
//        type: 'POST',
//        data: {
//            roomsType: roomsType, roomsName: roomsName,
//            bedNo: bedNo, description: description,
//            roomsCode: roomsCode, roomsRate: roomsRate,
//            perDay: perDay, accountId: accountId, creditMaximum: creditMaximum,
//            station: station, phicRoomsType: phicRoomsType,
//            nursingServices: nursingServices, accountName: accountName
//        },
//        dataType: 'json',
//        url: BASE_URL + 'Rooms/AddRooms',
//        success: function (result) {
//            if (result.status == false) { //If data is failed to saved
//
//                //Check every field if has error
//                checkFieldValidations(result.errors.roomsname, 'roomsnameerror', 'roomsname');
//                checkFieldValidations(result.errors.bedno, 'bednoerror', 'bedno');
//                checkFieldValidations(result.errors.description, 'descriptionerror', 'description');
//                checkFieldValidations(result.errors.creditmaximum, 'creditmaximumerror', 'creditmaximum');
//                checkFieldValidations(result.errors.nursingservices, 'nursingserviceserror', 'nursingservices');
//                checkFieldValidations(result.errors.roomsrate, 'roomsrateerror', 'roomsrate');
//
//            } else { //If success
//
//                hideAddRoomsModal();
//
//                swal
//                        ({
//                            title: "Success!",
//                            text: "Record is successfully saved!",
//                            type: "success",
//                            allowOutsideClick: false
//                        });
//
//                rooms_table.ajax.reload();
//                $('#rooms-masterlist2-table_filter [type="search"]').val(roomsName);
//                $('#rooms-masterlist2-table_filter [type="search"]').focus();
//                rooms_table.search(roomsName).draw();
//
//                rooms_table.on('dblclick', 'tr', function ()
//                {
//                    var data = rooms_table.row(this).data();
//                    var roomdata1 = data[3] + ":" + data[4] + ":" + data[5] + ":" + data[6];
//                    var roomdata2 = data[1] + ":" + data[2] + ":" + data[3] + ":" + data[4] + ":" +
//                            data[5] + ":" + data[6] + ":" + data[7] + ":" + data[8] + ":" +
//                            data[9] + ":" + data[10] + ":" + data[11];
//
//                    $('#selectid_roomadm').val(roomdata1.toUpperCase());
//                    $('#selectid_roomadmhid').val(roomdata2.toUpperCase());
//                    $("#inputid_roomrateadm").val(data[7]);
//                    $("#inputid_ancilaryadm").val(data[8]);
//                    $("#inputid_roominfoadm").val(data[6]);
//                    $("#inputid_roomcredadm").val(data[10]);
//
//                    hideSearchRoomModalForAdmission();
//                });
//            }
//        }
//    });
}

function editRooms(code)
{
    alert("Under Development!");
//    $.ajax({
//
//        type: 'POST',
//        data: {code: code},
//        url: BASE_URL + 'Rooms/SearchSelectedRooms',
//        dataType: 'json'
//    }).done(function (result) {
//        showAddRoomsModal(); //Show the modal form
//        $('#savebutton').addClass('d-none');
//        $('#updatebutton').removeClass('d-none');
//
//        //Add all the result values to the specified form
//        $('#doccd').val(result[0].rmid);
//        $('#roomstype').val(result[0].rmtype);
//        $('#roomsname').val(result[0].rmno);
//        $('#bedno').val(result[0].rmbed);
//        $('#description').val(result[0].rmdscr);
//        $('#roomscode').val(result[0].rmcode);
//        $('#roomsrate').val(result[0].rmrate);
//        $('#creditmaximum').val(result[0].crmaxlimit);
//        $('#station').val(result[0].stationname);
//        $('#phicroomstype').val(result[0].RmPHICtype);
//        $('#nursingservices').val(result[0].nursing);
////        $('#admission').css('checked');
//        //If admit allow = 0 then checkbox is not check else checked
////        if (result[0].admitallow == 0) {
////            $('#perday').prop('checked', false);
////        } else {
////            $('#perday').prop('checked', true);
////        }
//
//
//    });
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

function deleteRooms(code)
{
    alert("Under Development!")
//    swal({
//        title: "Are you sure?",
//        text: "You will not be able to recover the selected record!",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonText: "Yes, delete it!",
//    }, function () {
//
//        $.ajax({
//
//            type: 'POST',
//            data: {code: code},
//            url: BASE_URL + 'Rooms/DeleteRooms',
//            dataType: 'json'
//
//        }).done(function (result) {
//            swal({
//                title: "Success!",
//                text: "Record is successfully deleted!",
//                type: "success",
//                allowOutsideClick: false
//
//            }, function () {
////                location.reload();
//            });
//        });
//
//    });
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
    alert("Under Development!");
    hideShowPatientType
//    $('#addroomsmodal').modal({
//        show: true,
//        backdrop: 'static',
//        keyboard: false
//    });
//
//    $('#searchroommodal').modal("hide");
//    $('body').css('overflow', 'hidden');
//    $('#addroomsmodal').css('overflow-y', 'scroll');
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
    
    var station = selectedRoom[12];
    $("#stationnameadm").selectpicker("val",station.toUpperCase());

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
        
        var station = data[12];
        $("#stationnameadm").selectpicker("val",station.toUpperCase());

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


//----------------------Responsive Address Section------------------------------------------
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
    } else
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
                    $('#selectid_citymuni').empty();
                    $('#selectid_citymuni').append('<option value="select">' + "Select From List" + '</option>');
                    for (var cv = 0; cv < data.length; cv++)
                    {
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
    } else
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
    } else
    {
        $('#inputid_street').prop('disabled', false);
    }
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

        $('#motheradrschkboxedt').prop('checked', false);
        $('#motheradrsvalueindicatoredt').val("NO");

        $('#fatheradrschkboxedt').prop('checked', false);
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
    } else
    {
        $('#inputid_mothersadrsedt').val("");
        $('#inputid_fathersadrsedt').val("");

        $('#motheradrschkboxedt').prop('checked', false);
        $('#motheradrsvalueindicatoredt').val("NO");

        $('#fatheradrschkboxedt').prop('checked', false);
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
        $('#motheradrschkboxedt').prop('checked', false);
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");

        $('#fatheradrschkboxedt').prop('checked', false);
        $('#fatheradrsvalueindicatoredt').val("NO");
        $('#inputid_fathersadrsedt').val("");

        $('#inputid_zipcodexedt').val('');
        $('#inputid_streetedt').val('');
        $('#inputid_streetedt').prop('disabled', true);

        $('#selectid_barangayedt').selectpicker('val', 'select');
        $('#selectid_barangayedt').prop('disabled', true);
        $('#selectid_barangayedt').selectpicker('refresh');
    } else
    {
        $('#motheradrschkboxedt').prop('checked', false);
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");

        $('#fatheradrschkboxedt').prop('checked', false);
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
        $('#motheradrschkboxedt').prop('checked', false);
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");

        $('#fatheradrschkboxedt').prop('checked', false);
        $('#fatheradrsvalueindicatoredt').val("NO");
        $('#inputid_fathersadrsedt').val("");

        $('#inputid_streetedt').prop('disabled', true);
        $('#inputid_streetedt').val('');
    } else
    {
        $('#motheradrschkboxedt').prop('checked', false);
        $('#motheradrsvalueindicatoredt').val("NO");
        $('#inputid_mothersadrsedt').val("");

        $('#fatheradrschkboxedt').prop('checked', false);
        $('#fatheradrsvalueindicatoredt').val("NO");
        $('#inputid_fathersadrsedt').val("");

        $('#inputid_streetedt').prop('disabled', false);
        $('#inputid_streetedt').val('');
    }
}

function onChangeProvinceSelectForAdmitPx()
{
    var provid = $("#provinceselectadm").val();
    var provarr = provid.split("-");
    var provcode = provarr[1];

    if (provid === "Select")
    {
        $('#selectidcitymuniadm').attr("disabled", true);
        $('#selectidcitymuniadm').selectpicker('val', 'Select');
        $('#selectidcitymuniadm').selectpicker('refresh');

        $('#selectid_barangayadm').attr("disabled", true);
        $('#selectid_barangayadm').selectpicker('val', 'Select');
        $('#selectid_barangayadm').selectpicker('refresh');

        $('#zipcodexadm').val("");
        $('#zipcodexadm').attr("disabled", true);

        $('#addressadm').val("");
        $('#addressadm').attr("disabled", true);
    }
    else
    {
        $('#selectidcitymuniadm').removeAttr("disabled");
        $('#selectidcitymuniadm').selectpicker('refresh');

        $('#selectid_barangayadm').attr("disabled", true);
        $('#selectid_barangayadm').selectpicker('val', 'Select');
        $('#selectid_barangayadm').selectpicker('refresh');

        $('#zipcodexadm').val("");
        $('#zipcodexadm').attr("disabled", true);

        $('#addressadm').val("");
        $('#addressadm').attr("disabled", true);

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
            $('#selectidcitymuniadm').append('<option value="Select">' + "Select From List" + '</option>');
            for (var cv = 0; cv < data.length; cv++)
            {
                $('#selectidcitymuniadm').append('<option value="' + data[cv]['MUN_NAME'] + "-" + data[cv]['MUNICIPALITY'] + '">' + data[cv]['MUN_NAME'] + '</option>');
            }
            $('#selectidcitymuniadm').selectpicker('refresh');
        });
    }
}

function onChangeMunicipalitySelectForAdmitPx()
{
    var provid = $("#provinceselectadm").val();
    var provarr = provid.split("-");
    var provcode = provarr[1];

    var citymunid = $("#selectidcitymuniadm").val();
    var citymunarr = citymunid.split("-");
    var citymuncode = citymunarr[1];

    if (citymunid === "Select")
    {
        $('#selectid_barangayadm').attr("disabled", true);
        $('#selectid_barangayadm').selectpicker('val', 'Select');
        $('#selectid_barangayadm').selectpicker('refresh');

        $('#zipcodexadm').val("");
        $('#zipcodexadm').attr("disabled", true);

        $('#addressadm').val("");
        $('#addressadm').attr("disabled", true);
    } else
    {
        $('#selectid_barangayadm').removeAttr("disabled");
        $('#selectid_barangayadm').selectpicker('refresh');

        $('#zipcodexadm').removeAttr("disabled");

        $('#addressadm').val("");
        $('#addressadm').attr("disabled", true);

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
//                    $('#zipcodexadm').textinput('refresh');
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
        });
    }
}


function onChangeBarangaySelectForAdmitPx()
{
    var brgy = $("#selectid_barangayadm").val();

    if (brgy === "Select")
    {
        $('#addressadm').val("");
        $('#addressadm').attr("disabled", true);
    } else
    {
        $('#addressadm').val("");
        $('#addressadm').removeAttr("disabled");
    }
}

//----------------------Membership Section------------------------------------------
function getAllMembershipDataAndAddItToTheTable()
{
    membership_table = $('#membership-masterlist-table').DataTable
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
    alert("Under Development!")
//    $('#addmembership').removeClass('d-none');
//    $('#membershiptitleheader').removeClass('d-none');
//
//    $('#membership-masterlist-div').addClass('d-none');
//    $('#membershipmodalfooter').addClass('d-none');
//    $('#addmembershipbuttondiv').addClass('d-none');
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
    $("#addNewComanageDoctorBtnForAdmAdd").prop("disabled",true);
    
    swal
    ({
        title: "Please wait!",
        text: "Processing of data is still ongoing.",
        imageUrl: BASE_URL + "assets/images/loading.gif",
        imageSize: '200x200',
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false
    });

    interval = setInterval(function ()
    {
        if ($('#comanagementform').hasClass('d-none'))
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);

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

    var rownum = $('#comanagement-masterlist-table').DataTable().rows().count();
    if (rownum === 0)
    {
        var textboxidtbl = doctorcode + "-" + "1";
    } 
    else
    {
        var comanagement_tablex = $('#comanagement-masterlist-table').DataTable();
        var sortval = comanagement_tablex.row(":last").data()[8];
        var sortvalplusone = parseInt(sortval) + 1;
        var textboxidtbl = doctorcode + "-" + sortvalplusone;
    }

    var casecodeno = $("#hiddentextid_casecodexcomanage").val();

    $("#hiddentextid_deleteparameterforcomanage").val(patientype + "," + accountnum + "," + pincodenum + "," + doctorcode + "," + typeofmana + "," + startofser + "," + casecodeno);

    if (doctrfield === "Select")
    {
        $("#docmancomanagementerr").text("Required Field!");
        $("#docmancomanagementdup").text("");
        $("#docmancomanagementdupcomdoc").addClass("d-none");
        $("#docmancomanagementdupcomdoc").html("");
        $("#docmancomanagementdupadmdoc").addClass("d-none");
        $("#docmancomanagementdupadmdoc").html("");
        error++;
    } 
    else
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

    $("#comanagement-masterlist-table tbody tr").each(function ()
    {
        var docname_col = $(this).find("td:nth-child(3)").html();

        if (doctorname === docname_col)
        {
            duplicate++;
            error++;
        }

        if (duplicate > 0)
        {
            $("#docmancomanagementdup").text("Already Exist!");
        } else
        {
            $("#docmancomanagementdup").text("");
        }
    });

    if (error > 0)
    {
        $("#addNewComanageDoctorBtnForAdmAdd").prop("disabled",false);
        
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

        var effectivedate = moment(startofser).format("MMMM DD, YYYY");
        var comanagement_table = $('#comanagement-masterlist-table').DataTable();
        var rownum = $('#comanagement-masterlist-table').DataTable().rows().count();
        
        $("#addNewComanageDoctorBtnForAdmAdd").prop("disabled",false);

        if (rownum === 0)
        {
            var sorting = "1";

            comanagement_table.row.add
                    ([
                        "<button class='btn btn-sm btn-warning waves-effect btn-com-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                <button class='btn btn-sm btn-danger waves-effect btn-com-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                        typeofmana,
                        doctorname,
                        effectivedate,
                        "no",
                        curentdate,
                        doctorcode,
                        textboxidtbl,
                        sorting
                    ]).order([8, 'asc']).draw(false);

            var comaalldata = doctorname + "|" +
                    doctorcode + "|" +
                    typeofmana + "|" +
                    moment(startofser).format("YYYY-MM-DD") + "|" +
                    sorting + "|" +
                    textboxidtbl;

            textBoxCreate(comaalldata);
        } 
        else
        {
            var newsortval = comanagement_table.row(":last").data()[8];
            var newsortvalvalplusone = parseInt(newsortval) + 1;

            comanagement_table.row.add
                    ([
                        "<button class='btn btn-sm btn-warning waves-effect btn-com-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                <button class='btn btn-sm btn-danger waves-effect btn-com-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                        typeofmana,
                        doctorname,
                        effectivedate,
                        "no",
                        curentdate,
                        doctorcode,
                        textboxidtbl,
                        newsortvalvalplusone
                    ]).order([8, 'asc']).draw(false);

            var comaalldata = doctorname + "|" +
                    doctorcode + "|" +
                    typeofmana + "|" +
                    moment(startofser).format("YYYY-MM-DD") + "|" +
                    newsortvalvalplusone + "|" +
                    textboxidtbl;

            textBoxCreate(comaalldata);
        }
    }
}

function getdoctorscomanagement()
{
    comanage_table = $('#comanagement-masterlist-table').DataTable
            ({
                sScrollY: "190px",
                sScrollX: "100%",
                responsive: true,
                processing: true,
                searching: true,
                language:
                        {
                            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
                        },
                createdRow: function (row, data, dataIndex)
                {

                },
                initComplete: function (settings, json)
                {

                }
            });
}

function showComanageDoctorForm()
{
    $('#comanagementform').removeClass('d-none');
    $('#comanagetablediv').addClass('d-none');
    $('#comanagereturnbtn').addClass('d-none');
    $('#comanagebuttondiv').addClass('d-none');
    $('#addNewComanageDoctorBtnForAdmAdd').removeClass('d-none');
    $('#edtOldComanageDoctorBtnForAdmAdd').addClass('d-none');
    $('#addNewComanageDoctorBtnForAdmEdt').addClass('d-none');
    $('#edtOldComanageDoctorBtnForAdmEdt').addClass('d-none');

    $('#hiddenid_doctornamecomanagement').val("");
    $('#hiddenid_doctorcodecomanagement').val("");

    $('#inputid_docmancomanagement').selectpicker('val', "Select");
    $('#inputid_docmancomanagement').selectpicker('refresh');
    $('#inputid_typmancomanagement').selectpicker('val', "Select");
    $('#inputid_typmancomanagement').selectpicker('refresh');
    $('#inputid_startcomanagement').val("");
    $('#hiddentextid_sortingcomanage').val("");
    $('#hiddentextid_attendingcomanage').val("");
    $('#hiddentextid_textboxidcomanage').val("");
}

function HideComanageDoctorForm()
{
    $('#comanagementform').addClass('d-none');
    $('#comanagetablediv').removeClass('d-none');
    $('#comanagereturnbtn').removeClass('d-none');
    $('#comanagebuttondiv').removeClass('d-none');

//    $("#inputid_docmancomanagement").selectpicker("val", "Select");
//    $("#inputid_typmancomanagement").selectpicker("val", "Select");
//    $("#inputid_startcomanagement").val("");
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
    } else if ($("#radio_sec").is(":checked"))
    {
        var vipvalue = 0;
        var secvalue = 1;
        var nonvalue = 0;
    } else
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

    if (nonvalue === 1)
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
    } else
    {
        var error = 0;

        if (oicincharval === "Select From List")
        {
            $("#oicinchargeviperr").text("Required Field!");
            error++;
        } else
        {
            $("#oicinchargeviperr").text("");
        }

        if (remarks == "")
        {
            $("#remarksviperr").text("Required Field!");
            error++;
        } else
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
        } else
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
                language:
                        {
                            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
                        },
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
        var dohicd = data[5];
        var dohref = data[7];

        var date = moment();
        var datecode = date.format("MMDDYYYYhhmmss");
        var datesplit = datecode.split("");
        var shuffledate = shuffle(datesplit);
        var finalformat = shuffledate.join('');
        var causescode = finalformat + "CATGDIAG";
        var textboxidtblcausesadd = causescode + "-" + counterfortblecauses;
        var textboxidtblcausesedt = causescode + "-" + counterfortblecausesadmedt;

        if (addoreditadmissionindicator === "ADD")
        {
            confinecause_table = $('#causesof-confinement-table').DataTable();
            confinecause_table.row.add
                    ([
                        "",
                        category,
                        icddiag,
                        dohicd,
                        dohref,
                        group,
                        refno,
                        causescode,
                        textboxidtblcausesadd,
                        counterfortblecauses
                    ]).order([0, 'asc']).draw(false);

            hideDiagnosisManagementModalForAdmission();

            swal
                    ({
                        title: "Success!",
                        text: "Record is successfully stored!",
                        type: "success",
                        allowOutsideClick: false
                    });

            counterfortblecauses++;

            var causesalldata = category + "|" +
                    icddiag + "|" +
                    dohicd + "|" +
                    dohref + "|" +
                    group + "|" +
                    refno + "|" +
                    causescode + "|" +
                    textboxidtblcausesadd;

            textBoxCreateForCauses(causesalldata);
        } else
        {
            confinecause_table = $('#causesof-confinement-table').DataTable();
            confinecause_table.row.add
                    ([
                        "",
                        category,
                        icddiag,
                        dohicd,
                        dohref,
                        group,
                        refno,
                        causescode,
                        textboxidtblcausesedt,
                        counterfortblecauses
                    ]).order([0, 'asc']).draw(false);

            hideDiagnosisManagementModalForAdmission();

            swal
                    ({
                        title: "Success!",
                        text: "Record is successfully stored!",
                        type: "success",
                        allowOutsideClick: false
                    });

            counterfortblecausesadmedt++;
            var causesalldata = category + "|" +
                    icddiag + "|" +
                    dohicd + "|" +
                    dohref + "|" +
                    group + "|" +
                    refno + "|" +
                    causescode + "|" +
                    textboxidtblcausesedt;

            textBoxCreateForCausesEditAdmission(causesalldata);
        }
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
        } else
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
    var dohicd = selectedDiagnosis[5];
    var dohref = selectedDiagnosis[7];

    var date = moment();
    var datecode = date.format("MMDDYYYYhhmmss");
    var datesplit = datecode.split("");
    var shuffledate = shuffle(datesplit);
    var finalformat = shuffledate.join('');
    var causescode = finalformat + "CATGDIAG";
    var textboxidtblcausesadd = causescode + "-" + counterfortblecauses;
    var textboxidtblcausesedt = causescode + "-" + counterfortblecausesadmedt;

    if (addoreditadmissionindicator === "ADD")
    {
        confinecause_table = $('#causesof-confinement-table').DataTable();
        confinecause_table.row.add
                ([
                    "",
                    category,
                    icddiag,
                    dohicd,
                    dohref,
                    group,
                    refno,
                    causescode,
                    textboxidtblcausesadd,
                    counterfortblecauses
                ]).order([0, 'asc']).draw(false);

        hideDiagnosisManagementModalForAdmission();

        swal
                ({
                    title: "Success!",
                    text: "Record is successfully stored!",
                    type: "success",
                    allowOutsideClick: false
                });

        counterfortblecauses++;
        var causesalldata = category + "|" +
                icddiag + "|" +
                dohicd + "|" +
                dohref + "|" +
                group + "|" +
                refno + "|" +
                causescode + "|" +
                textboxidtblcausesadd;

        textBoxCreateForCauses(causesalldata);
    } else
    {
        confinecause_table = $('#causesof-confinement-table').DataTable();
        confinecause_table.row.add
                ([
                    "",
                    category,
                    icddiag,
                    dohicd,
                    dohref,
                    group,
                    refno,
                    causescode,
                    textboxidtblcausesedt,
                    counterfortblecauses
                ]).order([0, 'asc']).draw(false);

        hideDiagnosisManagementModalForAdmission();

        swal
                ({
                    title: "Success!",
                    text: "Record is successfully stored!",
                    type: "success",
                    allowOutsideClick: false
                });

        counterfortblecausesadmedt++;
        var causesalldata = category + "|" +
                icddiag + "|" +
                dohicd + "|" +
                dohref + "|" +
                group + "|" +
                refno + "|" +
                causescode + "|" +
                textboxidtblcausesedt;

        textBoxCreateForCausesEditAdmission(causesalldata);
    }
}

function getcausesofconfinement()
{
    confinecause_table = $('#causesof-confinement-table').DataTable
            ({
                sScrollY: "85px",
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
                    $('td', row).eq(0).html(dataIndex + 1);
                },
                initComplete: function (settings, json)
                {

                }
            });
//    confinecause_table.columns([5,6]).visible(false);
}

function selectCausesConfinement()
{
    var data;

    $('#causesof-confinement-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } else
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
    if (confinecause_table.rows('.bg-blue').any())
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

                                confinecause_table.row('.bg-blue').remove().order([[9, 'asc']]).draw(false);

                                $('#myFormCauseConAdmitAdd').empty();

                                var rownum = $('#causesof-confinement-table').DataTable().rows().count();

                                for (var i = 0; i < rownum; i++)
                                {
                                    var counter = parseInt(i) + 1;

                                    var rowanddata = confinecause_table.row(i).data();

                                    confinecause_table.row(i).data
                                            ([
                                                counter,
                                                rowanddata[1],
                                                rowanddata[2],
                                                rowanddata[3],
                                                rowanddata[4],
                                                rowanddata[5],
                                                rowanddata[6],
                                                rowanddata[7],
                                                rowanddata[8],
                                                counter
                                            ]).order([9, 'asc']).draw();

                                    var causesalldata = rowanddata[1] + "|" +
                                            rowanddata[2] + "|" +
                                            rowanddata[3] + "|" +
                                            rowanddata[4] + "|" +
                                            rowanddata[5] + "|" +
                                            rowanddata[6] + "|" +
                                            rowanddata[7] + "|" +
                                            counter + "|" +
                                            rowanddata[8];

                                    textBoxCreateForCauses(causesalldata);
                                }
                            } else
                            {
                                swal("Error", "Error in saving. Please try again!", "error");
                            }
                        });
    } else
    {
        swal
                ({
                    title: "Notification",
                    text: "Select row first from confinement table for deletion!",
                    type: "warning"
                });
    }
}

function addNewDiagnosis()
{
    var date = moment();
    var datecode = date.format("MMDDYYYYhhmmss");
    var refnodiagnose = datecode + "ADMTCATG";
    var dohcateg = $('#dohcateg').val();
    var icd10code = $('#icd10code').val();
    var icd10categ = $('#icd10categ').val();
    var diagnosis = $('#diagnosis').val();
    var recordsiddiag = $('#recordsiddiag').val();
    var recordsbydiag = $('#recordsbydiag').val();

    $.ajax
            ({
                type: 'POST',
                data:
                        {
                            dohcateg: dohcateg,
                            icd10code: icd10code,
                            icd10categ: icd10categ,
                            diagnosis: diagnosis,
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
                    checkFieldValidations(result.errors.dohcateg, 'dohcategerror', 'dohcateg');
                    checkFieldValidations(result.errors.diagnosis, 'diagnosiserror', 'diagnosis');
                } else
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
    $('#groupingdiag1').selectpicker("val", "");
    $('#groupingdiag2').val("");

    $('#diagnosisdiag').css("border-color", "");
    $('#groupingdiag1').css("border-color", "");
    $('#groupingdiag2').css("border-color", "");

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
                $('#dohcateg').val(result[0].categdiag);
                $('#icd10code').val(result[0].icdcode);
                $('#icd10categ').val(result[0].icdcateg);
                $('#diagnosis').val(result[0].Groupname);
            });
}

function updateDiagnosis()
{
    var diagcode = $('#diagid').val();
    var refnodiag = $('#refnodiag').val();
    var dohcateg = $('#dohcateg').val();
    var icd10code = $('#icd10code').val();
    var icd10categ = $('#icd10categ').val();
    var diagnosis = $('#diagnosis').val();
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
                        $.ajax
                                ({
                                    type: 'POST',
                                    data:
                                            {
                                                diagcode: diagcode,
                                                refnodiag: refnodiag,
                                                dohcateg: dohcateg,
                                                icd10code: icd10code,
                                                icd10categ: icd10categ,
                                                diagnosis: diagnosis,
                                                recordsiddiag: recordsiddiag,
                                                recordsbydiag: recordsbydiag
                                            },
                                    url: BASE_URL + 'Diagnosis/UpdateDiagnosis',
                                    dataType: 'json',
                                    success: function (result)
                                    {
                                        if (result.status == false)
                                        {
                                            checkFieldValidations(result.errors.dohcateg, 'dohcategerror', 'dohcateg');
                                            checkFieldValidations(result.errors.diagnosis, 'diagnosiserror', 'diagnosis');
                                        } else
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
                    } else
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
    $("#VisualInfusionCollapse").collapse('hide');


    $("#phhm").css('background', '#168C94');
    $("#pxcl").css('background', '');
    $("#vipm").css('background', '');
    $("#vips").css('background', '');

}
function collapseClassificationCollapseDiv()
{
    $("#philhealthandHMOCollapse").collapse('hide');
    $("#ClassificationCollapse").collapse('show');
    $("#PackagesandVIPCollapse").collapse('hide');
    $("#VisualInfusionCollapse").collapse('hide');

    $("#phhm").css('background', '');
    $("#pxcl").css('background', '#168C94');
    $("#vipm").css('background', '');
    $("#vips").css('background', '');
}
function collapsePackagesandVIPCollapseDiv()
{
    $("#philhealthandHMOCollapse").collapse('hide');
    $("#ClassificationCollapse").collapse('hide');
    $("#PackagesandVIPCollapse").collapse('show');
    $("#VisualInfusionCollapse").collapse('hide');

    $("#phhm").css('background', '');
    $("#pxcl").css('background', '');
    $("#vipm").css('background', '#168C94');
    $("#vips").css('background', '');
}
function collapseVisualInfusionCollapseDiv()
{
    $("#philhealthandHMOCollapse").collapse('hide');
    $("#ClassificationCollapse").collapse('hide');
    $("#PackagesandVIPCollapse").collapse('hide');
    $("#VisualInfusionCollapse").collapse('show');

    $("#phhm").css('background', '');
    $("#pxcl").css('background', '');
    $("#vipm").css('background', '');
    $("#vips").css('background', '#168C94');
}


function collapseComplaintsCollapseDiv()
{
    $("#ComplaintsIPDCollapse").collapse('show');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('hide');
    $("#ImpressionOPDCollapse").collapse('hide');
    $("#ConfinementIPDCollapse").collapse('hide');

    $("#comp").css('background', '#168C94');
    $("#diag").css('background', '');
    $("#diet").css('background', '');
    $("#dietopd").css('background', '');
    $("#conf").css('background', '');
}

function collapseDiagnosisCollapseDiv()
{
    $("#ComplaintsIPDCollapse").collapse('hide');
    $("#DiagnosisIPDCollapse").collapse('show');
    $("#DietaryIPDCollapse").collapse('hide');
    $("#ImpressionOPDCollapse").collapse('hide');
    $("#ConfinementIPDCollapse").collapse('hide');

    $("#comp").css('background', '');
    $("#diag").css('background', '#168C94');
    $("#diet").css('background', '');
    $("#dietopd").css('background', '');
    $("#conf").css('background', '');
}

function collapseDietaryCollapseDiv()
{
    $("#ComplaintsIPDCollapse").collapse('hide');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('show');
    $("#ImpressionOPDCollapse").collapse('show');
    $("#ConfinementIPDCollapse").collapse('hide');

    $("#comp").css('background', '');
    $("#diag").css('background', '');
    $("#diet").css('background', '#168C94');
    $("#dietopd").css('background', '#168C94');
    $("#conf").css('background', '');
}

function collapseImpressionCollapseDivOPD()
{
    $("#ComplaintsIPDCollapse").collapse('hide');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('show');
    $("#ImpressionOPDCollapse").collapse('show');
    $("#ConfinementIPDCollapse").collapse('hide');

    $("#comp").css('background', '');
    $("#diag").css('background', '');
    $("#diet").css('background', '#168C94');
    $("#dietopd").css('background', '#168C94');
    $("#conf").css('background', '');
}

function collapseConfinementCollapseDiv()
{
    $("#ComplaintsIPDCollapse").collapse('hide');
    $("#DiagnosisIPDCollapse").collapse('hide');
    $("#DietaryIPDCollapse").collapse('hide');
    $("#ImpressionOPDCollapse").collapse('hide');
    $("#ConfinementIPDCollapse").collapse('show');

    $("#comp").css('background', '');
    $("#diag").css('background', '');
    $("#diet").css('background', '');
    $("#dietopd").css('background', '');
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
    $("#admitliid").css("font-weight", "bold");
}

function clickgeneraltab()
{
    $('.nav-tabs a[href="#generalinfo"]').tab('show');
    $('#clickgeneralid').tab('show');
    $('#clickgeneralid').click();
}

//-------------------------------opdwalkin section------------------------------

function showOPDWalkinMasterlistForMembershipModal()
{
    $('#searchdopdwalkinmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#searchmembershipmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#searchdopdwalkinmodal').css('overflow-y', 'scroll');

    hideOPDWalkinFormForMembershipModal();

    opdwalkin_table.on('dblclick', 'tr', function ()
    {
        var data = opdwalkin_table.row(this).data();
        var opdrefno = data[6];
        $("#opdrefmembr").val(opdrefno.toUpperCase());
        hideOPDWalkinMasterlistForMembershipModal();
    });
}

function hideOPDWalkinMasterlistForMembershipModal()
{
    $('#searchdopdwalkinmodal').modal("hide");

    $('#searchmembershipmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
}

function showOPDWalkinFormForMembershipModal()
{
    $('#opdwalkin-addbuttondiv').addClass('d-none');
    $('#opdwalkin-masterlist-tablediv').addClass('d-none');
    $('#opdwalkin-button-footerdiv').addClass('d-none');
    $('#opdwalkin-form').removeClass('d-none');
}

function hideOPDWalkinFormForMembershipModal()
{
    $('#opdwalkin-addbuttondiv').removeClass('d-none');
    $('#opdwalkin-masterlist-tablediv').removeClass('d-none');
    $('#opdwalkin-button-footerdiv').removeClass('d-none');
    $('#opdwalkin-form').addClass('d-none');
}

function getAllOPDWalkinDataAndAddItToTheTable()
{
    opdwalkin_table = $('#opdwalkin-masterlist-table').DataTable
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
                            url: BASE_URL + 'Admission/DisplayOPDWalkin',
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

function selectOPDWalkin()
{
    var data;

    $('#opdwalkin-masterlist-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } else
        {
            $('#opdwalkin-masterlist-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#opdwalkin-masterlist-table').DataTable().row('.bg-blue').data();
            selectedOPDWalkin = data;
        }
    });
}

function selectOPDWalkinForAdmitPatient()
{
    var opdrefno = selectedOPDWalkin[6];
    $("#opdrefmembr").val(opdrefno.toUpperCase());
    hideOPDWalkinMasterlistForMembershipModal();
}

function addNewOPDWalkinPatient()
{
    var patientno = $('#patientno').val();
    var Slrefno = $('#Slrefno').val();
    var tin = $('#tin').val();
    var recid = $('#recid').val();
    var recby = $('#recby').val();
    var updated = $('#updated').val();
    var station = $('#station').val();
    var opid = $('#opid').val();
    var OPDno = $('#OPDno').val();
    var ledgerfile = $('#ledgerfile').val();
    var inpaaccntwi = $('#inpaaccntwi').val();
    var memberidwi = $('#memberidwi').val();
    var patnamewi = $('#patnamewi').val();
    var genderwi = $('#genderwi').val();
    var birthdaywi = $('#birthdaywi').val();
    var ageofpxwi = $('#ageofpxwi').val();
    var addresswi = $('#addresswi').val();
    var cityaddwi = $('#cityaddwi').val();
    var cellphonewi = $('#cellphonewi').val();

    $.ajax
            ({
                type: 'POST',
                data:
                        {
                            OPDnox: OPDno,
                            genderwix: genderwi,
                            patientnox: patientno,
                            Slrefnox: Slrefno,
                            tinx: tin,
                            recidx: recid,
                            recbyx: recby,
                            updatedx: updated,
                            stationx: station,
                            opidx: opid,
                            ledgerfilex: ledgerfile,
                            inpaaccntwix: inpaaccntwi,
                            memberidwix: memberidwi,
                            patnamewix: patnamewi,
                            ageofpxwix: ageofpxwi,
                            addresswix: addresswi,
                            cityaddwix: cityaddwi,
                            cellphonewix: cellphonewi,
                            birthdaywix: birthdaywi,
                        },
                dataType: 'json',
                url: BASE_URL + 'Admission/AddNewOPDWalkinPx'

            })

            .done(function (result)
            {
                if (result.status == false)
                {
                    checkFieldValidations(result.errors.inpaaccntwixget, 'inpaaccntwierror', 'inpaaccntwi');
                    checkFieldValidations(result.errors.patnamewixget, 'patnamewierror', 'patnamewi');
                    checkFieldValidations(result.errors.birthdaywixget, 'birthdaywierror', 'birthdaywi');
                    checkFieldValidations(result.errors.ageofpxwixget, 'ageofpxwierror', 'ageofpxwi');
                    checkFieldValidations(result.errors.genderwixget, 'genderwierror', 'genderwi');
                    checkFieldValidations(result.errors.addresswixget, 'addresswierror', 'addresswi');
                    checkFieldValidations(result.errors.cityaddwixget, 'cityaddwierror', 'cityaddwi');
                    checkFieldValidations(result.errors.cellphonewixget, 'cellphonewierror', 'cellphonewi');
                    checkFieldValidations(result.errors.memberidwixget, 'memberidwierror', 'memberidwi');
                } else
                {
                    hideOPDWalkinFormForMembershipModal();

                    swal
                            ({
                                title: "Success!",
                                text: "Record is successfully saved!",
                                type: "success",
                                allowOutsideClick: false
                            });

                    opdwalkin_table.ajax.reload();
                    $('#opdwalkin-masterlist-table_filter [type="search"]').val(patnamewi);
                    $('#opdwalkin-masterlist-table_filter [type="search"]').focus();
                    opdwalkin_table.search(patnamewi).draw();
                }
            });
}

function textBoxCreate(comaalldata)
{
    var comasplit = comaalldata.split('|');
    var docname = comasplit[0];
    var doccode = comasplit[1];
    var typeman = comasplit[2];
    var startco = comasplit[3];
    var sorting = comasplit[4];
    var textboxidtbl = comasplit[5];


    counterfortext = parseInt(counterfortext) + parseInt(sorting);

    var x = document.createElement("INPUT");
    x.setAttribute("type", "hidden");
    x.setAttribute("id", textboxidtbl);
    x.setAttribute("name", "docname_comanage" + sorting);
    x.setAttribute("class", "docname_comanage" + sorting);
    x.setAttribute("value", docname);
    document.getElementById("myFormComanageAdmitAdd").appendChild(x);

    var y = document.createElement("INPUT");
    y.setAttribute("type", "hidden");
    y.setAttribute("id", textboxidtbl);
    y.setAttribute("name", "doccode_comanage" + sorting);
    y.setAttribute("class", "doccode_comanage" + sorting);
    y.setAttribute("value", doccode);
    document.getElementById("myFormComanageAdmitAdd").appendChild(y);

    var z = document.createElement("INPUT");
    z.setAttribute("type", "hidden");
    z.setAttribute("id", textboxidtbl);
    z.setAttribute("name", "typeman_comanage" + sorting);
    z.setAttribute("class", "typeman_comanage" + sorting);
    z.setAttribute("value", typeman);
    document.getElementById("myFormComanageAdmitAdd").appendChild(z);

    var a = document.createElement("INPUT");
    a.setAttribute("type", "hidden");
    a.setAttribute("id", textboxidtbl);
    a.setAttribute("name", "startco_comanage" + sorting);
    a.setAttribute("class", "startco_comanage" + sorting);
    a.setAttribute("value", startco);
    document.getElementById("myFormComanageAdmitAdd").appendChild(a);

    var br = document.createElement("BR");
    document.getElementById("myFormComanageAdmitAdd").appendChild(br);
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

function textBoxCreateForCauses(causesalldata)
{
    var causessplit = causesalldata.split("|");
    var category = causessplit[0];
    var icddiag = causessplit[1];
    var dohicd = causessplit[2];
    var dohref = causessplit[3];
    var group = causessplit[4];
    var refno = causessplit[5];
    var causescode = causessplit[6];
    var counter = causessplit[7];
    var textboxidtblcauses = causessplit[8];

    var category_input = document.createElement("INPUT");
    category_input.setAttribute("type", "hidden");
    category_input.setAttribute("id", textboxidtblcauses);
    category_input.setAttribute("name", "category_causes" + counter);
    category_input.setAttribute("class", "category_causes" + counter);
    category_input.setAttribute("value", category);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(category_input);

    var icddiag_input = document.createElement("INPUT");
    icddiag_input.setAttribute("type", "hidden");
    icddiag_input.setAttribute("id", textboxidtblcauses);
    icddiag_input.setAttribute("name", "icddiag_causes" + counter);
    icddiag_input.setAttribute("class", "icddiag_causes" + counter);
    icddiag_input.setAttribute("value", icddiag);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(icddiag_input);

    var dohicd_input = document.createElement("INPUT");
    dohicd_input.setAttribute("type", "hidden");
    dohicd_input.setAttribute("id", textboxidtblcauses);
    dohicd_input.setAttribute("name", "dohicd_causes" + counter);
    dohicd_input.setAttribute("class", "dohicd_causes" + counter);
    dohicd_input.setAttribute("value", dohicd);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(dohicd_input);

    var dohref_input = document.createElement("INPUT");
    dohref_input.setAttribute("type", "hidden");
    dohref_input.setAttribute("id", textboxidtblcauses);
    dohref_input.setAttribute("name", "dohref_causes" + counter);
    dohref_input.setAttribute("class", "dohref_causes" + counter);
    dohref_input.setAttribute("value", dohref);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(dohref_input);

    var group_input = document.createElement("INPUT");
    group_input.setAttribute("type", "hidden");
    group_input.setAttribute("id", textboxidtblcauses);
    group_input.setAttribute("name", "group_causes" + counter);
    group_input.setAttribute("class", "group_causes" + counter);
    group_input.setAttribute("value", group);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(group_input);

    var refno_input = document.createElement("INPUT");
    refno_input.setAttribute("type", "hidden");
    refno_input.setAttribute("id", textboxidtblcauses);
    refno_input.setAttribute("name", "refno_causes" + counter);
    refno_input.setAttribute("class", "refno_causes" + counter);
    refno_input.setAttribute("value", refno);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(refno_input);

    var causescode_input = document.createElement("INPUT");
    causescode_input.setAttribute("type", "hidden");
    causescode_input.setAttribute("id", textboxidtblcauses);
    causescode_input.setAttribute("name", "causescode_causes" + counter);
    causescode_input.setAttribute("class", "causescode_causes" + counter);
    causescode_input.setAttribute("value", causescode);
    document.getElementById("myFormCauseConAdmitAdd").appendChild(causescode_input);

    var br = document.createElement("BR");
    document.getElementById("myFormCauseConAdmitAdd").appendChild(br);
}

function showEditAdmittedPatientModal(caseno)
{
    setToDefaultAllFieldsOfAdmitPatientModal();

    $('#inputid_hiddenIDadm').val(caseno);

    $('#admitpatientmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('body').css('overflow', 'hidden');
    $('#admitpatientmodal').css('overflow-y', 'scroll');

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

    interval = setInterval(function ()
    {
        if ($('#inputid_slcodeadm').val() !== "")
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);

    addoreditadmissionindicator = "EDT";

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
    $("#vips").css('background', '');

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
    $("#VisualInfusionCollapse").collapse('hide');

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
    $('#selectid_entrytypeadm').selectpicker('val', 'Disabled');
    $('#selectid_entrytypeadm').selectpicker('refresh');

    $('#admissiontypehiddentext').val('Normal');
    $('#inputid_pathologyadm').val('NON-PATHOLOGY');
    $('#textboxid_forminororadm').val(0);

    $('#editadmitPatientButton').removeClass('d-none');
    $('#editquickadmitPatientButton').addClass('d-none');
    $('#admitPatientButton').addClass('d-none');

    $('#hideeditadmitpxmodalbtnid').removeClass('d-none');
    $('#hideadmitpxmodalbtnid').addClass('d-none');

    $('#InsertAdmissionButtonForComanagement').addClass('d-none');
    $('#UpdateAdmissionButtonForComanagement').removeClass('d-none');

    $('#showHMOManagementModalButtonForInsertAdmission').addClass('d-none');
    $('#showHMOManagementModalButtonForUpdateAdmission').removeClass('d-none');

    $('#showDiagnosisManagementModalButtonForAdmissionInsert').addClass('d-none');
    $('#showDiagnosisManagementModalButtonForAdmissionUpdate').removeClass('d-none');

    $('#selectCausesOfConfinementButtonForDeleteAdmAdd').addClass('d-none');
    $('#selectCausesOfConfinementButtonForDeleteAdmEdt').removeClass('d-none');

    $('#addNewComanageDoctorBtnForAdmAdd').addClass('d-none');
    $('#addNewComanageDoctorBtnForAdmEdt').removeClass('d-none');

    $('#AddHMOForInsertAdmission').addClass('d-none');
    $('#AddHMOForUpdateAdmission').removeClass('d-none');

    $('#myFormComanageAdmitEdt').empty();
    $('#myFormComanageAdmitAdd').empty();

    $('#myFormHMOInsurAdmitEdt').empty();
    $('#myFormHMOInsurAdmitAdd').empty();

    $('#myFormCauseConAdmitEdt').empty();
    $('#myFormCauseConAdmitAdd').empty();

    $('.insertadmitpatientheader').prop('hidden', true);
    $('.updateadmitpatientheader').prop('hidden', false);

    $('#insertadmitpatientformheader').prop('hidden', true);
    $('#updateadmitpatientformheader').prop('hidden', false);

    $('#textid_deleteindicatorforpxpkgupdateadmedt').val("");
    $('#textid_updateindicatorforpxpkgupdateadmedt').val("");

    $("#addNewVIPButtonForAdmissionInsert").addClass('d-none');
    $("#edtOldVIPButtonForAdmissionUpdate").removeClass('d-none');

    $('#buttonid_indirectcancelbutton').removeClass("d-none");
    $('#buttonid_directcancelbutton').addClass("d-none");

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
                    var imagepath = BASE_URL + 'assets/images/uploads/patients/' + data.inpatientlistdata['PIN'] + 'p.jpg';
                    var imgdefaul = BASE_URL + 'assets/images/uploads/patients/' + 'default.png';

                    $.ajax
                            ({
                                url: imagepath,
                                type: 'HEAD',
                                error: function ()
                                {
                                    var img = $('#patientimguploadforadmpx').attr('src', imgdefaul);
                                    var src = img.attr('src');
                                    var i = src.indexOf('?dummy=');
                                    src = i != -1 ? src.substring(0, i) : src;
                                    var d = new Date();
                                    img.attr('src', src + '?dummy=' + d.getTime());
                                },
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

                    var slaccountx = data.inpatientlistdata['slcode'];
                    if (slaccountx === "" || slaccountx === null)
                    {
                        generateSLCodeForAdmission();
                    } 
                    else
                    {
                        $("#inputid_slcodeadm").val(slaccountx);
                        $('#hiddeninputid_slcodeadm').val(slaccountx);
                    }

                    var opdtype = data.inpatientlistdata['opdtype'];
                    $('#inputid_opdtypexdataadm').val(opdtype);
                    $('#accountnumberadm').val(caseno);
                    $('#pxindexnoadm').val(data.inpatientlistdata['PIN']);
                    $('#hiddeninputid_pincodeadm').val(data.inpatientlistdata['pincode']);
                    $('#hiddeninputid_casecodexadm').val(data.inpatientlistdata['casecode']);
                    $('#hiddeninputid_pinformatadm').val(data.inpatientlistdata['pinformat']);

                    var healrecno = data.inpatientlistdata['HRnCODE'];
                    if (healrecno === '000000')
                    {
                        $('#healthrecnoadm').val("");
                    }
                    else
                    {
                        var hrnnumber = healrecno.toString().replace(/\B(?=(?:\d{2})+(?!\d))/g, "-");
                        $('#healthrecnoadm').val(hrnnumber);
                    }
                    
                    var logbookCN = data.inpatientlistdata['logbookCN'];
                    if (logbookCN === '000000' || healrecno === "")
                    {
                        $('#casenumberadm').val("");
                    }
                    else
                    {
                        var logbookno = logbookCN.toString().replace(/\B(?=(?:\d{2})+(?!\d))/g, "-");
                        $('#casenumberadm').val(logbookno);
                    }
                    
                    $('#admixontypeselectadm').selectpicker('val', data.inpatientlistdata['admittype']);
                    $('#inputid_vmembershipadm').val(data.inpatientlistdata['memberrefno']);

                    if (data.inpatientlistdata['relationtomember'] === "")
                    {
                        $('#reltomemberadm ').selectpicker('val', "");
                        $('#reltomemberadm ').selectpicker('refresh');
                    } else
                    {
                        $('#reltomemberadm ').selectpicker('val', data.inpatientlistdata['relationtomember']);
                        $('#reltomemberadm ').selectpicker('refresh');
                    }

                    $('#selectid_patienttypeadm').selectpicker('val', data.inpatientlistdata['pxtype']);
                    var pxtype = data.inpatientlistdata['pxtype'];

                    if (pxtype === "IPD")
                    {
                        $('#impressionopdadm').val("");
                        $('#textboxid_icd10adm').val("");

                        $('#textid_reasontext').html("Reason of Admission");
                        $('#textid_admitdiagtext').html("Admitting Diagnosis");
                        $('#textid_minorortext').html("For Minor OR");
                        $('#chckboxid_forminororadm').prop("disabled", false);
                        var forminorOR = $('#textboxid_forminororadm').val(data.inpatientlistdata['minorOR']);
                        if (forminorOR.val() === "1")
                        {
                            $('#chckboxid_forminororadm').click();
                        }
                        $('#textid_causeconfine').html("Causes of Confinement");

                        $('#inputid_opdtypexdataadm').prop('disabled', true);
                        $('#opdtypebutton').prop('disabled', true);

                        $('#stationnameadm').prop('disabled', false);
                        if (data.inpatientlistdata['nursestation'] === "QUICK ADMTD")
                        {
                            $('#stationnameadm').selectpicker('val', "Select");
                        } else
                        {
                            $('#stationnameadm').selectpicker('val', data.inpatientlistdata['nursestation']);
                        }
                        $('#stationnameadm').selectpicker('refresh');

                        $("#inputid_opdtypeadmerr").html("");
                        $("#inputid_entrytypeadmerr").html("");

                        $("#inputid_opdtypexdataadm").val("IPDPX");
                        $("#hiddenid_opdtypeadm").val("IPDPX");

                        $("#radioid_emergencyadm").prop("checked", false);
                        $("#radioid_checkupopdadm").prop("checked", false);
                        $("#radioid_outsideadm").prop("checked", false);

                        $('#dietopd').addClass('d-none');
                        $('#diet').removeClass('d-none');

                        $('#ImpressionOPDCollapse').addClass('d-none');
                        $('#DietaryIPDCollapse').removeClass('d-none');

                        $('#selectid_entrytypeadm').prop('disabled', true);
                        $('#selectid_entrytypeadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
                        $('#selectid_entrytypeadm').selectpicker('val', 'Disabled');
                        $('#selectid_entrytypeadm').selectpicker('refresh');
                        $('#selectid_entrytypeadmerr').html("");

                        $("#watchernameadm").prop('disabled', false);
                        $('#watchernameadm').val(data.inpatientlistdata['guarantor']);
                        $("#watchernameadmerr").html("");

                        $("#watcherbirthadm").prop('disabled', false);
                        $("#watcherbirthadmerr").html('');
                        if (data.inpatientlistdata['guarantor_bday'] === "1901-01-01")
                        {
                            $('#watcherbirthadm').val("");
                        } else
                        {
                            $('#watcherbirthadm').val(moment(data.inpatientlistdata['guarantor_bday']).format("MMMM DD, YYYY"));
                        }

                        $("#guardiannumadm").prop('disabled', false);
                        $('#guardiannumadm').val(data.inpatientlistdata['guarantor_mobileno']);
                        $("#guardiannumadmerr").html('');

                        $("#weightadm").prop('disabled', false);
                        $("#weightadmerr").html('');

                        if (data.inpatientlistdata['Weight'] === "0.00")
                        {
                            $('#weightadm').val("");
                        } else
                        {
                            $('#weightadm').val(data.inpatientlistdata['Weight']);
                        }

                        $.ajax
                                ({
                                    type: 'POST',
                                    url: BASE_URL + "Admission/getInPatientSublistDataForEditAdmitPatient",
                                    data: {casenox: caseno},
                                    dataType: 'json'
                                })
                                .done(function (result)
                                {
                                    if (result.status === true)
                                    {
                                        var linkaccountimportval = result.inpatientsublistdata["linkaccount"];
                                        $('#linkaccountadm').val(linkaccountimportval);
                                        $("#linkaccountadm").prop('disabled', false);
                                        $("#linkaccountadmerr").html('');
                                    }
                                });

                        $("#billingrecipientadm").prop('disabled', false);
                        $('#billingrecipientadm').val(data.inpatientlistdata['billingcprecipient']);
                        $("#billingcpbtn").prop('disabled', false);
                        $("#billingcpspanid").css('background', 'white');
                        $("#billingrecipientadmerr").html('');

                        $("#patientrecipientadm").prop('disabled', false);
                        $('#patientrecipientadm').val(data.inpatientlistdata['billingcprecipient']);
                        $("#pxcprecipientbtn").prop('disabled', false);
                        $("#pxcprecipientspanid").css('background', 'white');
                        $("#patientrecipientadm").html('');

                        $('#reltopatientadm').prop('disabled', false);
                        $("#reltopatientadm option[value='Disabled']").remove();
                        $('#reltopatientadm').selectpicker('val', data.inpatientlistdata['guarantor_rltn']);
                        $('#reltopatientadm').selectpicker('refresh');
                        $('#reltopatientadmerr').html('');

                        $("#inputid_tbdotsstatusadm").prop('disabled', false);
                        $("#inputid_tbdotsstatusadm option[value='Disabled']").remove();
                        if (data.inpatientlistdata['TBstatus'] === "")
                        {
                            $('#inputid_tbdotsstatusadm').selectpicker('val', "Select");
                        } else
                        {
                            $('#inputid_tbdotsstatusadm').selectpicker('val', data.inpatientlistdata['TBstatus']);
                        }
                        $('#inputid_tbdotsstatusadm').selectpicker('refresh');
                        $('#inputid_tbdotsstatusadmerr').html('');

                        $('#cautionsadm').prop('disabled', false);
                        $("#cautionsadm option[value='Disabled']").remove();
                        if (data.inpatientlistdata['cautions'] === "")
                        {
                            $('#cautionsadm').selectpicker('val', "Select");
                        } else
                        {
                            $('#cautionsadm').selectpicker('val', data.inpatientlistdata['cautions']);
                        }
                        $('#cautionsadm').selectpicker('refresh');
                        $('#cautionsadmerr').html('');

                        $('#nurseinchargeadm').prop('disabled', false);
                        $("#nurseinchargeadm option[value='Disabled']").remove();
                        $('#nurseinchargeadm').selectpicker('val', data.inpatientlistdata['NurseIncharge'] + " - " + data.inpatientlistdata['NurseInchargeID']);
                        $('#nurseinchargeadm').selectpicker('refresh');
                        $('#nurseinchargeadmerr').html('');

                        $('#radioid_normaltypeadm').prop('disabled', false);
                        $('#radioid_emergencytypeadm').prop('disabled', false);

                        var admissionsource = $('#admissiontypehiddentext').val(data.inpatientlistdata['admissionsource']);
                        if (admissionsource.val() === "EMERGENCY")
                        {
                            $('#radioid_emergencytypeadm').click();
                        } else
                        {
                            $('#radioid_normaltypeadm').click();
                        }

                        $('#disableforopdindicator').html('');
                    } else
                    {
                        $('#impressionopdadm').val(data.inpatientlistdata['phiccasefirstDx']);
                        $('#textboxid_icd10adm').val(data.inpatientlistdata['phiccasefirst']);

                        $('#textid_reasontext').html("Complaints");
                        $('#textid_admitdiagtext').html("Reason of OPD Consultation");
                        $('#textid_minorortext').html("Disabled for OPD");
                        $('#chckboxid_forminororadm').prop("disabled", true);
                        $('#textid_causeconfine').html("OPD Consultation Category");

                        $('#inputid_opdtypexdataadm').prop('disabled', false);
                        $('#inputid_opdtypexdataadm').val(data.inpatientlistdata['opdtype']);
                        $("#hiddenid_opdtypeadm").val(data.inpatientlistdata['opdtype']);
                        $('#opdtypebutton').prop('disabled', false);

                        $("#radioid_emergencyadm").prop("checked", false);
                        $("#radioid_checkupopdadm").prop("checked", false);
                        $("#radioid_outsideadm").prop("checked", false);

                        $("#stationnameadm").selectpicker("val", "Select");
                        $('#stationnameadm').prop('disabled', true);
                        $('#stationnameadm').selectpicker('refresh');

                        $("#stationnameadmerr").html("");

                        $('#dietopd').removeClass('d-none');
                        $('#diet').addClass('d-none');

                        $('#ImpressionOPDCollapse').removeClass('d-none');
                        $('#DietaryIPDCollapse').addClass('d-none');

                        $('#selectid_entrytypeadm').prop('disabled', false);
                        $("#selectid_entrytypeadm option[value='Disabled']").remove();
                        $('#selectid_entrytypeadm').selectpicker('val', data.inpatientlistdata['casetype']);
                        $('#selectid_entrytypeadm').selectpicker('refresh');
                        $('#selectid_entrytypeadmerr').html("");

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
                        $('#reltopatientadm').selectpicker('val', 'Disabled');
                        $('#reltopatientadm').selectpicker('refresh');
                        $('#reltopatientadmerr').html('');


                        $("#inputid_tbdotsstatusadm").prop('disabled', true);
                        $('#inputid_tbdotsstatusadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
                        $('#inputid_tbdotsstatusadm').selectpicker('val', 'Disabled');
                        $('#inputid_tbdotsstatusadm').selectpicker('refresh');
                        $('#inputid_tbdotsstatusadmerr').html('');

                        $('#cautionsadm').prop('disabled', true);
                        $('#cautionsadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
                        $('#cautionsadm').selectpicker('val', 'Disabled');
                        $('#cautionsadm').selectpicker('refresh');
                        $('#cautionsadmerr').html('');

                        $('#nurseinchargeadm').prop('disabled', true);
                        $('#nurseinchargeadm').append('<option value="Disabled">' + "Disabled For OPD Type" + '</option>');
                        $('#nurseinchargeadm').selectpicker('val', 'Disabled');
                        $('#nurseinchargeadm').selectpicker('refresh');
                        $('#nurseinchargeadmerr').html('');

                        $('#guardianerrcolapseindicator').html('');
                        $('#admissionerrcolapseindicator').html('');

                        var attendant = $("#accomodaerrcolapseindicator").html();
                        var accomodat = $("#accomodaerrcolapseindicator").html();

                        if (attendant === "" && accomodat === "")
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

                    $('#lastnameadm').val(data.inpatientlistdata['lname']);
                    $('#firstnameadm').val(data.inpatientlistdata['fname']);
                    $('#suffixadm').val(data.inpatientlistdata['suffix']);
                    $('#middlenameadm').val(data.inpatientlistdata['mname']);
                    $('#genderadm').val(data.inpatientlistdata['sex']);
                    $('#nationalityadm').val(data.inpatientlistdata['nationality']);
                    $('#religionselectadm').selectpicker('val', data.inpatientlistdata['religion']);

                    if (data.inpatientlistdata['vip'] === 0 || data.inpatientlistdata['vip'] === "0")
                    {
                        $('#numboxid_vipscore').val("");
                    } else
                    {
                        $('#numboxid_vipscore').val(data.inpatientlistdata['vip']);
                    }

                    $('#hiddenid_pxfnameupdadm').val(data.inpatientlistdata['fname']);
                    $('#hiddenid_pxmnameupdadm').val(data.inpatientlistdata['mname']);
                    $('#hiddenid_pxlnameupdadm').val(data.inpatientlistdata['lname']);
                    $('#hiddenid_pxsuffxupdadm').val(data.inpatientlistdata['suffix']);
                    $('#hiddenid_casenumupdadm').val(data.inpatientlistdata['caseno']);
                    $('#hiddenid_pincodeupdadm').val(data.inpatientlistdata['pincode']);
                    $('#inputid_pxnamexcomanagement').val(data.inpatientlistdata['lname'] + ", " + data.inpatientlistdata['fname'] + " " + data.inpatientlistdata['mname'] + " " + data.inpatientlistdata['suffix']);
                    $('#inputid_accntnocomanagement').val(data.inpatientlistdata['caseno']);
                    $('#inputid_pxtypexcomanagement').val(data.inpatientlistdata['pxtype']);

                    var fetchbday = moment(data.inpatientlistdata['bday']).format("MMMM DD, YYYY");
                    $('#birthdayadm').val(fetchbday);
                    
                    var age = calculateAge(data.inpatientlistdata['bday']);
                    $("#inputid_ageadm").val(age);
                    
                    $('#civilstatusselectadm').selectpicker('val', data.inpatientlistdata['civilstatus']);
                    $("#passportnoadm").val(data.inpatientlistdata['passportno']);
                    $("#mobilenoadm").val(data.inpatientlistdata['mobileno']);
                    $("#contactnoadm").val(data.inpatientlistdata['contactno']);
                    $("#emailadm").val(data.inpatientlistdata['email']);
                    $('#provinceselectadm').selectpicker('val', data.inpatientlistdata['provadd'] + "-" + data.inpatientlistdata['provcode']);
                    var provid = data.inpatientlistdata['provadd'] + "-" + data.inpatientlistdata['provcode'];
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
                            $('#selectidcitymuniadm').selectpicker('val', data.inpatientlistdata['cityadd'] + "-" + data.inpatientlistdata['citycode']);
                            $('#selectidcitymuniadm').prop('disabled', false);
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
                                    $('#selectid_barangayadm').prop('disabled', false);
                                    $('#selectid_barangayadm').selectpicker('refresh');
                                });
                            });
                        });
                    });

                    $('#addressadm').prop("disabled", false);
                    $('#addressadm').val(data.inpatientlistdata['adrs']);
                    $('#fatheradm').val(data.inpatientlistdata['father']);
                    $('#fathernationalityadm').val(data.inpatientlistdata['fathernationality']);
                    $('#fatheradrsadm').val(data.inpatientlistdata['fatheradrs']);
                    $('#motheradm').val(data.inpatientlistdata['mother']);
                    $('#mothernationalityadm').val(data.inpatientlistdata['mothernationality']);
                    $('#motheradrsadm').val(data.inpatientlistdata['motheradrs']);

                    var time = new Date(data.inpatientlistdata['admitdate'] + " " + data.inpatientlistdata['admittime'].substr(0, 5));
                    var admdate = moment(data.inpatientlistdata['admitdate']).format("MMMM DD, YYYY");
                    var admtime = moment(time).format("hh:mm A");

                    $('#admissiondateadm').val(admdate);
                    $('#admissiontimeadm').val(admtime);

                    if (data.inpatientlistdata['doctorname'] === "" || data.inpatientlistdata['doctorname'] === null)
                    {
                        $('#attendingdoctoradm').val("");
                    } else
                    {
                        $('#attendingdoctoradm').val(data.inpatientlistdata['doctorname'] + " - " + data.inpatientlistdata['doctorid']);
                    }

                    if (data.inpatientlistdata['nursename'] === "" || data.inpatientlistdata['nursename'] === null)
                    {
                        $('#attendingnurseadm').val("");
                    } else
                    {
                        $('#attendingnurseadm').val(data.inpatientlistdata['nursename'] + " - " + data.inpatientlistdata['nurseid']);
                    }

                    if (data.inpatientlistdata['roomno'] === "" || data.inpatientlistdata['roomno'] === null)
                    {
                        $('#selectid_roomadmhid').val("");
                        $('#selectid_roomadm').val("");
                        $('#inputid_roominfoadm').val("");
                        $('#inputid_ancilaryadm').val("");
                        $('#inputid_roomrateadm').val("");
                        $('#inputid_roomcredadm').val("");
                    } 
                    else
                    {
                        var hiddenroomdata = data.inpatientlistdata['roomref'] + ":" +
                                data.inpatientlistdata['roomcd'] + ":" +
                                data.inpatientlistdata['roomtype'] + ":" +
                                data.inpatientlistdata['roomno'] + ":" +
                                data.inpatientlistdata['roombed'] + ":" +
                                data.inpatientlistdata['roominfo'] + ":" +
                                data.inpatientlistdata['roomrate'] + ".00" + ":" +
                                data.inpatientlistdata['addonserv'] + ".00" + ":" +
                                data.inpatientlistdata['PRICEPACKAGE'] + ":" +
                                data.inpatientlistdata['creditmax'] + ".00" + ":" +
                                data.inpatientlistdata['phiccode'];

                        var roomdata = data.inpatientlistdata['roomtype'] + ":" +
                                data.inpatientlistdata['roomno'] + ":" +
                                data.inpatientlistdata['roombed'] + ":" +
                                data.inpatientlistdata['roominfo'];

                        $('#selectid_roomadmhid').val(hiddenroomdata);
                        $('#selectid_roomadm').val(roomdata);
                        $('#inputid_roominfoadm').val(data.inpatientlistdata['roominfo']);
                        $('#inputid_ancilaryadm').val(data.inpatientlistdata['addonserv'] + ".00");
                        $('#inputid_roomrateadm').val(data.inpatientlistdata['roomrate'] + ".00");
                        $('#inputid_roomcredadm').val(data.inpatientlistdata['creditmax'] + ".00");
                    }

                    if (data.inpatientlistdata['phicmembr'] === "")
                    {
                        $('#phmembershipselectadm ').selectpicker('val', "Select");
                        $('#phmembernameadm ').val("");
                        $('#inputid_mdfrefnumadm ').val("");
                        $('#phicnumberadm ').val("");
                    } 
                    else
                    {
                        $('#phmembershipselectadm ').selectpicker('val', data.inpatientlistdata['phicmembr'] + ":" + data.inpatientlistdata['phiccode']);
                        $('#phmembernameadm ').val(data.inpatientlistdata['phicmembrname']);
                        $('#inputid_mdfrefnumadm ').val(data.inpatientlistdata['ReqPHICmdrweb']);
                        $('#phicnumberadm ').val(data.inpatientlistdata['phicPIN']);
                    }

                    if (data.inpatientlistdata['pat_clascode'] === "")
                    {
                        $('#patientclassadm ').selectpicker('val', "Select");
                    } else
                    {
                        $('#patientclassadm ').selectpicker('val', data.inpatientlistdata['pat_clascode']);
                    }

                    var patientclass = data.inpatientlistdata['pat_clascode'];
                    if (patientclass === "GYNECOLOGY")
                    {
                        $("#buttonid_motheradm").prop("disabled", true);
                        $("#textid_motheradm").prop("disabled", true);

                        $('#motherhide').addClass("d-none");
                        $('#pathologyhide').removeClass("d-none");

                        $('#obprocedurehide').removeClass("d-none");
                        $('#adultpediahide').addClass("d-none");

                        $('#othershide').addClass("d-none");
                        $('#lmpdatehide').removeClass("d-none");

                        $('#paradiv').removeClass("d-none");
                        $('#gravidadiv').removeClass("d-none");

                        $('#radioid_admissionadm').prop("disabled", true);
                        $('#radioid_admissionadm').prop("checked", false);
                        $('#radioid_infacilityadm').prop("disabled", true);
                        $('#radioid_infacilityadm').prop("checked", false);
                        $('#hiddboxid_infalityvalueadm').val("0");

                        $('#inputid_obgyneprocedureadm').prop('disabled', true);
                        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
                        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                        $('#inputid_obgyneprocedureadmerr').html("");

                        $('#inputid_adultpediaadm').prop('disabled', true);
                        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
                        $('#inputid_adultpediaadm').selectpicker('refresh');
                        $('#inputid_adultpediaadmerr').html("");

                        $.ajax
                                ({
                                    type: 'POST',
                                    url: BASE_URL + "Admission/getInPatientSublistDataForEditAdmitPatient",
                                    data: {casenox: caseno},
                                    dataType: 'json'
                                })
                                .done(function (data)
                                {
                                    console.log(data);

                                    if (data.status)
                                    {
                                        $("#gravidaadm").removeAttr('disabled');
                                        $("#paraadm").removeAttr('disabled');
                                        $("#abortionadm").removeAttr('disabled');
                                        $("#iufdadm").removeAttr('disabled');
                                        $("#diedadm").removeAttr('disabled');

                                        $("#gravidaadm").val(data.inpatientsublistdata['gravida']);
                                        $("#paraadm").val(data.inpatientsublistdata['para']);
                                        $("#abortionadm").val(data.inpatientsublistdata['abortion']);
                                        $("#iufdadm").val(data.inpatientsublistdata['iufd']);
                                        $("#diedadm").val(data.inpatientsublistdata['died']);

                                        $("#gravidaadmerr").html('');
                                        $("#paraadmerr").html('');
                                        $("#abortionadmerr").html('');
                                        $("#iufdadmerr").html('');
                                        $("#diedadmerr").html('');

                                        $("#pathologychkboxidadm").removeAttr('disabled');
                                        $("#pathologylabelid").html("Pathology");
                                        var pathologyhidden = data.inpatientsublistdata['pathologic'];
                                        if (pathologyhidden === "1")
                                        {
                                            $("#pathologychkboxidadm").click();
                                            $('#inputid_pathologyadm').val("PATHOLOGY");
                                        } else
                                        {
                                            $('#inputid_pathologyadm').val("NON-PATHOLOGY");
                                        }
                                    }
                                });

                        $("#inputid_othersadm").attr('disabled', true);
                        $("#inputid_othersadm").val("N/A");
                        $('#inputid_othersadmerr').html("");
                        
                        if(data.inpatientlistdata['lmp'] === "0000-00-00")
                        {
                            $('#inputid_lmpdateadm').val("");
                        }
                        else
                        {
                            $('#inputid_lmpdateadm').val(moment(data.inpatientlistdata['lmp']).format("MMMM DD, YYYY"));
                        }

                        $("#inputid_lmpdateadm").removeAttr('disabled');
                        $('#inputid_lmpdateadmerr').html("");
                    } 
                    else if (patientclass === "MEDICAL")
                    {
                        $("#buttonid_motheradm").prop("disabled", true);
                        $("#textid_motheradm").prop("disabled", true);

                        $('#motherhide').removeClass("d-none");
                        $('#pathologyhide').addClass("d-none");

                        $('#obprocedurehide').addClass("d-none");
                        $('#adultpediahide').removeClass("d-none");

                        $('#othershide').addClass("d-none");
                        $('#lmpdatehide').removeClass("d-none");

                        $('#paradiv').removeClass("d-none");
                        $('#gravidadiv').removeClass("d-none");

                        $('#radioid_admissionadm').prop("disabled", true);
                        $('#radioid_admissionadm').prop("checked", false);
                        $('#radioid_infacilityadm').prop("disabled", true);
                        $('#radioid_infacilityadm').prop("checked", false);
                        $('#hiddboxid_infalityvalueadm').val("0");

                        $('#inputid_obgyneprocedureadm').prop('disabled', true);
                        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
                        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                        $('#inputid_obgyneprocedureadmerr').html("");

                        $("#inputid_adultpediaadm").prop('disabled', false);
                        $("#inputid_adultpediaadm option[value='Disabled']").remove();
                        $('#inputid_adultpediaadm').selectpicker('val', data.inpatientlistdata['pat_classub']);
                        $('#inputid_adultpediaadm').selectpicker('refresh');
                        $('#inputid_adultpediaadmerr').html('');

                        if ($('#pathologychkboxidadm').is(':checked'))
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

                        $("#inputid_lmpdateadm").attr('disabled', true);
                        $("#inputid_lmpdateadm").val("N/A");
                        $("#inputid_lmpdateadm").html("");
                    }
                    else if (patientclass === "OBSTETRICS")
                    {
                        $("#buttonid_motheradm").prop("disabled", true);
                        $("#textid_motheradm").prop("disabled", true);

                        $('#motherhide').removeClass("d-none");
                        $('#pathologyhide').addClass("d-none");

                        $('#obprocedurehide').removeClass("d-none");
                        $('#adultpediahide').addClass("d-none");

                        $('#othershide').addClass("d-none");
                        $('#lmpdatehide').removeClass("d-none");

                        $('#paradiv').removeClass("d-none");
                        $('#gravidadiv').removeClass("d-none");

                        $('#radioid_admissionadm').prop("disabled", true);
                        $('#radioid_admissionadm').prop("checked", false);
                        $('#radioid_infacilityadm').prop("disabled", true);
                        $('#radioid_infacilityadm').prop("checked", false);
                        $('#hiddboxid_infalityvalueadm').val("0");

                        $("#inputid_obgyneprocedureadm").prop('disabled', false);
                        $("#inputid_obgyneprocedureadm option[value='Disabled']").remove();
                        $('#inputid_obgyneprocedureadm').selectpicker('val', data.inpatientlistdata['OBprocedure']);
                        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                        $('#inputid_obgyneprocedureadmerr').html('');

                        $('#inputid_adultpediaadm').prop('disabled', true);
                        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
                        $('#inputid_adultpediaadm').selectpicker('refresh');
                        $('#inputid_adultpediaadmerr').html("");

                        if ($('#pathologychkboxidadm').is(':checked'))
                        {
                            $("#pathologychkboxidadm").click();
                        }
                        $("#pathologychkboxidadm").attr('disabled', true);
                        $("#pathologylabelid").html("N/A");

                        $("#inputid_othersadm").attr('disabled', true);
                        $("#inputid_othersadm").val("N/A");
                        $("#inputid_othersadmerr").html("");
                        
                        if(data.inpatientlistdata['lmp'] === "0000-00-00")
                        {
                            $('#inputid_lmpdateadm').val("");
                        }
                        else
                        {
                            $('#inputid_lmpdateadm').val(moment(data.inpatientlistdata['lmp']).format("MMMM DD, YYYY"));
                        }

                        $("#inputid_lmpdateadm").removeAttr('disabled');
                        $('#inputid_lmpdateadmerr').html("");

                        $.ajax
                        ({
                            type: 'POST',
                            url: BASE_URL + "Admission/getInPatientSublistDataForEditAdmitPatient",
                            data: {casenox: caseno},
                            dataType: 'json'
                        })
                        .done(function (data)
                        {
                            console.log(data);

                            if (data.status)
                            {
                                $("#gravidaadm").removeAttr('disabled');
                                $("#paraadm").removeAttr('disabled');
                                $("#abortionadm").removeAttr('disabled');
                                $("#iufdadm").removeAttr('disabled');
                                $("#diedadm").removeAttr('disabled');

                                $("#gravidaadm").val(data.inpatientsublistdata['gravida']);
                                $("#paraadm").val(data.inpatientsublistdata['para']);
                                $("#abortionadm").val(data.inpatientsublistdata['abortion']);
                                $("#iufdadm").val(data.inpatientsublistdata['iufd']);
                                $("#diedadm").val(data.inpatientsublistdata['died']);

                                $("#gravidaadmerr").html('');
                                $("#paraadmerr").html('');
                                $("#abortionadmerr").html('');
                                $("#iufdadmerr").html('');
                                $("#diedadmerr").html('');
                            }
                        });
                    }
                    else if (patientclass === "OTHERS")
                    {
                        $("#buttonid_motheradm").prop("disabled", true);
                        $("#textid_motheradm").prop("disabled", true);

                        $('#motherhide').removeClass("d-none");
                        $('#pathologyhide').addClass("d-none");

                        $('#obprocedurehide').removeClass("d-none");
                        $('#adultpediahide').addClass("d-none");

                        $('#othershide').removeClass("d-none");
                        $('#lmpdatehide').addClass("d-none");

                        $('#paradiv').removeClass("d-none");
                        $('#gravidadiv').removeClass("d-none");

                        $('#radioid_admissionadm').prop("disabled", true);
                        $('#radioid_admissionadm').prop("checked", false);
                        $('#radioid_infacilityadm').prop("disabled", true);
                        $('#radioid_infacilityadm').prop("checked", false);
                        $('#hiddboxid_infalityvalueadm').val("0");

                        $('#inputid_obgyneprocedureadm').prop('disabled', true);
                        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
                        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                        $('#inputid_obgyneprocedureadmerr').html("");

                        $('#inputid_adultpediaadm').prop('disabled', true);
                        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
                        $('#inputid_adultpediaadm').selectpicker('refresh');
                        $('#inputid_adultpediaadmerr').html("");

                        if ($('#pathologychkboxidadm').is(':checked'))
                        {
                            $("#pathologychkboxidadm").click();
                        }
                        $("#pathologychkboxidadm").attr('disabled', true);
                        $("#pathologylabelid").html("N/A");

                        ("#inputid_othersadm").removeAttr('disabled');
                        $("#inputid_othersadm").val(data.inpatientlistdata['pat_classification']);
                        $("#inputid_othersadmerr").html('');

                        $("#gravidaadm").attr('disabled', true);
                        $("#paraadm").attr('disabled', true);
                        $("#abortionadm").attr('disabled', true);
                        $("#iufdadm").attr('disabled', true);
                        $("#diedadm").attr('disabled', true);
                        $("#inputid_lmpdateadm").attr('disabled', true);

                        $("#gravidaadm").val("N/A");
                        $("#paraadm").val("N/A");
                        $("#abortionadm").val("N/A");
                        $("#iufdadm").val("N/A");
                        $("#diedadm").val("N/A");
                        $("#inputid_lmpdateadm").val("N/A");

                        $("#gravidaadmerr").html("");
                        $("#paraadmerr").html("");
                        $("#abortionadmerr").html("");
                        $("#iufdadmerr").html("");
                        $("#diedadmerr").html("");
                        $("#inputid_lmpdateadmerr").html("");
                    } else if (patientclass === "SURGICAL")
                    {
                        $("#buttonid_motheradm").prop("disabled", true);
                        $("#textid_motheradm").prop("disabled", true);

                        $('#motherhide').addClass("d-none");
                        $('#pathologyhide').removeClass("d-none");

                        $('#obprocedurehide').removeClass("d-none");
                        $('#adultpediahide').addClass("d-none");

                        $('#othershide').addClass("d-none");
                        $('#lmpdatehide').removeClass("d-none");

                        $('#paradiv').removeClass("d-none");
                        $('#gravidadiv').removeClass("d-none");

                        $('#radioid_admissionadm').prop("disabled", true);
                        $('#radioid_admissionadm').prop("checked", false);
                        $('#radioid_infacilityadm').prop("disabled", true);
                        $('#radioid_infacilityadm').prop("checked", false);
                        $('#hiddboxid_infalityvalueadm').val("0");

                        $('#inputid_obgyneprocedureadm').prop('disabled', true);
                        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
                        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                        $('#inputid_obgyneprocedureadmerr').html("");

                        $('#inputid_adultpediaadm').prop('disabled', true);
                        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
                        $('#inputid_adultpediaadm').selectpicker('refresh');
                        $('#inputid_adultpediaadmerr').html("");

                        $("#pathologychkboxidadm").removeAttr('disabled');
                        $("#pathologylabelid").html("Pathology");
                        var pathologyhidden = data.inpatientsublistdata['pathologic'];
                        if (pathologyhidden === "1")
                        {
                            $("#pathologychkboxidadm").click();
                            $('#inputid_pathologyadm').val("PATHOLOGY");
                        } else
                        {
                            $('#inputid_pathologyadm').val("NON-PATHOLOGY");
                        }

                        $("#inputid_othersadm").attr('disabled', true);
                        $("#gravidaadm").attr('disabled', true);
                        $("#paraadm").attr('disabled', true);
                        $("#abortionadm").attr('disabled', true);
                        $("#iufdadm").attr('disabled', true);
                        $("#diedadm").attr('disabled', true);
                        $("#inputid_lmpdateadm").attr('disabled', true);

                        $("#inputid_othersadm").val("N/A");
                        $("#gravidaadm").val("N/A");
                        $("#paraadm").val("N/A");
                        $("#abortionadm").val("N/A");
                        $("#iufdadm").val("N/A");
                        $("#diedadm").val("N/A");
                        $("#inputid_lmpdateadm").val("N/A");

                        $("#inputid_othersadmerr").html("");
                        $("#gravidaadmerr").html("");
                        $("#paraadmerr").html("");
                        $("#abortionadmerr").html("");
                        $("#iufdadmerr").html("");
                        $("#diedadmerr").html("");
                        $("#inputid_lmpdateadmerr").html("");
                    } else if (patientclass === "NEW BORN")
                    {
                        $('#motherhide').removeClass("d-none");
                        $('#pathologyhide').removeClass("d-none");

                        $('#obprocedurehide').removeClass("d-none");
                        $('#adultpediahide').addClass("d-none");

                        $('#othershide').addClass("d-none");
                        $('#lmpdatehide').removeClass("d-none");

                        $('#paradiv').addClass("d-none");
                        $('#gravidadiv').addClass("d-none");

                        $('#radioid_admissionadm').prop("disabled", false);
                        $('#radioid_infacilityadm').prop("disabled", false);

                        $.ajax
                                ({
                                    type: 'POST',
                                    url: BASE_URL + "Admission/getInPatientSublistDataForEditAdmitPatient",
                                    data: {casenox: caseno},
                                    dataType: 'json'
                                })
                                .done(function (result)
                                {
                                    if (result.status === true)
                                    {
                                        var infacility = result.inpatientsublistdata["infacilitydelivery"];
                                        if (infacility === "1")
                                        {
                                            $("#buttonid_motheradm").prop("disabled", false);
                                            $("#textid_motheradm").prop("disabled", false);
                                            $('#hiddboxid_infalityvalueadm').val("1");
                                            $('#radioid_infacilityadm').prop("checked", true);
                                            $('#radioid_admissionadm').prop("checked", false);

                                            $("#inputid_obgyneprocedureadm").prop('disabled', false);
                                            $("#inputid_obgyneprocedureadm option[value='Disabled']").remove();
                                            $('#inputid_obgyneprocedureadm').selectpicker('val', data.inpatientlistdata['OBprocedure']);
                                            $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                                            $('#inputid_obgyneprocedureadmerr').html('');
                                        } else
                                        {
                                            $("#buttonid_motheradm").prop("disabled", true);
                                            $("#textid_motheradm").prop("disabled", true);
                                            $('#hiddboxid_infalityvalueadm').val("0");
                                            $('#radioid_infacilityadm').prop("checked", false);
                                            $('#radioid_admissionadm').prop("checked", true);

                                            $('#inputid_obgyneprocedureadm').prop('disabled', true);
                                            $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
                                            $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
                                            $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                                            $('#inputid_obgyneprocedureadmerr').html("");
                                        }

                                        $("#pathologychkboxidadm").removeAttr('disabled');
                                        $("#pathologylabelid").html("Pathology");
                                        var pathologyhidden = result.inpatientsublistdata['pathologic'];
                                        if (pathologyhidden === "1")
                                        {
                                            $("#pathologychkboxidadm").click();
                                            $('#inputid_pathologyadm').val("PATHOLOGY");
                                        } else
                                        {
                                            $('#inputid_pathologyadm').val("NON-PATHOLOGY");
                                        }
                                    }
                                });

                        $('#inputid_adultpediaadm').prop('disabled', true);
                        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
                        $('#inputid_adultpediaadm').selectpicker('refresh');
                        $('#inputid_adultpediaadmerr').html("");

                        $("#inputid_othersadm").attr('disabled', true);
                        $("#gravidaadm").attr('disabled', true);
                        $("#paraadm").attr('disabled', true);
                        $("#abortionadm").attr('disabled', true);
                        $("#iufdadm").attr('disabled', true);
                        $("#diedadm").attr('disabled', true);
                        $("#inputid_lmpdateadm").attr('disabled', true);

                        $("#inputid_othersadm").val("N/A");
                        $("#gravidaadm").val("N/A");
                        $("#paraadm").val("N/A");
                        $("#abortionadm").val("N/A");
                        $("#iufdadm").val("N/A");
                        $("#diedadm").val("N/A");
                        $("#inputid_lmpdateadm").val("N/A");

                        $("#inputid_othersadmerr").html("");
                        $("#gravidaadmerr").html("");
                        $("#paraadmerr").html("");
                        $("#abortionadmerr").html("");
                        $("#iufdadmerr").html("");
                        $("#diedadmerr").html("");
                        $("#inputid_lmpdateadmerr").html("");
                    } else if (patientclass === "STILL BIRTH")
                    {
                        $('#motherhide').removeClass("d-none");
                        $('#pathologyhide').removeClass("d-none");

                        $('#obprocedurehide').removeClass("d-none");
                        $('#adultpediahide').addClass("d-none");

                        $('#othershide').addClass("d-none");
                        $('#lmpdatehide').removeClass("d-none");

                        $('#paradiv').addClass("d-none");
                        $('#gravidadiv').addClass("d-none");

                        $('#radioid_admissionadm').prop("disabled", false);
                        $('#radioid_infacilityadm').prop("disabled", false);

                        $.ajax
                                ({
                                    type: 'POST',
                                    url: BASE_URL + "Admission/getInPatientSublistDataForEditAdmitPatient",
                                    data: {casenox: caseno},
                                    dataType: 'json'
                                })
                                .done(function (result)
                                {
                                    if (result.status === true)
                                    {
                                        var infacility = result.inpatientsublistdata["infacilitydelivery"];
                                        if (infacility === "1")
                                        {
                                            $("#buttonid_motheradm").prop("disabled", false);
                                            $("#textid_motheradm").prop("disabled", false);
                                            $('#hiddboxid_infalityvalueadm').val("1");
                                            $('#radioid_infacilityadm').prop("checked", true);
                                            $('#radioid_admissionadm').prop("checked", false);

                                            $("#inputid_obgyneprocedureadm").prop('disabled', false);
                                            $("#inputid_obgyneprocedureadm option[value='Disabled']").remove();
                                            $('#inputid_obgyneprocedureadm').selectpicker('val', data.inpatientlistdata['OBprocedure']);
                                            $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                                            $('#inputid_obgyneprocedureadmerr').html('');
                                        } else
                                        {
                                            $("#buttonid_motheradm").prop("disabled", true);
                                            $("#textid_motheradm").prop("disabled", true);
                                            $('#hiddboxid_infalityvalueadm').val("0");
                                            $('#radioid_infacilityadm').prop("checked", false);
                                            $('#radioid_admissionadm').prop("checked", true);

                                            $('#inputid_obgyneprocedureadm').prop('disabled', true);
                                            $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
                                            $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
                                            $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                                            $('#inputid_obgyneprocedureadmerr').html("");
                                        }

                                        $("#pathologychkboxidadm").removeAttr('disabled');
                                        $("#pathologylabelid").html("Pathology");
                                        var pathologyhidden = result.inpatientsublistdata['pathologic'];
                                        if (pathologyhidden === "1")
                                        {
                                            $("#pathologychkboxidadm").click();
                                            $('#inputid_pathologyadm').val("PATHOLOGY");
                                        } else
                                        {
                                            $('#inputid_pathologyadm').val("NON-PATHOLOGY");
                                        }
                                    }
                                });

                        $('#inputid_adultpediaadm').prop('disabled', true);
                        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
                        $('#inputid_adultpediaadm').selectpicker('refresh');
                        $('#inputid_adultpediaadmerr').html("");

                        $("#inputid_othersadm").attr('disabled', true);
                        $("#gravidaadm").attr('disabled', true);
                        $("#paraadm").attr('disabled', true);
                        $("#abortionadm").attr('disabled', true);
                        $("#iufdadm").attr('disabled', true);
                        $("#diedadm").attr('disabled', true);
                        $("#inputid_lmpdateadm").attr('disabled', true);

                        $("#inputid_othersadm").val("N/A");
                        $("#gravidaadm").val("N/A");
                        $("#paraadm").val("N/A");
                        $("#abortionadm").val("N/A");
                        $("#iufdadm").val("N/A");
                        $("#diedadm").val("N/A");
                        $("#inputid_lmpdateadm").val("N/A");

                        $("#inputid_othersadmerr").html("");
                        $("#gravidaadmerr").html("");
                        $("#paraadmerr").html("");
                        $("#abortionadmerr").html("");
                        $("#iufdadmerr").html("");
                        $("#diedadmerr").html("");
                        $("#inputid_lmpdateadmerr").html("");
                    } else
                    {
                        $("#buttonid_motheradm").prop("disabled", true);
                        $("#textid_motheradm").prop("disabled", true);

                        $('#motherhide').removeClass("d-none");
                        $('#pathologyhide').addClass("d-none");

                        $('#obprocedurehide').removeClass("d-none");
                        $('#adultpediahide').addClass("d-none");

                        $('#paradiv').removeClass("d-none");
                        $('#gravidadiv').removeClass("d-none");

                        $('#othershide').addClass("d-none");
                        $('#lmpdatehide').removeClass("d-none");

                        $('#radioid_admissionadm').prop("disabled", true);
                        $('#radioid_admissionadm').prop("checked", false);
                        $('#radioid_infacilityadm').prop("disabled", true);
                        $('#radioid_infacilityadm').prop("checked", false);
                        $('#hiddboxid_infalityvalueadm').val("0");

                        $('#inputid_obgyneprocedureadm').prop('disabled', true);
                        $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
                        $('#inputid_obgyneprocedureadm').selectpicker('refresh');
                        $('#inputid_obgyneprocedureadmerr').html("");

                        $('#inputid_adultpediaadm').prop('disabled', true);
                        $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
                        $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
                        $('#inputid_adultpediaadm').selectpicker('refresh');
                        $('#inputid_adultpediaadmerr').html("");

                        if ($('#pathologychkboxidadm').is(':checked'))
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
                        $("#inputid_lmpdateadm").attr('disabled', true);

                        $("#inputid_othersadm").val("N/A");
                        $("#gravidaadm").val("N/A");
                        $("#paraadm").val("N/A");
                        $("#abortionadm").val("N/A");
                        $("#iufdadm").val("N/A");
                        $("#diedadm").val("N/A");
                        $("#inputid_lmpdateadm").val("N/A");

                        $("#inputid_othersadmerr").html("");
                        $("#gravidaadmerr").html("");
                        $("#paraadmerr").html("");
                        $("#abortionadmerr").html("");
                        $("#iufdadmerr").html("");
                        $("#diedadmerr").html("");
                        $("#inputid_lmpdateadmerr").html("");
                    }
                    
                    $('#inputid_spousenameadm').val(data.inpatientlistdata['spouse']);
                    
                    if (data.inpatientlistdata['spousebday'] === "1901-01-01")
                    {
                        $('#inputid_spousebirthadm').val("");
                    }
                    else
                    {
                        $('#inputid_spousebirthadm').val(moment(data.inpatientlistdata['spousebday']).format("MMMM DD, YYYY"));
                    }

                    $('#inputid_creditmaxlimitadm').val(data.inpatientlistdata['creditmax'] + ".00");

                    if (data.inpatientlistdata['ReferredFromHCI'] === "")
                    {
                        $('#selectid_hospcareinsadm').selectpicker('val', "Select");
                    } else
                    {
                        $('#selectid_hospcareinsadm').selectpicker('val', data.inpatientlistdata['ReferredFromHCI']);
                    }

                    $.ajax
                            ({
                                type: 'POST',
                                url: BASE_URL + "Admission/getVitalstatDataForEditAdmitPatient",
                                data: {casenox: caseno},
                                dataType: 'json'
                            })
                            .done(function (data)
                            {
                                console.log(data);

                                if (data.status)
                                {
                                    $("#textboxid_bpnumeratoradm").val(data.vitalsignsdata['bp_numerator']);
                                    $("#textboxid_bpdenominatoradm").val(data.vitalsignsdata['bp_denominator']);
                                    $("#textboxid_pulserateadm").val(data.vitalsignsdata['pulse_rate']);
                                    $("#textboxid_bodytemperatureadm").val(data.vitalsignsdata['body_temperature']);
                                    $("#textboxid_respiratoryrateadm").val(data.vitalsignsdata['respiratory_rate']);
                                }
                            });

                    $.ajax
                            ({
                                type: 'POST',
                                url: BASE_URL + "Admission/getPackageEnroleeDataForEditAdmitPatient",
                                data: {casenox: caseno},
                                dataType: 'json'
                            })
                            .done(function (data)
                            {
                                console.log(data);

                                if (data.status)
                                {
                                    $("#AddPackageForm").addClass('d-none');

                                    var packagecode = data.pckgenrolleedata['packagecode'];
                                    var packageacct = data.pckgenrolleedata['acctno'];
                                    $('#packageoverviewadm').val(packagecode);
                                    $('#packageacctnoadm').val(packageacct);

                                    var packagealldata = data.pckgenrolleedata['packagerefcode'] + "|" +
                                            data.pckgenrolleedata['docrefno'] + "|" +
                                            data.pckgenrolleedata['incharge'] + "|" +
                                            data.pckgenrolleedata['enrolldate'] + "|" +
                                            data.pckgenrolleedata['docreferenceno'] + "|" +
                                            data.pckgenrolleedata['packagecode'] + "|" +
                                            data.pckgenrolleedata['packageprice'] + "|" +
                                            data.pckgenrolleedata['referedby'] + "|" +
                                            data.pckgenrolleedata['docname'] + "|" +
                                            data.pckgenrolleedata['notes'] + "|" +
                                            data.pckgenrolleedata['refcode'];

                                    var pckgepxalldata = data.pckgenrolleedata['patientname'] + "|" +
                                            data.pckgenrolleedata['contactnumber'] + "|" +
                                            data.pckgenrolleedata['sex'] + "|" +
                                            data.pckgenrolleedata['religion'] + "|" +
                                            data.pckgenrolleedata['ageuponenrollment'] + "|" +
                                            data.pckgenrolleedata['bday'] + "|" +
                                            data.pckgenrolleedata['lname'] + "|" +
                                            data.pckgenrolleedata['mname'] + "|" +
                                            data.pckgenrolleedata['fname'] + "|" +
                                            data.pckgenrolleedata['suffix'] + "|" +
                                            data.pckgenrolleedata['address'] + "|" +
                                            data.pckgenrolleedata['cityadrs'] + "|" +
                                            data.pckgenrolleedata['IPDacctno'] + "|" +
                                            data.pckgenrolleedata['slcode'] + "|" +
                                            data.pckgenrolleedata['pincode'];

                                    $('#inputid_packagemanadataadm').val(packagealldata);
                                    $('#inputid_pckgpatientdataadm').val(pckgepxalldata);
                                } else
                                {
                                    $("#AddPackageForm").removeClass('d-none');
                                }
                            });

                    $.ajax
                    ({
                        type: 'POST',
                        url: BASE_URL + "Admission/getVIPSecurityDataForEditAdmitPatient",
                        data: {casenox: caseno},
                        dataType: 'json'
                    })
                    .done(function (data)
                    {
                        console.log(data);

                        if (data.status)
                        {
                            var vipval = data.vipsecuritydata['vip'];
                            var secval = data.vipsecuritydata['securityrisk'];

                            if (vipval === "0" && secval === "1")
                            {
                                $('#radio_vip').prop('checked', false);
                                $('#radio_sec').prop('checked', true);
                                $('#radio_non').prop('checked', false);
                            } else if (vipval === "1" && secval === "0")
                            {
                                $('#radio_vip').prop('checked', true);
                                $('#radio_sec').prop('checked', false);
                                $('#radio_non').prop('checked', false);
                            } else
                            {
                                $('#radio_vip').prop('checked', false);
                                $('#radio_sec').prop('checked', false);
                                $('#radio_non').prop('checked', true);
                            }

                            var remarksvip = data.vipsecuritydata['remarks'];
                            var oicincharge = data.vipsecuritydata['oic'] + "-" + data.vipsecuritydata['oiccode'];

                            var vipalldata = data.vipsecuritydata['casecode'] + "|" +
                                    data.vipsecuritydata['caseno'] + "|" +
                                    data.vipsecuritydata['vip'] + "|" +
                                    data.vipsecuritydata['securityrisk'] + "|" +
                                    data.vipsecuritydata['remarks'] + "|" +
                                    data.vipsecuritydata['patnamex'] + "|" +
                                    data.vipsecuritydata['oic'] + "|" +
                                    data.vipsecuritydata['oiccode'] + "|" +
                                    data.vipsecuritydata['updatedby'] + "|" +
                                    data.vipsecuritydata['station'] + "|" +
                                    data.vipsecuritydata['confirmed'];

                            $("#inputid_vipsecuritydataadm").val(vipalldata);
                            $('#selectid_oicinchargevipmanagement').selectpicker('val', oicincharge);
                            $('#txtareaid_remarksvipmanagement').val(remarksvip);
                        }
                    });

                    $('#admissionreasonadm').val(data.inpatientlistdata['Diag_chiefcomplain']);
                    $('#admittingdiagnosisadm').val(data.inpatientlistdata['Diag_admit']);
                    $('#dietaryviewadm').val(data.inpatientlistdata['diatary_ins']);
                    $('#dietaryadm').val(data.inpatientlistdata['dietarycd'] + " - " + data.inpatientlistdata['diatary_ins']);
                }
            });


    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getComanageData",
                data: {casenox: caseno},
                dataType: 'json'
            })
            .done(function (data)
            {
                comanage_table = $('#comanagement-masterlist-table').DataTable();
                comanage_table.clear().draw();

                for (var cv = 0; cv < data.length; cv++)
                {
                    var sorting = cv + 1;

                    var textboxidtbl = data[cv]['docrefno'] + "-" + sorting;

                    comanage_table.row.add
                            ([
                                "<button class='btn btn-sm btn-warning waves-effect btn-com-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                 <button class='btn btn-sm btn-danger waves-effect btn-com-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                                data[cv]['managetype'],
                                data[cv]['docname'],
                                moment(data[cv]['datereferred']).format("MMMM DD, YYYY"),
                                data[cv]['accesscode'],
                                moment(data[cv]['updated']).format("MMMM DD, YYYY hh:mm A"),
                                data[cv]['docrefno'],
                                textboxidtbl,
                                sorting
                            ]).draw(false);

                    var comanagedata = data[cv]['docname'] + "|" +
                            data[cv]['docrefno'] + "|" +
                            data[cv]['managetype'] + "|" +
                            data[cv]['datereferred'] + "|" +
                            sorting + "|" +
                            textboxidtbl;

                    textBoxCreate(comanagedata);
                }
            });

    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getHMOInsuranceData",
                data: {casenox: caseno},
                dataType: 'json'
            })
            .done(function (data)
            {
                hmomanagement_table = $('#hmo-management-table').DataTable();
                hmomanagement_table.clear().draw();

                for (var cv = 0; cv < data.length; cv++)
                {
                    var sortinghmo = cv + 1;

                    var fetchedhmocreditvalue = data[cv]['hmocredit'];
                    var newcreditvalue = "₱ " + parseFloat(fetchedhmocreditvalue).toLocaleString();

                    totalcredithmo = totalcredithmo + parseFloat(fetchedhmocreditvalue);
                    $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());

                    var textboxidtbl = data[cv]['hmocode'] + "-" + sortinghmo;
                    hmomanagement_table.row.add
                            ([
                                "<button class='btn btn-sm btn-warning waves-effect btn-hmo-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                         <button class='btn btn-sm btn-danger waves-effect btn-hmo-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                                data[cv]['hmoname'],
                                newcreditvalue,
                                data[cv]['hmoloa'],
                                sortinghmo,
                                moment(data[cv]['updated']).format("MMMM DD, YYYY hh:mm A"),
                                data[cv]['recby'],
                                data[cv]['hmorefno'],
                                data[cv]['hmocode'],
                                data[cv]['hmocardno'],
                                moment(data[cv]['hmoapprovaldate']).format("MMMM DD, YYYY"),
                                data[cv]['hmocardholder'],
                                textboxidtbl
                            ]).draw(false);

                    var hmoalldata = data[cv]['hmoname'] + "|" +
                            data[cv]['hmocode'] + "|" +
                            data[cv]['hmorefno'] + "|" +
                            fetchedhmocreditvalue + "|" +
                            sortinghmo + "|" +
                            data[cv]['hmocardno'] + "|" +
                            data[cv]['hmoloa'] + "|" +
                            data[cv]['hmoapprovaldate'] + "|" +
                            data[cv]['hmocardholder'] + "|" +
                            textboxidtbl;

                    textBoxCreatehmo(hmoalldata);
                }
            });

    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getConfinementCausesData",
                data: {casenox: caseno},
                dataType: 'json'
            })
            .done(function (data)
            {
                confinecause_table = $('#causesof-confinement-table').DataTable();
                confinecause_table.clear().draw();

                for (var cv = 0; cv < data.length; cv++)
                {
                    var sorting = cv + 1;

                    var textboxidtbl = data[cv]['causescode'] + "-" + sorting;

                    var confinecause_table = $('#causesof-confinement-table').DataTable();
                    confinecause_table.row.add
                            ([
                                "",
                                data[cv]['diagcateg'],
                                data[cv]['icd10cat'],
                                data[cv]['icdcode'],
                                data[cv]['dohrefno'],
                                data[cv]['diagnosis'],
                                data[cv]['diagcode'],
                                data[cv]['causescode'],
                                textboxidtbl,
                                sorting
                            ]).order([9, 'asc']).draw(false);

                    var causesalldata = data[cv]['diagcateg'] + "|" +
                            data[cv]['icd10cat'] + "|" +
                            data[cv]['icdcode'] + "|" +
                            data[cv]['dohrefno'] + "|" +
                            data[cv]['diagnosis'] + "|" +
                            data[cv]['diagcode'] + "|" +
                            data[cv]['causescode'] + "|" +
                            sorting + "|" +
                            textboxidtbl;

                    textBoxCreateForCauses(causesalldata);
                }
            });
}

function hideEditAdmitPatientModal()
{
    swal
    ({
        title: "Are you sure you want to exit?",
        text: "You will not be able to recover editted data of update admission form!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, pls. proceed!",
        cancelButtonText: "No, Pls. cancel",
        closeOnConfirm: true
    },
    function (isConfirm)
    {
        if (isConfirm)
        {
            setToDefaultAllFieldsOfAdmitPatientModal();
    
            admittedpx_table.ajax.reload();

            $('#admitpatientmodal').modal("hide");
            $('body').css('overflow', 'auto');

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
            $('#radioid_normaltypeadm').prop('checked', true);
            $('#radioid_emergencytypeadm').prop('checked', false);
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

            counterfortblecausesadmedt = 1;
            counterfortextcausesadmedt = 1;

            $('#inputid_obgyneprocedureadm').prop('disabled', true);
            $('#inputid_obgyneprocedureadm').append('<option value="Disabled">' + "N/A" + '</option>');
            $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
            $('#inputid_obgyneprocedureadm').selectpicker('refresh');
            $('#inputid_obgyneprocedureadmerr').html("");

            $('#inputid_adultpediaadm').prop('disabled', true);
            $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
            $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
            $('#inputid_adultpediaadm').selectpicker('refresh');
            $('#inputid_adultpediaadmerr').html("");

            if ($('#pathologychkboxidadm').is(':checked'))
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
            $('#chckboxid_forminororadm').prop('checked', false);
            $('#textboxid_forminororadm').val(0);
            $('#admittingdiagnosisadm').val("");
            $('#dietaryadm').val("");
        }
    });
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
    $('#radioid_normaltypeadm').prop('checked', true);
    $('#radioid_emergencytypeadm').prop('checked', false);
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
    $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
    $('#inputid_obgyneprocedureadm').selectpicker('refresh');
    $('#inputid_obgyneprocedureadmerr').html("");

    $('#inputid_adultpediaadm').prop('disabled', true);
    $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
    $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
    $('#inputid_adultpediaadm').selectpicker('refresh');
    $('#inputid_adultpediaadmerr').html("");

    if ($('#pathologychkboxidadm').is(':checked'))
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
    $('#chckboxid_forminororadm').prop('checked', false);
    $('#textboxid_forminororadm').val(0);
    $('#admittingdiagnosisadm').val("");
    $('#dietaryadm').val("");
}

function showCoManagementModalForUpdateAdmission()
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
}

function textBoxCreateForUpdateAdmission(comanagedata)
{
    var comanagedatasplit = comanagedata.split('|');
    var docname = comanagedatasplit[1];
    var doccode = comanagedatasplit[5];
    var typeman = comanagedatasplit[0];
    var startco = comanagedatasplit[2];
    var textboxidtbl = comanagedatasplit[6];

    var x = document.createElement("INPUT");
    x.setAttribute("type", "hidden");
    x.setAttribute("id", textboxidtbl);
    x.setAttribute("name", "docname_comanage" + counterfortextadmedt);
    x.setAttribute("class", "docname_comanage" + counterfortextadmedt);
    x.setAttribute("value", docname);
    document.getElementById("myFormComanageAdmitEdt").appendChild(x);

    var y = document.createElement("INPUT");
    y.setAttribute("type", "hidden");
    y.setAttribute("id", textboxidtbl);
    y.setAttribute("name", "doccode_comanage" + counterfortextadmedt);
    y.setAttribute("class", "doccode_comanage" + counterfortextadmedt);
    y.setAttribute("value", doccode);
    document.getElementById("myFormComanageAdmitEdt").appendChild(y);

    var z = document.createElement("INPUT");
    z.setAttribute("type", "hidden");
    z.setAttribute("id", textboxidtbl);
    z.setAttribute("name", "typeman_comanage" + counterfortextadmedt);
    z.setAttribute("class", "typeman_comanage" + counterfortextadmedt);
    z.setAttribute("value", typeman);
    document.getElementById("myFormComanageAdmitEdt").appendChild(z);

    var a = document.createElement("INPUT");
    a.setAttribute("type", "hidden");
    a.setAttribute("id", textboxidtbl);
    a.setAttribute("name", "startco_comanage" + counterfortextadmedt);
    a.setAttribute("class", "startco_comanage" + counterfortextadmedt);
    a.setAttribute("value", startco);
    document.getElementById("myFormComanageAdmitEdt").appendChild(a);

    counterfortextadmedt++;
}

function updateAdmitPatient()
{

}

function deleteAdmittedPatient(caseno)
{
    alert(caseno);
}

//function addNewComanageDoctorForAdmEdt()
//{
//    var error = 0;
//    var duplicate = 0;
//    var doctorname = $("#hiddenid_doctornamecomanagement").val();
//    var doctorcode = $("#hiddenid_doctorcodecomanagement").val();
//    var typeofmana = $("#inputid_typmancomanagement").val();
//    var startofser = $("#inputid_startcomanagement").val();
//    var curentdate = $("#hiddentextid_datenow").val();
//    var accountnum = $("#accountnumberadm").val();
//    var patientype = $("#selectid_patienttypeadm").val();
//    var pincodenum = $("#hiddeninputid_pincodeadm").val();
//    var textboxidtbl = doctorcode + accountnum + counterfortbleadmedt;
//    var casecodeno = $("#hiddentextid_casecodexcomanage").val();
//
//    $("#hiddentextid_deleteparameterforcomanage").val(patientype + "," + accountnum + "," + pincodenum + "," + doctorcode + "," + typeofmana + "," + startofser + "," + casecodeno);
//
//    var doctrfield = $("#inputid_docmancomanagement").val();
//    if (doctrfield === "Select")
//    {
//        $("#docmancomanagementerr").text("Required Field!");
//        error++;
//    } else
//    {
//        $("#docmancomanagementerr").text("");
//    }
//
//    if (typeofmana === "Select")
//    {
//        $("#typmancomanagementerr").text("Required Field!");
//        error++;
//    } else
//    {
//        $("#typmancomanagementerr").text("");
//    }
//
//    if (startofser === "")
//    {
//        $("#startcomanagementerr").text("Required Field!");
//        error++;
//    } else
//    {
//        $("#startcomanagementerr").text("");
//    }
//
//    $("#comanagement-masterlist-table tbody tr").each(function ()
//    {
//        var docname_col = $(this).find("td:nth-child(3)").html();
//
//        if (doctorname === docname_col)
//        {
//            duplicate++;
//            error++;
//        }
//
//        if (duplicate > 0)
//        {
//            $("#docmancomanagementdup").text("Already Exist!");
//        } else
//        {
//            $("#docmancomanagementdup").text("");
//        }
//    });
//
//    if (error > 0)
//    {
//        swal
//                ({
//                    title: "Validation Notice!",
//                    text: "Some field requires your attention!!",
//                    type: "warning",
//                    allowOutsideClick: false
//                });
//    } else
//    {
//        swal
//                ({
//                    title: "Success!",
//                    text: "Record is successfully saved!",
//                    type: "success",
//                    allowOutsideClick: false
//                });
//
//        $('#comanagementform').addClass('d-none');
//        $('#comanagetablediv').removeClass('d-none');
//        $('#comanagereturnbtn').removeClass('d-none');
//        $('#comanagebuttondiv').removeClass('d-none');
//
//        $("#inputid_docmancomanagement").selectpicker("val", "Select");
//        $("#inputid_typmancomanagement").selectpicker("val", "Select");
//        $("#inputid_startcomanagement").val("");
//
//        comanage_table = $('#comanagement-masterlist-table').DataTable();
//        comanage_table.row.add
//                ([
//                    "<button class='btn btn-sm btn-danger waves-effect btn-adm-edt' title='Remove from list' style='margin-left:15px'><i class='zmdi zmdi-delete'></i></button>",
//                    typeofmana,
//                    doctorname,
//                    startofser,
//                    "no",
//                    curentdate,
//                    doctorcode,
//                    textboxidtbl
//                ]).order([8, 'asc']).draw(false);
//
//        var comaalldata = doctorname + "|" +
//                doctorcode + "|" +
//                typeofmana + "|" +
//                startofser + "|" +
//                textboxidtbl;
//
//        counterfortbleadmedt++;
//        textBoxCreateForAdmEdt(comaalldata);
//    }
//}

function textBoxCreateForAdmEdt(comaalldata)
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
    x.setAttribute("name", "docname_comanage" + counterfortextadmedt);
    x.setAttribute("class", "docname_comanage" + counterfortextadmedt);
    x.setAttribute("value", docname);
    document.getElementById("myFormComanageAdmitEdt").appendChild(x);

    var y = document.createElement("INPUT");
    y.setAttribute("type", "hidden");
    y.setAttribute("id", textboxidtbl);
    y.setAttribute("name", "doccode_comanage" + counterfortextadmedt);
    y.setAttribute("class", "doccode_comanage" + counterfortextadmedt);
    y.setAttribute("value", doccode);
    document.getElementById("myFormComanageAdmitEdt").appendChild(y);

    var z = document.createElement("INPUT");
    z.setAttribute("type", "hidden");
    z.setAttribute("id", textboxidtbl);
    z.setAttribute("name", "typeman_comanage" + counterfortextadmedt);
    z.setAttribute("class", "typeman_comanage" + counterfortextadmedt);
    z.setAttribute("value", typeman);
    document.getElementById("myFormComanageAdmitEdt").appendChild(z);

    var a = document.createElement("INPUT");
    a.setAttribute("type", "hidden");
    a.setAttribute("id", textboxidtbl);
    a.setAttribute("name", "startco_comanage" + counterfortextadmedt);
    a.setAttribute("class", "startco_comanage" + counterfortextadmedt);
    a.setAttribute("value", startco);
    document.getElementById("myFormComanageAdmitEdt").appendChild(a);

    counterfortextadmedt++;
}

function textBoxCreateForUpdateAdmissionHMOData(hmoalldata)
{
    var hmosplit = hmoalldata.split("|");
    var hmoname = hmosplit[0];
    var hmocode = hmosplit[1];
    var hmorefno = hmosplit[2];
    var hmocredit = hmosplit[3];
    var priorityno = hmosplit[4];
    var hmocardno = hmosplit[5];
    var hmoloa = hmosplit[6];
    var hmoapprovaldate = hmosplit[7];
    var hmocardholder = hmosplit[8];
    var textboxidtblhmo = hmosplit[9];

    var a = document.createElement("INPUT");
    a.setAttribute("type", "hidden");
    a.setAttribute("id", textboxidtblhmo);
    a.setAttribute("name", "hmoname_hmo" + counterfortexthmoadmedt);
    a.setAttribute("class", "hmoname_hmo" + counterfortexthmoadmedt);
    a.setAttribute("value", hmoname);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(a);

    var b = document.createElement("INPUT");
    b.setAttribute("type", "hidden");
    b.setAttribute("id", textboxidtblhmo);
    b.setAttribute("name", "hmocode_hmo" + counterfortexthmoadmedt);
    b.setAttribute("class", "hmocode_hmo" + counterfortexthmoadmedt);
    b.setAttribute("value", hmocode);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(b);

    var c = document.createElement("INPUT");
    c.setAttribute("type", "hidden");
    c.setAttribute("id", textboxidtblhmo);
    c.setAttribute("name", "hmorefno_hmo" + counterfortexthmoadmedt);
    c.setAttribute("class", "hmorefno_hmo" + counterfortexthmoadmedt);
    c.setAttribute("value", hmorefno);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(c);

    var d = document.createElement("INPUT");
    d.setAttribute("type", "hidden");
    d.setAttribute("id", textboxidtblhmo);
    d.setAttribute("name", "hmocredit_hmo" + counterfortexthmoadmedt);
    d.setAttribute("class", "hmocredit_hmo" + counterfortexthmoadmedt);
    d.setAttribute("value", hmocredit);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(d);

    var e = document.createElement("INPUT");
    e.setAttribute("type", "hidden");
    e.setAttribute("id", textboxidtblhmo);
    e.setAttribute("name", "priorityno_hmo" + counterfortexthmoadmedt);
    e.setAttribute("class", "priorityno_hmo" + counterfortexthmoadmedt);
    e.setAttribute("value", priorityno);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(e);

    var f = document.createElement("INPUT");
    f.setAttribute("type", "hidden");
    f.setAttribute("id", textboxidtblhmo);
    f.setAttribute("name", "hmocardno_hmo" + counterfortexthmoadmedt);
    f.setAttribute("class", "hmocardno_hmo" + counterfortexthmoadmedt);
    f.setAttribute("value", hmocardno);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(f);

    var g = document.createElement("INPUT");
    g.setAttribute("type", "hidden");
    g.setAttribute("id", textboxidtblhmo);
    g.setAttribute("name", "hmoloa_hmo" + counterfortexthmoadmedt);
    g.setAttribute("class", "hmoloa_hmo" + counterfortexthmoadmedt);
    g.setAttribute("value", hmoloa);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(g);

    var h = document.createElement("INPUT");
    h.setAttribute("type", "hidden");
    h.setAttribute("id", textboxidtblhmo);
    h.setAttribute("name", "hmoapprovaldate_hmo" + counterfortexthmoadmedt);
    h.setAttribute("class", "hmoapprovaldate_hmo" + counterfortexthmoadmedt);
    h.setAttribute("value", hmoapprovaldate);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(h);

    var i = document.createElement("INPUT");
    i.setAttribute("type", "hidden");
    i.setAttribute("id", textboxidtblhmo);
    i.setAttribute("name", "hmocardholder_hmo" + counterfortexthmoadmedt);
    i.setAttribute("class", "hmocardholder_hmo" + counterfortexthmoadmedt);
    i.setAttribute("value", hmocardholder);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(i);

    counterfortexthmoadmedt++;
}

function addNewHMOForUpdateAdmission()
{
    var refnohmo = $('#refnohmo').val();
    var updatedhmo = $('#updatedhmo').val();
    var recbyhmo = $('#recbyhmo').val();
    var hmoPatient = $('#hmopatient').val();
    var hmoCRLine = $('#hmocrline').val();
    var hmoPriority = $('#hmopriority').val();
    var hmoCardNo = $('#hmocardno').val();
    var hmoLOA = $('#hmoloa').val();
    var hmoApprovalDate = $('#hmoapprovaldate').val();
    var hmoCardHolderNo = $('#hmocardholderno').val();
    var hmoManagementId = $('#hmomanagementid').val();
    var hmoManagementName = $('#hmomanagementname').val();
    var newcreditvalue = "₱ " + parseFloat(hmoCRLine).toLocaleString();

    $.ajax
            ({
                type: 'POST',
                data:
                        {
                            hmoPatient: hmoPatient,
                            hmoCRLine: hmoCRLine,
                            hmoPriority: hmoPriority,
                            hmoCardNo: hmoCardNo,
                            hmoLOA: hmoLOA,
                            hmoApprovalDate: hmoApprovalDate,
                            hmoCardHolderNo: hmoCardHolderNo,
                            hmoManagementId: hmoManagementId,
                            hmoManagementName: hmoManagementName
                        },
                url: BASE_URL + 'HMOManagement/AddNewHMOPatient',
                dataType: 'json'
            })
            .done(function (result)
            {
                if (result.status === false)
                {
                    checkFieldValidations(result.errors.hmopatient, 'hmopatienterror', 'hmopatient');
                    checkFieldValidations(result.errors.hmocrline, 'hmocrlineerror', 'hmocrline');
                    checkFieldValidations(result.errors.hmopriority, 'hmopriorityerror', 'hmopriority');
                    checkFieldValidations(result.errors.hmocardno, 'hmocardnoerror', 'hmocardno');
                    checkFieldValidations(result.errors.hmoloa, 'hmoloaerror', 'hmoloa');
                    checkFieldValidations(result.errors.hmoapprovaldate, 'hmoapprovaldateerror', 'hmoapprovaldate');
                    checkFieldValidations(result.errors.hmocardholderno, 'hmocardholdernoerror', 'hmocardholderno');
                } else
                {
                    totalcredithmo = (parseFloat(totalcredithmo)) + (parseFloat(hmoCRLine));
                    $('#totalcredittextid').html(parseFloat(totalcredithmo).toLocaleString());


                    var hmosplit = hmoPatient.split(" - ");
                    var hmoname = hmosplit[0];
                    var hmocode = hmosplit[1];
                    var textboxidtblhmo = hmocode + "-" + counterfortblehmoadmedt;

                    swal
                            ({
                                title: "Success!",
                                text: "Record is successfully submitted!",
                                type: "success",
                                allowOutsideClick: false
                            });

                    $('#addhmo').addClass('d-none');
                    $('#hmo-table-and-header').removeClass('d-none');
                    $('#hmoreturnbuttondiv').removeClass('d-none');

                    $('#hmopatient').val('');
                    $('#hmocrline').val('');
                    $('#hmocardno').val('');
                    $('#hmoloa').val('');
                    $('#hmoapprovaldate').val('');
                    $('#hmocardholderno').val('');
                    $('#hiddentextid_previouscreditval').val('');

                    $('#hmopatient').css('border-color', '');
                    $('#hmocrline').css('border-color', '');
                    $('#hmocardno').css('border-color', '');
                    $('#hmoloa').css('border-color', '');
                    $('#hmoapprovaldate').css('border-color', '');
                    $('#hmocardholderno').css('border-color', '');

                    $('#hmopatienterror').html('');
                    $('#hmocrlineerror').html('');
                    $('#hmocardnoerror').html('');
                    $('#hmoloaerror').html('');
                    $('#hmoapprovaldateerror').html('');
                    $('#hmocardholdernoerror').html('');

                    var hmomanagement_table = $('#hmo-management-table').DataTable();
                    hmomanagement_table.row.add
                            (["<button class='btn btn-sm btn-warning waves-effect btn-hmo-adm-edt-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
                <button class='btn btn-sm btn-danger waves-effect btn-hmo-adm-edt-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                                hmoname,
                                newcreditvalue,
                                hmoLOA,
                                hmoPriority,
                                updatedhmo,
                                recbyhmo,
                                refnohmo,
                                hmocode,
                                hmoCardNo,
                                hmoApprovalDate,
                                hmoCardHolderNo,
                                textboxidtblhmo
                            ]).order([4, 'asc']).draw(false);

                    counterfortblehmoadmedt++;

                    var hmoalldata = hmoname + "|" +
                            hmocode + "|" +
                            refnohmo + "|" +
                            hmoCRLine + "|" +
                            hmoPriority + "|" +
                            hmoCardNo + "|" +
                            hmoLOA + "|" +
                            hmoApprovalDate + "|" +
                            hmoCardHolderNo + "|" +
                            textboxidtblhmo;

                    textBoxCreateForAddHMOEditAdmitPatient(hmoalldata);
                }
            });
}

function textBoxCreateForAddHMOEditAdmitPatient(hmoalldata)
{
    var hmosplit = hmoalldata.split("|");
    var hmoname = hmosplit[0];
    var hmocode = hmosplit[1];
    var hmorefno = hmosplit[2];
    var hmocredit = hmosplit[3];
    var priorityno = hmosplit[4];
    var hmocardno = hmosplit[5];
    var hmoloa = hmosplit[6];
    var hmoapprovaldate = hmosplit[7];
    var hmocardholder = hmosplit[8];
    var textboxidtblhmo = hmosplit[9];

    var a = document.createElement("INPUT");
    a.setAttribute("type", "hidden");
    a.setAttribute("id", textboxidtblhmo);
    a.setAttribute("name", "hmoname_hmo" + counterfortexthmoadmedt);
    a.setAttribute("class", "hmoname_hmo" + counterfortexthmoadmedt);
    a.setAttribute("value", hmoname);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(a);

    var b = document.createElement("INPUT");
    b.setAttribute("type", "hidden");
    b.setAttribute("id", textboxidtblhmo);
    b.setAttribute("name", "hmocode_hmo" + counterfortexthmoadmedt);
    b.setAttribute("class", "hmocode_hmo" + counterfortexthmoadmedt);
    b.setAttribute("value", hmocode);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(b);

    var c = document.createElement("INPUT");
    c.setAttribute("type", "hidden");
    c.setAttribute("id", textboxidtblhmo);
    c.setAttribute("name", "hmorefno_hmo" + counterfortexthmoadmedt);
    c.setAttribute("class", "hmorefno_hmo" + counterfortexthmoadmedt);
    c.setAttribute("value", hmorefno);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(c);

    var d = document.createElement("INPUT");
    d.setAttribute("type", "hidden");
    d.setAttribute("id", textboxidtblhmo);
    d.setAttribute("name", "hmocredit_hmo" + counterfortexthmoadmedt);
    d.setAttribute("class", "hmocredit_hmo" + counterfortexthmoadmedt);
    d.setAttribute("value", hmocredit);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(d);

    var e = document.createElement("INPUT");
    e.setAttribute("type", "hidden");
    e.setAttribute("id", textboxidtblhmo);
    e.setAttribute("name", "priorityno_hmo" + counterfortexthmoadmedt);
    e.setAttribute("class", "priorityno_hmo" + counterfortexthmoadmedt);
    e.setAttribute("value", priorityno);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(e);

    var f = document.createElement("INPUT");
    f.setAttribute("type", "hidden");
    f.setAttribute("id", textboxidtblhmo);
    f.setAttribute("name", "hmocardno_hmo" + counterfortexthmoadmedt);
    f.setAttribute("class", "hmocardno_hmo" + counterfortexthmoadmedt);
    f.setAttribute("value", hmocardno);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(f);

    var g = document.createElement("INPUT");
    g.setAttribute("type", "hidden");
    g.setAttribute("id", textboxidtblhmo);
    g.setAttribute("name", "hmoloa_hmo" + counterfortexthmoadmedt);
    g.setAttribute("class", "hmoloa_hmo" + counterfortexthmoadmedt);
    g.setAttribute("value", hmoloa);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(g);

    var h = document.createElement("INPUT");
    h.setAttribute("type", "hidden");
    h.setAttribute("id", textboxidtblhmo);
    h.setAttribute("name", "hmoapprovaldate_hmo" + counterfortexthmoadmedt);
    h.setAttribute("class", "hmoapprovaldate_hmo" + counterfortexthmoadmedt);
    h.setAttribute("value", hmoapprovaldate);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(h);

    var i = document.createElement("INPUT");
    i.setAttribute("type", "hidden");
    i.setAttribute("id", textboxidtblhmo);
    i.setAttribute("name", "hmocardholder_hmo" + counterfortexthmoadmedt);
    i.setAttribute("class", "hmocardholder_hmo" + counterfortexthmoadmedt);
    i.setAttribute("value", hmocardholder);
    document.getElementById("myFormHMOInsurAdmitEdt").appendChild(i);

    counterfortexthmoadmedt++;
}

function textBoxCreateForCausesEditAdmission(causesalldata)
{
    alert(causesalldata);
    var causessplit = causesalldata.split("|");
    var category = causessplit[0];
    var icddiag = causessplit[1];
    var dohicd = causessplit[2];
    var dohref = causessplit[3];
    var group = causessplit[4];
    var refno = causessplit[5];
    var causescode = causessplit[6];
    var textboxidtblcauses = causessplit[7];

    var category_input = document.createElement("INPUT");
    category_input.setAttribute("type", "hidden");
    category_input.setAttribute("id", textboxidtblcauses);
    category_input.setAttribute("name", "category_causes" + counterfortextcausesadmedt);
    category_input.setAttribute("class", "category_causes" + counterfortextcausesadmedt);
    category_input.setAttribute("value", category);
    document.getElementById("myFormCauseConAdmitEdt").appendChild(category_input);

    var icddiag_input = document.createElement("INPUT");
    icddiag_input.setAttribute("type", "hidden");
    icddiag_input.setAttribute("id", textboxidtblcauses);
    icddiag_input.setAttribute("name", "icddiag_causes" + counterfortextcausesadmedt);
    icddiag_input.setAttribute("class", "icddiag_causes" + counterfortextcausesadmedt);
    icddiag_input.setAttribute("value", icddiag);
    document.getElementById("myFormCauseConAdmitEdt").appendChild(icddiag_input);

    var dohicd_input = document.createElement("INPUT");
    dohicd_input.setAttribute("type", "hidden");
    dohicd_input.setAttribute("id", textboxidtblcauses);
    dohicd_input.setAttribute("name", "dohicd_causes" + counterfortextcausesadmedt);
    dohicd_input.setAttribute("class", "dohicd_causes" + counterfortextcausesadmedt);
    dohicd_input.setAttribute("value", dohicd);
    document.getElementById("myFormCauseConAdmitEdt").appendChild(dohicd_input);

    var dohref_input = document.createElement("INPUT");
    dohref_input.setAttribute("type", "hidden");
    dohref_input.setAttribute("id", textboxidtblcauses);
    dohref_input.setAttribute("name", "dohref_causes" + counterfortextcausesadmedt);
    dohref_input.setAttribute("class", "dohref_causes" + counterfortextcausesadmedt);
    dohref_input.setAttribute("value", dohref);
    document.getElementById("myFormCauseConAdmitEdt").appendChild(dohref_input);

    var group_input = document.createElement("INPUT");
    group_input.setAttribute("type", "hidden");
    group_input.setAttribute("id", textboxidtblcauses);
    group_input.setAttribute("name", "group_causes" + counterfortextcausesadmedt);
    group_input.setAttribute("class", "group_causes" + counterfortextcausesadmedt);
    group_input.setAttribute("value", group);
    document.getElementById("myFormCauseConAdmitEdt").appendChild(group_input);

    var refno_input = document.createElement("INPUT");
    refno_input.setAttribute("type", "hidden");
    refno_input.setAttribute("id", textboxidtblcauses);
    refno_input.setAttribute("name", "refno_causes" + counterfortextcausesadmedt);
    refno_input.setAttribute("class", "refno_causes" + counterfortextcausesadmedt);
    refno_input.setAttribute("value", refno);
    document.getElementById("myFormCauseConAdmitEdt").appendChild(refno_input);

    var causescode_input = document.createElement("INPUT");
    causescode_input.setAttribute("type", "hidden");
    causescode_input.setAttribute("id", textboxidtblcauses);
    causescode_input.setAttribute("name", "causescode_causes" + counterfortextcausesadmedt);
    causescode_input.setAttribute("class", "causescode_causes" + counterfortextcausesadmedt);
    causescode_input.setAttribute("value", causescode);
    document.getElementById("myFormCauseConAdmitEdt").appendChild(causescode_input);

    counterfortextcausesadmedt++;
}

function showDiagnosisManagementModalForAdmissionUpdate()
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

function selectCausesOfConfinementForDeleteAdmEdt()
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

                            confinecause_table.row('.bg-blue').remove().draw(false);
                            $("#" + textboxidtblcauses).remove();
                            $("#" + textboxidtblcauses).remove();
                            $("#" + textboxidtblcauses).remove();
                            $("#" + textboxidtblcauses).remove();
                            $("#" + textboxidtblcauses).remove();
                        } else
                        {
                            swal("Error", "Error in saving. Please try again!", "error");
                        }
                    });
}



function validateUpdateAdmitPatient()
{
    //------comanage------------------------------------------------------------>
    var rownumcom = $('#comanagement-masterlist-table').DataTable().rows().count();
    if (rownumcom !== 0)
    {
        var comanagement_table = $('#comanagement-masterlist-table').DataTable();
        var totalcomanage = comanagement_table.row(":last").data()[8];

        var datacomanage = '';
        for (var i = 1; i < parseInt(totalcomanage) + 1; i++)
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
    }

    //------hmo/insurance-------------------------------------------------------->
    var rownumhmo = $('#hmo-management-table').DataTable().rows().count();
    if (rownumhmo !== 0)
    {
        var hmomanagement_table = $('#hmo-management-table').DataTable();
        var totalhmo = hmomanagement_table.row(":last").data()[4];

        var datahmo = '';
        for (var cv = 1; cv < parseInt(totalhmo) + 1; cv++)
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

        var hmomanagementtable = $('#hmo-management-table').DataTable();
        var hmoname = hmomanagementtable.row(":first").data()[1];
        var hmocode = hmomanagementtable.row(":first").data()[8];
        var hmonoxx = hmomanagementtable.row(":first").data()[4];
        var holname = hmomanagementtable.row(":first").data()[7];
        var apprnum = hmomanagementtable.row(":first").data()[11];

        $('#hiddboxid_hmonameadm').val(hmoname);
        $('#hiddboxid_hmocodeadm').val(hmocode);
        $('#hiddboxid_hmoprioadm').val(hmonoxx);
        $('#hiddboxid_holnameadm').val(holname);
        $('#hiddboxid_apprnumadm').val(apprnum);
    } 
    else
    {
        $('#hiddboxid_hmonameadm').val("");
        $('#hiddboxid_hmocodeadm').val("");
        $('#hiddboxid_hmoprioadm').val("");
        $('#hiddboxid_holnameadm').val("");
        $('#hiddboxid_apprnumadm').val("");
    }

    //------causesofconfinement------------------------------------------------->
    var rownumcause = $('#causesof-confinement-table').DataTable().rows().count();
    if (rownumcause !== 0)
    {
        var confinecause_tablex = $('#causesof-confinement-table').DataTable();
        var totalcauses = confinecause_tablex.row(":last").data()[9];

        var datacauses = '';
        for (var causescv = 1; causescv < parseInt(totalcauses) + 1; causescv++)
        {
            datacauses += "?:" + $('.category_causes' + causescv).val() + "|"
                    + $('.icddiag_causes' + causescv).val() + "|"
                    + $('.dohicd_causes' + causescv).val() + "|"
                    + $('.dohref_causes' + causescv).val() + "|"
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
    }
    //------validate admission fields-------------------------------------------->

    //------General Tab-------------------------------------------->
    var error = 0;
    var generaltab = 0;

    var healthrecnoadm = $("#healthrecnoadm").val();
    if (healthrecnoadm === "")
    {
        $("#healthrecnoadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
    {
        $("#healthrecnoadmerr").html("");
    }

    var admixontypeselectadm = $("#admixontypeselectadm").val();
    if (admixontypeselectadm === "Select" || admixontypeselectadm === null)
    {
        $("#admixontypeselectadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
    {
        $("#admixontypeselectadmerr").html("");
    }

//    var casenumberadm = $("#casenumberadm").val();
//    if (casenumberadm === "")
//    {
//        $("#casenumberadmerr").html("Required Field!");
//        error++;
//        generaltab++;
//    } else
//    {
//        $("#casenumberadmerr").html("");
//    }

    var selectid_patienttypeadm = $("#selectid_patienttypeadm").val();
    if (selectid_patienttypeadm === "IPD")
    {
        $("#inputid_opdtypeadmerr").html("");
        $("#inputid_entrytypeadmerr").html("");

        var stationnameadm = $("#stationnameadm").val();
        if (stationnameadm === "Select" || stationnameadm === null)
        {
            $("#stationnameadmerr").html("Required Field!");
            error++;
            generaltab++;
        } else
        {
            $("#stationnameadmerr").html("");
        }
    } else
    {
        $("#stationnameadmerr").html("");

        var opdtypehid = $("#inputid_opdtypexdataadm").val();
        if (opdtypehid === "IPDPX")
        {
            $("#inputid_opdtypeadmerr").html("Required Field!");
            error++;
            generaltab++;
        } else
        {
            $("#inputid_opdtypeadmerr").html("");
        }

        var entrytypeadm = $("#selectid_entrytypeadm").val();
        if (entrytypeadm === "Select" || entrytypeadm === null)
        {
            $("#inputid_entrytypeadmerr").html("Required Field!");
            error++;
            generaltab++;
        } else
        {
            $("#inputid_entrytypeadmerr").html("");
        }
    }

    var selectid_patienttypeadm = $("#selectid_patienttypeadm").val();
    if (selectid_patienttypeadm === "Select" || selectid_patienttypeadm === null)
    {
        $("#selectid_patienttypeadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
    {
        $("#selectid_patienttypeadmerr").html("");
    }

    //------Profile Tab-------------------------------------------->

    var profiletab = 0;
    var contactcolapse = 0;
    var locatiocolapse = 0;

    var religionselectadm = $("#religionselectadm").val();
    if (religionselectadm === "Select" || religionselectadm === null)
    {
        $("#religionselectadmerr").html("Required Field!");
        error++;
        profiletab++;
        contactcolapse++;
    } else
    {
        $("#religionselectadmerr").html("");
    }

    var civilstatusselectadm = $("#civilstatusselectadm").val();
    if (civilstatusselectadm === "Select" || civilstatusselectadm === null)
    {
        $("#civilstatusselectadmerr").html("Required Field!");
        error++;
        profiletab++;
        contactcolapse++;
    } else
    {
        $("#civilstatusselectadmerr").html("");
    }

//    var mobilenoadm = $("#mobilenoadm").val();
//    if (mobilenoadm === "")
//    {
//        $("#mobilenoadmerr").html("Required Field!");
//        error++;
//        profiletab++;
//        contactcolapse++;
//    }
//    else
//    {
//        $("#mobilenoadmerr").html("");
//    }

//    var contactnoadm = $("#contactnoadm").val();
//    if (contactnoadm === "")
//    {
//        $("#contactnoadmerr").html("Required Field!");
//        error++;
//        profiletab++;
//        contactcolapse++;
//    }
//    else
//    {
//        $("#contactnoadmerr").html("");
//    }

    var provinceselectadm = $("#provinceselectadm").val();
    if (provinceselectadm === "Select" || provinceselectadm === null)
    {
        $("#provinceselectadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    } else
    {
        $("#provinceselectadmerr").html("");
    }

    var selectidcitymuniadm = $("#selectidcitymuniadm").val();
    if (selectidcitymuniadm === "Select" || selectidcitymuniadm === null)
    {
        $("#selectidcitymuniadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    } else
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
    } else
    {
        $("#zipcodexadmerr").html("");
    }

    var selectid_barangayadm = $("#selectid_barangayadm").val();
    if (selectid_barangayadm === "Select" || selectid_barangayadm === null)
    {
        $("#selectid_barangayadmerr").html("Required Field!");
        error++;
        profiletab++;
        locatiocolapse++;
    } else
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
    } else
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
        } else
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
        } else
        {
            $("#watcherbirthadmerr").html("");
        }

        var reltopatientadm = $("#reltopatientadm").val();
        if (reltopatientadm === "Select" || reltopatientadm === null)
        {
            $("#reltopatientadmerr").html("Required Field!");
            error++;
            admissiontab++;
            guradiancolapse++;
        } else
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
        } else
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
        } else
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
        } else
        {
            $("#patientrecipientadmerr").html("");
        }


//        var weightadm = $("#weightadm").val();
//        if (weightadm === "")
//        {
//            $("#weightadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            admixioncolapse++;
//        } else
//        {
//            $("#weightadmerr").html("");
//        }

        var cautionsadm = $("#cautionsadm").val();
        if (cautionsadm === "Select" || cautionsadm === null)
        {
            $("#cautionsadmerr").html("Required Field!");
            error++;
            admissiontab++;
            admixioncolapse++;
        } else
        {
            $("#cautionsadmerr").html("");
        }

        var inputid_tbdotsstatusadm = $("#inputid_tbdotsstatusadm").val();
        if (inputid_tbdotsstatusadm === "Select" || inputid_tbdotsstatusadm === null)
        {
            $("#inputid_tbdotsstatusadmerr").html("Required Field!");
            error++;
            admissiontab++;
            admixioncolapse++;
        } else
        {
            $("#inputid_tbdotsstatusadmerr").html("");
        }

//        var linkaccountadm = $("#linkaccountadm").val();
//        if (linkaccountadm === "")
//        {
//            $("#linkaccountadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            admixioncolapse++;
//        }
//        else
//        {
//            $("#linkaccountadmerr").html("");
//        }


        var attendingdoctoradm = $("#attendingdoctoradm").val();
        if (attendingdoctoradm === "")
        {
            $("#attendingdoctoradmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        } else
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
        } else
        {
            $("#attendingnurseadmerr").html("");
        }

//        var inputid_finalcomanagedataadm = $("#inputid_finalcomanagedataadm").val();
//        if (inputid_finalcomanagedataadm === "")
//        {
//            $("#inputid_finalcomanagedataadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            attendntcolapse++;
//        } else
//        {
//            $("#inputid_finalcomanagedataadmerr").html("");
//        }

//        var nurseinchargeadm = $("#nurseinchargeadm").val();
//        if (nurseinchargeadm === "Select" || nurseinchargeadm === null)
//        {
//            $("#nurseinchargeadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            attendntcolapse++;
//        } else
//        {
//            $("#nurseinchargeadmerr").html("");
//        }

        var selectid_roomadm = $("#selectid_roomadm").val();
        if (selectid_roomadm === "")
        {
            $("#selectid_roomadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
        {
            $("#attendingnurseadmerr").html("");
        }

//        var inputid_finalcomanagedataadm = $("#inputid_finalcomanagedataadm").val();
//        if (inputid_finalcomanagedataadm === "")
//        {
//            $("#inputid_finalcomanagedataadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            attendntcolapse++;
//        } else
//        {
//            $("#inputid_finalcomanagedataadmerr").html("");
//        }

        var selectid_roomadm = $("#selectid_roomadm").val();
        if (selectid_roomadm === "")
        {
            $("#selectid_roomadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
    if (phmembershipselectadm === "Select" || phmembershipselectadm === null)
    {
        $("#phmembernameadmerr").html("");
        $("#inputid_mdfrefnumadmerr").html("");
        $("#phicnumberadmerr").html("");
        $("#reltomemberadmerr").html("");

        $("#phmembershipselectadmerr").html("Required Field!");
        error++;
        insurancetab++;
        philhmocolapse++;
    } else if (phmembershipselectadm === "NON-NHIP:NHP")
    {
        $("#phmembershipselectadmerr").html("");
        $("#phmembernameadmerr").html("");
        $("#inputid_mdfrefnumadmerr").html("");
        $("#phicnumberadmerr").html("");
        $("#reltomemberadmerr").html("");
    } else
    {
        $("#phmembershipselectadmerr").html("");

//        var phmembernameadm = $("#phmembernameadm").val();
//        if (phmembernameadm === "")
//        {
//            $("#phmembernameadmerr").html("Required Field!");
//            error++;
//            insurancetab++;
//            philhmocolapse++;
//        } else
//        {
//            $("#phmembernameadmerr").html("");
//        }
//
//        var mdfrefnumadm = $("#inputid_mdfrefnumadm").val();
//        if (mdfrefnumadm === "")
//        {
//            $("#inputid_mdfrefnumadmerr").html("Required Field!");
//            error++;
//            insurancetab++;
//            philhmocolapse++;
//        } else
//        {
//            $("#inputid_mdfrefnumadmerr").html("");
//        }
//
//
//        var phicnumberadm = $("#phicnumberadm").val();
//        if (phicnumberadm === "")
//        {
//            $("#phicnumberadmerr").html("Required Field!");
//            error++;
//            insurancetab++;
//            philhmocolapse++;
//        } else
//        {
//            $("#phicnumberadmerr").html("");
//        }
//
//        var reltomemberadm = $("#reltomemberadm").val();
//        if (reltomemberadm === "Select" || reltomemberadm === null)
//        {
//            $("#reltomemberadmerr").html("Required Field!");
//            error++;
//            insurancetab++;
//            philhmocolapse++;
//        } else
//        {
//            $("#reltomemberadmerr").html("");
//        }
    }

    var patientclassadm = $("#patientclassadm").val();
    if (patientclassadm === "Select" || patientclassadm === null)
    {
        $("#patientclassadmerr").html("Required Field!");
        error++;
        insurancetab++;
        pxclasscolapse++;
    } else
    {
        $("#patientclassadmerr").html("");
    }

    var inputid_creditmaxlimitadm = $("#inputid_creditmaxlimitadm").val();
    if (inputid_creditmaxlimitadm === "Select" || inputid_creditmaxlimitadm === null)
    {
        $("#inputid_creditmaxlimitadmerr").html("Required Field!");
        error++;
        insurancetab++;
        pckgvipcolapse++;
    } else
    {
        $("#inputid_creditmaxlimitadmerr").html("");
    }

    //------Admission Tab-------------------------------------------->

    var otherstab = 0;

    var complaintcolapse = 0;
    var diagnosiscolapse = 0;
    var dietguidecolapse = 0;
    var cnfinemntcolapse = 0;
    var impresopdcolapse = 0;


//    var admissionreasonadm = $("#admissionreasonadm").val();
//    if (admissionreasonadm === "")
//    {
//        $("#admissionreasonadmerr").html("Required Field!");
//        error++;
//        otherstab++;
//        complaintcolapse++;
//    } else
//    {
//        $("#admissionreasonadmerr").html("");
//    }

//    var admittingdiagnosisadm = $("#admittingdiagnosisadm").val();
//    if (admittingdiagnosisadm === "")
//    {
//        $("#admittingdiagnosisadmerr").html("Required Field!");
//        error++;
//        otherstab++;
//        diagnosiscolapse++;
//    } else
//    {
//        $("#admittingdiagnosisadmerr").html("");
//    }

    if (selectid_patienttypeadm === "IPD")
    {
//        var dietaryadm = $("#dietaryadm").val();
//        if (dietaryadm === "")
//        {
//            $("#dietaryadmerr").html("Required Field!");
//            error++;
//            otherstab++;
//            dietguidecolapse++;
//        } else
//        {
//            $("#dietaryadmerr").html("");
//        }
    }
    else
    {
//        var impressionopdadm = $("#impressionopdadm").val();
//        if (impressionopdadm === "")
//        {
//            $("#impressionopdadmerr").html("Required Field!");
//            error++;
//            otherstab++;
//            impresopdcolapse++;
//        } else
//        {
//            $("#impressionopdadmerr").html("");
//        }
    }

//    var inputid_finalcausecondataadm = $("#inputid_finalcausecondataadm").val();
//    if (inputid_finalcausecondataadm === "")
//    {
//        $("#inputid_finalcausecondataadmerr").html("Required Field!");
//        error++;
//        otherstab++;
//        cnfinemntcolapse++;
//    } else
//    {
//        $("#inputid_finalcausecondataadmerr").html("");
//    }


    if (otherstab > 0)
    {
        $("#clickothersid").tab('show');
        $("#otherserrtabindicator").html("*");

        if (selectid_patienttypeadm === "IPD")
        {
            if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
            else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
            else if (complaintcolapse === 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
            else if (complaintcolapse === 0 && diagnosiscolapse === 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
            else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
            else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse === 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
        } else
        {
            if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && impresopdcolapse !== 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && impresopdcolapse !== 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('show');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '#168C94');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && impresopdcolapse !== 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('show');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '#168C94');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && impresopdcolapse === 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('show');

                $("#comp").css('background', '');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '#168C94');
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && impresopdcolapse !== 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && impresopdcolapse === 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && impresopdcolapse === 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && impresopdcolapse === 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && impresopdcolapse === 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && impresopdcolapse !== 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && impresopdcolapse === 0 && cnfinemntcolapse !== 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("*");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('show');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '#168C94');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && impresopdcolapse === 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('show');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '#168C94');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && impresopdcolapse !== 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("*");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('show');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '#168C94');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && impresopdcolapse !== 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('hide');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '');
                $("#dietopd").css('background', '#168C94');
                $("#conf").css('background', '');
            } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && impresopdcolapse !== 0 && cnfinemntcolapse === 0)
            {
                $("#complainterrcolapseindicator").html("");
                $("#diagnosiserrcolapseindicator").html("*");
                $("#impresopderrcolapseindicator").html("*");
                $("#cnfinemnterrcolapseindicator").html("");

                $("#ComplaintsIPDCollapse").collapse('hide');
                $("#DiagnosisIPDCollapse").collapse('show');
                $("#ImpressionOPDCollapse").collapse('hide');
                $("#ConfinementIPDCollapse").collapse('hide');

                $("#comp").css('background', '');
                $("#diag").css('background', '#168C94');
                $("#dietopd").css('background', '');
                $("#conf").css('background', '');
            }
        }
    } else
    {
        $("#otherserrtabindicator").html("");

        $("#complainterrcolapseindicator").html("");
        $("#diagnosiserrcolapseindicator").html("");
        $("#cnfinemnterrcolapseindicator").html("");

        if (selectid_patienttypeadm === "IPD")
        {
            $("#dietguideerrcolapseindicator").html("");
        } else
        {
            $("#impresopderrcolapseindicator").html("");
        }
    }

    if (insurancetab > 0)
    {
        $("#clickinsuranceid").tab('show');
        $("#insuranceerrtabindicator").html("*");

        if (philhmocolapse !== 0 && pxclasscolapse !== 0 && pckgvipcolapse !== 0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("*");

            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');


            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse === 0 && pxclasscolapse !== 0 && pckgvipcolapse !== 0)
        {
            $("#philhmoerrcolapseindicator").html("");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("*");

            $("#philhealthandHMOCollapse").collapse('hide');
            $("#ClassificationCollapse").collapse('show');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');


            $("#phhm").css('background', '');
            $("#pxcl").css('background', '#168C94');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse === 0 && pxclasscolapse === 0 && pckgvipcolapse !== 0)
        {
            $("#philhmoerrcolapseindicator").html("");
            $("#pxclasserrcolapseindicator").html("");
            $("#pckgviperrcolapseindicator").html("*");

            $("#philhealthandHMOCollapse").collapse('hide');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('show');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '#168C94');
            $("#vips").css('background', '');
        } else if (philhmocolapse !== 0 && pxclasscolapse !== 0 && pckgvipcolapse === 0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("");

            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse !== 0 && pxclasscolapse === 0 && pckgvipcolapse === 0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("");
            $("#pckgviperrcolapseindicator").html("");

            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse !== 0 && pxclasscolapse === 0 && pckgvipcolapse !== 0)
        {
            $("#philhmoerrcolapseindicator").html("*");
            $("#pxclasserrcolapseindicator").html("");
            $("#pckgviperrcolapseindicator").html("*");

            $("#philhealthandHMOCollapse").collapse('show');
            $("#ClassificationCollapse").collapse('hide');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '#168C94');
            $("#pxcl").css('background', '');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        } else if (philhmocolapse === 0 && pxclasscolapse !== 0 && pckgvipcolapse === 0)
        {
            $("#philhmoerrcolapseindicator").html("");
            $("#pxclasserrcolapseindicator").html("*");
            $("#pckgviperrcolapseindicator").html("");

            $("#philhealthandHMOCollapse").collapse('hide');
            $("#ClassificationCollapse").collapse('show');
            $("#PackagesandVIPCollapse").collapse('hide');
            $("#VisualInfusionCollapse").collapse('hide');

            $("#phhm").css('background', '');
            $("#pxcl").css('background', '#168C94');
            $("#vipm").css('background', '');
            $("#vips").css('background', '');
        }
    } else
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

        if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse === 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse === 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
    } else
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

        if (locatiocolapse !== 0 && contactcolapse !== 0)
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
        } else if (locatiocolapse !== 0 && contactcolapse === 0)
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
        } else if (contactcolapse !== 0 && locatiocolapse === 0)
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
    } else
    {
        $("#profileerrtabindicator").html("");
        $("#contacterrcolapseindicator").html("");
        $("#locationerrcolapseindicator").html("");
    }

    if (generaltab > 0)
    {
        $("#clickgeneralid").tab('show');
        $("#generalerrtabindicator").html("*");
    } else
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

        $('#admitPatientButton').removeAttr('disabled');
    } 
    else
    {
        $('#admitPatientButton').attr('disabled', true);
        showSupervisorPermissionModalForEdtAdm();
    }
}

function showSupervisorPermissionModalForEdtAdm()
{
    $('#admitPatientButton').attr('disabled', false);

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

    var description = "CN: " +
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

    $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
}

function checkAuthorizationFromSupervisorForEdtAdm()
{
    swal
    ({
        title: "Please wait!",
        text: "Processing of data is still ongoing.",
        imageUrl: BASE_URL + "assets/images/loading.gif",
        imageSize: '200x200',
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false
    });

    interval = setInterval(function ()
    {
        if ($('#supervisorpermitmodal').hasClass('hide'))
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);

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

                    var suprvidtrimptag = supervisorid.replace(/<[\/]{0,1}(p)[^><]*>/ig, "");
                    var suprasstrimptag = supervpasswd.replace(/<[\/]{0,1}(p)[^><]*>/ig, "");

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

                        swal.close();
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

                        swal.close();
                    }

                    $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
                    
                    swal.close();
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

                    createLogForAdmittedPatientUpdate();
                } 
                else
                {
                    swal
                    ({
                        title: "Validation Notice!",
                        text: "Some field requires your attention!!",
                        type: "warning",
                        allowOutsideClick: false
                    });
                }


                if (result.error_acct)
                {
                    swal.close();

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
                    if (result.error_access)
                    {
                        swal.close();

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
                            swal.close();
                            
                            $('#accounterror').html("Incorrect Username or Password!");
                            $('#accounterror').removeClass('d-none');

                            $('#suprvisoriderror').html("");
                            $('#suprvisoriderror').addClass('d-none');

                            $('#suppassworderror').html("");
                            $('#suppassworderror').addClass('d-none');

                            $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
                        } 
                        else
                        {
                            if (result.error_head)
                            {
                                swal.close();
                                
                                $('#suprvisoriderror').html("");
                                $('#suprvisoriderror').addClass('d-none');

                                $('#suppassworderror').html("");
                                $('#suppassworderror').addClass('d-none');

                                $('#accounterror').html("Wrong supervisor account!");
                                $('#accounterror').removeClass('d-none');

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
                } else
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
        $('.admitPatientButton').attr('disabled', true);

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

                        $('.admitPatientButton').removeAttr('disabled');
                        $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
                    }
            );
}

function edtOldVIPForAdmissionUpdate()
{
    var casecode = $('#inputid_casecodevipmanagement').val();
    var casenumb = $('#inputid_accntnovipmanagement').val();

    if ($("#radio_vip").is(":checked"))
    {
        var vipvalue = 1;
        var secvalue = 0;
        var nonvalue = 0;
    } else if ($("#radio_sec").is(":checked"))
    {
        var vipvalue = 0;
        var secvalue = 1;
        var nonvalue = 0;
    } else
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

    var error = 0;

    if (oicincharval === "Select From List")
    {
        $("#oicinchargeviperr").text("Required Field!");
        error++;
    } else
    {
        $("#oicinchargeviperr").text("");
    }

    if (remarks === "")
    {
        $("#remarksviperr").text("Required Field!");
        error++;
    } else
    {
        $("#remarksviperr").text("");
    }

    if (nonvalue === 1)
    {
        $("#inputid_vipsecuritydataadm").val("");
        hideSecurityManagementModalForAdmission();
    } else
    {
        if (error > 0)
        {
            swal
                    ({
                        title: "Validation Notice!",
                        text: "Some field requires your attention!!",
                        type: "warning",
                        allowOutsideClick: false
                    });
        } else
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

function getAllQuickAdmittedPatientAndAddItToTheTable()
{
    quickadmittedpx_table = $('#quick-admitted-patients-masterlist-table').DataTable
            ({
                responsive: true,
                processing: true,
                serverSide: true,
                order: [],
                language:
                        {
                            processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='200' height='200'>"
                        },
                ajax:
                        {
                            url: BASE_URL + 'Emergency/GetAllQuickAdmittedPatients',
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

function showEditQuickAdmittedPatientModal(caseno)
{
    setToDefaultViewEditAdmittedPatientModal();

    $('#admitpatientmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

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
    $('#selectid_entrytypeadm').selectpicker('val', 'Disabled');
    $('#selectid_entrytypeadm').selectpicker('refresh');

    $('#admissiontypehiddentext').val('Normal');
    $('#inputid_pathologyadm').val('NON-PATHOLOGY');
    $('#textboxid_forminororadm').val(0);

    $('#editquickadmitPatientButton').removeClass('d-none');
    $('#editadmitPatientButton').addClass('d-none');
    $('#admitPatientButton').addClass('d-none');

    $('#hideeditadmitpxmodalbtnid').removeClass('d-none');
    $('#hideadmitpxmodalbtnid').addClass('d-none');

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
                    $('#selectid_patienttypeadm').selectpicker('val', data.inpatientlistdata['pxtype']);
                    $('#selectid_entrytypeadm').selectpicker('val', data.inpatientlistdata['casetype']);
                    $('#lastnameadm').val(data.inpatientlistdata['lname']);
                    $('#firstnameadm').val(data.inpatientlistdata['fname']);
                    $('#suffixadm').val(data.inpatientlistdata['suffix']);
                    $('#middlenameadm').val(data.inpatientlistdata['mname']);
                    $('#genderadm').val(data.inpatientlistdata['sex']);
                    $('#nationalityadm').val(data.inpatientlistdata['nationality']);
                    $('#hiddeninputid_casecodexadm').val(data.inpatientlistdata['casecode']);
                    $('#religionselectadm').selectpicker('val', data.inpatientlistdata['religion']);
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

                    $('#civilstatusselectadm').selectpicker('val', data.inpatientlistdata['civilstatus']);

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
                    $('#provinceselectadm').selectpicker('val', data.inpatientlistdata['provadd']);
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

function validateUpdateQuickAdmitPatient()
{
    $('#editquickadmitPatientButton').prop('disabled', true);

    //------comanage------------------------------------------------------------>
    var datacomanage = '';
    for (var i = 1; i < counterfortext; i++)
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
    for (var cv = 1; cv < counterfortexthmo; cv++)
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
    for (var causescv = 1; causescv < counterfortextcauses; causescv++)
    {
        datacauses += "?:" + $('.category_causes' + causescv).val() + "|"
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
    } else
    {
        $("#healthrecnoadmerr").html("");
    }

    var admixontypeselectadm = $("#admixontypeselectadm").val();
    if (admixontypeselectadm === "Select")
    {
        $("#admixontypeselectadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
    {
        $("#admixontypeselectadmerr").html("");
    }

    var casenumberadm = $("#casenumberadm").val();
    if (casenumberadm === "")
    {
        $("#casenumberadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
    {
        $("#casenumberadmerr").html("");
    }

    var stationnameadm = $("#stationnameadm").val();
    if (stationnameadm === "Select")
    {
        $("#stationnameadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
    {
        $("#stationnameadmerr").html("");
    }

    var selectid_patienttypeadm = $("#selectid_patienttypeadm").val();
    if (selectid_patienttypeadm === "Select")
    {
        $("#selectid_patienttypeadmerr").html("Required Field!");
        error++;
        generaltab++;
    } else
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
    } else
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
    } else
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
    } else
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
    } else
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
    } else
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
    } else
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
    } else
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
    } else
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
    } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
        } else
        {
            $("#inputid_roomcredadmerr").html("");
        }
    } else
    {
        var attendingdoctoradm = $("#attendingdoctoradm").val();
        if (attendingdoctoradm === "")
        {
            $("#attendingdoctoradmerr").html("Required Field!");
            error++;
            admissiontab++;
            attendntcolapse++;
        } else
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
        } else
        {
            $("#attendingnurseadmerr").html("");
        }

//        var inputid_finalcomanagedataadm = $("#inputid_finalcomanagedataadm").val();
//        if (inputid_finalcomanagedataadm === "")
//        {
//            $("#inputid_finalcomanagedataadmerr").html("Required Field!");
//            error++;
//            admissiontab++;
//            attendntcolapse++;
//        } else
//        {
//            $("#inputid_finalcomanagedataadmerr").html("");
//        }

        var selectid_roomadm = $("#selectid_roomadm").val();
        if (selectid_roomadm === "")
        {
            $("#selectid_roomadmerr").html("Required Field!");
            error++;
            admissiontab++;
            accomodacolapse++;
        } else
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
        } else
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
        } else
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
        } else
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
        } else
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
    } else
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
    } else
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
    } else
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
        } else
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
        } else
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
        } else
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
        } else
        {
            $("#inputid_finalcausecondataadmerr").html("");
        }
    } else
    {
        var complaintsopdadm = $("#complaintsopdadm").val();
        if (complaintsopdadm === "")
        {
            $("#complaintsopdadmerr").html("Required Field!");
            error++;
            otherstab++;
            complaopdcolapse++;
        } else
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
        } else
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
        } else
        {
            $("#impressionopdadmerr").html("");
        }
    }

    if (otherstab > 0)
    {
        $("#clickothersid").tab('show');
        $("#otherserrtabindicator").html("*");

        if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
        } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
        } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
        } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
        } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
        } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse === 0)
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
        } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse === 0 && cnfinemntcolapse === 0)
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
        } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
        } else if (complaintcolapse !== 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
        } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse !== 0)
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
        } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse !== 0)
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
        } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse === 0 && cnfinemntcolapse === 0)
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
        } else if (complaintcolapse !== 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
        } else if (complaintcolapse === 0 && diagnosiscolapse === 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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
        } else if (complaintcolapse === 0 && diagnosiscolapse !== 0 && dietguidecolapse !== 0 && cnfinemntcolapse === 0)
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

        if (complaopdcolapse !== 0 && diagnsopdcolapse !== 0 && impresopdcolapse !== 0)
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
        } else if (complaopdcolapse === 0 && diagnsopdcolapse !== 0 && impresopdcolapse !== 0)
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
        } else if (complaopdcolapse === 0 && diagnsopdcolapse === 0 && impresopdcolapse !== 0)
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
        } else if (complaopdcolapse !== 0 && diagnsopdcolapse !== 0 && impresopdcolapse === 0)
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
        } else if (complaopdcolapse !== 0 && diagnsopdcolapse === 0 && impresopdcolapse === 0)
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
        } else if (complaopdcolapse !== 0 && diagnsopdcolapse === 0 && impresopdcolapse !== 0)
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
        } else if (complaopdcolapse === 0 && diagnsopdcolapse !== 0 && impresopdcolapse === 0)
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
    } else
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

        if (philhmocolapse !== 0 && pxclasscolapse !== 0 && pckgvipcolapse !== 0)
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
        } else if (philhmocolapse === 0 && pxclasscolapse !== 0 && pckgvipcolapse !== 0)
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
        } else if (philhmocolapse === 0 && pxclasscolapse === 0 && pckgvipcolapse !== 0)
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
        } else if (philhmocolapse !== 0 && pxclasscolapse !== 0 && pckgvipcolapse === 0)
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
        } else if (philhmocolapse !== 0 && pxclasscolapse === 0 && pckgvipcolapse === 0)
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
        } else if (philhmocolapse !== 0 && pxclasscolapse === 0 && pckgvipcolapse !== 0)
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
        } else if (philhmocolapse === 0 && pxclasscolapse !== 0 && pckgvipcolapse === 0)
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
    } else
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

        if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse === 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse === 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse !== 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse === 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse !== 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse === 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
        } else if (guradiancolapse === 0 && admixioncolapse !== 0 && attendntcolapse !== 0 && accomodacolapse === 0)
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
    } else
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

        if (locatiocolapse !== 0 && contactcolapse !== 0)
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
        } else if (locatiocolapse !== 0 && contactcolapse === 0)
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
        } else if (contactcolapse !== 0 && locatiocolapse === 0)
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
    } else
    {
        $("#profileerrtabindicator").html("");
        $("#contacterrcolapseindicator").html("");
        $("#locationerrcolapseindicator").html("");
    }

    if (generaltab > 0)
    {
        $("#clickgeneralid").tab('show');
        $("#generalerrtabindicator").html("*");
    } else
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
    } else
    {
        $('#editquickadmitPatientButton').attr('disabled', true);
        showSupervisorPermissionModalForEdtQuickAdm();
    }
}

function showSupervisorPermissionModalForEdtQuickAdm()
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

    var description = "CN: " +
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

function hideSupervisorPermissionModalForEdtQuickAdm()
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

    $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
}

function checkAuthorizationFromSupervisorForEdtQuickAdm()
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

                    var suprvidtrimptag = supervisorid.replace(/<[\/]{0,1}(p)[^><]*>/ig, "");
                    var suprasstrimptag = supervpasswd.replace(/<[\/]{0,1}(p)[^><]*>/ig, "");

                    if (supervisorid.toString() !== '')
                    {
                        $('#suprvisoriderror').html(suprvidtrimptag.toString());
                        $('#suprvisoriderror').removeClass('d-none');
                    } else
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
                    } else
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

                    createLogForQuickAdmittedPatientUpdate();
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
                } else
                {
                    if (result.error_head)
                    {
                        $('#suprvisoriderror').html("");
                        $('#suprvisoriderror').addClass('d-none');

                        $('#suppassworderror').html("");
                        $('#suppassworderror').addClass('d-none');

                        $('#accounterror').html("Wrong supervisor account!");
                        $('#accounterror').removeClass('d-none');

                        $('#checkAuthorizationButtonForEdtAdm').prop('disabled', false);
                    } else
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
                        } else
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

function createLogForQuickAdmittedPatientUpdate()
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
                } else
                {
                    var caseno = $("#accountnumberadm").val();
                    uploadPatientImageForEditQuickAdmitPatient(caseno);
                }
            });
}

function uploadPatientImageForEditQuickAdmitPatient(caseno)
{
    if ($('#openpatientimguploadforadmpx').val() === '')
    {
        updateQuickAdmittedPatient(caseno);
    } else
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
                    insertImageToLocationForEditQuickAdmittedPx(caseno);
                });
    }
}

function insertImageToLocationForEditQuickAdmittedPx(casenox)
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
                updateQuickAdmittedPatient(casenox);
            });
}

function updateQuickAdmittedPatient(casenox)
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
                                                    showDiagnosticDataModalQuickAdmitted(casenox);
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

function showDiagnosticDataModalQuickAdmitted(casenum)
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

function calculateAge(birthdate)
{
    var mdate = moment(birthdate).format("YYYY-MM-DD").toString();
    var yearThen = parseInt(mdate.substring(0, 4), 10);
    var monthThen = parseInt(mdate.substring(5, 7), 10);
    var dayThen = parseInt(mdate.substring(8, 10), 10);

    var today = new Date();
    var birthday = new Date(yearThen, monthThen - 1, dayThen);
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

    var month_age = Math.floor(day_age / 30);

    day_age = day_age % 30;

    var tMnt = (month_age + (year_age * 12));
    var tDays = (tMnt * 30) + day_age;
    
    if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age)) 
    {
        return "Invalid birthday - Please try again!";
    }
    else 
    {
        return year_age + "." + month_age;
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

    if (hrnhidqck === "YES")
    {
        var HRNverified = 1;
    } else
    {
        var HRNverified = 0;
    }

    if (oldhidqck === "ON")
    {
        var oldrecord = 1;
    } else
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
                    function ()
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
                                        } else
                                        {
                                            $('#quickdataeditmodal').modal("hide");
                                            showNewAdmissionModal();

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
                                                                $('#search-allpatient-table_filter [type="search"]').val(pinnumqck);
                                                                $('#search-allpatient-table_filter [type="search"]').focus();
                                                                pxmasterlist_table.search(pinnumqck).draw();
                                                            });
                                        }
                                    }
                                });
                    });
}


function showICD10GroupingManagementModal()
{
    $('#searchicd10grouping').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#searchicd10grouping').css('overflow-y', 'scroll');
}

function hideICD10GroupingManagementModal()
{
    $('#searchicd10grouping').modal("hide");

    $('#admitpatientmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#admitpatientmodal').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
}

function getAllICD10AndAddItToTheTable()
{
    icd10_table = $('#icd10grouping-masterlist-table').DataTable
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
                            url: BASE_URL + 'Diagnosis/DisplayICD10Grouping',
                            type: 'POST'
                        },

                createdRow: function (row, data, dataIndex)
                {

                },

                initComplete: function (settings, json)
                {

                }
            });

    icd10_table.on('dblclick', 'tr', function ()
    {
        var data = icd10_table.row(this).data();
        var category = data[1];
        var icddiag = data[2];
        var dohicd = data[3];

        var date = moment();
        var datecode = date.format("MMDDYYYYhhmmss");
        var datesplit = datecode.split("");
        var shuffledate = shuffle(datesplit);
        var finalformat = shuffledate.join('');
        var causescode = finalformat + "CATGDIAG";

        var rownumcause = $('#causesof-confinement-table').DataTable().rows().count();
        if (rownumcause === 0)
        {
            swal
                    ({
                        title: "Success!",
                        text: "Diagnosis is successfully added!",
                        type: "success",
                        allowOutsideClick: false
                    });

            hideICD10GroupingManagementModal();
            var textboxidtblcausesadd = causescode + "-" + "1";

            var confinecause_table = $('#causesof-confinement-table').DataTable();
            confinecause_table.row.add
                    ([
                        "",
                        category,
                        icddiag,
                        dohicd,
                        "",
                        category,
                        "DIAGCODE",
                        causescode,
                        textboxidtblcausesadd,
                        "1"
                    ]).order([9, 'asc']).draw(false);

            var causesalldata = category + "|" +
                    icddiag + "|" +
                    dohicd + "|" +
                    "" + "|" +
                    category + "|" +
                    "DIAGCODE" + "|" +
                    causescode + "|" +
                    "1" + "|" +
                    textboxidtblcausesadd;

            textBoxCreateForCauses(causesalldata);
        } else
        {
            var duplicate = 0;

            var confinecause_tablex = $('#causesof-confinement-table').DataTable();

            var rowno = $('#causesof-confinement-table').DataTable().rows().count();
            for (var i = 0; i < rowno; i++)
            {
                var rowanddata = confinecause_tablex.row(i).data();
                if (category === rowanddata[1])
                {
                    duplicate++;
                }
            }

            if (duplicate > 0)
            {
                swal
                        ({
                            title: "Validation Notice!",
                            text: "Diagnosis exists already from confinement table!!",
                            type: "warning",
                            allowOutsideClick: false
                        });
            } else
            {
                hideICD10GroupingManagementModal();

                swal
                        ({
                            title: "Success!",
                            text: "Record is successfully selected!",
                            type: "success",
                            allowOutsideClick: false
                        });

                var sortval = confinecause_tablex.row(":last").data()[9];
                var sortvalplusone = parseInt(sortval) + 1;
                var textboxidtblcausesadd = causescode + "-" + sortvalplusone;

                confinecause_tablex.row.add
                        ([
                            "",
                            category,
                            icddiag,
                            dohicd,
                            "",
                            category,
                            "DIAGCODE",
                            causescode,
                            textboxidtblcausesadd,
                            sortvalplusone
                        ]).order([9, 'asc']).draw(false);

                var causesalldata = category + "|" +
                        icddiag + "|" +
                        dohicd + "|" +
                        "" + "|" +
                        category + "|" +
                        "DIAGCODE" + "|" +
                        causescode + "|" +
                        sortvalplusone + "|" +
                        textboxidtblcausesadd;

                textBoxCreateForCauses(causesalldata);
            }
        }
    });
}


function selectICD10()
{
    var data;

    $('#icd10grouping-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#icd10grouping-masterlist-table').dataTable().$('tr.bg-cyan').removeClass('bg-cyan');
        $(this).addClass('bg-cyan');

        var data = $('#icd10grouping-masterlist-table').DataTable().row('.bg-cyan').data();
        selectedICD10 = data;
    });
}

function selectICD10forAdmitPatient()
{
    if (icd10_table.rows('.bg-cyan').any())
    {
        var category = selectedICD10[1];
        var icddiag = selectedICD10[2];
        var dohicd = selectedICD10[3];

        var date = moment();
        var datecode = date.format("MMDDYYYYhhmmss");
        var datesplit = datecode.split("");
        var shuffledate = shuffle(datesplit);
        var finalformat = shuffledate.join('');
        var causescode = finalformat + "CATGDIAG";

        var rownumcause = $('#causesof-confinement-table').DataTable().rows().count();
        if (rownumcause === 0)
        {
            swal
                    ({
                        title: "Success!",
                        text: "Diagnosis is successfully added!",
                        type: "success",
                        allowOutsideClick: false
                    });

            hideICD10GroupingManagementModal();
            var textboxidtblcausesadd = causescode + "-" + "1";

            var confinecause_table = $('#causesof-confinement-table').DataTable();
            confinecause_table.row.add
                    ([
                        "",
                        category,
                        icddiag,
                        dohicd,
                        "",
                        category,
                        "DIAGCODE",
                        causescode,
                        textboxidtblcausesadd,
                        "1"
                    ]).order([9, 'asc']).draw(false);

            var causesalldata = category + "|" +
                    icddiag + "|" +
                    dohicd + "|" +
                    "" + "|" +
                    category + "|" +
                    "DIAGCODE" + "|" +
                    causescode + "|" +
                    "1" + "|" +
                    textboxidtblcausesadd;

            textBoxCreateForCauses(causesalldata);
        } else
        {
            var duplicate = 0;

            var confinecause_tablex = $('#causesof-confinement-table').DataTable();

            var rowno = $('#causesof-confinement-table').DataTable().rows().count();
            for (var i = 0; i < rowno; i++)
            {
                var rowanddata = confinecause_tablex.row(i).data();
                if (category === rowanddata[1])
                {
                    duplicate++;
                }
            }

            if (duplicate > 0)
            {
                swal
                        ({
                            title: "Validation Notice!",
                            text: "Diagnosis exists already from confinement table!!",
                            type: "warning",
                            allowOutsideClick: false
                        });
            } else
            {
                hideICD10GroupingManagementModal();

                swal
                        ({
                            title: "Success!",
                            text: "Record is successfully selected!",
                            type: "success",
                            allowOutsideClick: false
                        });

                var sortval = confinecause_tablex.row(":last").data()[9];
                var sortvalplusone = parseInt(sortval) + 1;
                var textboxidtblcausesadd = causescode + "-" + sortvalplusone;

                confinecause_tablex.row.add
                        ([
                            "",
                            category,
                            icddiag,
                            dohicd,
                            "",
                            category,
                            "DIAGCODE",
                            causescode,
                            textboxidtblcausesadd,
                            sortvalplusone
                        ]).order([9, 'asc']).draw(false);

                var causesalldata = category + "|" +
                        icddiag + "|" +
                        dohicd + "|" +
                        "" + "|" +
                        category + "|" +
                        "DIAGCODE" + "|" +
                        causescode + "|" +
                        sortvalplusone + "|" +
                        textboxidtblcausesadd;

                textBoxCreateForCauses(causesalldata);
            }
        }
    } else
    {
        swal
                ({
                    title: "Notification",
                    text: "Select diagnosis first to be added to confinement!",
                    type: "warning"
                });
    }
}


function showDiagwithICD10RVSModal()
{
    $('#searchdiagicd10rvsmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#searchdiagicd10rvsmodal').css('overflow-y', 'scroll');
}

function hideDiagwithICD10RVSModal()
{
    $('#searchdiagicd10rvsmodal').modal("hide");
    $('#admitpatientmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

    $('#admitpatientmodal').css('overflow-y', 'scroll');
    $('body').css('overflow', 'hidden');
}

function getAllDiagnosisWithICD10RVSAndAddItToTable(type)
{
    if (type === "NONE")
    {
        diagicd10rvs_table = $('#diagnosis-withicd10-andrvs-table').DataTable
                ({
                    sScrollY: "150px",
                    sScrollX: "100%",
                    responsive: true,
                    retrieve: true,
                    destroy: true,
                    processing: true,
                    searching: false,
                    data: [],
                    order: [],
                    language:
                            {
                                processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
                            }
                });
    } else
    {
        diagicd10rvs_table = $('#diagnosis-withicd10-andrvs-table').DataTable
                ({
                    sScrollY: "150px",
                    sScrollX: "100%",
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    retrieve: true,
                    destroy: true,
                    searching: true,
                    order: [],
                    language:
                            {
                                processing: "<img src='./assets/images/MGHClearance Images/loading.gif' width='150' height='150'>"
                            },
                    ajax:
                            {
                                url: BASE_URL + 'Admission/DisplayDiagnosisWithICD10RVS',
                                type: 'POST',
                                data: {typex: type}
                            },

                    createdRow: function (row, data, dataIndex)
                    {
                        $('td', row).eq(0).html(dataIndex + 1);
                    },

                    initComplete: function (settings, json)
                    {

                    }
                });

        diagicd10rvs_table.on('click', 'tr', function ()
        {
            var data = diagicd10rvs_table.row(this).data();
            var icdcode = data[2];
            var type = data[8];
            $('#textid_icdrvscodeadm').html(icdcode);
            $('#textid_casetypeadm').html(type);
        });

        diagicd10rvs_table.on('dblclick', 'tr', function ()
        {
            alert("UNDER DEVELOPMENT");
        });
    }
}

function selectICD10RVSDiagnosis()
{
    var data;

    $('#diagnosis-withicd10-andrvs-table tbody').on('click', 'tr', function ()
    {
        $('#diagnosis-withicd10-andrvs-table').dataTable().$('tr.bg-cyan').removeClass('bg-cyan');
        $(this).addClass('bg-cyan');

        var data = $('#diagnosis-withicd10-andrvs-table').DataTable().row('.bg-cyan').data();
        selectedICD10RVSDiagnosis = data;
    });
}

function selectICD10RVSDiagnosisforAdmitPatient()
{
    hideDiagwithICD10RVSModal();

    var diagnosis = selectedICD10RVSDiagnosis[1];
    var icd10 = selectedICD10RVSDiagnosis[2];
    var refno = selectedICD10RVSDiagnosis[13];

    $('#impressionopdadm').val(diagnosis);
    $('#textboxid_icd10adm').val(icd10);
    $('#hiddboxid_phiccaserefnoadm').val(refno);
}

function enableDisableFilterType()
{
    var filtertypehiddentext = $('#hiddenboxid_forfilterontypeadm').val();

    if (filtertypehiddentext === "0")
    {
        $('#hiddenboxid_forfilterontypeadm').val("1");
        $('#selectid_filtertypeadm').prop("disabled", false);
        $('#selectid_filtertypeadm').selectpicker("val", "Select");
        $('#selectid_filtertypeadm').selectpicker("refresh");

        var type = "NONE";
        diagicd10rvs_table = $('#diagnosis-withicd10-andrvs-table').DataTable();
        diagicd10rvs_table.clear().destroy();

        getAllDiagnosisWithICD10RVSAndAddItToTable(type);
    } else
    {
        $('#hiddenboxid_forfilterontypeadm').val("0");
        $('#selectid_filtertypeadm').prop("disabled", true);
        $('#selectid_filtertypeadm').selectpicker("val", "Select");
        $('#selectid_filtertypeadm').selectpicker("refresh");

        var type = "NONE";
        diagicd10rvs_table = $('#diagnosis-withicd10-andrvs-table').DataTable();
        diagicd10rvs_table.clear().destroy();

        getAllDiagnosisWithICD10RVSAndAddItToTable(type);
    }
}


function onchangeFilterType()
{
    var filtertype = $('#selectid_filtertypeadm').val();
    var type;

    if (filtertype === "MEDICAL CASES")
    {
        type = "Medical Cases";
    } else if (filtertype === "PROCEDURES")
    {
        type = "Procedures";
    } else if (filtertype === "SECOND CASES")
    {
        type = "Second Cases";
    } else
    {
        type = "NONE";
    }

    diagicd10rvs_table = $('#diagnosis-withicd10-andrvs-table').DataTable();
    diagicd10rvs_table.clear().destroy();

    getAllDiagnosisWithICD10RVSAndAddItToTable(type);
}


function setToDefaultAllFieldsOfAdmitPatientModal()
{
    $('#inputid_hiddenIDadm').val("");
    $('#inputid_hiddencoman').val("");
    $('#inputid_hiddenhmoin').val("");
    $('#inputid_hiddencause').val("");
    $('#hiddenid_pxfnameupdadm').val("");
    $('#hiddenid_pxmnameupdadm').val("");
    $('#hiddenid_pxlnameupdadm').val("");
    $('#hiddenid_pxsuffxupdadm').val("");
    $('#hiddenid_casenumupdadm').val("");
    $('#hiddenid_pincodeupdadm').val("");
    $('#textid_deleteindicatorforpxpkgupdateadmedt').html("");
    $('#textid_updateindicatorforpxpkgupdateadmedt').html("");
    $('#inputid_comanagedataadm').val("");
    $('#inputid_hmoinsurdataadm').val("");
    $('#inputid_causecondataadm').val("");
    $('#inputid_opdtypexdataadm').val("IPDPX");
    $('#inputid_finalcomanagedataadm').val("");
    $('#inputid_finalcomanagedataupd').val("");
    $('#inputid_finalhmoinsurdataadm').val("");
    $('#inputid_finalhmoinsurdataupd').val("");
    $('#inputid_finalcausecondataadm').val("");
    $('#inputid_finalcausecondataupd').val("");
    $('#inputid_vipsecuritydataadm').val("");
    $('#inputid_packagemanadataadm').val("");
    $('#inputid_pckgpatientdataadm').val("");
    $('#hiddeninputid_casecodexadm').val("");
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
    
    $('#pxindexnoadm').val("");
    $('#healthrecnoadm').val("");
    $('#casenumberadm').val("");
    $('#admixontypeselectadm').selectpicker("val", "Select");
    $('#inputid_vmembershipadm').val("");
    $('#selectid_patienttypeadm').selectpicker("val", "IPD");
    $('#selectid_entrytypeadm').selectpicker("val", "Select");
    $('#selectid_entrytypeadm').prop("disabled", true);
    $('#opdtypebutton').prop("disabled", true);
    $('#stationnameadm').selectpicker("val", "Select");

    $('#lastnameadm').val("");
    $('#firstnameadm').val("");
    $('#suffixadm').val("");
    $('#middlenameadm').val("");
    $('#genderadm').val("");
    $('#nationalityadm').val("");
    $('#inputid_ageadm').val("");
    $('#birthdayadm').val("");

    $('#religionselectadm').selectpicker("val", "Select");
    $('#civilstatusselectadm').selectpicker("val", "Select");

    $('#passportnoadm').val("");
    $('#mobilenoadm').val("");
    $('#contactnoadm').val("");
    $('#emailadm').val("");
    $('#provinceselectadm').selectpicker("val", "Select");
    $('#selectidcitymuniadm').selectpicker("val", "Select");
    $('#zipcodexadm').val("");
    $('#selectid_barangayadm').selectpicker("val", "Select");
    $('#addressadm').val("");
    $('#fatheradm').val("");
    $('#fathernationalityadm').val("");
    $('#fatheradrsadm').val("");
    $('#motheradm').val("");
    $('#mothernationalityadm').val("");
    $('#motheradrsadm').val("");

    $('#watchernameadm').val("");
    $('#watcherbirthadm').val("");
    $('#reltopatientadm').selectpicker("val", "Select");

    $('#guardiannumadm').val("");
    $('#billingrecipientadm').val("");
    $('#patientrecipientadm').val("");
    $('#weightadm').val("");

    $('#cautionsadm').selectpicker("val", "Select");
    $('#inputid_tbdotsstatusadm').selectpicker("val", "Select");
//    $('#linkaccountadm').val("");
    $('#attendingdoctoradm').val("");
    $('#attendingnurseadm').val("");
    $('#nurseinchargeadm').val("");
    $('#selectid_roomadm').val("");
    $('#admissiontypehiddentext').val("");
    $('#selectid_roomadm').val("");
    $('#selectname_roomadmhid').val("");
    $('#inputid_roominfoadm').val("");
    $('#inputid_ancilaryadm').val("");
    $('#inputid_roomrateadm').val("");
    $('#inputid_roomcredadm').val("");
    $('#phmembershipselectadm').val("");
    $('#phmembernameadm').val("");
    $('#inputid_mdfrefnumadm').val("");
    $('#phicnumberadm').val("");
    $('#reltomemberadm').selectpicker("val", "Select");
    $('#patientclassadm').selectpicker("val", "Select");
    $('#inputid_obgyneprocedureadm').selectpicker("val", "Select");
    $('#inputid_adultpediaadm').selectpicker("val", "Select");
    $('#pathologychkboxidadm').prop("checked", false);
    $('#inputid_pathologyadm').val("");
    $('#inputid_othersadm').val("");
    $('#gravidaadm').val("");
    $('#paraadm').val("");
    $('#abortionadm').val("");
    $('#iufdadm').val("");
    $('#diedadm').val("");
    $('#inputid_spousenameadm').val("");
    $('#inputid_spousebirthadm').val("");
    $('#selectid_hospcareinsadm').selectpicker("val", "Select");
    $('#inputid_creditmaxlimitadm').val("");
    $('#packageoverviewadm').val("");
    $('#numboxname_vipscore').val("1");
    $('#admissionreasonadm').val("");
    $('#chckboxid_forminororadm').prop("checked", false);
    $('#textboxid_forminororadm').val("");
    $('#admittingdiagnosisadm').val("");
    $('#dietaryadm').val("");
    $('#impressionopdadm').val("");
    $('#hiddboxid_phiccaserefnoadm').val("");
    $('#textboxid_icd10adm').val("");

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
    $("#textboxid_bpnumeratoradm").val("");
    $("#textboxid_bpdenominatoradm").val("");
    $("#textboxid_bodytemperatureadm").val("");
    $("#textboxid_respiratoryrateadm").val("");
    $("#textboxid_pulserateadm").val("");
    $("#dietaryviewadm").val("");
    $("#dietaryadm").val("");
    $("#impressionopdadm").val("");
    $("#hiddboxid_phiccaserefnoadm").val("");
    $("#textboxid_icd10adm").val("");
    $("#numboxid_vipscore").val("");
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
//    $('#linkaccountadm').val("");
    $('#cautionsadm').selectpicker("val", "Select");
    $('#inputid_tbdotsstatusadm').selectpicker("val", "Select");
    $('#attendingdoctoradm').val("");
    $('#attendingnurseadm').val("");
    $('#nurseinchargeadm').selectpicker("val", "Select");
    $('#radioid_normaltypeadm').prop('checked', true);
    $('#radioid_emergencytypeadm').prop('checked', false);
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
    $('#inputid_obgyneprocedureadm').selectpicker('val', 'Disabled');
    $('#inputid_obgyneprocedureadm').selectpicker('refresh');
    $('#inputid_obgyneprocedureadmerr').html("");

    $('#inputid_adultpediaadm').prop('disabled', true);
    $('#inputid_adultpediaadm').append('<option value="Disabled">' + "N/A" + '</option>');
    $('#inputid_adultpediaadm').selectpicker('val', 'Disabled');
    $('#inputid_adultpediaadm').selectpicker('refresh');
    $('#inputid_adultpediaadmerr').html("");

    if ($('#pathologychkboxidadm').is(':checked'))
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
    $('#chckboxid_forminororadm').prop('checked', false);
    $('#textboxid_forminororadm').val(0);
    $('#admittingdiagnosisadm').val("");
    $('#dietaryadm').val("");
    $('#openpatientimguploadforadmpx').val("");
    
    $('#selectid_oicinchargevipmanagement').selectpicker("val", "Select From List");
    $('#radio_non').prop("checked",true);
    $('#radio_vip').prop("checked",false);
    $('#radio_sec').prop("checked",false);
    $('#txtareaid_remarksvipmanagement').val("");

    $('#remarksviperr').html("");
    $('#oicinchargeviperr').html("");
}

function editSLCode(slrefno)
{
    showAddSLCodeFormForHMOAdmitPatient();

    $('#addslcodesmallheader').addClass("d-none");
    $('#edtslcodesmallheader').removeClass("d-none");

    $('#addslcodebigheader').addClass("d-none");
    $('#edtslcodebigheader').removeClass("d-none");

    $('#savebuttonaddpx').addClass("d-none");
    $('#editbuttonaddpx').removeClass("d-none");

    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "SLCode/getSLAccountDataForEditPatient",
                data: {slrefnox: slrefno},
                dataType: 'json'
            })
            .done(function (data)
            {
                if (data.status)
                {
                    $('#hiddbox_slrefnoadd').val(data.slaccountdata['SLREF']);
                    $('#slcodeadd').val(data.slaccountdata['SLCODE']);
                    $('#coarefnoadd').val(data.slaccountdata['COAREFNO']);
                    $('#sldescriptionadd').val(data.slaccountdata['SLDSCR']);
                    $('#sladdressadd').val(data.slaccountdata['SLADRS']);

                    var slstat = data.slaccountdata['SLSTATUS'];
                    if (slstat === "1")
                    {
                        $('#activeadd').prop("checked", true);
                        $('#hiddbox_activeadd').val("1");
                    } else
                    {
                        $('#activeadd').prop("checked", false);
                        $('#hiddbox_activeadd').val("0");
                    }
                }
            });
}

function deleteSLCode(slrefno)
{
    alert(slrefno);
}


function generateandreturnSLcode()
{
    var SLcode = "";

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

                SLcode = 'SL' + incrementSLCode;
                return SLcode;
            });
}


function editComanageForInsertAdmission(comaalldata)
{
    var comasplit = comaalldata.split("|");

    var managetype = comasplit[0];
    var doctorname = comasplit[1];
    var effectived = comasplit[2];
    var attendingx = comasplit[3];
    var updatedcom = comasplit[4];
    var doctorcode = comasplit[5];
    var textboxidx = comasplit[6];
    var sortingnum = comasplit[7];

    var startofservice = moment(effectived).format("MMMM DD, YYYY");

    showComanageDoctorForm();

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

    $('#hiddenid_doctornamecomanagement').val(doctorname);
    $('#hiddenid_doctorcodecomanagement').val(doctorcode);

    $('#inputid_docmancomanagement').selectpicker('val', doctorname + "-" + doctorcode);
    $('#inputid_docmancomanagement').selectpicker('refresh');
    $('#inputid_typmancomanagement').selectpicker('val', managetype);
    $('#inputid_typmancomanagement').selectpicker('refresh');
    $('#inputid_startcomanagement').val(startofservice);
    $('#hiddentextid_sortingcomanage').val(sortingnum);
    $('#hiddentextid_attendingcomanage').val(attendingx);
    $('#hiddentextid_textboxidcomanage').val(textboxidx);

    $('#addNewComanageDoctorBtnForAdmAdd').addClass('d-none');
    $('#edtOldComanageDoctorBtnForAdmAdd').removeClass('d-none');
    $('#addNewComanageDoctorBtnForAdmEdt').addClass('d-none');
    $('#edtOldComanageDoctorBtnForAdmEdt').addClass('d-none');
}

function edtOldComanageDoctorForAdmAdd()
{
    $("#edtOldComanageDoctorBtnForAdmAdd").prop("disabled",true);
    
    swal
    ({
        title: "Please wait!",
        text: "Processing of data is still ongoing.",
        imageUrl: BASE_URL + "assets/images/loading.gif",
        imageSize: '200x200',
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false
    });

    interval = setInterval(function ()
    {
        if ($('#comanagementform').hasClass('d-none'))
        {
            swal.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);

    var error = 0;
    var duplicate = 0;
    var doctorname = $("#hiddenid_doctornamecomanagement").val();
    var doctorcode = $("#hiddenid_doctorcodecomanagement").val();
    var typeofmana = $("#inputid_typmancomanagement").val();
    var startofser = moment($("#inputid_startcomanagement").val()).format("YYYY-MM-DD");
    var curentdate = $("#hiddentextid_datenow").val();
    var accountnum = $("#accountnumberadm").val();
    var patientype = $("#selectid_patienttypeadm").val();
    var pincodenum = $("#hiddeninputid_pincodeadm").val();
    var casecodeno = $("#hiddentextid_casecodexcomanage").val();

//    $("#hiddentextid_deleteparameterforcomanage").val(patientype + "," + accountnum + "," + pincodenum + "," + doctorcode + "," + typeofmana + "," + startofser + "," + casecodeno);
    var doctrfield = $("#inputid_docmancomanagement").val();
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

    $("#comanagement-masterlist-table tbody tr").each(function ()
    {
        var comanagement_tablex = $('#comanagement-masterlist-table').DataTable();
        var indexx = comanagement_tablex.row($(comatblrowforupdate).parents('tr')).index();
        var selecteddata = comanagement_tablex.row(indexx).data()[2];
        var docname_col = $(this).find("td:nth-child(3)").html();

        if (doctorname === docname_col && selecteddata !== docname_col)
        {
            duplicate++;
            error++;
        }

        if (duplicate > 0)
        {
            $("#docmancomanagementdup").text("Already Exist!");
        } else
        {
            $("#docmancomanagementdup").text("");
        }
    });

    if (error > 0)
    {
        $("#edtOldComanageDoctorBtnForAdmAdd").prop("disabled",true);
        
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
        $('#comanagementform').addClass('d-none');
        $('#comanagetablediv').removeClass('d-none');
        $('#comanagereturnbtn').removeClass('d-none');
        $('#comanagebuttondiv').removeClass('d-none');

        var attending = $('#hiddentextid_attendingcomanage').val();
        var sorting = $('#hiddentextid_sortingcomanage').val();
        var textboxidtblhmo = doctorcode + "-" + sorting;

        swal
        ({
            title: "Success!",
            text: "Record is successfully submitted!",
            type: "success",
            allowOutsideClick: false
        });
                
        $("#edtOldComanageDoctorBtnForAdmAdd").prop("disabled",false);

        var comanagement_table = $('#comanagement-masterlist-table').DataTable();
        var index = comanagement_table.row($(comatblrowforupdate).parents('tr')).index();

        var effectivedate = moment(startofser).format("MMMM DD, YYYY");
        comanagement_table.row(index).data
                ([
                    "<button class='btn btn-sm btn-warning waves-effect btn-com-adm-add-update' title='Edit'><i class='zmdi zmdi-edit'></i></button>\n\
            <button class='btn btn-sm btn-danger waves-effect btn-com-adm-add-delete' title='Delete'><i class='zmdi zmdi-delete'></i></button>",
                    typeofmana,
                    doctorname,
                    effectivedate,
                    attending,
                    curentdate,
                    doctorcode,
                    textboxidtblhmo,
                    sorting
                ]).order([8, 'asc']).draw();


        $('.docname_comanage' + sorting).val(doctorname);
        $('.doccode_comanage' + sorting).val(doctorcode);
        $('.typeman_comanage' + sorting).val(typeofmana);
        $('.startco_comanage' + sorting).val(startofser);
    }
    
}


/**
 * Show modal for printing admission sheets
 * @version 2020-27-2
 * @author AB Empeynado
 */
function showPrintAdmittedPatientModal(caseno)
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
                data: {casenumber: caseno},
                dataType: 'json'
            })
            .done(function (data)
            {
                $("#inputid_hiddencasenogenerate").val(data.getcaseno['caseno']);
            });

    $('body').css('overflow', 'hidden');
    $('#diagnosticdatamodal').css('overflow-y', 'scroll');

    $('#buttonid_indirectcancelbutton').addClass("d-none");
    $('#buttonid_directcancelbutton').removeClass("d-none");
}

function hideDiagnosticDataModalForDirectPrint()
{
    $('#diagnosticdatamodal').modal("hide");
    $('body').css('overflow', 'auto');
    $("#normalanchorid").tab('show');
}

function validatecomanageandattendingtable()
{
    var doccode = $("#inputid_docmancomanagement").val();
    var doccodesplit = doccode.split("-");
    var doctorname = doccodesplit[0];
    var doctorcode = doccodesplit[1];

    var attendingdoc = $("#attendingdoctoradm").val();
    var attendingdocsplit = attendingdoc.split(" - ");
    var attendingdocrefno = attendingdocsplit[1];
    
    var duplicatecomanage = 0;
    $("#comanagement-masterlist-table tbody tr").each(function ()
    {
        var docname_col = $(this).find("td:nth-child(3)").html();

        if (doctorname === docname_col)
        {
            $("#docmancomanagementdupcomdoc").removeClass("d-none");
            $("#docmancomanagementdupcomdoc").html("Already Exist as Co-Manage Doctor!");
            $("#inputid_docmancomanagement").selectpicker("val", "Select");
            $("#inputid_docmancomanagement").selectpicker("refresh");
        }
        else
        {
            $("#docmancomanagementdupcomdoc").addClass("d-none");
            $("#docmancomanagementdupcomdoc").html("");
        }
    });
   
    if (doctorcode === attendingdocrefno && attendingdoc !== "")
    {
        $("#docmancomanagementdupadmdoc").removeClass("d-none");
        $("#docmancomanagementdupadmdoc").html("Already Exist as Attending Doctor!");
        $("#inputid_docmancomanagement").selectpicker("val", "Select");
        $("#inputid_docmancomanagement").selectpicker("refresh");
    }
    else
    {
        $("#docmancomanagementdupadmdoc").addClass("d-none");
        $("#docmancomanagementdupadmdoc").html("");
    }
}


function doubleclickPHICMemberNameTextbox()
{
    var lname = $('#lastnameadm').val();
    var fname = $('#firstnameadm').val();
    var suffx = $('#suffixadm').val();
    var mname = $('#middlenameadm').val();

    var fullname = lname + ", " + fname + " " + mname + " " + suffx;
    $('#phmembernameadm').val(fullname);

    $('#reltomemberadm').prop("disabled", true);
    $('#reltomemberadm').selectpicker("val", "Select");
    $('#reltomemberadm').selectpicker("refresh");
}

function onchangePHICType()
{
    var phictype = $("#phmembershipselectadm").val();

    if
            (
                    phictype === "GOVERNMENT DEPENDENT:GDE" ||
                    phictype === "PRIVATE DEPENDENT:PDE" ||
                    phictype === "SELF-EMPLOYED DEPENDENT:SDI" ||
                    phictype === "OFW DEPENDENT:OFD" ||
                    phictype === "OTHERS DEPENDENT:OTD" ||
                    phictype === "INDIGENT DEPENDENT:IDI" ||
                    phictype === "LGU/PVT SPONSORED DEPENDENT:LGD" ||
                    phictype === "PENSIONER/RETIREE DEPENDENT:PRD"
                    )
    {
        $('#phmembernameadm').val("");
        $('#phmembernameadm').prop("disabled", false);
        $('#reltomemberadm').prop("disabled", false);
        $('#reltomemberadm').selectpicker("val", "Select");
        $('#reltomemberadm').selectpicker("refresh");
        $('#inputid_mdfrefnumadm').val("");
        $('#inputid_mdfrefnumadm').prop("disabled", false);
        $('#phicnumberadm').val("");
        $('#phicnumberadm').prop("disabled", false);
    } else if (phictype === "NON-NHIP:NHP" || phictype === "Select")
    {
        $('#phmembernameadm').val("");
        $('#phmembernameadm').prop("disabled", true);
        $('#reltomemberadm').prop("disabled", true);
        $('#reltomemberadm').selectpicker("val", "Select");
        $('#reltomemberadm').selectpicker("refresh");
        $('#inputid_mdfrefnumadm').val("");
        $('#inputid_mdfrefnumadm').prop("disabled", true);
        $('#phicnumberadm').val("");
        $('#phicnumberadm').prop("disabled", true);
    } else
    {
        $('#phmembernameadm').val("");
        $('#phmembernameadm').prop("disabled", false);
        $('#reltomemberadm').prop("disabled", true);
        $('#reltomemberadm').selectpicker("val", "Select");
        $('#reltomemberadm').selectpicker("refresh");
        $('#inputid_mdfrefnumadm').val("");
        $('#inputid_mdfrefnumadm').prop("disabled", false);
        $('#phicnumberadm').val("");
        $('#phicnumberadm').prop("disabled", false);
    }
}


function importAdmissionTypeForAdmitPatient()
{
    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getAdmissionTypeForAdmission",
                dataType: 'json'
            })
            .done(function (data)
            {
                $('#admixontypeselectadm').empty();
                $('#admixontypeselectadm').append('<option value="Select">' + "Select From List" + '</option>');
                for (var cv = 0; cv < data.length; cv++)
                {
                    $('#admixontypeselectadm').append('<option value="' + data[cv]['pxadmittypecode'] + '">' + data[cv]['pxadmittypecode'] + "-" + data[cv]['pxadmittype'] + '</option>');
                }
                $('#admixontypeselectadm').selectpicker('refresh');
            });
}

function editMembership(id)
{
    alert("Under Development!");
}

function deleteMembership(id)
{
    alert("Under Development!");
}

function myIP()
{
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET","http://api.hostip.info/get_html.php",false);
    xmlhttp.send();

    hostipInfo = xmlhttp.responseText.split("\n");

    for (i=0; hostipInfo.length >= i; i++) 
    {
        ipAddress = hostipInfo[i].split(":");
        if ( ipAddress[0] == "IP" ) return ipAddress[1];
    }

    return false;
}

function randomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showRxInstructionAdmittedPatientModal(caseno)
{
    alert("Under Development!");
}

function showICD10AddDiagnosisForm()
{
    alert("Under Development!");
}

function deleteICD10Diagnosis(diagid)
{
    alert("Under Development!");
}

function editICD10Diagnosis(diagid)
{
    alert("Under Development!");
}