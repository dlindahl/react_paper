# react_paper

> Google's Polymer Paper Elements in React

Whereby I beat React over the head in order to get [Polymer's](http://www.polymer-project.org/) [Paper Element](http://www.polymer-project.org/docs/elements/paper-elements.html) Web Component project to work.

## Gotchas

Its worth noting that this is probably ***not*** a great idea and should be considered an experiment in React and Web Components. If you use this in production, you are a daring soul and I salute your #yolo-ness.

### Change Events

React handles native change events in a special way in order to maintain cross-browser compatilibty/IE8. Because of this, the Paper "change" events for `<paper-checkbox>`, `<paper-radio-button>`, `<paper-slider>`, and `<paper-toggle-button>` can be bound with `onPaperChange`
  
For example:
  
    <paper-toggle-button onPaperChange={this.onChange}/>

### Event Details

Certain Paper Elements expose custom properties to the event object that are passed to event handlers. For example, [`<paper-dropdown>`](http://www.polymer-project.org/docs/elements/paper-elements.html#paper-dropdown) has a `"core-change"` event that supports a `isSelected` property/method.

This has not yet been implemented.

### The `selected` Attribute

The `selected` attribute is defined as a boolean attribute in both the W3C HTML5 spec and within React itself. Unfortunately, Paper overloads this attribute in `<paper-dropdown>` to be an Object that allows the use of any attribute of its child node as specified in the `valueattr` attribute.
  
In order to work around this, the `selected` attribute has been renamed to `selectedName` (borrowing from React's `class`::`className` pattern)
  
For example:
  
	<paper-dropdown selectedName="Financier" valueattr="label">
	  <paper-item label="Croissant"></paper-item>
	  <paper-item label="Donut"></paper-item>
	  <paper-item label="Financier"></paper-item>
	  <paper-item label="Madeleine"></paper-item>
	</paper-dropdown>


### The `error` Attribute

Paper allows the `<paper-input>` element to specify an `error` attribute where it is defined as a boolean, whose presence indicates that a default message should be used, or as a string, whose presence indicates an explicit error message to use.
  
React does not provide the ability to specify both a boolean **and** a string value when defining DOM properties, so `errorName` is used for explicit values:
  
    <paper-input label="Generic Error" required error/>
	<paper-input label="Explicit Error" required error="ZOMG! You fail."/>

### JSX Compatiblity

All of the **top-level** Paper Elements have been added to JSX and to the list of known React DOM elements.
  
**Polymer Core elements and Paper Base Classes *HAVE NOT* been added.**
  
In order to keep the scope of this module low, I decided to only implement the high-level web components. In the future, it may make sense to add more or even allow any arbitrary component, attribute, or event to be injected. But it is probably best to wait to see []how the Facebook team addresses](https://github.com/facebook/react/pull/1551) Web Component interoperability.

### Must use Browserify

This module requires a a fair amount of monkey patching React. Additionally, React, internally, has a certain boot order that takes place. Meaning that certain features are not patchable or injectable after their modules have been required and loaded. Because of this, I don't think its possible to include the distributable React package and still have any of this work.

Realistically, you can use any package manager you'd like, as long as its compatible with CommonJS `require` methods.

### React Version Lock-in

As stated previously, the mere execution of this idea depends on lots of monkey patching of React and some duplication of internal, private methods. Because of this, I cannot guarantee that this will work above the currently indicated `peerDependency` specified in `package.json`.

### Project Tests

Pull Requests welcome! :wink:

## Installation

    npm install react_paper --save

## How to Use

Require this module ***before*** you require React in any of your top-level modules:

    // In app/assets/javascripts/app.jsx
    require('react_paper');
    var React = require('react');
    
    var App = React.createClass({
      ...
    });
    
    ...

#### Event Binding

All Paper and Core events can be bound to by camelcasing the event name:

For example, to bind to `"core-overlay-open"`:

    <paper-dialog onCoreOverlayOpen={this.onOpen}/>

**NOTE:** See also the "change events" gotcha above.

#### Component Methods

All Paper element component methods have been added to the core React DOM elements:

    var Widget = React.createClass({
      openDialog: function() {
        this.refs.dialog.toggle(); // The Dialog's toggle method can be called directly
      },
      render: function() {
        return (
          <paper-dialog ref="dialog" heading="Title">
            <p>Lorem ipsum ....</p>
            <paper-button label="Accept" affirmative autofocus></paper-button>
          </paper-dialog>

          <paper-button label="Open Dialog" raisedButton onClick={this.openDialog}/>
        );
      }
    });

#### JSX

All top-level Paper Elements can be used in JSX.

You must use the Browserify transform `polymerize` included in this package in place of `reactify`.

For example:

    browserify -t react_paper/lib/polymerize ./my_app.jsx > ./my_app-bundle.js

**NOTE:** See also the "JSX" gotcha above