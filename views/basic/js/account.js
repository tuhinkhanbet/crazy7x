$('#loginModal').on('shown.bs.modal', function(){ $('#registerModal').hide(); $('#resetModal').hide(); });
$('#registerModal').on('shown.bs.modal', function(){ $('#loginModal').hide(); $('#resetModal').hide(); });
$('#resetModal').on('shown.bs.modal', function(){ $('#registerModal').hide(); $('#loginModal').hide(); });

$(document).ready(function(e){

    $("#register").on('submit', function(e){
          e.preventDefault();
          
          // MOCK BACKEND SIMULATION
          // Simulate successful registration
          setTimeout(function() {
              var mockResult = {
                  status: 100,
                  data: {
                      text: 'Registration Successful!',
                      user_id: '1859302',
                      password: 'demo' + Math.floor(Math.random() * 1000),
                      balance: 100
                  }
              };
              
              // Determine if we should treat this as a success (100 = success with credentials display)
              if(mockResult.status == 100) {
                  // Save login state
                  localStorage.setItem('isLoggedIn', 'true');
                  localStorage.setItem('userId', mockResult.data.user_id);
                  localStorage.setItem('balance', mockResult.data.balance);
                  
                  var html = '<div class="overlay" id="overlay" style="display:block;">';
                   html += '<div class="popUp-size bg-white p-3 text-black rounded"><center><h5>'+mockResult.data.text+'</h5><br>';
                   html += 'User Id: '+mockResult.data.user_id+'<br>';
                   html += 'Password: '+mockResult.data.password+'<br><br>';
                   html += '<input type="text" class="d-none" value="User Id: '+mockResult.data.user_id+' <=='+siteUrl+'==> Password: '+mockResult.data.password+'" id="copyUserData" readonly>';
                   html += '<button class="submit py-1 px-3" onClick="removeAlert(\'overlay\','+mockResult.status+'); copyUserData();"><b>Copy & Close</b></button></center>';
                   html += '</div></div>';
                   $("#reg-success").html(html);
              }
          }, 500);
          
          /* Original AJAX disabled for simulation
          $.ajax({
              type: 'POST',
              url: siteUrl+'/data/account?action=register',
              // ... ok to keep rest but we want to bypass it
          });
          */
    });

    $("#login").on('submit', function(e){
        e.preventDefault();
        
        // MOCK BACKEND SIMULATION
        setTimeout(function() {
             localStorage.setItem('isLoggedIn', 'true');
             localStorage.setItem('userId', '1859302'); // Default demo ID
             localStorage.setItem('balance', '100');
             window.location.reload();
        }, 500);

        /*
        $.ajax({
            type: 'POST',
            url: siteUrl+'/data/account?action=login',

            data: new FormData(this),
            contentType: false,
            dataType: 'JSON',
            cache: false,
            processData:false,
            success: function(result){
                if(result.status==200){
                   window.location.reload();
                }else{
                    $("#log-border"+result.status).css("border","red solid 1px");
                    $("#log-error"+result.status).html(result.data);
                }
            }
        });
        */
    });

    $("#reset").on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: siteUrl+'/data/account?action=reset',
            data: new FormData(this),
            contentType: false,
            dataType: 'JSON',
            cache: false,
            processData:false,
            success: function(result){
                if(result.status==200){
                    $("#reset-success").html(result.data);
                    $("#btn-ps").css('pointer-events', 'none');
                    $("#btn-ps").val('Click Log In Button');
                }else{
                    $("#reset-border"+result.status).css("border","red solid 1px");
                    $("#reset-error"+result.status).html(result.data);
                }
            }
        });
    });


    $("#btnVerified").on('submit', function(e){
           e.preventDefault();
           $.ajax({
            type: 'POST',
            url: siteUrl+'/player/data/account?action=verified',
            data: new FormData(this),
            contentType: false,
            dataType: 'JSON',
            cache: false,
            processData:false,
            success: function(result){
                if(result.status==200){
                    window.location.reload();
                }else{
                    $("#verify-error"+result.status).html(result.data);
                    $("#verify-border"+result.status).css("border","red solid 1px");
                }
            }
        });
    });
});



function sendVerifyCode(){
    $.ajax({ 
       url: siteUrl+'/player/data/account?action=sent2fa',
       method:"POST",
       dataType: 'JSON',
       data:{},
       success:function(result){
            if(result.status==200){
               $("#verify-success").html(result.data);
            }else{
               $("#verify-error"+result.status).html(result.data);
            }
       }
    });
}



function registerForm(val){
    if (val=="oneclick") { 
        var endpoint = 'user-oneclick-signup';
    }else if (val=="phone"){
       var endpoint = 'user-phone-signup';
    }else{
        var endpoint = 'user-email-signup';
    }
    $("#register-form").load(siteUrl+'views/'+viewDir+'/form/'+endpoint);
}

$(document).on('click', '.registerForm a', function(event){
    event.preventDefault();
    var val = $(this).data("register");
    registerForm(val);
    $('.registerForm a').removeClass('active');
    $(this).addClass('active');
});


function loginForm(val){
    if (val=="uid"){
       var endpoint = 'user-id-login';
    }else if (val=="phone"){
       var endpoint = 'user-phone-login';
    }else{
       var endpoint = 'user-email-login';
    }
    $("#login-form").load(siteUrl+'views/'+viewDir+'/form/'+endpoint);
}

$(document).on('click', '.loginForm a', function(event){
    event.preventDefault();
    var val = $(this).data("login");
    loginForm(val);
    $('.loginForm a').removeClass('active');
    $(this).addClass('active');
});


function resetForm(val){
    if (val=="phone"){
       var endpoint = 'user-phone-reset';
    }else{
      var endpoint = 'user-email-reset';
    }
    $("#reset-form").load(siteUrl+'views/'+viewDir+'/form/'+endpoint);
}

$(document).on('click', '.resetForm a', function(event){
    event.preventDefault();
    var val = $(this).data("reset");
    resetForm(val);
    $('.resetForm a').removeClass('active');
    $(this).addClass('active');
});


function copyUserData() {
  var copyText = document.getElementById("copyUserData");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  alert(copyText.value+" Copied");
}