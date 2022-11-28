var surgical_table = null;
var finaldiag_table = null;
var diagnosis_table = null;
var hcilisting_table = null;
var admittedpx_table = null;
var referreason_table = null;
var confinecause_table = null;
var ceasariancase_table = null;
var sterilization_table = null;
var finaldiagnose_table = null;
var procedurecases_table = null;
var ceasarianindication_table = null;
var causeconcreateboxindicator = false;
var indicconcreateboxindicator = false;
var finalconcreateboxindicator = false;
var counterfortblecategfinaldiagmgh = 1;
var counterfortextcategfinaldiagmgh = 1;
var counterfortblecausesadmedt = 1;
var counterfortextcausesadmedt = 1;
var counterfortblepxgeneralacct = 1;
var counterfortblepxchargesacct = 1;
var counterfortblepxreturnsacct = 1;
var counterfortblepxpaymentacct = 1;
var counterfortblepxothersxacct = 1;
var counterfortbleindicationcauses = 1;
var counterfortextindicationcauses = 1;
var counterfortbledischargediagmgh = 1;
var selectedDiagnosis;
var selectedCaesarianIndicationDiagnosis;
var selectedFinalDiagnosisForMGHClearanceForm;
var selectedCausesOfConfinementForMGHClearanceForm;
var selectedCommonReferralReasonForMGHClearanceForm;
var selectedDiagnosisOfFinalDiagForMGHClearanceForm;
var selectedHealthCareInstitutionForMGHClearanceForm;
var selectedSterilizationProcedureForMGHClearanceForm;
var selectedSurgicalOutputProcedureForMGHClearanceForm;
var selectedCaesarianIndicationDiagnosisForMGHClearanceForm;
var previouslyselectednursestation = "";

$(function () 
{
    $('#inputid_admitdatemgh').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    }); 

    $('#inputid_admittimemgh').bootstrapMaterialDatePicker
    ({
        date: false,
        format: 'HH:mm:ss',
        switchOnClick : true,
        shortTime: true
    });
    
    $('#inputid_expireddatemgh').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    }); 

    $('#inputid_expiredtimemgh').bootstrapMaterialDatePicker
    ({
        date: false,
        format: 'HH:mm:ss',
        switchOnClick : true,
        shortTime: true
    });
    
    var nursestation = "";
    
    tabsHighlightForEmergency();
    getcausesofconfinement();
    getAllAdmittedPatientAndAddItToTheTable(nursestation);
    getCeasarianCaseIndicationDiagnosis();
    getCategorizedFinalDiagnosis();
    getDischargeMedicalProcedureCases();
    getPatientAccount();
    getCeasarianIndicationDiagnosisList();
    getAllDiagnosisAndAddItToTheTable();
    getAllFinalDiagnosisAndAddItToTheTable();
    getAllSterilizationProcedureAndAddItToTheTable();
    getAllSurgicalOutputProcedureAndAddItToTheTable();
    getAllHealthCareInstitutionAndAddItToTheTable();
    getAllReasonForReferralAndAddItToTheTable();
    selectInPatient();
    selectDiagnosis();
    selectFinalDiagnosis();
    selectSurgicalOutput();
    selectCommonReferralReason();
    selectDiagnosisForFinalDiag();
    selectHealthCareInstitution();
    selectSterilizationProcedure();
    selectCaesarianIndicationDiagnosis();
    selectCausesOfConfinementOfMGHFormPage();
    selectCaesarianIndicationDiagnosisOfMGHFormPage();
    disableMGHClearanceTabsContents();
});

function tabsHighlightForEmergency()
{
    $("#mghclearancesidetab").addClass("active");
}

function disableMGHClearanceTabsContents()
{
    $('#tabcontentdiv').fadeTo('slow',.6);
    $('#newdivadded').addClass('disabledivcontent');
    $('#selectid_pxclassmgh').prop('disabled',true);
    $('#selectid_pxclassmgh').selectpicker('refresh');
}

function getcausesofconfinement() 
{
    confinecause_table = $('#causesof-confinement-table').DataTable
    ({
        sScrollY: "150px",
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

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }
    });
    
    confinecause_table.columns([1,2,3,5,6]).visible(false);
}

function getAllAdmittedPatientAndAddItToTheTable(nursestation)
{
    admittedpx_table = $('#admitted-patients-masterlist-table').DataTable
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
            url: BASE_URL + 'MGHclearance/GetAllAdmittedPatients',
            type: 'POST',
            data: {nursestationx: nursestation},
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

function filterInpatientTableViaNurseStation()
{
    var nursestationselect = $('#selectid_nursestationmgh').val();
    var selectednursestation;
    
    if(nursestationselect === "3A STATION")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
    
        selectednursestation = "3A Station";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
    else if(nursestationselect === "3B STATION")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
        
        selectednursestation = "3B Station";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
    else if(nursestationselect === "4A STATION")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
        
        selectednursestation = "4A Station";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
    else if(nursestationselect === "4B STATION")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
        
        selectednursestation = "4B Station";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
    else if(nursestationselect === "ER")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
        
        selectednursestation = "ER";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
    else if(nursestationselect === "ICU")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
        
        selectednursestation = "ICU";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
    else if(nursestationselect === "NICU")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
        
        selectednursestation = "NICU";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
    else if(nursestationselect === "OR/DR")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
        
        selectednursestation = "OR/DR";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
    else if(nursestationselect === "PICU")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
        
        selectednursestation = "PICU";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
    else
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        $('#chckboxid_forvwopdpatientmgh').prop('checked',false);
        
        selectednursestation = "";
        previouslyselectednursestation = selectednursestation;
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
}

function onchangeViewAlsoOPDCheckbox()
{
    var selectednursestation;
    
    var opdindicator = $('#hiddenboxid_forvwopdpatientmgh').val();
    if(opdindicator === "1")
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("0");
        
        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(previouslyselectednursestation);
    }
    else
    {
        $('#hiddenboxid_forvwopdpatientmgh').val("1");

        selectednursestation = "OPD";

        admittedpx_table = $('#admitted-patients-masterlist-table').DataTable();
        admittedpx_table.clear().destroy();
        getAllAdmittedPatientAndAddItToTheTable(selectednursestation);
    }
}

function showInpatientMasterlistForMGHClearance()
{
    $('#admitted-patients-masterlist-table').DataTable().ajax.reload();
    
    $('#inpatientlistformghclearance').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('body').css('overflow', 'hidden');
    
    causeconcreateboxindicator = false;
    indicconcreateboxindicator = false;
    finalconcreateboxindicator = false;

    admittedpx_table.on('dblclick', 'tr', function ()
    {
        var data = admittedpx_table.row(this).data();
        var caseno = data[2];
        var status = data[4];

        if(status === "CLEARED")
        {
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
                data: {casenox: caseno},
                dataType: 'json'
            })
            .done(function (data)
            {
                $('#clearPatientButton').prop('disabled',true);
                $('#revokepatientbutton').removeClass('d-none');

                if (data.status)
                {
                    var clearedby = data.inpatientlistdata['clearedby'];
                    var cleareddt = data.inpatientlistdata['clearedtd'];
                    var cleardate = moment(cleareddt).format('MM/DD/YYYY hh:mm A');

                    swal
                    ({
                        title: 'Clearance Notice!',
                        text: "Patient already CLEARED by " + clearedby + "\nlast " + cleardate,
                        type: 'info',
                        allowOutsideClick: false
                    });

                    importSelectedPatientDataToMGHClearanceForm(caseno);
                    
                    
                }
            });
        }
        else
        {
            swal
            ({
                title: "Success!",
                text: "Patient Data is successfully fetched!",
                type: "success",
                allowOutsideClick: false
            });
            
            $('#clearPatientButton').prop('disabled',false);
            $('#revokepatientbutton').addClass('d-none');

            importSelectedPatientDataToMGHClearanceForm(caseno);
        }  
    });
}

function hideInpatientMasterlistForMGHClearance()
{
    $('#inpatientlistformghclearance').modal("hide");
    $('body').css('overflow', 'auto');
}

function onchangeadmittedpatientradio()
{
    $('#chargetodpmtsuppselect').prop('disabled', true);
    $('#chargetodpmtsuppbutton').prop('disabled', true);
    $('#chargetodpmtsuppselect').selectpicker('val','Select');
    $('#chargetodpmtsuppselect').selectpicker('refresh');
    
    $('#admittedpatienttablediv').removeClass("d-none");
    $('#chargetodprtmtsupplydiv').addClass("d-none");
    
    $('#selectid_nursestationmgh').prop('disabled', false);
    $('#chckboxid_forvwopdpatientmgh').prop('disabled', false);
    $('#selectid_nursestationmgh').selectpicker('refresh');
}

function onchangechargetodpmtsupplyradio()
{
    $('#chargetodpmtsuppselect').prop('disabled', false);
    $('#chargetodpmtsuppbutton').prop('disabled', false);
    $('#chargetodpmtsuppselect').selectpicker('val','Select');
    $('#chargetodpmtsuppselect').selectpicker('refresh');
    
    $('#admittedpatienttablediv').addClass("d-none");
    $('#chargetodprtmtsupplydiv').removeClass("d-none");
    
    $('#selectid_nursestationmgh').prop('disabled', true);
    $('#chckboxid_forvwopdpatientmgh').prop('disabled', true);
    $('#selectid_nursestationmgh').selectpicker('refresh');
    $('#departmenttextfield').html("NONE");

}

function onchangeChargeToDpmtSupplySelect()
{
    var chargetodpmtsuppselect = $('#chargetodpmtsuppselect').val();
    
    if(chargetodpmtsuppselect === "Select")
    {
        $('#departmenttextfield').html("NONE");
    }
    else if(chargetodpmtsuppselect === "Emergency")
    {
        $('#departmenttextfield').html("EMERGENCY");
    }
    else if(chargetodpmtsuppselect === "Operating")
    {
        $('#departmenttextfield').html("OPERATING ROOM");
    }
    else if(chargetodpmtsuppselect === "Delivery")
    {
        $('#departmenttextfield').html("DELIVERY ROOM");
    }
    else if(chargetodpmtsuppselect === "CSR")
    {
        $('#departmenttextfield').html("CSR");
    }
    else if(chargetodpmtsuppselect === "NurseStation3A")
    {
        $('#departmenttextfield').html("NURSE STATION 3A");
    }
    else if(chargetodpmtsuppselect === "NurseStation3B")
    {
        $('#departmenttextfield').html("NURSE STATION 3B");
    }
    else if(chargetodpmtsuppselect === "NurseStation4A")
    {
        $('#departmenttextfield').html("NURSE STATION 4A");
    }
    else if(chargetodpmtsuppselect === "NurseStation4B")
    {
        $('#departmenttextfield').html("NURSE STATION 4B");
    }
    else if(chargetodpmtsuppselect === "ICU")
    {
        $('#departmenttextfield').html("ICU");
    }
    else if(chargetodpmtsuppselect === "PICU")
    {
        $('#departmenttextfield').html("PICU");
    }
    else if(chargetodpmtsuppselect === "Endo")
    {
        $('#departmenttextfield').html("ENDO");
    }
}

function selectInPatient()
{
    var data;

    $('#admitted-patients-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#admitted-patients-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#admitted-patients-masterlist-table').DataTable().row('.bg-grey').data();
        selectedInPatientForMGHClearance = data;
    });
}

function selectPatientForEmergencyOrQuickAdmitPatient()
{
    var caseno = selectedInPatientForMGHClearance[2];
    var status = selectedInPatientForMGHClearance[4];
    
    if(status === "CLEARED")
    {
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
            data: {casenox: caseno},
            dataType: 'json'
        })
        .done(function (data)
        {
            $('#clearPatientButton').prop('disabled',true);
            $('#revokepatientbutton').removeClass('d-none');
            
            if (data.status)
            {
                var clearedby = data.inpatientlistdata['clearedby'];
                var cleareddt = data.inpatientlistdata['clearedtd'];
                var cleardate = moment(cleareddt).format('MM/DD/YYYY hh:mm A');
                
                swal
                ({
                    title: 'Clearance Notice!',
                    text: "Patient already CLEARED by " + clearedby + "\nlast " + cleardate,
                    type: 'info',
                    allowOutsideClick: false
                });

                importSelectedPatientDataToMGHClearanceForm(caseno);
            }
        });
    }
    else
    {
        swal
        ({
            title: "Success!",
            text: "Patient Data is successfully fetched!",
            type: "success",
            allowOutsideClick: false
        });
        
        $('#clearPatientButton').prop('disabled',false);
        $('#revokepatientbutton').addClass('d-none');
        
        importSelectedPatientDataToMGHClearanceForm(caseno);
    }  
}

