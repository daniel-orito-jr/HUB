<?php

class MGHclearance extends MY_Controller 
{
    public function __construct() 
    {
        parent::__construct();

        $this->load->model('Emergency_model', 'emergency_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
        $this->load->model('Packages_model', 'packages_model');
        $this->load->model('MGHclearance_model', 'mghclearance_model');
    }

    public function index() 
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | MGH Clearance";
            $data["hosp_name"] = $this->emergency_model->get_hospital();
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $data["nursestation"] = $this->admission_model->getNurseStationListing();
            
            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/vendors/plugins/sweetalert/sweetalert.css',
                'assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
                'assets/css/main.css',
                'assets/css/myCSS.css',
                'assets/css/color_skins.css');

            $data["js"] = array(
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
                'assets/myjs/mghclearance.js');
            
            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/mghclearance', $data);
            $this->load->view('templates/footer', $data);
            
        } 
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function GetAllAdmittedPatients()
    {
        $nursestation = $this->input->post('nursestationx', TRUE);

        $fetched_data = $this->mghclearance_model->fetch_admitted_patients_masterlist_datatables($nursestation);       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();

            $discharged = $row->discharged;
            $clearedby = $row->clearedby;
            
            if ($discharged === "0" && $clearedby === "") 
            {
                $status = "ADMITTED";
            }
            else
            {
                $status = "CLEARED";
            }

            $imgbaseurlad = base_url();
            $imglocationx = "assets/images/uploads/patients/";
            $imagedefault = "default.png";
            $imgfilenamex = $row->PIN."p.jpg";
            
            $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex;
            $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;
            
            if(@getimagesize($completeimglocation))
            {
                $sub_array[] = "<img src='".$completeimglocation."' onclick=viewPatientMiniProfile('" . $row->caseno . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            else
            {
                $sub_array[] = "<img src='".$defaultimaglocation."' onclick=viewPatientMiniProfile('" . $row->caseno . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            
            $sub_array[] = $row->name;
            $sub_array[] = $row->caseno;
            $sub_array[] = $row->nursestation;
            $sub_array[] = $status;
            $sub_array[] = $row->HRnCODE;
            $sub_array[] = $row->bday;
            $sub_array[] = $row->sex;
            $sub_array[] = $row->lastdischdate;
            $sub_array[] = $row->adrs . ", " . $row->brgy;
            $sub_array[] = $row->cityadd;
            $sub_array[] = $row->pincode;
            $sub_array[] = $row->updated;

            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->mghclearance_model->fetch_admitted_patients_masterlist_data($nursestation),
            "recordsFiltered" => $this->mghclearance_model->fetch_admitted_patients_masterlist_filtered_data($nursestation),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function GetAllCeasarianIndicationDiagnosisListings()
    {
        $fetched_data = $this->mghclearance_model->fetch_all_ceasarian_diagnosis_masterlist_datatables();
        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();

            $sub_array[] = "<button class='btn btn-sm btn-warning waves-effect' data-toggle='tooltip' data-placement='left' title='Admit Patient' onclick=checkDuplicateForAdmitPatient('" . $row->diagcd . "')><i class='zmdi zmdi-edit'></i></button>&nbsp;
                            <button class='btn btn-sm btn-danger waves-effect' data-toggle='tooltip' data-placement='left' title='Delete Patient' onclick=deletePatient('" . $row->diagcd . "')><i class='zmdi zmdi-delete'></i></button>&nbsp;";
            $sub_array[] = $row->categdiag;
            $sub_array[] = $row->icdcode;
            $sub_array[] = $row->Groupname;
            $sub_array[] = $row->refno;
            $sub_array[] = $row->lastupdate;

            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->mghclearance_model->fetch_all_ceasarian_diagnosis_masterlist_data(),
            "recordsFiltered" => $this->mghclearance_model->fetch_all_ceasarian_diagnosis_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function DisplaySurgicalOutput()
    {
        $result = $this->mghclearance_model->fetch_surgical();
        $data = array();
        foreach ($result as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editSurgical(' . $row->diagcd . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteSurgical(' . $row->diagcd . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = $row->surgdiag;
            $sub_array[] = $row->icdcode;
            $sub_array[] = $row->surgtype;
            $sub_array[] = $row->refno;
            $sub_array[] = $row->lastupdate;
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->mghclearance_model->fetch_surgical_masterlist_data(),
            "recordsFiltered" => $this->mghclearance_model->fetch_surgical_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function DisplaySterilizationProcedure()
    {
        $result = $this->mghclearance_model->fetch_sterilization();
        $data = array();
        foreach ($result as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editSurgical(' . $row->diagcd . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteSurgical(' . $row->diagcd . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = $row->sterdiag;
            $sub_array[] = $row->icdcode;
            $sub_array[] = $row->refno;
            $sub_array[] = $row->lastupdate;
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->mghclearance_model->fetch_sterilization_masterlist_data(),
            "recordsFiltered" => $this->mghclearance_model->fetch_sterilization_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function getAllPatientAccountFromLedgerIPD()
    {
        $result = array('status' => FALSE);
        $caseno = $this->input->post('casenumbr');
        
        $casenum = $this->mghclearance_model->get_allpatient_account_from_ledgeripd($caseno);
        
        if ($casenum) 
        {
            $result['casenum'] = $casenum;
            $result['status'] = true;
        }
        
        echo json_encode($result);
    }
    
    public function getPatientDistinctRequestNoFromLedgerIPD()
    {
        $caseno = $this->input->post('casenumbr');
        $casenum = $this->mghclearance_model->get_patient_distinct_requestno_from_ledgeripd($caseno);
        echo json_encode($casenum);
    }
    
    public function getAllPatientAccountViaReqcodeFilterFromLedgerIPD()
    {
        $caseno = $this->input->post('casenumbr');
        $reqsno = $this->input->post('reqsnumbr');
        $casenum = $this->mghclearance_model->get_allpatient_account_via_reqcode_filter_from_ledgeripd($caseno,$reqsno);
        echo json_encode($casenum);
    }
    
    public function getAllPatientOthersTransAccountFromLedgerIPD()
    {
        $caseno = $this->input->post('casenumbr');
        $casenum = $this->mghclearance_model->get_allpatient_others_transact_account_from_ledgeripd($caseno);
        echo json_encode($casenum);
    }
    
    public function getDischargeDiagnosisData()
    {
        $caseno = $this->input->post('casenumbr');
        $casenum = $this->mghclearance_model->get_discharge_diagnosis_data($caseno);
        echo json_encode($casenum);
    }
    
    public function DisplayHCIListing()
    {
        $result = $this->mghclearance_model->fetch_hcilisting();
        $data = array();
        foreach ($result as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editHCI(' . $row->refno . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteHCI(' . $row->refno . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = $row->Hospital;
            $sub_array[] = $row->refno;
            $sub_array[] = $row->Hospitaladrs;
            $sub_array[] = $row->PAN;
            $sub_array[] = $row->Level;
            $sub_array[] = $row->type;
            $sub_array[] = $row->President;
            $sub_array[] = $row->Capacity;
            $sub_array[] = $row->lastupdate;
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->mghclearance_model->fetch_hcilisting_masterlist_data(),
            "recordsFiltered" => $this->mghclearance_model->fetch_hcilisting_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function DisplayReferralReason()
    {
        $result = $this->mghclearance_model->fetch_referreason();
        $data = array();
        foreach ($result as $row)
        {
            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editHCI(' . $row->refno . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteHCI(' . $row->refno . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = $row->referral;
            $sub_array[] = $row->refno;
            $sub_array[] = $row->lastupdate;
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->mghclearance_model->fetch_referreason_masterlist_data(),
            "recordsFiltered" => $this->mghclearance_model->fetch_referreason_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function ClearPatient() 
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila');
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //============================== INPATIENT PART ====================================>
        $inpatientdata = array();

        $caseno = strtoupper($this->input->post('accountnomgh', TRUE));
        $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
        
        $surgprocedure = strtoupper($this->input->post('surgprocedremgh', TRUE));
        $surgesplit = explode (" - ", $surgprocedure);  
        
        $sterilization = strtoupper($this->input->post('surgprocedremgh', TRUE));
        $sterilsplit = explode (" - ", $sterilization);  
        
        $patclascode = strtoupper($this->input->post('pxclassmgh', TRUE));
        if($patclascode === "SELECT")
        {
            $inpatientdata['pat_clascode'] = "";
        }
        else
        {
            $inpatientdata['pat_clascode'] = $patclascode;
        }
        
        $patclasssub = strtoupper($this->input->post('adultpediamgh', TRUE));
        if($patclasssub === "SELECT")
        {
            $inpatientdata['pat_classub'] = "";
        }
        else
        {
            $inpatientdata['pat_classub'] = $patclasssub;
        }
        
        if($patclasssub !== "SELECT" && $patclascode !== "SELECT")
        {
            $inpatientdata['pat_classification'] = $inpatientdata['pat_clascode']." - ".$inpatientdata['pat_classub'];
        }
        else
        {
            $inpatientdata['pat_classification'] = "";
        }
        
        $OBprocedure = strtoupper($this->input->post('obgyneproceduremgh', TRUE));
        if($OBprocedure === "SELECT")
        {
            $inpatientdata['OBprocedure'] = "";
        }
        else
        {
            $inpatientdata['OBprocedure'] = $OBprocedure;
        }
        
        $disposition = strtoupper($this->input->post('pxstatdispo', TRUE));
        if($disposition === "EXPIRED")
        {
            $inpatientdata['disposition']       = $disposition;
            $inpatientdata['expireddate']       = strtoupper($this->input->post('expireddatemgh', TRUE));
            $inpatientdata['expiredtime']       = strtoupper($this->input->post('expiredtimemgh', TRUE));
            $inpatientdata['dischargein48']     = strtoupper($this->input->post('expired48hrs', TRUE));
            $inpatientdata['transRefHCI']       = "";
            $inpatientdata['reasonforreferral'] = "";
            
            $obgynmaternalsel = strtoupper($this->input->post('obgynmaternalsel', TRUE));
            if($obgynmaternalsel === "SELECT")
            {
                $inpatientdata['deliverycausesofdeaths'] = "";
            }
            else
            {
                $inpatientdata['deliverycausesofdeaths'] = $obgynmaternalsel;
            }

            $deathtype = strtoupper($this->input->post('typeofdeathmgh', TRUE));
            if($deathtype === "SELECT")
            {
                $inpatientdata['deathtype'] = "";
            }
            else
            {
                $inpatientdata['deathtype'] = $deathtype;
            }
        }
        else if($disposition === "TRANSFERRED/REFERRED")
        {
            $transRefHCI = strtoupper($this->input->post('transreftohcimgh', TRUE));
            $transRefHCISplit = explode ("-", $transRefHCI);  
            
            $inpatientdata['disposition']            = "";
            $inpatientdata['expireddate']            = "1901-01-01";
            $inpatientdata['expiredtime']            = "00:00:00";
            $inpatientdata['dischargein48']          = "";
            $inpatientdata['deathtype']              = "";
            $inpatientdata['deliverycausesofdeaths'] = "";
            $inpatientdata['reasonforreferral']      = strtoupper($this->input->post('reasonrefermgh', TRUE));
            $inpatientdata['transRefHCI']            = strtoupper($transRefHCISplit[1]);
        }
        else
        {
            $inpatientdata['disposition']            = "";
            $inpatientdata['expireddate']            = "1901-01-01";
            $inpatientdata['expiredtime']            = "00:00:00";
            $inpatientdata['dischargein48']          = "";
            $inpatientdata['deathtype']              = "";
            $inpatientdata['deliverycausesofdeaths'] = "";
            $inpatientdata['reasonforreferral']      = "";
            $inpatientdata['transRefHCI']            = "";
        }

        $inpatientdata['dietstatus']                 = strtoupper("MGH");
        $inpatientdata['Diag_chiefcomplain']         = strtoupper($this->input->post('reasonadmmgh', TRUE));
        $inpatientdata['Diag_admit']                 = strtoupper($this->input->post('diagnoadmmgh', TRUE));
        $inpatientdata['Diag_discharge']             = strtoupper($this->input->post('finaldischadiagnosismgh', TRUE));
        
        if($surgprocedure === "")
        {
            $inpatientdata['Diag_surg_ref']          = "";
            $inpatientdata['Diag_surg']              = "";
        }
        else 
        {
            $inpatientdata['Diag_surg_ref']          = strtoupper($surgesplit[1]);
            $inpatientdata['Diag_surg']              = strtoupper($surgesplit[0]);
        }
        
        if($sterilization === "")
        {
            $inpatientdata['Diag_anes_ref']          = "";
            $inpatientdata['Diag_anes']              = "";
        }
        else 
        {
            $inpatientdata['Diag_anes_ref']          = strtoupper($sterilsplit[1]);
            $inpatientdata['Diag_anes']              = strtoupper($sterilsplit[0]);
        }

        $inpatientdata['clearedid']                   = strtoupper($this->session->userdata("ID"));
        $inpatientdata['clearedby']                   = strtoupper($this->session->userdata("empname"));
        $inpatientdata['clearedtd']                   = strtoupper($for_update);
        $inpatientdata['clearedat']                   = strtoupper($hostname);
        $inpatientdata['HAIcase_deviceinfection']     = strtoupper($this->input->post('textboxid_oth1mgh', TRUE));
        $inpatientdata['HAIcasedays']                 = strtoupper($this->input->post('numboxid_oth1mgh', TRUE));
        $inpatientdata['HAIVAPinfection']             = strtoupper($this->input->post('hidtextboxid_vapmgh', TRUE));
        $inpatientdata['HAIVAPdays']                  = strtoupper($this->input->post('numboxid_vapmgh', TRUE));
        $inpatientdata['HAIBSIinfection']             = strtoupper($this->input->post('hidtextboxid_bsimgh', TRUE));
        $inpatientdata['HAIBSIdays']                  = strtoupper($this->input->post('numboxid_bsimgh', TRUE));
        $inpatientdata['HAIUTIinfection']             = strtoupper($this->input->post('hidtextboxid_utimgh', TRUE));
        $inpatientdata['HAIUTIdays']                  = strtoupper($this->input->post('numboxid_utimgh', TRUE));
        $inpatientdata['HAIcase_nonedeviceinfection'] = strtoupper($this->input->post('textboxid_oth2mgh', TRUE));
        $inpatientdata['HAInonecasedays']             = strtoupper($this->input->post('numboxid_oth2mgh', TRUE));
        $inpatientdata['HAISSInoneinfection']         = strtoupper($this->input->post('hidtextboxid_ssimgh', TRUE));
        $inpatientdata['HAISSIdays']                  = strtoupper($this->input->post('numboxid_ssimgh', TRUE));
        
        //============================== READYDISCHA PART ====================================>
        $readydischadata = array();

        $readydischadata['xstation']                    = strtoupper($hostname);
        $readydischadata['caseno']                      = $caseno;
        $readydischadata['patcode']                     = strtoupper($this->input->post('casecode', TRUE));
        $readydischadata['patientname']                 = strtoupper($this->input->post('fullname', TRUE));
        $readydischadata['sex']                         = strtoupper($this->input->post('gendersx', TRUE));
        $readydischadata['age']                         = strtoupper($this->input->post('fullagex', TRUE));
        $readydischadata['phicmembr']                   = strtoupper($this->input->post('phicmmbr', TRUE));
        $readydischadata['roomno']                      = strtoupper($this->input->post('roomnumb', TRUE));
        $readydischadata['rmrateschm']                  = strtoupper($this->input->post('rateshcm', TRUE));
        $readydischadata['doctorname']                  = strtoupper($this->input->post('docsname', TRUE));
        $readydischadata['cityadd']                     = strtoupper($this->input->post('cityaddr', TRUE));
        $readydischadata['admitDT']                     = strtoupper($this->input->post('admdatex', TRUE));
        $readydischadata['NRcleared']                   = 1;
        $readydischadata['NRclearedby']                 = strtoupper($this->session->userdata("empname"));
        $readydischadata['NRclearedDT']                 = strtoupper($for_update);
        $readydischadata['phicpapers']                  = 'NM';
        $readydischadata['phicdeductions']              = 'NODE';
        $readydischadata['hmopapers']                   = 'NM';
        $readydischadata['hmodeductions']               = 'NODE';
        $readydischadata['tagorder']                    = 1;
        $readydischadata['Pxtype']                      = strtoupper($this->input->post('pxtypexs', TRUE));
        
        //============================== CONFINECAUSES PART ====================================>
        $causesconfinementdata = array();
        
        $resultcauses = [];
        $causesdata = $this->input->post('causesconfdata');

        if($causesdata !== "")
        {
            $firstDimensioncauses = explode('?,', $causesdata);
            foreach($firstDimensioncauses as $keycauses => $valuecauses)
            {
                if(empty($valuecauses))
                {
                    unset($firstDimensioncauses[$keycauses]); 
                } 
            }

            foreach($firstDimensioncauses as $tempcauses) 
            {
                $resultcauses[] = explode('|', $tempcauses);
            }

            for($cvcauses=0; $cvcauses<count($firstDimensioncauses);$cvcauses++)
            {
                $causesconfinementdata['causescode']         = $resultcauses[$cvcauses][4];
                $causesconfinementdata['diagcode']           = $resultcauses[$cvcauses][3];
                $causesconfinementdata['diagnosis']          = $resultcauses[$cvcauses][0];
                $causesconfinementdata['diagcateg']          = $resultcauses[$cvcauses][2];
                $causesconfinementdata['icdcode']            = $resultcauses[$cvcauses][1];
                $causesconfinementdata['casecode']          = strtoupper($this->input->post('casecode', TRUE));
                $causesconfinementdata['caseno']            = $caseno;
                $causesconfinementdata['membercardno']      = "00-00-00";
                $causesconfinementdata['PIN']               = strtoupper($this->input->post('pinumber', TRUE));
                $causesconfinementdata['pincode']           = strtoupper($this->input->post('pincodex', TRUE));
                $causesconfinementdata['patientname']       = strtoupper($this->input->post('fullname', TRUE));
                $causesconfinementdata['diaggroup']         = "ADMIT";
                $causesconfinementdata['recid']             = strtoupper($this->session->userdata("ID"));
                $causesconfinementdata['recby']             = strtoupper($this->session->userdata("empname"));
                $causesconfinementdata['lastupdate']        = strtoupper($for_update);
                $causesconfinementdata['station']           = strtoupper($hostname);
                
                if($this->mghclearance_model->clear_patient_for_causesconfinement_table($causesconfinementdata))
                {
                    $result = ['status' => TRUE];
                }
            }
        }
        
        //============================== INDICATIONDIAG PART ====================================>
        $indicationdiagnosedata = array();
        
        $resultindication = [];
        $indicationdata = $this->input->post('indicationdata');

        if($indicationdata !== "")
        {
            $firstDimensionindication = explode('?,', $indicationdata);
            foreach($firstDimensionindication as $keyindication => $valueindication)
            {
                if(empty($valueindication))
                {
                    unset($firstDimensionindication[$keyindication]); 
                } 
            }

            foreach($firstDimensionindication as $tempindication) 
            {
                $resultindication[] = explode('|', $tempindication);
            }

            for($cvindication=0; $cvindication<count($firstDimensionindication);$cvindication++)
            {
                $indicationdiagnosedata['causescode']         = $resultindication[$cvindication][1];
                $indicationdiagnosedata['casecode']           = strtoupper($this->input->post('casecode', TRUE));
                $indicationdiagnosedata['caseno']             = $caseno;
                $indicationdiagnosedata['membercardno']       = "00-00-00";
                $indicationdiagnosedata['PIN']                = strtoupper($this->input->post('pinumber', TRUE));
                $indicationdiagnosedata['pincode']            = strtoupper($this->input->post('pincodex', TRUE));
                $indicationdiagnosedata['patientname']        = strtoupper($this->input->post('fullname', TRUE));
                $indicationdiagnosedata['diaggroup']          = "ADMIT";
                $indicationdiagnosedata['diagcode']           = $resultindication[$cvindication][2];
                $indicationdiagnosedata['diagnosis']          = $resultindication[$cvindication][0];
                $indicationdiagnosedata['icdcode']            = $resultindication[$cvindication][3];
                $indicationdiagnosedata['recid']              = strtoupper($this->session->userdata("ID"));
                $indicationdiagnosedata['recby']              = strtoupper($this->session->userdata("empname"));
                $indicationdiagnosedata['lastupdate']         = strtoupper($for_update);
                $indicationdiagnosedata['station']            = strtoupper($hostname);
                
                if($this->mghclearance_model->clear_patient_for_indicationdiag_table($indicationdiagnosedata))
                {
                    $result = ['status' => TRUE];
                }
            }
        }
        //============================== FINALDIAG PART ====================================>
        $finaldiagnosisdata = array();
        
        $resultfinaldiag = [];
        $finaldiagdata = $this->input->post('finaldiagndata');

        if($finaldiagdata !== "")
        {
            $firstDimensionfinaldiag = explode('?,', $finaldiagdata);
            foreach($firstDimensionfinaldiag as $keyfinaldiag => $valuefinaldiag)
            {
                if(empty($valuefinaldiag))
                {
                    unset($firstDimensionfinaldiag[$keyfinaldiag]); 
                } 
            }

            foreach($firstDimensionfinaldiag as $tempfinaldiag) 
            {
                $resultfinaldiag[] = explode('|', $tempfinaldiag);
            }

            for($cvfinaldiag=0; $cvfinaldiag<count($firstDimensionfinaldiag);$cvfinaldiag++)
            {
                $finaldiagnosisdata['causescode']        = $resultfinaldiag[$cvfinaldiag][4];
                $finaldiagnosisdata['diagcode']          = $resultfinaldiag[$cvfinaldiag][3];
                $finaldiagnosisdata['diagnosis']         = $resultfinaldiag[$cvfinaldiag][0];
                $finaldiagnosisdata['diagcateg']         = $resultfinaldiag[$cvfinaldiag][2];
                $finaldiagnosisdata['icdcode']           = $resultfinaldiag[$cvfinaldiag][1];
                $finaldiagnosisdata['casecode']          = strtoupper($this->input->post('casecode', TRUE));
                $finaldiagnosisdata['caseno']            = $caseno;
                $finaldiagnosisdata['membercardno']      = "00-00-00";
                $finaldiagnosisdata['PIN']               = strtoupper($this->input->post('pinumber', TRUE));
                $finaldiagnosisdata['pincode']           = strtoupper($this->input->post('pincodex', TRUE));
                $finaldiagnosisdata['patientname']       = strtoupper($this->input->post('fullname', TRUE));
                $finaldiagnosisdata['diaggroup']         = "DISCH";
                $finaldiagnosisdata['recid']             = strtoupper($this->session->userdata("ID"));
                $finaldiagnosisdata['recby']             = strtoupper($this->session->userdata("empname"));
                $finaldiagnosisdata['lastupdate']        = strtoupper($for_update);
                $finaldiagnosisdata['station']           = strtoupper($hostname);

                if($this->mghclearance_model->clear_patient_for_finaldiagnosis_table($finaldiagnosisdata))
                {
                    $result = ['status' => TRUE];
                }
            }
        }
        
        //============================== FORM VALIDATION PART ====================================>
        $this->form_validation->set_rules('pxstatdispo', 'Disposition', 'required');
        $this->form_validation->set_rules('finaldischadiagnosismgh', 'Discharged Diagnosis', 'required');
        $this->form_validation->set_rules('diagnoadmmgh', 'Admitting Diagnosis', 'required');

        if ($this->form_validation->run() == FALSE) 
        {
            $errors['pxstatdispo']  = form_error('pxstatdispo');
            $errors['finaldischa']  = form_error('finaldischadiagnosismgh');
            $errors['diagnoadmgh']  = form_error('diagnoadmmgh');

            $result = ['status' => FALSE, 'errors' => $errors];
        } 
        else 
        {
            $result = $this->mghclearance_model->clear_patient($caseno, $inpatientdata, $readydischadata);
            $result = ['status' => TRUE];
        }
        echo json_encode($result);
    }
    
    public function revokePatientClearance() 
    {
        $result = array('status' => FALSE);
        
        $caseno = $this->input->post('casenox');
        
        $data['clearedidx'] = 0;
        $data['clearedbyx'] = "";
        $data['clearedtdx'] = "1900-01-01 00:00:01";
        $data['clearedatx'] = "";
        
        $deletedatafromreddischatbl = $this->mghclearance_model->delete_patient_record_from_readydischa_table($caseno);
        $updatedatafrominpatienttbl = $this->mghclearance_model->update_patient_record_from_inpatient_table($data, $caseno);
        
        if ($deletedatafromreddischatbl && $updatedatafrominpatienttbl) 
        {
            $result['status'] = true;
        }
        echo json_encode($result);
    }
}
