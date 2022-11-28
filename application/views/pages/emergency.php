<section class="content">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Emergency Admission
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <!--                <button class="btn btn-primary btn-icon btn-round d-none d-md-inline-block float-right m-l-10" type="button" onclick="showAddDoctorsModal();">
                                    <i class="zmdi zmdi-plus"></i>
                                    <i class="material-icons">person_add</i>
                                </button>-->
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Dashboard'); ?>"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item active">Quick Admission</li>
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
                                <h2><strong>24 Hours</strong> Temporary Admission<small></small> </h2>
                                <br>
                                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="alert alert-danger" role="alert" style="margin:0px;">
                                            <div class="container">
                                                Emergency Quick Admission Entry
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-3 col-sm-12 col-xs-12">
                                        <div class="card top_counter">
                                            <div class="body" style="margin:0px;padding:0px;">
                                                <div class="icon xl-slategray"><i class="zmdi zmdi-assignment-o"></i> </div>
                                                <div class="content">
                                                    <div class="text">PATIENT INDEX:</div>
                                                    <h5 class="number" id="textid_pxpincodeemr"></h5>
                                                </div>
                                            </div>                    
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12">
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <img class="rounded img-raised float-right" src="<?= base_url('assets/images/px.png'); ?>" 
                                                     height="100" width="100" style="border:7px solid #02bec0;border-radius:2px;top:-20px" 
                                                     alt="" id="imageid_pxpictureidb">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-none col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                        <button type="button" class="d-none col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary btn-round waves-effect float-right" onclick='showQuickAdmittedPatientMasterlistModalForEmergency()'><b>VIEW QUICK ADMITTED PX MASTERLIST</b></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body">
                        <form autocomplete="off">
                            <input type="hidden" id="searchindicatorforquickadmissiontable">
                            <input type="hidden" id="slcodeemr">
                            <input type="hidden" id="pincodeemr">
                            <input type="hidden" id="pinformatemr">
                        <div class="row clearfix">
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div class="radio">
                                    <input type="radio" name="radio1" id="radio1" value="option1" checked="">
                                    <label for="radio1">
                                        &nbsp;&nbsp;Patient Index No.
                                    </label>
                                </div>
                                <div class="radio">
                                    <input type="radio" name="radio1" id="radio2" value="option2">
                                    <label for="radio2">
                                        &nbsp;&nbsp;Value Card
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 d-none">
                                <b>&nbsp;&nbsp;&nbsp;PIN</b>
                                <div class="form-group">
                                    <input type="hidden" id="patientpin1emr" class="form-control" placeholder="Patient" autocomplete="off" readonly="">
                                    <input type="text" id="patientpin2emr" class="form-control" placeholder="PIN" autocomplete="off" readonly="">
                                    <p id="patientpin2emrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Caseno</b>
                                <div class="form-group">
                                    <input type="hidden" value="">
                                    <input type="text" id="accountnoemr" class="form-control" placeholder="" value="" readonly>
                                    <p id="accountnoemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div class="form-group" style="padding-top:10px">
                                    <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-info btn-round waves-effect float-right" onclick='showPatientMasterlistModalForEmergency()'><i class="zmdi zmdi-search"></i>&nbsp;&nbsp;<b>LOCATE PATIENT</b></button>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        <div class="row clearfix" style="margin-bottom:5px;">
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;First Name</b>
                                <div class="form-group">
                                    <input type="text" id="fnameemr" class="form-control" placeholder="Enter First Name" autocomplete="off">
                                    <p id="fnameemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Middle Name</b>
                                <div class="form-group">
                                    <input type="text" id="mnameemr" class="form-control" placeholder="Enter Middle Name" autocomplete="off">
                                    <p id="mnameemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Last Name</b>
                                <div class="form-group">
                                    <input type="text" id="lnameemr" class="form-control" placeholder="Enter Last Name" autocomplete="off">
                                    <p id="lnameemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Suffix</b>
                                <div class="form-group">
                                    <input type="text" id="suffixemr" class="form-control" placeholder="Enter Suffix" autocomplete="off">
                                    <p id="suffixemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row clearfix" style="margin-bottom:5px;">
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Birthday</b>
                                <div class="input-group">
                                    <input type="text" id="birthdayemer" class="form-control datetimepicker" placeholder="Enter Birthdate" onchange="onchangeCalculateAge()">
                                </div>
                                <p id="birthdayemererror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Age</b>
                                <div class="form-group">
                                    <input type="text" id="ageemr" class="form-control" placeholder="Age" readonly="" autocomplete="off">
                                    <p id="ageemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Gender</b>
                                <select id="genderselemr" class="form-control show-tick selectpicker">
                                    <optgroup>
                                        <option value="">Select From List</option>
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>   
                                    </optgroup>
                                </select>
                                <p id="genderselemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Civil Status</b>
                                <select id="civilselemr" class="form-control show-tick selectpicker" data-live-search="true">
                                    <optgroup>
                                        <option value="">Select from List</option>
                                        <option value="SINGLE">SINGLE</option>
                                        <option value="MARRIED">MARRIED</option>
                                        <option value="WIDOWED">WIDOWED</option>
                                        <option value="SEPARATED">SEPARATED</option>   
                                    </optgroup>
                                </select>
                                <p id="civilselemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                        </div>
                        
                        <div class="row clearfix" style="margin-bottom:15px;">
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Religion</b>
                                <select id="religionselemr" class="form-control show-tick selectpicker" data-live-search="true">
                                    <optgroup>
                                        <option value="">Select from List</option>
                                        <option value="ROMAN CATHOLIC">ROMAN CATHOLIC</option>
                                        <option value="7TH DAY ADVENTIST">7TH DAY ADVENTIST</option>
                                        <option value="AGUPAYAN">AGUPAYAN</option>
                                        <option value="AMONAN">AMONAN</option>
                                        <option value="ANGLICAN">ANGLICAN</option>
                                        <option value="ASSEMBLY OF GOD">ASSEMBLY OF GOD</option>
                                        <option value="BAC">BAC</option>
                                        <option value="BAPTIST">BAPTIST</option>
                                        <option value="BIBLE BAPTIST">BIBLE BAPTIST</option>
                                        <option value="BORN AGAIN">BORN AGAIN</option>
                                        <option value="BUDDHISM">BUDDHISM</option>
                                        <option value="CAMACOP">CAMACOP</option>
                                        <option value="CHURCH OF CHRIST">CHURCH OF CHRIST</option>
                                        <option value="CHURCH OF GOD">CHURCH OF GOD</option>
                                        <option value="EVANGELICAL">EVANGELICAL</option>
                                        <option value="GKC">GKC</option>
                                        <option value="IGLESIA NI CHRISTO">IGLESIA NI CHRISTO</option>
                                        <option value="ISLAM">ISLAM</option>
                                        <option value="JEWISH">JEWISH</option>
                                        <option value="LATTER DAY SAINTS">LATTER DAY SAINTS</option>
                                        <option value="MORMONS">MORMONS</option>
                                        <option value="LILOAN">LILOAN</option>
                                        <option value="MARCH OF FAITH">MARCH OF FAITH</option>
                                        <option value="MESSIANIC">MESSIANIC</option>
                                        <option value="METHODIST">METHODIST</option>
                                        <option value="MUSLIM">MUSLIM</option>
                                        <option value="ORTHODOX">ORTHODOX</option>
                                        <option value="PANACOSTAN">PANACOSTAN</option>
                                        <option value="PENTECOSTAL">PENTECOSTAL</option>
                                        <option value="PROTESTANT">PROTESTANT</option>
                                        <option value="SIKH">SIKH</option>
                                        <option value="UCCP">UCCP</option>
                                        <option value="UNITED PENTECOSTAL CHURCH">UNITED PENTECOSTAL CHURCH</option>
                                        <option value="RIZALIAN">RIZALIAN</option>
                                    </optgroup>
                                </select>
                                <p id="religionselemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Province</b>
                                <select id="provinceselemr" class="form-control show-tick selectpicker" data-live-search="true" onchange="onChangeProvinceSelectForEmergencyAdmitPx()">
                                    <optgroup>
                                        <option value="">Select from List</option>
                                        <?php 
                                            for($i=0; $i < count($provincelistx); $i++)
                                            {
                                                echo "<option value='".strtoupper($provincelistx[$i]['PROV_NAME'])."-".strtoupper($provincelistx[$i]['PROVINCE'])."'>".strtoupper($provincelistx[$i]['PROV_NAME'])."</option>";
                                            }
                                        ?>
                                    </optgroup>
                                </select> 
                                <p id="provinceselemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;City/Municipality</b>
                                <select id="citymunselemr" class="form-control show-tick selectpicker" data-live-search="true" onchange="onChangeMunicipalitySelectForEmergencyAdmitPx()" disabled="true">
                                    <optgroup>
                                        <option value="">Select from List</option>
                                    </optgroup>
                                </select>
                                <p id="citymunselemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                        </div>
                        
                        <div class="row clearfix" style="margin-bottom:5px;">
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Zip Code</b>
                                <div class="form-group">
                                    <input type="text" id="zipcodetxtemr" class="form-control" placeholder="Zipcode" autocomplete="off" readonly>
                                    <p id="zipcodetxtemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>  
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Barangay</b>
                                <select id="barangayselemr" class="form-control selectpicker" data-live-search="true" onchange="onChangeBarangaySelectForEmergencyAdmitPx()" disabled="true">
                                    <optgroup >
                                        <option value="">Select from List</option>
                                    </optgroup>
                                </select>
                                <p id="barangayselemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Address</b>
                                <div class="form-group">
                                    <input type="text" id="streettxtemr" class="form-control" autocomplete="off" disabled="true" placeholder="Address">
                                    <p id="streettxtemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row clearfix" style="margin-bottom:5px;">
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Contact No.</b>
                                <div class="form-group">
                                    <input type="text" id="contactnotxtemr" class="form-control" autocomplete="off" placeholder="Enter Contact No.">
                                    <p id="contactnotxtemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>  
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Father's Name</b>
                                <div class="form-group">
                                    <input type="text" id="fatnametxtemr" class="form-control" autocomplete="off" placeholder="Enter Father's Name">
                                    <p id="fatnametxtemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>  
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Mother's Name</b>
                                <div class="form-group">
                                    <input type="text" id="motnametxtemr" class="form-control" autocomplete="off" placeholder="Enter Mother's Name">
                                    <p id="motnametxtemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr>
                            </div>
                        </div>
                        
                        <div class="row clearfix">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <b>&nbsp;&nbsp;&nbsp;Information</b>
                                <div class="typography-line" style="margin-top:5px;padding-left:12px;border-radius:5px;">
                                    <p class="" style="background:#DBDFDF;border:1px solid #DEE0E0;text-align:justify;color:#525C5C;border-radius:5px;padding-left:25px;padding-right:25px;padding-bottom:20px;padding-top:20px;margin:0px;">
                                        This function is design for QUICK PATIENT ADMISSION into the system so you can
                                        QUICKLY REQUEST FOR ITEMS on the said patient. However, patient record will be
                                        automatically lock after 24 hours IF NOT MODIFIED with proper patient information
                                        recording using the normal patient editing procedure.
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="row clearfix" style="margin-top:20px;">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Date Admitted</b>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="zmdi zmdi-calendar"></i>
                                            </span>
                                            <input type="text" id="dateadmittxtemr" class="form-control datetimepicker" value="<?= $currentdate ?>" autocomplete="off">
                                        </div>
                                        <p id="dateadmittxtemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">
                                        <b>&nbsp;&nbsp;&nbsp;Time Admitted</b>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="zmdi zmdi-time"></i>
                                            </span>
                                            <input type="text" id="timeadmittxtemr" class="form-control datetimepicker" value="<?= $currenttime ?>" autocomplete="off">
                                        </div>
                                        <p id="timeadmittxtemrerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger btn-round" onclick="clearform()"><b>CLEAR FORM</b></button>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary btn-round" id="quickAdmitPatientButton" onclick="checkDuplicateCasenoForQuickAdmitPatient()"><b>ADMIT PATIENT</b></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php $this->load->view('modals/pxmasterlist_foremergency'); ?>
