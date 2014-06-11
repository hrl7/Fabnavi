__DEBUG__ = false;
var Fabnavi = {
  play:function () {
    __MODE__ = "play";
    queue = new WorkQueue();
    PlayController.init(); 
    PlayController.play(PROJECT_DATA.projectName);
  },
  update:function(){
    __MODE__ = "update";
    queue = new WorkQueue();
    PlayController.init(); 
    PlayController.play(PROJECT_DATA.projectName);
         },

  showProjectList:function () {
    ProjectList.load();
  },

  newProject:function (id) {
    __MODE__ = "new";
    CameraAPI.init();
    queue = new WorkQueue();
    PlayController.init(); 
    RecordController.newProject();
    Ca.addMouseEvent();
  }
};
