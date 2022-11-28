<section class="content">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Walk-In Patients
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Dashboard'); ?>"><i class="zmdi zmdi-home"></i> Drainwiz</a></li>
                    <li class="breadcrumb-item"><a href="">Walk-In Patients</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card patients-list">
                    <div class="header">
                        <h2><strong>Walk-In Patients</strong> List</h2>
                        <button type="button" class="btn btn-primary btn-round waves-effect float-right" onclick='showAddNewWalkinPatientModal()'>
                            <i class="zmdi zmdi-plus"></i>&nbsp;&nbsp;<b>NEW WALK-IN PX</b>
                        </button
                        <br><br>
                    </div>
                    <div class="body">
                        <div class="tab-content m-t-10">
                            <div role="tabpanel" class="tab-pane in active" id="normal">
                                <div class="tab-pane table-responsive active">
                                    <table class="table table-bordered table-striped table-hover" id="walkin-patients-masterlist-table">
                                        <thead>
                                            <tr>  
                                                <th>No.</th>
                                                <th>Action</th>
                                                <th>Pic</th>
                                                <th>Patient Name</th>
                                                <th>Member I.D.</th>
                                                <th>Birthday</th>
                                                <th>Gender</th>
                                                <th>Address</th>
                                                <th>OPD Ref.No.</th>
                                                <th>Updated</th>
                                                <th>Pic Path</th>
                                                <th>Cellphone No.</th>
                                                <th>OPD Code</th>
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


<?php $this->load->view('modals/walkin_management'); ?>
<?php $this->load->view('modals/pxmasterlist_foremergency'); ?>
<?php $this->load->view('modals/edit_patient'); ?>


<?php $this->load->view('modals/quickpx_masterlist'); ?>
<?php $this->load->view('modals/admit_patient'); ?>
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