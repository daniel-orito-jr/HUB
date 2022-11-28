<?php

class SLCode_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->amsv1_db = $this->load->database('amsv1', true);
    }

    /**
     * Get all the data from the slaccount table ordered by SLDSCR.
     * @version 2019-02-15
     * @author LJ Roa
     */
    public function fetch_slcode_masterlist_data() {

        $this->amsv1_db->select('*')
                ->from('slaccount')
                ->order_by('SLCODE', 'asc')
                ->limit(100);

        return $this->amsv1_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered data from the slaccount table.
     * @version 2019-02-15
     * @author LJ Roa
     */
    public function fetch_slcode_masterlist_filtered_data() {

        $this->fetch_slcode_masterlist(); //Get all the data from the slaccount table.

        $query = $this->amsv1_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the slaccount table in the database.
     * @version 2019-02-15
     * @author LJ Roa
     */
    public function fetch_slcode_masterlist() {
        $order_column = array("SLREF", "SLDSCR", "SLCODE", "SLADRS", "COAREFNO", "SLSTATUS",
            "REFNO"); //To be added to the column in the datatable.
        $this->amsv1_db
                ->select('*')
                ->limit(100)
                ->from('slaccount use index(SLDSCR)'); //Getting all the data from the slaccount masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->amsv1_db
                    ->group_start()
                    ->like('SLDSCR', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('SLADRS', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->amsv1_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->amsv1_db->order_by('SLCODE', 'asc'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    /**
     * Get all the slaccount data from the database and return all the data to the slcode controller.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function fetch_slcode_masterlist_datatables() {
        $this->fetch_slcode_masterlist(); //Get all the data from the slaccount table.

        if ($this->input->post("length") != -1) {
            $this->amsv1_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->amsv1_db->get();
        return $query->result(); //Return results of data from the slaccount masterlist in the database.
    }
    
    /**
     * Add nurses to the slaccount table regarding on the inputted data
     * @param $data = inputted data
     * @version 2019-02-19
     * @author LJ Roa
     */
    public function add_slcode($data) {

        $this->amsv1_db->insert('slaccount', $data);

        return $this->amsv1_db->insert_id();
    }
    

    /**
     * Get the last SLCODE from the slaccount table and return it to the controller for auto generated code.
     * @version 2019-02-18
     * @author LJ Roa
     */
    public function generate_sl_code() 
    {
        $this->amsv1_db->select('SLCODE')
                ->from('slaccount')
                ->order_by('SLCODE', 'desc')
                ->limit(1);

        $query = $this->amsv1_db->get();

        return $query->result();
    }
    
    
    public function get_slaccount_data_for_edit_patient($slrefnox) 
    {
        $this->amsv1_db
                ->select('*')
                ->from('slaccount')
                ->where('SLREF', $slrefnox);
        $query = $this->amsv1_db->get();
        return $query->row_array();
    }
}
