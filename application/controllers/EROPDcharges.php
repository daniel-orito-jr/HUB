<?php

class EROPDcharges extends MY_Controller {

    public function __construct() 
    {
        parent::__construct();

        $this->load->model('Admission_model', 'admission_model');
        $this->load->model('Dashboard_model', 'dashboard_model');
        $this->load->model('Packages_model', 'packages_model');
        $this->load->model('Emergency_model', 'emergency_model');
        $this->load->model('EROPDcharges_model', 'eropdcharges_model');
    }

    public function index() 
    {
        if ($this->has_logging_in())
        {
            $data["page_title"] = "HUBv19 | Walk-in Patients";
            $data["hosp_name"] = $this->emergency_model->get_hospital();
            $data['allpx'] = $this->dashboard_model->fetch_all_inpatient();
            $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
            $data["station"] = $hostname;
            
            $datenow = $this->get_current_date();
            $date = new DateTime($datenow);
            $data["currentfulldate"] = strtoupper(date_format($date, 'F j, Y h:i A'));
            $data["provincelistx"] = $this->admission_model->getProvincelistx();
            
            $data['accountnumber'] = $this->admission_model->getAccountNumber();
            $data['slcodexnumber'] = $this->admission_model->getSLcodexNumber();
            $data['casenumberget'] = $this->admission_model->fetchsCaseNumber();
            $data["phmembershipx"] = $this->admission_model->getphmembershipx();
            $data["religionlistx"] = $this->admission_model->getReligionlistx();
            $data["nationalityxs"] = $this->admission_model->getNationalityxs();
            $data["membertypepro"] = $this->admission_model->getMemberTypepro();
            $data["memberlisting"] = $this->admission_model->getMemberListing();
            $data["doctorlisting"] = $this->admission_model->getDoctorListing();
            $data["nurseslisting"] = $this->admission_model->getNursesListing();
            $data["roomszlisting"] = $this->admission_model->getRoomzsListing();
            $data["hospitalfromz"] = $this->admission_model->getHospitListing();
            $data["diagnosiscode"] = $this->admission_model->getDiagnosisCode();

            $opdnumlastval = $this->admission_model->getopdnumlastval();
            $opdno = explode("P", $opdnumlastval['OPDno']);
            $opdnumpart = $opdno[1] + 1;
            $data["opdnumber"] = "OP0000".$opdnumpart;

            $data["currentfulldate"] = date_format($date, 'Y-m-d h:i:s');
            $data["currentyear"] = date_format($date, 'Y');
            $data["year"] = $this->format_year();
            $nows = new DateTime();
            $data["timenow"] = $nows->format('h:i A');

            $now = new DateTime();
            $fulldateformat = date_format($now, "m/d/Y H:i:s");
            $data["fulldate"] = date_format($now, "mdYHis");
            $data["ipaddress"] = $_SERVER["REMOTE_ADDR"];
            $pc = $this->admission_model->getpccode($data["ipaddress"]);
            $case = preg_replace("/[^a-zA-Z0-9]/", "", $fulldateformat);
            $data["pccodex"] = $pc[0]['PCcode'];
            $data["casecod"] = "CN" . $case . $data["pccodex"];
            
            $data["stationwi"] = $hostname;
            $data["updatedwi"] = date_format($date, 'Y-m-d h:i:s');
            
            $currentfulldate2 = date_format($now, "mdYHis");
            $data['refnoofcause']   = $currentfulldate2."ADMTCATG";
            $data['opid'] = $currentfulldate2."OPDWI";

            $data['accountnumberpkg'] = $this->packages_model->getPackageAcctNo();
            $nowpkg = new DateTime();
            $currentfulldatepkg = date_format($nowpkg, "mdYHis");
            $data['refcodepkg']   = $currentfulldatepkg."51ENROLL";
            $data['refnohmo']   = $currentfulldatepkg."HMRJ";
            $datenowpkg = $this->get_current_date();
            $datepkg = new DateTime($datenowpkg);
            $data["currentdatepkg"] = date_format($datepkg, 'Y-m-d');

            $data["css"] = array
            (
                'assets/vendors/plugins/bootstrap/css/bootstrap.min.css',
                'assets/vendors/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
                'assets/vendors/plugins/bootstrap-select/css/bootstrap-select.min.css',
                'assets/vendors/plugins/sweetalert/sweetalert.css',
                'assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
                'assets/css/main.css',
                'assets/css/myCSS.css',
                'assets/css/color_skins.css'
            );

            $data["js"] = array
            (
                'assets/vendors/plugins/bootstrap-notify/bootstrap-notify.min.js',
                'assets/vendors/plugins/jquery/jquery-v3.2.1.min.js',
                'assets/bundles/libscripts.bundle.js',
                'assets/bundles/vendorscripts.bundle.js',
                'assets/bundles/datatablescripts.bundle.js',
                'assets/vendors/plugins/jquery-datatable/buttons/dataTables.buttons.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.bootstrap4.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.colVis.min.js',
                'assets/vendors/plugins/jquery-datatable/buttons/buttons.print.min.js',
                'assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js',
                'assets/vendors/plugins/sweetalert/sweetalert.min.js',
                'assets/bundles/mainscripts.bundle.js',
                'assets/js/moment.js',
                'assets/js/pages/tables/jquery-datatable.js',
                'assets/js/pages/jquery.mask.js',
                'assets/js/pages/jquery.mask.min.js',
                'assets/myjs/coamanagement.js',
                'assets/myjs/eropdcharges.js'
            );
            
            $this->load->view('templates/header', $data);
            $this->load->view('templates/sidebar', $data);
            $this->load->view('pages/eropdcharges', $data);
            $this->load->view('templates/footer', $data);
        } 
        else 
        {
            redirect('Login', 'refresh');
        }
    }
    
