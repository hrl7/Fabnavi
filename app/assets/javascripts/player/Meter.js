var Meter = (function (){
  var
  bar,
    val
  ; 
function init(){
 bar = document.querySelector('.progress-bar');
 val = document.querySelector('.progress-value');
}

function setValue( index, length){
  val.textContent = index + "/" + length;
  bar.style.width = (index / length) * 100 + "%";
}


return {
  init : init ,
    set  : setValue,
};

})();
