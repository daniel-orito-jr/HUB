<?php

class RXcreatormaker_model extends CI_Model 
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

    public function fetch_rx($filterdate)
    {
        $this->fetch_rx_masterlist($filterdate);

        if ($this->input->post("length") != -1) 
        {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result();
    }

    public function fetch_rx_masterlist_data($filterdate) 
    {
        $this->hospv2_db->select('*')
                ->from('rxmaster')
                ->where('RxDate',$filterdate)
                ->order_by('Patname', 'ASC')
                ->limit(100);

        return $this->hospv2_db->count_all_results();
    }

    public function fetch_rx_masterlist_filtered_data($filterdate) 
    {
        $this->fetch_rx_masterlist($filterdate);

        $query = $this->hospv2_db->get();
        return $query->num_rows();
    }

    public function fetch_rx_masterlist($filterdate)
    {
        $order_column = array
        (
            "refno", "Patname", "sex", "age", "address", "bday", "dateadmitted",
            "phicrefcode", "pattype", "pincode", "reasonfrx", "Doctor", "DrRefno",
            "S2no", "PTRno", "reqtype", "grouping", "balance", "datedischarged",
            "roomreference", "specialinstruction", "RxBatch", "RxDate", "patacctcode",
            "patacctno", "Licno", "footers", "updateid", "updateby", "updated", 
            "transactiontype", "dept"
        );
        
        $this->hospv2_db
            ->select('*')
            ->from('rxmaster')
            ->where('RxDate',$filterdate)
            ->limit(100);

        if (!empty($this->input->post("search")["value"]))
        {
            $this->hospv2_db
                 ->group_start()
                 ->like('Patname', $this->input->post("search")["value"])
                 ->or_like('RxDate', $this->input->post("search")["value"])
                 ->or_like('RxBatch', $this->input->post("search")["value"])
                 ->group_end();
        }

        if (!empty($this->input->post("order"))) 
        { 
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); 
        } 
        else 
        {
            $this->hospv2_db->order_by('Patname', 'ASC'); 
        }
    }

    public function fetch_inpatient_masterlist_data($patientstatus,$phclaimstatus)
    {
        if($patientstatus !== "x" && $phclaimstatus !== "x")
        {
            if($patientstatus === "DISCHARGED")
            {
                $patientstatux = "1";
            }
            else
            {
                $patientstatux = "0";
            }

            if($phclaimstatus === "CLAIM")
            {
                $phclaimstatux = "ONPROCESS";
            }
            else
            {
                $phclaimstatux = "";
            }

            $this->hospv2_db->select('*')->limit(100)
                ->from('inpatient use index(namex)')
                ->where('discharged',$patientstatux)
                ->where('Quikadmit = 0')
                ->where('pxtype = "IPD"')
                ->where('phicclaimstatus',$phclaimstatux);
        }
        else
        {
            $this->hospv2_db->select('*')->limit(100)
                ->from('inpatient use index(namex)')
                ->where('discharged = 0');
        }
            
        
        return $this->hospv2_db->count_all_results();
    }

    public function fetch_inpatient_masterlist_filtered_data($patientstatus,$phclaimstatus) 
    {
        $this->fetch_inpatient_masterlist($patientstatus,$phclaimstatus);

        $query = $this->hospv2_db->get();
        return $query->num_rows();
    }

    public function fetch_inpatient_masterlist($patientstatus,$phclaimstatus)
    {
        $order_column = array("name", "PIN", "caseno", "HRnCODE", "bday", "sex", "nursestation", "lastdischdate", "phicclaimstatus",
                                "adrs", "brgy", "cityadd", "pincode", "updated", "discharged", "Quikadmit", "clearedby");
        
        if($patientstatus !== "x" && $phclaimstatus !== "x")
        {
            if($patientstatus === "DISCHARGED")
            {
                $patientstatux = "1";
            }
            else
            {
                $patientstatux = "0";
            }

            if($phclaimstatus === "CLAIM")
            {
                $phclaimstatux = "ONPROCESS";
            }
            else
            {
                $phclaimstatux = "";
            }

            $this->hospv2_db->select('*')->limit(100)
                ->from('inpatient use index(namex)')
                ->where('discharged',$patientstatux)
                ->where('Quikadmit = 0')
                ->where('pxtype = "IPD"')
                ->where('phicclaimstatus',$phclaimstatux);
        }
        else 
        {
            $this->hospv2_db->select('*')->limit(100)
                ->from('inpatient use index(namex)')
                ->where('discharged = 0');
        }

        if (!empty($this->input->post("search")["value"]))
        {
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

    public function fetch_inpatient_masterlist_datatables($patientstatus,$phclaimstatus) 
    {
        $this->fetch_inpatient_masterlist($patientstatus,$phclaimstatus);

        if ($this->input->post("length") != -1) 
        {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result();
    }
    
    public function fetch_outpatient()
    {
        $this->fetch_outpatient_masterlist();

        if ($this->input->post("length") != -1) 
        {
            $this->opdv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->opdv2_db->get();
        return $query->result();
    }

    public function fetch_outpatient_masterlist_data() 
    {
        $this->opdv2_db->select('*')
                ->from('opdpatient')
                ->order_by('name')
                ->limit(100);
        return $this->opdv2_db->count_all_results();
    }

    public function fetch_outpatient_masterlist_filtered_data() 
    {
        $this->fetch_outpatient_masterlist();

        $query = $this->opdv2_db->get();
        return $query->num_rows();
    }

    public function fetch_outpatient_masterlist()
    {
        $order_column = array
        (
            "id", "opid", "pinyr", "pin", "OPDrefno", "membercardno", "memberrefno", "inpatPIN", "patientno", "lname", "fname", "mname", 
            "name", "bday", "age", "sex", "adrs", "bloodtype", "religion", "cityadd", "civilstatus", "contactno", "updated", "recid", 
            "recby", "station", "mypix", "checkupactive", "reportcode", "slaccount", "allergies", "lastdelivery", "lmp", "edc", "noofchildren", 
            "pxtype", "lastconsultation", "temp", "bp", "weight", "lastdocref", "lastdocname", "pxclassification", "fambackground", "hmoname", 
        );
        
        $this->opdv2_db
                ->select('*')
                ->limit(100)
                ->from('opdpatient');

        if (!empty($this->input->post("search")["value"]))
        {
            $this   ->opdv2_db
                    ->group_start()
                    ->like('name', $this->input->post("search")["value"])
                    ->or_like('patientno', $this->input->post("search")["value"])
                    ->or_like('inpatPIN', $this->input->post("search")["value"])
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
    
    public function get_data_from_opdpatient_for_rxcreator_data_import($patientno) 
    {
        $this->opdv2_db
                ->select('*')
                ->from('opdpatient')
                ->where('patientno', $patientno);
        $query = $this->opdv2_db->get();
        return $query->row_array();
    }

    public function fetch_external_items_masterlist_data($doctype)
    {
        if($doctype === "LABORATORY REQUEST")
        {
            $this->medv2_db
            ->select('*')
            ->from('externalitems')
            ->where('groupname = "LAB-Laboratory"')
            ->order_by('dscr', 'ASC')
            ->limit(100);
        }
        else if($doctype === "Select")
        {
            $this->medv2_db
            ->select('*')
            ->from('externalitems')
            ->order_by('dscr', 'ASC')
            ->limit(100);
        }
        else
        {
            $this->medv2_db
            ->select('*')
            ->from('externalitems')
            ->where('groupname = "MED-Drugs and Meds"')
            ->where('brand != ""')  
            ->order_by('dscr', 'ASC')
            ->limit(100);
        }

        return $this->medv2_db->count_all_results();
    }

    public function fetch_external_items_masterlist_filtered_data($doctype) 
    {
        $this->fetch_external_items_masterlist($doctype);

        $query = $this->medv2_db->get();
        return $query->num_rows();
    }

    public function fetch_external_items_masterlist($doctype)
    {
        $order_column = array("idno", "productid", "hospcode", "hospprodID", "hospdscr", "dscr", "Generic",
                              "brand", "Purpose", "sideeffect", "prep", "groupname", "unitprice", "unit",
                              "updated", "station", "recid", "recby");

        if($doctype === "LABORATORY REQUEST")
        {
            $this->medv2_db
            ->select('*')
            ->from('externalitems')
            ->where('groupname = "LAB-Laboratory"')
            ->limit(100);
        }
        else if($doctype === "Select")
        {
            $this->medv2_db
            ->select('*')
            ->from('externalitems')
            ->limit(100);
        }
        else
        {
            $this->medv2_db
            ->select('*')
            ->from('externalitems')
            ->where('groupname = "MED-Drugs and Meds"')
            ->where('brand != ""')  
            ->limit(100);
        }

        if (!empty($this->input->post("search")["value"]))
        {
            $this->medv2_db
                    ->group_start()
                    ->like('Generic', $this->input->post("search")["value"])
                    ->or_like('brand', $this->input->post("search")["value"])
                    ->or_like('productid', $this->input->post("search")["value"])
                    ->or_like('dscr', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) 
        {
            $this->medv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        }
        else 
        {
            $this->medv2_db->order_by('dscr', 'ASC');
        }
    }

    public function fetch_external_items_masterlist_datatables($doctype) 
    {
        $this->fetch_external_items_masterlist($doctype);

        if ($this->input->post("length") != -1) 
        {
            $this->medv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->medv2_db->get();
        return $query->result();
    }
    
    public function get_balance_data_from_ledgeripd_table_transnow($casenox) 
    {
        $this->transnow_db
                ->select('*, SUM(totalamt) AS balance')
                ->from('ledgeripd')
                ->where('patientcase', $casenox);
        $query = $this->transnow_db->get();
        return $query->row_array();
    }
    
    public function get_payment_data_from_ledgeripd_table_transnow($casenox) 
    {
        $this->transnow_db
                ->select('tempunitprice as payment')
                ->from('ledgeripd')
                ->where('patientcase', $casenox)
                ->where('transactiontype = "PAYMENT"');
        
        $query = $this->transnow_db->get();
        return $query->row_array();
    }
    
    public function add_prescription($data = []) 
    {
        $result = FALSE;

        if (count($data) != 0) 
        {
            $this->hospv2_db->insert('rxmaster', $data);
            $result = $this->hospv2_db->insert_id();
        }

        return $result;
    }
    
    public function get_last_rxmaster_rxbatch_code()
    {
        $this->hospv2_db->select('RxBatch')
                ->from('rxmaster')
                ->order_by('RxBatch', 'desc')
                ->limit(1);

        $query = $this->hospv2_db->get();

        return $query->result();
    }
    
    public function add_new_prescription_to_prescriptions_table($genericdata = [])
    {
        $result = FALSE;

        if (count($genericdata) != 0) 
        {
            $this->hospv2_db->insert('prescriptions', $genericdata);
            $result = $this->hospv2_db->insert_id();
        }

        return $result;
    }
    
    public function delete_rx_from_rxmasterlists_table($rxbatchcode = '')
    {
        $result = FALSE;

        if (strlen($rxbatchcode) > 0)
        {
            $this->hospv2_db->where('RxBatch', $rxbatchcode);
            $result = $this->hospv2_db->delete('rxmaster');
        }
        
        return $result;
    }
    
    public function delete_rx_from_prescriptions_table($rxbatchcode = '')
    {
        $result = FALSE;

        if (strlen($rxbatchcode) > 0)
        {
            $this->hospv2_db->where('RxBatch', $rxbatchcode);
            $result = $this->hospv2_db->delete('prescriptions');
        }
        
        return $result;
    }
    
    public function get_data_from_rxmaster_for_update_rx($RxBatchNo) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('rxmaster')
                ->where('RxBatch', $RxBatchNo);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function get_prescriptions_multiple_data($RxBatchNo) 
    {
        $this->hospv2_db
                ->select('*')
                ->from('prescriptions')
                ->where("RxBatch", $RxBatchNo);
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }
    
    public function update_prescription($RxBatch = '', $data = [])
    {
        $result = FALSE;

        if (strlen($RxBatch) > 0 && count($data) > 0)
        {
            $this->hospv2_db->where('RxBatch', $RxBatch);
            $result = $this->hospv2_db->update('rxmaster', $data);
        }

        return $result;
    }
}
