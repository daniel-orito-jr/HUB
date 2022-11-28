<?php

class CF4Mgmt extends MY_Controller{
    //put your code here
    
      public function __construct() {
        parent::__construct();

        $this->load->model('DrugsMeds_model', 'drugsmeds_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
    }
    
    public function index() {
        if ($this->has_logging_in()) {
            $data["page_title"] = "HUBv19 | Drugs and Medicines";
            $data["hosp_name"] = $this->admission_model->get_hospital();
           
            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/vendors/plugins/sweetalert/sweetalert.css',
                'assets/css/main.css',
                'assets/css/myCSS.css',
                'assets/css/color_skins.css');

            $data["js"] = array(
                'assets/vendors/plugins/jquery/jquery-v3.2.1.min.js',
                'assets/bundles/libscripts.bundle.js',
                'assets/bundles/vendorscripts.bundle.js',
                'assets/bundles/datatablescripts.bundle.js',
                'assets/vendors/plugins/jquery-datatable/buttons/dataTables.buttons.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.bootstrap4.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.colVis.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.print.min.js',
                'assets/vendors/plugins/sweetalert/sweetalert.min.js',
                'assets/bundles/mainscripts.bundle.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/js/pages/jquery.mask.js',
                'assets/js/pages/jquery.mask.min.js',
                'assets/myjs/drugsmeds.js',
                'assets/myjs/globaljs.js');


            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/cf4mgmt', $data);
            $this->load->view('templates/footer', $data);
        } else {
            redirect('Login', 'refresh');
        }
    }
    
