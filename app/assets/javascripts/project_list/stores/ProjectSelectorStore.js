var _selector  = {
};

var ProjectSelectorStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    _selector = {
      index : 0,
      row   : 0,
      col   : 0,
    };
  },

  setSelectorIndex : function ( index  ){
    _selector.index = index;
    _selector.col   = index % 4;
    _selector.row   = Math.floor(index / 4);
    this.emitChange();
  },

  getSelector : function (){
    return _selector;
  },

  emitChange : function(){
    this.emit(PROJECT_SELECTOR_CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(PROJECT_SELECTOR_CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(PROJECT_SELECTOR_CHANGE_EVENT, callback);
  },
});

var keyMap = [];
var ProjectSelectorState = new machina.Fsm({
  initialize : function() {
  },

  initialState : "projects",

  states : {
    
    projects : {
      setSelectorByIndex : function setSelectorByIndex( index ){
        //validates selector
        var projects = ProjectStore.getProjectsAll();
        if( index >= projects.length ) {
          index = projects.length -1;
        } else if( index < 0 ) {
          index = 0;
        };
        ProjectSelectorStore.setSelectorIndex( index );
      },

      _onEnter : function( ){
        keyMap[38] = this.states.projects.up;
        keyMap[40] = this.states.projects.down;
        keyMap[39] = this.states.projects.right;
        keyMap[37] = this.states.projects.left;
      },

      up : function () {
        ProjectSelectorState.setSelectorByIndex( _selector.index - 4 );
      },  

      down : function () {
        ProjectSelectorState.setSelectorByIndex( _selector.index +4 );
      },  

      left : function () {
        ProjectSelectorState.setSelectorByIndex( _selector.index -1 );
      },  

      right : function () {
        ProjectSelectorState.setSelectorByIndex( _selector.index +1 );
      },  
    },

    projectMenu : {

    },

    navigation : {

    },

    searchBar : {

    },

  },

  up: function(){
    this.handle('up');
  },

  down : function(){
    this.handle('down');
  },
  left : function(){
    this.handle('left');
  },
  right : function(){
    this.handle('right');
  },

  setSelectorByIndex: function( index ){
    this.handle('setSelectorByIndex', index);
  },
});

ProjectSelectorStore.dispatchToken = AppDispatcher.register(function( action ){
  switch( action.type ){
    case ActionTypes.KEY_DOWN:
      if( keyMap.hasOwnProperty( action.keyCode ) ){
        keyMap[action.keyCode]();
      }  
      break;
    default:
      break;
  };
});
