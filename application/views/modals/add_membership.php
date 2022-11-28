<div class="modal fade" id="addmembershipmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="title" id="largeModalLabel">Add Membership</h4>
            </div>
            <div class="modal-body">
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card">
                            <div class="header">
                                <h2><strong>Fill up the</strong> Form</h2>
                            </div>
                            <div class="body">
                                <div class="row clearfix">
                                    <div class="col-md-4">
                                        <b>OPD ref</b>
                                        <div class="form-group">
                                            <input type="text" id='firstname' class="form-control" placeholder="Enter First Name">
                                            <p id="firstnameerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <b>PIN</b>
                                        <div class="form-group">
                                            <input type="text" id='lastname' class="form-control" placeholder="Enter Last Name">
                                            <p id="lastnameerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <b>Member Name</b>
                                        <div class="form-group">
                                            <input type="text" id='lastname' class="form-control" placeholder="Enter Last Name">
                                        </div>
                                    </div>

                                </div>

                                <div class="row clearfix">
                                    <div class="col-md-4">
                                        <b>Gender</b>
                                        <div class="form-group">
                                            <select name="selectname_gender" id="selectid_genderoption" class="form-control selectpicker" data-live-search="true">
                                                    <optgroup>
                                                            <option value="Select From List">Select From List</option>
                                                            <option value="MALE">MALE</option>
                                                            <option value="FEMALE">FEMALE</option>   
                                                    </optgroup>
                                            </select>
                                            <p id="addresserror" hidden="true" style="color:red;">Please input information on the field!</p>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <b>Member Card ID</b>
                                        <div class="form-group">
                                            <input type="text" id='lastname' class="form-control" placeholder="Enter Last Name">
                                            <p id="licensenumbererror" hidden="true" style="color:red;">Please input information on the field!</p>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <b>Mailing Address</b>
                                        <div class="form-group show-tick">
                                            <input type="text" id='lastname' class="form-control" placeholder="Enter Last Name">
                                        </div>
                                    </div>

                                </div>
                                <div class="row clearfix">
                                    <div class="col-md-4">
                                        <b>Mailing Address</b>
                                        <div class="form-group show-tick">
                                            <input type="text" id='lastname' class="form-control" placeholder="Enter Last Name">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <b>Mailing Address</b>
                                        <div class="form-group show-tick">
                                            <input type="text" id='lastname' class="form-control" placeholder="Enter Last Name">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-round waves-effect" style='margin-left:70%;' onclick='addNewMembership()'>SAVE CHANGES</button>
                <button type="button" class="btn btn-danger btn-round waves-effect" data-dismiss="modal" onclick="hideAddNursesModal()">CLOSE</button>
            </div>
        </div>
    </div>
</div>