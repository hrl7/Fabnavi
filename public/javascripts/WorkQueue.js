function WorkQueue(){
  this.queue = [];
  this.index=0;
  this.runninng=false;
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

  fire: function () {
/*          if(this.runninng){
            setTimeout(this.fire,1000);
            return 0;
          }
          */
         console.log("run");
          this.runninng = true;
          if (this.index == this.queue.length) {
            this.clear();
            console.log("finish");
            return -1;
          }
          console.log("Status: "+this.index+ " run");
          var data = this.queue[this.index];
          var url = data.url;
          var id = data.id;
          var index = data.index;
          if(!__DEBUG__){
            setTimeout(function () {
              var bimg = document.createElement("img");
              bimg.crossOrigin = "anonymous";
              bimg.src =  url;
              bufCvs = document.createElement("canvas");
              bufCtx = bufCvs.getContext('2d');
              console.log(url);
              bimg.onload = function(){
                console.log("image loaded");
                bufCvs.width = bimg.naturalWidth;
                bufCvs.height = bimg.naturalHeight;
                bufCtx.drawImage(bimg,0,0);
                var pict = bufCvs.toDataURL("image/jpeg").substring(23);
                $.post("/project/postPicture",
                  { 
                    data:pict,
                    project_id:id,
                    url:url
                  },
                  function(res,error){
                    console.log("post result :"+res);
                    res = res.replace("\"","","g");
                    PlayConfig.imgURLs.addGlobalURLFromLocalURL(res,url);
                    RecordController.updateList();
                    PlayController.next();
                    PlayController.show(PlayConfig.index,true);
                    PlayConfig.postConfig();
                    this.index++; 
                    return this.fire();
                  }.bind(this));
                console.log("picture posted");
              }.bind(this);
            }.bind(this),0);
          } else {
            PlayConfig.imgURLs.splice(PlayConfig.index+1,0,url);
            RecordController.updateList();
            PlayController.next();
            PlayController.show(PlayConfig.index,true);
            this.index++; 
            return this.fire();
          }
        }
};
