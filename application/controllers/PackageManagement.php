<?php

class PackageManagement extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    /**
     * Check if data are correct and if data are correct then pass it to the model for database insertion.
     * @version 2019-03-28
     * @author LJ Roa
     */
    public function AddPatientPackage() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila'); //Get manila timezone
        $date = date("mdYHis"); //Get date and time base on timezone
        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d H:i:s');
        //For package reference no.
        $format_date = $update_record->format('ndYHis');
        $package_ref_no = $format_date . 'DEALRJ';

        //Get client machine ip address
        $client = $this->input->ip_address();

        $data = [];

        $data['refcode'] = $package_ref_no;
        $data['description'] = strtoupper($this->input->post('packageMasterlistDeal', TRUE));
        $data['packageCODE'] = strtoupper($this->input->post('packageMasterlistCode', TRUE));
        $data['incharge'] = strtoupper($this->input->post('packageMasterlistIncharge', TRUE));
        $data['packageprice'] = strtoupper($this->input->post('packageMasterlistPrice', TRUE));
        $data['referenceno'] = strtoupper($this->input->post('packageMasterlistMemo', TRUE));
        $data['linkedpackagecode'] = strtoupper($this->input->post('packageMasterlistCodeOfMain', TRUE));
        $data['updated'] = $for_update;
        $data['active'] = 1;
        $data['recid'] = strtoupper($this->input->post('packageMasterlistAccountId', TRUE));
        $data['recby'] = strtoupper($this->input->post('packageMasterlistAccountName', TRUE));
        $data['station'] = strtoupper(gethostbyaddr($client));


        $this->form_validation->set_rules('packageMasterlistDeal', 'Package / Deal Description', 'required|min_length[1]|max_length[75]');
        $this->form_validation->set_rules('packageMasterlistCode', 'Package Code', 'required|min_length[1]|max_length[10]');
        $this->form_validation->set_rules('packageMasterlistIncharge', 'In-Charge', 'required|min_length[1]|max_length[35]');
        $this->form_validation->set_rules('packageMasterlistPrice', 'Package Price', 'required|min_length[1]|max_length[20]');
        $this->form_validation->set_rules('packageMasterlistMemo', 'Memo/Directive/Reference No', 'required|min_length[1]|max_length[20]');

        if ($this->form_validation->run() == FALSE) {
            $errors['packagemasterlistdeal'] = form_error('packageMasterlistDeal');
            $errors['packagemasterlistcode'] = form_error('packageMasterlistCode');
            $errors['packagemasterlistincharge'] = form_error('packageMasterlistIncharge');
            $errors['packagemasterlistprice'] = form_error('packageMasterlistPrice');
            $errors['packagemasterlistmemo'] = form_error('packageMasterlistMemo');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $result = $this->packagemasterlist_model->add_package_masterlist($data);

            $result = ['status' => TRUE];
        }


        echo json_encode($result);
    }

}