function importSelectedPatientDataToMGHClearanceForm(caseno)
{
    setToDefaultMGHClearanceForm();
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
        data: {casenox: caseno},
        dataType: 'json'
    })
    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {   
            $('#tabcontentdiv').fadeTo('slow',100);
            $('#newdivadded').removeClass('disabledivcontent');
            $('#selectid_pxclassmgh').prop('disabled',false);
            $('#selectid_pxclassmgh').selectpicker('refresh');

            $("#AdmissionLinkNavItem").tab('show');
            
            $('#inputid_patientnamemgh').html(data.inpatientlistdata['name']);
            $('#inputid_roomnamemgh').html(data.inpatientlistdata['roomno']);
            $('#inputid_phicmgh').html(data.inpatientlistdata['phicmembr']);
            $('#inputid_accountnomgh').val(data.inpatientlistdata['caseno']);
            $('#inputid_admissionmgh').html(data.inpatientlistdata['admitdate'] + " " + data.inpatientlistdata['admittime']);
            $('#inputid_dischargedmgh').html(data.inpatientlistdata['dischadate'] + " " + data.inpatientlistdata['dischatime']);
            $('#inputid_mobilenomgh').val(data.inpatientlistdata['mobileno']);
            $('#inputid_admitdatemgh').val(data.inpatientlistdata['admitdate']);
            $('#inputid_admittimemgh').val(data.inpatientlistdata['admittime']);
            $('#textareaid_reasonadmmgh').val(data.inpatientlistdata['Diag_chiefcomplain']);
            $('#textareaid_diagnoadmmgh').val(data.inpatientlistdata['Diag_admit']);
            $('#textareaid_finaldischadiagnosismgh').val(data.inpatientlistdata['Diag_discharge']);
            
            if(data.inpatientlistdata['Diag_surg'] === null || data.inpatientlistdata['Diag_surg'] === "")
            {
                $('#textareaid_surgprocedremgh').val("");
            }
            else
            {
                $('#textareaid_surgprocedremgh').val(data.inpatientlistdata['Diag_surg'] + " - " + data.inpatientlistdata['Diag_surg_ref']);
            }

            if(data.inpatientlistdata['Diag_anes'] === null || data.inpatientlistdata['Diag_anes'] === "")
            {
                $('#textareaid_sterilizationmgh').val("");
            }
            else
            {
                $('#textareaid_sterilizationmgh').val(data.inpatientlistdata['Diag_anes'] + " - " + data.inpatientlistdata['Diag_anes_ref']);
            }
            
            var pxclassification = data.inpatientlistdata['pat_clascode'];
            if(pxclassification === "GYNECOLOGY" || pxclassification === "Gynecology" || pxclassification === "gynecology")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "GYNECOLOGY");
                $('#selectid_adultpediamgh').prop('disabled', false);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', false);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "OBSTETRICS" || pxclassification === "Obstetrics" || pxclassification === "obstetrics")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "OBSTETRICS");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', false);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "SURGICAL" || pxclassification === "Surgical" || pxclassification === "surgical")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "SURGICAL");
                $('#selectid_adultpediamgh').prop('disabled', false);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "MEDICAL" || pxclassification === "Medical" || pxclassification === "medical")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "MEDICAL");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "NEW BORN" || pxclassification === "New Born" || pxclassification === "new born")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "NEW BORN");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "OTHERS" || pxclassification === "Others" || pxclassification === "others")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "OTHERS");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "PEDIA 1 - INSIDE" || pxclassification === "Pedia 1 - Inside" || pxclassification === "pedia 1 - inside")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "PEDIA 1 - INSIDE");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "PEDIA 1 - NURSERY" || pxclassification === "Pedia 1 - Nursery" || pxclassification === "pedia 1 - nursery")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "PEDIA 1 - NURSERY");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "PEDIA FROM INSIDE" || pxclassification === "Pedia from Inside" || pxclassification === "pedia from inside")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "PEDIA FROM INSIDE");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "PEDIA FROM OUTSIDE" || pxclassification === "Pedia from Outside" || pxclassification === "pedia from outside")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "PEDIA FROM OUTSIDE");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else if(pxclassification === "STILL BIRTH" || pxclassification === "Still Birth" || pxclassification === "still birth")
            {
                $('#selectid_pxclassmgh').selectpicker('val', "STILL BIRTH");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            else
            {
                $('#selectid_pxclassmgh').selectpicker('val', "Select");
                $('#selectid_adultpediamgh').prop('disabled', true);
                $('#selectid_adultpediamgh').selectpicker('refresh');

                $('#selectid_obgyneproceduremgh').prop('disabled', true);
                $('#selectid_obgyneproceduremgh').selectpicker('refresh');
            }
            
            var obgynproce = data.inpatientlistdata['OBprocedure'];
            if(obgynproce === "NORMAL" || obgynproce === "Normal")
            {
                $('#selectid_obgyneproceduremgh').selectpicker('val', "NORMAL");
            }
            else if(obgynproce === "CEASAREAN" || obgynproce === "Ceasarean" || obgynproce === "Ceasarian")
            {
                $('#selectid_obgyneproceduremgh').selectpicker('val', "CEASAREAN");
            }
            else if(obgynproce === "OTHERS" || obgynproce === "Others" || obgynproce === "others")
            {
                $('#selectid_obgyneproceduremgh').selectpicker('val', "OTHERS");
            }
            else
            {
                $('#selectid_obgyneproceduremgh').selectpicker('val', "Select");
            }
                    
            var adutlpedia = data.inpatientlistdata['pat_classub'];
            if(adutlpedia === "ADULT" || adutlpedia === "Adult")
            {
                $('#selectid_adultpediamgh').selectpicker('val', "ADULT");
            }
            else if(adutlpedia === "PEDIA" || adutlpedia === "Pedia")
            {
                $('#selectid_adultpediamgh').selectpicker('val', "PEDIA");
            }
            else
            {
                $('#selectid_adultpediamgh').selectpicker('val', "Select");
            }
            
            //============= HEALTHCARE ASSOCIATED INFECTION IMPORT PART ================================================>     
            
            var vapnumval = data.inpatientlistdata['HAIVAPdays'];
            var vaphidval = data.inpatientlistdata['HAIVAPinfection'];
            
            var bsinumval = data.inpatientlistdata['HAIBSIdays'];
            var bsihidval = data.inpatientlistdata['HAIBSIinfection'];
            
            var utinumval = data.inpatientlistdata['HAIUTIdays'];
            var utihidval = data.inpatientlistdata['HAIUTIinfection'];
            
            var ssinumval = data.inpatientlistdata['HAISSIdays'];
            var ssihidval = data.inpatientlistdata['HAISSInoneinfection'];

            var ot1numval = data.inpatientlistdata['HAIcasedays'];
            var ot1txtval = data.inpatientlistdata['HAIcase_deviceinfection'];
            
            var ot2numval = data.inpatientlistdata['HAInonecasedays'];
            var ot2txtval = data.inpatientlistdata['HAIcase_nonedeviceinfection'];
            
            if(vaphidval === "1")
            {
                $('#chckboxid_vapmgh').prop("checked",true);
                $('#hidtextboxid_vapmgh').val(vaphidval);
                $('#numboxid_vapmgh').val(vapnumval);
                $('#numboxid_vapmgh').prop("disabled",false);
            }
            else
            {
                $('#chckboxid_vapmgh').prop("checked",false);
                $('#hidtextboxid_vapmgh').val("0");
                $('#numboxid_vapmgh').val("");
                $('#numboxid_vapmgh').prop("disabled",true);
            }
            
            if(bsihidval === "1")
            {
                $('#chckboxid_bsimgh').prop("checked",true);
                $('#hidtextboxid_bsimgh').val(bsihidval);
                $('#numboxid_bsimgh').val(bsinumval);
                $('#numboxid_bsimgh').prop("disabled",false);
            }
            else
            {
                $('#chckboxid_bsimgh').prop("checked",false);
                $('#hidtextboxid_bsimgh').val("0");
                $('#numboxid_bsimgh').val("");
                $('#numboxid_bsimgh').prop("disabled",true);
            }

            if(utihidval === "1")
            {
                $('#chckboxid_utimgh').prop("checked",true);
                $('#hidtextboxid_utimgh').val(utihidval);
                $('#numboxid_utimgh').val(utinumval);
                $('#numboxid_utimgh').prop("disabled",false);
            }
            else
            {
                $('#chckboxid_utimgh').prop("checked",false);
                $('#hidtextboxid_utimgh').val("0");
                $('#numboxid_utimgh').val("");
                $('#numboxid_utimgh').prop("disabled",true);
            }
            
            if(ssihidval === "1")
            {
                $('#chckboxid_ssimgh').prop("checked",true);
                $('#hidtextboxid_ssimgh').val(ssihidval);
                $('#numboxid_ssimgh').val(ssinumval);
                $('#numboxid_ssimgh').prop("disabled",false);
            }
            else
            {
                $('#chckboxid_ssimgh').prop("checked",false);
                $('#hidtextboxid_ssimgh').val("0");
                $('#numboxid_ssimgh').val("");
                $('#numboxid_ssimgh').prop("disabled",true);
            }
            
            if(ot1txtval !== "")
            {
                $('#chckboxid_oth1mgh').prop("checked",true);
                $('#textboxid_oth1mgh').val(ot1txtval);
                $('#hidtextboxid_oth1mgh').val("1");
                $('#numboxid_oth1mgh').val(ot1numval);
                $('#numboxid_oth1mgh').prop("disabled",false);
                $('#textboxid_oth1mgh').prop("disabled",false);
            }
            else
            {
                $('#chckboxid_oth1mgh').prop("checked",false);
                $('#textboxid_oth1mgh').val("");
                $('#hidtextboxid_oth1mgh').val("0");
                $('#numboxid_oth1mgh').val("");
                $('#numboxid_oth1mgh').prop("disabled",true);
                $('#textboxid_oth1mgh').prop("disabled",true);
            }
            
            if(ot2txtval !== "")
            {
                $('#chckboxid_oth2mgh').prop("checked",true);
                $('#textboxid_oth2mgh').val(ot2txtval);
                $('#hidtextboxid_oth2mgh').val("1");
                $('#numboxid_oth2mgh').val(ot2numval);
                $('#numboxid_oth2mgh').prop("disabled",false);
                $('#textboxid_oth2mgh').prop("disabled",false);
            }
            else
            {
                $('#chckboxid_oth2mgh').prop("checked",false);
                $('#textboxid_oth2mgh').val("");
                $('#hidtextboxid_oth2mgh').val("0");
                $('#numboxid_oth2mgh').val("");
                $('#numboxid_oth2mgh').prop("disabled",true);
                $('#textboxid_oth2mgh').prop("disabled",true);
            }
            
            var admissionindicator = data.inpatientlistdata['admissionsource'];
            if(admissionindicator === "EMERGENCY")
            {
                $("#chckboxid_emdepmgh").prop("checked",true);
            }
            else
            {
                $("#chckboxid_emdepmgh").prop("checked",false);
            }

            var disposition = data.inpatientlistdata['disposition'];
            var dispositionUpperCaseEachFirstLetter = titleCase(disposition);

            if(disposition === "EXPIRED" || disposition === "Expired")
            {
                $("#selectid_pxstatmgh").selectpicker("val",dispositionUpperCaseEachFirstLetter);
                
                var deathtype = data.inpatientlistdata['deathtype'];                
                var delicause = data.inpatientlistdata['deliverycausesofdeaths'];
                var delicauseUpperCaseEachFirstLetter = titleCase(delicause);

                $("#expireddivmgh").removeClass('d-none');
                $("#transfereddivmgh").addClass('d-none');
                $("#pxstatothersdivmgh").addClass('d-none'); 

                $("#selectid_typeofdeathmgh").selectpicker('val',deathtype);
                $("#selectid_obgynmaternalmgh").selectpicker('val',delicauseUpperCaseEachFirstLetter);
                
                var dischargein48 = data.inpatientlistdata['dischargein48'];
                if(dischargein48 === ">= 48HRS")
                {
                    $("#radioid_lessthan").prop('checked', false);
                    $("#radioid_morethan").prop('checked', true);
                }
                else
                {
                    $("#radioid_lessthan").prop('checked', true);
                    $("#radioid_morethan").prop('checked', false);
                }

                $("#chckboxid_obgynmgh").prop("checked", false);
                $("#hidtextbox_obgynmaternalmgh").val("0");
                
                $("#textboxid_transreftohcimgh").val("");
                $("#textareaid_reasonrefermgh").val("");
                
                var expireddate = data.inpatientlistdata['expireddate'];
                var expiredtime = data.inpatientlistdata['expiredtime'];

                $("#inputid_expireddatemgh").val(expireddate);
                $("#inputid_expiredtimemgh").val(expiredtime);
            }
            else if(disposition === "TRANSFERRED/REFERRED" || disposition === "Transferred/Referred")
            {
                $("#selectid_pxstatmgh").selectpicker("val","Transferred/Referred");
                
                $("#expireddivmgh").addClass('d-none');
                $("#transfereddivmgh").removeClass('d-none');
                $("#pxstatothersdivmgh").addClass('d-none'); 

                $("#selectid_typeofdeathmgh").selectpicker('val',"Select");
                $("#selectid_obgynmaternalmgh").selectpicker('val',"Select");
               
                $("#radioid_lessthan").prop('checked', true);
                $("#radioid_morethan").prop('checked', false);

                $("#chckboxid_obgynmgh").prop("checked", false);
                $("#hidtextbox_obgynmaternalmgh").val("0");
                
                $("#textboxid_transreftohcimgh").val(data.inpatientlistdata['TransRefHCI']);
                $("#textareaid_reasonrefermgh").val(data.inpatientlistdata['reasonforreferral']);
                
                $("#inputid_expireddatemgh").val(moment().format('YYYY-MM-DD'));
                $("#inputid_expiredtimemgh").val(moment().format('HH:mm:ss'));
            }
            else
            {
                $("#selectid_pxstatmgh").selectpicker("val",dispositionUpperCaseEachFirstLetter);
                
                $("#expireddivmgh").addClass('d-none');
                $("#transfereddivmgh").addClass('d-none');
                $("#pxstatothersdivmgh").addClass('d-none'); 

                $("#selectid_typeofdeathmgh").selectpicker('val',"Select");
                $("#selectid_obgynmaternalmgh").selectpicker('val',"Select");
               
                $("#radioid_lessthan").prop('checked', true);
                $("#radioid_morethan").prop('checked', false);

                $("#chckboxid_obgynmgh").prop("checked", false);
                $("#hidtextbox_obgynmaternalmgh").val("0");
                
                $("#textboxid_transreftohcimgh").val("");
                $("#textareaid_reasonrefermgh").val("");
                
                $("#inputid_expireddatemgh").val(moment().format('YYYY-MM-DD'));
                $("#inputid_expiredtimemgh").val(moment().format('HH:mm:ss'));
            }
            
            //============= CONFINEMENTCAUSES IMPORT PART ================================================>     
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
                
                var counterfortblecausesadmvar = parseInt(counterfortblecausesadmedt) - parseInt(counterfortblecausesadmedt);
                counterfortblecausesadmedt = parseInt(counterfortblecausesadmvar) + 1;
                
                var counterfortextcausesadmvar = parseInt(counterfortextcausesadmedt) - parseInt(counterfortextcausesadmedt);
                counterfortextcausesadmedt = parseInt(counterfortextcausesadmvar) + 1;
                
                for (var cv = 0; cv < data.length; cv++)
                {
                    var textboxidtbl = data[cv]['causescode'] + "-" + counterfortblecausesadmedt;
                    
                    confinecause_table.row.add
                    ([
                        data[cv]['diagnosis'],
                        data[cv]['icdcode'],
                        data[cv]['diagcateg'],
                        data[cv]['diagcode'],
                        data[cv]['causescode'],
                        textboxidtbl,
                        counterfortblecausesadmedt
                    ]).order([6,'asc']).draw(false);

                    var causesdata = data[cv]['diagnosis'] + "|" +
                                     data[cv]['icdcode'] + "|" +
                                     data[cv]['diagcateg'] + "|" +
                                     data[cv]['diagcode'] + "|" +
                                     data[cv]['causescode'] + "|" +
                                     textboxidtbl;

                    if(causeconcreateboxindicator === false && cv !== data.length)
                    {
                        textBoxCreateForCausesMGHCLearance(causesdata);
                    } 
                    
                    counterfortblecausesadmedt++;
                }
                causeconcreateboxindicator = true;
            });


            //============= INDICATIONCAUSES IMPORT PART ================================================>     
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getIndicationCausesData",
                data: {casenox: caseno},
                dataType: 'json'
            })
            .done(function (data)
            {
                ceasarianindication_table = $('#ceasarian-case-indication-diagnosis-table').DataTable();
                ceasarianindication_table.clear().draw();

                var counterfortblecausesmghvar = parseInt(counterfortbleindicationcauses) - parseInt(counterfortbleindicationcauses);
                counterfortbleindicationcauses = parseInt(counterfortblecausesmghvar) + 1;
                
                var counterfortextcausesmghvar = parseInt(counterfortextindicationcauses) - parseInt(counterfortextindicationcauses);
                counterfortextindicationcauses = parseInt(counterfortextcausesmghvar) + 1;
                
                for (var cv = 0; cv < data.length; cv++)
                {
                    var textboxidtbl = data[cv]['causescode'] + "-" + counterfortbleindicationcauses;

                    ceasarianindication_table.row.add
                    ([
                        counterfortbleindicationcauses,
                        data[cv]['diagnosis'],
                        data[cv]['causescode'],
                        textboxidtbl
                    ]).order([0,'asc']).draw(false);

                    var indicadata = data[cv]['diagnosis'] + "|" +
                                     data[cv]['causescode'] + "|" +
                                     data[cv]['diagcode'] + "|" +
                                     data[cv]['icdcode'] + "|" +
                                     textboxidtbl;

                    if(indicconcreateboxindicator === false && cv !== data.length)
                    {
                        textBoxCreateForIndicationCauses(indicadata);
                    } 
                    
                    counterfortbleindicationcauses++;
                }
                indicconcreateboxindicator = true;
            });
            
            //============= FINALDIAG IMPORT PART ================================================>     
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Admission/getFinaldiagCausesData",
                data: {casenox: caseno},
                dataType: 'json'
            })
            .done(function (data)
            {
                finaldiagnose_table = $('#categorized-final-diagnosis-table').DataTable();
                finaldiagnose_table.clear().draw();

                var counterfortblefinaldiagvar = parseInt(counterfortblecategfinaldiagmgh) - parseInt(counterfortblecategfinaldiagmgh);
                counterfortblecategfinaldiagmgh = parseInt(counterfortblefinaldiagvar) + 1;
                
                var counterfortextfinaldiagvar = parseInt(counterfortextcategfinaldiagmgh) - parseInt(counterfortextcategfinaldiagmgh);
                counterfortextcategfinaldiagmgh = parseInt(counterfortextfinaldiagvar) + 1;
                
                for (var cv = 0; cv < data.length; cv++)
                {
                    var textboxidtbl = data[cv]['causescode'] + "-" + counterfortblecategfinaldiagmgh;
                    
                    finaldiagnose_table.row.add
                    ([
                        data[cv]['diagnosis'],
                        data[cv]['icdcode'],
                        data[cv]['diagcateg'],
                        data[cv]['diagcode'],
                        data[cv]['causescode'],
                        textboxidtbl,
                        counterfortblecategfinaldiagmgh
                    ]).order([6,'asc']).draw(false);

                    var finaldiagdata = data[cv]['diagnosis'] + "|" +
                                        data[cv]['icdcode'] + "|" +
                                        data[cv]['diagcateg'] + "|" +
                                        data[cv]['diagcode'] + "|" +
                                        data[cv]['causescode'] + "|" +
                                        textboxidtbl;

                    if(finalconcreateboxindicator === false && cv !== data.length)
                    {
                        textBoxCreateForCategFinalDiagMGHCLearance(finaldiagdata);
                    } 
                    
                    counterfortblecategfinaldiagmgh++;
                }
                finalconcreateboxindicator = true;
            });

            //============= DISCHADIAGNOSIS IMPORT PART ================================================>     
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "MGHclearance/getDischargeDiagnosisData",
                data: {casenox: caseno},
                dataType: 'json'
            })
            .done(function (data)
            {
                procedurecases_table = $('#discharge-medical-procedure-cases-table').DataTable();
                procedurecases_table.clear().draw();
                
                var counterfortbledischargediagvar = parseInt(counterfortbledischargediagmgh) - parseInt(counterfortbledischargediagmgh);
                counterfortbledischargediagmgh = parseInt(counterfortbledischargediagvar) + 1;
                
                for (var cv = 0; cv < data.length; cv++)
                {
                    var lateralityleftx;
                    var leftx = data[cv]['lateralityleft'];
                    if(leftx === "0")
                    {
                        lateralityleftx = "NO";
                    }
                    else
                    {
                        lateralityleftx = "YES";
                    }
                    
                    var lateralityright;
                    var right = data[cv]['lateralityright'];
                    if(right === "0")
                    {
                        lateralityright = "NO";
                    }
                    else
                    {
                        lateralityright = "YES";
                    }
                    
                    var lateralitybothx;
                    var bothx = data[cv]['lateralityboth'];
                    if(bothx === "0")
                    {
                        lateralitybothx = "NO";
                    }
                    else
                    {
                        lateralitybothx = "YES";
                    }
                    
                    procedurecases_table.row.add
                    ([
                        counterfortbledischargediagmgh,
                        data[cv]['CF2ICD10'],
                        data[cv]['CF2DIAGNOSIS'],
                        data[cv]['CF2RVSCODE'],
                        data[cv]['CF2RVS'],
                        data[cv]['dateprocedure'],
                        lateralityleftx,
                        lateralityright,
                        lateralitybothx,
                        data[cv]['updated'],
                        data[cv]['patcaseno'],
                        data[cv]['dxRefno']
                    ]).order([6,'asc']).draw(false);

                    counterfortbledischargediagmgh++;
                }
            });
            
            //============= REQUESTNO SELECT IMPORT PART ==========================================>     
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "MGHclearance/getPatientDistinctRequestNoFromLedgerIPD",
                data:
                {
                    casenumbr: caseno
                },
                dataType: 'json'
            })
            .done(function (data)
            {
                $('#selectid_gotoreqmgh').empty();
                $('#selectid_gotoreqmgh').append('<option value="Select">' + "Select from List" + '</option>');

                for (var cv = 0; cv < data.length; cv++)
                {
                    $('#selectid_gotoreqmgh').append('<option value="' + data[cv]['reqcode'] + '">' + data[cv]['reqcode'] + '</option>');
                }
                $('#selectid_gotoreqmgh').selectpicker('refresh');
            });
        }
    });
    
    hideInpatientMasterlistForMGHClearance();
}

