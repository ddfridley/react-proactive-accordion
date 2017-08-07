'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arguments = arguments;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactProactiveAccordion = require('./react-proactive-accordion');

var _reactProactiveAccordion2 = _interopRequireDefault(_reactProactiveAccordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.logger = {};
logger.info = function () {
    var _console;

    return (_console = console).info.apply(_console, _arguments);
};
logger.error = function () {
    var _console2;

    (_console2 = console).info.apply(_console2, ["logger.error called"].concat(Array.prototype.slice.call(_arguments)));
};
logger.trace = function () {};

var demoData = [{ subject: "The Constitution of the United States",
    text: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.",
    parent: null,
    id: '1'
}, { subject: "Article. I. [Congress of the United States]",
    text: "",
    parent: '1',
    id: '2'
}, { subject: "Section. 1.",
    text: "All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.",
    parent: '2',
    id: '3'
}, { subject: "Section. 2.",
    text: "The House of Representatives shall be composed of Members chosen every second Year by the People of the several States, and the Electors in each State shall have the Qualifications requisite for Electors of the most numerous Branch of the State Legislature.\n\nNo Person shall be a Representative who shall not have attained to the Age of twenty five Years, and been seven Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State in which he shall be chosen.\n\nRepresentatives and direct Taxes shall be apportioned among the several States which may be included within this Union, according to their respective Numbers, which shall be determined by adding to the whole Number of free Persons, including those bound to Service for a Term of Years, and excluding Indians not taxed, three fifths of all other Persons. The actual Enumeration shall be made within three Years after the first Meeting of the Congress of the United States, and within every subsequent Term of ten Years, in such Manner as they shall by Law direct. The Number of Representatives shall not exceed one for every thirty Thousand, but each State shall have at Least one Representative; and until such enumeration shall be made, the State of New Hampshire shall be entitled to chuse three, Massachusetts eight, Rhode-Island and Providence Plantations one, Connecticut five, New-York six, New Jersey four, Pennsylvania eight, Delaware one, Maryland six, Virginia ten, North Carolina five, South Carolina five, and Georgia three.\n\nWhen vacancies happen in the Representation from any State, the Executive Authority thereof shall issue Writs of Election to fill such Vacancies.\n\nThe House of Representatives shall chuse their Speaker and other Officers; and shall have the sole Power of Impeachment",
    parent: '2',
    id: '4'
}, { subject: "Article. II. [President of the United States of America]",
    text: "",
    parent: '1',
    id: '5'
}, { subject: "Section. 1.",
    text: 'The executive Power shall be vested in a President of the United States of America. He shall hold his Office during the Term of four Years, and, together with the Vice President, chosen for the same Term, be elected, as follows\n\nEach State shall appoint, in such Manner as the Legislature thereof may direct, a Number of Electors, equal to the whole Number of Senators and Representatives to which the State may be entitled in the Congress: but no Senator or Representative, or Person holding an Office of Trust or Profit under the United States, shall be appointed an Elector.\n\nThe Electors shall meet in their respective States, and vote by Ballot for two Persons, of whom one at least shall not be an Inhabitant of the same State with themselves. And they shall make a List of all the Persons voted for, and of the Number of Votes for each; which List they shall sign and certify, and transmit sealed to the Seat of the Government of the United States, directed to the President of the Senate. The President of the Senate shall, in the Presence of the Senate and House of Representatives, open all the Certificates, and the Votes shall then be counted. The Person having the greatest Number of Votes shall be the President, if such Number be a Majority of the whole Number of Electors appointed; and if there be more than one who have such Majority, and have an equal Number of Votes, then the House of Representatives shall immediately chuse by Ballot one of them for President; and if no Person have a Majority, then from the five highest on the List the said House shall in like Manner chuse the President. But in chusing the President, the Votes shall be taken by States, the Representation from each State having one Vote; A quorum for this Purpose shall consist of a Member or Members from two thirds of the States, and a Majority of all the States shall be necessary to a Choice. In every Case, after the Choice of the President, the Person having the greatest Number of Votes of the Electors shall be the Vice President. But if there should remain two or more who have equal Votes, the Senate shall chuse from them by Ballot the Vice President.\n\nThe Congress may determine the Time of chusing the Electors, and the Day on which they shall give their Votes; which Day shall be the same throughout the United States.\n\nNo Person except a natural born Citizen, or a Citizen of the United States, at the time of the Adoption of this Constitution, shall be eligible to the Office of President; neither shall any Person be eligible to that Office who shall not have attained to the Age of thirty five Years, and been fourteen Years a Resident within the United States.\n\nIn Case of the Removal of the President from Office, or of his Death, Resignation, or Inability to discharge the Powers and Duties of the said Office, the Same shall devolve on the Vice President, and the Congress may by Law provide for the Case of Removal, Death, Resignation or Inability, both of the President and Vice President, declaring what Officer shall then act as President, and such Officer shall act accordingly, until the Disability be removed, or a President shall be elected.\n\nThe President shall, at stated Times, receive for his Services, a Compensation, which shall neither be encreased nor diminished during the Period for which he shall have been elected, and he shall not receive within that Period any other Emolument from the United States, or any of them.\n\nBefore he enter on the Execution of his Office, he shall take the following Oath or Affirmation:—"I do solemnly swear (or affirm) that I will faithfully execute the Office of President of the United States, and will to the best of my Ability, preserve, protect and defend the Constitution of the United States."',
    parent: '5',
    id: '6'
}];

var Article = function (_React$Component) {
    _inherits(Article, _React$Component);

    function Article() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Article);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Article.__proto__ || Object.getPrototypeOf(Article)).call.apply(_ref, [this].concat(args))), _this), _this.mounted = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Article, [{
        key: 'render',
        value: function render() {
            if (!this.props.articles.length) return null;
            var _props$articles$ = this.props.articles[0],
                subject = _props$articles$.subject,
                text = _props$articles$.text,
                id = _props$articles$.id;


            return _react2.default.createElement(
                'div',
                { className: 'article' },
                _react2.default.createElement(
                    'div',
                    { className: 'subject' },
                    subject
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'text', ref: 'text' },
                    text
                )
            );
        }
    }]);

    return Article;
}(_react2.default.Component);

