var KeyBind = function () {

  var keyMap = []
  ;

function setKeyMap(){
  window.onkeydown = function(e) {
    var key = e.keyCode;
    if(keyMap.hasOwnProperty(key)){
      keyMap[key]();
    } else {
      console.log(key);
    }
  }
}

function playMode(){
  clearKeyMap();
  commonKeyMap();
  setKeyMap();
}

function addMode(){
  clearKeyMap();
  keyMap[13] = Director.shoot;
  commonKeyMap();
  setKeyMap();
}

function editMode(){
  clearKeyMap();
  commonKeyMap();
  setKeyMap();
}

function commonKeyMap() {
  keyMap[39] = Director.nextPage;
  keyMap[97] = Director.nextPage;
  keyMap[37] = Director.prevPage;
  keyMap[99] = Director.prevPage;
  keyMap[68] = Director.toggleConsole;
}

function clearKeyMap(){
  keyMap = [];
}

function showKeyMap(){
  return keyMap;
}

return {
  play:playMode,
  add:addMode,
  edit:editMode,
  keyMap:showKeyMap,
};

}();
