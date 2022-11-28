<?php

class HomeInstruction extends MY_Controller 
{
    public function __construct() 
    {
        parent::__construct();

        $this->load->model('Emergency_model', 'emergency_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
        $this->load->model('Packages_model', 'packages_model');
        $this->load->model('MGHclearance_model', 'mghclearance_model');
        $this->load->model('RXcreatormaker_model', 'rxcreatormaker_model');
        $this->load->model('HomeInstruction_model', 'homeinstruction_model');
    }

    public function index() 
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | Home Instruction";
            $data["hosp_name"] = $this->emergency_model->get_hospital();
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
            $data["station"] = $hostname;

            $data["css"] = array
            (
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/vendors/plugins/sweetalert/sweetalert.css',
                'assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
                'assets/css/main.css',
                'assets/css/myCSS.css',
                'assets/css/color_skins.css'
            );

            $data["js"] = array
            (
                'assets/vendors/plugins/bootstrap-notify/bootstrap-notify.min.js',
                'assets/vendors/plugins/jquery/jquery-v3.2.1.min.js',
                'assets/bundles/libscripts.bundle.js',
                'assets/bundles/vendorscripts.bundle.js',
                'assets/bundles/datatablescripts.bundle.js',
                'assets/vendors/plugins/jquery-datatable/buttons/dataTables.buttons.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.bootstrap4.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.colVis.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.print.min.js',
                'assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js',
                'assets/vendors/plugins/sweetalert/sweetalert.min.js',
                'assets/bundles/mainscripts.bundle.js',
                'assets/js/moment.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/js/pages/jquery.mask.js',
                'assets/js/pages/jquery.mask.min.js',
                'assets/myjs/coamanagement.js',
                'assets/myjs/homeinstruction.js'
            );
            
            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/homeinstruction', $data);
            $this->load->view('templates/footer', $data);
            
        } 
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function getPrescriptionMasterDataForHomeInstruction() 
    {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('casenox');
        
        $presmaster_data = $this->homeinstruction_model->get_prescription_master_data_for_home_instruction($caseno);

        if ($presmaster_data) 
        {
            $result['presmasterdata'] = $presmaster_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function getDoctorsDataForHomeInstruction() 
    {
        $result = array('status' => FALSE);
        $doctorid = $this->input->post('doctoridx');
        
        $doctors_data = $this->homeinstruction_model->get_doctors_data_for_home_instruction($doctorid);

        if ($doctors_data) 
        {
            $result['doctorsdata'] = $doctors_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function getInstructionsByListFromPrescriptionMaster()
    {
        $prescriptionmaster_multidata = $this->homeinstruction_model->get_instructions_by_list_from_prescription_master();
        echo json_encode($prescriptionmaster_multidata);
    }
    
    public function UpdateTakeHomeInstruction()
    {
        $result_prescritionmasters = ['status' => FALSE];
        $result_dischainstructions = ['status' => FALSE];
        
        date_default_timezone_set('Asia/Manila');
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //============================== PRESCRIPTIONMASTER PART ====================================>
        $data = array();
        
        $data['Patname']            = strtoupper($this->input->post('Patname', TRUE));
        $data['sex']                = strtoupper($this->input->post('sex', TRUE));
        $data['age']                = strtoupper($this->input->post('age', TRUE));
        $data['address']            = strtoupper($this->input->post('address', TRUE));
        $data['bday']               = strtoupper($this->input->post('bday', TRUE));
        $data['dateadmitted']       = strtoupper($this->input->post('dateadmitted', TRUE));
        $data['datedischarged']     = strtoupper($this->input->post('datedischarged', TRUE));
        $data['roomreference']      = strtoupper($this->input->post('roomreference', TRUE));
        $data['specialinstruction'] = strtoupper($this->input->post('specialinstruction', TRUE));
        $data['Dxdiagnosis']        = strtoupper($this->input->post('Dxdiagnosis', TRUE));
        $data['dietspecs']          = strtoupper($this->input->post('dietspecs', TRUE));
        $data['avoid']              = strtoupper($this->input->post('avoid', TRUE));
        $data['visitinstruction']   = strtoupper($this->input->post('visitinstruction', TRUE));
        $data['labfollowup']        = strtoupper($this->input->post('labfollowup', TRUE));
        $data['radfollowup']        = strtoupper($this->input->post('radfollowup', TRUE));
        $data['RxBatch']            = strtoupper($this->input->post('RxBatch', TRUE));
        $data['RxDate']             = strtoupper($this->input->post('RxDate', TRUE));
        $data['phicrefcode']        = strtoupper($this->input->post('phicrefcode', TRUE));
        $data['pattype']            = strtoupper($this->input->post('pattype', TRUE));
        $data['patacctcode']        = strtoupper($this->input->post('patacctcode', TRUE));
        $data['patacctno']          = strtoupper($this->input->post('patacctno', TRUE));
        $data['pincode']            = strtoupper($this->input->post('pincode', TRUE));
        $data['reasonofrx']         = strtoupper($this->input->post('reasonofrx', TRUE));
        $data['Doctor']             = strtoupper($this->input->post('Doctor', TRUE));
        $data['DrRefno']            = strtoupper($this->input->post('DrRefno', TRUE));
        $data['S2no']               = strtoupper($this->input->post('S2no', TRUE));
        $data['PTRno']              = strtoupper($this->input->post('PTRno', TRUE));
        $data['Licno']              = strtoupper($this->input->post('Licno', TRUE));
        $data['footers']            = strtoupper($this->input->post('footers', TRUE));
        $data['updatedid']          = strtoupper($this->session->userdata("ID"));
        $data['updatedby']          = strtoupper($this->session->userdata("empname"));
        $data['updated']            = strtoupper($for_update);
        $data['transactiontype']    = strtoupper($this->input->post('transactiontype', TRUE));
        $data['preparedby']         = strtoupper($this->session->userdata("empname"));
        $data['prepid']             = strtoupper($this->session->userdata("ID"));
        $data['instructionsby']     = strtoupper($this->input->post('instructionsby', TRUE));
        $data['reqtype']            = strtoupper($this->input->post('reqtype', TRUE));
        $data['grouping']           = strtoupper($this->input->post('grouping', TRUE));
        $data['dept']               = strtoupper($this->input->post('dept', TRUE));
        
        $caseno = $this->input->post('patacctno', TRUE);
        $presmaster_data = $this->homeinstruction_model->check_if_caseno_exist_in_prescription_master_table($caseno);
        
        if($presmaster_data == TRUE)
        {
            if ($this->homeinstruction_model->update_old_prescription_to_prescriptionmaster_table($caseno, $data)) 
            {
                $result_prescritionmasters = ['status' => TRUE];
            }
        }
        else
        {
            if ($this->homeinstruction_model->insert_new_prescription_to_prescriptionmaster_table($data)) 
            {
                $result_prescritionmasters = ['status' => TRUE];
            }
        } 

        //============================== DISCHAINSTRUCTIONS PART ====================================>
        $medicationdata = array();
        
        $resultmedication = [];
        $takehomedata = $this->input->post('medmultidata');

        if($takehomedata !== "")
        {
            $dischinstr_data = $this->homeinstruction_model->check_if_caseno_exist_in_dischainstructions_table($caseno);
            if($dischinstr_data == TRUE)
            {
                $this->homeinstruction_model->delete_instruction_from_dischainstructions_table($caseno);
            }
            
            $firstdimensionmedication = explode('?,', $takehomedata);
            foreach($firstdimensionmedication as $keymedication => $valuemedication)
            {
                if(empty($valuemedication))
                {
                    unset($firstdimensionmedication[$keymedication]); 
                } 
            }

            foreach($firstdimensionmedication as $tempmedication) 
            {
                $resultmedication[] = explode('|', $tempmedication);
            }

            for($cvmedication=0; $cvmedication<count($firstdimensionmedication);$cvmedication++)
            {                
                $breakfasttime = str_replace (",", ":", $resultmedication[$cvmedication][12]); 
                $lunchtimetime = str_replace (",", ":", $resultmedication[$cvmedication][15]); 
                $supertimetime = str_replace (",", ":", $resultmedication[$cvmedication][18]); 
                $onbedroomtime = str_replace (",", ":", $resultmedication[$cvmedication][19]); 
                
                $medicationdata['phicrefcode']       = strtoupper($resultmedication[$cvmedication][0]);
                $medicationdata['RxBatch']           = strtoupper($this->input->post('patacctcode', TRUE));
                $medicationdata['grouping']          = "MED";
                $medicationdata['dept']              = "PH";
                $medicationdata['Category']          = "DRUGS AND MEDICINES";
                $medicationdata['Patname']           = strtoupper($this->input->post('Patname', TRUE));
                $medicationdata['pattype']           = strtoupper($this->input->post('pattype', TRUE));
                $medicationdata['patacctcode']       = strtoupper($this->input->post('patacctcode', TRUE));
                $medicationdata['patacctno']         = strtoupper($this->input->post('patacctno', TRUE));
                $medicationdata['pincode']           = strtoupper($this->input->post('pincode', TRUE));
                $medicationdata['ReqType']           = "";
                $medicationdata['productid']         = strtoupper($resultmedication[$cvmedication][1]);
                $medicationdata['hospcode']          = strtoupper($resultmedication[$cvmedication][2]);
                $medicationdata['RxDate']            = strtoupper($resultmedication[$cvmedication][3]);
                $medicationdata['itemgeneric']       = strtoupper($resultmedication[$cvmedication][4]);
                $medicationdata['generic']           = strtoupper($resultmedication[$cvmedication][5]);
                $medicationdata['brand']             = strtoupper($resultmedication[$cvmedication][6]);
                $medicationdata['freqdscr']          = strtoupper($resultmedication[$cvmedication][7]);
                $medicationdata['qty']               = strtoupper($resultmedication[$cvmedication][8]);
                $medicationdata['unit']              = strtoupper($resultmedication[$cvmedication][9]);
                $medicationdata['updatedid']         = strtoupper($this->session->userdata("ID"));
                $medicationdata['updatedby']         = strtoupper($this->session->userdata("empname"));
                $medicationdata['updated']           = strtoupper($for_update);
                $medicationdata['breakfastb4']       = strtoupper($resultmedication[$cvmedication][10]);
                $medicationdata['breakfastafter']    = strtoupper($resultmedication[$cvmedication][11]);
                $medicationdata['breakfasttime']     = strtoupper($breakfasttime);
                $medicationdata['lunchb4']           = strtoupper($resultmedication[$cvmedication][13]);
                $medicationdata['lunchafter']        = strtoupper($resultmedication[$cvmedication][14]);
                $medicationdata['lunchtime']         = strtoupper($lunchtimetime);
                $medicationdata['supperb4']          = strtoupper($resultmedication[$cvmedication][16]);
                $medicationdata['supperafter']       = strtoupper($resultmedication[$cvmedication][17]);
                $medicationdata['suppertime']        = strtoupper($supertimetime);
                $medicationdata['bedtime']           = strtoupper($onbedroomtime);
                $medicationdata['noofdays']          = strtoupper($resultmedication[$cvmedication][20]);
                $medicationdata['dosage']            = strtoupper($resultmedication[$cvmedication][21]);
                $medicationdata['purposeindication'] = strtoupper($resultmedication[$cvmedication][22]);
                $medicationdata['sideeffect']        = strtoupper($resultmedication[$cvmedication][23]);
                $medicationdata['transactiontype']   = "DISCHAINST";
                $medicationdata['reasonofRx']        = "DISCHARGE INSTRUCTIONS";
                $medicationdata['transdate']         = strtoupper($this->input->post('RxDate', TRUE));

                $this->homeinstruction_model->add_new_instruction_to_dischainstructions_table($medicationdata);
            }
            
            $result_dischainstructions = ['status' => TRUE];
        }
        
        
        //============================== FETCHING STATUS PART ====================================>
        if($result_dischainstructions == true && $result_prescritionmasters == true)
        {
            $result = ['status' => TRUE];
        }
        else
        {
            $result = ['status' => FALSE];
        }
        
        echo json_encode($result);
    }
    
    public function getDischaInstructionsMultipleData()
    {
        $casenox = $this->input->post('casenox');
        $dischainstruct_multidata = $this->homeinstruction_model->get_discha_instructions_multiple_data($casenox);
        echo json_encode($dischainstruct_multidata);
    }
}
