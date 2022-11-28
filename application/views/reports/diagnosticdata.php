<html>

<head>
    <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
    <meta name=Generator content="Microsoft Word 15 (filtered)">
    <title> <u><?= $title ?></u> </title>
    <style>
        <!--
         /* Font Definitions */
         @font-face
                {font-family:Wingdings;
                panose-1:5 0 0 0 0 0 0 0 0 0;}
        @font-face
                {font-family:"Cambria Math";
                panose-1:0 0 0 0 0 0 0 0 0 0;}
        @font-face
                {font-family:Tahoma;
                panose-1:2 11 6 4 3 5 4 4 2 4;}
         /* Style Definitions */
         p.MsoNormal, li.MsoNormal, div.MsoNormal
                {margin:0in;
                margin-bottom:.0001pt;
                font-size:8.0pt;
                font-family:"Arial",sans-serif;}
        h1
                {margin:0in;
                margin-bottom:.0001pt;
                text-align:center;
                font-size:14.0pt;
                font-family:"Arial",sans-serif;
                text-transform:uppercase;
                letter-spacing:.4pt;}
        h2
                {margin:0in;
                margin-bottom:.0001pt;
                text-align:center;
                font-size:10.0pt;
                font-family:"Arial",sans-serif;
                text-transform:uppercase;
                letter-spacing:.4pt;}
        h3
                {margin:0in;
                margin-bottom:.0001pt;
                text-align:center;
                font-size:10.0pt;
                font-family:"Arial",sans-serif;
                font-weight:normal;}
        p.MsoAcetate, li.MsoAcetate, div.MsoAcetate
                {margin:0in;
                margin-bottom:.0001pt;
                font-size:8.0pt;
                font-family:"Arial",sans-serif;}
        span.MsoPlaceholderText
                {color:gray;}
        p.Centered, li.Centered, div.Centered
                {mso-style-name:Centered;
                margin:0in;
                margin-bottom:.0001pt;
                text-align:center;
                font-size:8.0pt;
                font-family:"Arial",sans-serif;}
        p.Italic, li.Italic, div.Italic
                {mso-style-name:Italic;
                mso-style-link:"Italic Char";
                margin:0in;
                margin-bottom:.0001pt;
                font-size:8.0pt;
                font-family:"Arial",sans-serif;
                font-style:italic;}
        span.ItalicChar
                {mso-style-name:"Italic Char";
                mso-style-link:Italic;
                font-family:"Arial",sans-serif;
                font-style:italic;}
        .MsoChpDefault
                {font-size:10.0pt;}
        @page WordSection1
                {size:8.5in 10.3in;
                margin:43.9pt .75in 43.9pt .75in;}
        div.WordSection1
                {page:WordSection1;}
         /* List Definitions */
         ol
                {margin-bottom:0in;}
        ul
                {margin-bottom:0in;}
        -->
    </style>

</head>

