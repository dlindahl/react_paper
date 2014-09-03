'use strict';

// Adds known Paper Element custom element tags to the JSX parser for Reactify

try {
  var xjs = require('reactify/node_modules/react-tools/vendor/fbtransform/transforms/xjs');
  var reactify = require('reactify');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
  var xjs = prequire('reactify/node_modules/react-tools/vendor/fbtransform/transforms/xjs');
  var reactify = prequire('reactify');
}

var knownTags = require('./paper_tags');

Object.keys(knownTags).forEach(function(tag) {
  xjs.knownTags[tag] = true;
});

module.exports = reactify;