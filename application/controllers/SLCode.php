<?php

class SLCode extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('SLCode_model', 'slcode_model');
    }

    /**
     * Get all sl code from the slcode model and returns a data to the datatable.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function GetAllSLCode() {

        $fetched_data = $this->slcode_model->fetch_slcode_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editSLCode(' . $row->SLREF . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteSLCode(' . $row->SLREF . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';

            $sub_array[] = $row->SLDSCR;
            $sub_array[] = $row->SLCODE;
            $sub_array[] = $row->SLADRS;
            $sub_array[] = $row->COAREFNO;
            $sub_array[] = $row->SLSTATUS;
            $sub_array[] = $row->REFNO;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->slcode_model->fetch_slcode_masterlist_data(),
            "recordsFiltered" => $this->slcode_model->fetch_slcode_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

    /**
     * Get all the inputted SL Code data and send it to the model to be added in the database.
     * @version 2019-02-19
     * @author LJ Roa
     */
    public function AddSLCode() {
        //for form validation
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        $active = $this->input->post('activeIsChecked');

        if ($active == 'true') {
            $active = 1;
        } else {
            $active = 0;
        }

        //For reference no in database
        $date = new DateTime();
        $date_and_time_today = new DateTime();
        $format_date_time = $date_and_time_today->format('Y-m-d h:i:s');
        $format_date = $date->format('mdYhis');
        $passcode = $format_date . 'RN';

        //For update field in database
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        //Get client machine ip address
        $client = $this->input->ip_address();


        $data = array();

        $data['SLCODE'] = strtoupper($this->input->post('slCode', TRUE));
        $data['COAREFNO'] = strtoupper($this->input->post('coaReference', TRUE));
        $data['REFNO'] = strtoupper($this->input->post('pinReference', TRUE));
        $data['SLDSCR'] = strtoupper($this->input->post('slDescription', TRUE));
        $data['SLADRS'] = strtoupper($this->input->post('slAddress', TRUE));
        $data['SLSTATUS'] = $active;
        $data['Sysmade'] = 'NUR';
        $data['updatedby'] = $this->input->post('accountName', TRUE);
        $data['updated'] = $for_update;
        $data['PINcode'] = strtoupper($this->input->post('pin', TRUE));
        $data['grouping'] = 'PATIENT';

        $this->form_validation->set_rules('coaReference', 'COA', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('pinReference', 'PIN', 'required|min_length[1]|max_length[30]');
        $this->form_validation->set_rules('slDescription', 'Description', 'required|min_length[5]|max_length[30]');
        $this->form_validation->set_rules('slAddress', 'Address', 'required|min_length[1]|max_length[30]');

        if ($this->form_validation->run() == FALSE) { //if field does not meet the required inputs
            $errors['coareference'] = form_error('coaReference');
            $errors['pinreference'] = form_error('pinReference');
            $errors['sldescription'] = form_error('slDescription');
            $errors['sladdress'] = form_error('slAddress');

            $result = ['status' => FALSE, 'errors' => $errors];
        } else {

            $this->slcode_model->add_slcode($data);

            $result = ['status' => TRUE];
        }

        echo json_encode($result);
    }

    /**
     * Generate auto_increment sl code.
     * @version 2019-01-17
     * @author LJ Roa
     */
    public function GenerateSLCode() {

        $result = $this->slcode_model->generate_sl_code();

        echo json_encode($result);
    }
    
    

    
    public function getSLAccountDataForEditPatient() 
    {
        $result = array('status' => FALSE);
        $slrefnox = $this->input->post('slrefnox');
        
        $slaccount_data = $this->slcode_model->get_slaccount_data_for_edit_patient($slrefnox);

        if ($slaccount_data) 
        {
            $result['slaccountdata'] = $slaccount_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    
}
