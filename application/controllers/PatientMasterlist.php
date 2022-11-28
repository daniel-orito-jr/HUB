<?php

class PatientMasterlist extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('PatientMasterlist_model', 'patient_model');
    }

    /**
     * Get all patient from the patient model and returns a data to the datatable.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function GetAllPatient() {

        $fetched_data = $this->patient_model->fetch_patient_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {


            $sub_array = array();

            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editNurses(' . $row->id . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteNurses(' . $row->id . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';

            $sub_array[] = $row->name;
            $sub_array[] = $row->PIN;
            $sub_array[] = $row->HRNcode;
            $sub_array[] = $row->bday;
            $sub_array[] = $row->sex;
            $sub_array[] = $row->contactno;
            $sub_array[] = $row->religion;
            $sub_array[] = $row->lastdischdate;
            $sub_array[] = $row->adrs;
            $sub_array[] = $row->cityadd . ', ' . $row->provadd;
            $sub_array[] = $row->pincode;
            $sub_array[] = $row->updated;
            $sub_array[] = $row->SLaccount;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->patient_model->fetch_patient_masterlist_data(),
            "recordsFiltered" => $this->patient_model->fetch_patient_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }

}
