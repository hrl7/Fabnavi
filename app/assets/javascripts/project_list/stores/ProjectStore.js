var _projects = {};

var ProjectStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    _projects = PROJECTS;
    this.emitChange();
  },

  getProjectsAll : function (){
    return _projects;
  },

  emitChange : function(){
    this.emit(PROJECT_LIST_CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(PROJECT_LIST_CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(PROJECT_LIST_CHANGE_EVENT, callback);
  },
});

ProjectStore.dispatchToken = AppDispatcher.register(function( action ){
  switch(action.type){
    default : 
      break;
  };

});
