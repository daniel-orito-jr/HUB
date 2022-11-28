//var prescription_table = null;
//var prescribedmeds_table = null;
//var doctors_table = null;
//var extitems_table = null;
//var inpatient_table = null;
//var outpatient_table = null;
//var counterforgenerictble = 1;
//var counterforgenerictext = 1;
//var counterfortbleprescriptions = 1;
//var counterfortextprescriptions = 1;
//var selectedInPatientForRXCreator;
//var selectedOutPatientForRXCreator;
//var selectedExternalItemForRXCreator;
//var selectedPrescribedMedForRXCreator;

var counterfortblemedication = 1;
var counterfortextmedication = 1;
var takehome_table = null;
var inpatient_table = null;
var extitems_table = null;
var doctors_table = null;
var selectedPatient;
var selectedDoctor;

$(function () 
{
    $('#textboxid_instructdatehom').bootstrapMaterialDatePicker
    ({
        format: 'YYYY-MM-DD',
        clearButton: true,
        time: false,
        weekStart: 1,
        switchOnClick : true
    }); 
    
    $('#textboxid_birthdatehom').bootstrapMaterialDatePicker
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
    
    var datenow = moment().format('YYYY-MM-DD');
    $('#textboxid_instructdatehom').val(datenow);
    var doctype = "Drugs and Meds";

    disableMGHClearanceTabsContents();
    tabsHighlightForHomeInstruction();
    getTakeHomeMedsListings();
    getAllDoctorsAndAddItToTheTable();
    getAllInpatientAndAddItToTheTable();
    getAllInstructionsByDataAndAddItToSelect();
    getAllExternalItemsListingAndAddItToTheTable(doctype);
    selectPatient();
    selectDoctor();
    generateDoctorsCode();
    
    
    takehome_table = $('#takehome-medication-listings-table').DataTable();
    $('#takehome-medication-listings-table tbody').on('click', '.btn-hom-del', function ()
    {
        var medicationdeletebtn = this;
        var tbldataarr = takehome_table.row($(medicationdeletebtn).parents('tr')).data();
        var textiddata = tbldataarr[18];

        swal
        ({
            title: "Are you sure?",
            text: "You will not be able to recover the selected medication record!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove it!",
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
                
                takehome_table.row($(medicationdeletebtn).parents('tr')).remove().draw(false);
                
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                $("#" + textiddata).remove();
                
                var rownum = $('#takehome-medication-listings-table').DataTable().rows().count();
                
                for(var i = 0; i < rownum; i++)
                {
                    var counter = parseInt(i) + 1;
                    $('#takehome-medication-listings-table tbody tr:eq('+ i +') td:eq(1)').html(parseInt(counter));
                }
            }
            else
            {
                swal("Error", "Error in saving. Please try again!", "error");
            }
        });
    });
});

function tabsHighlightForHomeInstruction()
{
    $("#homeinstructsidetab").addClass("active");
}

function getTakeHomeMedsListings()
{
    takehome_table = $('#takehome-medication-listings-table').DataTable
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
        createdRow: function (row, data, dataIndex) 
        {
            $('td', row).eq(1).html(dataIndex+1);
        },
        initComplete: function (settings, json)
        {

        }
    });
}

function selectPatient()
{
    var data;

    $('#inpatient-masterlist-table tbody').on('click', 'tr', function ()
    {
        $('#inpatient-masterlist-table').dataTable().$('tr.bg-grey').removeClass('bg-grey');
        $(this).addClass('bg-grey');

        var data = $('#inpatient-masterlist-table').DataTable().row('.bg-grey').data();
        selectedPatient = data;
    });
}

function selectPatientForRXCreatorMaker()
{
    var caseno = selectedPatient[2];
   
    setToDefaultViewHomeInstructionModule();
    hideInpatientMasterlistForRxCreatorMaker();

    takehome_table.clear().draw();
    $('#myFormTakeHomeMedicationMultipleDataStorage').empty();
    $('#inputid_hiddenmedicationhom').empty();
    $('#inputid_medicationdatahom').val("");
    $('#inputid_finalmedicationdatahom').val("");

    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
        data: {casenox: caseno},
        dataType: 'json'
    })
    .done(function (data)
    {
        var fullname = data.inpatientlistdata['name'];
        var birthday = data.inpatientlistdata['bday'];
        var pxdoctor = data.inpatientlistdata['doctorname'];
        var fulladrs = data.inpatientlistdata['adrs'] + " " + 
                       data.inpatientlistdata['brgy'] + ", " +
                       data.inpatientlistdata['cityadd'] + " " +
                       data.inpatientlistdata['provadd'];
        var gendersx = data.inpatientlistdata['sex'];
        var admtdate = data.inpatientlistdata['admitdate'];
        var dschdate = data.inpatientlistdata['dischadate'];
        var roomrefr = data.inpatientlistdata['roombrief'];
        var casecode = data.inpatientlistdata['casecode'];
        var pinnumbr = data.inpatientlistdata['PIN'];

        if(gendersx === "MALE" || gendersx === "Male")
        {
            $('#selectid_pxgenderhom').selectpicker('val',"MALE");
        }
        else
        {
            $('#selectid_pxgenderhom').selectpicker('val',"FEMALE");
        }

        var ageofpatient = CalculateAge(birthday);

        $('#textboxid_patientnamehom').val(fullname);
        $('#textboxid_attenddochom').val(pxdoctor);
        $('#textboxid_accountnohom').val(caseno);
        $('#textboxid_birthdatehom').val(birthday);
        $('#textboxid_patientagehom').val(ageofpatient);
        $('#textboxid_pxaddresshom').val(fulladrs);
        $('#textboxid_roominfohom').val(roomrefr);
        $('#textboxid_admissiondatehom').val(admtdate);
        $('#textboxid_dischargedatehom').val(dschdate);
        $('#hiddbox_casecodehom').val(casecode);
        $('#hiddbox_pinnumbrhom').val(pinnumbr);
        $('#hiddbox_pattypexhom').val(data.inpatientlistdata['pxtype']);
        $('#textareaid_finaldiagnosehom').val(data.inpatientlistdata['Diag_discharge']);

        var doctorid = data.inpatientlistdata['doctorid'];

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "HomeInstruction/getDoctorsDataForHomeInstruction",
            data: {doctoridx: doctorid},
            dataType: 'json'
        })
        .done(function (data)
        {
            $('#hiddbox_docrefnohom').val(data.doctorsdata['docrefno']);
            $('#hiddbox_s2noxxxxhom').val(data.doctorsdata['S2no']);
            $('#hiddbox_ptrnoxxxhom').val(data.doctorsdata['PTR']);
            $('#hiddbox_licnoxxxhom').val(data.doctorsdata['Licno']);
        });

        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "HomeInstruction/getPrescriptionMasterDataForHomeInstruction",
            data: {casenox: caseno},
            dataType: 'json'
        })
        .done(function (data)
        {
            var finaldiagnose = data.presmasterdata['Dxdiagnosis'];
            if(finaldiagnose !== "")
            {
                $('#textareaid_finaldiagnosehom').val(data.presmasterdata['Dxdiagnosis']);
                $('#textareaid_specialinshom').val(data.presmasterdata['specialinstruction']);
                $('#textareaid_dietspecifichom').val(data.presmasterdata['dietspecs']);
                $('#textareaid_laboratoryhom').val(data.presmasterdata['labfollowup']);
                $('#textareaid_procedureshom').val(data.presmasterdata['radfollowup']);
                $('#textareaid_tobeavoidedhom').val(data.presmasterdata['avoid']);
                $('#textareaid_nextvisithom').val(data.presmasterdata['visitinstruction']);
            }
            else
            {
                $('#textareaid_specialinshom').val("");
                $('#textareaid_dietspecifichom').val("");
                $('#textareaid_laboratoryhom').val("");
                $('#textareaid_procedureshom').val("");
                $('#textareaid_tobeavoidedhom').val("");
                $('#textareaid_nextvisithom').val("");
            }
        });
    });

    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "HomeInstruction/getDischaInstructionsMultipleData",
        data: {casenox: caseno},
        dataType: 'json'
    })
    .done(function (data)
    {
        takehome_table = $('#takehome-medication-listings-table').DataTable();
        takehome_table.clear().draw();

        var counterfortblemedicationvar = parseInt(counterfortblemedication) - parseInt(counterfortblemedication);
        counterfortblemedication = parseInt(counterfortblemedicationvar) + 1;

        var counterfortextmedicationvar = parseInt(counterfortextmedication) - parseInt(counterfortextmedication);
        counterfortextmedication = parseInt(counterfortextmedicationvar) + 1;

        for (var cv = 0; cv < data.length; cv++)
        {
            var textboxidtbl = "MEDICATION" + counterfortblemedication;

            if(data[cv]['breakfastb4'] === "0")
            {
                var breakfastb4tble = "-";
            }
            else
            {
                var breakfastb4tble = data[cv]['breakfasttime'];
            }

            if(data[cv]['breakfastafter'] === "0")
            {
                var breakfastaftble = "-";
            }
            else
            {
                var breakfastaftble = data[cv]['breakfasttime'];
            }

            if(data[cv]['lunchb4'] === "0")
            {
                var lunchb4tble = "-";
            }
            else
            {
                var lunchb4tble = data[cv]['lunchtime'];
            }

            if(data[cv]['lunchafter'] === "0")
            {
                var lunchaftble = "-";
            }
            else
            {
                var lunchaftble = data[cv]['lunchtime'];
            }

            if(data[cv]['supperb4'] === "0")
            {
                var supperb4tble = "-";
            }
            else
            {
                var supperb4tble = data[cv]['suppertime'];
            }

            if(data[cv]['supperafter'] === "0")
            {
                var supperaftble = "-";
            }
            else
            {
                var supperaftble = data[cv]['suppertime'];
            }

            takehome_table = $('#takehome-medication-listings-table').DataTable();
            takehome_table.row.add
            ([
                "<button class='btn btn-sm btn-danger waves-effect btn-hom-del' title='Remove from list' style='margin-left:15px'><i class='zmdi zmdi-delete'></i></button>",
                "",
                data[cv]['itemgeneric'],
                data[cv]['dosage'],
                breakfastb4tble,
                breakfastaftble,
                lunchb4tble,
                lunchaftble,
                supperb4tble,
                supperaftble,
                data[cv]['bedtime'],
                data[cv]['noofdays'],
                data[cv]['purposeindication'],
                data[cv]['sideeffect'],
                data[cv]['qty'],
                data[cv]['unit'],
                data[cv]['freqdscr'],
                data[cv]['phicrefcode'],
                textboxidtbl
            ]).draw(false);

            var medicationdata = data[cv]['phicrefcode'] + "|" +
                                 data[cv]['productid'] + "|" +
                                 data[cv]['hospcode'] + "|" +
                                 data[cv]['RxDate'] + "|" +
                                 data[cv]['itemgeneric'] + "|" +
                                 data[cv]['generic'] + "|" +
                                 data[cv]['brand'] + "|" +
                                 data[cv]['freqdscr'] + "|" +
                                 data[cv]['qty'] + "|" +
                                 data[cv]['unit'] + "|" +
                                 data[cv]['breakfastb4'] + "|" +
                                 data[cv]['breakfastafter'] + "|" +
                                 data[cv]['breakfasttime'] + "|" +
                                 data[cv]['lunchb4'] + "|" +
                                 data[cv]['lunchafter'] + "|" +
                                 data[cv]['lunchtime'] + "|" +
                                 data[cv]['supperb4'] + "|" +
                                 data[cv]['supperafter'] + "|" +
                                 data[cv]['suppertime'] + "|" +
                                 data[cv]['bedtime'] + "|" +
                                 data[cv]['noofdays'] + "|" +
                                 data[cv]['dosage'] + "|" +
                                 data[cv]['purposeindication'] + "|" +
                                 data[cv]['sideeffect'] + "|" +
                                 textboxidtbl;

                counterfortblemedication++;
                textBoxCreateForCreateTakeHomeMedication(medicationdata);
        }
    });

    enableMGHClearanceTabsContents();
}


