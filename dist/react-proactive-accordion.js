'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Accordion = function (_React$Component) {
  _inherits(Accordion, _React$Component);

  //step rate

  function Accordion(props) {
    _classCallCheck(this, Accordion);

    var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, props));

    _this.state = {
      attr: 'collapsed'
    };
    _this.stepSize = 1;
    _this.stepPeriod = 10;
    _this.inOpen = 'inactive';
    _this.openStart = null;
    _this.inClose = 'inactive';
    _this.closeStart = null;

    var height;

    if (typeof window !== 'undefined') {
      height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    } else {
      height = 1024; // this is running on the server, guess the height of the screen this will be displayed on
    }

    var stepMaxDuration = props.duration || 500; //* maximum time allowed for a scroll if it were full screen in mSec
    _this.stepSize = Math.round(height * _this.stepPeriod / stepMaxDuration); //needs to be an int
    return _this;
  }

  _createClass(Accordion, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.active !== nextProps.active) {
        if (!nextProps.active) {
          this.smoothClose();
        } else {
          this.smoothOpen();
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.active) {
        var maxHeight = parseInt(this.refs.accordion.style.maxHeight, 10) || 0;
        if (this.refs.accordionWrapper.clientHeight >= maxHeight) {
          if (typeof window !== 'undefined') {
            this.smoothOpen();
          } else {
            this.setState({ attr: 'expanded' });
          }
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.inOpen !== 'inactive') this.inOpen = 'abort';
      if (this.inClose !== 'inactive') this.inClose = 'abort';
    }
  }, {
    key: 'smoothOpen',
    value: function smoothOpen() {
      if (this.inOpen === 'active' || this.inOpen === 'abort') {
        return;
      } // dont't stutter start.
      this.inOpen = 'active';
      if (this.inClose !== "inactive") {
        this.inClose = 'abort';
      }
      var duration = this.props.duration || 500; // performance time is in miliseconds
      var accordion = this.refs.accordion;

      var maxHeight = parseFloat(accordion.style.maxHeight) || 0;
      var height = accordion.clientHeight;
      if (maxHeight < height) {
        //minHeight may not be 0
        accordion.style.maxHeight = height + 'px';
      }
      var start = null;
      var last = null;
      this.setState({ attr: 'expanding' });
      var that = this;
      function stepper(now) {
        if (!start) {
          start = now;
          last = now;
          window.requestAnimationFrame(stepper);
          return;
        }
        if (that.inOpen === 'abort') {
          that.inOpen = 'inactive';return;
        }
        if (now - start > duration) {
          // time is up
          that.inOpen = 'inactive';
          var nextFunc = that.props.onComplete ? function () {
            return that.props.onComplete(true);
          } : null;
          that.setState({ attr: 'expanded' }, nextFunc);
          accordion.style.maxHeight = null;
          return;
        }
        var lmaxHeight = parseFloat(accordion.style.maxHeight) || 0;
        var lheight = accordion.clientHeight;
        var wheight = that.refs.accordionWrapper ? that.refs.accordionWrapper.clientHeight : 0;

        if (wheight) {
          // wrapper has a significant height
          var timeRemaining = duration - (now - start);
          var stepsRemaining = Math.max(1, Math.round(timeRemaining / (now - last))); // less than one step is one step
          var distanceRemaining = Math.max(wheight - lheight, 0); // distance to go, but not negative
          var nextStepDistance = distanceRemaining / stepsRemaining;
          if (nextStepDistance > -1 && nextStepDistance < 1) {
            // steps are less than 1 pixel at this rate don't set last
            requestAnimationFrame(stepper);
            return;
          }
          var newMax = lheight + nextStepDistance; // top of the next step
          accordion.style.maxHeight = newMax + 'px';
        } else {
          // we don't know the height of the wrapper, the data is not populated yet
          if (lmaxHeight <= lheight) {
            // if maxheight is equal to (or somehow less) increment the maxHeight another step
            accordion.style.maxHeight = Math.max(lmaxHeight + that.stepSize, lheight + 1) + 'px';
          }
        }
        last = now;
        window.requestAnimationFrame(stepper); // continue the steps
      }
      window.requestAnimationFrame(stepper);
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  }, {
    key: 'smoothClose',
    value: function smoothClose() {
      if (this.inClose === 'active' || this.inClose === 'abort') {
        return;
      } //don't stutter the close
      this.inClose = 'active';
      if (this.inOpen !== 'inactive') {
        this.inOpen = 'abort';
      } //override the open with a close
      var duration = this.props.duration || 500;
      var accordion = this.refs.accordion;

      var height = accordion.clientHeight;
      accordion.style.maxHeight = Math.floor(height) + 'px';

      var minHeight = parseFloat(accordion.style.minHeight) || 0;
      if (this.refs.accordionWrapper.children[0]) minHeight = Math.max(minHeight, parseFloat(this.refs.accordionWrapper.children[0].style.minHeight) || 0); // wrapper is a div which wraps around the innards may have a min-height set

      this.setState({ attr: 'collapsing' });

      var that = this;
      var start = null;
      var last = null;
      function stepper(now) {
        if (!start) {
          start = now;
          last = now;
          window.requestAnimationFrame(stepper);
          return;
        }
        if (that.inClose === 'abort') {
          that.inClose = 'inactive';return;
        }
        if (now - start > duration || lmaxHeight < lheight || lheight <= minHeight) {
          that.inClose = 'inactive';
          var nextFunc = that.props.onComplete ? function () {
            return that.props.onComplete(false);
          } : null;
          that.setState({ attr: 'collapsed' }, nextFunc);
          accordion.style.maxHeight = null;
          return;
        }
        var lmaxHeight = parseFloat(accordion.style.maxHeight) || 0;
        var lheight = /*Math.floor*/accordion.clientHeight;

        var timeRemaining = duration - (now - start);
        var stepsRemaining = Math.max(1, Math.round(timeRemaining / (now - last))); // less than one step is one step
        var distanceRemaining = Math.max(lheight - minHeight, 1); // distance to go, but not negative
        var nextStepDistance = distanceRemaining / stepsRemaining;
        if (nextStepDistance > -1 && nextStepDistance < 1) {
          // steps are less than 1 pixel at this rate
          window.requestAnimationFrame(stepper);
          return;
        }
        var newMax = /*Math.floor*/lheight - nextStepDistance; // top of the next step
        accordion.style.maxHeight = newMax + 'px'; // set the new height
        last = now;
        window.requestAnimationFrame(stepper);
      }
      window.requestAnimationFrame(stepper); // kick off the stepper
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)(this.props.className, 'accordion', {
        'text': this.props.text
      }, this.state.attr);
      return _react2.default.createElement(
        'section',
        { className: classes, ref: 'accordion', style: this.props.style, onClick: this.props.onClick },
        _react2.default.createElement(
          'div',
          { ref: 'accordionWrapper' },
          this.props.children
        )
      );
    }
  }]);

  return Accordion;
}(_react2.default.Component);

exports.default = Accordion;