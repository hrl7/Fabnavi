var ThumbnailViewer = function(){

  var selected = null,
      selectedLast = null,
      scroll = 0,
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
  updateDocumentTree();
}

function updateDocumentTree(){
  var frag = document.createDocumentFragment();
  console.log(list);
  for(var i in list){
   console.log(i);
//    frag.appendChild(generateNode(i));
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
  thumb.src = list[index].thumbnailURL;
  node.appendChild(thumb);
  return node;
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
