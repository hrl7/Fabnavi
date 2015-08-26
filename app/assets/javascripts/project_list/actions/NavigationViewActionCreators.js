var NavigationViewActionCreator = {
  menuSelect: function ( act ) {
   console.log("Nav Action Created",act);
    if ( ActionTypes.hasOwnProperty(act) ){
      AppDispatcher.dispatch ({
        type : ActionTypes[act]
      });
    }
  },
}

