<!--<div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
<div class="modal fade" id="createnewrxmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <form id="insert-patient-form" autocomplete="off">
                <div class="modal-header" style="margin-bottom:0px;padding-bottom:0px">
                    <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                            <div class="col-lg-10 col-md-6 col-sm-6 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h4 class="title" id="largeModalLabel">Create New Rx</h4>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="header">
                                                <h2><strong>New RX</strong> Form</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                        <ul class="nav nav-tabs" role="tablist" style="margin-top:0px;padding-top:0px;margin-bottom:5px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                            <li class="nav-item" id="ProfilingTab"><a class="nav-link active" onclick="onClickProfilingTab()" data-toggle="tab" href="#ProfilingContent" id="anchorid_forprofilingtab">1 - Profiling<b id="generalerrtabindicatoradd" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item" id="GenericsTab"><a class="nav-link" onclick="onClickGenericsxTab()" data-toggle="tab" href="#GenericsContent" id="anchorid_forgenericstab">2 - Generics<b id="profileerrtabindicatoradd" style="color:red;padding-left:5px"></b></a></li>
                                            <li class="nav-item disabledTab" id="ConfirmTab"><a class="nav-link" onclick="onClickConfirmatTab()"data-toggle="tab" href="#ConfirmContent" id="anchorid_forconfirmtab">3 - Confirm<b id="accounterrtabindicatoradd" style="color:red;padding-left:5px"></b></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <div class="relative">
                                        <div class="absolute" id="uploaded_image_foraddpx">
                                            <img class="rounded img-raised" src="<?= base_url('assets/images/rximage.jpg'); ?>"
                                                 height="100" width="100" style="border:7px solid #02bec0;border-radius:2px;top:-20px"
                                                 alt="" id="">
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
                                    <div class="tab-content" style="margin-top:10px;padding:0px">
                                        <div role="tabpanel" class="tab-pane in active" id="ProfilingContent">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-none" id="">
                                                    <input type="hidden" id="hiddenid_rxoperationindicatorrxc">
                                                    <input type="hidden" id="hiddenid_casenumrxc">
                                                    <input type="hidden" id="hiddenid_admdaterxc">
                                                    <input type="hidden" id="hiddenid_disdaterxc">
                                                    <input type="hidden" id="hiddenid_roomrefrxc">
                                                    <input type="hidden" id="hiddenid_casecodrxc">
                                                    <input type="hidden" id="hiddenid_PINnumbrxc">
                                                    <input type="hidden" id="hiddenid_prodidxrxc">
                                                    <input type="hidden" id="hiddenid_hospcodrxc">
                                                    <input type="hidden" id="hiddenid_phicrefrxc" value="<?= $phicrefno ?>">
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Batch</b>
                                                    <div class="form-group">
                                                        <input type="text" name="inputname_batchrxc" id="inputid_batchrxc" class="form-control" autocomplete="off" readonly="">
                                                        <p id="inputid_batchrxcerror" style="color:red;padding-left:7px"></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Patient Type</b>
                                                    <div class="form-group ic-cmp-int form-elet-mg res-mg-fcs" style="margin-top:10px;">
                                                        <div class="radio">
                                                            &nbsp;<input type="radio" name="radioname_pxtyperxc" id="radioid_inpatientrxc" value="INPATIENT" checked="" onchange="onClickInpatientRadio()"><label for="radioid_inpatientrxc">Inpatient</label>&nbsp;&nbsp;&nbsp;
                                                            &nbsp;<input type="radio" name="radioname_pxtyperxc" id="radioid_outpatientrxc" value="OUTPATIENT" onchange="onClickOutpatientRadio()"><label for="radioid_outpatientrxc">Outpatient</label>
                                                        </div>
                                                    </div>
                                                    <input type="hidden" id="pxtyperxchiddentext" name="hidname_pxtyperxc" value="Inpatient">
                                                </div>
                                                <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Attending Doctor</b>
                                                    <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                        <input type="text" name="inputname_attenddocrxc" id="inputid_attenddocrxc" class="form-control" autocomplete="off" placeholder="Input Doctor">
                                                        <span class="input-group-addon" id="" style="padding:0px;border-left:transparent;">
                                                            <button type="button" id="" class="btn btn-primary btn-round" style="margin:0px;height:36px;" onclick="showSearchDoctorModalForAdmission()">
                                                                <i class="zmdi zmdi-plus"></i>
                                                            </button>
                                                        </span>
                                                    </div> 
                                                    <p id="inputid_attenddocrxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Patient Name</b>
                                                    <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                        <input type="text" name="inputname_pxnamerxc" id="inputid_pxnamerxc" class="form-control" autocomplete="off" placeholder="Input Patient Name">
                                                        <span class="input-group-addon" id="" style="padding:0px;border-left:transparent;">
                                                            <button type="button" id="" class="btn btn-primary btn-round" style="margin:0px;height:36px;" onclick="searchPatientForRxCreatorOrMaker()">
                                                                <i class="zmdi zmdi-search"></i>
                                                            </button>
                                                        </span>
                                                    </div> 
                                                    <p id="inputid_pxnamerxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Date of Birth</b>
                                                    <input type="text" id="inputid_birthdaterxc" class="form-control datetimepicker" value="" autocomplete="off" onchange="onChangeDateofBirthRXCreatorMaker();" placeholder="Click to choose">
                                                    <p id="inputid_birthdaterxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Age</b>
                                                    <input type="text" id="inputid_agerxc" class="form-control" value="" autocomplete="off" disabled="">
                                                    <p id="inputid_agerxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                </div>
                                            </div>
                                            <div class="row clearfix" style="margin-top:10px;padding-top:0px;margin-bottom:16px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Address</b>
                                                    <input type="text" name="inputname_addressrxc" id="inputid_addressrxc" class="form-control" autocomplete="off" placeholder="Input Address">
                                                    <p id="inputid_addressrxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Date</b>
                                                    <input type="text" id="inputid_todaydaterxc" class="form-control datetimepicker" value="<?= $currentfulldate ?>" autocomplete="off">
                                                    <p id="inputid_todaydaterxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Gender</b>
                                                    <select name="selectname_genderrxc" id="selectid_genderrxc" class="form-control selectpicker">
                                                        <optgroup>
                                                            <option value="Select">Select from List</option>
                                                            <option value="MALE">MALE</option>
                                                            <option value="FEMALE">FEMALE</option>
                                                        </optgroup>
                                                    </select>
                                                    <p id="selectid_genderrxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="tabpanel" class="tab-pane in" id="GenericsContent">
                                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <div class="row clearfix">
                                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Type of Document</b>
                                                            <select name="selectname_doctyperxc" id="selectid_doctyperxc" class="form-control selectpicker" data-live-search="false" onchange="onChangeTypeofDocumentSelectElement()">
                                                                <optgroup>
                                                                    <option value="Select">Select from List</option>
                                                                    <option value="RX PRESCRIPTION">RX PRESCRIPTION</option>
                                                                    <option value="LABORATORY REQUEST">LABORATORY REQUEST</option>
                                                                    <option value="RADIOLOGY REQUEST">RADIOLOGY REQUEST</option>
                                                                    <option value="TEST/EXAM REQUEST">TEST/EXAM REQUEST</option>   
                                                                    <option value="TAKE HOME INSTRUCTIONS">TAKE HOME INSTRUCTIONS</option>   
                                                                </optgroup>
                                                            </select>
                                                            <p id="selectid_doctyperxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Reason of Prescription</b>
                                                            <select name="selectname_presreasonrxc" id="selectid_presreasonrxc" class="form-control selectpicker" data-live-search="false">
                                                                <optgroup>
                                                                    <option value="Select">Select from List</option>
                                                                    <option value="Over Credit Limit/Need Deposit">Over Credit Limit/Need Deposit</option>
                                                                    <option value="No. Item of Stock">No. Item of Stock</option>
                                                                    <option value="Other Reason">Other Reason</option>
                                                                </optgroup>
                                                            </select>
                                                            <p id="selectid_presreasonrxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix" style="margin-top:15px;">
                                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Item/Generic</b>
                                                            <div class="input-group" style="margin-bottom:0px;padding-bottom:0px;">
                                                                <input type="text" name="inputname_genericrxc" id="inputid_genericrxc" class="form-control" autocomplete="off">
                                                                <span class="input-group-addon" id="spanid_genericrxc" style="padding:0px;border-left:transparent;">
                                                                    <button type="button" id="buttonid_genericrxc" class="btn btn-primary btn-round" style="margin:0px;height:36px;" onclick="showExternalItemsListingModal()">
                                                                        <i class="zmdi zmdi-search"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                            <p id="inputid_genericrxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Brand</b>
                                                            <input type="text" name="inputname_gen200rxc" id="inputid_gen200rxc" class="form-control" autocomplete="off">
                                                            <p id="inputid_gen200rxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix" style="margin-top:10px;margin-bottom:15px;">
                                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Instruction</b>
                                                            <input type="text" name="inputname_instructrxc" id="inputid_instructrxc" class="form-control" autocomplete="off">
                                                            <p id="inputid_instructrxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Quantity</b>
                                                            <input type="text" name="inputname_quantityrxc" id="inputid_quantityrxc" class="form-control" autocomplete="off" data-mask="9999" data-mask-selectonfocus="true">
                                                            <p id="inputid_quantityrxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Unit</b>
                                                            <input type="text" name="inputname_unitrxc" id="inputid_unitrxc" class="form-control" autocomplete="off">
                                                            <p id="inputid_unitrxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" style="border-left:1px solid #ededed;margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <b>&nbsp;&nbsp;&nbsp;Patient Account</b>
                                                    <div class="row clearfix">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div class="row clearfix">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <button type="button" id="" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary btn-round waves-effect" onclick='checkBalance()'>CHECK BALANCE</b></button>
                                                                </div>
                                                            </div>
                                                            <div class="row clearfix" style="margin-top:5px;">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <b>&nbsp;&nbsp;&nbsp;Balance</b>
                                                                    <input type="text" name="inputname_balancerxc" id="inputid_balancerxc" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="row clearfix" style="margin-top:10px;">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <b>&nbsp;&nbsp;&nbsp;Payment Made</b>
                                                                    <input type="text" name="inputname_paymentrxc" id="inputid_paymentrxc" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div role="tabpanel" class="tab-pane" id="ConfirmContent">
                                            <div class="row clearfix" style="margin-top:10px;padding-top:0px;margin-bottom:5px;padding-bottom:0px;padding-left:30px;padding-right:30px">
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <div class="row clearfix" style="margin-top:0px;">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <b>&nbsp;&nbsp;&nbsp;Note/Special Instruction (Footer Area)</b>
                                                            <textarea name="textareaname_specialinsrxc" id="textareaid_specialinsrxc" class="form-control m-b-20" rows="3" placeholder="Type Here.." style="background:#EBEDED;border-radius:15px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                                                            <p id="textareaid_specialinsrxcerror" class="d-none" style="color:red;padding-left:15px"></p>
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix" style="margin-top:20px;">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <p class="shadow-effect" style="text-align:justify;background:#DDD6FA;border:1px solid #DEE0E0;border-radius:5px;padding-left:10px;padding-right:10px;padding-bottom:10px;padding-top:10px;margin-bottom:0px;">
                                                                You have up to five (5) items that can fit in one prescription. However, you can have as many as you want.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;">
                                                    <div class="row clearfix d-none">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <p id="myFormGenericMultipleDataStorage" class="d-none"></p>
                                                            <p id="inputid_hiddengenericrxc" class="d-none"></p>
                                                            <input type="hidden" id="inputid_genericdatarxc"> 
                                                            <input type="hidden" id="inputid_finalgenericdatarxc">
                                                        </div>
                                                    </div>
                                                    <div class="row clearfix">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">        
                                                            <b>List of Prescribed Meds/Test/Instruction</b>
                                                            <div class="row clearfix">
                                                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">      
                                                                    <button type="button" id="buttonid_deleterxaddrxc" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-sm btn-danger waves-effect" onclick="onClickDeleteOldRxButton()">
                                                                        <b>REMOVE RX</b>
                                                                    </button>
                                                                </div>
                                                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    <button type="button" id="" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-sm btn-primary waves-effect" onclick="onClickCreateNewRxButton()">
                                                                        <b id="boldid_createrxrxc">NEXT RX</b>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="row clearfix">
                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                                                                    <div class="well" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px">
                                                                        <div class="tab-pane table-responsive active" id="All" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;background:#e3e3e3;border-radius:10px;">
                                                                            <table class="table table-bordered table-striped table-hover" id="prescribed-medstestins-listings-table" style="margin-bottom:0px">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th id="table-head-no">No.</th>
                                                                                        <th id="table-head-name">Generics</th>
                                                                                        <th id="table-head-name">Brand</th>
                                                                                        <th id="table-head-name">Instruction</th>
                                                                                        <th id="table-head-name">Quantity</th>
                                                                                        <th id="table-head-name">ProductID</th>
                                                                                        <th id="table-head-name">HospitalCode</th>
                                                                                        <th id="table-head-name">Reference</th>
                                                                                        <th id="table-head-action">TextboxID</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>

                                                                                </tbody>
                                                                            </table> 
                                                                        </div>
                                                                    </div>
                                                                    <p id="inputid_finalgenericdatarxcerror" class="d-none" style="color:red;padding-left:15px"></p>
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
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding-left:30px;padding-right:30px;padding-bottom:20px;padding-top:0px;">
                    <button type="button" id='back1buttonrxc' class="btn btn-default waves-effect" onclick="hideCreateNewRxModalForRxCreatorMaker()">CLOSE</button>
                    <button type="button" id='back2buttonrxc' class="btn btn-default waves-effect d-none" onclick="onClickBackButton1()">BACK</button>
                    <button type="button" id='back3buttonrxc' class="btn btn-default waves-effect d-none" onclick="onClickBackButton2()">BACK</button>
                    <button type="button" id='step1buttonrxc' class="btn btn-info waves-effect" onclick="onClickProceedButton1()">PROCEED</button>
                    <button type="button" id='step2buttonrxc' class="btn btn-info waves-effect d-none" onclick="onClickProceedButton2()">PROCEED</button>
                    <button type="button" id='step3buttonrxc' class="btn btn-info waves-effect d-none" onclick="addNewPrescription()">SAVE</button>
                </div>
            </form>
        </div>
    </div>
</div>

