<div class="modal fade" id="dietary_guide_modal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="margin-top:0px;margin-bottom:0px;padding-bottom:0px;padding-top:0px;">
            <div class="modal-header" style="margin-top:7px;margin-bottom:0px;padding-bottom:0px;padding-top:0px;">
                <h4 class="title" id="largeModalLabel">Patient Diet Guide</h4>
            </div>
            <div class="modal-body" style="margin-top:0px;margin-bottom:0px;padding-bottom:0px;padding-top:0px;">
                <div class="row clearfix"  style="margin-top:0px;margin-bottom:0px;padding-bottom:0px;padding-top:0px;">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button id="" type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="addNewDietaryForAdmission()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;ADD DIETARY GUIDE</b></button>
                    </div>
                </div>
                <div class="tab-content m-t-10" id="" style="margin-top:0px;margin-bottom:0px;padding-bottom:0px;padding-top:0px;">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dietary_guide_table">
                            <thead>
                                <tr>    
                                    <th id="table-head-action4">Actions</th>
                                    <th id="table-head-action3">Category</th>
                                    <th id="table-head-action">Referrence&nbsp;&nbsp;No.</th>
                                    <th id="table-head-action3">Updated</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>                            
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="margin-top:0px;margin-bottom:20px;padding-bottom:0px;padding-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="close_dietary_guide()">CLOSE</button>
                <button type="button" id='savebutton' class="btn btn-info waves-effect" onclick="selectDietaryForAdmitPatient()" id="admitPatientButton">SAVE</button>
            </div>
        </div>
    </div>
</div>

