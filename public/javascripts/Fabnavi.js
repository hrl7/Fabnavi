__DEBUG__ = true;
var Fabnavi = {
  run:function () {
    queue = new WorkQueue();
    PlayController.init(); 
    PlayController.play();
  },

  showProjectList:function () {
    ProjectList.load();
  },


  newProject:function (id) {
    CameraAPI.init();
    queue = new WorkQueue();
    PlayController.init(); 
    RecordController.newProject();
  }
};
