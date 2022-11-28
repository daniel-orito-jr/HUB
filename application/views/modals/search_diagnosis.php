<div class="modal fade" data-refresh="true" id="searchdiagnosismodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header" style="margin-bottom:0px;margin-top:7px;padding-bottom:0px;padding-top:0px;padding-left:15px;padding-right:15px">
                <h4 class="title" id="largeModalLabel">List of Diagnosis</h4>
            </div>
            <div class="modal-body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <input type="hidden" id="recordsiddiag" value="<?= $this->session->userdata("ID"); ?>">
                <input type="hidden" id="recordsbydiag" value="<?= $this->session->userdata("empname"); ?>">
                <input type="hidden" id="diagid" value="">
                <input type="hidden" id="refnodiag" value="">
                <div class="body d-none" id="diagnosis-form" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;"> 
                    <div class="row clearfix">
                        <div class="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                            <div style="margin-top: 2%;">
                                <b>Grouping by DOH Category</b><button type="button" class="btn btn-info btn-sm float-right" onclick="showICD10GroupingManagementModal()"><i class="zmdi zmdi-plus"></i></button>
                            </div>
                            <div class="form-group">
                                <textarea name="diagnosisdiag" id="dohcateg" class="form-control m-b-20" rows="4" placeholder="" style="background:#EBEDED;border-radius:5px;"></textarea>
                                <p id="dohcategerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div style="margin-top: 2%;">
                                        <b>ICD-10 Code</b>
                                    </div>
                                    <input type="text" name="groupingdiag2" id="icd10code" class="form-control" style="height:40px" readonly="">
                                    
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div style="margin-top: 25px;">
                                        <b>ICD-10 Category</b>
                                    </div>
                                    <input type="text" name="groupingdiag2" id="icd10categ" class="form-control" style="height:40px" readonly="">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <div style="margin-top: 2%;">
                                <b>Diagnosis</b>
                            </div>
                            <div class="form-group">
                                <textarea name="diagnosisdiag" id="diagnosis" class="form-control m-b-20" rows="5" placeholder="" style="background:#EBEDED;border-radius:5px;"></textarea>
                                <p id="diagnosiserror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                        </div>
                    </div>

                    <div class="row clearfix" style="margin-bottom:20px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">

                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                            <button type="button" onclick='addNewDiagnosis()' id="adddiagnosis_button" style="width:100px" class="adddiagnosis_button btn btn-primary waves-effect">SAVE</button>
                            <button type="button" onclick='updateDiagnosis()' id="edtdiagnosis_button" style="width:100px" class="edtdiagnosis_button btn btn-primary waves-effect d-none">UPDATE</button>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                            <button type="button" class="btn btn-danger waves-effect" onclick="hideDiagnosisForm()" style="width:100px">CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="diagnosis-button" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;padding-left:30px;padding-right:30px;">
                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showDiagnosisForm()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW DIAGNOSIS</b></button>
            </div>
            <div class="" id="diagnosis-table" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;">
                <table class="table table-bordered" id="diagnosis-masterlist-table">
                    <thead>
                        <tr>                                       
                            <th id="table-head-action2sl">Action</th>
                            <th id="table-head-desc">DOH&nbsp;&nbsp;&nbsp;Category&nbsp;&nbsp;&nbsp;Grouping</th>
                            <th id="table-head-action2">ICD</th>
                            <th id="table-head-desc">Diagnosis</th>
                            <th id="table-head-namediag">Ref.No</th>
                            <th id="table-head-namediag">ICD&nbsp;&nbsp;&nbsp;Categ.</th>
                            <th id="table-head-name">Updated</th>
                            <th id="table-head-desc">DOH&nbsp;&nbsp;&nbsp;Refno.</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>                            
            </div>
            <div class="modal-footer" id="diagnosis-footer" style="margin-bottom:20px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideDiagnosisManagementModalForAdmission()">CLOSE</button>
                <button type="button" id='savebutton' class="btn btn-info waves-effect" onclick="selectDiagnosisForAdmitPatient()">SELECT</button>
            </div>
        </div>
    </div>
</div>