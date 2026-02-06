const $mainMenu = $("#mainMenu");
const $autoNav = $("#autoNav");
const $autoNavMore = $("#autoNavMore");
const $autoNavMoreList = $("#autoNavMoreList");
autoNavMore = () => {
  let childNumber = 2;
  if ($(window).width() >= 320) {
    const $menuWidth = $mainMenu.width();
    const $autoNavWidth = $autoNav.width();
    if ($autoNavWidth > $menuWidth) {
      $autoNav
        .children(`li:nth-last-child(${childNumber})`)
        .prependTo($autoNavMoreList);
        autoNavMore();
    } else {
      const $autoNavMoreFirst = $autoNavMoreList
      .children("li:first-child")
      .width();
      if ($autoNavWidth + $autoNavMoreFirst < $menuWidth) {
        $autoNavMoreList.children("li:first-child").insertBefore($autoNavMore);
      }
    }
    if ($autoNavMoreList.children().length > 0) {
      $autoNavMore.show();
      childNumber = 2;
    } else {
      $autoNavMore.hide();
      childNumber = 1;
    }
  }
};
autoNavMore();
$(window).resize(autoNavMore);


document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});



$(document).ready(function(){

    // LOGGED IN STATE SIMULATION
    if (localStorage.getItem('isLoggedIn') === 'true') {
        var userId = localStorage.getItem('userId') || 'DemoUser';
        
        var userBalance = localStorage.getItem('balance') || '0.00';
        
        // 1. HEADER UPDATE - Match original design
        var loggedInHtml = `
            <div class="d-flex align-items-center">
                <div class="mt-2 me-2" style="cursor:pointer;" onclick="updateBalance();"><i class="fa-regular fa-rotate"></i></div>
                <div class="dropdown" id="balance">
                    <span class="text-white">BDT ${userBalance}</span>
                </div>
                <div class="ms-2">
                    <a class="submit rounded py-1 px-2" href="deposit.html" style="background: var(--success);"><i class="fa-solid fa-plus"></i></a>
                </div>
                <div class="mt-1 ms-3 d-lg-block d-none">
                    <a class="my-btn fs-21" id="topMenu">
                        <i class="fa-regular fa-user-circle fs-21"></i>
                    </a>
                </div>
            </div>
        `;
        $("#auth-section").html(loggedInHtml);

        // 2. SIDEBAR UPDATE - Update the user info in the existing sidebar
        $("#rightMenu .box b").text('user' + userId);
        $("#rightMenu .box").find("div:eq(1)").text('#' + userId);
        
        // Update mobile menu for logged-in state - keep Account button as is
        // The Account button will open the sidebar when clicked
        
    }

    $('.panel-collapse').on('show.bs.collapse', function () {
     $(this).siblings('.panel-heading').addClass('active');
    });

    $('.panel-collapse').on('hide.bs.collapse', function () {
     $(this).siblings('.panel-heading').removeClass('active');
    });
});


function toggleRightMenu() {
    $("#leftMenu").animate({ left: '-310' });
    $("#sideMenu").removeClass("active");
    var rightMenu = $("#rightMenu").css("right");
    if(rightMenu == '0px') {
        $("#rightMenu").animate({ right: '-310' });
    } else {
        $("#rightMenu").animate({ right: '0' });
    }
}

$(document).ready(function () {
    $("#sideMenu").on('click', function () {
       $("#rightMenu").animate({ right: '-310' });
       $("#bottomMenu").removeClass("active");
       $("#sideMenu").toggleClass("active");
        var leftMenu = $("#leftMenu").css("left");
        if(leftMenu == '0px') {
            $("#leftMenu").animate({
                left: '-310'
            });
            } else {
            $("#leftMenu").animate({
                left: '0'
            });
        }
    });
});

$(document).ready(function () {
    $("#topMenu,#bottomMenu").on('click', function () {
         // Check if user is logged in
         if (localStorage.getItem('isLoggedIn') !== 'true') {
             // Not logged in - show login modal
             loginForm('uid');
             $("#loginModal").modal("show");
             return;
         }
         
         // Logged in - toggle right sidebar
         $("#leftMenu").animate({ left: '-310' });
         $("#sideMenu").removeClass("active");
         $("#topMenu,#bottomMenu").toggleClass("active");
         var rightMenu = $("#rightMenu").css("right");
         if(rightMenu == '0px') {
            $("#rightMenu").animate({
                right: '-310'
            });
            } else {
            $("#rightMenu").animate({
                right: '0'
            });
        }
    });
});


$(document).ready(function () {
    $("#menuClose").on('click', function () {
        $("#leftMenu").animate({ left: '-310' });
        $("#rightMenu").animate({ right: '-310' });
    });
});


function dataAlert(id,text,status){
    if(status==200 || status==100){
       var htmlValue = '<div class="text-center"><i class="fa-duotone fa-octagon-check text-success" style="font-size:40px;"></i><br>'+text+'</div>';
    }else{
       var htmlValue = '<div class="text-center"><i class="fa-duotone fa-hexagon-exclamation text-danger" style="font-size:40px;"></i><br>'+text+'</div>';
    }
    document.getElementById(id).innerHTML = '<div class="overlay" id="overlay" style="display:block;"><div class="popUp-size bg-white p-3 text-black rounded">'+htmlValue+'<br><center><button class="submit py-1 px-3" onClick="removeAlert(\'overlay\','+status+');"><b>Okey</b></button></center></div></div>';
}

function removeAlert(id,status){
    if(status==100){
        window.location.reload();
    }else{
       document.getElementById(id).style.display = 'none';
    }
}

function pageLoader(){
  return '<div class="loader-center"><div class="loader"><div></div>';
}


function openPopup(id){
  document.getElementById(id).style.display = 'block';
}

function closePopup(id){
  document.getElementById(id).style.display = 'none';
}

$(function(){
    $('.rightMenu a, .leftMenu a, .m-menu a, .sport-menu a').each(function() {
        if($(this).prop('href') == window.location.href)
        {
          $(this).addClass('active');
        }
    });
});

function logout() { localStorage.removeItem('isLoggedIn'); window.location.reload(); }
function updateBalance() { 
    // Placeholder function - in a real app this would fetch balance from server
    console.log('Updating balance...');
}
$(document).ready(function(){ 
    $(document).on("click", ".game-click-handler", function(e){ 
        e.preventDefault(); 
        if(localStorage.getItem("isLoggedIn")==="true"){ 
            $("#apiModal").modal("show"); 
        } else { 
            loginForm("uid"); 
            $("#loginModal").modal("show"); 
        } 
    }); 
});
