<?php

class RadiologyResults extends MY_Controller 
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
        $this->load->model('RadiologyResults_model', 'radiologyresults_model');
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
                'assets/myjs/radiologyresults.js'
            );
            
            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/radpxmasterlist', $data);
            $this->load->view('templates/footer', $data);
        } 
        else 
        {
            redirect('Login', 'refresh');
        }
    }

    public function GetAllRadPxMasterlist()
    {
        $datetype = $this->input->post('typex', TRUE);
        $fetched_data = $this->radiologyresults_model->fetch_radpatient_masterlist_datatables($datetype);       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();

            $imgbaseurlad = base_url();
            $imglocationx = "assets/images/uploads/patients/";
            $imagedefault = "default.png";
            $imgfilenamex = $row->pin."p.jpg";
            
            $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex;
            $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;
            
            if(@getimagesize($completeimglocation))
            {
                $sub_array[] = "<img src='".$completeimglocation."' onclick=viewPatientMiniProfile('" . $row->patientcase . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            else
            {
                $sub_array[] = "<img src='".$defaultimaglocation."' onclick=viewPatientMiniProfile('" . $row->patientcase . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            
            $sub_array[] = "";
            $sub_array[] = $row->patientname;
            $sub_array[] = $row->pattype;
            $sub_array[] = $row->requestcode;
            $sub_array[] = $row->tdate;
            $sub_array[] = $row->age;
            $sub_array[] = $row->gender;
            $sub_array[] = $row->weight;
            $sub_array[] = $row->patientloc;
            $sub_array[] = $row->docname;
            $sub_array[] = $row->transcode;
            $sub_array[] = $row->patientno;
            $sub_array[] = $row->reqrefno;
            $sub_array[] = $row->transcode;
            $sub_array[] = $row->id;

            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->radiologyresults_model->fetch_radpatient_masterlist_data($datetype),
            "recordsFiltered" => $this->radiologyresults_model->fetch_radpatient_masterlist_filtered_data($datetype),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function getPatientLaboratoryMasterlistData() 
    {
        $result = array('status' => FALSE);
        $id = $this->input->post('idx');
        
        $masterlist_data = $this->radiologyresults_model->get_patient_laboratory_masterlist_data($id);

        if ($masterlist_data) 
        {
            $result['masterlistdata'] = $masterlist_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function radpatientdetails()
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | Laboratory Masterlist";
            $data["hosp_name"] = $this->emergency_model->get_hospital();

            $data['masterlistid'] = $_GET['id'];
            
            $masterlisting = $this->radiologyresults_model->get_data_from_masterlist($data['masterlistid']);
            $birthday = new DateTime($masterlisting['bday']);
            $data['bday'] = strtoupper($birthday->format('F j, Y'));
            $data['name'] = strtoupper($masterlisting['patientname']);
            $data['pxno'] = strtoupper($masterlisting['patientno']);
            $data['adrs'] = strtoupper($masterlisting['adrs']);
            $data['room'] = strtoupper($masterlisting['patientloc']);
            $data['docc'] = strtoupper($masterlisting['docname']);
            $data['agex'] = strtoupper($masterlisting['age']);
            $data['sexx'] = strtoupper($masterlisting['gender']);
            $data['lbss'] = strtoupper($masterlisting['weight']);
            $data['cont'] = strtoupper($masterlisting['contactno']);
            $data['tran'] = strtoupper($masterlisting['transmittal']);
            $data['reqs'] = strtoupper($masterlisting['requestcode']);
            $data['tran'] = strtoupper($masterlisting['transcode']);
            $data['hmoo'] = strtoupper($masterlisting['hmoname']);
            $data['orno'] = strtoupper($masterlisting['orno']);
//            $resultrefno = strtoupper($masterlisting['resultrefno']);
            
            $ledgersaleslist = $this->radiologyresults_model->get_data_from_ledgersales($data['tran']);
            $data['name'] = strtoupper($ledgersaleslist['patientname']);
            
            $data["filmlisting"] = $this->radiologyresults_model->getFilmListings();
            $data["radtechlist"] = $this->radiologyresults_model->getRadtechLists();
            
            
//            $data['room'] = $inpatientlisting['roombrief'];
//            $data['phic'] = $inpatientlisting['phiccode']."-".$inpatientlisting['phicmembr'];
//            $data['admitdate'] = $inpatientlisting['admitdate'];
//            $data['dischdate'] = $inpatientlisting['dischadate'];
            
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
                'assets/myjs/radiologyresults.js'
            );

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/radpatientdetails', $data);
            $this->load->view('templates/footer', $data);
        }
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function fetchPxRadLedgerSales()
    {
        $transno = $this->input->post('transnox', TRUE);
        $fetched_data = $this->radiologyresults_model->fetch_ledgersales_table_masterlist_datatables($transno);       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            $sub_array = array();
            
            $releaseddate = new DateTime($row->resultreleased);
            $newreleaseddate = $releaseddate->format('F j, Y h:i A');

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
            $sub_array[] = $newreleaseddate;
            $sub_array[] = $row->reqref;
            $sub_array[] = $row->resultfilename;
            $sub_array[] = $row->deptcateg;
            $sub_array[] = $row->retailtype;
            $sub_array[] = $row->recid;
            $sub_array[] = $row->recby;
            $sub_array[] = $row->manualform;
            $sub_array[] = $row->markforreturn;
            $sub_array[] = $row->resultrefno;
            $sub_array[] = $row->reportno;
            $sub_array[] = $row->filmusedID;
            $sub_array[] = $row->filmusedName;
            
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->radiologyresults_model->fetch_ledgersales_table_masterlist_data($transno),
            "recordsFiltered" => $this->radiologyresults_model->fetch_ledgersales_table_masterlist_filtered_data($transno),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function getRadResultsDataForDataImport() 
    {
        $result = array('status' => FALSE);
        $resultrefno = $this->input->post('resultrefnox');
        
        $radresults_data = $this->radiologyresults_model->get_data_from_redresults_for_data_import($resultrefno);
        
        if ($radresults_data) 
        {
            $result['radiologyresultdata'] = $radresults_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
}

