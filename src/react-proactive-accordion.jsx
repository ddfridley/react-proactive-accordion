'use strict';

import React from 'react';
import ClassNames from 'classnames';

class Accordion extends React.Component {

  state = {
    attr: 'collapsed',
  };

  stepSize = 1;
  stepPeriod = 10; //step rate

  constructor(props) {
    super(props);
    var height;

    if (typeof window !== 'undefined') {
      height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    } else {
      height = 1024; // this is running on the server, guess the height of the screen this will be displayed on
    }

    const stepMaxDuration = props.duration || 500; //* maximum time allowed for a scroll if it were full screen in mSec
    this.stepSize = Math.round(((height * this.stepPeriod) / stepMaxDuration));  //needs to be an int
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      if (!nextProps.active) {
        this.smoothClose();
      } else {
        this.smoothOpen();
      }
    }
  }

  componentDidMount() {
    if (this.props.active) {
      let maxHeight = parseInt(this.refs.accordion.style.maxHeight, 10) || 0;
      if (this.refs.accordionWrapper.clientHeight >= maxHeight) {
        if (typeof window !== 'undefined') {
          this.smoothOpen();
        } else {
          this.setState({ attr: 'expanded' });
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.inOpen !== 'inactive') this.inOpen = 'abort';
    if (this.inClose !== 'inactive') this.inClose = 'abort';
  }

  inOpen = 'inactive';

  openStart = null;

  smoothOpen() {
    if (this.inOpen === 'active' ||  this.inOpen==='abort') { return; } // dont't stutter start.
    this.inOpen = 'active';
    if (this.inClose !== "inactive") { this.inClose = 'abort' }
    const duration = (this.props.duration || 500); // performance time is in miliseconds
    let accordion = this.refs.accordion;

    let maxHeight = parseFloat(accordion.style.maxHeight) || 0;
    let height = accordion.clientHeight;
    if (maxHeight < height) { //minHeight may not be 0
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
      if (that.inOpen === 'abort') { that.inOpen = 'inactive'; return; }
      if ((now - start) > duration) { // time is up
        that.inOpen = 'inactive';
        var nextFunc = that.props.onComplete ? () => that.props.onComplete(true) : null;
        that.setState({ attr: 'expanded' }, nextFunc);
        accordion.style.maxHeight = null;
        return;
      }
      let lmaxHeight = parseFloat(accordion.style.maxHeight) || 0;
      let lheight = accordion.clientHeight;
      let wheight = that.refs.accordionWrapper ? that.refs.accordionWrapper.clientHeight : 0;

      if (wheight) {  // wrapper has a significant height
        let timeRemaining = duration - (now - start);
        let stepsRemaining = Math.max(1, Math.round(timeRemaining / (now - last))); // less than one step is one step
        let distanceRemaining = Math.max(wheight - lheight, 0); // distance to go, but not negative
        let nextStepDistance = distanceRemaining / stepsRemaining;
        if (nextStepDistance > -1 && nextStepDistance < 1) { // steps are less than 1 pixel at this rate don't set last
          requestAnimationFrame(stepper);
          return;
        }
        let newMax = lheight + nextStepDistance; // top of the next step
        accordion.style.maxHeight = newMax + 'px';
      } else {  // we don't know the height of the wrapper, the data is not populated yet
        if (lmaxHeight <= lheight) {  // if maxheight is equal to (or somehow less) increment the maxHeight another step
          accordion.style.maxHeight = Math.max((lmaxHeight + that.stepSize), lheight + 1) + 'px';
        }
      }
      last = now;
      window.requestAnimationFrame(stepper); // continue the steps
    }
    window.requestAnimationFrame(stepper);
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  inClose = 'inactive';
  closeStart = null;
  smoothClose() {
    if (this.inClose === 'active' || this.inClose==='abort') { return; } //don't stutter the close
    this.inClose = 'active';
    if (this.inOpen !== 'inactive') { this.inOpen = 'abort'; } //override the open with a close
    const duration = this.props.duration || 500;
    let accordion = this.refs.accordion;

    let height = accordion.clientHeight;
    accordion.style.maxHeight = Math.floor(height) + 'px';

    let minHeight = parseFloat(accordion.style.minHeight) || 0;
    if (this.refs.accordionWrapper.children[0])
      minHeight = Math.max(minHeight, parseFloat(this.refs.accordionWrapper.children[0].style.minHeight) || 0); // wrapper is a div which wraps around the innards may have a min-height set

    this.setState({ attr: 'collapsing' });

    var that = this;
    var start=null;
    var last=null;
    function stepper(now){
      if(!start){
        start=now;
        last=now;
        window.requestAnimationFrame(stepper);
        return;
      }
      if (that.inClose === 'abort') { that.inClose = 'inactive'; return; }
      if ((now - start > duration)
        || (lmaxHeight < lheight)
        || (lheight <= minHeight)) {
        that.inClose = 'inactive';
        var nextFunc = that.props.onComplete ? () => that.props.onComplete(false) : null;
        that.setState({ attr: 'collapsed' }, nextFunc);
        accordion.style.maxHeight = null;
        return;
      }
      let lmaxHeight = parseFloat(accordion.style.maxHeight) || 0;
      let lheight = /*Math.floor*/(accordion.clientHeight);

      let timeRemaining = duration - (now - start);
      let stepsRemaining = Math.max(1, Math.round(timeRemaining / (now-last))); // less than one step is one step
      let distanceRemaining = Math.max(lheight - minHeight, 1); // distance to go, but not negative
      let nextStepDistance = distanceRemaining / stepsRemaining;
      if (nextStepDistance > -1 && nextStepDistance < 1) { // steps are less than 1 pixel at this rate
        window.requestAnimationFrame(stepper);
        return;
      }
      let newMax = /*Math.floor*/(lheight - nextStepDistance); // top of the next step
      accordion.style.maxHeight = newMax + 'px'; // set the new height
      last=now;
      window.requestAnimationFrame(stepper);
    }
    window.requestAnimationFrame(stepper); // kick off the stepper
  }

  render() {
    var classes = ClassNames(
      this.props.className,
      'accordion',
      {
        'text': this.props.text,
      },
      this.state.attr
    );
    return (
      <section className={classes} ref='accordion' style={this.props.style} onClick={this.props.onClick} >
        <div ref='accordionWrapper' >
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default Accordion;
