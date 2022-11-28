<?php

class Nurses extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Nurses_model', 'nurses_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
    }

    public function index() {

        if ($this->has_logging_in()) {

            $data["page_title"] = "HUBv19 | Nurses Management";
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $data["hosp_name"] = $this->admission_model->get_hospital();
            
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
                'assets/myjs/nurses.js',
                'assets/myjs/globaljs.js');

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/nurses', $data);
            $this->load->view('templates/footer', $data);
        } else {
            redirect('Login', 'refresh');
        }
    }

    /**
     * Get all nurses from the nurses model and returns a data to the datatable.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function GetAllNurses() {

        $fetched_data = $this->nurses_model->fetch_nurses_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editNurses(' . $row->doccd . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteNurses(' . $row->doccd . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';

            $sub_array[] = $row->doccode;
            $sub_array[] = $row->doclname;
            $sub_array[] = $row->docfname;
            $sub_array[] = $row->proftype;
            $sub_array[] = $row->PTR;
            $sub_array[] = $row->admitallow;
            $sub_array[] = $row->adrs;
            $sub_array[] = $row->lastupdate;
            $sub_array[] = $row->docrefno;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->nurses_model->fetch_nurses_masterlist_data(),
            "recordsFiltered" => $this->nurses_model->fetch_nurses_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    /**
     * Sends the inputted value from the nurses form to nurses model to be inserted to the database
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function AddNurses() {

        //for form validation
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        //For reference no in database
        $date = new DateTime();
        $date_and_time_today = new DateTime();
        $format_date_time = $date_and_time_today->format('Y-m-d h:i:s');
        $format_date = $date->format('mdYhis');
        $passcode = $format_date . 'RN';

        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //Get client machine ip address
        $client = $this->input->ip_address();

        $data = array();

        $data['doclname'] = strtoupper($this->input->post('lastName', TRUE));
        $data['docfname'] = strtoupper($this->input->post('firstName', TRUE));
        $data['docrefno'] = ltrim($passcode, '0');
        $data['doccode'] = strtoupper($this->input->post('hospCode', TRUE));
        $data['adrs'] = strtoupper($this->input->post('address', TRUE));
        $data['PTR'] = strtoupper($this->input->post('licenseNumber', TRUE));
        $data['proftype'] = strtoupper($this->input->post('profType', TRUE));
        $data['admitallow'] = strtoupper($this->input->post('allowAdmission', TRUE));
        $data['lastupdate'] = $for_update;
        $data['recid'] = $this->input->post('accountId', TRUE);
        $data['station'] = strtoupper(gethostbyaddr($client));
        $data['recby'] = $this->input->post('accountName', TRUE);
        $data['docname'] = strtoupper($this->input->post('firstName', TRUE) . ' ' . $this->input->post('lastName', TRUE) . ', ' . $this->input->post('profType', TRUE));

        $this->form_validation->set_rules('lastName', 'Last Name', 'required|min_length[3]|max_length[30]');
        $this->form_validation->set_rules('firstName', 'First Name', 'required|min_length[2]|max_length[30]');
        $this->form_validation->set_rules('address', 'Address', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('licenseNumber', 'License Number', 'required|min_length[5]|max_length[30]');

        if ($this->form_validation->run() == FALSE) { //if field does not meet the required inputs
            $errors['lastname'] = form_error('lastName');
            $errors['firstname'] = form_error('firstName');
            $errors['address'] = form_error('address');
            $errors['licensenumber'] = form_error('licenseNumber');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $this->nurses_model->add_nurses($data);

            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

    /**
     * Get the selected nurses data that the user wants to edit and pass it to the nurses model.
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function SearchSelectedNurses() {

        $code = $this->input->post('code', TRUE);

        $result = $this->nurses_model->get_selected_nurses($code);

        echo json_encode($result);
    }

    /**
     * Get the selected data and send it to the nurses model so that it will be updated to the database.
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function UpdateNurses() {

        //for form validation
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        //For reference no in database
        $date = new DateTime();
        $date_and_time_today = new DateTime();
        $format_date_time = $date_and_time_today->format('Y-m-d h:i:s');
        $format_date = $date->format('mdYhis');
        $passcode = $format_date . 'RN';

        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //Get client machine ip address
        $client = $this->input->ip_address();

        //code for database insertion index
        $code = $this->input->post('code', TRUE);

        $data = array();

        $data['doclname'] = strtoupper($this->input->post('lastName', TRUE));
        $data['docfname'] = strtoupper($this->input->post('firstName', TRUE));
        $data['doccode'] = strtoupper($this->input->post('hospCode', TRUE));
        $data['adrs'] = strtoupper($this->input->post('address', TRUE));
        $data['PTR'] = strtoupper($this->input->post('licenseNumber', TRUE));
        $data['proftype'] = strtoupper($this->input->post('profType', TRUE));
        $data['admitallow'] = strtoupper($this->input->post('allowAdmission', TRUE));
        $data['lastupdate'] = $for_update;
        $data['recid'] = $this->input->post('accountId', TRUE);
        $data['station'] = strtoupper(gethostbyaddr($client));
        $data['recby'] = $this->input->post('accountName', TRUE);
        $data['docname'] = strtoupper($this->input->post('firstName', TRUE) . ' ' . $this->input->post('lastName', TRUE) . ', ' . $this->input->post('profType', TRUE));

        $this->form_validation->set_rules('lastName', 'Last Name', 'required|min_length[3]|max_length[30]');
        $this->form_validation->set_rules('firstName', 'First Name', 'required|min_length[2]|max_length[30]');
        $this->form_validation->set_rules('address', 'Address', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('licenseNumber', 'License Number', 'required|min_length[5]|max_length[30]');

        if ($this->form_validation->run() == FALSE) { //if field does not meet the required inputs
            $errors['lastname'] = form_error('lastName');
            $errors['firstname'] = form_error('firstName');
            $errors['address'] = form_error('address');
            $errors['licensenumber'] = form_error('licenseNumber');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $this->nurses_model->update_nurses($code, $data);

            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

    public function DeleteNurses() {

        $code = $this->input->post('code');

        $result = $this->nurses_model->delete_nurses($code);

        echo json_encode($result);
    }

    /**
     * Generate auto_increment nurses code.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function GenerateNursesCode() {

        $result = $this->nurses_model->generate_nurses_code();

        echo json_encode($result);
    }

}
