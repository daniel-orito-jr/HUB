var selectedPackage;
var selectedPackagx;
var selectedPatient;
var selectedDoctors;
var package_table = null;
var packagx_table = null;
var patient_table = null;
var doctorx_table = null;

$(function () 
{
    getAllPackagesDataAndAddItToTheTable();
    getAllPatientsDataAndAddItToTheTable();
    getAllPackagexDataAndAddItToTheTable();
    getAllDoctorsxDataAndAddItToTheTable();
    selectPackage();
    selectPatienx();
    selectPackagx();
    selectDoctorx();
});

function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

function showSearchDoctorsModalForPackage()
{
    $('#docmasterlistmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#packagemanagementmodal').modal("hide");
    $('#docmasterlistmodal').css('overflow-y', 'scroll');
    
    doctorx_table.on('dblclick', 'tr', function ()
    {
        var data =  doctorx_table.row(this).data();
        var doclname = data[1];
        var docfname = data[2];
        var doctitle = data[3];
        var docrefno = data[21];
        var docdatax = doclname + ", " + docfname + " " + doctitle;

        $("#packagedoctor").val(docdatax.toUpperCase());
        $("#docrefno").val(docrefno.toUpperCase());
        
        hideSearchDoctorsModalForPackage();
    });
}

function hideSearchDoctorsModalForPackage()
{
    $('#docmasterlistmodal').modal("hide");   

    $('#packagemanagementmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    }); 
}

function getAllDoctorsxDataAndAddItToTheTable()
{
    doctorx_table = $('#docmasterlist-forpackage-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        ajax: {

            url: BASE_URL + 'Packages/GetAllDoctors',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) {
            $('td', row).eq(0).html(dataIndex + 1);
        },

        initComplete: function (settings, json) {

        }

    });
}

function selectDoctorx()
{
    var data;

    $('#docmasterlist-forpackage-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } 
        else
        {
            $('#docmasterlist-forpackage-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#docmasterlist-forpackage-table').DataTable().row('.bg-blue').data();
            selectedDoctors = data;
        }
    });
}

function selectDoctorsForPackageManagement()
{
    var doclname = selectedDoctors[1];
    var docfname = selectedDoctors[2];
    var doctitle = selectedDoctors[3];
    var docrefno = selectedDoctors[21];
    var docdatax = doclname + ", " + docfname + " " + doctitle;

    $("#packagedoctor").val(docdatax.toUpperCase());
    $("#docrefno").val(docrefno.toUpperCase());

    hideSearchDoctorsModalForPackage();
}

function getAllPackagexDataAndAddItToTheTable()
{
    packagx_table = $('#package-masterlist-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        ajax: {

            url: BASE_URL + 'PackageMasterlist/GetAllPackages',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }

    });
}

function showSearchPackageCodeModalForPackage()
{    
    $('#packagemasterlistmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#packagemanagementmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#packagemasterlistmodal').css('overflow-y', 'scroll'); 
    
    packagx_table.on('dblclick', 'tr', function ()
    {
        var data =  packagx_table.row(this).data();
        var packagecode = data[1];
        var packagecost = data[4];
        var packrefcode = data[11];

        $("#packagecode").val(packagecode.toUpperCase());
        $("#packageprice").val(packagecost.toUpperCase());
        $("#packagerefcode").val(packrefcode.toUpperCase());
        
        hideSearchPackageCodeModalForPackage();
    });
}

function selectPackagx()
{
    var data;

    $('#package-masterlist-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } 
        else
        {
            $('#package-masterlist-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#package-masterlist-table').DataTable().row('.bg-blue').data();
            selectedPackagx = data;
        }
    });
}

function selectPackageForPackageManagement()
{
    var packagecode = selectedPackagx[1];
    var packagecost = selectedPackagx[4];
    var packrefcode = selectedPackagx[11];

    $("#packagecode").val(packagecode.toUpperCase());
    $("#packageprice").val(packagecost.toUpperCase());
    $("#packagerefcode").val(packrefcode.toUpperCase());

    hideSearchPackageCodeModalForPackage();
}

function hideSearchPackageCodeModalForPackage()
{
    $('#packagemasterlistmodal').modal("hide");   

    $('#packagemanagementmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    }); 
}

function getAllPatientsDataAndAddItToTheTable()
{
    patient_table = $('#allpatient-forpackage-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
//        dom: 'frtip',
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        ajax:
                {
                    url: BASE_URL + 'Admission/GetAllPatientForPackage',
                    type: 'POST'
                },

        createdRow: function (row, data, dataIndex)
        {
            $('td', row).eq(0).html(dataIndex + 1);
        },

        initComplete: function (settings, json)
        {

        }

    });
}

