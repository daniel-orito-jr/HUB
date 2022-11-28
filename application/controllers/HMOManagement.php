<?php

class HMOManagement extends CI_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('HMOManagement_model', 'hmo_model');
        $this->load->model('AdmissionDboard_model', 'admissionddboard_model');
    }

    /**
     * Get all hmo from the hmo model and returns a data to the datatable.
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function GetAllHMO() {

        $fetched_data = $this->hmo_model->fetch_hmo_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editHMO(' . $row->hmocd . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteHMOMasterlist(' . $row->hmocd . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';

            $sub_array[] = $row->hmocd;
            $sub_array[] = $row->hmorefno;
            $sub_array[] = $row->hmoname;
            $sub_array[] = $row->mneomonic;
            $sub_array[] = $row->PTR;
            $sub_array[] = $row->admitallow;
            $sub_array[] = $row->adrs;
            $sub_array[] = $row->lastupdate;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->hmo_model->fetch_hmo_masterlist_data(),
            "recordsFiltered" => $this->hmo_model->fetch_hmo_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    /**
     * Check if data are correct and if data are correct then pass it to the model for database insertion.
     * @version 2019-03-21
     * @author LJ Roa
     */
    public function AddHMOToMasterlist() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila'); //Get manila timezone
        $date = date("mdYHis"); //Get date and time base on timezone
        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d H:i:s');
        //For hmo reference no.
        $format_date = $update_record->format('ndYHis');
        $hmo_reference_no = $format_date . 'HMO';

        //Get client machine ip address
        $client = $this->input->ip_address();

        $data = [];

        $data['hmorefno'] = $hmo_reference_no;
        $data['hmoname'] = $this->input->post('hmoMasterlistName', TRUE);
        $data['mneomonic'] = $this->input->post('hmoMneomonic', TRUE);
        $data['adrs'] = $this->input->post('hmoAddress', TRUE);
        $data['PTR'] = $this->input->post('hmoLicenseNumber', TRUE);
        $data['admitallow'] = $this->input->post('allowOPDTransactions', TRUE);
        $data['lastupdate'] = $for_update;
        $data['recid'] = $this->input->post('hmoAccountID', TRUE);
        $data['recby'] = $this->input->post('hmoAccountName', TRUE);
        $data['station'] = strtoupper(gethostbyaddr($client));


        $this->form_validation->set_rules('hmoMasterlistName', 'HMO Name', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('hmoMneomonic', 'Mnemonic', 'required|min_length[2]|max_length[20]');
        $this->form_validation->set_rules('hmoAddress', 'Address', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('hmoLicenseNumber', 'License Number', 'required|min_length[5]|max_length[20]');

        if ($this->form_validation->run() == FALSE) {
            $errors['hmomasterlistname'] = form_error('hmoMasterlistName');
            $errors['hmomneomonic'] = form_error('hmoMneomonic');
            $errors['hmoaddress'] = form_error('hmoAddress');
            $errors['hmolicensenumber'] = form_error('hmoLicenseNumber');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $result = $this->hmo_model->add_hmo($data); 

            $result = ['status' => TRUE];
        }


        echo json_encode($result);
    }

    /**
     * Check if data are correct and if data are correct then pass it to the model for database update.
     * @version 2019-03-21
     * @author LJ Roa
     */
    public function UpdateHMOMasterlist() {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila'); //Get manila timezone
        $date = date("mdYHis"); //Get date and time base on timezone
        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //Get client machine ip address
        $client = $this->input->ip_address();

        //HMO ID for the row to be updated
        $id = $this->input->post('hmoID', TRUE);

        $data = [];

        $data['hmoname'] = $this->input->post('hmoMasterlistName', TRUE);
        $data['mneomonic'] = $this->input->post('hmoMneomonic', TRUE);
        $data['adrs'] = $this->input->post('hmoAddress', TRUE);
        $data['PTR'] = $this->input->post('hmoLicenseNumber', TRUE);
        $data['admitallow'] = $this->input->post('allowOPDTransactions', TRUE);
        $data['lastupdate'] = $for_update;
        $data['recid'] = $this->input->post('hmoAccountID', TRUE);
        $data['recby'] = $this->input->post('hmoAccountName', TRUE);
        $data['station'] = strtoupper(gethostbyaddr($client));


        $this->form_validation->set_rules('hmoMasterlistName', 'HMO Name', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('hmoMneomonic', 'Mnemonic', 'required|min_length[2]|max_length[20]');
        $this->form_validation->set_rules('hmoAddress', 'Address', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('hmoLicenseNumber', 'License Number', 'required|min_length[5]|max_length[20]');

        if ($this->form_validation->run() == FALSE) {
            $errors['hmomasterlistname'] = form_error('hmoMasterlistName');
            $errors['hmomneomonic'] = form_error('hmoMneomonic');
            $errors['hmoaddress'] = form_error('hmoAddress');
            $errors['hmolicensenumber'] = form_error('hmoLicenseNumber');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $result = $this->hmo_model->update_hmo($data, $id);

            $result = ['status' => TRUE];
        }


        echo json_encode($result);
    }

    /**
     * Pass the selected row to the hmo model so that it will be deleted to the database.
     * @version 2019-03-21
     * @author LJ Roa
     */
    public function DeleteHMOFromMasterlist() {

        $id = $this->input->post('id', TRUE);

        $result = $this->hmo_model->delete_hmo($id);

        echo json_encode($result);
    }

    /**
     * Pass the selected data to the model to check to the specified database.
     * @version 2019-03-21
     * @author LJ Roa
     */
    public function SearchSelectedHMO() {

        $id = $this->input->post('id', TRUE);

        $result = $this->hmo_model->search_selected_hmo($id);

        echo json_encode($result);
    }

    /**
     * Pass the data to the model to add this new data to the database.
     * @version 2019-03-21
     * @author LJ Roa
     */
    public function AddNewHMOPatient()
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

//        date_default_timezone_set('Asia/Manila');
//        $date = date("mdYHis");
//
//        $update_record = new DateTime();
//        $for_update = $update_record->format('Y-m-d H:i:s');
//
//        $format_date = $update_record->format('mdYhis');
//        $hmo_reference_no = $format_date . 'HMRJ';
//
//        $split_patient = explode(' - ', $this->input->post('hmoPatient', TRUE));
//        $hmo_name = $split_patient[0];
//        $hmo_ref_no = $split_patient[1];
//
//        $cut_ref_no = substr($hmo_ref_no, 5);
//
//        $hmo_final_ref_no = explode('H', $cut_ref_no);
//
//        $combine_ref_no = $hmo_final_ref_no[0] . $update_record->format('His') . 'HMRJ';
//
//        $client = $this->input->ip_address();

        $data = [];

//        $data['hmorefno'] = $combine_ref_no;
//        $data['hmoname'] = $hmo_name;
//        $data['hmocode'] = $hmo_ref_no;
        $data['hmocredit'] = $this->input->post('hmoCRLine', TRUE);
        $data['priorityno'] = $this->input->post('hmoPriority', TRUE);
        $data['hmocardno'] = $this->input->post('hmoCardNo', TRUE);
        $data['hmoloa'] = $this->input->post('hmoLOA', TRUE);
        $data['hmoapprovaldate'] = $this->input->post('hmoApprovalDate', TRUE);
        $data['hmocardholder'] = $this->input->post('hmoCardHolderNo', TRUE);
//        $data['updated'] = $for_update;
        $data['recid'] = $this->input->post('hmoManagementId', TRUE);
        $data['recby'] = $this->input->post('hmoManagementName', TRUE);
//        $data['station'] = strtoupper(gethostbyaddr($client));
//        $data['admitdate'] = $update_record->format('Y-m-d');
        $data['verified'] = 1;

        $this->form_validation->set_rules('hmoPatient', 'Patient', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('hmoCRLine', 'CR Line', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('hmoPriority', 'Priority', 'required|min_length[1]|max_length[5]');
        $this->form_validation->set_rules('hmoCardNo', 'Card Number', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('hmoLOA', 'LOA', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('hmoApprovalDate', 'Approval Date', 'required|min_length[1]|max_length[20]');
        $this->form_validation->set_rules('hmoCardHolderNo', 'Card Holder Number', 'required|min_length[1]|max_length[30]');

        if ($this->form_validation->run() == FALSE)
        {
            $errors['hmopatient'] = form_error('hmoPatient');
            $errors['hmocrline'] = form_error('hmoCRLine');
            $errors['hmopriority'] = form_error('hmoPriority');
            $errors['hmocardno'] = form_error('hmoCardNo');
            $errors['hmoloa'] = form_error('hmoLOA');
            $errors['hmoapprovaldate'] = form_error('hmoApprovalDate');
            $errors['hmocardholderno'] = form_error('hmoCardHolderNo');

            $result = ['status' => FALSE, 'errors' => $errors];
        }
        else 
        {
//            $result = $this->hmo_model->add_hmomasterlist($data);
            $result = ['status' => TRUE];
        }
        echo json_encode($result);
    }

    public function GetSpecifiedHMO() {

        $pin_code = $this->input->post('hmoPin', TRUE);

        $fetched_data = $this->hmo_model->fetch_specified_hmo_masterlist_datatables($pin_code);

        $data = array();

        foreach ($fetched_data as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editHMOFromPatient(' . $row->id . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteHMOFromPatient(' . $row->id . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';

            $sub_array[] = $row->hmoname;
            $sub_array[] = $row->hmocredit;
            $sub_array[] = $row->hmoloa;
            $sub_array[] = $row->priorityno;
            $sub_array[] = $row->updated;
            $sub_array[] = $row->recby;
            $sub_array[] = $row->hmorefno;
            $sub_array[] = $row->hmocode;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->hmo_model->fetch_specified_hmo_masterlist_data($pin_code),
            "recordsFiltered" => $this->hmo_model->fetch_specified_hmo_masterlist_filtered_data($pin_code),
            "data" => $data
        );

        echo json_encode($output);
    }

    /**
     * Pass the selected data to the model to check to the specified database.
     * @version 2019-03-25
     * @author LJ Roa
     */
    public function SearchSelectedHMOFromPatient() {

        $id = $this->input->post('id', TRUE);

        $result = $this->hmo_model->search_selected_hmo_from_patient($id);

        echo json_encode($result);
    }

    /**
     * Send all the data from the selected user to the model to be updated in the database.
     * @version 2019-03-25
     * @author LJ Roa
     */
    public function UpdateHMOFromPatient() {

        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila'); //Get manila timezone
        $date = date("mdYHis"); //Get date and time base on timezone
        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d H:i:s');
        //For hmo reference no.
        $format_date = $update_record->format('mdYhis');

        //HMO ID for the row to be updated
        $id = $this->input->post('hmoPatientId', TRUE);

        //split the patient hmo
        $split_patient = explode(' - ', $this->input->post('hmoPatient', TRUE));
        $hmo_name = $split_patient[0];
        $hmo_ref_no = $split_patient[1];


        //split ref no and HMRJ
        //Get client machine ip address
        $client = $this->input->ip_address();

        $data = [];

        $data['pxtype'] = $this->input->post('hmoPatientType', TRUE);
//        $data['PINcode'] = $this->input->post('hmoPin', TRUE);
//        $data['acctcode'] = $this->input->post('hmoCaseNo', TRUE);
        $data['patientname'] = $this->input->post('hmoName', TRUE);
        $data['hmoname'] = $hmo_name;
        $data['hmocredit'] = $this->input->post('hmoCRLine', TRUE);
        $data['priorityno'] = $this->input->post('hmoPriority', TRUE);
        $data['hmocardno'] = $this->input->post('hmoCardNo', TRUE);
        $data['hmoloa'] = $this->input->post('hmoLOA', TRUE);
        $data['hmoapprovaldate'] = $this->input->post('hmoApprovalDate', TRUE);
        $data['hmocardholder'] = $this->input->post('hmoCardHolderNo', TRUE);
        $data['updated'] = $for_update;
        $data['recid'] = $this->input->post('hmoManagementId', TRUE);
        $data['recby'] = $this->input->post('hmoManagementName', TRUE);
        $data['station'] = strtoupper(gethostbyaddr($client));
        $data['admitdate'] = $update_record->format('Y-m-d');
        $data['verified'] = 1;


        $this->form_validation->set_rules('hmoPatient', 'Patient', 'required|min_length[5]|max_length[50]');
        $this->form_validation->set_rules('hmoCRLine', 'CR Line', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('hmoPriority', 'Priority', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('hmoCardNo', 'Card Number', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('hmoLOA', 'LOA', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('hmoApprovalDate', 'Approval Date', 'required|min_length[1]|max_length[20]');
        $this->form_validation->set_rules('hmoCardHolderNo', 'Card Holder Number', 'required|min_length[1]|max_length[30]');

        if ($this->form_validation->run() == FALSE) {
            $errors['hmopatient'] = form_error('hmoPatient');
            $errors['hmocrline'] = form_error('hmoCRLine');
            $errors['hmopriority'] = form_error('hmoPriority');
            $errors['hmocardno'] = form_error('hmoCardNo');
            $errors['hmoloa'] = form_error('hmoLOA');
            $errors['hmoapprovaldate'] = form_error('hmoApprovalDate');
            $errors['hmocardholderno'] = form_error('hmoCardHolderNo');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $result = $this->hmo_model->update_hmo_from_patient($data, $id);

            $result = ['status' => TRUE];
        }


        echo json_encode($result);
    }

    /**
     * Pass the selected row to the hmomasterlist model so that it will be deleted to the database.
     * @version 2019-03-25
     * @author LJ Roa
     */
    public function DeleteHMOFromPatient() {

        $id = $this->input->post('id', TRUE);

        $result = $this->hmo_model->delete_hmo_from_patient($id);

        echo json_encode($result);
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
//            $result = $this->admissionddboard_model->update_patient_status_credit_line($caseno, $data);

            $result = ['status' => TRUE];
        }


        echo json_encode($result);
    }
}
