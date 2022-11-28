function getInPatientDataForPatientProfile()
{
    $.ajax
    ({
        type: 'POST',
        url: BASE_URL + "Admission/getPatientlistDataForUpdatePatient",
        data: {iden: id},
        dataType: 'json'
    })

    .done(function (data)
    {
        console.log(data);

        if (data.status)
        {
            $("#inputid_hiddenIDedt").val(data.edtid['id']);
            $('#inputid_tinnumedt').val(data.edtin['tin']);
            $('#inputid_slcodeedt').val(data.edslaccount['SLaccount']);
            $('#inputid_pxindexedt').val(data.edpin['PIN']);
            $('#inputid_phmemberedt').val(data.edphicmembrname['phicmembrname']);
            $('#inputid_phidnumbedt').val(data.edphicno['phicno']);
            $('#inputid_oldrecrdedt').val(data.edlastdischdate['lastdischdate']);
            $('#inputid_fnameedt').val(data.edfname['fname']);
            $('#inputid_lnameedt').val(data.edlname['lname']);
            $('#inputid_mnameedt').val(data.edmname['mname']);
            $('#inputid_suffixedt').val(data.edsuffix['suffix']);
            $('#inputid_emailaddedt').val(data.edemail['email']);
            $('#inputid_mobileedt').val(data.edmobileno['mobileno']);
            $('#inputid_landlineedt').val(data.edcontactno['contactno']);
            $('#inputid_birthdayedt').val(data.edbday['bday']);
            $('#inputid_passportedt').val(data.edpassportno['passportno']);
            $('#inputid_zipcodexedt').val(data.edzipcode['zipcode']);
            $('#inputid_barangayedt').val(data.edbrgy['brgy']);
            $('#inputid_streetedt').val(data.edadrs['adrs']);
            $('#inputid_mothersnameedt').val(data.edmother['mother']);
            $('#inputid_fathersnameedt').val(data.edfather['father']);
            $('#inputid_mothersadrsedt').val(data.edmotheradrs['motheradrs']);
            $('#inputid_fathersadrsedt').val(data.edfatheradrs['fatheradrs']);
            $('#inputid_spouseedt').val(data.edspouse['spouse']);
            $('#inputid_spousebdayedt').val(data.edspousebday['spousebday']);
            $('#selectid_membershipedt').selectpicker('val', data.edmemberrefno['memberrefno']);
            $('#selectid_civilstatusxedt').selectpicker('val', data.edcivilstatus['civilstatus']);
            $('#selectid_genderoptionedt').selectpicker('val', data.edsex['sex']);
            $('#selectid_religionseleedt').selectpicker('val', data.edreligion['religion']);
            $('#selectid_nationalityxedt').selectpicker('val', data.ednationality['nationality']);
            $('#selectid_provinceedt').selectpicker('val', data.edprovadd['provadd']);
            $('#selectid_citymuniedt').selectpicker('val', data.edcityadd['cityadd']);
            $('#selectid_mothernationedt').selectpicker('val', data.edmothernationality['mothernationality']);
            $('#selectid_fathernationedt').selectpicker('val', data.edfathernationality['fathernationality']);

            var healrecno = $('#inputid_healthrecnohid').val(data.edHRNcode['HRNcode']);
            var hrnnumber = healrecno.val().toString().replace(/\B(?=(?:\d{2})+(?!\d))/g, "-");
            $('#inputid_healthrecnoedt').val(hrnnumber);

            var phmember = $('#selectid_phmembershipedt').selectpicker('val', data.edphicmembr['phicmembr'] + ":" + data.edphiccode['phiccode']);
            $("#inputid_phmemberedt").removeClass("hidden");
            $("#inputid_phidnumbedt").removeClass("hidden");
            $("#spacewhenhidden_phmemberedt").removeClass("padding-bottom-class");
            $("#spacewhenhidden_phidnumbedt").removeClass("padding-bottom-class");

            $('#selectid_phmembershipedt').on('change',function() 
            {
                if (phmember.val() == "- - SELECT FROM LIST - -")
                {
                    $("#inputid_phmemberedt").addClass("hidden");
                    $("#inputid_phidnumbedt").addClass("hidden");
                    $("#spacewhenhidden_phmemberedt").addClass("padding-bottom-class");
                    $("#spacewhenhidden_phidnumbedt").addClass("padding-bottom-class");
                } 
                else
                {
                    if (phmember.val() == data.edphicmembr['phicmembr'] + ":" + data.edphiccode['phiccode'])
                    {
                        $('#inputid_phmemberedt').val(data.phicmembrname['phicmembrname']);
                        $('#inputid_phidnumbedt').val(data.phicno['phicno']);
                    }
                    else
                    {
                        $("#inputid_phmemberedt").val("");
                        $("#inputid_phidnumbedt").val("");
                        $("#inputid_phmemberedt").removeClass("hidden");
                        $("#inputid_phidnumbedt").removeClass("hidden");
                        $("#spacewhenhidden_phmemberedt").removeClass("padding-bottom-class");
                        $("#spacewhenhidden_phidnumbedt").removeClass("padding-bottom-class");
                    }
                }
            });
        }
        else
        {
            console.log('fail');
        }
    });
}