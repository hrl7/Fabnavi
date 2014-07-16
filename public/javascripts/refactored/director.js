var Director = function(){

  var viewStatusList =  ["Initializing","loadingImage","showing"]
  viewStatus= 0,
  pageIndex = 0,
  pageLength = 0,
  modeList = ["play","add","edit"],
  mode = 0;

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
    var deferredImage = ImageList.list[pageIndex].loadedImg;
    deferredImage.then(function(img){
        MainView.draw(img);
        viewStatus = 2;
    });
  }

  function init (){
    MainView.init();
    Detail.init();
    ImageList.init();
    ViewConfig.init();
    KeyBind[modeList[mode]]();

    /*   TODO : branch process with mode */
    pageLength = PICTURES_DATA.length;  

    /* Finish Initializing */
    viewStatus = 1;
    showPage();


  }

  return {
    init:init,
    mode:mode,
    getMode:getMode,
    getViewStatus:getViewStatus,
    nextPage:nextPage,
    prevPage:prevPage,
  };
  }();
