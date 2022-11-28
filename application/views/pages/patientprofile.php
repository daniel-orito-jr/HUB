<section class="content profile-page">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Profile
                    <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">                
                <button class="btn btn-white btn-icon btn-round d-none d-md-inline-block float-right m-l-10" type="button">
                    <i class="zmdi zmdi-edit"></i>
                </button>
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="<?= base_url('Patients'); ?>"><i class="zmdi zmdi-home"></i> Patients</a></li>
                    <li class="breadcrumb-item active">Profile</li>
                </ul>                
            </div>
        </div>
    </div>    
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-lg-4 col-md-12">
                <div class="card member-card">
                    <div class="header l-coral">
                        <h5 class="m-t-10"><?= $pin['name'] ?></h5>
                    </div>
                    <br>
                    <div class="member-img">
                        <!--<a href="patient-invoice.html">-->
                        <img src="<?= base_url('assets/images/px.jpg') ?>" class="rounded-circle" alt="profile-image">
                        <!--</a>-->
                    </div>
                    <div class="body">
<!--                        <div class="col-12">
                            <ul class="social-links list-unstyled">
                                <li><a title="facebook" href="#"><i class="zmdi zmdi-facebook"></i></a></li>
                                <li><a title="twitter" href="#"><i class="zmdi zmdi-twitter"></i></a></li>
                                <li><a title="instagram" href="#"><i class="zmdi zmdi-instagram"></i></a></li>
                            </ul>                            
                        </div>-->
                        <hr>
                        <strong>Address</strong>
                        <address><?= $pin['adrs'].','.$pin['brgy'] ?><br> <?= $pin['cityadd'].','.$pin['zipcode'].','.$pin['provadd'] ?></address>
                        <hr>
                        <?php if($pin['email'] <> "")
                        { ?>
                            <strong>Email ID</strong>
                        <p><?= $pin['email'] ?></p>
                        <?php } ?>
                        
                        <strong>Phone</strong>
                        <p><?php if($pin['contactno'] <> "")
                        { echo $pin['contactno'].' | '.$pin['mobileno']; }
                        else
                        { echo $pin['mobileno']; }?></p>
                        
                        
                    </div>
                </div>
                                              
                <div class="card">
                    <div class="body">
                        <div class="workingtime">
                            <div class="header">
                                <h2><strong>PERSONAL</strong> Information</h2>
                            </div>
                            <ul>
                                <li>
                                    Patient Index Number: <strong><?= $pin['PIN'] ?></strong>
                                </li>
                                <li>
                                    Gender: <strong><?= $pin['sex'] ?></strong>
                                </li>
                                <li>
                                    Civil Status: <strong><?= $pin['civilstatus'] ?></strong>
                                </li>
                                <li>
                                    Birthday: <strong><?= date_format(date_create($pin['bday']),"F j, Y ") ?></strong>
                                </li>
                                <li>
                                    Age: <strong><?= $pin['Age'] ?></strong>
                                </li>
                                <li>
                                    Religion: <strong><?= $pin['religion'] ?></strong>
                                </li>
                                <li>
                                    Spouse: <strong><?= $pin['spouse'] ?></strong>
                                </li>
                                <li>
                                    Spouse Birthday: <strong><?php if($pin['spousebday'] <> '1901-01-01') {echo  date_format(date_create($pin['spousebday']),"F j, Y ");} ?></strong>
                                </li>
                            </ul>
                            <hr>
                            <div class="header">
                                <h2><strong>PARENTS'</strong> Information</h2>
                            </div>
                            <ul>
                                <li>
                                    Father: <strong style="text-transform: uppercase;"><?php if($pin['father'] <> ""){ echo $pin['father'];} ?></strong>
                                </li>
                                <li>
                                    Address: <strong style="text-transform: uppercase;"><?php if($pin['father'] <> ""){ echo $pin['fatheradrs'];} ?></strong>
                                </li>
                                <li>
                                    Nationality: <strong style="text-transform: uppercase;"><?php if($pin['father'] <> ""){ echo $pin['fathernationality'];}  ?></strong>
                                </li>
                                <br>
                                <li>
                                    Mother: <strong style="text-transform: uppercase;"><?php if($pin['mother'] <> ""){ echo $pin['mother'];}  ?></strong>
                                </li>
                                <li>
                                    Address: <strong style="text-transform: uppercase;"><?php if($pin['mother'] <> ""){ echo $pin['motheradrs'];} ?></strong>
                                </li>
                                <li>
                                    Nationality: <strong style="text-transform: uppercase;"><?php if($pin['mother'] <> ""){ echo $pin['mothernationality'];}  ?></strong>
                                </li>
                            </ul>
                            <hr>
                            <div class="header">
                                <h2><strong>HEALTH</strong> Information</h2>
                            </div>
                            <ul>
                                <li>
                                    PHIC Membership: <strong style="text-transform: uppercase;"><?= $pin['phicmembr'] ?></strong>
                                </li>
                                <li>
                                    Doctor: <strong style="text-transform: uppercase;"><?= $pin['doctorname'] ?></strong>
                                </li>
                                
                                
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-12">
                <form id="patient-profile-form">
                <div class="card">
                    <div class="body">
                        <div class="header">
                            <h2><strong>ADMISSION</strong> HISTORY</h2>
                        </div>
                        <div class="table-responsive">
                                <input type='hidden' id='pinx' value='<?= $pin['PIN']?>'/>
                            <table class="table table-striped m-b-0" id="admission-history-table">
                                <thead>
                                    <tr>
                                        <th>Case Number</th>
                                        <th>Admitted Date</th>
                                        <th>Discharged Date</th>
                                        <th>Final Diagnosis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <div class="header">
                                <h2><strong>GENERAL</strong> Information</h2>
                            </div>
                        <div class="row clearfix">
                            
                            <div class="col-lg-6 col-md-12">
                                <small>Case Number: </small>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="txtcaseno" readonly>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <small>HRN Code: </small>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="txthrnno" readonly>
                                </div>
                            </div>  
                            <div class="col-lg-3 col-md-12">
                                <small>Patient Type: </small>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="txtpxtype" readonly>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <small>Entry Type: </small>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="txtentrytype" readonly>
                                </div>
                            </div>                                    
                            <div class="col-lg-5 col-md-12">
                                <small>Admission Type: </small>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="txtadmissiontype" readonly>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-12">
                                <small>Admission Date & Time: </small>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="txtadmitdate" readonly>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <small>Discharged Date & Time: </small>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="txtdischadate" readonly>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12">
                                 <small>Value Card: </small>
                                 <div class="form-group">
                                     <input type="text" class="form-control" id="txtvaluecard" readonly>
                                 </div>
                             </div>
                        </div>
                         <hr>
                    </div>
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#admitdiag">Admission Diagnosis</a></li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#admitinfo">Admission Information</a></li> 
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#insurance">Insurance/ Others</a></li> 
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane body active" id="admitdiag">
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; Chief Complaints: </strong>
                                    <div class="form-group m-b-10">
                                        <textarea rows="2" class="form-control no-resize" id="txtchiefcomplaint" readonly></textarea>
                                    </div>
                                    <div class="checkbox">
                                        <input id="minor_or" type="checkbox" disabled>
                                        <label for="minor_or">For Minor OR</label>
                                    </div>
                                </div>
                                <hr>
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; Admitting Diagnosis: </strong>
                                    <div class="form-group m-b-10">
                                        <textarea rows="2" class="form-control no-resize" id="txtadmittingdiagnosis" readonly></textarea>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; Confinement Category: </strong>
                                    <div class="form-group m-b-10">
                                        <textarea rows="2" class="form-control no-resize" id="txtconfinementcategory" readonly></textarea>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; Dietary: </strong>
                                    <div class="form-group m-b-10">
                                        <textarea rows="2" class="form-control no-resize" id="txtdietary" readonly></textarea>
                                    </div>
                                    <small>Patient Status: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtpatientstatus" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; Final Diagnosis: </strong>
                                    <div class="form-group m-b-10">
                                        <textarea rows="2" class="form-control no-resize" id="txtfinaldiagnosis" readonly></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane body" id="admitinfo">
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; Guardians/ Watchers </strong>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Kin during Admission: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtkin" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Date of Birth (Kin): </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtkinbday" readonly>
                                    </div>
                                </div>                                    
                                <div class="col-lg-6 col-md-12">
                                    <small>Kin/ Relationship to Patient: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtkinrelationship" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Guardian Contact Number: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtguardiannumber" readonly>
                                    </div>
                                </div>  
                                <div class="col-lg-6 col-md-12">
                                    <small>Patient Contact Number:</small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtpatientnumber" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Billing Contact Number: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtbillingnumber" readonly>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; Officer During Admission </strong>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <small>Attending Doctor: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtattendingdoctor" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <small>Attending Officer/ Nurse Attendant: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtnurseattendant" readonly>
                                    </div>
                                </div> 
                            </div>
                            <hr>
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; Accommodation </strong>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <small>Room: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtroom" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <small>Room Rate: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtroomrate" readonly>
                                    </div>
                                </div> 
                                <div class="col-lg-4 col-md-12">
                                    <small>Ancillary Rate: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtancillaryrate" readonly>
                                    </div>
                                </div> 
                                <div class="col-lg-4 col-md-12">
                                    <small>Room CR: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtroomcr" readonly>
                                    </div>
                                </div> 
                            </div>
                            <hr>
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <small>Admission: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtadmission" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Weight Upon Admission: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtweight" readonly>
                                    </div>
                                </div> 
                                <div class="col-lg-6 col-md-12">
                                    <small>Cautions: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtcautions" readonly>
                                    </div>
                                </div> 
                                <div class="col-lg-6 col-md-12">
                                    <small>TB-DOTS Status: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txttbdots" readonly>
                                    </div>
                                </div> 
                                <div class="col-lg-6 col-md-12">
                                    <small>Link Account: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtlink" readonly>
                                    </div>
                                </div> 
                                <div class="col-lg-12 col-md-12">
                                    <small>Package Listing: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtpackage" readonly>
                                    </div>
                                </div> 
                                <div class="col-lg-6 col-md-12">
                                    <small>Nurse In-Charge/ Assigned to this Patient: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtnurseincharge" readonly>
                                    </div>
                                </div> 
                                <div class="col-lg-6 col-md-12">
                                    <small>Station Name: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtstation" readonly>
                                    </div>
                                </div> 
                            </div>
                        </div> 
                        <div class="tab-pane body" id="insurance">
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; PHILHEALTH Insurances </strong>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>PhilHealth Type: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtphtype" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Member No: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtphmemberno" readonly>
                                    </div>
                                </div>                                    
                                <div class="col-lg-6 col-md-12">
                                    <small>Member Name: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtphmembername" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Relation To Member: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtphmembrrelation" readonly>
                                    </div>
                                </div> 
                            </div>
                            <hr>
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <strong>&#9673; Patient Medical Classification </strong>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <small>Classification:</small>
                                        <input type="text" class="form-control" id="txtpxclassification" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="form-group"  id="class_medical">
                                        <small>Medical Classification</small>
                                        <input type="text" class="form-control" id="txtpxmedclassification" readonly>
                                    </div>
                                    <div class="form-group" id="class_pathologic" hidden>
                                        <div class="checkbox">
                                            <input id="pathologic_case" type="checkbox">
                                            <label for="pathologic_case">Pathologic Case</label>
                                        </div>
                                    </div>
                                    <div class="form-group" id="class_obgyne" hidden>
                                        <small>OB/Gyn Procedure: </small>
                                        <input type="text" class="form-control" id="txtobgyneprocedure" readonly>
                                    </div>
                                </div>
                             
                                <div class="col-lg-12 col-md-12">
                                    <small><b>OB/Gyne Case: </b></small>
                                </div>
                                <div class="col-lg-2 col-md-12">
                                    <small>Gravida: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtgravida" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-12">
                                    <small>Para: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtpara" readonly>
                                    </div>
                                </div>                                    
                                <div class="col-lg-2 col-md-12">
                                    <small>Abortion: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtabortion" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-12">
                                    <small>IUFD: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtiufd" readonly>
                                    </div>
                                </div> 
                                <div class="col-lg-3 col-md-12">
                                    <small>Died: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtdied" readonly>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row clearfix">
                                <div class="col-lg-6 col-md-12">
                                    <small>Spouse Name: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtspouse" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Spouse Birthday: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtspousebday" readonly>
                                    </div>
                                </div>   
                            </div>
                            <hr>
                            <div class="row clearfix">
                                <div class="col-lg-6 col-md-12">
                                    <small>Patient is transferred FROM Hospital: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txttransferfrom" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>CR Max Allowed: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtcrmax" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Transferred to/ Referred to: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txttransferto" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <small>Reason of Referral/Transfer: </small>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtreasonofreferral" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <small>Disposition:</small>
                                        <input type="text" class="form-control" id="txtdisposition" readonly>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                   
                                    <div class="form-group">
                                        <div class="checkbox">
                                            <input id="security_risk" type="checkbox" disabled>
                                            <label for="security_risk">Security Risk or VIP</label>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>         
            </div>
        </div>        
    </div>
</section>

<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function () {
globaljs.fetch_admission_history();
});
</script>