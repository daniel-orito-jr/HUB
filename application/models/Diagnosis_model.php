<?php

class Diagnosis_model extends CI_Model{
    public function __construct() 
            {
        parent::__construct();

        $this->hospv2_db = $this->load->database('hospv2', true);
        $this->bmsv2_db = $this->load->database('bmsv2', true);
        $this->dasv2_db = $this->load->database('dasv2', true);
    }

    public function fetch_diagnosis()
    {
        $this->fetch_diagnosis_masterlist();

        if ($this->input->post("length") != -1) 
        {
            $this->bmsv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->bmsv2_db->get();
        return $query->result();
    }

    public function fetch_diagnosis_masterlist_data() 
    {
        $this->bmsv2_db->select('*')
                ->from('diagnosiscateg')
                ->order_by('categdiag')
                ->limit(100);
        return $this->bmsv2_db->count_all_results();
    }

    public function fetch_diagnosis_masterlist_filtered_data() 
    {
        $this->fetch_diagnosis_masterlist();

        $query = $this->bmsv2_db->get();
        return $query->num_rows();
    }

    public function fetch_diagnosis_masterlist()
    {
        $order_column = array("diagcd", "refno", "categdiag", "Groupname", "icdcode", "lastupdate", "recid", "redby", "station");
        $this->bmsv2_db
                ->select('*')
                ->limit(100)
                ->from('diagnosiscateg');

        if (!empty($this->input->post("search")["value"]))
        {
            $this   ->bmsv2_db
                    ->group_start()
                    ->like('refno', $this->input->post("search")["value"])
                    ->or_like('categdiag', $this->input->post("search")["value"])
                    ->or_like('Groupname', $this->input->post("search")["value"])
                    ->or_like('icdcode', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order")))
        {
            $this->bmsv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        } 
        else 
        {
            $this->bmsv2_db->order_by('categdiag', 'ASC');
        }
    }
    
    public function get_selected_diagnosis($diagcode = '')
    {
        $result = FALSE;

        if (strlen($diagcode) > 0) 
        {
            $this->bmsv2_db->select('*')
                    ->from('diagnosiscateg')
                    ->where('diagcd', $diagcode);

            $query = $this->bmsv2_db->get();

            $result = $query->result();
        }

        return $result;
    }
    
    public function update_diagnosis($diagcode = '', $data = []) 
    {
        $result = FALSE;

        if (strlen($diagcode) > 0 && count($data) > 0) 
        {
            $this->bmsv2_db->where('diagcd', $diagcode);
            $result = $this->bmsv2_db->update('diagnosiscateg', $data);
        }
        return $result;
    }
    
    public function delete_diagnosis($diagcode = '') 
    {
        $result = FALSE;

        if (strlen($diagcode) > 0)
        {
            $this->bmsv2_db->where('diagcd', $diagcode);
            $result = $this->bmsv2_db->delete('diagnosiscateg');
        }
        return $result;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public function fetch_icd10()
    {
        $this->fetch_icd10_masterlist();

        if ($this->input->post("length") != -1) 
        {
            $this->dasv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->dasv2_db->get();
        return $query->result();
    }

    public function fetch_icd10_masterlist_data() 
    {
        $this->dasv2_db->select('*')
                ->from('ricd10')
                ->order_by('icd10desc')
                ->limit(100);
        return $this->dasv2_db->count_all_results();
    }

    public function fetch_icd10_masterlist_filtered_data() 
    {
        $this->fetch_icd10_masterlist();

        $query = $this->dasv2_db->get();
        return $query->num_rows();
    }

    public function fetch_icd10_masterlist()
    {
        $order_column = array
        (
            "refno",
            "icd10code",
            "icd10desc",
            "icd10cat",
            "station",
            "recby",
            "recid",
            "lastupdate"
        );
        
        $this->dasv2_db
                ->select('*')
                ->limit(100)
                ->from('ricd10');

        if (!empty($this->input->post("search")["value"]))
        {
            $this   ->dasv2_db
                    ->group_start()
                    ->like('icd10desc', $this->input->post("search")["value"])
                    ->or_like('refno', $this->input->post("search")["value"])
                    ->or_like('icd10code', $this->input->post("search")["value"])
                    ->or_like('id', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order")))
        {
            $this->dasv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        } 
        else 
        {
            $this->dasv2_db->order_by('icd10desc', 'ASC');
        }
    }
}
