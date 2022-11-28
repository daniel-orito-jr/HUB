<!--<div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
<div class="modal fade" id="docmasterlistmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
            <div class="modal-header" style="padding-top:0px;padding-bottom:10px;margin-bottom:0px;margin-top:10px;padding-left:23px;padding-right:23px">
                <h4 class="title" id="largeModalLabel">Doctors Listing</h4>
            </div>
            <div class="modal-body" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
<!--                <div class="row" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;padding-left:15px;padding-right:15px;">
                    <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick=""><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW DOCTOR</b></button>
                </div>-->
                
                <div class="tab-pane" id="All" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                    <table class="table table-bordered" id="docmasterlist-forpackage-table">
                        <thead>
                            <tr>                                       
<!--                                <th id="table-head-action2">Action</th>-->
                                <th id="table-head-no">No</th>
                                <th id="table-head-action2">Last&nbsp;&nbsp;Name</th>
                                <th id="table-head-action2">First&nbsp;&nbsp;Name</th>
                                <th id="table-head-action">Title</th>
                                <th id="table-head-action">License&nbsp;&nbsp;No.</th>
                                <th id="table-head-action">PTR&nbsp;&nbsp;No.</th>
                                <th id="table-head-action">S2&nbsp;&nbsp;No.</th>
                                <th id="table-head-action">PHIC&nbsp;&nbsp;No.</th>
                                <th id="table-head-name">T.I.N</th>
                                <th id="table-head-type">Type</th>
                                <th id="table-head-action">Phic</th>
                                <th id="table-head-action">Phic&nbsp;&nbsp;Rate</th>
                                <th id="table-head-action">Admission&nbsp;&nbsp;Rate</th>
                                <th id="table-head-descmgh">Address</th>
                                <th id="table-head-action">Last&nbsp;&nbsp;Update</th>
                                <th id="table-head-action">Code</th>
                                <th id="table-head-action">Cell&nbsp;&nbsp;No.</th>
                                <th id="table-head-action">Acct&nbsp;&nbsp;No.</th>
                                <th id="table-head-action">SL&nbsp;&nbsp;OPD</th>
                                <th id="table-head-action">SL&nbsp;&nbsp;IPD</th>
                                <th id="table-head-action">Tax%</th>
                                <th id="table-head-action">Doc.Ref.No</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>                            
                </div>
            </div>
            <div class="modal-footer" style="padding-top:0px;padding-bottom:0px;margin-bottom:20px;margin-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideSearchDoctorsModalForPackage()">CLOSE</button>
                <button type="button" id='selectdoctorforadmitpatient' class="btn btn-info waves-effect" onclick="selectDoctorsForPackageManagement()">OK/SELECT</button>
            </div>
        </div>
    </div>
</div>