var ArticleStore = function (_React$Component2) {
    _inherits(ArticleStore, _React$Component2);

    function ArticleStore(props) {
        _classCallCheck(this, ArticleStore);

        var _this2 = _possibleConstructorReturn(this, (ArticleStore.__proto__ || Object.getPrototypeOf(ArticleStore)).call(this, props));

        _this2.state = { articles: [] };
        return _this2;
    }

    _createClass(ArticleStore, [{
        key: 'renderChildren',
        value: function renderChildren() {
            var _this3 = this;

            return _react2.default.Children.map(this.props.children, function (child) {
                var newProps = Object.assign({}, _this3.props, _this3.state);
                delete newProps.children;
                return _react2.default.cloneElement(child, newProps, child.props.children);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            setTimeout(function () {
                var articles = demoData.reduce(function (acc, dat) {
                    if (dat.parent === _this4.props.parent) acc.push(dat);
                    return acc;
                }, []);
                _this4.setState({ articles: articles });
            }, this.props.delay || 100);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                null,
                this.renderChildren()
            );
        }
    }]);

    return ArticleStore;
}(_react2.default.Component);

var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App() {
        var _ref2;

        var _temp2, _this5, _ret2;

        _classCallCheck(this, App);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this5 = _possibleConstructorReturn(this, (_ref2 = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref2, [this].concat(args))), _this5), _this5.state = { active: true, onComplete: null // the key in the Accordion below causes React to render a new element when either value has changed
        }, _this5.duration = 500, _this5.delay = 100, _temp2), _possibleConstructorReturn(_this5, _ret2);
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            var _this6 = this;

            var oldNow = new Date().getTime();
            return _react2.default.createElement(
                'div',
                { className: 'accordion-demo' },
                _react2.default.createElement(
                    'div',
                    null,
                    'accordion active=',
                    _react2.default.createElement('input', { type: 'checkbox', checked: this.state.active, onChange: function onChange(e) {
                            _this6.setState({ active: e.target.checked, onComplete: null });
                        } })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    'accordion duration=',
                    _react2.default.createElement('input', { type: 'text', defaultValue: this.duration, onKeyUp: function onKeyUp(e) {
                            _this6.duration = parseInt(e.target.value, 10);if (e.keyCode === 13) _this6.setState({ onComplete: null });
                        } })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    'content delay=',
                    _react2.default.createElement('input', { type: 'text', defaultValue: this.delay, onKeyUp: function onKeyUp(e) {
                            _this6.delay = parseInt(e.target.value, 10);if (e.keyCode === 13) _this6.setState({ onComplete: null });
                        } })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    'onComplete',
                    this.state.onComplete
                ),
                _react2.default.createElement(
                    _reactProactiveAccordion2.default,
                    { duration: this.duration,
                        active: this.state.active,
                        onComplete: function onComplete() {
                            var newNow = new Date().getTime();_this6.setState({ onComplete: ' called after ' + (newNow - oldNow) + 'mSec' });
                        },
                        key: this.duration + '-' + this.delay },
                    _react2.default.createElement(
                        ArticleStore,
                        { parent: '5', delay: this.delay },
                        _react2.default.createElement(Article, null)
                    )
                )
            );
        }
    }]);

    return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));