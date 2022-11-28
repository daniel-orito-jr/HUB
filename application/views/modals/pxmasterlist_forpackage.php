<div class="modal fade" id="pxmasterlistforpackage" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
            <div class="modal-header" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:10px;padding-left:20px;padding-right:20px;">
                <h4 class="title" id="largeModalLabel">Patient Masterlist</h4>
            </div>
            <div class="modal-body" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                <div class="tab-pane" id="All" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
<!--                    <div class="row" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;padding-left:10px;padding-right:10px">
                        <button type="button" class="d-none col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="" id="addpxfor_package"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW PATIENT <small>(for package)</small></b></button>
                        <button type="button" class="d-none col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="" id="addpxfor_valcard"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW PATIENT <small>(for valcard)</small></b></button>
                    </div>-->
                    <table class="table table-bordered" id="allpatient-forpackage-table">
                        <thead>
                            <tr>                                       
                                <!--<th id="table-head-action2">Action</th>-->
                                <th id="table-head-no">No.</th>
                                <th id="table-head-action">Last&nbsp;&nbsp;Name</th>
                                <th id="table-head-action">Middle&nbsp;&nbsp;Name</th>
                                <th id="table-head-action">First&nbsp;&nbsp;Name</th>
                                <th id="table-head-action">Suffix</th>
                                <th id="table-head-desc">Name</th>
                                <th id="table-head-action">PIN</th>
                                <th id="table-head-hospno">Hospital&nbsp;&nbsp;No.</th>
                                <th id="table-head-action">Birthday</th>
                                <th id="table-head-action">Sex</th>
                                <th id="table-head-action">Age</th>
                                <th id="table-head-name">Religion</th>
                                <th id="table-head-action">Mobile&nbsp;&nbsp;No.</th>
                                <th id="table-head-action">Last&nbsp;&nbsp;Discharged</th>
                                <th id="table-head-name">Address/Baragay</th>
                                <th id="table-head-name">City/Municipality</th>
                                <th id="table-head-action">ID/Pincode</th>
                                <th id="table-head-action">SL&nbsp;&nbsp;Code</th>
                                <th id="table-head-action">Updated</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>                            
                </div>
            </div>
            <div class="modal-footer" style="padding-top:0px;padding-bottom:0px;margin-bottom:20px;margin-top:0px;">
                <button type="button" class="btn btn-default waves-effect d-none" onclick="hidePatientMasterlistForManagerModal()" id="pxmasterlistreturnbtn_formanager">RETURN</button>
                <button type="button" class="btn btn-default waves-effect" onclick="hidePatientMasterlistForPackageModal()" id="pxmasterlistreturnbtn_forpackage">RETURN</button>
                <button type="button" class="btn btn-primary waves-effect" onclick="selectPatientForPackageManagement()">SELECT</button>
            </div>
        </div>
    </div>
</div>

