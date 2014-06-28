function WorkQueue(){
  this.queue = [];
  this.index=0;
  this.runninng=false;
  this.start();
  this.notice = "Queue is Not Running";
}

WorkQueue.prototype = {
  push : function (id,obj) {
    var data = {
      id:id,
      img:obj
    };
    this.queue.push(data);
  },

  getProgress : function () {

  },

  clear : function () {
    this.queue = [];
    this.index = 0;
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
      console.log(this.notice);
      return 0;
    }
    this.runninng = true;
    if (this.queue.length < 1) {
      this.clear();
      this.runninng = false;
      return -1;
    }
    console.log(this.notice);
    var cachedImage = this.queue[0].img;
    var url = cachedImage.img.src;
    if(cachedImage.hasOwnProperty("loadedImg")){
      cachedImage.loadedImg.done(function(img){
          var data = this.convertImgToDataURL(img);
          this.postPicture(data,url);
          this.queue.splice(0,1);
      }.bind(this));
    } else { 
      this.runninng = false;
    }
  },
  convertImgToDataURL:function(img){
    bufCvs = document.createElement("canvas");
    bufCtx = bufCvs.getContext('2d');
    this.notice = "image loaded";
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
          this.runninng = false;
          return;
        }
        this.notice = "Image Posted!!!";
        res = res.replace("\"","","g");
        PlayConfig.imgURLs.addGlobalURLFromLocalURL(res,url);
        if(__MODE__ != "Import")RecordController.updateList();
        PlayConfig.postConfig();
        this.queue.splice(0,1);
        this.runninng = false;
    }.bind(this));
  }
};
