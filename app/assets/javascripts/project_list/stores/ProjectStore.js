var _projects = {};

var ProjectStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    _projects = PROJECTS;
    console.log("init projectlist ");
    this.emitChange();
  },

  getProjectsAll : function (){
    return _projects;
  },

  emitChange : function(){
    console.log("emit projectlist change event");
    this.emit(PROJECT_LIST_CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(PROJECT_LIST_CHANGE_EVENT, callback);
    console.log(this._getEvents());
  },

  removeChangeListener: function(callback) {
    this.removeListener(PROJECT_LIST_CHANGE_EVENT, callback);
  },
});
