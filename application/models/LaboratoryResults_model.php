<?php

class LaboratoryResults_model extends CI_Model 
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
        $this->messaging_db = $this->load->database('messaging', true); 
    }
    
    public function fetch_masterlist_table_masterlist_data($casecode)
    {
        $this->hlsv2_db
             ->select('*')
             ->limit(100)
             ->from('masterlist')
             ->where('patientno',$casecode);
        
        return $this->hlsv2_db->count_all_results();
    }

    public function fetch_masterlist_table_masterlist_filtered_data($casecode) 
    {
        $this->fetch_masterlist_table_masterlist($casecode);

        $query = $this->hlsv2_db->get();
        return $query->num_rows();
    }

    public function fetch_masterlist_table_masterlist($casecode)
    {
        $order_column = array
        (
            "id", "transcode", "transref", "requestcode",
            "requestdate", "reqrefno", "closed", "trans", 
            "tdate", "amount","salecatg", "pattype", "patientloc",
            "pin", "pincode", "patientno", "patientcase", "patientname",
            "contactno", "transmittal", "adrs", "bday", "age",
            "weight", "gender", "hmoid", "hmoname", "docid",
            "docname", "otherinfo", "station", "reqdept", "reqid",
            "reqby", "recstation", "sysuser", "active", "reportcode",
            "reportdate", "orno", "pendingresult", "manualreqno",
            "imagefile", "costcenter"
        );

        $this->hlsv2_db
            ->select('*')
            ->limit(100)
            ->from('masterlist')
            ->where('patientno',$casecode);

        if (!empty($this->input->post("search")["value"]))
        {
            $this->hlsv2_db
                ->group_start()
                ->like('patientname', $this->input->post("search")["value"])
                ->or_like('patientno', $this->input->post("search")["value"])
                ->or_like('patientcase', $this->input->post("search")["value"])
                ->group_end();
        }

        if (!empty($this->input->post("order"))) 
        {
            $this->hlsv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        }
        else 
        {
            $this->hlsv2_db->order_by('requestdate', 'ASC');
        }
    }

    public function fetch_masterlist_table_masterlist_datatables($casecode) 
    {
        $this->fetch_masterlist_table_masterlist($casecode);

        if ($this->input->post("length") != -1) 
        {
            $this->hlsv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hlsv2_db->get();
        return $query->result();
    }
    
    public function get_data_from_inpatient($casecode) {
        $this->hospv2_db
                ->select('*')
                ->from(inpatient_tbl)
                ->where('casecode', $casecode);
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function get_data_from_ledger_resultlist_view($reportcode) 
    {
        $this->hlsv2_db->select('*')
            ->from(ledger_resultlist_vw)
            ->where('reportcode', $reportcode);

        $query = $this->hlsv2_db->get();
        return $query->row_array();
    }
    
    public function fetch_ledgersale_table_masterlist_data($casecode,$reqcode)
    {
        $this->hlsv2_db
             ->select('*')
             ->limit(100)
             ->from('ledgersales')
             ->where('patientno',$casecode)
             ->where('reqcode',$reqcode);
        
        return $this->hlsv2_db->count_all_results();
    }

    public function fetch_ledgersale_table_masterlist_filtered_data($casecode,$reqcode) 
    {
        $this->fetch_ledgersale_table_masterlist($casecode,$reqcode);

        $query = $this->hlsv2_db->get();
        return $query->num_rows();
    }

    public function fetch_ledgersale_table_masterlist($casecode,$reqcode)
    {
        $order_column = array
        (
            "transactioncode","transcodeid","transref","transactiontype","reqref",
            "reqcode","reqdate","transcode","markforreturn","PINcode","PIN","patientno",
            "patientcase","patientname","categid","formno","hospcode","prodid","dscr",
            "otherinfo","tdate","cost","markupcode","qty","unitqty","retailtype","addonrate",
            "retail","cramt","dbamt","totalamt","creditacct","services","dept","reqdept",
            "active","reqid","reqby","recid","recby","station","acctype","reportcode",
            "reportdate","shiftid","initialstock","creditorcode","manualreqno","deptcateg",
            "stockaccounted","officialresult","resultcode","resultreleased","resultbatch",
            "resultfilename","manualform","medtech","status","coa","orno","batchrefno",
            "otdoneby","otrefno","evaldatetime","Specbarcode","archiveddate","archived",
            "archivedby","restored","restoredby","restoreddate","logbook","logbookdate",
            "requestedat","hmoid","hmoname","paytype","ordate","cancelledbyrequestno",
            "cancelledbyreqcode","transcodeIDcancelled","panel","maincode","panelprice",
            "referdocref","referdocname","serialno"
        );

        $this->hlsv2_db
            ->select('*')
            ->limit(100)
            ->from('ledgersales')
            ->where('patientno',$casecode)
            ->where('reqcode',$reqcode);

        if (!empty($this->input->post("search")["value"]))
        {
            $this->hlsv2_db
                ->group_start()
                ->like('dscr', $this->input->post("search")["value"])
                ->or_like('reqcode', $this->input->post("search")["value"])
                ->group_end();
        }

        if (!empty($this->input->post("order"))) 
        {
            $this->hlsv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        }
        else 
        {
            $this->hlsv2_db->order_by('dscr', 'ASC');
        }
    }

    public function fetch_ledgersale_table_masterlist_datatables($casecode,$reqcode) 
    {
        $this->fetch_ledgersale_table_masterlist($casecode,$reqcode);

        if ($this->input->post("length") != -1) 
        {
            $this->hlsv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hlsv2_db->get();
        return $query->result();
    }
    
    public function get_data_from_masterlist($casecode) 
    {
        $this->hlsv2_db
                ->select('*')
                ->from('masterlist')
                ->where('patientno',$casecode);
        $query = $this->hlsv2_db->get();
        return $query->row_array();
    }
    
    public function fetch_labresults_table_masterlist_data($casecode,$reportno,$reqscode)
    {
        $this->hlsv2_db
             ->select('*')
             ->limit(100)
             ->from('labresults')
             ->where('acctcode',$casecode)
             ->where('reportcode',$reportno)
             ->where('requestcode',$reqscode);
        
        return $this->hlsv2_db->count_all_results();
    }

    public function fetch_labresults_table_masterlist_filtered_data($casecode,$reportno,$reqscode) 
    {
        $this->fetch_labresults_table_masterlist($casecode,$reportno,$reqscode);

        $query = $this->hlsv2_db->get();
        return $query->num_rows();
    }

    public function fetch_labresults_table_masterlist($casecode,$reportno,$reqscode)
    {
        $order_column = array
        (
            "resultid","acctcode","resultrefno","reportcode","reportrefno","prevreportcode","requestcode",
            "transcode","elemcode","groupname","test","reference","siunit","cutoffvalue","absorbance",
            "prevevaldt","prevtestresult","testresult","testunit","formcode","deptsect","formfootnote",
            "marking","priority","chktitle","dscrupdatable","recid","recby","station","updated","reqid",
            "reqby","reqdat","formtype","temporary","evaldatetime","printitem","deptmain","level",
            "minimumvalue","maximumvalue","updown","chkvalue","resultbatch"
        );

        $this->hlsv2_db
            ->select('*')
            ->limit(100)
            ->from('labresults')
            ->where('acctcode',$casecode)
            ->where('reportcode',$reportno)
            ->where('requestcode',$reqscode);

        if (!empty($this->input->post("search")["value"]))
        {
            $this->hlsv2_db
                ->group_start()
                ->like('test', $this->input->post("search")["value"])
                ->or_like('reportcode', $this->input->post("search")["value"])
                ->group_end();
        }

        if (!empty($this->input->post("order"))) 
        {
            $this->hlsv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        }
        else 
        {
            $this->hlsv2_db->order_by('test', 'ASC');
        }
    }

    public function fetch_labresults_table_masterlist_datatables($casecode,$reportno,$reqscode) 
    {
        $this->fetch_labresults_table_masterlist($casecode,$reportno,$reqscode);

        if ($this->input->post("length") != -1) 
        {
            $this->hlsv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hlsv2_db->get();
        return $query->result();
    }
    
    public function fetch_inpatient_masterlist_data()
    {
        $this->hospv2_db->select('*')
            ->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged = 0')
            ->where('Quikadmit = 0');
        
        return $this->hospv2_db->count_all_results();
    }

    public function fetch_inpatient_masterlist_filtered_data() 
    {
        $this->fetch_inpatient_masterlist();

        $query = $this->hospv2_db->get();
        return $query->num_rows();
    }

    public function fetch_inpatient_masterlist()
    {
        $order_column = array("name", "PIN", "caseno", "HRnCODE", "bday", "sex", "nursestation", "lastdischdate",
                                "adrs", "brgy", "cityadd", "pincode", "updated", "discharged", "Quikadmit", "clearedby");

        $this->hospv2_db->select('*')->limit(100)
            ->from('inpatient use index(namex)')
            ->where('discharged = 0')
            ->where('Quikadmit = 0');

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

    public function fetch_inpatient_masterlist_datatables() 
    {
        $this->fetch_inpatient_masterlist();

        if ($this->input->post("length") != -1) 
        {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result();
    }
    
    public function fetch_allow_text() 
    {
        $this->hospv2_db->select('*')
                ->from('textdata');
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function insert_message_to_tbtext_table($message, $cellphone, $station, $transaction, $type) 
    {
        if ($type === "Laboratory Result") 
        {
            $now = new DateTime();
            $datelog = $now->format('Y-m-d h:i:s');
        
            $data = array
            (
                'Datelog' => $this->security->xss_clean($datelog),
                'Message' => $this->security->xss_clean($message),
                'Status' => $this->security->xss_clean('0'),
                'Number' => $this->security->xss_clean($cellphone),
                'userid' => $this->security->xss_clean($this->session->userdata("empname")),
                'station' => $this->security->xss_clean($station),
                'transaction' => $this->security->xss_clean($transaction),
            );
            return $this->messaging_db->insert(tb_text_tbl, $data);
        }
    }
    

}