function showPatientMasterlistForPackageModal() 
{
    $('#pxmasterlistforpackage').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('#packagemanagementmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#pxmasterlistforpackage').css('overflow-y', 'scroll');
    
    var memberlastname = $("#lastnameadm").val();
    var memberfrstname = $("#firstnameadm").val();
    var memberfullname = memberlastname + ", " + memberfrstname;

    patient_table.ajax.reload();
    $('#allpatient-forpackage-table_filter [type="search"]').val(memberfullname);
    $('#allpatient-forpackage-table_filter [type="search"]').focus();
    patient_table.search(memberfullname).draw();
    
    $('#addpxfor_package').removeClass('d-none');
    $('#addpxfor_valcard').addClass('d-none');
    
    patient_table.on('dblclick', 'tr', function ()
    {
        var data =  patient_table.row(this).data();
        var patienlname = data[1];
        var patienmname = data[2];
        var patienfname = data[3];
        var patiensuffx = data[4];
        var patientname = data[5];
        var patientspin = data[6];
        var patientbirt = data[8];
        var patientgend = data[9];
        var patientreli = data[11];
        var patientmobi = data[12];
        var patientadrs = data[14];
        var patientcity = data[15];
        var patientpncd = data[16];
        var patientslno = data[17];

        $("#lname").val(patienlname.toUpperCase());
        $("#fname").val(patienfname.toUpperCase());
        $("#mname").val(patienmname.toUpperCase());
        $("#suffixpkg").val(patiensuffx.toUpperCase());
        $("#pin").val(patientspin.toUpperCase());
        $("#addresspkg").val(patientadrs.toUpperCase());
        $("#cityadrs").val(patientcity.toUpperCase());
        $("#pincode").val(patientpncd.toUpperCase());
        $("#slcodepkg").val(patientslno.toUpperCase());
        $("#packagepatientname").val(patientname.toUpperCase());
        $('#packagesex').selectpicker('val', patientgend.toUpperCase());
        $("#packagecontactinfo").val(patientmobi.toUpperCase());
        $("#packagereligion").val(patientreli.toUpperCase());
        
        var packagebirthday = $("#packagebirthday").val(patientbirt);
        var birthdate = new Date(packagebirthday.val());
        var todaydate = new Date();
        var age = Math.floor((todaydate - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
        $('#packageage').val(age);
        
        hidePatientMasterlistForPackageModal();
    });
}

function selectPatienx()
{
    var data;

    $('#allpatient-forpackage-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } 
        else
        {
            $('#allpatient-forpackage-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#allpatient-forpackage-table').DataTable().row('.bg-blue').data();
            selectedPatient = data;
        }
    });
}

function selectPatientForPackageManagement()
{
    var patienlname = selectedPatient[1];
    var patienmname = selectedPatient[2];
    var patienfname = selectedPatient[3];
    var patiensuffx = selectedPatient[4];
    var patientname = selectedPatient[5];
    var patientspin = selectedPatient[6];
    var patientbirt = selectedPatient[8];
    var patientgend = selectedPatient[9];
    var patientreli = selectedPatient[11];
    var patientmobi = selectedPatient[12];
    var patientadrs = selectedPatient[14];
    var patientcity = selectedPatient[15];
    var patientpncd = selectedPatient[16];
    var patientslno = selectedPatient[17];

    $("#lname").val(patienlname.toUpperCase());
    $("#fname").val(patienfname.toUpperCase());
    $("#mname").val(patienmname.toUpperCase());
    $("#suffixpkg").val(patiensuffx.toUpperCase());
    $("#pin").val(patientspin.toUpperCase());
    $("#addresspkg").val(patientadrs.toUpperCase());
    $("#cityadrs").val(patientcity.toUpperCase());
    $("#pincode").val(patientpncd.toUpperCase());
    $("#slcodepkg").val(patientslno.toUpperCase());
    $("#packagepatientname").val(patientname.toUpperCase());
    $('#packagesex').selectpicker('val', patientgend.toUpperCase());
    $("#packagecontactinfo").val(patientmobi.toUpperCase());
    $("#packagereligion").val(patientreli.toUpperCase());

    var packagebirthday = $("#packagebirthday").val(patientbirt);
    var birthdate = new Date(packagebirthday.val());
    var todaydate = new Date();
    var age = Math.floor((todaydate - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
    $('#packageage').val(age);

    hidePatientMasterlistForPackageModal();
}

function hidePatientMasterlistForPackageModal() 
{
    $('#pxmasterlistforpackage').modal("hide");   

    $('#packagemanagementmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    }); 
}

function addPatientPackage() 
{
    $('#addpackagebuttonid').prop("disabled",true);
    
    var error = 0;
    
    var addpxpackageloader = swal
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
        if (error !== 0 || $('#addpatientpackagediv').hasClass('d-none'))
        {
            addpxpackageloader.close();

            setTimeout(function ()
            {
                clearInterval(interval);
            });
        }
    }, 5000);
    
    var packagepatientname = $('#packagepatientname').val();
    var packagecontactinfo = $('#packagecontactinfo').val();
    var packagesex = $('#packagesex').val();
    var packagereligion = $('#packagereligion').val();
    var packageorientedby = $('#packageorientedby').val();
    var packageenrollmentdate = $('#packageenrollmentdate').val();
    var packagedocumentrefno = $('#packagedocumentrefno').val();
    var packagecode = $('#packagecode').val();
    var packageprice = $('#packageprice').val();
    var packagereferredby = $('#packagereferredby').val();
    var packagedoctor = $('#packagedoctor').val();
    var packageremarks = $('#packageremarks').val();
    var accountname = $('#accountname').val();
    var accountid = $('#accountid').val();
    var packageage = $('#packageage').val();
    var packagebirthday = $('#packagebirthday').val();
    var lname = $('#lname').val();
    var mname = $('#mname').val();
    var fname = $('#fname').val();
    var suffix = $('#suffixpkg').val();
    var address = $('#addresspkg').val();
    var cityadrs = $('#cityadrs').val();
    var pin = $('#pin').val();
    var slcode = $('#slcodepkg').val();
    var pincode = $('#pincode').val();
    var packagerefcode = $('#packagerefcode').val();
    var docrefno = $('#docrefno').val();
    var acctno = $("#acctno").val();
    var refcode = $("#refcode").val();
    
    $.ajax({

        type: 'POST',
        data: {
            acctnox: acctno,
            refcodex: refcode,
            lnamex: lname,
            mnamex: mname,
            fnamex: fname,
            suffixx: suffix,
            addressx: address,
            cityadrsx: cityadrs,
            pinx: pin,
            slcodex: slcode,
            pincodex: pincode,
            packagerefcodex: packagerefcode,
            docrefnox: docrefno,
            packagepatientnamex: packagepatientname,
            packagecontactinfox: packagecontactinfo, 
            packagebirthdayx: packagebirthday,
            packageagex: packageage,
            packagesexx: packagesex,
            packagereligionx: packagereligion,
            packageorientedbyx: packageorientedby,
            packageenrollmentdatex: packageenrollmentdate,
            packagedocumentrefnox: packagedocumentrefno,
            packagecodex: packagecode,
            packagepricex: packageprice,
            packagereferredbyx: packagereferredby,
            packagedoctorx: packagedoctor,
            packageremarksx: packageremarks,
            accountnamex: accountname,
            accountidx: accountid
        },

        url: BASE_URL + 'Packages/AddPackage2',
        dataType: 'json',
        success: function (result)
        {
            if (result.status == false) 
            {
                $('#addpackagebuttonid').prop("disabled",false);
                
                error++;
                var profiletab = 0;
                var accounttab = 0;
                
                //------------account section---------
                if(result.errors.packagedocumentrefno !== "")
                {
                    accounttab++;
                }
                
                if(result.errors.packagecode !== "")
                {
                    accounttab++;
                    $('#spanid_packagecodename').css('border-color','red');
                }
                else
                {
                    $('#spanid_packagecodename').css('border','');
                    $('#spanid_packagecodename').css('height','38px');
                }
                
                if(result.errors.packageprice !== "")
                {
                    accounttab++;
                }
                
                if(result.errors.packagereferredby !== "")
                {
                    accounttab++;
                }
                
                if(result.errors.packagedoctor !== "")
                {
                    accounttab++;
                    $('#spanid_packagedoctorname').css('border-color','red');
                }
                else
                {
                    $('#spanid_packagedoctorname').css('border','');
                    $('#spanid_packagedoctorname').css('height','38px');
                }
                
                if(result.errors.packageremarks !== "")
                {
                    accounttab++;
                }
                
                if(accounttab > 0)
                {
                    $('#accounttaberrorpkg').html("*");
                    $('#accounttabidpkg').tab('show');
                }
                else
                {
                    $('#accounttaberrorpkg').html("");
                }
                
                //------------profile section---------
                if(result.errors.packagepatientname !== "")
                {
                    profiletab++;
                    $('#spanid_packagepatientname').css('border-color','red');
                }
                else
                {
                    $('#spanid_packagepatientname').css('border','');
                    $('#spanid_packagepatientname').css('height','38px');
                }
                
                if(result.errors.packagecontactinfo !== "")
                {
                    profiletab++;
                }
                
                if(result.errors.packagebirthday !== "")
                {
                    profiletab++;
                }
                
                if(result.errors.packageage !== "")
                {
                    profiletab++;
                }
                
                if(result.errors.packagereligion !== "")
                {
                    profiletab++;
                }
                
                if(result.errors.packageorientedby !== "")
                {
                    profiletab++;
                }
                
                if(result.errors.packageenrollmentdate !== "")
                {
                    profiletab++;
                }
                
                if(profiletab > 0)
                {
                    $('#profiletaberrorpkg').html("*");
                    $('#profiletabidpkg').tab('show');
                }
                else
                {
                    $('#profiletaberrorpkg').html("");
                }
                
                checkFieldValidations(result.errors.packagepatientname, 'packagepatientnameerror', 'packagepatientname');
                checkFieldValidations(result.errors.packagecontactinfo, 'packagecontactinfoerror', 'packagecontactinfo');
                checkFieldValidations(result.errors.packagebirthday, 'packagebirthdayerror', 'packagebirthday');
                checkFieldValidations(result.errors.packageage, 'packageageerror', 'packageage');
                checkFieldValidations(result.errors.packagereligion, 'packagereligionerror', 'packagereligion');
                checkFieldValidations(result.errors.packageorientedby, 'packageorientedbyerror', 'packageorientedby');
                checkFieldValidations(result.errors.packageenrollmentdate, 'packageenrollmentdateerror', 'packageenrollmentdate');
                checkFieldValidations(result.errors.packagedocumentrefno, 'packagedocumentrefnoerror', 'packagedocumentrefno');
                checkFieldValidations(result.errors.packagecode, 'packagecodeerror', 'packagecode');
                checkFieldValidations(result.errors.packageprice, 'packagepriceerror', 'packageprice');
                checkFieldValidations(result.errors.packagereferredby, 'packagereferredbyerror', 'packagereferredby');
                checkFieldValidations(result.errors.packagedoctor, 'packagedoctorerror', 'packagedoctor');
                checkFieldValidations(result.errors.packageremarks, 'packageremarkserror', 'packageremarks');
                
                swal
                ({
                    title: "WARNING!",
                    text: "Some field requires your attention!",
                    type: "warning",
                    allowOutsideClick: false
                });
            
            } 
            else
            {
                $('#addpackagebuttonid').prop("disabled",true);
                
                hideAddPackageFormForAmitPatient();
                
                setTimeout(function ()
                {
                    $.ajax
                    ({
                        type: 'POST',
                        url: BASE_URL + "Packages/getPackageDataForCheckDuplicateAcctnoOfPackageForm",
                        data: {acctnox: acctno},
                        dataType: 'json'
                    })
                    .done(function (data)
                    {
                        if (data.status)
                        {
                            swal
                            ({
                                title: "Duplicate Notice!",
                                text: "The submitted Package Account No. " + acctno + ", already exists!\nPackage Account No. Field will be refreshed!",
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
                                    var packageacctno = result[0].acctno;

                                    var convertAcctnoToInt = parseInt(packageacctno);
                                    var incrementAcctno = convertAcctnoToInt + 1;

                                    $('#acctno').val(incrementAcctno);
                                });

                                setTimeout(function () 
                                {
                                    var newpckgacctno = $('#acctno').val();
                                    hidePackageManagementModalForAdmitPatient();
                                    clearerrors();

                                    swal
                                    ({
                                        title: "Success",
                                        text: "Package Account No. is successfully refreshed!\nNew Package Account No. value is " + newpckgacctno,
                                        type: "success",
                                        confirmButtonText: "OK"
                                    }, 
                                    function () 
                                    {
                                        var packagealldata = packagerefcode + "|" +
                                                             docrefno + "|" +
                                                             packageorientedby + "|" +
                                                             packageenrollmentdate + "|" +
                                                             packagedocumentrefno + "|" +
                                                             packagecode + "|" + 
                                                             packageprice + "|" +
                                                             packagereferredby + "|" +
                                                             packagedoctor + "|" + 
                                                             packageremarks + "|" +
                                                             refcode;

                                        var pckgepxalldata = packagepatientname + "|" +
                                                             packagecontactinfo + "|" +
                                                             packagesex + "|" + 
                                                             packagereligion + "|" +
                                                             packageage + "|" +
                                                             packagebirthday + "|" +
                                                             lname + "|" + mname + "|" +
                                                             fname + "|" + suffix + "|" +
                                                             address + "|" + cityadrs + "|" +
                                                             pin + "|" + slcode + "|" + pincode;

                                        $('#inputid_packagemanadataadm').val(packagealldata);
                                        $('#inputid_pckgpatientdataadm').val(pckgepxalldata);
                                        $('#packageoverviewadm').val(packagecode);
                                        $('#packageacctnoadm').val(newpckgacctno);
                                        
                                        $('#addpackagebuttonid').prop("disabled",false);
                                    });
                                }, 2000);
                            });
                        }
                        else
                        {
                            hidePackageManagementModalForAdmitPatient();
                            clearerrors();

                            swal
                            ({
                                title: "Success!",
                                text: "Record is successfully submitted!",
                                type: "success",
                                allowOutsideClick: false
                            }, 
                            function () 
                            {
                                var packagealldata = packagerefcode + "|" +
                                                     docrefno + "|" +
                                                     packageorientedby + "|" +
                                                     packageenrollmentdate + "|" +
                                                     packagedocumentrefno + "|" +
                                                     packagecode + "|" + 
                                                     packageprice + "|" +
                                                     packagereferredby + "|" +
                                                     packagedoctor + "|" + 
                                                     packageremarks + "|" +
                                                     refcode;

                                var pckgepxalldata = packagepatientname + "|" +
                                                     packagecontactinfo + "|" +
                                                     packagesex + "|" + 
                                                     packagereligion + "|" +
                                                     packageage + "|" +
                                                     packagebirthday + "|" +
                                                     lname + "|" + mname + "|" +
                                                     fname + "|" + suffix + "|" +
                                                     address + "|" + cityadrs + "|" +
                                                     pin + "|" + slcode + "|" + pincode;

                                $('#inputid_packagemanadataadm').val(packagealldata);
                                $('#inputid_pckgpatientdataadm').val(pckgepxalldata);
                                $('#packageoverviewadm').val(packagecode);
                                $('#packageacctnoadm').val(acctno);
                                
                                $('#addpackagebuttonid').prop("disabled",false);
                            });
                        }
                    });
                }, 1000);
            }
        }
    });
}

