/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with PlayConfig file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

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

function init(){
  clearKeyMap();
  keyMap[37] = ProjectList.prev;
  keyMap[97] = ProjectList.prev;
  keyMap[39] = ProjectList.next;
  keyMap[99] = ProjectList.next;
  keyMap[104] = ProjectList.up;
  keyMap[38] = ProjectList.up;
  keyMap[98] = ProjectList.down;
  keyMap[40] = ProjectList.down;
  keyMap[13] = ProjectList.enter;
  keyMap[27] = ProjectList.escape;

  setKeyMap();
}
function clearKeyMap(){
  keyMap = [];
  setKeyMap();
}

function showKeyMap(){
  return keyMap;
}

return {
 init:init,
 keyMap:showKeyMap,

};
}();
