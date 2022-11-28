<?php

class Login_model extends MY_Model {

    public function __construct() {
        parent::__construct();

        $this->cas_db = $this->load->database('casv2', true);
        $this->hub_db = $this->load->database('hubv2', true);
        $this->ams_db = $this->load->database('amsv1', true);
        $this->med_db = $this->load->database('medv2', true);
        $this->esched_db = $this->load->database('esched', true);
        $this->bms_db = $this->load->database('bmsv2', true);
        $this->pms_db = $this->load->database('pmsv2', true);
        $this->dweclaims_db = $this->load->database('dweclaims', true);
        $this->hls_db = $this->load->database('hlsv2', true);
        $this->hrs_db = $this->load->database('hrsv2', true);
        $this->csr_db = $this->load->database('csrv2', true);
        $this->hubuserlog_db = $this->load->database('hubuserlog', true);
        $this->epay_db = $this->load->database('epayv2', true);
        $this->messaging_db = $this->load->database('messaging', true);
        $this->hospv2_db = $this->load->database('hospv2', true);
        $this->localset_db = $this->load->database('localset', true);
    }

    public function check_username($data) 
    {
        $this->hub_db->select('*')
                ->from('usersrights')
                ->where('EmpID', $data['uname']);

        $query = $this->hub_db->get();
        return $query->row_array();
    }

    public function check_pass($data) {
        $this->hub_db->select('*')
                ->from('usersrights')
                ->where('EmpID', $this->security->xss_clean($data['uname']))
                ->where('EmpPass', $this->encrypt_pass($data['pword']));

        $query = $this->hub_db->get();
        return (count($query->row_array()) !== 0) ? TRUE : FALSE;
    }

    public function sign_in($data) {
        $this->hub_db->select('*')
                ->from('usersrights')
                ->where('EmpPass', $this->encrypt_pass($data['pword']))
                ->where('EmpID', $this->security->xss_clean($data['uname']));

        $query = $this->hub_db->get();
        return $query->row_array();
    }

    public function check_if_head($profileno) {
        $prof = $profileno;
        if ($profileno == "") {
            $prof = $this->security->xss_clean($this->session->userdata('hubuserPasscode'));
        }
        $this->epay_db->select('*')
                ->from('deptlist')
                ->where('deptheadno', $prof);
        $query = $this->epay_db->get();
        return $query->result();
    }
    
       public function get_hospital() {
        $this->db->select("*")
                ->from(profile_tbl);
        $query = $this->db->get();
        return $query->row_array();
    }

}
