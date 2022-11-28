<div class="modal fade" id="supervisorpermitmodal" tabindex="-1" role="dialog" style="border-radius:0px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px;background:radial-gradient(circle, rgba(246,247,247,1) 0%, rgba(182,212,211,1) 51%, rgba(153,173,173,1) 100%);">
            <div class="modal-header stripsdesign" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;border-radius:0px;border-bottom:10px solid orange">
                <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px">
                    <div class="col-lg-8 col-md-8 col-sm-8">
                        <img class="col-lg-12 col-md-12 col-sm-12" src="<?= base_url('assets/images/titleNursingManagement.png'); ?>" height="70" width="100" style="padding-left:10px;margin-top:20px;">
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4" style="padding-right:30px;padding-top:20px;">
                        <div class="relative">
                            <div class="absolute">
                                <img class="" src="<?= base_url('assets/images/circlelockhub.png'); ?>" 
                                     height="120" width="100" style="" 
                                     alt="" id="patientimguploadforadmpx">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="row clearfix" style="margin-bottom:10px">
                    <input type="hidden" id="userpasscodesup" value="<?= $this->session->userdata("hubuserPasscode"); ?>">
                    <input type="hidden" id="descriptionnsup" value="">
                    <div class="col-lg-8 col-md-8 col-sm-6">
                        <div class="row clearfix bevelBox" style="padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:30px;margin-top:20px;margin-bottom:15px;margin-right:0px;margin-left:0px;border-radius:15px">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                <b style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">Current User</b>
                                <div class="form-group" style="margin-bottom:0px;margin-top:0px;padding-bottom:10px;padding-top:0px;">
                                    <input type="text" name="inputname_currentusersup" id="currentusersup" class="form-control" autocomplete="off" readonly value="<?= $this->session->userdata("empname"); ?>"> 
                                </div>
                            </div> 
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                <b style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">Transaction/Reason</b>
                                <div class="form-group" style="margin-bottom:0px;margin-top:0px;padding-bottom:10px;padding-top:0px;">
                                    <textarea name="txtareaname_reasonsup" id="txtareaid_reasonsup" style="border-radius:3px;background:#DDE1E1" rows="3" class="form-control" autocomplete="off" readonly="">
                                    </textarea>
                                </div>
                            </div>  
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                <b style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">Supervisor ID </b>
                                <div class="form-group" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                    <input type="text" style="border-radius:10px;background:#DDE1E1" name="" id="suprvisorid" class="form-control supvinputedtmas" autocomplete="off">
                                    <input type="text" style="border-radius:10px;background:#DDE1E1" name="" id="suprvisoridadm" class="form-control supvinputedtadm d-none" autocomplete="off">
                                </div>
                                <p class="d-none" style="color:red;font-size:12px;padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;" id="suprvisoriderror"></p>
                            </div> 
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                <b style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">Password </b>
                                <div class="form-group" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                    <input type="password" style="border-radius:10px;background:#DDE1E1" name="" id="suppassword" class="form-control supvinputedtmas" autocomplete="off">
                                    <input type="password" style="border-radius:10px;background:#DDE1E1" name="" id="suppasswordadm" class="form-control supvinputedtadm d-none" autocomplete="off">
                                </div>
                                <p class="d-none" style="color:red;font-size:12px;padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;" id="suppassworderror"></p>
                                <p class="d-none" style="color:red;font-size:12px;padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;" id="accounterror"></p>
                            </div> 
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-6">
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <br><br>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <center>
                                    <b style="font-size:16px;color:#3A3D3D">SUPERVISOR</b>
                                    <b style="font-size:16px;color:#3A3D3D">OVERRIDE</b>
                                </center>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:20px">
                                <center>
                                    <img class="" src="<?= base_url('assets/images/hublogo.png'); ?>" height="100" width="120" alt="hublogo" id="">
                                </center>
                            </div> 
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <b>Logbook#</b>
                                <div class="form-group">
                                    <input type="text" id="logbooksup" class="form-control supvinputedtmas" autocomplete="off" style="background:whitesmoke">
                                    <input type="text" id="logbooksupadm" class="form-control supvinputedtadm d-none" autocomplete="off" style="background:whitesmoke">
                                </div>
                            </div> 
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect" onclick="hideSupervisorPermissionModal()" id="cancelButtonForSuprvisrPermitEdtMas">CANCEL</button>
                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect d-none" onclick="hideSupervisorPermissionModalForEdtAdm()" id="cancelButtonForSuprvisrPermitEdtAdm">CANCEL</button>
                            </div> 
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success waves-effect" onclick="checkAuthorizationFromSupervisor()" id="checkAuthorizationButtonForEdtMas">OK</button>
                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success waves-effect d-none" onclick="checkAuthorizationFromSupervisorForEdtAdm()" id="checkAuthorizationButtonForEdtAdm">OK</button>
                            </div> 
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>