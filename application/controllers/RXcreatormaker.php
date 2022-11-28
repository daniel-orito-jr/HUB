<?php

class RXcreatormaker extends MY_Controller 
{
    public function __construct() 
    {
        parent::__construct();

        $this->load->model('Emergency_model', 'emergency_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
        $this->load->model('Packages_model', 'packages_model');
        $this->load->model('MGHclearance_model', 'mghclearance_model');
        $this->load->model('Doctors_model', 'doctors_model');
        $this->load->model('RXcreatormaker_model', 'rxcreatormaker_model');
    }

    public function index() 
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | RX Creator/Maker";
            $data["hosp_name"] = $this->emergency_model->get_hospital();
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $datenow = $this->get_current_date();
            $date = new DateTime($datenow);
            $data["currentfulldate"] = date_format($date, 'Y-m-d');
            
            $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
            $station = strtoupper($hostname);
            $phicrefnostation = substr($station, 0, 5);
            $phicrefnodatexxx = date_format($date, 'mdY');
            $phicrefnotimexxx = date_format($date, 'his');
            $data['phicrefno'] = $phicrefnodatexxx."XX".$phicrefnostation.$phicrefnotimexxx;

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
                'assets/myjs/coamanagement.js',
                'assets/myjs/rxcreatormaker.js');
            
            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/rxcreatormaker', $data);
            $this->load->view('templates/footer', $data);
            
        } 
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function GetAllRXMasterlist() 
    {
        $filterdate = $this->input->post('searchdatex', TRUE);
        
        $fetched_data = $this->rxcreatormaker_model->fetch_rx($filterdate);

        $data = array();
        
        foreach ($fetched_data as $row) 
        {
            $sub_array = array();
            
            $rxdate = new DateTime($row->RxDate);
            $newrxdate = $rxdate->format('F j, Y');

            $update = new DateTime($row->updated);
            $updateddate = $update->format('F j, Y h:i A');
            
            $sub_array[] = "<button class='btn btn-sm btn-warning waves-effect' title='Edit RX' onclick='editRX(" . $row->RxBatch . ")'><i class='zmdi zmdi-edit'></i></button>&nbsp;".
                           "<button class='btn btn-sm btn-danger waves-effect' title='Delete RX' onclick='deleteRX(" . $row->RxBatch . ")'><i class='zmdi zmdi-delete'></i></button>";
            $sub_array[] = "";
            $sub_array[] = strtoupper($row->Patname);
            $sub_array[] = strtoupper($row->reqtype);
            $sub_array[] = strtoupper($newrxdate);
            $sub_array[] = strtoupper($row->pattype);
            $sub_array[] = strtoupper($updateddate);
            $sub_array[] = strtoupper($row->updatedby);
            $sub_array[] = strtoupper($row->refno);
            $sub_array[] = strtoupper($row->RxBatch);
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->rxcreatormaker_model->fetch_rx_masterlist_data($filterdate),
            "recordsFiltered" => $this->rxcreatormaker_model->fetch_rx_masterlist_filtered_data($filterdate),
            "data" => $data
        );
        echo json_encode($output);
    }
    
    public function GetAllInPatientList()
    {
        $patientstatus = $this->input->post('patientstatus', TRUE);
        $phclaimstatus = $this->input->post('phclaimstatus', TRUE);

        $fetched_data = $this->rxcreatormaker_model->fetch_inpatient_masterlist_datatables($patientstatus,$phclaimstatus);       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();

            $discharged = $row->discharged;
            $claimstats = $row->phicclaimstatus;
            
            if ($discharged === "0") 
            {
                $patientstatus = "ADMITTED";
            }
            else
            {
                $patientstatus = "DISCHARGED";
            }
            
            if ($claimstats === "ONPROCESS") 
            {
                $claimstatus = "CLAIM";
            }
            else
            {
                $claimstatus = "UNCLAIM";
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
            
            $sub_array[] = strtoupper($row->name);
            $sub_array[] = strtoupper($row->caseno);
            $sub_array[] = strtoupper($patientstatus);
            $sub_array[] = strtoupper($claimstatus);
            $sub_array[] = strtoupper($row->HRnCODE);
            $sub_array[] = strtoupper($row->bday);
            $sub_array[] = strtoupper($row->sex);
            $sub_array[] = strtoupper($row->lastdischdate);
            $sub_array[] = strtoupper($row->adrs . ", " . $row->brgy);
            $sub_array[] = strtoupper($row->cityadd);
            $sub_array[] = strtoupper($row->pincode);
            $sub_array[] = strtoupper($row->updated);

            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->rxcreatormaker_model->fetch_inpatient_masterlist_data($patientstatus,$phclaimstatus),
            "recordsFiltered" => $this->rxcreatormaker_model->fetch_inpatient_masterlist_filtered_data($patientstatus,$phclaimstatus),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function DisplayOutpatientMasterlist()
    {
        $result = $this->rxcreatormaker_model->fetch_outpatient();
        $data = array();
        foreach ($result as $row)
        {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editOutpatient(' . $row->id . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteOutpatient(' . $row->id . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = strtoupper($row->name);
            $sub_array[] = strtoupper($row->patientno);
            $sub_array[] = strtoupper($row->OPDrefno);
            $sub_array[] = strtoupper($row->bday);
            $sub_array[] = strtoupper($row->sex);
            $sub_array[] = strtoupper($row->adrs);
            $sub_array[] = strtoupper($row->cityadd);
            $sub_array[] = strtoupper($row->opid);
            $sub_array[] = strtoupper($row->lastdocname);
            $sub_array[] = strtoupper($row->lastdocref);
            $sub_array[] = strtoupper($row->updated);
            $sub_array[] = strtoupper($row->membercardno);
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->rxcreatormaker_model->fetch_outpatient_masterlist_data(),
            "recordsFiltered" => $this->rxcreatormaker_model->fetch_outpatient_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function getOutPatientlistDataForRxCreatorMaker() 
    {
        $result = array('status' => FALSE);
        $patientno = $this->input->post('patientnox');

        $opdpatientx_data = $this->rxcreatormaker_model->get_data_from_opdpatient_for_rxcreator_data_import($patientno);

        if ($opdpatientx_data) 
        {
            $result['opdpatientdatax'] = $opdpatientx_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function GetAllExternalItemsList()
    {
        $doctype = $this->input->post('doctypex', TRUE);

        $fetched_data = $this->rxcreatormaker_model->fetch_external_items_masterlist_datatables($doctype);       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editExtItem(' . $row->idno . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteExtItem(' . $row->idno . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = "";
            $sub_array[] = strtoupper($row->brand." - ".$row->Generic." ".$row->unit);
            $sub_array[] = strtoupper($row->brand);
            $sub_array[] = strtoupper($row->Generic);
            $sub_array[] = strtoupper($row->unit);
            $sub_array[] = strtoupper($row->groupname);
            $sub_array[] = strtoupper($row->productid);
            $sub_array[] = strtoupper($row->hospcode);
            $sub_array[] = strtoupper($row->Purpose);
            $sub_array[] = strtoupper($row->sideeffect);
            $sub_array[] = strtoupper($row->hospdscr);
            $sub_array[] = strtoupper($row->updated);
            $sub_array[] = strtoupper($row->hospprodID);

            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->rxcreatormaker_model->fetch_external_items_masterlist_data($doctype),
            "recordsFiltered" => $this->rxcreatormaker_model->fetch_external_items_masterlist_filtered_data($doctype),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function getBalanceAndPaymentsMadeDataForRXCreatorFormDataImport() 
    {
        $result = array('balancestatus' => FALSE, 'paymentstatus' => FALSE);
        $caseno = $this->input->post('casenox');
        
        $pxbalance_data = $this->rxcreatormaker_model->get_balance_data_from_ledgeripd_table_transnow($caseno);
        $pxpayment_data = $this->rxcreatormaker_model->get_payment_data_from_ledgeripd_table_transnow($caseno);

        if ($pxbalance_data) 
        {
            $result['pxbalance_data'] = $pxbalance_data;
            $result['balancestatus'] = true;
        }
        
        if ($pxpayment_data) 
        {
            $result['pxpayment_data'] = $pxpayment_data;
            $result['paymentstatus'] = true;
        }
        echo json_encode($result);
    }
    
    public function AddPrescription()
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila');
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //============================== RXMASTER PART ====================================>
        $data = array();

        $data['Patname']            = strtoupper($this->input->post('Patnamex', TRUE));
        $data['sex']                = strtoupper($this->input->post('sexx', TRUE));
        $data['age']                = strtoupper($this->input->post('agex', TRUE));
        $data['address']            = strtoupper($this->input->post('addressx', TRUE));
        $data['bday']               = strtoupper($this->input->post('bdayx', TRUE));
        $data['dateadmitted']       = strtoupper($this->input->post('dateadmittedx', TRUE));
        $data['datedischarged']     = strtoupper($this->input->post('datedischargedx', TRUE));
        $data['roomreference']      = strtoupper($this->input->post('roomreferencex', TRUE));
        $data['RxBatch']            = strtoupper($this->input->post('RxBatchx', TRUE));
        $data['RxDate']             = strtoupper($this->input->post('RxDatex', TRUE));
        $data['phicrefcode']        = strtoupper($this->input->post('phicrefcodex', TRUE));
        $data['pattype']            = strtoupper($this->input->post('pattypex', TRUE));
        $data['patacctcode']        = strtoupper($this->input->post('patacctcodex', TRUE));
        $data['patacctno']          = strtoupper($this->input->post('patacctnox', TRUE));
        $data['pincode']            = strtoupper($this->input->post('pincodex', TRUE));
        $data['reasonofrx']         = strtoupper($this->input->post('reasonofrxx', TRUE));
        $data['Doctor']             = strtoupper($this->input->post('Doctorx', TRUE));
        $data['DrRefno']            = strtoupper($this->input->post('DrRefnox', TRUE));
        $data['footers']            = strtoupper($this->input->post('footersx', TRUE));
        $data['updatedid']          = strtoupper($this->session->userdata("ID"));
        $data['updatedby']          = strtoupper($this->session->userdata("empname"));
        $data['updated']            = strtoupper($for_update);
        $data['transactiontype']    = strtoupper($this->input->post('transactiontypex', TRUE));
        $data['reqtype']            = strtoupper($this->input->post('reqtypex', TRUE));
        $data['grouping']           = strtoupper($this->input->post('groupingx', TRUE));
        $data['dept']               = strtoupper($this->input->post('deptx', TRUE));
        $data['balance']            = strtoupper($this->input->post('balancex', TRUE));

        //============================== PRESCRIPTIONS PART ====================================>
        $genericdata = array();
        
        $resultgeneric = [];
        $rxgenericdata = $this->input->post('genericmultidata');

        if($rxgenericdata !== "")
        {
            $firstDimensiongeneric = explode('?,', $rxgenericdata);
            foreach($firstDimensiongeneric as $keygeneric => $valuegeneric)
            {
                if(empty($valuegeneric))
                {
                    unset($firstDimensiongeneric[$keygeneric]); 
                } 
            }

            foreach($firstDimensiongeneric as $tempgeneric) 
            {
                $resultgeneric[] = explode('|', $tempgeneric);
            }

            for($cvgeneric=0; $cvgeneric<count($firstDimensiongeneric);$cvgeneric++)
            {
                $genericdata['phicrefcode']       = strtoupper($resultgeneric[$cvgeneric][9]);
                $genericdata['RxBatch']           = strtoupper($this->input->post('RxBatchx', TRUE));
                $genericdata['grouping']          = strtoupper($this->input->post('groupingx', TRUE));
                $genericdata['dept']              = strtoupper($this->input->post('deptx', TRUE));
                $genericdata['Category']          = strtoupper($this->input->post('groupingx', TRUE));
                $genericdata['Patname']           = strtoupper($this->input->post('Patnamex', TRUE));
                $genericdata['pattype']           = strtoupper($this->input->post('pattypex', TRUE));
                $genericdata['patacctcode']       = strtoupper($this->input->post('patacctcodex', TRUE));
                $genericdata['patacctno']         = strtoupper($this->input->post('patacctnox', TRUE));
                $genericdata['pincode']           = strtoupper($this->input->post('pincodex', TRUE));
                $genericdata['ReqType']           = strtoupper($this->input->post('reqtypex', TRUE));
                $genericdata['productid']         = strtoupper($resultgeneric[$cvgeneric][7]);
                $genericdata['hospcode']          = strtoupper($resultgeneric[$cvgeneric][8]);
                $genericdata['RxDate']            = strtoupper($this->input->post('RxDatex', TRUE));
                $genericdata['itemgeneric']       = strtoupper($resultgeneric[$cvgeneric][0]);
                $genericdata['brand']             = strtoupper($resultgeneric[$cvgeneric][1]);
                $genericdata['freqdscr']          = strtoupper($resultgeneric[$cvgeneric][2]);
                $genericdata['qty']               = strtoupper($resultgeneric[$cvgeneric][3]);
                $genericdata['unit']              = strtoupper($resultgeneric[$cvgeneric][6]);
                $genericdata['updatedid']         = strtoupper($this->session->userdata("ID"));
                $genericdata['updatedby']         = strtoupper($this->session->userdata("empname"));
                $genericdata['updated']           = strtoupper($for_update);
                $genericdata['transactiontype']   = strtoupper($this->input->post('transactiontypex', TRUE));

                if($this->rxcreatormaker_model->add_new_prescription_to_prescriptions_table($genericdata))
                {
                    $result = ['status' => TRUE];
                }
            }
        }

        //============================== FORM VALIDATION PART ====================================>
        $this->form_validation->set_rules('RxBatchx', 'Batchcode', 'required');

        if ($this->form_validation->run() == FALSE) 
        {
            $errors['rxbatchx'] = form_error('RxBatchx');
            $result = ['status' => FALSE, 'errors' => $errors];
        } 
        else 
        {
            $result = $this->rxcreatormaker_model->add_prescription($data);
            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }
    
    public function EditPrescription()
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila');
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');
        
        $RxBatch = strtoupper($this->input->post('RxBatchx', TRUE));

        //============================== RXMASTER PART ====================================>
        $data = array();

        $data['Patname']            = strtoupper($this->input->post('Patnamex', TRUE));
        $data['sex']                = strtoupper($this->input->post('sexx', TRUE));
        $data['age']                = strtoupper($this->input->post('agex', TRUE));
        $data['address']            = strtoupper($this->input->post('addressx', TRUE));
        $data['bday']               = strtoupper($this->input->post('bdayx', TRUE));
        $data['dateadmitted']       = strtoupper($this->input->post('dateadmittedx', TRUE));
        $data['datedischarged']     = strtoupper($this->input->post('datedischargedx', TRUE));
        $data['roomreference']      = strtoupper($this->input->post('roomreferencex', TRUE));
        $data['RxDate']             = strtoupper($this->input->post('RxDatex', TRUE));
        $data['phicrefcode']        = strtoupper($this->input->post('phicrefcodex', TRUE));
        $data['pattype']            = strtoupper($this->input->post('pattypex', TRUE));
        $data['patacctcode']        = strtoupper($this->input->post('patacctcodex', TRUE));
        $data['patacctno']          = strtoupper($this->input->post('patacctnox', TRUE));
        $data['pincode']            = strtoupper($this->input->post('pincodex', TRUE));
        $data['reasonofrx']         = strtoupper($this->input->post('reasonofrxx', TRUE));
        $data['Doctor']             = strtoupper($this->input->post('Doctorx', TRUE));
        $data['DrRefno']            = strtoupper($this->input->post('DrRefnox', TRUE));
        $data['footers']            = strtoupper($this->input->post('footersx', TRUE));
        $data['updatedid']          = strtoupper($this->session->userdata("ID"));
        $data['updatedby']          = strtoupper($this->session->userdata("empname"));
        $data['updated']            = strtoupper($for_update);
        $data['transactiontype']    = strtoupper($this->input->post('transactiontypex', TRUE));
        $data['reqtype']            = strtoupper($this->input->post('reqtypex', TRUE));
        $data['grouping']           = strtoupper($this->input->post('groupingx', TRUE));
        $data['dept']               = strtoupper($this->input->post('deptx', TRUE));
        $data['balance']            = strtoupper($this->input->post('balancex', TRUE));
        
        //============================== DELETE PRESCRIPTIONS PART ====================================>
        
        $prescriptions = $this->rxcreatormaker_model->delete_rx_from_prescriptions_table($RxBatch);
        if($prescriptions == true)
        {
            $result = ['status' => TRUE];
        }

        //============================== INSERT PRESCRIPTIONS PART ====================================>
        $genericdata = array();
        
        $resultgeneric = [];
        $rxgenericdata = $this->input->post('genericmultidata');

        if($rxgenericdata !== "")
        {
            $firstDimensiongeneric = explode('?,', $rxgenericdata);
            foreach($firstDimensiongeneric as $keygeneric => $valuegeneric)
            {
                if(empty($valuegeneric))
                {
                    unset($firstDimensiongeneric[$keygeneric]); 
                } 
            }

            foreach($firstDimensiongeneric as $tempgeneric) 
            {
                $resultgeneric[] = explode('|', $tempgeneric);
            }

            for($cvgeneric=0; $cvgeneric<count($firstDimensiongeneric);$cvgeneric++)
            {
                $genericdata['phicrefcode']       = strtoupper($resultgeneric[$cvgeneric][9]);
                $genericdata['RxBatch']           = strtoupper($this->input->post('RxBatchx', TRUE));
                $genericdata['grouping']          = strtoupper($this->input->post('groupingx', TRUE));
                $genericdata['dept']              = strtoupper($this->input->post('deptx', TRUE));
                $genericdata['Category']          = strtoupper($this->input->post('groupingx', TRUE));
                $genericdata['Patname']           = strtoupper($this->input->post('Patnamex', TRUE));
                $genericdata['pattype']           = strtoupper($this->input->post('pattypex', TRUE));
                $genericdata['patacctcode']       = strtoupper($this->input->post('patacctcodex', TRUE));
                $genericdata['patacctno']         = strtoupper($this->input->post('patacctnox', TRUE));
                $genericdata['pincode']           = strtoupper($this->input->post('pincodex', TRUE));
                $genericdata['ReqType']           = strtoupper($this->input->post('reqtypex', TRUE));
                $genericdata['productid']         = strtoupper($resultgeneric[$cvgeneric][7]);
                $genericdata['hospcode']          = strtoupper($resultgeneric[$cvgeneric][8]);
                $genericdata['RxDate']            = strtoupper($this->input->post('RxDatex', TRUE));
                $genericdata['itemgeneric']       = strtoupper($resultgeneric[$cvgeneric][0]);
                $genericdata['brand']             = strtoupper($resultgeneric[$cvgeneric][1]);
                $genericdata['freqdscr']          = strtoupper($resultgeneric[$cvgeneric][2]);
                $genericdata['qty']               = strtoupper($resultgeneric[$cvgeneric][3]);
                $genericdata['unit']              = strtoupper($resultgeneric[$cvgeneric][6]);
                $genericdata['updatedid']         = strtoupper($this->session->userdata("ID"));
                $genericdata['updatedby']         = strtoupper($this->session->userdata("empname"));
                $genericdata['updated']           = strtoupper($for_update);
                $genericdata['transactiontype']   = strtoupper($this->input->post('transactiontypex', TRUE));

                if($this->rxcreatormaker_model->add_new_prescription_to_prescriptions_table($genericdata))
                {
                    $result = ['status' => TRUE];
                }
            }
        }

        //============================== FORM VALIDATION PART ====================================>
        $this->form_validation->set_rules('RxBatchx', 'Batchcode', 'required');

        if ($this->form_validation->run() == FALSE) 
        {
            $errors['rxbatchx'] = form_error('RxBatchx');
            $result = ['status' => FALSE, 'errors' => $errors];
        } 
        else 
        {
            $result = $this->rxcreatormaker_model->update_prescription($RxBatch, $data);
            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }
    
    public function GetLastRxMasterRxBatchCode() 
    {
        $result = $this->rxcreatormaker_model->get_last_rxmaster_rxbatch_code();
        echo json_encode($result);
    }
    
    public function deleteRXFromMasterlist() 
    {
        $RxBatch = $this->input->post('RxBatchCode');
        
        $rxmasterlists = $this->rxcreatormaker_model->delete_rx_from_rxmasterlists_table($RxBatch);
        $prescriptions = $this->rxcreatormaker_model->delete_rx_from_prescriptions_table($RxBatch);
        
        if($rxmasterlists == true && $prescriptions == true)
        {
            $result = true;
        }

        echo json_encode($result);
    }
    
    public function getRXMasterDataForEditRX() 
    {
        $result = array('status' => FALSE);
        $RxBatchCode = $this->input->post('RxBatchCode');
        
        $rxmaster_data = $this->rxcreatormaker_model->get_data_from_rxmaster_for_update_rx($RxBatchCode);

        if ($rxmaster_data) 
        {
            $result['rxmasterdata'] = $rxmaster_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function getPrescriptionsMultipleData()
    {
        $RxBatchCode = $this->input->post('RxBatchCode');
        $prescription_multidata = $this->rxcreatormaker_model->get_prescriptions_multiple_data($RxBatchCode);
        echo json_encode($prescription_multidata);
    }
    
    public function GetAllDoctors() {

        $fetched_data = $this->doctors_model->fetch_doctors_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editDoctorsforrx(' . $row->doccd . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteDoctorsforrx(' . $row->doccd . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';

            $sub_array[] = $row->doclname;
            $sub_array[] = $row->docfname;
            $sub_array[] = $row->docmname;
            $sub_array[] = $row->suffix;
            $sub_array[] = $row->titlename;
            $sub_array[] = $row->Licno;
            $sub_array[] = $row->PTR;
            $sub_array[] = $row->S2no;
            $sub_array[] = $row->phicno;
            $sub_array[] = $row->tin;
            $sub_array[] = $row->proftype;
            $sub_array[] = $row->phicenable;
            $sub_array[] = $row->phicrate;
            $sub_array[] = $row->pfrate;
            $sub_array[] = $row->adrs;
            $sub_array[] = $row->lastupdate;
            $sub_array[] = $row->doccode;
            $sub_array[] = $row->cellno;
            $sub_array[] = $row->accountno;
            $sub_array[] = $row->coaOPD;
            $sub_array[] = $row->coaIPD;
            $sub_array[] = $row->tax;
            $sub_array[] = $row->emailadd;
            $sub_array[] = $row->docrefno;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->doctors_model->fetch_doctors_masterlist_data(),
            "recordsFiltered" => $this->doctors_model->fetch_doctors_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
}