    public function GetAllWalkinPatientList()
    {
        $fetched_data = $this->eropdcharges_model->fetch_walkin_patient_masterlist_datatables();       

        $data = array();

        foreach ($fetched_data as $row) 
        {
            if(!isset($counter))
            {
                $counter = 0;
            }
            $counter++;
            
            $time = time();
            
            $dummy = "?dummy=".$time.$counter;
            
            $sub_array = array();

            $imgbaseurlad = base_url();
            $imglocationx = "assets/images/uploads/walkinpx/";
            $imagedefault = "default.png";
            $imgfilenamex = $row->OPDno."w.jpg";
            $imgidpic = $row->OPDno."w";
            
            $completeimglocation = $imgbaseurlad . $imglocationx . $imgfilenamex . $dummy;
            $defaultimaglocation = $imgbaseurlad . $imglocationx . $imagedefault;
            
            $sub_array[] = "";
            
            $sub_array[] = "<button class='btn btn-sm btn-info waves-effect' data-toggle='tooltip' data-placement='left' title='Print Patient Slip' onclick=generateWalkinPatient('" . $row->OPDno . "')><i class='zmdi zmdi-print'></i></button>&nbsp;
                            <button class='btn btn-sm btn-warning waves-effect' data-toggle='tooltip' data-placement='left' title='Edit Walkin Patient' onclick=showEditWalkinPatientModal('" . $row->OPDno . "')><i class='zmdi zmdi-edit'></i></button>&nbsp;
                            <button class='btn btn-sm btn-danger waves-effect' data-toggle='tooltip' data-placement='left' title='Delete Walkin Patient' onclick=deleteWalkinPatient('" . $row->OPDno . "')><i class='zmdi zmdi-delete'></i></button>&nbsp;";
            
            if(@getimagesize($completeimglocation))
            {
                $sub_array[] = "<img src='".$completeimglocation."' id='".$imgidpic."' onclick=viewPatientMiniProfile('" . $row->opid . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            else
            {
                $sub_array[] = "<img src='".$defaultimaglocation."' id='".$imgidpic."' onclick=viewPatientMiniProfile('" . $row->opid . "') height='40' width='40' alt='Thumbnail Image' class='rounded img-raised'>";
            }
            
            $birthdate = new DateTime($row->bday);
            $newbirthdate = $birthdate->format('F j, Y');
            
            $updatedate = new DateTime($row->updated);
            $newupdatedate = $updatedate->format('F j, Y h:i A');
           
            $sub_array[] = strtoupper($row->name);
            $sub_array[] = strtoupper($row->membercardno);
            $sub_array[] = strtoupper($newbirthdate);
            $sub_array[] = strtoupper($row->sex);
            $sub_array[] = strtoupper($row->Streetadrs.", ".$row->cityadd);
            $sub_array[] = strtoupper($row->opdid);
            $sub_array[] = strtoupper($newupdatedate);
            $sub_array[] = strtoupper($row->mypix);
            $sub_array[] = strtoupper($row->cellphone);
            $sub_array[] = strtoupper($row->OPDno);

            $data[] = $sub_array;
        }

        $output = array
        (
            "draw" => intval($this->input->post("draw")),
            "recordsTotal" => $this->eropdcharges_model->fetch_walkin_patient_masterlist_data(),
            "recordsFiltered" => $this->eropdcharges_model->fetch_walkin_patient_masterlist_filtered_data(),
            "data" => $data
        );

        echo json_encode($output);
    }
    
    public function AddNewWalkinPatient() 
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila');
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        $data = array();
        
        $fname = strtoupper($this->input->post('fname', TRUE));
        $mname = strtoupper($this->input->post('mname', TRUE));
        $lname = strtoupper($this->input->post('lname', TRUE));
        $suffx = strtoupper($this->input->post('suffix', TRUE));
        
        if($suffx === "")
        {
            $data['name'] = strtoupper($lname.", ".$fname." ".$mname);
        }
        else
        {
            $data['name'] = strtoupper($lname.", ".$fname." ".$mname." ".$suffx);
        }
        
        $data['lname']          = strtoupper($this->input->post('lname', TRUE));
        $data['fname']          = strtoupper($this->input->post('fname', TRUE));
        $data['mname']          = strtoupper($this->input->post('mname', TRUE));
        $data['suffix']         = strtoupper($this->input->post('suffix', TRUE));
        $data['Slrefno']        = strtoupper($this->input->post('slcode', TRUE));
        $data['memberrefno']    = strtoupper($this->input->post('membercode', TRUE));
        $data['patientno']      = strtoupper($this->input->post('pincode', TRUE));
        $data['inpatPIN']       = strtoupper($this->input->post('inpatPIN', TRUE));
        $data['updated']        = strtoupper($for_update);
        $data['opdno']          = strtoupper($this->input->post('opdno', TRUE));
        $data['opid']           = strtoupper($this->input->post('opid', TRUE));
        $data['membercardno']   = strtoupper($this->input->post('memberid', TRUE));
        $data['sex']            = strtoupper($this->input->post('gender', TRUE));
        $data['bday']           = strtoupper($this->input->post('birthday', TRUE));
        $data['age']            = strtoupper($this->input->post('pxage', TRUE));
        $data['province']       = strtoupper($this->input->post('provadd', TRUE));
        $data['cityadd']        = strtoupper($this->input->post('citymun', TRUE));
        $data['barangay']       = strtoupper($this->input->post('barangay', TRUE));
        $data['Streetadrs']     = strtoupper($this->input->post('street', TRUE));
        $data['cellphone']      = strtoupper($this->input->post('cellphone', TRUE));
        $data["recid"]          = strtoupper($this->session->userdata("ID"));
        $data["recby"]          = strtoupper($this->session->userdata("empname"));
        $data["station"]        = strtoupper(gethostbyaddr($_SERVER['REMOTE_ADDR']));

        $this->form_validation->set_rules('inpatPIN', 'Inpatient No.', 'required');
        $this->form_validation->set_rules('fname', 'First Name', 'required');
        $this->form_validation->set_rules('mname', 'Middle Name', 'required');
        $this->form_validation->set_rules('lname', 'Last Name', 'required');
        $this->form_validation->set_rules('gender', 'Gender', 'required');
        $this->form_validation->set_rules('birthday', 'Birthday', 'required');
        $this->form_validation->set_rules('pxage', 'Age', 'required');
        $this->form_validation->set_rules('provadd', 'Province', 'required');
        $this->form_validation->set_rules('citymun', 'City/Municipality', 'required');
        $this->form_validation->set_rules('barangay', 'Barangay', 'required');
        $this->form_validation->set_rules('street', 'Street/Purok', 'required');
        $this->form_validation->set_rules('cellphone', 'Cellphone', 'required');
        $this->form_validation->set_rules('image', 'Picture', 'required');

        if ($this->form_validation->run() == FALSE)
        {
            $errors['inpatPIN'] = form_error('inpatPIN');
            $errors['fname'] = form_error('fname');
            $errors['mname'] = form_error('mname');
            $errors['lname'] = form_error('lname');
            $errors['gender'] = form_error('gender');
            $errors['birthday'] = form_error('birthday');
            $errors['pxage'] = form_error('pxage');
            $errors['provadd'] = form_error('provadd');
            $errors['citymun'] = form_error('citymun');
            $errors['barangay'] = form_error('barangay');
            $errors['street'] = form_error('street');
            $errors['cellphone'] = form_error('cellphone');
            $errors['image'] = form_error('image');

            $result = ['status' => FALSE, 'errors' => $errors];
        } 
        else 
        {
            $result = $this->eropdcharges_model->add_new_walkin_patient($data);
            $result = ['status' => TRUE];
        }
        
        echo json_encode($result);
    }
    
