<section class="content">
    <div class="block-header" id="">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Official Results Viewer
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Dashboard'); ?>"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item active">Laboratory Results</li>
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
                                <h2><strong>Ledger</strong> Listing<small></small> </h2>
                            </div>
                        </div>
                    </div>
                    <div class="body"> 
                        <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card top_counter">
                                    <div class="body" style="margin:0px;padding:0px;">
                                        <div class="icon xl-slategray"><i class="zmdi zmdi-face"></i> </div>
                                        <div class="content">
                                            <div class="text">PATIENT NAME</div>
                                            <h5 class="number"><?= $name ?></h5>
                                        </div>
                                    </div>                    
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card top_counter">
                                    <div class="body" style="margin:0px;padding:0px;">
                                        <div class="icon xl-slategray"><i class="zmdi zmdi-cake"></i> </div>
                                        <div class="content">
                                            <div class="text">BIRTHDAY</div>
                                            <h5 class="number"><?= $bday ?></h5>
                                        </div>
                                    </div>                    
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header" style="margin-bottom:10px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                        <h2>
                                            <strong>ROOM:</strong>&nbsp;&nbsp;&nbsp;&nbsp;<?= $room ?>
                                            <small></small>
                                            
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header" style="margin-bottom:10px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                        <h2>
                                            <strong>ADDRESS:</strong>&nbsp;&nbsp;&nbsp;&nbsp;<?= $adrs ?>
                                            <small></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header" style="margin-bottom:10px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                        <h2>
                                            <strong>DOCTOR:</strong>&nbsp;&nbsp;&nbsp;&nbsp;<?= $doc ?>
                                            <small></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header" style="margin-bottom:10px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                        <h2>
                                            <strong>MEDTECH:</strong>&nbsp;&nbsp;&nbsp;&nbsp;<?= $med ?>
                                            <small></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header" style="margin-bottom:10px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                        <h2>
                                            <strong>REC.BY:&nbsp;&nbsp;&nbsp;&nbsp;</strong><?= $recby ?>
                                            <small></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header" style="margin-bottom:10px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                        <h2 id="">
                                            <strong>REC.DATE:&nbsp;&nbsp;&nbsp;&nbsp;</strong><?= $reqsdate ?>
                                            <small class="d-none" id="requestdatereslab"><?= $reqsdate ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Patient</strong> Age 
                                            <small><?= $age ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Patient</strong> Gender 
                                            <small><?= $gender ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Patient</strong> Weight
                                            <small><?= $weight ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Result</strong> Transmittal 
                                            <small><?= $orno ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;">
                                    <input type="hidden" id="casecodeledlab" class="" value="<?= $casecode ?>"/>
                                    <input type="hidden" id="reqscodeledlab" class="" value="<?= $reqscode ?>"/>
                                </div>
                                <div class="tab-content m-t-10">
                                    <div role="tabpanel" class="tab-pane in active" id="normal">
                                        <div class="tab-pane table-responsive active">
                                            <table class="table table-bordered table-hover" id="laboratory-ledgerlist-table">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Description</th>
                                                        <th>Qty.</th>
                                                        <th>Unit</th>
                                                        <th>Total</th>
                                                        <th>Hosp.Code</th>
                                                        <th>Barcode</th>
                                                        <th>Services</th>
                                                        <th>Form Code</th>
                                                        <th>Trans.Code</th>
                                                        <th>Official Result</th>
                                                        <th>Result Released</th>
                                                        <th>Req.Ref.</th>
                                                        <th>Filename</th>
                                                        <th>Dept.</th>
                                                        <th>Sel.Type</th>
                                                        <th>Req.ID</th>
                                                        <th>Req.By</th>
                                                        <th>Manual</th>
                                                        <th>For Return</th>
                                                        <th>Req.No</th>
                                                        <th>Trans.No.</th>
                                                        <th>Casecode</th>
                                                        <th>Result Code</th>
                                                    </tr>
                                                </thead>
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
