var PhaseController = (function(){

  function addMode(){
    putCalibrationSheetWithShoot()
  .then(movePicture)
  .then(adjustSize)
  .then(record)
  .then(success,fail);
  }

  function editMode(){

  }

  function playMode(){
    putCalibrationSheet()
  .then(movePicture)
  .then(adjustSize)
  .then(playSlide)
  .then(success,fail);
  }

  var record = function(){
    /* 1. change imagelist
     * 2. imageuploader start
     */
    ImageUploadQueue.fire();
    Fabnavi.setNavigationImage("key_bind.png");


    var keyMap = [];
    keyMap[13] = Fabnavi.shoot;
    keyMap[88] = Fabnavi.removePage;
    keyMap[27] = Fabnavi.exit;
    Key.setKeyMap(keyMap);

    var d = new $.Deferred();
    registerCallback(function(){
      d.resolve();
    },0);
    return d.promise();
  };

  var playSlide = function(){
    Fabnavi.showFilterWithString("Project Start");
    window.setTimeout(function(){Fabnavi.hideFilter()},1000);

    var keyMap = [];
    keyMap[39] = Fabnavi.nextPage;
    keyMap[97] = Fabnavi.nextPage;
    keyMap[37] = Fabnavi.prevPage;
    keyMap[99] = Fabnavi.prevPage;
    keyMap[27] = Fabnavi.exit;
    Key.setKeyMap(keyMap);

    var d = new $.Deferred();
    registerCallback(function(){
      d.resolve();
    },[]);
    return d.promise();
  }

  var putCalibrationSheetWithShoot = function(){
    Fabnavi.setCalibrationLine(true);
    Fabnavi.setNavigationImage("move_sheet.gif");
    Fabnavi.showFilterWithString("Calibration Mode");

    var keyMap = [];
    keyMap[27] = Fabnavi.exit;
    Key.setKeyMap(keyMap);

    var d = new $.Deferred();
    registerCallback(function(){
      var res = Fabnavi.shoot();
      console.log(res);
      res.done(function(){
        beforeStageChanging();
        d.resolve();
      })
      .fail(function(){
          console.log("Connection failed retry...");
      });
    
    },13);
    return d.promise();
  }

  var putCalibrationSheet = function(){
    Fabnavi.setCalibrationLine(true);
    Fabnavi.setNavigationImage("move_sheet.gif");
    Fabnavi.setCalibrationLock(true);
    Fabnavi.showFilterWithString("Calibration Mode");

    var keyMap = [];
    keyMap[27] = Fabnavi.exit;
    Key.setKeyMap(keyMap);

    var d = new $.Deferred();
    registerCallback(function(){
      console.log("Put picture");
      beforeStageChanging();
      d.resolve();
    },32);
    return d.promise();
  }

  var movePicture = function(){
    Fabnavi.setNavigationImage("drag_image.gif");
    Fabnavi.setCalibrationLock(false);
    Fabnavi.setCalibrationLine(true);
    CalibrateController.addMouseEvent();
    Fabnavi.showFilterWithString("Calibration Mode");

    var keyMap = [], d = 10;
    keyMap[27] = Fabnavi.exit;
    keyMap[39] = CalibrateController.moveRegionCB(-d,0);
    keyMap[37] = CalibrateController.moveRegionCB(d,0);
    keyMap[38] = CalibrateController.moveRegionCB(0,-d);
    keyMap[40] = CalibrateController.moveRegionCB(0,d);
    keyMap[27] = Fabnavi.exit;
    Key.setKeyMap(keyMap);

    var d = new $.Deferred();
    registerCallback(function(){
      console.log("move Picture");
      beforeStageChanging();
      d.resolve();
    },32);
    return d.promise();
  }

  var adjustSize = function(){
    CalibrateController.removeMouseEvent();
    Fabnavi.setNavigationImage("adjust_asp.gif");
    Fabnavi.showFilterWithString("Calibration Mode");

    var keyMap = [],d = 10;
    keyMap[39] = CalibrateController.changeRegionCB(-d,0);
    keyMap[37] = CalibrateController.changeRegionCB(d,0);
    keyMap[38] = CalibrateController.changeRegionCB(0,-d);
    keyMap[40] = CalibrateController.changeRegionCB(0,d);
    keyMap[27] = Fabnavi.exit;
    Key.setKeyMap(keyMap);

    var d = new $.Deferred();
    registerCallback(function(){
      console.log("adjustSize");
      beforeStageChanging();
      ViewConfig.save();
      d.resolve();
    }, 32);
    return d.promise();
  }

  function beforeStageChanging(){
    Fabnavi.setCalibrationLine(false);
    Fabnavi.setCalibrationLock(false);
    Fabnavi.setNavigationImage("");
    CalibrateController.removeMouseEvent();
    Fabnavi.hideFilter();
    Key.clear();
  }

  function success(){
    console.log("SUCCESS");
    deregister();
  }

  function fail(err){
    console.log(err.toSource());
    deregister();
    throw new Error(err);
  }

  function registerCallback(fn,keys){
    Key.clearTrigger();
    Key.register(fn,keys);
  }

  function deregister(){
    Key.deregister();
  }

  return {
    addMode:addMode,
    editMode:editMode,
    playMode:playMode,
  };

})();
