var ProjectList = function() {
  var
    projects = null,
    navActions = null,
             selected = null,
             actions = null
               selectedAction = null,
             depth = 0

               ;

  function init() {
    load();
    KeyBind.init();
  }

  function load() {
    projects = document.getElementsByClassName('project-box');
    navActions = document.getElementsByClassName('menu-action');
    for (var i = 0; i < projects.length; ++i) {
      projects[i].onclick = function(e) {
        if(selected){
          var last = selected;
          selectRec(e.target);
          if(selected == last) {
            deeper();
          }
        }
        selectRec(e.target);
      }
    }
    if(projects.length > 0){
      select(projects[0]);
    }
  }

  function indexOfSelectedProject() {
    for (var i = 0; i < projects.length; ++i) {
      if (projects[i].classList.contains('selected-project')) return i;
    }
    for (var i = 0; i < navActions.length; ++i) {
      if (navActions[i].classList.contains('selected-nav-action')) return i-5;
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
    selected = elem;
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
      if(dst <= 3 && dst >= 0){
         dst += [-1, -5, 4, 1][dir];
      } else if (dst > 0){
         dst += [-1, -4, 4, 1][dir];
      } else {
         dst += [-1, 0, 5, 1][dir];
      }
      if (dst >= 0 && dst < projects.length) {
        select(projects[dst]);
      } else if( dst < 0 && dst >= -5 ){
        select(navActions[dst + 5]);
      }
    } else { // select action phase
      if (dir == 1 || dir == 2) {
        moveAction(dir - 1);
      }
    }
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
    openActionMenu(selected);
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

  function openActionMenu(elem) {
    actions = elem.getElementsByClassName('action-box');
    var actsElem = elem.getElementsByClassName('actions')[0];
    for(var i = 0; i < actsElem.length; i++){
      actsElem[i].onclick = function(e){
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
    selectedAction.children[0].click();
  }

  return {
    init: init,
    prev: h,
    next: l,
    up: j,
    down: k,
    enter: deeper,
    escape: shallower,
  }
}();
