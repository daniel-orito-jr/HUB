<div class="modal fade" id="addnursesmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
            <div class="modal-header" style="margin-bottom:0px;margin-top:25px;padding-bottom:0px;padding-top:0px;">
                <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                    <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="col-lg-10 col-md-6 col-sm-6 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <h4 class="title addnurse_title" id="largeModalLabel">Add Nurse</h4>
                                    <h4 class="title edtnurse_title d-none" id="largeModalLabel">Edit Nurse</h4>
                                </div>
                            </div>
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="header">
                                        <h2><strong>Nurses</strong> Form</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:20px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <ul class="nav nav-tabs" role="tablist" style="margin-top:0px;padding-top:0px;margin-bottom:5px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#nurprof" id="profiletabidnur">Nurse Profile <b style="color:red" id="profiletaberrornur"></b></a></li>
                                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#nurinfo" id="detailstabidnur">Nurse Details <b style="color:red" id="detailstaberrornur"></b></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <div class="relative">
                                    <div class="absolute">
                                        <img class="rounded img-raised" src="<?= base_url('assets/images/nurse3.png'); ?>"
                                             height="100" width="100" style="border:7px solid #02bec0;border-radius:2px;top:-20px"
                                             alt="" id="doctorimgupload">
                                    </div>
                                </div>
                                <div class="relative">
                                    <div class="absolute">
                                        <button type="button" class="btn btn-sm btn-primary waves-effect"
                                                style="margin-top:85px;width:100px;left:-97px" id="doctorimguploadbtn">
                                            BROWSE
                                        </button>
                                        <input type="file" id="opendoctorimgupload" accept="image/*" style="display:none" onchange="readImageURL(this, 'doctorimgupload');"/>
                                        <p id="photoerr" style="color:red;padding-left:3px"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                            <div class="body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                <input type="text" name="nurcd" id="nurcd" class="form-control gender-class d-none" placeholder="Enter Nurse CD" autocomplete="off">
                                <input type="text" name="accountidnur" id="accountidnur" class="form-control gender-class d-none" placeholder="Enter Account ID" value="<?= $this->session->userdata('ID'); ?>" autocomplete="off">
                                <input type="text" name="accountnamenur" id="accountnamenur" class="form-control gender-class d-none" placeholder="Enter Account Name" value="<?= $this->session->userdata('empname'); ?>" autocomplete="off">
                                
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane in active" id="nurprof">
                                        <div class="row clearfix">
                                            <div class="col-md-6">
                                                <b>First Name</b>
                                                <div class="form-group">
                                                    <input type="text" id='firstnamenur' class="form-control" placeholder="Enter First Name" autocomplete="off">
                                                    <p id="firstnamenurerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <b>Last Name</b>
                                                <div class="form-group">
                                                    <input type="text" id='lastnamenur' class="form-control" placeholder="Enter Last Name" autocomplete="off">
                                                    <p id="lastnamenurerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-md-12">
                                                <b>Address</b>
                                                <div class="form-group">
                                                    <input type="text" id='addressnur' class="form-control" placeholder="Enter Address" autocomplete="off">
                                                    <p id="addressnurerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div role="tabpanel" class="tab-pane in" id="nurinfo">
                                        <div class="row clearfix">
                                            <div class="col-md-6">
                                                <b>Hosp Code</b>
                                                <div class="form-group">
                                                    <input type="text" id='hospcodenur' class="form-control" readonly>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <b>License Number</b>
                                                <div class="form-group">
                                                    <input type="number" id='licensenumbernur' class="form-control" placeholder="Enter License Number" autocomplete="off">
                                                    <p id="licensenumbernurerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row clearfix">
                                            <div class="col-md-6">
                                                <b>Profession Type</b>
                                                <div class="form-group show-tick">
                                                    <select tabindex="-98" id="proftypenur">
                                                        <option value="RN">RN</option>
                                                        <option value="RMT">RMT</option>
                                                    </select></div>
                                            </div>
                                            <div class="col-md-6">
                                                <b>Admission Access</b>
                                                <div class="checkbox">
                                                    <input id="allowadmissionnur" type="checkbox" checked="">
                                                    <label for="allowadmissionnur">
                                                        Allow Admission
                                                    </label>
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
            <div class="modal-footer" style="padding-top:20px;padding-left:35px;padding-right:35px;padding-bottom:30px;">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal" onclick="hideAddNursesModal()">CLOSE</button>
                <button type="button" class="btn btn-primary waves-effect" id='savebuttonnur' onclick="addNurses()">SAVE</button>
                <button type="button" class="btn btn-warning waves-effect d-none" id='updatebuttonnur' onclick='updateNurses()'>UPDATE</button>
            </div>
        </div>
    </div>
</div>