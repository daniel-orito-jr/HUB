$(function ()
{
    getAllPatientMasterlistAndAddItToTheTable();
    
    tabsHighlightForCF4Management();
});

function tabsHighlightForCF4Management()
{
    $("#cf4managersidetab").addClass("active");
}

function getAllPatientMasterlistAndAddItToTheTable()
{
    $('#drugs-medicine-patients-table').dataTable().fnDestroy();
    var table = $('#drugs-medicine-patients-table').dataTable
	({
        dom: 'frtip',
        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
        columnDefs: [{
                targets: [0,1,2,8], // column or columns numbers
                visible: false, // set orderable for selected columns
        }],
        ajax: {

            url: BASE_URL + 'CF4Mgmt/GetAllPatientFromMasterlist',
            type: 'POST'

        },
        createdRow: function (row, data, dataIndex)
        {
            if(data[7] == "Currently Admitted")
            {
                  $(row).css('background-color','#98FB98');
            }
        },
        initComplete: function (settings, json){}
    });

    $('#drugs-medicine-patients-table_filter input').unbind();
    $('#drugs-medicine-patients-table_filter input').bind('keyup', function (e)
    {
        if (e.keyCode == 13)
        {
            table.fnFilter(this.value);
        }
    });
}

$('#drugs-medicine-patients-table').on('click', 'td', function () {
    
    var current_row = $(this).parents('tr');//Get the current row
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
    var data = $('#drugs-medicine-patients-table').dataTable().fnGetData(current_row);
    fetchMedicineFromLedgerIPD(data);

//    show_medicine_patient_info(data);
});

function fetchMedicineFromLedgerIPD(datax)
{
    
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "CF4Mgmt/fetchMedicineFromLedgerIPD",
        data: {casecode:datax[2]},
        dataType: 'json'
    }).done(function (data){
        if (data.status)
        {
            show_medicine_patient_info(datax);
        }
        else
        {
            swal("Error", "Error in saving. Please try again!", "error");
        }
    });
}

function show_medicine_patient_info(data)
{
//    window.open(BASE_URL + "CF4Mgmt/PatientCF4Management/" +data[2]);
    $('#add_route_medicines').modal('show');
    $('#txtPIN').val(data[1]);
    $('#txtPHICPIN').val(data[8]);
    $('#largeModalLabel').html(data[4]);
    $('#sp_csno').html(data[3]);
    $('#sp_ad').html(data[5]);
    $('#sp_stat').html(data[7]);
    $('#txtcasenoOrder').val(data[3]);
    if(data[7] !== "Currently Admitted")
    {
        $('#dd').removeAttr('hidden','true');
        $('#sp_dd').html(data[6]);
    }
    else
    {
         $('#dd').attr('hidden','true');
    }
    $('#txtCasecode').val(data[2]);
    docact();
    loadMedicineFromCF4drug(data[2]);
}

function loadMedicineFromCF4drug(casecode)
{
    $('#drugs-medicine-table').dataTable().fnDestroy();
    var table = $('#drugs-medicine-table').dataTable
	({
        dom: 'frtip',
        responsive: true,
        processing: true,
        serverSide: true,
        pageLength:5,
        order: [],
        columnDefs: [{
                targets: [0,1,7,9], // column or columns numbers
                visible: false, // set orderable for selected columns
        }],
        ajax: {

            url: BASE_URL + 'CF4Mgmt/GetAllMedicinesByPx',
            type: 'POST',
            data:{casecode:casecode}
        },
        createdRow: function (row, data, dataIndex)
        {
//            if(data[7] == "Currently Admitted")
//            {
//                  $(row).css('background-color','#98FB98');
//            }
        },
        initComplete: function (settings, json){}
    });

    $('#drugs-medicine-table_filter input').unbind();
    $('#drugs-medicine-table_filter input').bind('keyup', function (e)
    {
        if (e.keyCode == 13)
        {
            table.fnFilter(this.value);
        }
    });
}

$('#drugs-medicine-table').on('click', 'td', function () {
    
    var current_row = $(this).parents('tr');//Get the current row
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
    var data = $('#drugs-medicine-table').dataTable().fnGetData(current_row);
    show_medicine_info(data);
});

function show_medicine_info(data)
{
    $('#txtDrugDscr').val(data[2]);
    $('#txtRoute').val(data[3]);
    $('#txtFrequency').val(data[4]);
    $('#txtQuantity').val(data[5]);
    $('#txtAmount').val(data[7]);
    $('#txtAddedDate').val(data[9]);
    $('#txtDrugID').val(data[0]);
    $('#txtProdID').val(data[1]);
}

