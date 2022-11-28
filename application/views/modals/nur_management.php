<!--<div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
<div class="modal fade" id="searchnursemodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
            <div class="modal-header" style="padding-bottom:0px;padding-top:7px;margin-bottom:0px;margin-top:0px;">
                <h4 class="title" id="largeModalLabel">Nurses Management</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                <div class="tab-pane" id="All" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                    <div class="row" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:12px;padding-right:12px;">
                        <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showAddNursesModal()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW NURSE</b></button>
                    </div>
                    <table class="table table-bordered" id="nurses-masterlist2-table">
                        <thead>
                            <tr>                                       
                                <th id="table-head-action2">Action</th>
                                <th id="table-head-action2">Code</th>
                                <th id="table-head-hospno">Last&nbsp;&nbsp;Name</th>
                                <th id="table-head-hospno">First&nbsp;&nbsp;Name</th>
                                <th id="table-head-action2">Prof</th>
                                <th id="table-head-action2">PTR&nbsp;&nbsp;No.</th>
                                <th id="table-head-action2">Can&nbsp;&nbsp;Admit</th>
                                <th id="table-head-name">Address</th>
                                <th id="table-head-action2">Last&nbsp;&nbsp;Update</th>
                                <th id="table-head-action2">Nurse&nbsp;&nbsp;Refno.</th>
                            </tr>
                        </thead>
                    <tbody>
                    </tbody>
                </table>
                </div>
            </div>
            <div class="modal-footer" style="padding-bottom:0px;padding-top:0px;margin-bottom:20px;margin-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideSearchNurseModalForAdmission()">CLOSE</button>
                <button type="button" id='savebutton' class="btn btn-info waves-effect" onclick="selectNurseForAdmitPatient()">SELECT</button>
            </div>
        </div>
    </div>
</div>

