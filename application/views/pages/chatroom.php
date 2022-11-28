

<section class="content">
    <div class="block-header">
        <div class="row">
            <div class="col-lg-7 col-md-5 col-sm-12">
                <h2>Chat
                <small class="text-muted"><?= $hosp_name['compname'] ?></small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-7 col-sm-12">                
                <button class="btn btn-white btn-icon btn-round d-none d-md-inline-block float-right m-l-10" type="button">
                    <i class="zmdi zmdi-plus"></i>
                </button>
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i> Home</a></li>
                    <li class="breadcrumb-item"><a >App</a></li>
                    <li class="breadcrumb-item active">Chat</li>
                </ul>                
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row clearfix">           
            <div class="col-lg-12 col-xl-12">
                <div class="card chat-app">
                    <div id="plist" class="people-list">
                        <div class="input-group">                                
                            <input type="text" class="form-control" placeholder="Search...">
                            <span class="input-group-addon">
                                <i class="zmdi zmdi-search"></i>
                            </span>
                        </div>                        
                        <ul class="nav nav-tabs p-l-0 p-r-0" role="tablist">
                            <li class="nav-item inlineblock"><a class="nav-link active" data-toggle="tab" href="#people">People</a></li>
                            <li class="nav-item inlineblock"><a class="nav-link" data-toggle="tab" href="#groups">Groups</a></li>
                        </ul>
                        <div class="tab-content"  >
                            <div role="tabpanel" class="tab-pane stretchRight active" id="people" >
                                <ul class="chat-list list-unstyled m-b-0" id="chat_list" style="height: 100%;max-height: 400px;  overflow: auto;">
                                   
                                    
                                    
<!--                                    <li class="clearfix">
                                        <img src="../assets/images/xs/avatar9.jpg" alt="avatar" />
                                        <div class="about">
                                            <div class="name">Dean Henry</div>
                                            <div class="status"> <i class="zmdi zmdi-circle offline"></i> offline since Oct 28 </div>
                                        </div>
                                    </li>-->
                                </ul>
                            </div>
                            <div role="tabpanel" class="tab-pane stretchRight" id="groups">
                                <ul class="chat-list list-unstyled">
                                    <li class="clearfix">
                                        <img src="../assets/images/xs/avatar6.jpg" alt="avatar"/>
                                        <div class="about">
                                            <div class="name">PHP Lead</div>
                                            <div class="status">6 People </div>
                                        </div>
                                    </li>
                                    <li class="clearfix">
                                        <img src="../assets/images/xs/avatar7.jpg" alt="avatar"/>
                                        <div class="about">
                                            <div class="name">UI UX Designer</div>
                                            <div class="status">10 People </div>
                                        </div>
                                    </li>
                                    <li class="clearfix">
                                        <img src="../assets/images/xs/avatar8.jpg" alt="avatar"/>
                                        <div class="about">
                                            <div class="name">TL Groups</div>
                                            <div class="status">2 People </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="chat">
                        <div class="chat-header clearfix">
                            <img src="http://192.168.2.100:3777/HUBv19//assets/images/xs/avatar1.jpg" alt="avatar" />
                            <div class="chat-about">
                                  <div class="chat-with" id="chatwith">Aiden Chavez</div>
                                <div class="chat-num-messages">already 8 messages</div>
                            </div>
                            <a  class="list_btn btn btn-primary btn-round float-md-right"><i class="zmdi zmdi-comments"></i></a>
                        </div>
                      
                        <div class="chat-history xl-slategray" style="height: 400px;max-height: 400px;  overflow: auto;" id="divchatbox">
                            <ul class="m-b-0" id="chatHolder" >
                                <li class="clearfix">
                                    <div class="message-data text-right"> <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp; <span class="message-data-name" >Charlotte</span> <i class="zmdi zmdi-circle me"></i> </div>
                                    <div class="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                                </li>
                                <li>
                                    <div class="message-data">
                                        <span class="message-data-name"><i class="zmdi zmdi-circle online"></i> Aiden</span> <span class="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div class="message my-message">
                                        <p>Are we meeting today? Project has been already finished and I have results to show you.</p>
                                        <div class="row">
                                            <!--<div class="col-sm-6 col-lg-4 m-t-10"><a href="javascript:void(0);"><img src="../assets/images/image2.jpg" alt="" class="img-fluid img-thumbnail"></a> </div>-->
<!--                                            <div class="col-sm-6 col-lg-4 m-t-10"><a href="javascript:void(0);"> <img src="../assets/images/image3.jpg" alt="" class="img-fluid img-thumbnail"></a> </div>
                                            <div class="col-sm-6 col-lg-4 m-t-10"><a href="javascript:void(0);"> <img src="../assets/images/image4.jpg" alt="" class="img-fluid img-thumbnail"> </a> </div>-->
                                        </div>
                                    </div>
                                </li>                        
                                <li>
                                    <div class="message-data"> <span class="message-data-name"><i class="zmdi zmdi-circle online"></i> Aiden</span> <span class="message-data-time">10:31 AM, Today</span> </div>
                                    <i class="zmdi zmdi-circle online"></i> <i class="zmdi zmdi-circle online" style="color: #AED2A6"></i> <i class="zmdi zmdi-circle online" style="color:#DAE9DA"></i> </li>
                            </ul>
                        </div>
                        <div class="chat-message clearfix">
                            <div class="input-group p-t-15">
                                <input type="text" class="form-control" placeholder="Enter text here..." id="chatmessage">
                                <span class="input-group-addon " onclick="sendChat()">
                                    <i class="zmdi zmdi-mail-send"></i>
                                </span>
                            </div>
                            <a  class="btn btn-raised btn-warning btn-round"><i class="zmdi zmdi-camera"></i></a>
                            <a  class="btn btn-raised btn-info btn-round"><i class="zmdi zmdi-file-text"></i></a>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!--
<script>
    $(".list_btn").on('click',function(){
        $("#plist").toggleClass("open");
    });
</script>-->