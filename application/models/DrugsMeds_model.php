<?php

class DrugsMeds_model extends CI_Model{
    //put your code here
    
    public function __construct() {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
        $this->transnow_db = $this->load->database('transnow', true);
        $this->dweclaims_db = $this->load->database('dweclaims',true);
        $this->localset_db = $this->load->database('localset',true);

    }
    
    public function fetch_all_patients_masterlist() {

        $order_column = array("pincode", "PIN", "casecode", "caseno", "name","admission","discharge","discharged","phicPIN"); //To be added to the column in the datatable.
        $this->hospv2_db
                ->select('pincode,PIN,casecode,caseno,name,concat(admitdate," ",admittime) as admission,concat(dischadate," ",dischatime) as discharge,discharged,phicPIN')
                ->limit(100)
                ->from('inpatient use index(namex)'); //Getting all the data from the doctors masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('pincode', $this->input->post("search")["value"]) 
                    ->or_like('PIN', $this->input->post("search")["value"])
                    ->or_like('casecode', $this->input->post("search")["value"])
                    ->or_like('caseno', $this->input->post("search")["value"])
                    ->or_like('phicPIN', $this->input->post("search")["value"])
                    ->or_like('name', $this->input->post("search")["value"])//fetch all data according to the value inputted in the search field
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('admitdate', 'DESC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }
    
    public function fetch_all_patients_masterlist_data() {

        $this->hospv2_db->select('pincode,PIN,casecode,caseno,name,concat(admitdate," ",admittime) as admission,concat(dischadate," ",dischatime) as discharge,discharged,phicPIN')
                ->from('inpatient use index(namex)')
                ->order_by('admitdate','DESC')
                ->limit(100);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }
    
     public function fetch_all_patients_masterlist_filtered_data() {

        $this->fetch_all_patients_masterlist(); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }
    
     public function fetch_all_patients_masterlist_datatables() {
        $this->fetch_all_patients_masterlist(); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }
    
    /*
     * Import Medicines from Transnow.LedgerIPD group by patient
     * @author Alynna Pajaron
     * @version 03-29-2019
     */
    
    public function fetch_drugs_medicines($casecode) {

        $order_column = array("drug_id","drug_hcode", "drug_genname", "drug_route","drug_freq","drug_quantity", "drug_tamount","drug_dateadded"); //To be added to the column in the datatable.
        $this->dweclaims_db
                ->select('*')
                ->from('cf4drug use index(drug_casecode)')
                ->where('drug_casecode',$casecode);//Getting all the data from the doctors masterlist in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->dweclaims_db
                    ->group_start()
                    ->like('drug_hcode', $this->input->post("search")["value"]) 
                    ->or_like('drug_genname', $this->input->post("search")["value"])
                    ->or_like('drug_route', $this->input->post("search")["value"])
                    ->or_like('drug_quantity', $this->input->post("search")["value"])
                    ->or_like('drug_freq', $this->input->post("search")["value"])//fetch all data according to the value inputted in the search field
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->dweclaims_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->dweclaims_db->order_by('drug_genname', 'ASC'); //datatable data's are ordered in ascending order starting with the lastname
        }
    }
    
    public function fetch_drugs_medicines_data($casecode) {

         $this->dweclaims_db
                ->select('*')
                ->from('cf4drug use index(drug_casecode)')
                ->where('drug_casecode',$casecode)
                ->order_by('drug_genname','ASC');

        return $this->dweclaims_db->count_all_results(); //Return counted results via integer
    }
    
     public function fetch_drugs_medicines_filtered_data($casecode) {

        $this->fetch_drugs_medicines($casecode); //Get all the data from the doctors table.

        $query = $this->dweclaims_db->get();
        return $query->num_rows(); //Return number of rows
    }
    
     public function fetch_drugs_medicines_datatables($casecode) {
        $this->fetch_drugs_medicines($casecode); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) {
            $this->dweclaims_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->dweclaims_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }
    
    public function updateRouteFrequency($datax)
    {
        $data = array
        (
            'drug_route' => $this->security->xss_clean($datax['drug_route']),
            'drug_freq' => $this->security->xss_clean($datax['drug_freq']),
            'drug_recordedby' => $this->security->xss_clean($datax['recordedby']),
            'drug_recordedid' => $this->security->xss_clean($datax['recordedid']),
            'drug_dateadded' => $this->security->xss_clean($datax['dateadded']),
        );
        $this->dweclaims_db->where('drug_id', $datax['drug_id']);
        return $this->dweclaims_db->update(cf4drug_tbl, $data);
    }
    
    public function fetchMedicineFromLedgerIPD($casecode)
    {
          $this->transnow_db
                ->select('patientcase,patientno,prodid,dscr,sum(qty) as quantity,sum(totalamt) as tamount, tdate, phicenabled, hospcode ')
                ->from ('ledgeripd')  
                ->where('patientno', $casecode)
                ->where('substr(hospcode,1,4)',"PHDM")
                  ->group_by('prodid');
        $query = $this->transnow_db->get();
        return $query->result_array();
    }
    
    public function fetchMedicineFromCF4drug($casecode,$prodid)
    {
          $this->dweclaims_db
                ->select('drug_id')
                ->from ('CF4drug')  
                ->where('drug_casecode', $casecode)
                ->where('drug_hcode', $prodid);
        $query = $this->dweclaims_db->get();
        return $query->row_array();
    }
    
    public function updateQuantityTotalAmtFromCF4drug($id,$quantity,$tamount)
    {
        $data = array
        (
            'drug_quantity' => $this->security->xss_clean($quantity),
            'drug_tamount' => $this->security->xss_clean($tamount),
            'drug_recordedby' => $this->security->xss_clean($this->session->userdata('empname')),
            'drug_recordedid' => $this->security->xss_clean($this->session->userdata('hubuserPasscode')),
            'drug_dateadded' => $this->security->xss_clean(date('Y-m-d')),
        );
        $this->dweclaims_db->where('drug_id', $id);
        return $this->dweclaims_db->update(cf4drug_tbl, $data);
    }
    
    public function fetchDataFromLocalset($ip)
    {
          $this->localset_db
                ->select('PCcode,defaultstation')
                ->from ('setting')  
                ->where('pcipaddress', $ip);
        $query = $this->localset_db->get();
        return $query->row_array();
    }
    
    public function insertMedicineToCF4drug($ledgerIPDdata,$localsetData)
    {
        $data = array
            (
            'drug_csno' => $this->security->xss_clean($ledgerIPDdata['patientcase']),
            'drug_casecode' => $this->security->xss_clean($ledgerIPDdata['patientno']),
            'drug_hcode' => $this->security->xss_clean($ledgerIPDdata['prodid']),
            'drug_genname' => $this->security->xss_clean($ledgerIPDdata['dscr']),
            'drug_quantity' => $this->security->xss_clean($ledgerIPDdata['quantity']),
            'drug_tamount' => $this->security->xss_clean($ledgerIPDdata['tamount']),
            'drug_dateadded' => $this->security->xss_clean(date('Y-m-d')),
            'drug_station' => $this->security->xss_clean($localsetData['defaultstation']),
            'drug_pcCode' => $this->security->xss_clean($localsetData['PCcode']),
            'drug_recordedby' => $this->security->xss_clean($this->session->userdata('empname')),
            'drug_recordedid' => $this->security->xss_clean($this->session->userdata('hubuserPasscode')),
            
        );
        return $this->dweclaims_db->insert(cf4drug_tbl, $data); 
    }
    
    /*
     * Course In the Ward
     * @author Alynna Rose Pajaron
     * @version 04-08-2019
     */
    
    /*
     * Fetch Doctor's action
     * 
     */

      public function get_doc_act($csno)
    {
        $order_column = array("doact_id",null,"doact_date","doact_action");
     
            $this->dweclaims_db->select("*")
                    ->from(cf4docact_tbl)
                    ->where('doact_csno',$csno);
                   
            if(!empty($this->input->post("search")["value"]))  
                {  
                    $this->dweclaims_db->group_start()
                        -> like("doact_date", $this->input->post("search")["value"])
                        ->or_like("doact_action", $this->input->post("search")["value"])
                        ->group_end();
                }  
        
            if(!empty($this->input->post("order")))  
            {  
                $this->dweclaims_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);  
            }  
            else  
            {  
                $this->dweclaims_db->order_by("doact_date","ASC");
            }
    }
   