<body lang=EN-US>
    <div class=WordSection1>
        <div style="padding-left:0px;padding-top:0px">
            <div style="position:relative">
                <div style="position: absolute;left: 0;">
                    <br>
                    <img src="<?= base_url('assets/images/drainwizlogo.png') ?>" alt="logo" style="height:70px;width:250px;">
                </div>
            </div>
        </div>

        <table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 width="100%" style='border:none;table-layout:fixed'>
            <tr style='height:0.2in'>
                <td colspan=59 valign=top style='border:none;padding-bottom:5px;height:0.2in'>
                    <p class=MsoNormal style="text-align:right;font-size:18px"><b>PATIENT DIAGNOSIS</b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    
                </td>
                <td colspan=15 style='border-top:solid #BFBFBF 2.9pt;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>PX INDEX NO:&nbsp;&nbsp;</b><u><?= $inpatient['PIN'] ?></u></p>
                </td>
                <td colspan=14 style='border-top:solid #BFBFBF 2.9pt;border-left:
                    none;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>CASE NO:&nbsp;&nbsp;</b><u><?= $inpatient['logbookCN'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    
                </td>
                <td colspan=15 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:solid #BFBFBF 1.0pt;border-right:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>MEMBERSHIP NO:&nbsp;&nbsp;</b><u><?= $inpatient['phiccode'] ?></u></p>
                </td>
                <td colspan=14 style='border-top:none;border-left:
                    none;border-bottom:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>ACCOUNT NO:&nbsp;&nbsp;</b><u><?= $inpatient['caseno'] ?></u></p>
                </td>
            </tr>
<!--ROOM INFO ==================================================================================-->
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
                <td colspan=18 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b><b>ROOM INFO</b></p>
                </td>
                <td colspan=11 style='border-top:none;border-left:
                    none;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>NAME:&nbsp;&nbsp;</b><u><?= $inpatient['name'] ?></u></p>
                </td>
                <td colspan=18 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>TYPE:&nbsp;&nbsp;</b><u><?= $inpatient['roomtype'] ?></u></p>
                </td>
                <td colspan=11 style='border-top:none;border-left:
                    none;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>RATE:&nbsp;&nbsp;</b><u><?= $inpatient['roomrate'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    
                </td>
                <td colspan=18 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>ROOM:&nbsp;&nbsp;</b><u><?= $inpatient['roominfo'] ?></u></p>
                </td>
                <td colspan=11 style='border-top:none;border-left:
                    none;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>ANCILLARY:&nbsp;&nbsp;</b><u><?= $inpatient['addonserv'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:none;
                    border-top:solid #BFBFBF 2.9pt;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>BIRTHDAY:&nbsp;&nbsp;</b><u><?= $inpatient['bday'] ?></u></p>
                </td>
                <td colspan=14 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    border-top:solid #BFBFBF 2.9pt;border-bottom:none;border-left:none;padding:0px;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>GENDER:&nbsp;&nbsp;</b><u><?= $inpatient['sex'] ?></u></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;
                    border-top:none;border-bottom:none;border-left:none;padding:0px;height:0.2in'>
                </td>
                <td colspan=18 style='border-top:solid #BFBFBF 1.0pt;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>ADMISSION OFFICER:</b>
                </td>
                <td colspan=11 style='border-top:solid #BFBFBF 1.0pt;border-left:
                    none;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:none;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>STATUS:&nbsp;&nbsp;</b><u><?= $inpatient['civilstatus'] ?></u></p>
                </td>
                <td colspan=14 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    border-top:none;border-bottom:none;border-left:none;padding:0px;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>AGE:&nbsp;&nbsp;</b><u><?= $inpatient['Age'] ?></u></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;
                    border-top:none;border-bottom:none;border-left:none;padding:0px;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style="padding-left:10px">* <u><?= $inpatient['nursename'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:none;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>RELIGION:&nbsp;&nbsp;</b><u><?= $inpatient['religion'] ?></u></p>
                </td>
                <td colspan=14 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    border-top:none;border-bottom:none;border-left:none;padding:0px;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>TELEPHONE:&nbsp;&nbsp;</b><u><?= $inpatient['contactno'] ?></u></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;
                    border-top:none;border-bottom:none;border-left:none;padding:0px;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:solid #BFBFBF 1.0pt;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>ADMISSION DOCTOR:</b>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:none;
                    border-top:none;border-bottom:solid #BFBFBF 2.9pt;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>EMAIL:&nbsp;&nbsp;</b><u><?= $inpatient['email'] ?></u></p>
                </td>
                <td colspan=14 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    border-top:none;border-bottom:solid #BFBFBF 2.9pt;border-left:none;padding:0px;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>MOBILE:&nbsp;&nbsp;</b><u><?= $inpatient['mobileno'] ?></u></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;
                    border-top:none;border-bottom:none;border-left:none;padding:0px;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:solid #BFBFBF 2.9pt;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style="padding-left:10px">* <u><?= $inpatient['doctorname'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-left:none;border-right:none;
                    border-top:none;border-bottom:solid #BFBFBF 2.9pt;height:0.1in'>
                </td>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-left:none;border-right:none;
                    border-top:solid #BFBFBF 2.9pt;border-bottom:solid #BFBFBF 2.9pt;height:0.1in'>
                </td>
            </tr>
<!--PHILHEALTH INFO ==================================================================================-->
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>DISPOSITION:&nbsp;&nbsp;</b><u><?= $inpatient['disposition'] ?></u></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>PHILHEALTH INFO</b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>D/T OF DEATH:&nbsp;&nbsp;</b><u><?= $inpatient['roominfo'] ?></u></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>MEMBER:&nbsp;&nbsp;</b><u><?= $inpatient['phicmembrname'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>REASON OF REFERRAL:</b></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>PHIC NO:&nbsp;&nbsp;</b><u><?= $inpatient['phicPIN'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:solid #BFBFBF 1.0pt;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'>&nbsp;&nbsp;&nbsp;&nbsp;<u><?= $inpatient['reasonforreferral'] ?></u></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;
                    border-bottom:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>TYPE:&nbsp;&nbsp;</b><u><?= $inpatient['phicmembr'] ?></u></p>
                </td>
            </tr>
<!--HMO INFO ==================================================================================-->
            <tr style='height:0.2in'>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:solid #BFBFBF 2.9pt;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>ADMISSION:</b></p>
                </td>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    border-top:solid #BFBFBF 2.9pt;border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>DISCHARGED:</b></p>
                </td>
                <td colspan=29 style='border-top:solid #BFBFBF 2.9pt;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>HMO INFO</b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>&nbsp;&nbsp;DATE:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['admitdate'] ?></u></p>
                </td>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    border-top:none;border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>&nbsp;&nbsp;DATE:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['dischadate'] ?></u></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>MEMBER:&nbsp;&nbsp;</b><u><?= $inpatient['roomtype'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:solid #BFBFBF 1.0pt;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>&nbsp;&nbsp;TIME:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['admittime'] ?></u></p>
                </td>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    border-top:none;border-bottom:solid #BFBFBF 1.0pt;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal style='padding-left:0px'><b>&nbsp;&nbsp;TIME:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['dischatime'] ?></u></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>CARD/REF:&nbsp;&nbsp;</b><u><?= $inpatient['roominfo'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>FIRST CASE RATE:</b></p>
                </td>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    border-top:none;border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>SECOND CASE RATE:</b></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:solid #BFBFBF 2.9pt;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal><b>APPROVAL:&nbsp;&nbsp;</b><u><?= $inpatient['roominfo'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:solid #BFBFBF 2.9pt;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<u><?= $inpatient['phiccasefirst'] ?></u></p>
                </td>
                <td colspan=15 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;
                    border-top:none;border-bottom:solid #BFBFBF 2.9pt;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<u><?= $inpatient['phiccasesecond'] ?></u></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>FINAL DIAGNOSIS:</b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>REASON OF ADMISSION:</b></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:solid #BFBFBF 2.9pt;border-left:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.3in'>
                    <textarea style="padding:10px 10px;border:none"><?= $inpatient['Diag_chiefcomplain'] ?></textarea>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:solid #BFBFBF 2.9pt;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.3in'>
                    <textarea placeholder="Type Here.." style="padding:10px 10px;border:none"></textarea>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>ADMITTING DIAGNOSIS:</b></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>SURGICAL PROCEDURE:</b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:solid #BFBFBF 2.9pt;border-left:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.3in'>
                    <textarea placeholder="Type Here.." style="padding:10px 10px;border:none"></textarea>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:solid #BFBFBF 2.9pt;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.3in'>
                    <textarea placeholder="Type Here.." style="padding:10px 10px;border:none"></textarea>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>DIETARY HISTORY:</b></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:none;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>ANESTHESIOLOGIST PROCEDURE:</b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    border-top:none;border-bottom:solid #BFBFBF 2.9pt;border-left:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.3in'>
                    <textarea placeholder="Type Here.." style="padding:10px 10px;border:none"></textarea>
                </td>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 2.9pt;border-bottom:solid #BFBFBF 2.9pt;border-right:solid #BFBFBF 2.9pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.3in'>
                    <textarea placeholder="Type Here.." style="padding:10px 10px;border:none"></textarea>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>ARCHIVED DATE:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['archiveddate'] ?></u></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:none;border-bottom:none;border-right:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>DAYS OF CONFINEMENT:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['daysconfined'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>LAST ADMITTED:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['lastadmitdate'] ?></u></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:none;border-bottom:none;border-right:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>DISCHARGED BY:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['dischaby'] ?></u></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:solid #BFBFBF 2.9pt;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>CLASSIFICATION:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['pat_classification'] ?></u></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:solid #BFBFBF 2.9pt;border-left:solid #BFBFBF 2.9pt;border-bottom:none;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b><u>OTHER PATIENT INFO:</u></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;border-top:none;
                    border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>ADDRESS:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['adrs'].", ".$inpatient['brgy'] ?></u></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;border-bottom:none;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;border-top:none;
                    border-bottom:none;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>CITY/MUN:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['cityadd'] ?></u></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;border-bottom:none;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 2.9pt;border-top:none;
                    border-bottom:solid #BFBFBF 2.9pt;border-left:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>PROVINCE:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['provadd'] ?></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;border-bottom:none;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b><u>CATEGORICAL DIAGNOSIS:</u></b></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;border-bottom:none;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:solid #2f2f2f 1.0pt;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;border-bottom:none;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:solid #2f2f2f 1.0pt;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;border-bottom:none;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:solid #2f2f2f 1.0pt;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;border-bottom:none;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:solid #2f2f2f 1.0pt;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;border-bottom:none;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
                <td colspan=1 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    
                </td>
                <td colspan=29 style='border-top:none;border-left:solid #BFBFBF 2.9pt;border-bottom:solid #BFBFBF 2.9pt;
                    border-right:solid #BFBFBF 2.9pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b></b></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=30 style='border:solid #BFBFBF 1.0pt;border-right:none;border-top:none;
                    border-bottom:none;border-left:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>RECORDED BY:</b>&nbsp;&nbsp;&nbsp;<u><?= $inpatient['recby'] ?></u></p>
                </td>
                <td colspan=29 style='border-top:none;border-left:none;border-bottom:none;
                    border-right:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p style="font-size:9.0pt" class=MsoNormal><b>RUN DATE/TIME:</b>&nbsp;&nbsp;&nbsp;<u><?= $datenow ?></u></p>
                </td>
            </tr>  
        </table>
    </div>

</body>

</html>
