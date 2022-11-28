<div class="modal fade" id="hmomanagementmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-bottom:0px">
            <div class="modal-header" style="margin-top:0px;margin-bottom:20px;padding-top:10px;padding-bottom:0px">
                <h4 class="title" id="largeModalLabel">HMO Management</h4><br>
                <input type="hidden" id="addoreditindicator">
            </div>
            <div class="modal-body d-none" style="margin-top:0px;margin-bottom:0px;margin-left:25px;margin-right:25px;padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px" id="hmo-table-and-header">
                <div class="row clearfix" style="margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px">
                    <div class="tab-pane table-responsive active" id="All" style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-bottom:0px">
                        <table class="table table-bordered table-striped table-hover" id="hmo-management-table" style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-bottom:0px">
                            <thead>
                                <tr>                                       
                                    <th id="table-head-actionhm">Action</th>
                                    <th id="table-head-name">HMO&nbsp;&nbsp;Name</th>
                                    <th id="table-head-action2">Credit&nbsp;&nbsp;Max</th>
                                    <th id="table-head-name">L.O.A</th>
                                    <th id="table-head-sorthmo">Sort</th>
                                    <th id="table-head-desc">Updated</th>
                                    <th id="table-head-action2">Recorded&nbsp;&nbsp;By</th>
                                    <th id="table-head-name">Reference&nbsp;&nbsp;No.</th>
                                    <th id="table-head-action2hmo">Code</th>
                                    <th id="table-head-action2hmo">Card&nbsp;&nbsp;No.</th>
                                    <th id="table-head-action2hmo">Approval&nbsp;&nbsp;Date</th>
                                    <th id="table-head-desc">Card&nbsp;&nbsp;Holder&nbsp;&nbsp;Name</th>
                                    <th id="table-head-action2hmo">TextboxID</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table> 
                    </div>
                </div>
                
                <div class="row clearfix" style="margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="padding-left:0px;margin-left:0px;">
                        <button type="button" id="AddHMOForInsertAdmission" onclick="showAddHMOFieldsForInsertAdmission();" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect">
                            <b style="padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                ADD HMO ACCOUNT
                            </b>
                        </button>
                        <button type="button" id="AddHMOForUpdateAdmission" onclick="showAddHMOFieldsForUpdateAdmission();" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect d-none">
                            <b style="padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                ADD HMO ACCOUNT
                            </b>
                        </button>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="">
                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning waves-effect" onclick="showCreditAdvisoryModal()" style="padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">Modify Patient CR Limit?</button><br>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                        <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;text-align:right"><strong>Total Credit:</strong></p>
                        <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;text-align:right"><strong>₱&nbsp;</strong><strong id="totalcredittextid"></strong></p>
                    </div>
                </div>
            </div>

            <div id="addhmo" class="body d-none">
                <div id="hmohiddenfielddiv" class="row clearfix" style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-bottom:0px;margin-left:0px;margin-right:0px;padding-left:10px;padding-right:20px">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <input type="hidden" id='updatedhmo' value="">
                        <input type="hidden" id='recbyhmo' value="<?= $this->session->userdata("empname"); ?>">
                        <input type="hidden" id='refnohmo' value="">
                        <input type="hidden" name="" id="hiddentextid_updateparameterforhmo">
                        <input type="hidden" name="" id="hiddentextid_previouscreditval">
                    </div>
                </div>
                <div class="row clearfix" style="padding-left:30px;padding-right:30px">
                    <div class="col-md-4">
                        <div style="margin-top: 2%;">
                            <b>HMO of Patient</b>
                        </div>
                        <div class="input-group" style="margin-top:5%;">
                            <input type="text" id='hmopatient' class="form-control" value="" style="height:40px" readonly="">
                            <span class="input-group-addon" style="padding:0px;border-left:0px;background:#E8E4E3" id="hmopatientinputtextbtnstyle">
                                <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchHMOModalForAdmission()">
                                    <i class="zmdi zmdi-plus"></i>
                                </button>
                            </span>
                            <p id="hmopatienterror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div style="margin-top: 2%;">
                            <b>CR line for HMO</b>
                        </div>
                        <div class="form-group" style="margin-top:5%;">
                            <input type="text" id='hmocrline' class="form-control" placeholder="0.00" data-mask="99999999.99" data-mask-selectonfocus="true">
                            <p id="hmocrlineerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div style="margin-top: 2%;">
                            <b>Priority</b>
                        </div>
                        <div class="form-group" style="margin-top:5%;" id="hmopriority_divid">
                            <input type="text" id='hmopriority' class="form-control" readonly="">
                            <p id="hmopriorityerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                </div>

                <div class="row clearfix" style="padding-left:30px;padding-right:30px">
                    
                    <div class="col-md-4">
                        <b>Card No./Reference No.</b>
                        <div class="form-group">
                            <input type="text" id='hmocardno' class="form-control" placeholder="Card No./Reference No.">
                            <p id='triggerClickHere'></p>
                            <p id="hmocardnoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <b>LOA/Approval</b>
                        <div class="form-group">
                            <input type="text" id='hmoloa' class="form-control" placeholder="LOA/Approval">
                            <p id="hmoloaerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <b>Approval Date</b>
                        <div class="form-group">
                            <input type="text" id='hmoapprovaldate' class="form-control" placeholder="Approval Date" onfocus="(this.type = 'date')" onfocusout="(this.type='text')">
                            <p id="hmoapprovaldateerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                    
                </div>
                
                <div class="row clearfix" style="padding-left:30px;padding-right:30px">
                    
                    <div class="col-md-12">
                        <b>Card Holder Name</b>
                        <div class="form-group">
                            <input type="text" id='hmocardholderno' class="form-control" placeholder="Card Holder No.">
                            <p id='triggerClickHere'></p>
                            <p id="hmocardholdernoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                    
                </div>
                
                <div class="row clearfix" style="padding-left:30px;padding-right:30px;margin-bottom:20px">
                    
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <button type="button" id='inserthmofrompatient' class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary btn-round waves-effect" onclick='addNewHMOForInsertAdmission();'>SAVE</button>
                        <button type="button" id='inserthmofromadmedit' class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary btn-round waves-effect d-none" onclick='addNewHMOForInsertAdmission();'>SAVE</button>
                        <button type="button" id='updatehmofrompatient' class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning btn-round waves-effect d-none" onclick='updateHMOForInsertAdmission();'>UPDATE</button>
                        <button type="button" id='updatehmofromadmedit' class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary btn-round waves-effect d-none" onclick='updateHMOForUpdateAdmission();'>UPDATE</button>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger btn-round waves-effect" onclick="hideAddHMOFields()">CANCEL</button>
                    </div>
                </div>
            </div>
            <!--            <div class="row" style="padding-left: 20px; padding-right: 20px">
                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-lg btn-primary waves-effect" onclick="showAddRoomsModal()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;ADD HMO ACCOUNT</b></button><br>
                        </div>-->
            <div class="modal-footer d-none" style="margin-bottom:0px;margin-top:0px;padding-bottom:20px;padding-top:0px;" id="hmoreturnbuttondiv">
                <button type="button" style="margin-left: 88%;" id='savebutton' class="btn btn-info waves-effect" onclick="hideHMOManagementModal()">RETURN</button>
            </div>
        </div>
    </div>
</div>

