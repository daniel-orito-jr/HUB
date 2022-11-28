<div class="modal fade" id="diagnosticmanagementmodal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header" style="margin-bottom:0px;margin-top:5px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;margin-left:0px;margin-right:0px;">
                <h4 class="title" id="defaultModalLabel">Diagnosis Management</h4>
            </div>
            <div class="modal-body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;margin-left:0px;margin-right:0px;"> 
                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;">
                    <div class="col-lg-5 col-md-6 col-sm-12 col-xs-12">
                        <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                            <div class="header">
                                <h2 class="float-right">
                                    <strong id="textid_pateintcase"></strong>
                                    <small id="textid_pateintadmn"></small>
                                    <small id="textid_pateintdisc"></small>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-6 col-sm-12 col-xs-12">
                        <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                            <div class="header">
                                <h2 class="float-right">
                                    <strong id="textid_pateintname"></strong> 
                                    <small id="textid_pateintroom"></small>
                                    <small id="textid_pateintphic"></small>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row clearfix d-none">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <input type="hidden" id="hiddid_patientno">
                    </div>
                </div>
                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                        <ul class="nav nav-tabs nav-justified" role="tablist" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#Guidelines" id="guidelinenavitems" onclick=""> Guidelines </a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#Indication" id="indicationnavitems" onclick=""> Indication </a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#Surgical" id="surgicalnavitems" onclick=""> Surgical </a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#Diagnosis" id="diagnosisnavitems" onclick=""> Diagnosis </a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#Procedure" id="procedurenavitems" onclick=""> Procedure </a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#Source" id="sourcenavitems" onclick=""> Source </a></li>
                        </ul>
                        <div class="tab-content" id="tabcontentdiv" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;padding-left:12px;padding-right:12px;">
                            <div role="tabpanel" class="tab-pane in active" id="Guidelines" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
<!--                                <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-top:10px;margin-bottom:0px;">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                            General Admission Data
                                        </div>
                                    </div>
                                </div>-->
                                <div class="row clearfix" style="margin-top:19px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;">
                                        <div class="well"> 
                                            <b style="color:red">Reason of Admission</b>
                                            <p style="padding-bottom:0px;margin-bottom:0px;font-weight:bold">Chief Complain/s</p>
                                            <textarea name="textareaname_reasonadmmgh" id="textareaid_reasonadmmgh" class="form-control m-b-20" rows="6" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                            <p id="textareaid_reasonadmmgherr" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="well"> 
                                            <b style="color:red">Diagnosis During Admission</b>
                                            <p style="padding-bottom:0px;margin-bottom:0px;font-weight:bold">Admission Diagnosis</p>
                                            <textarea name="textareaname_reasonadmmgh" id="textareaid_diagnoadmmgh" class="form-control m-b-20" rows="6" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                            <p id="textareaid_diagnoadmmgherr" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div role="tabpanel" class="tab-pane" id="Indication" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;margin-top:10px;padding-top:0px;">
                                    <div class="col-lg-5 col-md-5 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
