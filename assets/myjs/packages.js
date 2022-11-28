var selectedPackageformanager;
var selectedPackagxformanager;
var selectedPatientformanager;
var selectedDoctorsformanager;
var package_table_formanager = null;
var packagx_table_formanager = null;
var patient_table_formanager = null;
var doctorx_table_formanager = null;

$(function () 
{
    tabsHighlightForPackages();
    getAllPackagesDataAndAddItToTheTable();
    getAllPatientsDataAndAddItToTheTable();
    getAllPackagexDataAndAddItToTheTable();
    getAllDoctorsxDataAndAddItToTheTable();
});

function getAllPackagesDataAndAddItToTheTable()
{
    package_table_formanager = $('#package-management-table').DataTable
    ({
        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        ajax:
                {
                    url: BASE_URL + 'Packages/DisplayPackages',
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

function showAddPackagesModalForManager()
{
    $('#addpackagesmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    generatePackageAcctno();
    
    $('body').css('overflow', 'hidden');
    
    $('#savebutton').removeClass('d-none');
    $('#updatebutton').addClass('d-none');

    $('.adddoctor_title').removeClass('d-none');
    $('.edtdoctor_title').addClass('d-none');
    
    $('.nav-tabs a[href="#profiletabpackage"]').tab('show');
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

function hideAddPackagesModalForManager()
{
    $('#addpackagesmodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function showSearchDoctorsModalForPackage()
{
    $('#docmasterlistmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#addpackagesmodal').modal("hide");
    $('#docmasterlistmodal').css('overflow-y', 'scroll');
    
    doctorx_table_formanager.on('dblclick', 'tr', function ()
    {
        var data =  doctorx_table_formanager.row(this).data();
        var doclname = data[1];
        var docfname = data[2];
        var doctitle = data[3];
        var docrefno = data[21];
        var docdatax = doclname + ", " + docfname + " " + doctitle;

        $("#packagedoctor").val(docdatax.toUpperCase());
        $("#docrefno").val(docrefno.toUpperCase());
        
        hideSearchDoctorsModalForPackage();
    });
    
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
            selectedDoctorsformanager = data;
        }
    });
}

function hideSearchDoctorsModalForPackage()
{
    $('#docmasterlistmodal').modal("hide");   

    $('#addpackagesmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    }); 
}

function getAllDoctorsxDataAndAddItToTheTable()
{
    doctorx_table_formanager = $('#docmasterlist-forpackage-table').DataTable
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

        },

        initComplete: function (settings, json) {

        }

    });
}

function selectDoctorsForPackageManagement()
{
    var doclname = selectedDoctorsformanager[1];
    var docfname = selectedDoctorsformanager[2];
    var doctitle = selectedDoctorsformanager[3];
    var docrefno = selectedDoctorsformanager[21];
    var docdatax = doclname + ", " + docfname + " " + doctitle;

    $("#packagedoctor").val(docdatax.toUpperCase());
    $("#docrefno").val(docrefno.toUpperCase());

    hideSearchDoctorsModalForPackage();
}

function getAllPackagexDataAndAddItToTheTable()
{
    packagx_table_formanager = $('#package-masterlist-table').DataTable
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
    
    $('#addpackagesmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#packagemasterlistmodal').css('overflow-y', 'scroll'); 
    
    packagx_table_formanager.on('dblclick', 'tr', function ()
    {
        var data =  packagx_table_formanager.row(this).data();
        var packagecode = data[1];
        var packagecost = data[4];
        var packrefcode = data[11];

        $("#packagecode").val(packagecode.toUpperCase());
        $("#packageprice").val(packagecost.toUpperCase());
        $("#packagerefcode").val(packrefcode.toUpperCase());
        
        hideSearchPackageCodeModalForPackage();
    });
    
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
            selectedPackagxformanager = data;
        }
    });
}

function selectPackageForPackageManagement()
{
    var packagecode = selectedPackagxformanager[1];
    var packagecost = selectedPackagxformanager[4];
    var packrefcode = selectedPackagxformanager[11];

    $("#packagecode").val(packagecode.toUpperCase());
    $("#packageprice").val(packagecost.toUpperCase());
    $("#packagerefcode").val(packrefcode.toUpperCase());

    hideSearchPackageCodeModalForPackage();
}

