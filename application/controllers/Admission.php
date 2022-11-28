<?php

class Admission extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Admission_model', 'admission_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Packages_model', 'packages_model');
        $this->load->model('SLCode_model', 'slcode_model');
    }

    public function index() {
        if ($this->has_logging_in()) {

            $provid = $this->input->post('providex');
            $data["page_title"] = "HUBv19 | Admission";
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $data['accountnumber'] = $this->admission_model->getAccountNumber();
            $data['slcodexnumber'] = $this->admission_model->getSLcodexNumber();
            $data['casenumberget'] = $this->admission_model->fetchsCaseNumber();
            $data["phmembershipx"] = $this->admission_model->getphmembershipx();
            $data["religionlistx"] = $this->admission_model->getReligionlistx();
            $data["nationalityxs"] = $this->admission_model->getNationalityxs();
            $data["provincelistx"] = $this->admission_model->getProvincelistx();
            $data["citymunicipal"] = $this->admission_model->getCityMunicipalAddress($provid);
            $data["membertypepro"] = $this->admission_model->getMemberTypepro();
            $data["memberlisting"] = $this->admission_model->getMemberListing();
            $data["doctorlisting"] = $this->admission_model->getDoctorListing();
            $data["nurseslisting"] = $this->admission_model->getNursesListing();
            $data["roomszlisting"] = $this->admission_model->getRoomzsListing();
            $data["hospitalfromz"] = $this->admission_model->getHospitListing();
            $data["diagnosiscode"] = $this->admission_model->getDiagnosisCode();

            $data["hosp_name"] = $this->admission_model->get_hospital();

            $opdnumlastval = $this->admission_model->getopdnumlastval();
            $opdno = explode("P", $opdnumlastval['OPDno']);
            $opdnumpart = $opdno[1] + 1;
            $data["opdnumber"] = "OP0000" . $opdnumpart;

            $datenow = $this->get_current_date();
            $timenow = $this->get_current_time();
            $date = new DateTime($datenow);
            $time = new DateTime($timenow);
            $data["currentfulldate"] = date_format($date, 'Y-m-d h:i:s');
            $data["currentdate"] = strtoupper(date_format($date, 'F j, Y'));
            $data["currenttime"] = strtoupper(date_format($date, 'h:i A'));
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
            $data['refnoofcause'] = $currentfulldate2 . "ADMTCATG";
            $data['opid'] = $currentfulldate2 . "OPDWI";

            $data['accountnumberpkg'] = $this->packages_model->getPackageAcctNo();
            $nowpkg = new DateTime();
            $currentfulldatepkg = date_format($nowpkg, "mdYHis");
            $currentfulldatehmo = date_format($nowpkg, "mdYHi");
            $data['refcodepkg'] = $currentfulldatepkg . "51ENROLL";
            $data['refnohmo'] = $currentfulldatepkg . "HMRJ";
            $datenowpkg = $this->get_current_date();
            $datepkg = new DateTime($datenowpkg);
            $data["currentdatepkg"] = date_format($datepkg, 'Y-m-d');

            date_default_timezone_set('Asia/Manila');
            $data["serverDate"] = date('F j, Y');
            $data["serverTime"] = date('h:i A');

            $data["nursestation"] = $this->admission_model->getNurseStationListing();
            $data["admissiontype"] = $this->admission_model->getAdmissionTypeListing();
            $data["casetype"] = $this->admission_model->getCaseTypeListing();
            $data["patientclass"] = $this->admission_model->getPatientClassListing();
            $data["relatetokin"] = $this->admission_model->getRelateToKinListing();
            $data["typeofmngmnt"] = $this->admission_model->getManagementTypeListing();

            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
                'assets/vendors/plugins/sweetalert/sweetalert.css',
                'assets/css/main.css',
                'assets/css/myCSS.css',
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
                'assets/myjs/admission.js',
                'assets/myjs/coamanagement.js',
                'assets/myjs/patientmasterlist.js',
                'assets/myjs/hmomanagement.js',
                'assets/myjs/dietcategory.js',
                'assets/myjs/hmomasterlistmanagement.js',
                'assets/myjs/packageforadmission.js',
                'assets/myjs/packagemasterlist.js',
                'assets/myjs/globaljs.js',
                'assets/myjs/jquery.backDetect.js');

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/admission', $data);
            $this->load->view('templates/footer', $data);
        } else {
            redirect('Login', 'refresh');
        }
    }

    public function GetAllAdmittedPatients() {

        $fetched_data = $this->admission_model->fetch_admitted_patients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {
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
            if ($discharged === "1") {
                $status = "DISCHARGED";
            } else {
                $status = "ADMITTED";
            }

            $birthdate = new DateTime($row->bday);
            $birthdays = $birthdate->format('F j, Y');

            $update = new DateTime($row->updated);
            $updateddate = $update->format('F j, Y h:i A');

            $sub_array[] = "";

            $sub_array[] = "<button class='btn btn-sm btn-info waves-effect printpatient' data-toggle='tooltip' data-placement='top' title='Print Px Info' onclick=showPrintAdmittedPatientModal('" . $row->caseno . "')><i class='zmdi zmdi-print'></i></button>&nbsp;" .
                    "<button class='btn btn-sm btn-warning waves-effect editpatient' data-toggle='tooltip' data-placement='top' title='Edit Px Info' onclick=showEditAdmittedPatientModal('" . $row->caseno . "')><i class='zmdi zmdi-edit'></i></button>&nbsp;" .
                    "<button class='btn btn-sm btn-success waves-effect rxinspatient' data-toggle='tooltip' data-placement='top' title='Rx/Instruction' onclick=showRxInstructionAdmittedPatientModal('" . $row->caseno . "')><i class='zmdi zmdi-widgets'></i></button>";

            if (@getimagesize($completeimglocation)) {
                $sub_array[] = "<img src='" . $completeimglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            } else {
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
                    
            $sub_array[] = strtoupper($row->name);
            $sub_array[] = strtoupper($row->caseno);
            $sub_array[] = strtoupper($status);
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

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->admission_model->fetch_admitted_patients_masterlist_data(),
            "recordsFiltered" => $this->admission_model->fetch_admitted_patients_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    public function GetAllPatientFromMasterlist() {
        $fetched_data = $this->admission_model->fetch_all_patients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {
            $birthday = new DateTime($row->bday);
            $dateofbirth = strtoupper($birthday->format('F j, Y'));

            $lastdischadate = new DateTime($row->lastdischdate);
            $dateoflastdischa = strtoupper($lastdischadate->format('F j, Y'));

            $updateddate = new DateTime($row->updated);
            $dateupdated = strtoupper($lastdischadate->format('F j, Y'));

            $sub_array = array();

            $sub_array[] = "<button class='btn btn-sm btn-info waves-effect' data-toggle='tooltip' data-placement='left' title='Admit Patient' onclick=checkDuplicateForAdmitPatient('" . $row->id . "," . $row->PIN . "')><i class='zmdi zmdi-check-square'></i></button>&nbsp;
                            <button class='btn btn-sm btn-warning waves-effect' data-toggle='tooltip' data-placement='left' title='Edit Patient' onclick=showEditPatientModal('" . $row->id . "')><i class='zmdi zmdi-edit'></i></button>&nbsp;
                            <button class='btn btn-sm btn-danger waves-effect' data-toggle='tooltip' data-placement='left' title='Delete Patient' onclick=deletePatient('" . $row->PIN . "')><i class='zmdi zmdi-delete'></i></button>&nbsp;";
            $sub_array[] = $row->name;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->HRNcode;
            $sub_array[] = $dateofbirth;
            $sub_array[] = $row->sex;
            $sub_array[] = $dateoflastdischa;
            $sub_array[] = $row->adrs . ", " . $row->brgy;
            $sub_array[] = $row->cityadd;
            $sub_array[] = $row->pincode;
            $sub_array[] = $dateupdated;

            $data[] = $sub_array;
//            }
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->admission_model->fetch_all_patients_masterlist_data(),
            "recordsFiltered" => $this->admission_model->fetch_all_patients_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    public function addNewPatient() {
        $result = array('status' => FALSE);

        $oldrecordchkbox = $this->input->post('inputname_oldrecordchkbox');
        $archivedpateint = $this->input->post('inputname_archivedpateint');
        $hrnisverifiedch = $this->input->post('inputname_hrnisverifiedch');

        if ($oldrecordchkbox === "ON") {
            $oldrecordaddpx = 1;
        } else {
            $oldrecordaddpx = 0;
        }

        if ($archivedpateint === "ARCHIVED") {
            $archivepxaddpx = 1;
        } else {
            $archivepxaddpx = 0;
        }

        if ($hrnisverifiedch === "YES") {
            $hrnverifyaddpx = 1;
        } else {
            $hrnverifyaddpx = 0;
        }

        $data['archivedx'] = $archivepxaddpx;
        $data['oldrecord'] = $oldrecordaddpx;
        $data['hrnverify'] = $hrnverifyaddpx;
        
        $province = strtoupper($this->input->post('selectname_province'));
        $provinceexplode = explode("-", $province);
        $data["provincex"] = $provinceexplode[0];
        $data["provcode"] = $provinceexplode[1];
        
        $citymunicipal = strtoupper($this->input->post('selectname_citymunicipal'));
        $citymunicipalexplode = explode("-", $citymunicipal);
        $data["citymunic"] = $citymunicipalexplode[0];
        $data["citycode"] = $citymunicipalexplode[1];

        
        $data['mothernat'] = strtoupper($this->input->post('selectname_mothersnation'));
        $data['fathernat'] = strtoupper($this->input->post('selectname_fathersnation'));
        $data['civilstat'] = strtoupper($this->input->post('selectname_civil'));
        $data['gendersex'] = strtoupper($this->input->post('selectname_gender'));
        $data['religionx'] = strtoupper($this->input->post('selectname_religion'));
        $data['nationali'] = strtoupper($this->input->post('selectname_nationality'));
        $data['barangayx'] = strtoupper($this->input->post('selectname_barangay'));

        $mmbrxtype = $this->input->post('selectname_membership');
        if ($mmbrxtype === "Select from List" || $mmbrxtype === "SELECT FROM LIST")
        {
            $data['mmbrxtype'] = "";
        } 
        else
        {
            $data['mmbrxtype'] = strtoupper($this->input->post('selectname_membership'));
        }

        $data['slcodenum'] = strtoupper($this->input->post('inputname_slcode'));
        $data['tinnumber'] = strtoupper($this->input->post('inputname_tinnum'));
        $data['pxindexno'] = strtoupper($this->input->post('inputname_pxindex'));
        $data['phmembers'] = strtoupper($this->input->post('inputname_phmember'));
        $data['phidnumbr'] = strtoupper($this->input->post('inputname_phidnumb'));
        $data['healthrec'] = strtoupper($this->input->post('inputname_healthrecno'));
        $oldrecord = new DateTime($this->input->post('inputname_oldrecrd'));
        $data['oldrecord'] = strtoupper($oldrecord->format('Y-m-d'));
        $data['firstname'] = strtoupper($this->input->post('inputname_fname'));
        $data['lastnamex'] = strtoupper($this->input->post('inputname_lname'));
        $data['midlename'] = strtoupper($this->input->post('inputname_mname'));
        $data['suffixxes'] = strtoupper($this->input->post('inputname_suffix'));
        $data['mobilenum'] = strtoupper($this->input->post('inputname_mobile'));
        $data['telephone'] = strtoupper($this->input->post('inputname_landline'));
        
        $pxbirthday = new DateTime($this->input->post('inputname_birthday'));
        $data['birthdayx'] = strtoupper($pxbirthday->format('Y-m-d'));
        
        $data['passportx'] = strtoupper($this->input->post('inputname_passport'));
        $data['spouxname'] = strtoupper($this->input->post('inputname_spouse'));
        
        $spouxbday = new DateTime($this->input->post('inputname_spousebday'));
        $data['spouxbday'] = strtoupper($spouxbday->format('Y-m-d'));
        
        $data['zipcodexs'] = strtoupper($this->input->post('inputname_zipcode'));
        $data['streetadr'] = strtoupper($this->input->post('inputname_street'));
        $data['mothrname'] = strtoupper($this->input->post('inputname_mothersname'));
        $data['fathrname'] = strtoupper($this->input->post('inputname_fathersname'));
        $data['mothradrs'] = strtoupper($this->input->post('inputname_mothersadrs'));
        $data['fathradrs'] = strtoupper($this->input->post('inputname_fathersadrs'));
        $data['emailadrs'] = $this->input->post('inputname_emailadd');
        $data['fulladres'] = $data['streetadr'] . ", " . $data['barangayx'] . " " . $data['citymunic'] . " " . $data['provincex'];
        $data["fullnamex"] = $data['lastnamex'] . ", " . $data['firstname'] . " " . $data['suffixxes'] . " " . $data['midlename'];

        $bday = new DateTime($data['birthdayx']);
        $now = new DateTime();
        $data["ageofpati"] = strtoupper($this->input->post('inputname_pxagexforaddpatient'));

        $data['birthdayz'] = date("Y-m-d", strtotime($data['birthdayx']));
        $data['spoubirth'] = date("Y-m-d", strtotime($data["spouxbday"]));

        $pins = explode("-", $data["pxindexno"]);
        $data["pinyrs"] = $pins[0];
        $data["pinseq"] = $pins[1];
        
        $data['phmemberx'] = strtoupper($this->input->post('selectname_phmembership'));
        if ($this->input->post('selectname_phmembership') === "Select from List")
        {
            $data["phiccodex"] = "NHP";
            $data["phicmembr"] = "NON-NHIP";
        } 
        else 
        {
            $phc = explode(":", $data["phmemberx"]);
            $data["phiccodex"] = strtoupper($phc[1]);
            $data["phicmembr"] = strtoupper($phc[0]);
        }

        $nows = date_format($now, "m/d/Y H:i:s");
        $pinc = preg_replace("/[^a-zA-Z0-9]/", "", $nows);
        $data["pincodexs"] = "PIN" . $pinc;

        $subjectHRNcode = $data['healthrec'];
        $healtrecordnumber = str_replace("-", "", $subjectHRNcode);
        $data["healrecno"] = $healtrecordnumber;

        $subjectmobileno = $data['mobilenum'];
        $mobilenumber = str_replace("-", "", $subjectmobileno);
        $data["mobilenox"] = $mobilenumber;

        $subjecttelephone = $data['telephone'];
        $telephone = str_replace("-", "", $subjecttelephone);
        $data["telephonx"] = $telephone;

        $newstring = str_replace("-", "1", $data["pxindexno"]);
        $pinformat = substr($newstring, -7);
        $data["pinformat"] = "C" . $pinformat;

        $data['ipaddress'] = $_SERVER["REMOTE_ADDR"];
        $pc = $this->admission_model->getpccode($data['ipaddress']);
        $data["pccodexxs"] = $pc[0]['PCcode'];

        $lastdisch = $data['oldrecord'];
        $dischdate = date("Y-m-d", strtotime($lastdisch));
        $data["lasdiscd8"] = $dischdate;

        $now = new DateTime();
//        $data['updatedxz'] = $now->format('Y-m-d h:i:s');

        date_default_timezone_set('Asia/Manila');
        $data["serverTime"] = date('Y-m-d H:i:s');
        $data['updatedxz'] = date('Y-m-d H:i:s');

        $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
        $data["station"] = strtoupper($hostname);

        $data["recordID"] = $this->session->userdata("ID");
        $data["recordedby"] = $this->session->userdata("empname");

        if ($this->admission_model->insert_new_patient($data)) {
            $result['status'] = true;
        }
        
        //===============ACCTNUMBER UPDATE=====================================>
        if ($this->admission_model->update_pinnumber($data))
        {
            $result['status'] = true;
        }

        //------------------------SLDATA-------------------------------------------------------------

        $data['SLCODE'] = $this->input->post('inputname_slcode');
        $data["SLDSCR"] = $data["fullnamex"];
        $data["SLADRS"] = $data['fulladres'];
        $data["COAREFNO"] = "";
        $data['REFNO'] = $data['pxindexno'];
        $data['TIN'] = $data['tinnumber'];
        $data['PINcode'] = $data["pincodexs"];
        $data['zipcode'] = $data['zipcodexs'];

        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        $data['SLSTATUS'] = 1;
        $data['Sysmade'] = 'NUR';
        $data['updatedby'] = $this->session->userdata("empname");
        $data['updated'] = $data['updatedxz'];
        $data['grouping'] = 'PATIENT';
        $data['status'] = 'OPEN';

        if ($this->admission_model->insert_new_slcode($data)) {
            $result['status'] = true;
        }

        echo json_encode($result);
    }

    public function deletePatient() {
        $result = array('status' => FALSE);

        $pin = $this->input->post('pin');

        $patientlisttable = $this->admission_model->delete_patient_from_masterlist($pin);
        $slaccounttable = $this->admission_model->delete_patient_from_slaccount($pin);

        if ($patientlisttable && $slaccounttable) {
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getPatientlistDataForUpdatePatient() {
        $result = array('status' => FALSE);
        $id = $this->input->post('iden');

        $patientlist_data = $this->admission_model->get_data_from_patientlist_for_edit_patient($id);

        if ($patientlist_data) {
            $result["patientlistdata"] = $patientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getPatientlistDataForQuickDataEdit() {
        $result = array('status' => FALSE);
        $pin = $this->input->post('pin');

        $patientlist_data = $this->admission_model->get_data_from_patientlist_for_quick_data_edit($pin);

        if ($patientlist_data) {
            $result["patientlistdata"] = $patientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function updatePatient() {
        $result = array('status' => FALSE);
        $id = $this->input->post('inputname_hiddenIDedt');
        $oldrecordchkbox = $this->input->post('inputname_oldrecordchkboxedt');
        $archivedpateint = $this->input->post('inputname_archivedpateintedt');
        $hrnisverifiedch = $this->input->post('inputname_hrnisverifiedchedt');

        if ($oldrecordchkbox === "ON") {
            $oldrecordaddpx = 1;
        } else {
            $oldrecordaddpx = 0;
        }

        if ($archivedpateint === "ARCHIVED") {
            $archivepxaddpx = 1;
        } else {
            $archivepxaddpx = 0;
        }

        if ($hrnisverifiedch === "YES") {
            $hrnverifyaddpx = 1;
        } else {
            $hrnverifyaddpx = 0;
        }

        $data['archivedx'] = $archivepxaddpx;
        $data['oldrecord'] = $oldrecordaddpx;
        $data['hrnverify'] = $hrnverifyaddpx;
        
        $province = strtoupper($this->input->post('selectname_provinceedt'));
        $provinceexplode = explode("-", $province);
        $data["provincex"] = $provinceexplode[0];
        $data["provcode"] = $provinceexplode[1];
        
        $citymunicipal = strtoupper($this->input->post('selectname_citymunicipaledt'));
        $citymunicipalexplode = explode("-", $citymunicipal);
        $data["citymunic"] = $citymunicipalexplode[0];
        $data["citycode"] = $citymunicipalexplode[1];
        
        $data['mothernat'] = strtoupper($this->input->post('selectname_mothersnationedt'));
        $data['fathernat'] = strtoupper($this->input->post('selectname_fathersnationedt'));
        $data['civilstat'] = strtoupper($this->input->post('selectname_civiledt'));
        $data['gendersex'] = strtoupper($this->input->post('selectname_genderedt'));
        $data['religionx'] = strtoupper($this->input->post('selectname_religionedt'));
        $data['nationali'] = strtoupper($this->input->post('selectname_nationalityedt'));
        $data['barangayx'] = strtoupper($this->input->post('selectname_barangayedt'));
        
        $mmbrxtype = $this->input->post('selectname_membershipedt');
        if ($mmbrxtype === "Select from List" || $mmbrxtype === "SELECT FROM LIST")
        {
            $data['mmbrxtype'] = "";
        } 
        else
        {
            $data['mmbrxtype'] = strtoupper($this->input->post('selectname_membershipedt'));
        }
        
        $data['slcodenum'] = strtoupper($this->input->post('inputname_slcodeedt'));
        $data['tinnumber'] = strtoupper($this->input->post('inputname_tinnumedt'));
        $data['pxindexno'] = strtoupper($this->input->post('inputname_pxindexedt'));
        $data['phmembers'] = strtoupper($this->input->post('inputname_phmemberedt'));
        $data['phidnumbr'] = strtoupper($this->input->post('inputname_phidnumbedt'));
        $data['healthrec'] = strtoupper($this->input->post('inputname_healthrecnoedt'));
        
        $oldrecord = new DateTime($this->input->post('inputname_oldrecrdedt'));
        $data['oldrecord'] = strtoupper($oldrecord->format('Y-m-d'));
        
        $data['firstname'] = strtoupper($this->input->post('inputname_fnameedt'));
        $data['lastnamex'] = strtoupper($this->input->post('inputname_lnameedt'));
        $data['midlename'] = strtoupper($this->input->post('inputname_mnameedt'));
        $data['suffixxes'] = strtoupper($this->input->post('inputname_suffixedt'));
        $data['mobilenum'] = strtoupper($this->input->post('inputname_mobileedt'));
        $data['telephone'] = strtoupper($this->input->post('inputname_landlineedt'));
        
        $pxbirthday = new DateTime($this->input->post('inputname_birthdayedt'));
        $data['birthdayx'] = strtoupper($pxbirthday->format('Y-m-d'));
        
        $data['passportx'] = strtoupper($this->input->post('inputname_passportedt'));
        $data['spouxname'] = strtoupper($this->input->post('inputname_spouseedt'));
        
        $spouxbday = new DateTime($this->input->post('inputname_spousebdayedt'));
        $data['spouxbday'] = strtoupper($spouxbday->format('Y-m-d'));
        
        $data['zipcodexs'] = strtoupper($this->input->post('inputname_zipcodeedt'));
        $data['streetadr'] = strtoupper($this->input->post('inputname_streetedt'));
        $data['mothrname'] = strtoupper($this->input->post('inputname_mothersnameedt'));
        $data['fathrname'] = strtoupper($this->input->post('inputname_fathersnameedt'));
        $data['mothradrs'] = strtoupper($this->input->post('inputname_mothersadrsedt'));
        $data['fathradrs'] = strtoupper($this->input->post('inputname_fathersadrsedt'));

        $data['emailadrs'] = $this->input->post('inputname_emailaddedt');
        $data["fullnamex"] = $data['lastnamex'] . ", " . $data['firstname'] . " " . $data['suffixxes'] . " " . $data['midlename'];

        $bday = new DateTime($data['birthdayx']);
        $now = new DateTime();
        
        $data["ageofpati"] = strtoupper($this->input->post('inputname_pxagexforaddpatientedt')); //----------------------------------------------------
        $data['birthdayz'] = date("Y-m-d", strtotime($data['birthdayx'])); //----------------------------
        $data['spoubirth'] = date("Y-m-d", strtotime($data["spouxbday"])); //----------------------------

        $pins = explode("-", $data["pxindexno"]);
        $data["pinyearxs"] = strtoupper($pins[0]); //----------------------------------------------------------------
        $data["pinsequen"] = strtoupper($pins[1]); //----------------------------------------------------------------

        $data['phmemberx'] = strtoupper($this->input->post('selectname_phmembershipedt'));
        if ($data["phmemberx"] !== "" || $data["phmemberx"] !== "Select from List")
        {
            $phc = explode(":", $data["phmemberx"]);
            $data["phiccodex"] = strtoupper($phc[1]);
            $data["phicmembr"] = strtoupper($phc[0]);
        } 
        else 
        {
            $data["phiccodex"] = "NHP";
            $data["phicmembr"] = "NON-NHIP";
        }

        $nows = date_format($now, "m/d/Y H:i:s");
        $pinc = preg_replace("/[^a-zA-Z0-9]/", "", $nows);
        $data["pincodexs"] = "PIN" . $pinc; //-------------------------------------------------------------

        $subjectHRNcode = $data['healthrec'];
        $healtrecordnumber = str_replace("-", "", $subjectHRNcode);
        $data["healrecno"] = $healtrecordnumber; //------------------------------------------------------

        $subjectmobileno = $data['mobilenum'];
        $mobilenumber = str_replace("-", "", $subjectmobileno);
        $data["mobilenox"] = $mobilenumber; //-----------------------------------------------------------

        $subjecttelephone = $data['telephone'];
        $telephone = str_replace("-", "", $subjecttelephone);
        $data["telephonx"] = $telephone; //--------------------------------------------------------------

        $newstring = str_replace("-", "1", $data["pxindexno"]);
        $pinformat = substr($newstring, -7);
        $data["pinformat"] = "C" . $pinformat; //---------------------------------------------------------

        $data['ipaddress'] = $_SERVER["REMOTE_ADDR"];
        $pc = $this->admission_model->getpccode($data['ipaddress']);
        $data["pccodexxs"] = $pc[0]['PCcode']; //--------------------------------------------------------

        $lastdisch = $data['oldrecord'];
        $dischdate = date("Y-m-d", strtotime($lastdisch));
        $data["lasdiscd8"] = $dischdate; //--------------------------------------------------------------

//        $now = new DateTime();
//        $data['updatedxz'] = $now->format('Y-m-d h:i:s');
        
        date_default_timezone_set('Asia/Manila');
        $data["serverTime"] = date('Y-m-d H:i:s');
        $data['updatedxz'] = date('Y-m-d H:i:s');

//        date_default_timezone_set('Asia/Bangkok');
//        $data["serverTime"] = date('Y-m-d H:i:s');

        $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
        $data["station"] = strtoupper($hostname);

        $data["recordID"] = $this->session->userdata("ID");
        $data["recordedby"] = $this->session->userdata("empname");
        
        //===============SLACCOUNT SECTION=======================================>
        $slaccount = $this->admission_model->generate_sl_code($data['slcodenum']);
        if (!$slaccount) {
            $data['slcSLCODE'] = $data['slcodenum'];
            $data["slcSLDSCR"] = $data["fullnamex"];
            $data["slcSLADRS"] = $data['streetadr'] . " " . $data['barangayx'] . " " . $data['citymunic'] . ", " . $data['provincex'];
            $data["slcCOAREFNO"] = "";
            $data['slcREFNO'] = $data['pxindexno'];
            $data['slcTIN'] = $data['tinnumber'];
            $data['slcPINcode'] = $data["pincodexs"];
            $data['slczipcode'] = $data['zipcodexs'];
            $data['slcSLSTATUS'] = 1;
            $data['slcSysmade'] = 'NUR';
            $data['slcupdatedby'] = $this->session->userdata("empname");
            $data['slcupdated'] = $data['updatedxz'];
            $data['slcgrouping'] = 'PATIENT';
            $data['slcstatus'] = 'OPEN';

            if ($this->admission_model->insert_new_slcode_for_admission($data)) {
                $result['status'] = true;
            }
        }
        
        //===============UPDATE TO PATIENTLIST=======================================>
        if ($this->admission_model->update_patient($data, $id)) 
        {
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getPatientlistDataForAdmitPatient() {
        $result = array('status' => FALSE);
        $id = $this->input->post('idex');

        $patientlist_data = $this->admission_model->get_data_from_patientlist_for_admit_patient($id);

        if ($patientlist_data) {
            $result["adtid"] = $patientlist_data;
            $result["adtin"] = $patientlist_data;
            $result["adpin"] = $patientlist_data;
            $result['adlname'] = $patientlist_data;
            $result['adfname'] = $patientlist_data;
            $result['admname'] = $patientlist_data;
            $result['adsuffix'] = $patientlist_data;
            $result['adsex'] = $patientlist_data;
            $result['adnationality'] = $patientlist_data;
            $result['adage'] = $patientlist_data;
            $result['adbday'] = $patientlist_data;
            $result['adcivilstatus'] = $patientlist_data;
            $result['adreligion'] = $patientlist_data;
            $result['adadrs'] = $patientlist_data;
            $result['adbrgy'] = $patientlist_data;
            $result['adcityadd'] = $patientlist_data;
            $result['adzipcode'] = $patientlist_data;
            $result['adprovadd'] = $patientlist_data;
            $result['admobileno'] = $patientlist_data;
            $result['adcontactno'] = $patientlist_data;
            $result['ademail'] = $patientlist_data;
            $result['adpassportno'] = $patientlist_data;
            $result['adfather'] = $patientlist_data;
            $result['admother'] = $patientlist_data;
            $result['adfatheradrs'] = $patientlist_data;
            $result['admotheradrs'] = $patientlist_data;
            $result['adfathernationality'] = $patientlist_data;
            $result['admothernationality'] = $patientlist_data;
            $result['admemberrefno'] = $patientlist_data;
            $result['adHRNcode'] = $patientlist_data;
            $result['adphicmembr'] = $patientlist_data;
            $result['adphiccode'] = $patientlist_data;
            $result['adphicmembrname'] = $patientlist_data;
            $result['adphicno'] = $patientlist_data;
            $result['adpincode'] = $patientlist_data;
            $result['adpinformat'] = $patientlist_data;
            $result['adspouse'] = $patientlist_data;
            $result['adspousebday'] = $patientlist_data;
            $result['admemberrefno'] = $patientlist_data;
            $result['adlastadmdate'] = $patientlist_data;
            $result['adlastadmtime'] = $patientlist_data;
            $result['adlastdischdate'] = $patientlist_data;
            $result['adlastdischtime'] = $patientlist_data;
            $result['adslaccount'] = $patientlist_data;
            $result['adpincode'] = $patientlist_data;
            $result['adcasecode'] = $patientlist_data;
            $result['adpxtype'] = $patientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getInPatientDataForAdmitPatientGenerateData() {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('casenumber');

        $inpatient_data = $this->admission_model->get_data_from_inpatient_for_admit_patient_generate_data($caseno);

        if ($inpatient_data) {
            $result["getcaseno"] = $inpatient_data;
        }
        echo json_encode($result);
    }

    public function admitPatient() {
        $result = array('status' => FALSE);

        $HRnCODE = $this->input->post('inputname_healthrecnoadm');
        $logbookno = $this->input->post('inputname_casenumberadm');
        $admcaseno = $this->input->post('inputname_accountnumberadm');
        $admpinnum = $this->input->post('inputname_pxindexnoadm');
        $vipdata = $this->input->post('inputname_vipsecuritydataadm');
        $pkgdata = $this->input->post('inputname_packagemanadataadm');
        $admcityadd = $this->input->post('selectname_citymuniadm');
        $admprovadd = $this->input->post('inputname_provinceadm');
        $attendingdoc = $this->input->post('selectname_attendingdoctoradm');
        $attendingnur = $this->input->post('selectname_attendingnurseadm');
        $patientclass = $this->input->post('selectname_patientclassadm');
        $adultpedia = $this->input->post('selectname_adultpediaadm');
        $obgyneproced = $this->input->post('selectname_obgyneprocedureadm');
        $others = $this->input->post('inputname_othersadm');
        $pathology = $this->input->post('inputname_pathologyadm');
        $roomdata = $this->input->post('selectname_roomadmhid');
        $philmember = $this->input->post('selectname_phmembershipadm');
        $dietary = $this->input->post('textareaname_dietaryadm');
        $nurincha = $this->input->post('inputname_nurseinchargeadm');
        
        $lmpdate = new DateTime($this->input->post('inputname_lmpdateadm'));
        $newlmpdate = $lmpdate->format('Y-m-d');

        if ($patientclass === "GYNECOLOGY") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $pathology);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = "";
            $data["lmp"] = strtoupper($newlmpdate);
        } else if ($patientclass === "MEDICAL") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $adultpedia);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = strtoupper($adultpedia);
            $data["OBprocedure"] = "";
            $data["lmp"] = "";
        } else if ($patientclass === "OBSTETRICS") {
            $data["pat_classification"] = strtoupper($patientclass);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = strtoupper($obgyneproced);
            $data["lmp"] = strtoupper($newlmpdate);
        } else if ($patientclass === "OTHERS") {
            $data["pat_classification"] = strtoupper($others);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = "";
            $data["lmp"] = "";
        } else if ($patientclass === "SURGICAL") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $pathology);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = "";
            $data["lmp"] = "";
        } else if ($patientclass === "NEW BORN") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $pathology);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = strtoupper($obgyneproced);
            $data["lmp"] = "";
        } else if ($patientclass === "STILL BIRTH") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $pathology);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = strtoupper($obgyneproced);
            $data["lmp"] = "";
        } else {
            $data["pat_classification"] = strtoupper($patientclass);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = "";
            $data["lmp"] = "";
        }

        $splitcaseno = explode("-", $admcaseno);
        $splitpinnum = explode("-", $admpinnum);
        $roomsplit = explode(":", $roomdata);
        $phictype = explode(":", $philmember);
        $splitpackge = explode("|", $pkgdata);
        $splitcitymu = explode("-", $admcityadd);
        $splitprovin = explode("-", $admprovadd);
        $splitdoctor = explode(" - ", $attendingdoc);
        $splitnurses = explode(" - ", $attendingnur);
        $splitdietry = explode(" - ", $dietary);
        $splitnurinc = explode(" - ", $nurincha);

        $now = new DateTime();

        if ($vipdata !== "") {
            $data["vipvalue"] = 1;
        } else {
            $data["vipvalue"] = 0;
        }

        if ($pkgdata !== "") {
            $data["pkgcode"] = $splitpackge[5];
        } else {
            $data["pkgcode"] = "";
        }

        $data["pxtype"] = $this->input->post('selectname_patienttypeadm');

        $data['admittype'] = $this->input->post('selectname_admixontypeadm');
        $data['logbookCN'] = str_replace("-", "", $logbookno);
        //$data['logbookPIN']             =
        $data["HRnCODE"] = str_replace("-", "", $HRnCODE);
        //$data["lasttextsent"]           = 1901-01-01 00:00:00;
        //$data["lasttransactionsent"]    =        
        $data["vip"] = $this->input->post('numboxname_vipscore');
        $data['pincode'] = $this->input->post('hiddeninputname_pincodeadm');
        $data["casecode"] = $this->input->post('hiddeninputname_casecodexadm');
        $data["caseyr"] = strtoupper($splitcaseno[0]);
        $data["caseseq"] = strtoupper($splitcaseno[1]);
        $data['caseno'] = $this->input->post('inputname_accountnumberadm');


        $memberrefno = $this->input->post('inputname_vmembershipadm');
        if ($memberrefno === "SELECT FROM LIST" || $memberrefno === "SELECT") {
            $data['memberrefno'] = "";
        } else {
            $data['memberrefno'] = $this->input->post('inputname_vmembershipadm');
        }

        $data['ledgerfile'] = "ledgeripd";
        $data["pinyr"] = strtoupper($splitpinnum[0]);
        $data["pinseq"] = strtoupper($splitpinnum[1]);
        $data["PIN"] = $this->input->post('inputname_pxindexnoadm');
        $data['pinformat'] = $this->input->post('hiddeninputname_pinformatadm');
        $data['lname'] = strtoupper($this->input->post('inputname_lastnameadm'));
        $data['fname'] = strtoupper($this->input->post('inputname_firstnameadm'));
        $data['suffix'] = strtoupper($this->input->post('inputname_suffixadm'));
        $data['mname'] = strtoupper($this->input->post('inputname_middlenameadm'));
        $data["name"] = $data['lname'] . ", " . $data['fname'] . " " . $data['mname'] . " " . $data['suffix'];
        $data["hideinfo"] = 0;
        $data["spouse"] = strtoupper($this->input->post('inputname_spousenameadm'));

        $spousebday = new DateTime($this->input->post('inputname_spousebirthadm'));
        $spouxbday = $spousebday->format('Y-m-d');

        $data["spousebday"] = strtoupper($spouxbday);
        $data['sex'] = strtoupper($this->input->post('inputname_genderadm'));


        $birthdate = new DateTime($this->input->post('inputname_birthdayadm'));
        $pxbday = $birthdate->format('Y-m-d');

        $data['bday'] = strtoupper($pxbday);
        $data['Age'] = strtoupper($this->input->post('inputname_ageadm'));
        $data['packageCODE'] = strtoupper($data["pkgcode"]);
        $data['nationality'] = strtoupper($this->input->post('inputname_nationalityadm'));
        $data['passportno'] = strtoupper($this->input->post('inputname_passportnoadm'));
        $data['adrs'] = strtoupper($this->input->post('inputname_addressadm'));
        $data['brgy'] = strtoupper($this->input->post('selectname_barangayadm'));
        
        $data['cityadd'] = strtoupper($splitcitymu[0]);
        $data['citycode'] = strtoupper($splitcitymu[1]);
        $data['provadd'] = strtoupper($splitprovin[0]);
        $data['provcode'] = strtoupper($splitprovin[1]);
        
        $data['zipcode'] = strtoupper($this->input->post('inputname_zipcodeadm'));
        $data['civilstatus'] = strtoupper($this->input->post('selectname_civilstatusadm'));
        $data['contactno'] = strtoupper($this->input->post('inputname_contactnoadm'));
        $data['mobileno'] = strtoupper($this->input->post('inputname_mobilenoadm'));
        $data['email'] = $this->input->post('inputname_emailadm');
        $data['religion'] = strtoupper($this->input->post('selectname_religionadm'));
        $data['father'] = strtoupper($this->input->post('inputname_fatheradm'));
        $data['fatheradrs'] = strtoupper($this->input->post('inputname_fatheradrsadm'));
        $data['fathernationality'] = strtoupper($this->input->post('inputname_fathernationadm'));
        $data['mother'] = strtoupper($this->input->post('inputname_motheradm'));
        $data['motheradrs'] = strtoupper($this->input->post('inputname_motheradrsadm'));
        $data['mothernationality'] = strtoupper($this->input->post('inputname_mothernationadm'));
        
        date_default_timezone_set('Asia/Manila');
        $data['updated'] = date('Y-m-d H:i:s');
        
        $data["doctorid"] = strtoupper($splitdoctor[1]);
        $data["doctorname"] = strtoupper($splitdoctor[0]);
        $data["nurseid"] = strtoupper($splitnurses[1]);
        $data["nursename"] = strtoupper($splitnurses[0]);
        $data["hmoid"] = strtoupper($this->input->post('hiddboxname_hmocodeadm'));
        $data["hmoname"] = strtoupper($this->input->post('hiddboxname_hmonameadm'));
        $data["hmoholder"] = strtoupper($this->input->post('hiddboxname_holnameadm'));
        $data["hmonumber"] = strtoupper($this->input->post('hiddboxname_hmoprioadm'));
        $data["hmoapprovalno"] = strtoupper($this->input->post('hiddboxname_apprnumadm'));
        $data["archived"] = 0;

        
        $data['lastadmitdate'] = strtoupper($this->input->post('hiddeninputname_lastadmitdateadm'));
        //$data["archiveddate"]           = 1900-01-01
        $data['lastadmittime'] = strtoupper($this->input->post('hiddeninputname_lastadmittimeadm'));
        $data['lastdischdate'] = strtoupper($this->input->post('hiddeninputname_lastdischdateadm'));
        $data['lastdischtime'] = strtoupper($this->input->post('hiddeninputname_lastdischtimeadm'));
        $data["recid"] = strtoupper($this->session->userdata("ID"));
        $data["recby"] = strtoupper($this->session->userdata("empname"));
        $data["station"] = strtoupper(gethostbyaddr($_SERVER['REMOTE_ADDR']));

        $dateofadmission = new DateTime($this->input->post('inputname_admissiondateadm'));
        $timeofadmission = date("H:i", strtotime($this->input->post('inputname_admissiontimeadm')));
        $data['admitdate'] = $dateofadmission->format('Y-m-d');
        $data['admittime'] = $timeofadmission . ":00";

        $data['tagfordischa'] = 0;
        //$data['tagfordischaDT']         = 1901-01-01 00:00:00
        $data['dischadate'] = $now->format('Y-m-d');
        $data['dischatime'] = $now->format('h:i:s');
        //$data['dischaid']               = 95
        //$data['dischaby']               = ADMINISTRATOR
        $data['discharged'] = 0;
        //$data['daysconfined']           =  0
        //$data['disposition']            = 
        //$data['expireddate']            =  1901-01-01
        //$data['expiredtime']            = 00:00:00

        $referredfromhci = $this->input->post('selectname_hospcareinsadm');
        if ($referredfromhci === "Select" || $referredfromhci === "SELECT") {
            $data['ReferredFromHCI'] = "";
        } else {
            $data['ReferredFromHCI'] = strtoupper($this->input->post('selectname_hospcareinsadm'));
        }

        //$data['TransRefHCI']            = 
        //$data['reasonforreferral']      = 
        $data["roomref"] = strtoupper($roomsplit[0]);
        $data["roomcd"] = strtoupper($roomsplit[1]);
        $data["roomtype"] = strtoupper($roomsplit[2]);
        $data["roomno"] = strtoupper($roomsplit[3]);
        $data["roombed"] = strtoupper($roomsplit[4]);
        $data["roominfo"] = strtoupper($roomsplit[5]);
        $data["roombrief"] = strtoupper($data["roomno"] . " : " . $data["roombed"] . " - " . $data["roomtype"]);
        
        date_default_timezone_set('Asia/Manila');
        $data["roomdate"] = date('Y-m-d');
        $data["roomtime"] = date('H:i:s');
        
        $data["roomrate"] = strtoupper($roomsplit[6]);
        $data["PRICEPACKAGE"] = strtoupper($roomsplit[8]);
        //$data["rmrateschm"]             = IPD1
        //$data["RmPHICtype"]             = NON or PRI
        $data["creditmax"] = strtoupper($roomsplit[9]);
        $data["addonserv"] = strtoupper($roomsplit[7]);
        $data["phiccode"] = strtoupper($phictype[1]);
        $data["phicmembr"] = strtoupper($phictype[0]);
        //$data["phicdependent"]          = 0
        $data["phicPIN"] = strtoupper($this->input->post('inputname_phicnumberadm'));
        $data["phicmembrname"] = strtoupper($this->input->post('inputname_membernameadm'));

        if (strtoupper($this->input->post('selectname_reltomemberadm')) === "SELECT") {
            $data["relationtomember"] = "";
        } else {
            $data["relationtomember"] = strtoupper($this->input->post('selectname_reltomemberadm'));
        }

        //
        //$data["phiccasesecond"]         = 
        //$data["phiccasesecondRefno"]    = 10420148898PHICCD
        //$data["phiccasesecondDx"]       = Normal newborn care package
        //$data["phicHCItotal"]           = 13080
        //$data["PHICpfTotal"]            = 5570
        $data["PHICrmtype"] = strtoupper($roomsplit[10]);
        //$data["Diag_discharge_updatedby"]= ADMINISTRATOR;
        //$data["Diag_discharge_updatedDT"]= 2019-02-12 14:22:17;
        //$data["Diag_surg_ref"]          = 12162018050800SURG
        //$data["Diag_surg"]              = SMALL  INCISION  CATRACT SURGERY,OS
        //$data["Diag_surgICD"]           = 
        //$data["Diag_surg_type"]         = 
        //$data["Diag_anes_ref"]          = 08172017071214STER
        //$data["Diag_anes"]              = Local Anesthesia
        //$data["Diag_anesICD"]           = 
        //$data["ICD10"]                  = O02.9
        //$data["icdcasetype"]            = 
        //$data["flagme"]                 =  0
        //$data["suprvid"]                = 437
        //$data["suprvby"]                = JESSAVY SASING
        //$data["clearedid"]              = 298
        //$data["clearedby"]              = CHARISSE DIANO
        //$data["clearedtd"]              = 2018-12-12 20:53:28
        //$data["clearedat"]              = STATION4A
        //$data["Quickadmit"]             = 0;
        //$data["patfile"]                = 
        //$data["imagefile"]              = (BLOB)
        //$data["mypix"]                  = 12/18/2018 9:23:51 PM
        //$data["phicpapers"]             = OK
        //$data["phicclearby"]            = 
        //$data["phicdeductions"]         = FULL
        //$data["phicnote"]               = 
        //$data["printedby"]              = CARESS KATHLEEN ELLO
        //$data["printeddate"]            = 2018-12-19 09:01:24
        //$data["billingnote"]            = Final bill. Thank you!
        //$data["nobillingdischarged"]    = 0
        //$data["nbdhospamount"]          = 10500
        //$data["nbddocamount"]           = 4500
        //$data["GrossHospAmt"]           = 16147.6
        //$data["GrossDocAmt"]            = 5200
        //$data["GrandTotalBill"]         = 21347.6
        //$data["phic1caseHCIrecommend"]  = 10500
        //$data["phic2caseHCIrecommend"]  = 0
        //$data["phic1caseDOCrecommend"]  = 2310
        //$data["phic2caseDOCrecommend"]  = 500
        //$data["DiscountPHIChosp"]       = 6640
        //$data["DiscountPHICdoc"]        = 9600
        //$data["DiscountHosp"]           = 0
        //$data["DiscountHospDoc"]        = 0
        //$data["DiscountHMOHosp"]        = 0
        //$data["DiscountHMODoc"]         = 0
        //$data["DiscountSrHosp"]         = 1161.01
        //$data["DiscountSrDoc"]          = 0
        //$data["DiscountVATHosp"]        = 0
        //$data["DiscountVATDoc"]         = 0
        //$data["PNrefno"]                = 75689
        //$data["PNduedate"]              = 1901-01-01
        //$data["PNamount"]               = 0
        //$data["PNBalance"]              = 0
        //$data["PNlastupdate"]           = 1901-01-01
        //$data["PNlastRefno"]            = 
        //$data["PNby"]                   = 
        //$data["PNAddress1"]             = 
        //$data["PNAddress2"]             = 
        //$data["PNbyCellnumber"]         = 
        //$data["dischargedsameday"]      = 1
        //$data["dischargein48"]          = 
        //$data["deliverycausesofdeaths"] = 
        //$data["deathtype"]              = Room/Admission Death
        //$data["HAIcase_deviceinfection"]= none
        //$data["HAIcasedays"]            = 0
        //$data["HAIVAPinfection"]        = 0
        //$data["HAIVAPdays"]             = 0
        //$data["HAIBSIinfection"]        = 0
        //$data["HAIBSIdays"]             = 0
        //$data["HAIUTIinfection"]        = 0
        //$data["HAIUTIdays"]             = 0
        //$data["HAIcase_nonedeviceinfection"]= 
        //$data["HAInonecasedays"]        = 0
        //$data["HAISSInoneinfection"]    = 0
        //$data["HAISSIdays"]             = 0
        //$data["phicclaimrefno"]         = PD121518083036PHIPHICREFCHK
        //$data["phicclaimstatus"]        = ONPROCESS
        //$data["pcsoamount"]             = 0
        //$data["pcsorefcode"]            = 
        //$data["pcsogrant"]              = 1901-01-01
        //$data["hmoclaimrefno"]          = 
        //$data["hmopapers"]              = NM
        //$data["hmodeductions"]          = NODE
        //$data["hmoclaimstatus"]         = 
        //$data["hmoclaimeddate"]         = 1901-01-01
        //$data["hmoclaimedamount"]       = 0.00
        //$data["hmobalance"]             = 0
        //$data["hmovoucherdate"]         = 1901-01-01
        //$data["hmovoucherno"]           = 
        //$data["hmovoucheramount"]       = 0 
        //$data["needdeposit"]            = NONE
        //$data["advisedeposit"]          = 1901-01-01 00:00:00
        //$data["InqBal"]                 = 14523.3
        //$data["NeedDepoamt"]            = 0 or 1
        //$data["phiccf2prepby"]          = 
        //$data["phiccf2updated"]         = 1901-01-01 00:00:00
        //$data["Phiccf2done"]            = 0
        //$data["ReqPHICmdrno"]             = 0
        $data["ReqPHICmdrweb"] = strtoupper($this->input->post('inputname_mdfrefnumadm'));
        //$data["ReqPHICspouse"]          = 0
        //$data["ReqPHICChild"]           = 0
        //$data["ReqPHICOFW"]             = 0
        //$data["ReqPHICparent"]          = 0
        //$data["cashierpaid"]            = 0 or 1
        //$data["cashiername"]            = JASMINE JOY OYO-A
        //$data["cashierbatchrefno"]      = 12142018075951CASHIER5BC
        //$data["cashierDT"]              = 2018-12-14 00:00:00
        //$data["verifiedby"]             = 
        //$data["verifiedadmission"]      = 0
        //$data["verifieddatetime"]       = 1901-01-01 00:00:00
        //$data["medcertrefno"]           = 12142018IT100544MC
        //$data["patientnickname"]        = 
        //$data["Birthcertrefno"]         = XXX-ALONA V. LAGAHIT
        //$data["medicolegalrefno"]       = 
        //$data["diagnosisdone"]          = 0;
        //$data["archivedby"]             = 
        //$data["restoreddate"]           = 1901-01-01
        //$data["restored"]               = 0;
        //$data["restoredby"]             = 
        //$data["MedicoLegalReference"]   = 
        //$data["patientisNBB"]           = 0
        //$data["hascateg"]               = 0
        //$data["phicmemberverified"]     = 0 or 1
        //$data["otherdiag"]              = 
        //$data["nursedischadate"]        = 2018-12-11
        //$data["nursedischatime"]        = 15:35:21
        //$data["TICKETCODE"]             = 
        //$data["TICKETDATE"]             = 1901-01-01
        //$data["TICKETBY"]               = 
        //$data["postedby"]               = 
        //$data["postingdate"]            = 1901-01-01
        //$data["pxgroup"]                = 
        $data["slcode"] = strtoupper($this->input->post('inputname_slcodeadm'));

        $patienttypeadm = $this->input->post('selectname_patienttypeadm');
        if ($patienttypeadm === "IPD") {
            $data['casetype'] = "IN-PATIENT";
            $data["billingcprecipient"] = strtoupper($this->input->post('inputname_billingrecipientadm'));
            $data["Weight"] = strtoupper($this->input->post('inputname_weightadm'));
            $data["guarantor"] = strtoupper($this->input->post('inputname_watchernameadm'));
            $data["guarantor_rltn"] = strtoupper($this->input->post('selectname_reltopatientadm'));
            $data["guarantor_mobileno"] = strtoupper($this->input->post('inputname_guardiannumadm'));

            $nursestation = $this->input->post('selectname_stationnameadm');
            if ($nursestation === "Select" || $nursestation === "SELECT") {
                $data["nursestation"] = "";
            } else {
                $data["nursestation"] = strtoupper($this->input->post('selectname_stationnameadm'));
            }

            $data["opdtype"] = "IPDPX";

            $watcherbday = new DateTime($this->input->post('inputname_watcherbirthadm'));
            $guardianbday = $watcherbday->format('Y-m-d');

            $data["guarantor_bday"] = strtoupper($guardianbday);
            $data["dietarycd"] = strtoupper($this->input->post('textareaname_dietaryadm'));
            $data["diatary_ins"] = strtoupper($this->input->post('textareaname_dietaryviewadm'));
            $data["Diag_chiefcomplain"] = strtoupper($this->input->post('textareaname_admitreasonadm'));
            $data["Diag_admit"] = strtoupper($this->input->post('textareaname_admitdiagnosadm'));
            $data["admissionsource"] = strtoupper($this->input->post('inputname_admissiontypehiddentext'));
            
            if($nurincha === "Select" || $nurincha === null)
            {
                $data["NurseIncharge"] = "";
                $data["NurseInchargeID"] = "";
            }
            else
            {
                $data["NurseIncharge"] = strtoupper($splitnurinc[0]);
                $data["NurseInchargeID"] = strtoupper($splitnurinc[1]);
            }

            $data["minorOR"] = $this->input->post('textboxname_forminororadm');
            $data["cautions"] = strtoupper($this->input->post('selectname_cautionsadm'));
            $data["TBstatus"] = strtoupper($this->input->post('selectname_tbdotsstatusadm'));
            $data["phiccasefirst"] = "";
            $data["phiccasefirstRefno"] = "";
            $data["phiccasefirstDx"] = "";
            $data["dietstatus"] = "ACTIVE";
            $data["Diag_discharge"] = "";
            $data["antenatal"] = 0;
            $data["postnatal"] = 0;
        } 
        else 
        {
            $data['casetype'] = strtoupper($this->input->post('selectname_entrytypeadm'));
            $data["opdtype"] = $this->input->post('inputname_opdtypexdataadm');
            $data["nursestation"] = "OPD";
            $data["billingcprecipient"] = "";
            $data["Weight"] = "";
            $data["guarantor"] = "";
            $data["guarantor_rltn"] = "";
            $data["guarantor_mobileno"] = "";
            $data["guarantor_bday"] = "";
            $data["dietarycd"] = "";
            $data["diatary_ins"] = "";
            $data["Diag_chiefcomplain"] = strtoupper($this->input->post('textareaname_admitreasonadm'));
            $data["Diag_admit"] = strtoupper($this->input->post('textareaname_admitdiagnosadm'));
            $data["admissionsource"] = "NORMAL";
            $data["NurseIncharge"] = "";
            $data["NurseInchargeID"] = "";
            $data["minorOR"] = 0;
            $data["cautions"] = "";
            $data["TBstatus"] = "";
            $data["phiccasefirst"] = strtoupper($this->input->post('textboxname_icd10adm'));
            $data["phiccasefirstRefno"] = strtoupper($this->input->post('hiddboxname_phiccaserefnoadm'));
            $data["phiccasefirstDx"] = strtoupper($this->input->post('textareaname_impressionadm'));
            $data["dietstatus"] = "DISCHARGED";
            $data["Diag_discharge"] = strtoupper($this->input->post('textareaname_impressionadm'));

            $entrytypeforpreandpostnatal = $this->input->post('selectname_entrytypeadm');
            if ($entrytypeforpreandpostnatal === "POST-NATAL") {
                $data["postnatal"] = 1;
            } 
            else 
            {
                $data["postnatal"] = 0;
            }

            if ($entrytypeforpreandpostnatal === "PRE-NATAL")
            {
                $data["antenatal"] = 1;
            }
            else
            {
                $data["antenatal"] = 0;
            }
        }

        //===============CO-MANAGE SECTION=====================================>
        $result1 = [];
        $comanagedata = $this->input->post('inputname_finalcomanagedataadm');

        if ($comanagedata !== "") {
            $firstDimension = explode('?,', $comanagedata);
            foreach ($firstDimension as $key => $value) {
                if (empty($value)) {
                    unset($firstDimension[$key]);
                }
            }

            foreach ($firstDimension as $temp) {
                $result1[] = explode('|', $temp);
            }

            for ($cv = 0; $cv < count($firstDimension); $cv++) {
                $data['comadocname'] = $result1[$cv][0];
                $data['comadocrefno'] = $result1[$cv][1];
                $data['comadatereferred'] = $result1[$cv][2];
                $data['comamanagetype'] = $result1[$cv][3];
                $data['comaacctno'] = $this->input->post('inputname_accountnumberadm');
                $data['comaacctrefno'] = $this->input->post('hiddeninputname_casecodexadm');
                $data['comaPINcode'] = $this->input->post('hiddeninputname_pincodeadm');
                $data['comapatientname'] = $data['lname'] . ", " . $data['fname'] . " " . $data['mname'] . " " . $data['suffix'];
                $data['comaupdated'] = $data['updated'];
                $data['comarecid'] = strtoupper($this->session->userdata("ID"));
                $data['comarecby'] = strtoupper($this->session->userdata("empname"));
                $data['comaPCcodeno'] = $this->input->post('hiddeninputname_pccodexadm');
                $data['comapxtype'] = $this->input->post('selectname_patienttypeadm');
                $data['comaaccesscode'] = "no";
                $data['comaverified'] = 1;
                $data['comaphicAR'] = 0;
                $data['comaattendingdoc'] = 0;
                $data['comaproffee'] = 0;
                $data['comasentcf4form'] = 0;
                $data['comadonecf4form'] = 0;

                if ($this->admission_model->add_comanage_data($data)) {
                    $result['status'] = true;
                }
            }
        }
        
        //===============HMO-MANAGEMENT SECTION=====================================>
        $resulthmo = [];
        $hmodata = $this->input->post('inputname_finalhmoinsurdataadm');

        if ($hmodata !== "") {
            $firstDimensionhmo = explode('?,', $hmodata);

            foreach ($firstDimensionhmo as $keyhmo => $valuehmo) {
                if (empty($valuehmo)) {
                    unset($firstDimensionhmo[$keyhmo]);
                }
            }

            foreach ($firstDimensionhmo as $temphmo) {
                $resulthmo[] = explode('|', $temphmo);
            }

            for ($cvhmo = 0; $cvhmo < count($firstDimensionhmo); $cvhmo++) {
                $data['hmorefno'] = $resulthmo[$cvhmo][2];
                $data['hmopxtype'] = $this->input->post('selectname_patienttypeadm');
                $data['hmoPINcode'] = $this->input->post('hiddeninputname_pincodeadm');
                $data['hmoacctcode'] = $this->input->post('hiddeninputname_casecodexadm');
                $data['hmoacctno'] = $this->input->post('inputname_accountnumberadm');
                $data['hmopatientname'] = $data['lname'] . ", " . $data['fname'] . " " . $data['mname'] . " " . $data['suffix'];
                $data['hmoadmitdate'] = $now->format('Y-m-d');
                //$data['hmodischadate']          = $data['admitdate'];
                $data['hmocode'] = $resulthmo[$cvhmo][1];
                $data['hmoname'] = $resulthmo[$cvhmo][0];
                $data['hmocredit'] = $resulthmo[$cvhmo][3];
                $data['hmoloa'] = $resulthmo[$cvhmo][6];
                $data['hmoapprovaldate'] = $resulthmo[$cvhmo][7];
                $data['hmohosp'] = 0;
                $data['hmodoc'] = 0;
                $data['hmoamountapplied'] = 0;
                $data['hmotransmittalage'] = 0;
                $data['hmopaid'] = 0;
                $data['hmodiscountapplied'] = 0;
                $data['hmotaxapplied'] = 0;
                $data['hmoORamountpaid'] = 0;
                $data['hmopaymentage'] = 0;
                $data['hmopriorityno'] = $resulthmo[$cvhmo][4];
                $data['hmocardholder'] = $resulthmo[$cvhmo][8];
                $data['hmocardno'] = $resulthmo[$cvhmo][5];
                $data['hmorecby'] = strtoupper($this->session->userdata("empname"));
                $data['hmorecid'] = strtoupper($this->session->userdata("ID"));
                $data['hmoupdated'] = $data['updated'];
                $data['hmostation'] = strtoupper(gethostbyaddr($_SERVER['REMOTE_ADDR']));
                $data['hmoverified'] = 1;
                $data['hmolocked'] = 0;
                $data['hmotransno'] = 0;
                $data['hmotagitem'] = 0;
                $data['hmobalanceOff'] = 0;
                $data['hmovariancetotal'] = 0;
                $data['hmogroupcode'] = 1;
                //$data['hmoSLcode'] = 
                //$data['hmocashierHMOslcode'] = 
                //$data['hmocashierHMOcode'] = 
                //$data['hmocashierhmocodename'] = 
                //$data['hmoagegrouping'] = 
                //$data['hmocashierbatch'] = 
                //$data['hmoposted'] = 
                //$data['hmopostedby'] = 
                //$data['hmotransrefno'] = 
                //$data['hmocheckno'] = 
                //$data['hmopaydate'] = 
                //$data['hmoreference'] = 
                //$data['hmotransmitdate'] = 
                //$data['hmotransmittalno'] = 
                //$data['hmoticketcode'] = 
                //$data['hmoticketdate'] =

                if ($this->admission_model->add_hmoinsurance_data($data)) {
                    $result['status'] = true;
                }
            }
        }

        //===============CAUSES OF CONFINEMENT SECTION=========================>
        $resultcauses = [];
        $causesdata = $this->input->post('inputname_finalcausecondataadm');

        if ($causesdata !== "") {
            $firstDimensioncauses = explode('?,', $causesdata);
            foreach ($firstDimensioncauses as $keycauses => $valuecauses) {
                if (empty($valuecauses)) {
                    unset($firstDimensioncauses[$keycauses]);
                }
            }

            foreach ($firstDimensioncauses as $tempcauses) {
                $resultcauses[] = explode('|', $tempcauses);
            }

            for ($cvcauses = 0; $cvcauses < count($firstDimensioncauses); $cvcauses++) {
                $data['causescode'] = $resultcauses[$cvcauses][6];
                $data['causescasecode'] = $this->input->post('hiddeninputname_casecodexadm');
                $data['causescaseno'] = $this->input->post('inputname_accountnumberadm');
                //$data['causesmembercardno']     = 
                $data['causesPIN'] = $this->input->post('inputname_pxindexnoadm');
                $data['causespincode'] = $this->input->post('hiddeninputname_pincodeadm');
                $data['causesAge'] = $this->input->post('inputname_ageadm');
                $data['causespatientname'] = $data['lname'] . ", " . $data['fname'] . " " . $data['mname'] . " " . $data['suffix'];
                $data['causesdiaggroup'] = "ADMIT";
                $data['causesdiagcode'] = $resultcauses[$cvcauses][5];
                $data['causesdiagnosis'] = $resultcauses[$cvcauses][4];
                $data['causesdiagcateg'] = $resultcauses[$cvcauses][0];
                //$data['causesdohrefno']         = ICD14852DCS
                $data['causesicdcode'] = $resultcauses[$cvcauses][1];
                //$data['causesicdcasetype']      = 
                $data['causesrecid'] = strtoupper($this->session->userdata("ID"));
                $data['causesrecby'] = strtoupper($this->session->userdata("empname"));
                $data['causeslastupdate'] = $data['updated'];
                $data['causesstation'] = $data["station"];
                //$data['causesverifiedby']       = 
                $data['causesmedrecverified'] = 0;
                //$data['causesverifieddate']     = 
                $data['causesdohstatcounted'] = 0;
                $data['causesdohstatrefno'] = $resultcauses[$cvcauses][3];
                $data['causesicd10cat'] = $resultcauses[$cvcauses][2];
                $data['causesvalidated'] = 1;

                if ($this->admission_model->add_causes_of_confinement_data($data)) {
                    $result['status'] = true;
                }
            }
        }
        
        //===============VIP/SECURITY SECTION=====================================>
        $datenowvip = $this->get_current_date();
        $datevip = new DateTime($datenowvip);
        $currentdatevip = date_format($datevip, 'Y-m-d');

        $vipalldata = $this->input->post('inputname_vipsecuritydataadm');

        if ($vipalldata !== "") {
            $vipexplode = explode("|", $vipalldata);

            $data['vipcasecode'] = $vipexplode[0];
            $data['vipcaseno'] = $vipexplode[1];
            $data['vipvip'] = $vipexplode[2];
            $data['vipsecurityrisk'] = $vipexplode[3];
            $data['vipremarks'] = $vipexplode[4];
            $data['vippatnamex'] = strtoupper($vipexplode[5]);
            $data['vipoic'] = $vipexplode[6];
            $data['vipoiccode'] = $vipexplode[7];
            $data['vipupdatedby'] = $vipexplode[8];
            $data['vipstation'] = $vipexplode[9];
            $data['vipconfirmed'] = $vipexplode[10];
            $data['vipupdated'] = $data['updated'];
            $data['vipadmitdate'] = $currentdatevip;
            $data['vipdischadate'] = $currentdatevip;

            if ($this->admission_model->insert_new_vip_patient($data)) {
                $result['status'] = true;
            }
        }

        //===============PACKAGES SECTION=====================================>
        $datenowpkg = $this->get_current_date();
        $datepkg = new DateTime($datenowpkg);
        $currentdatepkg = date_format($datepkg, 'Y-m-d');
        $useridpkg = $this->session->userdata("ID");
        $usernamepkg = $this->session->userdata("empname");

        $packagealldata = $this->input->post('inputname_packagemanadataadm');
        $pxpckgealldata = $this->input->post('inputname_pckgpatientdataadm');
        $packageacctnoadm = $this->input->post('textname_packageacctnoadm');

        if ($packagealldata !== "" && $pxpckgealldata !== "") {
            $packagedataexplode = explode("|", $packagealldata);
            $pxpckgedataexplode = explode("|", $pxpckgealldata);

            $data['pkgacctno'] = $packageacctnoadm;
            $data['pkgrefcode'] = $packagedataexplode[10];
            $data['pkgdocreferenceno'] = $packagedataexplode[4];
            $data['pkglname'] = $pxpckgedataexplode[6];
            $data['pkgfname'] = $pxpckgedataexplode[8];
            $data['pkgmname'] = $pxpckgedataexplode[7];
            $data['pkgsuffix'] = $pxpckgedataexplode[9];
            $data['pkgpatientname'] = $pxpckgedataexplode[0];
            $data['pkgaddress'] = $pxpckgedataexplode[10];
            $data['pkgcityadrs'] = $pxpckgedataexplode[11];
            $data['pkgcontactnumber'] = $pxpckgedataexplode[1];
            $data['pkgreligion'] = $pxpckgedataexplode[3];
            $data['pkgbday'] = $pxpckgedataexplode[5];
            $data['pkgageuponenrollment'] = $pxpckgedataexplode[4];
            $data['pkgsex'] = $pxpckgedataexplode[2];
            //        $data['pkgphilhealthkind']     = 
            //        $data['pkgphicidno']           = 
            //        $data['pkghmoid']              = 
            //        $data['pkghmoname']            = 
            $data['pkgpackagerefcode'] = $packagedataexplode[0];
            $data['pkgpackagecode'] = $packagedataexplode[5];
            $data['pkgpackageprice'] = $packagedataexplode[6];
            $data['pkgpin'] = $pxpckgedataexplode[12];
            $data['pkgpincode'] = $pxpckgedataexplode[14];
            $data['pkgIPDacctcode'] = $this->input->post('hiddeninputname_casecodexadm');
            $data['pkgIPDacctno'] = $this->input->post('inputname_accountnumberadm');
            $data['pkgslcode'] = $pxpckgedataexplode[13];
            $data['pkgadmitdate'] = $currentdatepkg;
            $data['pkgdischargedate'] = $currentdatepkg;
            $data['pkgenrolldate'] = $packagedataexplode[3];
            $data['pkgactive'] = 1;
            $data['pkgrecby'] = $usernamepkg;
            $data['pkgrecid'] = $useridpkg;
            $data['pkgupdated'] = $data['updated'];
            $data['pkgupdatedid'] = $useridpkg;
            $data['pkgupdatedby'] = $usernamepkg;
            //        $data['pkginchargeID']        = 
            $data['pkgincharge'] = $packagedataexplode[2];
            //        $data['pkgreferedID']         =  
            $data['pkgreferedby'] = $packagedataexplode[7];
            $data['pkgdocrefno'] = $packagedataexplode[4];
            $data['pkgdocname'] = $packagedataexplode[8];
            //        $data['pkgprenatalID']        =  
            $data['pkgnotes'] = $packagedataexplode[9];
            $data['pkgstation'] = strtoupper(gethostbyaddr($_SERVER['REMOTE_ADDR']));
            $data['pkgtotaldeposit'] = 0;
            $data['pkgstatus'] = "ACTIVE";

            if ($this->admission_model->insert_new_package_enrollment($data)) {
                $result['status'] = true;
            }
        }

        //===============INPATIENT SUB INSERTION=====================================>
        $pathologyIS = $this->input->post('inputname_pathologyadm');
        $gravidainIS = $this->input->post('inputname_gravidaadm');
        $paraadminIS = $this->input->post('inputname_paraadm');
        $abortionnIS = $this->input->post('inputname_abortionadm');
        $iufdadminIS = $this->input->post('inputname_iufdadm');
        $diedadminIS = $this->input->post('inputname_diedadm');
        $linkaccntIS = $this->input->post('inputname_linkaccountadm');
        $infacilitIS = $this->input->post('hiddboxname_infalityvalueadm');

        if ($pathologyIS === "PATHOLOGY") 
        {
            $pathologyadm = 1;
        } 
        else 
        {
            $pathologyadm = 0;
        }

        $data['inspincode'] = $this->input->post('hiddeninputname_pincodeadm');
        $data['inscasecode'] = $this->input->post('hiddeninputname_casecodexadm');
        $data['inscaseno'] = $this->input->post('inputname_accountnumberadm');
        $data['insname'] = $data['name'];
        $data['insbday'] = $this->input->post('inputname_birthdayadm');
        $data['insupdated'] = $data['updated'];
        $data['insupdatedby'] = $this->session->userdata("empname");
        $data['inspartialpayment'] = 0;
//        $data['inslastpayment']        = 
//        $data['inslastpayreferenceno'] = 
        $data['insgravida'] = $gravidainIS;
        $data['inspara'] = $paraadminIS;
        $data['insabortion'] = $abortionnIS;
        $data['insiufd'] = $iufdadminIS;
        $data['insdied'] = $diedadminIS;
        $data['inspathologic'] = $pathologyadm;
        $data['inslinkaccount'] = $linkaccntIS;
        $data['insinfacilitydelivery'] = $infacilitIS;
//        $data['insadmitdateverified
//        $data['insadmitdateverifiedby
//        $data['insadmitdateverifieddatetime
//        $data['insdischadateverifiedby
//        $data['insdischadateverified
//        $data['insdischadateverifieddatetime

        if ($this->admission_model->add_inpatient_sub_data($data)) {
            $result['status'] = true;
        }

        //===============SLACCOUNT SECTION=======================================>
        $slaccount = $this->admission_model->generate_sl_code($data["slcode"]);
        if (!$slaccount) {
            $data['slcSLCODE'] = $data["slcode"];
            $data["slcSLDSCR"] = $data["name"];
            $data["slcSLADRS"] = $data['adrs'] . " " . $data['brgy'] . " " . $data['cityadd'] . ", " . $data['provadd'];
            $data["slcCOAREFNO"] = "";
            $data['slcREFNO'] = $data['PIN'];
            $data['slcTIN'] = $this->input->post('hiddenname_tindadm');
            $data['slcPINcode'] = $data['pincode'];
            $data['slczipcode'] = $data['zipcode'];
            $data['slcSLSTATUS'] = 1;
            $data['slcSysmade'] = 'NUR';
            $data['slcupdatedby'] = $this->session->userdata("empname");
            $data['slcupdated'] = $data['updated'];
            $data['slcgrouping'] = 'PATIENT';
            $data['slcstatus'] = 'OPEN';

            if ($this->admission_model->insert_new_slcode_for_admission($data)) {
                $result['status'] = true;
            }
        }

        //===============VITAL SIGNS INSERTION=====================================>
        date_default_timezone_set('Asia/Manila');
        $data['vitdate'] = date('Y-m-d');
        $data['vitdatetime'] = date('Y-m-d H:i:s');
        $data['vitpatient'] = $data["name"];
        $data['vitpin'] = $data['PIN'];
        $data['vitpincode'] = $data['pincode'];
        $data['vitcaseno'] = $data['caseno'];
        $data['vitcasecode'] = $data["casecode"];
        $data['vitbp_numerator'] = $this->input->post('textboxname_bpnumeratoradm');
        $data['vitbp_denominator'] = $this->input->post('textboxname_bpdenominatoradm');
        $data['vitpulse_rate'] = $this->input->post('textboxname_pulserateadm');
        $data['vitbody_temperature'] = $this->input->post('textboxname_bodytemperatureadm');
        $data['vitrespiratory_rate'] = $this->input->post('textboxname_respiratoryrateadm');
        $data['vit_24hrintake'] = "";
        $data['vit_24hroutput'] = "";
        $data['vitstool'] = "";
        $data['vitageunder'] = "";
        $data['viturine'] = "";
        $data['vitupdated'] = $data['updated'];
        $data['vitupdated_by'] = $this->session->userdata("empname");

        if ($patienttypeadm === "IPD") 
        {
            if($nurincha === "Select" || $nurincha === null)
            {
                $data["vitnurse_incharge"] = "";
                $data["vitnurse_ref_no"] = "";
            }
            else
            {
                $data["vitnurse_incharge"] = strtoupper($splitnurinc[0]);
                $data["vitnurse_ref_no"] = strtoupper($splitnurinc[1]);
            }
        }
        else 
        {
            $data['vitnurse_incharge'] = "";
            $data['vitnurse_ref_no'] = "";
        }

        if ($this->admission_model->add_vital_signs_data($data)) {
            $result['status'] = true;
        }

        //===============INPATIENT INSERTION=====================================>
        if ($this->admission_model->admit_patient($data)) {
            $result['status'] = true;
        }
        
        //===============ACCTNUMBER UPDATE=====================================>
        if ($this->admission_model->update_acctnumber($data))
        {
            $result['status'] = true;
        }
        

        echo json_encode($result);
    }

    public function generateAdmissionSheet() {
        $casenox = $this->input->post('hiddennameforprintadmission');
        $this->load->library('pdf');

        $data['title'] = "Patient Admission Sheet";
        $data["inpatient"] = $this->admission_model->generate_admission_sheet($casenox);
        $data['datenow'] = $this->get_current_date();
        $data["hosp_name"] = $this->admission_model->get_hospital();

        $da = new DateTime($data['datenow']);

        $data['date'] = date_format($da, 'F j, Y');
        $data['time'] = date_format($da, 'H:i:s A');

        $this->pdf->load_view('reports/admissionsheet', $data);
        $this->pdf->set_paper('A4', 'portrait');
        $this->pdf->render();

        $canvas = $this->pdf->get_canvas();
        $font = Font_Metrics::get_font("helvetica", "bold");

        $this->pdf->stream('"' . $data['title'] . ").pdf", array('Attachment' => 0));
    }

    public function generateAdmissionSheet1() {
        $this->load->library('javabridge');

        $this->javabridge->load_system();
        $this->javabridge->load_class();

        $compileManager = $this->javabridge->load_manager($type = 'compiler');

        $getcrmdirectory = $this->admission_model->get_crm_directory_path();
        $reportdirectory = $getcrmdirectory['directory'];
        $reportmodulexxx = $getcrmdirectory['module'];
        $targetjrxml = $reportdirectory . $reportmodulexxx . "/patadmitfinal.jrxml";

        $report = $compileManager->compileReport($targetjrxml);

        $fillManager = $this->javabridge->load_manager($type = 'importer');
        $emptyDataSource = $this->javabridge->load_datasource($source = 'emptydata', "");

        $arrayListTableData = $this->javabridge->load_util($util = 'arraylist');

        $casenox = $this->input->post('hiddennameforprintadmission');

        $inventory = $this->admission_model->generate_admission_sheet($casenox);
        $referred_hospital_result = $this->admission_model->get_referred_hospital($inventory['ReferredFromHCI']);

        $beanCollectionDataSource = $this->javabridge->load_datasource($source = 'multidata', $arrayListTableData);

        $params = $this->javabridge->load_util($util = 'hashmap');

//        var_dump($inventory['admissionsource']);
//        exit(1);
        $params->put("lastname", $inventory['lname'] ? $inventory['lname'] : '');
        $params->put("firstname", $inventory['fname'] ? $inventory['fname'] : '');
        $params->put("middlename", $inventory['mname'] ? $inventory['mname'] : '');
        $params->put("healthrecordno", $inventory['HRnCODE'] ? $inventory['HRnCODE'] : '');
        $params->put("suffix", $inventory['suffix'] ? $inventory['suffix'] : '');
        $params->put("address", $inventory['adrs'] ? $inventory['adrs'] : '');
        $params->put("city", $inventory['cityadd'] ? $inventory['cityadd'] : '');
        $params->put("province", $inventory['provadd'] ? $inventory['provadd'] : '');
        $params->put("barangay", $inventory['brgy'] ? $inventory['brgy'] : '');
        $params->put("zipcode", $inventory['zipcode'] ? $inventory['zipcode'] : '');
        $params->put("sex", $inventory['sex'] ? $inventory['sex'] : '');
        $params->put("age", $inventory['Age'] ? $inventory['Age'] : '');
        $params->put("telno", $inventory['contactno'] ? $inventory['contactno'] : '');
        $params->put("email", $inventory['email'] ? $inventory['email'] : '');
        $params->put("religion", $inventory['religion'] ? $inventory['religion'] : '');
        $params->put("father", $inventory['father'] ? $inventory['father'] : '');
        $params->put("fathernationality", $inventory['fathernationality'] ? $inventory['fathernationality'] : '');
        $params->put("mother", $inventory['mother'] ? $inventory['mother'] : '');
        $params->put("mothernationality", $inventory['mothernationality'] ? $inventory['mothernationality'] : '');
        $params->put("spouse", $inventory['spouse'] ? $inventory['spouse'] : '');
        $params->put("birthday", $inventory['bday'] ? MY_Controller::format_month($inventory['bday']) : '');
        $params->put("cpno", $inventory['mobileno'] ? $inventory['mobileno'] : '');
        $params->put("nationality", $inventory['nationality'] ? $inventory['nationality'] : '');
        $params->put("civilstatus", $inventory['civilstatus'] ? $inventory['civilstatus'] : '');
        $params->put("dob", $inventory['spousebday'] ? MY_Controller::format_month($inventory['spousebday']) : '');
        $params->put("room", $inventory['roomno'] ? $inventory['roomno'] : '');
        $params->put("rate", $inventory['roomrate'] ? MY_Controller::format_moneyx($inventory['roomrate']) : '');
        $params->put("rminfo", $inventory['roominfo'] ? $inventory['roominfo'] : '');
        $params->put("code", $inventory['roomcd'] ? $inventory['roomcd'] : '');
        $params->put("nursingcare", $inventory['addonserv'] ? MY_Controller::format_moneyx($inventory['addonserv']) : '');
        $params->put("admissiondatetime", $inventory['admitdate'] ? MY_Controller::format_datetime($inventory['admitdate'] . ' ' . $inventory['admittime']) : '');
        $params->put("source", $inventory['admissionsource'] ? $inventory['admissionsource'] : '');
        $params->put("guarantor", $inventory['guarantor'] ? $inventory['guarantor'] : '');
        $params->put("relation", $inventory['guarantor_rltn'] ? $inventory['guarantor_rltn'] : '');
        $params->put("guarantordob", $inventory['guarantor_bday'] ? MY_Controller::format_month($inventory['guarantor_bday']) : '');
        $params->put("guarantorcp", $inventory['guarantor_mobileno'] ? $inventory['guarantor_mobileno'] : '');
        $params->put("admissionofficer", $inventory['nursename'] ? $inventory['nursename'] : '');
        $params->put("attendingdoctor", $inventory['doctorname'] ? $inventory['doctorname'] : '');
        $params->put("nurseincharge", $inventory['NurseIncharge'] ? $inventory['NurseIncharge'] : '');
        $params->put("nurseinchargeid", $inventory['NurseInchargeID'] ? $inventory['NurseInchargeID'] : '');
        $params->put("admissionofficerid", $inventory['nurseid'] ? $inventory['nurseid'] : '');
        $params->put("attendingdoctorid", $inventory['doctorid'] ? $inventory['doctorid'] : '');
        $params->put("admittingdiagnosis", $inventory['Diag_admit'] ? $inventory['Diag_admit'] : '');
        $params->put("caseno", $inventory['caseno'] ? $inventory['caseno'] : '');
        $params->put("logbookref", $inventory['logbookCN'] ? $inventory['logbookCN'] : '');
        $params->put("pin", $inventory['PIN'] ? $inventory['PIN'] : '');
        $params->put("type", $inventory['phicmembr'] ? $inventory['phicmembr'] : '');
        $params->put("phicno", $inventory['phicPIN'] ? $inventory['phicPIN'] : '');
        $params->put("member", $inventory['phicmembrname'] ? $inventory['phicmembrname'] : '');
        $params->put("phiccode", $inventory['phiccode'] ? $inventory['phiccode'] : '');
        $params->put("relationtomember", $inventory['relationtomember'] ? $inventory['relationtomember'] : '');
        $params->put("referredfromhci", $inventory['ReferredFromHCI'] ? $inventory['ReferredFromHCI'] : '');
        $params->put("hospital", $referred_hospital_result['Hospital'] ? $referred_hospital_result['Hospital'] : '');
        $params->put("hospitaladdress", $referred_hospital_result['Hospitaladrs'] ? $referred_hospital_result['Hospitaladrs'] : '');
        $params->put("hmoname", $inventory['hmoname'] ? $inventory['hmoname'] : '');
        $params->put("hmomember", $inventory['hmoholder'] ? $inventory['hmoholder'] : '');
        $params->put("hmocard", $inventory['hmonumber'] ? $inventory['hmonumber'] : '');
        $params->put("hmoapproval", $inventory['hmoapprovalno'] ? $inventory['hmoapprovalno'] : '');
        $params->put("creditlimit", $inventory['creditmax'] ? MY_Controller::format_moneyx($inventory['creditmax']) : '');
        $params->put("illnessprecaution", $inventory['cautions'] ? $inventory['cautions'] : '');
        $params->put("tbstatus", $inventory['TBstatus'] ? $inventory['TBstatus'] : '');
        $params->put("caseclassification", $inventory['pat_classification'] ? $inventory['pat_classification'] : '');
        $params->put("typeofdelivery", $inventory['OBprocedure'] ? $inventory['OBprocedure'] : '');
        if ($inventory['disposition'] === 'EXPIRED') {
            $params->put("deathdate", MY_Controller::format_month($inventory['expireddate']));
            $params->put("deathtime", $inventory['expiredtime']);
            $params->put("deathtimediff", $inventory['dischargein48']);
        } else {
            $params->put("deathdate", '');
            $params->put("deathtime", '');
            $params->put("deathtimediff", '');
        }
        $params->put("deathtype", $inventory['deathtype'] ? $inventory['deathtype'] : '');
        $params->put("ifobgyn", $inventory['deliverycausesofdeaths'] ? $inventory['deliverycausesofdeaths'] : '');
        $params->put("dietaryinstruction", $inventory['diatary_ins'] ? $inventory['diatary_ins'] : '');
        $params->put("chiefcomplaints", $inventory['Diag_chiefcomplain'] ? $inventory['Diag_chiefcomplain'] : '');
        $params->put("recordedby", $inventory['recby'] ? $inventory['recby'] : '');
        $params->put("CompanyLogo", base_url("assets/images/logo/logo.png"));
        
        
        
        if (!isset($counter))
        {
            $counter = 0;
        }

        $counter++;

        $time = time();

        $dummy = "?dummy=" . $time . $counter;

        $imgbaseurlad = base_url();
        $imglocationx = "assets/images/uploads/patients/";
        $imagedefault = "default.png";
        $imgfilenamex = $inventory['PIN'] . "p.jpg";
        $imgidpic = $inventory['PIN'] . "p";

        $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex . $dummy;
        $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;

        if (@getimagesize($completeimglocation)) 
        {
            $params->put("picture", $completeimglocation);
        } 
        else
        {
            $params->put("picture", $defaultimaglocation);
        }
        
        $jasperPrint = $fillManager->fillReport($report, $params, $emptyDataSource);

        $exportManager = $this->javabridge->load_manager($type = 'exporter');

        $outputPath = $reportdirectory . $reportmodulexxx . "/patadmitfinal.pdf";
        $exportManager->exportReportToPdfFile($jasperPrint, $outputPath);

        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf');
        header('Content-Disposition:filename=Patient Admissioin Report.pdf');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');

        readfile($outputPath);
        unlink($outputPath);
    }

    public function generateClinicalDiagnosticData1() {
        $this->load->library('javabridge');

        $this->javabridge->load_system();
        $this->javabridge->load_class();

        $compileManager = $this->javabridge->load_manager($type = 'compiler');

        $getcrmdirectory = $this->admission_model->get_crm_directory_path();
        $reportdirectory = $getcrmdirectory['directory'];
        $reportmodulexxx = $getcrmdirectory['module'];
        $targetjrxml = $reportdirectory . $reportmodulexxx . "/patclinicaldiagnosis.jrxml";

        $report = $compileManager->compileReport($targetjrxml);

        $fillManager = $this->javabridge->load_manager($type = 'importer');
        $emptyDataSource = $this->javabridge->load_datasource($source = 'emptydata', "");

        $arrayListTableData = $this->javabridge->load_util($util = 'arraylist');

        $casenox = $this->input->post('hiddennameforprintclinicaldiagnostic');
////        $casenox = "hsdfs";
//        var_dump($casenox);
//        exit(1);

        $resultinpatient = $this->admission_model->generate_admission_sheet($casenox);
        $resultvwinpatientlist = $this->admission_model->generate_from_vw_inpatient($casenox);

        $beanCollectionDataSource = $this->javabridge->load_datasource($source = 'multidata', $arrayListTableData);

        $params = $this->javabridge->load_util($util = 'hashmap');



        $params->put("healthrecordno", $resultinpatient['HRnCODE'] ? $resultinpatient['HRnCODE'] : '');
        $params->put("name", $resultinpatient['name'] ? $resultinpatient['name'] : '');
        $params->put("caseno", $resultinpatient['caseno'] ? $resultinpatient['caseno'] : '');
        $params->put("pin", $resultinpatient['PIN'] ? $resultinpatient['PIN'] : '');
        $params->put("suffix", $resultinpatient['suffix'] ? $resultinpatient['suffix'] : '');
        $params->put("address", $resultinpatient['adrs'] ? $resultinpatient['adrs'] : '');
        $params->put("status", $resultinpatient['civilstatus'] ? $resultinpatient['civilstatus'] : '');
        $params->put("religion", $resultinpatient['religion'] ? $resultinpatient['religion'] : '');
        $params->put("nationality", $resultinpatient['nationality'] ? $resultinpatient['nationality'] : '');
        $params->put("zip", $resultinpatient['zipcode'] ? $resultinpatient['zipcode'] : '');
        $params->put("city", $resultinpatient['cityadd'] ? $resultinpatient['cityadd'] : '');
        $params->put("province", $resultinpatient['provadd'] ? $resultinpatient['provadd'] : '');
        $params->put("phicinfo", $resultinpatient['phiccode'] ? $resultinpatient['phiccode'] : '');
        $params->put("phictype", $resultinpatient['phicmembr'] ? $resultinpatient['phicmembr'] : '');
        $params->put("phicno", $resultinpatient['phicPIN'] ? $resultinpatient['phicPIN'] : '');
        $params->put("phicmember", $resultinpatient['phicmembrname'] ? $resultinpatient['phicmembrname'] : '');
        $params->put("brgy", $resultinpatient['brgy'] ? $resultinpatient['brgy'] : '');
        $params->put("sex", $resultinpatient['sex'] ? $resultinpatient['sex'] : '');
        $params->put("age", $resultinpatient['Age'] ? $resultinpatient['Age'] : '');
        $params->put("dob", MY_Controller::format_month($resultinpatient['bday']));
        $params->put("telno", $resultinpatient['contactno'] ? $resultinpatient['contactno'] : '');
        $params->put("phone", $resultinpatient['mobileno'] ? $resultinpatient['mobileno'] : '');
        $params->put("relationtomember", $resultinpatient['relationtomember'] ? $resultinpatient['relationtomember'] : '');
        $params->put("father", $resultinpatient['father'] ? $resultinpatient['father'] : '');
        $params->put("fnationality", $resultinpatient['fathernationality'] ? $resultinpatient['fathernationality'] : '');
        $params->put("mother", $resultinpatient['mother'] ? $resultinpatient['mother'] : '');
        $params->put("mmother", $resultinpatient['mothernationality'] ? $resultinpatient['mothernationality'] : '');
        $params->put("spouse", $resultinpatient['spouse'] ? $resultinpatient['spouse'] : '');
        $params->put("spousedob", MY_Controller::format_month($resultinpatient['spousebday']));
        $params->put("admitted", MY_Controller::format_datetime($resultinpatient['admitdate'] . ' ' . $resultinpatient['admittime']));
//        $params->put("linkedacc", $resultinpatient['spousebday']);
        $params->put("linkedacc", '');
        $params->put("roominfo", $resultinpatient['roomno'] ? $resultinpatient['roomno'] : '');
        $params->put("room", $resultinpatient['roominfo'] ? $resultinpatient['roominfo'] : '');
        $params->put("rate", $resultinpatient['roomrate'] ? MY_Controller::format_moneyx($resultinpatient['roomrate']) : '');
        $params->put("roomcd", $resultinpatient['roomcd'] ? $resultinpatient['roomcd'] : '');
        $params->put("phicfirstcase", $resultinpatient['phiccasefirstDx'] ? $resultinpatient['phiccasefirstDx'] : '');
        $params->put("guarantor", $resultinpatient['guarantor'] ? $resultinpatient['guarantor'] : '');
        $params->put("grealtion", $resultinpatient['guarantor_rltn'] ? $resultinpatient['guarantor_rltn'] : '');
        $params->put("guarantordob", $resultinpatient['guarantor_bday'] ? MY_Controller::format_month($resultinpatient['guarantor_bday']) : '');
        $params->put("guarantorphone", $resultinpatient['guarantor_mobileno']) ? $resultinpatient['guarantor_mobileno'] : '';
        $params->put("dischargeddate", $resultinpatient['discharged'] == 1 ? $resultinpatient['dischadate'] ? MY_Controller::format_datetime($resultinpatient['dischadate'] . ' ' . $resultinpatient['dischatime']) : '' : '');
        $params->put("dischargeby", '');
        $params->put("gravida", $resultvwinpatientlist['gravida'] ? $resultvwinpatientlist['gravida'] : '');
        $params->put("para", $resultvwinpatientlist['para'] ? $resultvwinpatientlist['para'] : '');
        $params->put("abortion", $resultvwinpatientlist['abortion'] ? $resultvwinpatientlist['abortion'] : '');
        $params->put("iufd", $resultvwinpatientlist['iufd'] ? $resultvwinpatientlist['iufd'] : '');
        $params->put("died", $resultvwinpatientlist['died'] ? $resultvwinpatientlist['died'] : '');
        $params->put("finaldiagnosis", $resultinpatient['Diag_discharge'] ? $resultinpatient['Diag_discharge'] : '');
        $params->put("icdcode", '');
        $params->put("complication", '');
        $params->put("procedureperformed", $resultinpatient['Diag_anes'] ? $resultinpatient['Diag_anes'] : '');
        $params->put("anesthesiaprocedure", $resultinpatient['Diag_surg'] ? $resultinpatient['Diag_surg'] : '');
        $params->put("causeofdeath", '');
        $params->put("admissionofficer", $resultinpatient['nursename'] ? $resultinpatient['nursename'] : '');
        $params->put("attendingphysician", $resultinpatient['doctorname'] ? $resultinpatient['doctorname'] : '');
        $params->put("name", $resultinpatient['name'] ? $resultinpatient['name'] : '');
        $params->put("informant", $resultinpatient['guarantor'] ? $resultinpatient['guarantor'] : '');
        $params->put("CompanyLogo", base_url("assets/images/logo/logo.png"));

        $jasperPrint = $fillManager->fillReport($report, $params, $emptyDataSource);

        $exportManager = $this->javabridge->load_manager($type = 'exporter');

        $outputPath = $reportdirectory . $reportmodulexxx . "/patclinicaldiagnosis.pdf";
        $exportManager->exportReportToPdfFile($jasperPrint, $outputPath);

        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf');
        header('Content-Disposition:filename=Patient Clinical Admission Record.pdf');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');

        readfile($outputPath);
        unlink($outputPath);
    }

    public function GenerateDiagnosticSheet() {
        $this->load->library('javabridge');

        $this->javabridge->load_system();
        $this->javabridge->load_class();

        $compileManager = $this->javabridge->load_manager($type = 'compiler');

        $getcrmdirectory = $this->admission_model->get_crm_directory_path();
        $reportdirectory = $getcrmdirectory['directory'];
        $reportmodulexxx = $getcrmdirectory['module'];
        $targetjrxml = $reportdirectory . $reportmodulexxx . "/patdiagnosis.jrxml";

        $report = $compileManager->compileReport($targetjrxml);

        $fillManager = $this->javabridge->load_manager($type = 'importer');
        $emptyDataSource = $this->javabridge->load_datasource($source = 'emptydata', "");

        $arrayListTableData = $this->javabridge->load_util($util = 'arraylist');

        $casenox = $this->input->post('hiddennameforprintdiagnostic');

        $resultinpatient = $this->admission_model->generate_admission_sheet($casenox);
        $resultcausesofconfinement = $this->admission_model->getcausesofconfinement($casenox);

        $beanCollectionDataSource = $this->javabridge->load_datasource($source = 'multidata', $arrayListTableData);

        $params = $this->javabridge->load_util($util = 'hashmap');

        $params->put("acctno", $casenox);
        $params->put("name", $resultinpatient['name'] ? $resultinpatient['name'] : '');

        $params->put("caseno", $resultinpatient['logbookCN'] ? $resultinpatient['logbookCN'] : '');
        $params->put("telno", $resultinpatient['contactno'] ? $resultinpatient['contactno'] : '');
        $params->put("email", $resultinpatient['email'] ? $resultinpatient['email'] : '');
        $params->put("sex", $resultinpatient['sex'] ? $resultinpatient['sex'] : '');
        $params->put("religion", $resultinpatient['religion'] ? $resultinpatient['religion'] : '');
        $params->put("cpno", $resultinpatient['mobileno'] ? $resultinpatient['mobileno'] : '');
        $params->put("age", $resultinpatient['Age'] ? $resultinpatient['Age'] : '');
        $params->put("bday", $resultinpatient['bday'] ? MY_Controller::format_month($resultinpatient['bday']) : '');
        $params->put("status", $resultinpatient['civilstatus'] ? $resultinpatient['civilstatus'] : '');

        $params->put("disposition", $resultinpatient['disposition'] ? $resultinpatient['disposition'] : '');
        $comparedisposition = strcasecmp('EXPIRED', $resultinpatient['disposition']);

        if ($comparedisposition == 0) {
            $params->put("dtofdeath", MY_Controller::format_datetime($resultinpatient['expireddate'] . ' ' . $resultinpatient['expiredtime']));
        } else {
            $params->put("dtofdeath", '');
        }

        $params->put("reasonofreferral", $resultinpatient['reasonforreferral'] ? $resultinpatient['reasonforreferral'] : '');
        $params->put("admisiondate", $resultinpatient['admitdate'] ? MY_Controller::format_month($resultinpatient['admitdate']) : '');
        $params->put("admissiontime", $resultinpatient['admittime'] ? MY_Controller::format_time($resultinpatient['admittime']) : '');
        $params->put("dischargeddate", $resultinpatient['discharged'] == 1 ? $resultinpatient['dischadate'] ? MY_Controller::format_month($resultinpatient['dischadate']) : '' : '');
        $params->put("dischargetime", $resultinpatient['discharged'] == 1 ? $resultinpatient['dischatime'] ? MY_Controller::format_time($resultinpatient['dischatime']) : '' : '');
        $params->put("firstcaserate", $resultinpatient['phiccasefirst'] ? $resultinpatient['phiccasefirst'] : '');
        $params->put("secondcaserate", $resultinpatient['phiccasesecond'] ? $resultinpatient['phiccasesecond'] : '');
        $params->put("chiefcomplaints", $resultinpatient['Diag_chiefcomplain'] ? $resultinpatient['Diag_chiefcomplain'] : '');
        $params->put("admittingdiagnosis", $resultinpatient['Diag_admit'] ? $resultinpatient['Diag_admit'] : '');
        $params->put("diataryhistory", $resultinpatient['diatary_ins'] ? $resultinpatient['diatary_ins'] : '');
        $params->put("daysofconfinement", $resultinpatient['daysconfined'] ? $resultinpatient['daysconfined'] : '');
        $params->put("dischargedby", $resultinpatient['dischaby'] ? $resultinpatient['dischaby'] : '');
        $params->put("address", $resultinpatient['adrs'] ? $resultinpatient['adrs'] : '');
        $params->put("city", $resultinpatient['cityadd'] ? $resultinpatient['cityadd'] : '');
        $params->put("province", $resultinpatient['provadd'] ? $resultinpatient['provadd'] : '');

        $list_of_confinement = [];
        $test = '';
        foreach ($resultcausesofconfinement as $row) {
            array_push($list_of_confinement, $row->diagnosis);
            $test .= $row->diagnosis . ', ';
        }

        $params->put("categoricaldiagnosis", $test);
        $params->put("pin", $resultinpatient['PIN'] ? $resultinpatient['PIN'] : '');
        $params->put("membershipno", $resultinpatient['membercardno'] ? $resultinpatient['membercardno'] : '');
        $params->put("roominfo", $resultinpatient['roomcd'] ? $resultinpatient['roomcd'] : '');
        $params->put("roomtype", $resultinpatient['roomtype'] ? $resultinpatient['roomtype'] : '');
        $params->put("room", $resultinpatient['roomno'] ? $resultinpatient['roomno'] : '');
        $params->put("rate", $resultinpatient['roomrate'] ? MY_Controller::format_moneyx($resultinpatient['roomrate']) : '');
        $params->put("ancillary", $resultinpatient['addonserv'] ? MY_Controller::format_moneyx($resultinpatient['addonserv']) : '');
        $params->put("admissionofficerno", $resultinpatient['nurseid'] ? $resultinpatient['nurseid'] : '');
        $params->put("admissionofficer", $resultinpatient['nursename'] ? $resultinpatient['nursename'] : '');
        $params->put("admittingdocno", $resultinpatient['doctorid'] ? $resultinpatient['doctorid'] : '');
        $params->put("admittingdoc", $resultinpatient['doctorname'] ? $resultinpatient['doctorname'] : '');
        $params->put("phicinfo", $resultinpatient['phiccode'] ? $resultinpatient['phiccode'] : '');
        $params->put("phicmember", $resultinpatient['phicmembrname'] ? $resultinpatient['phicmembrname'] : '');
        $params->put("phicno", $resultinpatient['phicPIN'] ? $resultinpatient['phicPIN'] : '');
        $params->put("phictype", $resultinpatient['phicmembr'] ? $resultinpatient['phicmembr'] : '');
        $params->put("hmoinfo", $resultinpatient['hmoname'] ? $resultinpatient['hmoname'] : '');
        $params->put("hmomember", $resultinpatient['hmoholder'] ? $resultinpatient['hmoholder'] : '');
        $params->put("hmocard", $resultinpatient['hmonumber'] ? $resultinpatient['hmonumber'] : '');
        $params->put("hmoapproval", $resultinpatient['hmoapprovalno'] ? $resultinpatient['hmoapprovalno'] : '');
        $params->put("finaldiagnosis", $resultinpatient['Diag_discharge'] ? $resultinpatient['Diag_discharge'] : '');
        $params->put("surgicalprocedure", $resultinpatient['Diag_surg'] ? $resultinpatient['Diag_surg'] : '');
        $params->put("anesthesiologist", $resultinpatient['Diag_anes'] ? $resultinpatient['Diag_anes'] : '');
        $params->put("archieveddate", $resultinpatient['archiveddate'] ? $resultinpatient['archiveddate'] : '');
        $params->put("lastadmitted", $resultinpatient['lastadmitdate'] ? MY_Controller::format_datetime($resultinpatient['lastadmitdate'] . ' ' . $resultinpatient['lastadmittime']) : '');
        $params->put("classification", $resultinpatient['pat_classification'] ? $resultinpatient['pat_classification'] : '');
        $params->put("otherpatientinfo", '');
        $params->put("recordedby", $resultinpatient['recby'] ? $resultinpatient['recby'] : '');
        $params->put("recordeddate", $resultinpatient['updated'] ? MY_Controller::format_datetime($resultinpatient['updated']) : '');
        $params->put("arrow", base_url("assets/images/arrowright.png"));
        $params->put("CompanyLogo", base_url("assets/images/logo/logo.png"));


        $jasperPrint = $fillManager->fillReport($report, $params, $emptyDataSource);

        $exportManager = $this->javabridge->load_manager($type = 'exporter');

        $outputPath = $reportdirectory . $reportmodulexxx . "/patdiagnosis.pdf";
        $exportManager->exportReportToPdfFile($jasperPrint, $outputPath);

        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf');
        header('Content-Disposition:filename=Patient Diagnosis Report.pdf');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');

        readfile($outputPath);
        unlink($outputPath);
    }

    public function generateDiagnosticData() {
        $casenox = $this->input->post('hiddennameforprintdiagnostic');
        $this->load->library('pdf');

        $data['title'] = "Patient Diagnosis";
        $data["inpatient"] = $this->admission_model->generate_admission_sheet($casenox);
        $data['datenow'] = $this->get_current_date();
        $data["hosp_name"] = $this->admission_model->get_hospital();

        $da = new DateTime($data['datenow']);

        $data['date'] = date_format($da, 'F j, Y');
        $data['time'] = date_format($da, 'H:i:s A');

        $this->pdf->load_view('reports/diagnosticdata', $data);
        $this->pdf->set_paper('A4', 'portrait');
        $this->pdf->render();

        $canvas = $this->pdf->get_canvas();
        $font = Font_Metrics::get_font("helvetica", "bold");

        $this->pdf->stream('"' . $data['title'] . ").pdf", array('Attachment' => 0));
    }

    public function getPatientlistDataForCheckDuplicateOfAddPatient() {
        $result = array('status' => FALSE);

        $fullname = $this->input->post('completenamex');
        $patientlist_data = $this->admission_model->get_data_from_patientlist_for_addpatient_check_duplicate($fullname);

        if ($patientlist_data) {
            $result["fullnameaddpx"] = $patientlist_data;

            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getPatientlistDataForCheckDuplicateIndexOfAddPatient() {
        $result = array('status' => FALSE);

        $indexno = $this->input->post('pxindexnox');
        $patientlist_data = $this->admission_model->get_data_from_patientlist_for_addpatient_check_duplicate_index($indexno);

        if ($patientlist_data) {
            $result["indexnumforaddpx"] = $patientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getInPatientlistDataForCheckDuplicateCasenoOfAdmitPatient() {
        $result = array('status' => FALSE);

        $casenox = $this->input->post('casenox');
        $inpatientlist_data = $this->admission_model->get_data_from_inpatient_for_admitpatient_check_duplicate_caseno($casenox);

        if ($inpatientlist_data) {
            $result["indexnumforaddpx"] = $inpatientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getPatientlistDataForCheckDuplicateOfAdmitPatient() {
        $result = array('status' => FALSE);

        $pin = $this->input->post('pinx');
        $inpatientlist_data = $this->admission_model->get_data_from_inpatient_for_admitpatient_check_duplicate($pin);

        if ($inpatientlist_data) {
            $result["inpatientlist"] = $inpatientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function AddSLCode() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        $active = $this->input->post('activeIsCheckedx');

        if ($active == 'true') {
            $active = 1;
        } else {
            $active = 0;
        }

        $date = new DateTime();
        $date_and_time_today = new DateTime();
        $format_date_time = $date_and_time_today->format('Y-m-d h:i:s');
        $format_date = $date->format('mdYhis');
        // $passcode = $format_date . 'RN';
        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //Get client machine ip address
        $client = $this->input->ip_address();

        $data = array();

        $data['SLCODE'] = strtoupper($this->input->post('slCodex', TRUE));
        $data['COAREFNO'] = strtoupper($this->input->post('coareferencex', TRUE));
        $data['REFNO'] = strtoupper($this->input->post('pinReferencex', TRUE));
        $data['SLDSCR'] = strtoupper($this->input->post('slDescriptionx', TRUE));
        $data['SLADRS'] = strtoupper($this->input->post('slAddressx', TRUE));
        $data['SLSTATUS'] = $active;
        $data['Sysmade'] = 'NUR';
        $data['updatedby'] = $this->input->post('accountName', TRUE);
        $data['updated'] = $for_update;
        $data['grouping'] = 'PATIENT';

        $this->form_validation->set_rules('pinReferencex', 'PIN Reference', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('slDescriptionx', 'SL Description', 'required|min_length[5]|max_length[70]');
        $this->form_validation->set_rules('slAddressx', 'SL Address', 'required|min_length[1]|max_length[70]');

        if ($this->form_validation->run() == FALSE) { //if field does not meet the required inputs
            $errors['pinreferenceget'] = form_error('pinReferencex');
            $errors['sldescriptionget'] = form_error('slDescriptionx');
            $errors['sladdressget'] = form_error('slAddressx');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {
//            $this->admission_model->add_slcode($data);

            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

    public function getMunicipality() {
        $provid = $this->input->post('providex');
        $province = $this->admission_model->getCityMunicipalAddress($provid);
        echo json_encode($province);
    }

    public function getZipcode() {
        $citymunid = $this->input->post('citymuncodex');
        $provid = $this->input->post('provcodex');
        $zipcode = $this->admission_model->getZipCodeAddress($citymunid, $provid);
        echo json_encode($zipcode);
    }

    public function getBarangay() {
        $citymunid = $this->input->post('citymuncodex');
        $provid = $this->input->post('provcodex');
        $barangay = $this->admission_model->getBarangayAddress($citymunid, $provid);
        echo json_encode($barangay);
    }

    public function insertNewComanageDoctors() {
        $result = array('status' => FALSE);

        $data['docname'] = strtoupper($this->input->post('docname', TRUE));
        $data['doccode'] = strtoupper($this->input->post('doccode', TRUE));
        $data['pincode'] = strtoupper($this->input->post('pincode', TRUE));
        $data['acctnum'] = strtoupper($this->input->post('acctnum', TRUE));
        $data['pxnamex'] = strtoupper($this->input->post('pxnamex', TRUE));
        $data['pxtypex'] = strtoupper($this->input->post('pxtypex', TRUE));
        $data['typeman'] = strtoupper($this->input->post('typeman', TRUE));
        $data['startco'] = strtoupper($this->input->post('startco', TRUE));
        $data['casecod'] = strtoupper($this->input->post('casecod', TRUE));
        $data['pccodex'] = strtoupper($this->input->post('pccodex', TRUE));

        if ($data['typeman'] == "ATTENDING") {
            $data['attedoc'] = 1;
        } else {
            $data['attedoc'] = 0;
        }

        $now = new DateTime();
        $data["updated"] = $now->format('Y-m-d h:i:s');
        $data["recrdid"] = $this->session->userdata("empid");
        $data["recrdby"] = $this->session->userdata("empname");

        if ($this->admission_model->insert_new_comanage_doctor($data)) {
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function deleteSavedComanageDoctors() {
        $result = array('status' => FALSE);

        $patientype = $this->input->post('patientypecon');
        $accountnum = $this->input->post('accountnumcon');
        $pincodenum = $this->input->post('pincodenumcon');
        $doctorcode = $this->input->post('doctorcodecon');
        $typeofmana = $this->input->post('typeofmanacon');
        $startofser = $this->input->post('startofsercon');
        $casecodeno = $this->input->post('casecodenocon');

        if ($this->admission_model->delete_saved_comanaged_doctors($patientype, $accountnum, $pincodenum, $doctorcode, $typeofmana, $startofser, $casecodeno)) {
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function AddNewMember() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        $cancelled = $this->input->post('cancelacct');

        if ($cancelled == 'true') {
            $closed = 1;
        } else {
            $closed = 0;
        }

        $date = new DateTime();
        $date_and_time_today = new DateTime();
        $format_date_time = $date_and_time_today->format('Y-m-d h:i:s');
        $format_date_only = $date_and_time_today->format('Y-m-d');
        $format_date = $date->format('m/d/Y h:i:s');
        $refnum = $format_date . 'MEMBR';
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');
        $client = $this->input->ip_address();
        $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);


        $data = array();
        $data["station"] = $hostname;
        $data['membersince'] = $format_date_only;
        $data['laststocksmovement'] = $format_date_only;
        $data['updated'] = $format_date_time;
        $data['closedAccount'] = $closed;

        $data['name'] = strtoupper($this->input->post('fullnamemem', TRUE));
        $data['Refno'] = strtoupper($this->input->post('opdrefmemb', TRUE));
        $data['membercardno'] = strtoupper($this->input->post('memidmemb', TRUE));
        $data['bday'] = strtoupper($this->input->post('birthmemb', TRUE));
        $data['sex'] = strtoupper($this->input->post('gendermemb', TRUE));
        $data['address'] = strtoupper($this->input->post('mailaddmemb', TRUE));
        $data['cityadd'] = strtoupper($this->input->post('citymunmemb', TRUE));
        $data['cellphone'] = strtoupper($this->input->post('mobilememb', TRUE));
        $data['forwardedtoRefno'] = strtoupper($this->input->post('transtomemb', TRUE));
        $data['inpatPIN'] = strtoupper($this->input->post('pinnummemb', TRUE));
        $data['TIN'] = strtoupper($this->input->post('tinnummemb', TRUE));
        $data['recid'] = $this->session->userdata("empid");

        $data['recby'] = $this->session->userdata("empname");
        $data['valueamount'] = 0;

        $this->form_validation->set_rules('fullnamemem', 'name', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('opdrefmemb', 'Refno', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('memidmemb', 'membercardno', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('birthmemb', 'bday', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('gendermemb', 'sex', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('mailaddmemb', 'address', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('mobilememb', 'cellphone', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('citymunmemb', 'cityadd', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('transtomemb', 'forwardedtoRefno', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('pinnummemb', 'inpatPIN', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('tinnummemb', 'TIN', 'required|min_length[5]|max_length[50]');

        if ($this->form_validation->run() == FALSE) {
            $errors['fullnamememget'] = form_error('fullnamemem');
            $errors['opdrefmembget'] = form_error('opdrefmemb');
            $errors['memidmembget'] = form_error('memidmemb');
            $errors['birthmembget'] = form_error('birthmemb');
            $errors['gendermembget'] = form_error('gendermemb');
            $errors['mailaddmembget'] = form_error('mailaddmemb');
            $errors['mobilemembget'] = form_error('mobilememb');
            $errors['citymunmembget'] = form_error('citymunmemb');
            $errors['transtomembget'] = form_error('transtomemb');
            $errors['pinnummembget'] = form_error('pinnummemb');
            $errors['tinnummembget'] = form_error('tinnummemb');

//            var_dump(form_error('fnamememb'));
//            exit(1);

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {
            $this->admission_model->add_new_member($data);

            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

//    public function insertNewVIPpatients() -----UNUSED IN SCOPE!!!!!!
//    {
//        $result = array('status' => FALSE);
//
//        $datenow = $this->get_current_date();
//        $date = new DateTime($datenow);
//        $currentfulldate = date_format($date, 'Y-m-d h:i:s');
//        $currentdate = date_format($date, 'Y-m-d');
//        
//        $data['updated']        = $currentfulldate;
//        $data['admitdate']      = $currentdate;
//        $data['dischadate']     = $currentdate;
//        
//        $data['casecode']       = $this->input->post('casecodex', TRUE);
//        $data['caseno']         = $this->input->post('casenumbx', TRUE);
//        $data['vip']            = $this->input->post('vipvaluex', TRUE);
//        $data['securityrisk']   = $this->input->post('secvaluex', TRUE);
//        $data['remarks']        = $this->input->post('remarksx', TRUE);
//        $data['patnamex']       = strtoupper($this->input->post('pxnamexx', TRUE));
//        $data['oic']            = $this->input->post('oicnamexx', TRUE);
//        $data['oiccode']        = $this->input->post('oiccodexx', TRUE);
//        $data['updatedby']      = $this->input->post('updatedbyx', TRUE);
//        $data['station']        = $this->input->post('stationx', TRUE);
//        $data['confirmed']      = $this->input->post('confirmedx', TRUE);
//
//        if ($this->admission_model->insert_new_vip_patient($data)) 
//        {
//            $result['status'] = true;
//        }
//        echo json_encode($result);
//    }

    public function insertNewConfinement() {
        $result = array('status' => FALSE);

        $datenow = $this->get_current_date();
        $date = new DateTime($datenow);
        $currentfulldate = date_format($date, 'Y-m-d h:i:s');
        $currentdate = date_format($date, 'Y-m-d');

        $data['updated'] = $currentfulldate;
        $data['dischadate'] = $currentdate;
        $data['updatedby'] = strtoupper($this->input->post('updatebydiagx', TRUE));
        $data['patnamex'] = strtoupper($this->input->post('pxnamediagx', TRUE));
        $data['caseno'] = $this->input->post('casenodiagx', TRUE);
        $data['phicmember'] = $this->input->post('phicmemdiagx', TRUE);
        $data['confinemnhip'] = $this->input->post('confinemnhipx', TRUE);
        $data['confinonnhip'] = $this->input->post('confinonnhipx', TRUE);
        $data['confinetotal'] = $this->input->post('confinetotalx', TRUE);
        $data['causesofcon'] = $this->input->post('causesofconx', TRUE);
        $data['diagnosis'] = $this->input->post('diagnosisx', TRUE);
        $data['refnoofcause'] = $this->input->post('refnoofcausex', TRUE);
        $data['diagnosenumb'] = $this->input->post('diagnosnohidx', TRUE);
        $data['diagnoseyear'] = $this->input->post('diagnosyrhidx', TRUE);
        $data['diagnosecode'] = $this->input->post('diagnosiscodex', TRUE);

        if ($this->admission_model->insert_new_confinement($data)) {
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function deleteSavedConfinementDiagnosis() {
        $result = array('status' => FALSE);

        $diagnoscode = $this->input->post('diagnosecodex');

        if ($this->admission_model->delete_saved_confinement_diagnosis($diagnoscode)) {
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function GetAllPatientForPackage() {

        $fetched_data = $this->admission_model->fetch_all_patients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {
            $sub_array = array();

//            $sub_array[] = "<button class='btn btn-sm btn-warning waves-effect' title='Edit Patient' onclick=showEditPatientModal('" . $row->id . "')><i class='zmdi zmdi-edit'></i></button>&nbsp;
//                            <button class='btn btn-sm btn-danger waves-effect' title='Delete Patient' onclick=deletePatient('" . $row->id . "')><i class='zmdi zmdi-delete'></i></button>&nbsp;";
            $sub_array[] = "";
            $sub_array[] = $row->lname;
            $sub_array[] = $row->mname;
            $sub_array[] = $row->fname;
            $sub_array[] = $row->suffix;
            $sub_array[] = $row->name;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->HRNcode;
            $sub_array[] = $row->bday;
            $sub_array[] = $row->sex;
            $sub_array[] = $row->Age;
            $sub_array[] = $row->religion;
            $sub_array[] = $row->mobileno;
            $sub_array[] = $row->lastdischdate;
            $sub_array[] = $row->adrs . ", " . $row->brgy;
            $sub_array[] = $row->cityadd;
            $sub_array[] = $row->pincode;
            $sub_array[] = $row->SLaccount;
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

    public function DisplayPackages() {
        $result = $this->packages_model->fetch_packages_masterlist_datatables();
        $data = array();
        foreach ($result as $row) {
            $sub_array = array();
            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update Package" onclick="editPackage(' . $row->refno . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;'
                    . '<button class="btn btn-sm btn-danger" title="Submit Delete Package" id="submitdeletepackage" onclick="deletePackage(' . $row->refno . ')"><i class="zmdi zmdi-delete"></i></button>'
                    . '<button class="btn btn-sm btn-danger d-none" title="Cancel Deletion Package" id="canceldeletepackage" onclick="canceldeletePackage(' . $row->acctno . ')"><i class="zmdi zmdi-refresh"></i></button>'
                    . '<button class="btn btn-sm btn-success d-none" title="Payment Ledger" onclick="paymentLedger(' . $row->refno . ')"><i class="zmdi zmdi-check-square"></i></button>&nbsp;'
                    . '<button class="btn btn-sm btn-info d-none" title="Px Data InfoSheet" onclick="generateData(' . $row->refno . ')"><i class="zmdi zmdi-print"></i></button>&nbsp;';
            $sub_array[] = $row->packagecode;
            $sub_array[] = $row->patientname;
            $sub_array[] = $row->acctno;
            $sub_array[] = $row->IPDacctno;
            $sub_array[] = $row->docname;
            $sub_array[] = $row->packageprice;
            $sub_array[] = $row->active;
            $sub_array[] = $row->enrolldate;
            $sub_array[] = $row->docreferenceno;
            $sub_array[] = $row->incharge;
            $sub_array[] = $row->status;
            $sub_array[] = $row->slcode;
            $sub_array[] = $row->totaldeposit;
            $sub_array[] = $row->updated;
            $sub_array[] = $row->pin;
            $data[] = $sub_array;
        }

        $output = array
            (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->packages_model->fetch_packages_masterlist_data(),
            "recordsFiltered" => $this->packages_model->fetch_packages_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    public function DisplayOPDWalkin() {
        $result = $this->admission_model->fetch_opdwalkin();
        $data = array();
        foreach ($result as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editMembership(' . $row->id . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteMembership(' . $row->id . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = $row->name;
            $sub_array[] = $row->membercardno;
            $sub_array[] = $row->bday;
            $sub_array[] = $row->sex;
            $sub_array[] = $row->Streetadrs . ", " . $row->cityadd;
            $sub_array[] = $row->opdid;
            $sub_array[] = $row->updated;
            $sub_array[] = $row->cellphone;
            $sub_array[] = $row->OPDno;
            $data[] = $sub_array;
        }

        $output = array
            (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->admission_model->fetch_opdwalkin_masterlist_data(),
            "recordsFiltered" => $this->admission_model->fetch_opdwalkin_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    public function AddNewOPDWalkinPx() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        $date = new DateTime();
        $date_and_time_today = new DateTime();
        $format_date_time = $date_and_time_today->format('Y-m-d h:i:s');
        $format_date_only = $date_and_time_today->format('Y-m-d');
        $format_date = $date->format('m/d/Y h:i:s');
        $refnum = $format_date . 'MEMBR';
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');
        $client = $this->input->ip_address();
        $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);

        $data = array();
        $data["opid"] = strtoupper($this->input->post('opidx', TRUE));
        $data['OPDno'] = strtoupper($this->input->post('OPDnox', TRUE));
        $data['Slrefno'] = strtoupper($this->input->post('Slrefnox', TRUE));
        $data['inpatPIN'] = strtoupper($this->input->post('inpaaccntwix', TRUE));
        $data['patientno'] = strtoupper($this->input->post('patientnox', TRUE));
        $data['ledgerfile'] = strtoupper($this->input->post('ledgerfilex', TRUE));
        $data['name'] = strtoupper($this->input->post('patnamewix', TRUE));
        $data['sex'] = strtoupper($this->input->post('genderwix', TRUE));
        $data['Streetadrs'] = strtoupper($this->input->post('addresswix', TRUE));
        $data['cityadd'] = strtoupper($this->input->post('cityaddwix', TRUE));
        $data['station'] = strtoupper($this->input->post('stationx', TRUE));
        $data['tin'] = strtoupper($this->input->post('tinx', TRUE));
        $data['membercardno'] = strtoupper($this->input->post('memberidwix', TRUE));
        $data['bday'] = $this->input->post('birthdaywix', TRUE);
        $data['age'] = $this->input->post('ageofpxwix', TRUE);
        $data['updated'] = $this->input->post('updatedx', TRUE);
        $data['recid'] = $this->input->post('recidx', TRUE);
        $data['recby'] = $this->input->post('recbyx', TRUE);
        $data['cellphone'] = $this->input->post('cellphonewix', TRUE);

//        $data['memberrefno'] = strtoupper($this->input->post('fullnamemem', TRUE));
//        $data['membercardno']= strtoupper($this->input->post('memberidwix', TRUE));
//        $data['opdid']       = strtoupper($this->input->post('fullnamemem', TRUE));
//        $data['weight']      = strtoupper($this->input->post('fullnamemem', TRUE));
//        $data['hmoid']       = strtoupper($this->input->post('fullnamemem', TRUE));
//        $data['hmoname']     = strtoupper($this->input->post('fullnamemem', TRUE));
//        $data['doctorid']    = strtoupper($this->input->post('fullnamemem', TRUE));
//        $data['doctorname']  = strtoupper($this->input->post('fullnamemem', TRUE));
//        $data['reportcode']  = strtoupper($this->input->post('fullnamemem', TRUE));
//        $data['mypix']       = strtoupper($this->input->post('fullnamemem', TRUE));
//        $data['imagefile']   = strtoupper($this->input->post('fullnamemem', TRUE));

        $this->form_validation->set_rules('inpaaccntwix', 'In-Patient Account', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('patnamewix', 'Patient Name', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('birthdaywix', 'Birthday', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('ageofpxwix', 'Age', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('genderwix', 'Gender', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('addresswix', 'Address/Barangay', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('cityaddwix', 'City/Municipality', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('cellphonewix', 'Cellphone No.', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('memberidwix', 'Member ID', 'required|min_length[5]|max_length[50]');

        if ($this->form_validation->run() == FALSE) {
            $errors['inpaaccntwixget'] = form_error('inpaaccntwix');
            $errors['patnamewixget'] = form_error('patnamewix');
            $errors['birthdaywixget'] = form_error('birthdaywix');
            $errors['ageofpxwixget'] = form_error('ageofpxwix');
            $errors['genderwixget'] = form_error('genderwix');
            $errors['addresswixget'] = form_error('addresswix');
            $errors['cityaddwixget'] = form_error('cityaddwix');
            $errors['cellphonewixget'] = form_error('cellphonewix');
            $errors['memberidwixget'] = form_error('memberidwix');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {
            $this->admission_model->add_new_opdwalkin_patient($data);

            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

    public function getSLAccountDataForCheckDuplicateSLCodeOfAddPatient() {
        $result = array('status' => FALSE);

        $slcode = $this->input->post('slCodex');
        $slaccount_data = $this->admission_model->get_data_from_slaccount_for_addpatient_check_duplicate_slcode($slcode);

        if ($slaccount_data) {
            $result["slcodeforaddpx"] = $slaccount_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function addNewDiagnosis() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila');

        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d H:i:s');
        $client = $this->input->ip_address();

        $data = [];

        $data['refno'] = $this->input->post('refnodiagnose', TRUE);
        $data['categdiag'] = $this->input->post('diagnosis', TRUE);
        $data['Groupname'] = $this->input->post('dohcateg', TRUE);
        $data['icdcode'] = $this->input->post('icd10code', TRUE);
        $data['lastupdate'] = $for_update;
        $data['recid'] = $this->input->post('recordsiddiag', TRUE);
        $data['recby'] = $this->input->post('recordsbydiag', TRUE);
        $data['station'] = strtoupper(gethostbyaddr($client));
        $data['icdcateg'] = $this->input->post('icd10categ', TRUE);
//        $data['dohrefno'] = $this->input->post('diagnosis', TRUE);

        $this->form_validation->set_rules('dohcateg', 'DOH Category', 'required|min_length[5]|max_length[500]');
        $this->form_validation->set_rules('diagnosis', 'Diagnosis', 'required|min_length[5]|max_length[500]');

        if ($this->form_validation->run() == FALSE) {
            $errors['dohcateg'] = form_error('dohcateg');
            $errors['diagnosis'] = form_error('diagnosis');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {
            $result = $this->admission_model->add_diagnosis($data);
            $result = ['status' => TRUE];
        }
        echo json_encode($result);
    }

    public function getInPatientlistDataForEditAdmitPatient() {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('casenox');

        $inpatientlist_data = $this->admission_model->get_data_from_inpatientlist_for_update_admitted_patient($caseno);

        if ($inpatientlist_data) {
            $result['inpatientlistdata'] = $inpatientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getInPatientlistDataForMGHFormDataImport() {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('casenox');

        $inpatientlist_data = $this->admission_model->get_data_from_inpatientlist_for_MGH_form_data_import($caseno);

        if ($inpatientlist_data) {
            $result['inpatientlistdata'] = $inpatientlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getInPatientSublistDataForEditAdmitPatient() {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('casenox');

        $inpatientsublist_data = $this->admission_model->get_data_from_inpatientlist_sub_for_update_admitted_patient($caseno);

        if ($inpatientsublist_data) {
            $result['inpatientsublistdata'] = $inpatientsublist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getVitalstatDataForEditAdmitPatient() {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('casenox');

        $vitalsigns_data = $this->admission_model->get_data_from_vitalstats_for_update_admitted_patient($caseno);

        if ($vitalsigns_data) {
            $result['vitalsignsdata'] = $vitalsigns_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getPackageEnroleeDataForEditAdmitPatient() {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('casenox');

        $pckgenrollee_data = $this->admission_model->get_data_from_package_enrollee_for_update_admitted_patient($caseno);

        if ($pckgenrollee_data) {
            $result['pckgenrolleedata'] = $pckgenrollee_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getComanageData() {
        $caseno = $this->input->post('casenox');
        $casenum = $this->admission_model->get_comanage_data($caseno);
        echo json_encode($casenum);
    }

    public function getHMOInsuranceData() {
        $caseno = $this->input->post('casenox');
        $casenum = $this->admission_model->get_hmo_insurance_data($caseno);
        echo json_encode($casenum);
    }

    public function getConfinementCausesData() {
        $caseno = $this->input->post('casenox');
        $casenum = $this->admission_model->get_confinement_causes_data($caseno);
        echo json_encode($casenum);
    }

    public function getIndicationCausesData() {
        $caseno = $this->input->post('casenox');
        $casenum = $this->admission_model->get_indication_causes_data($caseno);
        echo json_encode($casenum);
    }

    public function getFinaldiagCausesData() {
        $caseno = $this->input->post('casenox');
        $casenum = $this->admission_model->get_finaldiag_causes_data($caseno);
        echo json_encode($casenum);
    }

    public function getVIPSecurityDataForEditAdmitPatient() {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('casenox');

        $vipsecurity_data = $this->admission_model->get_data_from_vip_table_for_update_admitted_patient($caseno);

        if ($vipsecurity_data) {
            $result['vipsecuritydata'] = $vipsecurity_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function updateAdmittedPatient() {
        $result = array('status' => FALSE);

        $caseno = $this->input->post('inputname_hiddenIDadm');
        
        $logbookno = $this->input->post('inputname_casenumberadm');
        $HRnCODE = $this->input->post('inputname_healthrecnoadm');
        $admcaseno = $this->input->post('inputname_accountnumberadm');
        $admpinnum = $this->input->post('inputname_pxindexnoadm');
        $vipdata = $this->input->post('inputname_vipsecuritydataadm');
        $pkgdata = $this->input->post('inputname_packagemanadataadm');
        $admcityadd = $this->input->post('selectname_citymuniadm');
        $admprovadd = $this->input->post('inputname_provinceadm');
        $attendingdoc = $this->input->post('selectname_attendingdoctoradm');
        $attendingnur = $this->input->post('selectname_attendingnurseadm');
        $patientclass = $this->input->post('selectname_patientclassadm');
        $adultpedia = $this->input->post('selectname_adultpediaadm');
        $obgyneproced = $this->input->post('selectname_obgyneprocedureadm');
        $others = $this->input->post('inputname_othersadm');
        $pathology = $this->input->post('inputname_pathologyadm');
        $roomdata = $this->input->post('selectname_roomadmhid');
        $philmember = $this->input->post('selectname_phmembershipadm');
        $nurincha = $this->input->post('inputname_nurseinchargeadm');
        
        $lmpdate = new DateTime($this->input->post('inputname_lmpdateadm'));
        $newlmpdate = $lmpdate->format('Y-m-d');

        if ($patientclass === "GYNECOLOGY") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $pathology);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = "";
            $data["lmp"] = strtoupper($newlmpdate);
        } else if ($patientclass === "MEDICAL") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $adultpedia);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = strtoupper($adultpedia);
            $data["OBprocedure"] = "";
            $data["lmp"] = "";
        } else if ($patientclass === "OBSTETRICS") {
            $data["pat_classification"] = strtoupper($patientclass);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = strtoupper($obgyneproced);
            $data["lmp"] = strtoupper($newlmpdate);
        } else if ($patientclass === "OTHERS") {
            $data["pat_classification"] = strtoupper($others);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = "";
            $data["lmp"] = "";
        } else if ($patientclass === "SURGICAL") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $pathology);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = "";
            $data["lmp"] = "";
        } else if ($patientclass === "NEW BORN") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $pathology);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = strtoupper($obgyneproced);
            $data["lmp"] = "";
        } else if ($patientclass === "STILL BIRTH") {
            $data["pat_classification"] = strtoupper($patientclass . "-" . $pathology);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = strtoupper($obgyneproced);
            $data["lmp"] = "";
        } else {
            $data["pat_classification"] = strtoupper($patientclass);
            $data["pat_clascode"] = strtoupper($patientclass);
            $data["pat_classub"] = "";
            $data["OBprocedure"] = "";
            $data["lmp"] = "";
        }

        $splitcaseno = explode("-", $admcaseno);
        $splitpinnum = explode("-", $admpinnum);
        $roomsplit = explode(":", $roomdata);
        $phictype = explode(":", $philmember);
        $splitpackge = explode("|", $pkgdata);
        $splitcitymu = explode("-", $admcityadd);
        $splitprovin = explode("-", $admprovadd);
        $splitdoctor = explode(" - ", $attendingdoc);
        $splitnurses = explode(" - ", $attendingnur);
        $splitnurinc = explode(" - ", $nurincha);

        $now = new DateTime();

        if ($vipdata !== "") {
            $data["vipvalue"] = 1;
        } else {
            $data["vipvalue"] = 0;
        }

        if ($pkgdata !== "") {
            $data["pkgcode"] = $splitpackge[5];
        } else {
            $data["pkgcode"] = "";
        }

        $data["pxtype"] = $this->input->post('selectname_patienttypeadm');

        $data['admittype'] = $this->input->post('selectname_admixontypeadm');
        $data['logbookCN'] = str_replace("-", "", $logbookno);
        //$data['logbookPIN']             =
        $data["HRnCODE"] = str_replace("-", "", $HRnCODE);
        //$data["lasttextsent"]           = 1901-01-01 00:00:00;
        //$data["lasttransactionsent"]    =        
        $data["vip"] = $this->input->post('numboxname_vipscore');
        $data['pincode'] = $this->input->post('hiddeninputname_pincodeadm');
        $data["casecode"] = $this->input->post('hiddeninputname_casecodexadm');
        $data["caseyr"] = strtoupper($splitcaseno[0]);
        $data["caseseq"] = strtoupper($splitcaseno[1]);
        $data['caseno'] = $this->input->post('inputname_accountnumberadm');


        $memberrefno = $this->input->post('inputname_vmembershipadm');
        if ($memberrefno === "SELECT FROM LIST" || $memberrefno === "SELECT") {
            $data['memberrefno'] = "";
        } else {
            $data['memberrefno'] = $this->input->post('inputname_vmembershipadm');
        }

        $data['ledgerfile'] = "ledgeripd";
        $data["pinyr"] = strtoupper($splitpinnum[0]);
        $data["pinseq"] = strtoupper($splitpinnum[1]);
        $data["PIN"] = $this->input->post('inputname_pxindexnoadm');
        $data['pinformat'] = $this->input->post('hiddeninputname_pinformatadm');
        $data['lname'] = strtoupper($this->input->post('inputname_lastnameadm'));
        $data['fname'] = strtoupper($this->input->post('inputname_firstnameadm'));
        $data['suffix'] = strtoupper($this->input->post('inputname_suffixadm'));
        $data['mname'] = strtoupper($this->input->post('inputname_middlenameadm'));
        $data["name"] = $data['lname'] . ", " . $data['fname'] . " " . $data['mname'] . " " . $data['suffix'];
        $data["hideinfo"] = 0;
        $data["spouse"] = strtoupper($this->input->post('inputname_spousenameadm'));

        $spousebday = new DateTime($this->input->post('inputname_spousebirthadm'));
        $spouxbday = $spousebday->format('Y-m-d');

        $data["spousebday"] = strtoupper($spouxbday);
        $data['sex'] = strtoupper($this->input->post('inputname_genderadm'));


        $birthdate = new DateTime($this->input->post('inputname_birthdayadm'));
        $pxbday = $birthdate->format('Y-m-d');

        $data['bday'] = strtoupper($pxbday);
        $data['Age'] = strtoupper($this->input->post('inputname_ageadm'));
        $data['packageCODE'] = strtoupper($data["pkgcode"]);
        $data['nationality'] = strtoupper($this->input->post('inputname_nationalityadm'));
        $data['passportno'] = strtoupper($this->input->post('inputname_passportnoadm'));
        $data['adrs'] = strtoupper($this->input->post('inputname_addressadm'));
        $data['brgy'] = strtoupper($this->input->post('selectname_barangayadm'));
        
        $data['cityadd'] = strtoupper($splitcitymu[0]);
        $data['citycode'] = strtoupper($splitcitymu[1]);
        $data['provadd'] = strtoupper($splitprovin[0]);
        $data['provcode'] = strtoupper($splitprovin[1]);
        
        $data['zipcode'] = strtoupper($this->input->post('inputname_zipcodeadm'));
        $data['civilstatus'] = strtoupper($this->input->post('selectname_civilstatusadm'));
        $data['contactno'] = strtoupper($this->input->post('inputname_contactnoadm'));
        $data['mobileno'] = strtoupper($this->input->post('inputname_mobilenoadm'));
        $data['email'] = $this->input->post('inputname_emailadm');
        $data['religion'] = strtoupper($this->input->post('selectname_religionadm'));
        $data['father'] = strtoupper($this->input->post('inputname_fatheradm'));
        $data['fatheradrs'] = strtoupper($this->input->post('inputname_fatheradrsadm'));
        $data['fathernationality'] = strtoupper($this->input->post('inputname_fathernationadm'));
        $data['mother'] = strtoupper($this->input->post('inputname_motheradm'));
        $data['motheradrs'] = strtoupper($this->input->post('inputname_motheradrsadm'));
        $data['mothernationality'] = strtoupper($this->input->post('inputname_mothernationadm'));
        
        date_default_timezone_set('Asia/Manila');
        $data['updated'] = date('Y-m-d H:i:s');
        
        $data["doctorid"] = strtoupper($splitdoctor[1]);
        $data["doctorname"] = strtoupper($splitdoctor[0]);
        $data["nurseid"] = strtoupper($splitnurses[1]);
        $data["nursename"] = strtoupper($splitnurses[0]);
        $data["hmoid"] = strtoupper($this->input->post('hiddboxname_hmocodeadm'));
        $data["hmoname"] = strtoupper($this->input->post('hiddboxname_hmonameadm'));
        $data["hmoholder"] = strtoupper($this->input->post('hiddboxname_holnameadm'));
        $data["hmonumber"] = strtoupper($this->input->post('hiddboxname_hmoprioadm'));
        $data["hmoapprovalno"] = strtoupper($this->input->post('hiddboxname_apprnumadm'));
        $data["archived"] = 0;
        $data['lastadmitdate'] = strtoupper($this->input->post('hiddeninputname_lastadmitdateadm'));
        //$data["archiveddate"]           = 1900-01-01
        $data['lastadmittime'] = strtoupper($this->input->post('hiddeninputname_lastadmittimeadm'));
        $data['lastdischdate'] = strtoupper($this->input->post('hiddeninputname_lastdischdateadm'));
        $data['lastdischtime'] = strtoupper($this->input->post('hiddeninputname_lastdischtimeadm'));
        $data["recid"] = strtoupper($this->session->userdata("ID"));
        $data["recby"] = strtoupper($this->session->userdata("empname"));
        $data["station"] = strtoupper(gethostbyaddr($_SERVER['REMOTE_ADDR']));

        $dateofadmission = new DateTime($this->input->post('inputname_admissiondateadm'));
        $timeofadmission = date("H:i", strtotime($this->input->post('inputname_admissiontimeadm')));
        $data['admitdate'] = $dateofadmission->format('Y-m-d');
        $data['admittime'] = $timeofadmission . ":00";

        $data['tagfordischa'] = 0;
        $data['dischadate'] = $now->format('Y-m-d');
        $data['dischatime'] = $now->format('h:i:s');
        //$data['dischaid']               = 95
        //$data['dischaby']               = ADMINISTRATOR
        $data['discharged'] = 0;
        //$data['daysconfined']           =  0
        //$data['disposition']            = 
        //$data['expireddate']            =  1901-01-01
        //$data['expiredtime']            = 00:00:00

        $referredfromhci = $this->input->post('selectname_hospcareinsadm');
        if ($referredfromhci === "Select" || $referredfromhci === "SELECT") {
            $data['ReferredFromHCI'] = "";
        } else {
            $data['ReferredFromHCI'] = strtoupper($this->input->post('selectname_hospcareinsadm'));
        }

        //$data['TransRefHCI']            = 
        //$data['reasonforreferral']      = 
        $data["roomref"] = strtoupper($roomsplit[0]);
        $data["roomcd"] = strtoupper($roomsplit[1]);
        $data["roomtype"] = strtoupper($roomsplit[2]);
        $data["roomno"] = strtoupper($roomsplit[3]);
        $data["roombed"] = strtoupper($roomsplit[4]);
        $data["roominfo"] = strtoupper($roomsplit[5]);
        $data["roombrief"] = strtoupper($data["roomno"] . " : " . $data["roombed"] . " - " . $data["roomtype"]);
        
        date_default_timezone_set('Asia/Manila');
        $data["roomdate"] = date('Y-m-d');
        $data["roomtime"] = date('H:i:s');
        
        $data["roomrate"] = strtoupper($roomsplit[6]);
        $data["PRICEPACKAGE"] = strtoupper($roomsplit[8]);
        //$data["rmrateschm"]             = IPD1
        //$data["RmPHICtype"]             = NON or PRI
        $data["creditmax"] = strtoupper($roomsplit[9]);
        $data["addonserv"] = strtoupper($roomsplit[7]);
        $data["phiccode"] = strtoupper($phictype[1]);
        $data["phicmembr"] = strtoupper($phictype[0]);
        //$data["phicdependent"]          = 0
        $data["phicPIN"] = strtoupper($this->input->post('inputname_phicnumberadm'));
        $data["phicmembrname"] = strtoupper($this->input->post('inputname_membernameadm'));

        if (strtoupper($this->input->post('selectname_reltomemberadm')) === "SELECT") {
            $data["relationtomember"] = "";
        } else {
            $data["relationtomember"] = strtoupper($this->input->post('selectname_reltomemberadm'));
        }
        //
        //$data["phiccasesecond"]         = 
        //$data["phiccasesecondRefno"]    = 10420148898PHICCD
        //$data["phiccasesecondDx"]       = Normal newborn care package
        //$data["phicHCItotal"]           = 13080
        //$data["PHICpfTotal"]            = 5570
        $data["PHICrmtype"] = strtoupper($roomsplit[10]);
        //$data["Diag_discharge_updatedby"]= ADMINISTRATOR;
        //$data["Diag_discharge_updatedDT"]= 2019-02-12 14:22:17;
        //$data["Diag_surg_ref"]          = 12162018050800SURG
        //$data["Diag_surg"]              = SMALL  INCISION  CATRACT SURGERY,OS
        //$data["Diag_surgICD"]           = 
        //$data["Diag_surg_type"]         = 
        //$data["Diag_anes_ref"]          = 08172017071214STER
        //$data["Diag_anes"]              = Local Anesthesia
        //$data["Diag_anesICD"]           = 
        //$data["ICD10"]                  = O02.9
        //$data["icdcasetype"]            = 
        //$data["flagme"]                 =  0
        //$data["suprvid"]                = 437
        //$data["suprvby"]                = JESSAVY SASING
        //$data["clearedid"]              = 298
        //$data["clearedby"]              = CHARISSE DIANO
        //$data["clearedtd"]              = 2018-12-12 20:53:28
        //$data["clearedat"]              = STATION4A
        //$data["Quickadmit"]             = 0;
        //$data["patfile"]                = 
        //$data["imagefile"]              = (BLOB)
        //$data["mypix"]                  = 12/18/2018 9:23:51 PM
        //$data["phicpapers"]             = OK
        //$data["phicclearby"]            = 
        //$data["phicdeductions"]         = FULL
        //$data["phicnote"]               = 
        //$data["printedby"]              = CARESS KATHLEEN ELLO
        //$data["printeddate"]            = 2018-12-19 09:01:24
        //$data["billingnote"]            = Final bill. Thank you!
        //$data["nobillingdischarged"]    = 0
        //$data["nbdhospamount"]          = 10500
        //$data["nbddocamount"]           = 4500
        //$data["GrossHospAmt"]           = 16147.6
        //$data["GrossDocAmt"]            = 5200
        //$data["GrandTotalBill"]         = 21347.6
        //$data["phic1caseHCIrecommend"]  = 10500
        //$data["phic2caseHCIrecommend"]  = 0
        //$data["phic1caseDOCrecommend"]  = 2310
        //$data["phic2caseDOCrecommend"]  = 500
        //$data["DiscountPHIChosp"]       = 6640
        //$data["DiscountPHICdoc"]        = 9600
        //$data["DiscountHosp"]           = 0
        //$data["DiscountHospDoc"]        = 0
        //$data["DiscountHMOHosp"]        = 0
        //$data["DiscountHMODoc"]         = 0
        //$data["DiscountSrHosp"]         = 1161.01
        //$data["DiscountSrDoc"]          = 0
        //$data["DiscountVATHosp"]        = 0
        //$data["DiscountVATDoc"]         = 0
        //$data["PNrefno"]                = 75689
        //$data["PNduedate"]              = 1901-01-01
        //$data["PNamount"]               = 0
        //$data["PNBalance"]              = 0
        //$data["PNlastupdate"]           = 1901-01-01
        //$data["PNlastRefno"]            = 
        //$data["PNby"]                   = 
        //$data["PNAddress1"]             = 
        //$data["PNAddress2"]             = 
        //$data["PNbyCellnumber"]         = 
        //$data["dischargedsameday"]      = 1
        //$data["dischargein48"]          = 
        //$data["deliverycausesofdeaths"] = 
        //$data["deathtype"]              = Room/Admission Death
        //$data["HAIcase_deviceinfection"]= none
        //$data["HAIcasedays"]            = 0
        //$data["HAIVAPinfection"]        = 0
        //$data["HAIVAPdays"]             = 0
        //$data["HAIBSIinfection"]        = 0
        //$data["HAIBSIdays"]             = 0
        //$data["HAIUTIinfection"]        = 0
        //$data["HAIUTIdays"]             = 0
        //$data["HAIcase_nonedeviceinfection"]= 
        //$data["HAInonecasedays"]        = 0
        //$data["HAISSInoneinfection"]    = 0
        //$data["HAISSIdays"]             = 0
        //$data["phicclaimrefno"]         = PD121518083036PHIPHICREFCHK
        //$data["phicclaimstatus"]        = ONPROCESS
        //$data["pcsoamount"]             = 0
        //$data["pcsorefcode"]            = 
        //$data["pcsogrant"]              = 1901-01-01
        //$data["hmoclaimrefno"]          = 
        //$data["hmopapers"]              = NM
        //$data["hmodeductions"]          = NODE
        //$data["hmoclaimstatus"]         = 
        //$data["hmoclaimeddate"]         = 1901-01-01
        //$data["hmoclaimedamount"]       = 0.00
        //$data["hmobalance"]             = 0
        //$data["hmovoucherdate"]         = 1901-01-01
        //$data["hmovoucherno"]           = 
        //$data["hmovoucheramount"]       = 0 
        //$data["needdeposit"]            = NONE
        //$data["advisedeposit"]          = 1901-01-01 00:00:00
        //$data["InqBal"]                 = 14523.3
        //$data["NeedDepoamt"]            = 0 or 1
        //$data["phiccf2prepby"]          = 
        //$data["phiccf2updated"]         = 1901-01-01 00:00:00
        //$data["Phiccf2done"]            = 0
        //$data["ReqPHICmdrno"]             = 0
        $data["ReqPHICmdrweb"] = strtoupper($this->input->post('inputname_mdfrefnumadm'));
        //$data["ReqPHICspouse"]          = 0
        //$data["ReqPHICChild"]           = 0
        //$data["ReqPHICOFW"]             = 0
        //$data["ReqPHICparent"]          = 0
        //$data["cashierpaid"]            = 0 or 1
        //$data["cashiername"]            = JASMINE JOY OYO-A
        //$data["cashierbatchrefno"]      = 12142018075951CASHIER5BC
        //$data["cashierDT"]              = 2018-12-14 00:00:00
        //$data["verifiedby"]             = 
        //$data["verifiedadmission"]      = 0
        //$data["verifieddatetime"]       = 1901-01-01 00:00:00
        //$data["medcertrefno"]           = 12142018IT100544MC
        //$data["patientnickname"]        = 
        //$data["Birthcertrefno"]         = XXX-ALONA V. LAGAHIT
        //$data["medicolegalrefno"]       = 
        //$data["diagnosisdone"]          = 0;
        //$data["archivedby"]             = 
        //$data["restoreddate"]           = 1901-01-01
        //$data["restored"]               = 0;
        //$data["restoredby"]             = 
        //$data["MedicoLegalReference"]   = 
        //$data["patientisNBB"]           = 0
        //$data["hascateg"]               = 0
        //$data["phicmemberverified"]     = 0 or 1
        //$data["otherdiag"]              = 
        //$data["nursedischadate"]        = 2018-12-11
        //$data["nursedischatime"]        = 15:35:21
        //$data["TICKETCODE"]             = 
        //$data["TICKETDATE"]             = 1901-01-01
        //$data["TICKETBY"]               = 
        //$data["postedby"]               = 
        //$data["postingdate"]            = 1901-01-01
        //$data["pxgroup"]                = 
        $data["slcode"] = strtoupper($this->input->post('inputname_slcodeadm'));

        $patienttypeadm = $this->input->post('selectname_patienttypeadm');
        if ($patienttypeadm === "IPD") {
            $data['casetype'] = "IN-PATIENT";
            $data["billingcprecipient"] = strtoupper($this->input->post('inputname_billingrecipientadm'));
            $data["Weight"] = strtoupper($this->input->post('inputname_weightadm'));
            $data["guarantor"] = strtoupper($this->input->post('inputname_watchernameadm'));
            $data["guarantor_rltn"] = strtoupper($this->input->post('selectname_reltopatientadm'));
            $data["guarantor_mobileno"] = strtoupper($this->input->post('inputname_guardiannumadm'));

            $nursestation = $this->input->post('selectname_stationnameadm');
            if ($nursestation === "Select" || $nursestation === "SELECT") {
                $data["nursestation"] = "";
            } else {
                $data["nursestation"] = strtoupper($this->input->post('selectname_stationnameadm'));
            }

            $data["opdtype"] = "IPDPX";

            $watcherbday = new DateTime($this->input->post('inputname_watcherbirthadm'));
            $guardianbday = $watcherbday->format('Y-m-d');

            $data["guarantor_bday"] = strtoupper($guardianbday);
            $data["dietarycd"] = strtoupper($this->input->post('textareaname_dietaryadm'));
            $data["diatary_ins"] = strtoupper($this->input->post('textareaname_dietaryviewadm'));
            $data["Diag_chiefcomplain"] = strtoupper($this->input->post('textareaname_admitreasonadm'));
            $data["Diag_admit"] = strtoupper($this->input->post('textareaname_admitdiagnosadm'));
            $data["admissionsource"] = strtoupper($this->input->post('inputname_admissiontypehiddentext'));
            
            if($nurincha === "Select" || $nurincha === null)
            {
                $data["NurseIncharge"] = "";
                $data["NurseInchargeID"] = "";
            }
            else
            {
                $data["NurseIncharge"] = strtoupper($splitnurinc[0]);
                $data["NurseInchargeID"] = strtoupper($splitnurinc[1]);
            }
            
            $data["minorOR"] = $this->input->post('textboxname_forminororadm');
            $data["cautions"] = strtoupper($this->input->post('selectname_cautionsadm'));
            $data["TBstatus"] = strtoupper($this->input->post('selectname_tbdotsstatusadm'));
            $data["phiccasefirst"] = "";
            $data["phiccasefirstRefno"] = "";
            $data["phiccasefirstDx"] = "";
            $data["dietstatus"] = "ACTIVE";
            $data["Diag_discharge"] = "";
            $data["antenatal"] = 0;
            $data["postnatal"] = 0;
        } else {
            $data['casetype'] = strtoupper($this->input->post('selectname_entrytypeadm'));
            $data["opdtype"] = $this->input->post('inputname_opdtypexdataadm');
            $data["nursestation"] = "OPD";
            $data["billingcprecipient"] = "";
            $data["Weight"] = "";
            $data["guarantor"] = "";
            $data["guarantor_rltn"] = "";
            $data["guarantor_mobileno"] = "";
            $data["guarantor_bday"] = "";
            $data["dietarycd"] = "";
            $data["diatary_ins"] = "";
            $data["Diag_chiefcomplain"] = strtoupper($this->input->post('textareaname_admitreasonadm'));
            $data["Diag_admit"] = strtoupper($this->input->post('textareaname_admitdiagnosadm'));
            $data["admissionsource"] = "NORMAL";
            $data["NurseIncharge"] = "";
            $data["NurseInchargeID"] = "";
            $data["minorOR"] = 0;
            $data["cautions"] = "";
            $data["TBstatus"] = "";
            $data["phiccasefirst"] = strtoupper($this->input->post('textboxname_icd10adm'));
            $data["phiccasefirstRefno"] = strtoupper($this->input->post('hiddboxname_phiccaserefnoadm'));
            $data["phiccasefirstDx"] = strtoupper($this->input->post('textareaname_impressionadm'));
            $data["dietstatus"] = "DISCHARGED";
            $data["Diag_discharge"] = strtoupper($this->input->post('textareaname_impressionadm'));

            $entrytypeforpreandpostnatal = $this->input->post('selectname_entrytypeadm');
            if ($entrytypeforpreandpostnatal === "POST-NATAL") {
                $data["postnatal"] = 1;
            } else {
                $data["postnatal"] = 0;
            }

            if ($entrytypeforpreandpostnatal === "PRE-NATAL") {
                $data["antenatal"] = 1;
            } else {
                $data["antenatal"] = 0;
            }
        }

        //===============CO-MANAGE SECTION=====================================>
        if ($this->admission_model->delete_patient_old_record_from_comanage_table($caseno)) {
            $result['status'] = true;
        }

        $result1 = [];
        $comanagedata = $this->input->post('inputname_finalcomanagedataadm');

        if ($comanagedata !== "") {
            $firstDimension = explode('?,', $comanagedata);
            foreach ($firstDimension as $key => $value) {
                if (empty($value)) {
                    unset($firstDimension[$key]);
                }
            }

            foreach ($firstDimension as $temp) {
                $result1[] = explode('|', $temp);
            }

            for ($cv = 0; $cv < count($firstDimension); $cv++) {
                $data['comadocname'] = $result1[$cv][0];
                $data['comadocrefno'] = $result1[$cv][1];
                $data['comadatereferred'] = $result1[$cv][2];
                $data['comamanagetype'] = $result1[$cv][3];
                $data['comaacctno'] = $this->input->post('inputname_accountnumberadm');
                $data['comaacctrefno'] = $this->input->post('hiddeninputname_casecodexadm');
                $data['comaPINcode'] = $this->input->post('hiddeninputname_pincodeadm');
                $data['comapatientname'] = $data['lname'] . ", " . $data['fname'] . " " . $data['mname'] . " " . $data['suffix'];
                $data['comaupdated'] = $data['updated'];
                $data['comarecid'] = strtoupper($this->session->userdata("ID"));
                $data['comarecby'] = strtoupper($this->session->userdata("empname"));
                $data['comaPCcodeno'] = $this->input->post('hiddeninputname_pccodexadm');
                $data['comapxtype'] = $this->input->post('selectname_patienttypeadm');
                $data['comaaccesscode'] = "no";
                $data['comaverified'] = 1;
                $data['comaphicAR'] = 0;
                $data['comaattendingdoc'] = 0;
                $data['comaproffee'] = 0;
                $data['comasentcf4form'] = 0;
                $data['comadonecf4form'] = 0;

                if ($this->admission_model->add_comanage_data($data)) {
                    $result['status'] = true;
                }
            }
        }
        
        //===============HMO-MANAGEMENT SECTION=====================================>
        if ($this->admission_model->delete_patient_old_record_from_hmo_table($caseno)) {
            $result['status'] = true;
        }

        $resulthmo = [];
        $hmodata = $this->input->post('inputname_finalhmoinsurdataadm');

        if ($hmodata !== "") {


            $firstDimensionhmo = explode('?,', $hmodata);

            foreach ($firstDimensionhmo as $keyhmo => $valuehmo) {
                if (empty($valuehmo)) {
                    unset($firstDimensionhmo[$keyhmo]);
                }
            }

            foreach ($firstDimensionhmo as $temphmo) {
                $resulthmo[] = explode('|', $temphmo);
            }

            for ($cvhmo = 0; $cvhmo < count($firstDimensionhmo); $cvhmo++) {
                $data['hmorefno'] = $resulthmo[$cvhmo][2];
                $data['hmopxtype'] = $this->input->post('selectname_patienttypeadm');
                $data['hmoPINcode'] = $this->input->post('hiddeninputname_pincodeadm');
                $data['hmoacctcode'] = $this->input->post('hiddeninputname_casecodexadm');
                $data['hmoacctno'] = $this->input->post('inputname_accountnumberadm');
                $data['hmopatientname'] = $data['lname'] . ", " . $data['fname'] . " " . $data['mname'] . " " . $data['suffix'];
                $data['hmoadmitdate'] = $now->format('Y-m-d');
                //$data['hmodischadate']          = $data['admitdate'];
                $data['hmocode'] = $resulthmo[$cvhmo][1];
                $data['hmoname'] = $resulthmo[$cvhmo][0];
                $data['hmocredit'] = $resulthmo[$cvhmo][3];
                $data['hmoloa'] = $resulthmo[$cvhmo][6];
                $data['hmoapprovaldate'] = $resulthmo[$cvhmo][7];
                $data['hmohosp'] = 0;
                $data['hmodoc'] = 0;
                $data['hmoamountapplied'] = 0;
                $data['hmotransmittalage'] = 0;
                $data['hmopaid'] = 0;
                $data['hmodiscountapplied'] = 0;
                $data['hmotaxapplied'] = 0;
                $data['hmoORamountpaid'] = 0;
                $data['hmopaymentage'] = 0;
                $data['hmopriorityno'] = $resulthmo[$cvhmo][4];
                $data['hmocardholder'] = $resulthmo[$cvhmo][8];
                $data['hmocardno'] = $resulthmo[$cvhmo][5];
                $data['hmorecby'] = strtoupper($this->session->userdata("empname"));
                $data['hmorecid'] = strtoupper($this->session->userdata("ID"));
                $data['hmoupdated'] = $data['updated'];
                $data['hmostation'] = strtoupper(gethostbyaddr($_SERVER['REMOTE_ADDR']));
                $data['hmoverified'] = 1;
                $data['hmolocked'] = 0;
                $data['hmotransno'] = 0;
                $data['hmotagitem'] = 0;
                $data['hmobalanceOff'] = 0;
                $data['hmovariancetotal'] = 0;
                $data['hmogroupcode'] = 1;
                //$data['hmoSLcode'] = 
                //$data['hmocashierHMOslcode'] = 
                //$data['hmocashierHMOcode'] = 
                //$data['hmocashierhmocodename'] = 
                //$data['hmoagegrouping'] = 
                //$data['hmocashierbatch'] = 
                //$data['hmoposted'] = 
                //$data['hmopostedby'] = 
                //$data['hmotransrefno'] = 
                //$data['hmocheckno'] = 
                //$data['hmopaydate'] = 
                //$data['hmoreference'] = 
                //$data['hmotransmitdate'] = 
                //$data['hmotransmittalno'] = 
                //$data['hmoticketcode'] = 
                //$data['hmoticketdate'] =

                if ($this->admission_model->add_hmoinsurance_data($data)) {
                    $result['status'] = true;
                }
            }
        }

        //===============CAUSES OF CONFINEMENT SECTION=========================>
        if ($this->admission_model->delete_patient_old_record_from_causes_table($caseno)) {
            $result['status'] = true;
        }

        $resultcauses = [];
        $causesdata = $this->input->post('inputname_finalcausecondataadm');

        if ($causesdata !== "") {


            $firstDimensioncauses = explode('?,', $causesdata);
            foreach ($firstDimensioncauses as $keycauses => $valuecauses) {
                if (empty($valuecauses)) {
                    unset($firstDimensioncauses[$keycauses]);
                }
            }

            foreach ($firstDimensioncauses as $tempcauses) {
                $resultcauses[] = explode('|', $tempcauses);
            }

            for ($cvcauses = 0; $cvcauses < count($firstDimensioncauses); $cvcauses++) {
                $data['causescode'] = $resultcauses[$cvcauses][6];
                $data['causescasecode'] = $this->input->post('hiddeninputname_casecodexadm');
                $data['causescaseno'] = $this->input->post('inputname_accountnumberadm');
                //$data['causesmembercardno']     = 
                $data['causesPIN'] = $this->input->post('inputname_pxindexnoadm');
                $data['causespincode'] = $this->input->post('hiddeninputname_pincodeadm');
                $data['causesAge'] = $this->input->post('inputname_ageadm');
                $data['causespatientname'] = $data['lname'] . ", " . $data['fname'] . " " . $data['mname'] . " " . $data['suffix'];
                $data['causesdiaggroup'] = "ADMIT";
                $data['causesdiagcode'] = $resultcauses[$cvcauses][5];
                $data['causesdiagnosis'] = $resultcauses[$cvcauses][4];
                $data['causesdiagcateg'] = $resultcauses[$cvcauses][0];
                //$data['causesdohrefno']         = ICD14852DCS
                $data['causesicdcode'] = $resultcauses[$cvcauses][1];
                //$data['causesicdcasetype']      = 
                $data['causesrecid'] = strtoupper($this->session->userdata("ID"));
                $data['causesrecby'] = strtoupper($this->session->userdata("empname"));
                $data['causeslastupdate'] = $data['updated'];
                $data['causesstation'] = $data["station"];
                //$data['causesverifiedby']       = 
                $data['causesmedrecverified'] = 0;
                //$data['causesverifieddate']     = 
                $data['causesdohstatcounted'] = 0;
                $data['causesdohstatrefno'] = $resultcauses[$cvcauses][3];
                $data['causesicd10cat'] = $resultcauses[$cvcauses][2];
                $data['causesvalidated'] = 1;

                if ($this->admission_model->add_causes_of_confinement_data($data)) {
                    $result['status'] = true;
                }
            }
        }

        //===============VIP/SECURITY SECTION=====================================>
        if ($this->admission_model->delete_patient_old_record_from_vip_table($caseno)) {
            $result['status'] = true;
        }

        $datenowvip = $this->get_current_date();
        $datevip = new DateTime($datenowvip);
        $currentdatevip = date_format($datevip, 'Y-m-d');

        $vipalldata = $this->input->post('inputname_vipsecuritydataadm');

        if ($vipalldata !== "") {
            $vipexplode = explode("|", $vipalldata);

            $data['vipcasecode'] = $vipexplode[0];
            $data['vipcaseno'] = $vipexplode[1];
            $data['vipvip'] = $vipexplode[2];
            $data['vipsecurityrisk'] = $vipexplode[3];
            $data['vipremarks'] = $vipexplode[4];
            $data['vippatnamex'] = strtoupper($vipexplode[5]);
            $data['vipoic'] = $vipexplode[6];
            $data['vipoiccode'] = $vipexplode[7];
            $data['vipupdatedby'] = $vipexplode[8];
            $data['vipstation'] = $vipexplode[9];
            $data['vipconfirmed'] = $vipexplode[10];
            $data['vipupdated'] = $data['updated'];
            $data['vipadmitdate'] = $currentdatevip;
            $data['vipdischadate'] = $currentdatevip;

            if ($this->admission_model->insert_new_vip_patient($data)) {
                $result['status'] = true;
            }
        }

        //===============PACKAGES SECTION=====================================>
        if ($this->admission_model->delete_patient_old_record_from_package_table($caseno)) {
            $result['status'] = true;
        }

        $datenowpkg = $this->get_current_date();
        $datepkg = new DateTime($datenowpkg);
        $currentdatepkg = date_format($datepkg, 'Y-m-d');
        $useridpkg = $this->session->userdata("ID");
        $usernamepkg = $this->session->userdata("empname");

        $packagealldata = $this->input->post('inputname_packagemanadataadm');
        $pxpckgealldata = $this->input->post('inputname_pckgpatientdataadm');
        $packageacctnoadm = $this->input->post('textname_packageacctnoadm');

        if ($packagealldata !== "" && $pxpckgealldata !== "") {
            $packagedataexplode = explode("|", $packagealldata);
            $pxpckgedataexplode = explode("|", $pxpckgealldata);

            $data['pkgacctno'] = $packageacctnoadm;
            $data['pkgrefcode'] = $packagedataexplode[10];
            $data['pkgdocreferenceno'] = $packagedataexplode[4];
            $data['pkglname'] = $pxpckgedataexplode[6];
            $data['pkgfname'] = $pxpckgedataexplode[8];
            $data['pkgmname'] = $pxpckgedataexplode[7];
            $data['pkgsuffix'] = $pxpckgedataexplode[9];
            $data['pkgpatientname'] = $pxpckgedataexplode[0];
            $data['pkgaddress'] = $pxpckgedataexplode[10];
            $data['pkgcityadrs'] = $pxpckgedataexplode[11];
            $data['pkgcontactnumber'] = $pxpckgedataexplode[1];
            $data['pkgreligion'] = $pxpckgedataexplode[3];
            $data['pkgbday'] = $pxpckgedataexplode[5];
            $data['pkgageuponenrollment'] = $pxpckgedataexplode[4];
            $data['pkgsex'] = $pxpckgedataexplode[2];
            //        $data['pkgphilhealthkind']     = 
            //        $data['pkgphicidno']           = 
            //        $data['pkghmoid']              = 
            //        $data['pkghmoname']            = 
            $data['pkgpackagerefcode'] = $packagedataexplode[0];
            $data['pkgpackagecode'] = $packagedataexplode[5];
            $data['pkgpackageprice'] = $packagedataexplode[6];
            $data['pkgpin'] = $pxpckgedataexplode[12];
            $data['pkgpincode'] = $pxpckgedataexplode[14];
            $data['pkgIPDacctcode'] = $this->input->post('hiddeninputname_casecodexadm');
            $data['pkgIPDacctno'] = $this->input->post('inputname_accountnumberadm');
            $data['pkgslcode'] = $pxpckgedataexplode[13];
            $data['pkgadmitdate'] = $currentdatepkg;
            $data['pkgdischargedate'] = $currentdatepkg;
            $data['pkgenrolldate'] = $packagedataexplode[3];
            $data['pkgactive'] = 1;
            $data['pkgrecby'] = $usernamepkg;
            $data['pkgrecid'] = $useridpkg;
            $data['pkgupdated'] = $data['updated'];
            $data['pkgupdatedid'] = $useridpkg;
            $data['pkgupdatedby'] = $usernamepkg;
            //        $data['pkginchargeID']        = 
            $data['pkgincharge'] = $packagedataexplode[2];
            //        $data['pkgreferedID']         =  
            $data['pkgreferedby'] = $packagedataexplode[7];
            $data['pkgdocrefno'] = $packagedataexplode[4];
            $data['pkgdocname'] = $packagedataexplode[8];
            //        $data['pkgprenatalID']        =  
            $data['pkgnotes'] = $packagedataexplode[9];
            $data['pkgstation'] = strtoupper(gethostbyaddr($_SERVER['REMOTE_ADDR']));
            $data['pkgtotaldeposit'] = 0;
            $data['pkgstatus'] = "ACTIVE";

            if ($this->admission_model->insert_new_package_enrollment($data)) {
                $result['status'] = true;
            }
        }
        
        //===============INPATIENT SUB INSERTION=====================================>
        if ($this->admission_model->delete_patient_old_record_from_inpxsub_table($caseno))
        {
            $result['status'] = true;
        }

        $pathologyIS = $this->input->post('inputname_pathologyadm');
        $gravidainIS = $this->input->post('inputname_gravidaadm');
        $paraadminIS = $this->input->post('inputname_paraadm');
        $abortionnIS = $this->input->post('inputname_abortionadm');
        $iufdadminIS = $this->input->post('inputname_iufdadm');
        $diedadminIS = $this->input->post('inputname_diedadm');
        $linkaccntIS = $this->input->post('inputname_linkaccountadm');
        $infacilitIS = $this->input->post('hiddboxname_infalityvalueadm');

        if ($pathologyIS === "PATHOLOGY") 
        {
            $pathologyadm = 1;
        }
        else
        {
            $pathologyadm = 0;
        }

        $data['inspincode'] = $this->input->post('hiddeninputname_pincodeadm');
        $data['inscasecode'] = $this->input->post('hiddeninputname_casecodexadm');
        $data['inscaseno'] = $this->input->post('inputname_accountnumberadm');
        $data['insname'] = $data['name'];
        $data['insbday'] = $this->input->post('inputname_birthdayadm');
        $data['insupdated'] = $data['updated'];
        $data['insupdatedby'] = $this->session->userdata("empname");
        $data['inspartialpayment'] = 0;
//        $data['inslastpayment']        = 
//        $data['inslastpayreferenceno'] = 
        $data['insgravida'] = $gravidainIS;
        $data['inspara'] = $paraadminIS;
        $data['insabortion'] = $abortionnIS;
        $data['insiufd'] = $iufdadminIS;
        $data['insdied'] = $diedadminIS;
        $data['inspathologic'] = $pathologyadm;
        $data['inslinkaccount'] = $linkaccntIS;
        $data['insinfacilitydelivery'] = $infacilitIS;
//        $data['insadmitdateverified
//        $data['insadmitdateverifiedby
//        $data['insadmitdateverifieddatetime
//        $data['insdischadateverifiedby
//        $data['insdischadateverified
//        $data['insdischadateverifieddatetime

        if ($this->admission_model->add_inpatient_sub_data($data)) {
            $result['status'] = true;
        }
        
        //===============SLACCOUNT SECTION=======================================>
        $slaccount = $this->admission_model->generate_sl_code($data["slcode"]);
        if (!$slaccount)
        {
            $data['slcSLCODE'] = $data["slcode"];
            $data["slcSLDSCR"] = $data["name"];
            $data["slcSLADRS"] = $data['adrs'] . " " . $data['brgy'] . " " . $data['cityadd'] . ", " . $data['provadd'];
            $data["slcCOAREFNO"] = "";
            $data['slcREFNO'] = $data['PIN'];
            $data['slcTIN'] = $this->input->post('hiddenname_tindadm');
            $data['slcPINcode'] = $data['pincode'];
            $data['slczipcode'] = $data['zipcode'];
            $data['slcSLSTATUS'] = 1;
            $data['slcSysmade'] = 'NUR';
            $data['slcupdatedby'] = $this->session->userdata("empname");
            $data['slcupdated'] = $data['updated'];
            $data['slcgrouping'] = 'PATIENT';
            $data['slcstatus'] = 'OPEN';

            if ($this->admission_model->insert_new_slcode_for_admission($data)) {
                $result['status'] = true;
            }
        }

        //===============VITALSIGNS INSERTION=====================================>
        if ($this->admission_model->delete_patient_old_record_from_vitalsigns_table($caseno)) 
        {
            $result['status'] = true;
        }
        
        date_default_timezone_set('Asia/Manila');
        $data['vitdate'] = date('Y-m-d');
        $data['vitdatetime'] = date('Y-m-d H:i:s');
        $data['vitpatient'] = $data["name"];
        $data['vitpin'] = $data['PIN'];
        $data['vitpincode'] = $data['pincode'];
        $data['vitcaseno'] = $data['caseno'];
        $data['vitcasecode'] = $data["casecode"];
        $data['vitbp_numerator'] = $this->input->post('textboxname_bpnumeratoradm');
        $data['vitbp_denominator'] = $this->input->post('textboxname_bpdenominatoradm');
        $data['vitpulse_rate'] = $this->input->post('textboxname_pulserateadm');
        $data['vitbody_temperature'] = $this->input->post('textboxname_bodytemperatureadm');
        $data['vitrespiratory_rate'] = $this->input->post('textboxname_respiratoryrateadm');
        $data['vit_24hrintake'] = "";
        $data['vit_24hroutput'] = "";
        $data['vitstool'] = "";
        $data['vitageunder'] = "";
        $data['viturine'] = "";
        $data['vitupdated'] = $data['updated'];
        $data['vitupdated_by'] = $this->session->userdata("empname");

        if ($patienttypeadm === "IPD") 
        {
            if($nurincha === "Select" || $nurincha === null)
            {
                $data["vitnurse_incharge"] = "";
                $data["vitnurse_ref_no"] = "";
            }
            else
            {
                $data["vitnurse_incharge"] = strtoupper($splitnurinc[0]);
                $data["vitnurse_ref_no"] = strtoupper($splitnurinc[1]);
            }
        }
        else 
        {
            $data['vitnurse_incharge'] = "";
            $data['vitnurse_ref_no'] = "";
        }

        if ($this->admission_model->add_vital_signs_data($data)) 
        {
            $result['status'] = true;
        }

        //===============INPATIENT INSERTION=====================================>
        if ($this->admission_model->update_admitted_patient($data, $caseno)) 
        {
            $result['status'] = true;
        }
        echo json_encode($result); 
    }

    public function SupervisorAccess() {
        $result = array
            (
            'status' => false,
            'error_acct' => false,
            'error_head' => false,
            'error_pass' => false,
            'error_access' => false,
            'error_change' => false,
            'error_active' => false
        );

        $data['suprvisorid'] = $this->input->post('suprvisorid');
        $data['suppassword'] = $this->input->post('suppassword');

        $suprvisoridx = $this->input->post('suprvisorid');
        $suppasswordx = $this->input->post('suppassword');

        $usersrights_data = $this->admission_model->get_inserted_supervisorIDs_adminsys_from_usersrights($suprvisoridx, $suppasswordx);
        $fetchedadminsys = intval($usersrights_data['Adminsys']);

        $valid = $this->admission_model->check_supervisor_id($data);

        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        $this->form_validation->set_rules('suprvisorid', 'Supervisor ID', 'required');
        $this->form_validation->set_rules('suppassword', 'Password', 'required');

        if ($this->form_validation->run() == FALSE) {
            $errors['suprvisorid'] = form_error('suprvisorid');
            $errors['suppassword'] = form_error('suppassword');

            $result = ['error_status' => FALSE, 'errors' => $errors];
        } else {
            if (count($valid) > 0) {
                if (intval($valid['mobileapp']) === 1) {
                    if ($this->admission_model->check_supervisor_pass($data)) {

                        if ($fetchedadminsys === 1) {
                            $result['status'] = true;
                        } else {
                            $result['error_head'] = true;
                        }
                    } else {
                        $result['error_pass'] = true;
                    }
                } else {
                    $result['error_access'] = true;
                }
            } else {
                $result['error_acct'] = true;
            }
        }
        echo json_encode($result);
    }

    public function getUserSupervisor() {
        $result = array('status' => FALSE);
        $userpascodex = $this->input->post('userpascodex');

        $empmasterlist_data = $this->admission_model->get_current_user_supervisor_from_empmasterlist($userpascodex);

        if ($empmasterlist_data) {
            $result["empmasterlistdata"] = $empmasterlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function getInsertedSuprvisorIDPasscode() {
        $result = array('status' => FALSE);
        $suprvisoridx = $this->input->post('suprvisoridx');

        $usersrights_data = $this->admission_model->get_inserted_supervisorIDs_passcode_from_usersrights($suprvisoridx);

        if ($usersrights_data) {
            $result["usersrightsdata"] = $usersrights_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }

    public function CreateLogForEditPatientMasterlist() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);

        $datenow = $this->get_current_date();
        $date = new DateTime($datenow);
        $currentfulldate = date_format($date, 'Y-m-d h:i:s');

        $adminidx = "admin";
        $adminsys = "1";

        $usersrights_data = $this->admission_model->get_current_user_supervisor_from_usersrights($adminidx, $adminsys);

        $data = array();

        $data["userid"] = $this->session->userdata("ID");
        $data["username"] = $this->input->post('userempnamex', TRUE);
        $data["supervid"] = $usersrights_data['ID'];
        $data["superv"] = $usersrights_data['EmpName'];
        $data["function"] = "PATIENT MASTERLIST EDITING";
        $data["description"] = $this->input->post('descriptionx', TRUE);
        $data["station"] = $hostname;
        $data["datetrans"] = $currentfulldate;
        $data["supervreason"] = $this->input->post('reasonofedtx', TRUE);
        $data["system"] = "HUB";
        $data["remoteoverride"] = 0;
        $data["logbookreference"] = $this->input->post('logbooksuprx', TRUE);

        $this->form_validation->set_rules('userempnamex', 'Current User', 'required');
        $this->form_validation->set_rules('reasonofedtx', 'Reason', 'required');

        if ($this->form_validation->run() == FALSE) {
            $errors['userempnamex'] = form_error('userempnamex');
            $errors['reasonofedtx'] = form_error('reasonofedtx');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {
            $this->admission_model->create_log_for_edit_patient_masterlist($data);
            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

    public function CreateLogForEditAdmittedPatient() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);

        $datenow = $this->get_current_date();
        $date = new DateTime($datenow);
        $currentfulldate = date_format($date, 'Y-m-d h:i:s');

        $adminidx = "admin";
        $adminsys = "1";

        $usersrights_data = $this->admission_model->get_current_user_supervisor_from_usersrights($adminidx, $adminsys);

        $data = array();

        $data["userid"] = $this->session->userdata("ID");
        $data["username"] = $this->input->post('userempnamex', TRUE);
        $data["supervid"] = $usersrights_data['ID'];
        $data["superv"] = $usersrights_data['EmpName'];
        $data["function"] = "PATIENT EDITING";
        $data["description"] = $this->input->post('descriptionx', TRUE);
        $data["station"] = $hostname;
        $data["datetrans"] = $currentfulldate;
        $data["supervreason"] = $this->input->post('reasonofedtx', TRUE);
        $data["system"] = "HUB";
        $data["remoteoverride"] = 0;
        $data["logbookreference"] = $this->input->post('logbooksuprx', TRUE);

        $this->form_validation->set_rules('userempnamex', 'Current User', 'required');
        $this->form_validation->set_rules('reasonofedtx', 'Reason', 'required');

        if ($this->form_validation->run() == FALSE) {
            $errors['userempnamex'] = form_error('userempnamex');
            $errors['reasonofedtx'] = form_error('reasonofedtx');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {
            $this->admission_model->create_log_for_edit_admitted_patient($data);
            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

    public function DisplayDiagnosisWithICD10RVS() {
        $type = $this->input->post('typex', TRUE);

        $result = $this->admission_model->fetch_admitdiag($type);

        $data = array();
        foreach ($result as $row) {
            $sub_array = array();

            $updatedate = new DateTime($row->lastupdate);
            $lastupdate = $updatedate->format('F j, Y h:i A');

            $sub_array[] = "";
            $sub_array[] = strtoupper($row->Diagnosis);
            $sub_array[] = strtoupper($row->ICDcode);
            $sub_array[] = strtoupper($row->CategDiag);
            $sub_array[] = strtoupper($row->CaseRate);
            $sub_array[] = strtoupper($row->HCIRate);
            $sub_array[] = strtoupper($row->PFrate);
            $sub_array[] = strtoupper($row->RUV);
            $sub_array[] = strtoupper($row->listtype);
            $sub_array[] = strtoupper($lastupdate);
            $sub_array[] = strtoupper($row->favorite);
            $sub_array[] = strtoupper($row->relatedicdcodes);
            $sub_array[] = strtoupper($row->CF2Diagnosis);
            $sub_array[] = strtoupper($row->refno);

            $data[] = $sub_array;
        }

        $output = array
            (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->admission_model->fetch_admitdiag_masterlist_data($type),
            "recordsFiltered" => $this->admission_model->fetch_admitdiag_masterlist_filtered_data($type),
            "data" => $data
        );

        echo json_encode($output);
    }

    /**
     * Get admission type 
     * @version 2020-02-03
     * @author AB Empeynado
     */
    public function getAdmissionType() {

        $result = $this->admission_model->get_Admission_Type();

        if ($result) {
            echo json_encode($result);
        } else {
            echo json_encode(false);
        }
    }

    public function getAdmissionTypeForAdmission() {
        $admissiontype = $this->admission_model->get_admission_type_for_admission();
        echo json_encode($admissiontype);
    }

    public function GenerateCaseNumber() 
    {
        $result = $this->admission_model->generate_accountno();
        echo json_encode($result);
    }
    
    public function GeneratePatientIndexno() 
    {
        $result = $this->admission_model->generate_pxindexno();
        echo json_encode($result);
    }
}