function showInpatientMasterlistForHomeInstruction()
{
    $('#inpatientlistforrxcreator').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
    $('#inpatientlistforrxcreator').css('overflow-y', 'scroll');

    inpatient_table.on('dblclick', 'tr', function ()
    {
        var data = inpatient_table.row(this).data();
        var caseno = data[2];
        
        setToDefaultViewHomeInstructionModule();
        hideInpatientMasterlistForRxCreatorMaker();
        
        takehome_table.clear().draw();
        $('#myFormTakeHomeMedicationMultipleDataStorage').empty();
        $('#inputid_hiddenmedicationhom').empty();
        $('#inputid_medicationdatahom').val("");
        $('#inputid_finalmedicationdatahom').val("");
        
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "Admission/getInPatientlistDataForMGHFormDataImport",
            data: {casenox: caseno},
            dataType: 'json'
        })
        .done(function (data)
        {
            var fullname = data.inpatientlistdata['name'];
            var birthday = data.inpatientlistdata['bday'];
            var pxdoctor = data.inpatientlistdata['doctorname'];
            var fulladrs = data.inpatientlistdata['adrs'] + " " + 
                           data.inpatientlistdata['brgy'] + ", " +
                           data.inpatientlistdata['cityadd'] + " " +
                           data.inpatientlistdata['provadd'];
            var gendersx = data.inpatientlistdata['sex'];
            var admtdate = data.inpatientlistdata['admitdate'];
            var dschdate = data.inpatientlistdata['dischadate'];
            var roomrefr = data.inpatientlistdata['roombrief'];
            var casecode = data.inpatientlistdata['casecode'];
            var pinnumbr = data.inpatientlistdata['PIN'];
            
            if(gendersx === "MALE" || gendersx === "Male")
            {
                $('#selectid_pxgenderhom').selectpicker('val',"MALE");
            }
            else
            {
                $('#selectid_pxgenderhom').selectpicker('val',"FEMALE");
            }

            var ageofpatient = CalculateAge(birthday);

            $('#textboxid_patientnamehom').val(fullname);
            $('#textboxid_attenddochom').val(pxdoctor);
            $('#textboxid_accountnohom').val(caseno);
            $('#textboxid_birthdatehom').val(birthday);
            $('#textboxid_patientagehom').val(ageofpatient);
            $('#textboxid_pxaddresshom').val(fulladrs);
            $('#textboxid_roominfohom').val(roomrefr);
            $('#textboxid_admissiondatehom').val(admtdate);
            $('#textboxid_dischargedatehom').val(dschdate);
            $('#hiddbox_casecodehom').val(casecode);
            $('#hiddbox_pinnumbrhom').val(pinnumbr);
            $('#hiddbox_pattypexhom').val(data.inpatientlistdata['pxtype']);
            $('#textareaid_finaldiagnosehom').val(data.inpatientlistdata['Diag_discharge']);
            
            var doctorid = data.inpatientlistdata['doctorid'];

            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "HomeInstruction/getDoctorsDataForHomeInstruction",
                data: {doctoridx: doctorid},
                dataType: 'json'
            })
            .done(function (data)
            {
                $('#hiddbox_docrefnohom').val(data.doctorsdata['docrefno']);
                $('#hiddbox_s2noxxxxhom').val(data.doctorsdata['S2no']);
                $('#hiddbox_ptrnoxxxhom').val(data.doctorsdata['PTR']);
                $('#hiddbox_licnoxxxhom').val(data.doctorsdata['Licno']);
            });
            
            $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "HomeInstruction/getPrescriptionMasterDataForHomeInstruction",
                data: {casenox: caseno},
                dataType: 'json'
            })
            .done(function (data)
            {
                var finaldiagnose = data.presmasterdata['Dxdiagnosis'];
                if(finaldiagnose !== "")
                {
                    $('#textareaid_finaldiagnosehom').val(data.presmasterdata['Dxdiagnosis']);
                    $('#textareaid_specialinshom').val(data.presmasterdata['specialinstruction']);
                    $('#textareaid_dietspecifichom').val(data.presmasterdata['dietspecs']);
                    $('#textareaid_laboratoryhom').val(data.presmasterdata['labfollowup']);
                    $('#textareaid_procedureshom').val(data.presmasterdata['radfollowup']);
                    $('#textareaid_tobeavoidedhom').val(data.presmasterdata['avoid']);
                    $('#textareaid_nextvisithom').val(data.presmasterdata['visitinstruction']);
                }
                else
                {
                    $('#textareaid_specialinshom').val("");
                    $('#textareaid_dietspecifichom').val("");
                    $('#textareaid_laboratoryhom').val("");
                    $('#textareaid_procedureshom').val("");
                    $('#textareaid_tobeavoidedhom').val("");
                    $('#textareaid_nextvisithom').val("");
                }
            });
        });
        
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "HomeInstruction/getDischaInstructionsMultipleData",
            data: {casenox: caseno},
            dataType: 'json'
        })
        .done(function (data)
        {
            takehome_table = $('#takehome-medication-listings-table').DataTable();
            takehome_table.clear().draw();

            var counterfortblemedicationvar = parseInt(counterfortblemedication) - parseInt(counterfortblemedication);
            counterfortblemedication = parseInt(counterfortblemedicationvar) + 1;

            var counterfortextmedicationvar = parseInt(counterfortextmedication) - parseInt(counterfortextmedication);
            counterfortextmedication = parseInt(counterfortextmedicationvar) + 1;

            for (var cv = 0; cv < data.length; cv++)
            {
                var textboxidtbl = "MEDICATION" + counterfortblemedication;
                
                if(data[cv]['breakfastb4'] === "0")
                {
                    var breakfastb4tble = "-";
                }
                else
                {
                    var breakfastb4tble = data[cv]['breakfasttime'];
                }
                
                if(data[cv]['breakfastafter'] === "0")
                {
                    var breakfastaftble = "-";
                }
                else
                {
                    var breakfastaftble = data[cv]['breakfasttime'];
                }

                if(data[cv]['lunchb4'] === "0")
                {
                    var lunchb4tble = "-";
                }
                else
                {
                    var lunchb4tble = data[cv]['lunchtime'];
                }
                
                if(data[cv]['lunchafter'] === "0")
                {
                    var lunchaftble = "-";
                }
                else
                {
                    var lunchaftble = data[cv]['lunchtime'];
                }
                
                if(data[cv]['supperb4'] === "0")
                {
                    var supperb4tble = "-";
                }
                else
                {
                    var supperb4tble = data[cv]['suppertime'];
                }
                
                if(data[cv]['supperafter'] === "0")
                {
                    var supperaftble = "-";
                }
                else
                {
                    var supperaftble = data[cv]['suppertime'];
                }
                
                takehome_table = $('#takehome-medication-listings-table').DataTable();
                takehome_table.row.add
                ([
                    "<button class='btn btn-sm btn-danger waves-effect btn-hom-del' title='Remove from list' style='margin-left:15px'><i class='zmdi zmdi-delete'></i></button>",
                    "",
                    data[cv]['itemgeneric'],
                    data[cv]['dosage'],
                    breakfastb4tble,
                    breakfastaftble,
                    lunchb4tble,
                    lunchaftble,
                    supperb4tble,
                    supperaftble,
                    data[cv]['bedtime'],
                    data[cv]['noofdays'],
                    data[cv]['purposeindication'],
                    data[cv]['sideeffect'],
                    data[cv]['qty'],
                    data[cv]['unit'],
                    data[cv]['freqdscr'],
                    data[cv]['phicrefcode'],
                    textboxidtbl
                ]).draw(false);
                
                var medicationdata = data[cv]['phicrefcode'] + "|" +
                                     data[cv]['productid'] + "|" +
                                     data[cv]['hospcode'] + "|" +
                                     data[cv]['RxDate'] + "|" +
                                     data[cv]['itemgeneric'] + "|" +
                                     data[cv]['generic'] + "|" +
                                     data[cv]['brand'] + "|" +
                                     data[cv]['freqdscr'] + "|" +
                                     data[cv]['qty'] + "|" +
                                     data[cv]['unit'] + "|" +
                                     data[cv]['breakfastb4'] + "|" +
                                     data[cv]['breakfastafter'] + "|" +
                                     data[cv]['breakfasttime'] + "|" +
                                     data[cv]['lunchb4'] + "|" +
                                     data[cv]['lunchafter'] + "|" +
                                     data[cv]['lunchtime'] + "|" +
                                     data[cv]['supperb4'] + "|" +
                                     data[cv]['supperafter'] + "|" +
                                     data[cv]['suppertime'] + "|" +
                                     data[cv]['bedtime'] + "|" +
                                     data[cv]['noofdays'] + "|" +
                                     data[cv]['dosage'] + "|" +
                                     data[cv]['purposeindication'] + "|" +
                                     data[cv]['sideeffect'] + "|" +
                                     textboxidtbl;

                    counterfortblemedication++;
                    textBoxCreateForCreateTakeHomeMedication(medicationdata);
            }
        });
        
        enableMGHClearanceTabsContents();
    });
}

