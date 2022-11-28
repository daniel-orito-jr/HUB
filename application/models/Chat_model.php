<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Chat_model
 *
 * @author DrainwizSupport
 */
class Chat_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
        $this->hubv2 = $this->load->database('hubv2', true);
    }

    public function fetch_doctors() {
       $this->hospv2_db->select('*')
                ->from('doctors');
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }
    
    public function fetch_users(){
         $this->hubv2->select('*')
                ->from(userstbl_vw)
                  ->where('profileno != ',$this->session->userdata('hubuserPasscode'));
        $query = $this->hubv2->get();
        return $query->result_array();
    }

}
