<?php

class Admission_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
        $this->amsv1_db = $this->load->database('amsv1', true);
        $this->localset_db = $this->load->database('localset', true);
        $this->opdv2_db = $this->load->database('opdv2', true);
        $this->bmsv2_db = $this->load->database('bmsv2', true);
        $this->hub_db = $this->load->database('hubv2', true);
        $this->hubuserlog_db = $this->load->database('hubuserlog', true);
        $this->epay_db = $this->load->database('epayv2', true);
        $this->nacs_db = $this->load->database('nacs', true);
    }

    public function fetch_admitted_patients_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('inpatient')
                ->order_by('name')
                ->where("discharged = 0")
                ->where("Quikadmit = 0")
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    public function fetch_admitted_patients_masterlist_filtered_data() {

        $this->fetch_admitted_patients_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    public function fetch_admitted_patients_masterlist() {
        $order_column = array("name", "PIN", "caseno", "HRnCODE", "bday", "sex",
            "lastdischdate", "adrs", "brgy", "cityadd", "pincode", "updated", "discharged", "Quikadmit"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)')
                ->where("discharged = 0")
                ->where("Quikadmit = 0"); //Getting all the data from the doctors masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])
                    ->or_like('caseno', $this->input->post("search")["value"])//fetch all data according to the value inputted in the search field
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('name', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }

    public function fetch_admitted_patients_masterlist_datatables() {
        $this->fetch_admitted_patients_masterlist(); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }

    public function fetch_all_patients_masterlist_data() {

        $this->hospv2_db->select('*')
                ->from('patientlist use index(name_index)')
                ->order_by('name')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    public function fetch_all_patients_masterlist_filtered_data() {

        $this->fetch_all_patients_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    public function fetch_all_patients_masterlist() {

        $order_column = array("lname", "mname", "fname", "suffix", "name", "PIN", "HRNcode", "bday", "sex", "religion", "mobileno",
            "lastdischdate", "adrs", "brgy", "cityadd", "pincode", "SLaccount", "updated", "Age", "caseno"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('patientlist use index(name_index)'); //Getting all the data from the doctors masterlist in the database.

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

    public function fetch_all_patients_masterlist_datatables() {
        $this->fetch_all_patients_masterlist(); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }

    public function insert_new_patient($datax) {
        $data = array
            (
            'civilstatus' => $this->security->xss_clean($datax['civilstat']),
            'sex' => $this->security->xss_clean($datax['gendersex']),
            'religion' => $this->security->xss_clean($datax['religionx']),
            'nationality' => $this->security->xss_clean($datax['nationali']),
            'provadd' => $this->security->xss_clean($datax['provincex']),
            'brgy' => $this->security->xss_clean($datax['barangayx']),
            'cityadd' => $this->security->xss_clean($datax['citymunic']),
            'mothernationality' => $this->security->xss_clean($datax['mothernat']),
            'fathernationality' => $this->security->xss_clean($datax['fathernat']),
            'fname' => $this->security->xss_clean($datax['firstname']),
            'lname' => $this->security->xss_clean($datax['lastnamex']),
            'mname' => $this->security->xss_clean($datax['midlename']),
            'suffix' => $this->security->xss_clean($datax['suffixxes']),
            'email' => $this->security->xss_clean($datax['emailadrs']),
            'mobileno' => $this->security->xss_clean($datax['mobilenox']),
            'contactno' => $this->security->xss_clean($datax['telephonx']),
            'bday' => $this->security->xss_clean($datax['birthdayz']),
            'passportno' => $this->security->xss_clean($datax['passportx']),
            'spouse' => $this->security->xss_clean($datax['spouxname']),
            'spousebday' => $this->security->xss_clean($datax['spoubirth']),
            'zipcode' => $this->security->xss_clean($datax['zipcodexs']),
            'adrs' => $this->security->xss_clean($datax['streetadr']),
            'mother' => $this->security->xss_clean($datax['mothrname']),
            'father' => $this->security->xss_clean($datax['fathrname']),
            'motheradrs' => $this->security->xss_clean($datax['mothradrs']),
            'fatheradrs' => $this->security->xss_clean($datax['fathradrs']),
            'pincode' => $this->security->xss_clean($datax['pincodexs']),
            'Age' => $this->security->xss_clean($datax['ageofpati']),
            'pinyr' => $this->security->xss_clean($datax['pinyrs']),
            'pinseq' => $this->security->xss_clean($datax['pinseq']),
            'name' => $this->security->xss_clean($datax['fullnamex']),
            'pinformat' => $this->security->xss_clean($datax['pinformat']),
            'tin' => $this->security->xss_clean($datax['tinnumber']),
            'SLaccount' => $this->security->xss_clean($datax['slcodenum']),
            'PIN' => $this->security->xss_clean($datax['pxindexno']),
            'phicmembr' => $this->security->xss_clean($datax['phicmembr']),
            'phiccode' => $this->security->xss_clean($datax['phiccodex']),
            'phicmembrname' => $this->security->xss_clean($datax['phmembers']),
            'phicno' => $this->security->xss_clean($datax['phidnumbr']),
            'HRNcode' => $this->security->xss_clean($datax['healrecno']),
            'memberrefno' => $this->security->xss_clean($datax['mmbrxtype']),
            'lastadmitdate' => $this->security->xss_clean($datax['lasdiscd8']),
            'lastdischdate' => $this->security->xss_clean($datax['lasdiscd8']),
            'HRNyear' => $this->security->xss_clean($datax['pinyrs']),
            'updated' => $this->security->xss_clean($datax['updatedxz']),
            'recid' => $this->security->xss_clean($datax['recordID']),
            'recby' => $this->security->xss_clean($datax['recordedby']),
            'station' => $this->security->xss_clean($datax['station']),
            'archived' => $this->security->xss_clean($datax['archivedx']),
            'oldrecord' => $this->security->xss_clean($datax['oldrecord']),
            'HRNverified' => $this->security->xss_clean($datax['hrnverify']),
            'citycode' => $this->security->xss_clean($datax['citycode']),
            'provcode' => $this->security->xss_clean($datax['provcode'])
        );
        return $this->hospv2_db->insert(patientlist_tbl, $data);
    }

    public function insert_new_slcode($datax) {
        $data = array
            (
            'SLCODE' => $this->security->xss_clean($datax['SLCODE']),
            'SLDSCR' => $this->security->xss_clean($datax['SLDSCR']),
            'SLADRS' => $this->security->xss_clean($datax['SLADRS']),
            'COAREFNO' => $this->security->xss_clean($datax['COAREFNO']),
            'REFNO' => $this->security->xss_clean($datax['REFNO']),
            'SLSTATUS' => $this->security->xss_clean($datax['SLSTATUS']),
            'Sysmade' => $this->security->xss_clean($datax['Sysmade']),
            'updatedby' => $this->security->xss_clean($datax['updatedby']),
            'updated' => $this->security->xss_clean($datax['updated']),
            'grouping' => $this->security->xss_clean($datax['grouping']),
            'status' => $this->security->xss_clean($datax['status']),
            'TIN' => $this->security->xss_clean($datax['TIN']),
            'PINcode' => $this->security->xss_clean($datax['PINcode']),
            'zipcode' => $this->security->xss_clean($datax['zipcode']),
        );
        return $this->amsv1_db->insert('slaccount', $data);
    }

    public function insert_new_slcode_for_admission($datax) {
        $data = array
            (
            'SLCODE' => $this->security->xss_clean($datax['slcSLCODE']),
            'SLDSCR' => $this->security->xss_clean($datax['slcSLDSCR']),
            'SLADRS' => $this->security->xss_clean($datax['slcSLADRS']),
            'COAREFNO' => $this->security->xss_clean($datax['slcCOAREFNO']),
            'REFNO' => $this->security->xss_clean($datax['slcREFNO']),
            'SLSTATUS' => $this->security->xss_clean($datax['slcSLSTATUS']),
            'Sysmade' => $this->security->xss_clean($datax['slcSysmade']),
            'updatedby' => $this->security->xss_clean($datax['slcupdatedby']),
            'updated' => $this->security->xss_clean($datax['slcupdated']),
            'grouping' => $this->security->xss_clean($datax['slcgrouping']),
            'status' => $this->security->xss_clean($datax['slcstatus']),
            'TIN' => $this->security->xss_clean($datax['slcTIN']),
            'PINcode' => $this->security->xss_clean($datax['slcPINcode']),
            'zipcode' => $this->security->xss_clean($datax['slczipcode']),
        );
        return $this->amsv1_db->insert('slaccount', $data);
    }

    public function getSLcodexNumber() {
        $this->amsv1_db
                ->select("SLCODE")
                ->from('slaccount')
                ->order_by("SLCODE", "desc")
                ->limit(1);
        $query = $this->amsv1_db->get();
        return $query->row_array();
    }

    public function fetchsCaseNumber() {
        $dat = new DateTime();

        $this->hospv2_db
                ->select("caseyr, caseseq")
                ->from('inpatient')
                ->where("caseyr", $dat->format("Y"))
                ->order_by("caseseq", "desc")
                ->limit(1);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function getAccountNumber() {
        $dat = new DateTime();

        $this->hospv2_db
                ->select("pinyr, pinseq")
                ->from('patientlist')
                ->where("pinyr", $dat->format("Y"))
                ->order_by("pinseq", "desc")
                ->limit(1);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function getopdnumlastval() {
        $this->opdv2_db
                ->select("OPDno")
                ->from('opdwalkin')
                ->order_by("OPDno", "desc")
                ->limit(1);
        $query = $this->opdv2_db->get();
        return $query->row_array();
    }

    public function getphmembershipx() {
        $this->hospv2_db
                ->select('phictype, mneomonic')
                ->from(phictype_tbl);
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getReligionlistx() {
        $this->hospv2_db
                ->select("distinct(religion)")
                ->from(inpatient_tbl)
                ->order_by("religion");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getNationalityxs() {
        $this->hospv2_db
                ->select("nationality")
                ->from(nationalitylist_tbl)
                ->order_by("nationality");

        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getProvincelistx() {
        $this->hospv2_db
                ->distinct()
                ->select("PROV_NAME, PROVINCE")
                ->from(lugar_province_tbl)
                ->order_by("PROV_NAME");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getCityMunicipal() {
        $this->hospv2_db
                ->select('*')
                ->from(citymunlist_tbl)
                ->order_by("citymun");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getMemberTypepro() {
        $this->hospv2_db
                ->select('*')
                ->from(profile_tbl)
                ->where('id = 1');
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function getMemberListing() {
        $this->hospv2_db
                ->select('*')
                ->from(memberlisting_tbl);
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getDoctorListing() {
        $this->hospv2_db
                ->select('*')
                ->from(doctors_tbl)
                ->order_by("doclname");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getNursesListing() {
        $this->hospv2_db
                ->select('*')
                ->from(nurses_tbl)
                ->order_by("doclname");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getRoomzsListing() {
        $this->hospv2_db
                ->select("concat(rmtype,':',rmno,':',rmbed,':',rmdscr) as room, rmrate, crmaxlimit, rmrefno, rmcode,rmtype,rmno,rmbed,rmdscr,pricedefault,nursing,phictype")
                ->from(rmlist_tbl)
                ->where('roomstatus = "AVAILABLE"')
                ->or_where('roomstatus="MGH"');
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    function getHospitListing() {
        $this->hospv2_db
                ->select("concat(Hospital,'-',Type) as Hospitalx, refno")
                ->from(hcilisting_tbl)
                ->order_by('Hospital');
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    function getpccode($ip) {
        $this->localset_db->select("*")
                ->from(setting_tbl)
                ->where("pcipaddress", $ip);
        $query = $this->localset_db->get();
        return $query->result_array();
    }

    public function delete_patient_from_masterlist($pin) {
        $this->db->where('PIN', $pin);
        return $this->db->delete(patientlist_tbl);
    }

    public function delete_patient_from_slaccount($pin) {
        $this->amsv1_db->where('REFNO', $pin);
        return $this->amsv1_db->delete('slaccount');
    }

    public function get_data_from_patientlist_for_edit_patient($id) {
        $this->hospv2_db
                ->select('*')
                ->from(patientlist_tbl)
                ->where('id', $id);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_data_from_patientlist_for_quick_data_edit($pin) {
        $this->hospv2_db
                ->select('*')
                ->from(patientlist_tbl)
                ->where('PIN', $pin);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function update_patient($datax, $idx) {
        $data = array
            (
            'civilstatus' => $this->security->xss_clean($datax['civilstat']),
            'sex' => $this->security->xss_clean($datax['gendersex']),
            'religion' => $this->security->xss_clean($datax['religionx']),
            'nationality' => $this->security->xss_clean($datax['nationali']),
            'provadd' => $this->security->xss_clean($datax['provincex']),
            'provcode' => $this->security->xss_clean($datax['provcode']),
            'brgy' => $this->security->xss_clean($datax['barangayx']),
            'cityadd' => $this->security->xss_clean($datax['citymunic']),
            'citycode' => $this->security->xss_clean($datax['citycode']),
            'mothernationality' => $this->security->xss_clean($datax['mothernat']),
            'fathernationality' => $this->security->xss_clean($datax['fathernat']),
            'fname' => $this->security->xss_clean($datax['firstname']),
            'lname' => $this->security->xss_clean($datax['lastnamex']),
            'mname' => $this->security->xss_clean($datax['midlename']),
            'suffix' => $this->security->xss_clean($datax['suffixxes']),
            'email' => $this->security->xss_clean($datax['emailadrs']),
            'mobileno' => $this->security->xss_clean($datax['mobilenox']),
            'contactno' => $this->security->xss_clean($datax['telephonx']),
            'bday' => $this->security->xss_clean($datax['birthdayz']),
            'passportno' => $this->security->xss_clean($datax['passportx']),
            'spouse' => $this->security->xss_clean($datax['spouxname']),
            'spousebday' => $this->security->xss_clean($datax['spoubirth']),
            'zipcode' => $this->security->xss_clean($datax['zipcodexs']),
            'adrs' => $this->security->xss_clean($datax['streetadr']),
            'mother' => $this->security->xss_clean($datax['mothrname']),
            'father' => $this->security->xss_clean($datax['fathrname']),
            'motheradrs' => $this->security->xss_clean($datax['mothradrs']),
            'fatheradrs' => $this->security->xss_clean($datax['fathradrs']),
            'Age' => $this->security->xss_clean($datax['ageofpati']),
            'name' => $this->security->xss_clean($datax['fullnamex']),
            'tin' => $this->security->xss_clean($datax['tinnumber']),
            'phicmembr' => $this->security->xss_clean($datax['phicmembr']),
            'phiccode' => $this->security->xss_clean($datax['phiccodex']),
            'phicmembrname' => $this->security->xss_clean($datax['phmembers']),
            'phicno' => $this->security->xss_clean($datax['phidnumbr']),
            'HRNcode' => $this->security->xss_clean($datax['healrecno']),
            'memberrefno' => $this->security->xss_clean($datax['mmbrxtype']),
            'lastadmitdate' => $this->security->xss_clean($datax['lasdiscd8']),
            'lastdischdate' => $this->security->xss_clean($datax['lasdiscd8']),
            'HRNyear' => $this->security->xss_clean($datax['pinyearxs']),
            'updated' => $this->security->xss_clean($datax['updatedxz']),
            'recid' => $this->security->xss_clean($datax['recordID']),
            'recby' => $this->security->xss_clean($datax['recordedby']),
            'station' => $this->security->xss_clean($datax['station']),
            'archived' => $this->security->xss_clean($datax['archivedx']),
            'oldrecord' => $this->security->xss_clean($datax['oldrecord']),
            'HRNverified' => $this->security->xss_clean($datax['hrnverify'])
        );

        $this->hospv2_db->where('id', $idx);
        return $this->hospv2_db->update(patientlist_tbl, $data);
    }

    public function get_data_from_patientlist_for_admit_patient($idex) {
        $this->hospv2_db
                ->select('*')
                ->from('patientlist use index(id_index)')
                ->where('id', $idex);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_data_from_inpatient_for_admit_patient_generate_data($caseno) {
        $this->hospv2_db
                ->select('*')
                ->from(inpatient_tbl)
                ->where('caseno', $caseno);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function admit_patient($datax) {
        $data = array
            (
            'pxtype' => $this->security->xss_clean($datax['pxtype']),
            'opdtype' => $this->security->xss_clean($datax['opdtype']),
            'casetype' => $this->security->xss_clean($datax['casetype']),
            'admittype' => $this->security->xss_clean($datax['admittype']),
            'logbookCN' => $this->security->xss_clean($datax['logbookCN']),
//            'logbookPIN'                    => $this->security->xss_clean($datax['logbookPIN']),
            'HRnCODE' => $this->security->xss_clean($datax['HRnCODE']),
            'billingcprecipient' => $this->security->xss_clean($datax['billingcprecipient']),
//            'lasttextsent'                  => $this->security->xss_clean($datax['lasttextsent']),
//            'lasttransactionsent'           => $this->security->xss_clean($datax['lasttransactionsent']),
            'vip' => $this->security->xss_clean($datax['vip']),
            'pincode' => $this->security->xss_clean($datax['pincode']),
            'casecode' => $this->security->xss_clean($datax['casecode']),
            'caseyr' => $this->security->xss_clean($datax['caseyr']),
            'caseseq' => $this->security->xss_clean($datax['caseseq']),
            'caseno' => $this->security->xss_clean($datax['caseno']),
            'memberrefno' => $this->security->xss_clean($datax['memberrefno']),
//            'membercardno'                         => $this->security->xss_clean($datax['membercardno']),
            'ledgerfile' => $this->security->xss_clean($datax['ledgerfile']),
            'pinyr' => $this->security->xss_clean($datax['pinyr']),
            'pinseq' => $this->security->xss_clean($datax['pinseq']),
            'PIN' => $this->security->xss_clean($datax['PIN']),
            'pinformat' => $this->security->xss_clean($datax['pinformat']),
            'lname' => $this->security->xss_clean($datax['lname']),
            'fname' => $this->security->xss_clean($datax['fname']),
            'mname' => $this->security->xss_clean($datax['mname']),
            'suffix' => $this->security->xss_clean($datax['suffix']),
            'name' => $this->security->xss_clean($datax['name']),
            'hideinfo' => $this->security->xss_clean($datax['hideinfo']),
            'spouse' => $this->security->xss_clean($datax['spouse']),
            'spousebday' => $this->security->xss_clean($datax['spousebday']),
            'sex' => $this->security->xss_clean($datax['sex']),
            'bday' => $this->security->xss_clean($datax['bday']),
            'Age' => $this->security->xss_clean($datax['Age']),
            'Weight' => $this->security->xss_clean($datax['Weight']),
            'packageCODE' => $this->security->xss_clean($datax['packageCODE']),
            'nationality' => $this->security->xss_clean($datax['nationality']),
            'passportno' => $this->security->xss_clean($datax['passportno']),
            'guarantor' => $this->security->xss_clean($datax['guarantor']),
            'guarantor_rltn' => $this->security->xss_clean($datax['guarantor_rltn']),
            'guarantor_mobileno' => $this->security->xss_clean($datax['guarantor_mobileno']),
            'guarantor_bday' => $this->security->xss_clean($datax['guarantor_bday']),
            'adrs' => $this->security->xss_clean($datax['adrs']),
            'brgy' => $this->security->xss_clean($datax['brgy']),
            'cityadd' => $this->security->xss_clean($datax['cityadd']),
            'citycode' => $this->security->xss_clean($datax['citycode']),
            'provadd' => $this->security->xss_clean($datax['provadd']),
            'provcode' => $this->security->xss_clean($datax['provcode']),
            'zipcode' => $this->security->xss_clean($datax['zipcode']),
            'civilstatus' => $this->security->xss_clean($datax['civilstatus']),
            'contactno' => $this->security->xss_clean($datax['contactno']),
            'mobileno' => $this->security->xss_clean($datax['mobileno']),
            'email' => $this->security->xss_clean($datax['email']),
            'religion' => $this->security->xss_clean($datax['religion']),
            'father' => $this->security->xss_clean($datax['father']),
            'fatheradrs' => $this->security->xss_clean($datax['fatheradrs']),
            'fathernationality' => $this->security->xss_clean($datax['fathernationality']),
            'mother' => $this->security->xss_clean($datax['mother']),
            'motheradrs' => $this->security->xss_clean($datax['motheradrs']),
            'mothernationality' => $this->security->xss_clean($datax['mothernationality']),
            'updated' => $this->security->xss_clean($datax['updated']),
            'doctorid' => $this->security->xss_clean($datax['doctorid']),
            'doctorname' => $this->security->xss_clean($datax['doctorname']),
            'nurseid' => $this->security->xss_clean($datax['nurseid']),
            'nursename' => $this->security->xss_clean($datax['nursename']),
            'hmoid' => $this->security->xss_clean($datax['hmoid']),
            'hmoname' => $this->security->xss_clean($datax['hmoname']),
            'hmoholder' => $this->security->xss_clean($datax['hmoholder']),
            'hmonumber' => $this->security->xss_clean($datax['hmonumber']),
            'hmoapprovalno' => $this->security->xss_clean($datax['hmoapprovalno']),
            'archived' => $this->security->xss_clean($datax['archived']),
            'lastadmitdate' => $this->security->xss_clean($datax['lastadmitdate']),
//            'archiveddate'                  => $this->security->xss_clean($datax['archiveddate']),
            'lastadmittime' => $this->security->xss_clean($datax['lastadmittime']),
            'lastdischdate' => $this->security->xss_clean($datax['lastdischdate']),
            'lastdischtime' => $this->security->xss_clean($datax['lastdischtime']),
            'pat_clascode' => $this->security->xss_clean($datax['pat_clascode']),
            'pat_classub' => $this->security->xss_clean($datax['pat_classub']),
            'pat_classification' => $this->security->xss_clean($datax['pat_classification']),
            'recid' => $this->security->xss_clean($datax['recid']),
            'recby' => $this->security->xss_clean($datax['recby']),
            'station' => $this->security->xss_clean($datax['station']),
            'admitdate' => $this->security->xss_clean($datax['admitdate']),
            'admittime' => $this->security->xss_clean($datax['admittime']),
            'tagfordischa' => $this->security->xss_clean($datax['tagfordischa']),
//            'tagfordischaDT'                => $this->security->xss_clean($datax['tagfordischaDT']),
            'dischadate' => $this->security->xss_clean($datax['dischadate']),
            'dischatime' => $this->security->xss_clean($datax['dischatime']),
//            'dischaid'                      => $this->security->xss_clean($datax['dischaid']),
//            'dischaby'                      => $this->security->xss_clean($datax['dischaby']),
            'discharged' => $this->security->xss_clean($datax['discharged']),
//            'daysconfined'                  => $this->security->xss_clean($datax['daysconfined']),
//            'disposition'                   => $this->security->xss_clean($datax['disposition']),
//            'expireddate'                   => $this->security->xss_clean($datax['expireddate']),
//            'expiredtime'                   => $this->security->xss_clean($datax['expiredtime']),
            'ReferredFromHCI' => $this->security->xss_clean($datax['ReferredFromHCI']),
//            'TransRefHCI'                   => $this->security->xss_clean($datax['TransRefHCI']),
//            'reasonforreferral'             => $this->security->xss_clean($datax['reasonforreferral']),
            'roomref' => $this->security->xss_clean($datax['roomref']),
            'roomcd' => $this->security->xss_clean($datax['roomcd']),
            'roomtype' => $this->security->xss_clean($datax['roomtype']),
            'roomno' => $this->security->xss_clean($datax['roomno']),
            'roombed' => $this->security->xss_clean($datax['roombed']),
            'roominfo' => $this->security->xss_clean($datax['roominfo']),
            'roombrief' => $this->security->xss_clean($datax['roombrief']),
            'roomdate' => $this->security->xss_clean($datax['roomdate']),
            'roomtime' => $this->security->xss_clean($datax['roomtime']),
            'roomrate' => $this->security->xss_clean($datax['roomrate']),
            'PRICEPACKAGE' => $this->security->xss_clean($datax['PRICEPACKAGE']),
//            'rmrateschm'                    => $this->security->xss_clean($datax['rmrateschm']),
//            'RmPHICtype'                    => $this->security->xss_clean($datax['RmPHICtype']),
            'creditmax' => $this->security->xss_clean($datax['creditmax']),
            'addonserv' => $this->security->xss_clean($datax['addonserv']),
            'phiccode' => $this->security->xss_clean($datax['phiccode']),
            'phicmembr' => $this->security->xss_clean($datax['phicmembr']),
//            'phicdependent'                 => $this->security->xss_clean($datax['phicdependent']),
            'phicPIN' => $this->security->xss_clean($datax['phicPIN']),
            'phicmembrname' => $this->security->xss_clean($datax['phicmembrname']),
            'relationtomember' => $this->security->xss_clean($datax['relationtomember']),
            'phiccasefirst' => $this->security->xss_clean($datax['phiccasefirst']),
            'phiccasefirstRefno' => $this->security->xss_clean($datax['phiccasefirstRefno']),
            'phiccasefirstDx' => $this->security->xss_clean($datax['phiccasefirstDx']),
//            'phiccasesecond'                => $this->security->xss_clean($datax['phiccasesecond']),
//            'phiccasesecondRefno'           => $this->security->xss_clean($datax['phiccasesecondRefno']),
//            'phiccasesecondDx'              => $this->security->xss_clean($datax['phiccasesecondDx']),
//            'phicHCItotal'                  => $this->security->xss_clean($datax['phicHCItotal']),
//            'PHICpfTotal'                   => $this->security->xss_clean($datax['PHICpfTotal']),
            'PHICrmtype' => $this->security->xss_clean($datax['PHICrmtype']),
            'dietarycd' => $this->security->xss_clean($datax['dietarycd']),
            'diatary_ins' => $this->security->xss_clean($datax['diatary_ins']),
            'dietstatus' => $this->security->xss_clean($datax['dietstatus']),
            'Diag_chiefcomplain' => $this->security->xss_clean($datax['Diag_chiefcomplain']),
            'Diag_admit' => $this->security->xss_clean($datax['Diag_admit']),
            'Diag_discharge' => $this->security->xss_clean($datax['Diag_discharge']),
//            'Diag_discharge_updatedby'      => $this->security->xss_clean($datax['Diag_discharge_updatedby']),
//            'Diag_discharge_updatedDT'      => $this->security->xss_clean($datax['Diag_discharge_updatedDT']),
//            'Diag_surg_ref'                 => $this->security->xss_clean($datax['Diag_surg_ref']),
//            'Diag_surg'                     => $this->security->xss_clean($datax['Diag_surg']),
//            'Diag_surgICD'                  => $this->security->xss_clean($datax['Diag_surgICD']),
//            'Diag_surg_type'                => $this->security->xss_clean($datax['Diag_surg_type']),
//            'Diag_anes_ref'                 => $this->security->xss_clean($datax['Diag_anes_ref']),
//            'Diag_anes'                     => $this->security->xss_clean($datax['Diag_anes']),
//            'Diag_anesICD'                  => $this->security->xss_clean($datax['Diag_anesICD']),
//            'ICD10'                         => $this->security->xss_clean($datax['ICD10']),
//            'icdcasetype'                   => $this->security->xss_clean($datax['icdcasetype']),
//            'flagme'                        => $this->security->xss_clean($datax['flagme']),
//            'suprvid'                       => $this->security->xss_clean($datax['suprvid']),
//            'suprvby'                       => $this->security->xss_clean($datax['suprvby']),
//            'clearedid'                     => $this->security->xss_clean($datax['clearedid']),
//            'clearedby'                     => $this->security->xss_clean($datax['clearedby']),
//            'clearedtd'                     => $this->security->xss_clean($datax['clearedtd']),
//            'clearedat'                     => $this->security->xss_clean($datax['clearedat']),
//            'Quickadmit'                    => $this->security->xss_clean($datax['Quickadmit']),
//            'patfile'                       => $this->security->xss_clean($datax['patfile']),
//            'imagefile'                     => $this->security->xss_clean($datax['imagefile']),
//            'mypix'                         => $this->security->xss_clean($datax['mypix']),
            'nursestation' => $this->security->xss_clean($datax['nursestation']),
//            'phicpapers'                    => $this->security->xss_clean($datax['phicpapers']),
//            'phicclearby'                   => $this->security->xss_clean($datax['phicclearby']),
//            'phicdeductions'                => $this->security->xss_clean($datax['phicdeductions']),
//            'phicnote'                      => $this->security->xss_clean($datax['phicnote']),
//            'printedby'                     => $this->security->xss_clean($datax['printedby']),
//            'printeddate'                   => $this->security->xss_clean($datax['printeddate']),
//            'billingnote'                   => $this->security->xss_clean($datax['billingnote']),
//            'nobillingdischarged'           => $this->security->xss_clean($datax['nobillingdischarged']),
//            'nbdhospamount'                 => $this->security->xss_clean($datax['nbdhospamount']),
//            'nbddocamount'                  => $this->security->xss_clean($datax['nbddocamount']),
//            'GrossHospAmt'                  => $this->security->xss_clean($datax['GrossHospAmt']),
//            'GrossDocAmt'                   => $this->security->xss_clean($datax['GrossDocAmt']),
//            'GrandTotalBill'                => $this->security->xss_clean($datax['GrandTotalBill']),
//            'phic1caseHCIrecommend'         => $this->security->xss_clean($datax['phic1caseHCIrecommend']),
//            'phic2caseHCIrecommend'         => $this->security->xss_clean($datax['phic2caseHCIrecommend']),
//            'phic1caseDOCrecommend'         => $this->security->xss_clean($datax['phic1caseDOCrecommend']),
//            'phic2caseDOCrecommend'         => $this->security->xss_clean($datax['phic2caseDOCrecommend']),
//            'DiscountPHIChosp'              => $this->security->xss_clean($datax['DiscountPHIChosp']),
//            'DiscountPHICdoc'               => $this->security->xss_clean($datax['DiscountPHICdoc']),
//            'DiscountHosp'                  => $this->security->xss_clean($datax['DiscountHosp']),
//            'DiscountHospDoc'               => $this->security->xss_clean($datax['DiscountHospDoc']),
//            'DiscountHMOHosp'               => $this->security->xss_clean($datax['DiscountHMOHosp']),
//            'DiscountHMODoc'                => $this->security->xss_clean($datax['DiscountHMODoc']),
//            'DiscountSrHosp'                => $this->security->xss_clean($datax['DiscountSrHosp']),
//            'DiscountSrDoc'                 => $this->security->xss_clean($datax['DiscountSrDoc']),
//            'DiscountVATHosp'               => $this->security->xss_clean($datax['DiscountVATHosp']),
//            'DiscountVATDoc'                => $this->security->xss_clean($datax['DiscountVATDoc']),
//            'PNrefno'                       => $this->security->xss_clean($datax['PNrefno']),
//            'PNduedate'                     => $this->security->xss_clean($datax['PNduedate']),
//            'PNamount'                      => $this->security->xss_clean($datax['PNamount']),
//            'PNBalance'                     => $this->security->xss_clean($datax['PNBalance']),
//            'PNlastupdate'                  => $this->security->xss_clean($datax['PNlastupdate']),
//            'PNlastRefno'                   => $this->security->xss_clean($datax['PNlastRefno']),
//            'PNby'                          => $this->security->xss_clean($datax['PNby']),
//            'PNAddress1'                    => $this->security->xss_clean($datax['PNAddress1']),
//            'PNAddress2'                    => $this->security->xss_clean($datax['PNAddress2']),
//            'PNbyCellnumber'                => $this->security->xss_clean($datax['PNbyCellnumber']),
            'OBprocedure' => $this->security->xss_clean($datax['OBprocedure']),
//            'dischargedsameday'             => $this->security->xss_clean($datax['dischargedsameday']),
//            'dischargein48'                 => $this->security->xss_clean($datax['dischargein48']),
//            'deliverycausesofdeaths'        => $this->security->xss_clean($datax['deliverycausesofdeaths']),
//            'deathtype'                     => $this->security->xss_clean($datax['deathtype']),
//            'HAIcase_deviceinfection'       => $this->security->xss_clean($datax['HAIcase_deviceinfection']),
//            'HAIcasedays'                   => $this->security->xss_clean($datax['HAIcasedays']),
//            'HAIVAPinfection'               => $this->security->xss_clean($datax['HAIVAPinfection']),
//            'HAIVAPdays'                    => $this->security->xss_clean($datax['HAIVAPdays']),
//            'HAIBSIinfection'               => $this->security->xss_clean($datax['HAIBSIinfection']),
//            'HAIBSIdays'                    => $this->security->xss_clean($datax['HAIBSIdays']),
//            'HAIUTIinfection'               => $this->security->xss_clean($datax['HAIUTIinfection']),
//            'HAIUTIdays'                    => $this->security->xss_clean($datax['HAIUTIdays']),
//            'HAIcase_nonedeviceinfection'   => $this->security->xss_clean($datax['HAIcase_nonedeviceinfection']),
//            'HAInonecasedays'               => $this->security->xss_clean($datax['HAInonecasedays']),
//            'HAISSInoneinfection'           => $this->security->xss_clean($datax['HAISSInoneinfection']),
//            'HAISSIdays'                    => $this->security->xss_clean($datax['HAISSIdays']),
            'admissionsource' => $this->security->xss_clean($datax['admissionsource']),
//            'phicclaimrefno'                => $this->security->xss_clean($datax['phicclaimrefno']),
//            'phicclaimstatus'               => $this->security->xss_clean($datax['phicclaimstatus']),
//            'pcsoamount'                    => $this->security->xss_clean($datax['pcsoamount']),
//            'pcsorefcode'                   => $this->security->xss_clean($datax['pcsorefcode']),
//            'pcsogrant'                     => $this->security->xss_clean($datax['pcsogrant']),
//            'hmoclaimrefno'                 => $this->security->xss_clean($datax['hmoclaimrefno']),
//            'hmopapers'                     => $this->security->xss_clean($datax['hmopapers']),
//            'hmodeductions'                 => $this->security->xss_clean($datax['hmodeductions']),
//            'hmoclaimstatus'                => $this->security->xss_clean($datax['hmoclaimstatus']),
//            'hmoclaimeddate'                => $this->security->xss_clean($datax['hmoclaimeddate']),
//            'hmoclaimedamount'              => $this->security->xss_clean($datax['hmoclaimedamount']),
//            'hmobalance'                    => $this->security->xss_clean($datax['hmobalance']),
//            'hmovoucherdate'                => $this->security->xss_clean($datax['hmovoucherdate']),
//            'hmovoucherno'                  => $this->security->xss_clean($datax['hmovoucherno']),
//            'hmovoucheramount'              => $this->security->xss_clean($datax['hmovoucheramount']),
//            'needdeposit'                   => $this->security->xss_clean($datax['needdeposit']),
//            'advisedeposit'                 => $this->security->xss_clean($datax['advisedeposit']),
//            'InqBal'                        => $this->security->xss_clean($datax['InqBal']),
//            'NeedDepoamt'                   => $this->security->xss_clean($datax['NeedDepoamt']),
//            'phiccf2prepby'                 => $this->security->xss_clean($datax['phiccf2prepby']),
//            'phiccf2updated'                => $this->security->xss_clean($datax['phiccf2updated']),
//            'Phiccf2done'                   => $this->security->xss_clean($datax['Phiccf2done']),
//            'ReqPHICmdrno'                  => $this->security->xss_clean($datax['ReqPHICmdrno']),
            'ReqPHICmdrweb' => $this->security->xss_clean($datax['ReqPHICmdrweb']),
//            'ReqPHICspouse'                 => $this->security->xss_clean($datax['ReqPHICspouse']),
//            'ReqPHICChild'                  => $this->security->xss_clean($datax['ReqPHICChild']),
//            'ReqPHICOFW'                    => $this->security->xss_clean($datax['ReqPHICOFW']),
//            'ReqPHICparent'                 => $this->security->xss_clean($datax['ReqPHICparent']),
//            'cashierpaid'                   => $this->security->xss_clean($datax['cashierpaid']),
//            'cashiername'                   => $this->security->xss_clean($datax['cashiername']),
//            'cashierbatchrefno'             => $this->security->xss_clean($datax['cashierbatchrefno']),
//            'cashierDT'                     => $this->security->xss_clean($datax['cashierDT']),
//            'verifiedby'                    => $this->security->xss_clean($datax['verifiedby']),
//            'verifiedadmission'             => $this->security->xss_clean($datax['verifiedadmission']),
//            'verifieddatetime'              => $this->security->xss_clean($datax['verifieddatetime']),
//            'medcertrefno'                  => $this->security->xss_clean($datax['medcertrefno']),
//            'patientnickname'               => $this->security->xss_clean($datax['patientnickname']),
//            'Birthcertrefno'                => $this->security->xss_clean($datax['Birthcertrefno']),
//            'medicolegalrefno'              => $this->security->xss_clean($datax['medicolegalrefno']),
//            'diagnosisdone'                 => $this->security->xss_clean($datax['diagnosisdone']),
//            'archivedby'                    => $this->security->xss_clean($datax['archivedby']),
//            'restoreddate'                  => $this->security->xss_clean($datax['restoreddate']),
//            'restored'                      => $this->security->xss_clean($datax['restored']),
//            'restoredby'                    => $this->security->xss_clean($datax['restoredby']),
            'cautions' => $this->security->xss_clean($datax['cautions']),
//            'MedicoLegalReference'          => $this->security->xss_clean($datax['MedicoLegalReference']),
            'minorOR' => $this->security->xss_clean($datax['minorOR']),
            'NurseInchargeID' => $this->security->xss_clean($datax['NurseInchargeID']),
            'NurseIncharge' => $this->security->xss_clean($datax['NurseIncharge']),
            'TBstatus' => $this->security->xss_clean($datax['TBstatus']),
//            'patientisNBB'                  => $this->security->xss_clean($datax['patientisNBB']),
//            'hascateg'                      => $this->security->xss_clean($datax['hascateg']),
//            'phicmemberverified'            => $this->security->xss_clean($datax['phicmemberverified']),
//            'otherdiag'                     => $this->security->xss_clean($datax['otherdiag']),
//            'nursedischadate'               => $this->security->xss_clean($datax['nursedischadate']),
//            'nursedischatime'               => $this->security->xss_clean($datax['nursedischatime']),
//            'TICKETCODE'                    => $this->security->xss_clean($datax['TICKETCODE']),
//            'TICKETDATE'                    => $this->security->xss_clean($datax['TICKETDATE']),
//            'TICKETBY'                      => $this->security->xss_clean($datax['TICKETBY']),
//            'postedby'                      => $this->security->xss_clean($datax['postedby']),
//            'postingdate'                   => $this->security->xss_clean($datax['postingdate']),
//            'pxgroup'                       => $this->security->xss_clean($datax['pxgroup']),
            'lmp' => $this->security->xss_clean($datax['lmp']),
            'antenatal' => $this->security->xss_clean($datax['antenatal']),
            'postnatal' => $this->security->xss_clean($datax['postnatal']),
            'slcode' => $this->security->xss_clean($datax['slcode'])
        );
        
        
        return $this->hospv2_db->insert(inpatient_tbl, $data);
        
    }
    
    public function update_acctnumber($datax)
    {
        $data = array
        (
            'recentacctno' => $this->security->xss_clean($datax['caseno']),
            'updated' => $this->security->xss_clean($datax['updated'])
        );
        
        $this->hospv2_db->where('id = 1');
        return $this->hospv2_db->update('acctnumber', $data);
    }
    
    public function update_pinnumber($datax)
    {
        $data = array
        (
            'recentpin' => $this->security->xss_clean($datax['pxindexno']),
            'updated' => $this->security->xss_clean($datax['updatedxz'])
        );
        
        $this->hospv2_db->where('id = 1');
        return $this->hospv2_db->update('acctnumber', $data);
    }

        
//    public function generate_payslip_report($profileno, $batchcode) {
//        $this->epay_db->select('*')
//                ->from(employeepayslip_vw)
//                ->where('profileno', $profileno)
//                ->where('batchcode', $batchcode);
//        $query = $this->epay_db->get();
//        return $query->row_array();
//    }

    public function get_data_from_patientlist_for_addpatient_check_duplicate($fullnamex) {
        $this->hospv2_db
                ->select('*')
                ->from(patientlist_tbl)
                ->where("name", $fullnamex);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_data_from_patientlist_for_addpatient_check_duplicate_index($indexnum) {
        $this->hospv2_db
                ->select('*')
                ->from(patientlist_tbl)
                ->where("PIN", $indexnum);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_data_from_slaccount_for_addpatient_check_duplicate_slcode($slcodex) {
        $this->amsv1_db
                ->select('*')
                ->from('slaccount')
                ->where("SLCODE", $slcodex);
        $query = $this->amsv1_db->get();
        return $query->row_array();
    }

    public function get_data_from_inpatient_for_admitpatient_check_duplicate_caseno($casenox) {
        $this->hospv2_db
                ->select('*')
                ->from(inpatient_tbl)
                ->where("caseno", $casenox);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_data_from_inpatient_for_admitpatient_check_duplicate($pinx) {
        $this->hospv2_db
                ->select('*')
                ->from(inpatient_tbl)
                ->where('PIN', $pinx)
                ->where('discharged="0"');
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function generate_admission_sheet($casenumber) {
        $this->hospv2_db->select('*')
                ->from(inpatient_tbl)
                ->where('caseno', $casenumber);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_referred_hospital($refno) {
        $this->hospv2_db->select('*')
                ->from('hcilisting')
                ->where('refno', $refno);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function getcausesofconfinement($casenumber) {
        $this->hospv2_db->select('*')
                ->from('causesofconfinement')
                ->where('caseno', $casenumber);
        $query = $this->hospv2_db->get();
        return $query->result();
    }

    public function generate_from_vw_inpatient($casenumber) {
        $this->hospv2_db->select('*')
                ->from('vw_inpatientlist')
                ->where('caseno', $casenumber);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_hospital() {
        $this->db->select("*")
                ->from(profile_tbl);
        $query = $this->db->get();
        return $query->row_array();
    }

    public function add_slcode($data) {
        $this->amsv1_db->insert('slaccount', $data);
        return $this->amsv1_db->insert_id();
    }

    public function getCityMunicipalAddress($province) {
        $this->hospv2_db
                ->group_by("MUN_NAME")
                ->select('*')
                ->from("lugar_municipality use index(province_index)")
                ->where("PROVINCE", $province)
                ->order_by("MUN_NAME");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getZipCodeAddress($citymun, $provadd) {
        $this->hospv2_db
                ->select('*')
                ->from("lugar_zipcode use index(municipal_index)")
                ->where("PROVINCE", $provadd)
                ->where("MUNICIPALITY", $citymun)
                ->group_by("ZIP_CODE");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getBarangayAddress($citymun, $provadd) {
        $this->hospv2_db
                ->select('*')
                ->from("lugar_barangay use index(municipal_index)")
                ->where("PROVINCE", $provadd)
                ->where("MUNICIPALITY", $citymun)
                ->group_by("BRGY_NAME");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

//    public function insert_new_comanage_doctor($datax) 
//    {
//        $data = array
//        (
//            'PINcode'       => $this->security->xss_clean($datax['pincode']),
//            'attendingDoc'  => $this->security->xss_clean($datax['attedoc']),
//            'pxtype'        => $this->security->xss_clean($datax['pxtypex']),
//            'patientname'   => $this->security->xss_clean($datax['pxnamex']),
//            'acctno'        => $this->security->xss_clean($datax['acctnum']),
//            'datereferred'  => $this->security->xss_clean($datax['startco']),
//            'docrefno'      => $this->security->xss_clean($datax['doccode']),
//            'docname'       => $this->security->xss_clean($datax['docname']),
//            'managetype'    => $this->security->xss_clean($datax['typeman']),
//            'updated'       => $this->security->xss_clean($datax['updated']),
//            'recid'         => $this->security->xss_clean($datax['recrdid']),
//            'recby'         => $this->security->xss_clean($datax['recrdby']),
//            'PCcodeno'      => $this->security->xss_clean($datax['pccodex']),
//            'acctrefno'     => $this->security->xss_clean($datax['casecod']),
//            'accesscode'    => $this->security->xss_clean("no"),
//            'verified'      => $this->security->xss_clean(1),
//            'proffee'       => $this->security->xss_clean(0),
//            'phicAR'        => $this->security->xss_clean(0),
//        );
//        return $this->hospv2_db->insert(doctorsofpatients_tbl, $data);
//    }
//    public function delete_saved_comanaged_doctors($patientype,$accountnum,$pincodenum,$doctorcode,$typeofmana,$startofser,$casecodeno)
//    {
//            $this
//                    ->hospv2_db
//                    ->where('pxtype', $patientype)
//                    ->where('acctno', $accountnum)
//                    ->where('PINcode', $pincodenum)
//                    ->where('docrefno', $doctorcode)
//                    ->where('managetype', $typeofmana)
//                    ->where('datereferred', $startofser)
//                    ->where('acctrefno', $casecodeno);
//            return $this->hospv2_db->delete(doctorsofpatients_tbl);
//    }

    public function add_new_member($data) {
        $this->hospv2_db->insert('memberlisting', $data);
        return $this->hospv2_db->insert_id();
    }

    public function insert_new_vip_patient($datax) {
        $data = array
            (
            'casecode' => $this->security->xss_clean($datax['vipcasecode']),
            'caseno' => $this->security->xss_clean($datax['vipcaseno']),
            'vip' => $this->security->xss_clean($datax['vipvip']),
            'securityrisk' => $this->security->xss_clean($datax['vipsecurityrisk']),
            'remarks' => $this->security->xss_clean($datax['vipremarks']),
            'patnamex' => $this->security->xss_clean($datax['vippatnamex']),
            'admitdate' => $this->security->xss_clean($datax['vipadmitdate']),
            'dischadate' => $this->security->xss_clean($datax['vipdischadate']),
            'oic' => $this->security->xss_clean($datax['vipoic']),
            'oiccode' => $this->security->xss_clean($datax['vipoiccode']),
            'updatedby' => $this->security->xss_clean($datax['vipupdatedby']),
            'updated' => $this->security->xss_clean($datax['vipupdated']),
            'station' => $this->security->xss_clean($datax['vipstation']),
            'confirmed' => $this->security->xss_clean($datax['vipconfirmed']),
        );
        return $this->hospv2_db->insert('vippersons', $data);
    }

    public function insert_new_confinement($datax) {
        $data = array
            (
            'causeofconfinement' => $this->security->xss_clean($datax['causesofcon']),
            'confinementnhip' => $this->security->xss_clean($datax['confinemnhip']),
            'confinementnonnhip' => $this->security->xss_clean($datax['confinonnhip']),
            'confinmenttotal' => $this->security->xss_clean($datax['confinetotal']),
            'updated' => $this->security->xss_clean($datax['updated']),
            'refnocause' => $this->security->xss_clean($datax['refnoofcause']),
            'caseno' => $this->security->xss_clean($datax['caseno']),
            'patientname' => $this->security->xss_clean($datax['patnamex']),
            'dischadate' => $this->security->xss_clean($datax['dischadate']),
            'phicmembr' => $this->security->xss_clean($datax['phicmember']),
            'updatedby' => $this->security->xss_clean($datax['updatedby']),
            'diagnosis' => $this->security->xss_clean($datax['diagnosis']),
            'diagnosisno' => $this->security->xss_clean($datax['diagnosenumb']),
            'diagnosisyr' => $this->security->xss_clean($datax['diagnoseyear']),
            'diagnosecode' => $this->security->xss_clean($datax['diagnosecode'])
        );
        return $this->hospv2_db->insert('causesofconfinement', $data);
    }

    public function delete_saved_confinement_diagnosis($diagnoscodex) {
        $this
                ->hospv2_db
                ->where('diagnosecode', $diagnoscodex);
        return $this->hospv2_db->delete("causesofconfinement");
    }

    public function getDiagnosisCode() {
        $dat = new DateTime();

        $this->hospv2_db
                ->select("diagnosisyr, diagnosisno")
                ->from('causesofconfinement')
                ->where("diagnosisyr", $dat->format("Y"))
                ->order_by("diagnosisno", "desc")
                ->limit(1);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function fetch_opdwalkin() {

        $this->fetch_opdwalkin_masterlist();

        if ($this->input->post("length") != -1) {
            $this->opdv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }

        $query = $this->opdv2_db->get();
        return $query->result();
    }

    public function fetch_opdwalkin_masterlist_data() {

        $this->opdv2_db->select('*')
                ->from('opdwalkin')
                ->order_by('name')
                ->limit(100);

        return $this->opdv2_db->count_all_results(); //Return counted results via integer
    }

    public function fetch_opdwalkin_masterlist_filtered_data() {

        $this->fetch_opdwalkin_masterlist(); //Get all the data from the rmlist table.

        $query = $this->opdv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    public function fetch_opdwalkin_masterlist() {
        $order_column = array("id", "opid", "OPDno", "Slrefno", "inpatPIN", "patientno", "ledgerfile", "name", "bday", "age", "sex", "Streetadrs", "doctorid", "doctorname",
            "cityadd", "updated", "recid", "recby", "station", "cellphone", "tin", "memberrefno", "membercardno", "opdid", "weight", "hmoid", "hmoname", "reportcode", "mypix", "imagefile"); //To be added to the column in the datatable.
        $this->opdv2_db
                ->select('*')
                ->limit(100)
                ->from('opdwalkin'); //Getting all the data from the rmlist masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->opdv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('opdid', $this->input->post("search")["value"])
                    ->or_like('inpatPIN', $this->input->post("search")["value"])
                    ->or_like('patientno', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->opdv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->opdv2_db->order_by('name', 'ASC'); //datatable data's are ordered in ascending order starting with the rmcode
        }
    }

    public function add_new_opdwalkin_patient($data) {
        $this->opdv2_db->insert('opdwalkin', $data);
        return $this->opdv2_db->insert_id();
    }

    public function add_comanage_data($datax) {
        $data = array
            (
            'docname' => $this->security->xss_clean($datax['comadocname']),
            'docrefno' => $this->security->xss_clean($datax['comadocrefno']),
            'datereferred' => $this->security->xss_clean($datax['comadatereferred']),
            'managetype' => $this->security->xss_clean($datax['comamanagetype']),
            'acctno' => $this->security->xss_clean($datax['comaacctno']),
            'acctrefno' => $this->security->xss_clean($datax['comaacctrefno']),
            'PINcode' => $this->security->xss_clean($datax['comaPINcode']),
            'patientname' => $this->security->xss_clean($datax['comapatientname']),
            'updated' => $this->security->xss_clean($datax['comaupdated']),
            'recid' => $this->security->xss_clean($datax['comarecid']),
            'recby' => $this->security->xss_clean($datax['comarecby']),
            'PCcodeno' => $this->security->xss_clean($datax['comaPCcodeno']),
            'pxtype' => $this->security->xss_clean($datax['comapxtype']),
            'accesscode' => $this->security->xss_clean($datax['comaaccesscode']),
            'verified' => $this->security->xss_clean($datax['comaverified']),
            'phicAR' => $this->security->xss_clean($datax['comaphicAR']),
            'attendingdoc' => $this->security->xss_clean($datax['comaattendingdoc']),
            'proffee' => $this->security->xss_clean($datax['comaproffee']),
            'recby' => $this->security->xss_clean($datax['comarecby']),
            'sentcf4form' => $this->security->xss_clean($datax['comasentcf4form']),
            'donecf4form' => $this->security->xss_clean($datax['comadonecf4form']),
        );
        return $this->hospv2_db->insert(doctorsofpatients_tbl, $data);
    }

    public function add_hmoinsurance_data($datax) {
        $data = array
            (
            'hmorefno' => $this->security->xss_clean($datax['hmorefno']),
            'pxtype' => $this->security->xss_clean($datax['hmopxtype']),
            'PINcode' => $this->security->xss_clean($datax['hmoPINcode']),
            'acctcode' => $this->security->xss_clean($datax['hmoacctcode']),
            'acctno' => $this->security->xss_clean($datax['hmoacctno']),
            'patientname' => $this->security->xss_clean($datax['hmopatientname']),
            'admitdate' => $this->security->xss_clean($datax['hmoadmitdate']),
//            'dischadate'        => $this->security->xss_clean($datax['hmodischadate']),
            'hmocode' => $this->security->xss_clean($datax['hmocode']),
            'hmoname' => $this->security->xss_clean($datax['hmoname']),
            'hmocredit' => $this->security->xss_clean($datax['hmocredit']),
            'hmoloa' => $this->security->xss_clean($datax['hmoloa']),
            'hmoapprovaldate' => $this->security->xss_clean($datax['hmoapprovaldate']),
            'hmohosp' => $this->security->xss_clean($datax['hmohosp']),
            'hmodoc' => $this->security->xss_clean($datax['hmodoc']),
            'hmoamountapplied' => $this->security->xss_clean($datax['hmoamountapplied']),
            'hmotransmittalage' => $this->security->xss_clean($datax['hmotransmittalage']),
            'hmopaid' => $this->security->xss_clean($datax['hmopaid']),
            'discountapplied' => $this->security->xss_clean($datax['hmodiscountapplied']),
            'taxapplied' => $this->security->xss_clean($datax['hmotaxapplied']),
            'ORamountpaid' => $this->security->xss_clean($datax['hmoORamountpaid']),
            'hmopaymentage' => $this->security->xss_clean($datax['hmopaymentage']),
            'priorityno' => $this->security->xss_clean($datax['hmopriorityno']),
            'hmocardholder' => $this->security->xss_clean($datax['hmocardholder']),
            'hmocardno' => $this->security->xss_clean($datax['hmocardno']),
            'recby' => $this->security->xss_clean($datax['hmorecby']),
            'recid' => $this->security->xss_clean($datax['hmorecid']),
            'updated' => $this->security->xss_clean($datax['hmoupdated']),
            'station' => $this->security->xss_clean($datax['hmostation']),
            'verified' => $this->security->xss_clean($datax['hmoverified']),
            'locked' => $this->security->xss_clean($datax['hmolocked']),
            'transno' => $this->security->xss_clean($datax['hmotransno']),
            'tagitem' => $this->security->xss_clean($datax['hmotagitem']),
            'balanceOff' => $this->security->xss_clean($datax['hmobalanceOff']),
            'variancetotal' => $this->security->xss_clean($datax['hmovariancetotal']),
            'groupcode' => $this->security->xss_clean($datax['hmogroupcode']),
        );
        return $this->hospv2_db->insert(hmomasterlist_tbl, $data);
    }

    public function add_diagnosis($data = array()) {
        $result = FALSE;
        if (count($data) != 0) {
            $this->bmsv2_db->insert('diagnosiscateg', $data);
            $result = $this->bmsv2_db->insert_id();
        }
        return $result;
    }

    public function add_causes_of_confinement_data($datax) {
        $data = array
            (
            'causescode' => $this->security->xss_clean($datax['causescode']),
            'casecode' => $this->security->xss_clean($datax['causescasecode']),
            'caseno' => $this->security->xss_clean($datax['causescaseno']),
//            'membercardno'        => $this->security->xss_clean($datax['causesmembercardno']),
            'PIN' => $this->security->xss_clean($datax['causesPIN']),
            'pincode' => $this->security->xss_clean($datax['causespincode']),
            'Age' => $this->security->xss_clean($datax['causesAge']),
            'patientname' => $this->security->xss_clean($datax['causespatientname']),
            'diaggroup' => $this->security->xss_clean($datax['causesdiaggroup']),
            'diagcode' => $this->security->xss_clean($datax['causesdiagcode']),
            'diagnosis' => $this->security->xss_clean($datax['causesdiagnosis']),
            'diagcateg' => $this->security->xss_clean($datax['causesdiagcateg']),
//            'dohrefno'            => $this->security->xss_clean($datax['causesdohrefno']),
            'icdcode' => $this->security->xss_clean($datax['causesicdcode']),
//            'icdcasetype'         => $this->security->xss_clean($datax['causesicdcasetype']),
            'recid' => $this->security->xss_clean($datax['causesrecid']),
            'recby' => $this->security->xss_clean($datax['causesrecby']),
            'lastupdate' => $this->security->xss_clean($datax['causeslastupdate']),
            'station' => $this->security->xss_clean($datax['causesstation']),
//            'verifiedby'          => $this->security->xss_clean($datax['causesverifiedby']),
            'medrecverified' => $this->security->xss_clean($datax['causesmedrecverified']),
//            'verifieddate'        => $this->security->xss_clean($datax['causesverifieddate']),
            'dohstatcounted' => $this->security->xss_clean($datax['causesdohstatcounted']),
            'dohstatrefno' => $this->security->xss_clean($datax['causesdohstatrefno']),
            'icd10cat' => $this->security->xss_clean($datax['causesicd10cat']),
            'validated' => $this->security->xss_clean($datax['causesvalidated'])
        );
        return $this->bmsv2_db->insert('confinementcauses', $data);
    }

    public function insert_new_package_enrollment($datax) {
        $data = array
            (
            'acctno' => $this->security->xss_clean($datax['pkgacctno']),
            'refcode' => $this->security->xss_clean($datax['pkgrefcode']),
            'docreferenceno' => $this->security->xss_clean($datax['pkgdocreferenceno']),
            'lname' => $this->security->xss_clean($datax['pkglname']),
            'fname' => $this->security->xss_clean($datax['pkgfname']),
            'mname' => $this->security->xss_clean($datax['pkgmname']),
            'suffix' => $this->security->xss_clean($datax['pkgsuffix']),
            'patientname' => $this->security->xss_clean($datax['pkgpatientname']),
            'address' => $this->security->xss_clean($datax['pkgaddress']),
            'cityadrs' => $this->security->xss_clean($datax['pkgcityadrs']),
            'contactnumber' => $this->security->xss_clean($datax['pkgcontactnumber']),
            'religion' => $this->security->xss_clean($datax['pkgreligion']),
            'bday' => $this->security->xss_clean($datax['pkgbday']),
            'ageuponenrollment' => $this->security->xss_clean($datax['pkgageuponenrollment']),
            'sex' => $this->security->xss_clean($datax['pkgsex']),
//            'philhealthkind'        => $this->security->xss_clean($datax['pkgphilhealthkind']),
//            'phicidno'              => $this->security->xss_clean($datax['pkgphicidno']),
//            'hmoid'                 => $this->security->xss_clean($datax['pkghmoid']),
//            'hmoname'               => $this->security->xss_clean($datax['pkghmoname']),
            'packagerefcode' => $this->security->xss_clean($datax['pkgpackagerefcode']),
            'packagecode' => $this->security->xss_clean($datax['pkgpackagecode']),
            'packageprice' => $this->security->xss_clean($datax['pkgpackageprice']),
            'pin' => $this->security->xss_clean($datax['pkgpin']),
            'pincode' => $this->security->xss_clean($datax['pkgpincode']),
            'IPDacctcode' => $this->security->xss_clean($datax['pkgIPDacctcode']),
            'IPDacctno' => $this->security->xss_clean($datax['pkgIPDacctno']),
            'slcode' => $this->security->xss_clean($datax['pkgslcode']),
            'admitdate' => $this->security->xss_clean($datax['pkgadmitdate']),
            'dischargedate' => $this->security->xss_clean($datax['pkgdischargedate']),
            'enrolldate' => $this->security->xss_clean($datax['pkgenrolldate']),
            'active' => $this->security->xss_clean($datax['pkgactive']),
            'recby' => $this->security->xss_clean($datax['pkgrecby']),
            'recid' => $this->security->xss_clean($datax['pkgrecid']),
            'updated' => $this->security->xss_clean($datax['pkgupdated']),
            'updatedid' => $this->security->xss_clean($datax['pkgupdatedid']),
            'updatedby' => $this->security->xss_clean($datax['pkgupdatedby']),
//            'inchargeID'            => $this->security->xss_clean($datax['pkginchargeID']),
            'incharge' => $this->security->xss_clean($datax['pkgincharge']),
//            'referedID'             => $this->security->xss_clean($datax['pkgreferedID']),
            'referedby' => $this->security->xss_clean($datax['pkgreferedby']),
            'docrefno' => $this->security->xss_clean($datax['pkgdocrefno']),
            'docname' => $this->security->xss_clean($datax['pkgdocname']),
//            'prenatalID'            => $this->security->xss_clean($datax['pkgprenatalID']),
            'notes' => $this->security->xss_clean($datax['pkgnotes']),
            'station' => $this->security->xss_clean($datax['pkgstation']),
            'totaldeposit' => $this->security->xss_clean($datax['pkgtotaldeposit']),
            'status' => $this->security->xss_clean($datax['pkgstatus']),
        );
        return $this->hospv2_db->insert('packageenrollees', $data);
    }

    public function add_inpatient_sub_data($datax) {
        $data = array
            (
            'pincode' => $this->security->xss_clean($datax['inspincode']),
            'casecode' => $this->security->xss_clean($datax['inscasecode']),
            'caseno' => $this->security->xss_clean($datax['inscaseno']),
            'name' => $this->security->xss_clean($datax['insname']),
            'bday' => $this->security->xss_clean($datax['insbday']),
            'updated' => $this->security->xss_clean($datax['insupdated']),
            'updatedby' => $this->security->xss_clean($datax['insupdatedby']),
            'partialpayment' => $this->security->xss_clean($datax['inspartialpayment']),
//            'lastpayment'                 => $this->security->xss_clean($datax['inslastpayment']),
//            'lastpayreferenceno'          => $this->security->xss_clean($datax['inslastpayreferenceno']),
            'gravida' => $this->security->xss_clean($datax['insgravida']),
            'para' => $this->security->xss_clean($datax['inspara']),
            'abortion' => $this->security->xss_clean($datax['insabortion']),
            'iufd' => $this->security->xss_clean($datax['insiufd']),
            'died' => $this->security->xss_clean($datax['insdied']),
            'pathologic' => $this->security->xss_clean($datax['inspathologic']),
            'linkaccount' => $this->security->xss_clean($datax['inslinkaccount']),
            'infacilitydelivery' => $this->security->xss_clean($datax['insinfacilitydelivery'])
//            'admitdateverified'             => $this->security->xss_clean($datax['insadmitdateverified']),
//            'admitdateverifiedby'           => $this->security->xss_clean($datax['insadmitdateverifiedby']),
//            'admitdateverifieddatetime'     => $this->security->xss_clean($datax['insadmitdateverifieddatetime']),
//            'dischadateverifiedby'          => $this->security->xss_clean($datax['insdischadateverifiedby']),
//            'dischadateverified'            => $this->security->xss_clean($datax['insdischadateverified']),
//            'dischadateverifieddatetime'    => $this->security->xss_clean($datax['insdischadateverifieddatetime'])
        );
        return $this->hospv2_db->insert('inpatient_sub', $data);
    }

    public function add_vital_signs_data($datax) {
        $data = array
            (
            'date' => $this->security->xss_clean($datax['vitdate']),
            'datetime' => $this->security->xss_clean($datax['vitdatetime']),
            'patient' => $this->security->xss_clean($datax['vitpatient']),
            'pin' => $this->security->xss_clean($datax['vitpin']),
            'pincode' => $this->security->xss_clean($datax['vitpincode']),
            'caseno' => $this->security->xss_clean($datax['vitcaseno']),
            'casecode' => $this->security->xss_clean($datax['vitcasecode']),
            'bp_numerator' => $this->security->xss_clean($datax['vitbp_numerator']),
            'bp_denominator' => $this->security->xss_clean($datax['vitbp_denominator']),
            'pulse_rate' => $this->security->xss_clean($datax['vitpulse_rate']),
            'body_temperature' => $this->security->xss_clean($datax['vitbody_temperature']),
            'respiratory_rate' => $this->security->xss_clean($datax['vitrespiratory_rate']),
            '_24hrintake' => $this->security->xss_clean($datax['vit_24hrintake']),
            '_24hroutput' => $this->security->xss_clean($datax['vit_24hroutput']),
            'stool' => $this->security->xss_clean($datax['vitstool']),
            'ageunder' => $this->security->xss_clean($datax['vitageunder']),
            'urine' => $this->security->xss_clean($datax['viturine']),
            'updated' => $this->security->xss_clean($datax['vitupdated']),
            'updated_by' => $this->security->xss_clean($datax['vitupdated_by']),
            'nurse_incharge' => $this->security->xss_clean($datax['vitnurse_incharge']),
            'nurse_ref_no' => $this->security->xss_clean($datax['vitnurse_ref_no'])
        );
        return $this->nacs_db->insert('vitalsigns', $data);
    }

    public function get_data_from_inpatientlist_for_update_admitted_patient($casenox) {
        $this->hospv2_db
                ->select('*')
                ->from('inpatient use index(caseno_index)')
                ->where('caseno', $casenox);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_data_from_inpatientlist_for_MGH_form_data_import($casenox) {
        $this->hospv2_db
                ->select('*')
                ->from(inpatient_tbl)
                ->where('caseno', $casenox);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_data_from_inpatientlist_sub_for_update_admitted_patient($casenox) {
        $this->hospv2_db
                ->select('*')
                ->from('inpatient_sub')
                ->where('caseno', $casenox);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_data_from_vitalstats_for_update_admitted_patient($casenox) {
        $this->nacs_db
                ->select('*')
                ->from('vitalsigns')
                ->where('caseno', $casenox);
        $query = $this->nacs_db->get();
        return $query->row_array();
    }

    public function get_data_from_package_enrollee_for_update_admitted_patient($casenox) {
        $this->hospv2_db
                ->select('*')
                ->from('packageenrollees')
                ->where('IPDacctno', $casenox);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function get_comanage_data($caseno) {
        $this->hospv2_db
                ->select('*')
                ->from('doctorsofpatients')
                ->where("acctno", $caseno);
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function get_hmo_insurance_data($caseno) {
        $this->hospv2_db
                ->select('*')
                ->from('hmomasterlist')
                ->where("acctno", $caseno);
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function get_confinement_causes_data($caseno) {
        $this->bmsv2_db
                ->select('*')
                ->from('confinementcauses')
                ->where("caseno", $caseno);
        $query = $this->bmsv2_db->get();
        return $query->result_array();
    }

    public function get_indication_causes_data($caseno) {
        $this->bmsv2_db
                ->select('*')
                ->from('indicationcauses')
                ->where("caseno", $caseno);
        $query = $this->bmsv2_db->get();
        return $query->result_array();
    }

    public function get_finaldiag_causes_data($caseno) {
        $this->bmsv2_db
                ->select('*')
                ->from('finaldiagnosis')
                ->where("caseno", $caseno);
        $query = $this->bmsv2_db->get();
        return $query->result_array();
    }

    public function get_data_from_vip_table_for_update_admitted_patient($casenox) {
        $this->hospv2_db
                ->select('*')
                ->from('vippersons')
                ->where('caseno', $casenox);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }

    public function delete_patient_old_record_from_comanage_table($caseno) {
        $this->db
                ->where('acctno', $caseno);
        return $this->db->delete('doctorsofpatients');
    }

    public function update_admitted_patient($datax, $caseno) {
        $data = array
            (
            'pxtype' => $this->security->xss_clean($datax['pxtype']),
            'opdtype' => $this->security->xss_clean($datax['opdtype']),
            'casetype' => $this->security->xss_clean($datax['casetype']),
            'admittype' => $this->security->xss_clean($datax['admittype']),
            'logbookCN' => $this->security->xss_clean($datax['logbookCN']),
//            'logbookPIN'                    => $this->security->xss_clean($datax['logbookPIN']),
            'HRnCODE' => $this->security->xss_clean($datax['HRnCODE']),
            'billingcprecipient' => $this->security->xss_clean($datax['billingcprecipient']),
//            'lasttextsent'                  => $this->security->xss_clean($datax['lasttextsent']),
//            'lasttransactionsent'           => $this->security->xss_clean($datax['lasttransactionsent']),
            'vip' => $this->security->xss_clean($datax['vip']),
            'pincode' => $this->security->xss_clean($datax['pincode']),
            'casecode' => $this->security->xss_clean($datax['casecode']),
            'caseyr' => $this->security->xss_clean($datax['caseyr']),
            'caseseq' => $this->security->xss_clean($datax['caseseq']),
            'caseno' => $this->security->xss_clean($datax['caseno']),
            'memberrefno' => $this->security->xss_clean($datax['memberrefno']),
//            'membercardno'                         => $this->security->xss_clean($datax['membercardno']),
            'ledgerfile' => $this->security->xss_clean($datax['ledgerfile']),
            'pinyr' => $this->security->xss_clean($datax['pinyr']),
            'pinseq' => $this->security->xss_clean($datax['pinseq']),
            'PIN' => $this->security->xss_clean($datax['PIN']),
            'pinformat' => $this->security->xss_clean($datax['pinformat']),
            'lname' => $this->security->xss_clean($datax['lname']),
            'fname' => $this->security->xss_clean($datax['fname']),
            'mname' => $this->security->xss_clean($datax['mname']),
            'suffix' => $this->security->xss_clean($datax['suffix']),
            'name' => $this->security->xss_clean($datax['name']),
            'hideinfo' => $this->security->xss_clean($datax['hideinfo']),
            'spouse' => $this->security->xss_clean($datax['spouse']),
            'spousebday' => $this->security->xss_clean($datax['spousebday']),
            'sex' => $this->security->xss_clean($datax['sex']),
            'bday' => $this->security->xss_clean($datax['bday']),
            'Age' => $this->security->xss_clean($datax['Age']),
            'Weight' => $this->security->xss_clean($datax['Weight']),
            'packageCODE' => $this->security->xss_clean($datax['packageCODE']),
            'nationality' => $this->security->xss_clean($datax['nationality']),
            'passportno' => $this->security->xss_clean($datax['passportno']),
            'guarantor' => $this->security->xss_clean($datax['guarantor']),
            'guarantor_rltn' => $this->security->xss_clean($datax['guarantor_rltn']),
            'guarantor_mobileno' => $this->security->xss_clean($datax['guarantor_mobileno']),
            'guarantor_bday' => $this->security->xss_clean($datax['guarantor_bday']),
            'adrs' => $this->security->xss_clean($datax['adrs']),
            'brgy' => $this->security->xss_clean($datax['brgy']),
            'cityadd' => $this->security->xss_clean($datax['cityadd']),
            'provadd' => $this->security->xss_clean($datax['provadd']),
            'citycode' => $this->security->xss_clean($datax['citycode']),
            'provcode' => $this->security->xss_clean($datax['provcode']),
            'zipcode' => $this->security->xss_clean($datax['zipcode']),
            'civilstatus' => $this->security->xss_clean($datax['civilstatus']),
            'contactno' => $this->security->xss_clean($datax['contactno']),
            'mobileno' => $this->security->xss_clean($datax['mobileno']),
            'email' => $this->security->xss_clean($datax['email']),
            'religion' => $this->security->xss_clean($datax['religion']),
            'father' => $this->security->xss_clean($datax['father']),
            'fatheradrs' => $this->security->xss_clean($datax['fatheradrs']),
            'fathernationality' => $this->security->xss_clean($datax['fathernationality']),
            'mother' => $this->security->xss_clean($datax['mother']),
            'motheradrs' => $this->security->xss_clean($datax['motheradrs']),
            'mothernationality' => $this->security->xss_clean($datax['mothernationality']),
            'updated' => $this->security->xss_clean($datax['updated']),
            'doctorid' => $this->security->xss_clean($datax['doctorid']),
            'doctorname' => $this->security->xss_clean($datax['doctorname']),
            'nurseid' => $this->security->xss_clean($datax['nurseid']),
            'nursename' => $this->security->xss_clean($datax['nursename']),
            'hmoid' => $this->security->xss_clean($datax['hmoid']),
            'hmoname' => $this->security->xss_clean($datax['hmoname']),
            'hmoholder' => $this->security->xss_clean($datax['hmoholder']),
            'hmonumber' => $this->security->xss_clean($datax['hmonumber']),
            'hmoapprovalno' => $this->security->xss_clean($datax['hmoapprovalno']),
            'archived' => $this->security->xss_clean($datax['archived']),
            'lastadmitdate' => $this->security->xss_clean($datax['lastadmitdate']),
//            'archiveddate'                  => $this->security->xss_clean($datax['archiveddate']),
            'lastadmittime' => $this->security->xss_clean($datax['lastadmittime']),
            'lastdischdate' => $this->security->xss_clean($datax['lastdischdate']),
            'lastdischtime' => $this->security->xss_clean($datax['lastdischtime']),
            'pat_clascode' => $this->security->xss_clean($datax['pat_clascode']),
            'pat_classub' => $this->security->xss_clean($datax['pat_classub']),
            'pat_classification' => $this->security->xss_clean($datax['pat_classification']),
            'recid' => $this->security->xss_clean($datax['recid']),
            'recby' => $this->security->xss_clean($datax['recby']),
            'station' => $this->security->xss_clean($datax['station']),
            'admitdate' => $this->security->xss_clean($datax['admitdate']),
            'admittime' => $this->security->xss_clean($datax['admittime']),
            'tagfordischa' => $this->security->xss_clean($datax['tagfordischa']),
//            'tagfordischaDT'                => $this->security->xss_clean($datax['tagfordischaDT']),
            'dischadate' => $this->security->xss_clean($datax['dischadate']),
            'dischatime' => $this->security->xss_clean($datax['dischatime']),
//            'dischaid'                      => $this->security->xss_clean($datax['dischaid']),
//            'dischaby'                      => $this->security->xss_clean($datax['dischaby']),
            'discharged' => $this->security->xss_clean($datax['discharged']),
//            'daysconfined'                  => $this->security->xss_clean($datax['daysconfined']),
//            'disposition'                   => $this->security->xss_clean($datax['disposition']),
//            'expireddate'                   => $this->security->xss_clean($datax['expireddate']),
//            'expiredtime'                   => $this->security->xss_clean($datax['expiredtime']),
            'ReferredFromHCI' => $this->security->xss_clean($datax['ReferredFromHCI']),
//            'TransRefHCI'                   => $this->security->xss_clean($datax['TransRefHCI']),
//            'reasonforreferral'             => $this->security->xss_clean($datax['reasonforreferral']),
            'roomref' => $this->security->xss_clean($datax['roomref']),
            'roomcd' => $this->security->xss_clean($datax['roomcd']),
            'roomtype' => $this->security->xss_clean($datax['roomtype']),
            'roomno' => $this->security->xss_clean($datax['roomno']),
            'roombed' => $this->security->xss_clean($datax['roombed']),
            'roominfo' => $this->security->xss_clean($datax['roominfo']),
            'roombrief' => $this->security->xss_clean($datax['roombrief']),
            'roomdate' => $this->security->xss_clean($datax['roomdate']),
            'roomtime' => $this->security->xss_clean($datax['roomtime']),
            'roomrate' => $this->security->xss_clean($datax['roomrate']),
            'PRICEPACKAGE' => $this->security->xss_clean($datax['PRICEPACKAGE']),
//            'rmrateschm'                    => $this->security->xss_clean($datax['rmrateschm']),
//            'RmPHICtype'                    => $this->security->xss_clean($datax['RmPHICtype']),
            'creditmax' => $this->security->xss_clean($datax['creditmax']),
            'addonserv' => $this->security->xss_clean($datax['addonserv']),
            'phiccode' => $this->security->xss_clean($datax['phiccode']),
            'phicmembr' => $this->security->xss_clean($datax['phicmembr']),
//            'phicdependent'                 => $this->security->xss_clean($datax['phicdependent']),
            'phicPIN' => $this->security->xss_clean($datax['phicPIN']),
            'phicmembrname' => $this->security->xss_clean($datax['phicmembrname']),
            'relationtomember' => $this->security->xss_clean($datax['relationtomember']),
            'phiccasefirst' => $this->security->xss_clean($datax['phiccasefirst']),
            'phiccasefirstRefno' => $this->security->xss_clean($datax['phiccasefirstRefno']),
            'phiccasefirstDx' => $this->security->xss_clean($datax['phiccasefirstDx']),
//            'phiccasesecond'                => $this->security->xss_clean($datax['phiccasesecond']),
//            'phiccasesecondRefno'           => $this->security->xss_clean($datax['phiccasesecondRefno']),
//            'phiccasesecondDx'              => $this->security->xss_clean($datax['phiccasesecondDx']),
//            'phicHCItotal'                  => $this->security->xss_clean($datax['phicHCItotal']),
//            'PHICpfTotal'                   => $this->security->xss_clean($datax['PHICpfTotal']),
            'PHICrmtype' => $this->security->xss_clean($datax['PHICrmtype']),
            'dietarycd' => $this->security->xss_clean($datax['dietarycd']),
            'diatary_ins' => $this->security->xss_clean($datax['diatary_ins']),
            'dietstatus' => $this->security->xss_clean($datax['dietstatus']),
            'Diag_chiefcomplain' => $this->security->xss_clean($datax['Diag_chiefcomplain']),
            'Diag_admit' => $this->security->xss_clean($datax['Diag_admit']),
            'Diag_discharge' => $this->security->xss_clean($datax['Diag_discharge']),
//            'Diag_discharge_updatedby'      => $this->security->xss_clean($datax['Diag_discharge_updatedby']),
//            'Diag_discharge_updatedDT'      => $this->security->xss_clean($datax['Diag_discharge_updatedDT']),
//            'Diag_surg_ref'                 => $this->security->xss_clean($datax['Diag_surg_ref']),
//            'Diag_surg'                     => $this->security->xss_clean($datax['Diag_surg']),
//            'Diag_surgICD'                  => $this->security->xss_clean($datax['Diag_surgICD']),
//            'Diag_surg_type'                => $this->security->xss_clean($datax['Diag_surg_type']),
//            'Diag_anes_ref'                 => $this->security->xss_clean($datax['Diag_anes_ref']),
//            'Diag_anes'                     => $this->security->xss_clean($datax['Diag_anes']),
//            'Diag_anesICD'                  => $this->security->xss_clean($datax['Diag_anesICD']),
//            'ICD10'                         => $this->security->xss_clean($datax['ICD10']),
//            'icdcasetype'                   => $this->security->xss_clean($datax['icdcasetype']),
//            'flagme'                        => $this->security->xss_clean($datax['flagme']),
//            'suprvid'                       => $this->security->xss_clean($datax['suprvid']),
//            'suprvby'                       => $this->security->xss_clean($datax['suprvby']),
//            'clearedid'                     => $this->security->xss_clean($datax['clearedid']),
//            'clearedby'                     => $this->security->xss_clean($datax['clearedby']),
//            'clearedtd'                     => $this->security->xss_clean($datax['clearedtd']),
//            'clearedat'                     => $this->security->xss_clean($datax['clearedat']),
//            'Quickadmit'                    => $this->security->xss_clean($datax['Quickadmit']),
//            'patfile'                       => $this->security->xss_clean($datax['patfile']),
//            'imagefile'                     => $this->security->xss_clean($datax['imagefile']),
//            'mypix'                         => $this->security->xss_clean($datax['mypix']),
            'nursestation' => $this->security->xss_clean($datax['nursestation']),
//            'phicpapers'                    => $this->security->xss_clean($datax['phicpapers']),
//            'phicclearby'                   => $this->security->xss_clean($datax['phicclearby']),
//            'phicdeductions'                => $this->security->xss_clean($datax['phicdeductions']),
//            'phicnote'                      => $this->security->xss_clean($datax['phicnote']),
//            'printedby'                     => $this->security->xss_clean($datax['printedby']),
//            'printeddate'                   => $this->security->xss_clean($datax['printeddate']),
//            'billingnote'                   => $this->security->xss_clean($datax['billingnote']),
//            'nobillingdischarged'           => $this->security->xss_clean($datax['nobillingdischarged']),
//            'nbdhospamount'                 => $this->security->xss_clean($datax['nbdhospamount']),
//            'nbddocamount'                  => $this->security->xss_clean($datax['nbddocamount']),
//            'GrossHospAmt'                  => $this->security->xss_clean($datax['GrossHospAmt']),
//            'GrossDocAmt'                   => $this->security->xss_clean($datax['GrossDocAmt']),
//            'GrandTotalBill'                => $this->security->xss_clean($datax['GrandTotalBill']),
//            'phic1caseHCIrecommend'         => $this->security->xss_clean($datax['phic1caseHCIrecommend']),
//            'phic2caseHCIrecommend'         => $this->security->xss_clean($datax['phic2caseHCIrecommend']),
//            'phic1caseDOCrecommend'         => $this->security->xss_clean($datax['phic1caseDOCrecommend']),
//            'phic2caseDOCrecommend'         => $this->security->xss_clean($datax['phic2caseDOCrecommend']),
//            'DiscountPHIChosp'              => $this->security->xss_clean($datax['DiscountPHIChosp']),
//            'DiscountPHICdoc'               => $this->security->xss_clean($datax['DiscountPHICdoc']),
//            'DiscountHosp'                  => $this->security->xss_clean($datax['DiscountHosp']),
//            'DiscountHospDoc'               => $this->security->xss_clean($datax['DiscountHospDoc']),
//            'DiscountHMOHosp'               => $this->security->xss_clean($datax['DiscountHMOHosp']),
//            'DiscountHMODoc'                => $this->security->xss_clean($datax['DiscountHMODoc']),
//            'DiscountSrHosp'                => $this->security->xss_clean($datax['DiscountSrHosp']),
//            'DiscountSrDoc'                 => $this->security->xss_clean($datax['DiscountSrDoc']),
//            'DiscountVATHosp'               => $this->security->xss_clean($datax['DiscountVATHosp']),
//            'DiscountVATDoc'                => $this->security->xss_clean($datax['DiscountVATDoc']),
//            'PNrefno'                       => $this->security->xss_clean($datax['PNrefno']),
//            'PNduedate'                     => $this->security->xss_clean($datax['PNduedate']),
//            'PNamount'                      => $this->security->xss_clean($datax['PNamount']),
//            'PNBalance'                     => $this->security->xss_clean($datax['PNBalance']),
//            'PNlastupdate'                  => $this->security->xss_clean($datax['PNlastupdate']),
//            'PNlastRefno'                   => $this->security->xss_clean($datax['PNlastRefno']),
//            'PNby'                          => $this->security->xss_clean($datax['PNby']),
//            'PNAddress1'                    => $this->security->xss_clean($datax['PNAddress1']),
//            'PNAddress2'                    => $this->security->xss_clean($datax['PNAddress2']),
//            'PNbyCellnumber'                => $this->security->xss_clean($datax['PNbyCellnumber']),
            'OBprocedure' => $this->security->xss_clean($datax['OBprocedure']),
//            'dischargedsameday'             => $this->security->xss_clean($datax['dischargedsameday']),
//            'dischargein48'                 => $this->security->xss_clean($datax['dischargein48']),
//            'deliverycausesofdeaths'        => $this->security->xss_clean($datax['deliverycausesofdeaths']),
//            'deathtype'                     => $this->security->xss_clean($datax['deathtype']),
//            'HAIcase_deviceinfection'       => $this->security->xss_clean($datax['HAIcase_deviceinfection']),
//            'HAIcasedays'                   => $this->security->xss_clean($datax['HAIcasedays']),
//            'HAIVAPinfection'               => $this->security->xss_clean($datax['HAIVAPinfection']),
//            'HAIVAPdays'                    => $this->security->xss_clean($datax['HAIVAPdays']),
//            'HAIBSIinfection'               => $this->security->xss_clean($datax['HAIBSIinfection']),
//            'HAIBSIdays'                    => $this->security->xss_clean($datax['HAIBSIdays']),
//            'HAIUTIinfection'               => $this->security->xss_clean($datax['HAIUTIinfection']),
//            'HAIUTIdays'                    => $this->security->xss_clean($datax['HAIUTIdays']),
//            'HAIcase_nonedeviceinfection'   => $this->security->xss_clean($datax['HAIcase_nonedeviceinfection']),
//            'HAInonecasedays'               => $this->security->xss_clean($datax['HAInonecasedays']),
//            'HAISSInoneinfection'           => $this->security->xss_clean($datax['HAISSInoneinfection']),
//            'HAISSIdays'                    => $this->security->xss_clean($datax['HAISSIdays']),
            'admissionsource' => $this->security->xss_clean($datax['admissionsource']),
//            'phicclaimrefno'                => $this->security->xss_clean($datax['phicclaimrefno']),
//            'phicclaimstatus'               => $this->security->xss_clean($datax['phicclaimstatus']),
//            'pcsoamount'                    => $this->security->xss_clean($datax['pcsoamount']),
//            'pcsorefcode'                   => $this->security->xss_clean($datax['pcsorefcode']),
//            'pcsogrant'                     => $this->security->xss_clean($datax['pcsogrant']),
//            'hmoclaimrefno'                 => $this->security->xss_clean($datax['hmoclaimrefno']),
//            'hmopapers'                     => $this->security->xss_clean($datax['hmopapers']),
//            'hmodeductions'                 => $this->security->xss_clean($datax['hmodeductions']),
//            'hmoclaimstatus'                => $this->security->xss_clean($datax['hmoclaimstatus']),
//            'hmoclaimeddate'                => $this->security->xss_clean($datax['hmoclaimeddate']),
//            'hmoclaimedamount'              => $this->security->xss_clean($datax['hmoclaimedamount']),
//            'hmobalance'                    => $this->security->xss_clean($datax['hmobalance']),
//            'hmovoucherdate'                => $this->security->xss_clean($datax['hmovoucherdate']),
//            'hmovoucherno'                  => $this->security->xss_clean($datax['hmovoucherno']),
//            'hmovoucheramount'              => $this->security->xss_clean($datax['hmovoucheramount']),
//            'needdeposit'                   => $this->security->xss_clean($datax['needdeposit']),
//            'advisedeposit'                 => $this->security->xss_clean($datax['advisedeposit']),
//            'InqBal'                        => $this->security->xss_clean($datax['InqBal']),
//            'NeedDepoamt'                   => $this->security->xss_clean($datax['NeedDepoamt']),
//            'phiccf2prepby'                 => $this->security->xss_clean($datax['phiccf2prepby']),
//            'phiccf2updated'                => $this->security->xss_clean($datax['phiccf2updated']),
//            'Phiccf2done'                   => $this->security->xss_clean($datax['Phiccf2done']),
//            'ReqPHICmdrno'                  => $this->security->xss_clean($datax['ReqPHICmdrno']),
            'ReqPHICmdrweb' => $this->security->xss_clean($datax['ReqPHICmdrweb']),
//            'ReqPHICspouse'                 => $this->security->xss_clean($datax['ReqPHICspouse']),
//            'ReqPHICChild'                  => $this->security->xss_clean($datax['ReqPHICChild']),
//            'ReqPHICOFW'                    => $this->security->xss_clean($datax['ReqPHICOFW']),
//            'ReqPHICparent'                 => $this->security->xss_clean($datax['ReqPHICparent']),
//            'cashierpaid'                   => $this->security->xss_clean($datax['cashierpaid']),
//            'cashiername'                   => $this->security->xss_clean($datax['cashiername']),
//            'cashierbatchrefno'             => $this->security->xss_clean($datax['cashierbatchrefno']),
//            'cashierDT'                     => $this->security->xss_clean($datax['cashierDT']),
//            'verifiedby'                    => $this->security->xss_clean($datax['verifiedby']),
//            'verifiedadmission'             => $this->security->xss_clean($datax['verifiedadmission']),
//            'verifieddatetime'              => $this->security->xss_clean($datax['verifieddatetime']),
//            'medcertrefno'                  => $this->security->xss_clean($datax['medcertrefno']),
//            'patientnickname'               => $this->security->xss_clean($datax['patientnickname']),
//            'Birthcertrefno'                => $this->security->xss_clean($datax['Birthcertrefno']),
//            'medicolegalrefno'              => $this->security->xss_clean($datax['medicolegalrefno']),
//            'diagnosisdone'                 => $this->security->xss_clean($datax['diagnosisdone']),
//            'archivedby'                    => $this->security->xss_clean($datax['archivedby']),
//            'restoreddate'                  => $this->security->xss_clean($datax['restoreddate']),
//            'restored'                      => $this->security->xss_clean($datax['restored']),
//            'restoredby'                    => $this->security->xss_clean($datax['restoredby']),
            'cautions' => $this->security->xss_clean($datax['cautions']),
//            'MedicoLegalReference'          => $this->security->xss_clean($datax['MedicoLegalReference']),
            'minorOR' => $this->security->xss_clean($datax['minorOR']),
            'NurseInchargeID' => $this->security->xss_clean($datax['NurseInchargeID']),
            'NurseIncharge' => $this->security->xss_clean($datax['NurseIncharge']),
            'TBstatus' => $this->security->xss_clean($datax['TBstatus']),
//            'patientisNBB'                  => $this->security->xss_clean($datax['patientisNBB']),
//            'hascateg'                      => $this->security->xss_clean($datax['hascateg']),
//            'phicmemberverified'            => $this->security->xss_clean($datax['phicmemberverified']),
//            'otherdiag'                     => $this->security->xss_clean($datax['otherdiag']),
//            'nursedischadate'               => $this->security->xss_clean($datax['nursedischadate']),
//            'nursedischatime'               => $this->security->xss_clean($datax['nursedischatime']),
//            'TICKETCODE'                    => $this->security->xss_clean($datax['TICKETCODE']),
//            'TICKETDATE'                    => $this->security->xss_clean($datax['TICKETDATE']),
//            'TICKETBY'                      => $this->security->xss_clean($datax['TICKETBY']),
//            'postedby'                      => $this->security->xss_clean($datax['postedby']),
//            'postingdate'                   => $this->security->xss_clean($datax['postingdate']),
//            'pxgroup'                       => $this->security->xss_clean($datax['pxgroup']),
            'lmp' => $this->security->xss_clean($datax['lmp']),
            'antenatal' => $this->security->xss_clean($datax['antenatal']),
            'postnatal' => $this->security->xss_clean($datax['postnatal']),
            'slcode' => $this->security->xss_clean($datax['slcode'])
        );

        $this->hospv2_db->where('caseno', $caseno);
        return $this->hospv2_db->update(inpatient_tbl, $data);
    }

    public function delete_patient_old_record_from_vip_table($caseno) {
        $this->db
                ->where('caseno', $caseno);
        return $this->db->delete('vippersons');
    }

    public function delete_patient_old_record_from_package_table($caseno) {
        $this->db
                ->where('IPDacctno', $caseno);
        return $this->db->delete('packageenrollees');
    }

    public function delete_patient_old_record_from_hmo_table($caseno) {
        $this->db
                ->where('acctno', $caseno);
        return $this->db->delete('hmomasterlist');
    }

    public function delete_patient_old_record_from_causes_table($caseno) {
        $this->bmsv2_db
                ->where('caseno', $caseno);
        return $this->bmsv2_db->delete('confinementcauses');
    }

    public function delete_patient_old_record_from_inpxsub_table($caseno) {
        $this->db
                ->where('caseno', $caseno);
        return $this->db->delete('inpatient_sub');
    }

    public function delete_patient_old_record_from_vitalsigns_table($caseno) {
        $this->nacs_db
                ->where('caseno', $caseno);
        return $this->nacs_db->delete('vitalsigns');
    }

    public function check_supervisor_id($data) {
        $this->hub_db->select('*')
                ->from('usersrights')
                ->where('EmpID', $data['suprvisorid']);

        $query = $this->hub_db->get();
        return $query->row_array();
    }

    public function check_supervisor_pass($data) {
        $this->hub_db->select('*')
                ->from('usersrights')
                ->where('EmpID', $this->security->xss_clean($data['suprvisorid']))
                ->where('EmpPass', $this->encrypt_pass($data['suppassword']));

        $query = $this->hub_db->get();
        return (count($query->row_array()) !== 0) ? TRUE : FALSE;
    }

    public function decrypt_pass($pass) {
        $password = "";
        for ($i = 0; $i < strlen($pass); $i++) {
            $password .= ($i % 2 === 0) ? chr(ord($pass[$i]) - 2) : chr(ord($pass[$i]) - 3);
        }
        return $password;
    }

    public function encrypt_pass($pass) {
        $password = "";
        for ($i = 0; $i < strlen($pass); $i++) {
            $password .= ($i % 2 === 0) ? chr(ord($pass[$i]) + 2) : chr(ord($pass[$i]) + 3);
        }
        return $password;
    }

    public function get_current_user_supervisor_from_usersrights($adminid, $adminsys) {
        $this->hub_db
                ->select('*')
                ->from('usersrights')
                ->where('Adminsys', $adminsys)
                ->where('EmpID', $adminid);
        $query = $this->hub_db->get();
        return $query->row_array();
    }

    public function get_inserted_supervisorIDs_adminsys_from_usersrights($suprvisoridx, $suppasswordx) {
        $this->hub_db
                ->select('*')
                ->from('usersrights')
                ->where('EmpID', $suprvisoridx)
                ->where('EmpPass', $this->encrypt_pass($suppasswordx));
        $query = $this->hub_db->get();
        return $query->row_array();
    }

    public function get_supervisor_data_from_usersrights($headAprofile) {
        $this->hub_db
                ->select('*')
                ->from('usersrights')
                ->where('Passcode', $headAprofile);
        $query = $this->hub_db->get();
        return $query->row_array();
    }

    public function create_log_for_edit_patient_masterlist($data) {
        $this->hubuserlog_db->insert('overrideloghub', $data);
        return $this->hubuserlog_db->insert_id();
    }

    public function create_log_for_edit_admitted_patient($data) {
        $this->hubuserlog_db->insert('overrideloghub', $data);
        return $this->hubuserlog_db->insert_id();
    }

    public function getNurseStationListing() {
        $this->hospv2_db
                ->select('*')
                ->from('nursestations')
                ->order_by("nurselocations");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }
    
    public function getManagementTypeListing() {
        $this->hospv2_db
                ->select('*')
                ->from('typeofmanagement')
                ->order_by("typedscr");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getAdmissionTypeListing() {
        $this->hospv2_db
                ->select('*')
                ->from('admissiontype')
                ->order_by("pxadmittype");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getCaseTypeListing() {
        $this->hospv2_db
                ->select('*')
                ->from('pxcasetypelisting')
                ->order_by("casetypedscr");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getPatientClassListing() {
        $this->hospv2_db
                ->select('*')
                ->from('pxclassification')
                ->order_by("Classificationdscr");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function getRelateToKinListing() {
        $this->hospv2_db
                ->select('*')
                ->from('relationtokin')
                ->order_by("relationship");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }

    public function get_admit_patient_status($PIN) {
        $this->hospv2_db
                ->select('*')
                ->from('inpatient')
                ->where("PIN", $PIN)
                ->where("discharged = 0");
        $query = $this->hospv2_db->get();

        return $query->row_array();
    }

    public function fetch_admitdiag($type) {
        $this->fetch_admitdiag_masterlist($type);

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result();
    }

    public function fetch_admitdiag_masterlist_data($type) {
        $this->hospv2_db->select('*')
                ->from('admitdiag')
                ->order_by('Diagnosis')
                ->where("listtype", $type)
                ->limit(100);
        return $this->hospv2_db->count_all_results();
    }

    public function fetch_admitdiag_masterlist_filtered_data($type) {
        $this->fetch_admitdiag_masterlist($type);

        $query = $this->hospv2_db->get();
        return $query->num_rows();
    }

    public function fetch_admitdiag_masterlist($type) {
        $order_column = array
            (
            "id",
            "refno",
            "ICDcode",
            "Diagnosis",
            "CategDiag",
            "CaseRate",
            "PFrate",
            "HCIRate",
            "RUV",
            "relatedicdcodes",
            "CF2Diagnosis",
            "lastupdate",
            "station",
            "recid",
            "recby",
            "listtype",
            "notes",
            "favorite"
        );

        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('admitdiag')
                ->where("listtype", $type);

        if (!empty($this->input->post("search")["value"])) {
            $this->hospv2_db
                    ->group_start()
                    ->like('Diagnosis', $this->input->post("search")["value"])
                    ->or_like('ICDcode', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) {
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        } else {
            $this->hospv2_db->order_by('Diagnosis', 'ASC');
        }
    }

    public function generate_sl_code($slcode) {
        $this->amsv1_db->select('SLCODE')
                ->from('slaccount')
                ->where('SLCODE', $slcode);

        $query = $this->amsv1_db->get();

        return $query->result();
    }

    public function get_crm_directory_path() {
        $this->localset_db
                ->select('*')
                ->from('reporting')
                ->where('systemapp = "HUBv19"')
                ->where('module = "padreports"');
        $query = $this->localset_db->get();

        return $query->row_array();
    }

    /**
     * Get admission type 
     * @version 2020-02-03
     * @author AB Empeynado
     */
    public function get_Admission_Type() {
        $this->hospv2_db->select('*')
                ->from('admissiontype');

        $query = $this->hospv2_db->get();

        return $query->result();
    }

    public function get_admission_type_for_admission() {
        $this->hospv2_db
                ->select('*')
                ->from('admissiontype')
                ->order_by("pxadmittype");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }
    
    public function generate_accountno() 
    {
        $this->hospv2_db->select('recentacctno')
                ->from('acctnumber')
                ->order_by('recentacctno', 'desc')
                ->limit(1);

        $query = $this->hospv2_db->get();

        return $query->result();
    }
    
    public function generate_pxindexno() 
    {
        $this->hospv2_db->select('recentpin')
                ->from('acctnumber')
                ->order_by('recentpin', 'desc')
                ->limit(1);

        $query = $this->hospv2_db->get();

        return $query->result();
    }
}
