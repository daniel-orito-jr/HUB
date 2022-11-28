<div class="modal fade" id="addpackagesmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
            <div class="modal-header" style="margin-bottom:0px;margin-top:25px;padding-bottom:0px;padding-top:0px;">
                <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                    <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="col-lg-10 col-md-6 col-sm-6 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <h4 class="title adddoctor_title" id="largeModalLabel">Add Package</h4>
                                    <h4 class="title edtdoctor_title d-none" id="largeModalLabel">Edit Package</h4>
                                </div>
                            </div>
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="header">
                                            <h2><strong>Packages</strong> Form</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:20px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <ul class="nav nav-tabs" role="tablist" style="margin-top:0px;padding-top:0px;margin-bottom:5px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#profiletabpackage">Package Information</a></li>
                                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#accounttabpackage">Package Details</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <div class="relative">
                                    <div class="absolute">
                                        <img class="rounded img-raised" src="<?= base_url('assets/images/package.png'); ?>"
                                             height="100" width="100" style="border:7px solid #02bec0;border-radius:2px;top:-20px"
                                             alt="" id="doctorimgupload">
                                    </div>
                                </div>
<!--                                <div class="relative">
                                    <div class="absolute">
                                        <button type="button" class="btn btn-sm btn-primary waves-effect"
                                                style="margin-top:85px;width:100px;left:-97px" id="doctorimguploadbtn">
                                            BROWSE
                                        </button>
                                        <input type="file" id="opendoctorimgupload" accept="image/*" style="display:none" onchange="readImageURL(this, 'doctorimgupload');"/>
                                        <p id="photoerr" style="color:red;padding-left:3px"></p>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                            <div class="body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                <input type="hidden" id="refno" class="form-control gender-class" value="">
                                <input type="hidden" id="accountid" class="form-control gender-class" value="<?= $this->session->userdata('ID'); ?>">
                                <input type="hidden" id="accountname" class="form-control gender-class"value="<?= $this->session->userdata('empname'); ?>">
                                <input type="hidden" id="acctno" class="form-control gender-class" value="">
                                <input type="hidden" id="refcode" class="form-control gender-class" value="<?= $refcode ?>">
                                <input type="hidden" id="lname" class="form-control gender-class" value="">
                                <input type="hidden" id="fname" class="form-control gender-class" value="">
                                <input type="hidden" id="mname" class="form-control gender-class" value="">
                                <input type="hidden" id="suffix" class="form-control gender-class" value="">
                                <input type="hidden" id="address" class="form-control gender-class" value="">
                                <input type="hidden" id="cityadrs" class="form-control gender-class" value="">
                                <input type="hidden" id="pin" class="form-control gender-class" value="">
                                <input type="hidden" id="slcode" class="form-control gender-class" value="">
                                <input type="hidden" id="pincode" class="form-control gender-class" value="">
                                <input type="hidden" id="docreferdate" class="form-control gender-class" value="<?= $currentdate ?>">
                                <input type="hidden" id="packagerefcode" class="form-control gender-class" value="">
                                <input type="hidden" id="docrefno" class="form-control gender-class" value="">

                                <div class="tab-content" id="doctorsform_reloaddiv">
                                    <div role="tabpanel" class="tab-pane in active" id="profiletabpackage">
                                        <div class="row clearfix">
                                            <div class="col-md-6">
                                                <b>Patient Name</b>
                                                <div class="input-group">
                                                    <input type="text" id='packagepatientname' class="form-control" value="" style="height:40px">
                                                    <span class="input-group-addon" style="padding:0px;background:white;border-left:transparent">
                                                        <button type="button" id='selectpatientinpackages' class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showPatientMasterlistForPackageModal();">
                                                            <i class="zmdi zmdi-plus"></i>
                                                        </button>
                                                    </span>
                                                    <p id="packagepatientnameerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <b>Contact Info</b>
                                                <div class="form-group">
                                                    <input type="number" id='packagecontactinfo' class="form-control" placeholder="Contact Info">
                                                    <p id="packagecontactinfoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row clearfix">
                                            <div class="col-md-4">
                                                <b>Birthday</b>
                                                <div class="form-group">
                                                    <input type="date" id='packagebirthday' class="form-control" placeholder="Birthday">
                                                    <p id="packagebirthdayerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>Age</b>
                                                <div class="form-group">
                                                    <input type="text" id='packageage' class="form-control" placeholder="Age">
                                                    <p id="packageageerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>Sex</b>
                                                <div class="btn-group bootstrap-select form-control show-tick">
                                                    <select class="form-control show-tick" tabindex="-98" id="packagesex">
                                                        <option value="MALE">MALE</option>
                                                        <option value="FEMALE">FEMALE</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row clearfix">
                                            <div class="col-md-4">
                                                <b>Religion</b>
                                                <div class="form-group">
                                                    <input type="text" id='packagereligion' class="form-control" placeholder="Religion">
                                                    <p id="packagereligionerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>Oriented By</b>
                                                <div class="form-group">
                                                    <input type="text" id='packageorientedby' class="form-control" placeholder="Oriented By">
                                                    <p id="packageorientedbyerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>Enrollment Date</b>
                                                <div class="form-group">
                                                    <input type="date" id='packageenrollmentdate' class="form-control" value="<?php echo date('Y-m-d'); ?>">
                                                    <p id="packageenrollmentdateerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div role="tabpanel" class="tab-pane in" id="accounttabpackage">
                                        <div class="row clearfix">
                                            <div class="col-md-4">
                                                <b>Docu.Ref.No.</b>
                                                <div class="form-group">
                                                    <input type="text" id='packagedocumentrefno' class="form-control" placeholder="Document Reference No.">
                                                    <p id="documentrefnoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>Package Code</b>
                                                <div class="input-group">
                                                    <input type="text" id='packagecode' class="form-control" value="" style="height:40px">
                                                    <span class="input-group-addon" style="padding:0px;background:white;border-left:transparent">
                                                        <button type="button" id='selectpackagecode' class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchPackageCodeModalForPackage()">
                                                            <i class="zmdi zmdi-plus"></i>
                                                        </button>
                                                    </span>
                                                    <p id="packagecodeerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>Package Price</b>
                                                <div class="form-group">
                                                    <input type="number" id='packageprice' class="form-control" placeholder="Package Price">
                                                    <p id="packagepriceerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-md-6">
                                                <div class="row clearfix">
                                                    <div class="col-md-12">
                                                        <b>Referred By</b>
                                                        <div class="form-group">
                                                            <input type="text" id='packagereferredby' class="form-control" placeholder="Referred By">
                                                            <p id="packagereferredbyerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <b>Doctor</b>
                                                        <div class="input-group">
                                                            <input type="text" id='packagedoctor' class="form-control" value="" style="height:40px">
                                                            <span class="input-group-addon" style="padding:0px;background:white;border-left:transparent">
                                                                <button type="button" id='selectpackagedoctor' class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchDoctorsModalForPackage()">
                                                                    <i class="zmdi zmdi-plus"></i>
                                                                </button>
                                                            </span>
                                                            <p id="packagedoctorerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="row clearfix">
                                                    <div class="col-md-12">
                                                        <b>Remarks / Notes</b>
                                                        <div class="form-group">
                                                            <textarea rows="4" id="packageremarks" class="form-control no-resize" placeholder="Please type remarks / notes" style="background:#EBEDED"></textarea>
                                                            <p id="packageremarkserror" hidden="true" style="color:red;">Please input information on the field!</p>
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
                </div>
            </div>
            <div class="modal-footer" style="padding-top:20px;padding-left:35px;padding-right:35px;padding-bottom:30px;">
                <button type="button" class="btn btn-default waves-effect" onclick='hideAddPackagesModalForManager()'>CLOSE</button>
                <button type="button" class="btn btn-primary waves-effect" id='savebutton' onclick="insertNewPackage()">SAVE(PACKAGE)</button>
                <button type="button" class="btn btn-primary waves-effect d-none" id='updatebutton' onclick='updatePackage()'>UPDATE(PACKAGE)</button>
            </div>
        </div>
    </div>
</div>

