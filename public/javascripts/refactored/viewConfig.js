var ViewConfig = function(){
  var playModeConfig = {},
      addModeConfig = {},
      _conf = {},
      isConfigChanged = false
  ;

function init(){
  getLocalConfig();
}

function setLocalData(key,jsonData) {
  var data = {};
  if(Director.mode() == 0){
    data["play"] = jsonData;
    var res = getLocalData(key);
    if(res && res.hasOwnProperty("add"))data["add"] = res.add;
  } else {
    data["add"] = jsonData;
    var res = getLocalData(key);
    if(res && res.hasOwnProperty("play"))data["play"] = res.play;
    var d = data.toSource();
    localStorage.setItem(key,d);
  }
}

function getLocalData(key) {
  var data = localStorage.getItem(key);
  return eval(data);
}

function getLocalConfig() {
  var id = Detail.projectName();
  var res = getLocalData(id);
  res = res || "";

  if(Director.mode() == 0){
    _conf = res.play || "";
  } else {
    _conf = res.add || "";
  }
}

function setLocalConfig(id) {
  if(_conf == ""){
    alert("there is no config");
    return false;
  }
  setLocalData(id,_conf);
}

function getConfig(){
  return _conf;
}

function saveConfig(){
  setLocalConfig(Detail.projectName());
}

function setConfig(conf){
  _conf = conf;
}

return {
  init : init,
  conf:getConfig,
  setConf:setConfig,
  save:saveConfig,
};

}();
