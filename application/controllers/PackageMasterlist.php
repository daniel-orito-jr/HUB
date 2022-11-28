<?php

class PackageMasterlist extends CI_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('PackageMasterlist_model', 'packagemasterlist_model');
    }

    public function GetAllPackages() {
        $fetched_data = $this->packagemasterlist_model->fetch_package_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editPackageMasterlist(' . $row->refno . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deletePackageMasterlist(' . $row->refno . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';

            $sub_array[] = $row->packageCODE;
            $sub_array[] = $row->description;
            $sub_array[] = $row->incharge;
            $sub_array[] = $row->packageprice;

            if ($row->active == '1') {
                $sub_array[] = 'Yes';
            } else {
                $sub_array[] = 'No';
            }
            $sub_array[] = $row->referenceno;
            $sub_array[] = $row->deactivated;
            $sub_array[] = $row->linkedpackagecode;
            $sub_array[] = $row->updated;
            $sub_array[] = $row->refno;
            $sub_array[] = $row->refcode;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->packagemasterlist_model->fetch_package_masterlist_data(),
            "recordsFiltered" => $this->packagemasterlist_model->fetch_package_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    /**
     * Check if data are correct and if data are correct then pass it to the model for database insertion.
     * @version 2019-03-27
     * @author LJ Roa
     */
    public function AddPackageToMasterlist() {
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


        $this->form_validation->set_rules('packageMasterlistDeal', 'Package/Deal Description', 'required');
        $this->form_validation->set_rules('packageMasterlistCode', 'Package Code', 'required');
        $this->form_validation->set_rules('packageMasterlistIncharge', 'In-Charge', 'required');
        $this->form_validation->set_rules('packageMasterlistPrice', 'Package Price', 'required');
        $this->form_validation->set_rules('packageMasterlistMemo', 'Memo/Directive/Ref.No', 'required');

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

    /**
     * Pass the selected package from the masterlist to the model and get back the data.
     * @version 2019-03-27
     * @author LJ Roa
     */
    public function SearchSelectedPackageFromMasterlist() {

        $id = $this->input->post('id', TRUE);

        $result = $this->packagemasterlist_model->search_selected_package_from_masterlist($id);

        echo json_encode($result);
    }

    /**
     * Check if data are correct and if data are correct then pass it to the model for database update.
     * @version 2019-03-28
     * @author LJ Roa
     */
    public function UpdatePackageMasterlist() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila'); //Get manila timezone
        $date = date("mdYHis"); //Get date and time base on timezone
        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //Get client machine ip address
        $client = $this->input->ip_address();

        //PackageMasterlist ID for the row to be updated
        $id = $this->input->post('packageMasterlistID', TRUE);

        $data = [];

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


        $this->form_validation->set_rules('packageMasterlistDeal', 'Package/Deal Description', 'required');
        $this->form_validation->set_rules('packageMasterlistCode', 'Package Code', 'required');
        $this->form_validation->set_rules('packageMasterlistIncharge', 'In-Charge', 'required');
        $this->form_validation->set_rules('packageMasterlistPrice', 'Package Price', 'required');
        $this->form_validation->set_rules('packageMasterlistMemo', 'Memo/Directive/Ref.No', 'required');

        if ($this->form_validation->run() == FALSE) {
            $errors['packagemasterlistdeal'] = form_error('packageMasterlistDeal');
            $errors['packagemasterlistcode'] = form_error('packageMasterlistCode');
            $errors['packagemasterlistincharge'] = form_error('packageMasterlistIncharge');
            $errors['packagemasterlistprice'] = form_error('packageMasterlistPrice');
            $errors['packagemasterlistmemo'] = form_error('packageMasterlistMemo');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $result = $this->packagemasterlist_model->update_package_masterlist($data, $id);

            $result = ['status' => TRUE];
        }


        echo json_encode($result);
    }

    /**
     * Pass the selected row to the packagemasterlist model so that it will be deleted to the database.
     * @version 2019-03-28
     * @author LJ Roa
     */
    public function DeletePackageFromMasterlist() {

        $id = $this->input->post('id', TRUE);

        $result = $this->packagemasterlist_model->delete_package_from_masterlist($id);

        echo json_encode($result);
    }

}
