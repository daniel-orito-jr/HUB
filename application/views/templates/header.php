<!DOCTYPE html>  
<html class="no-js " lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <meta name="description" content="Responsive Bootstrap 4 and web Application ui kit.">
        
        <title><?= $page_title ?></title>
        
        <link rel="shortcut icon" type="image/x-icon" href="<?= base_url('assets/images/logo.png'); ?>">
        
        <link href="<?= base_url('assets/css/animate.css'); ?>" rel="stylesheet">
        <link href="<?= base_url('assets/css/toogle_switch.css'); ?>" rel="stylesheet">
        <link href="<?= base_url('assets/css/tooltips.css'); ?>" rel="stylesheet">
        <link href="<?= base_url('assets/css/loader.css'); ?>" rel="stylesheet">
        <link href="<?= base_url('assets/css/font-awesome.css'); ?>" rel="stylesheet">
        <link href="<?= base_url('assets/css/zmdi icons/css/material-design-iconic-font.min.css'); ?>" rel="stylesheet">

        <?php foreach ($css as $data) { ?>
            <link href="<?= base_url($data); ?>" rel="stylesheet">
        <?php } ?>

        <script>
            var BASE_URL = '<?php echo base_url(); ?>';
        </script>
        
        
    </head>