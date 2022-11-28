<?php

class RadiologyResults_model extends CI_Model 
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
    
    public function fetch_radpatient_masterlist_data($datetype)
    {
        $datenow = $this->get_current_date();
        $date = new DateTime($datenow);
        $currentxyear = date_format($date, 'Y');
        $previousyear = date("Y",strtotime("-1 year"));
        
        if($datetype == "current record")
        {
            $array = array($currentxyear, $previousyear);
            
            $this->hrsv2_db
            ->select('*')
            ->limit(100)
            ->from('masterlist')
            ->where_in('year(tdate)', $array);
        }
        else
        {
            $this->hrsv2_db
            ->select('*')
            ->limit(100)
            ->from('masterlist');
        }
        
        return $this->hrsv2_db->count_all_results();
    }

    public function fetch_radpatient_masterlist_filtered_data($datetype) 
    {
        $this->fetch_radpatient_masterlist($datetype);

        $query = $this->hrsv2_db->get();
        return $query->num_rows();
    }

    public function fetch_radpatient_masterlist($datetype)
    {
        $order_column = array
        (
            "id","transcode","transref","requestcode","requestdate","reqrefno",
            "closed","trans","tdate","amount","salecatg","pattype","patientloc",
            "pin","pincode","patientno","patientcase","patientname","contactno",
            "transmittal","adrs","bday","age","weight","gender","hmoid","hmoname",
            "docid","docname","otherinfo","station","reqdept","reqid","reqby",
            "recid","recby","recstation","sysuser","active","reportcode",
            "reportdate","orno","pendingresult","manualreqno","imagefile","costcenter"
        );
        
        $datenow = $this->get_current_date();
        $date = new DateTime($datenow);
        $currentxyear = date_format($date, 'Y');
        $previousyear = date("Y",strtotime("-1 year"));
        
        if($datetype == "current record")
        {
            $array = array($currentxyear, $previousyear);
            
            $this->hrsv2_db
            ->select('*')
            ->limit(100)
            ->from('masterlist')
            ->where_in('year(tdate)', $array);
        }
        else
        {
            $this->hrsv2_db
            ->select('*')
            ->limit(100)
            ->from('masterlist');
        }
        
        if (!empty($this->input->post("search")["value"]))
        {
            $this->hrsv2_db
                    ->group_start()
                    ->like('patientname', $this->input->post("search")["value"])
                    ->or_like('tdate', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) 
        {
            $this->hrsv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        }
        else 
        {
            $this->hrsv2_db->order_by('tdate', 'DESC');
        }
    }

    public function fetch_radpatient_masterlist_datatables($datetype) 
    {
        $this->fetch_radpatient_masterlist($datetype);

        if ($this->input->post("length") != -1) 
        {
            $this->hrsv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hrsv2_db->get();
        return $query->result();
    }
    
    public function get_current_date($type = "server")
    {
        $now = new DateTime();
        return ($type === "server") ? $now->format('Y-m-d h:i:s') : $now->format('Y-m-d');
    }
    
    function adddate($vardate,$added)
    {
        $data = explode("-", $vardate);
        $date = new DateTime();            
        $date->setDate($data[0], $data[1], $data[2]);
        $date->modify("".$added."");
        $day= $date->format("Y-m-d");
        return $day;    
        
        //echo "Example : " . adddate("2010-08-01","-1 year");
    }
    
    public function get_patient_laboratory_masterlist_data($id) 
    {
        $this->hrsv2_db
                ->select('*')
                ->from('masterlist')
                ->where('id', $id);
        $query = $this->hrsv2_db->get();
        return $query->row_array();
    }
    
    public function get_data_from_masterlist($id) 
    {
        $this->hrsv2_db
                ->select('*')
                ->from('masterlist')
                ->where('id', $id);
        $query = $this->hrsv2_db->get();
        return $query->row_array();
    }
    
    public function getFilmListings()
    {
        $this->hrsv2_db
                ->distinct()
                ->select("filmname, filmcode")
                ->from('filmlisting')
                ->order_by("filmname");
        $query = $this->hrsv2_db->get();
        return $query->result_array();
    }
    
    public function getRadtechLists()
    {
        $this->hrsv2_db
                ->distinct()
                ->select("bankcd, bankname")
                ->from('radtechlist')
                ->order_by("bankname");
        $query = $this->hrsv2_db->get();
        return $query->result_array();
    }
    
    public function get_data_from_ledgersales($transcode) 
    {
        $this->hrsv2_db
                ->select('*')
                ->from('ledgersales')
                ->where('transcode', $transcode);
        $query = $this->hrsv2_db->get();
        return $query->row_array();
    }
    
    public function fetch_ledgersales_table_masterlist_data($transno)
    {
        $this->hrsv2_db
             ->select('*')
             ->limit(100)
             ->from('ledgersales')
             ->where('transcode',$transno);
        
        return $this->hrsv2_db->count_all_results();
    }

    public function fetch_ledgersales_table_masterlist_filtered_data($transno) 
    {
        $this->fetch_ledgersales_table_masterlist($transno);

        $query = $this->hrsv2_db->get();
        return $query->num_rows();
    }

    public function fetch_ledgersales_table_masterlist($transno)
    {
        $order_column = array
        (
            "transactioncode","transcodeid","casreqno","castransno","transref",
            "transactiontype","reqref","reqcode","reqdate","transcode","markforreturn",
            "PINcode","PIN","patientno","patientcase","patientname","categid","formno",
            "hospcode","prodid","dscr","otherinfo","tdate","cost","markupcode","qty",
            "unitqty","retailtype","addonrate","retail","cramt","dbamt","totalamt",
            "creditacct","services","dept","reqdept","active","reqid", "reqby", 
            "recid", "recby", "station", "acctype", "reportcode", "reportdate", 
            "shiftid", "initialstock", "creditorcode", "manualreqno", "deptcateg", 
            "stockaccounted","officialresult","resultreleased","resultfilename", 
            "manualform","resultrefno", "reportno", "filmqty", "filmusedID",
            "filmusedName", "COA", "costcenter", "OTdoneby", "orno", "batchrefno", 
            "formdscr", "section", "docreader", "docreaderid", "docreaderdata", 
            "requestedat","hmoid","hmoname","paytype","ordate","cancelledbyrequestno", 
            "cancelledbyreqcode", "transcodeIDcancelled", "status", "referdocref", 
            "referdocname", "serialno", "panel", "maincode", "panelprice"
        );

        $this->hrsv2_db
            ->select('*')
            ->limit(100)
            ->from('ledgersales')
            ->where('transcode',$transno);

        if (!empty($this->input->post("search")["value"]))
        {
            $this->hrsv2_db
                ->group_start()
                ->like('patientname', $this->input->post("search")["value"])
                ->or_like('patientno', $this->input->post("search")["value"])
                ->or_like('patientcase', $this->input->post("search")["value"])
                ->group_end();
        }

        if (!empty($this->input->post("order"))) 
        {
            $this->hrsv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']);
        }
        else 
        {
            $this->hrsv2_db->order_by('transcode', 'ASC');
        }
    }

    public function fetch_ledgersales_table_masterlist_datatables($transno) 
    {
        $this->fetch_ledgersales_table_masterlist($transno);

        if ($this->input->post("length") != -1) 
        {
            $this->hrsv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hrsv2_db->get();
        return $query->result();
    }
    
    public function get_data_from_redresults_for_data_import($resultrefno) 
    {
        $this->hrsv2_db
                ->select('template, templatecode, status, result, impression, remarks')
                ->from('radresults')
                ->where('refcode', $resultrefno);
        $query = $this->hrsv2_db->get();
        return $query->row_array();
    }
}
