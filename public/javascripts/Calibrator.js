/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var CalibrateController = {
  x:0,
  y:0,
  w:1000,
  h:1000,
  cx:0,
  cy:0,
  init: function(){
    document.getElementById('bwp').onclick = function(){
      CalibrateController.w += 10;
      CalibrateController.update();
    };
    document.getElementById('bwm').onclick = function(){
      CalibrateController.w -= 10;
      CalibrateController.update();
    };
    document.getElementById('bhp').onclick = function(){
      CalibrateController.h += 10;
      CalibrateController.update();
    };
    document.getElementById('bhm').onclick = function(){
      CalibrateController.h -= 10;
      CalibrateController.update();
    };
    CalibrateController.cvs = document.getElementById('cvs');
    CalibrateController.ctx = CalibrateController.cvs.getContext('2d');
    CalibrateController.image = document.getElementById('photo');
    CalibrateController.cvs.height = screen.height;
    CalibrateController.cvs.width = screen.width;
    $("#save").click(CalibrateController.saveConfig);
    CalibrateController.updatePhoto();
  },

  updatePhoto:function () {
                CalibrateController.maxWidth = CalibrateController.image.naturalWidth;
                CalibrateController.maxHeight = CalibrateController.image.naturalHeight;
                CalibrateController.cx = Math.floor(CalibrateController.maxWidth/2);
                CalibrateController.cy = Math.floor(CalibrateController.maxHeight/2);
              },

  updateConfig:function(){
                 var w = CalibrateController.w;
                 var h = CalibrateController.h;
                 if(w > CalibrateController.image.naturalWidth - CalibrateController.x){
                   w = CalibrateController.image.naturalWidth - CalibrateController.x;
                   CalibrateController.w = w;
                 }

                 if(h > CalibrateController.image.naturalHeight- CalibrateController.y){
                   h = CalibrateController.image.naturalHeight - CalibrateController.y;
                   CalibrateController.h = h;
                 }

                 CalibrateController.x = Math.abs(CalibrateController.cx - Math.floor(CalibrateController.w/2));
                 CalibrateController.y = Math.abs(CalibrateController.cy - Math.floor(CalibrateController.h/2));
                 var x = CalibrateController.x;
                 var y = CalibrateController.y;
                 CommonController.localConfig = {
                   x:x,y:y,w:w,h:h
                 };
               },

  saveConfig : function(){
                 if(CommonController.localConfig != "")CommonController.setLocalConfig(PlayConfig.projectName);
               },

  update : function(){
             console.log(CommonController.localConfig);
             console.log(CalibrateController.x,CalibrateController.y,CalibrateController.w, CalibrateController.h);

             $('#px').text = CalibrateController.x;
             $('#py').text = CalibrateController.y;
             $('#pw').text = CalibrateController.w;
             $('#ph').text = CalibrateController.h;
             CalibrateController.updateConfig();
             PlayController.show(PlayConfig.index,true);
           },

  initProject: function(id) {
                 CommonController.getLocalConfig(id);
                 if(CommonController.localConfig != ""){
                   CalibrateController.x = CommonController.localConfig.x;
                   CalibrateController.y = CommonController.localConfig.y;
                   CalibrateController.w = CommonController.localConfig.w;
                   CalibrateController.h = CommonController.localConfig.h;
                   $('#px').text = CalibrateController.x;
                   $('#py').text = CalibrateController.y;
                   $('#pw').text = CalibrateController.w;
                   $('#ph').text = CalibrateController.h;
                   CalibrateController.updatePhoto();
                 }
               }
}

