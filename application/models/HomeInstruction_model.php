<?php

class HomeInstruction_model extends CI_Model 
{
    public function __construct() 
    {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
        $this->amsv1_db = $this->load->database('amsv1', true);
        $this->localset_db = $this->load->database('localset', true);
        $this->opdv2_db = $this->load->database('opdv2', true);
        $this->bmsv2_db = $this->load->database('bmsv2', true);
        $this->hub_db = $this->load->database('hubv2', true);
        $this->hubuserlog_db = $this->load->database('hubuserlog', true);
        $this->epay_db = $this->load->database('epayv2', true);
        $this->transnow_db = $this->load->database('transnow', true);
        $this->medv2_db = $this->load->database('medv2', true);
    }
    
    public function get_prescription_master_data_for_home_instruction($casenox) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('prescriptionmaster')
                ->where('patacctno', $casenox);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function get_doctors_data_for_home_instruction($doctorid) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('doctors')
                ->where('doccode', $doctorid);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function get_instructions_by_list_from_prescription_master() 
    {
        $this->hospv2_db
                ->select("distinct(instructionsby)")
                ->from('prescriptionmaster')
                ->where('instructionsby != ""')
                ->where('instructionsby != "123"')
                ->where('instructionsby != "232"')
                ->where('instructionsby != "ew"')
                ->where('instructionsby != "qwe"')
                ->order_by("instructionsby");
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }
    
    public function add_new_instruction_to_dischainstructions_table($medicationdata = [])
    {
        $result = FALSE;

        if (count($medicationdata) != 0) 
        {
            $this->hospv2_db->insert('dischainstructions', $medicationdata);
            $result = $this->hospv2_db->insert_id();
        }

        return $result;
    }
    
    public function insert_new_prescription_to_prescriptionmaster_table($data = []) 
    {
        $result = FALSE;

        if (count($data) != 0) 
        {
            $this->hospv2_db->insert('prescriptionmaster', $data);
            $result = $this->hospv2_db->insert_id();
        }

        return $result;
    }
    
    public function update_old_prescription_to_prescriptionmaster_table($caseno = '', $data = [])
    {
        $result = FALSE;

        if (strlen($caseno) > 0 && count($data) > 0)
        {
            $this->hospv2_db->where('patacctno', $caseno);
            $result = $this->hospv2_db->update('prescriptionmaster', $data);
        }

        return $result;
    }
    
    public function check_if_caseno_exist_in_prescription_master_table($casenox) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('prescriptionmaster')
                ->where('patacctno', $casenox);
        $query = $this->hospv2_db->get();
        
        if ($query->num_rows() > 0)
        {
            $result = true;
        }
        else
        {
            $result = false;
        }
        
        return $result;
    }
    
    public function check_if_caseno_exist_in_dischainstructions_table($casenox) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('dischainstructions')
                ->where('patacctno', $casenox);
        $query = $this->hospv2_db->get();
        
        if ($query->num_rows() > 0)
        {
            $result = true;
        }
        else
        {
            $result = false;
        }
        
        return $result;
    }
    
    public function delete_instruction_from_dischainstructions_table($caseno = '')
    {
        $result = FALSE;

        if (strlen($caseno) > 0)
        {
            $this->hospv2_db->where('patacctno', $caseno);
            $result = $this->hospv2_db->delete('dischainstructions');
        }
        
        return $result;
    }
    
    public function get_discha_instructions_multiple_data($caseno) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('dischainstructions')
                ->where("patacctno", $caseno);
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }
}