<!--                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                    Patient Classification
                                                </div>
                                            </div>
                                        </div>-->
                                        <div class="row clearfix" style="padding-top:7px;padding-bottom:7px;margin-left:2px;margin-right:2px;margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;&nbsp;Classification</b>
                                                <select name="selectname_pxclassmgh" id="selectid_pxclassmgh" class="show-tick form-control selectpicker" data-live-search="false" onchange="onChangePatientClassificationForMGHClearance()">
                                                    <optgroup>
                                                        <option value="Select">Select</option>
                                                        <option value="GYNECOLOGY">GYNECOLOGY</option>
                                                        <option value="MEDICAL">MEDICAL</option>
                                                        <option value="NEW BORN">NEW BORN</option>
                                                        <option value="OBSTETRICS">OBSTETRICS</option>
                                                        <option value="OTHERS">OTHERS</option>
                                                        <option value="PEDIA 1 - INSIDE">PEDIA 1 - INSIDE</option>
                                                        <option value="PEDIA 1 - NURSERY">PEDIA 1 - NURSERY</option>
                                                        <option value="PEDIA FROM INSIDE">PEDIA FROM INSIDE</option>
                                                        <option value="PEDIA FROM OUTSIDE">PEDIA FROM OUTSIDE</option>
                                                        <option value="STILL BIRTH">STILL BIRTH</option>
                                                        <option value="SURGICAL">SURGICAL</option>
                                                    </optgroup>
                                                </select>
                                                <p id="selectid_pxclassmgherror" class="d-none" style="color:red;padding-left:15px"></p>
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;&nbsp;Adult/Pedia</b>
                                                <select name="selectname_adultpediamgh" id="selectid_adultpediamgh" class="show-tick form-control selectpicker" data-live-search="false" disabled="true">
                                                    <optgroup>
                                                        <option value="Select">Select</option>
                                                        <option class="option-class" value="ADULT">ADULT</option>
                                                        <option class="option-class" value="PEDIA">PEDIA</option>    
                                                    </optgroup>
                                                </select>
                                                <p id="selectid_adultpediamgherror" class="d-none" style="color:red;padding-left:15px"></p>
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;&nbsp;OB/Gyne Procedure</b>
                                                <select name="selectname_obgyneproceduremgh" id="selectid_obgyneproceduremgh" class="show-tick form-control selectpicker" data-live-search="false" disabled="true">
                                                    <optgroup>
                                                        <option value="Select">Select</option>
                                                        <option class="option-class" value="NORMAL">NORMAL</option>
                                                        <option class="option-class" value="CEASAREAN">CEASAREAN</option>   
                                                        <option class="option-class" value="OTHERS">OTHERS</option>  
                                                    </optgroup>
                                                </select>
                                                <p id="selectid_obgyneproceduremgherror" class="d-none" style="color:red;padding-left:15px"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-7 col-md-7 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
<!--                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                    Ceasarian Cases
                                                </div>
                                            </div>
                                        </div>-->
                                        <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:2px;">
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                    <button class="btn btn-info btn-icon btn-icon-mini" onclick="validatePatientClassificationSelection()">
                                                        <i class="zmdi zmdi-plus"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-icon btn-icon-mini" onclick="selectCaesarianIndicationDiagnosisForMGHClearanceFormPage()">
                                                        <i class="zmdi zmdi-minus"></i>
                                                    </button>
                                                </p>
                                            </div>
                                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <b style="color:red;text-align:right" class="float-right">Indication Diagnosis</b>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="well" style="background-color:#EBEDED;border-radius:5px;">
                                                    <div class="table-responsive">
                                                        <table class="table table-bordered table-striped table-hover" id="ceasarian-case-indication-diagnosis-table">
                                                            <thead>
                                                                <tr>    
                                                                    <th id="table-head-nocaesarian">No.</th>
                                                                    <th id="table-head-namecauses">Categorized&nbsp;&nbsp;Diagnosis</th>
                                                                    <th id="table-head-action">Code</th>
                                                                    <th id="table-head-action">TextboxID</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table> 
                                                    </div>
                                                </div>
                                            </div>
                                            <p id="" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div role="tabpanel" class="tab-pane" id="Surgical" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
<!--                                        <div class="row clearfix" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                    Surgical Procedure
                                                </div>
                                            </div>
                                        </div>-->
                                        <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:13px;">
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                    <button class="btn btn-info btn-icon btn-icon-mini" onclick="showSurgicalOutputModalForMGHClearance()">
                                                        <i class="zmdi zmdi-plus"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-icon btn-icon-mini" onclick="deleteSelectedSurgicalOutputFromTextarea()">
                                                        <i class="zmdi zmdi-minus"></i>
                                                    </button>
                                                </p>
                                            </div>
                                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <div class="row clearfix" style="margin-top:10px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b style="text-align:right" class="float-right">Surgical Procedure</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <textarea name="textareaname_surgprocedremgh" id="textareaid_surgprocedremgh" class="form-control m-b-20" rows="6" style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px" readonly=""></textarea>
                                            </div>
                                            <p id="" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
