<div class="modal fade" data-refresh="true" id="searchdopdwalkinmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header" style="margin-bottom:0px;margin-top:10px;padding-bottom:0px;padding-top:0px;padding-left:30px;">
                <h4 class="title" id="largeModalLabel">Walkin Patients</h4>
            </div>
            <div class="modal-body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <input type="hidden" id="recid" value="<?= $this->session->userdata('ID'); ?>">
                <input type="hidden" id="recby" value="<?= $this->session->userdata('empname'); ?>">
                <input type="hidden" id="updated" value="<?= $updatedwi ?>">
                <input type="hidden" id="station" value="<?= $stationwi ?>">
                <input type="hidden" id="opid" value="<?= $opid ?>">
                <input type="hidden" id="OPDno" value="<?= $opdnumber ?>">
                <input type="hidden" id="Slrefno" value="">
                <input type="hidden" id="patientno">
                <input type="hidden" id="ledgerfile" value="ledgerOPD">
                <input type="hidden" id="tin" value="">
                <div class="container-fluid" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                    <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                        <div class="col-md-12">
                            <div class="card patients-list" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                <div class="row" id="opdwalkin-addbuttondiv" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                    <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showOPDWalkinFormForMembershipModal()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW MEMBER</b></button><br>
                                </div>
                                <div class="body d-none" id="opdwalkin-form" style="margin-bottom:20px;margin-top:0px;padding-bottom:0px;padding-top:0px;margin-left:0px;margin-right:0px;padding-left:0px;padding-right:0px">
                                    <div class="row clearfix">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <br>
                                        </div>
                                    </div>
                                    <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <div class="col-lg-9 col-md-6 col-sm-6 col-xs-12">
                                            <div class="row clearfix">
                                                <div class="col-md-6">
                                                    <div style="margin-top: 2%;">
                                                        <b>In-Patient Account</b>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" id='inpaaccntwi' class="form-control" value="">
                                                        <p id="inpaaccntwierror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div style="margin-top: 2%;">
                                                        <b>Membership ID</b>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" id='memberidwi' class="form-control" value="">
                                                        <p id="memberidwierror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <div class="row clearfix">
                                                <div class="col-md-12">
                                                    <div style="margin-top: 2%;">
                                                        <b>Patient Name<small> (Last, First, Middle)</small></b>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" id='patnamewi' class="form-control" value="">
                                                        <p id="patnamewierror" hidden="true" style="color:red;">Please input information on the field!</p>
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
                                    <div class="row clearfix">
                                        <div class="col-md-4">
                                            <div style="margin-top: 2%;">
                                                <b>Gender</b>
                                            </div>
                                            <div class="">
                                                <select id="genderwi" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                                <option value="Select From List">Select</option>
                                                                <option value="MALE">MALE</option>
                                                                <option value="FEMALE">FEMALE</option>   
                                                        </optgroup>
                                                </select>
                                                <p id="genderwierror" hidden="true" style="color:red;">Please input information on the field!</p>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div style="margin-top: 2%;">
                                                <b>Birthday</b>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" name="" id="birthdaywi" class="form-control" onfocus="(this.type='date')" onfocusout="(this.type='text')" placeholder="" autocomplete="off">
                                                <p id="birthdaywierror" hidden="true" style="color:red;">Please input information on the field!</p>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div style="margin-top: 2%;">
                                                <b>Age</b>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" id='ageofpxwi' class="form-control" placeholder="" autocomplete="off" required>
                                                <p id="ageofpxwierror" hidden="true" style="color:red;">Please input information on the field!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row clearfix">
                                        <div class="col-md-4">
                                            <div style="margin-top: 2%;">
                                                <b>Address</b>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" id='addresswi' class="form-control" value="">
                                                <p id="addresswierror" hidden="true" style="color:red;">Please input information on the field!</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div style="margin-top: 2%;">
                                                <b>City/Municipality</b>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" id='cityaddwi' class="form-control" value="">
                                                <p id="cityaddwierror" hidden="true" style="color:red;">Please input information on the field!</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div style="margin-top: 2%;">
                                                <b>Cellphone No.</b>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" id='cellphonewi' class="form-control" value="">
                                                <p id="cellphonewierror" hidden="true" style="color:red;">Please input information on the field!</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row clearfix">
                                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                            
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 d-none">
                                            <button type="button" id="opdwalkinupdatebutton" class="btn btn-primary waves-effect" onclick='updateOPDWalkinPatient()' style="width:100px">UPDATE</button>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                            <button type="button" id="opdwalkininsertbutton" class="btn btn-primary waves-effect" onclick='addNewOPDWalkinPatient()' style="width:100px">SAVE</button>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                            <button type="button" id="opdwalkinaddcancelbutton" class="btn btn-danger waves-effect" onclick="hideOPDWalkinFormForMembershipModal()" style="width:100px">CANCEL</button>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 d-none">
                                            <button type="button" id="opdwalkinedtcancelbutton" class="btn btn-danger waves-effect" onclick="" style="width:100px">CANCEL</button>
                                        </div>
                                    </div>

                                </div>

                                <!-- Tab panes -->
                                <div class="tab-content m-t-10" id="opdwalkin-masterlist-tablediv" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                    <table class="table table-bordered" id="opdwalkin-masterlist-table">
                                        <thead>
                                            <tr>                                       
                                                <th id="table-head-action2">Action</th>
                                                <th id="table-head-desc">Patient&nbsp;&nbsp;Name</th>
                                                <th id="table-head-action2">Member&nbsp;&nbsp;ID</th>
                                                <th id="table-head-action2">Birthday</th>
                                                <th id="table-head-action2">Sex</th>
                                                <th id="table-head-name">Address</th>
                                                <th id="table-head-action2">OPD&nbsp;&nbsp;Refno</th>
                                                <th id="table-head-action">Updated</th>
                                                <th id="table-head-action2">Cellphone</th>
                                                <th id="table-head-action">OPD&nbsp;&nbsp;Cd</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--END OF TABLE-->

            </div>
            <div class="modal-footer" id="opdwalkin-button-footerdiv" style="margin-bottom:20px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideOPDWalkinMasterlistForMembershipModal()">CLOSE</button>
                <button type="button" id='savebutton' class="btn btn-info waves-effect" onclick="selectOPDWalkinForAdmitPatient()">OK/SELECT</button>
            </div>
        </div>
    </div>
</div>