<?php

class Rooms extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Rooms_model', 'rooms_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
    }

    public function index() {

        if ($this->has_logging_in()) {

            $data["page_title"] = "HUBv19 | Rooms Management";
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
                'assets/myjs/rooms.js',
//                'assets/myjs/admission.js',
                'assets/myjs/globaljs.js');

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/rooms', $data);
            $this->load->view('templates/footer', $data);
        } else {
            redirect('Login', 'refresh');
        }
    }

    /**
     *  used to fetch rooms in database and return it to rooms.js getRooms()  
     * @version 01-18-2019
     * @author Reymar S. Putian
     */
    public function DisplayRooms() {

        $result = $this->rooms_model->fetch_rooms();
        $data = array();
        foreach ($result as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editRooms(' . $row->rmid . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteRooms(' . $row->rmid . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = $row->rmrefno;
            $sub_array[] = $row->rmcode;
            $sub_array[] = $row->rmtype;
            $sub_array[] = $row->rmno;
            $sub_array[] = $row->rmbed;
            $sub_array[] = $row->rmdscr;
            $sub_array[] = $row->rmrate;
            $sub_array[] = $row->nursing;
            $sub_array[] = $row->pricedefault;
            $sub_array[] = $row->crmaxlimit;
            $sub_array[] = $row->phictype;
            $sub_array[] = $row->stationname;
            $sub_array[] = $row->patientname;
            $sub_array[] = $row->admit_date;

            $data[] = $sub_array;
        }

        $output = array
            (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->rooms_model->fetch_rooms_masterlist_data(),
            "recordsFiltered" => $this->rooms_model->fetch_rooms_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    /**
     * Sends the inputted value from the rooms form to rooms model to be inserted to the database
     * @version 2019-01-31
     * @author LJ Roa
     */
    public function AddRooms() {

        //for form validation
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        //For reference no in database
        $date = new DateTime();
        $date_and_time_today = new DateTime();
        $format_date_time = $date_and_time_today->format('Y-m-d h:i:s');
        $format_date = $date->format('mdYhis');
        $rooms_ref_no = $format_date . 'RM';

        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //Get client machine ip address
        $client = $this->input->ip_address();

        $data = array();

        $data['rmtype'] = $this->input->post('roomsType', TRUE);
        $data['rmno'] = strtoupper($this->input->post('roomsName', TRUE));
        $data['rmrefno'] = ltrim($rooms_ref_no, '0');
        $data['rmbed'] = strtoupper($this->input->post('bedNo', TRUE));
        $data['rmdscr'] = strtoupper($this->input->post('description', TRUE));
        $data['rmcode'] = strtoupper($this->input->post('roomsCode', TRUE));
        $data['rmrate'] = strtoupper($this->input->post('roomsRate', TRUE));
        $data['crmaxlimit'] = strtoupper($this->input->post('creditMaximum', TRUE));
        $data['updated'] = $for_update;
        $data['recid'] = $this->input->post('accountId', TRUE);
        $data['station'] = strtoupper(gethostbyaddr($client));
        $data['recby'] = $this->input->post('accountName', TRUE);
        $data['stationname'] = $this->input->post('station', TRUE);
        $data['RmPHICtype'] = $this->input->post('phicRoomsType', TRUE);
        $data['nursing'] = $this->input->post('nursingServices', TRUE);
        $data['nurseperday'] = $this->input->post('perDay', TRUE);

        $this->form_validation->set_rules('roomsName', 'Rooms Name', 'required|min_length[3]|max_length[30]');
        $this->form_validation->set_rules('bedNo', 'Bed No', 'required|min_length[1]|max_length[5]');
        $this->form_validation->set_rules('description', 'Description', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('roomsRate', 'Rooms Rate', 'required|min_length[1]|max_length[10]');
        $this->form_validation->set_rules('creditMaximum', 'Credit Maximum', 'required|min_length[1]|max_length[10]');
        $this->form_validation->set_rules('nursingServices', 'Nursing Services', 'required|min_length[1]|max_length[10]');

        if ($this->form_validation->run() == FALSE) { //if field does not meet the required inputs
            $errors['roomsname'] = form_error('roomsName');
            $errors['bedno'] = form_error('bedNo');
            $errors['description'] = form_error('description');
            $errors['creditmaximum'] = form_error('creditMaximum');
            $errors['nursingservices'] = form_error('nursingServices');
            $errors['roomsrate'] = form_error('roomsRate');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $this->rooms_model->add_rooms($data);

            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

    /**
     * Get the selected rooms data that the user wants to edit and pass it to the rooms model.
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function SearchSelectedRooms() {

        $code = $this->input->post('code', TRUE);

        $result = $this->rooms_model->get_selected_rooms($code);

        echo json_encode($result);
    }

    /**
     * Get the selected data and send it to the rooms model so that it will be updated to the database.
     * @version 2019-01-31
     * @author LJ Roa
     */
    public function UpdateRooms() {

        //for form validation
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //Get client machine ip address
        $client = $this->input->ip_address();

        //code for database insertion index
        $code = $this->input->post('code', TRUE);

        $data = array();

        $data['rmtype'] = $this->input->post('roomsType', TRUE);
        $data['rmno'] = strtoupper($this->input->post('roomsName', TRUE));
        $data['rmbed'] = strtoupper($this->input->post('bedNo', TRUE));
        $data['rmdscr'] = strtoupper($this->input->post('description', TRUE));
        $data['rmcode'] = strtoupper($this->input->post('roomsCode', TRUE));
        $data['rmrate'] = strtoupper($this->input->post('roomsRate', TRUE));
        $data['crmaxlimit'] = strtoupper($this->input->post('creditMaximum', TRUE));
        $data['updated'] = $for_update;
        $data['recid'] = $this->input->post('accountId', TRUE);
        $data['station'] = strtoupper(gethostbyaddr($client));
        $data['recby'] = $this->input->post('accountName', TRUE);
        $data['stationname'] = $this->input->post('station', TRUE);
        $data['RmPHICtype'] = $this->input->post('phicRoomsType', TRUE);
        $data['nursing'] = $this->input->post('nursingServices', TRUE);
        $data['nurseperday'] = $this->input->post('perDay', TRUE);

        $this->form_validation->set_rules('roomsName', 'Rooms Name', 'required|min_length[3]|max_length[30]');
        $this->form_validation->set_rules('bedNo', 'Bed No', 'required|min_length[1]|max_length[5]');
        $this->form_validation->set_rules('description', 'Description', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('roomsRate', 'Rooms Rate', 'required|min_length[1]|max_length[10]');
        $this->form_validation->set_rules('creditMaximum', 'Credit Maximum', 'required|min_length[1]|max_length[10]');
        $this->form_validation->set_rules('nursingServices', 'Nursing Services', 'required|min_length[1]|max_length[10]');

        if ($this->form_validation->run() == FALSE) { //if field does not meet the required inputs
            $errors['roomsname'] = form_error('roomsName');
            $errors['bedno'] = form_error('bedNo');
            $errors['description'] = form_error('description');
            $errors['creditmaximum'] = form_error('creditMaximum');
            $errors['nursingservices'] = form_error('nursingServices');
            $errors['roomsrate'] = form_error('roomsRate');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $this->rooms_model->update_rooms($code, $data);

            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

    public function DeleteRooms() {

        $id = $this->input->post('code', TRUE);

        $result = $this->rooms_model->delete_rooms($id);

        echo json_encode($result);
    }

    /**
     * Generate auto_increment rooms code.
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function GenerateRoomsCode() {

        $result = $this->rooms_model->generate_rooms_code();

        echo json_encode($result);
    }

}