function onclickAccountTab()
{
    if (!($("#Account").hasClass("active"))) 
    {
        $('#selectid_gotoreqmgh').selectpicker('val', "Select");
        $('#selectid_gotoreqmgh').selectpicker('refresh');
        
        var caseno = $("#inputid_accountnomgh").val();
        
        swal
        ({
            title: "Would you like to view the accounts?",
            text: false,
            type: false,
            showCancelButton: true,
            confirmButtonColor: "#03A9F4",
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No thanks!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, 
        function (isConfirm) 
        {
            if (isConfirm)
            {
                $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "MGHclearance/getAllPatientAccountFromLedgerIPD",
                    data:
                    {
                        casenumbr: caseno
                    },
                    dataType: 'json'
                })
                .done(function (data)
                {
                    if (data.status === true)
                    {
                        swal("Data Imported", "Patient account has been imported!", "success");
                        
                        pxaccount_table = $('#patient-account-general-mgh-clearance-table').DataTable();
                        pxaccount_table.clear().draw();

                        var counterfortblepxgeneralvar = parseInt(counterfortblepxgeneralacct) - parseInt(counterfortblepxgeneralacct);
                        counterfortblepxgeneralacct = parseInt(counterfortblepxgeneralvar) + 1;

                        for (var cv = 0; cv < data.casenum.length; cv++)
                        {    
                            var reqdatewithPMAM = moment(data.casenum[cv]['reqdate']).format('MM/DD/YYYY hh:mm:ss A');

                            pxaccount_table.row.add
                            ([
                                counterfortblepxgeneralacct,
                                data.casenum[cv]['dscr'],
                                data.casenum[cv]['qty'],
                                data.casenum[cv]['unitqty'],
                                data.casenum[cv]['reqcode'],
                                reqdatewithPMAM,
                                data.casenum[cv]['hospcode'],
                                data.casenum[cv]['reqby'],
                                data.casenum[cv]['stockbarcode'],
                                data.casenum[cv]['services'],
                                data.casenum[cv]['transref'],
                                data.casenum[cv]['officialresult'],
                                data.casenum[cv]['transactiontype'],
                                data.casenum[cv]['groupname'],
                                data.casenum[cv]['grouping']
                            ]).order([0,'asc']).draw(false);

                            counterfortblepxgeneralacct++;
                        }
                    }
                    else
                    {
                        swal("Import Notice!", "No patient data found!", "warning");
                    }
                });
            } 
            else 
            {
                swal("Cancelled", "Viewing patient account was cancelled!", "error");
                pxaccount_table.clear().draw();
            }
        });
    }
}

function onclickDispositionTab()
{
    if (!($("#Disposition").hasClass("active"))) 
    {
        pxaccount_table = $('#patient-account-general-mgh-clearance-table').DataTable();
        pxaccount_table.clear().draw();
            
        $('#selectid_gotoreqmgh').selectpicker('val', "Select");
        $('#selectid_gotoreqmgh').selectpicker('refresh');
    }
}

function onclickDiagnosisTab()
{
    if (!($("#Diagnosis").hasClass("active"))) 
    {
        pxaccount_table = $('#patient-account-general-mgh-clearance-table').DataTable();
        pxaccount_table.clear().draw();
        
        $('#selectid_gotoreqmgh').selectpicker('val', "Select");
        $('#selectid_gotoreqmgh').selectpicker('refresh');
    }
}

function onclickProcedureTab()
{
    if (!($("#Procedure").hasClass("active"))) 
    {
        pxaccount_table = $('#patient-account-general-mgh-clearance-table').DataTable();
        pxaccount_table.clear().draw();
        
        $('#selectid_gotoreqmgh').selectpicker('val', "Select");
        $('#selectid_gotoreqmgh').selectpicker('refresh');
    }
}

function onclickAdmissionTab()
{
    if (!($("#Admission").hasClass("active"))) 
    {
        pxaccount_table = $('#patient-account-general-mgh-clearance-table').DataTable();
        pxaccount_table.clear().draw();
        
        $('#selectid_gotoreqmgh').selectpicker('val', "Select");
        $('#selectid_gotoreqmgh').selectpicker('refresh');
    }
}

function onchangeRequestNumberSelection(reqno)
{
    var caseno = $("#inputid_accountnomgh").val();
    
    if(reqno !== 'Select')
    {
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "MGHclearance/getAllPatientAccountViaReqcodeFilterFromLedgerIPD",
            data:
            {
                casenumbr: caseno,
                reqsnumbr: reqno
            },
            dataType: 'json'
        })
        .done(function (data)
        {
            pxaccount_table = $('#patient-account-general-mgh-clearance-table').DataTable();
            pxaccount_table.clear().draw();

            var counterfortblepxgeneralvar = parseInt(counterfortblepxgeneralacct) - parseInt(counterfortblepxgeneralacct);
            counterfortblepxgeneralacct = parseInt(counterfortblepxgeneralvar) + 1;

            for (var cv = 0; cv < data.length; cv++)
            {    
                var reqdatewithPMAM = moment(data[cv]['reqdate']).format('MM/DD/YYYY hh:mm:ss A');

                pxaccount_table.row.add
                ([
                    counterfortblepxgeneralacct,
                    data[cv]['dscr'],
                    data[cv]['qty'],
                    data[cv]['unitqty'],
                    data[cv]['reqcode'],
                    reqdatewithPMAM,
                    data[cv]['hospcode'],
                    data[cv]['reqby'],
                    data[cv]['stockbarcode'],
                    data[cv]['services'],
                    data[cv]['transref'],
                    data[cv]['officialresult'],
                    data[cv]['transactiontype'],
                    data[cv]['groupname'],
                    data[cv]['grouping']
                ]).order([0,'asc']).draw(false);

                counterfortblepxgeneralacct++;
            }
        });
    }
    else
    {
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "MGHclearance/getAllPatientAccountFromLedgerIPD",
            data:
            {
                casenumbr: caseno
            },
            dataType: 'json'
        })
        .done(function (data)
        {
            pxaccount_table = $('#patient-account-general-mgh-clearance-table').DataTable();
            pxaccount_table.clear().draw();

            var counterfortblepxgeneralvar = parseInt(counterfortblepxgeneralacct) - parseInt(counterfortblepxgeneralacct);
            counterfortblepxgeneralacct = parseInt(counterfortblepxgeneralvar) + 1;

            for (var cv = 0; cv < data.length; cv++)
            {    
                var reqdatewithPMAM = moment(data[cv]['reqdate']).format('MM/DD/YYYY hh:mm:ss A');

                pxaccount_table.row.add
                ([
                    counterfortblepxgeneralacct,
                    data[cv]['dscr'],
                    data[cv]['qty'],
                    data[cv]['unitqty'],
                    data[cv]['reqcode'],
                    reqdatewithPMAM,
                    data[cv]['hospcode'],
                    data[cv]['reqby'],
                    data[cv]['stockbarcode'],
                    data[cv]['services'],
                    data[cv]['transref'],
                    data[cv]['officialresult'],
                    data[cv]['transactiontype'],
                    data[cv]['groupname'],
                    data[cv]['grouping']
                ]).order([0,'asc']).draw(false);

                counterfortblepxgeneralacct++;
            }
        });
    }
}

