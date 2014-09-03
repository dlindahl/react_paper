'use strict';

var PaperDOM = require('./PaperDOM');
var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');
var ReactBrowserComponentMixin = require('react/lib/ReactBrowserComponentMixin');
var PaperToggleComponentMixin = require('./PaperToggleComponentMixin');

// Store a reference to the <paper-toast> `ReactDOMComponent`.
var paperToast = PaperDOM['paper-toast'];

var PaperDOMToast = ReactCompositeComponent.createClass({
  displayName: 'PaperDOMToast',

  mixins: [ReactBrowserComponentMixin, PaperToggleComponentMixin],

  show: function show() {
    this.getDOMNode().show();
  },

  dismiss: function dismiss() {
    this.getDOMNode().dismiss();
  },

  render: function() {
    return paperToast(this.props, this.props.children);
  }
});

module.exports = PaperDOMToast;