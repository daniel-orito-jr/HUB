<section class="content">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Admission
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Dashboard'); ?>"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item"><a href="">Admission</a></li>
                    <li class="breadcrumb-item active">Admitted Patients</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card patients-list">
                    <div class="header">
                        <h2><strong>Admitted Patients</strong> List</h2>
                        <button type="button" class="btn btn-primary btn-round waves-effect float-right" onclick='showNewAdmissionModal()'>
                            <i class="zmdi zmdi-plus"></i>&nbsp;&nbsp;<b>NEW ADMISSION</b>
                        </button>
                        <br>
                    </div>
                    <div class="body">
                        <input type="hidden" id="quickortypicaladmissionindicator" value="TYP">
                        <ul class="nav nav-tabs padding-0">
                            <li class="nav-item"><a id="typicalid" class="nav-link active" data-toggle="tab" href="#normal" onclick="$('#quickortypicaladmissionindicator').val('TYP')">Typical Admission</a></li>
                            <li class="nav-item"><a id="quickadid" class="nav-link" data-toggle="tab" href="#quick" onclick="$('#quickortypicaladmissionindicator').val('QCK')">Quick Admission</a></li>
                        </ul>
                        <div class="tab-content m-t-10">
                            <div role="tabpanel" class="tab-pane in active" id="normal">
                                <div class="tab-pane table-responsive active">
                                    <table class="table table-bordered table-striped table-hover" id="admitted-patients-masterlist-table">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Action</th>
                                                <th>Pic</th>
                                                <th>Name</th>
                                                <th>Case No.</th>
                                                <th>Status</th>
                                                <th>Hospital No.</th>
                                                <th>Birthday</th>
                                                <th>Sex</th>
                                                <th>Last Discharged</th>
                                                <th>Address/Baragay</th>
                                                <th>City/Municipality</th>
                                                <th>ID</th>
                                                <th>Updated</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>                            
                                </div>
                            </div>

                            <div role="tabpanel" class="tab-pane" id="quick">
                                <div class="tab-pane table-responsive active">
                                    <table class="table table-bordered table-striped table-hover" id="quick-admitted-patients-masterlist-table">
                                        <thead>
                                            <tr>         
                                                <th>No.</th>
                                                <th>Action</th>
                                                <th>Pic</th>
                                                <th>Name</th>
                                                <th>Case No.</th>
                                                <th>Hospital No.</th>
                                                <th>Birthday</th>
                                                <th>Sex</th>
                                                <th>Last Discharged</th>
                                                <th>Address/Baragay</th>
                                                <th>City/Municipality</th>
                                                <th>ID</th>
                                                <th>Updated</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php $this->load->view('modals/new_admission'); ?>
<?php $this->load->view('modals/add_patients'); ?>
<?php $this->load->view('modals/edit_patient'); ?>
<?php $this->load->view('modals/admit_patient'); ?>
<?php $this->load->view('modals/diagnostic_data'); ?>
<?php $this->load->view('modals/slcode_foraddpx'); ?>
<?php $this->load->view('modals/coa_management'); ?>
<?php $this->load->view('modals/patientmasterlist'); ?>
<?php $this->load->view('modals/doc_management'); ?>
<?php $this->load->view('modals/nur_management'); ?>
<?php $this->load->view('modals/room_management'); ?>
<?php $this->load->view('modals/add_doctors'); ?>
<?php $this->load->view('modals/add_nurses'); ?>
<?php $this->load->view('modals/add_rooms'); ?>
<?php $this->load->view('modals/dietary_guide_modal'); ?>
<?php $this->load->view('modals/hmo_management'); ?>
<?php $this->load->view('modals/hmo_masterlist'); ?>
<?php $this->load->view('modals/membership_management'); ?>
<?php $this->load->view('modals/co_management'); ?>
<?php $this->load->view('modals/package_management'); ?>
<?php $this->load->view('modals/package_masterlist'); ?>
<?php $this->load->view('modals/vip_management'); ?>
<?php $this->load->view('modals/search_diagnosis'); ?>
<?php $this->load->view('modals/billingcp_infomodal'); ?>
<?php $this->load->view('modals/patientcp_infomodal'); ?>
<?php $this->load->view('modals/pxmasterlist_forpackage'); ?>
<?php $this->load->view('modals/docmasterlist_forpackage'); ?>
<?php $this->load->view('modals/slcode_form'); ?>
<?php $this->load->view('modals/search_opdwalkinref'); ?>
<?php $this->load->view('modals/supervisor_permitmodal'); ?>
<?php $this->load->view('modals/quickdata_edit'); ?>
<?php $this->load->view('modals/opdtype_option'); ?>
<?php $this->load->view('modals/search_icd10group'); ?>
<?php $this->load->view('modals/search_diagicd10rvs'); ?>
<?php $this->load->view('modals/credit_advisory'); ?>
<script>
    
</script>