<div class="modal fade" id="pxmasterlistforemergency" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:0px;margin:0px;">
            <div class="modal-header" style="padding-left:20px;padding-right:0px;padding-top:10px;padding-bottom:10px;margin:0px;">
                <h4 class="title" id="largeModalLabel">&nbsp;Patient Masterlist</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                <div class="tab-pane" id="All">
                    <div class="row" style="padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-none">
                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showAddPatientsModal();"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW PATIENT</b></button>
                        </div>
                    </div>
                    <table class="table table-bordered table-hover" id="search-allpatient-table-foremergency-admission">
                        <thead>
                            <tr>                                       
<!--                                <th id="table-head-actionpac2">Action</th>-->
                                <th id="table-head-no">No.</th>
                                <th id="table-head-no">Pic.</th>
                                <th id="table-head-desc">Name</th>
                                <th id="table-head-action2">PIN</th>
                                <th id="table-head-action2">Hospital&nbsp;&nbsp;No.</th>
                                <th id="table-head-action2">Birthday</th>
                                <th id="table-head-action">Sex</th>
                                <th id="table-head-action2">Last&nbsp;&nbsp;Discharged</th>
                                <th id="table-head-name">Address/Baragay</th>
                                <th id="table-head-name">City/Municipality</th>
                                <th id="table-head-actionpacid">ID</th>
                                <th id="table-head-actionpacup">Updated</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>                            
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" onclick="hidePatientMasterlistModalForEmergency()">CLOSE</button>
                <button type="button" class="btn btn-primary waves-effect" onclick="selectPatientForEmergencyOrQuickAdmitPatient()">SELECT</button>
            </div>
        </div>
    </div>
</div>

