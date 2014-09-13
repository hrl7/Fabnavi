var Fabnavi = function(){

  function run() {
    var mode = window.location.hash; 
    if(["play","add","edit"].indexOf(mode.slice(1)) != -1){
      Director.init(mode.slice(1));
    } else {
      Director.init("play");
    }
  }

  function play(){
    Director.init("play");
  }

  function add(){
    director.init("add");
  }

  function edit(){
    Director.init("edit");
  }

  return {
    run:run
  };
}();
