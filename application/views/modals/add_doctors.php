<div class="modal fade" id="adddoctorsmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
            <div class="modal-header" style="margin-bottom:0px;margin-top:25px;padding-bottom:0px;padding-top:0px;">
                <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                    <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="col-lg-10 col-md-6 col-sm-6 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <h4 class="title adddoctor_title" id="largeModalLabel">Add Doctor</h4>
                                    <h4 class="title edtdoctor_title d-none" id="largeModalLabel">Edit Doctor</h4>
                                </div>
                            </div>
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="header">
                                            <h2><strong>Doctors</strong> Form</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:20px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <ul class="nav nav-tabs" role="tablist" style="margin-top:0px;padding-top:0px;margin-bottom:5px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#docprof" id="profiletabiddoc">Profile <b style="color:red" id="profiletaberrordoc"></b></a></li>
                                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#docinfo" id="detailstabiddoc">Details <b style="color:red" id="detailstaberrordoc"></b></a></li>
                                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#docacct" id="accounttabiddoc">Account <b style="color:red" id="accounttaberrordoc"></b></a></li>
                                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#docschd" id="scheduletabiddoc">Schedule <b style="color:red" id="scheduletaberrordoc"></b></a></li>
                                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#docothr" id="clinictabiddoc">Clinic <b style="color:red" id="clinictaberrordoc"></b></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <div class="relative">
                                    <div class="absolute">
                                        <img class="rounded img-raised" src="<?= base_url('assets/images/doctor.png'); ?>"
                                             height="100" width="100" style="border:7px solid #02bec0;border-radius:2px;top:-20px"
                                             alt="" id="doctorimgupload">
                                    </div>
                                </div>
                                <div class="relative">
                                    <div class="absolute">
                                        <button type="button" class="btn btn-sm btn-primary waves-effect"
                                                style="margin-top:85px;width:100px;left:-97px" id="doctorimguploadbtn">
                                            BROWSE
                                        </button>
                                        <input type="file" id="opendoctorimgupload" accept="image/*" style="display:none" onchange="readImageURL(this, 'doctorimgupload');"/>
                                        <p id="photoerr" style="color:red;padding-left:3px"></p>
                                    </div>
                                </div>
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
                                <input type="text" name="doccd" id="doccd" class="form-control gender-class d-none" placeholder="Enter DOC CD" autocomplete="off">
                                <input type="text" name="accountid" id="accountid" class="form-control gender-class d-none" placeholder="Enter Account ID" value="<?= $this->session->userdata('ID'); ?>" autocomplete="off">
                                <input type="text" name="accountname" id="accountname" class="form-control gender-class d-none" placeholder="Enter Account Name" value="<?= $this->session->userdata('empname'); ?>" autocomplete="off">

                                <div class="tab-content" id="doctorsform_reloaddiv">
                                    <div role="tabpanel" class="tab-pane in active" id="docprof">
                                        <div class="row clearfix" style="margin-bottom:15px;">
                                            <div class="col-md-3">
                                                <b>Last Name</b>
                                                <div class="form-group">
                                                    <input type="text" id='lastname' class="form-control" placeholder="Enter Last Name" autocomplete="off">
                                                    <p id="lastnameerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <b>First Name</b>
                                                <div class="form-group">
                                                    <input type="text" id='firstname' class="form-control" placeholder="Enter First Name" autocomplete="off">
                                                    <p id="firstnameerror" hidden="true" style="color:red;">Required Field</p>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <b>Middle Name</b>
                                                <div class="form-group">
                                                    <input type="text" id='middlename' class="form-control" placeholder="Enter Middle Name" autocomplete="off">
                                                    <p id="middlenameerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <b>Doctor Name</b>
                                                <div class="form-group">
                                                    <input type="text" id='docname' class="form-control" placeholder="Enter Doctor Name" autocomplete="off">
                                                    <p id="docnameerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row clearfix">

                                            <div class="col-md-3">
                                                <b>Title</b>
                                                <div class="form-group">
                                                    <input type="text" id='title' class="form-control" value="MD">
                                                    <p id="titleerror" style="color:red;" hidden="true">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <b>Suffix</b>
                                                <div class="form-group">
                                                    <input type="text" id='suffix' class="form-control" placeholder="Enter Suffix" autocomplete="off">
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <b>Doc Code</b>
                                                <div class="form-group">
                                                    <input type="text" id='doccode' class="form-control" readonly autocomplete="off">
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <b>Address</b>
                                                <div class="form-group">
                                                    <input type="text" id='address' class="form-control" placeholder="Enter Address" autocomplete="off">
                                                    <p id="addresserror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>

                                        

                                    </div>


                                    <div role="tabpanel" class="tab-pane in" id="docinfo">
                                        <div class="row clearfix" style="margin-bottom:15px;">
                                            <div class="col-md-3">
                                                <b>Profession Type</b>
                                                <div class="btn-group bootstrap-select form-control show-tick">
                                                    <select class="form-control show-tick" tabindex="-98" id="professiontype">
                                                        <option value="General">General</option>
                                                        <option value="Specialist">Specialist</option>
                                                        <option value="w/Training">w/Training</option>
                                                        <option value="Deplomate/Fellow">Deplomate/Fellow</option>
                                                    </select></div>
                                            </div>

                                            <div class="col-md-3">
                                                <b>License Number</b>
                                                <div class="form-group">
                                                    <input type="number" id='licensenumber' class="form-control" placeholder="Enter License Number" autocomplete="off">
                                                    <p id="licensenumbererror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>


                                            <div class="col-md-3">
                                                <b>PTR Number</b>
                                                <div class="form-group">
                                                    <input type="number" id='ptrno' class="form-control" placeholder="Enter PTR Number" autocomplete="off">
                                                    <p id="ptrnoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <b>S2 Number</b>
                                                <div class="form-group">
                                                    <input type="number" id='s2no' class="form-control" placeholder="Enter S2 Number" autocomplete="off">
                                                    <p id="s2noerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-md-3">
                                                <b>Tax</b>
                                                <div class="form-group">
                                                    <input type="number" id='tax' class="form-control" placeholder="Enter Tax#" autocomplete="off">
                                                    <p id="taxerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <b>TIN</b>
                                                <div class="form-group">
                                                    <input type="number" id='tin' class="form-control" placeholder="Enter TIN" autocomplete="off">
                                                    <p id="tinerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <b>PHIC</b>
                                                <div class="btn-group bootstrap-select form-control show-tick">
                                                    <select class="form-control show-tick" tabindex="-98" id="phicenable">
                                                        <option value="1">Enable</option>
                                                        <option value="0">Disable</option>
                                                    </select></div>
                                            </div>

                                            <div class="col-md-3">
                                                <b>PHIC Number</b>
                                                <div class="form-group">
                                                    <input type="number" id='phicno' class="form-control" placeholder="Enter PHIC Account Number" autocomplete="off">
                                                    <p id="phicnoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div role="tabpanel" class="tab-pane in" id="docacct">
                                        <div class="row clearfix" style="margin-bottom:15px;">
                                            <div class="col-md-4">
                                                <b>PHIC Rate per Day</b>
                                                <div class="form-group">
                                                    <input type="number" id='phicrate' class="form-control" placeholder="Enter PHIC Rate per Day" autocomplete="off">
                                                    <p id="phicrateerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>Admission Rate</b>
                                                <div class="form-group">
                                                    <input type="number" id='pfrate' class="form-control" placeholder="Enter Admission Rate" autocomplete="off">
                                                    <p id="pfrateerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>Bank Account No</b>
                                                <div class="form-group">
                                                    <input type="number" id='accountno' class="form-control" placeholder="Enter Bank Account No" autocomplete="off">
                                                    <p id="accountnoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row clearfix">

                                            <div class="col-md-4">
                                                <b>SL Code IPD</b>
                                                <div class="input-group">
                                                    <input type="text" id='coaipd' class="form-control" style="height:40px" readonly="" autocomplete="off">
                                                    <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                        <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSLCodeModal(); showSLCodeIPDModal();">
                                                            <i class="zmdi zmdi-plus"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                                <p id="coaipderror" hidden="true" style="color:red;">Please input information on the field!</p>
                                            </div>

                                            <div class="col-md-4">
                                                <b>SL Code OPD</b>
                                                <div class="input-group">
                                                    <input type="text" id='coaopd' class="form-control" style="height:40px" readonly="" autocomplete="off">
                                                    <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                        <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSLCodeModal(); showSLCodeOPDModal();">
                                                            <i class="zmdi zmdi-plus"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                                <p id="coaopderror" hidden="true" style="color:red;">Please input information on the field!</p>
                                            </div>

                                            <div class="col-md-4">
                                                <div style="margin-top: 2%;">
                                                    <b>Issue Hospital OR</b>
                                                </div>
                                                <div class="btn-group bootstrap-select form-control show-tick" style="">
                                                    <select class="form-control show-tick" tabindex="-98" id='hospitalor'>
                                                        <option value="1">Yes</option>
                                                        <option value="0">No</option>
                                                    </select></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div role="tabpanel" class="tab-pane in" id="docschd">
                                        <div class="row clearfix">
                                            <div class="col-md-6">
                                                <b>Profession / Expertise</b>
                                                <div class="btn-group bootstrap-select form-control z-index show-tick">      

                                                    <select class="form-control z-index show-tick" data-live-search="true" id="expertise">
                                                        <option value="General">General</option>
                                                        <option value="Specialist">Specialist</option>
                                                        <option value="w/Training">w/Training</option>
                                                        <option value="Deplomate/Fellow">Deplomate/Fellow</option>
                                                    </select>

                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <b>Professional Grouping</b>
                                                <div class="btn-group bootstrap-select form-control show-tick">
                                                    <select class="form-control show-tick" tabindex="-98" id="profgroup">
                                                        <option value="FAMED">FAMED</option>
                                                        <option value="OB-GYNE">OB-GYNE</option>
                                                    </select></div>
                                            </div>
                                        </div>

                                        <div class="row clearfix" style="margin-top:1%;">

                                            <div class="col-md-6">
                                                <b>Biodata</b>
                                                <textarea rows="3" id='biodata' class="form-control no-resize" placeholder="Please type biodata" style="background:#EBEDED;padding-left:7px;border-radius:5px;"></textarea>
                                            </div>

                                            <div class="col-md-6">
                                                <b>Other Information</b>
                                                <textarea rows="3" id='otherinformation' class="form-control no-resize" placeholder="Please type other information" style="background:#EBEDED;padding-left:7px;border-radius:5px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div role="tabpanel" class="tab-pane in" id="docothr">

                                        <div class="row clearfix" style="margin-top:1%;">
                                            <div class="col-md-4">
                                                <b>Clinic Room Suite</b>
                                                <div class="form-group">
                                                    <input type="text" id='clinicroom' class="form-control" placeholder="Enter Clinic Room" autocomplete="off">
                                                    <p id="clinicroomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-4">
                                                <b>Clinic Schedule</b>
                                                <textarea rows="5" id='schedule' class="form-control no-resize" placeholder="Please type schedule" style="background:#EBEDED;padding-left:7px;border-radius:5px;"></textarea>
                                            </div>

