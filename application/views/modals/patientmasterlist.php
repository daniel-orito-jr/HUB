<div class="modal fade" id="patientmasterlistmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header" style="margin:0px;padding:0px;">
                <h4 class="title" id="largeModalLabel">Patient Masterlist</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row clearfix">
                        <div class="col-md-12">
                            <div class="card patients-list">
                                <div class="header">
                                    <h2><strong>Patient</strong> List</h2>
                                </div>
                                <div class="body">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs padding-0">
                                        <li class="nav-item"><button type="button" class="btn btn-primary btn-round waves-effect float-right" style='margin-left:70%;' onclick='showAddSLCode();' title="ADD SL CODE"><i class="material-icons">person_add</i></button></li>
                                        <!--                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#USA">USA</a></li>
                                                                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#India">India</a></li>-->
                                    </ul>

                                    <div id="addslcode" class="body d-none">
                                        <input type="text" name="doccd" id="doccd" class="form-control gender-class d-none" placeholder="Enter Nurse CD" autocomplete="off">
                                        <input type="text" name="accountid" id="accountid" class="form-control gender-class d-none" placeholder="Enter Account ID" value="<?= $this->session->userdata('ID'); ?>" autocomplete="off">
                                        <input type="text" name="accountname" id="accountname" class="form-control gender-class d-none" placeholder="Enter Account Name" value="<?= $this->session->userdata('empname'); ?>" autocomplete="off">

                                        <div class="row clearfix">

                                            <div class="col-md-4">
                                                <div style="margin-top: 2%;">
                                                    <b>SL Code</b>
                                                </div>
                                                <div class="form-group" style="margin-top:5%;">
                                                    <input type="text" id='slcode' class="form-control" readonly>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>COA Reference</b><button type="button" class="btn btn-sm btn-default" onclick="showCOAModal();">
                                                    <i class="zmdi zmdi-search-in-file"></i>
                                                </button>
                                                <div class="form-group">
                                                    <input type="text" id='coareference' class="form-control" placeholder="Enter COA Reference">
                                                    <p id="coareferenceerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>PIN Reference</b><button class="btn btn-sm btn-default">
                                                    <i class="zmdi zmdi-search-in-file"></i>
                                                </button>
                                                <div class="form-group">
                                                    <input type="text" id='pinreference' class="form-control" placeholder="Enter PIN Reference">
                                                    <p id="pinreferenceerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row clearfix">
                                            <div class="col-md-4">
                                                <b>SL Description</b>
                                                <div class="form-group">
                                                    <input type="text" id='sldescription' class="form-control" placeholder="Enter SL Description">
                                                    <p id="sldescriptionerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>SL Address</b>
                                                <div class="form-group">
                                                    <input type="number" id='sladdress' class="form-control" placeholder="Enter SL Address">
                                                    <p id="sladdresserror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>


                                            <div class="col-md-4">
                                                <b>Active</b>
                                                <div class="checkbox">
                                                    <input id="active" type="checkbox" checked="">
                                                    <label for="active">
                                                        Active
                                                    </label>
                                                </div>
                                            </div>
                                        </div>



                                    </div>

                                    <!-- Tab panes -->
                                    <div class="tab-content m-t-10">
                                        <div class="tab-pane table-responsive active" id="All">
                                            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="patient-masterlist-table">
                                                <thead>
                                                    <tr>                                       
                                                        <th>Action</th>
                                                        <th>Patient Name</th>
                                                        <th>PIN</th>
                                                        <th>Hosp. No.</th>
                                                        <th>Birthday</th>
                                                        <th>Sex</th>
                                                        <th>Contact No.</th>
                                                        <th>Religion</th>
                                                        <th>Last Discharged</th>
                                                        <th>Address/Brgy</th>
                                                        <th>City/Mun</th>
                                                        <th>ID</th>
                                                        <th>Updated</th>
                                                        <th>SL Code</th>
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
            <div class="modal-footer">
                <button type="button" id='patientselectbutton' class="btn btn-primary btn-round waves-effect" style='margin-left:70%;'>OK/SELECT</button>
                <button type="button" id='packageselectbutton' class="btn btn-primary btn-round waves-effect d-none" style='margin-left:70%;'>OK/SELECT</button>
                <button type="button" id='savebutton' class="btn btn-primary btn-round waves-effect d-none" style='margin-left:70%;' onclick="$('#savebutton').removeClass('d-none');
                        $('#updatebutton').addClass('d-none');
                        addNurses();">SAVE CHANGES</button>
                <button type="button" id='updatebutton' class="btn btn-primary btn-round waves-effect d-none" style='margin-left:70%;' onclick='updateNurses();'>SAVE CHANGES</button>
                <button type="button" class="btn btn-danger btn-round waves-effect" data-dismiss="modal" onclick="hideNursesModal();">CLOSE</button>
            </div>
        </div>
    </div>
</div>