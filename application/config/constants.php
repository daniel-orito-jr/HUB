<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/*
  |--------------------------------------------------------------------------
  | Display Debug backtrace
  |--------------------------------------------------------------------------
  |
  | If set to TRUE, a backtrace will be displayed along with php errors. If
  | error_reporting is disabled, the backtrace will not display, regardless
  | of this setting
  |
 */
defined('SHOW_DEBUG_BACKTRACE') OR define('SHOW_DEBUG_BACKTRACE', TRUE);

/*
  |--------------------------------------------------------------------------
  | File and Directory Modes
  |--------------------------------------------------------------------------
  |
  | These prefs are used when checking and setting modes when working
  | with the file system.  The defaults are fine on servers with proper
  | security, but you may wish (or even need) to change the values in
  | certain environments (Apache running a separate process for each
  | user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
  | always be used to set the mode correctly.
  |
 */
defined('FILE_READ_MODE') OR define('FILE_READ_MODE', 0644);
defined('FILE_WRITE_MODE') OR define('FILE_WRITE_MODE', 0666);
defined('DIR_READ_MODE') OR define('DIR_READ_MODE', 0755);
defined('DIR_WRITE_MODE') OR define('DIR_WRITE_MODE', 0755);

/*
  |--------------------------------------------------------------------------
  | File Stream Modes
  |--------------------------------------------------------------------------
  |
  | These modes are used when working with fopen()/popen()
  |
 */

defined('FOPEN_READ') OR define('FOPEN_READ', 'rb');
defined('FOPEN_READ_WRITE') OR define('FOPEN_READ_WRITE', 'r+b');
defined('FOPEN_WRITE_CREATE_DESTRUCTIVE') OR define('FOPEN_WRITE_CREATE_DESTRUCTIVE', 'wb'); // truncates existing file data, use with care
defined('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE') OR define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE', 'w+b'); // truncates existing file data, use with care
defined('FOPEN_WRITE_CREATE') OR define('FOPEN_WRITE_CREATE', 'ab');
defined('FOPEN_READ_WRITE_CREATE') OR define('FOPEN_READ_WRITE_CREATE', 'a+b');
defined('FOPEN_WRITE_CREATE_STRICT') OR define('FOPEN_WRITE_CREATE_STRICT', 'xb');
defined('FOPEN_READ_WRITE_CREATE_STRICT') OR define('FOPEN_READ_WRITE_CREATE_STRICT', 'x+b');

/*
  |--------------------------------------------------------------------------
  | Exit Status Codes
  |--------------------------------------------------------------------------
  |
  | Used to indicate the conditions under which the script is exit()ing.
  | While there is no universal standard for error codes, there are some
  | broad conventions.  Three such conventions are mentioned below, for
  | those who wish to make use of them.  The CodeIgniter defaults were
  | chosen for the least overlap with these conventions, while still
  | leaving room for others to be defined in future versions and user
  | applications.
  |
  | The three main conventions used for determining exit status codes
  | are as follows:
  |
  |    Standard C/C++ Library (stdlibc):
  |       http://www.gnu.org/software/libc/manual/html_node/Exit-Status.html
  |       (This link also contains other GNU-specific conventions)
  |    BSD sysexits.h:
  |       http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits
  |    Bash scripting:
  |       http://tldp.org/LDP/abs/html/exitcodes.html
  |
 */
defined('EXIT_SUCCESS') OR define('EXIT_SUCCESS', 0); // no errors
defined('EXIT_ERROR') OR define('EXIT_ERROR', 1); // generic error
defined('EXIT_CONFIG') OR define('EXIT_CONFIG', 3); // configuration error
defined('EXIT_UNKNOWN_FILE') OR define('EXIT_UNKNOWN_FILE', 4); // file not found
defined('EXIT_UNKNOWN_CLASS') OR define('EXIT_UNKNOWN_CLASS', 5); // unknown class
defined('EXIT_UNKNOWN_METHOD') OR define('EXIT_UNKNOWN_METHOD', 6); // unknown class member
defined('EXIT_USER_INPUT') OR define('EXIT_USER_INPUT', 7); // invalid user input
defined('EXIT_DATABASE') OR define('EXIT_DATABASE', 8); // database error
defined('EXIT__AUTO_MIN') OR define('EXIT__AUTO_MIN', 9); // lowest automatically-assigned error code
defined('EXIT__AUTO_MAX') OR define('EXIT__AUTO_MAX', 125); // highest automatically-assigned error code

//---java bridge integration
//define('JAVA_INC_URL','http://localhost:8080/JavaBridge/java/Java.inc');

