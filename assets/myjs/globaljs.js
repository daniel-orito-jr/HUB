var globaljs =
{
    pxlist : function()
    {
        alert('Hello');
    },
    
    getpxinfo : function()
    {
        var cmb = $('#cmb-select-patient').val();
        if(cmb !== "All")
        {
        window.open(BASE_URL + 'Main?cc='+cmb,'_blank');
        }
    },
    
    fetch_admission_history : function()
    {
       var pin_number = $('#pinx').val();
        $('#admission-history-table').dataTable().fnDestroy();
        var table = $('#admission-history-table').dataTable({
            dom: 'fr',
//            responsive: true,
            processing: true,
            serverSide: true,
            order: [],
            pageLength: 5,
            searching: false,
            ajax: {

                url: BASE_URL + 'Main/fetch_admission_history',
                type: 'POST',
                data: {pin_number: pin_number}
            },
            createdRow: function (row, data, dataIndex) {},

            initComplete: function (settings, json) {}
        });

        $('#admission-history-table_filter input').unbind();
        $('#admission-history-table_filter input').bind('keyup', function (e) {
            if (e.keyCode == 13)
            {
                table.fnFilter(this.value);
            }
        }); 
    }
}

$('#admission-history-table').on('click', 'td', function () {
    
    var current_row = $(this).parents('tr');//Get the current row
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
    var data = $('#admission-history-table').dataTable().fnGetData(current_row);
    show_admission_history(data);
 
});

function show_admission_history(data)
{
    $.ajax({
        type: 'POST',
        url:  BASE_URL + "Main/patient_admission_history",
        data: {caseno:data[0]},
        dataType: 'json'
        }).done(function(data1) {
            if (data1.status) {
                $('#txtcaseno').val(data1.admit_history['caseno']);
                $('#txtpxtype').val(data1.admit_history['pxtype']);
                $('#txthrncode').val(data1.admit_history['HRNcode']);
                $('#txtentrytype').val(data1.admit_history['casetype']);
                $('#txtadmissiontype').val(data1.admit_history['admittype']);
                $('#txtadmitdate').val(moment(data1.admit_history['admitdate']+" "+data1.admit_history['admittime']).format('LLL'));
                if(data1.admit_history['discharged'] == '0')
                { $('#txtdischadate').val("Currently Admitted");}
                else
                { $('#txtdischadate').val(moment(data1.admit_history['dischadate']+" "+data1.admit_history['dischatime']).format('LLL')); }
                $('#txtvaluecard').val(data1.admit_history['membercardno']);
                $('#txtchiefcomplaint').val(data1.admit_history['Diag_chiefcomplain']);
                $('#txtadmittingdiagnosis').val(data1.admit_history['Diag_admit']);
                $('#txtfinaldiagnosis').val(data1.admit_history['Diag_discharge']);
                $('#txtpatientstatus').val(data1.admit_history['dietstatus']);
                $('#txtkin').val(data1.admit_history['guarantor']);
                $('#txtkinbday').val(moment(data1.admit_history['guarantor_bday']).format('LL'));
                $('#txtkinrelationship').val(data1.admit_history['guarantor_rltn']);
                $('#txtguardiannumber').val(data1.admit_history['guarantor_mobileno']);
                $('#txtpatientnumber').val(data1.admit_history['mobileno']);
                $('#txtbillingnumber').val(data1.admit_history['billingcprecipient']);
                $('#txtattendingdoctor').val(data1.admit_history['doctorname']);
                $('#txtnurseattendant').val(data1.admit_history['nursename']);
                $('#txtroom').val(data1.admit_history['roombrief']);
                $('#txtroomrate').val(data1.admit_history['roomrate']);
                $('#txtancillaryrate').val(data1.admit_history['addonserv']);
                $('#txtadmission').val(data1.admit_history['admissionsource']);
                $('#txtweight').val(data1.admit_history['Weight']);
                $('#txtcautions').val(data1.admit_history['cautions']);
                $('#txttbdots').val(data1.admit_history['TBstatus']);
                $('#txtpackage').val(data1.admit_history['packageCODE']);
                $('#txtnurseincharge').val(data1.admit_history['Nurseincharge']);
                $('#txtstation').val(data1.admit_history['station']);
                $('#txtphtype').val(data1.admit_history['phicmembr']);
                $('#txtphmemberno').val(data1.admit_history['phicPIN']);
                $('#txtphmembername').val(data1.admit_history['phicmembrname']);
                $('#txtphmembrrelation').val(data1.admit_history['relationtomember']);
                $('#txtpxclassification').val(data1.admit_history['pat_clascode']);
                $('#txtpxmedclassification').val(data1.admit_history['pat_classub']);
                if(data1.admit_history['pat_clascode'] == "Gynecology")
                {
                    $('#class_medical').attr('hidden',true);
                    $('#class_pathologic').attr('hidden',true);
                    $('#class_obgyne').removeAttr('hidden',true);
                }
                else if(data1.admit_history['pat_clascode'] == "Surgical")
                {
                    $('#class_medical').attr('hidden',true);
                    $('#class_pathologic').removeAttr('hidden',true);
                    $('#class_obgyne').attr('hidden',true);
                }
                else if(data1.admit_history['pat_clascode'] == "Obstetrics")
                {
                    $('#class_medical').attr('hidden',true);
                    $('#class_pathologic').removeAttr('hidden',true);
                    $('#class_obgyne').removeAttr('hidden',true);
                }
                else
                {
                    $('#class_medical').removeAttr('hidden',true);
                    $('#class_pathologic').attr('hidden',true);
                    $('#class_obgyne').attr('hidden',true);
                }
                $('#txtspouse').val(data1.admit_history['spouse']);
                $('#txtspousebday').val(data1.admit_history['spousebday']);
                $('#txttransferfrom').val(data1.admit_history['ReferredFromHCI']);
                $('#txtcrmax').val(data1.admit_history['creditmax']);
                $('#txttransferto').val(data1.admit_history['TransRefHCI']);
                $('#txttransferofreferral').val(data1.admit_history['reasonforreferral']);
                $('#txtdisposition').val(data1.admit_history['disposition']);
                $('#txtdietary').val(data1.admit_history_diet['dietdscr']);
                if(data1.admit_history['minorOR'] == '1')
                {
                    $('#minor_or').prop('checked',true);
                }
                else
                {
                    $('#minor_or').prop('checked',false);
                }
                
                if(data1.admit_history['vip'] == '1')
                {
                    $('#security_risk').prop('checked',true);
                }
                else
                {
                    $('#security_risk').prop('checked',false);
                }
                if(data1.admit_history_sub !== null)
                {
                    $('#txtlink').val(data1.admit_history_sub['linkaccount']);
                    $('#txtgravida').val(data1.admit_history_sub['gravida']);
                    $('#txtpara').val(data1.admit_history_sub['para']);
                    $('#txtabortion').val(data1.admit_history_sub['abortion']);
                    $('#txtiufd').val(data1.admit_history_sub['iufd']);
                    $('#txtdied').val(data1.admit_history_sub['died']);
                }
            } 
            else 
            {
                console.log('fail');
            }
        });
}

$('#all-inpatient-masterlist-table').on('click', 'td', function () {
    
    var current_row = $(this).parents('tr');//Get the current row
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
    var data = $('#all-inpatient-masterlist-table').dataTable().fnGetData(current_row);
    window.open(BASE_URL + 'Main?cc='+data[1],'_blank');
 
});