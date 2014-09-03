'use strict';

var mergeInto = require('react/lib/mergeInto');
var mapObject = require('react/lib/mapObject');
var createDOMComponentClass = require('./react/createDOMComponentClass');
var tags = require('./paper_tags');

var PaperDOM = mapObject(tags, createDOMComponentClass);

var injection = {
  injectComponentClasses: function(componentClasses) {
    mergeInto(PaperDOM, componentClasses);
  }
};

PaperDOM.injection = injection;

module.exports = PaperDOM;