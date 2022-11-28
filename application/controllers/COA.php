<?php

class COA extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('COA_model', 'coa_model');
    }

    /**
     * Get all coa from the coa model and returns a data to the datatable.
     * @version 2019-01-29
     * @author LJ Roa
     */
    public function GetAllCOA() {

        $fetched_data = $this->coa_model->fetch_coa_masterlist_datatables();

        $data = array();

        foreach ($fetched_data as $row) {

            if ($row->BYDEPTBRANCH == 0) {
                $row->BYDEPTBRANCH = 'NO';
            } else {
                $row->BYDEPTBRANCH = 'YES';
            }

            if ($row->WITHSL == 0) {
                $row->WITHSL = 'NO';
            } else {
                $row->WITHSL = 'YES';
            }
            
            if ($row->FORPOSTING == 0) {
                $row->FORPOSTING = 'GROUP';
            } else {
                $row->FORPOSTING = 'POSTING';
            }

            $sub_array = array();

            $sub_array[] = $row->ACCTTITLE;
            $sub_array[] = $row->COACODE;
            $sub_array[] = $row->ACCTTYPE;
            $sub_array[] = $row->LINKCODE;
            $sub_array[] = $row->BYDEPTBRANCH;
            $sub_array[] = $row->WITHSL;
            $sub_array[] = $row->FORPOSTING;
            $sub_array[] = $row->GROUPLEVEL;
            $sub_array[] = $row->SPECIALGROUP;
            $sub_array[] = $row->SECURITYLEVEL;
            $sub_array[] = $row->UPDATED;
            $sub_array[] = $row->COAREFNO;
            $sub_array[] = $row->DEFAULTACCT;

            $data[] = $sub_array;
        }

        $output = array(
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->coa_model->fetch_coa_masterlist_data(),
            "recordsFiltered" => $this->coa_model->fetch_coa_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
}
