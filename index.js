'use strict';

// In order for custom event names to be injected, this must be required before
// all other React modules.
require('./lib/PaperBrowserEventEmitter');

var ReactInjection = require('react/lib/ReactInjection');
var PaperDOM = require('./lib/PaperDOM');

ReactInjection.PaperDOM = PaperDOM.injection;

require('./lib/ReactDefaultInjection');