<?php

class Patients_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
        $this->ams_db = $this->load->database('amsv1', true);
    }

    /**
     * Get all the data from the doctors table ordered by lastname.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function fetch_inpatients_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('inpatient')
                ->order_by('name')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }
    
    public function fetch_admitted_inpatients_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('inpatient')
                ->where("discharged = 0")
                ->order_by('name')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }
    
    public function fetch_discharged_inpatients_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('inpatient')
                ->where("discharged = 1")
                ->order_by('name')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    public function fetch_inpatients_masterlist_filtered_data() {

        $this->fetch_inpatients_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }
    
    public function fetch_admitted_inpatients_masterlist_filtered_data() {

        $this->fetch_admitted_inpatients_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }
    
    public function fetch_discharged_inpatients_masterlist_filtered_data() {

        $this->fetch_discharged_inpatients_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    public function fetch_inpatients_masterlist() {
        
        $order_column = array("name", "PIN", "HRnCODE", "bday", "sex",
            "lastdischdate", "adrs", "brgy", "cityadd", "pincode", "updated", "discharged"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)'); //Getting all the data from the doctors masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('name', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }
    
    
    public function fetch_admitted_inpatients_masterlist() {
        
        $order_column = array("name", "PIN", "caseno", "HRnCODE", "bday", "sex",
            "lastdischdate", "adrs", "brgy", "cityadd", "pincode", "updated", "discharged"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)')
                ->where("discharged = 0"); //Getting all the data from the doctors masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('name', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }
    
    public function fetch_discharged_inpatients_masterlist() {
        
        $order_column = array("name", "PIN", "caseno", "HRnCODE", "bday", "sex",
            "lastdischdate", "adrs", "brgy", "cityadd", "pincode", "updated", "discharged"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)')
                ->where("discharged = 1"); //Getting all the data from the doctors masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('name', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    /**
     * Get all the doctors data from the database and return all the data to the doctors controller.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function fetch_inpatients_masterlist_datatables() {
        $this->fetch_inpatients_masterlist(); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }
    
    public function fetch_admitted_inpatients_masterlist_datatables() {
        $this->fetch_admitted_inpatients_masterlist(); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }
    
    public function fetch_discharged_inpatients_masterlist_datatables() {
        $this->fetch_discharged_inpatients_masterlist(); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }
    
    

    /**
     * Add doctors to the doctors table regarding on the inputted data
     * @param $data = inputted data
     * @version 2019-01-17
     * @author LJ Roa
     */
