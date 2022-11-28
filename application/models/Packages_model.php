<?php

class Packages_model extends CI_Model 
{
    public function __construct() 
    {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
    }

    public function fetch_packages_masterlist_data() 
    {
        $this->hospv2_db->select('*')
                ->from('packageenrollees')
                ->order_by('refno')
                ->limit(100);
        return $this->hospv2_db->count_all_results();
    }

    public function fetch_packages_masterlist_filtered_data()
    {

        $this->fetch_packages_masterlist();

        $query = $this->hospv2_db->get();
        return $query->num_rows();
    }

    public function fetch_packages_masterlist() 
    {
        $order_column = array
        (
            "packagecode", "patientname", "acctno", "IPDacctno", "docname",
            "packageprice", "active", "enrolldate", "docreferenceno", "incharge",
            "status", "slcode", "totaldeposit", "updated", "pin", "refno"
        );
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('packageenrollees');

        if (!empty($this->input->post("search")["value"]))
        { 
            $this->hospv2_db
                    ->group_start()
                    ->like('packagecode', $this->input->post("search")["value"])
                    ->or_like('patientname', $this->input->post("search")["value"])
                    ->or_like('acctno', $this->input->post("search")["value"])
                    ->or_like('IPDacctno', $this->input->post("search")["value"])
                    ->or_like('docname', $this->input->post("search")["value"])
                    ->or_like('active', $this->input->post("search")["value"])
                    ->or_like('enrolldate', $this->input->post("search")["value"])
                    ->or_like('pin', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('refno', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    public function fetch_packages_masterlist_datatables() 
    {
        $this->fetch_packages_masterlist(); //Get all the data from the doctors table.

        if ($this->input->post("length") != -1) 
        {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the doctors masterlist in the database.
    }

    public function add_package($data = []) {

        $result = FALSE;

        if (count($data) != 0) {

            $this->hospv2_db->insert('packageenrollees', $data);

            $result = $this->hospv2_db->insert_id();
        }

        return $result;
    }

    public function getPackageAcctNo() 
    {
        $this->hospv2_db
                ->select("acctno")
                ->from('packageenrollees')
                ->order_by("acctno", "desc")
                ->limit(1);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function fetch_all_patients_masterlist_datatables() {
        $this->fetch_all_patients_masterlist(); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }
    
    public function fetch_all_patients_masterlist() {

        $order_column = array("lname", "mname", "fname", "suffix", "name", "PIN", "HRNcode", "bday", "sex", "religion", "mobileno",
            "lastdischdate", "adrs", "brgy", "cityadd", "pincode", "SLaccount", "updated", "Age"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('patientlist use index(namex)'); //Getting all the data from the doctors masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('PIN', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('name', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }
    
    public function fetch_all_patients_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('patientlist')
                ->order_by('name')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }
    
    public function fetch_all_patients_masterlist_filtered_data() {

        $this->fetch_all_patients_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }
    
        public function fetch_doctors_masterlist_datatables() {
        $this->fetch_doctors_masterlist(); //Get all the data from the doctors table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the doctors masterlist in the database.
    }
    
        public function fetch_doctors_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('doctors')
                ->order_by('doclname')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }
    
        public function fetch_doctors_masterlist_filtered_data() {

        $this->fetch_doctors_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }
    
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
    
    public function get_selected_doctors($ref_num = '') 
    {
        $result = FALSE;

        if (strlen($ref_num) > 0) {
            $this->hospv2_db->select('*')
                    ->from('packageenrollees')
                    ->where('refno', $ref_num);

            $query = $this->hospv2_db->get();

            $result = $query->result();
        }

        return $result;
    }
    
    public function update_package($refno = '', $data = [])
    {
        $result = FALSE;
        if (strlen($refno) > 0 && count($data) > 0) 
        {
            $this->hospv2_db->where('refno', $refno);
            $result = $this->hospv2_db->update('packageenrollees', $data);
        }
        return $result;
    }
    
    public function update_package_admission($refno = '', $data = [])
    {
        $result = FALSE;
        if (strlen($refno) > 0 && count($data) > 0) 
        {
            $this->hospv2_db->where('acctno', $refno);
            $result = $this->hospv2_db->update('packageenrollees', $data);
        }
        return $result;
    }
    
    public function delete_package($refno = '') 
    {
        $result = FALSE;
        if (strlen($refno) > 0) 
        {
            $this->hospv2_db->where('refno', $refno);
            $result = $this->hospv2_db->delete('packageenrollees');
        }
        return $result;
    }
    
    public function generate_package_acctno() 
    {
        $this->hospv2_db->select('acctno')
                ->from('packageenrollees')
                ->order_by('acctno', 'desc')
                ->limit(1);

        $query = $this->hospv2_db->get();

        return $query->result();
    }
    
    public function get_data_from_package_enrollees_for_admitpatient_check_duplicate_acctno($acctnox) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('packageenrollees')
                ->where("acctno", $acctnox);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function get_selected_package($pkgacctno = '') 
    {
        $result = FALSE;
        if (strlen($pkgacctno) > 0) 
        {
            $this->hospv2_db->select('*')
                    ->from('packageenrollees')
                    ->where('acctno', $pkgacctno);
            $query = $this->hospv2_db->get();
            $result = $query->result();
        }
        return $result;
    }
}