function onchangePatientStatSelectMGHClearance()
{
    var pxstat = $("#selectid_pxstatmgh").val();
    
    if(pxstat === "Expired")
    {
        $("#expireddivmgh").removeClass('d-none');
        $("#transfereddivmgh").addClass('d-none');
        $("#pxstatothersdivmgh").addClass('d-none'); 

        $("#selectid_typeofdeathmgh").selectpicker('val','Select');
        $("#radioid_lessthan").prop('checked', true);
        $("#radioid_morethan").prop('checked', false);
        $("#ifexpireddeathtime48hrs").val("< 48HRS");
        $("#chckboxid_obgynmgh").prop("checked", false);
        $("#hidtextbox_obgynmaternalmgh").val("0");
        $("#textboxid_transreftohcimgh").val("");
        $("#textareaid_reasonrefermgh").val("");
    }
    else if(pxstat === "Transferred/Referred")
    {
        $("#expireddivmgh").addClass('d-none');
        $("#transfereddivmgh").removeClass('d-none');
        $("#pxstatothersdivmgh").addClass('d-none'); 

        $("#selectid_typeofdeathmgh").selectpicker('val','Select');
        $("#radioid_lessthan").prop('checked', true);
        $("#radioid_morethan").prop('checked', false);
        $("#ifexpireddeathtime48hrs").val("< 48HRS");
        $("#chckboxid_obgynmgh").prop("checked", false);
        $("#hidtextbox_obgynmaternalmgh").val("0");
        $("#textboxid_transreftohcimgh").val("");
        $("#textareaid_reasonrefermgh").val("");
    }
    else
    {
        $("#expireddivmgh").addClass('d-none');
        $("#transfereddivmgh").addClass('d-none');
        $("#pxstatothersdivmgh").removeClass('d-none'); 

        $("#selectid_typeofdeathmgh").selectpicker('val','Select');
        $("#radioid_lessthan").prop('checked', true);
        $("#radioid_morethan").prop('checked', false);
        $("#ifexpireddeathtime48hrs").val("< 48HRS");
        $("#chckboxid_obgynmgh").prop("checked", false);
        $("#hidtextbox_obgynmaternalmgh").val("0");
        $("#textboxid_transreftohcimgh").val("");
        $("#textareaid_reasonrefermgh").val("");
    }
}

function showGeneralGuidelinesOfAdmissionTabMGHClearance()
{
    $("#admissiontabmainview").addClass('d-none');
    $("#admissiontabguideview").removeClass('d-none');
}

function hideGeneralGuidelinesOfAdmissionTabMGHClearance()
{
    $("#admissiontabmainview").removeClass('d-none');
    $("#admissiontabguideview").addClass('d-none');
}

function getCeasarianCaseIndicationDiagnosis() 
{
    ceasarianindication_table = $('#ceasarian-case-indication-diagnosis-table').DataTable
    ({
        sScrollY: "200px",
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

        },
        initComplete: function (settings, json)
        {

        }
    });
//    ceasarianindication_table.columns([0,3]).visible(false);
}

function selectCaesarianIndicationDiagnosisOfMGHFormPage()
{
    var data;

    $('#ceasarian-case-indication-diagnosis-table tbody').on('click', 'tr', function ()
    {
        $('#ceasarian-case-indication-diagnosis-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#ceasarian-case-indication-diagnosis-table').DataTable().row('.bg-grey').data();
        selectedCaesarianIndicationDiagnosisForMGHClearanceForm = data;
    });
}

function selectCaesarianIndicationDiagnosisForMGHClearanceFormPage()
{
    if (ceasarianindication_table.rows( '.bg-grey' ).any())
    {   
        var textboxidtblcauses = selectedCaesarianIndicationDiagnosisForMGHClearanceForm[3];
        
        swal
        ({
            title: "Are you sure?",
            text: "You will not be able to recover\nthe selected diagnosis record!",
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

                ceasarianindication_table.row('.bg-grey').remove().draw( false );

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
    else
    {
        swal
        ({
            title: "Notification",
            text: "Select diagnosis first to be deleted!",
            type: "warning"
        });
    }
}

function getCategorizedFinalDiagnosis()
{
    finaldiagnose_table = $('#categorized-final-diagnosis-table').DataTable
    ({
        sScrollY: "145px",
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

        },
        initComplete: function (settings, json)
        {

        }
    });
    
    finaldiagnose_table.columns([1,2,3,5,6]).visible(false);
}

function getDischargeMedicalProcedureCases()
{
    procedurecases_table = $('#discharge-medical-procedure-cases-table').DataTable
    ({
        sScrollY: "145px",
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

        },
        initComplete: function (settings, json)
        {

        }
    });
}

function getPatientAccount()
{
    pxaccount_table = $('#patient-account-general-mgh-clearance-table').DataTable
    ({
        sScrollY: "430px",
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

        },
        initComplete: function (settings, json)
        {

        }
    });
}

function onChangeVAPCheckBox()
{
    var VAPindicator = $('#hidtextboxid_vapmgh').val();
    if(VAPindicator === "1")
    {
        $('#hidtextboxid_vapmgh').val("0");
        $('#numboxid_vapmgh').prop('disabled', true);
        $('#numboxid_vapmgh').val("");
    }
    else
    {
        $('#hidtextboxid_vapmgh').val("1");
        $('#numboxid_vapmgh').prop('disabled', false);
    }
}

function onChangeBSICheckBox()
{
    var BSIindicator = $('#hidtextboxid_bsimgh').val();
    if(BSIindicator === "1")
    {
        $('#hidtextboxid_bsimgh').val("0");
        $('#numboxid_bsimgh').prop('disabled', true);
        $('#numboxid_bsimgh').val("");
    }
    else
    {
        $('#hidtextboxid_bsimgh').val("1");
        $('#numboxid_bsimgh').prop('disabled', false);
    }
}

function onChangeUTICheckBox()
{
    var UTIindicator = $('#hidtextboxid_utimgh').val();
    if(UTIindicator === "1")
    {
        $('#hidtextboxid_utimgh').val("0");
        $('#numboxid_utimgh').prop('disabled', true);
        $('#numboxid_utimgh').val("");
    }
    else
    {
        $('#hidtextboxid_utimgh').val("1");
        $('#numboxid_utimgh').prop('disabled', false);
    }
}

function onChangeSSICheckBox()
{
    var SSIindicator = $('#hidtextboxid_ssimgh').val();
    if(SSIindicator === "1")
    {
        $('#hidtextboxid_ssimgh').val("0");
        $('#numboxid_ssimgh').prop('disabled', true);
        $('#numboxid_ssimgh').val("");
    }
    else
    {
        $('#hidtextboxid_ssimgh').val("1");
        $('#numboxid_ssimgh').prop('disabled', false);
    }
}

function onChangeOTH1CheckBox()
{
    var OTH1indicator = $('#hidtextboxid_oth1mgh').val();
    if(OTH1indicator === "1")
    {
        $('#hidtextboxid_oth1mgh').val("0");
        $('#numboxid_oth1mgh').prop('disabled', true);
        $('#numboxid_oth1mgh').val("");
        $('#textboxid_oth1mgh').prop('disabled', true);
        $('#textboxid_oth1mgh').val("");
    }
    else
    {
        $('#hidtextboxid_oth1mgh').val("1");
        $('#numboxid_oth1mgh').prop('disabled', false);
        $('#textboxid_oth1mgh').prop('disabled', false);
    }
}

function onChangeOTH2CheckBox()
{
    var OTH2indicator = $('#hidtextboxid_oth2mgh').val();
    if(OTH2indicator === "1")
    {
        $('#hidtextboxid_oth2mgh').val("0");
        $('#numboxid_oth2mgh').prop('disabled', true);
        $('#numboxid_oth2mgh').val("");
        $('#textboxid_oth2mgh').prop('disabled', true);
        $('#textboxid_oth2mgh').val("");
        
    }
    else
    {
        $('#hidtextboxid_oth2mgh').val("1");
        $('#numboxid_oth2mgh').prop('disabled', false);
        $('#textboxid_oth2mgh').prop('disabled', false);
    }
}

function onChangeEmergencyCaseCheckBox()
{
    var emdeptchckbox = $('#hidtextboxid_emdepmgh').val();
    if(emdeptchckbox === "1")
    {
        $('#hidtextboxid_emdepmgh').val("0");
    }
    else
    {
        $('#hidtextboxid_emdepmgh').val("1");
    }
}

function validatePatientClassificationSelection()
{
    var patientstat = $('#selectid_pxclassmgh').val();
    
    if(patientstat === "GYNECOLOGY")
    {
        $('#selectid_pxclassmgherror').addClass("d-none");
        $('#selectid_pxclassmgherror').html("");
        
        var adultpedia1 = $('#selectid_adultpediamgh').val();
        if(adultpedia1 !== "Select")
        {
            $('#selectid_adultpediamgherror').html("");
            $('#selectid_adultpediamgherror').addClass("d-none");
            
            var obgyneproc1 = $('#selectid_obgyneproceduremgh').val();
            if(obgyneproc1 !== "Select")
            {
                $('#selectid_obgyneproceduremgherror').html("");
                $('#selectid_obgyneproceduremgherror').addClass("d-none");

                showCeasarianIndicationSearchDiagnosisModal();
            }
            else
            {
                $('#selectid_obgyneproceduremgherror').html("Required!");
                $('#selectid_obgyneproceduremgherror').removeClass("d-none");
                
                swal
                ({
                    title: "Validation Notice!",
                    text: "OB/Gyne Procedure Selection is required!",
                    type: "warning",
                    confirmButtonText: "OK"
                });
            }
        }
        else
        {
            $('#selectid_adultpediamgherror').removeClass("d-none");
            $('#selectid_adultpediamgherror').html("Required!");
            
            swal
            ({
                title: "Validation Notice!",
                text: "Adult/Pedia Selection is required!",
                type: "warning",
                confirmButtonText: "OK"
            });
        }
    }
    else if(patientstat === "OBSTETRICS")
    {
        $('#selectid_pxclassmgherror').addClass("d-none");
        $('#selectid_pxclassmgherror').html("");

        var obgyneproc2 = $('#selectid_obgyneproceduremgh').val();
        if(obgyneproc2 !== "Select")
        {
            $('#selectid_obgyneproceduremgherror').html("");
            $('#selectid_obgyneproceduremgherror').addClass("d-none");

            $('#ceasarianindicationsearch').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

            $('body').css('overflow', 'hidden');
            
            showCeasarianIndicationSearchDiagnosisModal();
        }
        else
        {
            $('#selectid_obgyneproceduremgherror').html("Required!");
            $('#selectid_obgyneproceduremgherror').removeClass("d-none");

            swal
            ({
                title: "Validation Notice!",
                text: "OB/Gyne Procedure Selection is Required!",
                type: "warning",
                confirmButtonText: "OK"
            });
        }
    }
    else
    {
        $('#selectid_pxclassmgherror').removeClass("d-none");
        $('#selectid_pxclassmgherror').html("Invalid Selection For Ceasarian Case");
        
        setTimeout(function ()
        {
            swal
            ({
                title: "Validation Notice!",
                text: "Please select patient classification first,\neither Obstetrics or Gynecology!",
                type: "warning",
                confirmButtonText: "OK"
            },
            function (isConfirm)
            {
                if (isConfirm)
                {
                    $('#selectid_pxclassmgh').selectpicker('toggle');
                }
            });
        }, 1000);
    }
}

function showCeasarianIndicationSearchDiagnosisModal()
{
    $('#ceasarianindicationsearch').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
}

function selectCaesarianIndicationDiagnosis()
{
    var data;

    $('#ceasarian-indicationlist-table tbody').on('click', 'tr', function ()
    {
        $('#ceasarian-indicationlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#ceasarian-indicationlist-table').DataTable().row('.bg-grey').data();
        selectedCaesarianIndicationDiagnosis = data;
    });
}

function selectCaesarianIndicationDiagnosisForMGHClearance()
{
    var category = selectedCaesarianIndicationDiagnosis[1];
    var icdcodex = selectedCaesarianIndicationDiagnosis[2];
    var refnumbr = selectedCaesarianIndicationDiagnosis[4];

    importDataFromCaesarianDiagnosisTableToIndicationCausesTabel(refnumbr,icdcodex,category);
}

function importDataFromCaesarianDiagnosisTableToIndicationCausesTabel(refnumber,icdcodex,category)
{
    var date = moment();
    var datecode = date.format("MMDDYYYYhhmmss");
    var causescode = datecode + "CINDC";
    var textboxidtblcauses = causescode + "-" + counterfortbleindicationcauses;

    ceasarianindication_table = $('#ceasarian-case-indication-diagnosis-table').DataTable();
    ceasarianindication_table.row.add
    ([
        counterfortbleindicationcauses,
        category,
        causescode,
        textboxidtblcauses
    ]).order([0,'asc']).draw(false);

    hideCeasarianIndicationSearchDiagnosisModal();

    swal
    ({
        title: "Success!",
        text: "Record is successfully stored!",
        type: "success",
        allowOutsideClick: false
    });

    counterfortbleindicationcauses++;
    var indicationcausesalldata = category + "|" + causescode + "|" + refnumber + "|" + icdcodex + "|" + textboxidtblcauses;    
    textBoxCreateForIndicationCauses(indicationcausesalldata);
}

function hideCeasarianIndicationSearchDiagnosisModal()
{
    $('#ceasarianindicationsearch').modal("hide");
    $('body').css('overflow', 'auto');
}

function getCeasarianIndicationDiagnosisList()
{
    ceasariancase_table = $('#ceasarian-indicationlist-table').DataTable
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
            url: BASE_URL + 'MGHclearance/GetAllCeasarianIndicationDiagnosisListings',
            type: 'POST'
        },
        createdRow: function (row, data, dataIndex)
        {

        },
        initComplete: function (settings, json)
        {

        }
    });
    
    ceasariancase_table.on('dblclick', 'tr', function ()
    {
        var data = ceasariancase_table.row(this).data();

        var category = data[1];
        var icdcodex = data[2];
        var refnumbr = data[4];

        importDataFromCaesarianDiagnosisTableToIndicationCausesTabel(refnumbr,icdcodex,category);
    });
}

