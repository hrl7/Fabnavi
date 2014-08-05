
var Camera = function() {

  function init () {
    if(document.sonycameracontroller == undefined){
      alert("Addon is not  installed");
      //TODO : redirect to addon install page
      return false;
    }
    document.sonycameracontroller.setup({ipaddress: "10.0.0.1", port: 10000, version: "1.0"},false,true);
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
    var listener = 
    function (url,res) {
      d.resolve(url);
    };
    document.sonycameracontroller.take(listener);
    return d.promise();
  }

  return {
    init:init,
    shoot:shoot,
  };
 }();
