<section class="content">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Discharges
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <!--                <button class="btn btn-primary btn-icon btn-round d-none d-md-inline-block float-right m-l-10" type="button" onclick="showAddDoctorsModal();">
                                    <i class="zmdi zmdi-plus"></i>
                                    <i class="material-icons">person_add</i>
                                </button>-->
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item"><a href="">Discharges</a></li>
                    <li class="breadcrumb-item active">Discharged Patients</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card patients-list">
                    <div class="header">
                        <h2><strong>Discharged Patients</strong> List</h2>
                    </div>
                    <div class="body">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs padding-0">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#All">ALL</a></li>
<!--                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#USA">IPD</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#India">OPD</a></li>-->
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content m-t-10">
                            <div class="tab-pane table-responsive active">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="discharged-patients-masterlist-table">
                                    <thead>
                                        <tr>         
                                            <th>No.</th>
                                            <th>Pic.</th>
                                            <th>Name</th>
                                            <th class="d-none">PIN</th>
                                            <th>Caseno</th>
                                            <th>Status</th>
                                            <th>Hospital No.</th>
                                            <th>Birthday</th>
                                            <th>Sex</th>
                                            <th>Last Discharged</th>
                                            <th>Address/Barangay</th>
                                            <th>City/Municipality</th>
                                            <th>ID</th>
                                            <th>Updated</th>
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
    </div>
</section>