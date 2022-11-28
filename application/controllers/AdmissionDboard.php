<?php

class AdmissionDboard extends MY_Controller {

    public function __construct() 
    {
        parent::__construct();

        $this->load->model('Admission_model', 'admission_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Packages_model', 'packages_model');
        $this->load->model('Emergency_model', 'emergency_model');
        $this->load->model('EROPDcharges_model', 'eropdcharges_model');
        $this->load->model('AdmissionDboard_model', 'admissionddboard_model');
    }

    public function index() 
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | Patient Dashboard";
            $data["hosp_name"] = $this->emergency_model->get_hospital();
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
            $data["nursestation"] = $this->admission_model->getNurseStationListing();

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
                'assets/myjs/admissiondboard.js',
                'assets/js/jquery-inputmask/jquery.inputmask.bundle.js'
                
            );
            
            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/admissiondboard', $data);
            $this->load->view('templates/footer', $data);
        } 
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function GetAllInPatientList()
    {
        $status = $this->input->post('status', TRUE);
        $station = $this->input->post('station', TRUE);
        $pxtype = $this->input->post('pxtype', TRUE);

        $fetched_data = $this->admissionddboard_model->fetch_inpatient_masterlist_datatables($status,$station,$pxtype);       

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
            
            $admitxdate = new DateTime($row->admitdate);
            $admitxdays = $admitxdate->format('F j, Y');
            
            $dischadate = new DateTime($row->dischadate);
            $dischadays = $dischadate->format('F j, Y');
            
            $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex;
            $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;
            
            $sub_array[] = "";
            
            if(@getimagesize($completeimglocation))
            {
                $sub_array[] = "<img src='".$completeimglocation."' onclick=viewPatientMiniProfile('" . $row->caseno . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            else
            {
                $sub_array[] = "<img src='".$defaultimaglocation."' onclick=viewPatientMiniProfile('" . $row->caseno . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            
            $sub_array[] = $row->name;
            $sub_array[] = $row->dietstatus;
            $sub_array[] = $row->pxtype;
            $sub_array[] = $row->nursestation;
            $sub_array[] = $row->caseno;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->casecode;
            $sub_array[] = $row->mobileno;
            $sub_array[] = $row->roombrief;
            $sub_array[] = $row->creditmax;
            $sub_array[] = strtoupper($admitxdays);
            $sub_array[] = strtoupper($dischadays);
            $sub_array[] = $row->phicmembr;
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
            "recordsTotal" => $this->admissionddboard_model->fetch_inpatient_masterlist_data($status,$station,$pxtype),
            "recordsFiltered" => $this->admissionddboard_model->fetch_inpatient_masterlist_filtered_data($status,$station,$pxtype),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    
    public function updatePatientStatusCreditLine() 
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        
        $caseno = strtoupper($this->input->post('casenox', TRUE));

        $data = array();

        $data['creditmax'] = strtoupper($this->input->post('creditval', TRUE));

        $this->form_validation->set_rules('creditval', 'Tax', 'required');

        if ($this->form_validation->run() == FALSE) 
        {
            $errors['creditlineval'] = form_error('creditval');

            $result = ['status' => FALSE, 'errors' => $errors];
        }
        else 
        {
            $result = $this->admissionddboard_model->update_patient_status_credit_line($caseno, $data);

            $result = ['status' => TRUE];
        }


        echo json_encode($result);
    }
    
    
}