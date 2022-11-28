<div class="modal fade" id="vipmanagementmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header" style="margin-bottom:0px;margin-top:10px;margin-left:0px;margin-right:0px;padding-bottom:10px;padding-top:0px;padding-left:20px;padding-right:0px;">
                <h4 class="title" id="largeModalLabel">VIP Management</h4>
            </div>
            <div class="modal-body" style="margin-bottom:0px;margin-top:0px;margin-left:10px;margin-right:10px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;">
                <input type="hidden" id="hiddenid_updatedbyvipmanagement" value="<?= $this->session->userdata('empname'); ?>">
                <input type="hidden" id="hiddenid_stationnamevipmanagement" value="<?= $station ?>">
                <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;">
                    <div class="card patients-list" style="margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;">
                        <div class="header d-none" style="margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;">
                            <h2><strong>Patient</strong> Information</h2>
                        </div>
                        <div class="body" style="margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding-bottom:20px;padding-top:0px;padding-left:0px;padding-right:0px;">
                            <form id="comanage-doctor-form" autocomplete="off">
                                <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;">
                                    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Patient Name</b>
                                        <div class="form-group">
                                            <input type="text" id="inputid_pxnamexvipmanagement" name="pxnamexvipmanagement" class="form-control" autocomplete="off" readonly>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Case Code</b>
                                        <div class="nk-int-st">
                                            <input type="text" id="inputid_casecodevipmanagement" name="casecodevipmanagement" class="form-control" autocomplete="off" readonly>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Account No.</b>
                                        <div class="form-group">
                                            <input type="text" id="inputid_accntnovipmanagement" name="accntnovipmanagement" class="form-control" autocomplete="off" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;">
                                    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Restriction</b>
                                        <div class="" style="padding-left:7px;margin:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                                            <div class="radio">
                                                <input type="radio" name="radioname_restriction" id="radio_non" value="" checked="">
                                                <label for="radio_non">
                                                    &nbsp;&nbsp;&nbsp;NO RESTRICTION
                                                </label>
                                            </div>
                                            <div class="radio">
                                                <input type="radio" name="radioname_restriction" id="radio_vip" value="">
                                                <label for="radio_vip">
                                                    &nbsp;&nbsp;&nbsp;VIP (Very Important Person)
                                                </label>
                                            </div>
                                            <div class="radio">
                                                <input type="radio" name="radioname_restriction" id="radio_sec" value="">
                                                <label for="radio_sec">
                                                    &nbsp;&nbsp;&nbsp;Security Risks (Drugs/ Murder)
                                                </label>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                                        <div class="row clearfix" style="margin-left:0px;margin-right:0px">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;&nbsp;Officer in-Charge (OIC)</b>
                                                <select name="selectname_oicinchargevipmanagement" id="selectid_oicinchargevipmanagement" class="form-control selectpicker" data-live-search="true">
                                                    <optgroup>
                                                        <option value="Select From List">Select From List</option>
                                                        <option value="Samuel I. Mendero,III-12152017125755PWD">Samuel I Mendero III - 12152017125755PWD</option>
                                                    </optgroup>
                                                </select>
                                                <p id="oicinchargeviperr" style="color:red;padding-left:15px"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;">
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Notes/ Remarks</b>
                                        <div class="form-group" style="padding-left:10px;">
                                            <textarea class="form-control" id="txtareaid_remarksvipmanagement" placeholder="Type Here..." rows="3" style="background:#EBEDED;border-radius:3px"></textarea>
                                        </div>
                                        <p id="remarksviperr" style="color:red;padding-left:15px"></p>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                        <div class="row clearfix" style="margin-left:0px;margin-right:0px">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:23px">
                                                
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <button type="button" id="addNewVIPButtonForAdmissionInsert" onclick="addNewVIPForAdmissionInsert()" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect">SAVE</button>
                                                <button type="button" id="edtOldVIPButtonForAdmissionUpdate" onclick="edtOldVIPForAdmissionUpdate()" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect d-none">UPDATE</button>
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect" onclick="hideSecurityManagementModalForAdmission()">RETURN</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
<!--            <div class="modal-footer">
                <button type="button" class="" style="background:transparent;color:transparent;border:none"></button>
                <button type="button" class="btn btn-default waves-effect" onclick="hideSecurityManagementModalForAdmission()">RETURN</button>
            </div>-->
        </div>
    </div>
</div>