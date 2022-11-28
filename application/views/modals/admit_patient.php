<div class="modal fade" id="admitpatientmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <form id="admit-patient-form" autocomplete="off">
                <input type="hidden" id="inputid_hiddenIDadm" name="inputname_hiddenIDadm">
                
                <p id="inputid_hiddencoman" class="d-none"></p>
                <p id="inputid_hiddenhmoin" class="d-none"></p>
                <p id="inputid_hiddencause" class="d-none"></p>
                
                <input type="hidden" id="hiddenid_pxfnameupdadm">
                <input type="hidden" id="hiddenid_pxmnameupdadm">
                <input type="hidden" id="hiddenid_pxlnameupdadm">
                <input type="hidden" id="hiddenid_pxsuffxupdadm">
                <input type="hidden" id="hiddenid_casenumupdadm">
                <input type="hidden" id="hiddenid_pincodeupdadm">
                <input type="hidden" id="hiddenid_tindadm" name="hiddenname_tindadm">
                
                <input type="hidden" id="textid_deleteindicatorforpxpkgupdateadmedt" name="textname_deleteindicatorforpxpkgupdateadmedt">
                <input type="hidden" id="textid_updateindicatorforpxpkgupdateadmedt" name="textname_updateindicatorforpxpkgupdateadmedt">
                
                <input type="hidden" id="inputid_comanagedataadm" name="inputname_comanagedataadm">
                <input type="hidden" id="inputid_hmoinsurdataadm" name="inputname_hmoinsurdataadm">
                <input type="hidden" id="inputid_causecondataadm" name="inputname_causecondataadm">
                
                <input type="hidden" id="inputid_finalcomanagedataadm" name="inputname_finalcomanagedataadm">
                <input type="hidden" id="inputid_finalcomanagedataupd" name="inputname_finalcomanagedataupd">
                <input type="hidden" id="inputid_finalhmoinsurdataadm" name="inputname_finalhmoinsurdataadm">
                <input type="hidden" id="inputid_finalhmoinsurdataupd" name="inputname_finalhmoinsurdataupd">
                <input type="hidden" id="inputid_finalcausecondataadm" name="inputname_finalcausecondataadm">
                <input type="hidden" id="inputid_finalcausecondataupd" name="inputname_finalcausecondataupd">
                
                <input type="hidden" id="inputid_vipsecuritydataadm" name="inputname_vipsecuritydataadm">
                <input type="hidden" id="inputid_packagemanadataadm" name="inputname_packagemanadataadm">
                <input type="hidden" id="inputid_pckgpatientdataadm" name="inputname_pckgpatientdataadm">
                
                <input type="hidden" id="hiddeninputid_slcodeadm" name="hiddeninputname_slcodeadm" value="">
                <input type="hidden" id="hiddeninputid_tinadm" name="hiddeninputname_tinadm" value="">
                <input type="hidden" id="hiddeninputid_pincodeadm" name="hiddeninputname_pincodeadm" value="">
                <input type="hidden" id="hiddeninputid_pinformatadm" name="hiddeninputname_pinformatadm" value="">
                <input type="hidden" id="hiddeninputid_healrecnoadm" name="hiddeninputname_healrecnoadm" value="">
                <input type="hidden" id="hiddeninputid_lastadmitdateadm" name="hiddeninputname_lastadmitdateadm" value="">
                <input type="hidden" id="hiddeninputid_lastadmittimeadm" name="hiddeninputname_lastadmittimeadm" value="">
                <input type="hidden" id="hiddeninputid_lastdischdateadm" name="hiddeninputname_lastdischdateadm" value="">
                <input type="hidden" id="hiddeninputid_lastdischtimeadm" name="hiddeninputname_lastdischtimeadm" value="">
                
                <input type="hidden" id="hiddeninputid_casecodexadm" name="hiddeninputname_casecodexadm" value="">
                <input type="hidden" id="hiddeninputid_pccodexadm" name="hiddeninputname_pccodexadm" value="<?= $pccodex ?>">

                <input type="hidden" id="hiddenid_confinement_deleteparameter">
                <input type="hidden" id="hiddentextid_deleteparameterforcomanage">
                
                <input type="hidden" id="hiddboxid_hmonameadm" name="hiddboxname_hmonameadm">
                <input type="hidden" id="hiddboxid_hmocodeadm" name="hiddboxname_hmocodeadm">
                <input type="hidden" id="hiddboxid_hmoprioadm" name="hiddboxname_hmoprioadm">
                <input type="hidden" id="hiddboxid_holnameadm" name="hiddboxname_holnameadm">
                <input type="hidden" id="hiddboxid_apprnumadm" name="hiddboxname_apprnumadm">
                
                <div class="d-none" id="">
                    <p id="myFormComanageAdmitAdd"></p>
                    <p id="myFormComanageAdmitEdt"></p>
                    <p id="myFormHMOInsurAdmitAdd"></p>
                    <p id="myFormHMOInsurAdmitEdt"></p>
                    <p id="myFormCauseConAdmitAdd"></p>
                    <p id="myFormCauseConAdmitEdt"></p>
                </div>

                <div class="modal-header" style="margin-bottom:0px;margin-top:10px;padding-bottom:0px;padding-top:0px;">
                    <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                            <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h4 class="title insertadmitpatientheader" id="largeModalLabel" hidden="false">Admit Patients</h4>
                                        <h4 class="title updateadmitpatientheader" id="largeModalLabel" hidden="true">Edit Admitted Patients</h4>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="header">
                                            <h2 id="insertadmitpatientformheader" hidden="false"><strong>Admit Patient</strong> Form</h2>
                                            <h2 id="updateadmitpatientformheader" hidden="true"><strong>Edit Admitted Patient</strong> Form</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:7px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                        <ul class="nav nav-tabs" role="tablist" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#generalinfo" id="clickgeneralid">General<b id="generalerrtabindicator" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#personalinfo" id="clickpersonalid">Profile<b id="profileerrtabindicator" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#admissioninfo" id="clickadmissionid">Admission<b id="admissionerrtabindicator" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#insuranceinfo" id="clickinsuranceid">Insurance<b id="insuranceerrtabindicator" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#otherinfo" id="clickothersid">Others<b id="otherserrtabindicator" style="color:red;padding-left:5px"></b></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group" style="margin-top:10px;">
                                    <div class="relative">
                                        <div class="absolute">
                                            <img class="rounded img-raised" src="<?= base_url('assets/images/px.png'); ?>" 
                                                 height="100" width="100" style="border:7px solid #02bec0;border-radius:2px;top:-20px" 
                                                 alt="" id="patientimguploadforadmpx">
                                        </div>
                                        <div class="absolute">
                                            <button type="button" class="btn btn-primary btn-sm" style="margin:0px;padding-left:7px;padding-right:7px;padding-bottom:2px;padding-top:4px;top:63px;left:-40px" onclick="">
                                                <i class="zmdi zmdi-camera"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="relative">
                                        <div class="absolute">
                                            <button type="button" class="btn btn-sm btn-primary waves-effect"
                                                style="margin-top:85px;width:100px;left:-97px" onclick="patientImageUploadForAdmitPatient()">
                                                BROWSE
                                            </button>
                                            <input type="file" id="openpatientimguploadforadmpx" accept="image/*" 
                                                   style="display:none" onchange="readImageURL(this, 'patientimguploadforadmpx');"/> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-body" style="margin-top:0px;margin-bottom:10px;margin-left:0px;margin-right:0px;padding:0px">
                    <div class="row clearfix" style="margin:0px;padding:0px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="margin:0px;padding:0px">
                            <div class="card" style="margin:0px;padding:0px">
                                <div class="body" style="margin:0px;padding:0px">
                                    <div class="tab-content" style="margin:0px;padding:0px">
                                        <div role="tabpanel" class="tab-pane in active" id="generalinfo" style="margin:0px;padding:0px">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                
                                                <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Account No.</b>
                                                    <div class="form-group">
                                                        <input type="text" id="accountnumberadm" name="inputname_accountnumberadm" class="form-control" placeholder="" readonly>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Px Index No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_pxindexnoadm" id="pxindexnoadm" class="form-control" autocomplete="off" readonly>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Health Record No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_healthrecnoadm" id="healthrecnoadm" class="form-control" placeholder="Enter HRN" data-mask="99-99-99" data-mask-selectonfocus="true" autocomplete="off" required>
                                                        <p id="healthrecnoadmerr" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;SL Code</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_slcodeadm" id="inputid_slcodeadm" class="form-control" autocomplete="off" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Logbook No.</b>
                                                    <div class="form-group" style="margin-bottom:0px;padding-bottom:0px">
                                                        <input type="text" id="casenumberadm" name="inputname_casenumberadm" class="form-control" value="" placeholder="Enter Case No." data-mask="99-99-99" data-mask-selectonfocus="true" autocomplete="off" required>
                                                    </div>
                                                    <p id="casenumberadmerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                
                                                <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Patient Type</b>
                                                    <select name="selectname_patienttypeadm" id="selectid_patienttypeadm" class="show-tick form-control selectpicker" data-live-search="false" onchange="hideShowPatientType()">
                                                        <option value="IPD">IPD</option>
                                                        <option value="OPD">OPD</option>  
                                                    </select>
                                                    <p id="selectid_patienttypeadmerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                
                                                <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                    <b style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;height:10px;">&nbsp;&nbsp;&nbsp;OPD Type</b>
                                                    <div class="input-group">
                                                        <input type="text" name="inputname_opdtypexdataadm" id="inputid_opdtypexdataadm" class="form-control" style="height:40px" readonly="">
                                                        <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                            <button id="opdtypebutton" type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showOPDTypeOprtionModal()">
                                                                <i class="zmdi zmdi-plus"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                                    <p id="inputid_opdtypeadmerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                
                                                <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;<?= ucwords(strtolower($membertypepro["MemberType"])) ?></b>
                                                    <div class="input-group">
                                                        <input type="text" name="inputname_vmembershipadm" id="inputid_vmembershipadm" class="form-control" style="height:40px" readonly="">
                                                        <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                            <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchMembershipModalForAdmission()">
                                                                <i class="zmdi zmdi-plus"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">

                                                <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Admission Type</b>
                                                    <select name="selectname_admixontypeadm" id="admixontypeselectadm" class="show-tick form-control selectpicker" data-live-search="false">
                                                        <option value="Select">Select</option>
                                                    </select>
                                                    <p id="admixontypeselectadmerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                
                                                <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Entry Type</b>
                                                    <div style="padding:0px;margin:0px;border:none">
                                                        <select name="selectname_entrytypeadm" id="selectid_entrytypeadm" class="show-tick form-control selectpicker" data-live-search="false" disabled="true">
                                                            <optgroup>
                                                                <option value="Select">Select from List</option>
                                                                <?php
                                                                    for ($i = 0; $i < count($casetype); $i++) 
                                                                    {
                                                                        echo 
                                                                        "<option value='" . strtoupper($casetype[$i]['casetypedscr']) . "'>"
                                                                            . strtoupper($casetype[$i]['casetypedscr']) .
                                                                        "</option>";
                                                                    }
                                                                ?>   
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                    <p id="inputid_entrytypeadmerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                
                                                <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Station Name</b>
                                                    <select name="selectname_stationnameadm" id="stationnameadm" class="show-tick form-control selectpicker" data-live-search="false">
                                                        <optgroup>
                                                            <option value="Select">Select</option>
                                                            <?php
                                                                for ($i = 0; $i < count($nursestation); $i++) 
                                                                {
                                                                    echo "<option value='" . strtoupper($nursestation[$i]['nurselocations']) . "'>"
                                                                    . strtoupper($nursestation[$i]['nurselocations']) .
                                                                    "</option>";
                                                                }
                                                            ?>   
                                                        </optgroup>
                                                    </select>
                                                    <p id="stationnameadmerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                
                                            </div>
                                        </div>


                                        <div role="tabpanel" class="tab-pane" id="personalinfo">
                                            <div data-toggle="true" class="panel-group" id="accordion">
                                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseProfileCollapseDiv()" id="prof">
                                                            Profile
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseContactCollapseDiv()" id="cont">
                                                            Contact <b id="contacterrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseLocationCollapseDiv()" id="loca">
                                                            Location <b id="locationerrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseFamilyCollapseDiv()" id="fami">
                                                            Family
                                                        </button>
                                                    </div>
                                                </div>
                                                <div id="profileCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:4px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Last Name</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_lastnameadm" id="lastnameadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;First Name</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_firstnameadm" id="firstnameadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Suffix</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_suffixadm" id="suffixadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Middle Name</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_middlenameadm" id="middlenameadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Gender</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_genderadm" id="genderadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Nationality</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_nationalityadm" id="nationalityadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Age</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_ageadm" id="inputid_ageadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Birthday</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_birthdayadm" id="birthdayadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="contactCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:2px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Religion</b>
                                                            <select name="selectname_religionadm" id="religionselectadm" class="show-tick form-control selectpicker" data-live-search="true">
                                                                <optgroup>
                                                                    <option value="Select">Select</option>
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
                                                            <p id="religionselectadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Civil Status</b>
                                                            <select id="civilstatusselectadm" name="selectname_civilstatusadm" class="show-tick form-control selectpicker" data-live-search="false" onchange="">
                                                                <optgroup>
                                                                    <option value="Select">Select</option>
                                                                    <option value="CHILD">CHILD</option>
                                                                    <option value="SINGLE">SINGLE</option>
                                                                    <option value="MARRIED">MARRIED</option>
                                                                    <option value="WIDOWED">WIDOWED</option>
                                                                    <option value="SEPARATED">SEPARATED</option>   
                                                                </optgroup>
                                                            </select>
                                                            <p id="civilstatusselectadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Passport No.</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_passportnoadm" id="passportnoadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:10px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Mobile No.</b>
                                                            <div class="form-group">
                                                                <input type="number" name="inputname_mobilenoadm" id="mobilenoadm" class="form-control" autocomplete="off" readonly="">
                                                                <p id="mobilenoadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Landline</b>
                                                            <div class="form-group">
                                                                <input type="number" name="inputname_contactnoadm" id="contactnoadm" class="form-control" autocomplete="off" readonly="">
                                                                <p id="contactnoadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Email Address</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_emailadm" id="emailadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="locationCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:2px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Province</b>
                                                            <select id="provinceselectadm" name="inputname_provinceadm" class="show-tick form-control selectpicker" data-live-search="true" onchange="onChangeProvinceSelectForAdmitPx()">
                                                                <optgroup>
                                                                    <option value="Select">Select from List</option>
                                                                    <?php
                                                                    for ($i = 0; $i < count($provincelistx); $i++) {
                                                                        echo "<option value='" . strtoupper($provincelistx[$i]['PROV_NAME']) . "-" . strtoupper($provincelistx[$i]['PROVINCE']) . "'>" . strtoupper($provincelistx[$i]['PROV_NAME']) . "</option>";
                                                                    }
                                                                    ?>
                                                                </optgroup>
                                                            </select>
                                                            <p id="provinceselectadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12" id="citydivadm">
                                                            <b>&nbsp;&nbsp;&nbsp;City/Municipality</b>
                                                            <select id="selectidcitymuniadm" name="selectname_citymuniadm" class="show-tick form-control selectpicker" data-live-search="true" onchange="onChangeMunicipalitySelectForAdmitPx()">
                                                                <optgroup>
                                                                </optgroup>
                                                            </select>
                                                            <p id="selectidcitymuniadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12" id="zipcodedivadm">
                                                            <b>&nbsp;&nbsp;&nbsp;Zip Code</b>
                                                            <div class="form-group">
                                                                <input type="text" id="zipcodexadm" name="inputname_zipcodeadm" class="form-control" autocomplete="off" readonly>
                                                                <p id="zipcodexadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:10px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" id="brgydivadm">
                                                            <b>&nbsp;&nbsp;&nbsp;Barangay</b>
                                                            <select name="selectname_barangayadm" id="selectid_barangayadm"  class="show-tick form-control selectpicker" data-live-search="true" onchange="onChangeBarangaySelectForAdmitPx()">
                                                                <optgroup>
                                                                </optgroup>
                                                            </select>
                                                            <p id="selectid_barangayadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>

                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" id="purokdivadm">
                                                            <b>&nbsp;&nbsp;&nbsp;Res.No./St/Purok</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_addressadm" id="addressadm" class="form-control" autocomplete="off" required>
                                                                <p id="addressadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="familyCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:4px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Fathers' Name</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_fatheradm" id="fatheradm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Fathers' Nationality</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_fathernationadm" id="fathernationalityadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Fathers' Address</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_fatheradrsadm" id="fatheradrsadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Mothers' Name</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_motheradm" id="motheradm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Mothers' Nationality</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_mothernationadm" id="mothernationalityadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Mothers' Address</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_motheradrsadm" id="motheradrsadm" class="form-control" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div role="tabpanel" class="tab-pane" id="admissioninfo">
                                            <div data-toggle="true" class="panel-group" id="accordion">
                                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseGuardianCollapseDiv()" id="guar">
                                                            Guardian  <b id="guardianerrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseAdmissionCollapseDiv()" id="admi">
                                                            Admission  <b id="admissionerrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseAttendantCollapseDiv()" id="atte">
                                                            Attendant  <b id="attendanterrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseAccomodationCollapseDiv()" id="acco">
                                                            Accommodation  <b id="accomodaerrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div id="guardianCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Watcher/Guardian</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_watchernameadm" id="watchernameadm" class="form-control" placeholder="Enter Watcher Name" autocomplete="off">
                                                                <p id="watchernameadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;DOB</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_watcherbirthadm" id="watcherbirthadm" class="form-control datetimepicker" placeholder="Enter Birthdate" required onchange="calculateAge($(this).val());">
                                                                <p id="watcherbirthadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Relationship to px</b>
                                                            <select name="selectname_reltopatientadm" id="reltopatientadm" class="show-tick form-control selectpicker" data-live-search="false">
                                                                <optgroup>
                                                                    <option value="Select">Select from List</option>
                                                                    <?php
                                                                        for ($i = 0; $i < count($relatetokin); $i++) {
                                                                            echo 
                                                                            "<option value='".strtoupper($relatetokin[$i]["relationship"])."'>"
                                                                                .strtoupper($relatetokin[$i]["relationship"]).
                                                                            "</option>";
                                                                        }
                                                                    ?> 
                                                                </optgroup>
                                                            </select>
                                                            <p id="reltopatientadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:10px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Watcher Contact</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_guardiannumadm" id="guardiannumadm" class="mirror form-control" placeholder="Enter Watcher Contact" style="height:40px" autocomplete="off" data-mask="99-999-999999">
                                                                <p id="guardiannumadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Billing CP</b>
                                                            <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                                <input type="text" name="inputname_billingrecipientadm" id="billingrecipientadm" class="form-control mirror" placeholder="Enter Billing Contact" style="height:40px" autocomplete="off" data-mask="99-999-999999">
                                                                <span class="input-group-addon" id="billingcpspanid" style="padding:0px;border-left:transparent">
                                                                    <button type="button" id="billingcpbtn" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showBillingCPInfoModal()">
                                                                        <i class="zmdi zmdi-info-outline"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                            <p id="billingrecipientadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Px CP Recipient</b>
                                                            <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                                <input type="text" name="inputname_patientrecipientadm" id="patientrecipientadm" class="form-control" style="height:40px" autocomplete="off">
                                                                <span class="input-group-addon" id="pxcprecipientspanid" style="padding:0px;border-left:transparent">
                                                                    <button type="button" id="pxcprecipientbtn" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showPatientCPInfoModal()">
                                                                        <i class="zmdi zmdi-info-outline"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                            <p id="patientrecipientadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="admissionCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:4px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Date of Admission</b>
                                                            <div class="form-group" id="admitdate_refreshdiv">
                                                                <input type="text" name="inputname_admissiondateadm" id="admissiondateadm" class="form-control" value="<?= strtoupper($serverDate) ?>" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Time of Admission</b>
                                                            <div class="form-group" id="admittime_refreshdiv">
                                                                <input type="text" name="inputname_admissiontimeadm" id="admissiontimeadm" class="form-control" value="<?= strtoupper($serverTime) ?>" autocomplete="off" readonly="">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:10px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Weight</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_weightadm" id="weightadm" class="form-control" autocomplete="off" required>
                                                                <p id="weightadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Cautions</b>
                                                            <select name="selectname_cautionsadm" id="cautionsadm" class="show-tick form-control selectpicker" data-live-search="false">
                                                                <optgroup class="cautions_option">
                                                                    <option class="option-class" value="Select">Select from List</option>
                                                                    <option class="option-class" value="NONE">NONE</option>
                                                                    <option class="option-class" value="FOR ISOLATION">FOR ISOLATION</option>
                                                                    <option class="option-class" value="TRANSMISSABLE">TRANSMISSABLE</option> 
                                                                    <option class="option-class" value="REPORTABLE">REPORTABLE</option>
                                                                    <option class="option-class" value="HIGH RISK">HIGH RISK</option>
                                                                    <option class="option-class" value="OTHERS">OTHERS</option> 
                                                                </optgroup>
                                                            </select>
                                                            <p id="cautionsadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;TB-Dots Status</b>
                                                            <select name="selectname_tbdotsstatusadm" id="inputid_tbdotsstatusadm" class="show-tick form-control selectpicker" data-live-search="false">
                                                                <optgroup class="cautions_option">
                                                                    <option class="option-class" value="Select">Select from List</option>
                                                                    <option class="option-class" value="N/A">N/A</option>
                                                                    <option class="option-class" value="DIAGNOSED">DIAGNOSED</option>
                                                                    <option class="option-class" value="PRESSUMPTIVE">PRESSUMPTIVE</option>    
                                                                    <option class="option-class" value="ON-TREATMENT">ON-TREATMENT</option>  
                                                                </optgroup>
                                                            </select>
                                                            <p id="inputid_tbdotsstatusadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Link Account</b>
                                                            <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                                <input type="text" name="inputname_linkaccountadm" id="linkaccountadm" class="form-control" style="height:40px" readonly="">
                                                                <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                                    <button type="button" id="buttonid_linkacctadm" class="btn btn-warning btn-round" style="margin:0px;height:38px" onclick="alert('Under Development!')">
                                                                        <i class="zmdi zmdi-plus"></i>
                                                                    </button>
                                                                </span>
                                                                <p id="linkaccountadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="attendantCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Attending Doctor</b>
                                                            <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                                <input type="text" name="selectname_attendingdoctoradm" id="attendingdoctoradm" class="form-control" style="height:40px" readonly="">
                                                                <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                                    <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchDoctorModalForAdmission()">
                                                                        <i class="zmdi zmdi-plus"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                            <p id="attendingdoctoradmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Co-Management</b>
                                                            <button type="button" onclick="showCoManagementModalForInsertAdmission()" id="InsertAdmissionButtonForComanagement" class="btn btn-primary btn-round col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <b>CO-MANAGED</b>
                                                            </button>
                                                            <button type="button" onclick="showCoManagementModalForUpdateAdmission()" id="UpdateAdmissionButtonForComanagement" class="btn btn-primary btn-round col-lg-12 col-md-12 col-sm-12 col-xs-12 d-none">    
                                                                <b>CO-MANAGED</b>
                                                            </button>
                                                            <p id="inputid_finalcomanagedataadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>

                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:10px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Attending Nurse</b>
                                                            <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                                <input type="text" name="selectname_attendingnurseadm" id="attendingnurseadm" class="form-control" style="height:40px" readonly="">
                                                                <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                                    <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchNurseModalForAdmission()">
                                                                        <i class="zmdi zmdi-plus"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                            <p id="attendingnurseadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Nurse In-Charge</b>
                                                            <select name="inputname_nurseinchargeadm" id="nurseinchargeadm" class="show-tick form-control selectpicker" data-live-search="true">
                                                                <optgroup>
                                                                    <option value="Select">Select</option>
                                                                    <?php
                                                                    for ($i = 0; $i < count($nurseslisting); $i++) {
                                                                        echo 
                                                                        "<option value='" . strtoupper($nurseslisting[$i]['docname']) . ' - ' . strtoupper($nurseslisting[$i]['docrefno']) . "'>"
                                                                            . strtoupper($nurseslisting[$i]['docname']) . ' - ' . strtoupper($nurseslisting[$i]['docrefno']) .
                                                                        "</option>";
                                                                    }
                                                                    ?>  
                                                                </optgroup>
                                                            </select>
                                                            <p id="nurseinchargeadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="accomodationCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Admission Type</b><small id="disableforopdindicator" style="padding-left:5px;color:orange;font-size:12px;"></small>
                                                            <div class="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                                                <div class="radio">
                                                                    &nbsp;<input type="radio" name="radioname_admissiontypeadm" id="radioid_normaltypeadm" value="NORMAL" checked="" onchange="$('#admissiontypehiddentext').val('Normal')"><label for="radioid_normaltypeadm">Normal Admission</label>&nbsp;&nbsp;&nbsp;
                                                                    &nbsp;<input type="radio" name="radioname_admissiontypeadm" id="radioid_emergencytypeadm" value="EMERGENCY" onchange="$('#admissiontypehiddentext').val('Emergency')"><label for="radioid_emergencytypeadm">Emergency Cases</label>
                                                                </div>
                                                            </div>
                                                            <input type="hidden" id="admissiontypehiddentext" name="inputname_admissiontypehiddentext">
                                                        </div>
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Accommodation</b>
                                                            <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                                <input type="text" name="selectname_roomadm" id="selectid_roomadm" class="form-control" style="height:40px" readonly="">
                                                                <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                                    <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showSearchRoomModalForAdmission()">
                                                                        <i class="zmdi zmdi-plus"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                            <input type="hidden" name="selectname_roomadmhid" id="selectid_roomadmhid">
                                                            <p id="selectid_roomadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Room Info</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_roominfoadm" id="inputid_roominfoadm" class="form-control" autocomplete="off" readonly>
                                                                <p id="inputid_roominfoadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Ancillary Rate</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_ancillaryrateadm" id="inputid_ancilaryadm" class="form-control" autocomplete="off" readonly>
                                                                <p id="inputid_ancilaryadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Room Rate</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_roomrateadm" id="inputid_roomrateadm" class="form-control" autocomplete="off" readonly>
                                                                <p id="inputid_roomrateadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Room CR</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_roomcradm" id="inputid_roomcredadm" class="form-control" autocomplete="off" readonly>
                                                                <p id="inputid_roomcredadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div role="tabpanel" class="tab-pane" id="insuranceinfo">
                                            <div data-toggle="true" class="panel-group" id="accordion">
                                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapsePhilhealthandHMOCollapseDiv()" id="phhm">
                                                            Philhealth/HMO <b id="philhmoerrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseClassificationCollapseDiv()" id="pxcl">
                                                            Classification <b id="pxclasserrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapsePackagesandVIPCollapseDiv()" id="vipm">
                                                            Packages/VIP <b id="pckgviperrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseVisualInfusionCollapseDiv()" id="vips">
                                                            VIP Score <b id="phlebitiserrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <div id="philhealthandHMOCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Membership</b>
                                                            <select name="selectname_phmembershipadm" id="phmembershipselectadm" class="show-tick form-control selectpicker" data-live-search="false" onchange="onchangePHICType()">
                                                                <optgroup>
                                                                    <option value="Select">Select</option>
                                                                    <?php
                                                                    for ($i = 0; $i < count($phmembershipx); $i++) {
                                                                        echo "<option value='".strtoupper($phmembershipx[$i]["phictype"]).":".strtoupper($phmembershipx[$i]["mneomonic"])."'>".strtoupper($phmembershipx[$i]["phictype"]).":".strtoupper($phmembershipx[$i]["mneomonic"])."</option>";
                                                                    }
                                                                    ?> 
                                                                </optgroup>
                                                            </select>
                                                            <p id="phmembershipselectadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" data-toggle="tooltip" data-placement="left" title="Double click input box if patient is the member">
                                                            <b>&nbsp;&nbsp;&nbsp;Member Name</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_membernameadm" id="phmembernameadm" class="form-control" autocomplete="off" required ondblclick="doubleclickPHICMemberNameTextbox()">
                                                                <p id="phmembernameadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;MDR Ref. No.</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_mdfrefnumadm" id="inputid_mdfrefnumadm" class="form-control" autocomplete="off">
                                                                <p id="inputid_mdfrefnumadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;PHIC No.</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_phicnumberadm" id="phicnumberadm" class="form-control" autocomplete="off" required>
                                                                <p id="phicnumberadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Relation to Member</b>
                                                            <select name="selectname_reltomemberadm" id="reltomemberadm" class="show-tick form-control selectpicker" data-live-search="false">
                                                                <optgroup>
                                                                    <option class="option-class" value="Select">Select</option>
                                                                    <option class="option-class" value="CHILD">CHILD</option>
                                                                    <option class="option-class" value="PARENT">PARENT</option>
                                                                    <option class="option-class" value="SPOUSE">SPOUSE</option>
                                                                </optgroup>
                                                            </select>
                                                            <p id="reltomemberadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;HMO/Insurances</b>
                                                            <button type="button" id="showHMOManagementModalButtonForInsertAdmission" onclick="showHMOManagementModalForInsertAdmission();" class="btn btn-primary btn-round col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <b>MANAGE HMO</b>
                                                            </button>
                                                            <button type="button" id="showHMOManagementModalButtonForUpdateAdmission" onclick="showHMOManagementModalForUpdateAdmission();" class="btn btn-primary btn-round col-lg-12 col-md-12 col-sm-12 col-xs-12 d-none">
                                                                <b>MANAGE HMO</b>
                                                            </button>
                                                            <p id="inputid_finalhmoinsurdataadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="ClassificationCollapse" class="panel-collapse collapse in show">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Px Classification</b>
                                                            <select name="selectname_patientclassadm" id="patientclassadm" class="show-tick form-control selectpicker" onchange='hideShowPatientClass()'>
                                                                <option value="Select">Select</option>
                                                                <?php
                                                                    for ($i = 0; $i < count($patientclass); $i++) {
                                                                        echo 
                                                                        "<option value='".strtoupper($patientclass[$i]["Classificationdscr"])."'>"
                                                                            .strtoupper($patientclass[$i]["Classificationdscr"]).
                                                                        "</option>";
                                                                    }
                                                                ?> 
                                                            </select>
                                                            <p id="patientclassadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12" id="infacility-level">
                                                            <div class="radio" style="margin-top:10px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                <input type="radio" name="radionameinfacility" id="radioid_admissionadm" value="option1" disabled="true" onchange="onchangeadmissioncheckbox()">
                                                                <label for="radioid_admissionadm">
                                                                    Admission Type
                                                                </label>
                                                            </div>
                                                            <div class="radio" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                <input type="radio" name="radionameinfacility" id="radioid_infacilityadm" value="option2" disabled="true" onchange="onchangeinfacilitycheckbox()">
                                                                <label for="radioid_infacilityadm">
                                                                    In-facility Delivery
                                                                </label>
                                                            </div>
                                                            <input type="hidden" id="hiddboxid_infalityvalueadm" name="hiddboxname_infalityvalueadm" value="0">
                                                            <p id="inputid_obgyneprocedureadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12" id="obprocedurehide">
                                                            <b>&nbsp;&nbsp;&nbsp;OB-G Procedure</b>
                                                            <select name="selectname_obgyneprocedureadm" id="inputid_obgyneprocedureadm" class="show-tick form-control selectpicker" data-live-search="false" disabled="true">
                                                                <optgroup>
                                                                    <option value="Select">Select</option>
                                                                    <option class="option-class" value="NORMAL">NORMAL</option>
                                                                    <option class="option-class" value="CEASAREAN">CEASAREAN</option>   
                                                                    <option class="option-class" value="OTHERS">OTHERS</option>  
                                                                </optgroup>
                                                            </select>
                                                            <p id="inputid_obgyneprocedureadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        

                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12 d-none" id="adultpediahide">
                                                            <b>&nbsp;&nbsp;&nbsp;Adult/Pedia</b>
                                                            <select name="selectname_adultpediaadm" id="inputid_adultpediaadm" class="show-tick form-control selectpicker" data-live-search="false" disabled="true">
                                                                <optgroup>
                                                                    <option value="Select">Select</option>
                                                                    <option class="option-class" value="ADULT">ADULT</option>
                                                                    <option class="option-class" value="PEDIA">PEDIA</option>    
                                                                </optgroup>
                                                            </select>
                                                        </div>
                                                        
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12 d-none" id="pathologyhide">
                                                            <b>&nbsp;&nbsp;&nbsp;Pathologic Case</b>
                                                            <div class="checkbox">
                                                                &nbsp;&nbsp;&nbsp;<input name="chekboxname_pathology" id="pathologychkboxidadm" type="checkbox" disabled="" onchange="if ($(this).is(':checked')) { $('#inputid_pathologyadm').val('PATHOLOGY'); } else { $('#inputid_pathologyadm').val('NON-PATHOLOGY'); }">
                                                                <label for="pathologychkboxidadm" id="pathologylabelid">
                                                                       Pathology
                                                                </label>
                                                            </div>
                                                            <input type="hidden" name="inputname_pathologyadm" id="inputid_pathologyadm">
                                                        </div>
                                                        
                                                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12" id="motherhide">
                                                            <b>&nbsp;&nbsp;&nbsp;Mother</b>
                                                            <div class="input-group">
                                                                <input type="text" name="textname_motheradm" id="textid_motheradm" class="form-control" style="height:40px" readonly="" disabled="">
                                                                <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                                    <button class="btn btn-warning btn-round" id="buttonid_motheradm" type='button' style="margin:0px;height:38px" onclick="alert('Under Development!')" disabled="">
                                                                        <i class="zmdi zmdi-face"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                            <p id="inputid_finalhmoinsurdataadmerr" style="color:red;padding-left:15px"></p>
                                                        </div>
