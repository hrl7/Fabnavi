var MainView = function(){
  var cvs,
      ctx,
      counter,
      currentImage = null
  ;

function init (){
  initCanvas();
}

function getCtx(){
  return ctx;
}

function getCvs(){
  return cvs;
}

function initCanvas(){
  cvs = document.getElementById('cvs');
  ctx = cvs.getContext('2d');
  cvs.width = screen.width;
  cvs.height = screen.height;
  ctx.strokeStyle = "#00ff00";
}

function drawCalibrateLine(){
  ctx.beginPath();
  ctx.moveTo(0,cvs.height/2);
  ctx.lineTo(cvs.width,cvs.height/2);
  ctx.moveTo(cvs.width/2,0);
  ctx.lineTo(cvs.width/2,cvs.height);
  ctx.stroke();
}

function drawWaitingMessage(){
 console.log("Draw Waiting Message");
  ctx.fillStyle = "green";
  ctx.font = "100px ArialRoundedMTBoldBold, serif";
  ctx.rotate(Math.PI);
  ctx.translate(-1500,-800);
  ctx.fillText("Now loading...",400,400);
  ctx.translate(1500,800);
  ctx.rotate(-Math.PI);
}

function drawShootingMessage(){
  ctx.fillStyle = "green";
  ctx.font = "100px ArialRoundedMTBoldBold, serif";
  ctx.rotate(Math.PI);
  ctx.translate(-1500,-800);
  ctx.fillText("Taking picture...",400,400);
  ctx.translate(1500,800);
  ctx.rotate(-Math.PI);
}

function draw(image){
 console.log("Draw Image");
  ImageConverter.drawImage(image,cvs,ViewConfig.conf());
  currentImage = image;
}

function redraw(){
  clear();
  if(currentImage)draw(currentImage);
}

function clear(){
  ctx.clearRect(0,0,cvs.width,cvs.height);
}

function getCurrentImage(){
  return currentImage || false;
}

function toDataURL(){
  return cvs.toDataURL();
}

function drawMessage(mes,x,y){
 x = x || 0;
 y = y || 20;
  ctx.fillStyle = "green";
  ctx.font = "100px ArialRoundedMTBoldBold, serif";
  ctx.rotate(Math.PI);
  ctx.translate(-1500,-800);
  ctx.fillText(mes,x,y);
  ctx.translate(1500,800);
  ctx.rotate(-Math.PI);
}


return {
  init:init,
  draw:draw,
  showWaitMessage:drawWaitingMessage,
  showCalibrateLine:drawCalibrateLine,
  clear:clear,
  redraw:redraw,
  showShootingMessage:drawShootingMessage,
  getCtx:getCtx,
  getCvs:getCvs,

  getCurrentImage:getCurrentImage,
  drawMessage:drawMessage,

  toDataURL : toDataURL,
};

}();
