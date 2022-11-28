<div class="modal fade" id="creditadvisorymodal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" style="margin-bottom:0px;margin-top:5px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;margin-left:0px;margin-right:0px;">
                <h4 class="title" id="defaultModalLabel">Credit Advisory</h4>
            </div>
            <div class="modal-body" style="margin-bottom:0px;margin-top:5px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;margin-left:0px;margin-right:0px;"> 
                <div class="row clearfix" style="margin-bottom:0px;padding-bottom:0px;">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="alert alert-danger" role="alert" style="margin:0px;">
                            <div class="container">
                                <center>
                                    <b>RISK MANAGEMENT</b>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row clearfix" style="margin-top:0px;margin-bottom:0px;padding-bottom:0px;">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom:0px;padding-bottom:0px;">
                        <div class="card float-right" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                            <div class="header">
                                <h2 class="float-right">
                                    <strong id="smallid_patientname"></strong>
                                    <small id="smallid_patientroom"></small>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row clearfix d-none">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <input type="hidden" id="hiddid_patientno">
                    </div>
                </div>
                <div class="row clearfix" style="margin-top:10px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;">
                        <b>&nbsp;&nbsp;&nbsp;Current Balance</b>
                        <div class="form-group" style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;">
                            <input type="text" name="" id="textid_currentbal" class="form-control" autocomplete="off" readonly="">
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <b>&nbsp;&nbsp;&nbsp;Credit Line(MAX)</b>
                        <div class="form-group">
                            <input type="number" name="" id="textid_creditline" class="form-control" autocomplete="off">
                            <p id="textid_creditlineerror" hidden="true" style="color:red;">Please input information on the field!</p>
                        </div>
                    </div>
                </div>
                <div class="row clearfix" style="margin-top:10px;padding-top:0px;margin-bottom:0px;padding-bottom:0px;padding-left:0px;padding-right:0px">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="card" style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;">
                            <div class="header" style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;">
                                <h2>
                                    <strong >CREDIT MANAGEMENT</strong>
                                </h2>
                                <b></b>                  
                            </div>
                            <div class="body" style="padding-top:10px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                <div class="row clearfix" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Credit Status</b>
                                        <div class="form-group">
                                            <input type="text" name="" id="textid_creditstat" class="form-control" autocomplete="off" readonly="">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <b>&nbsp;&nbsp;&nbsp;Need Deposit</b>
                                        <div class="form-group">
                                            <input type="text" name="" id="textid_needeposit" class="form-control" autocomplete="off" readonly="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                       <div class="card" style="margin-bottom:0px;padding-bottom:0px;margin-top:0px;padding-top:0px;">
                            <div class="header">
                                <h2 class="">
                                    <strong>NOTE:</strong>
                                    <small style="text-align:justify" id="smallid_instruction"></small>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row clearfix" style="margin-top:7px;">
                    <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12">
                        
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                        <button type="button" class="btn btn-warning waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" id="updatePatientStatusCreditLineButton" onclick="updatePatientStatusCreditLine()">UPDATE</button>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                        <button type="button" class="btn btn-danger waves-effect col-lg-12 col-md-12 col-sm-12 col-xs-12" onclick="hideCreditAdvisoryModal()">CLOSE</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="margin-bottom:17px;margin-top:0px;padding-bottom:0px;padding-top:0px;padding-left:20px;padding-right:20px;margin-left:0px;margin-right:0px;">
                
            </div>
        </div>
    </div>
</div>