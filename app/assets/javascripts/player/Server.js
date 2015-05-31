var Server = function (){

  function setThumbnail (index){
    console.log(index);
    $.post("/project/setThumbnail",
        {
          id:Project.id,
      user_id:Project.user_id,
      thumbnail_picture_id:index
        },
        function(){},
        "jsonp");
  }

  function postPlaylist (){
    var lst = Fabnavi.list();
    console.log("save lock:loadingLength",lst.saveLock());
    if(lst.saveLock() == false){
      Publisher.unsubscribe("Playlist");
      $.post("/projects/playlist",
          {
            id:Project.id,
        user_id:Project.user_id,
        data:JSON.stringify(lst.getUploadList()),
          },
          function(){},
          "json");
    } else {
      Publisher.subscribe("Playlist","Cannot Save, Please Retry later");
    }
  }

  /** 
   * PostPicture
   *
   *  @param data {String} dataURL format
   *  @param localImageURL {String}
   *  @return {Deferred}
   */
  function postPicture(localImageURL){
    return function(data){
      notice("Posting Picture....");
      var d = $.Deferred();
      $.post("/photos",
          { 
            photo:{
                    file:data,
                    url:localImageURL,
                    project_id:Project.id,
                    user_id:Project.user_id,
                  }
          },
          function(res,err){
            if(err != "success"){
              console.log(err);
              notice("Error to post picture");
              runninng = false;
              d.reject(err);
            } else {
              d.resolve(res,localImageURL);
            }
          });
      return d.promise();
    };
  }

function postPhoto(file,thumbnail,project_id,order_in_project = 0){
    var fd = new FormData();
    fd.append("file", file,".png");
    fd.append("thumbnail", thumbnail,".png");
    fd.append("project_id", project_id);
    fd.append("order_in_project",order_in_project);
    return $.ajax({ 
      url: "/photos.json",
      type: "POST",
      data:fd, 
      processData: false,
      contentType: false  
    },
    function(res,err){
      console.log(res);
      console.log(err);
    }
    );

}


  return {
    setThumbnail:setThumbnail,
    postPlaylist:postPlaylist,
    postPicture:postPicture,
    postPhoto:postPhoto,
  };
}();
