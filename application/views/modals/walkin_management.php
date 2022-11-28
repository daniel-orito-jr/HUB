<!--<div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
<div class="modal fade" id="walkinmanagementmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <form id="insert-patient-form" autocomplete="off">
                <div class="modal-header" style="margin-bottom:0px;padding-bottom:0px">
                    <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                            <div class="col-lg-10 col-md-6 col-sm-6 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h4 class="title insertwalkintitle d-none" id="largeModalLabel">New Walk-in Patient</h4>
                                        <h4 class="title updatewalkintitle d-none" id="largeModalLabel">Edit Walk-in Patient</h4>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="header">
                                                <h2><strong>Walk-in Patient</strong> Form</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                        <ul class="nav nav-tabs" role="tablist" style="margin-top:0px;padding-top:0px;margin-bottom:5px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#GeneralInformation" id="anchorid_forgeneraltabadd">General Information<b id="generalerrtabindicatoradd" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#ProfilingInformation" id="anchorid_forprofiletabadd">Contact Information<b id="profileerrtabindicatoradd" style="color:red;padding-left:5px"></b></a></li>
                                            <p id="hiddboxid_pictureeocerror" hidden="true" style="color:red;">Required Field</p>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <div class="relative">
                                        <div class="absolute" id="uploaded_image_foraddpx">
                                            <img class="rounded img-raised" src="<?= base_url('assets/images/px.png'); ?>"
                                                 height="100" width="100" style="border:7px solid #02bec0;border-radius:2px;top:-20px"
                                                 alt="" id="patientimguploadforaddpx">
                                        </div>
                                        <div class="absolute">
                                            <button type="button" class="btn btn-primary btn-sm" style="margin:0px;padding-left:7px;padding-right:7px;padding-bottom:2px;padding-top:4px;top:63px;left:-42px" onclick="">
                                                <i class="zmdi zmdi-camera"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="relative">
                                        <div class="absolute">
                                            <button type="button" class="btn btn-sm btn-primary waves-effect"
                                                style="margin-top:85px;width:100px;left:-97px" onclick="patientImageUploadForAddPatient()">
                                                BROWSE 
                                            </button>
                                            <input type="file" id="openpatientimguploadforaddpx" name="openpatientimguploadforaddpx" accept="image/*" class="d-none" onchange="readImageURL(this, 'patientimguploadforaddpx');"/> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="margin:0px;padding:0px">
                    <div class="row clearfix" style="margin-top:10px;margin-bottom:0px;margin-left:0px;margin-right:0px;padding:0px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="margin:0px;padding:0px">
                            <div class="card" style="margin:0px;padding:0px">
                                <div class="body" style="margin:0px;padding:0px">
                                    <input type="hidden" id="hiddboxid_opdcodeeoc">
                                    <input type="hidden" id="hiddboxid_pictureeoc">
                                    <input type="hidden" id="hiddboxid_slaccnteoc">
                                    <input type="hidden" id="hiddboxid_mmbrnumeoc">
                                    <input type="hidden" id="hiddboxid_pincodeeoc">
                                    <div class="tab-content" style="margin:0px;padding:0px">
                                        <div role="tabpanel" class="tab-pane in active" id="GeneralInformation">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Inpatient Account</b>
                                                    <div class="input-group">
                                                        <input type="text" name="" id="inpusid_inpataccteoc" class="form-control" style="height:40px" readonly="">
                                                        <span class="input-group-addon" id="spanid_inpataccteoc" style="padding:0px;background:#e3e3e3">
                                                            <button type="button" id="buttonid_inpataccteoc" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showPatientMasterlistModalForEmergency()">
                                                                <i class="zmdi zmdi-plus"></i>
                                                            </button>
                                                        </span>
                                                        <p id="inpusid_inpataccteocerror" hidden="true" style="color:red;">Required Field</p>
                                                    </div>
                                                    
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;First Name<small></small></b>
                                                    <div class="form-group">
                                                        <input type="text" name="" id="inputid_fnameeoc" class="form-control" placeholder="Enter First Name" autocomplete="off" required>
                                                        <p id="inputid_fnameeocerror" hidden="true" style="color:red;">Required Field</p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Middle Name<small></small></b>
                                                    <div class="form-group">
                                                        <input type="text" name="" id="inputid_mnameeoc" class="form-control" placeholder="Enter Middle Name" autocomplete="off" required>
                                                        <p id="inputid_mnameeocerror" hidden="true" style="color:red;">Required Field</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Last Name<small></small></b>
                                                    <div class="form-group">
                                                        <input type="text" name="" id="inputid_lnameeoc" class="form-control" placeholder="Enter Last Name" autocomplete="off" required>
                                                        <p id="inputid_lnameeocerror" hidden="true" style="color:red;">Required Field</p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Suffix<small></small></b>
                                                    <div class="form-group">
                                                        <input type="text" name="" id="inputid_suffixeoc" class="form-control" placeholder="Enter Suffix" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Membership ID</b>
                                                    <div class="input-group">
                                                        <input type="text" name="" id="inputid_memberideoc" class="form-control" style="height:40px" readonly="">
