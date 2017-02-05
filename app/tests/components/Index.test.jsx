var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var Index = require('Index');

describe('Index', () => {
  it('should exist', () => {
    expect(Index).toExist();
  });

  it('should display a h1', () => {
    var index = TestUtils.renderIntoDocument(<Index/>);
    // index.callSomeFunction();
    var $el = $(ReactDOM.findDOMNode(index));
    var $h1 = $el.find('h1');

    expect($h1.length).toBe(1);
  });
});