function validateRouteFrequency()
{
    var error = 0;
    var route = $("#txtRoute").val();
    if (route === "")
    {
        $("#routeError").text("Required Field!");
        error++;
    } else
    {
        $("#routeError").text("");
    }
    
    var frequency = $("#txtFrequency").val();
    if (frequency === "")
    {
        $("#frequencyError").text("Required Field!");
        error++;
    } else
    {
        $("#frequencyError").text("");
    }
    
    if(error == 0)
    {
        saveRouteFrequencyToTheTable();
    }
}

function saveRouteFrequencyToTheTable()
{
   var casecode = $('#txtCasecode').val();
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "CF4Mgmt/updateRouteFrequency",
        data: $('#add_route_medicines_form').serialize(),
        dataType: 'json'
    }).done(function (data){
        if (data.status)
        {
            swal
            ({
                title: "Success!",
                text: "Record is successfully updated!",
                type: "success",
                allowOutsideClick: false
            });
            $('#txtDrugDscr').val('');
            $('#txtRoute').val('');
            $('#txtFrequency').val('');
            $('#txtQuantity').val('');
            $('#txtAmount').val('');
            $('#txtAddedDate').val('');
            $('#txtDrugID').val('');
            $('#txtProdID').val('');
            loadMedicineFromCF4drug(casecode);
            
            
        }
        else
        {
            swal("Error", "Error in saving. Please try again!", "error");
        }
    });
}


//COURSE IN THE WARD

function docact(){
//    alert();
        $('#doctors-order-table').dataTable().fnDestroy();
        var table = $('#doctors-order-table').dataTable({
            dom: 'frtip',
            processing:true,  
            serverSide:true, 
            responsive: true,
            order:[],  
            pageLength:5,
            columnDefs: [{
                targets: [0], // column or columns numbers
                visible: false, // set orderable for selected columns
        }],
            ajax:{  
                url:BASE_URL + "CF4Mgmt/fetch_doc_act",
                type:"POST",
                data: {caseno:$('#sp_csno').html()}
               
            },
            initComplete : function(settings, json){
                swal.close();
            }
        });
        
        $('#doctors-order-table_filter input').unbind();
        $('#doctors-order-table_filter input').bind('keyup', function(e) {
            if(e.keyCode == 13) {
            table.fnFilter(this.value);	
            }
        });
    }
//    
//$('#doctors-order-table').on('click', 'td', function () {
//    
//    var current_row = $(this).parents('tr');//Get the current row
//    if (current_row.hasClass('child')) {//Check if the current row is a child row
//        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
//    }
//    var data = $('#doctors-order-table').dataTable().fnGetData(current_row);
////    editDoctorsOrder(data);
//});
  

//function editDoctorsOrder(data)
//{
//    $('#txtDocDate').val(data[3]);
//    $('#txtDocOrder').val(data[4]);
//    $('#txtDocID').val(data[0]);
//}

function validateDocOrder()
{
    var error = 0;
    var txtDocDate = $("#txtDocDate").val();
    if (txtDocDate === "")
    {
        $("#txtDocDateError").text("Required Field!");
        error++;
    } else
    {
        $("#txtDocDateError").text("");
    }
    
    var txtDocOrder = $("#txtDocOrder").val();
    if (txtDocOrder === "")
    {
        $("#txtDocOrderError").text("Required Field!");
        error++;
    } else
    {
        $("#txtDocOrderError").text("");
    }
    
    if(error == 0)
    {
       updateDoctorsOrder();
    }
}

function removeDocAct (idx)
    {
//        var px = $('#caseno').val();
        swal({
            title: "Delete Doctor's Order?",
            text: "You won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function(){
            $.ajax({
            type: 'POST',
            url:  BASE_URL + "CF4Mgmt/remove_docact",
            data: {id:idx}, 
            dataType: 'json'
            }).done(function(datax) {
                console.log(datax.status);
                if (datax.status) 
                {
                    docact();
                } 
                else 
                {   
                    swal("Deleted Unsuccessfully!","Please try again later!","error"); 
                }
            });
        });
    }
            
            
   function editDoctorsOrder (doact_id,doact_date,doact_action)
    {
       
        $('#txtDocDate').val(doact_date);
        $('#txtDocOrder').val(doact_action);
        $('#txtDocID').val(doact_id);
    }
    
    function updateDoctorsOrder()
    {
        $.ajax({
            type: 'POST',
            url:  BASE_URL + "CF4Mgmt/updateDoctorsOrder",
            data: $('#add_doctors_order_form').serialize(), 
            dataType: 'json'
            }).done(function(datax) {
                console.log(datax.status);
                if (datax.status) 
                {
                  swal({title: "Successful", text: "Successfully updated!", type: "success"},
                    function(){
                        $('#txtDocOrder').val('');
                        docact();
                    });
                } 
                else 
                {   
//                    swal("Message Not Sent!","Please try again later!","error"); 
                }
        });
    }