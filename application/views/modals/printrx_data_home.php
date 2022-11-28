<div class="modal fade" id="printrxdatahomemodal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-bottom:0px;">
            <div class="modal-header" style="margin-top:0px;margin-bottom:0px;padding-top:10px;padding-bottom:0px;">
               <h4 class="title" id="largeModalLabel">RX OPTION</h4>
            </div>

            <div class="modal-body" style="margin-top:10px;margin-bottom:0px;padding-top:0px;padding-bottom:0px;">
<!--                <form id="generate-prescription-sheet-form" action="<?= base_url("Admission/generateAdmissionSheet") ?>" method="POST" target="_blank" >
                    <input type="hidden" name="hiddenname_printprescription">
                </form>-->
                <input type="hidden" id="hiddenboxid_patientcasenumberhom">
                <input type="hidden" id="hiddenboxid_rxinstructiondatehom">
                
                <div class="radio">
                    <input type="radio" name="radio1" id="radioid_printprescripthom" value="option1" checked>
                    <label for="radioid_printprescripthom">
                        Print RX
                    </label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio1" id="radioid_printinstructhom" value="option2">
                    <label for="radioid_printinstructhom">
                        Print Instruction
                    </label>
                </div>
            </div>
            
            <div class="modal-footer" style="margin-top:0px;margin-bottom:20px;padding-top:0px;padding-bottom:0px;">
                <button type="button" class="btn btn-danger waves-effect" onclick="hideUserOptionModal()">CLOSE</button>
                <button type="button" class="btn btn-info waves-effect" onclick="onclickUserOptionButtonFromSelectedRadioElement()">DONE</button>
            </div>
        </div>
    </div>
</div>