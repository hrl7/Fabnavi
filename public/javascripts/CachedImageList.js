function CachedImageList(){
  this.list = [];
  this.length = 0;
}

CachedImageList.prototype = {
  push:function(obj){
      this.list.push(obj);
       },
  get:function(n){
    return this.list[n];
      },
  init:function(){
    this.list = [];
    this.length = 0;
       },
  update:function(){
    this.length = this.list.length;
         },
}
