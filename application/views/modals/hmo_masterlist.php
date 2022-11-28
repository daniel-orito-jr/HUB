<div class="modal fade" id="hmomasterlistmanagementmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
            <div class="modal-header" style="margin-bottom:0px;margin-top:10px;padding-bottom:0px;padding-top:0px;">
                <h4 class="title" id="largeModalLabel">HMO Masterlist Management</h4>
            </div>
            <div class="modal-body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <div class="row clearfix" id="hmomasterlist-tablediv" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showAddHMOMasterlistFields();"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;ADD HMO</b></button><br>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <table class="table table-bordered table-striped table-hover" id="hmo-masterlist-table">
                            <thead>
                                <tr>                                       
                                    <th id="table-head-action2">Action</th>
                                    <th id="table-head-action2">Code</th>
                                    <th id="table-head-action">Ref.No</th>
                                    <th id="table-head-action">HMO&nbsp;&nbsp;Insurance&nbsp;&nbsp;Name</th>
                                    <th id="table-head-action">Mneomonic&nbsp;&nbsp;Name</th>
                                    <th id="table-head-action2">Lic.No</th>
                                    <th id="table-head-action2">OPD&nbsp;Enable</th>
                                    <th id="table-head-namehmo">Address</th>
                                    <th id="table-head-action">Last&nbsp;Update</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table> 
                    </div>
                </div>
            </div>

            <div id="addhmomasterlist" class="body d-none" style="margin-top:30px;padding-left:30px;padding-right:30px">
                <input type="text" name="accountidhmo" id="accountidhmo" class="form-control gender-class d-none" placeholder="Enter Account ID" value="<?= $this->session->userdata('ID'); ?>" autocomplete="off">
                <input type="text" name="accountnamehmo" id="accountnamehmo" class="form-control gender-class d-none" placeholder="Enter Account Name" value="<?= $this->session->userdata('empname'); ?>" autocomplete="off">
                <input type="text" name="hmoid" id="hmoid" class="form-control gender-class d-none" placeholder="HMO ID" autocomplete="off">

                <div class="row clearfix">
                    <div class="col-md-6">
                        <b>HMO Name</b>
                        <div class="form-group">
                            <input type="text" id='hmomasterlistname' class="form-control" placeholder="HMO Name">
                            <p id="hmomasterlistnameerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <b>Mneomonic</b>
                        <div class="form-group">
                            <input type="text" id='hmomneomonic' class="form-control" placeholder="Mneomonic">
                            <p id="hmomneomonicerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-md-6">
                        <b>Address</b>
                        <div class="form-group">
                            <input type="text" id='hmoaddress' class="form-control" placeholder="Address">
                            <p id="hmoaddresserror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <b>License Number</b>
                        <div class="form-group">
                            <input type="text" id='hmolicensenumber' class="form-control" placeholder="License Number">
                            <p id="hmolicensenumbererror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                </div>
                
                <div class="row clearfix">
                    <div class="col-md-12">
                        <b>Allow OPD Transactions</b>
                        <div class="checkbox">
                            <input id="allowopdtransactions" type="checkbox" checked="">
                            <label for="allowopdtransactions">
                                Allow OPD Transactions
                            </label>
                        </div>
                    </div>
                </div>

                <div class="row clearfix" style="margin-bottom:20px;margin-top:10px;">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <button type="button" id='savehmomasterlist' class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary btn-round waves-effect" onclick='addHMOMasterlist()'>SAVE</button>
                        <button type="button" id='updatehmomasterlist' class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary btn-round waves-effect d-none" onclick='updateHMOMasterlist()'>UPDATE</button>
                    </div>
                    
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <button type="button" class="btn btn-danger btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick="hideAddHMOMasterlistFields()">CANCEL</button>
                    </div>
                </div>
            </div>
            <!--            <div class="row" style="padding-left: 20px; padding-right: 20px">
                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-lg btn-primary waves-effect" onclick="showAddRoomsModal()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;ADD HMO ACCOUNT</b></button><br>
                        </div>-->
            <div class="modal-footer" id="hmomasterlistbuttondiv" style="margin-bottom:0px;margin-top:0px;padding-bottom:20px;padding-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideSearchHMOModalForAdmission()">CANCEL</button>
                <button type="button" class="btn btn-info waves-effect" onclick="selectHMOForAdmitPatient()">SELECT</button>
            </div>
        </div>
    </div>
</div>

