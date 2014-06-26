function WorkQueue(){
  this.queue = [];
  this.index=0;
  this.runninng=false;
  this.start();
  this.notice = "Queue is Not Running";
}

WorkQueue.prototype = {
  push : function (id,url,index) {
    var data = {
      id:id,
      url:url,
      index:index
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
        console.log("Check the Queue... Works: "+this.queue.length );
        this.fire(); 
    }.bind(this),5000);
  },

  stop : function () {
    clearInterval(this.timer); 
  },

  fire: function () {
    if(this.runninng){
      console.log("Queue is Running...");
      console.log(this.notice);
      return 0;
    }
    console.log("run");
    this.runninng = true;
    if (this.queue.length < 1) {
      this.clear();
      console.log("No Queue");
      this.runninng = false;
      return -1;
    }
    console.log(this.notice);
    console.log("Status: "+this.queue[0].toSource()+ " run");
    var data = this.queue[0];
    var url = data.url;
    var id = data.id;
    var index = data.index;
    if(!__DEBUG__){
      var bimg = document.createElement("img");
      bimg.crossOrigin = "anonymous";
      bufCvs = document.createElement("canvas");
      bufCtx = bufCvs.getContext('2d');
      setTimeout(function () {
          bimg.onerror = function(e){
            this.notice = "ERROR : cannot load image";
            this.runninng = false;
            console.log(e);
            console.log(e.originalTarget.complete);
          }.bind(this);
          bimg.onload = function(){
            console.log("***********************************");
            this.notice = "image loaded";
            bufCvs.width = bimg.naturalWidth;
            bufCvs.height = bimg.naturalHeight;
            bufCtx.drawImage(bimg,0,0);
            $('#shoot').show();
            $('#contents').show();
            var pict = bufCvs.toDataURL("image/jpeg").substring(23);
            this.notice = "Image Posting...";
            $.post("/project/postPicture",
              { 
                data:pict,
                project_id:id,
                url:url
              },
              function(res,error){
                this.notice = "Image Posted!!!";
                console.log("post result :"+res);
                res = res.replace("\"","","g");
                PlayConfig.imgURLs.addGlobalURLFromLocalURL(res,url);
                RecordController.updateList();
                PlayController.next();
                PlayController.show(PlayConfig.index,true);
                PlayConfig.postConfig();
                this.index++; 
                this.queue.splice(0,1);
                this.runninng = false;
                this.fire();
            }.bind(this));
            console.log("picture posted");
          }.bind(this);
          bimg.src =  url;
      }.bind(this),100);
    } else {
      PlayConfig.imgURLs.splice(PlayConfig.index+1,0,url);
      RecordController.updateList();
      PlayController.next();
      PlayController.show(PlayConfig.index,true);
      $('#contents').show();
      this.index++; 
      return this.fire();
    }
  }
};
