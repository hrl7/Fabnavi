
THUMBNAIL_WIDTH = 440;
THUMBNAIL_HEIGHT = 320;

function WorkQueue(){
  var queue = [],
      runninng=false,
      timer = null
  ;

function push (obj) {
  queue.push(obj);
}

function clear () {
  queue = [];
  runninng = false;
}

function start(){
  timer = setInterval(function(){
      fire(); 
  },5000);
}

function stop () {
  clearInterval(timer); 
}

function fire () {
  if(runninng){
    return 0;
  }
  runninng = true;
  if (queue.length < 1) {
    runninng = false;
    notice("No task");
    return -1;
  }
  var cachedImage = queue[0];
  var url = cachedImage.img.src;
  /* Original, thumbnail
   * Load Image -> ConvertImage -> PostImage
   * UpdateURLList
   */
  if(cachedImage.hasOwnProperty("loadedImg")){
    notice("Loading Image...");
    cachedImage.loadedImg
    .then(cropAndConvertImageToDataURLDeferred)
    .then(postPicture)
    .fail(function(e){
        console.log(e.toSource());
    });
  }
  notice("There is no img");
  this.runninng = false;
}

/**
 * cropping image with view config area 
 * and convert it to DataURL
 * @params img {Image}
 * @return {String (Deferred)}
 */

function cropAndConvertImageToDataURLDeferred(img) {
  var cvs = document.createElement('canvas');
  var d = $.Deferred();
  cvs.width = width;
  cvs.height = height;
  ImageConverter.drawImage(img,cvs,ViewConfig.conf());
  d.resolve(convertImgToDataURL(cvs));
  return d.promise();
}

/**
 * @params cvs {HTMLCanvas2d}
 * @return {String} DataURL format
 *
 */
function convertImgToDataURL(cvs){
  notice("Converting...");
  var ctx = cvs.getContext('2d');
  return ctx.toDataURL("image/jpeg").substring(23));
}

function generateThumbnailURL(url){
  return url.replace(/.JPG/,"_thumbnail.JPG");
}

function updateURLList(resultUrl,url,isThumbnail){
  var d = $.Deferred();
  notice("Image Posted!!!");
  var res = resultUrl.replace("\"","","g");
  if(isThumbnail){
    PlayConfig.imgURLs.addThumbnailURLFromLocalURL(res,url);
  } else {
    PlayConfig.imgURLs.addGlobalURLFromLocalURL(res,url);
  }
  if(__MODE__ != "Import")RecordController.updateList();
  notice("Posting Playlist Files...");
  Server.savePlaylist();
  notice("Posted Playlist Files!!");
  queue.queue.splice(0,1);
  queue.runninng = false;
  d.resolve();
  return d.promise();
}

/** 
 * PostPicture
 *
 *  @params data {String} dataURL format
 *  @params localImageURL {String}
 *  @return {Deferred}
 */
function postPicture(data,localImageURL){
  notice("Posting Picture....");
  var d = $.Deferred();
  $.post("/project/postPicture",
    { 
      data:data,
      project_id:Detail.projectName(),
      author:Detail.author(),
      url:localImageURL
    },function(res,err){
      if(err != "success"){
        console.log(err);
        notice("Error to post picture");
        runninng = false;
        d.reject(err);
      } else {
        d.resolve(res,localImageURL);
      }
  });
  return d.promise();
}

return {

};
}();
var notice = function(mes){
  noticeElem = document.getElementById('notice') ; 
  var str = mes + ". There're "+queue.queue.length +" tasks.";
  if(__DEBUG__&&noticeElem)noticeElem.textContent = str;
  else if(__DEBUG__)document.title =  str;
}
