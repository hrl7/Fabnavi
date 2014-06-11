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
