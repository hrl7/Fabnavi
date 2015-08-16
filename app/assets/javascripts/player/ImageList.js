function CachableImageList(){

  var list = [],
      waited = 0,
      index = 0,
      d,
      editor,
      editorInitialized = false,
      length = 0,
      loadingLength = 0
  ;

d = $.Deferred();

function initWithURLArray(array){
  loadingLength = array.length;
  Publisher.subscribe("Loading","0/"+array.length);
  pushImageUrlRecursively(array);
}

function initEditor(){
  editor = ThumbnailViewer();
  //  d.promise().then(editor.init);
  editor.init(list);
  setEditorInitialized();
}

function setEditorInitialized(){
  editorInitialized = true;
}

function getList() {
  return list;
}

function getUploadList() {
  var arr = list.filter(isReady);
  var res = [];

  for(i in arr){
    res[i] = {url:arr[i].globalURL,thumbnail_url:arr[i].thumbnailURL,order_in_project:i};
  }
  return res;

  function isReady(obj){
      return obj.hasOwnProperty("globalURL");
  }
}

function pushImageURL(obj,index){
  index = index || 0;
  var res = createObject(obj);
  if(Number.isInteger(index) && index < list.length){
    list.splice(index+1,0,res);
  } else {
    list.push(obj);
  }
  length = list.length;
  if(editorInitialized)editor.update(res);
  return res;
}

function pushLocalImageWithURL(url,index){
  var res = pushImageURL({localURL:url},index);
  return res;
}

function pushImageUrlRecursively(images,i){
  i = i || 0;
  if(i >= images.length){
    list = list.sort(function(a,b){return a.index > b.index});
    d.resolve(list);
    loadingLength = -1;
    Publisher.unsubscribe("Loading");
    return 0;
  }
  var image = images[i];
  console.log(image);

  var res = pushImageURL(
    {
      globalURL:image.file.url.replace(/^.*https%3A/,"https:/"),
      thumbnailURL:peelThumbnail(image),
      index:image.order_in_project 
      });
  res.loadedImg.then(function(){
      Publisher.update("Loading",i+1+"/"+loadingLength);
      pushImageUrlRecursively(images,i+1);
      if(editorInitialized)editor.update();
  });

  // TODO : Refactor!!!
  function peelThumbnail(img){
    if(img.hasOwnProperty("thumbnail")) {
      if(img.thumbnail.hasOwnProperty("url")){
        return convert_file_to_s3(img.thumbnail.url);
      }
    }
    return null;
  }

  function convert_file_to_s3 (url) {
    if(url){
      return url.replace(/^.*https%3A/,"https:/");
    } else {
        return "";
    }
  }
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
    if(obj.hasOwnProperty("testImg")){
      var d = $.Deferred();
      obj.img.crossOrigin = "anonymous";
      d.resolve(obj.testImg);
      obj.loadedImg = d.promise();
      console.log(obj);
     } else if(obj.hasOwnProperty("localURL")){
      var d = $.Deferred();
      obj.timer = generateRecTimer(obj);
      obj.img.crossOrigin = "anonymous";
      obj.img.onload = debugSuccessFn(d,obj);
      obj.img.onerror = debugErrorFn(d);
      obj.img.src = obj.localURL;
      obj.loadedImg = d.promise();
    } else if(obj.hasOwnProperty("globalURL")){
      obj.img.src = obj.globalURL;
      var d = $.Deferred();
      obj.img.onload = debugSuccessFn(d,obj);
      obj.img.onerror = debugErrorFn(d);
      obj.img.src = obj.globalURL;
      obj.loadedImg = d.promise();
    }
  }
  return obj;
}

function generateRecTimer(obj){
  return  window.setTimeout(function(){
      obj.img.src = "";
      obj.img.crossOrigin = "anonymous";
      obj.img.onload = debugSuccessFn(d,obj);
      obj.img.onerror = debugErrorFn(d);
      obj.img.src = obj.localURL;
      obj.timer = generateRecTimer(obj);
  },3000);
}

function debugSuccessFn(d,arg){
  return function(e){
    if(d != undefined)d.resolve(arg.img);
    window.clearTimeout(arg.timer);
  }
}

function debugErrorFn(d){
  return function(e){
    if(d != undefined)d.reject(e);
  }
}

function getLength(){
  return length;
}

function getProgress(){
}

function nextPage(){
  if(list.length === 0)return index;
  if(index < list.length-1){
    index++;
  }  
  if(editorInitialized)editor.next();
  return index;
}

function setPage(i){
  if(i < 0 || i >= list.length) return false;
  index = i;
  if(editorInitialized)editor.reload();
  return index;
}

function prevPage(){
  if(list.length === 0)return index;
  if(index > 0) {
    index--;
  }  
  if(editorInitialized)editor.prev();
  return index;
}

function loadImage(){
  if(list.length != 0)return list[index].loadedImg;
  else return false;
}

function splice(a,b){
  list.splice(a,b);
  length = list.length;
}

function getListDeferred(){
  return d.promise();
}

function updateList(a){
  var res = [];
  for(var i in a){
    res.push(findElementFromUrl(a[i]));
  }
  list = res;
}

function findElementFromUrl(url){
  for(var i in list){
    if(list[i].globalURL == url || list[i].localURL == url)return list[i];
  }
  return -1;
}

function toggleEditor(){
  if(editorInitialized)editor.toggleEditor();
  else console.log("Editor is not initialized");
}

function hideEditor(){
  if(editor)editor.hide();
}

function remove(i){
  list.splice(i,1);
  if(index >= list.length)index = list.length - 1;
  if(editorInitialized){
    editor.update();
    editor.setPage(index);
  }
  length = list.length;
  Fabnavi.reloadPage();
}

function getIndex(){
  return index;
}

function getLoadingLength(){
  if(loadingLength > length){
   return loadingLength;
  } else {
   return length;
  }
}

function saveLock(){
  return loadingLength != -1;
}

return {
  list:getList,
  getListDeferred:getListDeferred,
  length:getLength,

  initWithURLArray:initWithURLArray,
  updateListWithURLArray:updateList,
  maxLength:getLoadingLength,
  push:pushLocalImageWithURL,
  pushImage:pushImageURL,

  next:nextPage,
  prev:prevPage,
  setPage:setPage,
  getDeferredImage:loadImage,
  splice:splice,
  toggleEditor:toggleEditor,
  initEditor:initEditor,
  hideEditor:hideEditor,
  remove:remove,
  index:getIndex,
  setEditorInitialized:setEditorInitialized,
  get:get,
  addGlobalURLFromLocalURL:addGlobalURLFromLocalURL,
  addThumbnailURLFromLocalURL:addThumbnailURLFromLocalURL,
  saveLock : saveLock,

  getUploadList: getUploadList,
};

};
