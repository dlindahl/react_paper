'use strict';

var PaperDOM = require('./PaperDOM');
var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');
var ReactBrowserComponentMixin = require('react/lib/ReactBrowserComponentMixin');
var PaperToggleComponentMixin = require('./PaperToggleComponentMixin');

// Store a reference to the <paper-dialog> `ReactDOMComponent`.
var paperDialog = PaperDOM['paper-dialog'];

var PaperDOMDialog = ReactCompositeComponent.createClass({
  displayName: 'PaperDOMDialog',

  mixins: [ReactBrowserComponentMixin, PaperToggleComponentMixin],

  render: function() {
    return paperDialog(this.props, this.props.children);
  }
});

module.exports = PaperDOMDialog;