var Key = function () {

  var keyMap = [],
      trigger = [],
      triggeredPromise = null
        ;

  function setKeyMap(){
    window.onkeydown = function(e) {
      if(!(e.altKey || e.metaKey) ){
        e.preventDefault();
      }
      var key = e.keyCode,
          i = 0
            ;

      if(trigger.hasOwnProperty(key) && trigger[key] != null){
        trigger[key]();
      } else if(keyMap.hasOwnProperty(key)){
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
    commonKeyMap();
    keyMap[13] = Fabnavi.shoot;
    keyMap[69] = Fabnavi.toggleEditor;
    keyMap[88] = Fabnavi.removePage;
    keyMap[84] = Fabnavi.setThumbnail;
    //keyMap[83] = Server.postPlaylist;
    setKeyMap();
  }

  function editMode(){
    clearKeyMap();
    commonKeyMap();
    keyMap[69] = Fabnavi.toggleEditor;
    keyMap[88] = Fabnavi.removePage;
    keyMap[84] = Fabnavi.setThumbnail;
    //keyMap[83] = Server.postPlaylist;
    setKeyMap();
  }

  function commonKeyMap() {
    keyMap[39] = Fabnavi.nextPage;
    keyMap[97] = Fabnavi.nextPage;
    keyMap[37] = Fabnavi.prevPage;
    keyMap[99] = Fabnavi.prevPage;
    keyMap[68] = Fabnavi.toggleConsole;
    keyMap[67] = ViewConfig.save;
    keyMap[27] = Fabnavi.exit;
  }

  function clearKeyMap(){
    keyMap = [];
  }

  function showKeyMap(){
    return [keyMap,trigger];
  }

  function register(promise, keys){
    trigger[keys] = promise;
  }
  function clearRegisteredTrigger(){
    trigger = [];
  }

  function deregister(keys){
    trigger[keys] = null;
  }


  function setKeyMapWithArray(map){
    clearKeyMap();
    keyMap = map;
    setKeyMap();
  }
  setKeyMap();


  return {
    setKeyMap:setKeyMapWithArray,

      register:register,
      deregister:deregister,
      play:playMode,
      add:addMode,
      edit:editMode,
      clear:clearKeyMap,
      keyMap:showKeyMap,
      mode:"Project",
      clearTrigger:clearRegisteredTrigger
  };
}();
