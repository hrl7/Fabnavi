var ProjectList = function() {
  var
    projects = null,
             navActions = null,
             selected = null,
             actions = null
               selectedAction = null,
             depth = 0,
             filter = null

               ;

  function init() {
    load();
    KeyBind.init();
  }

  function load() {
    projects = document.getElementsByClassName('project-box');
    navActions = document.getElementsByClassName('menu-action');
    deletes = document.getElementsByClassName('delete');
    filter = document.querySelector('.filter');
    for (var i = 0; i < projects.length; ++i) {
      projects[i].onclick = function(e) {
       console.log("clicked");
        e.stopPropagation();
        if(selected){
          var last = selected;
          selectRec(e.target);
          if(selected == last) {
            openLightBox(selected);
            deeper();
          }
        }
        selectRec(e.target);
      }
    }
    if(projects.length > 0){
      select(projects[0]);
    }
    for(var i=0; i < deletes.length; ++i){
      deletes[i].onclick = function(e){
        e.stopPropagation();
        e.preventDefault();
        if(confirm("Are you sure to delete?")){
          var t = null;
          if(e.target.nodeName == "LI"){
            t = e.target.children[1]; 
          } else {
            t = e.target;
          }
          var url = t.attributes.getNamedItem("href").value;
          $.ajax({url:url,method:"DELETE"}).done(
              function(res){
            for(var i=0;i<projects.length;i++){
              if(projects[i].attributes.getNamedItem("data").value == res.id){
                var target = projects[i];
                $(target).fadeOut(200,function(){
                  target.remove();
                });
              }
            }
              });
        }
      }
    }
  }

  function indexOfSelectedProject() {
    for (var i = 0; i < projects.length; ++i) {
      if (projects[i].classList.contains('selected-project')) return i;
    }
    for (var i = 0; i < navActions.length; ++i) {
      if (navActions[i].classList.contains('selected-nav-action')) return i-6;
    }
    return null;
  }

  function deselect(elem) {
    if(elem.classList.contains('project-box')){
      elem.classList.remove('selected-project');
      closeActionMenu(elem);

      elem.classList.add('project');
    } else if(elem.classList.contains('menu-action')){
      elem.classList.remove('selected-nav-action');
      elem.classList.add('nav-action');
    }
  }

  function select(elem) {

    if (selected) {
      deselect(selected);
    }
    if(elem.classList.contains('project-box')){
      elem.classList.add('selected-project');
      elem.classList.remove('project');
    } else if(elem.classList.contains('menu-action')){
      elem.classList.add('selected-nav-action');
      elem.classList.remove('nav-action');
    }
    if(elem.classList.contains('search-bar')){
      KeyBind.allowInput();
      document.querySelector('#search-box').focus();
    } else {
      KeyBind.denyInput();
      document.querySelector('#search-box').blur();
    }
    selected = elem;
    scrollTo(elem);
  }

  function scrollTo(target){
    if(window.scrollY > target.offsetTop || window.scrollY < target.offsetTop + target.clientHeight){
      if (target) {
        $('html,body').animate({scrollTop: target.offsetTop - 100},400);
      }
    }
  }

  function selectRec(elem) {
    if (elem.classList.contains('project')) {
      select(elem);
    } else if (elem.nodeName == "BODY") {
      // invalid select;
      return 0;
    } else {
      selectRec(elem.parentElement);
    }
  }

  function h() {
    move_projects(0);
  }

  function j() {
    move_projects(1);
  }

  function k() {
    move_projects(2);
  }

  function l() {
    move_projects(3);
  }

  /* 0 : <-, 1: ^, 2: v , 3: -> */
  function move_projects(dir) {
    if (depth == 0) { //move around and select project
      var dst = indexOfSelectedProject();
      if(dst <= 3 && dst >= 0){// project first row
       switch (dir){
        case 0:
          dst += -1;
         break;
        case 1:
         dst = -1;
         break;
         case 2:
          dst += 4;
          break;
         case 3:
          dst += 1;
          break;
       }
      } else if (dst > 0){ // project other row
        dst += [-1, -4, 4, 1][dir];
      } else if (dst == -1){ //search
       switch(dir){
        case 0:
         break;
        case 1:
         dst = -6;
         break;
         case 2:
         dst = 3;
          break;
         case 3:
          break;
       }
      } else { // action row
       switch (dir){
        case 0:
          dst += -1;
         break;
        case 1:
         break;
         case 2:
          dst = -1;
          break;
         case 3:
          dst += 1;
          break;
       }
      }

      if (dst >= 0 && dst < projects.length) {
        select(projects[dst]);
      } else if( dst < 0 && dst >= -6 ){
        select(navActions[dst + 6]);
      }
    } else { // select action phase
      if (dir == 1 || dir == 2) {
        moveAction(dir - 1);
      }
    }
    console.log("depth: "+depth+", dst: "+dst+", dir: "+dir+", actions: "+actions);
  }

  function indexOfSelectedAction() {
    for (var i = 0; i < actions.length; ++i) {
      if (actions[i].classList.contains('selected-action')) return i;
    }
    return null;
  }

  function moveAction(dir) {
    var dst = indexOfSelectedAction() + [-1, 1][dir];
    if (dst >= 0 && dst < actions.length) {
      selectAction(actions[dst]);
    }
  }

  function deselectAction(elem) {
    elem.classList.remove('selected-action');
    elem.classList.add('action');
  }

  function selectAction(elem) {
    if (selectedAction) {
      deselectAction(selectedAction);
    }
    elem.classList.add('selected-action');
    elem.classList.remove('action');
    selectedAction = elem;
  }

  function deeper() {
    if (depth == 1) fire();
    if (selected.classList.contains("menu-action")) fireNavAction();
    else {
      openActionMenu(selected);
    }
  }

  function shallower() {
    if (depth == 1) {
      closeActionMenu(selected);
    }
  }

  function closeActionMenu(elem) {
    elem.getElementsByClassName('actions')[0].classList.add('hide');
    actions = null;
    depth = 0;
  }

  function openLightBox(elem){
   try{
     var projectData = JSON.parse(elem.attributes.getNamedItem('raw').value);   
    filter.querySelector('.box-title').textContent = projectData.project_name;
    filter.querySelector('.box-close').onclick = closeLightBox;
    filter.querySelector('.box-img').src = projectData.thumbnail_url;
    filter.querySelector('.box-desc').textContent = projectData.description;
    filter.classList.remove('hide');
   } catch (e){
    console.log(e);
    filter.classList.add('hide');
   }
  }

  function closeLightBox(){
    filter.classList.add('hide');
  }

  function openActionMenu(elem) {
    actions = elem.getElementsByClassName('action-box');
    var actsElem = elem.getElementsByClassName('actions')[0];
    for(var i = 0; i < actsElem.length; i++){
      actsElem[i].onclick = function(e){
        e.stopPropagation();
        return false;
      }
    }
    actsElem.classList.remove('hide');
    selectAction(actsElem.children[0]);
    depth = 1;
  }
  function fireNavAction(){
    selected.click();
  }

  function fire(){
    selectedAction.children[1].click();
  }

  return {
    init: init,
    prev: h,
    next: l,
    up: j,
    down: k,
    enter: deeper,
    escape: shallower,
    all : function(){return projects;},
    open : openLightBox,
    close: closeLightBox,
  }
}();
