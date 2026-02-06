loadGames(pid);
function loadGames(pid){
   $('.data').html('<h6 class="my-5 text-center">Loading...</h6>');
   $.ajax({ 
       url: siteUrl+"/data/games",
       method:"POST",
       dataType: 'json',
       data:{provider:pid,game:gid,action:'data'},
       success:function(result){
            if(result.status==200){
              $("#data").html(gamesHTML(result.data));
            }else{
              $("#data").html('<h5 class="my-5 text-center">'+result.data+'</div>');
           }
       }
   });
}
function getGame(id){ loadGames(id); }


function searchGames(q){
   $('.sdata').html('<h6 class="my-5 text-center">Loading...</h6>');
   var q = $('#q').val();
   $.ajax({ 
       url: siteUrl+"/data/games",
       method:"POST",
       dataType: 'json',
       data:{q:q,game:gid,action:'sdata'},
       success:function(result){
         if(result.status==200){
              $("#sdata").html(gamesHTML(result.data));
            }else{
              $("#sdata").html('<h5 class="my-5 text-center">'+result.data+'</div>');
           }
       }
   });
}

 function gamesHTML(json){
    var contents = '';
    for(x in json){
      var item  = json[x];
      if (item.type==1){
         contents += '<h1 class="color-primary px-3 mt-1 fs-20"><b>'+item.name+'</b></h1>';
         contents += '<div class="scroll-w scroll-bar-0 w-100" style="max-width:100%;"><div class="d-flex">';
         var classValue = "item";
         var classWitdh = "";
       }else if (item.type==2){
         contents += '<h1 class="color-primary px-3 mt-1 fs-20"><b>'+item.name+'</b></h1><div class="row g-0">';
         var classValue = "col-lg-2 col-md-3 col-sm-4 col-6 p-1 mb-1";
         var classWitdh = " w-100";
       }else{
         contents += '<h1 class="color-primary px-3 mt-1 fs-20"><b>'+item.name+'</b></h1><div class="row g-0">';
         var classValue = "col-lg-3 col-md-4 col-6 p-1 mb-1";
         var classWitdh = " w-100";
       }
        for(i in item.games){
            var game  = item.games[i];
            if (game.auth=="" || game.auth<1) {
                contents += '<div class="'+classValue+'">';
                contents += '<div class="position-relative m-1 border shadow-sm bg-secondary rounded">';
                contents += '<a class="btn btn-sm p-0  w-100 d-block" data-bs-toggle="modal" data-bs-target="#loginModal" onclick="loginForm(\'uid\');" title="'+game.name+'">';
                contents += '<img src="'+game.image+'" class="lazy rounded-bottom'+classWitdh+'" height="110" /></a>';
                contents += '<div class="img-over">'+game.name+'</div></div></div>';
            }else{
                contents += '<div class="'+classValue+'">';
                contents += '<div class="position-relative m-1 border shadow-sm bg-secondary rounded">';
                contents += '<a class="btn btn-sm p-0 w-100 d-block" href="'+game.url+'" title="'+game.name+'">';
                contents += '<img src="'+game.image+'" class="lazy rounded-bottom'+classWitdh+'" height="110" /></a>';
                contents += '<div class="img-over">'+game.name+'</div></div></div>';
            }
           
        }
        contents += '</div></div>';
    }
    return contents;
}