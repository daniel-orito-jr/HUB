<div class="modal fade" id="inpatientlistformghclearance" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:0px;margin:0px;">
            <div class="modal-header" style="padding-left:20px;padding-right:0px;padding-top:10px;padding-bottom:10px;margin:0px;">
                <h4 class="title" id="largeModalLabel">Patient Listing</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                        <b>Patient Status</b>
                        <div class="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                            <div class="radio">
                                <div class="row">
                                    <div class="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                        <input type="radio" name="radioname_pxstatusmgh" id="radioid_admpatientmgh" value="NORMAL" checked="" onchange="onchangeadmittedpatientradio()"><label for="radioid_admpatientmgh">Admitted Patient</label>
                                    </div>
                                    <div class="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="radio" name="radioname_pxstatusmgh" id="radioid_chargedeptmgh" value="EMERGENCY" onchange="onchangechargetodpmtsupplyradio()"><label for="radioid_chargedeptmgh">Charge to Department Supplies</label>
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div style="float:left;width:85%;margin:0px;padding:0px;">
                                                    <select id="chargetodpmtsuppselect" class="show-tick form-control selectpicker" data-live-search="false" disabled="true" onchange="onchangeChargeToDpmtSupplySelect()">
                                                        <option value="Select">NONE-000</option>
                                                        <option value="Emergency">Emergency-015</option>
                                                        <option value="Operating">Operating Room-012</option>
                                                        <option value="Delivery">Delivery Room-013</option>
                                                        <option value="CSR">CSR-014</option>
                                                        <option value="NurseStation3A">Nurse Station 3A-017</option>
                                                        <option value="NurseStation3B">Nurse Station 3B-018</option>
                                                        <option value="ICU">ICU-019</option>
                                                        <option value="NurseStation4A">Nurse Station 4A-020</option>
                                                        <option value="NurseStation4B">Nurse Station 4B-022</option>
                                                        <option value="PICU">PICU-023</option>
                                                        <option value="Endo">Endo-025</option>
                                                    </select>
                                                </div>
                                                <div style="float:right;width:15%;margin:0px;padding-top:7px;">
                                                    <button class="btn btn-sm btn-default" id="chargetodpmtsuppbutton" disabled="true"><i class="zmdi zmdi-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div class="row" style="padding:0px;margin:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <b>&nbsp;Nurse Station</b>
                                <select name="selectname_nursestationmgh" id="selectid_nursestationmgh" class="show-tick form-control selectpicker" data-live-search="false" onchange="filterInpatientTableViaNurseStation()">
                                    <option value="Select">ALL</option>
                                    <?php
                                        for ($i = 0; $i < count($nursestation); $i++) 
                                        {
                                            echo "<option value='" . strtoupper($nursestation[$i]['nurselocations']) . "'>"
                                            . strtoupper($nursestation[$i]['nurselocations']) .
                                            "</option>";
                                        }
                                    ?>   
                                </select>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="checkbox" style="padding-top:7px;">
                                    &nbsp;&nbsp;<input name="chckboxname_forvwopdpatientmgh" id="chckboxid_forvwopdpatientmgh" type="checkbox" onchange="onchangeViewAlsoOPDCheckbox()">
                                    <label for="chckboxid_forvwopdpatientmgh">
                                        <small>View All OPD Patient</small>
                                    </label>
                                </div> 
                                <input type="hidden" id="hiddenboxid_forvwopdpatientmgh" value="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="admittedpatienttablediv" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                        <table class="table table-bordered table-hover" id="admitted-patients-masterlist-table">
                            <thead>
                                <tr style="padding-bottom:0px;padding-top:0px;">    
                                    <th id="table-head-picsheader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                    <th id="table-head-name">Name</th>
                                    <th id="table-head-action2">Case&nbsp;&nbsp;No.</th>
                                    <th id="table-head-action2">Nurse&nbsp;&nbsp;Station</th>
                                    <th id="table-head-action2">Status</th>
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
                <button type="button" class="btn btn-default waves-effect" onclick="hideInpatientMasterlistForMGHClearance()">CLOSE</button>
                <button type="button" class="btn btn-primary waves-effect" onclick="selectPatientForEmergencyOrQuickAdmitPatient()">OK/ SELECT</button>
            </div>
        </div>
    </div>
</div>

