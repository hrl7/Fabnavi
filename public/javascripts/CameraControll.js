
var Camera = function() {
 var connected = false,
     heartbeat = null;

  function init () {
    if(document.sonycameracontroller == undefined){
      alert("Addon is not  installed");
      //TODO : redirect to addon install page
      window.open("https://github.com/hrl7/SonyCameraRemoteControllerAddon/blob/master/addon/sonycameraremotecontroller.xpi?raw=true");
      return false;
    }
    document.sonycameracontroller.setup({ipaddress: "10.0.0.1", port: 10000, version: "1.0"},false,true);

    heartbeat = window.setInterval(function(){
        ping().done(function(){
            connected = true;
        }).fail(function(){
            connected = false;
        });
    },5000);
    ping().done(function(){
        connected = true;
    }).fail(function(){
        connected = false;
    });
    return true;
  }

  function zoomOnce(){
    var d = $.Deferred();
    document.sonycameracontroller.zoomIn(function(res){
        setTimeout(function(){
            d.resolve();
        },700);
    });
    return d.promise();
  }

  function shoot () {
    var d = $.Deferred();
    if(connected){
      var listener = 
      function (url,res) {
        d.resolve(url);
      };
      document.sonycameracontroller.take(listener);
    } else {
      alert("Please Connect to Camera");
      d.reject();
    }
    return d.promise();
  }

  function ping(){
    var d = $.Deferred();
    try{
      var r = new XMLHttpRequest();
      var t = window.setTimeout(function(){
          r.abort();
          d.reject(false);
      },2000);
      r.onload = function(e){
        window.clearTimeout(t);
        d.resolve(true);
      };
      r.open("GET","http://10.0.0.1:10000",true);
      r.send();
    } catch(e){
    }
    return d.promise();
  }

  return {
    init:init,
    shoot:shoot,
    ping:ping,
  };
  }();
