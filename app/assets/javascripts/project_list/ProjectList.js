var ProjectList = function() {
  var
    projects = null,
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
    select(projects[0]);
  }

  function indexOfSelectedProject() {
    for (var i = 0; i < projects.length; ++i) {
      if (projects[i].classList.contains('selected-project')) return i;
    }
    return null;
  }

  function deselect(elem) {
    elem.classList.remove('selected-project');
    closeActionMenu(elem);

    elem.classList.add('project');
  }

  function select(elem) {

    if (selected) {
      deselect(selected);
    }
    elem.classList.add('selected-project');
    elem.classList.remove('project');
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
      var dst = indexOfSelectedProject() + [-1, -4, 4, 1][dir];
      if (dst >= 0 && dst < projects.length) {
        select(projects[dst]);
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
