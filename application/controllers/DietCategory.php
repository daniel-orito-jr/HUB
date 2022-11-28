<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DietCategory
 *
 * @author DrainwizSupport
 */
class DietCategory extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Dietary_model', 'dietary_model');
    }

    public function FetchDietaryGuide() {
        $data = array();
        $result = $this->dietary_model->fetch_dietary_guide();
        foreach ($result as $row) {
            $sub_array = array();
            $sub_array[] = '<button class="btn btn-sm btn-warning" title="Update" onclick="editDietaryData(' . $row['diagcd'] . ')"><i class="zmdi zmdi-edit"></i></button>&nbsp;
                            <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteDietaryData(' . $row['diagcd'] . ')"><i class="zmdi zmdi-delete"></i></button>&nbsp;';
            $sub_array[] = $row['categdiag'];
            $sub_array[] = $row['refno'];
            $sub_array[] = $row['lastupdate'];
            $data[] = $sub_array;
        }
        $output = array(
            "draw" => intval($this->input->post("draw")),
            "data" => $data,
            "recordsTotal" => count($result),
            "recordsFiltered" => $this->dietary_model->count_dietary_filtered(),
        );

        echo json_encode($output);
    }

}
