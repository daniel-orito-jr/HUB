<?php

class Chat extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Patients_model', 'patients_model');
        $this->load->model('Chat_model', 'chat_m');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
    }

    public function index() {

        if ($this->has_logging_in()) {

            $data["page_title"] = "HUBv19 | Chat Room";
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $data["hosp_name"] = $this->admission_model->get_hospital();
            
            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/css/main.css',
                'assets/css/chatapp.css',
                'assets/css/color_skins.css');

            $data["js"] = array(
                'assets/vendors/plugins/jquery/jquery-v3.2.1.min.js',
                'assets/vendors/plugins/jquery-cookie/jquery.cookie.js',
                'assets/vendors/plugins/bootstrap/js/bootstrap.min.js',
//                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.js',
//                'assets/bundles/libscripts.bundle.js',
                'assets/bundles/vendorscripts.bundle.js',
                'assets/bundles/datatablescripts.bundle.js',
                'assets/vendors/plugins/jquery-datatable/buttons/dataTables.buttons.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.bootstrap4.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.colVis.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.print.min.js',
                'assets/bundles/mainscripts.bundle.js',
//                'assets/js/pages/forms/basic-form-elements.js',
//                'assets/vendors/plugins/jquery-datatable/jquery.dataTables.min.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/myjs/chat.js',
                'assets/myjs/globaljs.js');

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/chatroom', $data);
            $this->load->view('templates/footer', $data);
        } else {
            redirect('Login', 'refresh');
        }
    }

    public function GetDoctorsAndNurses() {
        $doctors = $this->chat_m->fetch_users();
        echo json_encode($doctors);
    }

    public function SaveConversation() {

        $sender = $this->session->userdata('hubuserPasscode');
        $reciever = $this->input->post('reciever');
        $message = $this->input->post('message');
        $img_name = 0;
        if (count($_FILES) > 0) {
            $target = "assets/conversations/";
            $files = explode(",", $_FILES['file']['name']);
            $message = $files[0];
            $sender = $files[1];
            $reciever = $files[2];
            $tmp = explode("php", $_FILES['file']['tmp_name']);
            $tmp = explode(".", $tmp[1]);
            $img_name = $sender . $reciever . $tmp[0];
            $target = $target . basename($img_name . '.jpg');
            move_uploaded_file($_FILES['file']['tmp_name'], $target);
        }

        $textfile_title = $sender . '-' . $reciever;
        $message = $sender . ',' . $reciever . ',' . $message . ',' . $img_name . "\r\n";
        $source = 'assets/conversations/' . $textfile_title . '.txt';
        if (!file_exists($source)) {
            $textfile_title = $reciever . '-' . $sender;
            $source = 'assets/conversations/' . $textfile_title . '.txt';
        }
        file_put_contents($source, $message, FILE_APPEND);
    }

    public function ReadConversation() {

        $sender = $this->session->userdata('hubuserPasscode');
        $reciever = $this->input->post('reciever');

        $data = array();
        $textfile_title = $sender . '-' . $reciever;
        $source = 'assets/conversations/' . $textfile_title . '.txt';
        if (!file_exists($source)) {
            $textfile_title = $reciever . '-' . $sender;
            $source = 'assets/conversations/' . $textfile_title . '.txt';
        }

        if ($fh = fopen($source, 'r')) {
            while (!feof($fh)) {
                $sub_array = explode(",", fgets($fh));
                if ($sub_array[0] == $sender) {
                    $sub_array[0] = 0; //right
                } else {
                    $sub_array[0] = 1; //left
                }
                $data[] = $sub_array;
            }
        }
        echo json_encode($data);
    }

    public function GetActiveUsers() {
        $day = date("d") + 0;
        $month = date("m") + 0;
        $year = date("Y");
        $data = array();
        $textfile_title = 'assets/conversations/' . $day . "-" . $month . "-" . $year . ".txt";
        if ($fh = fopen($textfile_title, 'r')) {
            while (!feof($fh)) {

                $spplitRN = explode("\r\n", fgets($fh));
                if ($spplitRN[0] != "") {
                    $split = explode(",", $spplitRN[0]);

                    $sub_array = array();
                    $sub_array[] = $split[0];
                    $sub_array[] = $split[1];
                    $data[] = $sub_array;
                }
            }
        }
        echo json_encode($data);
    }

}