function generatePackageAcctno()
{
    $.ajax
    ({
        type: 'POST',
        dataType: 'json',
        url: BASE_URL + 'Packages/GeneratePackageCode'
    })

    .done(function (result)
    {
        var packageacctno = result[0].acctno;

        var convertAcctnoToInt = parseInt(packageacctno);
        var incrementAcctno = convertAcctnoToInt + 1;

        $('#acctno').val(incrementAcctno);
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

function clearerrors()
{
    $('#packagepatientname').css('border-color', '');
    $('#packagecontactinfo').css('border-color', '');
    $('#packagebirthday').css('border-color', '');
    $('#packageage').css('border-color', '');
    $('#packagereligion').css('border-color', '');
    $('#packageorientedby').css('border-color', '');
    $('#packageenrollmentdate').css('border-color', '');
    $('#packagedocumentrefno').css('border-color', '');
    $('#packagecode').css('border-color', '');
    $('#packageprice').css('border-color', '');
    $('#packagereferredby').css('border-color', '');
    $('#packagedoctor').css('border-color', '');
    $('#packageremarks').css('border-color', '');
    
    $('#packagepatientname').val('');
    $('#packagesex').selectpicker('val', 'MALE');
    $('#packagecontactinfo').val('');
    $('#packagebirthday').val('');
    $('#packageage').val('');
    $('#packagereligion').val('');
    $('#packageorientedby').val('');
    $('#packagedocumentrefno').val('');
    $('#packagecode').val('');
    $('#packageprice').val('');
    $('#packagereferredby').val('');
    $('#packagedoctor').val('');
    $('#packageremarks').val('');
    
    $('#lname').val('');
    $('#fname').val('');
    $('#mname').val('');
    $('#suffixpkg').val('');
    $('#addresspkg').val('');
    $('#cityadrs').val('');
    $('#pin').val('');
    $('#slcodepkg').val('');
    $('#pincode').val('');
    $('#packagerefcode').val('');
    $('#docrefno').val('');

    $('#packagepatientnameerror').attr('hidden', true);
    $('#packagecontactinfoerror').attr('hidden', true);
    $('#packagebirthdayerror').attr('hidden', true);
    $('#packageageerror').attr('hidden', true);
    $('#packagereligionerror').attr('hidden', true);
    $('#packageorientedbyerror').attr('hidden', true);
    $('#packageenrollmentdateerror').attr('hidden', true);
    $('#packagedocumentrefnoerror').attr('hidden', true);
    $('#packagecodeerror').attr('hidden', true);
    $('#packagepriceerror').attr('hidden', true);
    $('#packagereferredbyerror').attr('hidden', true);
    $('#packagedoctorerror').attr('hidden', true);
    $('#packageremarkserror').attr('hidden', true);
    
    $('#profiletabidpkg').tab("show");
    $('#profiletaberrorpkg').html("");
    $('#accounttaberrorpkg').html("");
    
    $('#spanid_packagepatientname').css('border','');
    $('#spanid_packagedoctorname').css('border','');
    $('#spanid_packagecodename').css('border','');
}


function showPackageManagementModalForAdmitPatient()
{
    $('#packagemanagementmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
   
    generatePackageAcctno();
    
    $("#addpatientpackagediv").addClass('d-none');
    $("#packagetableandbuttondiv").removeClass('d-none');
    $("#packagereturnbuttondiv").removeClass('d-none');

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#packagemanagementmodal').css('overflow-y', 'scroll'); 
    
    var deletepackageindicator = $('#textid_deleteindicatorforpxpkgupdateadmedt').val();
    if(deletepackageindicator === "")
    {
        $('#submitdeletepackage').removeClass('d-none');
        $('#canceldeletepackage').addClass('d-none');
        
        var memberlastname = $("#lastnameadm").val();
        var memberfrstname = $("#firstnameadm").val();
        var memberfullname = memberlastname + ", " + memberfrstname;

        package_table.ajax.reload();
        $('#package-management-table_filter [type="search"]').val(memberfullname);
        $('#package-management-table_filter [type="search"]').focus();
        package_table.search(memberfullname).draw();
    }
    else
    {
        $('#submitdeletepackage').addClass('d-none');
        $('#canceldeletepackage').removeClass('d-none');
    }

    package_table.on('dblclick', 'tr', function ()
    {
        var data = package_table.row(this).data();
        var packagecodex = data[1];
        var pckgeacctnox = data[3];
        
        $.ajax
        ({
            type: 'POST',
            data: {pckgeacctno: pckgeacctnox},
            url: BASE_URL + 'Packages/SearchSelectedPackage',
            dataType: 'json'
        })
        .done(function (result) 
        {
            var packagerefcode          = result[0].packagerefcode;
            var docrefno                = result[0].docrefno;
            var packageorientedby       = result[0].incharge;
            var packageenrollmentdate   = result[0].enrolldate;
            var packagedocumentrefno    = result[0].docreferenceno;
            var packagecode             = result[0].packagecode;
            var packageprice            = result[0].packageprice;
            var packagereferredby       = result[0].referedby;
            var packagedoctor           = result[0].docname;
            var packageremarks          = result[0].notes;
            var refcode                 = result[0].refcode;

            var packagealldata = packagerefcode + "|" +
                                 docrefno + "|" +
                                 packageorientedby + "|" +
                                 packageenrollmentdate + "|" +
                                 packagedocumentrefno + "|" +
                                 packagecode + "|" + 
                                 packageprice + "|" +
                                 packagereferredby + "|" +
                                 packagedoctor + "|" + 
                                 packageremarks + "|" +
                                 refcode;;
                            
            var packagepatientname      = result[0].patientname;
            var packagecontactinfo      = result[0].contactnumber;
            var packagesex              = result[0].sex;
            var packagereligion         = result[0].religion;
            var packageage              = result[0].ageuponenrollment;
            var packagebirthday         = result[0].bday;
            var lname                   = result[0].lname;
            var mname                   = result[0].mname;
            var fname                   = result[0].fname;
            var suffix                  = result[0].suffix;
            var address                 = result[0].address;
            var cityadrs                = result[0].cityadrs;
            var pin                     = result[0].pin;
            var slcode                  = result[0].slcode;
            var pincode                 = result[0].pincode;
            
            var pckgepxalldata = packagepatientname + "|" +
                                 packagecontactinfo + "|" +
                                 packagesex + "|" + 
                                 packagereligion + "|" +
                                 packageage + "|" +
                                 packagebirthday + "|" +
                                 lname + "|" + mname + "|" +
                                 fname + "|" + suffix + "|" +
                                 address + "|" + cityadrs + "|" +
                                 pin + "|" + slcode + "|" + pincode;

            $('#inputid_packagemanadataadm').val(packagealldata);
            $('#inputid_pckgpatientdataadm').val(pckgepxalldata);
            $('#packageoverviewadm').val(packagecodex);
            $('#packageacctnoadm').val(pckgeacctnox);
        });

        hidePackageManagementModalForAdmitPatient();
    });
}

function hidePackageManagementModalForAdmitPatient()
{
    $('#packagemanagementmodal').modal("hide");   

    $('#admitpatientmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    }); 
}

function getAllPackagesDataAndAddItToTheTable()
{
    package_table = $('#package-management-table').DataTable
    ({
        sScrollY: "200px",
        sScrollX: "100%",
//        dom: 'frtip',
        responsive: true,
        processing: true,
        serverSide: true,
        searching: true,
        order: [],
        ajax:
                {
                    url: BASE_URL + 'Admission/DisplayPackages',
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

function showAddPackageFormForAmitPatient()
{
    clearerrors();
    
    $("#addpatientpackagediv").removeClass('d-none');
    $("#packagetableandbuttondiv").addClass('d-none');
    $("#packagereturnbuttondiv").addClass('d-none');
    
    $("#addpackagebuttonid").removeClass('d-none');
    $("#edtpackagebuttonid").addClass('d-none');
}

function hideAddPackageFormForAmitPatient()
{
    clearerrors();
    
    $("#addpatientpackagediv").addClass('d-none');
    $("#packagetableandbuttondiv").removeClass('d-none');
    $("#packagereturnbuttondiv").removeClass('d-none');
}


function selectPackage()
{
    var data;

    $('#package-management-table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } 
        else
        {
            $('#package-management-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#package-management-table').DataTable().row('.bg-blue').data();
            selectedPackage = data;
        }
    });
}

function selectPackageForAdmitPatient()
{
    var packagedata = selectedPackage[1];
    $('#packageoverviewadm').val(packagedata);
    hidePackageManagementModalForAdmitPatient();
}


function editPackage(refno)
{
    $.ajax
    ({
        type: 'POST',
        data: {refno: refno},
        url: BASE_URL + 'Packages/SearchSelectedDoctors',
        dataType: 'json'
    })
    .done(function (result) 
    {
        $('#packagemanagementmodal').modal
        ({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

        $("#addpatientpackagediv").removeClass('d-none');
        $("#packagetableandbuttondiv").addClass('d-none');
        $("#packagereturnbuttondiv").addClass('d-none');

        $('#admitpatientmodal').modal("hide");
        $('body').css('overflow', 'hidden');
        $('#packagemanagementmodal').css('overflow-y', 'scroll');   
        
        clearerrors();

        $('#addpackagebuttonid').addClass('d-none');
        $('#edtpackagebuttonid').removeClass('d-none');
        

        $('.nav-tabs a[href="#profiletabpackage"]').tab('show');

        $('#refno').val(refno);
        $('#acctno').val(result[0].acctno);
        $('#refcode').val(result[0].refcode);
        $('#lname').val(result[0].lname);
        $('#fname').val(result[0].fname);
        $('#mname').val(result[0].mname);
        $('#suffixpkg').val(result[0].suffix);
        $('#addresspkg').val(result[0].address);
        $('#cityadrs').val(result[0].cityadrs);
        $('#pin').val(result[0].pin);
        $('#slcodepkg').val(result[0].slcode);
        $('#pincode').val(result[0].pincode);
        $('#docreferdate').val(result[0].docreferencedate);
        $('#packagerefcode').val(result[0].packagerefcode);
        $('#docrefno').val(result[0].docrefno);
        $('#packagepatientname').val(result[0].patientname);
        $('#packagecontactinfo').val(result[0].contactnumber);
        $('#packagebirthday').val(result[0].bday);
        $('#packageage').val(result[0].ageuponenrollment);
        $('#packagesex').selectpicker('val', result[0].sex);
        $('#packagereligion').val(result[0].religion);
        $('#packageorientedby').val(result[0].incharge);
        $('#packageenrollmentdate').val(result[0].enrolldate);
        $('#packagedocumentrefno').val(result[0].docreferenceno);
        $('#packagecode').val(result[0].packagecode);
        $('#packageprice').val(result[0].packageprice);
        $('#packagereferredby').val(result[0].referedby);
        $('#packagedoctor').val(result[0].docname);
        $('#packageremarks').val(result[0].notes);
    });
}

function updatePatientPackage() 
{
    var refno = $('#refno').val();
    var packagepatientname = $('#packagepatientname').val();
    var packagecontactinfo = $('#packagecontactinfo').val();
    var packagesex = $('#packagesex').val();
    var packagereligion = $('#packagereligion').val();
    var packageorientedby = $('#packageorientedby').val();
    var packageenrollmentdate = $('#packageenrollmentdate').val();
    var packagedocumentrefno = $('#packagedocumentrefno').val();
    var packagecode = $('#packagecode').val();
    var packageprice = $('#packageprice').val();
    var packagereferredby = $('#packagereferredby').val();
    var packagedoctor = $('#packagedoctor').val();
    var packageremarks = $('#packageremarks').val();
    var accountname = $('#accountname').val();
    var accountid = $('#accountid').val();
    var packageage = $('#packageage').val();
    var packagebirthday = $('#packagebirthday').val();
    var lname = $('#lname').val();
    var mname = $('#mname').val();
    var fname = $('#fname').val();
    var suffix = $('#suffixpkg').val();
    var address = $('#addresspkg').val();
    var cityadrs = $('#cityadrs').val();
    var pin = $('#pin').val();
    var slcode = $('#slcodepkg').val();
    var pincode = $('#pincode').val();
    var packagerefcode = $('#packagerefcode').val();
    var docrefno = $('#docrefno').val();
    var acctno = $("#acctno").val();
    var refcode = $("#refcode").val();

    swal
    ({
        title: "Are you sure?",
        text: "Data will be change and you will not be able to recover it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
    }, 
    function () 
    {
        $.ajax
        ({
            type: 'POST',
            data: 
            {
                refnox: refno,
                packagecontactinfox: packagecontactinfo,
                packagedoctorx: packagedoctor,
                packageremarksx: packageremarks,
                accountnamex: accountname, 
                accountidx: accountid,
                packageagex: packageage, 
                packagebirthdayx: packagebirthday, 
                lnamex: lname,
                mnamex: mname,
                fnamex: fname, 
                suffixx: suffix,
                addressx: address,
                cityadrsx: cityadrs, 
                pinx: pin,
                slcodex: slcode, 
                pincodex: pincode, 
                packagerefcodex: packagerefcode,
                docrefnox: docrefno,
                acctnox: acctno,
                refcodex: refcode,
                packagepatientnamex: packagepatientname,
                packagesexx: packagesex, 
                packagereligionx: packagereligion,
                packageorientedbyx: packageorientedby,
                packageenrollmentdatex: packageenrollmentdate, 
                packagedocumentrefnox: packagedocumentrefno, 
                packagecodex: packagecode,
                packagepricex: packageprice, 
                packagereferredbyx: packagereferredby
            },
            url: BASE_URL + 'Packages/UpdatePackage',
            dataType: 'json',
            
            success: function (result) 
            {
                if (result.status == false) 
                {
                    checkFieldValidations(result.errors.packagepatientname, 'packagepatientnameerror', 'packagepatientname');
                    checkFieldValidations(result.errors.packagecontactinfo, 'packagecontactinfoerror', 'packagecontactinfo');
                    checkFieldValidations(result.errors.packagebirthday, 'packagebirthdayerror', 'packagebirthday');
                    checkFieldValidations(result.errors.packageage, 'packageageerror', 'packageage');
                    checkFieldValidations(result.errors.packagereligion, 'packagereligionerror', 'packagereligion');
                    checkFieldValidations(result.errors.packageorientedby, 'packageorientedbyerror', 'packageorientedby');
                    checkFieldValidations(result.errors.packageenrollmentdate, 'packageenrollmentdateerror', 'packageenrollmentdate');
                    checkFieldValidations(result.errors.packagedocumentrefno, 'packagedocumentrefnoerror', 'packagedocumentrefno');
                    checkFieldValidations(result.errors.packagecode, 'packagecodeerror', 'packagecode');
                    checkFieldValidations(result.errors.packageprice, 'packagepriceerror', 'packageprice');
                    checkFieldValidations(result.errors.packagereferredby, 'packagereferredbyerror', 'packagereferredby');
                    checkFieldValidations(result.errors.packagedoctor, 'packagedoctorerror', 'packagedoctor');
                    checkFieldValidations(result.errors.packageremarks, 'packageremarkserror', 'packageremarks');
                } 
                else 
                {
                    hideAddPackageFormForAmitPatient();
                    clearerrors();

                    swal
                    ({
                        title: "Success!",
                        text: "Record is successfully updated!",
                        type: "success",
                        allowOutsideClick: false
                    }, 
                    function () 
                    {
                        package_table.ajax.reload();
                        $('#package-management-table_filter [type="search"]').val(packagepatientname);
                        $('#package-management-table_filter [type="search"]').focus();
                        package_table.search(packagepatientname).draw();
                    });
                }

            }
        });
    });

}

function deletePackage(refno) 
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
                data: {refno: refno},
                url: BASE_URL + 'Packages/DeletePackage',
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
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $('#package-management-table').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
}

function edtPatientPackage()
{
    var error = 0;
    
    var packagepatientname = $('#packagepatientname').val();
    var packagecontactinfo = $('#packagecontactinfo').val();
    var packagesex = $('#packagesex').val();
    var packagereligion = $('#packagereligion').val();
    var packageorientedby = $('#packageorientedby').val();
    var packageenrollmentdate = $('#packageenrollmentdate').val();
    var packagedocumentrefno = $('#packagedocumentrefno').val();
    var packagecode = $('#packagecode').val();
    var packageprice = $('#packageprice').val();
    var packagereferredby = $('#packagereferredby').val();
    var packagedoctor = $('#packagedoctor').val();
    var packageremarks = $('#packageremarks').val();
    var accountname = $('#accountname').val();
    var accountid = $('#accountid').val();
    var packageage = $('#packageage').val();
    var packagebirthday = $('#packagebirthday').val();
    var lname = $('#lname').val();
    var mname = $('#mname').val();
    var fname = $('#fname').val();
    var suffix = $('#suffixpkg').val();
    var address = $('#addresspkg').val();
    var cityadrs = $('#cityadrs').val();
    var pin = $('#pin').val();
    var slcode = $('#slcodepkg').val();
    var pincode = $('#pincode').val();
    var packagerefcode = $('#packagerefcode').val();
    var docrefno = $('#docrefno').val();
    var acctno = $("#acctno").val();
    var refcode = $("#refcode").val();
    
    $("#textid_updateindicatorforpxpkgupdateadmedt").val("EDT");
    $("#textid_deleteindicatorforpxpkgupdateadmedt").val("");
        
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
            $('#edtpackagebuttonid').prop("disabled",true);
            
            var updatepcpackageloader = swal
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
                if (error !== 0 || $('#addpatientpackagediv').hasClass('d-none'))
                {
                    updatepcpackageloader.close();

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
                    refnox: acctno,
                    refcodex: refcode,
                    lnamex: lname,
                    mnamex: mname,
                    fnamex: fname,
                    suffixx: suffix,
                    addressx: address,
                    cityadrsx: cityadrs,
                    pinx: pin,
                    slcodex: slcode,
                    pincodex: pincode,
                    packagerefcodex: packagerefcode,
                    docrefnox: docrefno,
                    packagepatientnamex: packagepatientname,
                    packagecontactinfox: packagecontactinfo, 
                    packagebirthdayx: packagebirthday,
                    packageagex: packageage,
                    packagesexx: packagesex,
                    packagereligionx: packagereligion,
                    packageorientedbyx: packageorientedby,
                    packageenrollmentdatex: packageenrollmentdate,
                    packagedocumentrefnox: packagedocumentrefno,
                    packagecodex: packagecode,
                    packagepricex: packageprice,
                    packagereferredbyx: packagereferredby,
                    packagedoctorx: packagedoctor,
                    packageremarksx: packageremarks,
                    accountnamex: accountname,
                    accountidx: accountid
                },

                url: BASE_URL + 'Packages/UpdatePackage',
                dataType: 'json',
                success: function (result)
                {
                    if (result.status == false) 
                    {
                        $('#edtpackagebuttonid').prop("disabled",false);

                        error++;
                        var profiletab = 0;
                        var accounttab = 0;

                        //------------account section---------
                        if(result.errors.packagedocumentrefno !== "")
                        {
                            accounttab++;
                        }

                        if(result.errors.packagecode !== "")
                        {
                            accounttab++;
                            $('#spanid_packagecodename').css('border-color','red');
                        }
                        else
                        {
                            $('#spanid_packagecodename').css('border','');
                            $('#spanid_packagecodename').css('height','38px');
                        }

                        if(result.errors.packageprice !== "")
                        {
                            accounttab++;
                        }

                        if(result.errors.packagereferredby !== "")
                        {
                            accounttab++;
                        }

                        if(result.errors.packagedoctor !== "")
                        {
                            accounttab++;
                            $('#spanid_packagedoctorname').css('border-color','red');
                        }
                        else
                        {
                            $('#spanid_packagedoctorname').css('border','');
                            $('#spanid_packagedoctorname').css('height','38px');
                        }

                        if(result.errors.packageremarks !== "")
                        {
                            accounttab++;
                        }

                        if(accounttab > 0)
                        {
                            $('#accounttaberrorpkg').html("*");
                            $('#accounttabidpkg').tab('show');
                        }
                        else
                        {
                            $('#accounttaberrorpkg').html("");
                        }

                        //------------profile section---------
                        if(result.errors.packagepatientname !== "")
                        {
                            profiletab++;
                            $('#spanid_packagepatientname').css('border-color','red');
                        }
                        else
                        {
                            $('#spanid_packagepatientname').css('border','');
                            $('#spanid_packagepatientname').css('height','38px');
                        }

                        if(result.errors.packagecontactinfo !== "")
                        {
                            profiletab++;
                        }

                        if(result.errors.packagebirthday !== "")
                        {
                            profiletab++;
                        }

                        if(result.errors.packageage !== "")
                        {
                            profiletab++;
                        }

                        if(result.errors.packagereligion !== "")
                        {
                            profiletab++;
                        }

                        if(result.errors.packageorientedby !== "")
                        {
                            profiletab++;
                        }

                        if(result.errors.packageenrollmentdate !== "")
                        {
                            profiletab++;
                        }

                        if(profiletab > 0)
                        {
                            $('#profiletaberrorpkg').html("*");
                            $('#profiletabidpkg').tab('show');
                        }
                        else
                        {
                            $('#profiletaberrorpkg').html("");
                        }

                        checkFieldValidations(result.errors.packagepatientname, 'packagepatientnameerror', 'packagepatientname');
                        checkFieldValidations(result.errors.packagecontactinfo, 'packagecontactinfoerror', 'packagecontactinfo');
                        checkFieldValidations(result.errors.packagebirthday, 'packagebirthdayerror', 'packagebirthday');
                        checkFieldValidations(result.errors.packageage, 'packageageerror', 'packageage');
                        checkFieldValidations(result.errors.packagereligion, 'packagereligionerror', 'packagereligion');
                        checkFieldValidations(result.errors.packageorientedby, 'packageorientedbyerror', 'packageorientedby');
                        checkFieldValidations(result.errors.packageenrollmentdate, 'packageenrollmentdateerror', 'packageenrollmentdate');
                        checkFieldValidations(result.errors.packagedocumentrefno, 'packagedocumentrefnoerror', 'packagedocumentrefno');
                        checkFieldValidations(result.errors.packagecode, 'packagecodeerror', 'packagecode');
                        checkFieldValidations(result.errors.packageprice, 'packagepriceerror', 'packageprice');
                        checkFieldValidations(result.errors.packagereferredby, 'packagereferredbyerror', 'packagereferredby');
                        checkFieldValidations(result.errors.packagedoctor, 'packagedoctorerror', 'packagedoctor');
                        checkFieldValidations(result.errors.packageremarks, 'packageremarkserror', 'packageremarks');
                    
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
                        $('#edtpackagebuttonid').prop("disabled",true);
                        hideAddPackageFormForAmitPatient();
                        
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
                                    package_table.ajax.reload();
                                    $('#package-management-table_filter [type="search"]').val(acctno);
                                    $('#package-management-table_filter [type="search"]').focus();
                                    package_table.search(acctno).draw();

                                    $('#edtpackagebuttonid').prop("disabled",false);
                                    clearerrors();
                                }
                            });
                        }, 1000);
                    }
                }
            });
        }   
    });
}

