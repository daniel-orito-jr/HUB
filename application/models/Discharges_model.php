<?php

class Discharges_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
        $this->ams_db = $this->load->database('amsv1', true);
        $this->localset_db = $this->load->database('localset', true);
    }

    public function fetch_discharged_patients_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('inpatient')
                ->order_by('name')
                ->where("discharged = 1")
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    public function fetch_discharged_patients_masterlist_filtered_data() {

        $this->fetch_discharged_patients_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    public function fetch_discharged_patients_masterlist() {
        
        $order_column = array("name", "PIN", "HRnCODE", "bday", "sex",
            "lastdischdate", "adrs", "brgy", "cityadd", "pincode", "updated", "discharged"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)')
                ->where("discharged = 1"); //Getting all the data from the doctors masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('name', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    public function fetch_discharged_patients_masterlist_datatables() {
        $this->fetch_discharged_patients_masterlist(); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) 
        {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }
}
