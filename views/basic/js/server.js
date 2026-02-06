updateBalance();
function updateBalance(){
  $.ajax({ 
       url:siteUrl+"/data/server?action=balance",
       method:"POST",
       dataType: 'JSON',
       data:{tm:Intl.DateTimeFormat().resolvedOptions().timeZone},
       success:function(result){ 
            if(result.status==200)
            {
              $("#balance").html(accountHTML(result.data));
            }
       }
   });
}

function accountHTML(json){
    var contents = '<button class="my-btn bg-secondary py-2 ps-3 pe-0 shadow-sm rounded">'+json.balance;
    contents += '<a class="submit ms-2 rounded" href="'+json.url+'"><i class="fa-regular fa-plus"></i></a></button>';
    for(x in json.accounts){
      var item  = json.accounts[x];
      contents += '<div class="dropdown-content">';
      contents += '<button class="my-btn w-100" id="'+item.id+'">'+item.currency+' <span class="float-end">'+item.balance+'</span></button>';
      contents += '</div>';
    }
   return contents;
}

$(document).on('click', '.dropdown-content button', function(event){
     event.preventDefault();
     id  = $(this).attr('id');
     $.ajax({ 
       url:siteUrl+"/data/server?action=balanceActive",
       method:"POST",
       dataType: 'JSON',
       data:{id:id},
       success:function(data){ 
          updateBalance();
       }
   });
});

function changeLanguage(lang){
   $.ajax({ 
       url:siteUrl+"/data/server?action=language",
       method:"POST",
       dataType: 'JSON',
       data:{lang:lang},
       success:function(data){ location.reload(); }
   });
}