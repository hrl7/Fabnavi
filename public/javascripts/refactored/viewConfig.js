var ViewConfig = function(){
  var playModeConfig = {};
  var addModeConfig = {};

  function getViewConfig(){

  }

  function setLocalData(key,jsonData,isAddMode) {
    var data = {};
    if(isAddMode){
      data["add"] = jsonData;
      var res = CommonController.getLocalData(key);
      console.log(res);
      if(res && res.hasOwnProperty("play"))data["play"] = res.play;
    } else {
      data["play"] = jsonData;
      var res = CommonController.getLocalData(key);
      if(res && res.hasOwnProperty("add"))data["add"] = res.add;
    }
    var d = data.toSource();

    console.log(data);
    localStorage.setItem(key,d);
  }

  function getLocalData(key) {
    var data = localStorage.getItem(key);
    return eval(data);
  },

  function getLocalConfig(id) {
    var res = CommonController.getLocalData(id);
    res = res || "";
    if(__MODE__ == "play"){
      CommonController.localConfig = res.play || "";
    } else {
      CommonController.localConfig = res.add || "";
    }
  }

  function setLocalConfig(id) {
    if(CommonController.localConfig == ""){
      alert("there is no config");
      return false;
    }
    setLocalData(id,localConfig,__MODE__ != "play");
  }

  return {

  };

})();