function hideInpatientMasterlistForRxCreatorMaker()
{
    $('#inpatientlistforrxcreator').modal("hide");
    $('body').css('overflow', 'auto');
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

function setToDefaultViewHomeInstructionModule()
{
    var datenow = moment().format('YYYY-MM-DD');
    $('#textboxid_instructdatehom').val(datenow);
    $('#hiddbox_nexttabindicatorhom').val("0");
    
    $('#textboxid_patientnamehom').val("");
    $('#textboxid_attenddochom').val("");
    $('#textboxid_accountnohom').val("");
    $('#textboxid_birthdatehom').val("");
    $('#textboxid_patientagehom').val("");
    $('#selectid_pxgenderhom').selectpicker('val','Select');
    $('#textboxid_pxaddresshom').val("");
    $('#textboxid_roominfohom').val("");
    $('#textboxid_admissiondatehom').val("");
    $('#textboxid_dischargedatehom').val("");
    $('#textareaid_finaldiagnosehom').val("");
    $('#textareaid_specialinshom').val("");
    $('#textareaid_dietspecifichom').val("");
    $('#textareaid_laboratoryhom').val("");
    $('#textareaid_procedureshom').val("");
    $('#textareaid_tobeavoidedhom').val("");
    $('#textareaid_nextvisithom').val("");
    $('#selectid_instructbyhom').selectpicker('val','Select');
    $('#hiddbox_casecodehom').val("");
    $('#hiddbox_pinnumbrhom').val("");
    $('#hiddbox_dateadmdhom').val("");
    $('#hiddbox_datedischom').val("");
    $('#hiddbox_roomrefrhom').val("");
    $('#hiddbox_pattypexhom').val("");
    $('#hiddbox_docrefnohom').val("");
    $('#hiddbox_s2noxxxxhom').val("");
    $('#hiddbox_ptrnoxxxhom').val("");
    $('#hiddbox_licnoxxxhom').val("");
    
    $('#textboxid_patientnamehomerror').html("").attr('hidden', true);
    $('#textboxid_attenddochomerror').html("").attr('hidden', true);
    $('#textboxid_accountnohomerror').html("").attr('hidden', true);
    $('#textboxid_instructdatehomerror').html("").attr('hidden', true);
    $('#textboxid_birthdatehomerror').html("").attr('hidden', true);
    $('#textboxid_patientagehomerror').html("").attr('hidden', true);
    $('#selectid_pxgenderhomerror').html("").attr('hidden', true);
    $('#textboxid_pxaddresshomerror').html("").attr('hidden', true);
    $('#textboxid_roominfohomerror').html("").attr('hidden', true);
    $('#textboxid_admissiondatehomerror').html("").attr('hidden', true);
    $('#textboxid_dischargedatehomerror').html("").attr('hidden', true);
    $('#textareaid_finaldiagnosehomerror').html("").attr('hidden', true);
    $('#textareaid_specialinshomerror').html("").attr('hidden', true);
    $('#textareaid_dietspecifichomerror').html("").attr('hidden', true);
    $('#textareaid_laboratoryhomerror').html("").attr('hidden', true);
    $('#textareaid_procedureshomerror').html("").attr('hidden', true);
    $('#textareaid_tobeavoidedhomerror').html("").attr('hidden', true);
    $('#textareaid_nextvisithomerror').html("").attr('hidden', true);
    $('#selectid_instructbyhomerror').html("").attr('hidden', true);
    $('#hiddbox_casecodehomerror').html("").attr('hidden', true);
    $('#hiddbox_pinnumbrhomerror').html("").attr('hidden', true);
    $('#hiddbox_dateadmdhomerror').html("").attr('hidden', true);
    $('#hiddbox_datedischomerror').html("").attr('hidden', true);
    $('#hiddbox_roomrefrhomerror').html("").attr('hidden', true);
    $('#hiddbox_pattypexhomerror').html("").attr('hidden', true);
    $('#hiddbox_docrefnohomerror').html("").attr('hidden', true);
    
    $('#GeneralTabHom').tab("show");
}

function onchangeCalculateAgeHomeInstruction()
{
    var birthdate = $('#textboxid_birthdatehom').val();
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
        $('#textboxid_patientagehom').val("");
    }
    else 
    {
        $('#textboxid_patientagehom').val(year_age + "." + month_age);
    }
}

function disableMGHClearanceTabsContents()
{
    $('#tabcontentdiv').fadeTo('slow',.6);
    $('#newdivadded').addClass('disabledivcontent');
    $('#textboxid_attenddochom').prop('disabled',true);
    $('#textboxid_birthdatehom').prop('disabled',true);
    $('#selectid_pxgenderhom').prop('disabled',true);
    $('#selectid_pxgenderhom').selectpicker('refresh');
    $('#spanid_attenddochom').css('background','#e3e3e3');
    $('#buttonid_attenddochom').prop('disabled',true);
    $('#buttonid_attenddochom').css('cursor','not-allowed');
    $('#selectid_instructbyhom').prop('disabled',true);
    $('#selectid_instructbyhom').selectpicker('refresh');
    
}

