<?php

class Doctors_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
    }

    /**
     * Get all the data from the doctors table ordered by lastname.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function fetch_doctors_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('doctors')
                ->order_by('doclname')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered data from the doctors table.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function fetch_doctors_masterlist_filtered_data() {

        $this->fetch_doctors_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the doctors table in the database.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function fetch_doctors_masterlist() {
        $order_column = array("doclname", "docfname", "titlename", "Licno", "PTR",
            "S2no", "phicno", "tin", "proftype", "phicenable", "phicrate", "pfrate",
            "adrs", "lastupdate", "doccode", "cellno", "accountno", "coaOPD", "coaIPD",
            "tax", "docrefno"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('doctors use index(docname)'); //Getting all the data from the doctors masterlist in the database.

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
     * Get all the doctors data from the database and return all the data to the doctors controller.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function fetch_doctors_masterlist_datatables() {
        $this->fetch_doctors_masterlist(); //Get all the data from the doctors table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the doctors masterlist in the database.
    }

    /**
     * Add doctors to the doctors table regarding on the inputted data
     * @param $data = inputted data
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function add_doctors($data = []) {

        $result = FALSE;

        if (count($data) != 0) {

            $this->hospv2_db->insert('doctors', $data);

            $result = $this->hospv2_db->insert_id();
        }

        return $result;
    }

    /**
     * Get doctors data from the database using the selected doc_code
     * @param int $doc_code = selected data from the user
     * @return results of data
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function get_selected_doctors($doc_code = '') {

        $result = FALSE;

        if (strlen($doc_code) > 0) {
            $this->hospv2_db->select('*')
                    ->from('doctors')
                    ->where('doccd', $doc_code);

            $query = $this->hospv2_db->get();

            $result = $query->result();
        }

        return $result;
    }

    /**
     * Update the selected data with the doccd equal to the doc_code
     * @param int $doc_code = selected doccd from the user
     * @param object $data = the data that needs to be updated
     * @return if result = true then data is updated if false then data is not updated
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function update_doctors($doc_code = '', $data = []) {

        $result = FALSE;

        if (strlen($doc_code) > 0 && count($data) > 0) {

            $this->hospv2_db->where('doccd', $doc_code);

            $result = $this->hospv2_db->update('doctors', $data);
        }

        return $result;
    }

    /**
     * Delete the specified doctors data according to the doc_code
     * @param type $doc_code = index of the doctors
     * @version 2019-01-17
     */
    public function delete_doctors($doc_code = '') {

        $result = FALSE;

        if (strlen($doc_code) > 0) {

            $this->hospv2_db->where('doccd', $doc_code); //if $doc_code == doccode
            $result = $this->hospv2_db->delete('doctors'); //Delete the record from the doctors table
        }

        return $result;
    }

    /**
     * Get the last doccode from the doctors table and return it to the controller for auto generated code.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function generate_doctors_code() {

        $this->hospv2_db->select('doccode')
                ->from('doctors')
                ->order_by('doccode', 'desc')
                ->limit(1);

        $query = $this->hospv2_db->get();

        return $query->result();
    }

}
