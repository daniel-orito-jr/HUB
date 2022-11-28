<div class="modal fade" id="sendsmslabtestresultmodal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-bottom:0px;">
            <div class="modal-header" style="margin-top:0px;margin-bottom:0px;padding-top:10px;padding-bottom:0px;">
               <h4 class="title" id="largeModalLabel">Send Text Data</h4>
            </div>

            <div class="modal-body" style="margin-top:5px;margin-bottom:0px;padding-top:0px;padding-bottom:0px;">
                <div class="row clearfix" style="margin-top:10px;">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <textarea name="textareaname_txtmessagereslab" id="textareaid_txtmessagereslab" class="form-control m-b-20" rows="5" placeholder="" style="background:#EBEDED;border-radius:5px;padding:10px 10px;padding-bottom:0px;margin-bottom:0px"></textarea>
                    </div>
                </div>
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <b>&nbsp;&nbsp;&nbsp;Send Data to:</b>
                        <select name="selectname_doctorreslab" id="selectid_doctorreslab" class="form-control selectpicker" data-live-search="true">
                            <optgroup>
                                <option value="Select">Select from List</option>
                                <option value="DOCTOR TESTING - MD">DOCTOR TESTING - MD</option> 
                            </optgroup>
                        </select>
                    </div>
                </div>
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <b>&nbsp;&nbsp;&nbsp;Cellphone No.:</b>
                        <input type="text" name="inputname_contactnoreslab" id="inputid_contactnoreslab" class="form-control" data-mask="99999999999" data-mask-selectonfocus="true" autocomplete="off" required>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer" style="margin-top:10px;margin-bottom:20px;padding-top:0px;padding-bottom:0px;">
                <button type="button" class="btn btn-danger waves-effect" onclick="hideSendTextMessageModal()">CLOSE</button>
                <button type="button" class="btn btn-info waves-effect" onclick="sendLabResultThoughSMSToDoctor()" id="sentSMSNowButton">SEND NOW</button>
            </div>
        </div>
    </div>
</div>