<!--                                        <div class="row clearfix" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                    Surgical Sterilization
                                                </div>
                                            </div>
                                        </div>-->
                                        <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:13px;">
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                    <button class="btn btn-info btn-icon btn-icon-mini" onclick="showSurgicalSterilizationModalForMGHClearance()">
                                                        <i class="zmdi zmdi-plus"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-icon btn-icon-mini" onclick="deleteSelectedSterilizationDataFromTextarea()">
                                                        <i class="zmdi zmdi-minus"></i>
                                                    </button>
                                                </p>
                                            </div>
                                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b style="text-align:right" class="float-right">Sterilization/Anesthesia</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <textarea name="textareaname_sterilizationmgh" id="textareaid_sterilizationmgh" class="form-control m-b-20" rows="6" style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px" readonly=""></textarea>
                                            </div>
                                            <p id="" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div role="tabpanel" class="tab-pane" id="Diagnosis" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                <div class="row clearfix">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
<!--                                        <div class="row clearfix" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                    Confinement
                                                </div>
                                            </div>
                                        </div>-->
                                        <div class="row clearfix" style="margin-top:0px;">
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:10px;">
                                                <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                    <button class="btn btn-info btn-icon btn-icon-mini" onclick="showDiagnosisManagementModalForAdmissionInsert()">
                                                        <i class="zmdi zmdi-plus"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-icon btn-icon-mini" onclick="selectCausesOfConfinementForMGHClearanceFormPage()">
                                                        <i class="zmdi zmdi-minus"></i>
                                                    </button>
                                                </p>
                                            </div>
                                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b style="color:red;text-align:right" class="float-right">Causes of Confinement</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix" style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-bottom:0px">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="well" style="margin-top:5px;background-color:#EBEDED;border-radius:5px;">
                                                    <div class="table-responsive">
                                                        <table class="table table-bordered table-striped table-hover" id="causesof-confinement-table">
                                                            <thead>
                                                                <tr>                                       
                                                                    <th id="table-head-namecauses">Categorized&nbsp;&nbsp;Diagnosis</th>
                                                                    <th id="table-head-action">ICD</th>
                                                                    <th id="table-head-name">Grouping</th>
                                                                    <th id="table-head-name">Ref.No.</th>
                                                                    <th id="table-head-name">Causes&nbsp;&nbsp;Code</th>
                                                                    <th id="table-head-name">Textbox&nbsp;&nbsp;ID</th>
                                                                    <th id="table-head-action">Counter</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table> 
                                                    </div>
                                                </div>
                                            </div>
                                            <p id="" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
<!--                                        <div class="row clearfix" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                    Final Diagnosis
                                                </div>
                                            </div>
                                        </div>-->
                                        <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:7px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="row clearfix" style="margin-top:5px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>&nbsp;&nbsp;Final/Discharge Diagnosis/es</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix" style="margin-top:5px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <textarea name="textareaname_admitdiagnosadm" id="textareaid_finaldischadiagnosismgh" class="form-control m-b-20" rows="7" style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                            </div>
                                            <p id="textareaid_finaldischadiagnosismgherr" style="color:red;padding-left:15px" class="d-none"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div role="tabpanel" class="tab-pane" id="Procedure" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                <div class="row clearfix" style="margin-top:0px;">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
