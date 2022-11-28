<?php

class Emergency extends MY_Controller 
{
    public function __construct() 
    {
        parent::__construct();

        $this->load->model('Emergency_model', 'emergency_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
        $this->load->model('Packages_model', 'packages_model');
    }

    public function index() 
    {
        if ($this->has_logging_in())
        {
            $data["hosp_name"] = $this->emergency_model->get_hospital();
            $data["provincelistx"] = $this->admission_model->getProvincelistx();
            $datenow = $this->get_current_date();
            $date = new DateTime($datenow);
            
            date_default_timezone_set('Asia/Manila');
            $data["currentdate"] = strtoupper(date('F j, Y'));
            $data["currenttime"] = strtoupper(date('h:i A'));
            
            $data["page_title"] = "HUBv19 | Emergency Quick Admission";
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            
            $data['accountnumber'] = $this->admission_model->getAccountNumber();
            $data['slcodexnumber'] = $this->admission_model->getSLcodexNumber();
            $data['casenumberget'] = $this->admission_model->fetchsCaseNumber();
            $data["phmembershipx"] = $this->admission_model->getphmembershipx();
            $data["religionlistx"] = $this->admission_model->getReligionlistx();
            $data["nationalityxs"] = $this->admission_model->getNationalityxs();
            $data["membertypepro"] = $this->admission_model->getMemberTypepro();
            $data["memberlisting"] = $this->admission_model->getMemberListing();
            $data["doctorlisting"] = $this->admission_model->getDoctorListing();
            $data["nurseslisting"] = $this->admission_model->getNursesListing();
            $data["roomszlisting"] = $this->admission_model->getRoomzsListing();
            $data["hospitalfromz"] = $this->admission_model->getHospitListing();
            $data["diagnosiscode"] = $this->admission_model->getDiagnosisCode();

            $opdnumlastval = $this->admission_model->getopdnumlastval();
            $opdno = explode("P", $opdnumlastval['OPDno']);
            $opdnumpart = $opdno[1] + 1;
            $data["opdnumber"] = "OP0000".$opdnumpart;

            $timenow = $this->get_current_time();
            $time = new DateTime($timenow);
            $data["currentfulldate"] = date_format($date, 'Y-m-d h:i:s');
            $data["currentyear"] = date_format($date, 'Y');
            $data["year"] = $this->format_year();
            $nows = new DateTime();
            $data["timenow"] = $nows->format('h:i A');

            $now = new DateTime();
            $fulldateformat = date_format($now, "m/d/Y H:i:s");
            $data["fulldate"] = date_format($now, "mdYHis");
            $data["ipaddress"] = $_SERVER["REMOTE_ADDR"];
            $pc = $this->admission_model->getpccode($data["ipaddress"]);
            $case = preg_replace("/[^a-zA-Z0-9]/", "", $fulldateformat);
            $data["pccodex"] = $pc[0]['PCcode'];
            $data["casecod"] = "CN" . $case . $data["pccodex"];
            
            $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
            $data["station"] = $hostname;
            
            $data["stationwi"] = $hostname;
            $data["updatedwi"] = date_format($date, 'Y-m-d h:i:s');
            
            $currentfulldate2 = date_format($now, "mdYHis");
            $data['refnoofcause']   = $currentfulldate2."ADMTCATG";
            $data['opid'] = $currentfulldate2."OPDWI";

            $data['accountnumberpkg'] = $this->packages_model->getPackageAcctNo();
            $nowpkg = new DateTime();
            $currentfulldatepkg = date_format($nowpkg, "mdYHis");
            $currentfulldatehmo = date_format($nowpkg, "mdYHi");
            $data['refcodepkg']   = $currentfulldatepkg."51ENROLL";
            $data['refnohmo']   = $currentfulldatepkg."HMRJ";
            $datenowpkg = $this->get_current_date();
            $datepkg = new DateTime($datenowpkg);
            $data["currentdatepkg"] = date_format($datepkg, 'Y-m-d');
            
            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/vendors/plugins/sweetalert/sweetalert.css',
                'assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
                'assets/plugins/bootstrap-select/css/bootstrap-select.css',
                'assets/css/main.css',
                'assets/css/myCSS.css',
//                'assets/css/sweetalert2.css',
                'assets/css/color_skins.css');

            $data["js"] = array(
                'assets/vendors/plugins/jquery/jquery-v3.2.1.min.js',
                'assets/bundles/libscripts.bundle.js',
                'assets/bundles/vendorscripts.bundle.js',
                'assets/bundles/datatablescripts.bundle.js',
                'assets/vendors/plugins/jquery-datatable/buttons/dataTables.buttons.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.bootstrap4.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.colVis.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.print.min.js',
                'assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js',
                'assets/vendors/plugins/sweetalert/sweetalert.min.js',
                'assets/bundles/mainscripts.bundle.js',
                'assets/js/moment.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/js/pages/jquery.mask.js',
                'assets/js/pages/jquery.mask.min.js',
                'assets/myjs/dietcategory.js',
                'assets/myjs/hmomanagement.js',
                'assets/myjs/hmomasterlistmanagement.js',
                'assets/myjs/packageforadmission.js',
                'assets/myjs/emergency.js');
            
            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/emergency', $data);
            $this->load->view('templates/footer', $data);
            
        } 
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function GetAllPatientFromMasterlist() 
    {
        $fetched_data = $this->admission_model->fetch_all_patients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {
            if (!isset($counter)) {
                $counter = 0;
            }

            $counter++;

            $time = time();

            $dummy = "?dummy=" . $time . $counter;
            
            $sub_array = array();
            
            $imgbaseurlad = base_url();
            $imglocationx = "assets/images/uploads/patients/";
            $imagedefault = "default.png";
            $imgfilenamex = $row->PIN . "p.jpg";
            $imgidpic = $row->PIN . "p";

            $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex . $dummy;
            $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;

//            $sub_array[] = "<button class='btn btn-sm btn-success waves-effect' title='Quick Edit' onclick=showQuickEditModal('" . $row->PIN . "')><i class='zmdi zmdi-edit'></i></button>&nbsp;
//                            <button class='btn btn-sm btn-warning waves-effect' title='Edit Patient' onclick=showEditPatientModal('" . $row->id . "')><i class='zmdi zmdi-edit'></i></button>&nbsp;
//                            <button class='btn btn-sm btn-danger waves-effect' title='Delete Patient' onclick=deletePatient('" . $row->PIN . "')><i class='zmdi zmdi-delete'></i></button>&nbsp;";
            $sub_array[] = "";
            if (@getimagesize($completeimglocation)) {
                $sub_array[] = "<img src='" . $completeimglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            } else {
                $sub_array[] = "<img src='" . $defaultimaglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            $sub_array[] = $row->name;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->HRNcode;
            $sub_array[] = $row->bday;
            $sub_array[] = $row->sex;
            $sub_array[] = $row->lastdischdate;
            $sub_array[] = $row->adrs . ", " . $row->brgy;
            $sub_array[] = $row->cityadd;
            $sub_array[] = $row->pincode;
            $sub_array[] = $row->updated;
            $data[] = $sub_array;
        }
        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->admission_model->fetch_all_patients_masterlist_data(),
            "recordsFiltered" => $this->admission_model->fetch_all_patients_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function getPatientListDataForEmergencyAdmitPatient() 
    {
        $result = array('status' => FALSE);
        $pin = $this->input->post('pinnum');
       
        $patientlist_data = $this->emergency_model->get_data_from_patientlist_for_emergency_admit_patient($pin);
        
        if ($patientlist_data) 
        {
            $result['patientmasterlistdata'] = $patientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function GenerateCasenoCode()
    {
        $result = $this->emergency_model->generate_caseno_code();
        echo json_encode($result);
    }
    
    public function getPatientlistDataForCheckDuplicateOfEmergencyAdmitPatient() 
    {
        $result = array('status' => FALSE);

        $pin = $this->input->post('pinx');
        $inpatientlist_data = $this->emergency_model->get_data_from_inpatient_for_emergency_admit_patient_check_duplicate($pin);

        if ($inpatientlist_data) 
        {
            $result["inpatientlistdata"] = $inpatientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function AdmitPatientForQuickOrEmergencyAdmission() 
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila');
        $date = date("mdYHis");
        $numbers = str_shuffle("0123456789");
        $num1 = (int) $numbers[0];
        $num2 = (int) $numbers[1];
        
        $datestring = str_shuffle($date);
        $seq1 = (int) $datestring[0];
        $seq2 = (int) $datestring[1];
        $seq3 = (int) $datestring[2];
        $seq4 = (int) $datestring[3];
        $seq5 = (int) $datestring[4];
        $seq6 = (int) $datestring[5];
        $seq7 = (int) $datestring[6];
        $pinformatnum = $seq1.$seq2.$seq3.$seq4.$seq5.$seq6.$seq7;

        $caseno = strtoupper($this->input->post('accountnoemrx', TRUE));
        $pinnum = strtoupper($this->input->post('patientpin2emrx', TRUE));
        $splitcaseno    = explode("-", $caseno);
        $splitpinnum    = explode("-", $pinnum);
        
        $cityadd = $this->input->post('citymunselemrx', TRUE);
        $provadd = $this->input->post('provinceselemrx', TRUE);

        $data = array();
        
        if($pinnum !== "")
        {
            $data['pinyr']                  = $splitpinnum[0];
            $data['pinseq']                 = $splitpinnum[1];
            $data['pxtype']                 = "IPD";
            $data['casetype']               = "IN-PATIENT";
            $data['admittype']              = "RC";
            $data['HRnCODE']                = "000000";
            $data['vip']                    = 0;
            $data['pincode']                = "PIN".$date;
            $data['casecode']               = "CN".$date.$num1.$num2;
            $data['caseyr']                 = $splitcaseno[0];
            $data['caseseq']                = $splitcaseno[1];
            $data['caseno']                 = $caseno;
            $data['ledgerfile']             = "ledgeripd";
            $data['PIN']                    = $pinnum;
            $data['pinformat']              = "C".$pinformatnum;
            $data['lname']                  = strtoupper($this->input->post('lnameemrx', TRUE));
            $data['fname']                  = strtoupper($this->input->post('fnameemrx', TRUE));
            $data['mname']                  = strtoupper($this->input->post('mnameemrx', TRUE));
            $data['suffix']                 = strtoupper($this->input->post('suffixemrx', TRUE));
            $data['name']                   = $data['lname'].", ".$data['fname']." ".$data['mname']." ".$data['suffix'];
            $data['sex']                    = strtoupper($this->input->post('genderselemrx', TRUE));
            $data['bday']                   = strtoupper($this->input->post('birthdayemerx', TRUE));
            $data['Age']                    = strtoupper($this->input->post('ageemrx', TRUE));
            $data['Weight']                 = 0;
            $data['packageCODE']            = "NONE";
            $data['adrs']                   = strtoupper($this->input->post('streettxtemrx', TRUE));
            $data['brgy']                   = strtoupper($this->input->post('barangayselemrx', TRUE));
            
            if (strpos($cityadd, '-') !== false)
            {
                $splitcityadd       = explode("-", $cityadd);
                $data['cityadd']    = strtoupper($splitcityadd[0]);
                $data['citycode']   = strtoupper($splitcityadd[1]);
            }
            
            if (strpos($provadd, '-') !== false)
            {
                $splitprovadd       = explode("-", $provadd);
                $data['provadd']    = strtoupper($splitprovadd[0]);
                $data['provcode']   = strtoupper($splitprovadd[1]);
            }

            $data['zipcode']                = strtoupper($this->input->post('zipcodetxtemrx', TRUE));
            $data['civilstatus']            = strtoupper($this->input->post('civilselemrx', TRUE));
            $data['mobileno']               = strtoupper($this->input->post('contactnotxtemrx', TRUE));
            $data['religion']               = strtoupper($this->input->post('religionselemrx', TRUE));
            $data['father']                 = strtoupper($this->input->post('fatnametxtemrx', TRUE));
            $data['mother']                 = strtoupper($this->input->post('motnametxtemrx', TRUE));
            
            date_default_timezone_set('Asia/Manila');
            $data['updated']                = date('Y-m-d H:i:s');
            $data['recid']                  = strtoupper($this->session->userdata("ID"));
            $data['recby']                  = strtoupper($this->session->userdata("empname"));
            $data['station']                = strtoupper(gethostbyaddr($_SERVER['REMOTE_ADDR']));
            $data['admitdate']              = strtoupper($this->input->post('dateadmittxtemrx', TRUE));
            $data['admittime']              = strtoupper($this->input->post('timeadmittxtemrx', TRUE));
            $data['tagfordischa']           = 0;
            $data['discharged']             = 0;
            $data['roomdate']               = date("Y-m-d");
            $data['roomtime']               = date("h:i:s");
            $data['roomrate']               = 0;
            $data['PRICEPACKAGE']           = "REG";
            $data['rmrateschm']             = "IPD1";
            $data['creditmax']              = 5000;
            $data['addonserv']              = 0;
            $data['dietstatus']             = "DISCHARGED";
            $data['Quikadmit']              = 1;
            $data['nursestation']           = "QUICK ADMTD";
            $data['dischargedsameday']      = 1;
            $data['needdeposit']            = "NONE";
            $data['minorOR']                = 0;
            $data['TBstatus']               = "N/A";
        }

        $this->form_validation->set_rules('patientpin2emrx', 'Index No.', 'required');
        $this->form_validation->set_rules('fnameemrx', 'First Name', 'required');
        $this->form_validation->set_rules('mnameemrx', 'Middle Name', 'required');
        $this->form_validation->set_rules('lnameemrx', 'Last Name', 'required');
        $this->form_validation->set_rules('birthdayemerx', 'Birthday', 'required');
        $this->form_validation->set_rules('ageemrx', 'Age', 'required');
        $this->form_validation->set_rules('genderselemrx', 'Gender', 'required');
        $this->form_validation->set_rules('civilselemrx', 'Civil Status', 'required');
        $this->form_validation->set_rules('religionselemrx', 'Religion', 'required');
        $this->form_validation->set_rules('provinceselemrx', 'Province', 'required');
        $this->form_validation->set_rules('citymunselemrx', 'City/Municipality', 'required');
        $this->form_validation->set_rules('barangayselemrx', 'Barangay', 'required');
        $this->form_validation->set_rules('zipcodetxtemrx', 'Zipcode', 'required');
        $this->form_validation->set_rules('streettxtemrx', 'Address', 'required');
        $this->form_validation->set_rules('contactnotxtemrx', 'Contact No.', 'required');
        $this->form_validation->set_rules('fatnametxtemrx', 'Fathers Name', 'required');
        $this->form_validation->set_rules('motnametxtemrx', 'Mothers Name', 'required');
        $this->form_validation->set_rules('dateadmittxtemrx', 'Date Admitted', 'required');
        $this->form_validation->set_rules('timeadmittxtemrx', 'Time Admitted', 'required');

        if ($this->form_validation->run() == FALSE)
        {
            $errors['patientpin2emrx']  = form_error('patientpin2emrx');
            $errors['fnameemrx']        = form_error('fnameemrx');
            $errors['mnameemrx']        = form_error('mnameemrx');
            $errors['lnameemrx']        = form_error('lnameemrx');
            $errors['birthdayemerx']    = form_error('birthdayemerx');
            $errors['ageemrx']          = form_error('ageemrx');
            $errors['genderselemrx']    = form_error('genderselemrx');
            $errors['civilselemrx']     = form_error('civilselemrx');
            $errors['religionselemrx']  = form_error('religionselemrx');
            $errors['provinceselemrx']  = form_error('provinceselemrx');
            $errors['citymunselemrx']   = form_error('citymunselemrx');
            $errors['barangayselemrx']  = form_error('barangayselemrx');
            $errors['zipcodetxtemrx']   = form_error('zipcodetxtemrx');
            $errors['streettxtemrx']    = form_error('streettxtemrx');
            $errors['contactnotxtemrx'] = form_error('contactnotxtemrx');
            $errors['fatnametxtemrx']   = form_error('fatnametxtemrx');
            $errors['motnametxtemrx']   = form_error('motnametxtemrx');
            $errors['dateadmittxtemrx'] = form_error('dateadmittxtemrx');
            $errors['timeadmittxtemrx'] = form_error('timeadmittxtemrx');

            $result = ['status' => FALSE, 'errors' => $errors];
        } 
        else 
        {
            $result = $this->emergency_model->add_patient_for_emergency_admission($data);
            $result = ['status' => TRUE];
            
            //===============ACCTNUMBER UPDATE=====================================>
            if ($this->admission_model->update_acctnumber($data))
            {
                $result['status'] = true;
            }
        }
        echo json_encode($result);
    }

    public function getQuickAdmittedPatientDataFromInpatientTable() 
    {
        $discharged = $this->input->post('discharged');
        $quickadmit = $this->input->post('quickadmit');
        $inpatient = $this->emergency_model->getQuickAdmittedPatientDataFromInpatient($discharged,$quickadmit);
        echo json_encode($inpatient);
    }
    
    public function DeleteQuickAdmittedPatient()
    {
        $caseno = $this->input->post('casenox');
        $result = $this->emergency_model->delete_quick_admitted_patient($caseno);
        echo json_encode($result);
    }
    
    public function GetAllQuickAdmittedPatients() 
    {
        $discharged = 0;
        $quickadmit = 1;
        
        $fetched_data = $this->emergency_model->fetch_quick_admitted_patients_masterlist_datatables($discharged,$quickadmit);

        $data = array();

        foreach ($fetched_data as $row) 
        {
            if (!isset($counter))
            {
                $counter = 0;
            }
            
            $counter++;

            $time = time();

            $dummy = "?dummy=" . $time . $counter;
            
            $sub_array = array();
            
            $imgbaseurlad = base_url();
            $imglocationx = "assets/images/uploads/patients/";
            $imagedefault = "default.png";
            $imgfilenamex = $row->PIN . "p.jpg";
            $imgidpic = $row->PIN . "p";

            $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex . $dummy;
            $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;

            $discharged = $row->discharged;
            if ($discharged === "1")
            {
                $status = "DISCHARGED";
            } 
            else 
            {
                $status = "ADMITTED";
            }
            
            $sub_array[] = "";
            $sub_array[] = "<button class='btn btn-sm btn-info waves-effect printpatient' data-toggle='tooltip' data-placement='top' title='Print Px Info' onclick=showPrintAdmittedPatientModal('" . $row->caseno . "')><i class='zmdi zmdi-print'></i></button>&nbsp;" .
                           "<button class='btn btn-sm btn-warning waves-effect editpatient' data-toggle='tooltip' data-placement='top' title='Edit Quick Admission' onclick=showEditAdmittedPatientModal('" . $row->caseno . "')><i class='zmdi zmdi-edit'></i></button>&nbsp;" .
                           "<button class='btn btn-sm btn-success waves-effect rxinspatient' data-toggle='tooltip' data-placement='top' title='Rx/Instruction' onclick=showRxInstructionAdmittedPatientModal('" . $row->caseno . "')><i class='zmdi zmdi-widgets'></i></button>";

            if (@getimagesize($completeimglocation)) 
            {
                $sub_array[] = "<img src='" . $completeimglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            } 
            else 
            {
                $sub_array[] = "<img src='" . $defaultimaglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            
            $sentence1 = $row->HRnCODE; 
            $string1 = '-'; 
            $position1 = '4';
            $HRnCODElevel1 = substr_replace( $sentence1, $string1, $position1, 0 ); 
            
            $sentence2 = $HRnCODElevel1; 
            $string2 = '-'; 
            $position2 = '2';
            $HRnCODElevel2 = substr_replace( $sentence2, $string2, $position2, 0 ); 
            
            $birthdate = new DateTime($row->bday);
            $birthdays = $birthdate->format('F j, Y');

            $update = new DateTime($row->updated);
            $updateddate = $update->format('F j, Y h:i A');
            
            $sub_array[] = strtoupper($row->name);
            $sub_array[] = strtoupper($row->caseno);
            $sub_array[] = strtoupper($HRnCODElevel2);
            $sub_array[] = strtoupper($birthdays);
            $sub_array[] = strtoupper($row->sex);
            $sub_array[] = strtoupper($row->lastdischdate);
            $sub_array[] = strtoupper($row->adrs . ", " . $row->brgy);
            $sub_array[] = strtoupper($row->cityadd);
            $sub_array[] = strtoupper($row->pincode);
            $sub_array[] = strtoupper($updateddate);

            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->emergency_model->fetch_quick_admitted_patients_masterlist_data($discharged,$quickadmit),
            "recordsFiltered" => $this->emergency_model->fetch_quick_admitted_patients_masterlist_filtered_data($discharged,$quickadmit),
            "data" => $data
        );
        echo json_encode($output);
    }
    
    public function getInPatientlistDataForEditQuickAdmittedPatient() 
    {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('caseno');

        $inpatientlist_data = $this->emergency_model->get_data_from_inpatient_for_edit_quick_admitted_patient($caseno);

        if ($inpatientlist_data)
        {
            $result["inpatientlist_data"] = $inpatientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function getPatientlistDataForEditQuickAdmittedPatient() 
    {
        $result = array('status' => FALSE);
        $pin = $this->input->post('pin');

        $patientlist_data = $this->emergency_model->get_data_from_patientlist_for_edit_quick_admitted_patient($pin);

        if ($patientlist_data) 
        {
            $result["patientlistdata"] = $patientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function UpdatePatientViaQuickDataEdit() 
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        $data = array();
        
        $pin = $this->input->post('pinnumqck', TRUE);
        
        $data['HRNcode']        = strtoupper($this->input->post('hrnnumqck', TRUE));
        $data['HRsequence']     = strtoupper($this->input->post('hrnnumqck', TRUE));
        $data['lastdischdate']  = strtoupper($this->input->post('oldrecqck', TRUE));
        $data['HRNverified']    = strtoupper($this->input->post('hrnhidqck', TRUE));
        $data['oldrecord']      = strtoupper($this->input->post('oldhidqck', TRUE));

        $this->form_validation->set_rules('hrnnumqck', 'Health Record No.', 'required|min_length[3]|max_length[30]');
        $this->form_validation->set_rules('oldrecqck', 'Last Discharged', 'required|min_length[2]|max_length[30]');

        if ($this->form_validation->run() == FALSE) 
        {
            $errors['hrnnumqck'] = form_error('hrnnumqck');
            $errors['oldrecqck'] = form_error('oldrecqck');

            $result = ['status' => FALSE, 'errors' => $errors];
        } 
        else
        {
            $this->emergency_model->update_patient_through_quick_data_edit($pin, $data);
            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }
}
