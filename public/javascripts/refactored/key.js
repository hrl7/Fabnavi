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
  keyMap[39] = Director.nextPage;
  keyMap[97] = Director.nextPage;
  keyMap[37] = Director.prevPage;
  keyMap[99] = Director.prevPage;
  keyMap[68] = UIPanel.toggle;
  setKeyMap();
}

function addMode(){

}

function editMode(){

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
