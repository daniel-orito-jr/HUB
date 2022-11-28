<?php

class LaboratoryResults extends MY_Controller 
{
    public function __construct() 
    {
        parent::__construct();

        $this->load->library('session');
        $this->load->helper('form');
        $this->load->helper('sendsms_helper');
        $this->load->model('Emergency_model', 'emergency_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
        $this->load->model('Packages_model', 'packages_model');
        $this->load->model('MGHclearance_model', 'mghclearance_model');
        $this->load->model('RXcreatormaker_model', 'rxcreatormaker_model');
        $this->load->model('HomeInstruction_model', 'homeinstruction_model');
        $this->load->model('LaboratoryResults_model', 'laboratoryresults_model');
    }

    public function index() 
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | Patient Listing";
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
                'assets/myjs/laboratoryresults.js'
            );
            
            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/laboratorypxlist', $data);
            $this->load->view('templates/footer', $data);
        } 
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function laboratorymaster()
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | Laboratory Masterlist";
            $data["hosp_name"] = $this->emergency_model->get_hospital();

            $data['pxcode'] = $_GET['cc'];
            $inpatientlisting = $this->laboratoryresults_model->get_data_from_inpatient($data['pxcode']);
            $data['pxname'] = $inpatientlisting['name'];
            $data['room'] = $inpatientlisting['roombrief'];
            $data['phic'] = $inpatientlisting['phiccode']."-".$inpatientlisting['phicmembr'];
            $data['admitdate'] = $inpatientlisting['admitdate'];
            $data['dischdate'] = $inpatientlisting['dischadate'];
            
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
                'assets/myjs/laboratoryresults.js'
            );

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/laboratorymaster', $data);
            $this->load->view('templates/footer', $data);
        }
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function fetchPxLabMasterlist()
    {
        $casecode = $this->input->post('acctcodex', TRUE);
        $fetched_data = $this->laboratoryresults_model->fetch_masterlist_table_masterlist_datatables($casecode);       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();
            
            $reqdate = new DateTime($row->requestdate);
            $newreqdate = $reqdate->format('F j, Y h:i A');

            $sub_array[] = "";
            $sub_array[] = $newreqdate;
            $sub_array[] = $row->reqrefno;
            $sub_array[] = $row->age;
            $sub_array[] = $row->gender;
            $sub_array[] = $row->pattype;
            $sub_array[] = $row->patientloc;
            $sub_array[] = $row->docname;
            $sub_array[] = $row->transcode;
            $sub_array[] = $row->tdate;
            $sub_array[] = $row->patientno;
            $sub_array[] = $row->reqrefno;
            $sub_array[] = $row->transcode;
            $sub_array[] = $row->patientcase;
            $sub_array[] = $row->requestcode;
            $sub_array[] = $row->requestdate;
            
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->laboratoryresults_model->fetch_masterlist_table_masterlist_data($casecode),
            "recordsFiltered" => $this->laboratoryresults_model->fetch_masterlist_table_masterlist_filtered_data($casecode),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function laboratoryledger()
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | Laboratory Ledgerlist";
            $data["hosp_name"] = $this->emergency_model->get_hospital();

            $reqdate = new DateTime($_GET['rd']);
            $data['casecode'] = $_GET['cc'];
            $data['reqscode'] = $_GET['rn'];
            $data['reqsdate'] = strtoupper($reqdate->format('F j, Y h:i A'));

            $masterlisting = $this->laboratoryresults_model->get_data_from_masterlist($data['casecode']);
            $birthday = new DateTime($masterlisting['bday']);
            $recdate = new DateTime($masterlisting['requestdate']);
            $data['bday'] = strtoupper($birthday->format('F j, Y h:i A'));
            $data['name'] = $masterlisting['patientname'];
            $data['room'] = $masterlisting['patientloc'];
            $data['adrs'] = $masterlisting['adrs'];
            $data['weight'] = $masterlisting['weight'];
            $data['age'] = $masterlisting['age'];
            $data['gender'] = $masterlisting['gender'];
            $data['doc'] = $masterlisting['docname'];
            $data['orno'] = $masterlisting['orno'];
            $data['recby'] = $masterlisting['recby'];
            $data['recdate'] = strtoupper($recdate->format('F j, Y h:i A'));
            $data['med'] = "";
            
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
                'assets/myjs/laboratoryresults.js'
            );

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/laboratoryledger', $data);
            $this->load->view('templates/footer', $data);
        }
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function fetchPxLabLedgerlist()
    {
        $casecodex = $this->input->post('casecodex', TRUE);
        $reqscodex = $this->input->post('reqscodex', TRUE);
        
        $fetched_data = $this->laboratoryresults_model->fetch_ledgersale_table_masterlist_datatables($casecodex,$reqscodex);       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();
            
            $resultreleased = new DateTime($row->resultreleased);
            $resultreleasednew = $resultreleased->format('F j, Y h:i A');

            $sub_array[] = "";
            $sub_array[] = $row->dscr;
            $sub_array[] = $row->qty;
            $sub_array[] = $row->unitqty;
            $sub_array[] = $row->totalamt;
            $sub_array[] = $row->hospcode;
            $sub_array[] = $row->prodid;
            $sub_array[] = $row->services;
            $sub_array[] = $row->formno;
            $sub_array[] = $row->transcodeid;
            $sub_array[] = $row->officialresult;
            $sub_array[] = $resultreleasednew;
            $sub_array[] = $row->reqref;
            $sub_array[] = $row->resultfilename;
            $sub_array[] = $row->deptcateg;
            $sub_array[] = $row->retailtype;
            $sub_array[] = $row->reqid;
            $sub_array[] = $row->reqby;
            $sub_array[] = $row->manualform;
            $sub_array[] = $row->markforreturn;
            $sub_array[] = $row->reqcode;
            $sub_array[] = $row->transcode;
            $sub_array[] = $row->patientno;
            $sub_array[] = $row->resultcode;
            
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->laboratoryresults_model->fetch_ledgersale_table_masterlist_data($casecodex,$reqscodex),
            "recordsFiltered" => $this->laboratoryresults_model->fetch_ledgersale_table_masterlist_filtered_data($casecodex,$reqscodex),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    
    public function laboratoryresult()
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | Laboratory Results";
            $data["hosp_name"] = $this->emergency_model->get_hospital();

            $reqdate = new DateTime($_GET['rd']);
            $data['casecode'] = $_GET['cc'];
            $data['formcode'] = $_GET['fn'];
            $data['repocode'] = $_GET['rc'];
            $data['reqscode'] = $_GET['rn'];
            $data['reqsdate'] = strtoupper($reqdate->format('F j, Y h:i A'));
            
            $masterlisting = $this->laboratoryresults_model->get_data_from_masterlist($data['casecode']);
            $data['name'] = $masterlisting['patientname'];
            
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
                'assets/myjs/laboratoryresults.js'
            );

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/laboratoryresult', $data);
            $this->load->view('templates/footer', $data);
        }
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function fetchPxLabResultlist()
    {
        $casecodex = $this->input->post('casecodex', TRUE);
        $reportnox = $this->input->post('reportnox', TRUE);
        $reqscodex = $this->input->post('reqscodex', TRUE);
        
        $fetched_data = $this->laboratoryresults_model->fetch_labresults_table_masterlist_datatables($casecodex,$reportnox,$reqscodex);       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();

            $sub_array[] = "";
            $sub_array[] = $row->test;
            $sub_array[] = $row->testresult;
            $sub_array[] = $row->testunit;
            $sub_array[] = $row->reference;
            $sub_array[] = $row->siunit;
            $sub_array[] = $row->priority;
            $sub_array[] = $row->elemcode;
            $sub_array[] = $row->resultrefno;
            $sub_array[] = $row->dscrupdatable;
            $sub_array[] = $row->chktitle;
            $sub_array[] = $row->formtype;
            $sub_array[] = $row->groupname;
            $sub_array[] = $row->deptmain;
            $sub_array[] = $row->reportcode;
            
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->laboratoryresults_model->fetch_labresults_table_masterlist_data($casecodex,$reportnox,$reqscodex),
            "recordsFiltered" => $this->laboratoryresults_model->fetch_labresults_table_masterlist_filtered_data($casecodex,$reportnox,$reqscodex),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function GetAllInPatientList()
    {
        $fetched_data = $this->laboratoryresults_model->fetch_inpatient_masterlist_datatables();       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();

            $discharged = $row->discharged;
            
            if ($discharged === "0") 
            {
                $patientstatus = "ADMITTED";
            }
            else
            {
                $patientstatus = "DISCHARGED";
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
            $sub_array[] = $patientstatus;
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
            "recordsTotal" => $this->laboratoryresults_model->fetch_inpatient_masterlist_data(),
            "recordsFiltered" => $this->laboratoryresults_model->fetch_inpatient_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function sendResultThroughSMSToDoctor()
    {
        $result = array('status' => FALSE);

        $allowtext = $this->laboratoryresults_model->fetch_allow_text();
        
        $type = "Laboratory Result";
        $station = "Laboratory Result Web Application";
        $transaction = "testingmessagelabresult";
        
        $message = $this->input->post('textmessagex');

        $myfile = fopen("webconfig\\server.txt", "r") or die("Unable to open file!");
        $server = fgets($myfile);
        fclose($myfile);
        
        $docnumber = $this->input->post('mobilenumbrx');
       
        $my_file = '\\\\' . $server . '\\BinaryDepot\\DrainwizMessage\\Inbox\\' . $transaction . '.txt';
        $handle = fopen($my_file, 'w') or die('Cannot open file:  ' . $my_file);
        $dataxx = $docnumber . "\r\n" . $message;

        if ($allowtext['AllowText'] == '1' && fwrite($handle, $dataxx))
        {
            $this->laboratoryresults_model->insert_message_to_tbtext_table($message, $docnumber, $station, $transaction, $type);
        }
        
        $result['status'] = true;
        echo json_encode($result);
    }
}

