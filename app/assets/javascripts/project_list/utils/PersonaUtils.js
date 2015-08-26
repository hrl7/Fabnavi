var Persona = {
  signIn : function(){
    Persona.init();
    navigator.id.request();
  },

  signOut : function () {
    Persona.init();

    navigator.id.logout();
  },

  init : function () {
          console.log("Init persona");
    navigator.id.watch({
       onlogin: function(assertion){
          $.ajax({
              type:"POST",
              url:"/users/auth/persona/callback",
              data:{assertion:assertion},
              success: function(res, status, xhr){
                ServerActionCreator.signIn(JSON.parse(res).email);
              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
              }
          });
        },
        onlogout: function(){
          $.ajax({
              type:"DELETE",
              url:"/users/sign_out",
                success: function(res, status, xhr){
                  console.log(res);
                  ServerActionCreator.signOut(res);
              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
              }
          });
        }
    });  
  }, 
  };
