var Fabnavi = {
  run:function () {
    document.getElementById('authButton').onclick = auth;
    var authData = window.location.hash;
    if(authData != "")parseAuth(authData);
    queue = new WorkQueue();
    PlayController.init(); 
    CameraAPI.init();

  },

  showProjectList:function () {

  },

  showProject:function (id) {

  }

};
