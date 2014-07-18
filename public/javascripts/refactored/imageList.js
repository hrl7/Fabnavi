var ImageList = function (){
  var list = [],
      length = 0,
      waited = 0;

  function init(){
   if(Director.mode() == 0){
      pushImageUrlRecursively(PICTURES_DATA);
      console.log(list);
    }
  }

  function getList() {
   return list;
  }

  function pushImageURL(obj){
    var res = createObject(obj);
    list.push(res);
    return res;
  }

  function pushImageUrlRecursively(images,i){
    i = i || 0;
    if(i >= images.length)return 0;
    var image = images[i];
    var res = pushImageURL({globalURL:image.url,thumbnailURL:image.thumbnail_url});
    res.loadedImg.then(function(){
        pushImageUrlRecursively(images,i+1);
    });
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


  function debugSuccessFn(mes,d,arg){
    return function(e){
      /*
       console.log("Success-------------------");
       console.log(mes);
       console.log(e);
       console.log("-----------------------END");
       */
      if(d != undefined)d.resolve(arg);
    }
  }

  function debugErrorFn(mes,d){
    return function(e){
      /*
       console.log("ERROR=================");
       console.log(mes);
       console.log(e);
       console.log("=================END");
       */
      if(d != undefined)d.reject(e);
    }
  }

  return {
    init:init,
    list:getList,
  };

  }();
