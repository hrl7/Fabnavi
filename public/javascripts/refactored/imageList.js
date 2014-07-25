function CachableImageList(){

  var list = [],
      waited = 0,
      index = 0,
      d
  ;

d = $.Deferred();

function initWithURLArray(array){
  pushImageUrlRecursively(array);
}

function getList() {
  return list;
}

function pushImageURL(obj){
  var res = createObject(obj);
  list.push(res);
  return res;
}

function pushLocalImageWithURL(url){
  pushImageURL({localURL:url});
}

function pushImageUrlRecursively(images,i){
  i = i || 0;
  if(i >= images.length){
   d.resolve(list);
    return 0;
  }
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
  if(list.length === 0)return false;
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
      obj.img.onload = debugSuccessFn(d,obj.img);
      obj.img.onerror = debugErrorFn(d);
      obj.img.src = obj.localURL;
      obj.loadedImg = d.promise();
    } else if(obj.hasOwnProperty("globalURL")){
      obj.img.src = obj.globalURL;
      var d = $.Deferred();
      obj.img.onload = debugSuccessFn(d,obj.img);
      obj.img.onerror = debugErrorFn(d);
      obj.img.src = obj.globalURL;
      obj.loadedImg = d.promise();
    }
  }
  return obj;
}


function debugSuccessFn(d,arg){
  return function(e){
    if(d != undefined)d.resolve(arg);
  }
}

function debugErrorFn(d){
  return function(e){
    if(d != undefined)d.reject(e);
  }
}

function getLength(){
  return list.length;
}

function getProgress(){
}

function nextPage(){
  if(list.length === 0)return index;
  if(index < list.length-1){
    index++;  
  } else {
    index = 0;
  }
  return index;
}

function setPage(i){
  if(i <= 0 || i >= list.length) return false;
  index = i;
  return index;
}

function prevPage(){
  if(list.length === 0)return index;
  if(index > 0) { 
    index--;  
  } else {
    index = list.length -1;
  }
  return index;
}

function loadImage(){
  return list[index].loadedImg;
}

function splice(a,b){
  list.splice(a,b); 
}

function getListDeferred(){
   return d.promise();
}

return {
  initWithURLArray:initWithURLArray,
  list:getList,
  getListDeferred:getListDeferred,
  length:getLength,
  push:pushLocalImageWithURL,
  next:nextPage,
  prev:prevPage,
  setPage:setPage,
  getDeferredImage:loadImage,
  splice:splice,
};

};

