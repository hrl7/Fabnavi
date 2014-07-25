var Director = function(){

  var viewStatusList = ["Initializing","loadingImage","showing"],
      viewStatus= 0,
      modeList = ["play","add","edit"],
      ImageList,
      localImageList,
      showingImageList,
      queueingImageList,
      mode = null
  ;

function init (_mode){
  mode = modeList.indexOf(_mode);
  if(mode == -1){
    new Error("mode is invalid");
  }

  ImageList = CachableImageList();
  MainView.init();
  Detail.init();
  ImageList.initWithURLArray(PICTURES_DATA);
  showingImageList = ImageList;
  ViewConfig.init();
  CalibrateController.init();

  ImageList.getListDeferred().then(ThumbnailViewer.init);


  /*
   * mdoe initilize
   */
  if(mode == 1){
    initForAddMode();
  }


  UIPanel.init();

  KeyBind[modeList[mode]]();

  /* Finish Initializing */
  viewStatus = 1;
  showPage();
}

/* Common fabnavi methods*/
function getModeInt(){
  return mode;
}

function getViewStatusInt(){
  return viewStatus;
}

function getViewStatus (){
  return viewStatusList[viewStatus];
}

function getMode(){
  return modeList[mode];
}

function nextPage(){
  viewStatus = 1;
  showingImageList.next();
  ThumbnailViewer.next();
  showPage();
}

function prevPage(){
  viewStatus = 1;
  showingImageList.prev();
  ThumbnailViewer.prev();
  showPage();
}

function setPage(i){
  if(showingImageList.setPage(i) !== false){
    viewStatus = 1;
    showPage(); 
  }
}

function showPage(){
  var deferredImage = showingImageList.getDeferredImage();
  MainView.showWaitMessage();
  deferredImage.then(function(img){
      MainView.draw(img);
      viewStatus = 2;
  });
}

function redraw(){
  viewStatus = 1;
  MainView.redraw();
  viewStatus = 2;
}

function toggleConsole(){
  UIPanel.toggle();
}

/* recorder interface */
function switchShoingList(){
  if(showingImageList == ImageList){
    showingImageList = localImageList;
  } else {
    showingImageList = ImageList;
  }
  showPage();
}

function initForAddMode(){
  Camera.init();
  localImageList = CachableImageList();
  queueingImageList = localImageList;
  showingImageList = localImageList;
}

function shoot(){
  console.log("shoot");
  Camera.shoot().then(function(url){
      queueingImageList.push(url);
      nextPage();
  });

}

function shootAndGetURLWithDeferred(){

}

function getShowingImageList(){
  return showingImageList;
}

return {
  init:init,
  mode:getModeInt,
  viewStatus:getViewStatusInt,
  getMode:getMode,
  getViewStatus:getViewStatus,
  nextPage:nextPage,
  prevPage:prevPage,
  setPage:setPage,
  redraw:redraw,
  toggleConsole:toggleConsole,
  shoot:shoot,
  toggleShowingList:switchShoingList,
  list:getShowingImageList,
};
}();
