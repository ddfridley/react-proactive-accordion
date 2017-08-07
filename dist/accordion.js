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

  //step rate is 17mSec

  function Accordion(props) {
    _classCallCheck(this, Accordion);

    var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, props));

    _this.state = {
      attr: 'collapsed'
    };
    _this.stepSize = 7;
    _this.stepRate = 17;
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

    var stepMaxDuration = props.maxDuration || 1000; //* maximum time allowed for a scroll if it were full screen in mSec
    _this.stepSize = Math.round(height * _this.stepRate / stepMaxDuration); //needs to be an int
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
      var _this2 = this;

      if (!this.openStart) this.openStart = new Date().getTime();else return; // don't stutter start
      if (this.inOpen === 'active') {
        return;
      } // dont't stutter start.
      this.inOpen = 'active';
      if (this.inClose !== "inactive") {
        this.inClose = 'abort';
      }
      var duration = this.props.maxDuration || 500;
      var accordion = this.refs.accordion;

      var timerMax = 1000; //just in case

      var maxHeight = parseInt(accordion.style.maxHeight, 10) || 0;
      var height = accordion.clientHeight;
      if (maxHeight < height) {
        //minHeight may not be 0
        accordion.style.maxHeight = height + 'px';
      }

      this.setState({ attr: 'expanding' });
      var timer = setInterval(function () {
        if (--timerMax <= 0) {
          clearInterval(timer);_this2.openStart = null;console.error("accordion.smoothOpen timer overflow");
        }
        if (_this2.inOpen === 'abort') {
          clearInterval(timer);_this2.openStart = null;_this2.inOpen = 'inactive';return;
        }
        var now = new Date().getTime();
        if (now - _this2.openStart > duration) {
          // time is up
          _this2.inOpen = 'inactive';
          clearInterval(timer);
          _this2.openStart = null;
          _this2.setState({ attr: 'expanded' });
          accordion.style.maxHeight = null;
          if (_this2.props.onComplete) {
            _this2.props.onComplete(true);
          }
          return;
        }
        var lmaxHeight = parseInt(accordion.style.maxHeight, 10) || 0;
        var lheight = accordion.clientHeight;
        var wheight = _this2.refs.accordionWrapper ? _this2.refs.accordionWrapper.clientHeight : 0;

        if (wheight - lheight > _this2.stepSize) {
          // wrapper has a significant height
          // calculate the percent of the scroll duration that has been completed. 100% max
          var step = Math.min(1, (now - _this2.openStart) / duration);
          var distance = Math.max(wheight - lheight, 1); // distance to go, but not negative
          var newMax = Math.ceil(lheight + step * distance); // top of the next step
          accordion.style.maxHeight = newMax + 'px';
        } else {
          // we don't know the height of the wrapper, the data is not populated yet
          if (lmaxHeight <= lheight) {
            // if maxheight is equal to (or somehow less) increment the maxHeight another step
            accordion.style.maxHeight = Math.max(lmaxHeight + _this2.stepSize, lheight + 1) + 'px';
          }
        }
      }, this.stepRate);
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  }, {
    key: 'smoothClose',
    value: function smoothClose() {
      var _this3 = this;

      // set an interval to update scrollTop attribute every 25 ms
      if (!this.closeStart) this.closeStart = new Date().getTime();else return; // don't stutter close
      if (this.inClose == 'active') {
        return;
      } //don't stutter the close
      this.inClose = 'active';
      if (this.inOpen != 'inactive') {
        this.inOpen = 'abort';
      } //override the open with a close
      var duration = this.props.maxDuration || 500;
      var accordion = this.refs.accordion;

      var height = accordion.clientHeight;
      accordion.style.maxHeight = Math.floor(height) + 'px';

      var minHeight = parseInt(accordion.style.minHeight, 10) || 0;
      if (this.refs.accordionWrapper.children[0]) minHeight = Math.max(minHeight, parseInt(this.refs.accordionWrapper.children[0].style.minHeight, 10) || 0); // wrapper is a div which wraps around the innards may have a min-height set

      this.setState({ attr: 'collapsing' });
      var timerMax = 1000; //just incase something goes wrong don't leave the timer running

      var timer = setInterval(function () {
        if (--timerMax == 0) {
          clearInterval(timer);console.error("accordion.smoothClose timer overflow");
        }
        if (_this3.inClose === 'abort') {
          clearInterval(timer);_this3.inClose = 'inactive';return;
        }

        var now = new Date().getTime();
        var lmaxHeight = parseInt(accordion.style.maxHeight, 10) || 0;
        var lheight = Math.floor(accordion.clientHeight);

        if (now - _this3.closeStart < duration && lmaxHeight >= lheight && lheight > minHeight) {
          // there is still time and it's still shrinking
          var step = Math.min(1, (now - _this3.closeStart) / duration); // calculate the percent of the scroll duration that has been completed. 100% max
          var distance = Math.max(lheight - minHeight, 1); // distance to go, but not negative
          var newMax = Math.floor(lheight - step * distance); // top of the next step
          accordion.style.maxHeight = newMax + 'px'; // set the new height
        } else {
          _this3.inClose = 'inactive';
          clearInterval(timer);
          _this3.closeStart = null;
          if (_this3.props.onComplete) {
            _this3.setState({ attr: 'collapsed' }, function () {
              return _this3.props.onComplete(false);
            });
          } else _this3.setState({ attr: 'collapsed' });
          accordion.style.maxHeight = null;
        }
      }, this.stepRate);
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

Accordion.propTypes = {
  active: _react2.default.PropTypes.bool,
  text: _react2.default.PropTypes.bool,
  onComplete: _react2.default.PropTypes.func
};
exports.default = Accordion;