<?php

class HMOManagement_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
    }

    /**
     * Get all the data from the hmo table ordered by SLDSCR.
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function fetch_hmo_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('hmo')
                ->order_by('hmocd', 'asc')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered data from the hmo table.
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function fetch_hmo_masterlist_filtered_data() {

        $this->fetch_hmo_masterlist(); //Get all the data from the hmo table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the hmo table in the database.
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function fetch_hmo_masterlist() {
        $order_column = array("hmocd", "hmoname", "mneomonic", "PTR", "admitallow", "adrs",
            "lastupdate"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('hmo'); //Getting all the data from the hmo masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('hmocd', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('hmoname', $this->input->post("search")["value"])
                    ->or_like('mneomonic', $this->input->post("search")["value"])
                    ->or_like('adrs', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('hmocd', 'asc'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    /**
     * Get all the hmo data from the database and return all the data to the hmo controller.
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function fetch_hmo_masterlist_datatables() {
        $this->fetch_hmo_masterlist(); //Get all the data from the hmo table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the hmo masterlist in the database.
    }

    /**
     * Add all the data to the hmo table in the database.
     * @param array $data Inputted data from the fields
     * @author LJ Roa
     * @version 2019-03-17
     */
    public function add_hmo($data = array()) {

        $result = FALSE;

        if (count($data) != 0) {

            $this->hospv2_db->insert('hmo', $data);

            $result = $this->hospv2_db->insert_id();
        }

        return $result;
    }

    /**
     * Search the selected data from the the database hmo table.
     * @param type $id = selected id
     * @version 2019-03-21
     * @author LJ Roa
     */
    public function search_selected_hmo($id) {

        $this->hospv2_db->select('*')
                ->from('hmo')
                ->where('hmocd', $id);

        $query = $this->hospv2_db->get();

        return $query->result();
    }

    /**
     * Update the selected hmo row from in hmo table.
     * @param type $data = data to be updated
     * @param type $id = hmocd selected row
     * @version 2019-03-21
     * @author LJ Roa
     */
    public function update_hmo($data, $id) {

        $result = FALSE;

        if (strlen($id) > 0 && count($data) > 0) {

            $this->hospv2_db->where('hmocd', $id);

            $result = $this->hospv2_db->update('hmo', $data);
        }

        return $result;
    }

    /**
     * Delete the selected row in the hmo table from the database.
     * @param type $id = selected row
     * @version 2019-03-21
     * @author LJ Roa
     */
    public function delete_hmo($id) {
        $result = FALSE;

        if (strlen($id) > 0) {

            $this->hospv2_db->where('hmocd', $id); //if hmocd == id
            $result = $this->hospv2_db->delete('hmo'); //Delete the record from the hmo table
        }

        return $result;
    }

    /**
     * Add all the data to the hmomasterlist table in the database.
     * @param array $data Inputted data from the fields
     * @author LJ Roa
     * @version 2019-03-22
     */
    public function add_hmomasterlist($data = array())
    {
        $result = FALSE;
        if (count($data) != 0)
        {
            $this->hospv2_db->insert('hmomasterlist', $data);
            $result = $this->hospv2_db->insert_id();
        }
        return $result;
    }

    /**
     * Get all the specified data from the hmomasterlist table ordered by SLDSCR.
     * @version 2019-03-22
     * @author LJ Roa
     */
    public function fetch_specified_hmo_masterlist_data($pincode) {

        $this->hospv2_db->select('*')
                ->from('hmomasterlist')
                ->order_by('id', 'asc')
                ->where('PINcode', $pincode)
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the specified filtered data from the hmomasterlist table.
     * @version 2019-03-22
     * @author LJ Roa
     */
    public function fetch_specified_hmo_masterlist_filtered_data($pincode) {

        $this->fetch_specified_hmo_masterlist($pincode); //Get all the data from the hmo table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the specified data from the hmomasterlist table in the database.
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function fetch_specified_hmo_masterlist($pincode) {
        $order_column = array("id", "hmoname", "hmocredit", "hmoloa", "priorityno", "updated",
            "recby", "hmorefno", "hmocode"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('hmomasterlist')
                ->where('PINcode', $pincode); //Getting all the data from the hmo masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('hmoname', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('hmorefno', $this->input->post("search")["value"])
                    ->or_like('hmocode', $this->input->post("search")["value"])
                    ->or_like('hmocredit', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('id', 'asc'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    /**
     * Get all the hmo data from the database and return all the data to the hmo controller.
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function fetch_specified_hmo_masterlist_datatables($pincode) {
        $this->fetch_specified_hmo_masterlist($pincode); //Get all the data from the hmo table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the hmo masterlist in the database.
    }

    /**
     * Search the selected data from the the database hmomasterlist table.
     * @param type $id = selected id
     * @version 2019-03-25
     * @author LJ Roa
     */
    public function search_selected_hmo_from_patient($id) {

        $this->hospv2_db->select('*')
                ->from('hmomasterlist')
                ->where('id', $id);

        $query = $this->hospv2_db->get();

        return $query->result();
    }

    /**
     * Delete the selected row in the hmomasterlist table from the database.
     * @param type $id = selected row
     * @version 2019-03-25
     * @author LJ Roa
     */
    public function delete_hmo_from_patient($id) {

        $result = FALSE;

        if (strlen($id) > 0) {

            $this->hospv2_db->where('id', $id); //if id == id
            $result = $this->hospv2_db->delete('hmomasterlist'); //Delete the record from the hmomasterlist table
        }

        return $result;
    }

    /**
     * Update the selected hmomasterlist row from in hmomasterlist table.
     * @param type $data = data to be updated
     * @param type $id = id selected row
     * @version 2019-03-25
     * @author LJ Roa
     */
    public function update_hmo_from_patient($data, $id) {

        $result = FALSE;

        if (strlen($id) > 0 && count($data) > 0) {

            $this->hospv2_db->where('id', $id);

            $result = $this->hospv2_db->update('hmomasterlist', $data);
        }

        return $result;
    }
    
    
    

}
