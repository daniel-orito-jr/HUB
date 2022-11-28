<section class="content">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Patient Dashboard
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Dashboard'); ?>"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item"><a href="">Patient Dashboard</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card patients-list">
                    <div class="header">
                        <h2><strong>Patient</strong> Dashboard</h2>
                    </div>
                    <div class="body" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px">
                        <div class="row clearfix">
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <b>&nbsp;Status</b>
                                <div class="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                    <div class="radio">
                                        <div class="row" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="radio" name="radioname_patientstatrxc" id="radioid_admittedtyperxc" onchange="onChangeAdmittedStatusRadio()" checked=""><label for="radioid_admittedtyperxc">Admitted Patient</label>
                                            </div>
                                        </div>
                                        <div class="row" style="margin-top:10px;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="radio" name="radioname_patientstatrxc" id="radioid_dischargetyperxc" onchange="onChangeDischargedStatusRadio()"><label for="radioid_dischargetyperxc">Discharged Patient</label>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" id="hiddenboxid_patientstatrxc" value="0">
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <div class="row" style="padding:0px;margin:0px;">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <b>&nbsp;Station</b>
                                        <select name="selectname_nursestationmgh" id="selectid_nursestationmgh" class="show-tick form-control selectpicker" data-live-search="false" onchange="filterInpatientTableViaNurseStation()">
                                            <option value="Select">ALL</option>
                                            <?php
                                                for ($i = 0; $i < count($nursestation); $i++) 
                                                {
                                                    echo "<option value='" . strtoupper($nursestation[$i]['nurselocations']) . "'>"
                                                    . strtoupper($nursestation[$i]['nurselocations']) .
                                                    "</option>";
                                                }
                                            ?>   
                                        </select>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="checkbox" style="padding-top:15px;">
                                            &nbsp;&nbsp;<input name="chckboxname_inpatientonly" id="chckboxid_inpatientonly" type="checkbox" onchange="onchangeViewInpatientOnlyCheckbox()">
                                            <label for="chckboxid_inpatientonly">
                                                <small>View In-Patients Only</small>
                                            </label>
                                        </div> 
                                        <input type="hidden" id="hiddenboxid_inpatientonly" value="0">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <img class="rounded img-raised float-right" src="<?= base_url('assets/images/px.png'); ?>" 
                                             height="145" width="145" style="border:7px solid #02bec0;border-radius:2px;top:-20px" 
                                             alt="" id="imageid_pxpictureidb">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-10 col-md-9 col-sm-6 col-xs-12">
                                <div class="tab-pane table-responsive active">
                                    <table class="table table-bordered table-hover" id="inpatient-masterlist-table">
                                        <thead>
                                            <tr style="padding-bottom:0px;padding-top:0px;">   
                                                <th id="table-head-no">No.</th>
                                                <th id="table-head-picsheader">Pic.</th>
                                                <th id="table-head-name">Name</th>
                                                <th id="table-head-action2">Patient&nbsp;&nbsp;Status</th>
                                                <th id="table-head-action2">Patient&nbsp;&nbsp;Type</th>
                                                <th id="table-head-action2">Nurse&nbsp;&nbsp;Station</th>
                                                <th id="table-head-action2">Case&nbsp;&nbsp;No.</th>
                                                <th id="table-head-action2">PIN</th>
                                                <th id="table-head-action2">Patient&nbsp;&nbsp;Code</th>
                                                <th id="table-head-action2">Contact&nbsp;&nbsp;No.</th>
                                                <th id="table-head-name">Room</th>
                                                <th id="table-head-action2">Credit&nbsp;&nbsp;Line</th>
                                                
                                                <th id="table-head-action2">Admitted&nbsp;&nbsp;Date</th>
                                                <th id="table-head-action2">Discharged&nbsp;&nbsp;Date</th>
                                                <th id="table-head-action2">Phic.</th>
                                                
                                                <th id="table-head-action2">Hospital&nbsp;&nbsp;No.</th>
                                                <th id="table-head-action2">Birthday</th>
                                                <th id="table-head-action">Sex</th>
                                                <th id="table-head-action2">Last&nbsp;&nbsp;Discharged</th>
                                                <th id="table-head-desc">Address/Baragay</th>
                                                <th id="table-head-name">City/Municipality</th>
                                                <th id="table-head-actionpacid">ID</th>
                                                <th id="table-head-actionpacup">Updated</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>                          
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-3 col-sm-6 col-xs-12">
                                <div class="row clearfix" style="margin-top:20px;">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" class="btn btn-warning waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick='onclickPrintListingButton()'>
                                            <b>PRINT LISTING</b>
                                        </button>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" class="btn btn-success waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick='showCreditAdvisoryModal()'>
                                            <b>CREDIT LINE</b>
                                        </button>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" class="btn btn-primary waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick='showPatientDiagnosisModal()'>
                                            <b>DIAGNOSIS DATA</b>
                                        </button>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" class="btn btn-danger waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>MGH CLEARANCE</b>
                                        </button>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" class="btn btn-info waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>ADMISSION DATA</b>
                                        </button>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" class="btn btn-warning waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>OFFICIAL RESULTS</b>
                                        </button>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" class="btn btn-success waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>CHARGES/ RETURNS</b>
                                        </button>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" class="btn btn-danger waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>LINKED ACCOUNT</b>
                                        </button>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" class="btn btn-info waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>ROOM STATUS</b>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <hr>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                                        <button type="button" class="btn btn-success waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>ADMIT NEW PATIENT</b>
                                        </button>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                                        <button type="button" class="btn btn-warning waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>EDIT PATIENT DATA</b>
                                        </button>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                                        <button type="button" class="btn btn-danger waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>ASSOCIATED DOCTORS</b>
                                        </button>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                                        <button type="button" class="btn btn-success waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>PATIENTS OF DOCTORS</b>
                                        </button>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                                        <button type="button" class="btn btn-primary waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick=''>
                                            <b>SEND KIOSK ACCESS CODE</b>
                                        </button>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<?php $this->load->view('modals/walkin_management'); ?>
<?php $this->load->view('modals/pxmasterlist_foremergency'); ?>
<?php $this->load->view('modals/edit_patient'); ?>
<?php $this->load->view('modals/quickpx_masterlist'); ?>
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
<?php $this->load->view('modals/quickdata_edit'); ?>
<?php $this->load->view('modals/credit_advisory'); ?>
<?php $this->load->view('modals/patient_diagnosis'); ?>