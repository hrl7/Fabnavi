function WorkQueue(){
  this.queue = [];
  this.runninng=false;
  this.start();
  noticeElem = document.getElementById('notice') ; 
}

WorkQueue.prototype = {
  push : function (obj) {
    this.queue.push(obj);
  },


  getProgress : function () {

  },

  clear : function () {
    this.queue = [];
    this.runninng = false;
  },

  start : function(){
    this.timer = setInterval(function(){
        this.fire(); 
    }.bind(this),5000);
  },

  stop : function () {
    clearInterval(this.timer); 
  },

  fire: function () {
    if(this.runninng){
      return 0;
    }
    this.runninng = true;
    if (this.queue.length < 1) {
      this.runninng = false;
      notice("No task");
      return -1;
    }
    var cachedImage = this.queue[0];
    var url = cachedImage.img.src;
    if(cachedImage.hasOwnProperty("loadedImg")){
      notice("Loading Image...");
      cachedImage.loadedImg.done(function(img){
          this.convertImgToDataURL(img,url)
          .done(this.postPicture)
          .fail(function(e){
              console.log(e.toSource());
          });
      }.bind(this));
    } else { 
      notice("There is no img");
      this.runninng = false;
    }
  },

  convertImgToDataURL:function(img,url){
    notice("Converting...");
    var d = $.Deferred();
    var bufCvs = document.createElement("canvas");
    bufCvs.width = screen.width;
    bufCvs.height = screen.height;
    PlayController.drawImage(img,bufCvs)
    .done(function(){
        d.resolve(bufCvs.toDataURL("image/jpeg").substring(23),url);
    });
    return d.promise();
  },

  postPicture:function(data,url){
    notice("Posting Picture....");
    return $.post("/project/postPicture",
      { 
        data:data,
        project_id:PlayConfig.projectName,
        author:PlayConfig.author,
        url:url
      },
      function(res,error){
        if(error != "success"){
          console.log(error);
          notice("Error to post picture");
          this.runninng = false;
          return;
        }
        console.log(res);
        notice("Image Posted!!!");
        res = res.replace("\"","","g");
        PlayConfig.imgURLs.addGlobalURLFromLocalURL(res,url);
        if(__MODE__ != "Import")RecordController.updateList();
        notice("Posting Playlist Files...");
        PlayConfig.postConfig();
        notice("Posted Playlist Files!!");
        this.queue.splice(0,1);
        this.runninng = false;
    }.bind(queue));
  }
};
var notice = function(mes){
  var str = mes + ". There're "+queue.queue.length +" tasks.";
  if(noticeElem)noticeElem.textContent = str;
  else document.title =  str;
}
