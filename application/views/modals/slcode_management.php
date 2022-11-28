<div class="modal fade" id="slcodemanagementmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:0px;margin:0px;">
            <div class="modal-header" style="padding-left:20px;padding-right:0px;padding-top:10px;padding-bottom:10px;margin:0px;">
                <h4 class="title" id="largeModalLabel">SL Code Management</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">

                <!--TABLE-->
                <div class="container-fluid">
                    <div class="row clearfix" style="padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px">
                        <div class="col-md-12">
                            <div class="card patients-list">
                                <div class="body" style="padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs padding-0">
                                        <li class="nav-item"><button type="button" class="btn btn-primary btn-round waves-effect float-right" style='margin-left:70%;' onclick='showAddSLCode();' title="ADD SL CODE"><i class="material-icons">person_add</i></button></li>
                                    </ul>

                                    <div id="addslcode" class="body d-none">
                                        <input type="text" name="doccd" id="doccd" class="form-control gender-class d-none" placeholder="Enter Nurse CD" autocomplete="off">
                                        <input type="text" name="accountid" id="accountid" class="form-control gender-class d-none" placeholder="Enter Account ID" value="<?= $this->session->userdata('ID'); ?>" autocomplete="off">
                                        <input type="text" name="accountname" id="accountname" class="form-control gender-class d-none" placeholder="Enter Account Name" value="<?= $this->session->userdata('empname'); ?>" autocomplete="off">
                                        <input type="text" name="pin" id="pin" class="form-control gender-class d-none" placeholder="Enter PIN" autocomplete="off">

                                        <div class="row clearfix">

                                            <div class="col-md-4">
                                                <div style="margin-top: 2%;">
                                                    <b>SL Code</b>
                                                </div>
                                                <div class="form-group" style="margin-top:5%;">
                                                    <input type="text" id='slcode' class="form-control" readonly>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>COA Reference</b><button type="button" class="btn btn-sm btn-default" onclick="showCOAModal();">
                                                    <i class="zmdi zmdi-search-in-file"></i>
                                                </button>
                                                <div class="form-group">
                                                    <input type="text" id='coareference' class="form-control" placeholder="Enter COA Reference">
                                                    <p id="coareferenceerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>PIN Reference</b><button class="btn btn-sm btn-default" onclick="showPatientMasterlistModal();">
                                                    <i class="zmdi zmdi-search-in-file"></i>
                                                </button>
                                                <div class="form-group">
                                                    <input type="text" id='pinreference' class="form-control" placeholder="Enter PIN Reference">
                                                    <p id="pinreferenceerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row clearfix">
                                            <div class="col-md-4">
                                                <b>SL Description</b>
                                                <div class="form-group">
                                                    <input type="text" id='sldescription' class="form-control" placeholder="Enter SL Description">
                                                    <p id="sldescriptionerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>SL Address</b>
                                                <div class="form-group">
                                                    <input type="text" id='sladdress' class="form-control" placeholder="Enter SL Address">
                                                    <p id="sladdresserror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>


                                            <div class="col-md-4">
                                                <b>Active</b>
                                                <div class="checkbox">
                                                    <input id="active" type="checkbox" checked="">
                                                    <label for="active">
                                                        Active
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div style="margin-left: 60%;">
                                                <button type="button" id='saveslcode' class="btn btn-primary btn-round waves-effect" onclick='addSLCode();'>SAVE CHANGES</button>
                                                <button type="button" class="btn btn-danger btn-round waves-effect" onclick="$('#addslcode').addClass('d-none')">CANCEL</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- Tab panes -->
                                <div class="tab-content m-t-10">
                                    <div class="tab-pane table-responsive active" id="All">
                                        <table class="table table-bordered table-striped table-hover" id="slcode-masterlist-table">
                                            <thead>
                                                <tr>                                       
                                                    <th id="table-head-action">Action</th>
                                                    <th id="table-head-name">SL&nbsp;&nbsp;Account</th>
                                                    <th id="table-head-action">SL&nbsp;&nbsp;Code</th>
                                                    <th id="table-head-name">SL&nbsp;&nbsp;Address</th>
                                                    <th id="table-head-action">COA&nbsp;&nbsp;Ref</th>
                                                    <th id="table-head-action">Status</th>
                                                    <th id="table-head-action">Ref&nbsp;&nbsp;No.</th>
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
                </div>
                <!--END OF TABLE-->

            </div>
            <div class="modal-footer" style="padding-bottom: 20px; padding-top: 0px; padding-left: 20px; padding-right: 20px">
                <button type="button" id='selectslcodeipdbutton' class="btn btn-primary btn-round waves-effect">OK/SELECT</button>
                <button type="button" id='selectslcodeopdbutton' class="btn btn-primary btn-round waves-effect d-none">OK/SELECT</button>
                <button type="button" id='savebutton' class="btn btn-primary btn-round waves-effect d-none" onclick="$('#savebutton').removeClass('d-none');
                        $('#updatebutton').addClass('d-none');
                        addNurses();">SAVE CHANGES</button>
                <button type="button" id='updatebutton' class="btn btn-primary btn-round waves-effect d-none" onclick='updateNurses();'>SAVE CHANGES</button>
                <button type="button" class="btn btn-danger btn-round waves-effect" data-dismiss="modal" onclick="hideNursesModal();">CLOSE</button>
            </div>
        </div>
    </div>
</div>