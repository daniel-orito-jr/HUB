<div class="modal fade" id="searchmembershipmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header" style="padding-top:15px;padding-bottom:0px;padding-left:30px;margin-bottom:0px;margin-top:0px;">
                <h4 class="title" id="largeModalLabel"><?= ucwords(strtolower($membertypepro["MemberType"])) ?></h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                    <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                        <div class="col-md-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="row d-none" id="addmembershipbuttondiv" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:15px;padding-right:15px;">
                                <button id="addSLCodeButton" type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showAddMembershipForm()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;ADD NEW MEMBER</b></button>
                            </div>
                                <div class="d-none" id="membership-masterlist-div" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                        <table class="table table-bordered table-striped table-hover" id="membership-masterlist-table">
                                            <thead>
                                                <tr>                                       
                                                    <th id="table-head-action2sl">Action</th>
                                                    <th id="table-head-name">Member&nbsp;&nbsp;Name</th>
                                                    <th id="table-head-name">Referrence&nbsp;&nbsp;No.</th>
                                                    <th id="table-head-action2">Card&nbsp;&nbsp;Number</th>
                                                    <th id="table-head-name">Birthday</th>
                                                    <th id="table-head-action">Gender</th>
                                                    <th id="table-head-action2">Mobile&nbsp;&nbsp;No.</th>
                                                    <th id="table-head-action2">#Stocks</th>
                                                    <th id="table-head-action2">S.Value</th>
                                                    <th id="table-head-action2">Member&nbsp;&nbsp;Since</th>
                                                    <th id="table-head-action2">Last&nbsp;&nbsp;Stock</th>
                                                    <th id="table-head-name">Address</th>
                                                    <th id="table-head-name">City</th>
                                                    <th id="table-head-action2">IPD&nbsp;&nbsp;ID</th>
                                                    <th id="table-head-action2">PIN</th>
                                                    <th id="table-head-action2">Type</th>
                                                    <th id="table-head-action2">Status</th>
                                                    <th id="table-head-action2">Pics</th>
                                                    <th id="table-head-name">Updated</th>
                                                    <th id="table-head-action2">TIN</th>
                                                    <th id="table-head-action2">Transferred&nbsp;&nbsp;to</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>                            
                                </div>
                                <div class="body d-none" id="addmembership"  style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;"> 
                                        <ul  style="border:0px;padding:0px;margin:none"  class="nav nav-tabs justify-content-center" role="tablist" style="margin:0px;padding:0px">
                                                <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#profile">Profile</a></li>
                                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#account">Account</a></li>
                                        </ul>
                                        <div class="tab-content">
                                            <div role="tabpanel" class="tab-pane in active" id="profile">
                                                <div class="row clearfix">
                                                    <div class="col-lg-9 col-md-6 col-sm-6 col-xs-12">
                                                        
                                                        <div class="row clearfix">
                                                            <div class="col-md-6">
                                                                <div style="margin-top: 2%;">
                                                                    <b>OPD Ref.</b>
                                                                </div>
                                                                <div class="input-group">
                                                                    <input type="text" id='opdrefmembr' class="form-control" value="" style="height:40px" readonly="">
                                                                    <span class="input-group-addon" style="padding:0px;background:#e3e3e3;border-left:transparent">
                                                                        <button type="button" id='selectpatientinpackages' class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showOPDWalkinMasterlistForMembershipModal();">
                                                                            <i class="zmdi zmdi-plus"></i>
                                                                        </button>
                                                                    </span>
                                                                    <p id="opdrefmemberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <div style="margin-top: 2%;">
                                                                    <b>PIN</b>
                                                                </div>
                                                                <div class="input-group">
                                                                    <input type="text" id='pinnummembr' class="form-control" value="" style="height:40px" readonly="">
                                                                    <span class="input-group-addon" style="padding:0px;background:#e3e3e3;border-left:transparent">
                                                                        <button type="button" id='selectpatientinpackages' class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showPatientMasterlistForPackageModal();">
                                                                            <i class="zmdi zmdi-plus"></i>
                                                                        </button>
                                                                    </span>
                                                                    <p id="pinnummemberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="row clearfix">
                                                            <div class="col-md-12">
                                                                <div style="margin-top: 2%;">
                                                                    <b>Member Name<small> (Last, First, Middle)</small></b>
                                                                </div>
                                                                <div class="form-group">
                                                                    <input type="text" id='fullnamemembr' class="form-control" value="">
                                                                    <p id="fullnamememberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row clearfix">
                                                            <div class="col-md-6">
                                                                <div style="margin-top: 2%;">
                                                                    <b>Gender</b>
                                                                </div>
                                                                <div class="">
                                                                    <select id="gendermembr" class="form-control selectpicker" data-live-search="true">
                                                                            <optgroup>
                                                                                    <option value="Select From List">Select</option>
                                                                                    <option value="MALE">MALE</option>
                                                                                    <option value="FEMALE">FEMALE</option>   
                                                                            </optgroup>
                                                                    </select>
                                                                    <p id="gendermemberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <div style="margin-top: 2%;">
                                                                    <b>Birthday</b>
                                                                </div>
                                                                <div class="form-group">
                                                                    <input type="text" name="" id="birthmembr" class="form-control" onfocus="(this.type='date')" onfocusout="(this.type='text')" placeholder="Enter Birthday" autocomplete="off">
                                                                    <p id="birthmemberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                        <div class="form-group">
                                                            <div class="relative">
                                                                    <div class="absolute">
                                                                            <img class="rounded img-raised" src="<?= base_url('assets/images/px.png'); ?>" height="110" width="110" style="border:7px solid #02bec0;border-radius:2px" alt="" id="patientimgupload">
                                                                    </div>
                                                            </div>
                                                            <div class="relative">
                                                                    <div class="absolute">
                                                                            <button type="button" class="btn btn-sm btn-primary waves-effect" style="margin-top:85px;width:110px;top:30px" onclick="">BROWSE</button>
                                                                            <input type="file" id="openpatientimgupload" accept="image/*" style="display:none" onchange="readImageURL(this, 'patientimgupload');"/> 
                                                                            <p id="photoerr" style="color:red;padding-left:3px"></p>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                            
                                            <div role="tabpanel" class="tab-pane in" id="account">
                                                <div class="row clearfix">
                                                    <div class="col-md-6">
                                                        <div style="margin-top: 2%;">
                                                            <b>Mobile No.</b>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" id='mobilemembr' class="form-control" placeholder="Enter Mobile Number" data-mask="99-999-999999" data-mask-selectonfocus="true" autocomplete="off" required>
                                                            <p id="mobilememberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div style="margin-top: 2%;">
                                                            <b>Member ID Card</b>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" id='memidmembr' class="form-control" value="">
                                                            <p id="memidmemberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="row clearfix">
                                                            
                                                    <div class="col-md-6">
                                                        <div style="margin-top: 2%;">
                                                            <b>Mailing Address</b>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" id='mailaddmembr' class="form-control" value="">
                                                            <p id="mailaddmemberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div style="margin-top: 2%;">
                                                            <b>City/Municipality</b>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" id='citymunmembr' class="form-control" value="">
                                                            <p id="citymunmemberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="row clearfix">

                                                    <div class="col-md-4">
                                                        <div style="margin-top: 2%;">
                                                            <b>TIN</b>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" id='tinnummembr' class="form-control" value="">
                                                            <p id="tinnummemberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="col-md-4">
                                                        <div style="margin-top: 2%;">
                                                            <b>Transferred to</b>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" id='transtomembr' class="form-control" value="">
                                                            <p id="transtomemberror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div style="margin-top: 2%;">
                                                            <b>Cancelled</b>
                                                        </div>
                                                        <div class="checkbox">
                                                            <input id="cancelled" type="checkbox" checked="">
                                                            <label for="cancelled">
                                                                Closed Account
                                                            </label>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    <div class="row clearfix" style="padding-bottom:20px;">
                                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                            
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                            <button type="button" class="btn btn-primary waves-effect" onclick='addNewMembership()' style="width:100px">SAVE</button>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                            <button type="button" class="btn btn-danger waves-effect" onclick="hideAddMembershipForm()" style="width:100px">CANCEL</button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
         
            </div>
            <div class="modal-footer d-none" id="membershipmodalfooter" style="padding-bottom:20px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideSearchMembershipModalForAdmission()">CLOSE</button>
                <button type="button" id='savebutton' class="btn btn-info waves-effect" onclick="selectMembershipForAdmitPatient()">OK/SELECT</button>
            </div>
        </div>
    </div>
</div>