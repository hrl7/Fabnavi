var ImageList = function (){
var list = [],
    length = 0,
    waited = 0,

  function init(){

  }

  function get(n){
    return list[n];
  }

  function getURL(n){
    if(list.length == 0)return false;
    var res = list[n]
    if(res.hasOwnProperty("localURL"))return res.localURL;
    if(res.hasOwnProperty("globalURL"))return res.globalURL;
    return false;
  }

  function  getIndexFromLocalURL(url){
    for(i in list){
      if(list[i].localURL == url)return i;
    }
    return -1;
  }

  function  addGlobalURLFromLocalURL(globalUrl,localUrl){
    var i = getIndexFromLocalURL(localUrl);
    if(i == -1)return -1;
    list[i].globalURL = globalUrl;
  }

  function addThumbnailURLFromLocalURL(thumbnailUrl,localUrl){
    url = localUrl.replace(/_thumbnail.JPG/,".JPG");
    var i = getIndexFromLocalURL(url);
    if(i == -1)return -1;
    list[i].thumbnailURL= thumbnailUrl;
  }

  function createObject(obj){
    /* if argObj has not img elem, 
     * add img elem and set src */
    if(!obj.hasOwnProperty("img")){
      obj.img = new Image();
      if(obj.hasOwnProperty("localURL")){
        var d = $.Deferred();
        obj.img.crossOrigin = "anonymous";
        obj.img.onload = debugSuccessFn("local image Loaded",d,obj.img);
        obj.img.onerror = debugErrorFn("local Image cannot load",d);
        obj.img.src = obj.localURL;
        obj.loadedImg = d.promise();
      } else if(obj.hasOwnProperty("globalURL")){
        obj.img.src = obj.globalURL;
        var d = $.Deferred();
        obj.img.onload = debugSuccessFn("Global image Loaded",d,obj.img);
        obj.img.onerror = debugErrorFn("Global Image cannot load",d);
        obj.img.src = obj.globalURL;
        obj.loadedImg = d.promise();
      }
    }
    return obj;
  }


  return {
    init:init,
  };

  }();
