var ProjectList =  function(){
  var
    projects = null,
    selected = null
  ;
  function init(){
    load();
    KeyBind.init();
  }

  function load(){
    projects = document.getElementsByClassName('project-box');
    for(var i = 0;i<projects.length;++i){
      projects[i].onclick = function(e){
        selectRec(e.target);
      }
    }
  }

  function indexOfSelectedProject(){
      for(var i=0;i<projects.length;++i){
        if(projects[i].classList.contains('selected-project')) return i;
      }
      return null;
  }

  function deselect(elem){
    elem.classList.remove('selected-project');
    elem.classList.add('project');
  }

  function select(elem){

    if(selected){
      deselect(selected);
    }
    elem.classList.add('selected-project');
    elem.classList.remove('project');
    selected = elem;
  }

  function selectRec(elem){
    if(elem.classList.contains('project')){
      select(elem);
    } else if(elem.nodeName == "BODY"){
      // invalid select;
      return 0;
    } else {
      selectRec(elem.parentElement);
    }
  }

  function h(){
    move_projects(0);
  }

  function j(){
    move_projects(1);
  }

  function k(){
    move_projects(2);
  }

  function l(){
    move_projects(3);
  }

  /* 0 : <-, 1: ^, 2: v , 3: -> */
  function move_projects(dir){
    var dst = indexOfSelectedProject() + [-1,-4,4,1][dir];
    if(dst >= 0 && dst < projects.length){
      select(projects[dst]);
    }
  }

  function fire(){

  }

  return {
    init:init,
    prev:h,
    next:l,
    fire:fire,
    up:j,
    down:k
  }
  }();
