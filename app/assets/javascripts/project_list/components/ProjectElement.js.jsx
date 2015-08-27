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

  getThumbnailSrc: function () {
    var thumbnailId = this.props.project.thumbnail_picture_id;
    var src = null;
    
    if ( this.props.project.photo.hasOwnProperty( thumbnailId ) ){
      src = this.props.project.photo[thumbnailId].thumbnail.url;
    }

    if ( src == null || src == "" ) {
      src = "/images/noimage.gif";
    }
    return src;
  },

  getUserIconSrc: function () {
    var maybeAvater = this.props.project.user.avatar;
    var src = null;
    if( maybeAvater != null && ( maybeAvater.url != null || maybeAvater.url != "" )) {
      src = maybeAvater.url;
    }
    if( src == null ){
      src = "/images/user_icon.png";
    }
    return src;
  },

  render : function(){
    return (
      <div className={"project-box " + (this.props.isSelected  ? "selected-project" : "project")}>
        <div className="thumbnail">
          <img src={this.getThumbnailSrc()} />
        </div>
        <div className="project-name">
          {this.props.project.project_name} 
        </div>
        <div className="box">
          <img className="user-icon" src={this.getUserIconSrc()}  />
          <div className="username">
            {this.props.project.user.name}
          </div>
          <div className="date">
            {this.props.project.updated_at} 
          </div>
        </div>
        <ul className="actions hide">
        </ul>
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


