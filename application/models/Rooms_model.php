<?php


class Rooms_model extends CI_Model{
    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
    }

    /**
     *  used to fetch rooms in database and return it to Rooms.php DisplayRooms()  
     * @version 01-18-2019
     * @author Reymar S. Putian
     * Changes: Added length in datatable for showing only 10 rows.
     * Updated by: LJ Roa 2019-01-30
     */
    public function fetch_rooms() {
//        $this->hospv2_db
//                ->select('*')
//                ->from('rmlist');

        $this->fetch_rooms_masterlist();

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }

        $query = $this->hospv2_db->get();
        return $query->result();
    }

    /**
     * Get all the data from the rmlist table ordered by rmcode.
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function fetch_rooms_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('rmlist')
                ->order_by('rmcode')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered data from the rmlist table.
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function fetch_rooms_masterlist_filtered_data() {

        $this->fetch_rooms_masterlist(); //Get all the data from the rmlist table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the rmlist table in the database.
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function fetch_rooms_masterlist() {
        $order_column = array("rmtype", "rmno", "rmbed", "rmdscr", "rmrate","rmrefno","rmcode","pricedefault",
            "crmaxlimit", "nursing", "station", "patientname", "admit_date","phictype"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('rmlist'); //Getting all the data from the rmlist masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('patientname', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('rmno', $this->input->post("search")["value"])
                    ->or_like('rmdscr', $this->input->post("search")["value"])
                    ->or_like('rmtype', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('rmcode', 'ASC'); //datatable data's are ordered in ascending order starting with the rmcode
        }
    }

    /**
     * Add rooms to the rmlist table regarding on the inputted data
     * @param $data = inputted data
     * @version 2019-01-31
     * @author LJ Roa
     */
    public function add_rooms($data) {

        $this->hospv2_db->insert('rmlist', $data);

        return $this->hospv2_db->insert_id();
    }

    /**
     * Get rooms data from the database using the selected code
     * @param int $code = selected data from the user
     * @return results of data
     * @version 2019-01-31
     * @author LJ Roa
     */
    public function get_selected_rooms($code = '') {

        $result = FALSE;

        if (strlen($code) > 0) {
            $this->hospv2_db->select('*')
                    ->from('rmlist')
                    ->where('rmid', $code);

            $query = $this->hospv2_db->get();

            $result = $query->result();
        }

        return $result;
    }

    /**
     * Update the selected data with the rmid equal to the index
     * @param int $index = selected rmid from the user
     * @param object $data = the data that needs to be updated
     * @return if result = true then data is updated if false then data is not updated
     * @version 2019-01-31
     * @author LJ Roa
     */
    public function update_rooms($index, $data) {

        $this->hospv2_db->where('rmid', $index);

        return $this->hospv2_db->update('rmlist', $data);
    }

    /**
     * Delete the specified rooms data according to the code
     * @param type $index = index of the rooms
     * @version 2019-01-30
     */
    public function delete_rooms($index) {

        $this->hospv2_db->where('rmid', $index);

        return $this->hospv2_db->delete('rmlist');
    }

    /**
     * Get the last rmcode from the rmlist table and return it to the controller for auto generated code.
     * @version 2019-01-30
     * @author LJ Roa
     */
    public function generate_rooms_code() {

        $this->hospv2_db->select('rmcode')
                ->from('rmlist')
                ->order_by('rmcode', 'desc')
                ->limit(1);

        $query = $this->hospv2_db->get();

        return $query->result();
    }
}
