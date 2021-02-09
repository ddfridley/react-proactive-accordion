'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactJss = _interopRequireDefault(require("react-jss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getRef(destination, e) {
  if (e) this[destination] = e;
}

var styles = {
  accordion: {
    overflow: 'hidden',
    'max-height': 0,
    position: 'relative'
  },
  expanding: {
    overflow: 'hidden',
    '&$text': {
      overflow: 'visible',
      'overflow-y': 'hidden'
    }
  },
  expanded: {
    'max-height': 'none',

    /* overflow nothing */
    '&$text': {
      'max-height': 'none',
      overflow: 'visible'
    }
  },
  collapsing: {
    overflow: 'hidden',
    '&$text': {
      overflow: 'visible',
      'overflow-y': 'hidden'
    }
  },
  collapsed: {
    overflow: 'hidden',
    '&$text': {
      overflow: 'hidden'
    }
  },
  text: {}
};

var Accordion = /*#__PURE__*/function (_React$Component) {
  _inherits(Accordion, _React$Component);

  var _super = _createSuper(Accordion);

  //step rate
  function Accordion(props) {
    var _this;

    _classCallCheck(this, Accordion);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      attr: 'collapsed'
    });

    _defineProperty(_assertThisInitialized(_this), "stepSize", 1);

    _defineProperty(_assertThisInitialized(_this), "stepPeriod", 10);

    _defineProperty(_assertThisInitialized(_this), "inOpen", 'inactive');

    _defineProperty(_assertThisInitialized(_this), "openStart", null);

    _defineProperty(_assertThisInitialized(_this), "inClose", 'inactive');

    _defineProperty(_assertThisInitialized(_this), "closeStart", null);

    var height;

    if (typeof window !== 'undefined') {
      height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    } else {
      height = 1024; // this is running on the server, guess the height of the screen this will be displayed on
    }

    var stepMaxDuration = props.duration || 500; //* maximum time allowed for a scroll if it were full screen in mSec

    _this.stepSize = Math.round(height * _this.stepPeriod / stepMaxDuration); //needs to be an int

    _this.getAccordionRef = getRef.bind(_assertThisInitialized(_this), 'accordionRef');
    _this.getAccordionWrapperRef = getRef.bind(_assertThisInitialized(_this), 'accordionWrapperRef');
    return _this;
  }

  _createClass(Accordion, [{
    key: "componentWillReceiveProps",
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
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.active) {
        var maxHeight = parseInt(this.accordionRef.style.maxHeight, 10) || 0;

        if (this.accordionWrapperRef.clientHeight >= maxHeight) {
          if (typeof window !== 'undefined') {
            this.smoothOpen();
          } else {
            this.setState({
              attr: 'expanded'
            });
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.inOpen !== 'inactive') this.inOpen = 'abort';
      if (this.inClose !== 'inactive') this.inClose = 'abort';
    }
  }, {
    key: "smoothOpen",
    value: function smoothOpen() {
      if (this.inOpen === 'active' || this.inOpen === 'abort') {
        return;
      } // dont't stutter start.


      this.inOpen = 'active';

      if (this.inClose !== "inactive") {
        this.inClose = 'abort';
      }

      var duration = this.props.duration || 500; // performance time is in miliseconds

      var accordion = this.accordionRef;
      var maxHeight = parseFloat(accordion.style.maxHeight) || 0;
      var height = accordion.clientHeight;

      if (maxHeight < height) {
        //minHeight may not be 0
        accordion.style.maxHeight = height + 'px';
      }

      var start = null;
      var last = null;
      this.setState({
        attr: 'expanding'
      });
      var that = this;

      function stepper(now) {
        if (!start) {
          start = now;
          last = now;
          window.requestAnimationFrame(stepper);
          return;
        }

        if (that.inOpen === 'abort') {
          that.inOpen = 'inactive';
          return;
        }

        if (now - start > duration) {
          // time is up
          that.inOpen = 'inactive';
          var nextFunc = that.props.onComplete ? function () {
            return that.props.onComplete(true);
          } : null;
          that.setState({
            attr: 'expanded'
          }, nextFunc);
          accordion.style.maxHeight = null;
          return;
        }

        var lmaxHeight = parseFloat(accordion.style.maxHeight) || 0;
        var lheight = accordion.clientHeight;
        var wheight = that.accordionWrapperRef ? that.accordionWrapperRef.clientHeight : 0;

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
    } //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  }, {
    key: "smoothClose",
    value: function smoothClose() {
      if (this.inClose === 'active' || this.inClose === 'abort') {
        return;
      } //don't stutter the close


      this.inClose = 'active';

      if (this.inOpen !== 'inactive') {
        this.inOpen = 'abort';
      } //override the open with a close


      var duration = this.props.duration || 500;
      var accordion = this.accordionRef;
      var height = accordion.clientHeight;
      accordion.style.maxHeight = Math.floor(height) + 'px';
      var minHeight = parseFloat(accordion.style.minHeight) || 0;
      if (this.accordionWrapperRef.children[0]) minHeight = Math.max(minHeight, parseFloat(this.accordionWrapperRef.children[0].style.minHeight) || 0); // wrapper is a div which wraps around the innards may have a min-height set

      this.setState({
        attr: 'collapsing'
      });
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
          that.inClose = 'inactive';
          return;
        }

        if (now - start > duration || lmaxHeight < lheight || lheight <= minHeight) {
          that.inClose = 'inactive';
          var nextFunc = that.props.onComplete ? function () {
            return that.props.onComplete(false);
          } : null;
          that.setState({
            attr: 'collapsed'
          }, nextFunc);
          accordion.style.maxHeight = null;
          return;
        }

        var lmaxHeight = parseFloat(accordion.style.maxHeight) || 0;
        var lheight =
        /*Math.floor*/
        accordion.clientHeight;
        var timeRemaining = duration - (now - start);
        var stepsRemaining = Math.max(1, Math.round(timeRemaining / (now - last))); // less than one step is one step

        var distanceRemaining = Math.max(lheight - minHeight, 1); // distance to go, but not negative

        var nextStepDistance = distanceRemaining / stepsRemaining;

        if (nextStepDistance > -1 && nextStepDistance < 1) {
          // steps are less than 1 pixel at this rate
          window.requestAnimationFrame(stepper);
          return;
        }

        var newMax =
        /*Math.floor*/
        lheight - nextStepDistance; // top of the next step

        accordion.style.maxHeight = newMax + 'px'; // set the new height

        last = now;
        window.requestAnimationFrame(stepper);
      }

      window.requestAnimationFrame(stepper); // kick off the stepper
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          classes = _this$props.classes,
          otherProps = _objectWithoutProperties(_this$props, ["className", "classes"]);

      var isText = {};
      isText[classes['text']] = this.props.text;
      var classNames = (0, _classnames["default"])(className, classes['accordion'], classes[this.state.attr], isText);
      return /*#__PURE__*/_react["default"].createElement("div", _extends({
        className: classNames,
        ref: this.getAccordionRef
      }, otherProps), /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.getAccordionWrapperRef
      }, this.props.children));
    }
  }]);

  return Accordion;
}(_react["default"].Component);

var _default = (0, _reactJss["default"])(styles)(Accordion);

exports["default"] = _default;