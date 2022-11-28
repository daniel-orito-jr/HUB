$(function () {
    $('input').keypress(function (e) {
        if (e.keyCode == 13)
            login();
    });
});

function login() {

    var username = $('#username').val();
    var password = $('#password').val();
    var error = 0;

    $.ajax({

        type: 'POST',
        data: {
            username: username,
            password: password
        },
        dataType: 'json',
        url: BASE_URL + 'Login/SignIn'

    }).done(function (result) 
    {
        if (result.error_status === false) 
        {
            if (result.errors.username != '')
            {
                $('#usernameerror').empty();
                $('#usernameerror').append(result.errors.username).removeClass('d-none');
            } 
            else
            {
                $('#accounterror').empty().addClass('d-none');
                $('#usernameerror').addClass('d-none');
            }

            if (result.errors.password != '') 
            {
                $('#passworderror').empty();
                $('#passworderror').append(result.errors.password).removeClass('d-none');
            } 
            else 
            {
                $('#accounterror').empty().addClass('d-none');
                $('#passworderror').addClass('d-none');
            }
        }

        if (result.status)
        {
            const Toast = Swal.mixin
            ({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000
            });
            
            Toast.fire
            ({
                type: 'success',
                title: 'Signed in successfully',
                allowOutsideClick: false
            });
            
            setTimeout(function ()
            {
                window.location.href = BASE_URL + "dashboard";
            }, 1000);
        }

        if (result.error_acct) {
            $('#usernameerror').addClass('d-none');
            $('#passworderror').addClass('d-none');
            $('#accounterror').empty();
            $('#accounterror').append('<span>Account does not exists!</span>').removeClass('d-none');
        } 
        else 
        {
            if (result.error_access) 
            {
                $('#accounterror').empty();
                $('#accounterror').append('<span>Access Denied!</span>').removeClass('d-none');
            } 
            else 
            {
                if (result.error_pass) 
                {
                    $('#accounterror').empty();
                    $('#accounterror').append('<span>Incorrect Username / Password!</span>').removeClass('d-none');
                }
            }
        }



    });


}