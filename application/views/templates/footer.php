<!-- Javascript External =====================================================================================-->
<?php foreach ($js as $data) { ?>
    <script src="<?= base_url($data); ?>"></script>
<?php } ?>
    
<script>    
    $.fn.selectpicker.Constructor.DEFAULTS.iconBase = 'zmdi';
    $.fn.selectpicker.Constructor.DEFAULTS.tickIcon = 'zmdi-check';
</script>



<script src="<?= base_url('assets/plugins/momentjs/moment.js'); ?>"></script> <!-- Moment Plugin Js -->
<script src="<?= base_url('assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js'); ?>"></script>

<script src="<?= base_url('assets/js/sweetalert2@8.js'); ?>"></script>

<script src="<?= base_url('assets/vendors/plugins/sweetalert/sweetalert.min.js'); ?>"></script>


<!-- Javascript External =====================================================================================-->

</html>