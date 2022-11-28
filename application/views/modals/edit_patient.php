<!--<div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
<div class="modal fade" id="editpatientsmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <form id="update-patient-form" autocomplete="off">
            <div class="modal-content">
                <div class="modal-header" style="margin-bottom:0px;padding-bottom:0px">
                    <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                            <div class="col-lg-10 col-md-6 col-sm-6 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h4 class="title" id="largeModalLabel">Edit Patient</h4>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="header">
                                                <h2><strong>Edit Patient</strong> Form</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                        <ul class="nav nav-tabs" role="tablist" style="margin-top:0px;padding-top:0px;margin-bottom:5px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                                <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#GeneralInformationedt" id="anchorid_forgeneraltabedt">General<b id="generalerrtabindicatoredt" style="color:red;padding-left:5px"></b></a></li>
                                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#ProfilingInformationedt" id="anchorid_forprofiletabedt">Profile<b id="profileerrtabindicatoredt" style="color:red;padding-left:5px"></b></a></li>
                                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#AccountInformationedt" id="anchorid_foraccounttabedt">Account<b id="accounterrtabindicatoredt" style="color:red;padding-left:5px"></b></a></li>
                                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#OtherInformationedt" id="anchorid_forotherstabedt">Others<b id="otherserrtabindicatoredt" style="color:red;padding-left:5px"></b></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <div class="relative">
                                        <div class="absolute">
                                            <img class="rounded img-raised" src="<?= base_url('assets/images/px.png'); ?>" 
                                                height="100" width="100" style="border:7px solid #02bec0;border-radius:2px;top:-20px" 
                                                alt="" id="patientimguploadforedtpx">
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
                                                style="margin-top:85px;width:100px;left:-97px" onclick="patientImageUploadForEditPatient()">
                                                BROWSE
                                            </button>
                                            <input type="file" id="openpatientimguploadforedtpx" accept="image/*" 
                                                style="display:none" onchange="readImageURL(this, 'patientimguploadforedtpx');"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    

                <div class="modal-body" style="margin:0px;padding:0px">
                    <div class="row clearfix" style="margin:0px;padding:0px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="margin:0px;padding:0px">
                            <div class="card" style="margin:0px;padding:0px">                            
                                <div class="body" style="margin:0px;padding:0px">
                                    <input type="hidden" id="hiddenid_pxfnamesup">
                                    <input type="hidden" id="hiddenid_pxmnamesup">
                                    <input type="hidden" id="hiddenid_pxlnamesup">
                                    <input type="hidden" id="hiddenid_pxsuffxsup">
                                    <input type="hidden" name="inputname_pxagexforaddpatientedt" id="pxagexforaddpatientedt">
                                    <div class="tab-content" style="margin:0px;padding:0px">
                                        <div role="tabpanel" class="tab-pane in active" id="GeneralInformationedt">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Px Index No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_pxindexedt" id="inputid_pxindexedt" class="form-control" readonly value="<?= $currentyear."-".($accountnumber['pinseq']+1)?>">
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;First Name</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_fnameedt" id="inputid_fnameedt" class="form-control" placeholder="Enter First Name" required>
                                                        <p id="fnaerredt" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Middle Name</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_mnameedt" id="inputid_mnameedt" class="form-control" placeholder="Enter Middle Name" required>
                                                        <p id="mnaerredt" style="color:red;padding-left:15px"></p>  
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Last Name</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_lnameedt" id="inputid_lnameedt" class="form-control" placeholder="Enter Last Name" required>
                                                        <p id="lnaerredt" style="color:red;padding-left:15px"></p>    
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Suffix</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_suffixedt" id="inputid_suffixedt" class="form-control" placeholder="Enter Suffix">
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Email Address</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_emailaddedt" id="inputid_emailaddedt" class="form-control" placeholder="Enter Email Address">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Mobile No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_mobileedt" id="inputid_mobileedt" class="form-control" placeholder="Enter Mobile Number" required data-mask="99-999-999999" data-mask-selectonfocus="true">
                                                        <p id="moberredt" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Telephone no.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_landlineedt" id="inputid_landlineedt" class="form-control" placeholder="Enter Telephone Number" data-mask="999-99-99" data-mask-selectonfocus="true">
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Passport No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_passportedt" id="inputid_passportedt" class="form-control" placeholder="Enter Street/Purok" required data-mask="P000000000A" data-mask-selectonfocus="true">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="tabpanel" class="tab-pane in" id="ProfilingInformationedt">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Civil Status</b>
                                                    <select name="selectname_civiledt" id="selectid_civilstatusxedt" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select from List">Select from List</option>
                                                            <option value="SINGLE">SINGLE</option>
                                                            <option value="MARRIED">MARRIED</option>
                                                            <option value="WIDOWED">WIDOWED</option>
                                                            <option value="SEPARATED">SEPARATED</option>   
                                                        </optgroup>
                                                    </select>
                                                    <p id="civerredt" style="color:red;padding-left:15px"></p>    
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Gender</b>
                                                    <select name="selectname_genderedt" id="selectid_genderoptionedt" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select From List">Select From List</option>
                                                            <option value="MALE">MALE</option>
                                                            <option value="FEMALE">FEMALE</option>   
                                                        </optgroup>
                                                    </select>
                                                    <p id="sexerredt" style="color:red;padding-left:15px"></p>    
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Religion</b>
                                                    <select name="selectname_religionedt" id="selectid_religionseleedt" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select From List">Select From List</option>
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
                                                    <p id="relerredt" style="color:red;padding-left:15px"></p>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Nationality</b>
                                                    <select name="selectname_nationalityedt" id="selectid_nationalityxedt" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select from list">Select from list</option>
                                                            <?php 
                                                                for($i=0; $i < count($nationalityxs); $i++)
                                                                {
                                                                    echo "<option value='".strtoupper($nationalityxs[$i]['nationality'])."'>".strtoupper($nationalityxs[$i]['nationality'])."</option>";
                                                                }
                                                            ?>
                                                        </optgroup>
                                                    </select>
                                                    <p id="naterredt" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Province</b>
                                                    <select name="selectname_provinceedt" id="selectid_provinceedt" class="form-control selectpicker" data-live-search="true" onchange="onChangeProvinceSelectForEditPx()">
                                                        <optgroup>
                                                            <option value="select">Select from List</option>
                                                            <?php 
                                                                for($i=0; $i < count($provincelistx); $i++)
                                                                {
                                                                    echo "<option value='".strtoupper($provincelistx[$i]['PROV_NAME'])."-".strtoupper($provincelistx[$i]['PROVINCE'])."'>".strtoupper($provincelistx[$i]['PROV_NAME'])."</option>";
                                                                }
                                                            ?>
                                                        </optgroup>
                                                    </select>
                                                    <p id="proverredt" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" id="citydivedt">
                                                    <b>&nbsp;&nbsp;&nbsp;City/Municipality</b>
                                                    <select name="selectname_citymunicipaledt" id="selectid_citymuniedt" class="form-control selectpicker" data-live-search="true" onchange="onChangeMunicipalitySelectForEditPx()">
                                                        <optgroup>
                                                            <option value="select">Select from List</option>
                                                        </optgroup>
                                                    </select>
                                                    <p id="cityerredt" style="color:red;padding-left:15px"></p>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" id="zipcodedivedt">
                                                    <b>&nbsp;&nbsp;&nbsp;Zipcode</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_zipcodeedt" id="inputid_zipcodexedt" class="form-control" placeholder="Enter Zipcode" readonly="">
                                                        <p id="ziperredt" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" id="brgydivedt">
                                                    <b>&nbsp;&nbsp;&nbsp;Barangay</b>
                                                    <select name="selectname_barangayedt" id="selectid_barangayedt"  class="form-control selectpicker" data-live-search="true" onchange="onChangeBarangaySelectForEditPx()">
                                                        <optgroup>
                                                            <option value="select">Select from List</option>
                                                        </optgroup>
                                                    </select>
                                                    <p id="barerredt" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" id="purokdivedt">
                                                    <b>&nbsp;&nbsp;&nbsp;Street/Purok</b>
                                                    <div class="form-group">
                                                        <input type="text" style="display:none;">
                                                        <input type="text" name="inputname_streetedt" id="inputid_streetedt" class="form-control" placeholder="Enter Street/Purok">
                                                        <p id="strerredt" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div role="tabpanel" class="tab-pane in" id="AccountInformationedt">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;PH Membership</b>
                                                    <select name="selectname_phmembershipedt" id="selectid_phmembershipedt" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="- - Select from List - -">Select from List</option>
                                                            <?php 
                                                                for($i=0; $i < count($phmembershipx); $i++)
                                                                {
                                                                    echo "<option value='".strtoupper($phmembershipx[$i]["phictype"]).":".strtoupper($phmembershipx[$i]["mneomonic"])."'>".strtoupper($phmembershipx[$i]["phictype"]).":".strtoupper($phmembershipx[$i]["mneomonic"])."</option>";
                                                                }
                                                            ?>
                                                        </optgroup>
                                                    </select>
                                                    <p id="phmemerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;PH Member</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_phmemberedt" id="inputid_phmemberedt" class="form-control" placeholder="Philhealth Member">
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;PH ID No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_phidnumbedt" id="inputid_phidnumbedt" class="form-control" placeholder="Philhealth ID No." data-mask="99-999999999-9" data-mask-selectonfocus="true">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Tax (TIN)</b>
                                                    <div class="form-group">
                                                        <input type="hidden" name="inputname_hiddenIDedt" id="inputid_hiddenIDedt">
                                                        <input type="text" name="inputname_tinnumedt" id="inputid_tinnumedt" class="form-control" placeholder="Enter TIN" data-mask="999-999-999" data-mask-selectonfocus="true" required>
                                                        <p id="taxerredt" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;SL Code</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_slcodeedt" id="inputid_slcodeedt" class="form-control" readonly="">
                                                    </div>
                                                    <p id="slcerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;<?= ucwords(strtolower($membertypepro["MemberType"])) ?></b>
                                                    <select name="selectname_membershipedt" id="selectid_membershipedt" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select from List">Select from List</option>
                                                            <?php 
                                                                for($i=0; $i < count($memberlisting); $i++)
                                                                {
                                                                    echo "<option value='".$memberlisting[$i]["Refno"]."'>".$memberlisting[$i]["membercardno"]."-".$memberlisting[$i]["name"]."</option>";
                                                                }
                                                            ?>
                                                        </optgroup>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row clearfix" style="margin-top:0px;padding-top:10px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Health Record No.</b>
                                                    <div class="input-group">
                                                        <input type="text" name="inputname_healthrecnoedt" id="inputid_healthrecnoedt" class="form-control" placeholder="Enter HRN" data-mask="99-99-99" data-mask-selectonfocus="true" required>
                                                        <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="bottom" title="HRN is verified?">
                                                            <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdiv" style="padding:0x;margin:0px">
                                                                <label for="healthrecnumchkboxedt" class="ts-label"></label>
                                                                <input id="healthrecnumchkboxedt" type="checkbox" hidden="hidden" onchange="enableDisableHRNisVerifiedforEdtPx()">
                                                                <label for="healthrecnumchkboxedt" class="ts-helper"></label>
                                                            </div>
                                                        </span>
                                                    </div>
                                                    <input type="hidden" id="inputid_healthrecnohid">
                                                    <input type="hidden" id="healthrecnumswitchvalueindicatoredt" name="inputname_hrnisverifiedchedt" value="NO">
                                                    <p id="hrnerredt" style="color:red;padding-left:15px"></p>
                                                </div>

                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Last Discharged</b>
                                                    <div class="input-group">
                                                        <input type="text" name="inputname_oldrecrdedt" id="inputid_oldrecrdedt" class="form-control datetimepicker" placeholder="Old Record" disabled="">
                                                        <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="bottom" title="Old Record">
                                                            <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdivedt" style="padding:0x;margin:0px">
                                                                <label for="oldrecordchkboxedt" class="ts-label"></label>
                                                                <input id="oldrecordchkboxedt" type="checkbox" hidden="hidden" onchange="enableDisableLastDischargedTextforEdtPx()">
                                                                <label for="oldrecordchkboxedt" class="ts-helper"></label>
                                                            </div>
                                                        </span>
                                                    </div>
                                                    <input type="hidden" id="oldrecordswitchvalueindicatoredt" name="inputname_oldrecordchkboxedt" value="OFF">
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Archived Patient</b>
                                                    <div class="input-group">
                                                        <input type="text" name="inputname_archivedpateintedt" id="inputid_archiveedt" class="form-control" placeholder="" value="NONE" readonly>
                                                        <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;">
                                                            <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdivedt" style="padding:0x;margin:0px">
                                                                <label for="archivechkboxedt" class="ts-label"></label>
                                                                <input id="archivechkboxedt" type="checkbox" hidden="hidden" onchange="enableDisableArchivedPatientTextforEdtPx()">
                                                                <label for="archivechkboxedt" class="ts-helper"></label>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div role="tabpanel" class="tab-pane" id="OtherInformationedt">
                                            <div class="row clearfix"  style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Mothers' Name</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_mothersnameedt" id="inputid_mothersnameedt"  class="form-control" placeholder="Enter Mothers Name" required>
                                                        <p id="motnerr" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Fathers' Name</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_fathersnameedt" id="inputid_fathersnameedt" class="form-control" placeholder="Enter Fathers Name" required>
                                                        <p id="fatnerr" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Spouse's Name</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_spouseedt" id="inputid_spouseedt" class="form-control" placeholder="Enter Spouse Name">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row clearfix"  style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Mothers' Nationality</b>
                                                    <select name="selectname_mothersnationedt" id="selectid_mothernationedt" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select from List">Select from List</option>
                                                            <?php 
                                                                for($i=0; $i < count($nationalityxs); $i++)
                                                                {
                                                                    echo "<option value='".strtoupper($nationalityxs[$i]['nationality'])."'>".strtoupper($nationalityxs[$i]['nationality'])."</option>";
                                                                }
                                                            ?>
                                                        </optgroup>
                                                    </select>
                                                    <p id="motnaterr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Fathers' Nationality</b>
                                                    <select name="selectname_fathersnationedt" id="selectid_fathernationedt" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select from List">Select from List</option>
                                                            <?php 
                                                                for($i=0; $i < count($nationalityxs); $i++)
                                                                {
                                                                    echo "<option value='".strtoupper($nationalityxs[$i]['nationality'])."'>".strtoupper($nationalityxs[$i]['nationality'])."</option>";
                                                                }
                                                            ?>
                                                        </optgroup>
                                                    </select>
                                                    <p id="fatnaterr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Spouse' Birthday</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_spousebdayedt" id="inputid_spousebdayedt" class="form-control datetimepicker" placeholder="Enter Spouse Birthday" onchange="calculateAge($(this).val());">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Mothers' Residence</b>
                                                    <div class="input-group">
                                                        <input type="text" name="inputname_mothersadrsedt" id="inputid_mothersadrsedt" class="form-control" placeholder="Mothers Address" required autocomplete="off">
                                                        <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="bottom" title="Same as Patient?">
                                                            <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdiv" style="padding:0x;margin:0px">
                                                                <label for="motheradrschkboxedt" class="ts-label"></label>
                                                                <input id="motheradrschkboxedt" type="checkbox" hidden="hidden" onchange="enableDisableSameasPatientAddressSwitchForMotherAdressForEdtPx()">
                                                                <label for="motheradrschkboxedt" class="ts-helper"></label>
                                                            </div>
                                                        </span>
                                                    </div>
                                                    <input type="hidden" id="motheradrsvalueindicatoredt" value="NO">
                                                    <p id="motrerredt" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Fathers' Residence</b>
                                                    <div class="input-group">
                                                        <input type="text" name="inputname_fathersadrsedt" id="inputid_fathersadrsedt" class="form-control" placeholder="Fothers Address" required>
                                                        <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="bottom" title="Same as Patient?">
                                                            <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdiv" style="padding:0x;margin:0px">
                                                                <label for="fatheradrschkboxedt" class="ts-label"></label>
                                                                <input id="fatheradrschkboxedt" type="checkbox" hidden="hidden" onchange="enableDisableSameasPatientAddressSwitchForFatherAdressForEdtPx()">
                                                                <label for="fatheradrschkboxedt" class="ts-helper"></label>
                                                            </div>
                                                        </span>
                                                    </div>
                                                    <input type="hidden" id="fatheradrsvalueindicatoredt" value="NO">
                                                    <p id="fatrerredt" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Birthday</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_birthdayedt" id="inputid_birthdayedt" class="form-control" placeholder="Enter Birthdate" required onchange="$('#pxagexforaddpatientedt').val(calculateAge($(this).val()));">
                                                        <p id="birerredt" style="color:red;padding-left:15px"></p>
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
                    <button type="button" class="btn btn-default waves-effect" onclick="hideEditPatientModal()">CLOSE</button>
                    <button type="button" class="btn btn-info waves-effect editPatientButton" onclick="validateEditPatientForm()" id="editPatientButton">UPDATE</button>
                </div>
            </div>
        </form>
    </div>
</div>

