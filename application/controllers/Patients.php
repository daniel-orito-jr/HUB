<?php

class Patients extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Patients_model', 'patients_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
    }

    public function index() {
        if ($this->has_logging_in()) 
        {

            $data["page_title"] = "HUBv19 | Patients Masterlist";
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
//            $data['accountnumber'] = $this->patients_model->getAccountNumber();
//            $data['slcodexnumber'] = $this->patients_model->getSLcodexNumber();
//            $data['casenumberget'] = $this->patients_model->fetchsCaseNumber();
//            
//            $data["phmembershipx"] = $this->patients_model->getphmembershipx();
//            $data["religionlistx"] = $this->patients_model->getReligionlistx();
//            $data["nationalityxs"] = $this->patients_model->getNationalityxs();
//            $data["provincelistx"] = $this->patients_model->getProvincelistx();
//            $data["citymunicipal"] = $this->patients_model->getCityMunicipal();
//            $data["membertypepro"] = $this->patients_model->getMemberTypepro();
//            $data["memberlisting"] = $this->patients_model->getMemberListing();
//            $data["doctorlisting"] = $this->patients_model->getDoctorListing();
//            $data["nurseslisting"] = $this->patients_model->getNursesListing();
////            $data["roomszlisting"] = $this->patients_model->getRoomzsListing();
////            $data["hospitalfromz"] = $this->patients_model->getHospitListing();
//            
//            $datenow = $this->get_current_date();
//            $date = new DateTime($datenow);
//            $data["currentyear"] = date_format($date, 'Y');
            
            $data["hosp_name"] = $this->admission_model->get_hospital();

            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/vendors/plugins/sweetalert/sweetalert.css',
//                'assets/vendors/plugins/multi-select/css/multi-select.css',
//                'assets/vendors/plugins/select2/css/select2.css',
                'assets/css/main.css',
                'assets/css/color_skins.css');

            $data["js"] = array(
                'assets/vendors/plugins/jquery/jquery-v3.2.1.min.js',
//                'assets/vendors/plugins/bootstrap/js/bootstrap.min.js',
//                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.js',
                'assets/bundles/libscripts.bundle.js',
                'assets/bundles/vendorscripts.bundle.js',
                'assets/bundles/datatablescripts.bundle.js',
                'assets/vendors/plugins/jquery-datatable/buttons/dataTables.buttons.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.bootstrap4.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.colVis.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.print.min.js',
                'assets/vendors/plugins/sweetalert/sweetalert.min.js',
                'assets/bundles/mainscripts.bundle.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/myjs/patients.js',
                'assets/myjs/globaljs.js');

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/patients', $data);
            $this->load->view('templates/footer', $data);
        }
        else 
        {
            redirect('Login', 'refresh');
        }
    }

    /**
     * Get all doctors from the doctors model and returns a data to the datatable.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function GetAllInPatients() {

        $fetched_data = $this->patients_model->fetch_inpatients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();

            $discharged = $row->discharged;
            if($discharged === "1")
            {
                $status = "DISCHARGED";
            }
            else 
            {
                $status = "ADMITTED";
            }

            $sub_array[] = $row->name;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->caseno;
            $sub_array[] = $status;
            $sub_array[] = $row->HRnCODE;
            $sub_array[] = $row->bday;
            $sub_array[] = $row->sex;
            $sub_array[] = $row->lastdischdate;
            $sub_array[] = $row->adrs.", ".$row->brgy;
            $sub_array[] = $row->cityadd;
            $sub_array[] = $row->pincode;
            $sub_array[] = $row->updated;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->patients_model->fetch_inpatients_masterlist_data(),
            "recordsFiltered" => $this->patients_model->fetch_inpatients_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    
    public function GetAdmittedInPatients() {

        $fetched_data = $this->patients_model->fetch_admitted_inpatients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) 
        {
            if (!isset($counter)) {
                $counter = 0;
            }

            $counter++;

            $time = time();

            $dummy = "?dummy=" . $time . $counter;
            
            
            
            $imgbaseurlad = base_url();
            $imglocationx = "assets/images/uploads/patients/";
            $imagedefault = "default.png";
            $imgfilenamex = $row->PIN . "p.jpg";
            $imgidpic = $row->PIN . "p";
            
            $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex . $dummy;
            $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;

            $discharged = $row->discharged;
            
            if($discharged === "1")
            {
                $status = "DISCHARGED";
            }
            else 
            {
                $status = "ADMITTED";
            }
            
            $sub_array = array();
            
            $sub_array[] = "";
            
            if (@getimagesize($completeimglocation)) 
            {
                $sub_array[] = "<img src='" . $completeimglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            else
            {
                $sub_array[] = "<img src='" . $defaultimaglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            
            $sub_array[] = $row->name;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->caseno;
            $sub_array[] = $status;
            $sub_array[] = $row->HRnCODE;
            $sub_array[] = $row->bday;
            $sub_array[] = $row->sex;
            $sub_array[] = $row->lastdischdate;
            $sub_array[] = $row->adrs.", ".$row->brgy;
            $sub_array[] = $row->cityadd;
            $sub_array[] = $row->pincode;
            $sub_array[] = $row->updated;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->patients_model->fetch_admitted_inpatients_masterlist_data(),
            "recordsFiltered" => $this->patients_model->fetch_admitted_inpatients_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    
    
    public function GetDischargedInPatients() {

        $fetched_data = $this->patients_model->fetch_discharged_inpatients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) 
        {
            if (!isset($counter)) {
                $counter = 0;
            }

            $counter++;

            $time = time();

            $dummy = "?dummy=" . $time . $counter;
            
            
            
            $imgbaseurlad = base_url();
            $imglocationx = "assets/images/uploads/patients/";
            $imagedefault = "default.png";
            $imgfilenamex = $row->PIN . "p.jpg";
            $imgidpic = $row->PIN . "p";
            
            $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex . $dummy;
            $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;
            
            
            $discharged = $row->discharged;
            if($discharged === "1")
            {
                $status = "DISCHARGED";
            }
            else 
            {
                $status = "ADMITTED";
            }
            
            $sub_array = array();

            $sub_array[] = "";
            
            if (@getimagesize($completeimglocation)) 
            {
                $sub_array[] = "<img src='" . $completeimglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            else
            {
                $sub_array[] = "<img src='" . $defaultimaglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            
            $sub_array[] = $row->name;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->caseno;
            $sub_array[] = $status;
            $sub_array[] = $row->HRnCODE;
            $sub_array[] = $row->bday;
            $sub_array[] = $row->sex;
            $sub_array[] = $row->lastdischdate;
            $sub_array[] = $row->adrs.", ".$row->brgy;
            $sub_array[] = $row->cityadd;
            $sub_array[] = $row->pincode;
            $sub_array[] = $row->updated;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->patients_model->fetch_discharged_inpatients_masterlist_data(),
            "recordsFiltered" => $this->patients_model->fetch_discharged_inpatients_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    
    
    
    
    
    
    
    

    /**
     * Sends the inputted value from the forms to doctors model to be inserted to the database
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function AddPatient()
    {

        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila'); //Get manila timezone
        $date = date("mdYHis"); //Get date and time base on timezone
        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //Get client machine ip address
        $client = $this->input->ip_address();

        $profession_type = $this->input->post('professionType', TRUE);
        $category = '';

        if ($profession_type == 'General') {
            $category = 'GEN';
        } else if ($profession_type == 'Specialist') {
            $category = 'SPE';
        } else if ($profession_type == 'w/Training') {
            $category = 'TRA';
        } else {
            $category = 'DFL';
        }

        //Initialize the value from the serialize form and pass it to an array variable to be inserted to the database.
        $data = array();
        $data['taxtin'] = strtoupper($this->input->post('taxtin', TRUE));
        $data['slcode'] = strtoupper($this->input->post('slcode', TRUE));
        $data['pxindex'] = strtoupper($this->input->post('pxindex', TRUE));
        $data['phmembership'] = strtoupper($this->input->post('phmembership', TRUE));
        $data['phmember'] = strtoupper($this->input->post('phmember', TRUE));
        $data['phidnumb'] = strtoupper($this->input->post('phidnumb', TRUE));
        $data['healthrecno'] = strtoupper($this->input->post('healthrecno', TRUE));
        $data['oldrecord'] = strtoupper($this->input->post('oldrecord', TRUE));
        $data['membership'] = strtoupper($this->input->post('membership', TRUE));
        $data['fname'] = strtoupper($this->input->post('fname', TRUE));
        $data['lname'] = strtoupper($this->input->post('lname', TRUE));
        $data['mname'] = strtoupper($this->input->post('mname', TRUE));
        $data['suffix'] = strtoupper($this->input->post('suffix', TRUE));
        $data['emailadd'] = $this->input->post('emailadd', TRUE);
        $data['mobile'] = strtoupper($this->input->post('mobile', TRUE));
        $data['landline'] = strtoupper($this->input->post('landline', TRUE));
        $data['birthday'] = strtoupper($this->input->post('birthday', TRUE));
        $data['civilstatus'] = strtoupper($this->input->post('civilstatus', TRUE));
        $data['gender'] = strtoupper($this->input->post('gender', TRUE));
        $data['religion'] = strtoupper($this->input->post('religion', TRUE));
        $data['nationality'] = strtoupper($this->input->post('nationality', TRUE));
        $data['province'] = strtoupper($this->input->post('province', TRUE));
        $data['citymunicipal'] = strtoupper($this->input->post('citymunicipal', TRUE));
        $data['zipcode'] = strtoupper($this->input->post('zipcode', TRUE));
        $data['barangay'] = strtoupper($this->input->post('barangay', TRUE));
        $data['street'] = strtoupper($this->input->post('street', TRUE));
        $data['spouse'] = strtoupper($this->input->post('spouse', TRUE));
        $data['spousebday'] = strtoupper($this->input->post('spousebday', TRUE));
        $data['mothersname'] = strtoupper($this->input->post('mothersname', TRUE));
        $data['fathersname'] = strtoupper($this->input->post('fathersname', TRUE));
        $data['mothersadrs'] = strtoupper($this->input->post('mothersadrs', TRUE));
        $data['fathersadrs'] = strtoupper($this->input->post('fathersadrs', TRUE));
        $data['mothernation'] = strtoupper($this->input->post('mothernation', TRUE));
        $data['fathernation'] = strtoupper($this->input->post('fathernation', TRUE));
        $data['lastupdate'] = $for_update;
        $data['station'] = gethostbyaddr($client);
        $data['recid'] = $this->input->post('accountid', TRUE);
        $data['recby'] = $this->input->post('accountname', TRUE);
        $data['catg'] = $category;

        $this->form_validation->set_rules('taxtin', 'Tax', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('barangay', 'Barangay', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('healthrecno', 'Health Rec. No.', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('fname', 'First Name', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('lname', 'Last Name', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('mname', 'Middle Name', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('mobile', 'Mobile no.', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('birthday', 'Birthday', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('civilstatus', 'Civil Status', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('gender', 'Gender', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('religion', 'religion', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('nationality', 'nationality', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('province', 'province', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('citymunicipal', 'citymunicipal', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('zipcode', 'zipcode', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('street', 'street', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('mothersname', 'mothersname', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('fathersname', 'fathersname', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('mothersadrs', 'mothersadrs', 'required|min_length[1]|max_length[100]');
        $this->form_validation->set_rules('fathersadrs', 'fathersadrs', 'required|min_length[1]|max_length[100]');
        $this->form_validation->set_rules('mothernation', 'mothernation', 'required|min_length[1]|max_length[100]');
        $this->form_validation->set_rules('fathernation', 'fathernation', 'required|min_length[1]|max_length[100]');
        
        if ($this->form_validation->run() == FALSE) {
            $errors['taxtin'] = form_error('taxtin');
            $errors['barangay'] = form_error('barangay');
            $errors['healthrecno'] = form_error('healthrecno');
            $errors['fname'] = form_error('fname');
            $errors['lname'] = form_error('lname');
            $errors['mname'] = form_error('mname');
            $errors['mobile'] = form_error('mobile');
            $errors['birthday'] = form_error('birthday');
            $errors['civilstatus'] = form_error('civilstatus');
            $errors['gender'] = form_error('gender');
            $errors['religion'] = form_error('religion');
            $errors['nationality'] = form_error('nationality');
            $errors['province'] = form_error('province');
            $errors['citymunicipal'] = form_error('citymunicipal');
            $errors['zipcode'] = form_error('zipcode');
            $errors['street'] = form_error('street');
            $errors['mothersname'] = form_error('mothersname');
            $errors['fathersname'] = form_error('fathersname');
            $errors['mothersadrs'] = form_error('mothersadrs');
            $errors['fathersadrs'] = form_error('nationality');
            $errors['mothernation'] = form_error('mothernation');
            $errors['fathernation'] = form_error('fathernation');
            
            $result = ['status' => FALSE, 'errors' => $errors];
        }
        else 
        {
            $result = $this->patients_model->add_patients($data); //Send to the doctors model add_doctors function
            $result = ['status' => TRUE];
        }
        echo json_encode($result);
    }
//
//    /**
//     * Get the selected doctors data that the user wants to edit and pass it to the doctors model.
//     * @version 2019-01-17
//     * @author LJ Roa
//     */
//    public function SearchSelectedDoctors() {
//
//        $doc_code = $this->input->post('docCode', TRUE);
//
//        $result = $this->doctors_model->get_selected_doctors($doc_code);
//
//        echo json_encode($result);
//    }
//
//    /**
//     * Get the selected data and send it to the doctors model so that it will be updated to the database.
//     * @version 2019-01-17
//     * @author LJ Roa
//     */
//    public function UpdateDoctors() {
//
//        $doc_code = $this->input->post('doccd', TRUE);
//
//        date_default_timezone_set('Asia/Manila'); //Get manila timezone
//        $date = date("mdYHis"); //Get date and time base on timezone
//        //For update field in database
//        $update_record = new DateTime();
//        $for_update = $update_record->format('Y-m-d h:i:s');
//
//        //Get client machine ip address
//        $client = $this->input->ip_address();
//
//        $profession_type = $this->input->post('professionType', TRUE);
//        $category = '';
//
//        if ($profession_type == 'General') {
//            $category = 'GEN';
//        } else if ($profession_type == 'Specialist') {
//            $category = 'SPE';
//        } else if ($profession_type == 'w/Training') {
//            $category = 'TRA';
//        } else {
//            $category = 'DFL';
//        }
//
//
//        //Initialize the value from the serialize form and pass it to an array variable to be inserted to the database.
//        $data = array();
//
//        $data['doccode'] = strtoupper($this->input->post('docCode', TRUE));
//        $data['tax'] = strtoupper($this->input->post('tax', TRUE));
//        $data['Licno'] = strtoupper($this->input->post('licenseNumber', TRUE));
//        $data['PTR'] = strtoupper($this->input->post('ptrNo', TRUE));
//        $data['S2no'] = strtoupper($this->input->post('s2No', TRUE));
//        $data['phicno'] = strtoupper($this->input->post('phicNo', TRUE));
//        $data['tin'] = strtoupper($this->input->post('tin', TRUE));
//        $data['phicenable'] = $this->input->post('phicEnable', TRUE);
//        $data['phicrate'] = strtoupper($this->input->post('phicRate', TRUE));
//        $data['pfrate'] = strtoupper($this->input->post('pfRate', TRUE));
//        $data['coaOPD'] = strtoupper($this->input->post('coaOPD', TRUE));
//        $data['coaIPD'] = strtoupper($this->input->post('coaIPD', TRUE));
//        $data['accountno'] = strtoupper($this->input->post('accountNo', TRUE));
//        $data['docfname'] = strtoupper($this->input->post('firstName', TRUE));
//        $data['doclname'] = strtoupper($this->input->post('lastName', TRUE));
//        $data['docmname'] = strtoupper($this->input->post('middleName', TRUE));
//        $data['suffix'] = strtoupper($this->input->post('suffix', TRUE));
//        $data['titlename'] = strtoupper($this->input->post('title', TRUE));
//        $data['docname'] = strtoupper($this->input->post('docName', TRUE));
//        $data['adrs'] = strtoupper($this->input->post('address', TRUE));
//        $data['proftype'] = $this->input->post('professionType', TRUE);
//        $data['issuehospOR'] = $this->input->post('hospitalOR', TRUE);
//        $data['lastupdate'] = $for_update;
//        $data['station'] = gethostbyaddr($client);
//        $data['recid'] = $this->input->post('accountId', TRUE);
//        $data['recby'] = $this->input->post('accountName', TRUE);
//        $data['catg'] = $category;
//
//        $this->form_validation->set_rules('tax', 'Tax', 'required|min_length[1]|max_length[30]');
//        $this->form_validation->set_rules('title', 'Title', 'required|min_length[2]|max_length[20]');
//        $this->form_validation->set_rules('licenseNumber', 'License Number', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('ptrNo', 'PTR No', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('s2No', 'S2 No', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('phicNo', 'PHIC No', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('tin', 'TIN', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('phicRate', 'PHIC Rate', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('pfRate', 'PF Rate', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('coaOPD', 'COA OPD', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('coaIPD', 'COA IPD', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('accountNo', 'Account No', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('firstName', 'First Name', 'required|min_length[3]|max_length[20]');
//        $this->form_validation->set_rules('lastName', 'Last Name', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('middleName', 'Middle Name', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('docName', 'Doc Name', 'required|min_length[5]|max_length[30]');
//        $this->form_validation->set_rules('address', 'Address', 'required|min_length[5]|max_length[50]');
//
//        if ($this->form_validation->run() == FALSE) {
//            $errors['title'] = form_error('title');
//            $errors['licensenumber'] = form_error('licenseNumber');
//            $errors['tax'] = form_error('tax');
//            $errors['ptrno'] = form_error('ptrNo');
//            $errors['s2no'] = form_error('s2No');
//            $errors['phicno'] = form_error('phicNo');
//            $errors['tin'] = form_error('tin');
//            $errors['phicrate'] = form_error('phicRate');
//            $errors['pfrate'] = form_error('pfRate');
//            $errors['coaopd'] = form_error('coaOPD');
//            $errors['coaipd'] = form_error('coaIPD');
//            $errors['accountno'] = form_error('accountNo');
//            $errors['firstname'] = form_error('firstName');
//            $errors['lastname'] = form_error('lastName');
//            $errors['middlename'] = form_error('middleName');
//            $errors['docname'] = form_error('docName');
//            $errors['address'] = form_error('address');
//
//            $result = ['status' => FALSE, 'errors' => $errors];
//        } else {
//
//            $result = $this->doctors_model->update_doctors($doc_code, $data);
//
//            $result = ['status' => TRUE];
//        }
//
//
//        echo json_encode($result);
//    }
//
//    /**
//     * Get the selected doctors data that the user wants to delete and pass it to the doctors model.
//     * @version 2019-01-17
//     * @author LJ Roa
//     */
//    public function DeleteDoctors() {
//
//        $doc_code = $this->input->post('docCode');
//
//        $result = $this->doctors_model->delete_doctors($doc_code);
//
//        echo json_encode($result);
//    }
//
//    /**
//     * Generate auto_increment doctors code.
//     * @version 2019-01-17
//     * @author LJ Roa
//     */
//    public function GenerateDoctorsCode() {
//
//        $result = $this->doctors_model->generate_doctors_code();
//
//        echo json_encode($result);
//    }

}
