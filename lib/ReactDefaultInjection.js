'use strict';

var ReactInjection = require('react/lib/ReactInjection');
var ReactDefaultInjection = require('react/lib/ReactDefaultInjection');
var ReactDOM = require('react/lib/ReactDOM');
var mergeInto = require('react/lib/mergeInto');

var PaperDOM = require('./PaperDOM');
var PaperDOMDialog = require('./PaperDOMDialog');
var PaperDOMMenuButton = require('./PaperDOMMenuButton');
var PaperDOMToast = require('./PaperDOMToast');
var PaperEventPlugin = require('./PaperEventPlugin');
var PaperDOMPropertyConfig = require('./PaperDOMPropertyConfig');

// Wrap ReactDefaultInjection.inject method
var _unwrappedInject = ReactDefaultInjection.inject;
ReactDefaultInjection.inject = function wrappedInject() {
  _unwrappedInject.call(this);

  ReactInjection.EventPluginHub.injectEventPluginsByName({
    PaperEventPlugin: PaperEventPlugin
  });

  ReactInjection.DOMProperty.injectDOMPropertyConfig(PaperDOMPropertyConfig);

  ReactInjection.PaperDOM.injectComponentClasses({
    'paper-dialog': PaperDOMDialog,
    'paper-menu-button': PaperDOMMenuButton,
    'paper-toast': PaperDOMToast
  });

  mergeInto(ReactDOM, PaperDOM);
}