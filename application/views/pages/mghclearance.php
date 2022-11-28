<section class="content">
    <div class="block-header" id="patientaccountnodivid">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>MGH Clearance
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Dashboard'); ?>"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item active">MGH Clearance</li>
                </ul>
            </div>
        </div>
    </div>    
    <div class="container-fluid">   
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header" style="margin-bottom:0px;padding-bottom:0px;">
                        <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                <h2><strong>Patient</strong> Account Clearance<small></small> </h2>
                                <br>
                                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;">
                                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <b>Patient Account No.</b>
                                        <div class="form-group" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                            <input type="text" id="inputid_accountnomgh" class="form-control" placeholder="" autocomplete="off" readonly="">
                                            <p id="patientacctnomgherror" class="d-none" style="color:red;padding-left:10px;padding-bottom:0px;padding-top:0px;"></p>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <button type="button" id="revokepatientbutton" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning btn-round waves-effect d-none" onclick='revokePatientOnClick()'><i class="zmdi zmdi-replay"></i><b>&nbsp;&nbsp;REVOKE CLEARANCE</b></button>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <button type="button" id="selectpatientbutton" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary btn-round waves-effect" onclick='showInpatientMasterlistForMGHClearance()'><i class="zmdi zmdi-search"></i><b>&nbsp;&nbsp;SELECT INPATIENT</b></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="body"> 
                        <div class="row clearfix" style="">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        <div class="row clearfix" id="diagnosisscrolldivid">
                            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                <div class="row clearfix" style="">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <p><strong>Patient Name:</strong>&nbsp;&nbsp;<u id="inputid_patientnamemgh"></u></p>
                                    </div>
                                </div>
                                <div class="row clearfix" style="">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <p><strong>Room:</strong>&nbsp;&nbsp;<u id="inputid_roomnamemgh"> </u></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <p><strong>Admission:</strong>&nbsp;&nbsp;<u id="inputid_admissionmgh"></u></p>

                                    </div>
                                </div>
                                <div class="row clearfix" style="">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <p><strong>PHIC:</strong>&nbsp;&nbsp;<u id="inputid_phicmgh"></u></p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <p><strong>Discharged:</strong>&nbsp;&nbsp;<u id="inputid_dischargedmgh"></u></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <b>Mobile No.</b>
                                        <div class="form-group">
                                            <input type="text" id="inputid_mobilenomgh" class="form-control" data-mask="99-999-999999" data-mask-selectonfocus="true" autocomplete="off" >
                                            <p id="patientacctnomgherror" hidden="true" style="color:red;">Please input information on the field!</p>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        <div class="row clearfix" id="admissionscrollvalidationdivid">
                            <div class="col-lg-9 col-md-9 col-sm-6 col-xs-12" onclick="onClickShowNotification()">
                                <ul class="nav nav-tabs nav-justified" role="tablist">
                                    <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#Admission" id="AdmissionLinkNavItem" onclick="onclickAdmissionTab()"> Admission </a></li>
                                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#Procedure" id="ProcedureLinkNavItem" onclick="onclickProcedureTab()"> Procedure </a></li>
                                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#Diagnosis" id="DiagnosisLinkNavItem" onclick="onclickDiagnosisTab()"> Diagnosis </a></li>
                                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#Disposition" id="DispositionLinkNavItem" onclick="onclickDispositionTab()"> Disposition </a></li>
                                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#Account" id="AccountLinkNavItem" onclick="onclickAccountTab()"> Account </a></li>
                                </ul>
                                <div class="tab-content" id="tabcontentdiv">
                                    <div role="tabpanel" class="tab-pane in active" id="Admission">
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <button type="button" class="btn btn-info btn-round waves-effect float-right" onclick="showGeneralGuidelinesOfAdmissionTabMGHClearance()"><b>WHAT TO DO?</b></button>
                                            </div>
                                        </div>
                                        <div class="row clearfix" id="admissiontabmainview">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="row clearfix">
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="well"> 
                                                            <b style="color:red">Reason of Admission</b>
                                                            <p style="padding-bottom:0px;margin-bottom:0px;font-weight:bold">Chief Complain/s</p>
                                                            <textarea name="textareaname_reasonadmmgh" id="textareaid_reasonadmmgh" class="form-control m-b-20" rows="7" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                            <p id="textareaid_reasonadmmgherr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="well"> 
                                                            <b style="color:red">Diagnosis during Admission</b>
                                                            <p style="padding-bottom:0px;margin-bottom:0px;font-weight:bold">Admission Diagnosis</p>
                                                            <textarea name="textareaname_diagnoadmmgh" id="textareaid_diagnoadmmgh" class="form-control m-b-20" rows="7" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                            <p id="textareaid_diagnoadmmgherr" style="color:red;padding-left:15px" class="d-none"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <hr>
                                                    </div>
                                                </div>
                                                <div class="row clearfix">
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="row clearfix">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                                    Patient Classification
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row clearfix">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <br>
                                                            </div>
                                                        </div>
                                                        <div class="row clearfix" style="background-color:#EBEDED;border-radius:5px;padding-top:20px;padding-bottom:20px;margin-left:2px;margin-right:2px;">
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
                                                                <br><br><br><br>
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
                                                                <br>
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
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="row clearfix">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                                    Ceasarian Cases
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row clearfix" style="margin-top:10px;">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <b style="color:red;text-align:right" class="float-right">Ceasarian Case Indication Diagnosis</b>
                                                            </div>
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <small style="padding-bottom:0px;margin-bottom:0px;font-weight:bold;" class="float-right">PHIC Mandatory Monthly Hosp. Report</small>
                                                            </div>
                                                        </div>
                                                        <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                <p style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <button class="btn btn-info btn-icon btn-icon-mini" onclick="validatePatientClassificationSelection()">
                                                                        <i class="zmdi zmdi-plus"></i>
                                                                    </button>
                                                                    <button class="btn btn-danger btn-icon btn-icon-mini" onclick="selectCaesarianIndicationDiagnosisForMGHClearanceFormPage()">
                                                                        <i class="zmdi zmdi-minus"></i>
                                                                    </button>
                                                                </p>
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
                                        </div>
                                        <div class="row clearfix d-none" id="admissiontabguideview" style="margin-top:20px;">
                                            <div class="col-lg-7 col-md-9 col-sm-12 col-xs-12">
                                                <div class="card visitors-map shadow-effect" style="background:#C9F7F3;border:1px solid #DEE0E0;text-align:justify;color:#525C5C;border-radius:5px;padding-left:0px;padding-right:0px;padding-bottom:10px;padding-top:0px;margin-bottom:10px;">
                                                    <div class="header">
                                                        <p style="font-size:20px"><strong>General Guidelines</strong> <small></small></p>
                                                        <ul class="header-dropdown">
                                                            <li class="remove">
                                                                <a role="button" class="" onclick="hideGeneralGuidelinesOfAdmissionTabMGHClearance()"><i class="zmdi zmdi-close"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                        <div class="row" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="col-lg-12 col-md-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                <label style="text-align:left">Before Clearing the Patient for Discharge,</label><br><br>
                                                                <ul style="padding-left:25px;text-align:left">
                                                                    <li>Return all possible unconsumed medicines/items.</li><br>
                                                                    <li>For HAMA patient, prepare necesary documents and must be signed already.</li><br>
                                                                    <li>For Patient due to transfer, have also your necesary supporting documents done.</li><br>
                                                                    <li>Have all diagnosis here into categorized filled-up correctly if possible.</li><br>
                                                                    <li>Take Home Instruction for patient must be prepared at once.</li><br>
                                                                    <li>Make sure the Hospital Patient Discharge Procedure are observed.</li><br>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-3 col-sm-12 col-xs-12">

                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="Procedure">
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
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
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <small style="padding-bottom:0px;margin-bottom:0px;font-weight:bold;" class="float-right">PHIC Mandatory Monthly Hospital Report</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row clearfix">
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
                                        </div>
                                        <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
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
                                                                <b style="color:red;text-align:right" class="float-right">Surgical Procedure</b>
                                                            </div>
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <small style="padding-bottom:0px;margin-bottom:0px;font-weight:bold;" class="float-right">PHIC Mandatory Monthly Hospital Report</small>
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
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
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
                                                        <div class="row clearfix" style="margin-top:5px;">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                &nbsp;&nbsp;&nbsp;
                                                            </div>
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <b style="text-align:right" class="float-right">Surgical Sterilization/Anesthesia</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row clearfix" style="margin-top:5px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <textarea name="textareaname_sterilizationmgh" id="textareaid_sterilizationmgh" class="form-control m-b-20" rows="6" style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px" readonly=""></textarea>
                                                    </div>
                                                    <p id="" style="color:red;padding-left:15px"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="Diagnosis">
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
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
                                                        <textarea name="textareaname_admitdiagnosadm" id="textareaid_finaldischadiagnosismgh" class="form-control m-b-20" rows="5" style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                    </div>
                                                    <p id="textareaid_finaldischadiagnosismgherr" style="color:red;padding-left:15px" class="d-none"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix" style="margin-top:0px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                <div class="row clearfix" style="margin-top:10px;">
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
                                                        <div class="row clearfix" style="margin-top:30px;">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <b style="text-align:left" class="float-right">Categorized Final Diagnosis (Statistics Use)</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div class="well" style="margin-top:5px;background-color:#EBEDED;border-radius:5px;">
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
                                        </div>
                                        <div class="row clearfix" style="margin-top:0px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div class="row clearfix" style="margin-top:30px;">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <b style="text-align:right" class="float-right">Discharge Medical and Procedure Cases (For PHIC Claims)</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div class="well" style="margin-top:5px;background-color:#EBEDED;border-radius:5px;">
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
                                    <div role="tabpanel" class="tab-pane" id="Disposition">
                                        <div class="row" id="" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                <div class="typography-line shadow-effect" style="background:#FCFBDC;border:1px solid #DEE0E0;border-radius:5px;padding-left:20px;padding-right:20px;padding-bottom:10px;padding-top:10px;margin-bottom:10px;">
                                                    <p style="font-size:14px;font-weight:bolder">
                                                        HEALTHCARE ASSOCIATED INFECTION
                                                    </p>
                                                    <u style="font-size:13px">
                                                        <b>Device Related Infection</b>
                                                    </u>
                                                    <div class="row clearfix" style="padding-bottom:0px;padding-top:10px;margin-bottom:10px;margin-top:0px;">
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="checkbox" style="padding-top:7px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                <input name="chckboxname_vapmgh" id="chckboxid_vapmgh" type="checkbox" onchange="onChangeVAPCheckBox()">
                                                                <label for="chckboxid_vapmgh">
                                                                    Ventilator Acquired Pneumonia (VAP)
                                                                </label>
                                                            </div>   
                                                            <input type="hidden" id="hidtextboxid_vapmgh" value="0">
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="row clearfix">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <div style="width:70%;float:left;text-align:right">
                                                                        <label style="margin-right:15px;margin-top:10px;">Ventilator Days</label>
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
                                                            <hr style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix" style="padding-bottom:0px;padding-top:10px;margin-bottom:10px;margin-top:0px;">
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="checkbox" style="padding-top:7px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                <input name="chckboxname_bsimgh" id="chckboxid_bsimgh" type="checkbox" onchange="onChangeBSICheckBox()">
                                                                <label for="chckboxid_bsimgh">
                                                                    Blood Stream Infection (BSI)
                                                                </label>
                                                            </div>   
                                                            <input type="hidden" id="hidtextboxid_bsimgh" value="0">
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="row clearfix">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <div style="width:70%;float:left;text-align:right">
                                                                        <label style="margin-right:15px;margin-top:10px;">No. of Central Line</label>
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
                                                            <hr style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix" style="padding-bottom:0px;padding-top:10px;margin-bottom:10px;margin-top:0px;">
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="checkbox" style="padding-top:7px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                <input name="chckboxname_utimgh" id="chckboxid_utimgh" type="checkbox" onchange="onChangeUTICheckBox()">
                                                                <label for="chckboxid_utimgh">
                                                                    Urinary Tract Infection (UTI)
                                                                </label>
                                                            </div>   
                                                            <input type="hidden" id="hidtextboxid_utimgh" value="0">
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="row clearfix">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <div style="width:70%;float:left;text-align:right">
                                                                        <label style="margin-right:15px;margin-top:10px;">Catheter Days</label>
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
                                                            <hr style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix" style="padding-bottom:0px;padding-top:10px;margin-bottom:10px;margin-top:0px;">
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div style="width:30%;float:left;text-align:left">
                                                                <div class="checkbox" style="padding-top:7px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <input name="chckboxname_oth1mgh" id="chckboxid_oth1mgh" type="checkbox" onchange="onChangeOTH1CheckBox()">
                                                                    <label for="chckboxid_oth1mgh">
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
                                                                        <label style="margin-right:15px;margin-top:10px;">Number of Days</label>
                                                                    </div>
                                                                    <div style="width:30%;float:right;text-align:left">
                                                                        <input type="number" id="numboxid_oth1mgh" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-right" disabled="true" placeholder="0">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:20px;margin-top:0px;">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <hr style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                        </div>
                                                    </div>
                                                    <u style="font-size:13px">
                                                        <b>Non-Device Related Infection</b>
                                                    </u>
                                                    <div class="row clearfix" style="padding-bottom:0px;padding-top:10px;margin-bottom:10px;margin-top:0px;">
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="checkbox" style="padding-top:7px;" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                <input name="chckboxname_ssimgh" id="chckboxid_ssimgh" type="checkbox" onchange="onChangeSSICheckBox()">
                                                                <label for="chckboxid_ssimgh">
                                                                    Surgical Site Infection (SSI)
                                                                </label>
                                                            </div>   
                                                            <input type="hidden" id="hidtextboxid_ssimgh" value="0">
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="row clearfix">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <div style="width:70%;float:left;text-align:right">
                                                                        <label style="margin-right:15px;margin-top:10px;">No. of Clean Procedures</label>
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
                                                                    <label for="chckboxid_oth2mgh">
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
                                                                        <label style="margin-right:15px;margin-top:10px;">Number of Days</label>
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
                                        <div class="row clearfix" style="margin-top:0px;" id="patientstatdispodivid">
                                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>Patient Status Disposition</b>
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
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">
                                                        <div class="checkbox" style="margin-top:27px;">
                                                            <input name="chckboxname_emdepmgh" id="chckboxid_emdepmgh" type="checkbox" onchange="onChangeEmergencyCaseCheckBox()">
                                                            <label for="chckboxid_emdepmgh">
                                                                <b>From Emergency Deptmt.</b><br> 
                                                                <small>(Emergency Case Admission)</small>
                                                            </label>
                                                        </div>  
                                                        <input type="hidden" id="hidtextboxid_emdepmgh" value="0">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12" style="border-left:1px solid #E9EAE9;border-top:1px solid #E9EAE9;border-bottom:1px solid #E9EAE9">
                                                <div class="row clearfix d-none" id="expireddivmgh" style="padding-top:10px;padding-bottom:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>If Expired (Death)</b>
                                                    </div>
                                                    <div class="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                                        <div class="row clearfix">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:10px;">
                                                                <input type="text" id="inputid_expireddatemgh" class="form-control datetimepicker" value="" autocomplete="off">
                                                            </div>
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <input type="text" id="inputid_expiredtimemgh" class="form-control datetimepicker" value="" autocomplete="off">
                                                            </div>
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-top:10px;">
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
                                                                    <input type="radio" name="radioname_admissiontypeadm" id="radioid_lessthan" checked="" onchange="onChangeLessThanRadio()"><label for="radioid_lessthan">Less Than 48 Hours</label>
                                                                    <input type="radio" name="radioname_admissiontypeadm" id="radioid_morethan" onchange="onChangeMoreThanRadio()"><label for="radioid_morethan">More Than/Equals to 48hrs</label>
                                                                </div>
                                                                <input type="hidden" id="ifexpireddeathtime48hrs" value="< 48HRS">
                                                            </div>
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <div class="checkbox" style="margin-top:10px;">
                                                                    <input name="chckboxname_obgynmgh" id="chckboxid_obgynmgh" type="checkbox" onchange="onChangeOBGynCheckbox()">
                                                                    <label for="chckboxid_obgynmgh" style="padding-top:0px;">
                                                                        <b>OB/Gyn (Maternal Cases)</b>
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
                                                <div class="row clearfix d-none" id="transfereddivmgh" style="margin-bottom:11px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div class="row clearfix" style="padding-top:10px;padding-bottom:10px;">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <b>Transferred to/Referred to (HCI)</b>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-9 col-md-9 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:7px;margin-bottom:0px;margin-top:0px;">
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
                                                        <div class="row clearfix" style="margin-top:11px;">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <b>Reason of Referral/Transfer (PHIC Mandatory Monthly Report)</b>
                                                                <div class="row clearfix" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                                                                    <div class="col-lg-9 col-md-9 col-sm-6 col-xs-12" style="padding-bottom:0px;padding-top:7px;margin-bottom:0px;margin-top:0px;">
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
                                                <div class="row clearfix" id="pxstatothersdivmgh" style="padding-top:176px;">
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="Account">
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="row clearfix">
                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <b>&nbsp;&nbsp;Go to Request Number:</b><br>
                                                        <select id="selectid_gotoreqmgh" name="selectname_gotoreqmgh" class="show-tick form-control selectpicker" data-live-search="false" onchange="onchangeRequestNumberSelection($('#selectid_gotoreqmgh').val())">
                                                            <optgroup>
                                                                <option value="Select">Select from List</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <p class="shadow-effect" style="background:#DDD6FA;border:1px solid #DEE0E0;text-align:justify;border-radius:5px;padding-left:10px;padding-right:10px;padding-bottom:10px;padding-top:10px;margin-bottom:0px;">
                                                            If you have items being requested that does not seen on this patient account please coordinate with that respective department for verification.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <hr>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="panel-group full-body" id="accordion_13" role="tablist" aria-multiselectable="false">
                                                    <div class="panel">
                                                        <div class="panel-heading bg-purple" role="tab" id="headingOne_13">
                                                            <h4 class="panel-title">
                                                                <a role="button" data-toggle="collapse" href="#collapse_content_general" aria-expanded="true" aria-controls="collapse_content_general">
                                                                    <i class="zmdi zmdi-check-all"></i>&nbsp;&nbsp;&nbsp;General Patient Account
                                                                </a> 
                                                            </h4>
                                                        </div>
                                                        <div id="collapse_content_general" class="panel-collapse collapse in show" role="tabpanel" aria-labelledby="headingOne_13" data-parent="#accordion_13" style="background:#DDD6FA;border-left:3px solid #6572b8;border-right:3px solid #6572b8;border-bottom:3px solid #6572b8">
                                                            <div class="panel-body">
                                                                <div class="well" style="margin:0px;padding:0px;background-color:transparent;border-radius:5px;">
                                                                    <div class="table-responsive" style="margin:0px;padding:0px;">
                                                                        <table class="table table-bordered table-striped table-hover" id="patient-account-general-mgh-clearance-table">
                                                                            <thead>
                                                                                <tr>                                       
                                                                                    <th id="table-head-actionmgh">No.</th>
                                                                                    <th id="table-head-descmgh">Description</th>
                                                                                    <th id="table-head-action">Quantity</th>
                                                                                    <th id="table-head-action">Unit</th>
                                                                                    <th id="table-head-action">Request&nbsp;&nbsp;No.</th>
                                                                                    <th id="table-head-action">Request&nbsp;&nbsp;Date</th>
                                                                                    <th id="table-head-action">Hospital&nbsp;&nbsp;Code</th>
                                                                                    <th id="table-head-name">Request&nbsp;&nbsp;By</th>
                                                                                    <th id="table-head-action">Barcode</th>
                                                                                    <th id="table-head-action">Services</th>
                                                                                    <th id="table-head-name">Tans.Ref.</th>
                                                                                    <th id="table-head-action">Official&nbsp;&nbsp;Result</th>
                                                                                    <th id="table-head-action">Transaction&nbsp;&nbsp;Type</th>
                                                                                    <th id="table-head-name">Group&nbsp;&nbsp;Name</th>
                                                                                    <th id="table-head-action">Group&nbsp;&nbsp;Code</th>
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
                                            </div>
                                        </div>
                                    </div>
                                    <div class="" id="newdivadded"></div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="border-left:1px solid #E7E7E7">
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="container l-slategray" style="color:white;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;text-align:center;border-radius:5px;margin-bottom:0px;">
                                                    Admission & Discharge Info
                                                </div>
                                                <br>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <b>Admission Date</b>
                                                <div class="input-group">
                                                    <input type="text" id="inputid_admitdatemgh" class="form-control datetimepicker" placeholder="Admission Date" value="" autocomplete="off">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <b>Admission Time</b>
                                                <div class="input-group">
                                                    <input type="text" id="inputid_admittimemgh" class="form-control datetimepicker" placeholder="Admission Time" value="" autocomplete="off">
                                                </div>
                                            </div>
                                        </div> 
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <b>Reminder</b>
                                                <div class="typography-line" style="">
                                                    <p class="shadow-effect" style="background:#F0D7BB;border:1px solid #DEE0E0;text-align:justify;color:#525C5C;border-radius:5px;padding-left:10px;padding-right:10px;padding-bottom:10px;padding-top:10px;margin-bottom:10px;">
                                                        Discharge Date and Time will be the same with BILL-OUT Date and Time upon billing discharged.
                                                    </p>
                                                    <p class="shadow-effect" style="background:#F0D7BB;border:1px solid #DEE0E0;text-align:justify;color:orangered;border-radius:5px;padding-left:10px;padding-right:10px;padding-bottom:10px;padding-top:10px;margin-bottom:0px;">
                                                        Please make sure that Date and Time per stated above should be the same with information seen on chart.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <hr>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div id="demo2" class="carousel slide" data-ride="carousel">
                                            <ul class="carousel-indicators">
                                                <li data-target="#demo2" data-slide-to="0" class="active"></li>
                                                <li data-target="#demo2" data-slide-to="1" class=""></li>
                                                <li data-target="#demo2" data-slide-to="2" class=""></li>
                                            </ul>

                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                    <img src="<?= base_url('assets/images/MGHClearance Images/Pic01.jpg'); ?>" class="img-fluid" alt="Nurse Quote1">
                                                </div>
                                                <div class="carousel-item">
                                                    <img src="<?= base_url('assets/images/MGHClearance Images/Pic02.jpg'); ?>" class="img-fluid" alt="Nurse Quote2">
                                                </div>
                                                <div class="carousel-item">
                                                    <img src="<?= base_url('assets/images/MGHClearance Images/Pic03.jpg'); ?>" class="img-fluid" alt="Nurse Quote3">
                                                </div>
                                            </div>
                                            <a class="carousel-control-prev" href="#demo2" data-slide="prev">
                                                <span class="carousel-control-prev-icon"></span>
                                            </a>
                                            <a class="carousel-control-next" href="#demo2" data-slide="next">
                                                <span class="carousel-control-next-icon"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-3 col-sm-6 col-xs-12">
                                
                                <p id="myFormFinalDiagnosisxAddMGHClearance"></p>
                                <p id="myFormIndicationCauseAddMGHClearance"></p>
                                <p id="myFormCausesOfConfineAddMGHClearance"></p>
                                
                                <p id="inputid_hiddencausesconf" class="d-none"></p>
                                <p id="inputid_hiddenindication" class="d-none"></p>
                                <p id="inputid_hiddenfinaldiagn" class="d-none"></p>
                                                
                                <input type="hidden" id="inputid_causesconfdatamgh"> 
                                <input type="hidden" id="inputid_indicationdatamgh">
                                <input type="hidden" id="inputid_finaldiagndatamgh">
                                
                                <input type="hidden" id="inputid_finalcausesconfdatamgh">
                                <input type="hidden" id="inputid_finalindicationdatamgh">
                                <input type="hidden" id="inputid_finalfinaldiagndatamgh">
                                
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger btn-round waves-effect" onclick='clearAllFormElementsInTheMGHClearancePage()'>
                                    <div class="row clearfix">
                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                            <i class="zmdi zmdi-replay" style="font-size:35px"></i>
                                        </div>
                                        <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12" style="padding-top:10px;padding-left:0px;margin-left:0px;">
                                            <b>RESET FORM</b>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="col-lg-7 col-md-6 col-sm-6 col-xs-12">
                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success btn-round waves-effect" id="clearPatientButton" onclick='validateMGHClearanceForm()'>
                                    <div class="row clearfix">
                                        <div class="col-lg-1 col-md-12 col-sm-12 col-xs-12">
                                            <i class="zmdi zmdi-check-circle" style="font-size:35px"></i>
                                        </div>
                                        <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                                            <b>I HAVE CHECKED AND VERIFIED ABOVE INFORMATION FOR SAVING. PATIENT IS CLEARED AND READY FOR DISCHARGED.</b>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<?php $this->load->view('modals/inpatientlist_formghclear'); ?>
<?php $this->load->view('modals/ceasarian_indication'); ?>
<?php $this->load->view('modals/search_diagnosis'); ?>
<?php $this->load->view('modals/search_surgical'); ?>
<?php $this->load->view('modals/search_sterilization'); ?>
<?php $this->load->view('modals/search_finaldiag'); ?>
<?php $this->load->view('modals/search_hcilisting'); ?>
<?php $this->load->view('modals/search_reasonrefer'); ?>