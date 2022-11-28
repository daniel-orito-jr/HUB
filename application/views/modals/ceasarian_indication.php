<div class="modal fade" id="ceasarianindicationsearch" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="padding-top:0px;padding-bottom:0px;margin-bottom:0px;margin-top:0px;">
            <div class="modal-header" style="padding-top:10px;padding-bottom:0px;padding-left:20px;margin-bottom:0px;margin-top:0px;">
                <h4 class="title" id="largeModalLabel">Ceasarian Indication Diagnosis</h4>
            </div>
            <div class="modal-body" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                <div class="row" style="padding-bottom:0px;padding-top:0px;margin-bottom:0px;margin-top:0px;padding-left:10px;padding-right:10px">
                    <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-primary waves-effect" onclick=""><i class="zmdi zmdi-plus"></i><b>&nbsp;&nbsp;NEW CEASARIAN DIAGNOSIS</b></button>
                </div>
                
                    <table class="table table-bordered" id="ceasarian-indicationlist-table">
                        <thead>
                            <tr>                                       
                                <th id="table-head-action2sl">Action</th>
                                <th id="table-head-name">Category</th>
                                <th id="table-head-action">ICD</th>
                                <th id="table-head-action">Group</th>
                                <th id="table-head-name">Ref.&nbsp;&nbsp;No.</th>
                                <th id="table-head-causes">Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>       
            </div>
            <div class="modal-footer" style="padding-bottom:20px;padding-top:0px;margin-bottom:0px;margin-top:0px;">
                <button type="button" class="btn btn-default waves-effect" onclick="hideCeasarianIndicationSearchDiagnosisModal()">CLOSE</button>
                <button type="button" class="btn btn-info waves-effect" onclick="selectCaesarianIndicationDiagnosisForMGHClearance()">SELECT</button>
            </div>
        </div>
    </div>
</div>

