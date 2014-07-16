var ViewConfig = function(){
  var playModeConfig = {};
  var addModeConfig = {};
  var conf = {};

  function init(){
    getLocalConfig();
  }

  function setLocalData(key,jsonData,isAddMode) {
    var data = {};
    if(isAddMode){
      data["add"] = jsonData;
      var res = getLocalData(key);
      if(res && res.hasOwnProperty("play"))data["play"] = res.play;
    } else {
      data["play"] = jsonData;
      var res = getLocalData(key);
      if(res && res.hasOwnProperty("add"))data["add"] = res.add;
    }
    var d = data.toSource();
    localStorage.setItem(key,d);
  }

  function getLocalData(key) {
    var data = localStorage.getItem(key);
    return eval(data);
  }

  function getLocalConfig() {
   var id = Detail.projectName();
    var res = getLocalData(id);
    res = res || "";
    if(Director.mode == 0){
      conf = res.play || "";
    } else {
      conf = res.add || "";
    }
  }

  function setLocalConfig(id) {
    if(conf == ""){
      alert("there is no config");
      return false;
    }
    setLocalData(id,localConfig,Director.mode != 0);
  }

  function getConfig(){
    return conf;
  }

  return {
   init : init,
   conf:getConfig,
  };

}();
