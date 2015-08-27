var NavigationViewActionCreator = {

  search : function ( act, text ) {
   console.log("Nav Action Created", act, text );
    if ( ActionTypes.hasOwnProperty(act) ){
      AppDispatcher.dispatch ({
        type  : ActionTypes[act],
        text  : text,
      });
    }
  },

  menuSelect: function ( act ) {
   console.log("Nav Action Created",act);
    if ( ActionTypes.hasOwnProperty(act) ){
      AppDispatcher.dispatch ({
        type : ActionTypes[act]
      });
    }
  },
}

