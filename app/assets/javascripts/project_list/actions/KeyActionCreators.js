var KeyActionCreator = {
  handleKeyDown : function ( event ) {
    if(event.metaKey) return 0;
    event.preventDefault();
    event.stopped = true;

    var payload = {
      type    : ActionTypes.KEY_DOWN,
      keyCode : event.keyCode,
      charCode: event.charCode,
      ctrl    : event.ctrlKey,
      alt     : event.altKey,
      meta    : event.metaKey,
      shift   : event.shiftKey
    };

    AppDispatcher.dispatch( payload ); 
  },
}

