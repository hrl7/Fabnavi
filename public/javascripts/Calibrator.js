/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var Ca = {
  x:0,
  y:0,
  w:1000,
  h:1000,
  cx:0,
  cy:0,
  lx:0,
  ly:0,
  drag:false,
  zi:false,
  zo:false,
  zoomIn :function () {
    Ca.w -= 1;
    Ca.h -= 1;
    Ca.update();
  },
  zoomOut:function () {
            Ca.w += 1;
            Ca.h += 1;
            Ca.update();
          },
  init: function(){
          var zoomInBtn = document.getElementById('zoomOut');
          var zoomOutBtn = document.getElementById('zoomIn');
          zoomInBtn.onmousedown = function(){
            Ca.zi = true;
          };
          zoomInBtn.onmouseup= function(){
            Ca.zi = false;
          };
          zoomInBtn.onmouseleave= function(){
            Ca.zi = false;
          };
          zoomOutBtn.onmousedown= function(){
            Ca.zo = true;
          };
          zoomOutBtn.onmouseup= function(){
            Ca.zo = false;
          };
          zoomOutBtn.onmouseleave= function(){
            Ca.zo = false;
          };

          setInterval(function(){
            if(Ca.zi)Ca.zoomIn();
            if(Ca.zo)Ca.zoomOut();
          },50);
          var cvs = document.getElementById('cvs');
          cvs.onmousedown = function (e) {
            Ca.drag = true;
            Ca.lx = e.clientX;
            Ca.ly = e.clientY;
          };
          cvs.onmouseup = function (e){
            Ca.drag = false;
          };
          cvs.onmousemove= function (e){
            if(Ca.drag){
              Ca.cx -= Ca.lx - e.clientX;
              Ca.cy += e.clientY - Ca.ly; 
              Ca.lx =  e.clientX;
              Ca.ly =  e.clientY;
              Ca.update();
            }
          };
          Ca.cvs = document.getElementById('cvs');
          Ca.ctx = Ca.cvs.getContext('2d');
          Ca.image = document.getElementById('photo');
          Ca.cvs.height = screen.height;
          Ca.cvs.width = screen.width;
          $("#save").click(Ca.saveConfig);
          Ca.updatePhoto();
        },

  updatePhoto:function () {
                Ca.cx = Math.floor(Ca.w/2) + Ca.x;
                Ca.cy = Math.floor(Ca.h/2) + Ca.y;
              },

  updateConfig:function(){
                 Ca.x = Ca.cx - Math.floor(Ca.w/2);
                 Ca.y = Ca.cy - Math.floor(Ca.h/2);
                 CommonController.localConfig = {
                   x:Ca.x,y:Ca.y,w:Ca.w,h:Ca.h
                 };
               },

  saveConfig : function(){
                 if(CommonController.localConfig != "")CommonController.setLocalConfig(PlayConfig.projectName);
               },

  update : function(){
             Ca.updateConfig();
             PlayController.show(PlayConfig.index,true);
           },

  initProject: function(id) {
                 CommonController.getLocalConfig(id);
                 if(CommonController.localConfig != ""){
                   Ca.x = CommonController.localConfig.x;
                   Ca.y = CommonController.localConfig.y;
                   Ca.w = CommonController.localConfig.w;
                   Ca.h = CommonController.localConfig.h;
                 }
               }
}