<!--                                        <div class="row clearfix" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                    Final Diagnosis (Statistics Use)
                                                </div>
                                            </div>
                                        </div>-->
                                        <div class="row clearfix" style="margin-top:0px;">
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;" class="float-left">
                                                    <button class="btn btn-info btn-icon btn-icon-mini" onclick="showFinalDiagnosisModalForMGHClearance()">
                                                        <i class="zmdi zmdi-plus"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-icon btn-icon-mini" onclick="deleteSelectedCategFinalDiagnosisDataFromTextarea()">
                                                        <i class="zmdi zmdi-minus"></i>
                                                    </button>
                                                </p>
                                            </div>
                                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b style="text-align:left" class="float-right">Categorized Diagnosis</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="well" style="margin-top:0px;background-color:#EBEDED;border-radius:5px;">
                                                    <div class="table-responsive">
                                                        <table class="table table-bordered table-striped table-hover" id="categorized-final-diagnosis-table">
                                                            <thead>
                                                                <tr>                                       
                                                                    <th id="table-head-namecauses">Categorized&nbsp;&nbsp;Diagnosis</th>
                                                                    <th id="table-head-action">ICD</th>
                                                                    <th id="table-head-name">Grouping</th>
                                                                    <th id="table-head-name">Ref.No.</th>
                                                                    <th id="table-head-name">Causes&nbsp;&nbsp;Code</th>
                                                                    <th id="table-head-name">Textbox&nbsp;&nbsp;ID</th>
                                                                    <th id="table-head-action">Counter</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table> 
                                                    </div>
                                                </div>
                                            </div>
                                            <p id="" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
