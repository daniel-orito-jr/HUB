<section class="content home">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-5 col-md-5 col-sm-12">
                <h2>Dashboard
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>            
            <div class="col-lg-7 col-md-7 col-sm-12 text-right">
<!--                <div class="inlineblock text-center m-r-15 m-l-15 d-none d-lg-inline-block">
                    <div class="sparkline" data-type="bar" data-width="97%" data-height="25px" data-bar-Width="2" data-bar-Spacing="5" data-bar-Color="#fff">3,2,6,5,9,8,7,9,5,1,3,5,7,4,6</div>
                    <small class="col-white">Visitors</small>
                </div>
                <div class="inlineblock text-center m-r-15 m-l-15 d-none d-lg-inline-block">
                    <div class="sparkline" data-type="bar" data-width="97%" data-height="25px" data-bar-Width="2" data-bar-Spacing="5" data-bar-Color="#fff">1,3,5,7,4,6,3,2,6,5,9,8,7,9,5</div>
                    <small class="col-white">Operations</small>
                </div>-->
<!--                <button class="btn btn-white btn-icon btn-round d-none d-md-inline-block float-right m-l-10" type="button" onclick="dashboard.addpx()">
                    <i class="zmdi zmdi-plus"></i>
                </button>-->
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href=""><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item active">Dashboard</li>
                </ul>
            </div>
        </div>
    </div>
   
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-lg-4 col-md-6">
                <div class="card">
                    <div class="body text-center">
                        <div class="sparkline m-b-20" data-type="bar" data-width="97%" data-height="40px" data-bar-Width="3" data-bar-Spacing="5" data-bar-Color="#00ced1">1,2,2,3,3,4,4,5,5,6,6,5,5,4,4,3,3,2,2,1</div>
                        <h3 class="m-b-0"><?= $census['census'] ?></h3>
                        <small class="displayblock">CENSUS for the day</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="card">
                    <div class="body text-center">
                        <div class="sparkline m-b-20" data-type="bar" data-width="97%" data-height="40px" data-bar-Width="3" data-bar-Spacing="5" data-bar-Color="#7cb5ec">1,2,3,4,5,4,3,2,1,2,3,4,5,6,7,8,7,6,5,4</div>
                        <h3 class="m-b-0"><?= $discharges['census'] ?></h3>
                        <small class="displayblock">DISCHARGES for the day</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="card">
                    <div class="body text-center">
                        <div class="sparkline m-b-20" data-type="bar" data-width="97%" data-height="40px" data-bar-Width="3" data-bar-Spacing="5" data-bar-Color="#f15c80">8,7,6,5,4,3,2,2,3,4,5,6,7,8,7,6,5,4</div>
                        <h3 class="m-b-0"><?= $admission['census'] ?></h3>
                        <small class="displayblock">ADMISSIONS for the day</small>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row clearfix">
            <div class="col-lg-8 col-md-12">
                <div class="card">
                    <div class="header">
                        <h2><strong>DISCHARGES</strong> for the last 3 months</h2>
                    </div>                    
                    <div class="body">
                        <ul class="nav nav-tabs padding-0">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#chart-view">Chart View</a></li>
                            <!--<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#table-view">Table View</a></li>-->
                        </ul>
                        <div class="tab-content m-t-10">
                            <div class="tab-pane active" id="chart-view">
                                <canvas id="myMChart" style=""></canvas>
                            </div>
                            <div class="tab-pane" id="table-view">
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="col-lg-4 col-md-12">
                <div class="card">
                    <div class="body">
                        <div class="input-group ">
                            <span class="input-group-addon">
                                <i class="zmdi zmdi-calendar"></i>
                            </span>
                            <input type="month" class="form-control datetimepicker" name="admission_date" id="admission_date" onchange="dashboard.fetch_admission_city()" placeholder="Please choose date & time..." value="<?= $now ?>">
                        </div>
                        <hr>
                        <div class="sparkline m-b-10" data-type="bar" data-width="97%" data-height="38px" data-bar-Width="2" data-bar-Spacing="6" data-bar-Color="#555555">2,8,5,3,1,7,9,5,6,4,2,3,1,2,8,5,3,1,7,9,5,6,4,2,3,1</div>
                        <h6 class="text-center m-b-15">ADMISSIONS <small>for the month</small></h6>
                        <!--<div id="world-map-markers2" style="height:125px;"></div>-->
                        <div class="table-responsive m-t-20">
                            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="admission-day-city-table">

                                <thead>
                                    <tr>
                                        <th>City</th>                                        
                                        <th>Patients</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div class="row clearfix">
            <div class="col-lg-6 col-md-12">
                <div class="card tasks_report">
                    <div class="header">
                        <h2><strong>Patients Classification</strong> for the day</h2>    
                    </div>
                    <div class="body text-center">
                        <canvas id="doughnutChart"></canvas>
                        <hr>
                        <div class="table-responsive">
                            <table id="px-classification-table" class="table table-bordered table-striped table-hover dataTable">
                                <thead>
                                    <tr> 
                                        <th>#</th>
                                        <th>Classification</th>
                                        <th>Patients</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12">
                <div class="card patient_list">
                    <div class="header">
                        <h2><strong>MAY GO HOME</strong> for the day</h2> 
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-striped m-b-0" id="may-go-home-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Case Number</th>
                                        <th>Name</th>
                                        <th>Disposition</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</section>

<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function () {
    dashboard.fetch_admission_day_city();
    dashboard.fetch_may_go_home_daily();
    dashboard.create_chart_discharges_three_months();
    dashboard.create_chart_classification();
});
</script>