<?php $this->load->view('modals/quickpx_masterlist'); ?>
<?php $this->load->view('modals/admit_patient'); ?>
<?php $this->load->view('modals/membership_management'); ?>
<?php $this->load->view('modals/billingcp_infomodal'); ?>
<?php $this->load->view('modals/patientcp_infomodal'); ?>
<?php $this->load->view('modals/doc_management'); ?>
<?php $this->load->view('modals/co_management'); ?>
<?php $this->load->view('modals/nur_management'); ?>
<?php $this->load->view('modals/room_management'); ?>
<?php $this->load->view('modals/hmo_management'); ?>
<?php $this->load->view('modals/hmo_masterlist'); ?>
<?php $this->load->view('modals/package_management'); ?>
<?php $this->load->view('modals/pxmasterlist_forpackage'); ?>
<?php $this->load->view('modals/package_masterlist'); ?>
<?php $this->load->view('modals/docmasterlist_forpackage'); ?>
<?php $this->load->view('modals/vip_management'); ?>
<?php $this->load->view('modals/dietary_guide_modal'); ?>
<?php $this->load->view('modals/search_diagnosis'); ?>
<?php $this->load->view('modals/diagnostic_data'); ?>
<?php $this->load->view('modals/supervisor_permitmodal'); ?>
<?php $this->load->view('modals/add_patients'); ?>
<?php $this->load->view('modals/slcode_foraddpx'); ?>
<?php $this->load->view('modals/slcode_form'); ?>
<?php $this->load->view('modals/edit_patient'); ?>
<?php $this->load->view('modals/quickdata_edit'); ?>
