'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _reactProactiveAccordion = require('../../react-proactive-accordion');

var _reactProactiveAccordion2 = _interopRequireDefault(_reactProactiveAccordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sleep = function sleep(delay) {
    return new Promise(function (resolve) {
        return setTimeout(function (_) {
            return resolve("theValue");
        }, delay);
    });
};

var perror = function perror(error) {
    message(error.message);
    window.returnValue = error;
};

var log = document.getElementById('log');
var message = function message(text) {
    log.innerHTML = text + "<br/>" + log.innerHTML;
};

// this is relative from dist/test/es5


var active = true;
var onCompleteReturned = {};

var start = { now: new Date().getTime() };
var App = function App() {
    return _react2.default.createElement(
        _reactProactiveAccordion2.default,
        { active: active, onComplete: function onComplete(a) {
                onCompleteReturned.result = a;onCompleteReturned.period = new Date().getTime();message("period " + (onCompleteReturned.period - start.now));
            } },
        _react2.default.createElement(
            'div',
            { style: { padding: '10em', backgroundColor: 'green' } },
            'This a div with text in it.\\n\\nAnd two lines of text.'
        )
    );
};

var target;

var rerender = function rerender() {
    _reactDom2.default.render(_react2.default.createElement(App, { ref: function ref(app) {
            target = app;
        } }), document.getElementById('root'));
};

rerender();

var wrapper = document.getElementsByClassName('accordion expanding');

wrapper.length.should.be.exactly(1);

var accordion = wrapper[0];

accordion.className.should.be.exactly('accordion expanding');
onCompleteReturned.should.not.have.property('result');

sleep(600).then(function () {
    accordion.className.should.be.exactly('accordion expanded');
    onCompleteReturned.result.should.be.exactly(true);
    active = false;
    start.now = new Date().getTime();
    rerender();
    accordion.className.should.be.exactly('accordion collapsing');
    sleep(450).then(function () {
        accordion.className.should.be.exactly('accordion collapsing');
        sleep(200).then(function () {
            accordion.className.should.be.exactly('accordion collapsed');
            onCompleteReturned.result.should.be.exactly(false);
            message("success!");
            window.ReturnValue = 0;
            window.close(1);
        }).catch(perror);
    }).catch(perror);
}).catch(perror);