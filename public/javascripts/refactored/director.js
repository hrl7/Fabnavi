var Director = function(){
  var viewStatusList =  ["Initializing","loadingImage","showing"]
  viewStatus= 0,
  pageIndex = 0,
  pageLength = 0;

  function init (){
    MainView.init();
    ImageList.init();

    /* Finish Initializing */
    viewStatus = 1;

  }
  return {
    init:init,

  };
}();
