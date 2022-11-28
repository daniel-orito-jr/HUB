<?php

class Membership_model extends CI_Model{
    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
    }

    public function fetch_membership() {

        $this->fetch_membership_masterlist();

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }

        $query = $this->hospv2_db->get();
        return $query->result();
    }

    public function fetch_membership_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('memberlisting')
                ->order_by('name')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    public function fetch_membership_masterlist_filtered_data() {

        $this->fetch_membership_masterlist(); //Get all the data from the rmlist table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    public function fetch_membership_masterlist() {
        $order_column = array("name", "Refno", "membercardno", "bday", "sex", "cellphone","nostocks","valueamount","membersince",
            "laststocksmovement", "address", "cityadd", "OPDID", "inpatPIN","StockType","closedAccount","mypix","updated","TIN","transferredto"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('memberlisting'); //Getting all the data from the rmlist masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('membercardno', $this->input->post("search")["value"])
                    ->or_like('Refno', $this->input->post("search")["value"])
                    ->or_like('TIN', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('name', 'ASC'); //datatable data's are ordered in ascending order starting with the rmcode
        }
    }

//    public function add_rooms($data) {
//
//        $this->hospv2_db->insert('rmlist', $data);
//
//        return $this->hospv2_db->insert_id();
//    }
//
//    /**
//     * Get rooms data from the database using the selected code
//     * @param int $code = selected data from the user
//     * @return results of data
//     * @version 2019-01-31
//     * @author LJ Roa
//     */
//    public function get_selected_rooms($code = '') {
//
//        $result = FALSE;
//
//        if (strlen($code) > 0) {
//            $this->hospv2_db->select('*')
//                    ->from('rmlist')
//                    ->where('rmid', $code);
//
//            $query = $this->hospv2_db->get();
//
//            $result = $query->result();
//        }
//
//        return $result;
//    }
//
//    /**
//     * Update the selected data with the rmid equal to the index
//     * @param int $index = selected rmid from the user
//     * @param object $data = the data that needs to be updated
//     * @return if result = true then data is updated if false then data is not updated
//     * @version 2019-01-31
//     * @author LJ Roa
//     */
//    public function update_rooms($index, $data) {
//
//        $this->hospv2_db->where('rmid', $index);
//
//        return $this->hospv2_db->update('rmlist', $data);
//    }
//
//    /**
//     * Delete the specified rooms data according to the code
//     * @param type $index = index of the rooms
//     * @version 2019-01-30
//     */
//    public function delete_rooms($index) {
//
//        $this->hospv2_db->where('rmid', $index);
//
//        return $this->hospv2_db->delete('rmlist');
//    }
//
//    /**
//     * Get the last rmcode from the rmlist table and return it to the controller for auto generated code.
//     * @version 2019-01-30
//     * @author LJ Roa
//     */
//    public function generate_rooms_code() {
//
//        $this->hospv2_db->select('rmcode')
//                ->from('rmlist')
//                ->order_by('rmcode', 'desc')
//                ->limit(1);
//
//        $query = $this->hospv2_db->get();
//
//        return $query->result();
//    }
}
