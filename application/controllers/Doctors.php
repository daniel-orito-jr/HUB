<?php

class Doctors extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Doctors_model', 'doctors_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
        
    }

    public function index() {

        if ($this->has_logging_in()) {

            $data["page_title"] = "HUBv19 | Doctors Management";
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $data["hosp_name"] = $this->admission_model->get_hospital();
            
            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/vendors/plugins/sweetalert/sweetalert.css',
//                'assets/vendors/plugins/multi-select/css/multi-select.css',
//                'assets/vendors/plugins/select2/css/select2.css',
                'assets/css/main.css',
                'assets/css/myCSS.css',
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
//                'assets/vendors/plugins/multi-select/js/jquery.multi-select.js',
//                'assets/vendors/plugins/select2/js/select2.min.js',
//                'assets/js/pages/forms/basic-form-elements.js',
//                'assets/vendors/plugins/jquery-datatable/jquery.dataTables.min.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/myjs/slcodemanagement.js',
                'assets/myjs/coamanagement.js',
                'assets/myjs/patientmasterlist.js',
                'assets/myjs/doctors.js');

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/doctors', $data);
            $this->load->view('templates/footer', $data);
            $this->load->view('modals/slcode_management', $data);
            $this->load->view('modals/coa_management', $data);
            $this->load->view('modals/patientmasterlist', $data);
        } else {
            redirect('Login', 'refresh');
        }
    }

    /**
     * Get all doctors from the doctors model and returns a data to the datatable.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function GetAllDoctors() {

        $fetched_data = $this->doctors_model->fetch_doctors_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editDoctors(' . $row->doccd . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteDoctors(' . $row->doccd . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';

            $sub_array[] = $row->doclname;
            $sub_array[] = $row->docfname;
            $sub_array[] = $row->docmname;
            $sub_array[] = $row->suffix;
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
            $sub_array[] = $row->emailadd;
            $sub_array[] = $row->docrefno;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->doctors_model->fetch_doctors_masterlist_data(),
            "recordsFiltered" => $this->doctors_model->fetch_doctors_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    /**
     * Sends the inputted value from the forms to doctors model to be inserted to the database
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function AddDoctors() {

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

        $data['doccode'] = strtoupper($this->input->post('docCode', TRUE));
        $data['docrefno'] = strtoupper($this->input->post('docrefno', TRUE));
        $data['tax'] = strtoupper($this->input->post('tax', TRUE));
        $data['Licno'] = strtoupper($this->input->post('licenseNumber', TRUE));
        $data['PTR'] = strtoupper($this->input->post('ptrNo', TRUE));
        $data['S2no'] = strtoupper($this->input->post('s2No', TRUE));
        $data['phicno'] = strtoupper($this->input->post('phicNo', TRUE));
        $data['tin'] = strtoupper($this->input->post('tin', TRUE));
        $data['phicenable'] = strtoupper($this->input->post('phicEnable', TRUE));
        $data['phicrate'] = strtoupper($this->input->post('phicRate', TRUE));
        $data['pfrate'] = strtoupper($this->input->post('pfRate', TRUE));
        $data['coaOPD'] = strtoupper($this->input->post('coaOPD', TRUE));
        $data['coaIPD'] = strtoupper($this->input->post('coaIPD', TRUE));
        $data['accountno'] = strtoupper($this->input->post('accountNo', TRUE));
        $data['docfname'] = strtoupper($this->input->post('firstName', TRUE));
        $data['doclname'] = strtoupper($this->input->post('lastName', TRUE));
        $data['docmname'] = strtoupper($this->input->post('middleName', TRUE));
        $data['suffix'] = strtoupper($this->input->post('suffix', TRUE));
        $data['titlename'] = strtoupper($this->input->post('title', TRUE));
        $data['docname'] = strtoupper($this->input->post('docName', TRUE) . ' , ' . $this->input->post('title', TRUE));
        $data['adrs'] = strtoupper($this->input->post('address', TRUE));
        $data['proftype'] = $this->input->post('professionType', TRUE);
        $data['issuehospOR'] = strtoupper($this->input->post('hospitalOR', TRUE));
        $data['lastupdate'] = $for_update;
        $data['station'] = gethostbyaddr($client);
        $data['recid'] = $this->input->post('accountId', TRUE);
        $data['recby'] = $this->input->post('accountName', TRUE);
        $data['catg'] = $category;
        $data['expertise'] = strtoupper($this->input->post('expertise', TRUE));
        $data['profgroup'] = strtoupper($this->input->post('profGroup', TRUE));
        $data['clinichours'] = strtoupper($this->input->post('schedule', TRUE));
        $data['biodata'] = strtoupper($this->input->post('biodata', TRUE));
        $data['otherinfo'] = strtoupper($this->input->post('otherInformation', TRUE));
        $data['clinicroom'] = strtoupper($this->input->post('clinicRoom', TRUE));

        $this->form_validation->set_rules('tax', 'Tax', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('title', 'Title', 'required|min_length[2]|max_length[20]');
        $this->form_validation->set_rules('licenseNumber', 'License Number', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('ptrNo', 'PTR No', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('s2No', 'S2 No', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('phicNo', 'PHIC No', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('tin', 'TIN', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('phicRate', 'PHIC Rate', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('pfRate', 'PF Rate', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('coaOPD', 'COA OPD', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('coaIPD', 'COA IPD', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('accountNo', 'Account No', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('firstName', 'First Name', 'required|min_length[3]|max_length[20]');
        $this->form_validation->set_rules('lastName', 'Last Name', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('middleName', 'Middle Name', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('docName', 'Doc Name', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('address', 'Address', 'required|min_length[5]|max_length[50]');

        if ($this->form_validation->run() == FALSE) {
            $errors['title'] = form_error('title');
            $errors['licensenumber'] = form_error('licenseNumber');
            $errors['tax'] = form_error('tax');
            $errors['ptrno'] = form_error('ptrNo');
            $errors['s2no'] = form_error('s2No');
            $errors['phicno'] = form_error('phicNo');
            $errors['tin'] = form_error('tin');
            $errors['phicrate'] = form_error('phicRate');
            $errors['pfrate'] = form_error('pfRate');
            $errors['coaopd'] = form_error('coaOPD');
            $errors['coaipd'] = form_error('coaIPD');
            $errors['accountno'] = form_error('accountNo');
            $errors['firstname'] = form_error('firstName');
            $errors['lastname'] = form_error('lastName');
            $errors['middlename'] = form_error('middleName');
            $errors['docname'] = form_error('docName');
            $errors['address'] = form_error('address');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $result = $this->doctors_model->add_doctors($data); //Send to the doctors model add_doctors function

            $result = ['status' => TRUE];
        }


        echo json_encode($result);
    }

    /**
     * Get the selected doctors data that the user wants to edit and pass it to the doctors model.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function SearchSelectedDoctors() {

        $doc_code = $this->input->post('docCode', TRUE);

        $result = $this->doctors_model->get_selected_doctors($doc_code);

        echo json_encode($result);
    }

    /**
     * Get the selected data and send it to the doctors model so that it will be updated to the database.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function UpdateDoctors() 
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        $doc_code = $this->input->post('doccd', TRUE);

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

        $data['doccode'] = strtoupper($this->input->post('docCode', TRUE));
        $data['tax'] = strtoupper($this->input->post('tax', TRUE));
        $data['Licno'] = strtoupper($this->input->post('licenseNumber', TRUE));
        $data['PTR'] = strtoupper($this->input->post('ptrNo', TRUE));
        $data['S2no'] = strtoupper($this->input->post('s2No', TRUE));
        $data['phicno'] = strtoupper($this->input->post('phicNo', TRUE));
        $data['tin'] = strtoupper($this->input->post('tin', TRUE));
        $data['phicenable'] = $this->input->post('phicEnable', TRUE);
        $data['phicrate'] = strtoupper($this->input->post('phicRate', TRUE));
        $data['pfrate'] = strtoupper($this->input->post('pfRate', TRUE));
        $data['coaOPD'] = strtoupper($this->input->post('coaOPD', TRUE));
        $data['coaIPD'] = strtoupper($this->input->post('coaIPD', TRUE));
        $data['accountno'] = strtoupper($this->input->post('accountNo', TRUE));
        $data['docfname'] = strtoupper($this->input->post('firstName', TRUE));
        $data['doclname'] = strtoupper($this->input->post('lastName', TRUE));
        $data['docmname'] = strtoupper($this->input->post('middleName', TRUE));
        $data['suffix'] = strtoupper($this->input->post('suffix', TRUE));
        $data['titlename'] = strtoupper($this->input->post('title', TRUE));
        $data['docname'] = strtoupper($this->input->post('docName', TRUE));
        $data['adrs'] = strtoupper($this->input->post('address', TRUE));
        $data['proftype'] = $this->input->post('professionType', TRUE);
        $data['issuehospOR'] = $this->input->post('hospitalOR', TRUE);
        $data['lastupdate'] = $for_update;
        $data['station'] = gethostbyaddr($client);
        $data['recid'] = $this->input->post('accountId', TRUE);
        $data['recby'] = $this->input->post('accountName', TRUE);
        $data['catg'] = $category;

        $this->form_validation->set_rules('tax', 'Tax', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('title', 'Title', 'required|min_length[2]|max_length[20]');
        $this->form_validation->set_rules('licenseNumber', 'License Number', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('ptrNo', 'PTR No', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('s2No', 'S2 No', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('phicNo', 'PHIC No', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('tin', 'TIN', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('phicRate', 'PHIC Rate', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('pfRate', 'PF Rate', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('coaOPD', 'COA OPD', 'required|min_length[5]|max_length[20]');
//        $this->form_validation->set_rules('coaIPD', 'COA IPD', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('accountNo', 'Account No', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('firstName', 'First Name', 'required|min_length[3]|max_length[20]');
        $this->form_validation->set_rules('lastName', 'Last Name', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('middleName', 'Middle Name', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('docName', 'Doc Name', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('address', 'Address', 'required|min_length[5]|max_length[50]');

        if ($this->form_validation->run() == FALSE) {
            $errors['title'] = form_error('title');
            $errors['licensenumber'] = form_error('licenseNumber');
            $errors['tax'] = form_error('tax');
            $errors['ptrno'] = form_error('ptrNo');
            $errors['s2no'] = form_error('s2No');
            $errors['phicno'] = form_error('phicNo');
            $errors['tin'] = form_error('tin');
            $errors['phicrate'] = form_error('phicRate');
            $errors['pfrate'] = form_error('pfRate');
            $errors['coaopd'] = form_error('coaOPD');
            $errors['coaipd'] = form_error('coaIPD');
            $errors['accountno'] = form_error('accountNo');
            $errors['firstname'] = form_error('firstName');
            $errors['lastname'] = form_error('lastName');
            $errors['middlename'] = form_error('middleName');
            $errors['docname'] = form_error('docName');
            $errors['address'] = form_error('address');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $result = $this->doctors_model->update_doctors($doc_code, $data);

            $result = ['status' => TRUE];
        }


        echo json_encode($result);
    }

    /**
     * Get the selected doctors data that the user wants to delete and pass it to the doctors model.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function DeleteDoctors() {

        $doc_code = $this->input->post('docCode');

        $result = $this->doctors_model->delete_doctors($doc_code);

        echo json_encode($result);
    }

    /**
     * Generate auto_increment doctors code.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function GenerateDoctorsCode() {

        $result = $this->doctors_model->generate_doctors_code();

        echo json_encode($result);
    }

}
