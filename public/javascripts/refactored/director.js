var Director = function(){

  var viewStatusList = ["Initializing","loadingImage","showing"],
      viewStatus= 0,
      modeList = ["play","add","edit"],
      ImageList,
      localImageList,
      showingImageList,
      queueingImageList,
      mode = 1
  ;

function init (){
  ImageList = CachableImageList();
  MainView.init();
  Detail.init();
  ImageList.initWithURLArray(PICTURES_DATA);
  showingImageList = ImageList;
  ViewConfig.init();
  CalibrateController.init();

  if(mode == 1)initForAddMode();

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
  showPage();
}

function prevPage(){
  viewStatus = 1;
  showingImageList.prev();
  showPage();
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

return {
  init:init,
  mode:getModeInt,
  viewStatus:getViewStatusInt,
  getMode:getMode,
  getViewStatus:getViewStatus,
  nextPage:nextPage,
  prevPage:prevPage,
  redraw:redraw,
  toggleConsole:toggleConsole,
  shoot:shoot,
  toggleShowingList:switchShoingList,
};
}();
