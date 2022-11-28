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
                                <h2><strong>Master</strong> Listing<small></small> </h2>
                            </div>
                        </div>
                    </div>
                    <div class="body"> 
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <input type="hidden" id="pxcodelab" class="" value="<?= $pxcode ?>"/>
                                <div class="tab-content m-t-10">
                                    <div role="tabpanel" class="tab-pane in active" id="normal">
                                        <div class="tab-pane table-responsive active">
                                            <table class="table table-bordered table-hover" id="laboratory-masterlist-table">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Date</th>
                                                        <th>Request No.</th>
                                                        <th>Age</th>
                                                        <th>Gender</th>
                                                        <th>Patient Type</th>
                                                        <th>Room</th>
                                                        <th>Doctor</th>
                                                        <th>Trans.No.</th>
                                                        <th>Trans.Date</th>
                                                        <th>Pat.Casecode</th>
                                                        <th>Req.Code</th>
                                                        <th>TR.No.</th>
                                                        <th>Acct.No.</th>
                                                        <th>Request Code</th>
                                                        <th>Request Date</th>
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
