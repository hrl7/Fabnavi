
var MenuIcon = React.createClass({

  propTypes : {
    act   : React.PropTypes.string.isRequired,
    src   : React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
     return {
     };
  },

  getDefaultProps: function() {
     return {
        
     };
   },

  render : function(){
    return (
      <a className="menu-action nav-action" >
         <img src={this.props.src} onClick={this.onclick}/>
      </a>
     );
  },

  onclick : function() {
    NavigationViewActionCreator.menuSelect(this.props.act); 
  },

  componentWillMount : function() {
    return {
    };
  },

  componentDidMount : function () {

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


