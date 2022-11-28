<div class="modal fade" id="inpatientlistforrxcreator" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:0px;margin:0px;">
            <div class="modal-header" style="padding-left:20px;padding-right:0px;padding-top:10px;padding-bottom:10px;margin:0px;">
                <h4 class="title" id="largeModalLabel">Patient Listing</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <b>Claim Status</b>
                        <div class="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                            <div class="radio">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <input type="radio" name="radioname_phicclaimstatrxc" id="radioid_unclaimrxc" checked="" onchange="onChangeUnclaimStatusRadio()"><label for="radioid_unclaimrxc">Unclaim Patient</label>
                                    </div>
                                    <div class="col-lg-12 col-md-6 col-sm-12 col-xs-12">
                                        <input type="radio" name="radioname_phicclaimstatrxc" id="radioid_claimrxc" onchange="onChangeClaimStatusRadio()"><label for="radioid_claimrxc">Claim Accounts</label>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" id="hiddenboxid_phclaimstatrxc" value="UNCLAIM">
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <b>Patient Status</b>
                        <div class="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                            <div class="radio">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <input type="radio" name="radioname_patientstatrxc" id="radioid_admittedtyperxc" onchange="onChangeAdmittedStatusRadio()"><label for="radioid_admittedtyperxc">Admitted Patient</label>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <input type="radio" name="radioname_patientstatrxc" id="radioid_dischargetyperxc" onchange="onChangeDischargedStatusRadio()" checked=""><label for="radioid_dischargetyperxc">Discharged Patient</label>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" id="hiddenboxid_patientstatrxc" value="DISCHARGED">
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button type="button" id="" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-info waves-effect" onclick='alert("under development")'><i class="zmdi zmdi-print"></i>&nbsp;&nbsp;&nbsp;PRINT INFO</b></button>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button type="button" id="" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning waves-effect" onclick='alert("under development")'><i class="zmdi zmdi-edit"></i>&nbsp;&nbsp;&nbsp;EDIT PATIENT</b></button>
                            </div>
                        </div>
                    </div>
                </div>
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
                <div class="row d-none" id="chargetodprtmtsupplydiv" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                        <div class="typography-line shadow-effect" style="background:#E7EBEB;border:1px solid #DEE0E0;border-radius:5px;padding-left:200px;padding-right:200px;padding-bottom:60px;padding-top:60px;margin-bottom:20px;">
                            <center>
                                <p style="color:darkorange;font-size:15px;">
                                    YOU ARE ABOUT TO REQUEST ITEM(S) TO:
                                </p>
                                <b style="text-align:center;color:orangered;font-size:30px;" id="departmenttextfield">
                                    NONE
                                </b>
                                <p style="color:darkgoldenrod;font-size:17px;font-weight:bold">
                                    PRESS [OK] BELOW TO PROCEED...
                                </p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" onclick="hideInpatientMasterlistForRxCreatorMaker()">CLOSE</button>
                <button type="button" class="btn btn-primary waves-effect" onclick="selectPatientForRXCreatorMaker()">OK/ SELECT</button>
            </div>
        </div>
    </div>
</div>

