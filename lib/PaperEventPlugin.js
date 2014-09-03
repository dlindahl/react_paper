/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule PaperEventPlugin
 */

'use strict';

var EventConstants = require('./PaperEventConstants');
var EventPluginUtils = require('react/lib/EventPluginUtils');
var EventPropagators = require('react/lib/EventPropagators');
var SyntheticEvent = require('react/lib/SyntheticEvent');
var SimpleEventPlugin = require('react/lib/SimpleEventPlugin');

var invariant = require('react/lib/invariant');
var keyOf = require('react/lib/keyOf');

var paperLevelTypes = EventConstants.paperLevelTypes;

// Paper Elements and Polymer Core event type dispatch configurations
var eventTypes = {
  paperChange: {
    phasedRegistrationNames: {
      bubbled: keyOf({onPaperChange: true}),
      captured: keyOf({onPaperChangeCapture: true})
    }
  },
  coreChange: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCoreChange: true}),
      captured: keyOf({onCoreChangeCapture: true})
    }
  },
  coreOverlayOpen: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCoreOverlayOpen: true}),
      captured: keyOf({onCoreOverlayOpenCapture: true})
    }
  },
  coreSelect: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCoreSelect: true}),
      captured: keyOf({onCoreSelectCapture: true})
    }
  }
};

var paperLevelEventsToDispatchConfig = {
  paperChange: eventTypes.paperChange,
  coreChange: eventTypes.coreChange,
  coreOverlayOpen: eventTypes.coreOverlayOpen,
  coreSelect: eventTypes.coreSelect
};

for (var paperLevelType in paperLevelEventsToDispatchConfig) {
  paperLevelEventsToDispatchConfig[paperLevelType].dependencies = [paperLevelType];
}

var PaperEventPlugin = {
  eventTypes: eventTypes,
  executeDispatch: SimpleEventPlugin.executeDispatch,

  /**
   * The contents of this method have been adapted from the internals of
   * SimpleEventPlugin.extractEvents.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var dispatchConfig = paperLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case paperLevelTypes.paperChange:
      case paperLevelTypes.coreChange:
      case paperLevelTypes.coreOverlayOpen: // TODO: May need custom event for Event Details. See docs.
      case paperLevelTypes.coreSelect:      // TODO: May need custom event for Event Details. See docs.
        EventConstructor = SyntheticEvent;
        break;
    }
    ('production' !== process.env.NODE_ENV ? invariant(
      EventConstructor,
      'PaperEventPlugin: Unhandled event type, `%s`.',
      topLevelType
    ) : invariant(EventConstructor));
    var event = EventConstructor.getPooled(
      dispatchConfig,
      topLevelTargetID,
      nativeEvent
    );
    EventPropagators.accumulateTwoPhaseDispatches(event);

    return event;
  }

};

// Inject the PaperEventPlugin into a specific location of React's default
// event plugin order
var DefaultEventPluginOrder = require('react/lib/DefaultEventPluginOrder');
DefaultEventPluginOrder.splice(1, 0, keyOf({PaperEventPlugin:null}));

module.exports = PaperEventPlugin;