function enableMGHClearanceTabsContents()
{
    $('#tabcontentdiv').fadeTo('slow',100);
    $('#newdivadded').removeClass('disabledivcontent');
    $('#textboxid_attenddochom').prop('disabled',false);
    $('#textboxid_birthdatehom').prop('disabled',false);
    $('#selectid_pxgenderhom').prop('disabled',false);
    $('#selectid_pxgenderhom').selectpicker('refresh');
    $('#spanid_attenddochom').css('background','');
    $('#buttonid_attenddochom').prop('disabled',false);
    $('#buttonid_attenddochom').css('cursor','');
    $('#selectid_instructbyhom').prop('disabled',false);
    $('#selectid_instructbyhom').selectpicker('refresh');
}
            
function validateGeneralInformationTab()
{
    var error = 0;
    
    var instructby = $('#selectid_instructbyhom').val();
    if(instructby === "Select")
    {
        $('#selectid_instructbyhomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#selectid_instructbyhomerror').html("").attr('hidden', true);
    }
    
    var patientname = $('#textboxid_patientnamehom').val();
    if(patientname === "")
    {
        $('#textboxid_patientnamehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_patientnamehomerror').html("").attr('hidden', true);
    }
    
    var attenddoc = $('#textboxid_attenddochom').val();
    if(attenddoc === "")
    {
        $('#textboxid_attenddochomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_attenddochomerror').html("").attr('hidden', true);
    }
    
    var accountno = $('#textboxid_accountnohom').val();
    if(accountno === "")
    {
        $('#textboxid_accountnohomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_accountnohomerror').html("").attr('hidden', true);
    }
    
    var birthdate = $('#textboxid_birthdatehom').val();
    if(birthdate === "")
    {
        $('#textboxid_birthdatehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_birthdatehomerror').html("").attr('hidden', true);
    }
    
    var patientage = $('#textboxid_patientagehom').val();
    if(patientage === "")
    {
        $('#textboxid_patientagehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_patientagehomerror').html("").attr('hidden', true);
    }

    var pxgender = $('#selectid_pxgenderhom').val();
    if(pxgender === "Select")
    {
        $('#selectid_pxgenderhomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#selectid_pxgenderhomerror').html("").attr('hidden', true);
    }

    var pxaddress = $('#textboxid_pxaddresshom').val();
    if(pxaddress === "")
    {
        $('#textboxid_pxaddresshomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_pxaddresshomerror').html("").attr('hidden', true);
    }

    var roominfo = $('#textboxid_roominfohom').val();
    if(roominfo === "")
    {
        $('#textboxid_roominfohomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_roominfohomerror').html("").attr('hidden', true);
    }
    
    var admissiondate = $('#textboxid_admissiondatehom').val();
    if(admissiondate === "")
    {
        $('#textboxid_admissiondatehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_admissiondatehomerror').html("").attr('hidden', true);
    }

    var dischargedate = $('#textboxid_dischargedatehom').val();
    if(dischargedate === "")
    {
        $('#textboxid_dischargedatehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_dischargedatehomerror').html("").attr('hidden', true);
    }

    var instructdate = $('#textboxid_instructdatehom').val();
    if(instructdate === "")
    {
        $('#textboxid_instructdatehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_instructdatehomerror').html("").attr('hidden', true);
    }

    if (error > 0)
    {
        $('#hiddbox_nexttabindicatorhom').val("0");
        
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
        swal
        ({
            title: "Notification",
            text: "Are you sure to proceed with the creation of the\nTake Home / Discharge Instructions?",
            type: 'info',
            showCancelButton: true,
            confirmButtonText: "Yes, pls. proceed!",
            cancelButtonText: "No",
            closeOnConfirm: true
        },
        function (isConfirm)
        {
            if (isConfirm)
            {
                $('#hiddbox_nexttabindicatorhom').val("1");
                $('#MedicationTabHom').tab("show");
            }
        });
    }
}

function clearAllHomeInstructionFormElements()
{
    setToDefaultViewHomeInstructionModule();
    disableMGHClearanceTabsContents();
}

function getAllInstructionsByDataAndAddItToSelect()
{
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "HomeInstruction/getInstructionsByListFromPrescriptionMaster",
        dataType: 'json'
    })
    .done(function (data)
    {   
        $('#selectid_instructbyhom').empty();
        $('#selectid_instructbyhom').append('<option value="Select">' + "Select from List" + '</option>');
        
        for (var cv = 0; cv < data.length; cv++)
        {
            $('#selectid_instructbyhom').append('<option value="' + data[cv]['instructionsby'] + '">' + data[cv]['instructionsby'] + '</option>');
        }
        $('#selectid_instructbyhom').selectpicker('refresh');
    });
}

