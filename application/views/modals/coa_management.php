<div class="modal fade" id="coamanagementmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="title" id="largeModalLabel">COA Management</h4>
            </div>
            <div class="modal-body">

                <!--TABLE-->
                <div class="container-fluid">
                    <div class="row clearfix">
                        <div class="col-md-12">
                            <div class="card patients-list">
                                <div class="header">
                                    <h2><strong>COA</strong> List</h2>
                                </div>
                                <div class="body">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs padding-0">
<!--                                        <li class="nav-item">
                                            <b>Account Type</b>
                                            <div class="btn-group bootstrap-select form-control show-tick">
                                                <select class="form-control show-tick" tabindex="-98" id='hospitalor'>
                                                    <option value="1">ASSET</option>
                                                    <option value="2">LIABILITIES</option>
                                                    <option value="3">CAPITAL</option>
                                                    <option value="4">INCOME</option>
                                                    <option value="5">EXPENSE</option>
                                                    <option value="9">TRANSITORY</option>
                                                    <option value="ALL">ALL</option>
                                                </select></div>
                                        </li>-->
                                        <!--<li class="nav-item">-->
                                        <div class='d-none'>
                                            <b>CATEGORY</b>
                                            <div class="btn-group bootstrap-select form-control show-tick">
                                                <select class="form-control show-tick" tabindex="-98" id='category'>
                                                    <option value="1">POSTING</option>
                                                    <option value="0">GROUP</option>
                                                    <option value="ALLCATEGORY">ALL</option>

                                                </select></div>
                                        </div>
                                        <!--</li>-->
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
                                                <b>COA Reference</b><button class="btn btn-sm btn-default">
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
                                            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="coa-masterlist-table">
                                                <thead>
                                                    <tr>                                       
                                                        <th>Account Title</th>
                                                        <th>Account Code (AC)</th>
                                                        <th>Acct Type</th>
                                                        <th>Parent AC</th>
                                                        <th>By Dept</th>
                                                        <th>w/SL</th>
                                                        <th>Category</th>
                                                        <th>Level</th>
                                                        <th>SGrouping</th>
                                                        <th>Access</th>
                                                        <th>Updated</th>
                                                        <th>Refno</th>
                                                        <th>Default</th>
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
                <!--END OF TABLE-->

            </div>
            <div class="modal-footer">
                <button type="button" id='selectcoabutton' class="btn btn-primary btn-round waves-effect" style='margin-left:70%;'>OK/SELECT</button>
                <button type="button" id='savebutton' class="btn btn-primary btn-round waves-effect d-none" style='margin-left:70%;' onclick="$('#savebutton').removeClass('d-none');
                        $('#updatebutton').addClass('d-none');
                        addNurses();">SAVE CHANGES</button>
                <button type="button" id='updatebutton' class="btn btn-primary btn-round waves-effect d-none" style='margin-left:70%;' onclick='updateNurses();'>SAVE CHANGES</button>
                <button type="button" class="btn btn-danger btn-round waves-effect" data-dismiss="modal" onclick="hideNursesModal();">CLOSE</button>
            </div>
        </div>
    </div>
</div>