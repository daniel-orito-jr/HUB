<!--<div>Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
<!--<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->

<div class="modal fade" id="add_route_medicines" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                <h4 class="title" id="largeModalLabel"></h4>
            </div>
            <div class="modal-body">
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card">
                            <div class="header">
                                
                                <input type="hidden" id="txtCasecode" name="txtCasecode">
                                <h2>Case number: <strong><span id="sp_csno"></span></strong></h2>
                                <h2>Admission Date: <strong><span id="sp_ad"></span></strong></h2>
                                <h2 id="dd" hidden>Discharged Date: <strong><span id="sp_dd"></span></strong></h2>
                                <h2>Status: <strong> <span id="sp_stat"></span></strong></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row clearfix">
                    <div class="col-md-12 col-lg-12">
                        <div class="panel-group" id="accordion_1" role="tablist" aria-multiselectable="true">
                            <div class="panel panel-primary">
                                <div class="panel-heading " role="tab" id="headingOne_1">
                                    <p class="panel-title bg-cyan" style="color:white;"> <a role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_1" aria-expanded="true" aria-controls="collapseOne_1"> 
                                            &#9673; COURSE IN THE WARD </a> </p>
                                </div>
                                <div id="collapseOne_1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_1">
                                    <div class="panel-body"> 
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12">
                                                <div class="card">
                                                    <div class="body">
                                                        <div class="table-responsive">
                                                            <table class="table m-b-0 table-hover" id="doctors-order-table" style="width:100%;">
                                                                <thead>
                                                                    <tr> 
                                                                        <th>ID</th>
                                                                        <th>*</th>
                                                                        <th>Date</th>
                                                                        <th>Doctor's Order/Action</th>
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
                                        <hr>
                                        <form id="add_doctors_order_form">
                                            <input type="hidden" id="txtPHICPIN" name="txtPHICPIN">
                                            <input type="hidden" id="txtPIN" name="txtPIN">
                                            <input type="hidden" id="txtDocID" name="txtDocID"/>
                                            <input type="hidden" id="txtcasenoOrder" name="txtcasenoOrder"/>
                                            <div class="row clearfix">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Date:</b>
                                                    <div class="form-group">
                                                        <input type="date" name="txtDocDate" id="txtDocDate" class="form-control"  autocomplete="off" required >
                                                        <small id="txtDocDateError" style="color:red;padding-left:7px"></small>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;Doctor's Order:</b>
                                                    <div class="form-group">
                                                        <textarea rows="3" class="form-control no-resize" placeholder="Description" name="txtDocOrder" id="txtDocOrder"></textarea>
                                                        <small id="txtDocOrderError" style="color:red;padding-left:7px"></small>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <button type="button" class="btn btn-default btn-round waves-effect float-right" onclick="validateDocOrder()">SAVE CHANGES</button>
                                        <br> <br>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-primary">
                                <div class="panel-heading" role="tab" id="headingTwo_1">
                                    <p class="panel-title bg-cyan" style="color:white;" > <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseTwo_1" aria-expanded="false"
                                            aria-controls="collapseTwo_1">  &#9673; DRUGS AND MEDICINES </a> </p>
                                </div>
                                <div id="collapseTwo_1" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo_1">
                                    <div class="panel-body"> 
                                        <div class="row clearfix">
                                            <div class="col-lg-12 col-md-12 col-sm-12">
                                                <div class="card">
                                                    <div class="body">
                                                        <div class="table-responsive">
                                                            <table class="table m-b-0 table-hover" id="drugs-medicine-table">
                                                                <thead>
                                                                    <tr>     
                                                                        <th>ID</th>
                                                                        <th>HOSPITAL CODE</th>
                                                                        <th>DRUG DESCRIPTION</th>
                                                                        <th>ROUTE </th>
                                                                        <th>FREQUENCY</th>
                                                                        <th>QUANTITY</th>
                                                                        <th>TOTAL AMOUNT</th>
                                                                        <th>TOTAL AMOUNT</th>
                                                                        <th>DATE ADDED</th>
                                                                        <th>DATE ADDED</th>
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
                                        <hr>
                                        <form id="add_route_medicines_form">
                                            <input type="hidden" id="txtDrugID" name="txtDrugID">
                                            <input type="hidden" id="txtProdID" name="txtProdID">
                                            <div class="row clearfix" style="color:black;">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;DRUG DESCRIPTION:</b>
                                                    <div class="form-group">
                                                        <input type="text" name="txtDrugDscr" id="txtDrugDscr" class="form-control"  autocomplete="off" required readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row clearfix">
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;ROUTE:</b>
                                                    <div class="form-group">
                                                        <input type="text" name="txtRoute" id="txtRoute" class="form-control"  autocomplete="off" required >
                                                            <small id="routeError" style="color:red;padding-left:7px"></small>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;FREQUENCY:</b>
                                                    <div class="form-group">
                                                            <input type="text" name="txtFrequency" id="txtFrequency" class="form-control"  autocomplete="off" required>
                                                            <small id="frequencyError" style="color:red;padding-left:7px"></small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row clearfix">
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;QUANTITY:</b>
                                                    <div class="form-group">
                                                            <input type="number" name="txtQuantity" id="txtQuantity" class="form-control"  autocomplete="off" required readonly>

                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;AMOUNT:</b>
                                                    <div class="form-group">
                                                            <input type="number" name="txtAmount" id="txtAmount" class="form-control"  autocomplete="off" required readonly>

                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <b>&nbsp;&nbsp;&nbsp;DATE ADDED:</b>
                                                    <div class="form-group">
                                                            <input type="date" name="txtAddedDate" id="txtAddedDate" class="form-control"  autocomplete="off" required readonly>

                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <hr>
                                        <button type="button" class="btn btn-default btn-round waves-effect float-right" onclick="validateRouteFrequency()">SAVE CHANGES</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">CLOSE</button>
            </div>
        </div>
    </div>
</div>

