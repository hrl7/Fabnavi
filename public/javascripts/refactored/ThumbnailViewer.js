var ThumbnailViewer = function(){

  var selected = null,
      selectedLast = null,
      scroll = 0,
      thumbnailWidth = 320,
      thumbnailHeight = 240,
      /** 
   * @params obj.img {Image}
   */
  list = [],
  lastChanged = -1,
  root
  ;  


function init(imageList){
  list = imageList;
  root = document.getElementById("editor");
  root.onwheel = function(e){
    e.preventDefault();
    scroll += e.deltaX;
    root.style.transform = "translateX("+scroll+"px)";
  }
  updateDocumentTree();
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
}

function generateNode(index){
  var node = document.createElement("li");
  var thumb = document.createElement("img");
  thumb.src = list[index].thumbnailURL || list[index].globalURL || list[index].localURL;
  thumb.width = thumbnailWidth;
  thumb.height = thumbnailHeight;
  node.onclick = function(e){

    Director.setPage(
      getIndex(e.originalTarget,e.originalTarget.parentElement.parentElement));
  };
  node.appendChild(thumb);
  return node;
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
};
}();
