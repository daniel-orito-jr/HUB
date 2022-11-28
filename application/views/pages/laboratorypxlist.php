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
                    <li class="breadcrumb-item active">Laboratory Result</li>
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
                        <div class="tab-content m-t-10">
                            <div role="tabpanel" class="tab-pane in active" id="normal">
                                <div class="tab-pane table-responsive active">
                                    <table class="table table-bordered table-hover" id="inpatient-masterlist-table">
                                        <thead>
                                            <tr>    
                                                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                <th>Name</th>
                                                <th>Case&nbsp;&nbsp;No.</th>
                                                <th>Patient&nbsp;&nbsp;Status</th>
                                                <th>Claim&nbsp;&nbsp;Status</th>
                                                <th>Hospital&nbsp;&nbsp;No.</th>
                                                <th>Birthday</th>
                                                <th>Sex</th>
                                                <th>Last&nbsp;&nbsp;Discharged</th>
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
    </div>
</section>


<?php $this->load->view('modals/create_newrx'); ?>
<?php $this->load->view('modals/doc_management'); ?>
<?php $this->load->view('modals/add_doctors'); ?>
<?php $this->load->view('modals/inpatientlist_forlabresults'); ?>
<?php $this->load->view('modals/externalitems_forrxcreator'); ?>
<?php $this->load->view('modals/printrx_data_home'); ?>