    function make_doc_act_datatables($csno){  
        $this->get_doc_act($csno);  
        if($this->input->post("length") != -1)  
        {  
            $this->dweclaims_db->limit($this->input->post('length'), $this->input->post('start'));  
        }
        $query = $this->dweclaims_db->get();  
        return $query->result();  
    }
    
 
    function get_doc_act_filtered_data($csno){  
        $this->get_doc_act($csno);  
        $query = $this->dweclaims_db->get();  
        return $query->num_rows();  
    }
    
    public function get_doc_act_data($csno)
    {
         $this->dweclaims_db->select("*")
                    ->from(cf4docact_tbl)
                    ->where('doact_csno',$csno)
                    ->order_by('doact_date','ASC');
        
        return $this->dweclaims_db->count_all_results();
    }
    
    public function remove_docact($id)
    {
        $this->dweclaims_db->where('doact_id', $id);
        return $this->dweclaims_db->delete(cf4docact_tbl);

    }
    
    public function update_docact($datax,$localsetData)
    {
        $data = array(
        'doact_date'      => $this->security->xss_clean($datax['doact_date']),
        'doact_action'    => $this->security->xss_clean($datax['doact_action']),
        'station' => $this->security->xss_clean($localsetData['defaultstation']),
        'pcCode' => $this->security->xss_clean($localsetData['PCcode']),
        'doact_updatedid' => $this->security->xss_clean($datax['doact_updatedid']),
        'doact_updatedby' => $this->security->xss_clean($datax['doact_updatedby']),
        'updated' => $this->security->xss_clean($datax['updated'])
        );
        
        $this->dweclaims_db->where('doact_id',  $this->security->xss_clean($datax['doact_id']));
        return $this->dweclaims_db->update(cf4docact_tbl, $data);
    }
    
    public function insertDocAct($datax,$localsetData)
    {
        $data = array
            (
            'doact_csno'      => $this->security->xss_clean($datax['doact_csno']),
            'doact_date'      => $this->security->xss_clean($datax['doact_date']),
            'doact_action'    => $this->security->xss_clean($datax['doact_action']),
            'doact_patpin'    => $this->security->xss_clean($datax['doact_patpin']),
            'doact_pin'    => $this->security->xss_clean($datax['doact_pin']),
            'station' => $this->security->xss_clean($localsetData['defaultstation']),
            'pcCode' => $this->security->xss_clean($localsetData['PCcode']),
            'doact_updatedid' => $this->security->xss_clean($datax['doact_updatedid']),
            'doact_updatedby' => $this->security->xss_clean($datax['doact_updatedby']),
            'updated' => $this->security->xss_clean($datax['updated'])
            
        );
        return $this->dweclaims_db->insert(cf4docact_tbl, $data); 
    }
}
