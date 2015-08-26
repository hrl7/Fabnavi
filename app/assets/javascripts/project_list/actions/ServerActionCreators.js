var ServerActionCreator = {
  signIn: function ( email ) {
    console.log("Server Action Created", email);
    AppDispatcher.dispatch ({
      type : ActionTypes.SIGN_IN_SUCCESS,
      email : email 
    });
  },

  signOut: function ( act ) {
   console.log("Server Action Created", act);
    AppDispatcher.dispatch ({
      type : ActionTypes.SIGN_OUT_SUCCESS
    });
  },
}