//    public function add_patients($datax) {
//        $data = array
//        (
//            'tin'                   => $this->security->xss_clean($datax['taxtin']),
//            'SLaccount'             => $this->security->xss_clean($datax['slcode']), 
//            'PIN'                   => $this->security->xss_clean($datax['pxindex']),
//            'phicmembr'             => $this->security->xss_clean($datax['phmembership']),
////            'phiccode'              => $this->security->xss_clean($datax['phiccodex']),
//            'phicmembrname'         => $this->security->xss_clean($datax['phmember']),
//            'phicno'                => $this->security->xss_clean($datax['phidnumb']),
//            'HRNcode'               => $this->security->xss_clean($datax['healthrecno']),
//            'lastadmitdate'         => $this->security->xss_clean($datax['oldrecord']),
//            'memberrefno'           => $this->security->xss_clean($datax['membership']),
//            'fname'                 => $this->security->xss_clean($datax['fname']),
//            'lname'                 => $this->security->xss_clean($datax['lname']),
//            'mname'                 => $this->security->xss_clean($datax['mname']), 
//            'civilstatus'           => $this->security->xss_clean($datax['civilstatus']),
//            'suffix'                => $this->security->xss_clean($datax['suffix']),
//            'email'                 => $this->security->xss_clean($datax['emailadd']),
//            'mobileno'              => $this->security->xss_clean($datax['mobile']),
//            'contactno'             => $this->security->xss_clean($datax['landline']),
//            'bday'                  => $this->security->xss_clean($datax['birthday']), 
//            'sex'                   => $this->security->xss_clean($datax['gender']),
//            'religion'              => $this->security->xss_clean($datax['religion']),
//            'nationality'           => $this->security->xss_clean($datax['nationality']),
//            'provadd'               => $this->security->xss_clean($datax['province']),
//            'cityadd'               => $this->security->xss_clean($datax['citymunicipal']),  
//            'zipcode'               => $this->security->xss_clean($datax['zipcode']),
//            'adrs'                  => $this->security->xss_clean($datax['street']),
//            'spouse'                => $this->security->xss_clean($datax['spouse']),
//            'spousebday'            => $this->security->xss_clean($datax['spousebday']),
//            'mothernationality'     => $this->security->xss_clean($datax['mothernation']),
//            'fathernationality'     => $this->security->xss_clean($datax['fathernation']),
//            'brgy'                  => $this->security->xss_clean($datax['barangay']),
//           
////            'passportno'            => $this->security->xss_clean($datax['passportx']),
////            'pincode'               => $this->security->xss_clean($datax['pincodexs']), 
////            'Age'                   => $this->security->xss_clean($datax['ageofpati']),
////            'pinyr'                 => $this->security->xss_clean($datax['pinyearxs']),
////            'pinseq'                => $this->security->xss_clean($datax['pinsequen']),
////            'name'                  => $this->security->xss_clean($datax['fullnamex']),
////            'pinformat'             => $this->security->xss_clean($datax['pinformat']),
////            'lastdischdate'         => $this->security->xss_clean($datax['lasdiscd8']),
////            'HRNyear'               => $this->security->xss_clean($datax['pinyearxs']),
////            'updated'               => $this->security->xss_clean($datax['updatedxz']),
////            'recid'                 => $this->security->xss_clean($datax['recordID']),
////            'recby'                 => $this->security->xss_clean($datax['recordedby']),
////            'station'               => $this->security->xss_clean($datax['station']),
//        );
//        return $this->hospv2_db->insert(patientlist_tbl, $data);
//
//    }
//    
//    public function getAccountNumber()
//    {
//        $this->hospv2_db
//            ->select("pinseq")
//            ->from('patientlist')
//            ->order_by("pinseq","desc")
//            ->limit (1);
//        $query=$this->hospv2_db->get();
//        return $query->row_array();
//    }
//    
//    public function getSLcodexNumber()
//    {
//        $this->ams_db
//            ->select("SLCODE")
//            ->from('slaccount')
//            ->order_by("SLCODE","desc")
//            ->limit (1);
//        $query=$this->ams_db->get();
//        return $query->row_array();
//    }
//    
//    public function fetchsCaseNumber()
//    {
//        $dat = new DateTime();
//        
//            $this->hospv2_db
//                ->select("caseyr, caseseq")
//                ->from('inpatient')
//                ->where("caseyr",$dat->format("Y"))
//                ->order_by("caseseq","desc")
//                ->limit (1);
//               $query=$this->hospv2_db->get();
//            return $query->row_array();
//    }
//    
//        public function getphmembershipx()
//    {
//        $this->hospv2_db
//                ->select('phictype, mneomonic')
//                ->from(phictype_tbl);
//        $query = $this->hospv2_db->get();
//        return $query->result_array(); 
//    }
//    
//    public function getReligionlistx()
//    {
//        $this->hospv2_db
//                ->select("distinct(religion)")
//                ->from(inpatient_tbl)
//                ->order_by("religion");
//        $query = $this->hospv2_db->get();
//        return $query->result_array();
//    }
//
//    public function getNationalityxs()
//    {
//        $this->hospv2_db
//                ->select("nationality")
//                ->from(nationalitylist_tbl)
//                ->order_by("nationality");
//        
//        $query=$this->hospv2_db->get();
//        return $query->result_array();
//    }
//
//    public function getProvincelistx()
//    {
//        $this->hospv2_db
//                ->select("provinces")
//                ->from(provincelist_tbl)
//                ->order_by("provinces");
//        $query=$this->hospv2_db->get();
//        return $query->result_array();
//    }
//
//    public function getCityMunicipal()
//    {
//        $this->hospv2_db
//                ->select('*')
//                ->from(citymunlist_tbl)
//                ->order_by("citymun");
//        $query=$this->hospv2_db->get();
//        return $query->result_array();
//    }
//
//    public function getMemberTypepro()
//    {
//        $this->hospv2_db
//                ->select('*')
//                ->from(profile_tbl)
//                ->where('id = 1');
//        $query = $this->hospv2_db->get();
//        return $query->row_array();
//    }
//
//    public function getMemberListing()
//    {
//        $this->hospv2_db
//                ->select('*')
//                ->from(memberlisting_tbl);
//        $query = $this->hospv2_db->get();
//        return $query->result_array();
//    }
//    
//    public function getDoctorListing()
//    {
//        $this->hospv2_db
//                ->select('*')
//                ->from(doctors_tbl)
//                ->order_by("doclname");
//        $query = $this->hospv2_db->get();
//        return $query->result_array();
//    }
//    
//    public function getNursesListing()
//    {
//        $this->hospv2_db
//                ->select('*')
//                ->from(nurses_tbl)
//                ->order_by("doclname");
//        $query = $this->hospv2_db->get();
//        return $query->result_array();
//    }
//
//    public function getRoomzsListing()
//    {
//        $this->hospv2_db
//                ->select("concat(rmtype,':',rmno,':',rmbed,':',rmdscr) as room, rmrate, crmaxlimit, rmrefno, rmcode,rmtype,rmno,rmbed,rmdscr,pricedefault,nursing,phictype")
//                ->from(rmlist_tbl)
//                ->where('roomstatus = "AVAILABLE"')
//                ->or_where('roomstatus="MGH"');
//        $query=$this->hospv2_db->get();
//        return $query->result_array();
//    }
//
//    function getHospitListing()
//    {
//        $this->hospv2_db
//                ->select("concat(Hospital,'-',Type) as Hospital, refno")
//                ->from(hcilisting_tbl)
//                ->order_by('Hospital');
//        $query = $this->hospv2_db->get();
//        return $query->result_array();
//    }
//    
//    /**
//     * Get doctors data from the database using the selected doc_code
//     * @param int $doc_code = selected data from the user
//     * @return results of data
//     * @version 2019-01-17
//     * @author LJ Roa
//     */
//    public function get_selected_doctors($doc_code = '') {
//
//        $result = FALSE;
//
//        if (strlen($doc_code) > 0) {
//            $this->hospv2_db->select('*')
//                    ->from('doctors')
//                    ->where('doccd', $doc_code);
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
//     * Update the selected data with the doccd equal to the doc_code
//     * @param int $doc_code = selected doccd from the user
//     * @param object $data = the data that needs to be updated
//     * @return if result = true then data is updated if false then data is not updated
//     * @version 2019-01-17
//     * @author LJ Roa
//     */
//    public function update_doctors($doc_code = '', $data = []) {
//
//        $result = FALSE;
//
//        if (strlen($doc_code) > 0 && count($data) > 0) {
//
//            $this->hospv2_db->where('doccd', $doc_code);
//
//            $result = $this->hospv2_db->update('doctors', $data);
//        }
//
//        return $result;
//    }
//
//    /**
//     * Delete the specified doctors data according to the doc_code
//     * @param type $doc_code = index of the doctors
//     * @version 2019-01-17
//     */
//    public function delete_doctors($doc_code = '') {
//
//        $result = FALSE;
//
//        if (strlen($doc_code) > 0) {
//
//            $this->hospv2_db->where('doccd', $doc_code); //if $doc_code == doccode
//            $result = $this->hospv2_db->delete('doctors'); //Delete the record from the doctors table
//        }
//
//        return $result;
//    }
//
//    /**
//     * Get the last doccode from the doctors table and return it to the controller for auto generated code.
//     * @version 2019-01-17
//     * @author LJ Roa
//     */
//    public function generate_doctors_code() {
//
//        $this->hospv2_db->select('doccode')
//                ->from('doctors')
//                ->order_by('doccode', 'desc')
//                ->limit(1);
//
//        $query = $this->hospv2_db->get();
//
//        return $query->result();
//    }

}
