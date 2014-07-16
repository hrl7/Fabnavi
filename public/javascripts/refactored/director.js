var Director = function(){

  var viewStatusList =  ["Initializing","loadingImage","showing"]
  viewStatus= 0,
  pageIndex = 0,
  pageLength = 0,
  modeList = ["Play","Add","Edit"],
  mode = 0;

  function getViewStatus (){
    return viewStatusList[viewStatus];
  }

  function getMode(){
    return modeList[mode];
  }

  function nextPage(){

  }

  function prevPage(){

  }

  function init (){
    MainView.init();
    Detail.init();
    ImageList.init();
    ViewConfig.init();

    /* Finish Initializing */
    viewStatus = 1;

    var deferredImage = ImageList.list[0].loadedImg;
    deferredImage.then(function(img){
      MainView.draw(img);
    });

  }

  return {
    init:init,
    mode:mode,
    getMode:getMode,
    getViewStatus:getViewStatus,
    s:viewStatus,

  };
}();