function onClickMedicationInformationTab()
{
    var error = 0;
    
    var instructby = $('#selectid_instructbyhom').val();
    if(instructby === "Select")
    {
        $('#selectid_instructbyhomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#selectid_instructbyhomerror').html("").attr('hidden', true);
    }
    
    var patientname = $('#textboxid_patientnamehom').val();
    if(patientname === "")
    {
        $('#textboxid_patientnamehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_patientnamehomerror').html("").attr('hidden', true);
    }
    
    var attenddoc = $('#textboxid_attenddochom').val();
    if(attenddoc === "")
    {
        $('#textboxid_attenddochomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_attenddochomerror').html("").attr('hidden', true);
    }
    
    var accountno = $('#textboxid_accountnohom').val();
    if(accountno === "")
    {
        $('#textboxid_accountnohomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_accountnohomerror').html("").attr('hidden', true);
    }
    
    var birthdate = $('#textboxid_birthdatehom').val();
    if(birthdate === "")
    {
        $('#textboxid_birthdatehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_birthdatehomerror').html("").attr('hidden', true);
    }
    
    var patientage = $('#textboxid_patientagehom').val();
    if(patientage === "")
    {
        $('#textboxid_patientagehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_patientagehomerror').html("").attr('hidden', true);
    }

    var pxgender = $('#selectid_pxgenderhom').val();
    if(pxgender === "Select")
    {
        $('#selectid_pxgenderhomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#selectid_pxgenderhomerror').html("").attr('hidden', true);
    }

    var pxaddress = $('#textboxid_pxaddresshom').val();
    if(pxaddress === "")
    {
        $('#textboxid_pxaddresshomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_pxaddresshomerror').html("").attr('hidden', true);
    }

    var roominfo = $('#textboxid_roominfohom').val();
    if(roominfo === "")
    {
        $('#textboxid_roominfohomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_roominfohomerror').html("").attr('hidden', true);
    }
    
    var admissiondate = $('#textboxid_admissiondatehom').val();
    if(admissiondate === "")
    {
        $('#textboxid_admissiondatehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_admissiondatehomerror').html("").attr('hidden', true);
    }

    var dischargedate = $('#textboxid_dischargedatehom').val();
    if(dischargedate === "")
    {
        $('#textboxid_dischargedatehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_dischargedatehomerror').html("").attr('hidden', true);
    }

    var instructdate = $('#textboxid_instructdatehom').val();
    if(instructdate === "")
    {
        $('#textboxid_instructdatehomerror').html("Required Field!").removeAttr('hidden');
        error++;
    }
    else
    {
        $('#textboxid_instructdatehomerror').html("").attr('hidden', true);
    }

    if (error > 0)
    {
        swal
        ({
            title: "Validation Notice!",
            text: "Some field requires your attention!",
            type: "warning",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonText: "OK!",
            closeOnConfirm: true
        },
        function (isConfirm)
        {
            if (isConfirm)
            {
                $('#hiddbox_nexttabindicatorhom').val("0");
                $('#GeneralTabHom').tab("show");
            }
        });
    }
    else
    {
        swal
        ({
            title: "Notification",
            text: "Are you sure to proceed with the creation of the\nTake Home / Discharge Instructions?",
            type: 'info',
            showCancelButton: true,
            confirmButtonText: "Yes, pls. proceed!",
            cancelButtonText: "No",
            closeOnConfirm: true
        },
        function (isConfirm)
        {
            if (isConfirm)
            {
                $('#hiddbox_nexttabindicatorhom').val("1");
                $('#MedicationTabHom').tab("show");
            }
            else
            {
                $('#GeneralTabHom').tab("show");
            }
        });
    }
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

function showExternalItemsListingModal()
{
    $('#externalitemsforrxcreator').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    
    $('body').css('overflow', 'hidden');
    $('#externalitemsforrxcreator').css('overflow-y', 'scroll');

    extitems_table.on('dblclick', 'tr', function ()
    {
        hideExternalItemsListingModal();
        
        var data = extitems_table.row(this).data();
        var category = data[6];
        var generic = data[4];
        var brand = data[3];
        var unit = data[5];
        var purpose = data[9];
        var sideeffect = data[10];
        var productid = data[7];
        var hospcode = data[8];
        
        if(category === "MED-Drugs and Meds" || category === "MED-Drugs And Meds")
        {
            $('#textboxid_itemmedshom').val(generic);
            $('#textboxid_brandnamehom').val(brand).prop('disabled',false);
            $('#textboxid_dosagehom').val("").prop('disabled',false);
            $('#textboxid_numberofdayshom').val("").prop('disabled',false);
            $('#textboxid_prescriptionhom').val("");
            $('#textboxid_sideeffecthom').val(sideeffect).prop('disabled',false);
            $('#textboxid_indicationhom').val(purpose).prop('disabled',false);
            $('#textboxid_quantityhom').val("1").prop('disabled',false);
            $('#textboxid_unithom').val(unit).prop('disabled',false);
            $('#selectid_bedtimehom').selectpicker('val','NONE').prop('disabled',false);
            $('#selectid_bedtimehom').selectpicker('refresh');
            $('#hiddboxid_productidhom').val(productid);
            $('#hiddboxid_hosplcodehom').val(hospcode);

            $('#radioid_breakfastbeforehom').prop('disabled',false);
            $('#radioid_breakfastafterhom').prop('disabled',false);
            $('#selectid_breakfasthom').selectpicker('val','NONE').prop('disabled',false);
            $('#selectid_breakfasthom').selectpicker('refresh');
            $('#hiddbox_breakfasthom').val("NONE");

            $('#radioid_lunchtimebeforehom').prop('disabled',false);
            $('#radioid_lunchtimeafterhom').prop('disabled',false);
            $('#selectid_lunchtimehom').selectpicker('val','NONE').prop('disabled',false);
            $('#selectid_lunchtimehom').selectpicker('refresh');
            $('#hiddbox_lunchtimehom').val("NONE");

            $('#radioid_suppertimebeforehom').prop('disabled',false);
            $('#radioid_suppertimeafterhom').prop('disabled',false);
            $('#selectid_suppertimehom').selectpicker('val','NONE').prop('disabled',false);
            $('#selectid_suppertimehom').selectpicker('refresh');
            $('#hiddbox_suppertimehom').val("NONE");
            
            $('#smallid_morning').html("&nbsp;&nbsp;(Morning)");
            $('#smallid_noontime').html("&nbsp;&nbsp;(Noontime)");
            $('#smallid_evening').html("&nbsp;&nbsp;(Evening)");
            
            $('#boldid_instruction').html("&nbsp;&nbsp;&nbsp;Medication Prescription");
        }
        else
        {
            $('#textboxid_itemmedshom').val(generic);
            $('#textboxid_brandnamehom').val("DISABLED").prop('disabled',true);
            $('#textboxid_dosagehom').val("").prop('disabled',false);
            $('#textboxid_numberofdayshom').val("DISABLED").prop('disabled',true);
            $('#textboxid_prescriptionhom').val("");
            $('#textboxid_sideeffecthom').val("DISABLED").prop('disabled',true);
            $('#textboxid_indicationhom').val("DISABLED").prop('disabled',true);
            $('#textboxid_quantityhom').val("DISABLED").prop('disabled',true);
            $('#textboxid_unithom').val("DISABLED").prop('disabled',true);
            $('#selectid_bedtimehom').selectpicker('val','NONE').prop('disabled',true);
            $('#selectid_bedtimehom').selectpicker('refresh');
            $('#hiddboxid_productidhom').val("");
            $('#hiddboxid_hosplcodehom').val("");

            $('#radioid_breakfastbeforehom').prop('disabled',true);
            $('#radioid_breakfastafterhom').prop('disabled',true);
            $('#selectid_breakfasthom').selectpicker('val','NONE').prop('disabled',true);
            $('#selectid_breakfasthom').selectpicker('refresh');
            $('#hiddbox_breakfasthom').val("NONE");

            $('#radioid_lunchtimebeforehom').prop('disabled',true);
            $('#radioid_lunchtimeafterhom').prop('disabled',true);
            $('#selectid_lunchtimehom').selectpicker('val','NONE').prop('disabled',true);
            $('#selectid_lunchtimehom').selectpicker('refresh');
            $('#hiddbox_lunchtimehom').val("NONE");

            $('#radioid_suppertimebeforehom').prop('disabled',true);
            $('#radioid_suppertimeafterhom').prop('disabled',true);
            $('#selectid_suppertimehom').selectpicker('val','NONE').prop('disabled',true);
            $('#selectid_suppertimehom').selectpicker('refresh');
            $('#hiddbox_suppertimehom').val("NONE");
            
            $('#smallid_morning').html("&nbsp;&nbsp;(Disabled)");
            $('#smallid_noontime').html("&nbsp;&nbsp;(Disabled)");
            $('#smallid_evening').html("&nbsp;&nbsp;(Disabled)");
            
            $('#boldid_instruction').html("&nbsp;&nbsp;&nbsp;Schedule & Instruction");
        }
    });
}

function hideExternalItemsListingModal()
{
    $('#externalitemsforrxcreator').modal("hide");
    $('body').css('overflow', 'auto');
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
        
        var doctype = "Drugs and Meds";
        
        extitems_table = $('#external-items-masterlist-table').DataTable();
        extitems_table.clear().destroy();

        getAllExternalItemsListingAndAddItToTheTable(doctype);
    }
}

function onClickBreakfastCloseButton()
{
    $('#hiddbox_breakfasthom').val('NONE');
    $('#radioid_breakfastbeforehom').prop('checked',false);
    $('#radioid_breakfastafterhom').prop('checked',false);
    $('#selectid_breakfasthom').selectpicker('val','NONE');
}

function onClickLunchtimeCloseButton()
{
    $('#hiddbox_lunchtimehom').val('NONE');
    $('#radioid_lunchtimebeforehom').prop('checked',false);
    $('#radioid_lunchtimeafterhom').prop('checked',false);
    $('#selectid_lunchtimehom').selectpicker('val','NONE');
}

function onClickSuppertimeCloseButton()
{
    $('#hiddbox_suppertimehom').val('NONE');
    $('#radioid_suppertimebeforehom').prop('checked',false);
    $('#radioid_suppertimeafterhom').prop('checked',false);
    $('#selectid_suppertimehom').selectpicker('val','NONE');
}