function textBoxCreateForIndicationCauses(indicationcausesalldata)
{
    var causessplit = indicationcausesalldata.split("|");
    
    var category = causessplit[0]; 
    var causescode = causessplit[1]; 
    var refnumber = causessplit[2]; 
    var icdcodex = causessplit[3]; 
    var textboxidtblcauses = causessplit[4];
    
    var textboxidtblsplit = textboxidtblcauses.split("-");
    var textboxidtblnum = textboxidtblsplit[1];
    
    counterfortextindicationcauses = parseInt(textboxidtblnum);
       
    var category_input = document.createElement("INPUT");
    category_input.setAttribute("type", "hidden");
    category_input.setAttribute("id", textboxidtblcauses);
    category_input.setAttribute("name", "category_indication" + counterfortextindicationcauses);
    category_input.setAttribute("class", "category_indication" + counterfortextindicationcauses);
    category_input.setAttribute("value", category);
    document.getElementById("myFormIndicationCauseAddMGHClearance").appendChild(category_input);

    var causescode_input = document.createElement("INPUT");
    causescode_input.setAttribute("type", "hidden");
    causescode_input.setAttribute("id", textboxidtblcauses);
    causescode_input.setAttribute("name", "causescode_indication" + counterfortextindicationcauses);
    causescode_input.setAttribute("class", "causescode_indication" + counterfortextindicationcauses);
    causescode_input.setAttribute("value", causescode);
    document.getElementById("myFormIndicationCauseAddMGHClearance").appendChild(causescode_input);
    
    var refnumber_input = document.createElement("INPUT");
    refnumber_input.setAttribute("type", "hidden");
    refnumber_input.setAttribute("id", textboxidtblcauses);
    refnumber_input.setAttribute("name", "refnumber_indication" + counterfortextindicationcauses);
    refnumber_input.setAttribute("class", "refnumber_indication" + counterfortextindicationcauses);
    refnumber_input.setAttribute("value", refnumber);
    document.getElementById("myFormIndicationCauseAddMGHClearance").appendChild(refnumber_input);
    
    var icdcodex_input = document.createElement("INPUT");
    icdcodex_input.setAttribute("type", "hidden");
    icdcodex_input.setAttribute("id", textboxidtblcauses);
    icdcodex_input.setAttribute("name", "icdcodex_indication" + counterfortextindicationcauses);
    icdcodex_input.setAttribute("class", "icdcodex_indication" + counterfortextindicationcauses);
    icdcodex_input.setAttribute("value", icdcodex);
    document.getElementById("myFormIndicationCauseAddMGHClearance").appendChild(icdcodex_input);
    
    counterfortextindicationcauses++;
}

function onChangePatientClassificationForMGHClearance()
{
    var pxclassification = $('#selectid_pxclassmgh').val();
    if(pxclassification === "GYNECOLOGY")
    {
        $('#selectid_adultpediamgh').prop('disabled', false);
        $('#selectid_adultpediamgh').selectpicker('val','Select');
        $('#selectid_adultpediamgh').selectpicker('refresh');
        
        $('#selectid_obgyneproceduremgh').prop('disabled', false);
        $('#selectid_obgyneproceduremgh').selectpicker('val','Select');
        $('#selectid_obgyneproceduremgh').selectpicker('refresh');
        
        $('#selectid_obgyneproceduremgherror').html("").addClass('d-none');
        $('#selectid_adultpediamgherror').html("").addClass('d-none');
        $('#selectid_pxclassmgherror').html("").addClass('d-none');

    }
    else if(pxclassification === "OBSTETRICS")
    {
        $('#selectid_adultpediamgh').prop('disabled', true);
        $('#selectid_adultpediamgh').selectpicker('val','Select');
        $('#selectid_adultpediamgh').selectpicker('refresh');
        
        $('#selectid_obgyneproceduremgh').prop('disabled', false);
        $('#selectid_obgyneproceduremgh').selectpicker('val','Select');
        $('#selectid_obgyneproceduremgh').selectpicker('refresh');
        
        $('#selectid_obgyneproceduremgherror').html("").addClass('d-none');
        $('#selectid_adultpediamgherror').html("").addClass('d-none');
        $('#selectid_pxclassmgherror').html("").addClass('d-none');
    }
    else if(pxclassification === "SURGICAL")
    {
        $('#selectid_adultpediamgh').prop('disabled', false);
        $('#selectid_adultpediamgh').selectpicker('val','Select');
        $('#selectid_adultpediamgh').selectpicker('refresh');
        
        $('#selectid_obgyneproceduremgh').prop('disabled', true);
        $('#selectid_obgyneproceduremgh').selectpicker('val','Select');
        $('#selectid_obgyneproceduremgh').selectpicker('refresh');
        
        $('#selectid_obgyneproceduremgherror').html("").addClass('d-none');
        $('#selectid_adultpediamgherror').html("").addClass('d-none');
        $('#selectid_pxclassmgherror').html("").addClass('d-none');
    }
    else
    {
        $('#selectid_adultpediamgh').prop('disabled', true);
        $('#selectid_adultpediamgh').selectpicker('val','Select');
        $('#selectid_adultpediamgh').selectpicker('refresh');
        
        $('#selectid_obgyneproceduremgh').prop('disabled', true);
        $('#selectid_obgyneproceduremgh').selectpicker('val','Select');
        $('#selectid_obgyneproceduremgh').selectpicker('refresh');
        
        $('#selectid_obgyneproceduremgherror').html("").addClass('d-none');
        $('#selectid_adultpediamgherror').html("").addClass('d-none');
        $('#selectid_pxclassmgherror').html("").addClass('d-none');
    }
}

function showDiagnosisManagementModalForAdmissionInsert()
{
    $('#searchdiagnosismodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');

    $("#diagnosis-masterlist-div").removeClass('d-none');
    $("#diagnosismodalfooter").removeClass('d-none');
}

function hideDiagnosisManagementModalForAdmission()
{
    $('#searchdiagnosismodal').modal("hide");
    $('body').css('overflow', 'auto');
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

        var date = moment();
        var datecode = date.format("MMDDYYYYhhmmss");
        var datesplit = datecode.split("");
        var shuffledate = shuffle(datesplit);
        var finalformat = shuffledate.join('');
        var causescode = finalformat + "CATGDIAG";
        var textboxidtblcausesadd = causescode + "-" + counterfortblecausesadmedt;

        confinecause_table = $('#causesof-confinement-table').DataTable();
        confinecause_table.row.add
        ([
            category,
            icddiag,
            group,
            refno,
            causescode,
            textboxidtblcausesadd,
            counterfortblecausesadmedt
        ]).order([6,'asc']).draw(false);

        hideDiagnosisManagementModalForAdmission();

        swal
        ({
            title: "Success!",
            text: "Record is successfully stored!",
            type: "success",
            allowOutsideClick: false
        });

        counterfortblecausesadmedt++;
        var causesalldata = category + "|" + icddiag + "|" + group + "|" + refno + "|" + causescode + "|" + textboxidtblcausesadd;    
        textBoxCreateForCausesMGHCLearance(causesalldata);
    });
}

function selectDiagnosis()
{
    var data;

    $('#diagnosis-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#diagnosis-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#diagnosis-masterlist-table').DataTable().row('.bg-grey').data();
        
        selectedDiagnosis = data;
    });
}

function selectDiagnosisForMGHClearance()
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
    var causescode = finalformat + "CATGDIAG";
    var textboxidtblcausesadd = causescode + "-" + counterfortblecausesadmedt;

    confinecause_table = $('#causesof-confinement-table').DataTable();
    confinecause_table.row.add
    ([
        category,
        icddiag,
        group,
        refno,
        causescode,
        textboxidtblcausesadd,
        counterfortblecausesadmedt
    ]).order([6,'asc']).draw(false);

    hideDiagnosisManagementModalForAdmission();

    swal
    ({
        title: "Success!",
        text: "Record is successfully stored!",
        type: "success",
        allowOutsideClick: false
    });

    counterfortblecausesadmedt++;
    var causesalldata = category + "|" + icddiag + "|" + group + "|" + refno + "|" + causescode + "|" + textboxidtblcausesadd;    
    textBoxCreateForCausesMGHCLearance(causesalldata);
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

function textBoxCreateForCausesMGHCLearance(causesalldata)
{
    var causessplit = causesalldata.split("|");
    var category = causessplit[0]; 
    var icddiag = causessplit[1]; 
    var group = causessplit[2]; 
    var refno = causessplit[3]; 
    var causescode = causessplit[4];
    var textboxidtblcauses = causessplit[5]; 
    
    var textboxidtblsplit = textboxidtblcauses.split("-");
    var textboxidtblnum = textboxidtblsplit[1];
    
    counterfortextcausesadmedt = parseInt(textboxidtblnum);

    var category_input = document.createElement("INPUT");
    category_input.setAttribute("type", "hidden");
    category_input.setAttribute("id", textboxidtblcauses);
    category_input.setAttribute("name", "category_causes" + counterfortextcausesadmedt);
    category_input.setAttribute("class", "category_causes" + counterfortextcausesadmedt);
    category_input.setAttribute("value", category);
    document.getElementById("myFormCausesOfConfineAddMGHClearance").appendChild(category_input);
    
    var icddiag_input = document.createElement("INPUT");
    icddiag_input.setAttribute("type", "hidden");
    icddiag_input.setAttribute("id", textboxidtblcauses);
    icddiag_input.setAttribute("name", "icddiag_causes" + counterfortextcausesadmedt);
    icddiag_input.setAttribute("class", "icddiag_causes" + counterfortextcausesadmedt);
    icddiag_input.setAttribute("value", icddiag);
    document.getElementById("myFormCausesOfConfineAddMGHClearance").appendChild(icddiag_input);
    
    var group_input = document.createElement("INPUT");
    group_input.setAttribute("type", "hidden");
    group_input.setAttribute("id", textboxidtblcauses);
    group_input.setAttribute("name", "group_causes" + counterfortextcausesadmedt);
    group_input.setAttribute("class", "group_causes" + counterfortextcausesadmedt);
    group_input.setAttribute("value", group);
    document.getElementById("myFormCausesOfConfineAddMGHClearance").appendChild(group_input);
    
    var refno_input = document.createElement("INPUT");
    refno_input.setAttribute("type", "hidden");
    refno_input.setAttribute("id", textboxidtblcauses);
    refno_input.setAttribute("name", "refno_causes" + counterfortextcausesadmedt);
    refno_input.setAttribute("class", "refno_causes" + counterfortextcausesadmedt);
    refno_input.setAttribute("value", refno);
    document.getElementById("myFormCausesOfConfineAddMGHClearance").appendChild(refno_input);
    
    var causescode_input = document.createElement("INPUT");
    causescode_input.setAttribute("type", "hidden");
    causescode_input.setAttribute("id", textboxidtblcauses);
    causescode_input.setAttribute("name", "causescode_causes" + counterfortextcausesadmedt);
    causescode_input.setAttribute("class", "causescode_causes" + counterfortextcausesadmedt);
    causescode_input.setAttribute("value", causescode);
    document.getElementById("myFormCausesOfConfineAddMGHClearance").appendChild(causescode_input);

    counterfortextcausesadmedt++;
}

function selectCausesOfConfinementOfMGHFormPage()
{
    var data;

    $('#causesof-confinement-table tbody').on('click', 'tr', function ()
    {
        $('#causesof-confinement-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#causesof-confinement-table').DataTable().row('.bg-grey').data();
        selectedCausesOfConfinementForMGHClearanceForm = data;
    });
}

function selectCausesOfConfinementForMGHClearanceFormPage()
{
    if (confinecause_table.rows( '.bg-grey' ).any())
    {   
        var textboxidtblcauses = selectedCausesOfConfinementForMGHClearanceForm[5];

        swal
        ({
            title: "Are you sure?",
            text: "You will not be able to recover\nthe selected diagnosis record!",
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

                confinecause_table.row('.bg-grey').remove().draw( false );

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
    else
    {
        swal
        ({
            title: "Notification",
            text: "Select diagnosis first to be deleted!",
            type: "warning"
        });
    }
}

function showSurgicalOutputModalForMGHClearance()
{
    $('#searchsurgicalmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');

    $("#diagnosis-masterlist-div").removeClass('d-none');
    $("#diagnosismodalfooter").removeClass('d-none');
}

function hideSurgicalOutputModalForMGHClearance()
{
    $('#searchsurgicalmodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function getAllSurgicalOutputProcedureAndAddItToTheTable()
{
    surgical_table = $('#surgical-output-masterlist-table').DataTable
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
                    url: BASE_URL + 'MGHclearance/DisplaySurgicalOutput',
                    type: 'POST'
                },

        createdRow: function (row, data, dataIndex)
        {

        },

        initComplete: function (settings, json)
        {

        }
    });

    surgical_table.on('dblclick', 'tr', function ()
    {
        var data = surgical_table.row(this).data();
        var category = data[1];
        var refnumbr = data[4];

        hideSurgicalOutputModalForMGHClearance();
        
        $('#textareaid_surgprocedremgh').val(category + " - " + refnumbr);
    });
}

function selectSurgicalOutput()
{
    var data;

    $('#surgical-output-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#surgical-output-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#surgical-output-masterlist-table').DataTable().row('.bg-grey').data();
        
        selectedSurgicalOutputProcedureForMGHClearanceForm = data;
    });
}

function deleteSelectedSurgicalOutputFromTextarea()
{
    if($('#textareaid_surgprocedremgh').val() === "")
    {
        swal
        ({
            title: "Notification",
            text: "Select surgical output first to be deleted!",
            type: "warning"
        });
    }
    else
    {
        swal
        ({
            title: "Reminder",
            text: "Deletion of data if not cleared has no actual effect\nin patient record. To apply deletion kindly proceed\nwith patient clearance button.",
            type: "info",
            showCancelButton: false,
            confirmButtonText: "OK!",
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
                    text: "Data is successfully deleted from text area!",
                    type: "success",
                    allowOutsideClick: false
                });
                
                $('#textareaid_surgprocedremgh').val("");
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    }
}

function selectSurgicalOutputProcedureForMGHClearanceForm()
{
    var category = selectedSurgicalOutputProcedureForMGHClearanceForm[1];
    var refnumbr = selectedSurgicalOutputProcedureForMGHClearanceForm[4];

    hideSurgicalOutputModalForMGHClearance();

    $('#textareaid_surgprocedremgh').val(category + " - " + refnumbr);
}


function showSurgicalSterilizationModalForMGHClearance()
{
    $('#searchsterilizationmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');

    $("#diagnosis-masterlist-div").removeClass('d-none');
    $("#diagnosismodalfooter").removeClass('d-none');
}

