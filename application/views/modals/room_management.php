<!--<div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
<div class="modal fade" id="searchroommodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
            <div class="modal-header" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                <h4 class="title" id="largeModalLabel">Rooms Management</h4>
            </div>
            <div class="modal-body" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                <div class="tab-pane" id="All" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                    <div class="row" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;padding-left:12px;padding-right:12px;">
                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showAddRoomsModal()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW ROOM</b></button>
                    </div>
                    <table class="table table-bordered" id="rooms-masterlist2-table">
                        <thead>
                            <tr>                                       
                                <th id="table-head-action2">Action</th>
                                <th id="table-head-action2">Room&nbsp;&nbsp;Ref.No</th>
                                <th id="table-head-action2">Room&nbsp;&nbsp;Code</th>
                                <th id="table-head-action2">Room&nbsp;&nbsp;Type</th>
                                <th id="table-head-name">Room/Area</th>
                                <th id="table-head-action2">Bed&nbsp;&nbsp;No.</th>
                                <th id="table-head-name">Description</th>
                                <th id="table-head-action2">Room&nbsp;&nbsp;Rate</th>
                                <th id="table-head-action2">Nursing</th>
                                <th id="table-head-action2">Price&nbsp;&nbsp;Default</th>
                                <th id="table-head-action2">Credit&nbsp;&nbsp;Max</th>
                                <th id="table-head-action2">Phic.&nbsp;&nbsp;Type</th>
                                <th id="table-head-action2">Station </th>
                                <th id="table-head-name">Patient</th>
                                <th id="table-head-action2">Admitted</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table> 
                </div>
            </div>
            <div class="modal-footer" style="padding-top:0px;padding-bottom:20px;margin-bottom:0px;margin-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideSearchRoomModalForAdmission()">CLOSE</button>
                <button type="button" id='savebutton' class="btn btn-info waves-effect" onclick="selectRoomForAdmitPatient()">SELECT</button>
            </div>
        </div>
    </div>
</div>

