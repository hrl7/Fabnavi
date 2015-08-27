var AppDispatcher = new Flux.Dispatcher();
function bootReact( ) {
  console.log("Fabnavi boot");
  AccountStore.init();
  ProjectStore.init();
  ProjectSelectorStore.init();
  window.onkeydown = KeyActionCreator.handleKeyDown;
  React.render(React.createElement(FabnaviApp, null), document.body);
}
