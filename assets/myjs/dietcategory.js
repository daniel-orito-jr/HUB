var diet_table = null;
var selectedDietary;
var currentbox = '';
var previouscheckbox = '';
var value = '';
var text = '';

$(function () 
{
    console.log('dietary guide');
    dietary_table();
    selectDietary();
});

$('#dietaryadm').on('keyup', function () {
    console.log($('#dietaryadm').val().length);
    if ($('#dietaryadm').val().length > 2 && $('#dietaryadm').val().length < 4) {
        text = $('#dietaryadm').val();
        $('#dietary_guide_table_filter [type="search"]').val(text);

        diet_table.search(text).draw();
        $('#dietary_guide_modal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
        $('#admitpatientmodal').modal("hide");
        $('body').css('overflow', 'hidden');
        $('#dietary_guide_modal').css('overflow-y', 'scroll');
    }
}
);


function show_dietary_modal()
{
    $('#dietary_guide_modal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#admitpatientmodal').modal("hide");
    $('body').css('overflow', 'hidden');
    $('#dietary_guide_modal').css('overflow-y', 'scroll');
}

function close_dietary_guide() 
{
    $('#dietary_guide_modal').modal("hide");

    $('#admitpatientmodal').modal
            ({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
}

$('#dietary_guide_modal').on('shown.bs.modal', function () {
    $('#dietary_guide_table_filter [type="search"]').focus();
});
$('#dietary_guide_modal').on('hidden.bs.modal', function () {
    $('#dietary_guide_table_filter [type="search"]').focus();
});

function dietary_table() {

    diet_table = $('#dietary_guide_table').DataTable
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
            url: BASE_URL + "DietCategory/FetchDietaryGuide",
            type: "POST"
        }
    });
    
    diet_table.on('dblclick', 'tr', function ()
    {
        var data = diet_table.row(this).data();
        var dietaryinstruction = data[1];
        var dietarycode = data[2];

        $('#dietaryviewadm').val(dietaryinstruction);
        $('#dietaryadm').val(dietarycode);
        
        close_dietary_guide();
    });

}

function selectDietary()
{
    var data;

    $('#dietary_guide_table tbody').on('click', 'tr', function ()
    {
        if ($(this).hasClass('bg-blue'))
        {
            $(this).removeClass('bg-blue');
        }
        else
        {
            $('#dietary_guide_table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#dietary_guide_table').DataTable().row('.bg-blue').data();
            selectedDietary = data;
        }
    });
}


function selectDietaryForAdmitPatient()
{
    var dietaryinstruction = selectedDietary[1];
    var dietarycode = selectedDietary[2];

    $('#dietaryviewadm').val(dietaryinstruction);
    $('#dietaryadm').val(dietarycode);
    
    close_dietary_guide();
}

function addNewDietaryForAdmission()
{
    alert("Under Development!");
}

function editDietaryData(dietarycode)
{
    alert("Under Development!");
}

function deleteDietaryData(dietarycode)
{
    alert("Under Development!");
}