<?php

class Uploads extends MY_Controller {

    public function __construct() {
        parent::__construct();
    }

    /**
     * Upload doctor image to images/uploads folder
     * @version 2019-02-20
     * @author LJ Roa
     */
    function UploadDoctorImage() {
        
        $target = "assets/images/uploads/doctors/";
        $name = $_FILES['file']['name'];
        $ext = pathinfo($name, PATHINFO_EXTENSION);

        $target = $target . basename($name);
        move_uploaded_file($_FILES['file']['tmp_name'], $target);

        $this->convertImageToJPG($target);

        echo json_encode(true);
    }
    
//    function UploadPatientImage() 
//    {
//        $target = "assets/images/uploads/patients/";
//        $name = $_FILES['file']['name'];
////        
////        $_FILES["file"]["name"]
//
//        pathinfo($name, PATHINFO_EXTENSION);
//        $target = $target . basename($name);
//        move_uploaded_file($_FILES['file']['tmp_name'], $target);
//        
////        var_dump($_FILES['file']['tmp_name']);
////        exit(0);
//
//        $this->convertImageToJPG($target);
//
//        echo json_encode(true);
//    }
    
    function UploadPatientImage() 
    {    
        $config['file_name']        = $_FILES["file"]["name"];
        $config['upload_path']      = 'assets/images/uploads/patients/';  
        $config['allowed_types']    = 'jpg|jpeg|png|gif'; 
        $config['overwrite']        = true;

        $this->load->library('upload', $config);  

         if(!$this->upload->do_upload('file'))  
         {  
              echo $this->upload->display_errors();  
         }  
         else  
         {  
              $this->upload->data();   

              echo json_encode(true);
              
              $folder = $config['upload_path'];
              $filename = $config['file_name'];
              $target = $folder.basename($filename);
              
              $old = umask(0);
              chmod($target, 0777);
              umask($old);
              
              $this->convertImageToJPG($target);
         }
    }
    
    function UploadWalkinPatientImage() 
    {    
        $config['file_name']        = $_FILES["file"]["name"];
        $config['upload_path']      = 'assets/images/uploads/walkinpx/';  
        $config['allowed_types']    = 'jpg|jpeg|png|gif'; 
        $config['overwrite']        = true;

        $this->load->library('upload', $config);  

         if(!$this->upload->do_upload('file'))  
         {  
              echo $this->upload->display_errors();  
         }  
         else  
         {  
              $this->upload->data();   

              echo json_encode(true);
              
              $folder = $config['upload_path'];
              $filename = $config['file_name'];
              $target = $folder.basename($filename);
              
              $old = umask(0);
              chmod($target, 0777);
              umask($old);
              
              $this->convertImageToJPG($target);
         }
    }
    
    function DeleteUploadedPatientImage()
    {
        $target = "assets/images/uploads/patients/";
        $name = $_FILES['file']['name'];
        $filename = $target . $name;
        
        unlink($filename);

        echo json_encode(true);
    }
    
    function DeleteUploadedWalkinPatientImage()
    {
        $target = "assets/images/uploads/walkinpx/";
        $name = $this->input->post('filename');

        $filename = $target . $name;

        unlink($filename);

        echo json_encode(true);
    }

    function UploadAdmitPatientImage()
    {
        $target = "assets/images/uploads/patients/admitted/";
        $name = $_FILES['file']['name'];
        $ext = pathinfo($name, PATHINFO_EXTENSION);

        $target = $target . basename($name);
        move_uploaded_file($_FILES['file']['tmp_name'], $target);

        $this->convertImageToJPG($target);

        echo json_encode(true);
    }
    

    /**
     * Upload clinic image to images/uploads folder
     * @version 2019-02-20
     * @author LJ Roa
     */
    function UploadClinicImage() {
        $target = "assets/images/uploads/clinics/";
        $name = $_FILES['file']['name'];
        $ext = pathinfo($name, PATHINFO_EXTENSION);

        $target = $target . basename($name);
        move_uploaded_file($_FILES['file']['tmp_name'], $target);

        $this->convertImageToJPG($target);

        echo json_encode(true);
    }

    /**
     * Convert any image into .jpg
     * @param type $target File name to be converted
     * @author LJ Roa
     * @version 2019-02-21
     */
    function convertImageToJPG($target) {

        // jpg, png, gif or bmp?
        $exploded = explode('.', $target);
        $ext = $exploded[count($exploded) - 1];

        if (preg_match('/jpg|jpeg/i', $ext)) {
            $orig_image = imagecreatefromjpeg($target);
        } else if (preg_match('/png/i', $ext)) {
            $orig_image = imagecreatefrompng($target);
        } else if (preg_match('/gif/i', $ext)) {
            $orig_image = imagecreatefromgif($target);
        } else if (preg_match('/bmp/i', $ext)) {
            $orig_image = imagecreatefrombmp($target);
        }

        $image_info = getimagesize($target);
        $width_orig = $image_info[0]; // current width as found in image file
        $height_orig = $image_info[1]; // current height as found in image file
        $width = 180; // new image width
        $height = 180; // new image height
        $destination_image = imagecreatetruecolor($width, $height);
        $backgroundColor = imagecolorallocate($destination_image, 255, 255, 255);
        imagefill($destination_image, 0, 0, $backgroundColor);
        imagecopyresampled($destination_image, $orig_image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);

        // This will just copy the new image over the original at the same filePath.
        imagejpeg($destination_image, $exploded[0] . '.' . 'jpg', 100);

        if (file_exists($exploded[0] . '.' . 'png')) {

            unlink($exploded[0] . '.' . 'png');
        }
    }

}