<!--                                            <div class="col-md-4">
                                                <b>Picture</b>
                                                <div class="form-group">
                                                    <div class="image">
                                                        <img title="Doctor Picture" alt="Doctor" id="doctorimgupload" style="cursor: pointer; background-color: white;">
                                                        <input type="file" id="opendoctorimgupload" accept="image/*" style="display:none" onchange="readImageURL(this, 'doctorimgupload');"/> 
                                                    </div>
                                                    <span style="font-size: 12px;">Click the picture to upload image.</span>
                                                </div>
                                            </div>-->

                                            <div class="col-md-4">
                                                <b>Clinic Picture</b>
                                                <div class="form-group">
                                                    <div class="image">
                                                        <img title="Clinic Picture" alt="Clinic" id="clinicimgupload" style="cursor: pointer; background-color: white;" height="100" width="100" src="<?= base_url('assets/images/hospital.png'); ?>">
                                                        <input type="file" id="openclinicimgupload" accept="image/*" style="display:none" onchange="readImageURL(this, 'clinicimgupload');"/> 
                                                    </div>
                                                    <span style="font-size: 12px;">Click the picture to upload image.</span>
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
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal" onclick='hideDoctorsModal();'>CLOSE</button>
                <button type="button" class="btn btn-primary waves-effect" id='savebuttondoc' onclick="addDoctors();">SAVE</button>
                <button type="button" class="btn btn-warning waves-effect d-none" id='updatebuttondoc' onclick='updateDoctors();'>UPDATE</button>
            </div>
        </div>
    </div>
</div>

