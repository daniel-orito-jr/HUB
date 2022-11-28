<?php

class Settings extends CI_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('Settings_model', 'settings_model');
    }

    /**
     * Generate automatic casecode.
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function GenerateCaseCode() {
        $client_ip = $this->input->ip_address(); //ip address
        $host_name = gethostbyaddr($client_ip); //pc name

        $result = $this->settings_model->checkIfClientExistsInLocalSet($host_name);

        $date = date('mdY');
        $time = date('His');
        $pc_code = $result[0]->PCcode;

        $generated_code = 'CN' . $date . $pc_code . $time;

        echo json_encode($generated_code);
    }

    /**
     * Get the client ip and hostname and sent it to the controller to check if it exist in the database.
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function GetPCCode() {
        $client_ip = $this->input->ip_address(); //ip address
        $host_name = gethostbyaddr($client_ip); //pc name

        $result = $this->settings_model->checkIfClientExistsInLocalSet($host_name);

        echo json_encode($result);
    }

}
