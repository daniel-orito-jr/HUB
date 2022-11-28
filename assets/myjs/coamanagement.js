var selectedCOAData;

$(function () {
    getAllCOAAndAddItToTheTable();
    selectCOA();
});

/**
 * Get all coa data from the controller and add it to the datatable
 * @version 2019-02-18
 * @author LJ Roa
 */
function getAllCOAAndAddItToTheTable() {
    $('#coa-masterlist-table').dataTable().fnDestroy();

    var table = $('#coa-masterlist-table').dataTable({

        dom: 'frtip',
        responsive: true,
        processing: true,
        serverSide: true,
        order: [],
//        dom: "<'row'<'col-sm-5'l><'col-sm-7'f>>" +
//                "<'row'<'col-sm-12'tr>>" +
//                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        ajax: {

            url: BASE_URL + 'COA/GetAllCOA',
            type: 'POST'

        },

        createdRow: function (row, data, dataIndex) {

        },

        initComplete: function (settings, json) {

        }

    });

//    $('.accounttype').append("<select class='form-control show-tick' tabindex='-98' id='hospitalor'>" +
//            "<option value='1'>ASSET</option>" +
//            "<option value='2'>LIABILITIES</option>" +
//            "<option value='3'>CAPITAL</option>" +
//            "<option value='4'>INCOME</option>" +
//            "<option value='5'>EXPENSE</option>" +
//            "<option value='9'>TRANSITORY</option>" +
//            "<option value='ALL'>ALL</option>" +
//            "</select>");
//
//    $('.category').append("<select class='form-control show-tick' tabindex='-98' id='category'>" +
//            "<option value='1'>POSTING</option>" +
//            "<option value='0'>GROUP</option>" +
//            "<option value=" + 'ALLCATEGORY' + ">ALL</option>" +
//            "</select>");
//
//    $('.category').change(function () {
//        table.fnFilter($('#category').val());
//        alert($('#category').val());
//    });

//    $("#coa-masterlist-table_filter").append(category);
//
//    $('#coa-masterlist-table_filter').unbind().bind('change', function () {
////        var result = table.column(6).search($('#category').val()).data().unique().sort();
//        table.rows({search: 'applied'}).data().each(function (value, index) {
//            console.log(value, index);
//        });

//        console.log(result);
//    });
    $('#coa-masterlist-table_filter input').unbind();
    $('#coa-masterlist-table_filter input').bind('keyup', function (e) {
        if (e.keyCode == 13)
        {
            table.fnFilter(this.value);
        }
    });
}

/**
 * show COA modal
 * @version 2019-02-18
 * @author LJ Roa
 */
function showCOAModal() {
//    $('#coamanagementmodal').modal({
//        show: true,
//        backdrop: 'static',
//        keyboard: false
//    });
    $('#coamanagementmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });

    $('#slcodemanagementmodal').css('overflow-y', 'scroll');
}

function hideCOAModal() {
    $('#coamanagementmodal').modal('hide');
}

/**
 * Make the coa table row selected when click.
 * @version 2019-02-19
 * @author LJ Roa
 */
function selectCOA() {
    var data;
    $('#coa-masterlist-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('bg-blue')) {
            $(this).removeClass('bg-blue');

        } else {
            $('#coa-masterlist-table').dataTable().$('tr.bg-blue').removeClass('bg-blue');
            $(this).addClass('bg-blue');

            var data = $('#coa-masterlist-table').DataTable().row('.bg-blue').data();
            selectedCOAData = data;
        }
    });

}


