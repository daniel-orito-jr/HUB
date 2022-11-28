<div class="modal fade" id="opdtypeoptionmodal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-bottom:0px;">
            <div class="modal-header" style="margin-top:0px;margin-bottom:0px;padding-top:10px;padding-bottom:0px;">
               <h4 class="title" id="largeModalLabel">OPD TYPE OPTION</h4>
            </div>

            <div class="modal-body" style="margin-top:10px;margin-bottom:0px;padding-top:0px;padding-bottom:0px;">
                <input type="hidden" id="hiddenid_opdtypeadm" value="IPDPX">
                
                <div class="radio">
                    <input type="radio" name="radio1" id="radioid_emergencyadm" value="option1" onchange="onchangeemergencyradio()">
                    <label for="radioid_emergencyadm" style="font-size:13px">
                        Emergency Case Consultation
                    </label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio1" id="radioid_checkupopdadm" value="option2" onchange="onchangecheckupradio()">
                    <label for="radioid_checkupopdadm" style="font-size:13px">
                        OPD Consultation/ Check-up
                    </label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio1" id="radioid_outsideadm" value="option2" onchange="onchangeotherradio()">
                    <label for="radioid_outsideadm" style="font-size:13px;color:red;">
                        OPD Procedure/ Outside Consultation
                    </label>
                </div>
            </div>
            
            
            
            <div class="modal-footer" style="margin-top:0px;margin-bottom:20px;padding-top:0px;padding-bottom:0px;">
                <button type="button" class="" style="background:transparent;border:transparent"></button>
                <button type="button" class="btn btn-info waves-effect" onclick="onclickDoneButtonOPDTypeSelection()">DONE</button>
            </div>
        </div>
    </div>
</div>