function hideSearchPackageCodeModalForPackage()
{
    $('#packagemasterlistmodal').modal("hide");   

    $('#addpackagesmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    }); 
}

function getAllPatientsDataAndAddItToTheTable()
{
    patient_table_formanager = $('#allpatient-forpackage-table').DataTable
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
                    url: BASE_URL + 'Packages/GetAllPatientForPackage',
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

function showPatientMasterlistForPackageModal() 
{
    $('#pxmasterlistforpackage').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#addpackagesmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#pxmasterlistforpackage').css('overflow-y', 'scroll'); 
    
    $('#addpxfor_manager').removeClass('d-none');
    $('#addpxfor_package').addClass('d-none');
    $('#addpxfor_valcard').addClass('d-none');
    
    $('#pxmasterlistreturnbtn_formanager').removeClass('d-none');
    $('#pxmasterlistreturnbtn_forpackage').addClass('d-none');

    patient_table_formanager.on('dblclick', 'tr', function ()
    {
        var data =  patient_table_formanager.row(this).data();
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
        $("#suffix").val(patiensuffx.toUpperCase());
        $("#pin").val(patientspin.toUpperCase());
        $("#address").val(patientadrs.toUpperCase());
        $("#cityadrs").val(patientcity.toUpperCase());
        $("#pincode").val(patientpncd.toUpperCase());
        $("#slcode").val(patientslno.toUpperCase());
        $("#packagepatientname").val(patientname.toUpperCase());
        $('#packagesex').selectpicker('val', patientgend.toUpperCase());
        $("#packagecontactinfo").val(patientmobi.toUpperCase());
        $("#packagereligion").val(patientreli.toUpperCase());
        
        var packagebirthday = $("#packagebirthday").val(patientbirt);
        var birthdate = new Date(packagebirthday.val());
        var todaydate = new Date();
        var age = Math.floor((todaydate - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
        $('#packageage').val(age);
        
        hidePatientMasterlistForManagerModal();
    });
    
    var data;

    patient_table_formanager.on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        } 
        else
        {
            patient_table_formanager.$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = patient_table_formanager.row('.bg-blue').data();
            selectedPatientformanager = data;
        }
    });
}

function selectPatientForPackageManagement()
{
    var patienlname = selectedPatientformanager[1];
    var patienmname = selectedPatientformanager[2];
    var patienfname = selectedPatientformanager[3];
    var patiensuffx = selectedPatientformanager[4];
    var patientname = selectedPatientformanager[5];
    var patientspin = selectedPatientformanager[6];
    var patientbirt = selectedPatientformanager[8];
    var patientgend = selectedPatientformanager[9];
    var patientreli = selectedPatientformanager[11];
    var patientmobi = selectedPatientformanager[12];
    var patientadrs = selectedPatientformanager[14];
    var patientcity = selectedPatientformanager[15];
    var patientpncd = selectedPatientformanager[16];
    var patientslno = selectedPatientformanager[17];

    $("#lname").val(patienlname.toUpperCase());
    $("#fname").val(patienfname.toUpperCase());
    $("#mname").val(patienmname.toUpperCase());
    $("#suffix").val(patiensuffx.toUpperCase());
    $("#pin").val(patientspin.toUpperCase());
    $("#address").val(patientadrs.toUpperCase());
    $("#cityadrs").val(patientcity.toUpperCase());
    $("#pincode").val(patientpncd.toUpperCase());
    $("#slcode").val(patientslno.toUpperCase());
    $("#packagepatientname").val(patientname.toUpperCase());
    $('#packagesex').selectpicker('val', patientgend.toUpperCase());
    $("#packagecontactinfo").val(patientmobi.toUpperCase());
    $("#packagereligion").val(patientreli.toUpperCase());

    var packagebirthday = $("#packagebirthday").val(patientbirt);
    var birthdate = new Date(packagebirthday.val());
    var todaydate = new Date();
    var age = Math.floor((todaydate - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
    $('#packageage').val(age);

    hidePatientMasterlistForManagerModal();
}

function hidePatientMasterlistForManagerModal()
{
    $('#pxmasterlistforpackage').modal("hide");   

    $('#addpackagesmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function tabsHighlightForPackages()
{
    $("#managesidetab").addClass("active");
    $('#manageanchor').click();
    $("#packaliid").css("font-weight","bold");
}

function insertNewPackage()
{
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
    var suffix = $('#suffix').val();
    var address = $('#address').val();
    var cityadrs = $('#cityadrs').val();
    var pin = $('#pin').val();
    var slcode = $('#slcode').val();
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
        
        url: BASE_URL + 'Packages/AddPackage',
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
                hideAddPackagesModalForManager();
                clearerrors();
                
                swal
                ({
                    title: "Success!",
                    text: "Record is successfully saved!",
                    type: "success",
                    allowOutsideClick: false
                }, 
                function () 
                {
                    package_table_formanager.ajax.reload();
                    $('#package-management-table_filter [type="search"]').val(packagepatientname);
                    $('#package-management-table_filter [type="search"]').focus();
                    package_table_formanager.search(packagepatientname).draw();
                });
            }
        }
    });
}

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
        $('#addpackagesmodal').modal
        ({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
        
        clearerrors();

        $('#savebutton').addClass('d-none');
        $('#updatebutton').removeClass('d-none');
        
        $('.adddoctor_title').addClass('d-none');
        $('.edtdoctor_title').removeClass('d-none');

        $('.nav-tabs a[href="#profiletabpackage"]').tab('show');

        $('#refno').val(refno);
        $('#acctno').val(result[0].acctno);
        $('#refcode').val(result[0].refcode);
        $('#lname').val(result[0].lname);
        $('#fname').val(result[0].fname);
        $('#mname').val(result[0].mname);
        $('#suffix').val(result[0].suffix);
        $('#address').val(result[0].address);
        $('#cityadrs').val(result[0].cityadrs);
        $('#pin').val(result[0].pin);
        $('#slcode').val(result[0].slcode);
        $('#pincode').val(result[0].pincode);
        $('#docreferdate').val(result[0].docreferdate);
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

function updatePackage() 
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
    var suffix = $('#suffix').val();
    var address = $('#address').val();
    var cityadrs = $('#cityadrs').val();
    var pin = $('#pin').val();
    var slcode = $('#slcode').val();
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
                packagereferredbyx: packagereferredby, 
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
                    hideAddPackagesModalForManager();
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
                        package_table_formanager.ajax.reload();
                        $('#package-management-table_filter [type="search"]').val(packagepatientname);
                        $('#package-management-table_filter [type="search"]').focus();
                        package_table_formanager.search(packagepatientname).draw();
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
        confirmButtonText: "Yes, delete it!",
    },
    function () 
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
                }, 
                function () 
                {
                    package_table_formanager.ajax.reload();
                });
            }

        });
    });
}

