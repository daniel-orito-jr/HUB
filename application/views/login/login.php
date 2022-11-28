<!doctype html>
<html class="no-js " lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <meta name="description" content="Responsive Bootstrap 4 and web Application ui kit.">

        <title>HUBv19 | Sign In</title>
        <link rel="shortcut icon" type="image/x-icon" href="<?= base_url('assets/images/logo.png'); ?>">
        <link rel="stylesheet" href="<?= base_url('assets/vendors/plugins/bootstrap/css/bootstrap.min.css') ?>">
        <link rel="stylesheet" href="<?= base_url('assets/css/main.css'); ?>">
        <link rel="stylesheet" href="<?= base_url('assets/css/authentication.css'); ?>">
        <link rel="stylesheet" href="<?= base_url('assets/css/color_skins.css'); ?>">
        <link rel="stylesheet" href="<?= base_url('assets/css/sweetalert2.css'); ?>">
        
        <script>var BASE_URL = '<?= base_url() ?>'</script>
    </head>

    <body class="theme-cyan authentication sidebar-collapse">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg fixed-top navbar-transparent">
            <div class="container">        
                <div class="navbar-translate n_logo">
                    <a class="navbar-brand" href="http://192.168.2.100:3777/HUBv19/" title="" target="_blank"><?= $hosp_name['compname'] ?></a>
                    <button class="navbar-toggler" type="button">
                        <span class="navbar-toggler-bar bar1"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </button>
                </div>
                <div class="navbar-collapse">
                    <ul class="navbar-nav">
<!--                        <li class="nav-item">
                            <a class="nav-link" title="Follow us on Twitter" href="javascript:void(0);" target="_blank">
                                <i class="zmdi zmdi-twitter"></i>
                                <p class="d-lg-none d-xl-none">Twitter</p>
                            </a>
                        </li>-->
                        <li class="nav-item">
                            <a class="nav-link" title="Like us on Facebook" href="https://www.facebook.com/drainwiz/" target="_blank">
                                <i class="zmdi zmdi-facebook"></i>
                                <p class="d-lg-none d-xl-none">Facebook</p>
                            </a>
                        </li>
<!--                        <li class="nav-item">
                            <a class="nav-link" title="Follow us on Instagram" href="javascript:void(0);" target="_blank">                        
                                <i class="zmdi zmdi-instagram"></i>
                                <p class="d-lg-none d-xl-none">Instagram</p>
                            </a>
                        </li>                -->
<!--                        <li class="nav-item">
                            <a class="nav-link btn btn-white btn-round" href="">SIGN UP</a>
                        </li>-->
                        <li class="nav-item">
                            <a href="https://www.mydrainwiz.com/ContactUs" target="_blank">Contact Us</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://www.mydrainwiz.com/AboutUs" target="_blank">About Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- End Navbar -->
        <div class="page-header">
            <div class="page-header-image" style="background-image:url(<?= base_url('assets/images/login.jpg'); ?>)"></div>
            <div class="container">
                <div class="col-md-12 content-center">
                    <div class="card-plain">
                        <form class="sign-in-form">
                            <div class="header">
                                <div class="logo-container">
                                    <img src="<?= base_url('assets/images/logo.png'); ?>" alt="logo">
                                </div>
                                <h5>HUBv19 | Sign In</h5>
                            </div>
                            <div class="content">                                                
                                <div class="input-group input-lg">
                                    <input type="text" class="form-control" id="username" name="username" placeholder="Enter User Name" autocomplete="off" autofocus>
                                    <span class="input-group-addon">
                                        <i class="zmdi zmdi-account-circle"></i>
                                    </span>
                                </div>
                                <div id="usernameerror" class="alert alert-danger d-none" role="alert">
                                    <div class="container">
                                    </div>
                                </div>
                                <div class="input-group input-lg">
                                    <input type="password" placeholder="Password" id="password" name="password" class="form-control" />
                                    <span class="input-group-addon">
                                        <i class="zmdi zmdi-lock"></i>
                                    </span>
                                </div>
                                <div id="passworderror" class="alert alert-danger d-none" role="alert">
                                    <div class="container">
                                    </div>
                                </div>
                                <div id="accounterror" class="alert alert-danger d-none" role="alert">
                                    <div class="container">
                                    </div>
                                </div>
                            </div>
                            <div class="footer text-center">
                                <button type="button" onclick="login();" class="btn btn-primary btn-round btn-lg btn-block ">SIGN IN</button>
<!--                                <h5><a href="forgot-password.html" class="link">Forgot Password?</a></h5>-->
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container">
                    <nav>
<!--                        <ul>
                            <li><a href="https://www.mydrainwiz.com/ContactUs" target="_blank">Contact Us</a></li>
                            <li><a href="https://www.mydrainwiz.com/AboutUs" target="_blank">About Us</a></li>
                        </ul>-->
                    </nav>
                    <div class="copyright">
                        &copy;
                        <script>
                            document.write(new Date().getFullYear())
                        </script>,
                        <span><a href="http://mydrainwiz.com/" target="_blank">Drainwiz</a>. Version 19. All rights reserved</span>
                    </div>
                </div>
            </footer>
        </div>

        <!-- Jquery Core Js -->
        <script src="<?= base_url('assets/bundles/libscripts.bundle.js'); ?>"></script>
        <script src="<?= base_url('assets/bundles/vendorscripts.bundle.js'); ?>"></script> <!-- Lib Scripts Plugin Js -->
        <script src="<?= base_url('assets/myjs/login.js'); ?>"></script> <!-- Lib Scripts Plugin Js -->

        <script>
            $(".navbar-toggler").on('click', function () {
                $("html").toggleClass("nav-open");
            });
            //=============================================================================
            $('.form-control').on("focus", function () {
                $(this).parent('.input-group').addClass("input-group-focus");
            }).on("blur", function () {
                $(this).parent(".input-group").removeClass("input-group-focus");
            });
        </script>
        
        <script src="<?= base_url('assets/js/sweetalert2.js'); ?>"></script>
        <script src="<?= base_url('assets/js/sweetalert2@8.js'); ?>"></script>
        <script src="<?= base_url('assets/js/promise-polyfill.js'); ?>"></script>
    </body>
</html>