    public function GetAllPatientFromMasterlist() {

        $fetched_data = $this->drugsmeds_model->fetch_all_patients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {
            $sub_array = array();

            $sub_array[] = $row->pincode;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->casecode;
            $sub_array[] = $row->caseno;
            $sub_array[] = $row->name;
            $sub_array[] = $this->format_datetime($row->admission);
            if($row->discharged == 0)
            {
                $sub_array[] = "";
                $sub_array[] = "Currently Admitted";
            }
            else
            {
                $sub_array[] = $this->format_datetime($row->discharge);
                $sub_array[] = "Discharged";
            }
            $sub_array[] = $row->phicPIN;
            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->drugsmeds_model->fetch_all_patients_masterlist_data(),
            "recordsFiltered" => $this->drugsmeds_model->fetch_all_patients_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function GetAllMedicinesByPx() {
        $casecode = $this->input->post('casecode');
        $fetched_data = $this->drugsmeds_model->fetch_drugs_medicines_datatables($casecode);
        $data = array();
        foreach ($fetched_data as $row) {
            $sub_array = array();

            $sub_array[] = $row->drug_id;
            $sub_array[] = $row->drug_hcode;
            $sub_array[] = $row->drug_genname;
            $sub_array[] = $row->drug_route;
            $sub_array[] = $row->drug_freq;
            $sub_array[] = $this->format_moneyx($row->drug_quantity);
            $sub_array[] = $this->format_money($row->drug_tamount);
            $sub_array[] = $row->drug_tamount;
            $sub_array[] = $this->format_datexx($row->drug_dateadded);
            $sub_array[] = $row->drug_dateadded;
            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->drugsmeds_model->fetch_drugs_medicines_data($casecode),
            "recordsFiltered" => $this->drugsmeds_model->fetch_drugs_medicines_filtered_data($casecode),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    function updateRouteFrequency()
    {
        $result = array('status' => FALSE);

        $data['drug_route'] = $this->input->post('txtRoute');
        $data['drug_freq'] = $this->input->post('txtFrequency');
        $data['recordedby'] = $this->session->userdata('empname');
        $data['recordedid'] = $this->session->userdata('hubuserPasscode');
        $data['dateadded'] = $this->get_current_date();
        $data['drug_id'] = $this->input->post('txtDrugID');
       
        
        if($this->drugsmeds_model->updateRouteFrequency($data)) {
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function fetchMedicineFromLedgerIPD() {
        $result = array('status' => FALSE);
        $casecode = $this->input->post('casecode');
        $IP = $_SERVER['REMOTE_ADDR'];
        $localsetData =  $this->drugsmeds_model->fetchDataFromLocalset($IP);
        $ledgerIPDdata = $this->drugsmeds_model->fetchMedicineFromLedgerIPD($casecode);
        for($i=0;$i<count($ledgerIPDdata);$i++)
        {
            $CF4Data = $this->drugsmeds_model->fetchMedicineFromCF4drug($ledgerIPDdata[$i]['patientno'],$ledgerIPDdata[$i]['prodid']);
            if($CF4Data)
            {
                $this->drugsmeds_model->updateQuantityTotalAmtFromCF4drug($CF4Data['drug_id'],$ledgerIPDdata[$i]['quantity'],$ledgerIPDdata[$i]['tamount']);
            }
            else
            {
               $this->drugsmeds_model->insertMedicineToCF4drug($ledgerIPDdata[$i],$localsetData);
                 
            }
        }
        
        $result['status'] = true; 
        echo json_encode($result);
    }
    
    //COURSE IN THE WARD
    
    public function fetch_doc_act()
    {
        $csno = $this->input->post('caseno');
        $fetch_data = $this->drugsmeds_model->make_doc_act_datatables($csno);  
        $data = array();  
        foreach($fetch_data as $row)  
        {           
            $sub_array = array();
            $sub_array[] = $row->doact_id;
            $sub_array[] = "<button class='btn btn-primary '  onclick='editDoctorsOrder(" . '"' . $row->doact_id . '",' . '"' . $row->doact_date . '",' . '"' . $row->doact_action . '"' . ")'" . ">Edit</button>"."<button class='btn btn-danger' onclick='removeDocAct(".$row->doact_id.")'>Delete</button>";
//            $sub_array[] = '<button class="btn btn-primary" onclick="editDoctorsOrder('.'"'..'","'..'","'..'"'.')">Edit</button>'.'';
            $sub_array[] = $this->format_datexx($row->doact_date); 
            $sub_array[] = $row->doact_action;
            $data[] = $sub_array;  
        }  
        $output = array(  
             "draw"                =>     intval($this->input->post("draw")),  
             "recordsTotal"        =>     $this->drugsmeds_model->get_doc_act_data($csno),  
             "recordsFiltered"     =>     $this->drugsmeds_model->get_doc_act_filtered_data($csno),  
             "data"                =>     $data
              
        );  
        echo json_encode($output); 
    }
    
    public function remove_docact()
    {
        $result = array('status' => false);
        $id   = $this->input->post('id');
        
        if ($this->drugsmeds_model->remove_docact($id)) 
        {
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function updateDoctorsOrder()
    {
        $result = array('status' => false);
        $data['doact_csno']   = $this->input->post('txtcasenoOrder');
        $data['doact_date']   = $this->input->post('txtDocDate');
        $data['doact_action']   = $this->input->post('txtDocOrder');
        $data['doact_patpin']   = $this->input->post('txtPHICPIN');
        $data['doact_pin']   = $this->input->post('txtPIN');
        $data['doact_updatedid'] = $this->session->userdata('empname');
        $data['doact_updatedby'] = $this->session->userdata('hubuserPasscode');
        $data['updated'] = $this->get_current_date();
        $IP = $_SERVER['REMOTE_ADDR'];
        $localsetData =  $this->drugsmeds_model->fetchDataFromLocalset($IP);
        $data['doact_id'] = $this->input->post('txtDocID');
        
        if($data['doact_id'] == "")
        {
           if ($this->drugsmeds_model->insertDocAct($data,$localsetData)) {
                $result['status'] = true;
            } 
        }
        else {
            if ($this->drugsmeds_model->update_docact($data,$localsetData)) {
                $result['status'] = true;
            }
        }
        echo json_encode($result);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    }
   
}