function onclickAddToListBelow()
{
    var itemmeds = $('#textboxid_itemmedshom').val();
    var brandname = $('#textboxid_brandnamehom').val();
    var dosage = $('#textboxid_dosagehom').val();
    var prescription = $('#textboxid_prescriptionhom').val();
    var sideeffect = $('#textboxid_sideeffecthom').val();
    var indication = $('#textboxid_indicationhom').val();
    var quantity = $('#textboxid_quantityhom').val();
    var unit = $('#textboxid_unithom').val();
    var productid = $('#hiddboxid_productidhom').val();
    var hosplcode = $('#hiddboxid_hosplcodehom').val();
    
    var breakfastsel = $('#selectid_breakfasthom').val();
    if(breakfastsel === "NONE")
    {
        var breakfastseltime = "";
    }
    else
    {
        var breakfastseltime = breakfastsel;
    }

    var breakfasthid = $('#hiddbox_breakfasthom').val();
    if(breakfasthid === "BEFORE")
    {
        var breakfastbefore = "1";
        var breakfastafterx = "0";
        var breakfastb4tble = breakfastsel;
        var breakfastaftble = "-";
    }
    else if(breakfasthid === "AFTER")
    {
        var breakfastbefore = "0";
        var breakfastafterx = "1";
        var breakfastb4tble = "-";
        var breakfastaftble = breakfastsel;
    }
    else
    {
        var breakfastbefore = "0";
        var breakfastafterx = "0";
        var breakfastb4tble = "-";
        var breakfastaftble = "-";
    }
    
    var lunchtimesel = $('#selectid_lunchtimehom').val();
    if(lunchtimesel === "NONE")
    {
        var lunchtimeseltime = "";
    }
    else
    {
        var lunchtimeseltime = lunchtimesel;
    }
    
    var lunchtimehid = $('#hiddbox_lunchtimehom').val();
    if(lunchtimehid === "BEFORE")
    {
        var lunchtimebefore = "1";
        var lunchtimeafterx = "0";
        var lunchtimeb4tble = lunchtimesel;
        var lunchtimeaftble = "-";
    }
    else if(lunchtimehid === "AFTER")
    {
        var lunchtimebefore = "0";
        var lunchtimeafterx = "1";
        var lunchtimeb4tble = "-";
        var lunchtimeaftble = lunchtimesel;
    }
    else
    {
        var lunchtimebefore = "0";
        var lunchtimeafterx = "0";
        var lunchtimeb4tble = "-";
        var lunchtimeaftble = "-";
    }

    var suppertimesel = $('#selectid_suppertimehom').val();
    if(suppertimesel === "NONE")
    {
        var suppertimeseltime = "";
    }
    else
    {
        var suppertimeseltime = suppertimesel;
    }
    
    var suppertimehid = $('#hiddbox_suppertimehom').val();
    if(suppertimehid === "BEFORE")
    {
        var suppertimebefore = "1";
        var suppertimeafterx = "0";
        var suppertimeb4tble = suppertimesel;
        var suppertimeaftble = "-";
    }
    else if(suppertimehid === "AFTER")
    {
        var suppertimebefore = "0";
        var suppertimeafterx = "1";
        var suppertimeb4tble = "-";
        var suppertimeaftble = suppertimesel;
    }
    else
    {
        var suppertimebefore = "0";
        var suppertimeafterx = "0";
        var suppertimeb4tble = "-";
        var suppertimeaftble = "-";
    }

    var bedtimesel = $('#selectid_bedtimehom').val();
    if(bedtimesel === "NONE")
    {
        var bedtimefortable = "-";
        var bedtimeseltime = "";
    }
    else
    {
        var bedtimefortable = bedtimesel;
        var bedtimeseltime = bedtimesel;
    }

    var numofdays = $('#textboxid_numberofdayshom').val();
    
    var error = 0;

    if(itemmeds.length === 0)
    {
        $("#textboxid_itemmedshomerror").html("Field is Required!");
        $("#textboxid_itemmedshomerror").removeClass('d-none');
        error++;
    }
    else
    {
        $("#textboxid_itemmedshomerror").html("");
        $("#textboxid_itemmedshomerror").addClass('d-none');
    }

    if(brandname.length === 0)
    {
        $("#textboxid_brandnamehomerror").html("Field is Required!");
        $("#textboxid_brandnamehomerror").removeClass('d-none');
        error++;
    }
    else
    {
        $("#textboxid_brandnamehomerror").html("");
        $("#textboxid_brandnamehomerror").addClass('d-none');
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
                var station = $('#hiddbox_stationxhom').val();
                var station5string = station.substring(0, 5);
                var refcodedate = moment().format("MMDDYYYY");
                var refcodetime = moment().format("HHmmss");
                var refcode = refcodedate + "MD" + station5string + refcodetime;
                var itemgeneric = itemmeds + "-" + brandname;

                var textboxidtbl = "MEDICATION" + counterfortblemedication;

                clearMedicationInformationTabForm();

                takehome_table = $('#takehome-medication-listings-table').DataTable();
                takehome_table.row.add
                ([
                    "<button class='btn btn-sm btn-danger waves-effect btn-hom-del' title='Remove from list' style='margin-left:15px'><i class='zmdi zmdi-delete'></i></button>",
                    "",
                    itemgeneric.toUpperCase(),
                    dosage.toUpperCase(),
                    breakfastb4tble.toUpperCase(),
                    breakfastaftble.toUpperCase(),
                    lunchtimeb4tble.toUpperCase(),
                    lunchtimeaftble.toUpperCase(),
                    suppertimeb4tble.toUpperCase(),
                    suppertimeaftble.toUpperCase(),
                    bedtimefortable.toUpperCase(),
                    numofdays.toUpperCase(),
                    indication.toUpperCase(),
                    sideeffect.toUpperCase(),
                    quantity.toUpperCase(),
                    unit.toUpperCase(),
                    prescription.toUpperCase(),
                    refcode.toUpperCase(),
                    textboxidtbl
                ]).draw(false);

                var rxdate = moment().format('YYYY-MM-DD');
                
                var medicationdata = refcode.toUpperCase() + "|" +
                                     productid.toUpperCase() + "|" +
                                     hosplcode.toUpperCase() + "|" +
                                     rxdate.toUpperCase() + "|" +
                                     itemgeneric.toUpperCase() + "|" +
                                     itemmeds.toUpperCase() + "|" +
                                     brandname.toUpperCase() + "|" +
                                     prescription.toUpperCase() + "|" +
                                     quantity.toUpperCase() + "|" +
                                     unit.toUpperCase() + "|" +
                                     breakfastbefore.toUpperCase() + "|" +
                                     breakfastafterx.toUpperCase() + "|" +
                                     breakfastseltime.toUpperCase() + "|" +
                                     lunchtimebefore.toUpperCase() + "|" +
                                     lunchtimeafterx.toUpperCase() + "|" +
                                     lunchtimeseltime.toUpperCase() + "|" +
                                     suppertimebefore.toUpperCase() + "|" +
                                     suppertimeafterx.toUpperCase() + "|" +
                                     suppertimeseltime.toUpperCase() + "|" +
                                     bedtimeseltime.toUpperCase() + "|" +
                                     numofdays.toUpperCase() + "|" +
                                     dosage.toUpperCase() + "|" +
                                     indication.toUpperCase() + "|" +
                                     sideeffect.toUpperCase() + "|" +
                                     textboxidtbl;

                    counterfortblemedication++;
                    textBoxCreateForCreateTakeHomeMedication(medicationdata);
            }
            else
            {
                
            }
        });
    }
}

