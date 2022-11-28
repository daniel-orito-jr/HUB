<section class="content">
    <div class="block-header" id="">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Laboratory Patient Info
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
                            <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12">
                                <h2><strong>Laboratory</strong> Patient Form<small></small> </h2>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                <button class="btn btn-primary btn-simple btn-icon btn-icon-mini btn-round float-right">
                                    <i class="zmdi zmdi-edit"></i>
                                </button>
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
                                            <h5 class="number"><?= $pxno ?></h5>
                                        </div>
                                    </div>                    
                                </div>
                            </div>
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
                        </div>
<!--                        <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>-->
                        <div class="row clearfix">
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Birthday</strong> 
                                            <small><?= $bday ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Location</strong> 
                                            <small><?= $room ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Contact</strong>  
                                            <small><?= $cont ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Address</strong>  
                                            <small><?= $adrs ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Age</strong>  
                                            <small><?= $agex ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Gender</strong>  
                                            <small><?= $sexx ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Weight</strong> 
                                            <small><?= $lbss ?></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>Transmittal</strong>  
                                            <small><?= $tran ?></small>
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
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Doctor/ Physician</b>
                                <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                    <input type="text" name="selectname_attendingdoctoradm" id="attendingdoctoradm" class="form-control" style="height:40px" readonly="" value="<?= $docc ?>">
                                    <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                        <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchDoctorModalForAdmission()">
                                            <i class="zmdi zmdi-plus"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;HMO/ Insurance</b>
                                <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                    <input type="text" name="selectname_attendingdoctoradm" id="attendingdoctoradm" class="form-control" style="height:40px" readonly="" value="<?= $hmoo ?>">
                                    <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                        <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchDoctorModalForAdmission()">
                                            <i class="zmdi zmdi-plus"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row clearfix">
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Complaints</b>
                                <textarea name="textareaname_admitreasonadm" id="admissionreasonadm" class="form-control m-b-20" rows="5" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                            </div>
                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <div class="row clearfix">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;O.R. No.</b>
                                        <div class="form-group">
                                            <input type="text" name="inputname_linkaccountadm" id="linkaccountadm" class="form-control" placeholder="" autocomplete="off" required value="<?= $orno ?>">
                                            <p id="linkaccountadmerr" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Film Kind Used</b>
                                        <select name="selectname_tbdotsstatusadm" id="inputid_tbdotsstatusadm" class="show-tick form-control selectpicker" data-live-search="false">
                                            <optgroup class="cautions_option">
                                                <option class="option-class" value="Select">Select from List</option>
                                                <?php
                                                    for ($i = 0; $i < count($filmlisting); $i++) 
                                                    {
                                                        echo "<option value='" . strtoupper($filmlisting[$i]['filmname']) . "-" . strtoupper($filmlisting[$i]['filmcode']) . "'>" . strtoupper($filmlisting[$i]['filmname']) . "-" . strtoupper($filmlisting[$i]['filmcode']) . "</option>";
                                                    }
                                                ?>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:12px;">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Used Film(s)</b>
                                        <div class="form-group">
                                            <input type="text" name="inputname_linkaccountadm" id="linkaccountadm" class="form-control" placeholder="" autocomplete="off" required value="1">
                                            <p id="linkaccountadmerr" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Rad. Technologist</b>
                                        <select name="selectname_tbdotsstatusadm" id="inputid_tbdotsstatusadm" class="show-tick form-control selectpicker" data-live-search="true">
                                            <optgroup class="cautions_option">
                                                <option class="option-class" value="Select">Select from List</option>
                                                <?php
                                                    for ($i = 0; $i < count($radtechlist); $i++) 
                                                    {
                                                        echo "<option value='" . strtoupper($radtechlist[$i]['bankname']) . "-" . strtoupper($radtechlist[$i]['bankcd']) . "'>" . strtoupper($radtechlist[$i]['bankname']) . "-" . strtoupper($radtechlist[$i]['bankcd']) . "</option>";
                                                    }
                                                ?>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>TRANS. CODE: </strong> <u><?= $tran ?></u>
                                            <small></small>
                                        </h2>
                                        <input type="hidden" id="smallid_transnumrad" value="<?= $tran ?>">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>REQUEST NUMBER: </strong> <u><?= $reqs ?></u>
                                            <small></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;">
                                    <input type="hidden" id="casecodeledlab" class="" value=""/>
                                    <input type="hidden" id="reqscodeledlab" class="" value=""/>
                                </div>
                                <b>PATIENT INFO:</b><small> (Double click selected row to view result)</small>
                                <div class="tab-content m-t-10" style="">
                                    <div role="tabpanel" class="tab-pane in active" id="normal">
                                        <div class="tab-pane table-responsive active">
                                            <table class="table table-bordered table-hover" id="radiologyy-ledgersales-table">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Description</th>
                                                        <th>Quantity</th>
                                                        <th>Unit</th>
                                                        <th>Total</th>
                                                        <th>Hosp.Code</th>
                                                        <th>Barcode</th>
                                                        <th>Services</th>
                                                        <th>Form Code</th>
                                                        <th>Req.Ref</th>
                                                        <th>Official Result</th>
                                                        <th>Result Released</th>
                                                        <th>Req.Ref</th>
                                                        <th>Filename</th>
                                                        <th>Dept</th>
                                                        <th>SelType</th>
                                                        <th>Req.ID</th>
                                                        <th>Req.By</th>
                                                        <th>Manual</th>
                                                        <th>For Return</th>
                                                        <th>Result Ref.</th>
                                                        <th>Report No.</th>
                                                        <th>Film ID</th>
                                                        <th>Film Name</th>
                                                    </tr>
                                                </thead>
                                            </table>
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
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>RESULT STATUS: </strong>&nbsp;&nbsp;<u id="underlineid_resultstatus"></u>
                                            <small></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                    <div class="header">
                                        <h2>
                                            <strong>TEMPLATE: </strong>&nbsp;&nbsp;<u id="underlineid_templatename"></u>
                                            <small></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="panel-group full-body" id="accordion_13" role="tablist" aria-multiselectable="false">
                                    <div class="panel">
                                        <div class="panel-heading bg-purple" role="tab" id="headingOne_13">
                                            <h4 class="panel-title">
                                                <a role="button" data-toggle="collapse" href="#collapse_content_findings" aria-expanded="true" aria-controls="collapse_content_findings">
                                                    <i class="zmdi zmdi-search"></i>&nbsp;&nbsp;&nbsp;Findings
                                                </a> 
                                            </h4>
                                        </div>
                                        <div id="collapse_content_findings" class="panel-collapse collapse in show" role="tabpanel" aria-labelledby="headingOne_13" data-parent="#accordion_13" style="background:#DDD6FA;border-left:3px solid #6572b8;border-right:3px solid #6572b8;border-bottom:3px solid #6572b8">
                                            <div class="panel-body">
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>Findings</b>
                                                        <textarea name="textareaname_findingsrad" id="textareaid_findingsrad" class="form-control m-b-20" rows="7" placeholder="Type Here.." style="background:#EBEDED;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="panel">
                                        <div class="panel-heading bg-purple" role="tab" id="headingOne_14">
                                            <h4 class="panel-title">
                                                <a role="button" data-toggle="collapse" href="#collapse_content_impression" aria-expanded="true" aria-controls="collapse_content_impression">
                                                    <i class="zmdi zmdi-comment-outline"></i>&nbsp;&nbsp;&nbsp;Impressions
                                                </a> 
                                            </h4>
                                        </div>
                                        <div id="collapse_content_impression" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_14" data-parent="#accordion_13" style="background:#DDD6FA;border-left:3px solid #6572b8;border-right:3px solid #6572b8;border-bottom:3px solid #6572b8">
                                            <div class="panel-body">
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>Impressions</b>
                                                        <textarea name="textareaname_impressrad" id="textareaid_impressxrad" class="form-control m-b-20" rows="7" placeholder="Type Here.." style="background:#EBEDED;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel">
                                        <div class="panel-heading bg-purple" role="tab" id="headingOne_15">
                                            <h4 class="panel-title">
                                                <a role="button" data-toggle="collapse" href="#collapse_content_remarks" aria-expanded="true" aria-controls="collapse_content_remarks">
                                                    <i class="zmdi zmdi-assignment-o"></i>&nbsp;&nbsp;&nbsp;Remarks
                                                </a> 
                                            </h4>
                                        </div>
                                        <div id="collapse_content_remarks" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_15" data-parent="#accordion_13" style="background:#DDD6FA;border-left:3px solid #6572b8;border-right:3px solid #6572b8;border-bottom:3px solid #6572b8">
                                            <div class="panel-body">
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>Remarks</b><small> (Max of 200 characters only)</small>
                                                        <textarea name="textareaname_remarksrad" id="textareaid_remarksxrad" class="form-control m-b-20" rows="7" placeholder="Type Here.." style="background:#EBEDED;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix" style="margin-top:10px;">
                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <button type="button" onclick="" id="" class="btn btn-raised btn-info waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12"><i class="zmdi zmdi-print"></i><b>&nbsp;&nbsp;&nbsp;PRINT PREVIEW</b></button>
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
