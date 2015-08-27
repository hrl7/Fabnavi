var SearchBar = React.createClass({

  propTypes : {
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
      <section className="belt" >
        <div className="menu-action search-bar">
          <form >
            <input id="search-box" onChange={this.handleChange} />
            <span className="search-icon" ></span>
          </form>
        </div>
      </section>
    );
  },

  handleChange: function ( event ){
    NavigationViewActionCreator.search( event.target.value );
  },

  onclick : function() {
  },

  componentWillMount : function() {
  },

  componentDidMount : function () {
  },

  componentWillUpdate : function() {
  },

  componentDidUpdate : function() {
  },

  componentWillUnmount : function() {
  },

});


