<div class="modal fade" id="searchdoctormodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
            <div class="modal-header" style="padding-top:10px;padding-bottom:0px;padding-left:20px;margin-bottom:0px;margin-top:0px;">
                <h4 class="title" id="largeModalLabel">Doctors Management</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                <div class="row" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:10px;padding-right:10px">
                    <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showAddDoctorsModal()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW DOCTOR</b></button>
                </div>
                <table class="table table-bordered" id="doctors-masterlist2-table">
                    <thead>
                        <tr>                                       
                            <th id="table-head-action2">Action</th>
                            <th id="table-head-action2">Last&nbsp;&nbsp;Name</th>
                            <th id="table-head-action2">First&nbsp;&nbsp;Name</th>
                            <th id="table-head-action2">Middle&nbsp;&nbsp;Name</th>
                            <th id="table-head-action2">Suffix</th>
                            <th id="table-head-action">Title</th>
                            <th id="table-head-action">License&nbsp;&nbsp;No.</th>
                            <th id="table-head-action">PTR&nbsp;&nbsp;No.</th>
                            <th id="table-head-action">S2&nbsp;&nbsp;No.</th>
                            <th id="table-head-action">PHIC&nbsp;&nbsp;No.</th>
                            <th id="table-head-name">T.I.N</th>
                            <th id="table-head-actiondocz">Type</th>
                            <th id="table-head-action">Phic</th>
                            <th id="table-head-action">Phic&nbsp;&nbsp;Rate</th>
                            <th id="table-head-action">Admission&nbsp;&nbsp;Rate</th>
                            <th id="table-head-name">Address</th>
                            <th id="table-head-action">Last&nbsp;&nbsp;Update</th>
                            <th id="table-head-action">Code</th>
                            <th id="table-head-action">Cell&nbsp;&nbsp;No.</th>
                            <th id="table-head-action">Acct&nbsp;&nbsp;No.</th>
                            <th id="table-head-action">SL&nbsp;&nbsp;OPD</th>
                            <th id="table-head-action">SL&nbsp;&nbsp;IPD</th>
                            <th id="table-head-actiondocz">Tax%</th>
                            <th id="table-head-name">Email&nbsp;&nbsp;Address</th>
                            <th id="table-head-action">Doc.&nbsp;&nbsp;Refno.</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>       
            </div>
            <div class="modal-footer" style="padding-bottom:20px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideSearchDoctorModalForAdmission()">CLOSE</button>
                <button type="button" id='selectdoctorforadmitpatient' class="btn btn-info waves-effect" onclick="selectDoctorForAdmitPatient()">SELECT</button>
                <button type="button" id='selectdoctorforpackage' class="btn btn-info waves-effect d-none">SELECT</button>
            </div>
        </div>
    </div>
</div>

