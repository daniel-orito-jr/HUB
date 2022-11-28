<?php

class Discharges extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Discharges_model', 'discharges_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
    }

    public function index() {
        if ($this->has_logging_in()) {

            $data["page_title"] = "HUBv19 | Discharges";
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $data["hosp_name"] = $this->admission_model->get_hospital();

//            $datenow = $this->get_current_date();
//            $timenow = $this->get_current_time();
//            $date = new DateTime($datenow);
//            $time = new DateTime($timenow);
//            $data["currentdate"] = date_format($date, 'Y-m-d');
//            $data["currenttime"] = date_format($date, 'h:i:s');
//            $data["currentyear"] = date_format($date, 'Y');
//            $data["year"] = $this->format_year();

            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/vendors/plugins/sweetalert/sweetalert.css',
//                'assets/vendors/plugins/multi-select/css/multi-select.css',
//                'assets/vendors/plugins/select2/css/select2.css',
                'assets/css/main.css',
                'assets/css/myCSS.css',
                'assets/css/color_skins.css');

            $data["js"] = array(
                'assets/vendors/plugins/jquery/jquery-v3.2.1.min.js',
//                'assets/vendors/plugins/bootstrap/js/bootstrap.min.js',
//                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.js',
                'assets/bundles/libscripts.bundle.js',
                'assets/bundles/vendorscripts.bundle.js',
                'assets/bundles/datatablescripts.bundle.js',
                'assets/vendors/plugins/jquery-datatable/buttons/dataTables.buttons.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.bootstrap4.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.colVis.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.print.min.js',
                'assets/vendors/plugins/sweetalert/sweetalert.min.js',
                'assets/bundles/mainscripts.bundle.js',
//                'assets/vendors/plugins/multi-select/js/jquery.multi-select.js',
//                'assets/vendors/plugins/select2/js/select2.min.js',
//                'assets/js/pages/forms/basic-form-elements.js',
//                'assets/vendors/plugins/jquery-datatable/jquery.dataTables.min.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/myjs/discharges.js',
                'assets/myjs/globaljs.js');

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/discharges', $data);
            $this->load->view('templates/footer', $data);
        } else {
            redirect('Login', 'refresh');
        }
    }

    public function GetAllDischargedPatients() {

        $fetched_data = $this->discharges_model->fetch_discharged_patients_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) 
        {
            if (!isset($counter)) {
                $counter = 0;
            }

            $counter++;

            $time = time();

            $dummy = "?dummy=" . $time . $counter;
            
            $imgbaseurlad = base_url();
            $imglocationx = "assets/images/uploads/patients/";
            $imagedefault = "default.png";
            $imgfilenamex = $row->PIN . "p.jpg";
            $imgidpic = $row->PIN . "p";
            
            $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex . $dummy;
            $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;
            
            $sub_array = array();

            $discharged = $row->discharged;
            if($discharged === "1")
            {
                $status = "DISCHARGED";
            }
            else 
            {
                $status = "ADMITTED";
            }
            
            $sub_array[] = "";
            
            if (@getimagesize($completeimglocation)) 
            {
                $sub_array[] = "<img src='" . $completeimglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            else
            {
                $sub_array[] = "<img src='" . $defaultimaglocation . "' id='" . $imgidpic . "' onclick=viewPatientMiniProfile('" . $row->PIN . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }

            $sub_array[] = $row->name;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->caseno;
            $sub_array[] = $status;
            $sub_array[] = $row->HRnCODE;
            $sub_array[] = $row->bday;
            $sub_array[] = $row->sex;
            $sub_array[] = $row->lastdischdate;
            $sub_array[] = $row->adrs.", ".$row->brgy;
            $sub_array[] = $row->cityadd;
            $sub_array[] = $row->pincode;
            $sub_array[] = $row->updated;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->discharges_model->fetch_discharged_patients_masterlist_data(),
            "recordsFiltered" => $this->discharges_model->fetch_discharged_patients_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
}
