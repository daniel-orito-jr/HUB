<section class="content">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Package Management
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
                    <li class="breadcrumb-item"><a href="">Management</a></li>
                    <li class="breadcrumb-item active">Packages</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card patients-list">
                    <div class="header">
                        <h2><strong>Package</strong> List</h2>
                        <button type="button" class="btn btn-primary btn-round waves-effect float-right" onclick='showAddPackagesModalForManager()'><i class="zmdi zmdi-plus"></i>&nbsp;&nbsp;<b>NEW PACKAGE</b></button>
                    </div>
                    <div class="body">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs padding-0">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#All">All</a></li>
                            <!--                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#USA">USA</a></li>
                                                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#India">India</a></li>-->
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content m-t-10">
                            <div class="tab-pane table-responsive active" id="All">
                                <table class="table table-bordered table-striped table-hover" id="package-management-table" style='width:100%;'>
                                    <thead>
                                        <tr>                                       
                                            <th>Action</th>
                                            <th>Package&nbsp;&nbsp;Code</th>
                                            <th>Patient&nbsp;&nbsp;Name</th>
                                            <th>Package&nbsp;&nbsp;Acct#</th>
                                            <th>Admission&nbsp;&nbsp;Acct#</th>
                                            <th>Doctor</th>
                                            <th>Package&nbsp;&nbsp;Php</th>
                                            <th>Active</th>
                                            <th>Enroll&nbsp;&nbsp;Date</th>
                                            <th>Doc/Booklet&nbsp;&nbsp;Ref.&nbsp;&nbsp;No.</th>
                                            <th>Doctor</th>
                                            <th>Status</th>
                                            <th>SL&nbsp;&nbsp;Code</th>
                                            <th>Total&nbsp;&nbsp;Deposits</th>
                                            <th>Updated</th>
                                            <th>PIN</th>
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

<?php $this->load->view('modals/add_packages'); ?>
<?php $this->load->view('modals/pxmasterlist_forpackage'); ?>
<?php $this->load->view('modals/package_masterlist'); ?>
<?php $this->load->view('modals/docmasterlist_forpackage'); ?>

