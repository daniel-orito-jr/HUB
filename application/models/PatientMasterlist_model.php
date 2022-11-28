<?php

class PatientMasterlist_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
    }

    /**
     * Get all the data from the patient table ordered by SLDSCR.
     * @version 2019-02-19
     * @author LJ Roa
     */
    public function fetch_patient_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('patientlist')
                ->order_by('name', 'asc')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered data from the patient table.
     * @version 2019-02-19
     * @author LJ Roa
     */
    public function fetch_patient_masterlist_filtered_data() {

        $this->fetch_patient_masterlist(); //Get all the data from the patient table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the patient table in the database.
     * @version 2019-02-19
     * @author LJ Roa
     */
    public function fetch_patient_masterlist() {
        $order_column = array("id", "name", "PIN", "HRNcode", "bday", "sex", "contactno", "religion", "lastdischdate",
            "adrs", "cityadd", "provadd", "pincode", "updated", "SLaccount"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('patientlist use index(PIN)'); //Getting all the data from the patient masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('PIN', $this->input->post("search")["value"])
                    ->or_like('adrs', $this->input->post("search")["value"])
                    ->or_like('sex', $this->input->post("search")["value"])
                    ->or_like('cityadd', $this->input->post("search")["value"])
                    ->or_like('provadd', $this->input->post("search")["value"])
                    ->or_like('SLaccount', $this->input->post("search")["value"])
                    ->or_like('lastdischdate', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('name', 'asc'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    /**
     * Get all the patient data from the database and return all the data to the patient controller.
     * @version 2019-02-19
     * @author LJ Roa
     */
    public function fetch_patient_masterlist_datatables() {
        $this->fetch_patient_masterlist(); //Get all the data from the patient table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patient masterlist in the database.
    }

}