<!--                                                        <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                            <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="">
                                                                <i class="zmdi zmdi-plus"></i>
                                                            </button>
                                                        </span>-->
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:6px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Gender</b>
                                                    <select name="" id="selectid_gendereoc" class="form-control selectpicker" data-live-search="false">
                                                        <optgroup>
                                                            <option value="MALE">MALE</option>
                                                            <option value="FEMALE">FEMALE</option>
                                                        </optgroup>
                                                    </select>
                                                    <p id="selectid_gendereocerror" hidden="true" style="color:red;">Required Field</p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Birthday</b>
                                                    <div class="form-group">
                                                        <input type="text" name="" id="inputid_birthdayeoc" class="form-control datetimepicker" placeholder="Enter Birthday" autocomplete="off" onchange="calculateAge($(this).val());">
                                                        <p id="inputid_birthdayeocerror" hidden="true" style="color:red;">Required Field</p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Age</b>
                                                    <div class="form-group">
                                                        <input type="text" name="" id="inputid_wipxageeoc" class="form-control" placeholder="" data-mask="P000000000A" data-mask-selectonfocus="true" autocomplete="off">
                                                        <p id="inputid_wipxageeocerror" hidden="true" style="color:red;">Required Field</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="tabpanel" class="tab-pane in" id="ProfilingInformation">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Province</b>
                                                    <select name="" id="selectid_provaddeoc" class="form-control selectpicker" data-live-search="true" onchange="onChangeProvinceSelectForAddPxEoc()">
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
                                                    <p id="selectid_provaddeocerror" hidden="true" style="color:red;">Required Field</p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;City/Municipality</b>
                                                    <select name="" id="selectid_citymuneoc" class="form-control selectpicker" data-live-search="true" disabled onchange="onChangeMunicipalSelectForAddPxEoc()">
                                                        <optgroup>
                                                            <option value="">Select from List</option>
                                                        </optgroup>
                                                    </select>
                                                    <p id="selectid_citymuneocerror" hidden="true" style="color:red;">Required Field</p>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:13px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Barangay</b>
                                                    <select name="" id="selectid_barangayeoc" class="form-control selectpicker" data-live-search="true" disabled onchange="onChangeBarangaySelectForAddPxEoc()">
                                                        <optgroup>
                                                            <option value="">Select from List</option>
                                                        </optgroup>
                                                    </select>
                                                    <p id="selectid_barangayeocerror" hidden="true" style="color:red;">Required Field</p>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Street/Purok</b>
                                                    <div class="form-group">
                                                        <input type="text" name="" id="inputid_streeteoc" class="form-control" placeholder="Enter Street/Purok" autocomplete="off" disabled>
                                                        <p id="inputid_streeteocerror" hidden="true" style="color:red;">Required Field</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:7px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Cellphone No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="" id="inputid_cellphoneeoc" class="form-control" placeholder="Enter Cellphone No." autocomplete="off">
                                                        <p id="inputid_cellphoneeocerror" hidden="true" style="color:red;">Required Field</p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Date</b>
                                                    <div class="form-group">
                                                        <input type="text" name="" id="inputid_dateeoc" class="form-control" placeholder="Date" autocomplete="off" readonly value="<?= $currentfulldate ?>">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding-left:30px;padding-right:30px;padding-bottom:20px">
                    <button type="button" class="btn btn-default waves-effect" onclick="hideAddNewWalkinPatientModal()">CLOSE</button>
                    <button type="button" id='buttonid_addwalkinpxeoc' class="btn btn-info waves-effect" onclick="AddNewWalkinPatient()">SAVE</button>
                    <button type="button" id='buttonid_edtwalkinpxeoc' class="d-none btn btn-info waves-effect" onclick="UpdateSelectedWalkinPatient()">UPDATE</button>
                </div>
            </form>
        </div>
    </div>
</div>

