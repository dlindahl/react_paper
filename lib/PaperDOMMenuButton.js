'use strict';

var PaperDOM = require('./PaperDOM');
var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');
var ReactBrowserComponentMixin = require('react/lib/ReactBrowserComponentMixin');
var PaperToggleComponentMixin = require('./PaperToggleComponentMixin');

// Store a reference to the <paper-menu-button> `ReactDOMComponent`.
var paperMenuButton = PaperDOM['paper-menu-button'];

var PaperDOMMenuButton = ReactCompositeComponent.createClass({
  displayName: 'PaperDOMMenuButton',

  mixins: [ReactBrowserComponentMixin, PaperToggleComponentMixin],

  render: function() {
    return paperMenuButton(this.props, this.props.children);
  }
});

module.exports = PaperDOMMenuButton;