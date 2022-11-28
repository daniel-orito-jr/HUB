<?php

class Settings_model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->localset_db = $this->load->database('localset', true);
    }

    /**
     * Check if either ip or host name exists in the localset > settings table.
     * @param type $host_name = your pc host name
     * @version 2019-03-14
     * @author LJ Roa
     */
    public function checkIfClientExistsInLocalSet($host_name) {

        $this->localset_db->select('*')
                ->where("pcname = '$host_name'")
                ->from('setting');

        $query = $this->localset_db->get();

        return $query->result();
    }

}
