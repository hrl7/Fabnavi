var ProjectElement = React.createClass({

  propTypes : {
  },


  getInitialState: function() {
    return null;
  },

  getDefaultProps: function() {
     return {
        
     };
   },

  render : function(){
    return (
     <div className="project-box project">
       <div className="thumbnail">
       </div>
       <div className="project-name">
       {this.props.project.project_name} 
       </div>
       <div className="box">
       </div>
       <ul className="actions hide"></ul>
     </div>
    );
  },

  handleChange: function ( event ){
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


