<?php

class COA_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->amsv1_db = $this->load->database('amsv1', true);
    }

    /**
     * Get all the data from the coa table ordered by SLDSCR.
     * @version 2019-02-18
     * @author LJ Roa
     */
    public function fetch_coa_masterlist_data() {

        $this->amsv1_db->select('*')
                ->from('coa')
                ->order_by('ACCTTITLE', 'asc')
                ->limit(100);

        return $this->amsv1_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered data from the coa table.
     * @version 2019-02-18
     * @author LJ Roa
     */
    public function fetch_coa_masterlist_filtered_data() {

        $this->fetch_coa_masterlist(); //Get all the data from the coa table.

        $query = $this->amsv1_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the coa table in the database.
     * @version 2019-02-18
     * @author LJ Roa
     */
    public function fetch_coa_masterlist() {
        $order_column = array("ACCTTITLE", "COACODE", "ACCTTYPE", "LINKCODE", "BYDEPTBRANCH", "WITHSL",
            "FORPOSTING", "GROUPLEVEL", "SPECIALGROUP", "SECURITYLEVEL", "UPDATED", "COAREFNO", "DEFAULTACCT"); //To be added to the column in the datatable.
        $this->amsv1_db
                ->select('*')
                ->limit(100)
                ->from('coa use index(COACODE)'); //Getting all the data from the coa masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->amsv1_db
                    ->group_start()
                    ->like('ACCTTITLE', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('ACCTTYPE', $this->input->post("search")["value"])
                    ->or_like('COACODE', $this->input->post("search")["value"])
                    ->or_like('FORPOSTING', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->amsv1_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->amsv1_db->order_by('ACCTTITLE', 'asc'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    /**
     * Get all the coa data from the database and return all the data to the coa controller.
     * @version 2019-02-18
     * @author LJ Roa
     */
    public function fetch_coa_masterlist_datatables() {
        $this->fetch_coa_masterlist(); //Get all the data from the coa table.

        if ($this->input->post("length") != -1) {
            $this->amsv1_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->amsv1_db->get();
        return $query->result(); //Return results of data from the coa masterlist in the database.
    }

}
