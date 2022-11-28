<section class="content">
    <div class="block-header" id="">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Laboratory Result Listing
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
                                <h2><strong>Official</strong> Laboratory Result Listing<small></small> </h2>
                            </div>
                        </div>
                    </div>
                    <div class="body"> 
                        <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card top_counter">
                                    <div class="body" style="margin:0px;padding:0px;">
                                        <div class="icon xl-slategray"><i class="zmdi zmdi-assignment-o"></i> </div>
                                        <div class="content">
                                            <div class="text">PATIENT CODE:</div>
                                            <h5 class="number"><?= $casecode ?></h5>
                                        </div>
                                    </div>                    
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card top_counter">
                                    <div class="body" style="margin:0px;padding:0px;">
                                        <div class="icon xl-slategray"><i class="zmdi zmdi-face"></i> </div>
                                        <div class="content">
                                            <div class="text">PATIENT NAME:</div>
                                            <h5 class="number" id="patientnamereslab"><?= $name ?></h5>
                                        </div>
                                    </div>                    
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header" style="margin-bottom:10px;padding-bottom:0px;margin-top:10px;padding-top:0px;">
                                        <h2>
                                            <strong>THIS</strong> IS AN OFFICIAL RESULT.
                                            <small></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="row clearfix">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                            <div class="header" style="margin-bottom:10px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                                <h2>
                                                    <strong>FORM CODE:</strong>
                                                    <small><?= $formcode ?></small>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                            <div class="header" style="margin-bottom:10px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                                <h2>
                                                    <strong>REPORT CODE:</strong>
                                                    <small id="reportcodexreslab"><?= $repocode ?></small>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-8 col-md-7 col-sm-12 col-xs-12">
                                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;">
                                    <input type="hidden" id="casecodereslab" class="" value="<?= $casecode ?>"/>
                                    <input type="hidden" id="formcodereslab" class="" value="<?= $formcode ?>"/>
                                    <input type="hidden" id="reqsdatereslab" class="" value="<?= $reqsdate ?>"/>
                                    <input type="hidden" id="reqscodereslab" class="" value="<?= $reqscode ?>"/>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <b>TEST RESULT:</b><small>&nbsp;&nbsp;(Double click the result to create SMS text message)</small>
                                        <div class="tab-content m-t-10">
                                            <div role="tabpanel" class="tab-pane in active" id="normal">
                                                <div class="tab-pane table-responsive active" style="background:#EBEDED;padding:10px;border-radius:10px;">
                                                    <table class="table table-bordered table-hover" id="laboratory-resultlist-table">
                                                        <thead>
                                                            <tr>
                                                                <th>No.</th>
                                                                <th>Test</th>
                                                                <th>Result</th>
                                                                <th>Unit</th>
                                                                <th>Reference</th>
                                                                <th>S.I.Unit</th>
                                                                <th>Priority</th>
                                                                <th>Ref.No.</th>
                                                                <th>Result Ref.No.</th>
                                                                <th>Desc.Update</th>
                                                                <th>Check Title</th>
                                                                <th>Form Type</th>
                                                                <th>Group Name</th>
                                                                <th>Dept.Main</th>
                                                                <th>Report Code</th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="row clearfix" style="margin-top:10px;">
                                            <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12">
                                                
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                                <button type="button" onclick="cleartextdata()" id="" class="btn btn-raised btn-info waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12"><i class="zmdi zmdi-search"></i>&nbsp;&nbsp;&nbsp;PREVIEW RESULT</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                                <b>SMS CONTENT:</b>
                                <div class="row clearfix" style="margin-top:10px;">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <textarea name="textareaname_smstxtboxreslab" id="textareaid_smstxtboxreslab" class="form-control m-b-20" rows="17" placeholder="" style="background:#EBEDED;border-radius:10px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:10px;">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <button type="button" onclick="cleartextdata()" id="" class="btn btn-raised btn-danger waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12"><i class="zmdi zmdi-delete"></i>&nbsp;&nbsp;&nbsp;CLEAR TEXT</button>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <button type="button" onclick="showSendTextMessageModal()" id="" class="btn btn-raised btn-success waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12"><i class="zmdi zmdi-comment-text-alt"></i>&nbsp;&nbsp;&nbsp;SEND SMS</button>
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
<?php $this->load->view('modals/sendsms_labtestresult'); ?>