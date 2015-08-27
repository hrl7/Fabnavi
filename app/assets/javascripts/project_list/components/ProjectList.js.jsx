var ProjectList = React.createClass({

  propTypes : {

  },

  getStateFromStores : function () {
    return {
     projects : ProjectStore.getProjectsAll(),
     selectedProjectIndex : ProjectSelectorStore.getSelector(),
    };
  },

  _onChange : function () {
    console.log("fired projectlist");
    console.log(this.state);
    this.setState(this.getStateFromStores());
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
    for( var i in this.state.projects ){
      projects.push(<ProjectElement
        project={this.state.projects[i]}
        selected={this.state.selectedProjectIndex == i}
        />);
    }
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
    ProjectStore.addChangeListener(this._onChange);
    ProjectSelectorStore.addChangeListener(this._onChange);
  },

  componentWillUpdate : function() {
  },

  componentDidUpdate : function() {
  },

  componentWillUnmount : function() {
    ProjectStore.removeChangeListener(this._onChange);
    ProjectSelectorStore.removeChangeListener(this._onChange);
  },

});


