'use strict';

var ReactDOMComponent = require('react/lib/ReactDOMComponent');
var ReactDescriptor = require('react/lib/ReactDescriptor');
var ReactDescriptorValidator = require('react/lib/ReactDescriptorValidator');

// Private method from react/lb/ReactDOM.js
function createDOMComponentClass(omitClose, tag) {
  var Constructor = function(descriptor) {
    this.construct(descriptor);
  };
  Constructor.prototype = new ReactDOMComponent(tag, omitClose);
  Constructor.prototype.constructor = Constructor;
  Constructor.displayName = tag;

  var ConvenienceConstructor = ReactDescriptor.createFactory(Constructor);

  if ("production" !== process.env.NODE_ENV) {
    return ReactDescriptorValidator.createFactory(
      ConvenienceConstructor
    );
  }

  return ConvenienceConstructor;
}

module.exports = createDOMComponentClass;