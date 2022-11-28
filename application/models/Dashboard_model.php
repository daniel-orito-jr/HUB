<?php

class Dashboard_model extends MY_Model{
    //put your code here
    public function __construct() {
        parent::__construct();
        
        $this->hospv2_db = $this->load->database('hospv2', true);
    }
    
    public function fetch_daily_census($para) {
        
        $this->hospv2_db->select('count(caseno) as census')
            ->from(inpatient_tbl);
            if($para == 'census')
            {$this->hospv2_db->where('((admitdate < "'.$this->get_current_datex().'" AND discharged = 0) OR ( admitdate = "'.$this->get_current_datex().'")) and pxtype = "IPD"');}
            else if($para == 'admission')
            { 
                $this->hospv2_db->where('admitdate',$this->get_current_datex())
                        ->where('pxtype','IPD');
            }
            else
            { 
                $this->hospv2_db->where('dischadate',$this->get_current_datex())
                        ->where('discharged',1)
                        ->where('pxtype','IPD');
            }
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function fetch_all_inpatient() {
        
        $this->hospv2_db->select('PIN,name')
            ->from(patientlist_tbl)
                ->order_by('PIN','DESC')
//                ->order_by('admitdate','DESC')
                ->limit(50);
        
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }
    
    public function fetch_patient_information($pin) {
        
        $this->hospv2_db->select('*')
            ->from(patientlist_tbl)
                ->where('PIN',$pin);
        
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    /**
     * Get all the summary of admission data from inpatient group by city.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_admission_day_city_data($admitdate) {

        $monthstart = date("Y-m-01", strtotime($admitdate."-01"));
        $monthend =  date("Y-m-t", strtotime($admitdate."-01"));
            
        $d = new DateTime($monthstart);
        $first = $d->format('Y-m-d');
        $e= new DateTime($monthend);
        $end = $e->format('Y-m-d');
        
        $this->hospv2_db->select('cityadd,count(caseno) as px')
                ->from(inpatient_tbl)
                ->where('admitdate >=',$first)
                ->where('admitdate <=',$end)
                ->where('pxtype','IPD')
                ->group_by('cityadd')
                ->order_by('px','DESC')
                ->limit(5);

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered admission data from the inpatient table.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_admission_day_city_filtered_data($admitdate) {

        $this->fetch_admission_day_city($admitdate); //Get all the data from the inpatient table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the inpatient table in the database.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_admission_day_city($admitdate) {
        $monthstart = date("Y-m-01", strtotime($admitdate."-01"));
        $monthend =  date("Y-m-t", strtotime($admitdate."-01"));
            
        $d = new DateTime($monthstart);
        $first = $d->format('Y-m-d');
        $e= new DateTime($monthend);
        $end = $e->format('Y-m-d');
        
        $order_column = array("cityadd", "px"); //To be added to the column in the datatable.
        $this->hospv2_db->select('cityadd,count(caseno) as px')
                ->from(inpatient_tbl)
                ->where('admitdate >=',$first)
                ->where('admitdate <=',$end)
                ->where('pxtype','IPD')
                ->group_by('cityadd')
                ->limit(5); //Getting all the data from inpatient table in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('cityadd', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('px', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('px', 'DESC'); //datatable data's are ordered in descending order starting with the highest number of patients
        }
    }

    /**
     * Get all the inpatient data from the database and return all the data to the dashboard controller.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_admission_day_city_datatables($admitdate) {
        $this->fetch_admission_day_city($admitdate); //Get all the data from the doctors table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the doctors masterlist in the database.
    }
    
    ///-------------------------------------------------
    /**
     * Get all the may-go-home data from inpatient for the day.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_may_go_home_daily_data() {

        $this->hospv2_db->select('caseno,name,disposition')
                ->from(inpatient_tbl)
                ->where('tagfordischa',1)
                ->where('discharged <>',1)
                ->where('pxtype','IPD')
                ->order_by('tagfordischaDT','DESC');

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered admission data from the inpatient table.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_may_go_home_daily_filtered_data() {

        $this->fetch_may_go_home_daily(); //Get all the data from the inpatient table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the inpatient table in the database.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_may_go_home_daily() {
    
        
        $order_column = array(null,"caseno","name","disposition",null); //To be added to the column in the datatable.
        $this->hospv2_db->select('caseno,name,disposition')
                ->from(inpatient_tbl)
                ->where('tagfordischa',1)
                ->where('discharged <>',1)
                ->where('pxtype','IPD');//Getting all the data from inpatient table in the database.

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('caseno', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('name', $this->input->post("search")["value"])
                    ->or_like('disposition', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('tagfordischaDT', 'DESC'); //datatable data's are ordered in descending order starting with the highest number of patients
        }
    }

    /**
     * Get all the inpatient data from the database and return all the data to the dashboard controller.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_may_go_home_daily_datatables() {
        $this->fetch_may_go_home_daily(); //Get all the data from the doctors table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the doctors masterlist in the database.
    }
    
    /**
     * Get all the NON-PHIC,PHIC,HMO (discharges) from the database and return all the data to the dashboard controller.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    
    public function get_discharges_three_months()
    {
        $data = array();
        $dates = array();
        
        $start_date = date('Y-m-d', strtotime('today - 2 months'));
        $end_date = new DateTime();
        $end_date->format("Y-m-d");
        
        $period = new DatePeriod(
            new DateTime($start_date),
            new DateInterval('P1M'),
            $end_date
       );
        
        
        foreach( $period as $date) 
        { 
            $dates[] = $date->format('Y-m-d'); 
        }
     
        
        for ($i = 0; $i < count($dates); $i++) {
            $datexx = $this->get_yearmonths($dates[$i]);
            $this->db->select('"'.$datexx.'" as datex,'
                    . 'sum(case when phicmembr = "non-nhip" then 1 else 0 end) non,'
                    . 'sum(case when phicmembr = "non-nhip" then 0 else 1 end) nhip,'
                    . 'sum(case when hmoid <> "" then 1 else 0 end) hmo')
                ->from(inpatient_tbl)
                ->where('(MONTH(dischadate) = MONTH("'.$dates[$i].'") and YEAR(dischadate) = YEAR("'.$dates[$i].'")) and discharged = 1 and pxtype="IPD"');
            
            $query = $this->db->get();
            
            array_push($data, $query->row_array());
        }
        
        return $data;
    }
    
    /**
     * Get all the summary of classifications from the database and return all the data to the dashboard controller.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    
    public function create_chart_classification()
    {
        $this->hospv2_db->select('pat_clascode,count(casecode) as px')
            ->from(inpatient_tbl)
                ->where('((admitdate < "'.$this->get_current_datex().'" AND discharged = 0) OR ( admitdate = "'.$this->get_current_datex().'")) and pxtype = "IPD"')
                ->group_by('pat_clascode')
                ->order_by('px','desc');
            
        $query = $this->hospv2_db->get();
        return $query->result_array();
    }
    
    
    /**
     * Get all the admission history of the patient from inpatient order by case no.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_admission_history_data($pin) {

        $this->hospv2_db->select('caseno,admitdate,dischadate,Diag_discharge')
                ->from(inpatient_tbl)
                ->where('PIN',$pin)
                ->order_by('caseno','DESC');

        return $this->hospv2_db->count_all_results(); //Return counted results via integer
    }

    /**
     * Get all the filtered admission data from the inpatient table.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_admission_history_filtered_data($pin) {

        $this->fetch_admission_historycreate_chart_classification($pin); //Get all the data from the inpatient table.

        $query = $this->hospv2_db->get();
        return $query->num_rows(); //Return number of rows
    }

    /**
     * Get all the data from the inpatient table in the database.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_admission_history($pin) {
        $order_column = array("caseno", "admitdate","dischadate","Diag_discharge"); //To be added to the column in the datatable.
        $this->hospv2_db->select('caseno,admitdate,dischadate,Diag_discharge')
                 ->from(inpatient_tbl)
                ->where('PIN',$pin)
                ->order_by('caseno','DESC');

        if (!empty($this->input->post("search")["value"])) { //If search field is not empty
            $this->hospv2_db
                    ->group_start()
                    ->like('caseno', $this->input->post("search")["value"])   //fetch all data according to the value inputted in the search field
                    ->or_like('admitdate', $this->input->post("search")["value"])
                    ->or_like('dischadate', $this->input->post("search")["value"])
                    ->or_like('Diag_discharge', $this->input->post("search")["value"])
                    ->group_end();
        }

        if (!empty($this->input->post("order"))) { //if order is not empty
            $this->hospv2_db->order_by($order_column[$this->input->post("order")['0']['column']], $this->input->post("order")['0']['dir']); //datatable can be ordered according to users choice
        } else {
            $this->hospv2_db->order_by('caseno', 'DESC'); //datatable data's are ordered in descending order starting with the highest number of patients
        }
    }

    /**
     * Get all the inpatient data from the database and return all the data to the dashboard controller.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    public function fetch_admission_history_datatables($pin) {
        $this->fetch_admission_history($pin); //Get all the data from the doctors table.

        if ($this->input->post("length") != -1) {
            $this->hospv2_db->limit($this->input->post('length'), $this->input->post('start'));
        }
        $query = $this->hospv2_db->get();
        return $query->result(); //Return results of data from the doctors masterlist in the database.
    }
    
    /**
     * Get all the summary of classifications from the database and return all the data to the dashboard controller.
     * @version 2019-02-14
     * @author Alynna Rose Pajaron
     */
    
    public function fetch_admission_history_caseno($caseno)
    {
        $this->hospv2_db->select('*')
            ->from(inpatient_tbl)
                ->where('caseno',$caseno);
            
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function fetch_admission_history_inpatient_sub($caseno)
    {
        $this->hospv2_db->select('*')
            ->from(inpatient_sub_tbl)
                ->where('caseno',$caseno);
            
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    public function fetch_admission_history_dietpatientlog($caseno)
    {
        $this->hospv2_db->select('dietdscr')
            ->from(dietpatientlog_tbl)
                ->where('acctno',$caseno);
            
        $query = $this->hospv2_db->get();
        return $query->row_array();
    }
    
    
}
