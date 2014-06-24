var ProjectList = {
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
              if(confirm("are you sure to delete project :" + ProjectList.selectedId)){
                e.originalTarget.parentElement.remove();
                var data = ProjectList.selectedId.split('/');
                $.get("/project/delete?project_id="+data[1]+"&author="+data[0]);
              }

            }
          }
          var editButtons = document.getElementsByClassName('editButton');
          for (var i = 0; i < editButtons.length;i++){
            editButtons[i].onclick = function(e){
              ProjectList.selectedId = e.originalTarget.parentElement.id;
              ProjectList.update();
            }
          }
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

  update : function () {
             if(ProjectList.selectedId == "")return 0;
             alert("update");
             if(ProjectList.selectedId == "newProject"){
               return 0;
             }
             window.location += "update/"+ProjectList.selectedId;
           },
  play : function () {
           if(ProjectList.selectedId == "")return 0;
           if(ProjectList.selectedId == "newProject"){
             return 0;
           }
           window.location += "project/"+ProjectList.selectedId;
         }
};
