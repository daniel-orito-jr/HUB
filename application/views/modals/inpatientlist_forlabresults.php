<div class="modal fade" id="inpatientlistforlabresults" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:0px;margin:0px;">
            <div class="modal-header" style="padding-left:20px;padding-right:0px;padding-top:10px;padding-bottom:10px;margin:0px;">
                <h4 class="title" id="largeModalLabel">Patient Listing</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                <div class="row" id="admittedpatienttablediv" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                        <table class="table table-bordered table-hover" id="inpatient-masterlist-table">
                            <thead>
                                <tr style="padding-bottom:0px;padding-top:0px;">    
                                    <th id="table-head-picsheader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                    <th id="table-head-name">Name</th>
                                    <th id="table-head-action2">Case&nbsp;&nbsp;No.</th>
                                    <th id="table-head-action2">Patient&nbsp;&nbsp;Status</th>
                                    <th id="table-head-action2">Claim&nbsp;&nbsp;Status</th>
                                    <th id="table-head-action2">Hospital&nbsp;&nbsp;No.</th>
                                    <th id="table-head-action2">Birthday</th>
                                    <th id="table-head-action">Sex</th>
                                    <th id="table-head-action2">Last&nbsp;&nbsp;Discharged</th>
                                    <th id="table-head-desc">Address/Baragay</th>
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
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" onclick="hideInpatientMasterlistForRxCreatorMaker()">CLOSE</button>
                <button type="button" class="btn btn-primary waves-effect" onclick="selectPatientForLaboratoryResults()">OK/ SELECT</button>
            </div>
        </div>
    </div>
</div>

