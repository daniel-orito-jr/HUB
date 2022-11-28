<div class="modal fade" id="packagemasterlistmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
            <div class="modal-header" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:10px;padding-left:20px;padding-right:20px;">
                <h4 class="title" id="largeModalLabel">Package Masterlist</h4>
            </div>
            <div class="modal-body" id="packagemasterlisttbldiv" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                <div class="row" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:10px;padding-right:10px;">
                    <input type="hidden" name="packagemasterlistid" id="packagemasterlistid">
                    <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showAddPackageMasterlistForm()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;ADD PACKAGE</b></button>
                </div>
                <div class="tab-pane" id="All" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                    <table class="table table-bordered" id="package-masterlist-table">
                        <thead>
                            <tr>                                       
                                <th id="table-head-action2">Action</th>
                                <th id="table-head-action2">Package&nbsp;&nbsp;Code</th>
                                <th id="table-head-name2">Package/Deals</th>
                                <th id="table-head-name2">In&nbsp;&nbsp;Charge</th>
                                <th id="table-head-action4">Package&nbsp;&nbsp;Php</th>
                                <th id="table-head-action4">Active</th>
                                <th id="table-head-name2">Memo/Ref</th>
                                <th id="table-head-action2">Deactivated</th>
                                <th id="table-head-action2">Linked&nbsp;&nbsp;Account</th>
                                <th id="table-head-action2">Last&nbsp;&nbsp;Update</th>
                                <th id="table-head-action2">ID</th>
                                <th id="table-head-action3">Ref&nbsp;&nbsp;Code</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table> 
                </div>
            </div>

            <div id="addpackagemasterlist" class="body d-none">
                <input type="text" name="packagemasterlistaccountid" id="packagemasterlistaccountid" class="form-control gender-class d-none" placeholder="Enter Account ID" value="<?= $this->session->userdata('ID'); ?>" autocomplete="off">
                <input type="text" name="packagemasterlistaccountname" id="packagemasterlistaccountname" class="form-control gender-class d-none" placeholder="Enter Account Name" value="<?= $this->session->userdata('empname'); ?>" autocomplete="off">
                <input type="text" name="patientpackagepin" id="patientpackagepin" class="form-control gender-class d-none" placeholder="Patient Package PIN" autocomplete="off">
                
                <div class="card patients-list" style="margin-bottom:0px;margin-top:30px;padding-bottom:0px;padding-top:0px;padding-left:30px;">
                    <div class="header" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;">
                        <h2><strong>Package List</strong> Form</h2>
                    </div>
                </div>

                <div class="row clearfix" style="padding-left:30px;padding-right:30px;margin-top:20px;">
                    <div class="col-md-4">
                        <b>Package Code (Max 10 Char)</b>
                        <div class="form-group">
                            <input type="text" id='packagemasterlistcode' class="form-control" placeholder="Package Code">
                            <p id="packagemasterlistcodeerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <b>In-Charge (Max 35 Char)</b>
                        <div class="form-group">
                            <input type="text" id='packagemasterlistincharge' class="form-control" placeholder="In-Charge">
                            <p id="packagemasterlistinchargeerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <b>Package Price</b>
                        <div class="form-group">
                            <input type="number" id='packagemasterlistprice' class="form-control" placeholder="Package Price">
                            <p id="packagemasterlistpriceerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                </div>
                <div class="row clearfix" style="padding-left:30px;padding-right:30px;margin-top:20px;">
                    <div class="col-md-4">
                        <b>Package / Deal Description (Max 75 Char)</b>
                        <div class="form-group">
                            <input type="text" id='packagemasterlistdeal' class="form-control" placeholder="Package / Deal Description">
                            <p id="packagemasterlistdealerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <b>Memo/Directive/Referrence No.</b>
                        <div class="form-group">
                            <input type="text" id='packagemasterlistmemo' class="form-control" placeholder="Memo/Directive/Reference No.">
                            <p id="packagemasterlistmemoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <b>Package Code of Main Account (Optional)</b>
                        <div class="form-group">
                            <input type="text" id='packagemasterlistcodeofmain' class="form-control" placeholder="Package Code of Main Account (Optional)">
                            <p id="packagemasterlistcodeofmainerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>

                </div>

                <div class="row clearfix" style="padding-left:30px;padding-right:30px;padding-bottom:30px;margin-top:25px;">
                    <div style="margin-left: 73%;">
                        <button type="button" id='addpackagemasterlistbutton' class="btn btn-primary waves-effect" onclick='addPackageToMasterlist();'>SAVE</button>
                        <button type="button" id='updatepackagemasterlistbutton' class="btn btn-warning waves-effect d-none" onclick='updatePackageMasterlist()'>UPDATE</button>
                        <button type="button" class="btn btn-danger waves-effect" onclick="hideAddPackageMasterlistForm()">CANCEL</button>
                    </div>
                </div>
            </div>

            <div class="modal-footer" id="packagemasterlistfooterbtndiv" style="padding-bottom:0px;padding-top:0px;margin-bottom:20px;margin-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideSearchPackageCodeModalForPackage()">RETURN</button>
                <button type="button" class="btn btn-primary waves-effect" onclick="selectPackageForPackageManagement()">SELECT</button>
            </div>
        </div>
    </div>
</div>