<!--                                        <div class="row clearfix" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                    Discharge Cases (For PHIC Claims)
                                                </div>
                                            </div>
                                        </div>-->
                                        <div class="row clearfix" style="margin-top:0px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b style="text-align:right" class="float-right">Discharge Medical & Procedure Cases</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="well" style="margin-top:10px;background-color:#EBEDED;border-radius:5px;">
                                                    <div class="table-responsive">
                                                        <table class="table table-bordered table-striped table-hover" id="discharge-medical-procedure-cases-table">
                                                            <thead>
                                                                <tr>                                       
                                                                    <th id="table-head-actionmgh">No.</th>
                                                                    <th id="table-head-action">I.C.D.</th>
                                                                    <th id="table-head-descmgh">Diagnosis</th>
                                                                    <th id="table-head-action">R.V.S.</th>
                                                                    <th id="table-head-descmgh">Procedure</th>
                                                                    <th id="table-head-name">Date&nbsp;&nbsp;Process</th>
                                                                    <th id="table-head-action">Left</th>
                                                                    <th id="table-head-action">Right</th>
                                                                    <th id="table-head-action">Both</th>
                                                                    <th id="table-head-name">Updated</th>
                                                                    <th id="table-head-action">Case&nbsp;&nbsp;No.</th>
                                                                    <th id="table-head-name">No.</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table> 
                                                    </div>
                                                </div>
                                            </div>
                                            <p id="" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div role="tabpanel" class="tab-pane" id="Source" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div role="tabpanel" class="tab-pane" id="personalinfo">
                                            <div data-toggle="true" class="panel-group" id="accordion">
                                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseProfileCollapseDiv()" id="prof">
                                                            Device Related
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseContactCollapseDiv()" id="cont">
                                                            Non-Device Related <b id="contacterrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseLocationCollapseDiv()" id="loca">
                                                            Patient Status <b id="locationerrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                
                                                <div id="profileCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                            <div class="typography-line" style="padding-left:20px;padding-right:20px;padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;margin-left:20px;margin-right:20px;">
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:23px;">
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="checkbox" style="padding-top:0px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                            <input name="chckboxname_vapmgh" id="chckboxid_vapmgh" type="checkbox" onchange="onChangeVAPCheckBox()">
                                                                            <label for="chckboxid_vapmgh" style="font-size:10px;margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                                Ventilator Acquired Pneumonia (VAP)
                                                                            </label>
                                                                        </div>   
                                                                        <input type="hidden" id="hidtextboxid_vapmgh" value="0">
                                                                    </div>
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                <div style="width:70%;float:left;text-align:right">
                                                                                    <label style="margin-right:15px;margin-top:0px;font-size:10px;">Ventilator Days</label>
                                                                                </div>
                                                                                <div style="width:30%;float:right;text-align:left">
                                                                                    <input type="number" id="numboxid_vapmgh" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-right" disabled="true" placeholder="0">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <hr style="padding-bottom:3px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    </div>
                                                                </div>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="checkbox" style="padding-top:0px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                            <input name="chckboxname_bsimgh" id="chckboxid_bsimgh" type="checkbox" onchange="onChangeBSICheckBox()">
                                                                            <label for="chckboxid_bsimgh" style="font-size:10px;">
                                                                                Blood Stream Infection (BSI)
                                                                            </label>
                                                                        </div>   
                                                                        <input type="hidden" id="hidtextboxid_bsimgh" value="0">
                                                                    </div>
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="row clearfix">
                                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                <div style="width:70%;float:left;text-align:right">
                                                                                    <label style="margin-right:15px;margin-top:0px;font-size:10px;">No. of Central Line</label>
                                                                                </div>
                                                                                <div style="width:30%;float:right;text-align:left">
                                                                                    <input type="number" id="numboxid_bsimgh" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-right" disabled="true" placeholder="0">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <hr style="padding-bottom:3px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    </div>
                                                                </div>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="checkbox" style="padding-top:0px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                            <input name="chckboxname_utimgh" id="chckboxid_utimgh" type="checkbox" onchange="onChangeUTICheckBox()">
                                                                            <label for="chckboxid_utimgh" style="font-size:10px;">
                                                                                Urinary Tract Infection (UTI)
                                                                            </label>
                                                                        </div>   
                                                                        <input type="hidden" id="hidtextboxid_utimgh" value="0">
                                                                    </div>
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="row clearfix">
                                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                <div style="width:70%;float:left;text-align:right">
                                                                                    <label style="margin-right:15px;margin-top:0px;font-size:10px;">Catheter Days</label>
                                                                                </div>
                                                                                <div style="width:30%;float:right;text-align:left">
                                                                                    <input type="number" id="numboxid_utimgh" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-right" disabled="true" placeholder="0">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <hr style="padding-bottom:3px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    </div>
                                                                </div>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div style="width:30%;float:left;text-align:left">
                                                                            <div class="checkbox" style="padding-top:0px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                <input name="chckboxname_oth1mgh" id="chckboxid_oth1mgh" type="checkbox" onchange="onChangeOTH1CheckBox()">
                                                                                <label for="chckboxid_oth1mgh" style="font-size:10px;">
                                                                                    Others
                                                                                </label>
                                                                            </div>  
                                                                        </div>
                                                                        <div style="width:70%;float:right;text-align:left">
                                                                            <input type="text" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-left" placeholder="NONE" id="textboxid_oth1mgh" disabled="true">
                                                                        </div>
                                                                        <input type="hidden" id="hidtextboxid_oth1mgh" value="0">
                                                                    </div>
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="row clearfix">
                                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                <div style="width:70%;float:left;text-align:right">
                                                                                    <label style="margin-right:15px;margin-top:0px;font-size:10px;">Number of Days</label>
                                                                                </div>
                                                                                <div style="width:30%;float:right;text-align:left">
                                                                                    <input type="number" id="numboxid_oth1mgh" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-right" disabled="true" placeholder="0">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                
                                                
                                                
                                                <div id="contactCollapse" class="panel-collapse collapse in">
                                                    <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:69px;margin-top:0px">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                            <div class="typography-line" style="padding-left:20px;padding-right:20px;padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;margin-left:20px;margin-right:20px;">
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:23px;">
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="checkbox" style="padding-top:7px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                            <input name="chckboxname_ssimgh" id="chckboxid_ssimgh" type="checkbox" onchange="onChangeSSICheckBox()">
                                                                            <label for="chckboxid_ssimgh" style="font-size:10px;">
                                                                                Surgical Site Infection (SSI)
                                                                            </label>
                                                                        </div>   
                                                                        <input type="hidden" id="hidtextboxid_ssimgh" value="0">
                                                                    </div>
                                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="row clearfix">
                                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                <div style="width:70%;float:left;text-align:right">
                                                                                    <label style="margin-right:15px;margin-top:10px;font-size:10px;">No. of Clean Procedures</label>
                                                                                </div>
                                                                                <div style="width:30%;float:right;text-align:left">
                                                                                    <input type="number" id="numboxid_ssimgh" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-right" disabled="true" placeholder="0">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <hr style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    </div>
                                                                </div>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:10px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div style="width:30%;float:left;text-align:left">
                                                                            <div class="checkbox" style="padding-top:7px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                <input name="chckboxname_oth2mgh" id="chckboxid_oth2mgh" type="checkbox" onchange="onChangeOTH2CheckBox()">
                                                                                <label for="chckboxid_oth2mgh" style="font-size:10px;">
                                                                                    Others
                                                                                </label>
                                                                            </div>  
                                                                        </div>
                                                                        <div style="width:70%;float:right;text-align:left">
                                                                            <input type="text" id="textboxid_oth2mgh" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-left" disabled="true" placeholder="NONE">
                                                                        </div>
                                                                        <input type="hidden" id="hidtextboxid_oth2mgh" value="0">
                                                                    </div>
                                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                        <div class="row clearfix">
                                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                <div style="width:70%;float:left;text-align:right">
                                                                                    <label style="margin-right:15px;margin-top:10px;font-size:10px;">Number of Days</label>
                                                                                </div>
                                                                                <div style="width:30%;float:right;text-align:left">
                                                                                    <input type="number" id="numboxid_oth2mgh" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-right" disabled="true" placeholder="0">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                
                                                
                                                
                                                
                                                <div id="locationCollapse" class="panel-collapse collapse in">
                                                    <div class="row clearfix" style="padding-left:30px;padding-right:30px;">
                                                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                            <div class="row clearfix" style="margin-top:10px;padding-top:0px;">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <b>Px Status Disposition</b>
                                                                    <select id="selectid_pxstatmgh" class="show-tick form-control selectpicker" data-live-search="false" onchange="onchangePatientStatSelectMGHClearance()">
                                                                        <option value="Select">Select From List</option>
                                                                        <option value="Improved">Improved</option>
                                                                        <option value="Recovered">Recovered</option>
                                                                        <option value="HAMA/DAMA">HAMA/DAMA</option>
                                                                        <option value="Absconded">Absconded</option>
                                                                        <option value="Expired">Expired</option>
                                                                        <option value="Transferred/Referred">Transferred/Referred</option>
                                                                    </select>
                                                                    <p id="selectid_pxstatmgherr" style="color:red;padding-left:15px" class="d-none"></p>
                                                                </div>
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;">
                                                                    <div class="checkbox" style="margin-top:30px;margin-bottom:36px;">
                                                                        <input name="chckboxname_emdepmgh" id="chckboxid_emdepmgh" type="checkbox" onchange="onChangeEmergencyCaseCheckBox()">
                                                                        <label for="chckboxid_emdepmgh">
                                                                            <b style="font-size:12px;">From Emergency Dept.</b><br> 
                                                                            <small style="font-size:11px;">(Emergency Case Admission)</small>
                                                                        </label>
                                                                    </div>  
                                                                    <input type="hidden" id="hidtextboxid_emdepmgh" value="0">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12" style="">
                                                            <div class="row clearfix d-none" id="expireddivmgh" style="padding-top:0px;padding-bottom:0px;">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <b>If Expired (Death)</b>
                                                                </div>
                                                                <div class="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                                                    <div class="row clearfix">
                                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:5px;">
                                                                            <input type="text" id="inputid_expireddatemgh" class="form-control datetimepicker" value="" autocomplete="off">
                                                                        </div>
                                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <input type="text" id="inputid_expiredtimemgh" class="form-control datetimepicker" value="" autocomplete="off">
                                                                        </div>
                                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-top:0px;">
                                                                            <b>Type of Death</b>
                                                                            <select id="selectid_typeofdeathmgh" class="show-tick form-control selectpicker" data-live-search="false" onchange>
                                                                                <option value="Select">Select From List</option>
                                                                                <option value="ROOM/ADMISSION DEATH">Room/Admission Death</option>
                                                                                <option value="EMERGENCY ROOM DEATH">Emergency Room Death</option>
                                                                                <option value="DEAD ON ARRIVAL (DOA)">Dead On Arrival (DOA)</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                                                                    <div class="row clearfix">
                                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <div class="radio">
                                                                                <input type="radio" name="radioname_admissiontypeadm" id="radioid_lessthan" checked="" onchange="onChangeLessThanRadio()"><label style="font-size:13px" for="radioid_lessthan">Less Than 48 Hours</label>
                                                                                <input type="radio" name="radioname_admissiontypeadm" id="radioid_morethan" onchange="onChangeMoreThanRadio()"><label style="font-size:13px" for="radioid_morethan">More Than/Equals to 48hrs</label>
                                                                            </div>
                                                                            <input type="hidden" id="ifexpireddeathtime48hrs" value="< 48HRS">
                                                                        </div>
                                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <div class="checkbox" style="margin-top:0px;">
                                                                                <input name="chckboxname_obgynmgh" id="chckboxid_obgynmgh" type="checkbox" onchange="onChangeOBGynCheckbox()">
                                                                                <label for="chckboxid_obgynmgh" style="padding-top:0px;">
                                                                                    <b style="font-size:13px;">OB/Gyn (Maternal Cases)</b>
                                                                                </label>
                                                                            </div> 
                                                                            <input type="hidden" value="0" id="hidtextbox_obgynmaternalmgh">
                                                                            <select id="selectid_obgynmaternalmgh" class="show-tick form-control selectpicker" data-live-search="false" onchange>
                                                                                <option value="Select">Select From List</option>
                                                                                <option value="Normal Death">Normal Death</option>
                                                                                <option value="Still Birth">Still Birth</option>
                                                                                <option value="Neonatal Death">Neonatal Death</option>
                                                                                <option value="Maternal Death">Maternal Death</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row clearfix d-none" id="transfereddivmgh" style="margin-bottom:0px;">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;">
                                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <b>Transferred to/Referred to (HCI)</b>
                                                                            <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                <div class="col-lg-9 col-md-9 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                    <input type="text" class="form-control" id="textboxid_transreftohcimgh">
                                                                                    <p id="textboxid_transreftohcimgherr" style="color:red;padding-left:15px" class="d-none"></p>
                                                                                </div>
                                                                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                    <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                        <button class="btn btn-info btn-icon btn-icon-mini" onclick="showHCIListingModalForMGHClearance()">
                                                                                            <i class="zmdi zmdi-more"></i>
                                                                                        </button>
                                                                                        <button class="btn btn-danger btn-icon btn-icon-mini" onclick="deleteSelectedHealthCareInstitutionDataFromTextbox()">
                                                                                            <i class="zmdi zmdi-delete"></i>
                                                                                        </button>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row clearfix" style="margin-top:0px;">
                                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <b>Reason of Referral/Transfer</b>
                                                                            <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                <div class="col-lg-9 col-md-9 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                    <textarea name="textareaname_admitdiagnosadm" id="textareaid_reasonrefermgh" class="form-control m-b-20" rows="2" style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                                                    <p id="textareaid_reasonrefermgherr" style="color:red;padding-left:15px" class="d-none"></p>
                                                                                </div>
                                                                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                    <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                                        <button class="btn btn-info btn-icon btn-icon-mini" onclick="showReasonsOfReferralListingModalForMGHClearance()">
                                                                                            <i class="zmdi zmdi-more"></i>
                                                                                        </button>
                                                                                        <button class="btn btn-danger btn-icon btn-icon-mini" onclick="deleteSelectedCommonReferralReasonDataFromTextbox()">
                                                                                            <i class="zmdi zmdi-delete"></i>
                                                                                        </button>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
<!--                                                            <div class="row clearfix" id="pxstatothersdivmgh" style="padding-top:176px;">
                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                                                                </div>
                                                            </div>-->
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                
                                                
                                                
                                                
                                                
                                            </div>
                                        </div>
                                
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="row clearfix" style="margin-top:7px;">
                    <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12">
                        
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                        <button type="button" class="btn btn-danger waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick="hidePatientDiagnosisModal()">CLOSE</button>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                        <button type="button" class="btn btn-warning waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" id="updatePatientStatusCreditLineButton" onclick="">UPDATE</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="margin-bottom:17px;margin-top:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;margin-left:0px;margin-right:0px;">
                
            </div>
        </div>
    </div>
</div>