
THUMBNAIL_WIDTH = 440;
THUMBNAIL_HEIGHT = 320;

var ImageUploadQueue = function ImageUploadQueue(){
  start();
  var queue = [],
      runninng=false,
      timer = null
        ;

  /**
   *  @param obj 
   *      Object.img.src
   *      Object.loadedImg
   *
   */
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
      Publisher.unsubscribe("Upload");
      runninng = false;
      notice("No task");
      return -1;
    }
    Publisher.subscribe("Upload",queue.length+" images");
    var cachedImage = queue[0];
    var url = cachedImage.img.src;
    /* Original, thumbnail
     * Load Image -> ConvertImage -> PostImage
     * UpdateURLList
     */
    if(cachedImage.hasOwnProperty("loadedImg")){
      notice("Loading Image...");
      postPhoto(cachedImage)
        .then(updateURLList)
        .done(function(a,b){
          queue.shift();
          runninng = false;
        })
      .fail(function(e){
        runninng = false;
        console.log(e.toSource());
      });
    }
  }

  function postPhoto(img){
    return img.loadedImg.then(
        function(img){ 
          return $.when(
            toBlob(img,img.naturalWidth,img.naturalHeight),
            toBlob(img)
            )
            .then(send);
        }
        );

    function send(file,thumbnail){
      var d = $.Deferred();
      Server.postPhoto(
          file,
          thumbnail,
          Project.id
          ).done(
            function(res,err){
              img.globalURL = res.file.file.url;
              img.thumbnailURL = res.thumbnail.thumbnail.url;
              d.resolve(res);
            },
            function(res,err){
              d.reject(err);
            }
            );
      return d.promise();
    }
  }

  function toBlob(img,w,h){
    var d = $.Deferred();
    var cvs = document.createElement('canvas');
    cvs.width =  w ||  THUMBNAIL_WIDTH;
    cvs.height = h ||  THUMBNAIL_HEIGHT;
    ImageConverter.drawImage(img,cvs,ViewConfig.conf());
    cvs.toBlob(function(blob){d.resolve(blob)});
    return d.promise();
  }

  function updateURLList(postResult){
    var d = $.Deferred();
    //  RecordController.updateList();
    notice("Posting Playlist Files...");
    try{
    //Server.postPlaylist();
    //  queue.splice(0,1);
    d.resolve();
    } catch(e) {
      d.reject(e);
    }
    return d.promise();
  }

  function print(){
    return queue;
  }
  return {
    push:push,
    fire:fire,
    start:start,
    print:print,
  };
}();

var notice = function(mes){
//  console.log("NOTICE=============",mes);
  Publisher.update("Upload",mes);
}