function hideSurgicalSterilizationModalForMGHClearance()
{
    $('#searchsterilizationmodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function getAllSterilizationProcedureAndAddItToTheTable()
{
    sterilization_table = $('#surgical-sterilization-masterlist-table').DataTable
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
            url: BASE_URL + 'MGHclearance/DisplaySterilizationProcedure',
            type: 'POST'
        },

        createdRow: function (row, data, dataIndex)
        {

        },

        initComplete: function (settings, json)
        {

        }
    });

    sterilization_table.on('dblclick', 'tr', function ()
    {
        var data = sterilization_table.row(this).data();
        var category = data[1];
        var refnumbr = data[3];

        hideSurgicalSterilizationModalForMGHClearance();
        
        $('#textareaid_sterilizationmgh').val(category + " - " + refnumbr);
    });
}

function selectSterilizationProcedure()
{
    var data;

    $('#surgical-sterilization-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#surgical-sterilization-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#surgical-sterilization-masterlist-table').DataTable().row('.bg-grey').data();
        
        selectedSterilizationProcedureForMGHClearanceForm = data;
    });
}

function deleteSelectedSterilizationDataFromTextarea()
{
    if($('#textareaid_sterilizationmgh').val() === "")
    {
        swal
        ({
            title: "Notification",
            text: "Select sterilization procedure first to be deleted!",
            type: "warning"
        });
    }
    else
    {
        swal
        ({
            title: "Reminder",
            text: "Deletion of data if not cleared has no actual effect\nin patient record. To apply deletion kindly proceed\nwith patient clearance button.",
            type: "info",
            showCancelButton: false,
            confirmButtonText: "OK!",
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
                    text: "Data is successfully deleted from text area!",
                    type: "success",
                    allowOutsideClick: false
                });
                
                $('#textareaid_sterilizationmgh').val("");
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    }
}

function selectSterilizationProcedureForMGHClearanceForm()
{
    var category = selectedSterilizationProcedureForMGHClearanceForm[1];
    var refnumbr = selectedSterilizationProcedureForMGHClearanceForm[3];

    hideSurgicalSterilizationModalForMGHClearance();

    $('#textareaid_surgprocedremgh').val(category + " - " + refnumbr);
}

function showFinalDiagnosisModalForMGHClearance()
{
    $('#searchfinaldiagmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');

}

function hideFinalDiagnosisModalForMGHClearance()
{
    $('#searchfinaldiagmodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function getAllFinalDiagnosisAndAddItToTheTable()
{
    finaldiag_table = $('#final-diagnosis-masterlist-table').DataTable
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

    finaldiag_table.on('dblclick', 'tr', function ()
    {
        var data = finaldiag_table.row(this).data();
        var category = data[1];
        var icddiag = data[2];
        var group = data[3];
        var refno = data[4];

        var date = moment();
        var datecode = date.format("MMDDYYYYhhmmss");
        var datesplit = datecode.split("");
        var shuffledate = shuffle(datesplit);
        var finalformat = shuffledate.join('');
        var causescode = finalformat + "FNLDIAG";
        var textboxidtblcausesadd = causescode + "-" + counterfortblecategfinaldiagmgh;

        finaldiagnose_table = $('#categorized-final-diagnosis-table').DataTable();
        finaldiagnose_table.row.add
        ([
            category,
            icddiag,
            group,
            refno,
            causescode,
            textboxidtblcausesadd,
            counterfortblecategfinaldiagmgh
        ]).order([6,'asc']).draw(false);

        hideFinalDiagnosisModalForMGHClearance();

        swal
        ({
            title: "Success!",
            text: "Record is successfully stored!",
            type: "success",
            allowOutsideClick: false
        });

        counterfortblecategfinaldiagmgh++;
        
        var categfinaldiagalldata = category + "|" + icddiag + "|" + group + "|" + refno + "|" + causescode + "|" + textboxidtblcausesadd;    
        textBoxCreateForCategFinalDiagMGHCLearance(categfinaldiagalldata);
    });
}

function selectDiagnosisForFinalDiag()
{
    var data;

    $('#final-diagnosis-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#final-diagnosis-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#final-diagnosis-masterlist-table').DataTable().row('.bg-grey').data();
        
        selectedDiagnosisOfFinalDiagForMGHClearanceForm = data;
    });
}

function selectDiagnosisForFinalDiagnosis()
{
    var category = selectedDiagnosisOfFinalDiagForMGHClearanceForm[1];
    var icddiag = selectedDiagnosisOfFinalDiagForMGHClearanceForm[2];
    var group = selectedDiagnosisOfFinalDiagForMGHClearanceForm[3];
    var refno = selectedDiagnosisOfFinalDiagForMGHClearanceForm[4];

    var date = moment();
    var datecode = date.format("MMDDYYYYhhmmss");
    var datesplit = datecode.split("");
    var shuffledate = shuffle(datesplit);
    var finalformat = shuffledate.join('');
    var causescode = finalformat + "FNLDIAG";
    var textboxidtblcausesadd = causescode + "-" + counterfortblecategfinaldiagmgh;

    finaldiagnose_table = $('#categorized-final-diagnosis-table').DataTable();
    finaldiagnose_table.row.add
    ([
        category,
        icddiag,
        group,
        refno,
        causescode,
        textboxidtblcausesadd,
        counterfortblecategfinaldiagmgh
    ]).order([6,'asc']).draw(false);

    hideFinalDiagnosisModalForMGHClearance();

    swal
    ({
        title: "Success!",
        text: "Record is successfully stored!",
        type: "success",
        allowOutsideClick: false
    });

    counterfortblecategfinaldiagmgh++;

    var categfinaldiagalldata = category + "|" + icddiag + "|" + group + "|" + refno + "|" + causescode + "|" + textboxidtblcausesadd;    
    textBoxCreateForCategFinalDiagMGHCLearance(categfinaldiagalldata);
}

function selectFinalDiagnosis()
{
    var data;

    $('#categorized-final-diagnosis-table tbody').on('click', 'tr', function ()
    {
        $('#categorized-final-diagnosis-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#categorized-final-diagnosis-table').DataTable().row('.bg-grey').data();
        
        selectedFinalDiagnosisForMGHClearanceForm = data;
    });
}

