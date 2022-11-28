<div class="modal fade" id="packagemanagementmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header" style="margin-bottom:0px;margin-top:10px;padding-bottom:0px;padding-top:0px;">
                <h4 class="title" id="largeModalLabel">Package Management</h4>
            </div>
            <div class="modal-body d-none" id="packagetableandbuttondiv" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button type="button" id="AddPackageForm" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showAddPackageFormForAmitPatient()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;ADD PACKAGE</b></button><br>
                    </div>
<!--                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-default waves-effect" onclick=""><i class="zmdi zmdi-file"></i><b>&nbsp;&nbsp;PX DATA INFO SHEET</b></button><br>
                    </div>-->
                </div>
                <div class="tab-pane" id="All" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                    <table class="table table-bordered" id="package-management-table">
                        <thead>
                            <tr>                                       
                                <th id="table-head-actionpac">Action</th>
                                <th id="table-head-action2">Package&nbsp;&nbsp;Code</th>
                                <th id="table-head-name">Patient&nbsp;&nbsp;Name</th>
                                <th id="table-head-action2">Package&nbsp;&nbsp;Acct#</th>
                                <th id="table-head-action2">Admission&nbsp;&nbsp;Acct#</th>
                                <th id="table-head-name">Doctor</th>
                                <th id="table-head-action2">Package&nbsp;&nbsp;Php</th>
                                <th id="table-head-action2">Active</th>
                                <th id="table-head-action2">Enroll&nbsp;&nbsp;Date</th>
                                <th id="table-head-action2">Doc/Booklet&nbsp;&nbsp;Ref.&nbsp;&nbsp;No.</th>
                                <th id="table-head-action2">Doctor</th>
                                <th id="table-head-action2">Status</th>
                                <th id="table-head-action2">SL&nbsp;&nbsp;Code</th>
                                <th id="table-head-action2">Total&nbsp;&nbsp;Deposits</th>
                                <th id="table-head-action">Updated</th>
                                <th id="table-head-action">PIN</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table> 
                </div>
            </div>

            <div id="addpatientpackagediv" class="body d-none" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <input type="hidden" id="accountid" class="form-control gender-class" value="<?= $this->session->userdata('ID'); ?>">
                <input type="hidden" id="accountname" class="form-control gender-class"value="<?= $this->session->userdata('empname'); ?>">
                <input type="hidden" id="refcode" class="form-control gender-class" value="<?= $refcodepkg ?>">
                <input type="hidden" id="lname" class="form-control gender-class" value="">
                <input type="hidden" id="fname" class="form-control gender-class" value="">
                <input type="hidden" id="mname" class="form-control gender-class" value="">
                <input type="hidden" id="suffixpkg" class="form-control gender-class" value="">
                <input type="hidden" id="addresspkg" class="form-control gender-class" value="">
                <input type="hidden" id="cityadrs" class="form-control gender-class" value="">
                <input type="hidden" id="pin" class="form-control gender-class" value="">
                <input type="hidden" id="slcodepkg" class="form-control gender-class" value="">
                <input type="hidden" id="pincode" class="form-control gender-class" value="">
                <input type="hidden" id="docreferdate" class="form-control gender-class" value="<?= $currentdatepkg ?>">
                <input type="hidden" id="packagerefcode" class="form-control gender-class" value="">
                <input type="hidden" id="docrefno" class="form-control gender-class" value="">
                <input type="hidden" id="refno" class="form-control gender-class" value="">
                
                <ul class="nav nav-tabs" role="tablist" style="margin-left:17px;">
                    <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#profiletabpackage" id="profiletabidpkg">Profile <b style="color:red" id="profiletaberrorpkg"></b></a></li>
                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#accounttabpackage" id="accounttabidpkg">Account <b style="color:red" id="accounttaberrorpkg"></b></a></li>
                </ul>
                
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane in active" id="profiletabpackage">
                        <div class="row clearfix" style="margin:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;padding-bottom:20px">
                            <div class="col-md-4">
                                <b>Package Account No.</b>
                                <div class="form-group">
                                    <input type="text" id='acctno' class="form-control" readonly="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <b>Patient Name</b>
                                <div class="input-group">
                                    <input type="text" id='packagepatientname' class="form-control" value="" style="height:40px" autocomplete="off">
                                    <span class="input-group-addon" style="padding:0px;background:white;border-left:transparent" id="spanid_packagepatientname">
                                        <button type="button" id='selectpatientinpackages' class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showPatientMasterlistForPackageModal();">
                                            <i class="zmdi zmdi-plus"></i>
                                        </button>
                                    </span>
                                </div>
                                <p id="packagepatientnameerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-md-4">
                                <b>Contact Info</b>
                                <div class="form-group">
                                    <input type="number" id='packagecontactinfo' class="form-control" placeholder="Contact Info" autocomplete="off">
                                    <p id="packagecontactinfoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row clearfix" style="margin:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;padding-bottom:20px">
                            <div class="col-md-4">
                                <b>Birthday</b>
                                <div class="form-group">
                                    <input type="date" id='packagebirthday' class="form-control" placeholder="Birthday" autocomplete="off">
                                    <p id="packagebirthdayerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <b>Age</b>
                                <div class="form-group">
                                    <input type="number" id='packageage' class="form-control" placeholder="Age" autocomplete="off">
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
                        
                        <div class="row clearfix" style="margin:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;padding-bottom:20px">
                            <div class="col-md-4">
                                <b>Religion</b>
                                <div class="form-group">
                                    <input type="text" id='packagereligion' class="form-control" placeholder="Religion" autocomplete="off">
                                    <p id="packagereligionerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <b>Oriented By</b>
                                <div class="form-group">
                                    <input type="text" id='packageorientedby' class="form-control" placeholder="Oriented By" autocomplete="off">
                                    <p id="packageorientedbyerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <b>Enrollment Date</b>
                                <div class="form-group">
                                    <input type="date" id='packageenrollmentdate' class="form-control" value="<?php echo date('Y-m-d'); ?>" autocomplete="off">
                                    <p id="packageenrollmentdateerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div role="tabpanel" class="tab-pane in" id="accounttabpackage">
                        <div class="row clearfix" style="margin:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;padding-bottom:20px">
                            
                            <div class="col-md-4">
                                <b>Docu.Ref.No.</b>
                                <div class="form-group">
                                    <input type="text" id='packagedocumentrefno' class="form-control" placeholder="Document Reference No." autocomplete="off">
                                    <p id="packagedocumentrefnoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <b>Package Code</b>
                                <div class="input-group">
                                    <input type="text" id='packagecode' class="form-control" value="" style="height:40px" autocomplete="off">
                                    <span class="input-group-addon" style="padding:0px;background:white;border-left:transparent" id="spanid_packagecodename">
                                        <button type="button" id='selectpackagecode' class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchPackageCodeModalForPackage();" data-toggle="modal" data-target="#packagemanagementmodal" data-dismiss="modal">
                                            <i class="zmdi zmdi-plus"></i>
                                        </button>
                                    </span>
                                </div>
                                <p id="packagecodeerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-md-4">
                                <b>Package Price</b>
                                <div class="form-group">
                                    <input type="number" id='packageprice' class="form-control" placeholder="Package Price" autocomplete="off">
                                    <p id="packagepriceerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix" style="margin:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;padding-bottom:20px">
                            <div class="col-md-6">
                                <div class="row clearfix">
                                    <div class="col-md-12">
                                        <b>Referred By</b>
                                        <div class="form-group">
                                            <input type="text" id='packagereferredby' class="form-control" placeholder="Referred By" autocomplete="off">
                                            <p id="packagereferredbyerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <b>Doctor</b>
                                        <div class="input-group">
                                            <input type="text" id='packagedoctor' class="form-control" value="" style="height:40px" autocomplete="off">
                                            <span class="input-group-addon" style="padding:0px;background:white;border-left:transparent" id="spanid_packagedoctorname">
                                                <button type="button" id='selectpackagedoctor' class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchDoctorsModalForPackage()" data-toggle="modal" data-target="#packagemanagementmodal" data-dismiss="modal">
                                                    <i class="zmdi zmdi-plus"></i>
                                                </button>
                                            </span>
                                        </div>
                                        <p id="packagedoctorerror" hidden="true" style="color:red;">Please input information on the field!</p>
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
                
                <div class="modal-footer" style="margin-bottom:20px;margin-left:10px;margin-right:10px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                    <button type="button" class="btn btn-default waves-effect" onclick="hideAddPackageFormForAmitPatient()">CLOSE</button>
                    <button type="button" id='addpackagebuttonid' onclick='addPatientPackage()' class="btn btn-primary waves-effect">SAVE</button>
                    <button type="button" id='edtpackagebuttonid' onclick='edtPatientPackage()' class="btn btn-warning waves-effect d-none">UPDATE</button>
                </div>
            </div>

            <div class="modal-footer d-none" id="packagereturnbuttondiv" style="margin-bottom:20px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hidePackageManagementModalForAdmitPatient()" style="margin-top:0px">CLOSE</button>
                <button type="button" id='savebutton' class="btn btn-info waves-effect" onclick="">SELECT</button>
            </div>
        </div>
    </div>
</div>

