<?php

class Main extends MY_Controller {

    public function __construct() {
        parent::__construct();
              $this->load->model('Dashboard_model', 'dashboard_model');
              $this->load->model('Admission_model', 'admission_model');
    }

    public function index() {

        if ($this->has_logging_in()) {

            $data["page_title"] = "HUBv19 | Dashboard";
            $data['pin'] = $this->dashboard_model->fetch_patient_information($_GET['cc']);
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $data["hosp_name"] = $this->admission_model->get_hospital();
            $data["css"] = array(
                 'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jvectormap/jquery-jvectormap-2.0.3.min.css',
                'assets/vendors/plugins/morrisjs/morris.min.css',
                'assets/css/main.css',
                'assets/css/color_skins.css',
                'assets/vendors/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.css',
            );
//            $data["css"] = array(
//                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
//                'assets/vendors/plugins/jvectormap/jquery-jvectormap-2.0.3.min.css',
//                'assets/vendors/plugins/morrisjs/morris.min.css',
//                'assets/css/main.css',
//                'assets/css/color_skins.css',
//                'assets/vendors/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.css',
//                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.css',
//            );

            $data["js"] = array(
              'assets/vendors/plugins/jquery/jquery-v3.2.1.min.js',
                'assets/vendors/plugins/chartjs/Chart.js',
                'assets/bundles/libscripts.bundle.js',
                'assets/bundles/morrisscripts.bundle.js',
                'assets/bundles/vendorscripts.bundle.js',
                'assets/bundles/jvectormap.bundle.js',
                'assets/bundles/knob.bundle.js',
                'assets/bundles/mainscripts.bundle.js',
                'assets/js/pages/index.js',
                'assets/vendors/plugins/momentjs/moment.js',
                'assets/vendors/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.js',
                'assets/bundles/datatablescripts.bundle.js',
                'assets/vendors/plugins/jquery-datatable/buttons/dataTables.buttons.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.bootstrap4.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.colVis.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.print.min.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/myjs/dashboard.js',
                'assets/myjs/globaljs.js'
            );

            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/patientprofile', $data);
            $this->load->view('templates/footer', $data);
        } else {
            redirect('Login', 'refresh');
        }
    }
    
    public function fetch_admission_history() {
        $pin_number = $this->input->post('pin_number');
        $fetch_data = $this->dashboard_model->fetch_admission_history_datatables($pin_number);
        $data = array();
        foreach ($fetch_data as $row) {
            $sub_array = array();
            $sub_array[] = $row->caseno;
            $sub_array[] = $this->format_datexx($row->admitdate);
            $sub_array[] = $this->format_datexx($row->dischadate);
            $sub_array[] = $row->Diag_discharge;
            $data[] = $sub_array;
        }
        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->dashboard_model->fetch_admission_history_data($pin_number),
            "recordsFiltered" => $this->dashboard_model->fetch_admission_history_datatables($pin_number),
            "data" => $data,
        );
        echo json_encode($output);
    }
    
    public function patient_admission_history() {
        $result = array('status' => FALSE);

        $caseno = $this->input->post('caseno');
        if ($this->dashboard_model->fetch_admission_history_caseno($caseno)) {
            $result['admit_history'] = $this->dashboard_model->fetch_admission_history_caseno($caseno);
            $result['admit_history_sub'] = $this->dashboard_model->fetch_admission_history_inpatient_sub($caseno);
            $result['admit_history_diet'] = $this->dashboard_model->fetch_admission_history_dietpatientlog($caseno);
            $result['status'] = TRUE;
        }
        echo json_encode($result);
    }

}