function textBoxCreateForCreateTakeHomeMedication(medicationdata)
{
    var medicationsplit = medicationdata.split('|');  
    var refcode = medicationsplit[0];
    var productid = medicationsplit[1];
    var hosplcode = medicationsplit[2];
    var rxdate = medicationsplit[3];
    var itemgeneric = medicationsplit[4];
    var itemmeds = medicationsplit[5];
    var brandname = medicationsplit[6];
    var prescription = medicationsplit[7];
    var quantity = medicationsplit[8];
    var unit = medicationsplit[9];
    var breakfastbefore = medicationsplit[10];
    var breakfastafterx = medicationsplit[11];
    var breakfastseltime = medicationsplit[12];
    var lunchtimebefore = medicationsplit[13];
    var lunchtimeafterx = medicationsplit[14];
    var lunchtimeseltime = medicationsplit[15];
    var suppertimebefore = medicationsplit[16];
    var suppertimeafterx = medicationsplit[17];
    var suppertimeseltime = medicationsplit[18];
    var bedtimeseltime = medicationsplit[19];
    var numofdays = medicationsplit[20];
    var dosage = medicationsplit[21];
    var indication = medicationsplit[22];
    var sideeffect = medicationsplit[23];
    var textboxidtbl = medicationsplit[24];

    var ref = document.createElement("INPUT");
    ref.setAttribute("type", "text");
    ref.setAttribute("id", textboxidtbl);
    ref.setAttribute("name", "refcode" + counterfortextmedication);
    ref.setAttribute("class", "refcode" + counterfortextmedication);
    ref.setAttribute("value", refcode);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(ref);
    
    var prd = document.createElement("INPUT");
    prd.setAttribute("type", "text");
    prd.setAttribute("id", textboxidtbl);
    prd.setAttribute("name", "productid" + counterfortextmedication);
    prd.setAttribute("class", "productid" + counterfortextmedication);
    prd.setAttribute("value", productid);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(prd);
    
    var hos = document.createElement("INPUT");
    hos.setAttribute("type", "text");
    hos.setAttribute("id", textboxidtbl);
    hos.setAttribute("name", "hosplcode" + counterfortextmedication);
    hos.setAttribute("class", "hosplcode" + counterfortextmedication);
    hos.setAttribute("value", hosplcode);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(hos);
    
    var rxd = document.createElement("INPUT");
    rxd.setAttribute("type", "text");
    rxd.setAttribute("id", textboxidtbl);
    rxd.setAttribute("name", "rxdate" + counterfortextmedication);
    rxd.setAttribute("class", "rxdate" + counterfortextmedication);
    rxd.setAttribute("value", rxdate);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(rxd);

    var gen = document.createElement("INPUT");
    gen.setAttribute("type", "text");
    gen.setAttribute("id", textboxidtbl);
    gen.setAttribute("name", "itemgeneric" + counterfortextmedication);
    gen.setAttribute("class", "itemgeneric" + counterfortextmedication);
    gen.setAttribute("value", itemgeneric);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(gen);
    
    var med = document.createElement("INPUT");
    med.setAttribute("type", "text");
    med.setAttribute("id", textboxidtbl);
    med.setAttribute("name", "itemmeds" + counterfortextmedication);
    med.setAttribute("class", "itemmeds" + counterfortextmedication);
    med.setAttribute("value", itemmeds);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(med);
    
    var brn = document.createElement("INPUT");
    brn.setAttribute("type", "text");
    brn.setAttribute("id", textboxidtbl);
    brn.setAttribute("name", "brandname" + counterfortextmedication);
    brn.setAttribute("class", "brandname" + counterfortextmedication);
    brn.setAttribute("value", brandname);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(brn);
    
    var prs = document.createElement("INPUT");
    prs.setAttribute("type", "text");
    prs.setAttribute("id", textboxidtbl);
    prs.setAttribute("name", "prescription" + counterfortextmedication);
    prs.setAttribute("class", "prescription" + counterfortextmedication);
    prs.setAttribute("value", prescription);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(prs);
    
    var qty = document.createElement("INPUT");
    qty.setAttribute("type", "text");
    qty.setAttribute("id", textboxidtbl);
    qty.setAttribute("name", "quantity" + counterfortextmedication);
    qty.setAttribute("class", "quantity" + counterfortextmedication);
    qty.setAttribute("value", quantity);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(qty);
    
    var uni = document.createElement("INPUT");
    uni.setAttribute("type", "text");
    uni.setAttribute("id", textboxidtbl);
    uni.setAttribute("name", "unit" + counterfortextmedication);
    uni.setAttribute("class", "unit" + counterfortextmedication);
    uni.setAttribute("value", unit);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(uni);
    
    var brb = document.createElement("INPUT");
    brb.setAttribute("type", "text");
    brb.setAttribute("id", textboxidtbl);
    brb.setAttribute("name", "breakfastbefore" + counterfortextmedication);
    brb.setAttribute("class", "breakfastbefore" + counterfortextmedication);
    brb.setAttribute("value", breakfastbefore);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(brb);
    
    var bra = document.createElement("INPUT");
    bra.setAttribute("type", "text");
    bra.setAttribute("id", textboxidtbl);
    bra.setAttribute("name", "breakfastafterx" + counterfortextmedication);
    bra.setAttribute("class", "breakfastafterx" + counterfortextmedication);
    bra.setAttribute("value", breakfastafterx);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(bra);
    
    var brt = document.createElement("INPUT");
    brt.setAttribute("type", "text");
    brt.setAttribute("id", textboxidtbl);
    brt.setAttribute("name", "breakfastseltime" + counterfortextmedication);
    brt.setAttribute("class", "breakfastseltime" + counterfortextmedication);
    brt.setAttribute("value", breakfastseltime);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(brt);
    
    var lub = document.createElement("INPUT");
    lub.setAttribute("type", "text");
    lub.setAttribute("id", textboxidtbl);
    lub.setAttribute("name", "lunchtimebefore" + counterfortextmedication);
    lub.setAttribute("class", "lunchtimebefore" + counterfortextmedication);
    lub.setAttribute("value", lunchtimebefore);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(lub);
    
    var lua = document.createElement("INPUT");
    lua.setAttribute("type", "text");
    lua.setAttribute("id", textboxidtbl);
    lua.setAttribute("name", "lunchtimeafterx" + counterfortextmedication);
    lua.setAttribute("class", "lunchtimeafterx" + counterfortextmedication);
    lua.setAttribute("value", lunchtimeafterx);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(lua);
    
    var lut = document.createElement("INPUT");
    lut.setAttribute("type", "text");
    lut.setAttribute("id", textboxidtbl);
    lut.setAttribute("name", "lunchtimeseltime" + counterfortextmedication);
    lut.setAttribute("class", "lunchtimeseltime" + counterfortextmedication);
    lut.setAttribute("value", lunchtimeseltime);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(lut);
    
    var sub = document.createElement("INPUT");
    sub.setAttribute("type", "text");
    sub.setAttribute("id", textboxidtbl);
    sub.setAttribute("name", "suppertimebefore" + counterfortextmedication);
    sub.setAttribute("class", "suppertimebefore" + counterfortextmedication);
    sub.setAttribute("value", suppertimebefore);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(sub);
    
    var sua = document.createElement("INPUT");
    sua.setAttribute("type", "text");
    sua.setAttribute("id", textboxidtbl);
    sua.setAttribute("name", "suppertimeafterx" + counterfortextmedication);
    sua.setAttribute("class", "suppertimeafterx" + counterfortextmedication);
    sua.setAttribute("value", suppertimeafterx);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(sua);
    
    var sut = document.createElement("INPUT");
    sut.setAttribute("type", "text");
    sut.setAttribute("id", textboxidtbl);
    sut.setAttribute("name", "suppertimeseltime" + counterfortextmedication);
    sut.setAttribute("class", "suppertimeseltime" + counterfortextmedication);
    sut.setAttribute("value", suppertimeseltime);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(sut);
    
    var bed = document.createElement("INPUT");
    bed.setAttribute("type", "text");
    bed.setAttribute("id", textboxidtbl);
    bed.setAttribute("name", "bedtimeseltime" + counterfortextmedication);
    bed.setAttribute("class", "bedtimeseltime" + counterfortextmedication);
    bed.setAttribute("value", bedtimeseltime);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(bed);
    
    var day = document.createElement("INPUT");
    day.setAttribute("type", "text");
    day.setAttribute("id", textboxidtbl);
    day.setAttribute("name", "numofdays" + counterfortextmedication);
    day.setAttribute("class", "numofdays" + counterfortextmedication);
    day.setAttribute("value", numofdays);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(day);
    
    var dos = document.createElement("INPUT");
    dos.setAttribute("type", "text");
    dos.setAttribute("id", textboxidtbl);
    dos.setAttribute("name", "dosage" + counterfortextmedication);
    dos.setAttribute("class", "dosage" + counterfortextmedication);
    dos.setAttribute("value", dosage);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(dos);
    
    var ind = document.createElement("INPUT");
    ind.setAttribute("type", "text");
    ind.setAttribute("id", textboxidtbl);
    ind.setAttribute("name", "indication" + counterfortextmedication);
    ind.setAttribute("class", "indication" + counterfortextmedication);
    ind.setAttribute("value", indication);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(ind);
    
    var sid = document.createElement("INPUT");
    sid.setAttribute("type", "text");
    sid.setAttribute("id", textboxidtbl);
    sid.setAttribute("name", "sideeffect" + counterfortextmedication);
    sid.setAttribute("class", "sideeffect" + counterfortextmedication);
    sid.setAttribute("value", sideeffect);
    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(sid);
    
//    var br1 = document.createElement("BR");
//    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(br1);
//    
//    var br2 = document.createElement("BR");
//    document.getElementById("myFormTakeHomeMedicationMultipleDataStorage").appendChild(br2);
    
    counterfortextmedication++; 
}

function clearMedicationInformationTabForm()
{
    $('#hiddboxid_productidhom').val("");
    $('#hiddboxid_hosplcodehom').val("");
    $('#textboxid_itemmedshom').val("");
    $('#textboxid_itemmedshomerror').html("");
    $('#textboxid_brandnamehom').val("");
    $('#textboxid_brandnamehomerror').html("");
    $('#textboxid_dosagehom').val("");
    $('#radioid_breakfastbeforehom').prop('checked',false);
    $('#radioid_breakfastafterhom').prop('checked',false);
    $('#selectid_breakfasthom').selectpicker('val', 'NONE');
    $('#selectid_breakfasthom').selectpicker('refresh');
    $('#hiddbox_breakfasthom').val("NONE");
    $('#radioid_lunchtimebeforehom').prop('checked',false);
    $('#radioid_lunchtimeafterhom').prop('checked',false);
    $('#selectid_lunchtimehom').selectpicker('val', 'NONE');
    $('#selectid_lunchtimehom').selectpicker('refresh');
    $('#hiddbox_lunchtimehom').val("NONE");
    $('#radioid_suppertimebeforehom').prop('checked',false);
    $('#radioid_suppertimeafterhom').prop('checked',false);
    $('#selectid_suppertimehom').selectpicker('val', 'NONE');
    $('#selectid_suppertimehom').selectpicker('refresh');
    $('#hiddbox_suppertimehom').val("NONE");
    $('#selectid_bedtimehom').selectpicker('val', 'NONE');
    $('#selectid_bedtimehom').selectpicker('refresh');
    $('#textboxid_numberofdayshom').val("");
    $('#textboxid_prescriptionhom').val("");
    $('#textboxid_sideeffecthom').val("");
    $('#textboxid_indicationhom').val("");
    $('#textboxid_quantityhom').val("");
    $('#textboxid_unithom').val("");
}

function attachAllMultipleTextboxToSingleTextbox()
{
    var datamedication = '';
    for(var i=1; i<counterfortextmedication; i++)
    {
        datamedication +=  "?:" + $('.refcode' + i).val() + "|" 
                                + $('.productid' + i).val() + "|" 
                                + $('.hosplcode' + i).val() + "|"
                                + $('.rxdate' + i).val() + "|"
                                + $('.itemgeneric' + i).val() + "|"
                                + $('.itemmeds' + i).val() + "|"
                                + $('.brandname' + i).val() + "|"
                                + $('.prescription' + i).val() + "|"
                                + $('.quantity' + i).val() + "|"
                                + $('.unit' + i).val() + "|"
                                + $('.breakfastbefore' + i).val() + "|"
                                + $('.breakfastafterx' + i).val() + "|"
                                + $('.breakfastseltime' + i).val() + "|"
                                + $('.lunchtimebefore' + i).val() + "|"
                                + $('.lunchtimeafterx' + i).val() + "|"
                                + $('.lunchtimeseltime' + i).val() + "|"
                                + $('.suppertimebefore' + i).val() + "|"
                                + $('.suppertimeafterx' + i).val() + "|"
                                + $('.suppertimeseltime' + i).val() + "|"
                                + $('.bedtimeseltime' + i).val() + "|"
                                + $('.numofdays' + i).val() + "|"
                                + $('.dosage' + i).val() + "|"
                                + $('.indication' + i).val() + "|"
                                + $('.sideeffect' + i).val();
                        
    }      
   
    var undefinedstr = "?:undefined|undefined|undefined|undefined" +
                       "|undefined|undefined|undefined|undefined" +
                       "|undefined|undefined|undefined|undefined" +
                       "|undefined|undefined|undefined|undefined" +
                       "|undefined|undefined|undefined|undefined" +
                       "|undefined|undefined|undefined|undefined";
    
    $("#inputid_hiddenmedicationhom").text(datamedication);
    var mymedicationstring = $("#inputid_hiddenmedicationhom").text();
    var newmedicationstring = replaceAll(mymedicationstring, undefinedstr, '');
    var medicationalldata = $("#inputid_medicationdatahom").val(newmedicationstring);
    var result = medicationalldata.val().split(":");
    var finalmedicationdata = cleanArray(result);
    $("#inputid_finalmedicationdatahom").val(finalmedicationdata);
        
    validateMultipleMedicationTextboxData();
}

