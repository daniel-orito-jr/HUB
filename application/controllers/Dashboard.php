<?php

class Dashboard extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Admission_model', 'admission_model');
    }

    public function index() {
        if ($this->has_logging_in()) {

            $data["page_title"] = "HUBv19 | Dashboard";
            $data['census'] = $this->dashboard_model->fetch_daily_census('census');
            $data['admission'] = $this->dashboard_model->fetch_daily_census('admission');
            $data['discharges'] = $this->dashboard_model->fetch_daily_census('discharges');
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $data["hosp_name"] = $this->admission_model->get_hospital();
            $now = new DateTime();
            $data['now'] = $now->format('Y-m');

            $data["css"] = array(
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jvectormap/jquery-jvectormap-2.0.3.min.css',
                'assets/vendors/plugins/morrisjs/morris.min.css',
                'assets/css/main.css',
                'assets/css/color_skins.css',
                'assets/vendors/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.css',
            );

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
            $this->load->view('pages/dashboard', $data);
            $this->load->view('templates/footer', $data);
        } else {
            redirect('Login', 'refresh');
        }
    }

    public function fetch_admission_day_city() {
        $admitdate = $this->input->post('admitdate');
        $fetch_data = $this->dashboard_model->fetch_admission_day_city_datatables($admitdate);
        $data = array();
        foreach ($fetch_data as $row) {
            $sub_array = array();
            $sub_array[] = $row->cityadd;
            $sub_array[] = number_format($row->px);
            $data[] = $sub_array;
        }
        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->dashboard_model->fetch_admission_day_city_data($admitdate),
            "recordsFiltered" => $this->dashboard_model->fetch_admission_day_city_filtered_data($admitdate),
            "data" => $data,
        );
        echo json_encode($output);
    }

    public function fetch_may_go_home_daily() {
//        $admitdate = $this->input->post('admitdate');
        $fetch_data = $this->dashboard_model->fetch_may_go_home_daily_datatables();
        $data = array();
        $number = 1;
        foreach ($fetch_data as $row) {
//             $order_column = array(null,"caseno","name","disposition",null);
            $sub_array = array();
            $sub_array[] = $number;
            $sub_array[] = $row->caseno;
            $sub_array[] = $row->name;
            $sub_array[] = $row->disposition;
            $sub_array[] = '';
            $data[] = $sub_array;
            $number++;
        }
        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->dashboard_model->fetch_may_go_home_daily_data(),
            "recordsFiltered" => $this->dashboard_model->fetch_may_go_home_daily_filtered_data(),
            "data" => $data,
        );
        echo json_encode($output);
    }

    public function create_chart_discharges_three_months() {
        $result = array('status' => FALSE);

        if ($this->dashboard_model->get_discharges_three_months()) {
            $result['discharges'] = $this->dashboard_model->get_discharges_three_months();
            $result['status'] = TRUE;
        }
        echo json_encode($result);
    }

    public function create_chart_classification() {
        $result = array('status' => FALSE);

        if ($this->dashboard_model->create_chart_classification()) {
            $result['classification'] = $this->dashboard_model->create_chart_classification();
            $result['status'] = TRUE;
        }
        echo json_encode($result);
    }
    
 
    
    

}
