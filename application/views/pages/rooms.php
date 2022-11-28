<section class="content">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Rooms Management
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <!--                <button class="btn btn-primary btn-icon btn-round d-none d-md-inline-block float-right m-l-10" type="button" onclick="showAddRoomsModal();">
                                    <i class="zmdi zmdi-plus"></i>
                                    <i class="material-icons">person_add</i>
                                </button>-->
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item"><a href="">Management</a></li>
                    <li class="breadcrumb-item active">Rooms</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card patients-list">
                    <div class="header">
                        <h2><strong>Rooms</strong> List</h2>
                        <button type="button" class="btn btn-primary btn-round waves-effect float-right" style='margin-left:70%;' onclick='showAddRoomsModal()'><i class="zmdi zmdi-plus"></i>&nbsp;&nbsp;<b>NEW ROOM</b></button>
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
                        <ul class="nav nav-tabs padding-0">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#All">All</a></li>
                            <!--                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#USA">USA</a></li>
                                                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#India">India</a></li>-->
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content m-t-10">
                            <div class="tab-pane table-responsive active" id="All">
                                <table class="table table-bordered table-striped table-hover" id="rooms-masterlist-table">
                                    <thead>
                                        <tr>                                       
                                            <th id="table-head-action2">Action</th>
                                            <th id="table-head-action2">Room&nbsp;&nbsp;Ref.No</th>
                                            <th id="table-head-action2">Room&nbsp;&nbsp;Code</th>
                                            <th id="table-head-action2">Room&nbsp;&nbsp;Type</th>
                                            <th id="table-head-name">Room/Area</th>
                                            <th id="table-head-action2">Bed&nbsp;&nbsp;No.</th>
                                            <th id="table-head-name">Description</th>
                                            <th id="table-head-action2">Room&nbsp;&nbsp;Rate</th>
                                            <th id="table-head-action2">Nursing</th>
                                            <th id="table-head-action2">Price&nbsp;&nbsp;Default</th>
                                            <th id="table-head-action2">Credit&nbsp;&nbsp;Max</th>
                                            <th id="table-head-action2">Phic.&nbsp;&nbsp;Type</th>
                                            <th id="table-head-action2">Station </th>
                                            <th id="table-head-name">Patient</th>
                                            <th id="table-head-action2">Admitted</th>
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

<?php $this->load->view('modals/add_rooms'); ?>