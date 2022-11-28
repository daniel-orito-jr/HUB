<?php

class Nurses_model extends CI_Model{
    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
    }

    /**
     * Get all the data from the nurses table ordered by lastname.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function fetch_nurses_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('nurses')
                ->order_by('doclname')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered data from the nurses table.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function fetch_nurses_masterlist_filtered_data() {

        $this->fetch_nurses_masterlist(); //Get all the data from the nurses table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the nurses table in the database.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function fetch_nurses_masterlist() {
        $order_column = array("doccode", "doclname", "docfname", "proftype", "PTR",
            "admitallow", "adrs", "lastupdate"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('nurses'); //Getting all the data from the nurses masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('doclname', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('docfname', $this->input->post("search")["value"])
                    ->or_like('doccode', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('doclname', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    /**
     * Get all the nurses data from the database and return all the data to the nurses controller.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function fetch_nurses_masterlist_datatables() {
        $this->fetch_nurses_masterlist(); //Get all the data from the nurses table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the nurses masterlist in the database.
    }

    /**
     * Get the last doccode from the nurses table and return it to the controller for auto generated code.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function generate_nurses_code() {

        $this->hospv2_db->select('doccode')
                ->from('nurses')
                ->order_by('doccode', 'desc')
                ->limit(1);

        $query = $this->hospv2_db->get();

        return $query->result();
    }

    /**
     * Add nurses to the nurses table regarding on the inputted data
     * @param $data = inputted data
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function add_nurses($data) {

        $this->hospv2_db->insert('nurses', $data);

        return $this->hospv2_db->insert_id();
    }

    /**
     * Get nurses data from the database using the selected code
     * @param int $code = selected data from the user
     * @return results of data
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function get_selected_nurses($code = '') {

        $result = FALSE;

        if (strlen($code) > 0) {
            $this->hospv2_db->select('*')
                    ->from('nurses')
                    ->where('doccd', $code);

            $query = $this->hospv2_db->get();

            $result = $query->result();
        }

        return $result;
    }

    /**
     * Update the selected data with the doccd equal to the index
     * @param int $index = selected doccd from the user
     * @param object $data = the data that needs to be updated
     * @return if result = true then data is updated if false then data is not updated
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function update_nurses($index, $data) {

        $this->hospv2_db->where('doccd', $index);

        return $this->hospv2_db->update('nurses', $data);
    }

    /**
     * Delete the specified nurses data according to the code
     * @param type $code = index of the nurses
     * @version 2019-01-30
     */
    public function delete_nurses($code) {

        $this->hospv2_db->where('doccd', $code);

        return $this->hospv2_db->delete('nurses');
    }
}
