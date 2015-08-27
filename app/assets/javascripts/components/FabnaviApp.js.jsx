var FabnaviApp = React.createClass({
  render : function ( ){
    return (
     <div className="body" >
       <Navigation />
       <SearchBar />
       <ProjectList />
       <Footer />
     </div>
    );
  },
});
