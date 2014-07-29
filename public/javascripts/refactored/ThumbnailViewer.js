var ThumbnailViewer = function(){

  var selected = null,
      selectedLast = null,
      scroll = 0,
      thumbnailWidth = 320,
      thumbnailHeight = 240,
      scrollMinLimit = -300,
      list = [],
      lastChanged = -1,
      selected,
      _index = 0,
      root
  ;  


function init(imageList){
  list = imageList;
  root = document.getElementById("editor");
  root.onwheel = function(e){
    e.preventDefault();
    var d = e.deltaX;
    if((scroll < 500 && scroll > scrollMinLimit) || 
      (scroll > 500 && d < 0)  ||
      (scroll < scrollMinLimit && d > 0)){
      scroll += d;
      root.childNodes[0].style.transform = "translateX("+scroll+"px)";
    }
  }

  updateDocumentTree();
  scrollMinLimit = -320 * list.length;
}

function updateDocumentTree(){
  var frag = document.createDocumentFragment();
  for(var i in list){
    frag.appendChild(generateNode(i));
  }

  if(!(ul = document.getElementById("thumbnailList"))){
    var ul = document.createElement("ul");
    ul.id = "thumbnailList";
  }

  ul.appendChild(frag);
  root.appendChild(ul);
  $("#thumbnailList").sortable().disableSelection();
}

function generateNode(index){
  var node = document.createElement("li");
  var thumb = document.createElement("img");
  thumb.src = list[index].thumbnailURL || list[index].globalURL || list[index].localURL;
  thumb.width = thumbnailWidth;
  thumb.height = thumbnailHeight;
  thumb.draggable = true;
  node.appendChild(thumb);
  node.draggable = true;
//  node.className = "ui-state-default";
  //setMouseEvent(thumb);
  return node;
}

function setMouseEvent(elem){
  var deltaX = 0;
  var lastX = 0;
  var clicked = false;

  elem.onclick = function (e){
    e.preventDefault();
    clicked = true;
    var parent = e.originalTarget.parentElement;
    var index = getIndex(e.originalTarget,parent.parentElement);
    Director.setPage(index);
    select(index);
  }

  elem.onmouseup = function(e){
    e.preventDefault();
    clicked = false;
    e.originalTarget.style.transform = "translateY(0px)";
  }

  elem.onmouseenter = function(e){
   e.preventDefault();
  if(e.bubbles)return e.stopPropagation();
    e.originalTarget.style.transform = "translateY(-20px)";
  }

  elem.onmouseleave = function(e){
    e.preventDefault();
    e.originalTarget.style.transform = "translateY(0px)";
    clicked = false;
  }

  elem.onmouseout = function(e){
    e.preventDefault();
    clicked = false;
    e.originalTarget.style.transform = "translateY(0px)";
  }

  elem.onmousemove = function(e){
   e.preventDefault();
   if(e.buttons > 0){
    console.log(e.bubbles);
    deltaX += Number(e.clientX) - lastX;
    console.log(lastX,deltaX);
    e.originalTarget.style.transform = "translate("+deltaX+"px,-20px)";
   } 
     lastX = e.clientX;
  }

}

function select(index){
  var ul = document.getElementById("thumbnailList");
  if(selected)selected.className = "";
  ul.children[index].className = "selected";
  selected = ul.children[index];
  _index = index;
}

function nextPage(){
  if(list.length === 0)return _index;
  if(_index < list.length-1){
    _index++;  
  } else {
    _index = 0;
  }
  select(_index);
  return _index;
}

function prevPage(){
  if(list.length === 0)return _index;
  if(_index > 0) { 
    _index--;  
  } else {
    _index = list.length -1;
  }
  select(_index);
  return _index;
}

/** get index 
 *  @params target {HTMLElement}
 *  @params parent {HTMLElement} the parent of the target
 * @return {int}
 */
function getIndex(target,parent){
  var i = 0;
  var children = parent.childNodes;
  for(var c in children){
    if(children[c]== target.parentNode)return i;
    i++;
  }
  return -1;
}

function show(){

}

function hide(){

}

function append( obj ){
  list.push(obj);
}

function splice(startIndex,lastIndex){

}

function getList(){
  return list;
}

return {
  init:init,
  show:show,
  hide:hide,
  append:append,
  list:getList,
  next:nextPage,
  prev:prevPage,
};
}();
