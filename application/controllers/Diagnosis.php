<?php

class Diagnosis extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Diagnosis_model', 'diagnosis_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
    }

    public function DisplayDiagnosis()
    {
        $result = $this->diagnosis_model->fetch_diagnosis();
        $data = array();
        foreach ($result as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editDiagnosis(' . $row->diagcd . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteDiagnosis(' . $row->diagcd . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = $row->Groupname;
            $sub_array[] = $row->icdcode;
            $sub_array[] = $row->categdiag;
            $sub_array[] = $row->refno;
            $sub_array[] = $row->icdcateg;
            $sub_array[] = $row->lastupdate;
            $sub_array[] = $row->dohrefno;
            
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->diagnosis_model->fetch_diagnosis_masterlist_data(),
            "recordsFiltered" => $this->diagnosis_model->fetch_diagnosis_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function SearchSelectedDiagnosis()
    {

        $diagcode = $this->input->post('diagcode', TRUE);

        $result = $this->diagnosis_model->get_selected_diagnosis($diagcode);

        echo json_encode($result);
    }
    
    public function UpdateDiagnosis()
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila');

        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d H:i:s');
        $client = $this->input->ip_address();
        $diagcd = $this->input->post('diagcode', TRUE);
        
        $data = [];
        
        $data['refno'] = $this->input->post('refnodiag', TRUE);
        $data['categdiag'] = $this->input->post('dohcateg', TRUE);
        $data['Groupname'] = $this->input->post('diagnosis', TRUE);
        $data['icdcode'] = $this->input->post('icd10code', TRUE);
        $data['lastupdate'] = $for_update;
        $data['recid'] = $this->input->post('recordsiddiag', TRUE);
        $data['recby'] = $this->input->post('recordsbydiag', TRUE);
        $data['station'] = strtoupper(gethostbyaddr($client));
        $data['icdcateg'] = $this->input->post('icd10categ', TRUE);
//        $data['dohrefno'] = $this->input->post('diagnosis', TRUE);

        $this->form_validation->set_rules('dohcateg', 'DOH Category', 'required|min_length[5]|max_length[500]');
        $this->form_validation->set_rules('diagnosis', 'Diagnosis', 'required|min_length[5]|max_length[500]');

        if ($this->form_validation->run() == FALSE)
        {
            $errors['dohcateg'] = form_error('dohcateg');
            $errors['diagnosis'] = form_error('diagnosis');

            $result = ['status' => FALSE, 'errors' => $errors];
        }
        else 
        {
            $result = $this->diagnosis_model->update_diagnosis($diagcd, $data);
            $result = ['status' => TRUE];
        }
        echo json_encode($result);
    }
    
    public function DeleteDiagnosis() 
    {
        $diagcode = $this->input->post('diagcode');
        $result = $this->diagnosis_model->delete_diagnosis($diagcode);

        echo json_encode($result);
    }
    
    
    public function DisplayICD10Grouping()
    {
        $result = $this->diagnosis_model->fetch_icd10();
        $data = array();
        foreach ($result as $row) {

            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editICD10Diagnosis(' . $row->id . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteICD10Diagnosis(' . $row->id . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = $row->icd10desc;
            $sub_array[] = $row->icd10code;
            $sub_array[] = $row->icd10cat;
            $sub_array[] = $row->id;
            $sub_array[] = $row->lastupdate;
            $sub_array[] = $row->refno;
            
            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->diagnosis_model->fetch_icd10_masterlist_data(),
            "recordsFiltered" => $this->diagnosis_model->fetch_icd10_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
}
