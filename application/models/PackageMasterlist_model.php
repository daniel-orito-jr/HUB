<?php

class PackageMasterlist_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
    }

    /**
     * Get all the data from the packagesprofile table ordered by refno.
     * @version 2019-03-26
     * @author LJ Roa
     */
    public function fetch_package_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('packagesprofile')
                ->order_by('refno')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered data from the packagesprofile table.
     * @version 2019-03-26
     * @author LJ Roa
     */
    public function fetch_package_masterlist_filtered_data() {

        $this->fetch_package_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the packagesprofile table in the database.
     * @version 2019-03-26
     * @author LJ Roa
     */
    public function fetch_package_masterlist() {
        $order_column = array("refno", "packageCODE", "description", "incharge", "packageprice",
            "active", "referenceno", "deactivated", "linkedpackagecode", "updated", "refno", "refcode"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('packagesprofile'); //Getting all the data from the doctors masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('description', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('incharge', $this->input->post("search")["value"])
                    ->or_like('packageCODE', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('refno', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    /**
     * Get all the package data from the database and return all the data to the PackageMasterlist controller.
     * @version 2019-03-26
     * @author LJ Roa
     */
    public function fetch_package_masterlist_datatables() {
        $this->fetch_package_masterlist(); //Get all the data from the packages packagesprofile table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the packagesprofile masterlist in the database.
    }

    /**
     * Add package to the packagesprofile table regarding on the inputted data
     * @param $data = inputted data
     * @version 2019-03-27
     * @author LJ Roa
     */
    public function add_package_masterlist($data = []) {

        $result = FALSE;

        if (count($data) != 0) {

            $this->hospv2_db->insert('packagesprofile', $data);

            $result = $this->hospv2_db->insert_id();
        }

        return $result;
    }

    /**
     * Search the selected data from the the database packagesprofile table.
     * @param type $id = selected id
     * @version 2019-03-27
     * @author LJ Roa
     */
    public function search_selected_package_from_masterlist($id) {

        $this->hospv2_db->select('*')
                ->from('packagesprofile')
                ->where('refno', $id);

        $query = $this->hospv2_db->get();

        return $query->result();
    }

    /**
     * Update the selected package row from in packagesprofile table.
     * @param type $data = data to be updated
     * @param type $id = refno selected row
     * @version 2019-03-21
     * @author LJ Roa
     */
    public function update_package_masterlist($data, $id) {

        $result = FALSE;

        if (strlen($id) > 0 && count($data) > 0) {

            $this->hospv2_db->where('refno', $id);

            $result = $this->hospv2_db->update('packagesprofile', $data);
        }

        return $result;
    }

    /**
     * Delete the selected row in the packagesprofile table from the database.
     * @param type $id = selected row
     * @version 2019-03-28
     * @author LJ Roa
     */
    public function delete_package_from_masterlist($id) {
        $result = FALSE;

        if (strlen($id) > 0) {

            $this->hospv2_db->where('refno', $id); //if refno == id
            $result = $this->hospv2_db->delete('packagesprofile'); //Delete the record from the packagesprofile table
        }

        return $result;
    }

}
