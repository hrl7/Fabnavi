var ProjectList = React.createClass({

  propTypes : {
  },

  getStateFromStores : function () {
    return {
     projects : ProjectStore.getProjectsAll()
    };
  },

  getInitialState: function() {
     return this.getStateFromStores();
  },

  getDefaultProps: function() {
     return {
        
     };
   },

  render : function(){
    var projects = [];
    console.log(this.state.projects);
    this.state.projects.forEach(function(project){
      projects.push(<ProjectElement project={project} />);
    });
    return (
     <div className="projects">
        {projects} 
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


