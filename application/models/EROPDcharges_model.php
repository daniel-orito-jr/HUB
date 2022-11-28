<?php

class EROPDcharges_model extends CI_Model 
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
        $this->hlsv2_db = $this->load->database('hlsv2', true);
        $this->hrsv2_db = $this->load->database('hrsv2', true);
        $this->messaging_db = $this->load->database('messaging', true); 
    }
    
    public function fetch_walkin_patient_masterlist_data()
    {
        $this->opdv2_db
             ->select('*')
             ->limit(100)
             ->from('opdwalkin')
             ->where('opid != ""');

        return $this->opdv2_db->count_all_results();
    }

    public function fetch_walkin_patient_masterlist_filtered_data() 
    {
        $this->fetch_walkin_patient_masterlist();

        $query = $this->opdv2_db->get();
        return $query->num_rows();
    }

    public function fetch_walkin_patient_masterlist()
    {
        $order_column = array
        (
            "id", "opid", "OPDno", "memberrefno", "membercardno", "Slrefno", "inpatPIN", 
            "patientno", "opdid", "ledgerfile", "name", "bday", "age", "sex", "weight", 
            "Streetadrs", "cityadd", "updated", "hmoid", "hmoname", "doctorid", "doctorname", 
            "reportcode", "recid", "recby", "station", "mypix", "cellphone", "imagefile", 
            "tin", "barangay", "province",
        );
        
        
        $this->opdv2_db
             ->select('*')
             ->limit(100)
             ->from('opdwalkin')
             ->where('opid != ""');

        if (!empty($this->input->post("search")["value"]))
        {
            $this->opdv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])
                    ->or_like('OPDno', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) 
        {
            $this->opdv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        }
        else 
        {
            $this->opdv2_db->order_by('name', 'ASC');
        }
    }

    public function fetch_walkin_patient_masterlist_datatables() 
    {
        $this->fetch_walkin_patient_masterlist();

        if ($this->input->post("length") != -1) 
        {
            $this->opdv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->opdv2_db->get();
        return $query->result();
    }
    
    public function add_new_walkin_patient($data = []) 
    {
        $result = FALSE;

        if (count($data) != 0) 
        {
            $this->opdv2_db->insert('opdwalkin', $data);
            $result = $this->opdv2_db->insert_id();
        }

        return $result;
    }
    
    public function generate_opdno() 
    {
        $this->opdv2_db
             ->select('OPDno')
             ->from('opdwalkin')
             ->order_by('OPDno', 'desc')
             ->limit(1);

        $query = $this->opdv2_db->get();

        return $query->result();
    }
    
    public function delete_walkin_patient_from_opdwalkin($opdid)
    {
        $this->opdv2_db->where('OPDno', $opdid);
        return $this->opdv2_db->delete('opdwalkin');
    }
    
    public function get_data_from_opdwalkin($opdno)
    {
        $this->opdv2_db
                ->select('*')
                ->from('opdwalkin')
                ->where('OPDno', $opdno);
        $query = $this->opdv2_db->get();
        return $query->row_array();
    }
    
    public function update_walkin_patient($opdno = '', $data = []) 
    {
        $result = FALSE;

        if (strlen($opdno) > 0 && count($data) > 0) 
        {
            $this->opdv2_db->where('OPDno', $opdno);
            $result = $this->opdv2_db->update('opdwalkin', $data);
        }

        return $result;
    }
}
