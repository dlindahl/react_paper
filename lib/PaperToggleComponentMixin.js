'use strict'

var PaperToggleComponentMixin = {
  toggle: function toggle() {
    this.getDOMNode().toggle();
  }
}

module.exports = PaperToggleComponentMixin;