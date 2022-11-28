<section class="content">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Patients
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <!--                <button class="btn btn-primary btn-icon btn-round d-none d-md-inline-block float-right m-l-10" type="button" onclick="showAddDoctorsModal();">
                                    <i class="zmdi zmdi-plus"></i>
                                    <i class="material-icons">person_add</i>
                                </button>-->
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href=""><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item"><a href="">Patients</a></li>
                    <li class="breadcrumb-item active">All Patients</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card patients-list">
                    <div class="header">
                        <h2><strong>Patients</strong> List</h2>
                        <!--                        <ul class="header-dropdown">
                                                    <li class="dropdown"> <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
                                                        <ul class="dropdown-menu dropdown-menu-right slideUp">
                                                            <li><a href="">Action</a></li>
                                                            <li><a href="">Another action</a></li>
                                                            <li><a href="">Something else</a></li>
                                                        </ul>
                                                    </li>
                                                    <li class="remove">
                                                        <a role="button" class="boxs-close"><i class="zmdi zmdi-close"></i></a>
                                                    </li>
                                                </ul>-->
                    </div>
                    <div class="body">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#adm">ADMITTED</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#dis">DISCHARGED</a></li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content">
                            
                            
                            <div role="tabpanel" class="tab-pane in active" id="adm">
                                <div class="tab-pane table-responsive active">
                                    <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="admitted-inpatient-masterlist-table">
                                        <thead>
                                            <tr>      
                                                <th>No.</th>
                                                <th>Pic.</th>
                                                <th>Name</th>
                                                <th class="d-none">PIN</th>
                                                <th>caseno</th>
                                                <th>Status</th>
                                                <th>Hospital No.</th>
                                                <th>Birthday</th>
                                                <th>Sex</th>
                                                <th>Last Discharged</th>
                                                <th>Address/Baragay</th>
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
                            
                            <div role="tabpanel" class="tab-pane" id="dis">
                                <div class="tab-pane table-responsive active">
                                    <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="discharged-inpatient-masterlist-table">
                                        <thead>
                                            <tr>            
                                                <th>No.</th>
                                                <th>Pic.</th>
                                                <th>Name</th>
                                                <th class="d-none">PIN</th>
                                                <th>caseno</th>
                                                <th>Status</th>
                                                <th>Hospital No.</th>
                                                <th>Birthday</th>
                                                <th>Sex</th>
                                                <th>Last Discharged</th>
                                                <th>Address/Baragay</th>
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
    </div>
</section>