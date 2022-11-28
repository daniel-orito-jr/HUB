<section class="content">
    <div class="block-header" id="">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Radiology Result Management
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Dashboard'); ?>"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item active">Radiology Result</li>
                </ul>
            </div>
        </div>
    </div>    
    <div class="container-fluid">   
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header" style="margin-bottom:0px;padding-bottom:0px;">
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h2><strong>Patient</strong> Listing<small></small> </h2>
                            </div>
                        </div>
                    </div>
                    <div class="body"> 
                        <input type="hidden" id="acctcode"/>
                        <input type="hidden" id="admit"/>
                        <input type="hidden" id="acctno"/>
                        <input type="hidden" id="pincode"/>
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="row clearfix">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <div class="radio">
                                            <input type="radio" name="radio1" id="radioid_currentpxlrad" value="option1" onchange="onChangeCurrentRecordRadioButton()">
                                            <label for="radioid_currentpxlrad">
                                                View Latest Records
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <div class="radio">
                                            <input type="radio" name="radio1" id="radioid_archivepxlrad" value="option2" onchange="onChangeArchiveRecordRadioButton()">
                                            <label for="radioid_archivepxlrad">
                                                View Archives Records
                                            </label>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="tab-content m-t-10">
                                    <div role="tabpanel" class="tab-pane in active" id="normal">
                                        <div class="tab-pane table-responsive active">
                                            <table class="table table-bordered table-hover" id="radiology-masterlist-table">
                                                <thead>
                                                    <tr>    
                                                        <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                        <th>No.</th>
                                                        <th>Patients</th>
                                                        <th>Type</th>
                                                        <th>Req.No.</th>
                                                        <th>Trans.Date</th>
                                                        <th>Age</th>
                                                        <th>Sex</th>
                                                        <th>Lbs.</th>
                                                        <th>Pat.Status</th>
                                                        <th>Doctor</th>
                                                        <th>Trans.No.</th>
                                                        <th>Patient No.</th>
                                                        <th>Ref.No.</th>
                                                        <th>Trans.Code.</th>
                                                        <th>ID</th>
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
        </div>
    </div>
</section>


<?php $this->load->view('modals/create_newrx'); ?>
<?php $this->load->view('modals/doc_management'); ?>
<?php $this->load->view('modals/add_doctors'); ?>
<?php $this->load->view('modals/inpatientlist_forlabresults'); ?>
<?php $this->load->view('modals/externalitems_forrxcreator'); ?>
<?php $this->load->view('modals/printrx_data_home'); ?>
