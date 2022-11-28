<!--<div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
<div class="modal fade" id="addpatientsmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <form id="insert-patient-form" autocomplete="off">
                <div class="modal-header" style="margin-bottom:0px;padding-bottom:0px">
                    <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                            <div class="col-lg-10 col-md-6 col-sm-6 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h4 class="title" id="largeModalLabel">Add Patient</h4>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="header">
                                                <h2><strong>Add Patient</strong> Form</h2>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <p id="myFormSLEdit"></p>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                        <ul class="nav nav-tabs" role="tablist" style="margin-top:0px;padding-top:0px;margin-bottom:5px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#GeneralInformation" id="anchorid_forgeneraltabadd">General<b id="generalerrtabindicatoradd" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#ProfilingInformation" id="anchorid_forprofiletabadd">Profile<b id="profileerrtabindicatoradd" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#AccountInformation" id="anchorid_foraccounttabadd">Account<b id="accounterrtabindicatoradd" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#OtherInformation" id="anchorid_forotherstabadd">Others<b id="otherserrtabindicatoradd" style="color:red;padding-left:5px"></b></a></li>
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
                    <div class="row clearfix" style="margin:0px;padding:0px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="margin:0px;padding:0px">
                            <div class="card" style="margin:0px;padding:0px">
                                <div class="body" style="margin:0px;padding:0px">
                                    <input type="hidden" name="inputname_slformalldataforaddpatient"  id="slformalldataforaddpatient">
                                    <input type="hidden" name="inputname_slcodeforaddpatient" id="slcodeforaddpatient">
                                    <input type="hidden" name="inputname_pxagexforaddpatient" id="pxagexforaddpatient">
                                    <div class="tab-content" style="margin:0px;padding:0px">
                                        <div role="tabpanel" class="tab-pane in active" id="GeneralInformation">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Px Index No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_pxindex" id="inputid_pxindex" class="form-control" autocomplete="off" readonly value="">
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;First Name<small id="fduperr" style="color:red;padding-left:15px;font-size:16px"></small></b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_fname" id="inputid_fname" class="form-control" placeholder="Enter First Name" autocomplete="off" required>
                                                        <p id="fnaerr" style="color:red;padding-left:7px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Middle Name<small id="mduperr" style="color:red;padding-left:15px;font-size:16px"></small></b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_mname" id="inputid_mname" class="form-control" placeholder="Enter Middle Name" autocomplete="off" required>
                                                        <p id="mnaerr" style="color:red;padding-left:7px"></p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Last Name<small id="lduperr" style="color:red;padding-left:15px;font-size:16px"></small></b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_lname" id="inputid_lname" class="form-control" placeholder="Enter Last Name" autocomplete="off" required>
                                                        <p id="lnaerr" style="color:red;padding-left:7px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Suffix<small id="sduperr" style="color:red;padding-left:7px;font-size:16px"></small></b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_suffix" id="inputid_suffix" class="form-control" placeholder="Enter Suffix" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Email Address</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_emailadd" id="inputid_emailadd" class="form-control" placeholder="Enter Email Address" autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Mobile No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_mobile" id="inputid_mobile" class="form-control" placeholder="Enter Mobile Number" data-mask="99-999-999999" data-mask-selectonfocus="true" autocomplete="off" required>
                                                        <p id="moberr" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Telephone no.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_landline" id="inputid_landline" class="form-control" placeholder="Enter Telephone Number" data-mask="999-99-99" data-mask-selectonfocus="true" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Passport No.</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_passport" id="inputid_passport" class="form-control" placeholder="Enter Passport No." data-mask="P000000000A" data-mask-selectonfocus="true" autocomplete="off" required>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="tabpanel" class="tab-pane in" id="ProfilingInformation">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Civil Status</b>
                                                    <select name="selectname_civil" id="selectid_civilstatusx" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select">Select from List</option>
                                                            <option value="SINGLE">SINGLE</option>
                                                            <option value="MARRIED">MARRIED</option>
                                                            <option value="WIDOWED">WIDOWED</option>
                                                            <option value="SEPARATED">SEPARATED</option>   
                                                        </optgroup>
                                                    </select>
                                                    <p id="civerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Gender</b>
                                                    <select name="selectname_gender" id="selectid_genderoption" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select From List">Select From List</option>
                                                            <option value="MALE">MALE</option>
                                                            <option value="FEMALE">FEMALE</option>   
                                                        </optgroup>
                                                    </select>
                                                    <p id="sexerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Religion</b>
                                                    <select name="selectname_religion" id="selectid_religionsele" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="Select from List">Select from List</option>
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
                                                    <p id="relerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Nationality</b>
                                                    <select name="selectname_nationality" id="selectid_nationalityx" class="form-control selectpicker" data-live-search="true">
                                                        <optgroup>
                                                            <option value="FILIPINO">FILIPINO</option>
                                                            <?php 
                                                                for($i=0; $i < count($nationalityxs); $i++)
                                                                {
                                                                    echo "<option value='".strtoupper($nationalityxs[$i]['nationality'])."'>".strtoupper($nationalityxs[$i]['nationality'])."</option>";
                                                                }
                                                            ?>
                                                        </optgroup>
                                                    </select>
                                                    <p id="naterr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Province</b>
                                                    <select name="selectname_province" id="selectid_province" class="form-control selectpicker" data-live-search="true" onchange="onChangeProvinceSelectForAddPx()">
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
                                                    <p id="proverr" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;City/Municipality</b>
                                                    <div style="padding:0px;margin:0px;border:none">
                                                        <select name="selectname_citymunicipal"  class="form-control selectpicker" data-live-search="true" id="selectid_citymuni" onchange="onChangeMunicipalSelectForAddPx()" disabled="true">
                                                            <optgroup>
                                                                <option value="select">Select from List</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                    <p id="cityerr" style="color:red;padding-left:15px"></p>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Zipcode</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_zipcode" id="inputid_zipcodex" class="form-control" placeholder="Zipcode" autocomplete="off" readonly>
                                                        <p id="ziperr" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Barangay</b>
                                                    <div style="padding:0px;margin:0px;border:none">
                                                        <select name="selectname_barangay"  class="form-control selectpicker" data-live-search="true" id="selectid_barangay" onchange="onChangeBarangaySelectForAddPx()" disabled="true">
                                                            <optgroup >
                                                                <option value="select">Select from List</option>
                                                            </optgroup>
                                                        </select>
                                                        <p id="barerr" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Street/Purok</b>
                                                    <div class="form-group">
                                                        <div style="padding:0px;margin:0px;border:none">
                                                            <input type="text" name="inputname_street" id="inputid_street" class="form-control" placeholder="Street/Purok" autocomplete="off" disabled="true">
                                                            <p id="strerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div role="tabpanel" class="tab-pane" id="AccountInformation">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                        <b>&nbsp;&nbsp;&nbsp;PH Membership</b>
                                                        <select name="selectname_phmembership" id="selectid_phmembership" class="form-control selectpicker" data-live-search="true" onchange="hideShowPhmembership()">
                                                            <optgroup>
                                                                <option value="Select from List">Select from List</option>
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
                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                            <b>&nbsp;&nbsp;&nbsp;PH Member</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_phmember" id="inputid_phmember" class="form-control" placeholder="Philhealth Member" autocomplete="off" disabled="true">
                                                            </div>
                                                    </div>
                                            </div>

                                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                        <b>&nbsp;&nbsp;&nbsp;PH ID No.</b>
                                                        <div class="form-group">
                                                            <input type="text" name="inputname_phidnumb" id="inputid_phidnumb" class="form-control" placeholder="Philhealth ID No." data-mask="99-999999999-9" data-mask-selectonfocus="true" autocomplete="off" disabled="true">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                        <b>&nbsp;&nbsp;&nbsp;SL Code</b>
                                                        <div class="form-group">
                                                            <input type="text" name="inputname_slcode" id="inputid_slcode" class="form-control" style="height:40px" readonly="">
                                                        </div>
                                                        <p id="slcerr" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                        <b>&nbsp;&nbsp;&nbsp;<?= ucwords(strtolower($membertypepro["MemberType"])) ?></b>
                                                        <select name="selectname_membership" id="selectid_membership" class="form-control selectpicker" data-live-search="false">
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
                                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                        <b>&nbsp;&nbsp;&nbsp;Health Record No.</b>
                                                        <div class="input-group">
                                                            <input type="text" name="inputname_healthrecno" id="inputid_healthrecno" class="form-control" placeholder="Enter HRN" data-mask="99-99-99" data-mask-selectonfocus="true" autocomplete="off" required>
                                                            <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="bottom" title="HRN is verified?">
                                                                <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdiv" style="padding:0x;margin:0px">
                                                                    <label for="healthrecnumchkbox" class="ts-label"></label>
                                                                    <input id="healthrecnumchkbox" type="checkbox" hidden="hidden" onchange="enableDisableHRNisVerified()">
                                                                    <label for="healthrecnumchkbox" class="ts-helper"></label>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <input type="hidden" id="healthrecnumswitchvalueindicator" name="inputname_hrnisverifiedch" value="NO">
                                                        <p id="hrnerr" style="color:red;padding-left:15px"></p>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                        <b>&nbsp;&nbsp;&nbsp;Last Discharged</b>
                                                        <div class="input-group">
                                                            <input type="text" name="inputname_oldrecrd" id="inputid_oldrecrd" class="form-control datetimepicker" placeholder="Old Record" disabled="">
                                                            <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="bottom" title="Old Record">
                                                                <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdiv" style="padding:0x;margin:0px">
                                                                    <label for="oldrecordchkbox" class="ts-label"></label>
                                                                    <input id="oldrecordchkbox" type="checkbox" hidden="hidden" onchange="enableDisableLastDischargedText()">
                                                                    <label for="oldrecordchkbox" class="ts-helper"></label>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <input type="hidden" id="oldrecordswitchvalueindicator" name="inputname_oldrecordchkbox" value="OFF">
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                        <b>&nbsp;&nbsp;&nbsp;Tax (TIN)</b>
                                                        <div class="form-group">
                                                                <input type="text" name="inputname_tinnum" id="inputid_tinnum" class="form-control" placeholder="Enter TIN" data-mask="999-999-999" data-mask-selectonfocus="true" autocomplete="off" required>
                                                                <p id="taxerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        
                                        <div role="tabpanel" class="tab-pane" id="OtherInformation">

                                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                <b>&nbsp;&nbsp;&nbsp;Mothers' Name</b>
                                                                <div class="form-group">
                                                                        <input type="text" name="inputname_mothersname" id="inputid_mothersname"  class="form-control" placeholder="Enter Mothers Name" autocomplete="off" required>
                                                                        <p id="motnerr" style="color:red;padding-left:15px"></p>
                                                                </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                <b>&nbsp;&nbsp;&nbsp;Fathers' Name</b>
                                                                <div class="form-group">
                                                                        <input type="text" name="inputname_fathersname" id="inputid_fathersname" class="form-control" placeholder="Enter Fathers Name" autocomplete="off" required>
                                                                        <p id="fatnerr" style="color:red;padding-left:15px"></p>
                                                                </div>
                                                        </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                <b>&nbsp;&nbsp;&nbsp;Spouse' Name <small>(If Applicable)</small></b>
                                                                <div class="form-group">
                                                                        <input type="text" name="inputname_spouse" id="inputid_spouse" class="form-control" placeholder="Enter Spouse Name" autocomplete="off">
                                                                </div>
                                                        </div>
                                                </div>

                                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                <b>&nbsp;&nbsp;&nbsp;Mothers' Nationality</b>
                                                                        <select name="selectname_mothersnation" id="selectid_mothernation" class="form-control selectpicker" data-live-search="true">
                                                                                <optgroup>
                                                                                        <option value="FILIPINO">FILIPINO</option>
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
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                <b>&nbsp;&nbsp;&nbsp;Fathers' Nationality</b>
                                                                        <select name="selectname_fathersnation" id="selectid_fathernation" class="form-control selectpicker" data-live-search="true">
                                                                                <optgroup>
                                                                                        <option value="FILIPINO">FILIPINO</option>
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
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                                <b>&nbsp;&nbsp;&nbsp;Spouse' Birthday</b>
                                                                <div class="form-group">
                                                                        <input type="text" name="inputname_spousebday" id="inputid_spousebday" class="form-control datetimepicker" placeholder="Enter Spouse Birthday" autocomplete="off" onchange="calculateAge($(this).val());">
                                                                </div>
                                                        </div>
                                                </div>

                                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                            <b>&nbsp;&nbsp;&nbsp;Mothers' Residence</b>
                                                            <div class="input-group">
                                                                <input type="text" name="inputname_mothersadrs" id="inputid_mothersadrs" class="form-control" placeholder="Mothers Address" autocomplete="off" required>
                                                                <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="bottom" title="Same as Patient?">
                                                                    <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdiv" style="padding:0x;margin:0px">
                                                                        <label for="motheradrschkbox" class="ts-label"></label>
                                                                        <input id="motheradrschkbox" type="checkbox" hidden="hidden" onchange="enableDisableSameasPatientAddressSwitchForMotherAdress()">
                                                                        <label for="motheradrschkbox" class="ts-helper"></label>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                            <input type="hidden" id="motheradrsvalueindicator" value="NO">
                                                            <p id="motrerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                            <b>&nbsp;&nbsp;&nbsp;Fathers' Residence</b>
                                                            <div class="input-group">
                                                                <input type="text" name="inputname_fathersadrs" id="inputid_fathersadrs" class="form-control" placeholder="Fathers Address" autocomplete="off" required>
                                                                <span class="input-group-addon" style="background-color:#e3e3e3;padding-bottom:0px;padding-right:12px;padding-left:0px;margin-left:0px;" data-toggle="tooltip" data-placement="bottom" title="Same as Patient?">
                                                                    <div class="nk-toggle-switch" data-ts-color="purple" id="oldrecordchkboxdiv" style="padding:0x;margin:0px">
                                                                        <label for="fatheradrschkbox" class="ts-label"></label>
                                                                        <input id="fatheradrschkbox" type="checkbox" hidden="hidden" onchange="enableDisableSameasPatientAddressSwitchForFatherAdress()">
                                                                        <label for="fatheradrschkbox" class="ts-helper"></label>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                            <input type="hidden" id="fatheradrsvalueindicator" value="NO">
                                                            <p id="fatrerr" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                            <b>&nbsp;&nbsp;&nbsp;Patient's Birthday</b>
                                                            <div class="form-group">
                                                                <input type="text" name="inputname_birthday" id="inputid_birthday" class="form-control datetimepicker" placeholder="Enter Birthdate" required onchange="$('#pxagexforaddpatient').val(calculateAge($(this).val()));">
                                                                <p id="birerr" style="color:red;padding-left:15px"></p>
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
                    <button type="button" class="btn btn-default waves-effect" onclick="hideAddPatientModal()">CLOSE</button>
                    <button type="button" id='savebutton' class="btn btn-info waves-effect addPatientButton" onclick="validateAddPatientForm()">SAVE</button>
                </div>
            </form>
        </div>
    </div>
</div>

