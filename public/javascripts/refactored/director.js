var Director = function(){

  var viewStatusList = ["Initializing","loadingImage","showing"],
      viewStatus= 0,
      pageIndex = 0,
      pageLength = 0,
      modeList = ["play","add","edit"],
      ImageList,
      localImageList,
      mode = 1
  ;

function init (){
  ImageList = CachableImageList();
  MainView.init();
  Detail.init();
  ImageList.initWithURLArray(PICTURES_DATA);
  ViewConfig.init();
  CalibrateController.init();

  UIPanel.init();

  KeyBind[modeList[mode]]();

  /*   TODO : branch process with mode */
  pageLength = PICTURES_DATA.length;

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
 console.log(ImageList.length());
  if(pageLength == 0)return false;
  viewStatus = 1;
  if(pageIndex < pageLength-1){
    pageIndex++;  
  } else {
    pageIndex = 0;
  }
  showPage();
}

function prevPage(){
  if(pageLength == 0)return false;
  viewStatus = 1;
  if(pageIndex > 0) { 
    pageIndex--;  
  } else {
    pageIndex = pageLength -1;
  }
  showPage();
}

function showPage(){
  if(pageLength == 0)return false;
  var deferredImage = ImageList.list()[pageIndex].loadedImg;
  MainView.showWaitMessage();
  deferredImage.then(function(img){
      MainView.draw(img);
      viewStatus = 2;
  });
}

function redraw(){
  MainView.redraw();
  viewStatus = 2;
}

function toggleConsole(){
  UIPanel.toggle();
}

/* recorder interface */
function initForAddMode(){
  localImageList = CachableImageList();
}

function shoot(){
  console.log("shoot");
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
};
}();
