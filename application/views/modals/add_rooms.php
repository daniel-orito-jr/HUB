<!--<div>Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->

<div class="modal fade" id="addroomsmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="margin-bottom:0px;margin-top:0px;padding-bottom:0px;padding-top:0px;">
            <div class="modal-header" style="margin-bottom:0px;margin-top:25px;padding-bottom:0px;padding-top:0px;">
                <div class="card" style="margin-bottom:0px;padding-bottom:0px">
                    <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px">
                        <div class="col-lg-10 col-md-6 col-sm-6 col-xs-12" style="margin-bottom:0px;padding-bottom:0px">    
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <h4 class="title addnurse_title" id="largeModalLabel">Add Room</h4>
                                    <h4 class="title edtnurse_title d-none" id="largeModalLabel">Edit Room</h4>
                                </div>
                            </div>
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="header">
                                            <h2><strong>Rooms</strong> Form</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix" style="margin-top:0px;padding-top:0px;margin-bottom:20px;padding-bottom:0px;padding-left:20px;padding-right:0px;margin-left:0px;margin-right:0px">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:0px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                    <ul class="nav nav-tabs" role="tablist" style="margin-top:0px;padding-top:0px;margin-bottom:5px;padding-bottom:0px;padding-left:0px;padding-right:0px;margin-left:0px;margin-right:0px">
                                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#roominfo">Room Information</a></li>
                                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#roomdeta">Room Details</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <div class="relative">
                                    <div class="absolute">
                                        <img class="rounded img-raised" src="<?= base_url('assets/images/rooms.png'); ?>"
                                             height="100" width="100" style="border:7px solid #02bec0;border-radius:2px;top:-20px"
                                             alt="" id="doctorimgupload">
                                    </div>
                                </div>
<!--                                <div class="relative">
                                    <div class="absolute">
                                        <button type="button" class="btn btn-sm btn-primary waves-effect"
                                                style="margin-top:85px;width:100px;left:-97px" id="doctorimguploadbtn">
                                            BROWSE
                                        </button>
                                        <input type="file" id="opendoctorimgupload" accept="image/*" style="display:none" onchange="readImageURL(this, 'doctorimgupload');"/>
                                        <p id="photoerr" style="color:red;padding-left:3px"></p>
                                    </div>
                                </div>-->
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
                                <input type="text" name="doccd" id="doccd" class="form-control gender-class d-none" placeholder="Enter Room CD" autocomplete="off">
                                <input type="text" name="accountid" id="accountid" class="form-control gender-class d-none" placeholder="Enter Account ID" value="<?= $this->session->userdata('ID'); ?>" autocomplete="off">
                                <input type="text" name="accountname" id="accountname" class="form-control gender-class d-none" placeholder="Enter Account Name" value="<?= $this->session->userdata('empname'); ?>" autocomplete="off">
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane in active" id="roominfo">
                                        <div class="row clearfix" style="margin-bottom:20px;">
                                            <div class="col-md-4">
                                                <b>Room Name/No</b>
                                                <div class="form-group">
                                                    <input type="text" id='roomsname' class="form-control" placeholder="Enter Room Name/No">
                                                    <p id="roomsnameerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <b>Bed No</b>
                                                <div class="form-group">
                                                    <input type="number" id='bedno' class="form-control" placeholder="Enter Bed No">
                                                    <p id="bednoerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>Room Hosp Code</b>
                                                <div class="form-group">
                                                    <input type="text" id='roomscode' class="form-control" readonly>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row clearfix">
                                            <div class="col-md-4">
                                                <b>Description</b>
                                                <div class="form-group">
                                                    <input type="text" id='description' class="form-control" placeholder="Enter Description">
                                                    <p id="descriptionerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>Room Rate</b>
                                                <div class="form-group">
                                                    <input type="number" id='roomsrate' class="form-control" placeholder="Enter Room Rate">
                                                    <p id="roomsrateerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>License Number</b>
                                                <div class="form-group">
                                                    <input type="number" id='creditmaximum' class="form-control" placeholder="Enter Credit Maximum">
                                                    <p id="creditmaximumerror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    
                                    <div role="tabpanel" class="tab-pane in" id="roomdeta">
                                        <div class="row clearfix" style="margin-bottom:20px;">
                                            <div class="col-md-4">
                                                <b>Room Type</b>
                                                <div class="form-group show-tick">
                                                    <select tabindex="-98" id="roomstype">
                                                        <option value="WARD">WARD</option>
                                                        <option value="PRIVATE">PRIVATE</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>Station</b>
                                                <div class="form-group show-tick">
                                                    <select tabindex="-98" id="station">
                                                        <option value="Station1">Station1</option>
                                                        <option value="3A Station">3A Station</option>
                                                        <option value="3B Station">3B Station</option>
                                                        <option value="4A Station">4A Station</option>
                                                        <option value="4B Station">4B Station</option>
                                                        <option value="ER">ER</option>
                                                        <option value="ICU">ICU</option>
                                                        <option value="NICU">NICU</option>
                                                        <option value="OR/DR">OR/DR</option>
                                                        <option value="PICU">PICU</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>PHIC Room Type</b>
                                                <div class="form-group show-tick">
                                                    <select tabindex="-98" id="phicroomstype">
                                                        <option value="Private">Private</option>
                                                        <option value="Non-Private">Non-Private</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row clearfix">

                                            <div class="col-md-4">
                                                <b>Nursing Services</b>
                                                <div class="form-group">
                                                    <input type="number" id='nursingservices' class="form-control" placeholder="Enter Nursing Services">
                                                    <p id="nursingserviceserror" hidden="true" style="color:red;">Please input information on the field!</p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <b>Nursing Service</b>
                                                <div class="checkbox">
                                                    <input id="perday" type="checkbox" checked="">
                                                    <label for="perday">
                                                        Per Day
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
                <button type="button" class="btn btn-default waves-effect" onclick="hideRoomsModal()">CLOSE</button>
                <button type="button" class="btn btn-primary waves-effect" id='savebutton' onclick="$('#savebutton').removeClass('d-none');$('#updatebutton').addClass('d-none');addRooms();">SAVE</button>
                <button type="button" class="btn btn-primary waves-effect d-none" id='updatebutton' onclick='updateRooms();'>UPDATE</button>
            </div>
        </div>
    </div>
</div>