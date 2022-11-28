<div class="modal fade" id="quickdataeditmodal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
            <div class="modal-header" style="padding-bottom:0px;padding-top:15px;margin-bottom:0px;margin-top:0px;">
                <h4 class="title" id="smallModalLabel">Quick Data Edit</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                    <input type="hidden" id="inputid_indexnoqck">
                    <div class="col-lg-12 col-md-12 col-sm-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                        <div class="row clearfix" style="padding-bottom:0px;padding-top:20px;margin-bottom:0px;margin-top:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <p><strong>Patient Name:</strong>&nbsp;&nbsp;<u id="inputid_pxnameqck"> </u></p>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <p><strong>Pincode:</strong>&nbsp;&nbsp;<u id="inputid_pincodeqck"> </u></p>
                            </div>
                        </div>
                        <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Health Record No.</b>
                                <div class="input-group">
                                    <input type="text" name="inputname_healthrecnoqck" id="inputid_healthrecnoqck" class="form-control" placeholder="Enter HRN" data-mask="99-99-99" data-mask-selectonfocus="true" autocomplete="off" required>
                                    <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="bottom" title="HRN is verified?">
                                        <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdiv" style="padding:0x;margin:0px">
                                            <label for="healthrecnumchkboxqck" class="ts-label"></label>
                                            <input id="healthrecnumchkboxqck" type="checkbox" hidden="hidden" onchange="enableDisableHRNisVerifiedForQuickDataEdit()">
                                            <label for="healthrecnumchkboxqck" class="ts-helper"></label>
                                        </div>
                                    </span>
                                </div>
                                <input type="hidden" id="healthrecnumswitchvalueindicatorqck" value="NO">
                                <p id="inputid_healthrecnoqckerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Last Discharged</b>
                                <div class="input-group">
                                    <input type="text" name="inputname_oldrecrdqck" id="inputid_oldrecrdqck" class="form-control datetimepicker" placeholder="Old Record" disabled="">
                                    <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="right" title="Old Record">
                                        <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdiv" style="padding:0x;margin:0px">
                                            <label for="oldrecordchkboxqck" class="ts-label"></label>
                                            <input id="oldrecordchkboxqck" type="checkbox" hidden="hidden" onchange="enableDisableLastDischargedTextForQuickDataEdit()">
                                            <label for="oldrecordchkboxqck" class="ts-helper"></label>
                                        </div>
                                    </span>
                                </div>
                                <input type="hidden" id="oldrecordswitchvalueindicatorqck" value="OFF">
                                <p id="inputid_oldrecrdqckerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                        </div>
                        <div class="row clearfix" style="padding-bottom:20px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-default waves-effect" onclick="hideQuickEditModal()">CLOSE</button>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <button type="button" id='savebutton' class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-info waves-effect addPatientButton" onclick="quickUpdatePatientMastelist()">SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
            </div>
        </div>
    </div>
</div>