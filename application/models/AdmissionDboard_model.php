<?php

class AdmissionDboard_model extends CI_Model 
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
    }

    public function fetch_inpatient_masterlist_data($status,$station,$pxtype)
    {
        if($station !== "ALL" && $pxtype !== "ALL")
        {
            $this->hospv2_db
            ->select('*')
            ->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged',$status)
            ->where('nursestation',$station)
            ->where('pxtype',$pxtype);
        }
        else if($station === "ALL" && $pxtype !== "ALL")
        {
            $this->hospv2_db
            ->select('*')
            ->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged',$status)
            ->where('pxtype',$pxtype);
        }
        else if($station !== "ALL" && $pxtype === "ALL")
        {
            $this->hospv2_db
            ->select('*')
            ->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged',$status)
            ->where('nursestation',$station);
        }
        else if($station === "ALL" && $pxtype === "ALL")
        {
            $this->hospv2_db
            ->select('*')
            ->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged',$status);
        }
        
        return $this->hospv2_db->count_all_results();
    }

    public function fetch_inpatient_masterlist_filtered_data($status,$station,$pxtype) 
    {
        $this->fetch_inpatient_masterlist($status,$station,$pxtype);

        $query = $this->hospv2_db->get();
        return $query->num_rows();
    }

    public function fetch_inpatient_masterlist($status,$station,$pxtype)
    {
        $order_column = array("name", "PIN", "caseno", "HRnCODE", "bday", "sex", "nursestation", "lastdischdate", "phicclaimstatus",
                                "adrs", "brgy", "cityadd", "pincode", "updated", "discharged", "Quikadmit", "clearedby");
        
        if($station !== "ALL" && $pxtype !== "ALL")
        {
            $this->hospv2_db
            ->select('*')
            ->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged',$status)
            ->where('nursestation',$station)
            ->where('pxtype',$pxtype);
        }
        else if($station === "ALL" && $pxtype !== "ALL")
        {
            $this->hospv2_db
            ->select('*')
            ->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged',$status)
            ->where('pxtype',$pxtype);
        }
        else if($station !== "ALL" && $pxtype === "ALL")
        {
            $this->hospv2_db
            ->select('*')
            ->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged',$status)
            ->where('nursestation',$station);
        }
        else if($station === "ALL" && $pxtype === "ALL")
        {
            $this->hospv2_db
            ->select('*')
            ->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged',$status);
        }

        if (!empty($this->input->post("search")["value"]))
        {
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])
                    ->or_like('nursestation', $this->input->post("search")["value"])
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

    public function fetch_inpatient_masterlist_datatables($status,$station,$pxtype) 
    {
        $this->fetch_inpatient_masterlist($status,$station,$pxtype);

        if ($this->input->post("length") != -1) 
        {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result();
    }
    
    public function update_patient_status_credit_line($caseno = '', $data = [])
    {
        $result = FALSE;

        if (strlen($caseno) > 0 && count($data) > 0) 
        {
            $this->hospv2_db->where('caseno', $caseno);
            $result = $this->hospv2_db->update('inpatient', $data);
        }
        
        return $result;
    }
    
    
    
    
    
}
