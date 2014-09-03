'use strict';

var DOMProperty = require('react/lib/DOMProperty');

var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE =
  DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE =
  DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

var PaperElementsDOMPropertyConfig = {
  Properties: {
    // paper-button
    iconSrc: null,
    raisedButton: HAS_BOOLEAN_VALUE,

    // paper-dialog
    autoCloseDisabled: HAS_BOOLEAN_VALUE,
    closeSelector: null,
    backdrop: HAS_BOOLEAN_VALUE,
    heading: null,
    layered: HAS_BOOLEAN_VALUE,
    opened: HAS_BOOLEAN_VALUE, // also: paper-menu-button, paper-toast
    transition: null,
    //   - paper-button
    autofocus: HAS_BOOLEAN_VALUE,
    affirmative: HAS_BOOLEAN_VALUE,
    dismissive: HAS_BOOLEAN_VALUE,

    // paper-dropdown
    valueattr: null,
    // "selected" is already an attribute of <option> and has pre-defined
    // boolean behavior, so we can't use the same attribute name. This borrows
    // from the className::class pattern.
    selectedName: null, // also: paper-radio-group
    selectedClass: null,
    selectedProperty: null,
    selectedAttribute: null,
    selectedItem: null,
    halign: null, // also: paper-menu-button
    valign: null, // also: paper-menu-button

    // paper-input
    error: HAS_BOOLEAN_VALUE,
    // Not sure how to make a boolean | string value so let's use errorName for
    // explicit error messages
    errorName: null,
    floatingLabel: HAS_BOOLEAN_VALUE,
    maxRows: null,
    multiline: HAS_BOOLEAN_VALUE,

    // paper-progress
    secondaryProgress: null, // also: paper-slider

    // paper-radio-button
    toggles: HAS_BOOLEAN_VALUE,

    // paper-ripple
    initialOpacity: null,
    opacityDecayVelocity: null,

    // paper-slider
    editable: HAS_BOOLEAN_VALUE,
    snaps: HAS_BOOLEAN_VALUE,
    pin: HAS_BOOLEAN_VALUE,
    immediateValue: null,

    // paper-tab
    noink: HAS_BOOLEAN_VALUE, // also paper-tabs

    // paper-tabs
    nobar: HAS_BOOLEAN_VALUE,

    // paper-toast
    text: null,
    duration: null,
    responsiveWidth: null,
    swipDisabled: HAS_BOOLEAN_VALUE
  },
  DOMAttributeNames: {
    selectedName: 'selected',
    errorName: 'error'
  },
  DOMPropertyNames: {
  }
};

module.exports = PaperElementsDOMPropertyConfig;