function validateMultipleMedicationTextboxData()
{
    var finalmedicationtxtbox = $('#inputid_finalmedicationdatahom').val();
    if(finalmedicationtxtbox === "")
    {
        $('#takehomemedtableerror').html("Medication Listing is Required!").removeClass('d-none');
        
        swal
        ({
            title: "Validation Notice!",
            text: "Medication Listing is Required!",
            type: "warning",
            allowOutsideClick: false
        });
    }
    else
    {
        $('#takehomemedtableerror').html("").addClass('d-none');
        saveAndUpdateTakeHomeMedicationData();
    }
}

function saveAndUpdateTakeHomeMedicationData()
{
    $.ajax
    ({
        type: 'POST',
        data:
        {
            Patname: $('#textboxid_patientnamehom').val(),
            sex: $('#selectid_pxgenderhom').val(),
            age: $('#textboxid_patientagehom').val(),
            address: $('#textboxid_pxaddresshom').val(),
            bday: $('#textboxid_birthdatehom').val(),
            dateadmitted: $('#textboxid_admissiondatehom').val(),
            datedischarged: $('#textboxid_dischargedatehom').val(),
            roomreference: $('#textboxid_roominfohom').val(),
            specialinstruction: $('#textareaid_specialinshom').val(),
            Dxdiagnosis: $('#textareaid_finaldiagnosehom').val(),
            dietspecs: $('#textareaid_dietspecifichom').val(),
            avoid: $('#textareaid_tobeavoidedhom').val(),
            visitinstruction: $('#textareaid_nextvisithom').val(),
            labfollowup: $('#textareaid_laboratoryhom').val(),
            radfollowup: $('#textareaid_procedureshom').val(),
            RxBatch: $('#hiddbox_casecodehom').val(),
            RxDate: $('#textboxid_instructdatehom').val(),
            phicrefcode: "",
            pattype: $('#hiddbox_pattypexhom').val(),
            patacctcode: $('#hiddbox_casecodehom').val(),
            patacctno: $('#textboxid_accountnohom').val(),
            pincode: $('#hiddbox_pinnumbrhom').val(),
            reasonofrx: "DISCHARGE INSTRUCTIONS",
            Doctor: $('#textboxid_attenddochom').val(),
            DrRefno: $('#hiddbox_docrefnohom').val(),
            S2no: $('#hiddbox_s2noxxxxhom').val(),
            PTRno: $('#hiddbox_ptrnoxxxhom').val(),
            Licno: $('#hiddbox_licnoxxxhom').val(),
            footers: $('#textareaid_specialinshom').val(),
            transactiontype: "DISCHAINST",
            instructionsby: $('#selectid_instructbyhom').val(),
            reqtype: "",
            grouping: "",
            dept: "",
            medmultidata: $('#inputid_finalmedicationdatahom').val()
        },
        url: BASE_URL + 'HomeInstruction/UpdateTakeHomeInstruction',
        dataType: 'json',
        success: function (result) 
        {
            if (result.status === true)
            {
                var caseno = $('#textboxid_accountnohom').val();
                var instructdate = $('#textboxid_instructdatehom').val();

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
                        showUserOptionModal(caseno, instructdate);
                        
                        clearAllHomeInstructionFormElements();
                        clearMedicationInformationTabForm();
                        
                        takehome_table.clear().draw();
                        $('#myFormTakeHomeMedicationMultipleDataStorage').empty();
                        $('#inputid_hiddenmedicationhom').empty();
                        $('#inputid_medicationdatahom').val("");
                        $('#inputid_finalmedicationdatahom').val("");
                    }
                });
            }
            else
            {
                swal
                ({
                    title: "Error Notice!",
                    text: "Result status is false!",
                    type: "error",
                    allowOutsideClick: false
                });
            }
        }
    });
}

function showUserOptionModal(caseno, instructdate)
{
    $('#hiddenboxid_patientcasenumberhom').val(caseno);
    $('#hiddenboxid_rxinstructiondatehom').val(instructdate);
    
    $('#printrxdatahomemodal').modal
    ({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
    $('#printrxdatahomemodal').css('overflow-y', 'scroll');
}

function hideUserOptionModal()
{   
    $('#printrxdatahomemodal').modal("hide");
    $('body').css('overflow', 'auto');
}

function onclickUserOptionButtonFromSelectedRadioElement()
{
    var casenumberx = $('#hiddenboxid_patientcasenumberhom').val();
    var instrctdate = $('#hiddenboxid_rxinstructiondatehom').val();
    
    if ($("#radioid_printprescripthom").is(":checked"))
    {
        alert("UNDER DEVELOPMENT!");
        //$('#generate-patient-diagnostic-data-form input[name=hiddennameforprintdiagnostic]').val(caseno);
        //$("#generate-patient-diagnostic-data-form").submit();
    }
    else
    {
        alert("UNDER DEVELOPMENT!");
        //$('#generate-patient-diagnostic-data-form input[name=hiddennameforprintdiagnostic]').val(caseno);
        //$("#generate-patient-diagnostic-data-form").submit();
    }
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

//-------------------------DOCTOR MANAGEMENT---------------------------

function showSearchDoctorModalForAdmission()
{
    $('#searchdoctormodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('body').css('overflow', 'hidden');
    $('#searchdoctormodal').css('overflow-y', 'scroll');
    
    doctors_table.on('dblclick', 'tr', function ()
    {
        var data = doctors_table.row(this).data();
        var doctordata = data[2] + ", " + data[1] + " " + data[3];
        $('#textboxid_attenddochom').val(doctordata.toUpperCase());
        
        var doctorid = data[15];
    
        $.ajax
        ({
            type: 'POST',
            url: BASE_URL + "HomeInstruction/getDoctorsDataForHomeInstruction",
            data: {doctoridx: doctorid},
            dataType: 'json'
        })
        .done(function (data)
        {
            $('#hiddbox_docrefnohom').val(data.doctorsdata['docrefno']);
            $('#hiddbox_s2noxxxxhom').val(data.doctorsdata['S2no']);
            $('#hiddbox_ptrnoxxxhom').val(data.doctorsdata['PTR']);
            $('#hiddbox_licnoxxxhom').val(data.doctorsdata['Licno']);
        });

        hideSearchDoctorModalForAdmission();
    });
}

function hideSearchDoctorModalForAdmission()
{
    $('#searchdoctormodal').modal("hide");
    $('body').css('overflow', 'auto');
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
            url: BASE_URL + 'Doctors/GetAllDoctors',
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
                if (result.status === false)
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
    var doctordata = selectedDoctor[2] + ", " + selectedDoctor[1] + " " + selectedDoctor[3];
    $('#textboxid_attenddochom').val(doctordata.toUpperCase());
    
    var doctorid = selectedDoctor[15];
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "HomeInstruction/getDoctorsDataForHomeInstruction",
        data: {doctoridx: doctorid},
        dataType: 'json'
    })
    .done(function (data)
    {
        $('#hiddbox_docrefnohom').val(data.doctorsdata['docrefno']);
        $('#hiddbox_s2noxxxxhom').val(data.doctorsdata['S2no']);
        $('#hiddbox_ptrnoxxxhom').val(data.doctorsdata['PTR']);
        $('#hiddbox_licnoxxxhom').val(data.doctorsdata['Licno']);
    });
    
    hideSearchDoctorModalForAdmission();
}

function checkFieldValidations(resultError, errorfield, field)
{
    if (resultError !== '') { //If has error
        $('#' + errorfield).empty();
        $('#' + errorfield).append(resultError).removeAttr('hidden');
        $('#' + field).css('border-color', 'red');
    } else { //if no errors
        $('#' + errorfield).attr('hidden', true);
        $('#' + field).removeAttr('style');
    }
}