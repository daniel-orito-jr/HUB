var inpatient_table = null;
var confinecause_table = null;
var confinecause_table = null;
var procedurecases_table = null;
var ceasarianindication_table = null;
var previouslyselectedstation = "";
var previouslyselectedstatus = "";
var previouslyselectedpxtype = "";
var selectedInPatient;

$(function () 
{
    tabsHighlightForAdmissionDboard();
    selectInPatient();
    getCeasarianCaseIndicationDiagnosis();
    getDischargeMedicalProcedureCases();
    getCategorizedFinalDiagnosis();
    getcausesofconfinement();
});

function tabsHighlightForAdmissionDboard()
{
    $("#admissiondashboardsidetab").addClass("active");
    
    previouslyselectedstatus = "ADM";
    previouslyselectedstation = "ALL";
    previouslyselectedpxtype = "ALL";
    getAllInpatientAndAddItToTheTable();
}

function getAllInpatientAndAddItToTheTable()
{
    var status = previouslyselectedstatus;
    var station = previouslyselectedstation;
    var pxtype = previouslyselectedpxtype;
    
    inpatient_table = $('#inpatient-masterlist-table').DataTable
    ({
        sScrollY: "430px",
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
            url: BASE_URL + 'AdmissionDboard/GetAllInPatientList',
            type: 'POST',
            data: 
            {
                status: status,
                station: station,
                pxtype: pxtype
            },
            dataType: 'json'
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

function onChangeAdmittedStatusRadio()
{
    $('#hiddenboxid_patientstatrxc').val('0');
    previouslyselectedstatus = "";
    previouslyselectedstatus = "0";
    
    inpatient_table = $('#inpatient-masterlist-table').DataTable();
    inpatient_table.clear().destroy();
    
    getAllInpatientAndAddItToTheTable();
}

function onChangeDischargedStatusRadio()
{
    $('#hiddenboxid_patientstatrxc').val('1');
    previouslyselectedstatus = "";
    previouslyselectedstatus = "1";
    
    inpatient_table = $('#inpatient-masterlist-table').DataTable();
    inpatient_table.clear().destroy();
    
    getAllInpatientAndAddItToTheTable();
}

function onchangeViewInpatientOnlyCheckbox()
{
    var ipdindicator = $('#hiddenboxid_inpatientonly').val();
    previouslyselectedpxtype = "";
    
    if(ipdindicator === "0")
    {
        $('#hiddenboxid_inpatientonly').val("1");
        
        previouslyselectedpxtype = "IPD";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else
    {
        $('#hiddenboxid_inpatientonly').val("0");

        previouslyselectedpxtype = "ALL";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
}


function filterInpatientTableViaNurseStation()
{
    var nursestationselect = $('#selectid_nursestationmgh').val();
    previouslyselectedstation = "";
    
    if(nursestationselect === "3A STATION")
    {
        previouslyselectedstation = "3A Station";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else if(nursestationselect === "3B STATION")
    {
        previouslyselectedstation = "3B Station";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else if(nursestationselect === "4A STATION")
    {
        previouslyselectedstation = "4A Station";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else if(nursestationselect === "4B STATION")
    {
        previouslyselectedstation = "4B Station";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else if(nursestationselect === "ER")
    {
        previouslyselectedstation = "ER";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else if(nursestationselect === "ICU")
    {
        previouslyselectedstation = "ICU";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else if(nursestationselect === "NICU")
    {
        previouslyselectedstation = "NICU";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else if(nursestationselect === "OR/DR")
    {
        previouslyselectedstation = "OR/DR";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else if(nursestationselect === "PICU")
    {
        previouslyselectedstation = "PICU";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
    else
    {
        previouslyselectedstation = "ALL";
        
        inpatient_table = $('#inpatient-masterlist-table').DataTable();
        inpatient_table.clear().destroy();

        getAllInpatientAndAddItToTheTable();
    }
}


function selectInPatient()
{
    var data;

    $('#inpatient-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#inpatient-masterlist-table').dataTable().$('tr.bg-cyan').removeClass('bg-cyan');
        $(this).addClass('bg-cyan');

        var data = $('#inpatient-masterlist-table').DataTable().row('.bg-cyan').data();
        selectedInPatient = data;
        
        $('#textid_patientcode').html(selectedInPatient[8]);
        $('#textid_contactno').html(selectedInPatient[9]);
        
        
        var pximagepic = BASE_URL + 'assets/images/uploads/patients/' + selectedInPatient[7] + 'p.jpg';
        var defaultpic = BASE_URL + 'assets/images/uploads/patients/default.png';
        
        $.ajax
        ({
            url: pximagepic,
            type: 'HEAD',
            error: function()
            {
                var img = $('#imageid_pxpictureidb').attr('src', defaultpic);
                var src = img.attr('src');
                var i = src.indexOf('?dummy=');
                src = i !== -1 ? src.substring(0, i) : src;
                var d = new Date();
                img.attr('src', src + '?dummy=' + d.getTime());
            },
            success: function ()
            {
                var img = $('#imageid_pxpictureidb').attr('src', pximagepic);
                var src = img.attr('src');
                var i = src.indexOf('?dummy=');
                src = i !== -1 ? src.substring(0, i) : src;
                var d = new Date();
                img.attr('src', src + '?dummy=' + d.getTime());
            }
        });
    });
}

function onclickPrintListingButton()
{
    var caseno = selectedInPatient[6];
//    alert(caseno);
}

function showCreditAdvisoryModal()
{
    if (inpatient_table.rows( '.bg-cyan' ).any())
    {   
        var caseno = selectedInPatient[6];
        var name = selectedInPatient[2];
        var room = selectedInPatient[10];
        
        $('#smallid_patientname').html(name);
        $('#smallid_patientroom').html(room);
        $('#hiddid_patientno').val(caseno);
        
        $('#creditadvisorymodal').modal
        ({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

        $('body').css('overflow', 'hidden');
        
            
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getInPatientlistDataForEditAdmitPatient",
            data: {casenox: caseno},
            dataType: 'json'
        })
        .done(function (data)
        {
            if (data.status)
            {                
                $('#textid_creditline').val(data.inpatientlistdata['creditmax']);
                $('#textid_needeposit').val(data.inpatientlistdata['NeedDepoamt'].toLocaleString());
                
                if(data.inpatientlistdata['needdeposit'] === "HIGH")
                {
                    $('#smallid_instruction').html("PRESCRIBED ALL MEDS AND OTHER REQUESTS NUMBER FURTHER REQUEST ARE ALLOWED BY THE SYSTEM UNTIL PARTIAL PAYMENT HAS BEEN DONE.");
                }
                else if(data.inpatientlistdata['needdeposit'] === "LOW")
                {
                    $('#smallid_instruction').html("ADVISE PARTIAL PAYMENT TO PATIENT IF POSSIBLE. REQUEST CAN STILL BE PROCESSED.");
                }
                else if(data.inpatientlistdata['needdeposit'] === "MID")
                {
                    $('#smallid_instruction').html("ADVISE PARTIAL PAYMENT AS SOONEST AS POSSIBLE. REQUEST CAN STILL BE PROCESSED.");
                }
                else
                {
                    $('#smallid_instruction').html("NO INSTRUCTION FOR NONE CREDIT STATUS.");
                }
                
                if(data.inpatientlistdata['needdeposit'] === "")
                {
                    $('#textid_creditstat').val("NONE");
                }
                else
                {
                    $('#textid_creditstat').val(data.inpatientlistdata['needdeposit']);
                }
            }
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
                $('#textid_currentbal').val(zerobal1.toFixed(2));
            }
            else
            {
                $('#textid_currentbal').val(balance);
            }
        });
    }
    else
    {
        swal
        ({
            title: "Notification",
            text: "Select patient first for viewing/processing credit line!",
            type: "warning"
        });
    }
}

function hideCreditAdvisoryModal()
{
    $('#creditadvisorymodal').modal("hide");
    $('body').css('overflow', 'auto');
    
    $('#updatePatientStatusCreditLineButton').prop('disabled',false);
    $('#textid_creditlineerror').attr('hidden', true);
    $('#textid_creditline').removeAttr('style');
}

function updatePatientStatusCreditLine() 
{
    $('#updatePatientStatusCreditLineButton').prop('disabled',true);
    
    var caseno = $('#hiddid_patientno').val();
    var creditval = $('#textid_creditline').val();

    swal
    ({
        title: "Are you sure?",
        text: "Data will be change and you will not be able to recover it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No",
        closeOnConfirm: false
    },
    function (isConfirm) 
    {
        $(".confirm").attr('disabled', 'disabled'); 
        $(".cancel").attr('disabled', 'disabled'); 
        
        if (isConfirm) 
        {
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + 'AdmissionDboard/updatePatientStatusCreditLine',
                data:
                {
                    casenox: caseno,
                    creditval: creditval
                },
                dataType: 'json',
                success: function (result)
                {
                    if (result.status === false) 
                    {
                        $('#updatePatientStatusCreditLineButton').prop('disabled',false);
                        
                        swal
                        ({
                            title: "Warning",
                            text: "Some field requires your attention!",
                            type: "warning",
                            confirmButtonText: "OK"
                        },
                        function (isConfirm)
                        {
                            if (isConfirm)
                            {
                                checkFieldValidations(result.errors.creditlineval, 'textid_creditlineerror', 'textid_creditline');
                            }
                        });
                    }
                    else
                    {
                        $('#updatePatientStatusCreditLineButton').prop('disabled',true);
                        hideCreditAdvisoryModal();
                        
                        swal
                        ({
                            title: "Success",
                            text: "Record is successfully updated!",
                            type: "success",
                            confirmButtonText: "OK"
                        },
                        function (isConfirm)
                        {
                            if (isConfirm)
                            {
                                inpatient_table.ajax.reload();
                                $('#inpatient-masterlist-table_filter [type="search"]').val(caseno);
                                $('#inpatient-masterlist-table_filter [type="search"]').focus();
                                inpatient_table.search(caseno).draw();
                            }
                        });
                    }
                }
            });
        }
        else
        {
            $('#updatePatientStatusCreditLineButton').prop('disabled',false);
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

function showPatientDiagnosisModal()
{
    if (inpatient_table.rows( '.bg-cyan' ).any())
    {   
        $('#diagnosticmanagementmodal').modal
        ({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

        $('body').css('overflow', 'hidden');
        
        var casenopxx = selectedInPatient[6];
        var nameofpxx = selectedInPatient[2];
        var roomofpxx = selectedInPatient[10];
        var admitdate = selectedInPatient[12];
        var dischdate = selectedInPatient[13];
        var phictypex = selectedInPatient[14];
        
        $("#guidelinenavitems").tab('show');
        $("#prof").css('background', '#168C94');
        $("#cont").css('background', '');
        $("#loca").css('background', '');
        $("#fami").css('background', '');
        
        $("#profileCollapse").collapse('show');
        $("#contactCollapse").collapse('hide');
        $("#locationCollapse").collapse('hide');
        $("#familyCollapse").collapse('hide');

        $('#textid_pateintname').html("NAME: " + nameofpxx);
        $('#textid_pateintcase').html("CASENO: " + casenopxx);
        $('#textid_pateintroom').html("ROOM: " + roomofpxx);
        $('#textid_pateintadmn').html("ADMISSION: " + admitdate);
        $('#textid_pateintdisc').html("DISCHARGED: " + dischdate);
        $('#textid_pateintphic').html("PHIC: " + phictypex);
        
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
            data: {casenox: casenopxx},
            dataType: 'json'
        })
        .done(function (data)
        {
            if (data.status)
            {
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
                else if(disposition === "" || disposition === null)
                {
                    $("#selectid_pxstatmgh").selectpicker("val","Select");

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
            }
        });
    
    }
    else
    {
        swal
        ({
            title: "Notification",
            text: "Select patient first for viewing/processing credit line!",
            type: "warning"
        });
    }
}

function hidePatientDiagnosisModal()
{
    $('#diagnosticmanagementmodal').modal("hide");
    $('body').css('overflow', 'auto');
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


function getCeasarianCaseIndicationDiagnosis() 
{
    ceasarianindication_table = $('#ceasarian-case-indication-diagnosis-table').DataTable
    ({
        sScrollY: "120px",
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


function getcausesofconfinement() 
{
    confinecause_table = $('#causesof-confinement-table').DataTable
    ({
        sScrollY: "117px",
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

function getCategorizedFinalDiagnosis()
{
    finaldiagnose_table = $('#categorized-final-diagnosis-table').DataTable
    ({
        sScrollY: "132px",
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
        sScrollY: "132px",
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

function titleCase(str) 
{
   var splitStr = str.toLowerCase().split(' ');
   
   for (var i = 0; i < splitStr.length; i++) 
   {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   
   return splitStr.join(' '); 
}