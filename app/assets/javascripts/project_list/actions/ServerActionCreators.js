var ServerActionCreator = {
  signIn: function ( email ) {
    AppDispatcher.dispatch ({
      type : ActionTypes.SIGN_IN_SUCCESS,
      email : email 
    });
  },

  signOut: function ( act ) {
    AppDispatcher.dispatch ({
      type : ActionTypes.SIGN_OUT_SUCCESS
    });
  },
}

