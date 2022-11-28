<section class="content">
    <div class="block-header" id="">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>RX Creator/Maker
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Dashboard'); ?>"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item active">RX Creator/Maker</li>
                </ul>
            </div>
        </div>
    </div>    
    <div class="container-fluid">   
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header" style="margin-bottom:0px;padding-bottom:0px;">
                        <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                <h2><strong>Prescription</strong> /Instruction<small></small> </h2>
                                <br>
                                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;">
                                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <b>&nbsp;&nbsp;&nbsp;RX Date (For the Day)</b>
                                        <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;" onchange="searxhrxmasterviadate()">
                                            <input type="text" id="inputid_searchdaterxc" class="form-control datetimepicker" value="<?= $currentfulldate ?>" placeholder="Choose Date" autocomplete="off">
                                        </div>  
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <button type="button" id="" class="float-right btn btn-primary btn-round waves-effect" onclick='showCreateNewRxModalForRxCreatorMaker()'><i class="zmdi zmdi-widgets"></i><b>&nbsp;&nbsp;CREATE RX</b></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="body"> 
                        <div class="tab-content m-t-10">
                            <div role="tabpanel" class="tab-pane in active" id="normal">
                                <div class="tab-pane table-responsive active">
                                    <table class="table table-bordered table-striped table-hover" id="prescription-instruction-masterlist-table">
                                        <thead>
                                            <tr>         
                                                <th>Action</th>
                                                <th>No.</th>
                                                <th>Patients</th>
                                                <th>Category</th>
                                                <th>RX Date</th>
                                                <th>Type</th>
                                                <th>Updated Date</th>
                                                <th>Updated By</th>
                                                <th>Refno</th>
                                                <th>RX Batch</th>
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
<?php $this->load->view('modals/search_doctorforrx'); ?>
<?php $this->load->view('modals/add_doctors'); ?>
<?php $this->load->view('modals/inpatientlist_forrxcreator'); ?>
<?php $this->load->view('modals/outpatientlist_forrxcreator'); ?>
<?php $this->load->view('modals/externalitems_forrxcreator'); ?>
<?php $this->load->view('modals/printrx_data'); ?>
