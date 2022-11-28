<div class="modal fade" id="searchdiagicd10rvsmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:0px;margin:0px;">
            <div class="modal-header" style="padding-left:20px;padding-right:0px;padding-top:10px;padding-bottom:10px;margin:0px;">
                <h4 class="title" id="largeModalLabel">Diagnosis w/ RCD10 and RVS</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                <div class="row" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                        <div class="row" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:0px;margin-left:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:0px;margin-left:0px;">
                                <div class="card top_counter" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:5px;padding-left:0px;margin-left:0px;">
                                    <div class="body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:0px;margin-left:0px;">
                                        <div class="icon xl-slategray" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:0px;margin-left:0px;">
                                            <i class="zmdi zmdi-assignment-o"></i> 
                                        </div>
                                        <div class="content" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:0px;margin-left:0px;">
                                            <div class="text">ICD-10/RVS:</div>
                                            <h5 class="number" id="textid_icdrvscodeadm">0000</h5>
                                        </div>
                                    </div>                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div class="row" style="padding:0px;margin:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <b style="margin-bottom:10px;">View By Group</b>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <select name="selectname_viewbygroupadm" id="selectid_viewbygroupadm" class="show-tick form-control selectpicker" data-live-search="false" onchange="">
                                    <option value="Select">Select From List</option>
                                </select>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div class="row" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                <div class="checkbox" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                    &nbsp;&nbsp;
                                    <input name="chckboxname_forfilterontypeadm" id="chckboxid_forfilterontypeadm" type="checkbox" onchange="enableDisableFilterType()" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                    <label for="chckboxid_forfilterontypeadm">
                                        <b>Filter on Type</b>
                                    </label>
                                </div> 
                                <input type="hidden" id="hiddenboxid_forfilterontypeadm" value="0" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                <select name="selectname_filtertypeadm" id="selectid_filtertypeadm" class="show-tick form-control selectpicker" data-live-search="false" onchange="onchangeFilterType()" disabled="">
                                    <option value="Select">Select From List</option>
                                    <option value="MEDICAL CASES">MEDICAL CASES</option>
                                    <option value="PROCEDURES">PROCEDURES</option>
                                    <option value="SECOND CASES">SECOND CASES</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="admittedpatienttablediv" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
<!--                        <hr style="padding-bottom:0px;padding-top:0px;margin-bottom:5px;margin-top:10px">-->
                        <table class="table table-bordered table-hover" id="diagnosis-withicd10-andrvs-table">
                            <thead>
                                <tr>    
                                    <th id="table-head-no">No.</th>
                                    <th id="table-head-causesrvs">Diagnosis</th>
                                    <th id="table-head-action2">ICD&nbsp;&nbsp;Code</th>
                                    <th id="table-head-causesrvs">Group</th>
                                    <th id="table-head-action2">Case&nbsp;&nbsp;Rate</th>
                                    <th id="table-head-action2">HCI</th>
                                    <th id="table-head-action2">PF</th>
                                    <th id="table-head-action2">RUV</th>
                                    <th id="table-head-actiondiag">Type</th>
                                    <th id="table-head-causesrvs">Updated</th>
                                    <th id="table-head-action2">Frequent</th>
                                    <th id="table-head-action2">Related&nbsp;&nbsp;Code</th>
                                    <th id="table-head-causesrvs">CF2&nbsp;&nbsp;Diag</th>
                                    <th id="table-head-causesrvs">Refno.</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                        <hr style="padding-bottom:0px;padding-top:0px;margin-bottom:10px;margin-top:0px">
                    </div>
                </div>
                <div class="row" style="margin-bottom:0px;">
                    <div class="col-lg-4 col-md-3 col-sm-12 col-xs-12">
                        <div class="card" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:15px">
                            <div class="header" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                <h2>
                                    <strong>TYPE: </strong><b id="textid_casetypeadm">CASES TYPE</b>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-3 col-sm-12 col-xs-12">
                        <div class="checkbox" style="margin-top:10px;">
                            <input name="chckboxname_frequenttypeadm" id="chckboxid_frequenttypeadm" type="checkbox" onchange="">
                            <label for="chckboxid_frequenttypeadm">
                                <b>Frequent/Favorite</b>
                            </label>
                        </div> 
                        <input type="hidden" id="hiddenboxid_forfilterontypeadm" value="0" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12">
                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-default waves-effect" onclick="hideDiagwithICD10RVSModal()()">CLOSE</button>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12">
                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="selectICD10RVSDiagnosisforAdmitPatient()()">SELECT</button>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>

