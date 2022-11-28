<div class="modal fade" id="externalitemsforrxcreator" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header" style="margin-bottom:0px;margin-top:7px;padding-bottom:0px;padding-top:0px;padding-left:15px;padding-right:15px">
                <h4 class="title" id="largeModalLabel">External Items Listing</h4>
            </div>
<!--            <div class="modal-body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <input type="hidden" id="recordsiddiag" value="<?= $this->session->userdata("ID"); ?>">
                <input type="hidden" id="recordsbydiag" value="<?= $this->session->userdata("empname"); ?>">
                <input type="hidden" id="diagid" value="">
                <input type="hidden" id="refnodiag" value="">
                <div class="body d-none" id="diagnosis-form" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;"> 
                    <div class="row clearfix">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div style="margin-top: 2%;">
                                <b>Diagnosis</b>
                            </div>
                            <div class="form-group">
                                <textarea name="diagnosisdiag" id="diagnosisdiag" class="form-control m-b-20" rows="5" placeholder="" style="background:#EBEDED;border-radius:5px;"></textarea>
                                <p id="diagnosisdiagerror" hidden="true" style="color:red;">Please input information on the field!</p>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div style="margin-top: 2%;">
                                        <b>Grouping</b>
                                    </div>
                                    <select name="groupingdiag1" id="groupingdiag1" class="form-control selectpicker" data-live-search="true">
                                        <optgroup>
                                            <option value="">SELECT FROM LIST</option>
                                            <option value="PCAP">PCAP</option>   
                                            <option value="BREAST CANCER">BREAST CANCER</option> 
                                            <option value="FIBROSARCOMA OF THE FRONTAL SINUS">FIBROSARCOMA OF THE FRONTAL SINUS</option>
                                        </optgroup>
                                    </select>
                                     <p id="groupingdiag1error" hidden="true" style="color:red;">Please input information on the field!</p>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div style="margin-top: 25px;">
                                        <b>Grouping</b>
                                    </div>
                                    <div class="input-group">
                                        <input type="text" name="groupingdiag2" id="groupingdiag2" class="form-control" style="height:40px" readonly="">
                                        <span class="input-group-addon" style="padding:0px;background:#e3e3e3">
                                            <button type="button" class="btn btn-primary btn-round" style="margin:0px;height:38px" onclick="">
                                                <i class="zmdi zmdi-plus"></i>
                                            </button>
                                        </span>
                                        <p id="groupingdiag2error" hidden="true" style="color:red;">Please input information on the field!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row clearfix" style="margin-bottom:20px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">

                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                            <button type="button" onclick='addNewDiagnosis()' id="adddiagnosis_button" style="width:100px" class="adddiagnosis_button btn btn-primary waves-effect">SAVE</button>
                            <button type="button" onclick='updateDiagnosis()' id="edtdiagnosis_button" style="width:100px" class="edtdiagnosis_button btn btn-primary waves-effect d-none">UPDATE</button>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                            <button type="button" class="btn btn-danger waves-effect" onclick="hideDiagnosisForm()" style="width:100px">CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>-->
            <div class="row" id="diagnosis-button" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;padding-left:3px;padding-right:3px;margin-left:0px;margin-right:0px;">
                <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12">
                    <div class="checkbox float-right" style="padding-left:10px;padding-right:10px;padding-top:13px;">
                        <input name="chckboxname_findallcategrxc" id="chckboxid_findallcategrxc" type="checkbox" onchange="onChangeFindAllCategoryCheckBox()">
                        <label for="chckboxid_findallcategrxc" class=" float-right">
                            <b>FIND ALL CATEGORY</b>
                        </label>
                    </div>   
                    <input type="hidden" id="textboxid_findallcategrxc" name="" value="0">
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="alert('Under Development!')"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;ADD NEW ITEM</b></button>
                </div>
            </div>
            <div class="" id="diagnosis-table" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;">
                <table class="table table-bordered" id="external-items-masterlist-table">
                    <thead>
                        <tr>                                       
                            <th id="table-head-action2sl">Action</th>
                            <th id="table-head-no">No.</th>
                            <th id="table-head-namediag">Particular/Instructions</th>
                            <th id="table-head-name">Brand</th>
                            <th id="table-head-name">Generic</th>
                            <th id="table-head-action">Unit</th>
                            <th id="table-head-name">Category</th>
                            <th id="table-head-name">Code</th>
                            <th id="table-head-name">HospCD</th>
                            <th id="table-head-name">Purpose</th>
                            <th id="table-head-name">Side&nbsp;&nbsp;&nbsp;Effect</th>
                            <th id="table-head-desc">Hosp.Dcsr.</th>
                            <th id="table-head-name">Updated</th>
                            <th id="table-head-name">Hosp.PiD.</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>                            
            </div>
            <div class="modal-footer" id="diagnosis-footer" style="margin-bottom:20px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideExternalItemsListingModal()">CLOSE</button>
                <button type="button" id='savebutton' class="btn btn-info waves-effect" onclick="selectExternalItemForRXCreatorMaker()">SELECT</button>
            </div>
        </div>
    </div>
</div>

