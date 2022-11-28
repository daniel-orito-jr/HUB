<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dietary_model
 *
 * @author DrainwizSupport
 */
class Dietary_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->bmsv2 = $this->load->database('bmsv2', true);
    }

    public function fetch_dietary_guide() {
        $length = $this->input->post(['length']);
        $start = $this->input->post(['start']);
        $this->bmsv2->select('*');
        $this->select_from_dietary();
        if ($length['length'] != -1) {
            $this->bmsv2->limit($length['length'], $start['start']);
        }
        $query = $this->bmsv2->get();
        return $query->result_array();
    }

    public function select_from_dietary() {
        $this->bmsv2->from('dietcateg');
        $search = $this->input->post(['search']);
        $search_value = $search['search']['value'];
        $column_search = array("categdiag", "refno");
        $i = 0;
        foreach ($column_search as $item) { // loop column 
            if ($search_value != '') { // if datatable send POST for search
                if ($i === 0) { // first loop
                    $this->bmsv2->group_start(); // open bracket. query Where with OR clause better with bracket. because maybe can combine with other WHERE with AND.
                    $this->bmsv2->like($item, $search_value);
                } else {
                    $this->bmsv2->or_like($item, $search_value);
                }

                if (count($column_search) - 1 == $i) {
                    $this->bmsv2->group_end(); //close bracket
                }
            }
            $i++;
        }
    }
     function count_dietary_filtered() {
        $this->select_from_dietary();
        $query = $this->bmsv2->get();
        return $query->num_rows();
    }

}
