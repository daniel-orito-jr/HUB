  $(document).ready(function() 
  {
    var dt = $('#example').dataTable();
    dt.fnDestroy();
  });

  $(document).ready(function()
  {
    var url = 'http://www.json-generator.com/api/json/get/ccTtqmPbkO?indent=2';
    var table = $('#example').DataTable({
      ajax: url,
      rowReorder: {
        dataSrc: 'order',
      },
      columns: [{
        data: 'order',
        type: 'text'
      }, {
        data: 'place',
        type: 'text',
        edit: true
      }, {
        data: 'name',
        type: 'text',
        edit: true
      }, {
        data: 'delete',
        type: 'text'
      }],
      "initComplete": function(oSettings) 
      {
        $(this).on('click', "i.fa.fa-minus-square", function(e) {
          table.row( $(this).closest('tr') ).remove().draw();
        });
        
        
        $(this).on('click', 'i.fa.fa-pencil-square', function(e)
        {
            var rowData = table.row($(this).closest('tr')).data();
            var columns = table.settings().pop().aoColumns;
            var column = columns[table.column($(this).closest('td')).index()];
            var rowIndex = table.row($(this).closest('tr')).index();
          
            var html = '<form id="form">';
            for(var col in columns)
            {
          	if(columns[col].type === 'text' && columns[col].edit)
                {
                    html += '<input type="text" value="'+rowData[columns[col].data]+'" name="'+columns[col].data+'" placeholder="'+columns[col].data+'"/><br />';
                }
            }
          
          html += '<input type="hidden" name="rowIndex" id="rowIndex" value="'+rowIndex+'" />';
          html += '<input type="submit" id="update"/></form>';
          $('#dialog').html(html);
          $("#dialog" ).modal();
        });
        
      }
    });

    $('body').on('click', '#update', function(e) {
    	e.preventDefault();
    	var data = $('#form').serializeArray();
        var rowIndex = $('#rowIndex').val();
        var rowData = table.row(rowIndex).data();
        var newData = {};
      
        newData['order'] = rowData['order'];
        newData['delete'] = rowData['delete'];
      
        for(var d in data)
        {
            newData[data[d]['name']] = data[d]['value'];
        }
	
        table
            .row(rowIndex)
            .data(newData)
            .draw();
    });
  });
