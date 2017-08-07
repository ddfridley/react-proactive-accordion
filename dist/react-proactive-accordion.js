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
    _this.stepSize = 7;
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
    key: 'smoothOpen',
    value: function smoothOpen() {
      if (!this.openStart) this.openStart = new Date().getTime();else return; // don't stutter start
      if (this.inOpen === 'active') {
        return;
      } // dont't stutter start.
      this.inOpen = 'active';
      if (this.inClose !== "inactive") {
        this.inClose = 'abort';
      }
      var duration = this.props.duration || 500;
      var accordion = this.refs.accordion;

      var timerMax = 1000; //just in case

      var maxHeight = parseInt(accordion.style.maxHeight, 10) || 0;
      var height = accordion.clientHeight;
      if (maxHeight < height) {
        //minHeight may not be 0
        accordion.style.maxHeight = height + 'px';
      }

      this.setState({ attr: 'expanding' });

      var stepPeriod = this.stepPeriod;
      var that = this;
      var stepper = function stepper() {
        if (that.inOpen === 'abort') {
          that.openStart = null;that.inOpen = 'inactive';return;
        }
        var now = new Date().getTime();
        if (now - that.openStart > duration) {
          // time is up
          that.inOpen = 'inactive';
          that.openStart = null;
          var nextFunc = that.props.onComplete ? function () {
            return that.props.onComplete(true);
          } : null;
          that.setState({ attr: 'expanded' }, nextFunc);
          accordion.style.maxHeight = null;
          return;
        }
        var lmaxHeight = parseInt(accordion.style.maxHeight, 10) || 0;
        var lheight = accordion.clientHeight;
        var wheight = that.refs.accordionWrapper ? that.refs.accordionWrapper.clientHeight : 0;

        if (wheight) {
          // wrapper has a significant height
          var timeRemaining = duration - (now - that.openStart);
          var stepsRemaining = Math.max(1, Math.round(timeRemaining / stepPeriod)); // less than one step is one step
          var distanceRemaining = Math.max(wheight - lheight, 0); // distance to go, but not negative
          var nextStepDistance = distanceRemaining / stepsRemaining;
          if (nextStepDistance < 1 && nextStepDistance > 0) {
            // steps are less than 1 pixel at this rate
            stepPeriod = Math.ceil(timeRemaining / distanceRemaining); // time between pixels
            var shortStepPeriod = stepPeriod;
            if (nextStepDistance < 0.5) {
              shortStepPeriod = Math.max(that.stepPeriod, Math.ceil((1 - nextStepDistance) * stepPeriod)); // time to the next pixel but at least something
              setTimeout(stepper, shortStepPeriod); // come back later and less often
              return;
            }
          }
          var newMax = Math.ceil(lheight + nextStepDistance); // top of the next step
          accordion.style.maxHeight = newMax + 'px';
        } else {
          // we don't know the height of the wrapper, the data is not populated yet

          if (lmaxHeight <= lheight) {
            // if maxheight is equal to (or somehow less) increment the maxHeight another step
            accordion.style.maxHeight = Math.max(lmaxHeight + that.stepSize, lheight + 1) + 'px';
          }
        }
        setTimeout(stepper, stepPeriod); // continue the steps
      };
      setTimeout(stepper, stepPeriod); // start the stepper
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  }, {
    key: 'smoothClose',
    value: function smoothClose() {
      var _this2 = this;

      // set an interval to update scrollTop attribute every 25 ms
      if (!this.closeStart) this.closeStart = new Date().getTime();else return; // don't stutter close
      if (this.inClose == 'active') {
        return;
      } //don't stutter the close
      this.inClose = 'active';
      if (this.inOpen != 'inactive') {
        this.inOpen = 'abort';
      } //override the open with a close
      var duration = this.props.duration || 500;
      var accordion = this.refs.accordion;

      var height = accordion.clientHeight;
      accordion.style.maxHeight = Math.floor(height) + 'px';

      var minHeight = parseInt(accordion.style.minHeight, 10) || 0;
      if (this.refs.accordionWrapper.children[0]) minHeight = Math.max(minHeight, parseInt(this.refs.accordionWrapper.children[0].style.minHeight, 10) || 0); // wrapper is a div which wraps around the innards may have a min-height set

      this.setState({ attr: 'collapsing' });

      var stepPeriod = this.stepPeriod;
      var that = this;
      var stepper = function stepper() {
        if (_this2.inClose === 'abort') {
          _this2.closeStart = null;_this2.inClose = 'inactive';return;
        }
        var now = new Date().getTime();
        if (now - _this2.closeStart > duration || lmaxHeight < lheight || lheight <= minHeight) {
          _this2.inClose = 'inactive';
          _this2.closeStart = null;
          var nextFunc = that.props.onComplete ? function () {
            return that.props.onComplete(true);
          } : null;
          _this2.setState({ attr: 'collapsed' }, nextFunc);
          accordion.style.maxHeight = null;
          return;
        }
        var lmaxHeight = parseInt(accordion.style.maxHeight, 10) || 0;
        var lheight = Math.floor(accordion.clientHeight);

        var timeRemaining = duration - (now - that.closeStart);
        var stepsRemaining = Math.max(1, Math.round(timeRemaining / stepPeriod)); // less than one step is one step
        var distanceRemaining = Math.max(lheight - minHeight, 1); // distance to go, but not negative
        var nextStepDistance = distanceRemaining / stepsRemaining;
        if (nextStepDistance < 1 && nextStepDistance > 0) {
          // steps are less than 1 pixel at this rate
          stepPeriod = Math.ceil(timeRemaining / distanceRemaining); // time between pixels
          var shortStepPeriod = stepPeriod;
          if (nextStepDistance < 0.5) {
            shortStepPeriod = Math.max(that.stepPeriod, Math.ceil((1 - nextStepDistance) * stepPeriod)); // time to the next pixel but at least something
            setTimeout(stepper, shortStepPeriod); // come back later and less often
            return;
          }
        }
        var newMax = Math.floor(lheight - nextStepDistance); // top of the next step
        accordion.style.maxHeight = newMax + 'px'; // set the new height
        setTimeout(stepper, stepPeriod);
      };
      setTimeout(stepper, stepPeriod); // kick off the stepper
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