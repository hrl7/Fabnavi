
R = 255;
G = 255;
B = 0;
A = 1.0;
var ProjectList = {
  init : function () {

         },

  load :function () {
          ProjectList.selectedId = "";
          CommonController.getJSON("project/getList", function(result, error) {
            if (error) {
              alert(error);
              return;
            }
            var projectList = $("#projectList");
            var newProject = document.getElementById('__newProject__');
            newProject.ondblclick = function(){
              PlayConfig.fastDraw = true;
              Keys.recorderKeyBind();
              RecordController.newProject();
              PlayController.info();
            };
            for (var i = 0, n = result.length; i < n; i++) {
              var project = result[i];
              var id = project.id;
              if(project.thumbnail == null)var thumbnail = "";
              else var thumbnail = project.thumbnail;

              var image = $(document.createElement("img"));
              image.attr("src", thumbnail);
              image.addClass("thumbnail");

              var li = $(document.createElement("li"));
              li.append(image);
              li.attr("id", id);

              var updateBtn = document.createElement('input');
              updateBtn.type = "button";
              updateBtn.value = "Update";
              updateBtn.className = "editButton";

              var playBtn = document.createElement('input');
              playBtn.type = "button";
              playBtn.value = "Play";
              playBtn.className = "makeButton";

              var title = $('<div>');
              title.text(id);
              li.append(title);
              li.append(updateBtn);
              li.append(playBtn);
              projectList.append(li);
            }

            var makeButtons = document.getElementsByClassName('makeButton');
            for (var i = 0; i < makeButtons.length;i++){
              makeButtons[i].onclick = function(e){ 
                PlayConfig.fastDraw = false;
                Keys.playerKeyBind();
                PlayController.play(e.originalTarget.parentElement.id);
              };
            }

            var editButtons = document.getElementsByClassName('editButton');
            for (var i = 0; i < editButtons.length;i++){
              editButtons[i].onclick = function(e){
                PlayConfig.fastDraw = true;
                Keys.recorderKeyBind();
                PlayController.play(e.originalTarget.parentElement.id);
                PlayController.info();
              }
            }
          });
          ProjectList.select($('li')[0]);
          Keys.projectListKeyBind();
        },

  select : function (target) {
             if(target.tagName != "LI")return 0;
             $('li').removeClass('selectedItem');
             target.className = 'selectedItem';
             ProjectList.selectedId = target.id;
           },

  prev : function () {
           if(ProjectList.selectedId == "")return 0;
           var s = $('#'+ProjectList.selectedId)[0].previousElementSibling;
           if(s == null)return 0;
           ProjectList.select(s); 
         },

  next : function () {
           if(ProjectList.selectedId == ""){
             ProjectList.select($("li")[0]);
             return 0;
           }
           var s = $('#'+ProjectList.selectedId)[0].nextElementSibling;
           if(s == null)return 0;
           ProjectList.select(s); 
         },

  play : function () {
           if(ProjectList.selectedId == "")return 0;
           if(ProjectList.selectedId == "newProject"){
             return 0;
           }
           Keys.playerKeyBind();
           PlayController.play(ProjectList.selectedId);
         }
};
