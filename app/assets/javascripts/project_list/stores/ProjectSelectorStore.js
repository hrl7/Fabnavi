var ProjectSelectorStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    console.log("init project selector");
  },

  emitChange : function(){
    console.log("emit ProjectSelector change event");
    this.emit(PROJECT_SELECTOR_CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(PROJECT_SELECTOR_CHANGE_EVENT, callback);
    console.log(this._getEvents());
  },

  removeChangeListener: function(callback) {
    this.removeListener(PROJECT_SELECTOR_CHANGE_EVENT, callback);
  },
});

ProjectSelectorStore.dispatchToken = AppDispatcher.register(function( action ){
  console.log("Selector received action : ",action);
});
