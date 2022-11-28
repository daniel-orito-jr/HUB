<?php

class MY_Controller extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function user_page($page = NULL, $data = NULL) {
        $data["cur_date"] = $this->get_current_date("lain");
        $data["yesss"] = $this->get_yester_dates();
        $data["lastmonth"] = $this->get_last_month();
        $data["year"] = $this->format_year();
        $data['first_day'] = $this->get_first_date();
        $data['last_day'] = $this->get_last_date();
        $data["hosp_name"] = $this->admission_model->get_hospital();
       
        $this->load->view('templates/header', $data);

        if ($page === NULL) {
            if ($this->has_logging_in()) {
                redirect('nurseassists/dashboard', 'refresh');
            } else {
                $this->load->view('pages/loginsignup', $data);
            }
        } else {
            if ($page === 'lockscreen') {
                
            } else {
                $this->load->view('templates/navbar', $data);
                $this->load->view('pages/' . $page, $data);
                $this->load->view('templates/footer', $data);
            }
        }
    }

    public function has_logging_in() 
    {
        if ($this->session->userdata('logged_in')) 
        {
            return TRUE;
        } 
        else
        {
            return FALSE;
        }
    }

    public function validate_admin() {
        if ($this->session->userdata('Adminsys') === "1") {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function validate_hr() {
        if ($this->session->userdata('HRsys') === "1") {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function set_session_data($data) {
        $newdata = array
        (
            'empname' => $data['EmpName'],
            'hubuserPasscode' => $data['Passcode'],
            'empid' => $data['EmpID'],
            'usertype' => $data['leveluser'],
            'department' => $data["depmnt"],
            'HRsys' => $data["HRsys"],
            'Adminsys' => $data["Adminsys"],
            'Payroll' => $data["Payroll"],
            'ID' => $data["ID"],
            'logged_in' => TRUE
        );

        $this->session->set_userdata($newdata);
    }

    public function format_money($money) {
        $m = number_format($money, 2);
        return '&#8369; ' . $m;
    }

    public static function format_moneyx($money) {
        $m = number_format($money, 2);
        return $m;
    }

    public function get_current_date($type = "server") {
        $now = new DateTime();
        return ($type === "server") ? $now->format('Y-m-d h:i:s') : $now->format('Y-m-d');
    }

    public function get_current_time($type = "server") {
        $now = new DateTime();
        return ($type === "server") ? $now->format('Y-m-d h:i:s') : $now->format('h:i:s');
    }

    public function format_date($date) {
        $now = new DateTime($date);
        return $now->format('m/d/Y ');
    }

    public function format_dates($date) {
        $now = new DateTime($date);
        return $now->format('m-d-Y h:i:s');
    }

    public function get_current_dates() {
        $now = new DateTime();
        return $now->format('m-d-Y');
    }

    public function get_YDMdate($date) {
        $now = new DateTime($date);
        return $now->format('Y-m-d');
    }

    public function get_yester_dates() {
        $now = new DateTime();
        $now->modify('-1 day');
        return $now->format('Y-m-d');
    }

    public function get_last_month() {
        $now = new DateTime();
        $now->modify('-1 month');
        return $now->format('Y-m');
    }

    public function format_datexx($date) {
        $now = new DateTime($date);
        return $now->format('F j, Y ');
    }

    public function format_year() {
        $now = new DateTime();
        return $now->format('Y');
    }

    public function format_date_month($date) {
        $now = new DateTime($date);
        return $now->format('F j ');
    }

    public function get_first_date() {
        $now = new DateTime();
        $noww = $now->format('Y-m-d');
        $monthstart = date("Y-m-01", strtotime($noww));

        $d = new DateTime($monthstart);
        return $d->format('Y-m-d');
    }

    public function get_last_date() {
        $now = new DateTime();
        $noww = $now->format('Y-m-d');
        $monthend = date("Y-m-t", strtotime($noww));

        $e = new DateTime($monthend);
        return $e->format('Y-m-d');
    }
    
    public static function format_datetime($date) {
        $now = new DateTime($date);
        return $now->format('F j, Y h:m A');
    }
    
    public static function format_month($date) {
        $now = new DateTime($date);
        return $now->format('F j, Y');
    }
    
    public static function format_time($date) {
        $now = new DateTime($date);
        return $now->format('h:m A');
    }

}
