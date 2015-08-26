var AppDispatcher = new Flux.Dispatcher();
function bootReact( ) {
  console.log("Fabnavi boot");
  AccountStore.init();
  ProjectStore.init();
  React.render(React.createElement(FabnaviApp, null), document.body);
}
