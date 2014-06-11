__DEBUG__ = false;
var Fabnavi = {
  run:function () {
    queue = new WorkQueue();
    PlayController.init(); 
    PlayController.play(PROJECT_DATA.projectName);
  },

  showProjectList:function () {
    ProjectList.load();
  },

  newProject:function (id) {
    CameraAPI.init();
    queue = new WorkQueue();
    PlayController.init(); 
    RecordController.newProject();
    Ca.addMouseEvent();
  }
};
