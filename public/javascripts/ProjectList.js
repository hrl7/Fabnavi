var ProjectList = {
  selectedOpIndex:0,
  init : function () {

  },

  load :function () {
    ProjectList.selectedId = "";
    var makeButtons = document.getElementsByClassName('makeButton');
    for (var i = 0; i < makeButtons.length;i++){
      makeButtons[i].onclick = function(e){ 
        ProjectList.selectedId = e.originalTarget.parentElement.id;
        ProjectList.play();
      };
    }

    var deleteButtons = document.getElementsByClassName('deleteButton');
    for (var i = 0; i < deleteButtons.length;i++){
      deleteButtons[i].onclick = function(e){
        ProjectList.selectedId = e.originalTarget.parentElement.id;

      }
    }
    var addButtons = document.getElementsByClassName('addButton');
    for (var i = 0; i < addButtons.length;i++){
      addButtons[i].onclick = function(e){
        ProjectList.selectedId = e.originalTarget.parentElement.id;
        ProjectList.add();
      }
    }

    var editButtons = document.getElementsByClassName('editButton');
    for (var i = 0; i < editButtons.length;i++){
      editButtons[i].onclick = function(e){
        ProjectList.selectedId = e.originalTarget.parentElement.id;
        ProjectList.edit();
      }
    }

    var projects = document.getElementsByTagName('li');
    for(var i = 0; i< projects.length;i++){
      projects[i].onclick = function(e){
        console.log(e.originalTarget);
        var target;
        if(e.originalTarget.tagName != "LI"){
          target = e.originalTarget.parentNode; 
        } else {
          target = e.originalTarget;
        }
        ProjectList.select(target);
      }
    }
    var newProject;
    if(newProject = document.getElementById('__newProject__')){
      newProject.onclick = function(){
        ProjectList.selectedId = "__newProject__";
        ProjectList.play();
      }
    }

    ProjectList.select($('li')[0]);
    Keys.projectListKeyBind();
  },

  select : function (target) {
    if(!target ||  target.tagName != "LI")return 0;
    $('li').removeClass('selectedItem');
    target.className = 'selectedItem';
    ProjectList.selectedId = target.id;
    ProjectList.selectOp(0);
  },

  prev : function () {
    if(ProjectList.selectedId == "")return 0;
    var s = document.getElementById(ProjectList.selectedId).previousElementSibling;
    if(s == null)return 0;
    ProjectList.select(s); 
  },

  next : function () {
    if(ProjectList.selectedId == ""){
      ProjectList.select($("li")[0]);
      return 0;
    }
    var s = document.getElementById(ProjectList.selectedId).nextElementSibling;
    if(s == null)return 0;
    ProjectList.select(s); 
  },

  up :function(){
    ProjectList.selectOp(ProjectList.selectedOpIndex - 1);
  },

  down :function(){
    ProjectList.selectOp(ProjectList.selectedOpIndex + 1);
  },

  selectOp:function(maybeIndex){
    if(!AUTHOR_NAME)return false;
    if(maybeIndex < 0){
      ProjectList.selectedOpIndex = 0;
      return false;
    } else if (maybeIndex > 3){
      ProjectList.selectedOpIndex = 3;
      return false;
    }
    var lst = document.getElementById(ProjectList.selectedId).childNodes;
    var inputIndex = 0;
    for(i in lst){
      var li = lst[i];
      if(li.tagName == "INPUT"){
        li.className = li.className.replace(/selectedOp/,"");
        if(inputIndex == maybeIndex){
          li.className += " selectedOp";
          ProjectList.selectedOpIndex = maybeIndex;
        }
        inputIndex++; 
      }
    }
  },

  fire:function(){
    var lst = ['play','edit','add','del'];
    ProjectList[lst[ProjectList.selectedOpIndex]]();
  },

  add : function () {
    if(document.getElementById(ProjectList.selectedId).getElementsByClassName('addButton').length == 0)return 0;
    ProjectList.selectOp(2);
    alert("Add photo");
    if(ProjectList.selectedId == "newProject"){
      return 0;
    }
    window.location += "add/"+ProjectList.selectedId;
  },

  play : function () {
    if(ProjectList.selectedId == "__newProject__"){
      window.location = "/new";
      return 0;
    }
    if(document.getElementById(ProjectList.selectedId).getElementsByClassName('makeButton').length == 0)return 0;
    ProjectList.selectOp(0);
    window.location += "project/"+ProjectList.selectedId;
  },

  edit : function () {
    if(document.getElementById(ProjectList.selectedId).getElementsByClassName('editButton').length == 0)return 0;
    ProjectList.selectOp(1);
    if(ProjectList.selectedId == "__newProject__"){
      window.location = "/new";
      return 0;
    }
    window.location += "edit/"+ProjectList.selectedId;
  },

  del:function(){
   var elem = document.getElementById(ProjectList.selectedId);
    if(!elem || elem.getElementsByClassName('deleteButton').length == 0)return 0;
    ProjectList.selectOp(3);
    if(confirm("are you sure to delete project :" + ProjectList.selectedId)){
      elem.remove();
      var data = ProjectList.selectedId.split('/');
      $.get("/project/delete?project_id="+data[1]+"&author="+data[0]);
    }
  }
};
