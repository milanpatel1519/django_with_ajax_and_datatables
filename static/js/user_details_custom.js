$(document).ready(function() {
    $('#id_gender').removeClass('form-control')
    $('#id_gender').css({'list-style': 'none'});

    // show radio button in one line
    var male_radio = $('input[name="gender"]')[0];
    $(male_radio).parent().parent().css({'float': 'left', 'margin': '0px 22px 0 -40px'});

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    $('#profile_details_table').DataTable({
        "order": [[ 3, "desc" ]]
    });

    $("button.user-submit-btn").click(function(e){
        if ($(".user-submit-btn").data("attr") == "submit_form"){
            $.ajax({
                url: "/crud_demo/submit/user/details",
                type: "POST",
                data: $(this).closest('form').serialize(),
                success: function(response){
                    if (response['status']=='success'){
                        var response_data = JSON.parse(response["response"]);
                        var value_dict = [];
                        var data_table = $('#profile_details_table').DataTable();

                        value_dict.push(response_data['name']);
                        value_dict.push(response_data['email']);
                        value_dict.push(response_data['mobile']);
                        value_dict.push(response_data['address']);
                        value_dict.push(response_data['gender']);
                        value_dict.push(response_data['date_of_birth']);
                        value_dict.push(response_data['blood_group']);

                        var record_id = response_data['id'];

                        // Add Edit button
                        var edit_btn = "<button type='button' class='btn btn-primary edit_btn' id='edit_record_"+ record_id+"'><i class='fa fa-edit'></i>&nbsp; Edit </button>"
                        value_dict.push(edit_btn);

                        // Add Delete button
                        var delete_btn = "<button type='button' class='btn btn-danger del_btn' id='delete_record_"+record_id+"'> <i class='fa fa-trash' aria-hidden='true'></i>&nbsp; Delete </button>"
                        value_dict.push(delete_btn);

                        var new_row = data_table.row.add(value_dict).node()
                        var new_row_id = 'row_id_'+String(response_data.id)

                        $(new_row).attr("id", new_row_id);
                        data_table.draw();

                        $("#user_detail_form")[0].reset();
                        window.alert('Row Added Successfully...');
                        var form_input = $("form#user_detail_form :input");
                        for(var i=0; i<form_input.length; i++){
                            var input_field = form_input[i];
                            if ( $(input_field).attr('name') != 'csrfmiddlewaretoken' ){
                                $(input_field).css({'border-color': '#ccc'});
                                $(input_field).next().text('').css({'color': '#ccc'});
                            }
                        }
                    } else {
                        var form_input = $("form#user_detail_form :input");

                        for(var i=0; i<form_input.length; i++){
                            var input_field = form_input[i];
                            if ( $(input_field).attr('name') != 'csrfmiddlewaretoken' ){
                                $(input_field).css({'border-color': '#ccc'});
                                $(input_field).next().text('').css({'color': '#ccc'});
                            }
                        }

                        window.alert('Please fill the form properly...');
                        var required_fields = [];
                        for(var i=0; i<form_input.length; i++){
                            if (JSON.parse(response['response'])[form_input[i].name]){
                                required_fields.push(i);
                            }
                        }

                        for(var j=0; j<required_fields.length; j++){
                            var input_field = form_input[required_fields[j]];
                            var error_msg = JSON.parse(response['response'])[input_field.name];
                            $(input_field).css({'border-color': 'red'});
                            $(input_field).next().text(error_msg).css({'color': 'red'});
                        }
                    }
                }
            });
        } else if ($(".user-submit-btn").data("attr") == "edit_form"){
            $.ajax({ // create an AJAX call...
                data: $(this).closest('form').serialize(), // get the form data
                type: "POST", // GET or POST
                url: "/crud_demo/edit/details", // the file to call
                success: function(response) { 
                    if (response['status']=='success'){
                        var response_data = JSON.parse(response["response"]);
                        $('#store_record_id').val()
                        var update_row = $('#row_id_'+String(response_data['id']));
                        var rows = $('#profile_details_table').find('tr')
                        var row_number = 0;
                        for (var i=0; i<rows.length; i++){
                            if(rows[i].id == update_row.attr('id')){
                                row_number = i;
                                break;
                            }
                        }

                        // add row's data into list
                        var newData = [];
                        newData.push(response_data['name']);
                        newData.push(response_data['email']);
                        newData.push(response_data['mobile']);
                        newData.push(response_data['address']);
                        newData.push(response_data['gender']);
                        newData.push(response_data['date_of_birth']);
                        newData.push(response_data['blood_group']);
                        var record_id = response_data['id'];

                        // Add Edit button
                        var edit_btn = "<button type='button' class='btn btn-primary edit_btn' id='edit_record_"+ record_id+"'><i class='fa fa-edit'></i>&nbsp; Edit </button>"
                        newData.push(edit_btn);
                        // Add Delete button
                        var delete_btn = "<button type='button' class='btn btn-danger del_btn' id='delete_record_"+record_id+"'> <i class='fa fa-trash' aria-hidden='true'></i>&nbsp; Delete </button>"
                        newData.push(delete_btn);

                        var table = $('#profile_details_table').DataTable();
                        table.row(update_row).data( newData )
                        table.draw();

                        $("#user_detail_form")[0].reset();
                        window.alert('Row Updated Successfully...');
                        var form_input = $("form#user_detail_form :input");
                        for(var i=0; i<form_input.length; i++){
                            var input_field = form_input[i];
                            if ( $(input_field).attr('name') != 'csrfmiddlewaretoken' ){
                                $(input_field).css({'border-color': '#ccc'});
                                $(input_field).next().text('').css({'color': '#ccc'});
                            }
                        }

                        $(".user-submit-btn").html("Submit");
                        $(".user-submit-btn").data("attr", "submit_form");
                    } else {
                        var form_input = $("form#user_detail_form :input");
                        for(var i=0; i<form_input.length; i++){
                            var input_field = form_input[i];
                            if ( $(input_field).attr('name') != 'csrfmiddlewaretoken' ){
                                $(input_field).css({'border-color': '#ccc'});
                                $(input_field).next().text('').css({'color': '#ccc'});
                            }
                        }

                        window.alert('Please fill the form properly...');
                        var required_fields = [];
                        for(var i=0; i<form_input.length; i++){
                            if (JSON.parse(response['response'])[form_input[i].name]){
                                required_fields.push(i);
                            }
                        }

                        for(var j=0; j<required_fields.length; j++){
                            var input_field = form_input[required_fields[j]];
                            var error_msg = JSON.parse(response['response'])[input_field.name];
                            $(input_field).css({'border-color': 'red'});
                            $(input_field).next().text(error_msg).css({'color': 'red'});
                        }
                    }
                }
            });
        }
    });

    // Edit button
    $(document.body).on('click','.edit_btn', function(e){
        var edit_record_id = parseInt($(this).attr('id').split('edit_record_')[1]);
        $('input[name="store_id"]').val(edit_record_id);
        var table = $('#profile_details_table').DataTable();
        var data = table.row($(this).parent().parent()).data();

        $('input[name="name"]').val(data[0]);
        $('input[name="email"]').val(data[1]);
        $('input[name="mobile"]').val(data[2]);
        $('textarea[name="address"]').val(data[3]);

        var date = new Date(data[5]);
        var full_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
        var male_radio = $('input[name="gender"]')[0];
        var female_radio = $('input[name="gender"]')[1];

        if (data[4] == 'M'){
            male_radio.checked = true;
            female_radio.checked = false;
        } else {
            female_radio.checked = true;
            male_radio.checked = false;
        }

        $('input[name="date_of_birth"]').val(data[5]);
        $('select[name="blood_group"]').val(data[6]);

        $(".user-submit-btn").html("Update");
        $(".user-submit-btn").data("attr", "edit_form");
    })

    // Delete button
    $(document.body).on('click','.del_btn', function(e){
        var curr_record_id = parseInt($(this).attr('id').split('delete_record_')[1]);
        if (confirm('Are you sure you want to delete this record?')) {
            $.ajax({
                "type": "DELETE",
                "dataType": "json",
                "url": "/crud_demo/delete/details",
                "data": {'delete_record_id': curr_record_id},
                "beforeSend": function(xhr, settings) {
                    console.log("Before Send");
                    $.ajaxSettings.beforeSend(xhr, settings);
                },
                "success": function(result) {
                    if (result['status'] == 'success'){
                        var del_row = document.getElementById("row_id_"+ result['row_id']);
                        var del_row_table = $('#profile_details_table').DataTable();
                        del_row_table.row($(del_row)).remove().draw();
                    }else if(result['status'] == 'not_found'){
                    }else if(result['status'] == 'fail'){
                    }
                }
            })
        }
        return false;
    })
});
