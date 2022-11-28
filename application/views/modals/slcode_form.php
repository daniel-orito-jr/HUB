<!--<div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
<div class="modal fade" id="slcodeformmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="margin-bottom:0px;padding-bottom:0px">
            <form id="insert-patient-form" autocomplete="off">
                <div class="modal-header" style="margin-bottom:0px;padding-bottom:0px">
                    <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h4 class="title" id="addslcodebigheader">Add New Slcode</h4>
                                        <h4 class="title d-none" id="edtslcodebigheader">Edit Slcode Account</h4>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="header" id="addslcodesmallheader">
                                            <h2><strong>Add SL Code</strong> Form</h2>
                                        </div>
                                        <div class="header d-none" id="edtslcodesmallheader">
                                            <h2><strong>Edit SL Code</strong> Form</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="margin:0px;padding:0px">
                    <div class="row clearfix" style="margin:0px;padding:0px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="margin:0px;padding:0px">
                            <div class="card" style="margin:0px;padding:0px">
                                <div class="body" style="margin:0px;padding:0px">
                                    <div class="tab-content" style="margin:0px;padding:0px">
                                        <div role="tabpanel" class="tab-pane in active" id="GeneralInformation">
                                            <input type="hidden" id="hiddbox_slrefnoadd">
                                            <input type="text" name="accountidadd" id="accountidadd" class="form-control gender-class d-none" placeholder="Enter Account ID" value="<?= $this->session->userdata('ID'); ?>" autocomplete="off">
                                            <input type="text" name="accountnameadd" id="accountnameadd" class="form-control gender-class d-none" placeholder="Enter Account Name" value="<?= $this->session->userdata('empname'); ?>" autocomplete="off">
                                            <div class="row clearfix" style="padding-left:35px;padding-right:35px;padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                                <div class="col-md-4">
                                                    <div style="margin-top: 2%;">
                                                        <b>SL Code</b>
                                                    </div>
                                                    <div class="form-group" style="margin-top:5%;" id="slcodereloadifduplicatedivid">
                                                        <input type="text" id='slcodeadd' class="form-control" value="" readonly="">
                                                    </div>
                                                </div>

                                                <div class="col-md-3">
                                                    <div style="margin-top: 2%;">
                                                        <b>COA Ref. No.</b>
                                                    </div>
                                                    <div class="form-group" style="margin-top:5%;">
                                                        <input type="text" id='coarefnoadd' class="form-control" value="">
                                                    </div>
                                                </div>
                                                
                                                <div class="col-md-3">
                                                    <div style="margin-top: 2%;">
                                                        <b>Px Index No.</b>
                                                    </div>
                                                    <div class="form-group" style="margin-top:5%;">
                                                        <input type="text" id='slindexnoadd' class="form-control" value="" readonly="">
                                                        <p id="slindexnoadderror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                    </div>
                                                </div>

                                                <div class="col-md-2">
                                                    <b>Active</b>
                                                    <div class="checkbox">
                                                        <input id="activeadd" type="checkbox" checked="">
                                                        <label for="activeadd">
                                                            Active
                                                        </label>
                                                        <input type="hidden" id="hiddbox_activeadd">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row clearfix" style="padding-left:35px;padding-right:35px;padding-top:0px;padding-bottom:0px;margin-bottom:20px;margin-top:0px;">
                                                <div class="col-md-6">
                                                    <b>SL Description</b>
                                                    <div class="form-group" style="margin-top:10px;">
                                                        <input type="text" id='sldescriptionadd' class="form-control" placeholder="Enter SL Description" readonly="">
                                                    </div>
                                                    <p id="sldescriptionadderror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>

                                                <div class="col-md-6">
                                                    <b>SL Address</b>
                                                    <div class="form-group" style="margin-top:10px;">
                                                        <input type="text" id='sladdressadd' class="form-control" placeholder="Enter SL Address" readonly="">
                                                    </div>
                                                    <p id="sladdressadderror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding-left:30px;padding-right:30px;padding-bottom:30px;padding-top:10px;">
                    <button type="button" id="cancelforsave" class="btn btn-default waves-effect" onclick="hideAddSLCodeFormForAddPatient()">CLOSE</button>
                    <button type="button" id="cancelforedit" class="btn btn-default waves-effect d-none" onclick="">CLOSE</button>
                    <button type="button" id='savebuttonaddpx' class="btn btn-info waves-effect" onclick="addNewSLCodeForAddPatient()">SAVE</button>
                    <button type="button" id='editbuttonaddpx' class="btn btn-info waves-effect d-none" onclick="">UPDATE</button>
                </div>
            </form>
        </div>
    </div>
</div>