function deleteSelectedCategFinalDiagnosisDataFromTextarea()
{
    if (finaldiagnose_table.rows( '.bg-grey' ).any())
    {   
        var textboxidtblcauses = selectedFinalDiagnosisForMGHClearanceForm[5];

        swal
        ({
            title: "Are you sure?",
            text: "You will not be able to recover\nthe selected diagnosis record!",
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

                finaldiagnose_table.row('.bg-grey').remove().draw( false );

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
    else
    {
        swal
        ({
            title: "Notification",
            text: "Select diagnosis first to be deleted!",
            type: "warning"
        });
    }
}

//function selectSterilizationProcedureForMGHClearanceForm()
//{
//    var category = selectedSterilizationProcedureForMGHClearanceForm[1];
//    var refnumbr = selectedSterilizationProcedureForMGHClearanceForm[3];
//
//    hideSurgicalSterilizationModalForMGHClearance();
//
//    $('#textareaid_surgprocedremgh').val(category + " - " + refnumbr);
//}

function textBoxCreateForCategFinalDiagMGHCLearance(categfinaldiagalldata)
{
    var causessplit = categfinaldiagalldata.split("|");
    var category = causessplit[0]; 
    var icddiag = causessplit[1]; 
    var group = causessplit[2]; 
    var refno = causessplit[3]; 
    var causescode = causessplit[4];
    var textboxidtblcauses = causessplit[5]; 
    
    var textboxidtblsplit = textboxidtblcauses.split("-");
    var textboxidtblnum = textboxidtblsplit[1];
    
    counterfortextcategfinaldiagmgh = parseInt(textboxidtblnum);

    var category_input = document.createElement("INPUT");
    category_input.setAttribute("type", "hidden");
    category_input.setAttribute("id", textboxidtblcauses);
    category_input.setAttribute("name", "category_finaldiag" + counterfortextcategfinaldiagmgh);
    category_input.setAttribute("class", "category_finaldiag" + counterfortextcategfinaldiagmgh);
    category_input.setAttribute("value", category);
    document.getElementById("myFormFinalDiagnosisxAddMGHClearance").appendChild(category_input);
    
    var icddiag_input = document.createElement("INPUT");
    icddiag_input.setAttribute("type", "hidden");
    icddiag_input.setAttribute("id", textboxidtblcauses);
    icddiag_input.setAttribute("name", "icddiag_finaldiag" + counterfortextcategfinaldiagmgh);
    icddiag_input.setAttribute("class", "icddiag_finaldiag" + counterfortextcategfinaldiagmgh);
    icddiag_input.setAttribute("value", icddiag);
    document.getElementById("myFormFinalDiagnosisxAddMGHClearance").appendChild(icddiag_input);
    
    var group_input = document.createElement("INPUT");
    group_input.setAttribute("type", "hidden");
    group_input.setAttribute("id", textboxidtblcauses);
    group_input.setAttribute("name", "group_finaldiag" + counterfortextcategfinaldiagmgh);
    group_input.setAttribute("class", "group_finaldiag" + counterfortextcategfinaldiagmgh);
    group_input.setAttribute("value", group);
    document.getElementById("myFormFinalDiagnosisxAddMGHClearance").appendChild(group_input);
    
    var refno_input = document.createElement("INPUT");
    refno_input.setAttribute("type", "hidden");
    refno_input.setAttribute("id", textboxidtblcauses);
    refno_input.setAttribute("name", "refno_finaldiag" + counterfortextcategfinaldiagmgh);
    refno_input.setAttribute("class", "refno_finaldiag" + counterfortextcategfinaldiagmgh);
    refno_input.setAttribute("value", refno);
    document.getElementById("myFormFinalDiagnosisxAddMGHClearance").appendChild(refno_input);
    
    var causescode_input = document.createElement("INPUT");
    causescode_input.setAttribute("type", "hidden");
    causescode_input.setAttribute("id", textboxidtblcauses);
    causescode_input.setAttribute("name", "causescode_finaldiag" + counterfortextcategfinaldiagmgh);
    causescode_input.setAttribute("class", "causescode_finaldiag" + counterfortextcategfinaldiagmgh);
    causescode_input.setAttribute("value", causescode);
    document.getElementById("myFormFinalDiagnosisxAddMGHClearance").appendChild(causescode_input);
    
    counterfortextcategfinaldiagmgh++;
}


function onClickShowNotification() 
{
    var allowDismiss = true;
    var placementFrom = 'top';
    var placementAlign = 'center';
    var animateEnter = 'animated fadeIn';
    var animateExit = 'animated fadeOut';
    var colorName = 'bg-red';

    $.notify
    (
        {
            message: "Need to Select Inpatient First to enable contents!"
        },
        {
            type: colorName,
            allow_dismiss: allowDismiss,
            newest_on_top: true,
            timer: 1000,
            placement: 
            {
                from: placementFrom,
                align: placementAlign
            },
            animate: 
            {
                enter: animateEnter,
                exit: animateExit
            },
            template: 
            '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">Ã—</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        }
    );
}

function clearAllFormElementsInTheMGHClearancePage()
{
    swal
    ({
        title: "Option Notice!",
        text: "Would you like to reset form elements?",
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
            $('#inputid_accountnomgh').val("");
            $('#inputid_patientnamemgh').html("");
            $('#inputid_roomnamemgh').html("");
            $('#inputid_admissionmgh').html("");
            $('#inputid_phicmgh').html("");
            $('#inputid_dischargedmgh').html("");
            $('#inputid_mobilenomgh').val("");
            $('#AdmissionLinkNavItem').tab('show');
            $('#textareaid_reasonadmmgh').val("");
            $('#textareaid_diagnoadmmgh').val("");
            $('#selectid_pxclassmgh').selectpicker("val","Select");
            $('#selectid_adultpediamgh').selectpicker("val","Select");
            $('#selectid_obgyneproceduremgh').selectpicker("val","Select");
            $('#textareaid_surgprocedremgh').val("");
            $('#textareaid_sterilizationmgh').val("");
            $('#textareaid_finaldischadiagnosismgh').val("");
            $('#chckboxid_vapmgh').prop("checked",false);
            $('#chckboxid_bsimgh').prop("checked",false);
            $('#chckboxid_utimgh').prop("checked",false);
            $('#chckboxid_oth1mgh').prop("checked",false);
            $('#chckboxid_ssimgh').prop("checked",false);
            $('#chckboxid_oth2mgh').prop("checked",false);
            $('#chckboxid_emdepmgh').prop("checked",false);
            $('#hidtextboxid_vapmgh').val("0");
            $('#hidtextboxid_bsimgh').val("0");
            $('#hidtextboxid_utimgh').val("0");
            $('#hidtextboxid_oth1mgh').val("0");
            $('#hidtextboxid_ssimgh').val("0");
            $('#hidtextboxid_oth2mgh').val("0");
            $('#hidtextboxid_emdepmgh').val("0");
            $('#numboxid_vapmgh').val("");
            $('#numboxid_bsimgh').val("");
            $('#numboxid_utimgh').val("");
            $('#numboxid_oth1mgh').val("");
            $('#numboxid_ssimgh').val("");
            $('#numboxid_oth2mgh').val("");
            $('#textboxid_oth1mgh').val("");
            $('#textboxid_oth2mgh').val("");

            $('#selectid_pxstatmgh').selectpicker("val","Select");

            ceasarianindication_table.clear().draw();
            confinecause_table.clear().draw();
            finaldiagnose_table.clear().draw();
            ceasarianindication_table.clear().draw();
            procedurecases_table.clear().draw();
            pxaccount_table.clear().draw();

            $('#myFormFinalDiagnosisxAddMGHClearance').empty();
            $('#myFormIndicationCauseAddMGHClearance').empty();
            $('#myFormCausesOfConfineAddMGHClearance').empty();

            var todaydate = moment().format("YYYY-MM-DD");
            var todaytime = moment().format("hh:mm:ss");

            $('#inputid_expireddatemgh').val(todaydate);
            $('#inputid_expiredtimemgh').val(todaytime);

            $('#inputid_expireddatemgh').bootstrapMaterialDatePicker
            ({
                format: 'YYYY-MM-DD',
                clearButton: true,
                time: false,
                weekStart: 1,
                switchOnClick : true
            }); 

            $('#inputid_expiredtimemgh').bootstrapMaterialDatePicker
            ({
                date: false,
                format: 'HH:mm:ss',
                switchOnClick : true,
                shortTime: true
            });

            $('#selectid_typeofdeathmgh').selectpicker("val","Select");
            $('#selectid_obgynmaternalmgh').selectpicker("val","Select");

            $('#selectid_gotoreqmgh').empty();
            $('#selectid_gotoreqmgh').append('<option value="Select">' + "Select from List" + '</option>');
            $('#selectid_gotoreqmgh').selectpicker("val","Select");
            $('#selectid_gotoreqmgh').selectpicker("refresh");

            $('#radioid_normaltypeadm').prop('checked',true);
            $('#radioid_emergencytypeadm').prop('checked',false);
            $('#chckboxid_obgynmgh').prop('checked',false);
            $('#hidtextbox_obgynmaternalmgh').val("0");
            $('#textboxid_transreftohcimgh').val("");
            $('#textareaid_reasonrefermgh').val("");
            $('#inputid_admitdatemgh').val("");
            $('#inputid_admittimemgh').val("");

            $("#expireddivmgh").addClass('d-none');
            $("#transfereddivmgh").addClass('d-none');
            $("#pxstatothersdivmgh").removeClass('d-none'); 
        //    $("#revokepatientbutton").addClass('d-none');

            disableMGHClearanceTabsContents();
            
            $('#revokepatientbutton').addClass('d-none');
            $('#clearPatientButton').prop('disabled',false);
            
            hideGeneralGuidelinesOfAdmissionTabMGHClearance();
        }
    });
}

function setToDefaultMGHClearanceForm()
{
    $('#inputid_accountnomgh').val("");
    $('#inputid_patientnamemgh').html("");
    $('#inputid_roomnamemgh').html("");
    $('#inputid_admissionmgh').html("");
    $('#inputid_phicmgh').html("");
    $('#inputid_dischargedmgh').html("");
    $('#inputid_mobilenomgh').val("");
    $('#AdmissionLinkNavItem').tab('show');
    $('#textareaid_reasonadmmgh').val("");
    $('#textareaid_diagnoadmmgh').val("");
    $('#selectid_pxclassmgh').selectpicker("val","Select");
    $('#selectid_adultpediamgh').selectpicker("val","Select");
    $('#selectid_obgyneproceduremgh').selectpicker("val","Select");
    $('#textareaid_surgprocedremgh').val("");
    $('#textareaid_sterilizationmgh').val("");
    $('#textareaid_finaldischadiagnosismgh').val("");
    $('#chckboxid_vapmgh').prop("checked",false);
    $('#chckboxid_bsimgh').prop("checked",false);
    $('#chckboxid_utimgh').prop("checked",false);
    $('#chckboxid_oth1mgh').prop("checked",false);
    $('#chckboxid_ssimgh').prop("checked",false);
    $('#chckboxid_oth2mgh').prop("checked",false);
    $('#chckboxid_emdepmgh').prop("checked",false);
    $('#hidtextboxid_vapmgh').val("0");
    $('#hidtextboxid_bsimgh').val("0");
    $('#hidtextboxid_utimgh').val("0");
    $('#hidtextboxid_oth1mgh').val("0");
    $('#hidtextboxid_ssimgh').val("0");
    $('#hidtextboxid_oth2mgh').val("0");
    $('#hidtextboxid_emdepmgh').val("0");
    $('#numboxid_vapmgh').val("");
    $('#numboxid_bsimgh').val("");
    $('#numboxid_utimgh').val("");
    $('#numboxid_oth1mgh').val("");
    $('#numboxid_ssimgh').val("");
    $('#numboxid_oth2mgh').val("");
    $('#textboxid_oth1mgh').val("");
    $('#textboxid_oth2mgh').val("");

    $('#selectid_pxstatmgh').selectpicker("val","Select");

    ceasarianindication_table.clear().draw();
    confinecause_table.clear().draw();
    finaldiagnose_table.clear().draw();
    ceasarianindication_table.clear().draw();
    procedurecases_table.clear().draw();
    pxaccount_table.clear().draw();

    $('#myFormFinalDiagnosisxAddMGHClearance').empty();
    $('#myFormIndicationCauseAddMGHClearance').empty();
    $('#myFormCausesOfConfineAddMGHClearance').empty();

    var todaydate = moment().format("YYYY-MM-DD");
    var todaytime = moment().format("hh:mm:ss");

    $('#inputid_expireddatemgh').val(todaydate);
    $('#inputid_expiredtimemgh').val(todaytime);

    $('#inputid_expireddatemgh').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    }); 

    $('#inputid_expiredtimemgh').bootstrapMaterialDatePicker
    ({
        date: false,
        format: 'HH:mm:ss',
        switchOnClick : true,
        shortTime: true
    });

    $('#selectid_typeofdeathmgh').selectpicker("val","Select");
    $('#selectid_obgynmaternalmgh').selectpicker("val","Select");

    $('#selectid_gotoreqmgh').empty();
    $('#selectid_gotoreqmgh').append('<option value="Select">' + "Select from List" + '</option>');
    $('#selectid_gotoreqmgh').selectpicker("val","Select");
    $('#selectid_gotoreqmgh').selectpicker("refresh");

    $('#radioid_normaltypeadm').prop('checked',true);
    $('#radioid_emergencytypeadm').prop('checked',false);
    $('#chckboxid_obgynmgh').prop('checked',false);
    $('#hidtextbox_obgynmaternalmgh').val("0");
    $('#textboxid_transreftohcimgh').val("");
    $('#textareaid_reasonrefermgh').val("");
    $('#inputid_admitdatemgh').val("");
    $('#inputid_admittimemgh').val("");

    $("#expireddivmgh").addClass('d-none');
    $("#transfereddivmgh").addClass('d-none');
    $("#pxstatothersdivmgh").removeClass('d-none'); 
//    $("#revokepatientbutton").addClass('d-none');

    disableMGHClearanceTabsContents();
}

function validateMGHClearanceForm()
{
    $('#clearPatientButton').attr('disabled','disabled');
    
    var accountnumber = $("#inputid_accountnomgh").val();
    var patientstatus = $("#selectid_pxstatmgh").val();
    var finaldiscdiag = $("#textareaid_finaldischadiagnosismgh").val();
    var admitdiagnose = $("#textareaid_diagnoadmmgh").val();
    var reasonofrefer = $("#textareaid_reasonrefermgh").val();
    var transreftohci = $("#textboxid_transreftohcimgh").val();

    var error = 0;
    
    if(accountnumber === "")
    {
        $("#patientacctnomgherror").removeClass('d-none').html('Field is required! ******');
        $("#inputid_accountnomgh").css('border','1px solid red');
        error++;
        
        swal
        ({
            title: "Validation Notice!",
            text: "Need to select inpatient first upon discharged!",
            type: "warning",
            confirmButtonText: "OK"
        },
        function (isConfirm)
        {
            if (isConfirm)
            {
                $('html, body').animate
                ({
                    scrollTop: $("#patientaccountnodivid").offset().top
                }, 300);
            }
        });
        
        $('#clearPatientButton').removeAttr('disabled');
    }
    else
    {
        $('#clearPatientButton').attr('disabled','disabled');
        
        $("#patientacctnomgherror").addClass('d-none').html('');
        $("#inputid_accountnomgh").css('border','');
        
        if(patientstatus === "Select")
        {
            $("#selectid_pxstatmgherr").removeClass('d-none').html('Field is required! ****');
            $("#selectid_pxstatmgh").css('border','1px solid red');
            error++;

            swal
            ({
                title: "Validation Notice!",
                text: "You need to have DISPOSITION type upon discharged!",
                type: "warning",
                confirmButtonText: "OK"
            },
            function (isConfirm)
            {
                if (isConfirm)
                {
                    $("#DispositionLinkNavItem").tab('show');

                    $('html, body').animate
                    ({
                        scrollTop: $("#patientstatdispodivid").offset().top
                    }, 300);
                }
            });
            
            $('#clearPatientButton').removeAttr('disabled');
        }
        else
        {
            $('#clearPatientButton').attr('disabled','disabled');
            
            $("#selectid_pxstatmgherr").addClass('d-none').html('');
            $("#selectid_pxstatmgh").css('border','');
            
            if(patientstatus === "Transferred/Referred" && transreftohci === "")
            {
                $("#textboxid_transreftohcimgherr").removeClass('d-none').html('Field is required! ****');
                $("#textboxid_transreftohcimgh").css('border','1px solid red');
                error++;
                
                swal
                ({
                    title: "Validation Notice!",
                    text: "Please supply HCI name where to transfer\nbefore you can proceed!",
                    type: "warning",
                    confirmButtonText: "OK"
                },
                function (isConfirm)
                {
                    if (isConfirm)
                    {
                        $("#DispositionLinkNavItem").tab('show');

                        $('html, body').animate
                        ({
                            scrollTop: $("#patientstatdispodivid").offset().top
                        }, 300);
                    }
                });
                
                $('#clearPatientButton').removeAttr('disabled');
            }
            else
            {
                $('#clearPatientButton').attr('disabled','disabled');
                
                $("#textboxid_transreftohcimgherr").addClass('d-none').html('');
                $("#textboxid_transreftohcimgh").css('border','');
                
                if(patientstatus === "Transferred/Referred" && reasonofrefer === "")
                {
                    $("#textareaid_reasonrefermgherr").removeClass('d-none').html('Field is required! ****');
                    $("#textareaid_reasonrefermgh").css('border','1px solid red');
                    error++;

                    swal
                    ({
                        title: "Validation Notice!",
                        text: "Please supply reason of transfer before you can proceed!",
                        type: "warning",
                        confirmButtonText: "OK"
                    },
                    function (isConfirm)
                    {
                        if (isConfirm)
                        {
                            $("#DispositionLinkNavItem").tab('show');

                            $('html, body').animate
                            ({
                                scrollTop: $("#patientstatdispodivid").offset().top
                            }, 300);
                        }
                    });
                    
                    $('#clearPatientButton').removeAttr('disabled');                    
                }
                else
                {
                    $('#clearPatientButton').attr('disabled','disabled');
                    
                    $("#textareaid_reasonrefermgherr").addClass('d-none').html('');
                    $("#textareaid_reasonrefermgh").css('border','');
                    
                    if(finaldiscdiag === "")
                    {
                        $("#textareaid_finaldischadiagnosismgherr").removeClass('d-none').html('Field is required! ****');
                        $("#textareaid_finaldischadiagnosismgh").css('border','1px solid red');
                        error++;

                        swal
                        ({
                            title: "Validation Notice!",
                            text: "Sorry, you are required to fillup properly your\nFinal Diagnosis data before proceeding!",
                            type: "warning",
                            confirmButtonText: "OK"
                        },
                        function (isConfirm)
                        {
                            if (isConfirm)
                            {
                                $("#DiagnosisLinkNavItem").tab('show');

                                $('html, body').animate
                                ({
                                    scrollTop: $("#diagnosisscrolldivid").offset().top
                                }, 300);
                            }
                        });
                        
                        $('#clearPatientButton').removeAttr('disabled');
                    }
                    else
                    {
                        $('#clearPatientButton').attr('disabled','disabled');
                        
                        $("#textareaid_finaldischadiagnosismgherr").addClass('d-none').html('');
                        $("#textareaid_finaldischadiagnosismgh").css('border','');

                        if(admitdiagnose === "")
                        {
                            $("#textareaid_diagnoadmmgherr").removeClass('d-none').html('Field is required! ****');
                            $("#textareaid_diagnoadmmgh").css('border','1px solid red');
                            error++;

                            swal
                            ({
                                title: "Validation Notice!",
                                text: "Sorry, you are required to fillup properly your\nAdmitting Diagnosis data before proceeding!",
                                type: "warning",
                                confirmButtonText: "OK"
                            },
                            function (isConfirm)
                            {
                                if (isConfirm)
                                {
                                    $("#AdmissionLinkNavItem").tab('show');

                                    $('html, body').animate
                                    ({
                                        scrollTop: $("#admissionscrollvalidationdivid").offset().top
                                    }, 300);
                                }
                            });
                            
                            $('#clearPatientButton').removeAttr('disabled');
                        }
                        else
                        {
                            $('#clearPatientButton').attr('disabled','disabled');
                            
                            $("#textareaid_diagnoadmmgherr").addClass('d-none').html('');
                            $("#textareaid_diagnoadmmgh").css('border','');

                            clearPatient(accountnumber);
                        }
                    }
                }
            }
        }
    }
}

function showHCIListingModalForMGHClearance()
{
    $('#searchhcilistingmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
}

function hideHCIListingModalForMGHClearance()
{
    $('#searchhcilistingmodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function getAllHealthCareInstitutionAndAddItToTheTable()
{
    hcilisting_table = $('#hcilisting-masterlist-table').DataTable
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
                    url: BASE_URL + 'MGHclearance/DisplayHCIListing',
                    type: 'POST'
                },

        createdRow: function (row, data, dataIndex)
        {

        },

        initComplete: function (settings, json)
        {

        }
    });

    hcilisting_table.on('dblclick', 'tr', function ()
    {
        var data = hcilisting_table.row(this).data();
        var hospitalname = data[1];
        var hospitalcode = data[2];
        hideHCIListingModalForMGHClearance();
        $('#textboxid_transreftohcimgh').val(hospitalname.toUpperCase() + "-" + hospitalcode.toUpperCase());
    });
}

function selectHealthCareInstitution()
{
    var data;

    $('#hcilisting-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#hcilisting-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#hcilisting-masterlist-table').DataTable().row('.bg-grey').data();
        
        selectedHealthCareInstitutionForMGHClearanceForm = data;
    });
}

function deleteSelectedHealthCareInstitutionDataFromTextbox()
{
    if($('#textboxid_transreftohcimgh').val() === "")
    {
        swal
        ({
            title: "Notification",
            text: "Select health care institution first to be deleted!",
            type: "warning"
        });
    }
    else
    {                
        $('#textboxid_transreftohcimgh').val("");
    }
}

function selectHealthCareInstitutionForMGHClearanceForm()
{
    var hospitalname = selectedHealthCareInstitutionForMGHClearanceForm[1];
    var hospitalcode = selectedHealthCareInstitutionForMGHClearanceForm[2];
    hideHCIListingModalForMGHClearance();
    $('#textboxid_transreftohcimgh').val(hospitalname.toUpperCase() + "-" + hospitalcode.toUpperCase());
}

