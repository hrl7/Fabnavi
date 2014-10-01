var UIPanel =  function () {
  var editContents,
      propertyContents,
      calibrateContents,
      mainPanel,

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

  counter = document.getElementById("counter");

  mainPanel = document.getElementById('panel');
  editContents = document.getElementById('editProject');
  propertyContents = document.getElementById('property');
  calibrateContents = document.getElementById('calibrate');

  document.getElementById('savePlaylist').onclick = function(){
  };

  document.getElementById('setThumbnail').onclick = function(){
  };

  document.getElementById('edit_tab').onclick = setEditMode;
  document.getElementById('property_tab').onclick = setNormalMode;
  document.getElementById('calibrate_tab').onclick = setCalibrateMode;

  initCalibrateButtons();
  setCalibrateMode();

  setInterval(function(){
      document.title = Publisher.getOneLineTopic(); 
  },500);
}

function setCalibrateMode(){
  propertyContents.className = "hide"; 
  editContents.className = "hide";
  calibrateContents.className = "show";
  CalibrateController.addMouseEvent();
  Publisher.update("Mode","Calibrate");
}

function setEditMode(){
  propertyContents.className = "hide"; 
  editContents.className = "show";
  calibrateContents.className = "hide";
  CalibrateController.removeMouseEvent();
  Publisher.update("Mode","Edit");
}

function setNormalMode(){
  propertyContents.className = "show"; 
  calibrateContents.className = "hide";
  editContents.className = "hide";
  CalibrateController.removeMouseEvent();
  Publisher.update("Mode","Normal");
}

function hideUIPanel(){
  mainPanel.className = "hide";
  counter.className = "hide";
  isShowPanel = false;
}

function showUIPanel(){
  mainPanel.className = "show";
  counter.className = "show";
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
  counter.textContent = str;
}

return {
  init:init,
  show:showUIPanel,
  hide:hideUIPanel,
  toggle:togglePanel,
  setCounterText:setCounterText,
};

} ();
