
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var reciever = '';
var user_name = '';
var data = new Array();
var list = null;
$(function () {

    getPeople();
    $('#divchatbox').scroll(function () {
        console.log($('#divchatbox').scrollTop());
    });
});


function getPeople() {
    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Chat/GetDoctorsAndNurses",
                data: $('#add-applicant-form').serialize(),
                dataType: 'json'
            })
            .done(function (data) {
                $('#chat_list').empty();
                for (var i = 0; i < data.length; i++) {
//                    $('#chat_list').append('<li class="clearfix" onclick="chatWith(' + "'" + data[i]['doclname'] + "'" + ',' + "'" + data[i]['docfname'] + "'" + ',' + "'" + data[i]['docrefno'] + "'" + ')">' +
//                            '<img src="' + BASE_URL + '/assets/images/xs/avatar1.jpg" alt="avatar" style="width:15%" />' +
//                            '<div class="about">' +
//                            '<div class="name">' + data[i]['doclname'] + ", " + data[i]['docfname'] + '</div>' +
//                            ' <div class="status"> <i class="zmdi zmdi-circle offline"></i> left 7 mins ago </div>' +
//                            '</div>' +
//                            '</li>');

                    $('#chat_list').append('<li class="clearfix" onclick="chatWithSample(' + "'" + data[i]['employeename'] + "'" + ',' + "'" + data[i]['profileno'] + "'" + ')">' +
                            '<img src="' + BASE_URL + '/assets/images/xs/avatar1.jpg" alt="avatar" style="width:15%" />' +
                            '<div class="about">' +
                            '<div class="name">' + data[i]['employeename'] + '</div>' +
                            ' <div class="status"> <i id="pro' + data[i]['profileno'] + '" class="zmdi zmdi-circle offline"></i><span id="' + data[i]['profileno'] + '">is currently offline.</span></div>' +
                            '</div>' +
                            '</li>');
                }
            });
}

function checkActive() {
    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Chat/GetActiveUsers",
                dataType: 'json'
            }).done(function (data) {
        for (var index = 0; index < data.length; index++) {
            $('#' + data[index][0]).empty();
            if (data[index][1] == 1) {
                $('#pro' + data[index][0]).removeClass('offline');
                $('#pro' + data[index][0]).addClass('online');
            $('#' + data[index][0]).append('is now active.');
            } else {
                $('#pro' + data[index][0]).removeClass('online');
                $('#pro' + data[index][0]).addClass('offline');
            $('#' + data[index][0]).append('is currently offline.');
            }

        }
    });
}


function chatWith(lastname, firstname, docrefno) {
    $('#chatwith').empty();
    $('#chatwith').append(lastname + ", " + firstname);
    reciever = docrefno;
}

function chatWithSample(name, profileno) {
    $('#chatwith').empty();
    $('#chatwith').append(name);
    $('#chatHolder').empty();
    reciever = profileno;
    user_name = name;
    data = new Array();
}


function sendChat() {
//    var fileToUpload = $('#choose').prop('files')[0];
    var fileToUpload = undefined;
    if (fileToUpload != undefined) {
        console.log('here');
        var form_data = new FormData();
        form_data.append("file", fileToUpload, $('#chatmessage').val() + "," + reciever);
        $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Chat/SaveConversation",
                    data: form_data,
                    contentType: false,
                    cache: false,
                    processData: false,
                    dataType: 'json'
                })
                .done(function (data) {

                });
    } else {
        $.ajax
                ({
                    type: 'POST',
                    url: BASE_URL + "Chat/SaveConversation",
                    data: {message: $('#chatmessage').val(), reciever: reciever},
                    dataType: 'json'
                })
                .done(function (data) {

                });
    }
}
triggerChatCounter = function () {
    setTimeout(function () {
        readChat();
        checkActive();
        triggerChatCounter();
    }, 2000);
};

triggerChatCounter();
function readChat() {
    $.ajax
            ({
                type: 'POST',
                url: BASE_URL + "Chat/ReadConversation",
                data: {reciever: reciever},
                dataType: 'json'
            })
            .done(function (result) {
                if (data.length == 0) {

                }
                if (result.length > data.length) {
                    if (result[result.length - 2][0] != 0) {
                        displayChat(result[result.length - 2][2]);
                    } else {
                        displayChat(result[result.length - 2][2], result[result.length - 2][0]);

                    }
                    data = result;
                }

            });
}

function displayChat(message, user) {
    if (user == 0) {
        $('#chatHolder').append('<li class="clearfix">' +
                '<div class="message-data text-right"> &nbsp; &nbsp; <span class="message-data-name" >' + $('#name_login').val() + '</span> <i class="zmdi zmdi-circle me"></i> </div>' +
                '<div class="message other-message float-right" style="text-align:right">' + message + '</div>' +
                '</li>');
    } else {
        $('#chatHolder').append('<li>' +
                '<div class="message-data">' +
                '<span class="message-data-name"><i class="zmdi zmdi-circle online"></i>' + user_name + '</span> <span class="message-data-time">10:12 AM, Today</span>' +
                '</div>' +
                '<div class="message my-message">' +
                '<p>' + message + '</p>' +
                '</div>' +
                '</li>');
    }
}

