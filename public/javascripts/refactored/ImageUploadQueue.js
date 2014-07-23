
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
    cachedImage.loadedImg.done(function(img){
        convertImgToDataURL(img,url)
        .then(postPicture)
        .then(updateURLList)
        .fail(function(e){
            console.log(e.toSource());
        });
        convertImgToDataURL(img,url,true)
        .then(postPicture)
        .then(updateURLList)
        .fail(function(e){
            console.log(e.toSource());
        });
    });
  } else { 
    notice("There is no img");
    this.runninng = false;
  }
}

function convertImgToDataURL(img,url,isThumbnail){
  notice("Converting...");
  isThumbnail = isThumbnail || false;
  var d = $.Deferred();
  var bufCvs = document.createElement("canvas");
  if(isThumbnail){
    bufCvs.width = THUMBNAIL_WIDTH;
    bufCvs.height = THUMBNAIL_HEIGHT;
    url = url.replace(/.JPG/,"_thumbnail.JPG");
  } else {
    bufCvs.width = screen.width;
    bufCvs.height = screen.height;
  }
  PlayController.drawImage(true,img,bufCvs)
  .done(function(){
      d.resolve(bufCvs.toDataURL("image/jpeg").substring(23),url,isThumbnail);
  });
  return d.promise();
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
  PlayConfig.postConfig();
  notice("Posted Playlist Files!!");
  queue.queue.splice(0,1);
  queue.runninng = false;
  d.resolve();
  return d.promise();
}

function postPicture(data,url,isThumbnail){
  notice("Posting Picture....");
  var d = $.Deferred();
  $.post("/project/postPicture",
    { 
      data:data,
      project_id:PlayConfig.projectName,
      author:PlayConfig.author,
      url:url
    },function(res,err){
      if(err != "success"){
        console.log(err);
        notice("Error to post picture");
        this.runninng = false;
        d.reject(err);
      } else {
        d.resolve(res,url,isThumbnail);
      }
  });
  return d.promise();
}
};
var notice = function(mes){
  noticeElem = document.getElementById('notice') ; 
  var str = mes + ". There're "+queue.queue.length +" tasks.";
  if(__DEBUG__&&noticeElem)noticeElem.textContent = str;
  else if(__DEBUG__)document.title =  str;
}
