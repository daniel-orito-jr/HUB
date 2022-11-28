<?php

class Emergency_model extends CI_Model 
{
    public function __construct() 
    {
        parent::__construct();
        
        $this->hospv2_db = $this->load->database('hospv2', true);
        $this->amsv1_db = $this->load->database('amsv1', true);
        $this->localset_db = $this->load->database('localset', true);
        $this->opdv2_db = $this->load->database('opdv2', true);
        $this->bmsv2_db = $this->load->database('bmsv2', true);
    }
    
    public function get_hospital() 
    {
        $this->db->select("*")
                ->from(profile_tbl);
        $query = $this->db->get();
        return $query->row_array();
    }
    
    public function get_data_from_patientlist_for_emergency_admit_patient($pinx) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('patientlist')
                ->where('PIN', $pinx);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function generate_caseno_code() 
    {
        $this->hospv2_db->select('caseno')
                ->from('inpatient')
                ->order_by('caseno', 'desc')
                ->limit(1);

        $query = $this->hospv2_db->get();
        return $query->result();
    }
    
    public function get_data_from_inpatient_for_emergency_admit_patient_check_duplicate($pinx)
    {
        $this->hospv2_db
                ->select('*')
                ->from('inpatient')
                ->where('PIN', $pinx)
                ->where('discharged="0"');
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function add_patient_for_emergency_admission($data = []) 
    {
        $result = FALSE;
        if (count($data) != 0) 
        {
            $this->hospv2_db->insert('inpatient', $data);
            $result = $this->hospv2_db->insert_id();
        }
        return $result;
    }
    
    public function getQuickAdmittedPatientDataFromInpatient($discharged,$quickadmit) 
    {
        $this->hospv2_db
                ->group_by("caseno")
                ->select('*')
                ->from('inpatient')
                ->where("discharged", $discharged)
                ->where("Quikadmit", $quickadmit)
                ->order_by("caseno");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }
    
    public function delete_quick_admitted_patient($caseno = '') 
    {
        $result = FALSE;
        
        if (strlen($caseno) > 0) 
        {
            $this->hospv2_db->where('caseno', $caseno);
            $result = $this->hospv2_db->delete('inpatient');
        }
        return $result;
    }
    
    public function fetch_quick_admitted_patients_masterlist_data($discharged,$quickadmit) 
    {
        $this->hospv2_db->select('*')
                ->from('inpatient')
                ->order_by('name')
                ->where("discharged", $discharged)
                ->where("Quikadmit", $quickadmit)
                ->limit(100);

        return $this->hospv2_db->count_all_results();
    }

    public function fetch_quick_admitted_patients_masterlist_filtered_data($discharged,$quickadmit) 
    {
        $this->fetch_quick_admitted_patients_masterlist($discharged,$quickadmit);

        $query = $this->hospv2_db->get();
        return $query->num_rows();
    }

    public function fetch_quick_admitted_patients_masterlist($discharged,$quickadmit) 
    {
        $order_column = array("name", "PIN", "caseno", "HRnCODE", "bday", "sex", "lastdischdate",
                        "adrs", "brgy", "cityadd", "pincode", "updated", "discharged", "Quikadmit");
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)')
                ->where("discharged", $discharged)
                ->where("Quikadmit", $quickadmit);

        if (!empty($this->input->post("search")["value"]))
        {
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])  
                    ->or_like('caseno', $this->input->post("search")["value"])  
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) 
        { 
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); 
        } 
        else 
        {
            $this->hospv2_db->order_by('name', 'ASC'); 
        }
    }

    public function fetch_quick_admitted_patients_masterlist_datatables($discharged,$quickadmit) 
    {
        $this->fetch_quick_admitted_patients_masterlist($discharged,$quickadmit); 

        if ($this->input->post("length") != -1)
        {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result();
    }
    
    public function get_data_from_inpatient_for_edit_quick_admitted_patient($caseno) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('inpatient')
                ->where('caseno', $caseno);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function get_data_from_patientlist_for_edit_quick_admitted_patient($pin) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('patientlist')
                ->where('PIN', $pin);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function update_patient_through_quick_data_edit($pin, $data)
    {
        $this->hospv2_db->where('PIN', $pin);
        return $this->hospv2_db->update('patientlist', $data);
    }
}