function canceldeletePackage(pckgeacctnox)
{
    swal
    ({
        title: "Are you sure?",
        text: "You want to cancel requested deletion of record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed!",
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
                text: "Record deletion is successfully canceled!",
                type: "success",
                allowOutsideClick: false
            });
            $('#submitdeletepackage').removeClass('d-none');
            $('#canceldeletepackage').addClass('d-none');
            $('#textid_deleteindicatorforpxpkgupdateadmedt').val("");

            $.ajax
            ({
                type: 'POST',
                data: {pckgeacctno: pckgeacctnox},
                url: BASE_URL + 'Packages/SearchSelectedPackage',
                dataType: 'json'
            })
            .done(function (result) 
            {
                var packagerefcode          = result[0].packagerefcode;
                var docrefno                = result[0].docrefno;
                var packageorientedby       = result[0].incharge;
                var packageenrollmentdate   = result[0].enrolldate;
                var packagedocumentrefno    = result[0].docreferenceno;
                var packagecode             = result[0].packagecode;
                var packageprice            = result[0].packageprice;
                var packagereferredby       = result[0].referedby;
                var packagedoctor           = result[0].docname;
                var packageremarks          = result[0].notes;
                var refcode                 = result[0].refcode;

                var packagealldata = packagerefcode + "|" +
                                     docrefno + "|" +
                                     packageorientedby + "|" +
                                     packageenrollmentdate + "|" +
                                     packagedocumentrefno + "|" +
                                     packagecode + "|" + 
                                     packageprice + "|" +
                                     packagereferredby + "|" +
                                     packagedoctor + "|" + 
                                     packageremarks + "|" +
                                     refcode;;

                var packagepatientname      = result[0].patientname;
                var packagecontactinfo      = result[0].contactnumber;
                var packagesex              = result[0].sex;
                var packagereligion         = result[0].religion;
                var packageage              = result[0].ageuponenrollment;
                var packagebirthday         = result[0].bday;
                var lname                   = result[0].lname;
                var mname                   = result[0].mname;
                var fname                   = result[0].fname;
                var suffix                  = result[0].suffix;
                var address                 = result[0].address;
                var cityadrs                = result[0].cityadrs;
                var pin                     = result[0].pin;
                var slcode                  = result[0].slcode;
                var pincode                 = result[0].pincode;

                var pckgepxalldata = packagepatientname + "|" +
                                     packagecontactinfo + "|" +
                                     packagesex + "|" + 
                                     packagereligion + "|" +
                                     packageage + "|" +
                                     packagebirthday + "|" +
                                     lname + "|" + mname + "|" +
                                     fname + "|" + suffix + "|" +
                                     address + "|" + cityadrs + "|" +
                                     pin + "|" + slcode + "|" + pincode;

                $('#inputid_packagemanadataadm').val(packagealldata);
                $('#inputid_pckgpatientdataadm').val(pckgepxalldata);
                $('#packageoverviewadm').val(packagecode);
                $('#packageacctnoadm').val(pckgeacctnox);
            });
        }
        else
        {
            swal("Error", "Error in saving. Please try again!", "error");
        }
    });  
}

function showAddPackageMasterlistForm()
{
    $('#addpackagemasterlist').removeClass('d-none');
    $('#packagemasterlisttbldiv').addClass('d-none');
    $('#packagemasterlistfooterbtndiv').addClass('d-none');
    
    $('#addpackagemasterlistbutton').removeClass('d-none');
    $('#updatepackagemasterlistbutton').addClass('d-none');

}

function hideAddPackageMasterlistForm()
{
    $('#addpackagemasterlist').addClass('d-none');
    $('#packagemasterlisttbldiv').removeClass('d-none');
    $('#packagemasterlistfooterbtndiv').removeClass('d-none');
    
    clearAllPackageFormFields();
}


