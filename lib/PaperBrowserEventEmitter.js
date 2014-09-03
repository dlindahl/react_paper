'use strict';

// Wraps ReactBrowserEventEmitter.listenTo to add Paper and Polymer core events
// to React's synthentic event handling.

var mergeInto = require('react/lib/mergeInto');
var ReactBrowserEventEmitter = require('react/lib/ReactBrowserEventEmitter');
var EventPluginRegistry = require('react/lib/EventPluginRegistry');
var getListeningForDocument = require('./react/getListeningForDocument');

var paperEventMapping = require('./paper_events');
mergeInto(paperEventMapping, require('./core_events'));

// Wrap ReactBrowserEventEmitter.listenTo method
var _unwrappedListenTo = ReactBrowserEventEmitter.listenTo;
ReactBrowserEventEmitter.listenTo = function wrappedListenTo(registrationName, contentDocumentHandle) {
  _unwrappedListenTo.call(this, registrationName, contentDocumentHandle);

  // NOTE: The following function body was based on the original internals of
  // ReactBrowserEventEmitter.listenTo
  var mountAt = contentDocumentHandle;
  var isListening = getListeningForDocument(mountAt);
  var dependencies = EventPluginRegistry.
    registrationNameDependencies[registrationName];

  for (var i = 0, l = dependencies.length; i < l; i++) {
    var dependency = dependencies[i];
    if (paperEventMapping.hasOwnProperty(dependency)) {
      ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
        dependency,
        paperEventMapping[dependency],
        mountAt
      );
    }

    isListening[dependency] = true;
  }
}