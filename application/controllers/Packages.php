<?php

class Packages extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Packages_model', 'packages_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
    }

    public function index() 
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | Packages Management";
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $data["hosp_name"] = $this->admission_model->get_hospital();
            $data['accountnumber'] = $this->packages_model->getPackageAcctNo();
            $now = new DateTime();
            $currentfulldate = date_format($now, "mdYHis");
            $data['refcode']   = $currentfulldate."51ENROLL";
            $datenow = $this->get_current_date();
            $date = new DateTime($datenow);
            $data["currentdate"] = date_format($date, 'Y-m-d');
            
            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
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
                'assets/vendors/plugins/sweetalert/sweetalert.min.js',
                'assets/bundles/mainscripts.bundle.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/myjs/packages.js');

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/packages', $data);
            $this->load->view('templates/footer', $data);
            $this->load->view('modals/package_management', $data);
        } 
        else 
        {
            redirect('Login', 'refresh');
        }
    }

    public function DisplayPackages() 
    {
        $result = $this->packages_model->fetch_packages_masterlist_datatables();
        $data = array();
        foreach ($result as $row) 
        {
            $updateddate = new DateTime($row->updated);
            $newupdateddate = $updateddate->format('F j, Y h:i A');
            
            $sub_array = array();
            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update Package" onclick="editPackage(' . $row->refno . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;' 
                         . '<button class="btn btn-sm btn-danger" title="Delete Package" onclick="deletePackage(' . $row->refno . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;'
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
            $sub_array[] = $newupdateddate;
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
    
    
    public function AddPackage() 
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila'); 

        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        $client = $this->input->ip_address();

        $data = array();
        $data['patientname'] = strtoupper($this->input->post('packagepatientnamex', TRUE));
        $data['contactnumber'] = strtoupper($this->input->post('packagecontactinfox', TRUE));
        $data['bday'] = strtoupper($this->input->post('packagebirthdayx', TRUE));
        $data['ageuponenrollment'] = strtoupper($this->input->post('packageagex', TRUE));
        $data['sex'] = strtoupper($this->input->post('packagesexx', TRUE));
        $data['religion'] = strtoupper($this->input->post('packagereligionx', TRUE));
        $data['incharge'] = strtoupper($this->input->post('packageorientedbyx', TRUE));
        $data['enrolldate'] = strtoupper($this->input->post('packageenrollmentdatex', TRUE));
        $data['docreferenceno'] = strtoupper($this->input->post('packagedocumentrefnox', TRUE));
        $data['packagecode'] = strtoupper($this->input->post('packagecodex', TRUE));
        $data['packageprice'] = strtoupper($this->input->post('packagepricex', TRUE));
        $data['referedby'] = strtoupper($this->input->post('packagereferredbyx', TRUE));
        $data['docname'] = strtoupper($this->input->post('packagedoctorx', TRUE));
        $data['notes'] = strtoupper($this->input->post('packageremarksx', TRUE));
        $data['updated'] = $for_update;
        $data['station'] = gethostbyaddr($client);
        $data['recid'] = $this->input->post('accountidx', TRUE);
        $data['recby'] = $this->input->post('accountnamex', TRUE);
        $data['updatedid'] = $this->input->post('accountidx', TRUE);
        $data['updatedby'] = $this->input->post('accountnamex', TRUE);
        $data['acctno'] = $this->input->post('acctnox', TRUE);
        $data['refcode'] = $this->input->post('refcodex', TRUE);
        $data['lname'] = $this->input->post('lnamex', TRUE);
        $data['mname'] = $this->input->post('mnamex', TRUE);
        $data['fname'] = $this->input->post('fnamex', TRUE);
        $data['suffix'] = $this->input->post('suffixx', TRUE);
        $data['address'] = $this->input->post('addressx', TRUE);
        $data['cityadrs'] = $this->input->post('cityadrsx', TRUE);
        $data['pin'] = $this->input->post('pinx', TRUE);
        $data['slcode'] = $this->input->post('slcodex', TRUE);
        $data['pincode'] = $this->input->post('pincodex', TRUE);
        $data['packagerefcode'] = $this->input->post('packagerefcodex', TRUE);
        $data['docrefno'] = $this->input->post('docrefnox', TRUE);

        $this->form_validation->set_rules('packagepatientnamex', 'Patient Name', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('packagecontactinfox', 'Contact Number', 'required|min_length[2]|max_length[30]');
        $this->form_validation->set_rules('packagebirthdayx', 'Birthday', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packageagex', 'Age', 'required|min_length[0]|max_length[3]');
        $this->form_validation->set_rules('packagereligionx', 'Religion', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packageorientedbyx', 'Oriented By', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packageenrollmentdatex', 'Enrollment Date', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagedocumentrefnox', 'Doc.Ref.No.', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagecodex', 'Package Code', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagepricex', 'Package Price', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagereferredbyx', 'Refered By', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('packagedoctorx', 'Doctor', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('packageremarksx', 'Remarks', 'required|min_length[3]|max_length[50]');

        if ($this->form_validation->run() == FALSE)
        {
            $errors['packagepatientname'] = form_error('packagepatientnamex');
            $errors['packagecontactinfo'] = form_error('packagecontactinfox');
            $errors['packagebirthday'] = form_error('packagebirthdayx');
            $errors['packageage'] = form_error('packageagex');
            $errors['packagereligion'] = form_error('packagereligionx');
            $errors['packageorientedby'] = form_error('packageorientedbyx');
            $errors['packageenrollmentdate'] = form_error('packageenrollmentdatex');
            $errors['packagedocumentrefno'] = form_error('packagedocumentrefnox');
            $errors['packagecode'] = form_error('packagecodex');
            $errors['packageprice'] = form_error('packagepricex');
            $errors['packagereferredby'] = form_error('packagereferredbyx');
            $errors['packagedoctor'] = form_error('packagedoctorx');
            $errors['packageremarks'] = form_error('packageremarksx');

            $result = ['status' => FALSE, 'errors' => $errors];
        }
        else
        {
            $result = $this->packages_model->add_package($data);
            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }
    
    public function AddPackage2() 
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila'); 

        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        $client = $this->input->ip_address();

        $data = array();
//        $data['patientname'] = strtoupper($this->input->post('packagepatientnamex', TRUE));
//        $data['contactnumber'] = strtoupper($this->input->post('packagecontactinfox', TRUE));
//        $data['bday'] = strtoupper($this->input->post('packagebirthdayx', TRUE));
//        $data['ageuponenrollment'] = strtoupper($this->input->post('packageagex', TRUE));
//        $data['sex'] = strtoupper($this->input->post('packagesexx', TRUE));
//        $data['religion'] = strtoupper($this->input->post('packagereligionx', TRUE));
//        $data['incharge'] = strtoupper($this->input->post('packageorientedbyx', TRUE));
//        $data['enrolldate'] = strtoupper($this->input->post('packageenrollmentdatex', TRUE));
//        $data['docreferenceno'] = strtoupper($this->input->post('packagedocumentrefnox', TRUE));
//        $data['packagecode'] = strtoupper($this->input->post('packagecodex', TRUE));
//        $data['packageprice'] = strtoupper($this->input->post('packagepricex', TRUE));
//        $data['referedby'] = strtoupper($this->input->post('packagereferredbyx', TRUE));
//        $data['docname'] = strtoupper($this->input->post('packagedoctorx', TRUE));
//        $data['notes'] = strtoupper($this->input->post('packageremarksx', TRUE));
//        $data['updated'] = $for_update;
//        $data['station'] = gethostbyaddr($client);
//        $data['recid'] = $this->input->post('accountidx', TRUE);
//        $data['recby'] = $this->input->post('accountnamex', TRUE);
//        $data['updatedid'] = $this->input->post('accountidx', TRUE);
//        $data['updatedby'] = $this->input->post('accountnamex', TRUE);
//        $data['acctno'] = $this->input->post('acctnox', TRUE);
//        $data['refcode'] = $this->input->post('refcodex', TRUE);
//        $data['lname'] = $this->input->post('lnamex', TRUE);
//        $data['mname'] = $this->input->post('mnamex', TRUE);
//        $data['fname'] = $this->input->post('fnamex', TRUE);
//        $data['suffix'] = $this->input->post('suffixx', TRUE);
//        $data['address'] = $this->input->post('addressx', TRUE);
//        $data['cityadrs'] = $this->input->post('cityadrsx', TRUE);
//        $data['pin'] = $this->input->post('pinx', TRUE);
//        $data['slcode'] = $this->input->post('slcodex', TRUE);
//        $data['pincode'] = $this->input->post('pincodex', TRUE);
//        $data['packagerefcode'] = $this->input->post('packagerefcodex', TRUE);
//        $data['docrefno'] = $this->input->post('docrefnox', TRUE);

        $this->form_validation->set_rules('packagepatientnamex', 'Patient Name', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('packagecontactinfox', 'Contact Number', 'required|min_length[2]|max_length[30]');
        $this->form_validation->set_rules('packagebirthdayx', 'Birthday', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packageagex', 'Age', 'required|min_length[0]|max_length[7]');
        $this->form_validation->set_rules('packagereligionx', 'Religion', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packageorientedbyx', 'Oriented By', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packageenrollmentdatex', 'Enrollment Date', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagedocumentrefnox', 'Doc.Ref.No.', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagecodex', 'Package Code', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagepricex', 'Package Price', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagereferredbyx', 'Refered By', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('packagedoctorx', 'Doctor', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('packageremarksx', 'Remarks', 'required|min_length[3]|max_length[50]');

        if ($this->form_validation->run() == FALSE)
        {
            $errors['packagepatientname'] = form_error('packagepatientnamex');
            $errors['packagecontactinfo'] = form_error('packagecontactinfox');
            $errors['packagebirthday'] = form_error('packagebirthdayx');
            $errors['packageage'] = form_error('packageagex');
            $errors['packagereligion'] = form_error('packagereligionx');
            $errors['packageorientedby'] = form_error('packageorientedbyx');
            $errors['packageenrollmentdate'] = form_error('packageenrollmentdatex');
            $errors['packagedocumentrefno'] = form_error('packagedocumentrefnox');
            $errors['packagecode'] = form_error('packagecodex');
            $errors['packageprice'] = form_error('packagepricex');
            $errors['packagereferredby'] = form_error('packagereferredbyx');
            $errors['packagedoctor'] = form_error('packagedoctorx');
            $errors['packageremarks'] = form_error('packageremarksx');

            $result = ['status' => FALSE, 'errors' => $errors];
        }
        else
        {
//            $result = $this->packages_model->add_package($data);
            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }
    
    public function GetAllPatientForPackage() {

        $fetched_data = $this->packages_model->fetch_all_patients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {
            $sub_array = array();

            $sub_array[] = "<button class='btn btn-sm btn-warning waves-effect' title='Edit Patient' onclick=showEditPatientModal('" . $row->id . "')><i class='zmdi zmdi-edit'></i></button>&nbsp;
                            <button class='btn btn-sm btn-danger waves-effect' title='Delete Patient' onclick=deletePatient('" . $row->id . "')><i class='zmdi zmdi-delete'></i></button>&nbsp;";
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
            "recordsTotal" => $this->packages_model->fetch_all_patients_masterlist_data(),
            "recordsFiltered" => $this->packages_model->fetch_all_patients_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function GetAllDoctors() {

        $fetched_data = $this->packages_model->fetch_doctors_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {

            $sub_array = array();

//            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editDoctors(' . $row->doccd . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
//                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteDoctors(' . $row->doccd . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = "";
            $sub_array[] = $row->doclname;
            $sub_array[] = $row->docfname;
            $sub_array[] = $row->titlename;
            $sub_array[] = $row->Licno;
            $sub_array[] = $row->PTR;
            $sub_array[] = $row->S2no;
            $sub_array[] = $row->phicno;
            $sub_array[] = $row->tin;
            $sub_array[] = $row->proftype;
            $sub_array[] = $row->phicenable;
            $sub_array[] = $row->phicrate;
            $sub_array[] = $row->pfrate;
            $sub_array[] = $row->adrs;
            $sub_array[] = $row->lastupdate;
            $sub_array[] = $row->doccode;
            $sub_array[] = $row->cellno;
            $sub_array[] = $row->accountno;
            $sub_array[] = $row->coaOPD;
            $sub_array[] = $row->coaIPD;
            $sub_array[] = $row->tax;
            $sub_array[] = $row->docrefno;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->packages_model->fetch_doctors_masterlist_data(),
            "recordsFiltered" => $this->packages_model->fetch_doctors_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function SearchSelectedDoctors() 
    {
        $ref_num = $this->input->post('refno', TRUE);
        $result = $this->packages_model->get_selected_doctors($ref_num);
        echo json_encode($result);
    }
    
    public function UpdatePackage()
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        $refno = strtoupper($this->input->post('refnox', TRUE));
        date_default_timezone_set('Asia/Manila'); 
        $date = date("mdYHis");

        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        $client = $this->input->ip_address();

        $data = array();
        
        $data['patientname'] = strtoupper($this->input->post('packagepatientnamex', TRUE));
        $data['contactnumber'] = strtoupper($this->input->post('packagecontactinfox', TRUE));
        $data['bday'] = strtoupper($this->input->post('packagebirthdayx', TRUE));
        $data['ageuponenrollment'] = strtoupper($this->input->post('packageagex', TRUE));
        $data['sex'] = strtoupper($this->input->post('packagesexx', TRUE));
        $data['religion'] = strtoupper($this->input->post('packagereligionx', TRUE));
        $data['incharge'] = strtoupper($this->input->post('packageorientedbyx', TRUE));
        $data['enrolldate'] = strtoupper($this->input->post('packageenrollmentdatex', TRUE));
        $data['docreferenceno'] = strtoupper($this->input->post('packagedocumentrefnox', TRUE));
        $data['packagecode'] = strtoupper($this->input->post('packagecodex', TRUE));
        $data['packageprice'] = strtoupper($this->input->post('packagepricex', TRUE));
        $data['referedby'] = strtoupper($this->input->post('packagereferredbyx', TRUE));
        $data['docname'] = strtoupper($this->input->post('packagedoctorx', TRUE));
        $data['notes'] = strtoupper($this->input->post('packageremarksx', TRUE));
        $data['updated'] = strtoupper($for_update);
        $data['station'] = strtoupper(gethostbyaddr($client));
        $data['recid'] = strtoupper($this->input->post('accountidx', TRUE));
        $data['recby'] = strtoupper($this->input->post('accountnamex', TRUE));
        $data['updatedid'] = strtoupper($this->input->post('accountidx', TRUE));
        $data['updatedby'] = strtoupper($this->input->post('accountnamex', TRUE));
        $data['acctno'] = strtoupper($refno);
        $data['refcode'] = strtoupper($this->input->post('refcodex', TRUE));
        $data['lname'] = strtoupper($this->input->post('lnamex', TRUE));
        $data['mname'] = strtoupper($this->input->post('mnamex', TRUE));
        $data['fname'] = strtoupper($this->input->post('fnamex', TRUE));
        $data['suffix'] = strtoupper($this->input->post('suffixx', TRUE));
        $data['address'] = strtoupper($this->input->post('addressx', TRUE));
        $data['cityadrs'] = strtoupper($this->input->post('cityadrsx', TRUE));
        $data['pin'] = strtoupper($this->input->post('pinx', TRUE));
        $data['slcode'] = strtoupper($this->input->post('slcodex', TRUE));
        $data['pincode'] = strtoupper($this->input->post('pincodex', TRUE));
        $data['packagerefcode'] = strtoupper($this->input->post('packagerefcodex', TRUE));
        $data['docrefno'] = strtoupper($this->input->post('docrefnox', TRUE));

        $this->form_validation->set_rules('packagepatientnamex', 'Patient Name', 'required|min_length[1]|max_length[50]');
        $this->form_validation->set_rules('packagecontactinfox', 'Contact Number', 'required|min_length[2]|max_length[30]');
        $this->form_validation->set_rules('packagebirthdayx', 'Birthday', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagereligionx', 'Religion', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packageorientedbyx', 'Oriented By', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packageenrollmentdatex', 'Enrollment Date', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagedocumentrefnox', 'Doc.Ref.No.', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagecodex', 'Package Code', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagepricex', 'Package Price', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('packagereferredbyx', 'Refered By', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('packagedoctorx', 'Doctor', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('packageremarksx', 'Remarks', 'required|min_length[3]|max_length[50]');

        if ($this->form_validation->run() == FALSE)
        {
            $errors['packagepatientname'] = form_error('packagepatientnamex');
            $errors['packagecontactinfo'] = form_error('packagecontactinfox');
            $errors['packagebirthday'] = form_error('packagebirthdayx');
            $errors['packageage'] = form_error('packageagex');
            $errors['packagereligion'] = form_error('packagereligionx');
            $errors['packageorientedby'] = form_error('packageorientedbyx');
            $errors['packageenrollmentdate'] = form_error('packageenrollmentdatex');
            $errors['packagedocumentrefno'] = form_error('packagedocumentrefnox');
            $errors['packagecode'] = form_error('packagecodex');
            $errors['packageprice'] = form_error('packagepricex');
            $errors['packagereferredby'] = form_error('packagereferredbyx');
            $errors['packagedoctor'] = form_error('packagedoctorx');
            $errors['packageremarks'] = form_error('packageremarksx');

            $result = ['status' => FALSE, 'errors' => $errors];
        }
        else
        {
            $result = $this->packages_model->update_package_admission($refno, $data);

            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }
    
    public function DeletePackage() 
    {
        $refno = $this->input->post('refno');
        $result = $this->packages_model->delete_package($refno);
        echo json_encode($result);
    }
    
    public function GeneratePackageCode() 
    {
        $result = $this->packages_model->generate_package_acctno();
        echo json_encode($result);
    }
    
    public function getPackageDataForCheckDuplicateAcctnoOfAdmitPatient() 
    {
        $result = array('status' => FALSE);

        $pckgeacctno = $this->input->post('packageacctnox');
        $pckgeacctno_data = $this->packages_model->get_data_from_package_enrollees_for_admitpatient_check_duplicate_acctno($pckgeacctno);

        if ($pckgeacctno_data) 
        {
            $result["packageaccntno"] = $pckgeacctno_data;
            $result['status'] = true;
        }
        
        echo json_encode($result);
    }
    
    public function getPackageDataForCheckDuplicateAcctnoOfPackageForm() 
    {
        $result = array('status' => FALSE);

        $pckgeacctno = $this->input->post('acctnox');
        $pckgeacctno_data = $this->packages_model->get_data_from_package_enrollees_for_admitpatient_check_duplicate_acctno($pckgeacctno);

        if ($pckgeacctno_data) 
        {
            $result["packageaccntno"] = $pckgeacctno_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function SearchSelectedPackage() 
    {
        $pkgacctno = $this->input->post('pckgeacctno', TRUE);
        $result = $this->packages_model->get_selected_package($pkgacctno);
        echo json_encode($result);
    }
}
