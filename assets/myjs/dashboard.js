$(function ()
{
    tabsHighlightForDashboard();
});

function tabsHighlightForDashboard()
{
    $("#dashbrdsidetab").addClass("active");
}

var dashboard = {
    fetch_admission_day_city: function () {

        var admission_date = $('#admission_date').val();
        $('#admission-day-city-table').dataTable().fnDestroy();
        var table = $('#admission-day-city-table').dataTable({
            dom: 'fr',
            responsive: true,
            processing: true,
            serverSide: true,
            order: [],
            pageLength: 5,
            searching: false,
            ajax: {

                url: BASE_URL + 'Dashboard/fetch_admission_day_city',
                type: 'POST',
                data: {admitdate: admission_date}
            },
            createdRow: function (row, data, dataIndex) {},

            initComplete: function (settings, json) {}
        });

        $('#admission-day-city-table_filter input').unbind();
        $('#admission-day-city-table_filter input').bind('keyup', function (e) {
            if (e.keyCode == 13)
            {
                table.fnFilter(this.value);
            }
        });


    },

    fetch_admission_city: function ()
    {
        dashboard.fetch_admission_day_city();
    },

    fetch_may_go_home_daily: function () {

        $('#may-go-home-table').dataTable().fnDestroy();
        var table = $('#may-go-home-table').dataTable({
            dom: 'frtip',
            responsive: true,
            processing: true,
            serverSide: true,
            order: [],
            pageLength: 15,
            ajax: {

                url: BASE_URL + 'Dashboard/fetch_may_go_home_daily',
                type: 'POST',
            },
            createdRow: function (row, data, dataIndex) {},

            initComplete: function (settings, json) {}
        });

        $('#may-go-home-table_filter input').unbind();
        $('#may-go-home-table_filter input').bind('keyup', function (e) {
            if (e.keyCode == 13)
            {
                table.fnFilter(this.value);
            }
        });


    },

    create_chart_discharges_three_months: function ()
    {
        $.ajax({
            type: 'POST',
            url: BASE_URL + "Dashboard/create_chart_discharges_three_months",
            data: {},
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            if (data.status) {
                dashboard.mychart(data.discharges);
            } else {
                console.log("fail to load 2nd chart");
            }
        });

    },

    mychart: function (data)
    {
        var months = [],
                nonphic = [],
                phic = [],
                hmo = [];

        for (var i = 0; i < data.length; i++) {
            months.push(moment(data[i]['datex']).format('MMMM YYYY'));
            nonphic.push((data[i]['non'] === null) ? "0" : data[i]['non']);
            phic.push((data[i]['nhip'] === null) ? "0" : data[i]['nhip']);
            hmo.push((data[i]['hmo'] === null) ? "0" : data[i]['hmo']);
        }

        var ctx = document.getElementById("myMChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'NON-PHIC',
                        data: nonphic,
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'PHIC',
                        data: phic,
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'HMO',
                        data: hmo,
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
    },

    create_chart_classification: function ()
    {
        $.ajax({
            type: 'POST',
            url: BASE_URL + "Dashboard/create_chart_classification",
            data: {},
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            if (data.status) {
                dashboard.doughnut_chart(data.classification);
                $('#px-classification-table').dataTable().fnDestroy();
                var px_classification_table = $('#px-classification-table').DataTable({
                    dom: 'frti',
                    pageLength: 15,
                    responsive: true,
                    processing: true,
                    columnDefs: [{
                            targets: [0], // column or columns numbers
                            orderablecolumnDefs: false, // set orderable for selected columns
                        }],
//                     order: [1,2],
//                     orderable: false,
                    scrollX: true,
                });
                if (data.classification.length > 0)
                {
                    for (var i = 0; i < data.classification.length; i++)
                    {
                        px_classification_table.row.add([
                            (i + 1) + '. ',
                            data.classification[i]['pat_clascode'],
                            parseInt(data.classification[i]['px'])
                        ]).draw(false);
                    }
                } else
                {
                    $('#px-classification-table').dataTable().fnDestroy();
                    var px_classification_table = $('#px-classification-table').DataTable();
                    px_classification_table.clear();
                }
            } else {
                console.log("fail to load 2nd chart");
            }
        });

    },

    doughnut_chart: function (data)
    {
        var pat_clascode = [],
                px = [];

        for (var i = 0; i < data.length; i++) {
            pat_clascode.push(data[i]['pat_clascode']);
            px.push(parseInt(data[i]['px']));
        }

        var ctxD = document.getElementById("doughnutChart").getContext('2d');
        var myLineChart = new Chart(ctxD, {
            type: 'doughnut',
            data: {
                labels: pat_clascode,
                datasets: [{
                        data: px,
                        backgroundColor: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFC107", "#FF9800", "#FF5722"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                    }]
            },
            options: {
                responsive: true
            }
        });

    },
    
    addpx : function()
    {
        $('#addpatientsmodal').modal('show');
    },
    
    
    

}
