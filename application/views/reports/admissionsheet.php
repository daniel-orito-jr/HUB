<html>

<head>
    <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
    <meta name=Generator content="Microsoft Word 15 (filtered)">
    <title> <?= $title ?> </title>
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
                {size:8.5in 11.0in;
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
        <h2><?= $hosp_name['compname'] ?></h2>
        <h1><?= $title ?></h1>

        <table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 width="100%" style='border-collapse:collapse;border:none'>
            <tr style='height:0.2in'>
                <td colspan=59 valign=top style='border:none;border-bottom:
                    solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=48 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Date:&nbsp;&nbsp;&nbsp;&nbsp;<?php $da = new DateTime($datenow); echo date_format($da,'F j, Y'); ?></p>
                </td>
                <td colspan=7 style='border-top:none;border-left:
                    none;border-bottom:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Case Number:&nbsp;&nbsp;<?= $inpatient['caseno'] ?></p>
                </td>
                <td colspan=4 style='border-top:none;border-left:
                    none;border-bottom:solid #BFBFBF 1.0pt;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Px Index No:&nbsp;&nbsp;<?= $inpatient['PIN'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=59 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;background:#F2F2F2;padding:.7pt 4.3pt .7pt 4.3pt;height:0.3in'>
                    <h2>GENERAL INFORMATION</h2>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=11 style='border:none;border-left:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Last Name:</p>
                </td>
                <td colspan=23 style='border:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>First Name:</p>
                </td>
                <td colspan=6 style='border:none;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Suffix:</p>
                </td>
                <td colspan=11 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Middle Name:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Gender</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Birthday</p>
                </td>
                <td colspan=2 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Age</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=11 style='border:none;border-left:solid #BFBFBF 1.0pt;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <b><p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['lname'] ?></p></b>
                </td>
                <td colspan=23 style='border:none;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <b><p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['fname'] ?></p></b>
                </td>
                <td colspan=6 style='border:none;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <b><p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['suffix'] ?></p></b>
                </td>
                <td colspan=11 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <b><p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['mname'] ?></p></b>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <b><p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['sex'] ?></p></b>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <b><p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['bday'] ?></p></b>
                </td>
                <td colspan=2 style='border:none;border-right:solid #BFBFBF 1.0pt;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <b><p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['Age'] ?></p></b>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=9 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Nationality:</p>
                </td>
                <td colspan=24 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Religion:</p>
                </td>
                <td colspan=15 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Civil Status:</p>
                </td>
                <td colspan=5 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Mobile Number:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Telephone No:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Passport No:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=9 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['nationality'] ?></p>
                </td>
                <td colspan=24 style='border:none;border-right:solid #BFBFBF 1.0pt;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['religion'] ?></p>
                </td>
                <td colspan=15 style='border:none;border-right:solid #BFBFBF 1.0pt;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['civilstatus'] ?></p>
                </td>
                <td colspan=5 style='border:none;border-right:solid #BFBFBF 1.0pt;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['mobileno'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['contactno'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;border-bottom:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['passportno'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Address:</p>
                </td>
                <td colspan=20 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>City/Municipality:</p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Province:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Zip Code:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['adrs'].", ".$inpatient['brgy'] ?></p>
                </td>
                <td colspan=20 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['cityadd'] ?></p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['provadd'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['zipcode'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Mother's Name:</p>
                </td>
                <td colspan=17 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Mother's Nationality:</p>
                </td>
                <td colspan=13 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Mother's Address:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['mother'] ?></p>
                </td>
                <td colspan=17 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['mothernationality'] ?></p>
                </td>
                <td colspan=13 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['motheradrs'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Father's Name:</p>
                </td>
                <td colspan=17 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Father's Nationality:</p>
                </td>
                <td colspan=13 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Father's Address:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=29 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['father'] ?></p>
                </td>
                <td colspan=17 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['fathernationality'] ?></p>
                </td>
                <td colspan=13 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['fatheradrs'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=59 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;background:#F2F2F2;padding:.7pt 4.3pt .7pt 4.3pt;height:0.3in'>
                    <h2>ADMISSION INFORMATION</h2>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=13 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Health Record No:</p>
                </td>
                <td colspan=17 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Patient Type:</p>
                </td>
                <td colspan=12 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Entry Type:</p>
                </td>
                <td colspan=11 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Case No (For Logbook):</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Link Account:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Value Card:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=13 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['HRnCODE'] ?></p>
                </td>
                <td colspan=17 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['pxtype'] ?></p>
                </td>
                <td colspan=12 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['casetype'] ?></p>
                </td>
                <td colspan=11 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['logbookCN'];?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['memberrefno'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=39 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Guardian/Watcher/Kin during admittance:</p>
                </td>
                <td colspan=11 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Guardian CP Number:</p>
                </td>
                <td colspan=5 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Relationship to Patient:</p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Patient CP Recipient:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=39 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['guarantor'] ?></p>
                </td>
                <td colspan=11 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['guarantor_mobileno'] ?></p>
                </td>
                <td colspan=5 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['guarantor_rltn'];?></p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['mobileno'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Date of Admission:</p>
                </td>
                <td colspan=24 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Time of Admission:</p>
                </td>
                <td colspan=11 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Station Name:</p>
                </td>
                <td colspan=5 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Admission Type:</p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Weight Upon Admission:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=15 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['lastadmitdate'] ?></p>
                </td>
                <td colspan=24 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= date( 'g:i A', strtotime( $inpatient['lastadmittime'] ) ) ?></p>
                </td>
                <td colspan=11 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['nursestation'] ?></p>
                </td>
                <?php
                    if($inpatient['admittype'] == "CC")
                    {
                        $admittypeval = "CHARITY CASE-CC";
                    }
                    else if($inpatient['admittype'] == "HC")
                    {
                        $admittypeval = "HOUSE CASE-HC";
                    }
                    else if($inpatient['admittype'] == "HC")
                    {
                        $admittypeval = "WAYWARD CASE-WC";
                    }
                    else
                    {
                        $admittypeval = "PRIVATE CASE-PC";
                    }
                ?>
                <td colspan=5 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $admittypeval ?></p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['Weight']." Kilos" ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=45 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Attending Doctor:</p>
                </td>
                <td colspan=14 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Attending Clerk/Officer/Nurse:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=45 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['doctorname']." - ".$inpatient['doctorid'] ?></p>
                </td>
                <td colspan=14 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['nursename']." - ".$inpatient['nurseid'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=45 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Room Info:</p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Ancillary Rate:</p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Room Rate:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Room Credit:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=45 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['roomno']." - ".$inpatient['roominfo'] ?></p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['addonserv'] ?></p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['roomrate'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['creditmax'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=45 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Nurse In-Charge:</p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Admission Case:</p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Cautions:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>TB-Dots Status:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=45 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['NurseIncharge'] ?></p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['admissionsource'] ?></p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['cautions'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['TBstatus'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=59 style='border:solid #BFBFBF 1.0pt;
                    border-top:none;background:#F2F2F2;padding:.7pt 4.3pt .7pt 4.3pt;height:0.3in'>
                    <h2>INSURANCE/ OTHERS</h2>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=23 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Philhealth Membership:</p>
                </td>
                <td colspan=22 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Member Name:</p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>PHIC No.:</p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Relation to Member:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>MDR Ref. No:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=23 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['phicmembr'].":".$inpatient['phiccode'] ?></p>
                </td>
                <td colspan=22 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['phicmembrname'] ?></p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['relationtomember'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['ReqPHICmdrweb'] ?></p>
                </td>
            </tr>
            
            <tr style='height:0.2in'>
                <td colspan=23 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Patient Classification:</p>
                </td>
                <td colspan=22 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>OB-G Procedure:</p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Pathologic Case:</p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Adult/ Pedia:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Others:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <?php
                    if($inpatient['pat_classification'] == "GYNECOLOGY-PATHOLOGY")
                    {
                        $pathologyval = "YES";
                    }
                    else if($inpatient['pat_classification'] == "SURGICAL-PATHOLOGY")
                    {
                        $pathologyval = "YES";
                    }
                    else if($inpatient['pat_classification'] == "OBSTETRICS-PATHOLOGY")
                    {
                        $pathologyval = "YES";
                    }
                    else
                    {
                        $pathologyval = "";
                    }
                ?>
                <td colspan=23 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['pat_classification'] ?></p>
                </td>
                <td colspan=22 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['OBprocedure'] ?></p>
                </td>
                <td colspan=7 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $pathologyval ?></p>
                </td>
                <td colspan=4 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['pat_classub'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=47 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Referred By:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Gravida:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Para:</p>
                </td>
                <td colspan=2 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Abortion:</p>
                </td>
                <td colspan=2 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>IUFD:</p>
                </td>
                <td colspan=2 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>DIED:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=47 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['ReferredFromHCI'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
                <td colspan=2 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
                <td colspan=2 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
                <td colspan=2 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=47 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Spouse Name:</p>
                </td>
                <td colspan=6 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Spouse Birthday:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Credit Max Limit:</p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>Package Code:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=47 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['spouse'] ?></p>
                </td>
                <td colspan=6 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['spousebday'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['creditmax'] ?></p>
                </td>
                <td colspan=3 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;<?= $inpatient['packageCODE'] ?></p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=47 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>HMO:</p>
                </td>
                <td colspan=12 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>VIP:</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=47 style='border-top:none;border-left:
                    solid #BFBFBF 1.0pt;border-bottom:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
                <td colspan=12 style='border:none;border-right:solid #BFBFBF 1.0pt;
                    border-bottom:solid #BFBFBF 1.0pt;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=MsoNormal>&nbsp;&nbsp;</p>
                </td>
            </tr>
            <tr style='height:0.2in'>
                <td colspan=59 valign=top style='border:none;padding:.7pt 4.3pt .7pt 4.3pt;height:0.2in'>
                    <p class=Centered>(This is an electronic printout.)</p>
                </td>
            </tr>
        </table>

        <p class=MsoNormal>&nbsp;</p>

    </div>

</body>

</html>
