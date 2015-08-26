var Auth = (function(){

    function init(){
      var signIn = document.querySelectorAll('.signIn'),
          signOut = document.getElementById('signOut') || false
      ;

    
    if(signIn) {
      for(elem of signIn){
        elem.onclick = function(){
          registerPersonaCallbacks();
          navigator.id.request();
        }  
      }
    }
    if(signOut)signOut.onclick = function(){
      registerPersonaCallbacks();
      navigator.id.logout();
    }
  }

  function registerPersonaCallbacks (){
    navigator.id.watch({
        loggedInEmail:CURRENT_USER.email,
        onlogin: function(assertion){
          $.ajax({
              type:"POST",
              url:"/users/auth/persona/callback",
              data:{assertion:assertion},
              success: function(res, status, xhr){
                window.location = res;
              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
              }
          });
        },
        onlogout: function(){
          alert("user logout");
          $.ajax({
              type:"DELETE",
              url:"/users/sign_out",
              success: function(res, status, xhr){
                if(CURRENT_USER.email != null)
                window.location.reload();

              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
              }
          });
        }
    });
  }

  return{
    init:init
  };
}
)();
