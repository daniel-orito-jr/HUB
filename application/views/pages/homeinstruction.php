<section class="content">
    <div class="block-header" id="">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Discharge/ Home Instructions
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Dashboard'); ?>"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item active">Take Home Instructions</li>
                </ul>
            </div>
        </div>
    </div>    
    <div class="container-fluid">   
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header" style="margin-bottom:0px;padding-bottom:0px;">
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h2><strong>Take Home</strong> Instructions<small></small> </h2>
                                <br>
                                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="alert alert-info" role="alert" style="margin:0px;">
                                            <div class="container">
                                                Patient Discharge/ Take Home Instructions
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <button type="button" class="float-right btn btn-primary btn-round waves-effect float-right" onclick='showInpatientMasterlistForHomeInstruction()'><i class="zmdi zmdi-search"></i>&nbsp;&nbsp;<b>LOCATE PATIENT</b></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body"> 
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <input type="hidden" id="hiddbox_casecodehom">
                                <input type="hidden" id="hiddbox_pinnumbrhom">
                                <input type="hidden" id="hiddbox_pattypexhom">
                                <input type="hidden" id="hiddbox_docrefnohom">
                                <input type="hidden" id="hiddbox_s2noxxxxhom">
                                <input type="hidden" id="hiddbox_ptrnoxxxhom">
                                <input type="hidden" id="hiddbox_licnoxxxhom">
                                <input type="hidden" id="hiddbox_stationxhom" value="<?= $station ?>">
                                <input type="hidden" id="hiddbox_nexttabindicatorhom" value="0">
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Patient Name</b>
                                <input type="text" id="textboxid_patientnamehom" class="form-control" placeholder="" autocomplete="off" readonly="">
                                <p id="textboxid_patientnamehomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Attending Doctor</b>
                                <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                    <input type="text" name="textboxname_attenddochom" id="textboxid_attenddochom" class="form-control" autocomplete="off" placeholder="">
                                    <span class="input-group-addon" id="spanid_attenddochom" style="padding:0px;border-left:transparent;">
                                        <button type="button" id="buttonid_attenddochom" class="btn btn-primary btn-round" style="margin:0px;height:36px;" onclick="showSearchDoctorModalForAdmission()">
                                            <i class="zmdi zmdi-plus"></i>
                                        </button>
                                    </span>
                                </div> 
                                <p id="textboxid_attenddochomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Account No.</b>
                                <input type="text" id="textboxid_accountnohom" class="form-control" placeholder="" value="" readonly>
                                <p id="textboxid_accountnohomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <br>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Date of Instruction</b>
                                <input type="text" id="textboxid_instructdatehom" class="form-control datetimepicker" placeholder="" value="">
                                <p id="textboxid_instructdatehomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Date of Birth</b>
                                <input type="text" id="textboxid_birthdatehom" class="form-control" placeholder="" value="" onchange="onchangeCalculateAgeHomeInstruction()">
                                <p id="textboxid_birthdatehomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Age</b>
                                <input type="text" id="textboxid_patientagehom" class="form-control" placeholder="" value="" readonly>
                                <p id="textboxid_patientagehomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Gender</b>
                                <select name="selectname_pxgenderhom" id="selectid_pxgenderhom" class="form-control selectpicker">
                                    <optgroup>
                                        <option value="Select">Select from List</option>
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                    </optgroup>
                                </select>
                                <p id="selectid_pxgenderhomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                        </div>
                        
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <ul class="nav nav-tabs justify-content-center" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#GeneralTabLinkedDiv" id="GeneralTabHom" onclick="onclickGeneralTab()">
                                            General Information
                                        </a>
                                    </li>
                                    <li class="nav-item" onclick="onClickMedicationInformationTab()">
                                        <a class="nav-link" data-toggle="tab" href="#MedicationTabLinkedDiv" id="MedicationTabHom" onclick="onclickMedicationTab()"> 
                                            Medication Information 
                                        </a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="tabcontentdiv">
                                    <div role="tabpanel" class="tab-pane in active" id="GeneralTabLinkedDiv">
                                        <div class="row clearfix">
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>&nbsp;&nbsp;&nbsp;Patient Address</b>
                                                        <input type="text" id="textboxid_pxaddresshom" class="form-control" placeholder="" value="">
                                                        <p id="textboxid_pxaddresshomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                    </div>
                                                </div>
                                                <div class="row clearfix" style="margin-top:17px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>&nbsp;&nbsp;&nbsp;Room Information</b>
                                                        <input type="text" id="textboxid_roominfohom" class="form-control" placeholder="" value="">
                                                        <p id="textboxid_roominfohomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                    </div>
                                                </div>
                                                <div class="row clearfix" style="margin-top:17px;">
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <b>&nbsp;&nbsp;&nbsp;Admission Date</b>
                                                        <input type="text" id="textboxid_admissiondatehom" class="form-control" placeholder="" value="">
                                                        <p id="textboxid_admissiondatehomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <b>&nbsp;&nbsp;&nbsp;Discharge Date</b>
                                                        <input type="text" id="textboxid_dischargedatehom" class="form-control" placeholder="" value="">
                                                        <p id="textboxid_dischargedatehomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                <b>&nbsp;&nbsp;&nbsp;Final Diagnosis</b>
                                                <textarea name="textareaname_diagnoadmmgh" id="textareaid_finaldiagnosehom" class="form-control m-b-20" rows="8" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                <p id="textareaid_finaldiagnosehomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                            </div>
                                        </div>
                                        <div class="row clearfix" style="margin-top:15px;">
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;Special Instruction </b><small>(Care Required, Treatment/Procedure, Dressing, etc.)</small>
                                                <textarea name="textareaname_specialinshom" id="textareaid_specialinshom" class="form-control m-b-20" rows="4" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;Diet Specification </b><small>(May Have)</small>
                                                <textarea name="textareaname_dietspecifichom" id="textareaid_dietspecifichom" class="form-control m-b-20" rows="4" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                            </div>
                                        </div>
                                        
                                        <div class="row clearfix" style="margin-top:15px;">
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;Laboratory</b>
                                                <textarea name="textareaname_laboratoryhom" id="textareaid_laboratoryhom" class="form-control m-b-20" rows="4" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;Procedures </b><small>(X-ray/Ultrasound/2D-echo etc.)</small>
                                                <textarea name="textareaname_procedureshom" id="textareaid_procedureshom" class="form-control m-b-20" rows="4" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                            </div>
                                        </div>
                                        
                                        <div class="row clearfix" style="margin-top:15px;">
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;To Avoid</b>
                                                <textarea name="textareaname_tobeavoidedhom" id="textareaid_tobeavoidedhom" class="form-control m-b-20" rows="7" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;Next Visit</b>
                                                <textarea name="textareaname_nextvisithom" id="textareaid_nextvisithom" class="form-control m-b-20" rows="7" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>&nbsp;&nbsp;&nbsp;Instructions By</b>
                                                        <select name="selectname_instructbyhom" id="selectid_instructbyhom" class="form-control selectpicker">
                                                            <optgroup>
                                                                <option value="Select">Select from List</option>
                                                            </optgroup>
                                                        </select>
                                                        <p id="selectid_instructbyhomerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row clearfix" style="margin-top:15px;">
                                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                                <p class="shadow-effect" style="background:#DDD6FA;border:1px solid #DEE0E0;text-align:justify;border-radius:5px;padding-left:13px;padding-right:13px;padding-bottom:10px;padding-top:10px;margin-bottom:0px;">
                                                    <b>NOTE: </b>You can leave all the boxes above empty if you have no data anyway to fill-in. Thank you.
                                                </p>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect" onclick='clearAllHomeInstructionFormElements()'>
                                                    <div class="row clearfix">
                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                            <i class="zmdi zmdi-delete" style="font-size:35px"></i>
                                                        </div>
                                                        <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12" style="padding-top:10px;padding-left:0px;margin-left:0px;">
                                                            <b>&nbsp;&nbsp;CLEAR FORM</b>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success waves-effect" onclick='validateGeneralInformationTab()'>
                                                    <div class="row clearfix">
                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                            <i class="zmdi zmdi-check" style="font-size:35px"></i>
                                                        </div>
                                                        <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12" style="padding-top:10px;padding-left:0px;margin-left:0px;">
                                                            <b>&nbsp;&nbsp;GO AND PROCEED TO NEXT TAB</b>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div role="tabpanel" class="tab-pane" id="MedicationTabLinkedDiv">
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="hidden" id="hiddboxid_productidhom">
                                                <input type="hidden" id="hiddboxid_hosplcodehom">
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;&nbsp;Item/Meds</b>
                                                <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                    <input type="text" name="textboxname_itemmedshom" id="textboxid_itemmedshom" class="form-control" autocomplete="off">
                                                    <span class="input-group-addon" id="" style="padding:0px;border-left:transparent;">
                                                        <button type="button" id="" class="btn btn-primary btn-round" style="margin:0px;height:36px;" onclick="showExternalItemsListingModal()">
                                                            <i class="zmdi zmdi-plus"></i>
                                                        </button>
                                                    </span>
                                                </div> 
                                                <p id="textboxid_itemmedshomerror" class="d-none" style="color:red;">Please input information on the field!</p>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;&nbsp;Brand Name</b>
                                                <input type="text" name="textboxname_brandnamehom" id="textboxid_brandnamehom" class="form-control" autocomplete="off">
                                                <p id="textboxid_brandnamehomerror" class="d-none" style="color:red;">Please input information on the field!</p>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;&nbsp;Dosage</b>
                                                <input type="text" name="textboxname_dosagehom" id="textboxid_dosagehom" class="form-control" autocomplete="off">
                                                <p id="textboxid_dosagehomerror" class="d-none" style="color:red;">Please input information on the field!</p>
                                            </div>
                                        </div>
                                        <div class="row clearfix" style="margin-top:25px;">
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <div class="card" style="border-radius:20px;border:1px solid #E1E3E3">
                                                    <div class="header" style="padding-bottom:10px;margin-bottom:0px;">
                                                        <h2></h2><b>Breakfast</b><small id="smallid_morning">&nbsp;&nbsp;(Morning)</small>                     
                                                        <ul class="header-dropdown">
                                                            <li class="remove" onclick="onClickBreakfastCloseButton()">
                                                                <a role="button"><i class="zmdi zmdi-close"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="body" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                                        <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div class="radio">
                                                                    <input type="radio" name="radioname_breakfasthom" id="radioid_breakfastbeforehom" value="" onchange="$('#hiddbox_breakfasthom').val('BEFORE');">
                                                                    <label for="radioid_breakfastbeforehom">
                                                                        Before
                                                                    </label>
                                                                </div>
                                                                <div class="radio">
                                                                    <input type="radio" name="radioname_breakfasthom" id="radioid_breakfastafterhom" value="" onchange="$('#hiddbox_breakfasthom').val('AFTER');">
                                                                    <label for="radioid_breakfastafterhom">
                                                                        After
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <select name="selectname_breakfasthom" id="selectid_breakfasthom" class="form-control selectpicker" onchange="">
                                                                    <optgroup>
                                                                        <option value="NONE">NONE</option>
                                                                        <option value="05:00">05:00</option>
                                                                        <option value="05:30">05:30</option>
                                                                        <option value="06:00">06:00</option>
                                                                        <option value="06:30">06:30</option>
                                                                        <option value="07:00">07:00</option>
                                                                        <option value="07:30">07:30</option>
                                                                        <option value="08:00">08:00</option>
                                                                        <option value="08:30">08:30</option>
                                                                        <option value="09:00">09:00</option>
                                                                        <option value="09:30">09:30</option>
                                                                        <option value="10:00">10:00</option>
                                                                        <option value="10:30">10:30</option>
                                                                        <option value="11:00">11:00</option>
                                                                        <option value="11:30">11:30</option>
                                                                    </optgroup>
                                                                </select>
                                                                <input type="hidden" id="hiddbox_breakfasthom" value="NONE">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <div class="card" style="border-radius:20px;border:1px solid #E1E3E3">
                                                    <div class="header" style="padding-bottom:10px;margin-bottom:0px;">
                                                        <h2></h2><b>Lunch</b><small id="smallid_noontime">&nbsp;&nbsp;(Noontime)</small>                       
                                                        <ul class="header-dropdown">
                                                            <li class="remove" onclick="onClickLunchtimeCloseButton()">
                                                                <a role="button"><i class="zmdi zmdi-close"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="body" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                                        <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div class="radio">
                                                                    <input type="radio" name="radioname_lunchtimehom" id="radioid_lunchtimebeforehom" value="" onchange="$('#hiddbox_lunchtimehom').val('BEFORE');">
                                                                    <label for="radioid_lunchtimebeforehom">
                                                                        Before
                                                                    </label>
                                                                </div>
                                                                <div class="radio">
                                                                    <input type="radio" name="radioname_lunchtimehom" id="radioid_lunchtimeafterhom" value="" onchange="$('#hiddbox_lunchtimehom').val('AFTER');">
                                                                    <label for="radioid_lunchtimeafterhom">
                                                                        After
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <select name="selectname_lunchtimehom" id="selectid_lunchtimehom" class="form-control selectpicker">
                                                                    <optgroup>
                                                                        <option value="NONE">NONE</option>
                                                                        <option value="11:30">11:30</option>
                                                                        <option value="12:00">12:00</option>
                                                                        <option value="12:30">12:30</option>
                                                                        <option value="01:00">01:00</option>
                                                                        <option value="01:30">01:30</option>
                                                                        <option value="02:00">02:00</option>
                                                                        <option value="02:30">02:30</option>
                                                                    </optgroup>
                                                                </select>
                                                                <input type="hidden" id="hiddbox_lunchtimehom" value="NONE">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <div class="card" style="border-radius:20px;border:1px solid #E1E3E3">
                                                    <div class="header" style="padding-bottom:10px;margin-bottom:0px;">
                                                        <h2></h2><b>Supper</b><small id="smallid_evening">&nbsp;&nbsp;(Evening)</small>                  
                                                        <ul class="header-dropdown">
                                                            <li class="remove" onclick="onClickSuppertimeCloseButton()">
                                                                <a role="button"><i class="zmdi zmdi-close"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="body" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                                        <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div class="radio">
                                                                    <input type="radio" name="radioname_suppertimehom" id="radioid_suppertimebeforehom" value="" onchange="$('#hiddbox_suppertimehom').val('BEFORE');">
                                                                    <label for="radioid_suppertimebeforehom">
                                                                        Before
                                                                    </label>
                                                                </div>
                                                                <div class="radio">
                                                                    <input type="radio" name="radioname_suppertimehom" id="radioid_suppertimeafterhom" value="" onchange="$('#hiddbox_suppertimehom').val('AFTER');">
                                                                    <label for="radioid_suppertimeafterhom">
                                                                        After
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <select name="selectname_suppertimehom" id="selectid_suppertimehom" class="form-control selectpicker">
                                                                    <optgroup>
                                                                        <option value="NONE">NONE</option>
                                                                        <option value="05:00">05:00</option>
                                                                        <option value="05:30">05:30</option>
                                                                        <option value="06:00">06:00</option>
                                                                        <option value="06:30">06:30</option>
                                                                        <option value="07:00">07:00</option>
                                                                        <option value="07:30">07:30</option>
                                                                        <option value="08:00">08:00</option>
                                                                        <option value="08:30">08:30</option>
                                                                        <option value="09:00">09:00</option>
                                                                        <option value="09:30">09:30</option>
                                                                        <option value="10:00">10:00</option>
                                                                        <option value="10:30">10:30</option>
                                                                        <option value="11:00">11:00</option>
                                                                        <option value="11:30">11:30</option>
                                                                    </optgroup>
                                                                </select>
                                                                <input type="hidden" id="hiddbox_suppertimehom" value="NONE">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                <div class="card" style="border-radius:20px;border:1px solid #E1E3E3">
                                                    <div class="header" style="padding-bottom:20px;margin-bottom:0px;">
                                                        <h2></h2><b>Bed Time</b>                  
                                                    </div>
                                                    <div class="body" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                                        <div class="row clearfix" style="padding-top:0px;padding-bottom:25px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <select name="selectname_bedtimehom" id="selectid_bedtimehom" class="form-control selectpicker">
                                                                    <optgroup>
                                                                        <option value="NONE">NONE</option>
                                                                        <option value="05:00">05:00</option>
                                                                        <option value="05:30">05:30</option>
                                                                        <option value="06:00">06:00</option>
                                                                        <option value="06:30">06:30</option>
                                                                        <option value="07:00">07:00</option>
                                                                        <option value="07:30">07:30</option>
                                                                        <option value="08:00">08:00</option>
                                                                        <option value="08:30">08:30</option>
                                                                        <option value="09:00">09:00</option>
                                                                        <option value="09:30">09:30</option>
                                                                        <option value="10:00">10:00</option>
                                                                        <option value="10:30">10:30</option>
                                                                        <option value="11:00">11:00</option>
                                                                        <option value="11:30">11:30</option>
                                                                        <option value="12:00">12:00</option>
                                                                    </optgroup>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                <div class="card" style="border-radius:20px;border:1px solid #E1E3E3">
                                                    <div class="header" style="padding-bottom:20px;margin-bottom:0px;">
                                                        <h2></h2><b>No.of Days</b>               
                                                    </div>
                                                    <div class="body" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                                        <div class="row clearfix" style="padding-top:0px;padding-bottom:25px;margin-bottom:0px;margin-top:0px;">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <input type="text" name="textboxname_numberofdayshom" id="textboxid_numberofdayshom" class="form-control" autocomplete="off" data-mask="999">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b id="boldid_instruction">&nbsp;&nbsp;&nbsp;Medication Prescription</b>
                                                        <input type="text" id="textboxid_prescriptionhom" class="form-control" placeholder="" value="">
                                                    </div>
                                                </div>
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>&nbsp;&nbsp;&nbsp;Potential Side-Effect</b>
                                                        <input type="text" id="textboxid_sideeffecthom" class="form-control" placeholder="" value="">
                                                    </div>
                                                </div>
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect btn-round">
                                                            <i class="zmdi zmdi-delete"></i>&nbsp;&nbsp;<b>DELETE ALL</b>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                <div class="row clearfix">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <b>&nbsp;&nbsp;&nbsp;Purpose Indication</b>
                                                        <input type="text" id="textboxid_indicationhom" class="form-control" placeholder="" value="">
                                                    </div>
                                                </div>
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <b>&nbsp;&nbsp;&nbsp;Quantity</b>
                                                        <input type="text" id="textboxid_quantityhom" class="form-control" placeholder="" value="">
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                        <b>&nbsp;&nbsp;&nbsp;Unit</b>
                                                        <input type="text" id="textboxid_unithom" class="form-control" placeholder="" value="">
                                                    </div>
                                                </div>
                                                <div class="row clearfix" style="margin-top:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning btn-round waves-effect" onclick="onclickAddToListBelow()">
                                                            <i class="zmdi zmdi-download"></i>&nbsp;&nbsp;<b>ADD TO LIST BELOW</b>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <b>&nbsp;&nbsp;&nbsp;Take Home Medication</b>
                                                <div class="well" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                    <div class="tab-pane table-responsive active" id="All" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;background:#e3e3e3;border-radius:10px;">
                                                        <table class="table table-bordered table-striped table-hover" id="takehome-medication-listings-table" style="margin-bottom:0px">
                                                            <thead>
                                                                <tr>
                                                                    <th id="table-head-singlebtnhom">Action</th>
                                                                    <th id="table-head-no">No.</th>
                                                                    <th id="table-head-name">Medication</th>
                                                                    <th id="table-head-action">Dosage</th>
                                                                    <th id="table-head-action">Before Breakfast</th>
                                                                    <th id="table-head-action">After Breakfast</th>
                                                                    <th id="table-head-action">Before Lunch</th>
                                                                    <th id="table-head-action">After Lunch</th>
                                                                    <th id="table-head-action">Before Supper</th>
                                                                    <th id="table-head-action">After Supper</th>
                                                                    <th id="table-head-action">Bed Time</th>
                                                                    <th id="table-head-action">No.of Days</th>
                                                                    <th id="table-head-name">Purpose</th>
                                                                    <th id="table-head-name">Side-Effect</th>
                                                                    <th id="table-head-action">Quantity</th>
                                                                    <th id="table-head-action">Unit</th>
                                                                    <th id="table-head-name">Frequency</th>
                                                                    <th id="table-head-name">Code</th>
                                                                    <th id="table-head-action">TextboxID</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table> 
                                                    </div>
                                                    <p id="takehomemedtableerror" class="d-none" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix" style="margin-top:15px;">
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                <p class="shadow-effect" style="background:#DDD6FA;border:1px solid #DEE0E0;text-align:justify;border-radius:5px;padding-left:13px;padding-right:13px;padding-bottom:10px;padding-top:10px;margin-bottom:0px;">
                                                    <b>NOTE: </b>You have up to five (5) items that can fit in one prescription. However you can have as many as you want.
                                                </p>
                                            </div>
                                            <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                                                <div class="row clearfix d-none">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <p id="myFormTakeHomeMedicationMultipleDataStorage" class="d-none"></p>
                                                        <p id="inputid_hiddenmedicationhom" class="d-none"></p>
                                                        <input type="hidden" id="inputid_medicationdatahom"> 
                                                        <input type="hidden" id="inputid_finalmedicationdatahom">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                                <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success waves-effect" onclick='attachAllMultipleTextboxToSingleTextbox()'>
                                                    <div class="row clearfix">
                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                            <i class="zmdi zmdi-check" style="font-size:35px"></i>
                                                        </div>
                                                        <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12" style="padding-top:10px;padding-left:0px;margin-left:0px;">
                                                            <b>&nbsp;&nbsp;SAVE OR UPDATE</b>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="" id="newdivadded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<?php $this->load->view('modals/create_newrx'); ?>
<?php $this->load->view('modals/doc_management'); ?>
<?php $this->load->view('modals/add_doctors'); ?>
<?php $this->load->view('modals/inpatientlist_forrxcreator'); ?>
<?php $this->load->view('modals/outpatientlist_forrxcreator'); ?>
<?php $this->load->view('modals/externalitems_forrxcreator'); ?>
<?php $this->load->view('modals/printrx_data_home'); ?>