var images= [];
var Uploader = (function(){
  var 
  photo,
    thumbnail,
    preview,
    cvs,
    ctx
  ;
function init(){
  photo = document.querySelector("#photo_file");
  thumbnail = document.querySelector("#photo_thumbnail");
  preview = document.querySelector("#preview");
  cvs = document.querySelector("#cvs");
  cvs.width = "200";
  cvs.height= "200";
  ctx = cvs.getContext("2d");
  photo.onchange = function(){handleFile(this.files)};
  thumbnail.onchange = function(){handleFile(this.files)};
}

function handleFile(files){
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    if (!file.type.match(imageType)) {
      continue;
    }

    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;

    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) {
      aImg.src = e.target.result; 
      aImg.onload = function(){
        images.push(img);
        ctx.drawImage(aImg,0,0,100,100);
        sendImage(img);
      }
    }; })(img);
    reader.readAsDataURL(file);
  }
}


function sendImage(img){
  var _cvs = document.createElement('canvas');
  var _ctx = _cvs.getContext('2d');
  _ctx.drawImage(img,0,0,1500,900);
  _cvs.toBlob(function(file){
    _ctx.drawImage(img,0,0,100,100);
    _cvs.toBlob(function(thumbnail){
     Server.postPhoto(file,thumbnail, $('#photo_project_id').val(),$('#photo_order_in_project').val());
    });
  });
}
return {
  init:init,
};
})();

window.onload = Uploader.init;
