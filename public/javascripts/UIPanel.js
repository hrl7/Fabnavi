function HideableDOM(id ){
  this.id = id;
  this.elem = document.getElementById(id);
  this.hide();
}
HideableDOM.prototype = {
  hide:function(){
    this.elem.classList.remove("show");
    this.elem.classList.add("hide");
  },
  show:function(){
    this.elem.classList.remove("hide");
    this.elem.classList.add("show");
  },
  text :function(){
    return this.elem.textContent;
  },
  setText:function(str){
    this.elem.innerHTML= str;
  }
};

var UIPanel =  function () {
  var editElement,
      propertyElement,
      calibrateElement,
      mainPanel,
      informationElement,
      usageElement,

  /* Buttons  */
  zoomInBtn,
  zoomOutBtn,
  aspBtn,
  saveConfigBtn,
  isShowPanel,
  counter
  ;

function init(){
  Publisher.subscribe("Mode","Normal");

  counter = new HideableDOM("counter");
  mainPanel = new HideableDOM('panel');
  editElement = new HideableDOM('editProject');
  propertyElement = new HideableDOM('property');
  calibrateElement = new HideableDOM('calibrate');
  informationElement = new HideableDOM('info');
  usageElement = new HideableDOM('usage');

  document.getElementById('savePlaylist').onclick = function(){
  };

  document.getElementById('setThumbnail').onclick = function(){
  };

  document.getElementById('edit_tab').onclick = setEditMode;
  document.getElementById('property_tab').onclick = setNormalMode;
  document.getElementById('calibrate_tab').onclick = setCalibrateMode;

  initCalibrateButtons();

  informationElement.show();
  setInterval(function(){
      informationElement.setText(Publisher.publish());
      //    informationElement.setText(Publisher.getOneLineTopic());
      document.title = Publisher.getOneLineTopic(); 
  },500);
}

function setCalibrateMode(){
  propertyElement.hide(); 
  editElement.hide();
  calibrateElement.show();
  CalibrateController.addMouseEvent();

  Publisher.update("Mode","Calibrate");
}

function setEditMode(){
  propertyElement.hide(); 
  editElement.show();
  calibrateElement.hide();
  CalibrateController.removeMouseEvent();

  Publisher.update("Mode","Edit");
}

function setNormalMode(){
  propertyElement.show(); 
  calibrateElement.hide();
  editElement.hide();
  CalibrateController.removeMouseEvent();

  Publisher.update("Mode","Normal");
}

function hideUIPanel(){
  mainPanel.hide();
  counter.hide();
  isShowPanel = false;
}

function showUIPanel(){
  mainPanel.show();
  counter.show();
  isShowPanel = true;
}

function togglePanel(){
  if(isShowPanel) hideUIPanel();
  else showUIPanel();
}

function initCalibrateButtons(){
  zoomOutBtn = document.getElementById('zoomOut');
  zoomInBtn = document.getElementById('zoomIn');
  aspBtn = document.getElementById('aspectShift');
  saveConfigBtn = document.getElementById('save');

  saveConfigBtn.onclick = ViewConfig.save;
  zoomInBtn.onclick = CalibrateController.zoomIn;
  zoomOutBtn.onclick = CalibrateController.zoomOut;
  aspBtn.onclick = CalibrateController.toggleAspBtn;
}

function setCounterText(str){
  counter.setText(str);
}

function setInformation(str){
  informationElement.setText(str);
}

return {
  init:init,
  show:showUIPanel,
  hide:hideUIPanel,
  toggle:togglePanel,
  setCounterText:setCounterText,
  setInformation:setInformation,
};

} ();
