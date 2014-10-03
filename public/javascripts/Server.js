var Server = function (){

  function setThumbnail (index){
   console.log(index);
    $.post("/project/setThumbnail",
      {
        project_id:Detail.projectName(),
        author:Detail.author(),
        thumbnail:index
      },
      function(){},
      "jsonp");
  }

  function postPlaylist (){
    $.post("/project/postConfig",
      {
        project_id:Detail.projectName(),
        data:JSON.stringify(Director.list().list()),
        author:Detail.author()
      },
      function(){},
      "json");
  }

  return {
    setThumbnail:setThumbnail,
    postPlaylist:postPlaylist,
  };
  }();
