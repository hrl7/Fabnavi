var AppDispatcher = new Flux.Dispatcher();
function bootReact( ) {
  console.log("Fabnavi boot");
  React.render(React.createElement(Navigation,null), document.querySelector('#navigation'));
  AccountStore.init();
}
