<?php

class MGHclearance_model extends CI_Model 
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
    
    public function fetch_all_ceasarian_diagnosis_masterlist_data() {

        $this->bmsv2_db->select('*')
                ->from('ceasarianindications')
                ->order_by('categdiag')
                ->limit(100);

        return $this->bmsv2_db->count_all_results(); //Return counted results via integer
    }

    public function fetch_all_ceasarian_diagnosis_masterlist_filtered_data() {

        $this->fetch_all_ceasarian_diagnosis_masterlist(); //Get all the data from the doctors table.

        $query = $this->bmsv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    public function fetch_all_ceasarian_diagnosis_masterlist() {

        $order_column = array("diagcd","categdiag", "icdcode", "Groupname", "refno", "lastupdate");
        $this->bmsv2_db
                ->select('*')
                ->limit(100)
                ->from('ceasarianindications');

        if (!empty($this->input->post("search")["value"])) 
        {
            $this->bmsv2_db
                    ->group_start()
                    ->like('categdiag', $this->input->post("search")["value"])
                    ->or_like('refno', $this->input->post("search")["value"])
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

    public function fetch_all_ceasarian_diagnosis_masterlist_datatables() 
    {
        $this->fetch_all_ceasarian_diagnosis_masterlist();

        if ($this->input->post("length") != -1)
        {
            $this->bmsv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->bmsv2_db->get();
        return $query->result();
    }

    public function fetch_surgical()
    {
        $this->fetch_surgical_masterlist();

        if ($this->input->post("length") != -1) 
        {
            $this->bmsv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->bmsv2_db->get();
        return $query->result();
    }

    public function fetch_surgical_masterlist_data() 
    {
        $this->bmsv2_db->select('*')
                ->from('surgicaloutput')
                ->where('surgdiag != ""')
                ->where('surgdiag != "-"')
                ->order_by('surgdiag')
                ->limit(100);
        return $this->bmsv2_db->count_all_results();
    }

    public function fetch_surgical_masterlist_filtered_data() 
    {
        $this->fetch_surgical_masterlist();

        $query = $this->bmsv2_db->get();
        return $query->num_rows();
    }

    public function fetch_surgical_masterlist()
    {
        $order_column = array("diagcd", "refno", "surgdiag", "surgtype", "icdcode", "lastupdate", "recid", "redby", "station");
        $this->bmsv2_db
                ->select('*')
                ->limit(100)
                ->from('surgicaloutput')
                ->where('surgdiag != ""')
                ->where('surgdiag != "-"');

        if (!empty($this->input->post("search")["value"]))
        {
            $this   ->bmsv2_db
                    ->group_start()
                    ->like('refno', $this->input->post("search")["value"])
                    ->or_like('surgdiag', $this->input->post("search")["value"])
                    ->or_like('surgtype', $this->input->post("search")["value"])
                    ->or_like('icdcode', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order")))
        {
            $this->bmsv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        } 
        else 
        {
            $this->bmsv2_db->order_by('surgdiag', 'ASC');
        }
    }

    public function fetch_sterilization()
    {
        $this->fetch_sterilization_masterlist();

        if ($this->input->post("length") != -1) 
        {
            $this->bmsv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->bmsv2_db->get();
        return $query->result();
    }

    public function fetch_sterilization_masterlist_data() 
    {
        $this->bmsv2_db->select('*')
                ->from('sterilization')
                ->where('sterdiag != ""')
                ->where('sterdiag != "-"')
                ->order_by('sterdiag')
                ->limit(100);
        return $this->bmsv2_db->count_all_results();
    }

    public function fetch_sterilization_masterlist_filtered_data() 
    {
        $this->fetch_sterilization_masterlist();

        $query = $this->bmsv2_db->get();
        return $query->num_rows();
    }

    public function fetch_sterilization_masterlist()
    {
        $order_column = array("diagcd", "refno", "sterdiag", "icdcode", "lastupdate", "recid", "redby", "station");
        $this->bmsv2_db
                ->select('*')
                ->limit(100)
                ->from('sterilization')
                ->where('sterdiag != ""')
                ->where('sterdiag != "-"');

        if (!empty($this->input->post("search")["value"]))
        {
            $this   ->bmsv2_db
                    ->group_start()
                    ->like('refno', $this->input->post("search")["value"])
                    ->or_like('sterdiag', $this->input->post("search")["value"])
                    ->or_like('icdcode', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order")))
        {
            $this->bmsv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        } 
        else 
        {
            $this->bmsv2_db->order_by('sterdiag', 'ASC');
        }
    }

    public function get_allpatient_account_from_ledgeripd($caseno) 
    {
        $this->transnow_db
                ->select('*')
                ->from('ledgeripd')
                ->where("patientcase", $caseno);
        $query = $this->transnow_db->get();
        return $query->result_array();
    }
    
    public function get_patient_distinct_requestno_from_ledgeripd($caseno) 
    {
        $this->transnow_db
                ->distinct()
                ->select('reqcode')
                ->from('ledgeripd')
                ->where("patientcase", $caseno);
        $query = $this->transnow_db->get();
        return $query->result_array();
    }
    
    public function get_allpatient_account_via_reqcode_filter_from_ledgeripd($caseno,$reqsno) 
    {
        $this->transnow_db
                ->select('*')
                ->from('ledgeripd')
                ->where("patientcase", $caseno)
                ->where("reqcode", $reqsno);
        $query = $this->transnow_db->get();
        return $query->result_array();
    }
    
    public function get_allpatient_others_transact_account_from_ledgeripd($caseno) 
    {
        $this->transnow_db
                ->select('*')
                ->from('ledgeripd')
                ->where("patientcase", $caseno)
                ->where("transactiontype != 'RETURNS'")
                ->where("transactiontype != 'CHARGES'")
                ->where("transactiontype != 'PAYMENT'");
        $query = $this->transnow_db->get();
        return $query->result_array();
    }
    
    public function get_discharge_diagnosis_data($caseno) 
    {
        $this->medv2_db
                ->select('*')
                ->from('dischargediagnosis')
                ->where("patcaseno", $caseno);
        $query = $this->medv2_db->get();
        return $query->result_array();
    }

    public function fetch_hcilisting()
    {
        $this->fetch_hcilisting_masterlist();

        if ($this->input->post("length") != -1) 
        {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result();
    }

    public function fetch_hcilisting_masterlist_data() 
    {
        $this->hospv2_db->select('*')
                ->from('hcilisting')
                ->where('Hospital != ""')
                ->where('Hospital != "-"')
                ->order_by('Hospital')
                ->limit(100);
        return $this->hospv2_db->count_all_results();
    }

    public function fetch_hcilisting_masterlist_filtered_data() 
    {
        $this->fetch_hcilisting_masterlist();

        $query = $this->hospv2_db->get();
        return $query->num_rows();
    }

    public function fetch_hcilisting_masterlist()
    {
        $order_column = array("id", "refno", "Hospital", "Hospitaladrs", "PAN", "Level", "President", "Capacity", "type", "lastupdate", "recid", "recby", "station");
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('hcilisting')
                ->where('Hospital != ""')
                ->where('Hospital != "-"');

        if (!empty($this->input->post("search")["value"]))
        {
            $this   ->hospv2_db
                    ->group_start()
                    ->like('refno', $this->input->post("search")["value"])
                    ->or_like('Hospital', $this->input->post("search")["value"])
                    ->or_like('type', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order")))
        {
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        } 
        else 
        {
            $this->hospv2_db->order_by('Hospital', 'ASC');
        }
    }
    
    
    
    
    
    public function fetch_referreason()
    {
        $this->fetch_referreason_masterlist();

        if ($this->input->post("length") != -1) 
        {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result();
    }

    public function fetch_referreason_masterlist_data() 
    {
        $this->hospv2_db->select('*')
                ->from('commonreferral')
                ->where('referral != ""')
                ->where('referral != "-"')
                ->order_by('referral')
                ->limit(100);
        return $this->hospv2_db->count_all_results();
    }

    public function fetch_referreason_masterlist_filtered_data() 
    {
        $this->fetch_referreason_masterlist();

        $query = $this->hospv2_db->get();
        return $query->num_rows();
    }

    public function fetch_referreason_masterlist()
    {
        $order_column = array("diagcd", "refno", "referral", "lastupdate", "recid", "recby", "station");
        $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('commonreferral')
                ->where('referral != ""')
                ->where('referral != "-"');

        if (!empty($this->input->post("search")["value"]))
        {
            $this   ->hospv2_db
                    ->group_start()
                    ->like('refno', $this->input->post("search")["value"])
                    ->or_like('referral', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order")))
        {
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        } 
        else 
        {
            $this->hospv2_db->order_by('referral', 'ASC');
        }
    }
    
    public function clear_patient($caseno = '', $inpatientdata = [], $readydischadata = [])
    {
        $result = FALSE;

        if (strlen($caseno) > 0 && count($inpatientdata) > 0) 
        {
            $this->hospv2_db->where('caseno', $caseno);
            $result = $this->hospv2_db->update('inpatient', $inpatientdata);
        }

        if (count($readydischadata) != 0) 
        {
            $this->hospv2_db->insert('readydischa', $readydischadata);
            $result = $this->hospv2_db->insert_id();
        }

        return $result;
    }
    
    public function clear_patient_for_causesconfinement_table($causesconfinementdata = [])
    {
        $result = FALSE;

        if (count($causesconfinementdata) != 0) 
        {
            $this->bmsv2_db->insert('confinementcauses', $causesconfinementdata);
            $result = $this->bmsv2_db->insert_id();
        }

        return $result;
    }
    
    public function clear_patient_for_indicationdiag_table($indicationdiagnosedata = [])
    {
        $result = FALSE;

        if (count($indicationdiagnosedata) != 0) 
        {
            $this->bmsv2_db->insert('indicationcauses', $indicationdiagnosedata);
            $result = $this->bmsv2_db->insert_id();
        }

        return $result;
    }
    
    public function clear_patient_for_finaldiagnosis_table($finaldiagnosisdata = [])
    {
        $result = FALSE;

        if (count($finaldiagnosisdata) != 0) 
        {
            $this->bmsv2_db->insert('finaldiagnosis', $finaldiagnosisdata);
            $result = $this->bmsv2_db->insert_id();
        }

        return $result;
    }

    public function fetch_admitted_patients_masterlist_data($nursestation)
    {
        if($nursestation == "")
        {
            $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)')
                ->where('discharged = 0')
                ->where('Quikadmit = 0');
        }
        else
        {
            $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)')
                ->where('discharged = 0')
                ->where('Quikadmit = 0')
                ->where('nursestation',$nursestation);
        }
        
        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    public function fetch_admitted_patients_masterlist_filtered_data($nursestation) 
    {
        $this->fetch_admitted_patients_masterlist($nursestation); //Get all the data from the doctors table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    public function fetch_admitted_patients_masterlist($nursestation)
    {
        $order_column = array("name", "PIN", "caseno", "HRnCODE", "bday", "sex", "nursestation", "lastdischdate", 
                                "adrs", "brgy", "cityadd", "pincode", "updated", "discharged", "Quikadmit", "clearedby");

        if($nursestation == "")
        {
            $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)')
                ->where('discharged = 0')
                ->where('Quikadmit = 0');
        }
        else
        {
            $this->hospv2_db
                ->select('*')
                ->limit(100)
                ->from('inpatient use index(namex)')
                ->where('discharged = 0')
                ->where('Quikadmit = 0')
                ->where('nursestation',$nursestation);
        }

        if (!empty($this->input->post("search")["value"]))
        { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])
                    ->or_like('nursestation', $this->input->post("search")["value"])
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

    public function fetch_admitted_patients_masterlist_datatables($nursestation) 
    {
        $this->fetch_admitted_patients_masterlist($nursestation); //Get all the data from the patients table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the patients masterlist in the database.
    }
    
    public function delete_patient_record_from_readydischa_table($caseno)
    {
        $this->hospv2_db->where('caseno', $caseno);
        return $this->hospv2_db->delete('readydischa');
    }
    
    public function update_patient_record_from_inpatient_table($datax, $casenox)
    {
        $data = array
        (
            'clearedid' => $this->security->xss_clean($datax['clearedidx']),
            'clearedby' => $this->security->xss_clean($datax['clearedbyx']),
            'clearedtd' => $this->security->xss_clean($datax['clearedtdx']),
            'clearedat' => $this->security->xss_clean($datax['clearedatx'])
        );

        $this->hospv2_db->where('caseno', $casenox);
        return $this->hospv2_db->update('inpatient', $data);
    }
    
    function check_if_image_file_exist($filename)
    {
        return is_file($filename) && file_exists($filename);
    }
}
