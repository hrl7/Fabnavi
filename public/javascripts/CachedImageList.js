function CachedImageList(){
  this.list = [];
  this.length = 0;
}

CachedImageList.prototype = {
  push:function(obj){
         this.list.push(obj);
         this.update();
       },

  get:function(n){
        return this.list[n];
      },

  getURL:function(n){
           var res = this.list[n];
           if(res.localURL)return res.localURL;
           if(res.globalURL)return res.globalURL;
           console.log("No URL,: " + res);
           return false;
         },

  getIndexFromLocalURL:function(url){
                         for(i in this.list){
                           if(this.list[i].localURL == url)return i;
                         }
                         return -1;
                       },
  addGlobalURLFromLocalURL:function(globalUrl,localUrl){
                             var i = this.getIndexFromLocalURL(localUrl);
                             if(i == -1)return -1;
                             this.list[i].globalURL = globalUrl;
                           },

  init:function(){
         this.list = [];
         this.length = 0;
       },

  update:function(){
           this.length = this.list.length;
         },

  splice:function(a,b,obj){
           if(obj == undefined){
             this.list.splice(a,b);
           }else {
             this.list.splice(a,b,obj);
           }
           this.update();
         }
}
