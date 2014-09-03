'use strict';

var keyMirror = require('react/lib/keyMirror');

/**
 * Types of raw signals from the browser caught at the top level.
 */
var paperLevelTypes = keyMirror({
  // Paper Element events
  paperChange: null,

  // Polymer Core events
  coreChange: null,
  coreOverlayOpen: null,
  coreSelect: null
});

var EventConstants = {
  paperLevelTypes: paperLevelTypes
};

module.exports = EventConstants;