    public function GenerateOPDCode() 
    {
        $result = $this->eropdcharges_model->generate_opdno();
        echo json_encode($result);
    }
    
    public function deleteWalkinPatient() 
    {
        $result = array('status' => FALSE);
        
        $opdid = $this->input->post('opdidx');
        
        $opdwalkintable = $this->eropdcharges_model->delete_walkin_patient_from_opdwalkin($opdid);
        
        if ($opdwalkintable) 
        {
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function getWalkinPatientlistData() 
    {
        $result = array('status' => FALSE);
        $opdnox = $this->input->post('opdnox');

        $opdwalkin_data = $this->eropdcharges_model->get_data_from_opdwalkin($opdnox);

        if ($opdwalkin_data) 
        {
            $result["opdwalkindata"] = $opdwalkin_data;
            $result['status'] = true;
        }
        echo json_encode($result);
    }
    
    public function UpdateSelectedWalkinPatient() 
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');

        date_default_timezone_set('Asia/Manila');
        $update_record = new DateTime();
        $for_update = $update_record->format('Y-m-d h:i:s');

        $data = array();
        
        $fname = strtoupper($this->input->post('fname', TRUE));
        $mname = strtoupper($this->input->post('mname', TRUE));
        $lname = strtoupper($this->input->post('lname', TRUE));
        $suffx = strtoupper($this->input->post('suffix', TRUE));
        
        if($suffx === "")
        {
            $data['name'] = strtoupper($lname.", ".$fname." ".$mname);
        }
        else
        {
            $data['name'] = strtoupper($lname.", ".$fname." ".$mname." ".$suffx);
        }
        
        $data['lname']          = strtoupper($this->input->post('lname', TRUE));
        $data['fname']          = strtoupper($this->input->post('fname', TRUE));
        $data['mname']          = strtoupper($this->input->post('mname', TRUE));
        $data['suffix']         = strtoupper($this->input->post('suffix', TRUE));
        $data['Slrefno']        = strtoupper($this->input->post('slcode', TRUE));
        $data['memberrefno']    = strtoupper($this->input->post('membercode', TRUE));
        $data['patientno']      = strtoupper($this->input->post('pincode', TRUE));
        $data['inpatPIN']       = strtoupper($this->input->post('inpatPIN', TRUE));
        $data['updated']        = strtoupper($for_update);
        $data['OPDno']          = strtoupper($this->input->post('opdno', TRUE));
        $data['opid']           = strtoupper($this->input->post('opid', TRUE));
        $data['membercardno']   = strtoupper($this->input->post('memberid', TRUE));
        $data['sex']            = strtoupper($this->input->post('gender', TRUE));
        $data['bday']           = strtoupper($this->input->post('birthday', TRUE));
        $data['age']            = strtoupper($this->input->post('pxage', TRUE));
        $data['province']       = strtoupper($this->input->post('provadd', TRUE));
        $data['cityadd']        = strtoupper($this->input->post('citymun', TRUE));
        $data['barangay']       = strtoupper($this->input->post('barangay', TRUE));
        $data['Streetadrs']     = strtoupper($this->input->post('street', TRUE));
        $data['cellphone']      = strtoupper($this->input->post('cellphone', TRUE));
        $data["recid"]          = strtoupper($this->session->userdata("ID"));
        $data["recby"]          = strtoupper($this->session->userdata("empname"));
        $data["station"]        = strtoupper(gethostbyaddr($_SERVER['REMOTE_ADDR']));

        $this->form_validation->set_rules('fname', 'First Name', 'required');
        $this->form_validation->set_rules('mname', 'Middle Name', 'required');
        $this->form_validation->set_rules('lname', 'Last Name', 'required');
        $this->form_validation->set_rules('gender', 'Gender', 'required');
        $this->form_validation->set_rules('birthday', 'Birthday', 'required');
        $this->form_validation->set_rules('pxage', 'Age', 'required');
        $this->form_validation->set_rules('provadd', 'Province', 'required');
        $this->form_validation->set_rules('citymun', 'City/Municipality', 'required');
        $this->form_validation->set_rules('barangay', 'Barangay', 'required');
        $this->form_validation->set_rules('street', 'Street/Purok', 'required');
        $this->form_validation->set_rules('cellphone', 'Cellphone', 'required');
        $this->form_validation->set_rules('image', 'Picture', 'required');

        if ($this->form_validation->run() == FALSE)
        {
            $errors['fname'] = form_error('fname');
            $errors['mname'] = form_error('mname');
            $errors['lname'] = form_error('lname');
            $errors['gender'] = form_error('gender');
            $errors['birthday'] = form_error('birthday');
            $errors['pxage'] = form_error('pxage');
            $errors['provadd'] = form_error('provadd');
            $errors['citymun'] = form_error('citymun');
            $errors['barangay'] = form_error('barangay');
            $errors['street'] = form_error('street');
            $errors['cellphone'] = form_error('cellphone');
            $errors['image'] = form_error('image');

            $result = ['status' => FALSE, 'errors' => $errors];
        } 
        else 
        {
            $result = $this->eropdcharges_model->update_walkin_patient($data['OPDno'], $data);
            $result = ['status' => TRUE];
        }
        
        echo json_encode($result);
    }
    
    public function Generate_Walkin_Patient_Info()
    {
        if ($this->has_logging_in())
        {
            $this->load->library('javabridge');
            
            $this->javabridge->load_system();
            $this->javabridge->load_class();

            $compileManager = $this->javabridge->load_manager($type = 'compiler');
            $targetjrxml = "C:/xampp/htdocs/HUBv19/assets/reports/eropdcharges/TestingReport.jrxml";
            $report = $compileManager->compileReport($targetjrxml);

            $fillManager = $this->javabridge->load_manager($type = 'importer');
            $emptyDataSource = $this->javabridge->load_datasource($source = 'emptydata');
            
            $params = $this->javabridge->load_util($util = 'hashmap');

            $arrayListTable = $this->javabridge->load_util($util = 'arraylist');
            $arrayListChart = $this->javabridge->load_util($util = 'arraylist');

            $itemtable1 = array
            (
                'debit'=>"debit number1",
                'credit'=>"credit number1",
                'pics'=>"image number1"
            );

            $itemtable2 = array
            (
                'debit'=>"debit number2",
                'credit'=>"credit number2",
                'pics'=>"image number2"
            );

            $itemtable3 = array
            (
                'debit'=>"debit number3",
                'credit'=>"credit number3",
                'pics'=>"image number3"
            );

            $itemchart1 = array
            (
                'series'=>"SINGLE",
                'value'=>30
            );

            $itemchart2 = array
            (
                'series'=>"MARRIED",
                'value'=>30
            );

            $itemchart3 = array
            (
                'series'=>"DIVORCE",
                'value'=>40
            );

            $arrayListTable->add($itemtable1);
            $arrayListTable->add($itemtable2);
            $arrayListTable->add($itemtable3);

            $arrayListChart->add($itemchart1);
            $arrayListChart->add($itemchart2); 
            $arrayListChart->add($itemchart3); 

            $beanCollectiontable = $this->javabridge->load_datasource($source = 'multidata', $arrayListTable);    
            $beanCollectionchart = $this->javabridge->load_datasource($source = 'multidata', $arrayListChart);

            $params->put('ReportDataSource', $beanCollectiontable);
            $params->put('ChartDataSource', $beanCollectionchart);
            $params->put("picture","C:/xampp/htdocs/HUBv19/assets/images/cherry.jpg");
            $params->put("ChartTitle","CIVIL STATUS");

            $jasperPrint = $fillManager->fillReport($report, $params, $emptyDataSource);

            $outputPath = realpath(".")."\\"."TestingReport.pdf";
            
            $exportManager = $this->javabridge->load_manager($type = 'exporter');
            $exportManager->exportReportToPdfFile($jasperPrint, $outputPath);

            header("Content-type: application/pdf");
            header("Content-Disposition:filename=TestingReport.pdf");

            readfile($outputPath);
            unlink($outputPath);
        }
        else 
        {
            redirect('Login', 'refresh');
        }
    }
}