<!--                                                    </div>
                                                    <div class="row clearfix" id="gravidahide" style="margin-top:0px;padding-top:0px;margin-bottom:10px;padding-bottom:0px;padding-left:30px;padding-right:30px">-->
                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 d-none" id="othershide">
                                                            <b>&nbsp;&nbsp;&nbsp;Others</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_othersadm" id="inputid_othersadm" class="form-control" autocomplete="off" disabled="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12" id="lmpdatehide">
                                                            <b>&nbsp;&nbsp;&nbsp;LMP DATE</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_lmpdateadm" id="inputid_lmpdateadm" class="form-control datetimepicker" autocomplete="off" disabled="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12" id="gravidadiv">
                                                            <b>&nbsp;&nbsp;&nbsp;GRAVIDA</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_gravidaadm" id="gravidaadm" class="form-control" autocomplete="off" disabled="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12" id="paradiv">
                                                            <b>&nbsp;&nbsp;&nbsp;PARA</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_paraadm" id="paraadm" class="form-control" autocomplete="off" disabled="">
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;ABORTION</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_abortionadm" id="abortionadm" class="form-control" autocomplete="off" disabled="">
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;IUFD</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_iufdadm" id="iufdadm" class="form-control" autocomplete="off" disabled="">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;DIED</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_diedadm" id="diedadm" class="form-control" autocomplete="off" disabled="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div id="PackagesandVIPCollapse" class="panel-collapse collapse in show">
                                                    <div class="row" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Spouse Name</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_spousenameadm" id="inputid_spousenameadm" class="form-control" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Spouse Birthday</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_spousebirthadm" id="inputid_spousebirthadm" class="form-control datetimepicker" placeholder="Enter Birthdate" required onchange="calculateAge($(this).val());">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Referred By</b>
                                                            <select name="selectname_hospcareinsadm" id="selectid_hospcareinsadm" class="show-tick form-control selectpicker" data-live-search="true">
                                                                <optgroup>
                                                                    <option class="option-class" value="Select">Select</option>  
                                                                    <?php
                                                                    for ($i = 0; $i < count($hospitalfromz); $i++) {
                                                                        echo "<option value='" . strtoupper($hospitalfromz[$i]["refno"]) . "'>" . strtoupper($hospitalfromz[$i]["Hospitalx"]) . "</option>";
                                                                    }
                                                                    ?>
                                                                </optgroup>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="row" style="margin-top:0px;padding-top:0px;margin-bottom:10px;padding-bottom:0px;padding-left:30px;padding-right:30px">    
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Credit Max Limit</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_creditmaxlimitadm" id="inputid_creditmaxlimitadm" class="form-control" autocomplete="off" readonly>
                                                                <p id="inputid_creditmaxlimitadmerr" style="color:red;padding-left:15px"></p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Package Overview </b>
                                                            <input type="text" name="textname_packageacctnoadm" id="packageacctnoadm" class="form-control d-none" readonly="">
                                                            <div class="input-group">
                                                                <input type="text" name="selectname_packageoverviewadm" id="packageoverviewadm" class="form-control" style="height:40px" readonly="">
                                                                <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                                    <button class="btn btn-primary btn-round" type='button' style="margin:0px;height:38px" onclick="showPackageManagementModalForAdmitPatient()">
                                                                        <i class="zmdi zmdi-plus"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Security Management </b>
                                                            <button type="button" class="btn btn-primary btn-round col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick="showSecurityManagementModalForAdmission()">
                                                                <b>VIP/Security Risk</b>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div id="VisualInfusionCollapse" class="panel-collapse collapse in show">
                                                    <div class="row" style="margin-top:0px;padding-top:0px;margin-bottom:10px;padding-bottom:0px;padding-right:30px;padding-left:30px">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;width:70%;float:left;text-align:right">
                                                                <b style="margin-right:15px;margin-top:0px;">Visual Infusion of Phlebitis (VIP) Score</b>
                                                            </div>
                                                            <div style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;width:30%;float:right;text-align:left">
                                                                <input type="number" id="numboxid_vipscore" name="numboxname_vipscore" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control float-right" value="1" placeholder="1">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-right:35px;padding-left:35px">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <center><u><b>VITAL SIGNS UPON ADMISSION</b></u></center>
                                                        </div>
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div class="row clearfix" style="border-radius:20px;border:1px solid #E1E3E3;margin-left:0px;margin-right:0px;padding-bottom:15px;padding-top:7px">
                                                                <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                                    <center><b>BP NM</b></center>
                                                                    <input type="number" name="textboxname_bpnumeratoradm" id="textboxid_bpnumeratoradm" placeholder="100" class="form-control" autocomplete="off" data-mask="999">
                                                                </div>
                                                                <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12" style="border-left:1px solid black">
                                                                    <center><b>BP DM</b></center>
                                                                    <input type="number" name="textboxname_bpdenominatoradm" id="textboxid_bpdenominatoradm" placeholder="100" class="form-control" autocomplete="off" data-mask="999">
                                                                </div>
                                                                <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                                    <center><b>TEMP[F]</b></center>
                                                                    <input type="text" name="textboxname_bodytemperatureadm" id="textboxid_bodytemperatureadm" class="form-control" placeholder="0.00" data-mask="9999.99" data-mask-selectonfocus="true">
                                                                </div>
                                                                <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                                    <center><b>RR</b></center>
                                                                    <input type="number" name="textboxname_respiratoryrateadm" id="textboxid_respiratoryrateadm" placeholder="0" class="form-control" autocomplete="off" data-mask="999">
                                                                </div>
                                                                <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                                    <center><b>PR</b></center>
                                                                    <input type="number" name="textboxname_pulserateadm" id="textboxid_pulserateadm" placeholder="0" class="form-control" autocomplete="off" data-mask="999">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div role="tabpanel" class="tab-pane" id="otherinfo">
                                            <div data-toggle="true" class="panel-group" id="accordion">
                                                <div style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;border:0px" id="otherinfoipd">
                                                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px">
                                                            <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseComplaintsCollapseDiv()" id="comp">
                                                                Complaints <b id="complainterrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                            </button>
                                                        </div>
                                                        <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px">
                                                            <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseDiagnosisCollapseDiv()" id="diag">
                                                                Diagnosis <b id="diagnosiserrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                            </button>
                                                        </div>
                                                        <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px">
                                                            <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseDietaryCollapseDiv()" id="diet">
                                                                Dietary Guide <b id="dietguideerrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                            </button>
                                                            <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12 d-none" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseImpressionCollapseDivOPD()" id="dietopd">
                                                                Impression <b id="impresopderrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                            </button>
                                                        </div>
                                                        <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px">
                                                            <button class="btn btn-raised btn-primary btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" type="button" data-toggle="collapse" data-parent="#accordion" onclick="collapseConfinementCollapseDiv()" id="conf">
                                                                Confinement <b id="cnfinemnterrcolapseindicator" style="color:red;padding-left:5px"></b>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div id="ComplaintsIPDCollapse" class="panel-collapse collapse in show" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="row clearfix" style="margin-top:15px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:35px;padding-right:35px">
                                                            <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12" id="reasonhide" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                                <b>&nbsp;&nbsp;&nbsp;</b><b id="textid_reasontext">Reason of Admission</b>
                                                                <div class="well" style="margin-top:10px;"> 
                                                                    <textarea name="textareaname_admitreasonadm" id="admissionreasonadm" class="form-control m-b-20" rows="4" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                                    <p id="admissionreasonadmerr" style="color:red;padding-left:15px"></p>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                                <b></b><b id="">Minor OR</b>
                                                                <div class="checkbox" style="margin-top:10px">
                                                                    <input name="chckboxname_forminororadm" id="chckboxid_forminororadm" type="checkbox" onchange="if ($(this).is(':checked')) { $('#textboxid_forminororadm').val(1); } else { $('#textboxid_forminororadm').val(0); }">
                                                                    <label id="textid_minorortext" for="chckboxid_forminororadm">
                                                                        For Minor OR
                                                                    </label>
                                                                </div>   
                                                                <input type="hidden" id="textboxid_forminororadm" name="textboxname_forminororadm">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="DiagnosisIPDCollapse" class="panel-collapse collapse in show" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="row clearfix" style="margin-top:15px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:35px;padding-right:35px">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="addiagnoshide" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                                <b>&nbsp;&nbsp;&nbsp;</b><b id="textid_admitdiagtext">Admitting Diagnosis</b>
                                                                <div class="well">
                                                                    <textarea name="textareaname_admitdiagnosadm" id="admittingdiagnosisadm" class="form-control m-b-20" rows="4" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:20px;margin-bottom:0px;margin-top:10px"></textarea>
                                                                    <p id="admittingdiagnosisadmerr" style="color:red;padding-left:15px"></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="DietaryIPDCollapse" class="panel-collapse collapse in show" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="row clearfix" style="margin-top:10px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:35px;padding-right:35px">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="dietaryhide" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                                <div class="well">
                                                                    <textarea name="textareaname_dietaryviewadm" id="dietaryviewadm" class="form-control m-b-20" rows="4" style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                                    <textarea name="textareaname_dietaryadm" id="dietaryadm" class="form-control m-b-20 d-none" rows="4" style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px" readonly=""></textarea>
                                                                    <p id="dietaryadmerr" style="color:red;padding-left:15px"></p>
                                                                </div>
                                                                <button type="button" class="btn btn-raised btn-info btn-round waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick="show_dietary_modal()" style="margin-top:0px">DIETARY GUIDE</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div id="ImpressionOPDCollapse" class="panel-collapse collapse in show d-none" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="row clearfix" style="margin-top:25px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:35px;padding-right:35px">
                                                            <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                                                                <div class="well"> 
                                                                    <textarea name="textareaname_impressionadm" id="impressionopdadm" class="form-control m-b-20" rows="4" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                                    <p id="impressionopdadmerr" style="color:red;padding-left:15px"></p>
                                                                    <input type="hidden" id="hiddboxid_phiccaserefnoadm" name="hiddboxname_phiccaserefnoadm">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                                <b>&nbsp;&nbsp;&nbsp;ICD-10</b>
                                                                <div class="input-group">
                                                                    <input type="text" name="textboxname_icd10adm" id="textboxid_icd10adm" class="form-control" style="height:40px" readonly="">
                                                                    <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                                                        <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="showDiagwithICD10RVSModal()">
                                                                            <i class="zmdi zmdi-plus"></i>
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="ConfinementIPDCollapse" class="panel-collapse collapse in show" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                        <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:35px;padding-right:35px">
                                                            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-6" style="padding-bottom:0px;padding-top:10px;margin-bottom:0px;margin-top:0px">
                                                                <b  style="margin-top:10px;" id="textid_causeconfine">Causes of Confinement</b>
                                                            </div>
                                                            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-6" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                                <button type="button" onclick="showICD10GroupingManagementModal()" id="showDiagnosisManagementModalButtonForAdmissionInsert" class="btn btn-sm btn-raised btn-success waves-effect float-right"><i class="zmdi zmdi-plus"></i></button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <button type="button" onclick="showICD10GroupingManagementModal()" id="showDiagnosisManagementModalButtonForAdmissionUpdate" class="btn btn-sm btn-raised btn-success waves-effect float-right d-none"><i class="zmdi zmdi-plus"></i></button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="selectCausesOfConfinementForDeleteAdmAdd()" id="selectCausesOfConfinementButtonForDeleteAdmAdd" class="btn btn-sm btn-raised btn-danger waves-effect float-right"><i class="zmdi zmdi-minus"></i></button>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="selectCausesOfConfinementForDeleteAdmAdd()" id="selectCausesOfConfinementButtonForDeleteAdmEdt" class="btn btn-sm btn-raised btn-danger waves-effect float-right d-none"><i class="zmdi zmdi-minus"></i></button>
                                                            </div> 
                                                        </div>
                                                        <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:35px;padding-right:35px">
                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="confinehide" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                                <div class="well" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                                    <div class="tab-pane table-responsive active" id="All" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px">
                                                                        <table class="table table-bordered table-striped table-hover" id="causesof-confinement-table" style="margin-bottom:0px">
                                                                            <thead>
                                                                                <tr>   
                                                                                    <th id="table-head-no">No.</th>
                                                                                    <th id="table-head-namecauses">Categorized&nbsp;&nbsp;Diagnosis</th>
                                                                                    <th id="table-head-action">ICD</th>
                                                                                    <th id="table-head-action">DOH&nbsp;&nbsp;ICD</th>
                                                                                    <th id="table-head-action">DOH&nbsp;&nbsp;Ref.</th>
                                                                                    <th id="table-head-namecauses">Grouping</th>
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
                                                            <p id="inputid_finalcausecondataadmerr" style="color:red;padding-left:15px"></p>
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
                    <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">

                        </div>
                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect" onclick="hideAdmitPatientModal()" style="margin-top:0px" id="hideadmitpxmodalbtnid">CLOSE</button>
                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect d-none" onclick="hideEditAdmitPatientModal()" style="margin-top:0px" id="hideeditadmitpxmodalbtnid">CLOSE</button>
                        </div>
                        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-info waves-effect admitPatientButton" onclick="validateAdmitPatientForm()" id="admitPatientButton" style="margin-top:0px">ADMIT PATIENT</button>
                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning waves-effect admitPatientButton d-none" onclick="validateUpdateAdmitPatient()" id="editadmitPatientButton" style="margin-top:0px">UPDATE PATIENT</button>
                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-info waves-effect admitPatientButton d-none" onclick="validateUpdateQuickAdmitPatient()" id="editquickadmitPatientButton" style="margin-top:0px">UPDATE</button>
                        </div>
                    </div>
                </div>
                    
<!--                <div class="modal-footer" style="padding-left:30px;padding-right:30px;padding-bottom:20px">


                </div>-->
            </form>
        </div>
    </div>
</div>

























