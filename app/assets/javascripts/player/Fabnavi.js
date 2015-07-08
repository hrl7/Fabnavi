var Fabnavi = function(){
  window.onwheel = function(e){e.preventDefault();};

  var viewStatusList = ["Initializing","loadingImage","showing"],
      viewStatus= 0,
      modeList = ["play","add","edit"],
      _calibrationLock = true,
      _showCalibrationLine = false,
      globalImageList,
      localImageList,
      showingImageList,
      queueingImageList,
      mode = null,
      counter,
      navigator,
      filter
        ;

  function init (_mode){
    mode = modeList.indexOf(_mode);
    if(mode == -1){
      new Error("mode is invalid");
    }

    /* Before */
    globalImageList = CachableImageList();
    MainView.init();
    Detail.init();
    globalImageList.initWithURLArray(PICTURES_DATA);
    showingImageList = globalImageList;
    queueingImageList = localImageList;
    ViewConfig.init();
    CalibrateController.init();
    Meter.init();

    navigator = document.getElementById('navigation-image');
    filter = document.querySelector('.filter');

    /*  Initialize each Mode   */
    switch(mode){
      case 0:
        setGlobalImageVisible();
        PhaseController.playMode();
        break;
      case 1:
        Camera.init();
        localImageList = CachableImageList();
        localImageList.initEditor();
        setLocalImageVisible();

        if(PICTURES_DATA.length == 0){
          showingImageList.initWithURLArray([]);
          setCropMode();
        } else {
          setAddMode();
        }

        PhaseController.addMode();
        break;
      case 2:
        showingImageList.initEditor();

        PhaseController.editMode();
        break;
      default:
        break
    }

    /*  After   */
    //    KeyBind[modeList[mode]]();

    /* Finish Initializing */
    viewStatus = 1;
    showPage();
  }

  function setNavigationImage(url){
    if(url != ""){
      navigator.style.display = "block";
      navigator.src = "/images/" + url;
    } else {
      navigator.style.display = "none";
    }
  }

  function showFilterWithString( message ){
    filter.style.display = "block";
    var text = filter.querySelector("div");
     text.textContent = message;
     text.style.display = "block";
  }

  function hideFilter(){
    filter.style.display = "none";
    var text = filter.querySelector("div");
     text.textContent = "";
     text.style.display = "none";
  }

  function showAlert(){
    $('.exit-alert').show();
    var d = $.Deferred();

    Key.register(function(){
      d.resolve();
    },13);

    Key.register(function(){
      d.reject();
    },27);
    return d.promise();
  }

  function hideAlert(){
   console.log("hiding alert");
    Key.deregister(13);
    Key.deregister(27);
    document.querySelector('.exit-alert').style.display = "none";
  }

  function setCalibrateMode(){
    setCalibrationLock(false);
    setGlobalImageVisible();
    CalibrateController.addMouseEvent();
  }

  function setCropMode(){
    setCalibrationLock(false);

    setLocalImageVisible();
    MainView.showCalibrateLine();
  }

  function setAddMode(){
    setCalibrationLock(true);

    setGlobalImageVisible();
    CalibrateController.removeMouseEvent();
  }

  function setPlayMode(){
    setCalibrationLock(true);

    setGlobalImageVisible();
    CalibrateController.removeMouseEvent();
  }

  function setCalibrationLine(show){
    _showCalibrationLine = show;
    redraw();
  }

  function getCalibrateLock(){
    return _setCalibrationLock;
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

  function setPage(i){
    if(showingImageList.setPage(i) !== false){
      viewStatus = 1;
      showPage();
    }
  }

  function setCalibrationLock(isLock){
    _setCalibrationLock = isLock;
  }
  function reloadPage(){
    setPage(showingImageList.index());
  }

  function showPage(){

    Meter.set(showingImageList.index  () + 1, showingImageList.maxLength());

    var deferredImage;
    if(deferredImage = showingImageList.getDeferredImage()){
      MainView.clear();
      MainView.showWaitMessage();
      deferredImage.then(function(img){
        MainView.clear();
        console.log(img);
        MainView.draw(img);
        viewStatus = 2;
        afterShowing();
      });
    }
  }

  function afterShowing(){
    if(_showCalibrationLine){
      MainView.showCalibrateLine();
    }
  }

  function redraw(){
    viewStatus = 1;
    MainView.redraw();
    viewStatus = 2;
    if(_showCalibrationLine)MainView.showCalibrateLine();
  }

  function toggleEditor() {
    showingImageList.toggleEditor();
  }

  /* recorder interface */
  function setLocalImageVisible(){
    showingImageList = localImageList;
  }

  function setGlobalImageVisible(){
    showingImageList = globalImageList;
  }
  function testShoot(){
    MainView.clear();
    MainView.drawMessage("This is Test Image",0,100);
    MainView.drawMessage(PROJECT_DATA.project_name,0,200);
    MainView.drawMessage("User id: "+PROJECT_DATA.user_id,0,300);
    MainView.drawMessage(Date(),0,400);
    var img = document.createElement("img");
    img.src = MainView.toDataURL();
    showingImageList.hideEditor();
    setNavigationImage("");
    redraw();
    var res = showingImageList.pushImage({testImg:img} ,showingImageList.index());
    nextPage();
    setNavigationImage("key_bind.png");
    ImageUploadQueue.push(res);
  }

  function shoot(){
    Camera.ping().done(function(){
      MainView.clear();
      showingImageList.hideEditor();
      setNavigationImage("");
      Camera.shoot().then(function(url){
        redraw();
        var res = showingImageList.push(url,showingImageList.index());
        nextPage();
        setNavigationImage("key_bind.png");
        ImageUploadQueue.push(res);
      });
      }).fail(function(){
      alert("Please Connect to Camera");
    });
  }

  function getShowingImageList(){
    return showingImageList;
  }

  function updateShowingImageList(a){
    showingImageList.updateListWithURLArray(a);
  }

  function setThumbnail(){
    Server.setThumbnail(showingImageList.index());
  }

  function removePage(){
    if(showingImageList.length() >1){
      showingImageList.remove(showingImageList.index());
      reloadPage();
    }
  }

  function exitProject(){
    showAlert().then(function(){
      console.log("Exit phase");
      setTimeout(function(){
        window.location.pathname = "/";
      },10);
    },function(){
     console.log("rejected");
     hideAlert();
    });
  }

  function play(){
    Fabnavi.init("play");
  }

  function add(){
    Fabnavi.init("add");
  }

  function edit(){
    Fabnavi.init("edit");
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
    shoot:shoot,
    testShoot:testShoot,

    toggleEditor:toggleEditor,
    setThumbnail:setThumbnail,

    list:getShowingImageList,
    updateShowingImageList:updateShowingImageList,
    removePage:removePage,
    reloadPage:reloadPage,
    exit:exitProject,
    isCalibrationLocked:getCalibrateLock,
    setCalibrationLock:setCalibrationLock,
    setCalibrationLine:setCalibrationLine,

    setCalibrateMode:setCalibrateMode,
    setPlayMode:setPlayMode,
    setCropMode:setCropMode,
    setAddMode:setAddMode,

    play:play,
    add:add,
    edit:edit,

    setGlobalImageVisible:setGlobalImageVisible,
    setLocalImageVisible:setLocalImageVisible,
    setNavigationImage:setNavigationImage,

    showFilterWithString:showFilterWithString,
    hideFilter : hideFilter,
  };
}();