function showReasonsOfReferralListingModalForMGHClearance()
{
    $('#searchreasonreferlistingmodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
}

function hideReasonsOfReferralListingModalForMGHClearance()
{
    $('#searchreasonreferlistingmodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function getAllReasonForReferralAndAddItToTheTable()
{
    referreason_table = $('#referreason-masterlist-table').DataTable
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
            url: BASE_URL + 'MGHclearance/DisplayReferralReason',
            type: 'POST'
        },

        createdRow: function (row, data, dataIndex)
        {

        },

        initComplete: function (settings, json)
        {

        }
    });

    referreason_table.on('dblclick', 'tr', function ()
    {
        var data = referreason_table.row(this).data();
        var refercommonreason = data[1];

        hideReasonsOfReferralListingModalForMGHClearance();
        
        $('#textareaid_reasonrefermgh').val(refercommonreason.toUpperCase());
    });
}

function selectCommonReferralReason()
{
    var data;

    $('#referreason-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#referreason-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#referreason-masterlist-table').DataTable().row('.bg-grey').data();
        
        selectedCommonReferralReasonForMGHClearanceForm = data;
    });
}

function deleteSelectedCommonReferralReasonDataFromTextbox()
{
    if($('#textareaid_reasonrefermgh').val() === "")
    {
        swal
        ({
            title: "Notification",
            text: "Select common referral reason first to be deleted!",
            type: "warning"
        });
    }
    else
    {                
        $('#textareaid_reasonrefermgh').val("");
    }
}

function selectCommonReferralReasonForMGHClearanceForm()
{
    var refercommonreason = selectedCommonReferralReasonForMGHClearanceForm[1];
    hideReasonsOfReferralListingModalForMGHClearance();
    $('#textareaid_reasonrefermgh').val(refercommonreason.toUpperCase());
}

function combineAndSplitCausesofConfinementDataTextboxes()
{
    var causesdata = '';
    for(var i=1; i<counterfortextcausesadmedt; i++)
    {
        causesdata += "?:" + $('.category_causes' + i).val() + "|" 
                           + $('.icddiag_causes' + i).val() + "|" 
                           + $('.group_causes' + i).val() + "|"
                           + $('.refno_causes' + i).val() + "|"
                           + $('.causescode_causes' + i).val();
    }

    $("#inputid_hiddencausesconf").text(causesdata);
    var myStr = $("#inputid_hiddencausesconf").text();

    var newStr = replaceAll(myStr, '?:undefined|undefined|undefined|undefined|undefined', '');
    var causesconfalldata = $("#inputid_causesconfdatamgh").val(newStr);
    var result = causesconfalldata.val().split(":");
    var finalcausesconfdata = cleanArray(result);
    
    $("#inputid_finalcausesconfdatamgh").val(finalcausesconfdata);
}

function combineAndSplitIndicationDiagnosisDataTextboxes()
{
    var indicationdata = '';
    for(var i=1; i<counterfortextindicationcauses; i++)
    {
        indicationdata += "?:" + $('.category_indication' + i).val() + "|" 
                               + $('.causescode_indication' + i).val() + "|" 
                               + $('.refnumber_indication' + i).val() + "|"
                               + $('.icdcodex_indication' + i).val();
    }

    $("#inputid_hiddenindication").text(indicationdata);
    var myStr = $("#inputid_hiddenindication").text();

    var newStr = replaceAll(myStr, '?:undefined|undefined|undefined|undefined', '');
    var indicationalldata = $("#inputid_indicationdatamgh").val(newStr);
    var result = indicationalldata.val().split(":");
    var finalindicationdata = cleanArray(result);
    
    $("#inputid_finalindicationdatamgh").val(finalindicationdata);
}

function combineAndSplitCategFinalDiagnosisDataTextboxes()
{
    var finaldiagdata = '';
    for(var i=1; i<counterfortextcausesadmedt; i++)
    {
        finaldiagdata += "?:" + $('.category_finaldiag' + i).val() + "|" 
                              + $('.icddiag_finaldiag' + i).val() + "|" 
                              + $('.group_finaldiag' + i).val() + "|"
                              + $('.refno_finaldiag' + i).val() + "|"
                              + $('.causescode_finaldiag' + i).val();
    }

    $("#inputid_hiddenfinaldiagn").text(finaldiagdata);
    var myStr = $("#inputid_hiddenfinaldiagn").text();

    var newStr = replaceAll(myStr, '?:undefined|undefined|undefined|undefined|undefined', '');
    var finaldiagalldata = $("#inputid_finaldiagndatamgh").val(newStr);
    var result = finaldiagalldata.val().split(":");
    var finalfinaldiagdata = cleanArray(result);
    
    $("#inputid_finalfinaldiagndatamgh").val(finalfinaldiagdata);
}

function clearPatient()
{
    $('#clearPatientButton').prop('disabled',false);
    
    combineAndSplitCausesofConfinementDataTextboxes();
    combineAndSplitIndicationDiagnosisDataTextboxes();
    combineAndSplitCategFinalDiagnosisDataTextboxes();

    var accountnomgh = $('#inputid_accountnomgh').val();
    var reasonadmmgh = $('#textareaid_reasonadmmgh').val();
    var diagnoadmmgh = $('#textareaid_diagnoadmmgh').val();
    var pxclassmgh = $('#selectid_pxclassmgh').val();
    var adultpediamgh = $('#selectid_adultpediamgh').val();
    var obgyneproceduremgh = $('#selectid_obgyneproceduremgh').val();
    var surgprocedremgh = $('#textareaid_surgprocedremgh').val();
    var sterilizationmgh = $('#textareaid_sterilizationmgh').val();
    var finaldischadiagnosismgh = $('#textareaid_finaldischadiagnosismgh').val();
    var hidtextboxid_vapmgh = $('#hidtextboxid_vapmgh').val();
    var numboxid_vapmgh = $('#numboxid_vapmgh').val();
    var hidtextboxid_bsimgh = $('#hidtextboxid_bsimgh').val();
    var numboxid_bsimgh = $('#numboxid_bsimgh').val();
    var hidtextboxid_utimgh = $('#hidtextboxid_utimgh').val();
    var numboxid_utimgh = $('#numboxid_utimgh').val();
    var hidtextboxid_oth1mgh = $('#hidtextboxid_oth1mgh').val();
    var numboxid_oth1mgh = $('#numboxid_oth1mgh').val();
    var textboxid_oth1mgh = $('#textboxid_oth1mgh').val();
    var hidtextboxid_ssimgh = $('#hidtextboxid_ssimgh').val();
    var numboxid_ssimgh = $('#numboxid_ssimgh').val();
    var hidtextboxid_oth2mgh = $('#hidtextboxid_oth2mgh').val();
    var numboxid_oth2mgh = $('#numboxid_oth2mgh').val();
    var textboxid_oth2mgh = $('#textboxid_oth2mgh').val();
    var pxstatdispo = $('#selectid_pxstatmgh').val();
    var emergencydept = $('#hidtextboxid_emdepmgh').val();
    var expireddatemgh = $('#inputid_expireddatemgh').val();
    var expiredtimemgh = $('#inputid_expiredtimemgh').val();
    var typeofdeathmgh = $('#selectid_typeofdeathmgh').val();
    var expired48hrs = $('#ifexpireddeathtime48hrs').val();
    var admitdatemgh = $('#inputid_admitdatemgh').val();
    var admittimemgh = $('#inputid_admittimemgh').val();
    var obgynmaternalhid = $('#hidtextbox_obgynmaternalmgh').val();
    var obgynmaternalsel = $('#selectid_obgynmaternalmgh').val();
    var transreftohcimgh = $('#textboxid_transreftohcimgh').val();
    var reasonrefermgh = $('#textareaid_reasonrefermgh').val();
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
        data: {casenox: accountnomgh},
        dataType: 'json'
    })
    .done(function (data)
    {
        if (data.status)
        {
            var birthday = data.inpatientlistdata['bday'];
            
            var fullname = data.inpatientlistdata['name'];
            var casecode = data.inpatientlistdata['casecode'];
            var gendersx = data.inpatientlistdata['sex'];
            var fullagex = CalculateAge(birthday);
            var phicmmbr = data.inpatientlistdata['phicmembr'] + ": " + data.inpatientlistdata['phiccode'];
            var rateshcm = data.inpatientlistdata['rmrateschm'];
            var roomnumb = data.inpatientlistdata['roomno'];
            var docsname = data.inpatientlistdata['doctorname'];
            var cityaddr = data.inpatientlistdata['cityadd'];
            var admdatex = data.inpatientlistdata['admitdate'] + " " + data.inpatientlistdata['admittime'];
            var pxtypexs = data.inpatientlistdata['pxtype'];
            var pincodex = data.inpatientlistdata['pincode'];
            var pinumber = data.inpatientlistdata['PIN'];

            $.ajax
            ({
                type: 'POST',
                data:
                {
                    accountnomgh: accountnomgh,
                    reasonadmmgh: reasonadmmgh, 
                    diagnoadmmgh: diagnoadmmgh,
                    pxclassmgh: pxclassmgh, 
                    adultpediamgh: adultpediamgh, 
                    obgyneproceduremgh: obgyneproceduremgh, 
                    surgprocedremgh: surgprocedremgh,
                    sterilizationmgh: sterilizationmgh,
                    finaldischadiagnosismgh: finaldischadiagnosismgh,
                    hidtextboxid_vapmgh: hidtextboxid_vapmgh, 
                    numboxid_vapmgh: numboxid_vapmgh,
                    hidtextboxid_bsimgh: hidtextboxid_bsimgh, 
                    numboxid_bsimgh: numboxid_bsimgh, 
                    hidtextboxid_utimgh: hidtextboxid_utimgh, 
                    numboxid_utimgh: numboxid_utimgh,
                    hidtextboxid_oth1mgh: hidtextboxid_oth1mgh,
                    numboxid_oth1mgh: numboxid_oth1mgh,
                    textboxid_oth1mgh: textboxid_oth1mgh, 
                    hidtextboxid_ssimgh: hidtextboxid_ssimgh,
                    numboxid_ssimgh: numboxid_ssimgh, 
                    hidtextboxid_oth2mgh: hidtextboxid_oth2mgh, 
                    numboxid_oth2mgh: numboxid_oth2mgh,
                    textboxid_oth2mgh: textboxid_oth2mgh,
                    pxstatdispo: pxstatdispo,
                    emergencydept: emergencydept,
                    expireddatemgh: expireddatemgh, 
                    expiredtimemgh: expiredtimemgh,
                    typeofdeathmgh: typeofdeathmgh, 
                    expired48hrs: expired48hrs, 
                    admitdatemgh: admitdatemgh,
                    admittimemgh: admittimemgh,
                    obgynmaternalhid: obgynmaternalhid,
                    obgynmaternalsel: obgynmaternalsel,
                    transreftohcimgh: transreftohcimgh,
                    reasonrefermgh: reasonrefermgh,
                    pincodex: pincodex,
                    pinumber: pinumber,
                    fullname: fullname,
                    casecode: casecode,
                    gendersx: gendersx,
                    fullagex: fullagex,
                    phicmmbr: phicmmbr,
                    rateshcm: rateshcm,
                    roomnumb: roomnumb,
                    docsname: docsname,
                    cityaddr: cityaddr,
                    admdatex: admdatex,
                    pxtypexs: pxtypexs,
                    causesconfdata: $("#inputid_finalcausesconfdatamgh").val(),
                    indicationdata: $("#inputid_finalindicationdatamgh").val(),
                    finaldiagndata: $("#inputid_finalfinaldiagndatamgh").val()
                },
                url: BASE_URL + 'MGHclearance/ClearPatient',
                dataType: 'json',
                success: function (result) 
                {
                    if (result.status === false)
                    {
                        checkFieldValidations(result.errors.pxstatdispo, 'selectid_pxstatmgherr', 'selectid_pxstatmgh');
                        checkFieldValidations(result.errors.finaldischa, 'textareaid_finaldischadiagnosismgherr', 'textareaid_finaldischadiagnosismgh');
                        checkFieldValidations(result.errors.diagnoadmgh, 'textareaid_diagnoadmmgherr', 'textareaid_diagnoadmmgh');
                    }
                    else
                    {
                        var pxfullname = $('#inputid_patientnamemgh').html();

                        setToDefaultMGHClearanceForm();

                        setTimeout(function ()
                        {
                            swal
                            ({
                                title: "Success!",
                                text: "Patient " + pxfullname + "\nwas successfully cleared by\nNurse station for discharged!",
                                type: "success",
                                allowOutsideClick: false,
                                confirmButtonText: "OK"
                            },
                            function (isConfirm)
                            {
                                if (isConfirm)
                                {
        //                            $('#searchdoctormodal').modal
        //                            ({
        //                                show: true,
        //                                backdrop: 'static',
        //                                keyboard: false
        //                            });
        //                            
        //                            doctors_table.DataTable().ajax.reload();
                                }
                            });
                        }, 1000);
                    }
                }
            });
        }
    });

    
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

function onChangeLessThanRadio()
{
    if($('#radioid_lessthan').is(':checked')) 
    { 
        $('#ifexpireddeathtime48hrs').val("< 48HRS");
    }
}

function onChangeMoreThanRadio()
{
    if($('#radioid_morethan').is(':checked')) 
    { 
        $('#ifexpireddeathtime48hrs').val(">= 48HRS");
    }
}

function onChangeOBGynCheckbox()
{
    var obgynmaternalmgh = $('#hidtextbox_obgynmaternalmgh').val();
    if(obgynmaternalmgh === "1")
    {
        $('#hidtextbox_obgynmaternalmgh').val("0");
    }
    else
    {
        $('#hidtextbox_obgynmaternalmgh').val("1");
    }
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

function revokePatientOnClick()
{
    var caseno = $("#inputid_accountnomgh").val();
    
    swal
    ({
        title: "Are you sure?",
        text: "Wanna Revoke patient issued clearance?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, revoke it!",
        cancelButtonText: "No",
        showLoaderOnConfirm: true,
        onOpen: function ()
        {
            swal.disableConfirmButton();
        }
    },
    function ()
    {
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "MGHclearance/revokePatientClearance",
            data: {casenox: caseno},
            dataType: 'json'
        })

        .done(function (data)
        {
            if (data.status)
            {
                swal
                ({
                    title: "Success!",
                    text: "Patient is successfully revoked!",
                    type: "success",
                    allowOutsideClick: false
                });
                
                $('#clearPatientButton').prop('disabled',false);
                $('#revokepatientbutton').addClass('d-none');
                
                setToDefaultMGHClearanceForm();
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    });
}

function viewPatientMiniProfile(caseno)
{
    alert("UNDER DEVELOPMENT!");
}