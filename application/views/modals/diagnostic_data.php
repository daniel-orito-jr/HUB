<div class="modal fade" id="diagnosticdatamodal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="title" id="largeModalLabel">Patient Admission Data</h4>
            </div>

            <div class="modal-body">
                <br>

                <form id="generate-patient-admission-sheet-form" action="<?= base_url("Admission/generateAdmissionSheet1") ?>" method="POST" target="_blank" >
                    <input type="hidden" name="hiddennameforprintadmission">
                </form>

                <form id="generate-patient-clinical-diagnostic-data-form" action="<?= base_url("Admission/generateClinicalDiagnosticData1") ?>" method="POST" target="_blank" >
                    <input type="hidden" name="hiddennameforprintclinicaldiagnostic">
                </form>

                <form id="generate-patient-diagnostic-data-form" action="<?= base_url("Admission/GenerateDiagnosticSheet") ?>" method="POST" target="_blank" >
                    <input type="hidden" name="hiddennameforprintdiagnostic">
                </form>

                <input type="hidden" id="inputid_hiddencasenogenerate" name="inputname_hiddenIDadm">

                <div class="radio">
                    <input type="radio" name="radio1" id="admission" value="option1" checked>
                    <label for="admission">
                        Patient Admission Information Sheet
                    </label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio1" id="clinical" value="option2">
                    <label for="clinical">
                        Patient Clinical Admission Record
                    </label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio1" id="diagnose" value="option3">
                    <label for="diagnose">
                        Patient Medical Diagnostic Sheet
                    </label>
                </div>
            </div>

            <div class="row" style="margin-bottom:17px;padding-left:20px;padding-right:20px;">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <button type="button" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-info waves-effect" onclick="printAdmissionData()">GENERATE DATA</button>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <button type="button" id="buttonid_indirectcancelbutton" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect" onclick="hideDiagnosticDataModal()">CLOSE</button>
                    <button type="button" id="buttonid_directcancelbutton" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-danger waves-effect d-none" onclick="hideDiagnosticDataModalForDirectPrint()">CLOSE</button>
                </div>
            </div>

        </div>
    </div>
</div>