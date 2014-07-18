var Director = function(){

  var viewStatusList = ["Initializing","loadingImage","showing"],
      viewStatus= 0,
      pageIndex = 0,
      pageLength = 0,
      modeList = ["play","add","edit"],
      mode = 0,
      currentImage;

  function init (){
    MainView.init();
    Detail.init();
    ImageList.init();
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
    if(pageIndex < pageLength){
      pageIndex++;  
    } else {
      pageIndex = 0;
    }
    showPage();
  }

  function prevPage(){
    viewStatus = 1;
    if(pageIndex > 0) { 
      pageIndex--;  
    } else {
      pageIndex = pageLength -1;
    }
    showPage();
  }

  function showPage(){
    var deferredImage = ImageList.list()[pageIndex].loadedImg;
    deferredImage.then(function(img){
        MainView.draw(img);
        viewStatus = 2;
        currentImage = img;
    });
  }

  function redraw(){
    MainView.draw(currentImage);
    viewStatus = 2;
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
  };
  }();
