var Navigation = React.createClass({

  getStateFromStores : function getStateFromStores() {
    return {
     account : AccountStore.getAccountInfo()
    };
  },

  _onChange : function () {
    console.log("Fire From Navigation");
    console.log(this.state);
    this.setState(this.getStateFromStores());
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },

  getDefaultProps: function() {
     return {
        headerSrc : "images/h_logo.png",
        
     };
   },

  render : function(){
      var menu;
      if( this.state.account.email != "" ) {
        menu =  (
        <div className="menu">
          <MenuIcon act="TOP" src="images/h_top.png" />
          <MenuIcon act="MY_PROJECT" src="images/h_myproject.png" />
          <MenuIcon act="NEW_PROJECT" src="images/h_create.png" />
          <MenuIcon act="CONFIG" src="images/h_config.png" />
          <MenuIcon act="SIGN_OUT" src="images/h_sign_out.png"  />
        </div>
        );
      } else {
        menu =  (
          <div className="menu">
            <MenuIcon act="TOP" src="images/h_top.png" />
            <MenuIcon act="SIGN_IN" src="images/h_signin.png"  />
          </div>
        );

      }
    return (
     <div className="header">
       <a className="logo" href="/">
          <img src={this.props.headerSrc} />
       </a>
        {menu}
     </div>
     );
  },

  componentWillMount : function() {
    AccountStore.removeChangeListener(this._onChange);
  },

  componentDidMount : function () {
    AccountStore.addChangeListener(this._onChange);
  },

  componentWillUpdate : function() {
    return {
    };
  },

  componentDidUpdate : function() {
    return {
    };
  },

  componentWillUnmount : function() {
    return {
    };
  },


});


