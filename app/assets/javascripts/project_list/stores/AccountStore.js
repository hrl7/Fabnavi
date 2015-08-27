var _accountInfo = {};

var AccountStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    _accountInfo.email = (window.hasOwnProperty('CURRENT_USER') && window.CURRENT_USER) || "";
  }, 

  emitChange : function(){
    this.emit(ACCOUNT_CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(ACCOUNT_CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(ACCOUNT_CHANGE_EVENT, callback);
  },

  getUserEmail : function () {
    return _accountInfo.email
  },  
  
  isSigningIn : function () {
    return _accountInfo.email != "";
  },

  setEmail : function ( email ) {
    _accountInfo.email = email;
  },

  getAccountInfo : function () {
    return _accountInfo;
  },

  clearEmail : function () {
    _accountInfo.email = "";
  },

});

AccountStore.dispatchToken = AppDispatcher.register(function( action ){
    switch( action.type ){

      case ActionTypes.SIGN_IN : 
        Persona.signIn();         
        break; 

      case ActionTypes.SIGN_IN_SUCCESS : 
        AccountStore.setEmail(action.email);
        AccountStore.emitChange();
        break; 

      case ActionTypes.SIGN_OUT_SUCCESS : 
        AccountStore.clearEmail();
        AccountStore.emitChange();
        break; 

      case ActionTypes.SIGN_OUT :
        Persona.signOut();
        break;

      case ActionTypes.CONFIG :
        break;

      default :
        break;
    };

});