//---db tables
define('usersrights_tbl', 'usersrights');
define('userstbl_vw', 'userstbl');
define('inpatient_tbl', 'inpatient');
define('expenses_tbl', 'expenses');
define('docview_tbl', 'docview');
define('proofsheetdetails_tbl', 'proofsheetdetails');
define('profile_tbl', 'profile');
define('exptemp_tbl', 'exptemp');
define('prequests_tbl', 'prequests');
define('pomaster_tbl', 'pomaster');
define('ticketsumfinal_tbl', 'ticketsumfinal');
define('dv', 'dv');
define('patientphic_vw', 'vw_patientphic');
define('viewmyticket_view', 'viewmyticket');
define('phicmasterlist_tbl', 'phicmasterlist');
define('weblog_tbl', 'weblog');
define('inventorytable_vw', 'inventorytable');
define('servicing_tbl', 'servicing');
define('dailytransaction_tbl', 'dailytransaction');
define('servicereq_vw', 'servicereq');
define('causesofconfinement_tbl', 'causesofconfinement');
define('confinementcauses_vw', 'confinementcauses');
define('causeofconfinement_vw', 'causeofconfinement');
define('confinementcauses_tbl', 'confinementcauses');
define('causeofsurg_tbl', 'causeofsurg');
define('surgicalvw', 'mandasurgical_vw');
define('mandatory_obprocedure_vw', 'mandatory_obprocedure');
define('indicationcauses_tbl', 'indicationcauses');
define('mandaobstetric_tbl', 'mandaobstetric');
define('manda_mortality_vw', 'manda_mortality');
define('ledgersales_tbl', 'ledgersales');
define('mandatotalsurgical_tbl', 'mandatotalsurgical');
define('diagnosisfinal_vw', 'vw_diagnosisfinal');
define('diagnosiscateg_tbl', 'diagnosiscateg');
define('finaldiagnosis_tbl', 'finaldiagnosis');
define('confirmationstatus_tbl', 'confirmationstatus');
define('patientphicstat_vw', 'vw_patientphicstat');
define('masterview_vw', 'masterview');
define('inpatient_ipd_vw', 'inpatient_ipd');
define('hmomasterlist_tbl', 'hmomasterlist');
define('hmo_hmomasterlist_vw', 'hmo_hmomasterlist');
define('hmo_tbl', 'hmo');
define('hmo_ipd_vw', 'hmo_ipd');
define('inpatient_ipd_hmo_vw', 'inpatient_ipd_hmo');
define('inpatient_ipd_hmohosp_vw', 'inpatient_ipd_hmohosp');
define('inpatient_ipd_hmopf_vw', 'inpatient_ipd_hmopf');
define('doctors_tbl', 'doctors');
define('nurses_tbl', 'nurses');
define('inventoryend_tbl', 'inventoryend');
define('doctor_inpatient_vw', 'doctor_inpatient');
define('purchaselog_tbl', 'purchaselog');
define('labsales_vw', 'labsales');
define('invtrep_tbl', 'invtrep');
define('inventory_tbl', 'inventory');
define('employeepayslip_vw', 'employeepayslip');
define('purchases_vw', 'vw_purchases');
define('prmaster_tbl', 'prmaster');
define('prapprovers_tbl', 'prapprovers');
define('tb_text_tbl', 'tb_text');
define('textdata_tbl', 'textdata');
define('purapproved_vw', 'purapproved_vw');
define('purdeferred_vw', 'purdeferred_vw');
define('purdisapproved_vw', 'purdisapproved_vw');
define('eclaims_tbl', 'eclaims');
define('acctlogs_tbl', 'acctlogs');
define('patientlist_tbl', 'patientlist');
define('nationalitylist_tbl', 'nationalitylist');
define('provincelist_tbl', 'provincelist');
define('citymunlist_tbl', 'citymunlist');
define('phictype_tbl', 'phictype');
define('memberlisting_tbl', 'memberlisting');
define('setting_tbl', 'setting');
define('rmlist_tbl', 'rmlist');
define('hcilisting_tbl', 'hcilisting');
define('slaccount_tbl', 'slaccount');
define('tabverification_tbl', 'tabverification');
define('pxlist_vw', 'pxlist');
define('inpatient_sub_tbl', 'inpatient_sub');
define('dietpatientlog_tbl', 'dietpatientlog');
//define('lib_province_tbl', 'lib_province');
//define('lib_municipality_tbl', 'lib_municipality');
define('lugar_barangay_tbl', 'lugar_barangay');
define('lugar_hci_class_tbl', 'lugar_hci_class');
define('lugar_municipality_tbl', 'lugar_municipality');
define('lugar_province_tbl', 'lugar_province');
define('lugar_region_tbl', 'lugar_region');
define('lugar_zipcode_tbl', 'lugar_zipcode');
define('doctorsofpatients_tbl', 'doctorsofpatients');
define('cf4drug_tbl', 'cf4drug');
define('cf4docact_tbl','cf4docact');
define('ledger_resultlist_vw','ledger_resultlist');





