<div class="modal fade" id="slcodeforaddpxmodal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
            <div class="modal-header" style="padding-top:15px;padding-bottom:0px;padding-left:30px;margin-bottom:0px;margin-top:0px;">
                <h4 class="title" id="largeModalLabel">SL Code Management</h4>
            </div>
            <div class="modal-body" style="padding-left:20px;padding-right:20px;padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                    <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                        <div class="col-md-12" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                            <div class="card patients-list" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                <div class="tab-content m-t-10" id="slcode-masterlist-div" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                    <div class="row" id="addslcodebuttondiv" style="padding-left:20px;padding-right:20px;padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                        <button id="addSLCodeButton" type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick="showAddSLCodeFormForAddPatient()"><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW SLCODE</b></button><br>
                                    </div> 
                                    <table class="table table-bordered" id="slcodemasterlist-table">
                                        <thead>
                                            <tr>                                       
                                                <th id="table-head-action2sl">Action</th>
                                                <th id="table-head-name">SL&nbsp;&nbsp;Account</th>
                                                <th id="table-head-action2">SL&nbsp;&nbsp;Code</th>
                                                <th id="table-head-name">SL&nbsp;&nbsp;Address</th>
                                                <th id="table-head-action">COA&nbsp;&nbsp;Ref</th>
                                                <th id="table-head-action2">Status</th>
                                                <th id="table-head-action2">Ref&nbsp;&nbsp;No.</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>                            
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                <!--END OF TABLE-->

            </div>
            <div class="modal-footer" id="slcodemodalfooter" style="padding-top:0px;padding-bottom:20px;margin-bottom:0px;margin-top:0px;">
                <button type="button" id='closedbtnforaddpxs' class="btn btn-default waves-effect" onclick="hideSLCodeModalForAddPatient()">CLOSE</button>
                <button type="button" id='closedbtnforedtpxs' class="btn btn-default waves-effect d-none" onclick="hideSLCodeModalForEdtPatient()">CLOSE</button>
                <button type="button" id='selectbtnforaddpxs' class="btn btn-info waves-effect" onclick="selectSLCodeForAddPatient()">OK/SELECT</button>
            </div>
        </div>
    </div>
</div>