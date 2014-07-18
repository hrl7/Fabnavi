var UIPanel =  function () {
  var editContents,
      propertyContents,
      calibrateContents,
      mainPanel,
      zoomInBtn,
      zoomOutBtn,
      aspBtn,
      isShowPanel;

  function init(){
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
    setEditMode();
  }

  function setCalibrateMode(){
      propertyContents.className = "hide"; 
      editContents.className = "hide";
      calibrateContents.className = "show";
  }

  function setEditMode(){
      propertyContents.className = "hide"; 
      editContents.className = "show";
      calibrateContents.className = "hide";
  }

  function setNormalMode(){
      propertyContents.className = "show"; 
      calibrateContents.className = "hide";
      editContents.className = "hide";
  }

  function hideUIPanel(){
    mainPanel.className = "hide";
    isShowPanel = false;
  }

  function showUIPanel(){
    mainPanel.className = "show";
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
    aspBtn.onclick = CalibrateController.toggleAspBtn;
  }

  return {
    init:init,
    show:showUIPanel,
    hide:hideUIPanel,
    toggle:togglePanel,
  };

  } ();
