__DEBUG__ = true;
var Fabnavi = {
  run:function () {
    queue = new WorkQueue();
    PlayController.init(); 
    CameraAPI.init();
    PlayController.play();
  },

  showProjectList:function () {
    ProjectList.load();
  },

  showProject:function (id) {

  }

};
