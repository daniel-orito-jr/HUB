<?php

class Login extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Login_model', 'login_model');
    }

    public function index() 
    {
        if ($this->has_logging_in())
        {
            redirect('dashboard');
        }
        else 
        {
            $data["hosp_name"] = $this->login_model->get_hospital();
            $this->load->view('login/login', $data);
        }
    }

    public function SignIn() {
        $result = array('status' => false, 'error_acct' => false, 'error_pass' => false, 'error_access' => false, 'error_change' => false, 'error_active' => false);
        $data['uname'] = $this->input->post('username');
        $data['pword'] = $this->input->post('password');

        //for form validation
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        $this->form_validation->set_rules('username', 'Username', 'required|min_length[3]|max_length[20]');
        $this->form_validation->set_rules('password', 'Password', 'required|min_length[3]|max_length[20]');

        if ($this->form_validation->run() == FALSE)
        {
            $errors['username'] = form_error('username');
            $errors['password'] = form_error('password');

            $result = ['error_status' => FALSE, 'errors' => $errors];
        } 
        else 
        {
            $valid = $this->login_model->check_username($data);

            if (count($valid) > 0) 
            {
                if (intval($valid['mobileapp']) === 1) 
                {
                    if ($this->login_model->check_pass($data)) 
                    {
                        $result['user'] = $this->login_model->sign_in($data);
//                        $head = array();
//                        if ($result['user']) 
//                        {
////                            $head = $this->login_model->check_if_head($result['user']['profileno']);
////                            if (count($head) > 0) 
////                            {
//                                $this->session->set_userdata('head', 1);
//                                $this->session->set_userdata('deptname', $head[0]->departmentname);
//                                $this->session->set_userdata('deptcode', $head[0]->deptcode);
////                            }
//                        }
                        $this->set_session_data($result['user']);
                        $result['status'] = true;
                        $result['HRsys'] = $result['user']['HRsys'];
                        $result['Adminsys'] = $result['user']['Adminsys'];
//                        $result['empCategory'] = $result['user']['empCategory'];
                        $result['payroll'] = $result['user']['Payroll'];

                        //----------old data
//                        $result['user'] = $this->login_model->sign_in($data);
//                        $this->set_session_data($result['user']);
//                        $result['ID'] = $result['user']['ID'];
//                        $this->activeuser();
//                        $result['empname'] = $result['user']['empname'];
//                        $result['status'] = true;
                    } 
                    else 
                    {
                        $result['error_pass'] = true;
                    }
                }
                else 
                {
                    $result['error_access'] = true;
                }
            } 
            else 
            {
                $result['error_acct'] = true;
            }
        }

        echo json_encode($result);
    }

    public function sign_out() {
        $this->userlogout();
        $this->session->unset_userdata('logged_in');
        $this->session->sess_destroy();
        redirect('login');
    }

    public function create_log($action) {
        $this->load->library('user_agent');

        $data = array();

        $data["action"] = $action;
        $data["type"] = ($this->agent->is_mobile()) ? "mobile" : "pc";
        $data["os"] = $this->agent->platform();
        $data["name"] = $this->agent->mobile();
        $data["browser"] = $this->agent->browser() . ' ' . $this->agent->version();

        $this->weblog_model->insert_log($data);
    }

    public function activeuser() {
        $day = date("d") + 0;
        $month = date("m") + 0;
        $year = date("Y");
        $prev_day = ($day - 1);
        $prev_month = ($month - 1);
        $textfile_title = 'assets/conversations/' . $day . "-" . $month . "-" . $year . ".txt";
        $check_file = $prev_day . "-" . $prev_month . "-" . $year . ".txt";
        if (file_exists('assets/conversations/' . $check_file)) {
            $target = 'assets/conversations/' . $check_file;
            unlink($target);
        }
        $contents = file_get_contents($textfile_title);
        $result = str_replace($this->session->userdata('hubuserPasscode') . ",0" . "\r\n", $this->session->userdata('hubuserPasscode') . ",1" . "\r\n", $contents);
        if ($fh = fopen($textfile_title, 'r')) {
            var_dump(!feof($fh));
            while (!feof($fh)) {
                $spplitRN = explode(",", fgets($fh));
                if ($spplitRN[0] == $this->session->userdata('hubuserPasscode')) {
                    file_put_contents($textfile_title, $result);
                }
            }
        }

        if ($result == "") {
            file_put_contents($textfile_title, $this->session->userdata('hubuserPasscode') . ",1" . "\r\n", FILE_APPEND);
        } else {
            file_put_contents($textfile_title, $result);
        }
    }

    public function userlogout() {
        $day = date("d") + 0;
        $month = date("m") + 0;
        $year = date("Y");
        $textfile_title = 'assets/conversations/' . $day . "-" . $month . "-" . $year . '.txt';
        $contents = file_get_contents($textfile_title);
        $newContent = str_replace($this->session->userdata('hubuserPasscode') . ",1" . "\r\n", $this->session->userdata('hubuserPasscode') . ",0" . "\r\n", $contents);
        file_put_contents($textfile_title, $newContent);
    }

}
