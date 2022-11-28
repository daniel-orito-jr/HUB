<div class="modal fade" id="comanagementmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
            <div class="modal-header" style="margin-bottom:0px;margin-top:10px;padding-bottom:0px;padding-top:0px;">
                <h4 class="title" id="largeModalLabel">Co-Management</h4>
            </div>
            <div class="modal-body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                    <div class="card patients-list" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                        <div class="body" id="zero-all" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                            <form id="comanage-doctor-form" autocomplete="off">
                                <div class="d-none" id="comanagementform" style="margin-bottom:25px;margin-top:30px;padding-bottom:0px;padding-top:0px;margin-left:20px;margin-right:20px;">
                                    <input type="hidden" id="hiddenid_doctornamecomanagement" name="doctornamecomanagementcom">
                                    <input type="hidden" id="hiddenid_doctorcodecomanagement" name="doctorcodecomanagementcom">
                                    <input type="hidden" id="hiddentextid_datenow" name="hiddenname_datenowcom" value="<?= $currentdate." ".$timenow; ?>">
                                    <input type="hidden" id="hiddentextid_pincodexcomanage" name="pincodexcomanagecom">
                                    <input type="hidden" id="hiddentextid_casecodexcomanage" name="casecodexcomanagecom">
                                    <input type="hidden" id="hiddentextid_pccodexcomanage" name="pccodexcomanagecom">
                                    <input type="hidden" id="hiddentextid_sortingcomanage" name="sortingcomanagecom">
                                    <input type="hidden" id="hiddentextid_attendingcomanage" name="attendingcomanagecom">
                                    <input type="hidden" id="hiddentextid_textboxidcomanage" name="textboxidcomanagecom">
                                    <input type="hidden" id="hiddentextid_docrefnumcomanage" name="docrefnumcomanagecom">
                                    <input type="hidden" id="hiddentextid_deleteparameterforcomanage">
                                    
                                    <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                            <b>&nbsp;&nbsp;&nbsp;Patient Name</b>
                                            <div class="form-group">
                                                <input type="text" id="inputid_pxnamexcomanagement" name="pxnamexcomanagementcom" class="form-control" autocomplete="off" readonly>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <b>&nbsp;&nbsp;&nbsp;Account No.</b>
                                            <div class="form-group">
                                                <input type="text" id="inputid_accntnocomanagement" name="accntnocomanagementcom" class="form-control" autocomplete="off" readonly>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <b>&nbsp;&nbsp;&nbsp;Patient Type</b>
                                            <div class="nk-int-st">
                                                <input type="text" id="inputid_pxtypexcomanagement" name="pxtypexcomanagementcom" class="form-control" autocomplete="off" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row clearfix" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                            <b>&nbsp;&nbsp;&nbsp;Doctor Management</b>

                                            <select name="docmancomanagementcom" id="inputid_docmancomanagement" class="form-control selectpicker" data-live-search="true" onchange="validatecomanageandattendingtable()">
                                                <optgroup class="cautions_option">
                                                    <option value="Select">Select doctor from list</option>
                                                    <?php 
                                                        for($i=0; $i < count($doctorlisting); $i++)
                                                        {
                                                            echo "<option value='".strtoupper($doctorlisting[$i]['docname']).'-'.strtoupper($doctorlisting[$i]['docrefno'])."'>"
                                                                        . "".strtoupper($doctorlisting[$i]['docname']).'-'.strtoupper($doctorlisting[$i]['docrefno']).
                                                                 "</option>";
                                                        }
                                                    ?>
                                                </optgroup>
                                            </select>
                                            <p id="docmancomanagementerr" style="color:red;padding-left:15px"></p>
                                            <p class="d-none" id="docmancomanagementdupadmdoc" style="color:red;padding-left:15px"></p>
                                            <p class="d-none" id="docmancomanagementdupcomdoc" style="color:red;padding-left:15px"></p>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <b>&nbsp;&nbsp;&nbsp;Management Type</b>
                                            <select name="typmancomanagementcom" id="inputid_typmancomanagement" class="form-control selectpicker" data-live-search="true">
                                                <optgroup class="cautions_option">
                                                    <option value="Select">Select from list</option>
                                                    <?php
                                                        for ($i = 0; $i < count($typeofmngmnt); $i++) 
                                                        {
                                                            echo "<option value='" . strtoupper($typeofmngmnt[$i]['typedscr']) . "'>"
                                                            . strtoupper($typeofmngmnt[$i]['typedscr']) .
                                                            "</option>";
                                                        }
                                                    ?>   
                                                </optgroup>
                                            </select>
                                            <p id="typmancomanagementerr" style="color:red;padding-left:15px"></p>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <b>&nbsp;&nbsp;&nbsp;Start of Service</b>
                                            <input type="text" name="startcomanagementcom" id="inputid_startcomanagement" class="form-control datetimepicker" placeholder="" required>
                                            <p id="startcomanagementerr" style="color:red;padding-left:15px"></p>
                                        </div>
                                    </div>
                                    <div class="row clearfix" style="margin-bottom:0px;margin-top:10px;padding-bottom:0px;padding-top:0px;">
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect" onclick="HideComanageDoctorForm()">RETURN</button>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <button type="button" onclick="addNewComanageDoctorForAdmAdd()" id="addNewComanageDoctorBtnForAdmAdd" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect">ADD</button>
                                            <button type="button" onclick="edtOldComanageDoctorForAdmAdd()" id="edtOldComanageDoctorBtnForAdmAdd" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning waves-effect d-none">UPDATE</button>
                                            
                                            <button type="button" onclick="addNewComanageDoctorForAdmEdt()" id="addNewComanageDoctorBtnForAdmEdt" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect d-none">ADD</button>
                                            <button type="button" onclick="edtOldComanageDoctorForAdmEdt()" id="edtOldComanageDoctorBtnForAdmEdt" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning waves-effect d-none">UPDATE</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            
                            <div class="row clearfix d-none" style="margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:0px;padding-bottom:0px;padding-top:0px;" id="comanagetablediv">
                                
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                    <div class="row clearfix d-none" id="comanagebuttondiv" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                            <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showComanageDoctorForm()"><b>NEW CO-MANAGEMENT</b></button>
                                        </div>
                                    </div>
                                    <div class="" id="comanagement-masterlist-div" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                        <div class="" id="All" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                                            <table class="table table-bordered table-striped table-hover" id="comanagement-masterlist-table" style="margin-bottom:0px">
                                                <thead>
                                                    <tr>                                       
                                                        <th id="table-head-actionhm">Action</th>
                                                        <th id="table-head-typecoman">Type</th>
                                                        <th id="table-head-name">Doctor&nbsp;&nbsp;Name</th>
                                                        <th id="table-head-action">Effective</th>
                                                        <th id="table-head-action">Attending</th>
                                                        <th id="table-head-name">Updated</th>
                                                        <th id="table-head-action">Referrence</th>
                                                        <th id="table-head-action">Textboxid</th>
                                                        <th id="table-head-action">Sorting</th>
                                                    </tr>
                                                </thead>
                                                <tbody>


                                                </tbody>
                                            </table>                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer d-none" id="comanagereturnbtn" style="margin-top:0px;margin-bottom:7px;padding-top:0px;padding-left:0px;padding-right:0px;margin-left:15px;margin-right:15px;">
                                <button type="button" class="btn btn-default waves-effect float-right" onclick="hideCoManagementModal()">RETURN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>