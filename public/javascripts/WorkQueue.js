function WorkQueue(){
  this.queue = [];
  this.runninng=false;
  this.start();
  this.noticeElem = document.getElementById('notice'); 
}

WorkQueue.prototype = {
  push : function (obj) {
    this.queue.push(obj);
  },

  notice :function(mes){
    if(this.noticeElem)this.noticeElem.textContent = mes + ". There're "+this.queue.length +" tasks.";
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
      this.notice("No task");
      return -1;
    }
    var cachedImage = this.queue[0];
    var url = cachedImage.img.src;
    if(cachedImage.hasOwnProperty("loadedImg")){
      this.notice("Loading Image...");
      cachedImage.loadedImg.done(function(img){
          this.notice("Converting...");
          var data = this.convertImgToDataURL(img);
          this.notice("Posting Picture....");
          this.postPicture(data,url);
      }.bind(this));
    } else { 
      this.notice("There is not img");
      this.runninng = false;
    }
  },
  convertImgToDataURL:function(img){
    bufCvs = document.createElement("canvas");
    bufCtx = bufCvs.getContext('2d');
    bufCvs.width = img.naturalWidth;
    bufCvs.height = img.naturalHeight;
    bufCtx.drawImage(img,0,0);
    return bufCvs.toDataURL("image/jpeg").substring(23);
  },

  postPicture:function(data,url){

    $.post("/project/postPicture",
      { 
        data:data,
        project_id:PlayConfig.projectName,
        author:AUTHOR_NAME,
        url:url
      },
      function(res,error){
        if(error != "success"){
          console.log(error);
          this.notice("Error to post picture");
          this.runninng = false;
          return;
        }
        console.log(res);
        this.notice("Image Posted!!!");
        res = res.replace("\"","","g");
        PlayConfig.imgURLs.addGlobalURLFromLocalURL(res,url);
        if(__MODE__ != "Import")RecordController.updateList();
        this.notice("Posting Playlist Files...");
        PlayConfig.postConfig();
        this.notice("Posted Playlist Files!!");
        this.queue.splice(0,1);
        this.runninng = false;
    }.bind(this));
  }
};
