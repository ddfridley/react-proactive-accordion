'use strict';

import React from 'react';
import ClassNames          from 'classnames';

class Accordion extends React.Component {

  state             =   {
    attr            :   'collapsed',
  };

  stepSize = 7;
  stepPeriod = 10; //step rate

  constructor (props) {
    super(props);
    var height;

    if (typeof window !== 'undefined' ) { 
      height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight; 
    } else {
      height=1024; // this is running on the server, guess the height of the screen this will be displayed on
    } 

    const stepMaxDuration= props.duration || 500; //* maximum time allowed for a scroll if it were full screen in mSec
    this.stepSize= Math.round(((height * this.stepPeriod) / stepMaxDuration ) );  //needs to be an int
  }

  componentWillReceiveProps (nextProps) {
      if(this.props.active!==nextProps.active) {
        if(!nextProps.active) {
          this.smoothClose();
        } else { 
          this.smoothOpen(); 
        }
     }
  }

  componentDidMount() {
    if(this.props.active) {
      let maxHeight = parseInt(this.refs.accordion.style.maxHeight,10) || 0;
      if(this.refs.accordionWrapper.clientHeight >= maxHeight) { 
        if( typeof window !== 'undefined') {  
          this.smoothOpen(); 
        } else {
            this.setState( { attr : 'expanded'} );
        }
      }
    }
  }

  componentWillUnmount(){
    if(this.inOpen!=='inactive') this.inOpen='abort';
    if(this.inClose!=='inactive') this.inClose='abort';
  }

  inOpen='inactive';

  openStart=null;

  smoothOpen() {
    if(!this.openStart) this.openStart= new Date().getTime();
    else return; // don't stutter start
    if(this.inOpen==='active') { return; } // dont't stutter start.
    this.inOpen='active';
    if(this.inClose!=="inactive") {this.inClose='abort'}
    var duration = this.props.duration || 500;
    let accordion = this.refs.accordion;

    let timerMax=1000;  //just in case

    let maxHeight = parseInt(accordion.style.maxHeight,10) || 0;
    let height= accordion.clientHeight;
    if (maxHeight < height) { //minHeight may not be 0
      accordion.style.maxHeight= height + 'px';
    } 

    this.setState( { attr : 'expanding'} );

    var stepPeriod=this.stepPeriod;
    var that=this;
    var stepper= ()=>{
      if(that.inOpen==='abort'){ that.openStart=null; that.inOpen='inactive'; return; }
      let now=new Date().getTime();
      if((now - that.openStart)>duration) { // time is up
            that.inOpen='inactive';
            that.openStart=null;
            var nextFunc= that.props.onComplete ? ()=>that.props.onComplete(true) : null;
            that.setState( { attr : 'expanded'}, nextFunc );
            accordion.style.maxHeight=null;
            return;
      }
      let lmaxHeight = parseInt(accordion.style.maxHeight,10) || 0;
      let lheight= accordion.clientHeight;
      let wheight=that.refs.accordionWrapper ? that.refs.accordionWrapper.clientHeight : 0;

      if(wheight){  // wrapper has a significant height
            let timeRemaining = duration - (now - that.openStart);
            let stepsRemaining = Math.max(1, Math.round(timeRemaining / stepPeriod)); // less than one step is one step
            let distanceRemaining = Math.max(wheight - lheight, 0); // distance to go, but not negative
            let nextStepDistance=distanceRemaining/stepsRemaining;
            if(nextStepDistance<1 && nextStepDistance>0) { // steps are less than 1 pixel at this rate
              stepPeriod=Math.ceil(timeRemaining/distanceRemaining); // time between pixels
              var shortStepPeriod=stepPeriod;
              if(nextStepDistance<0.5) {
                shortStepPeriod=Math.max(that.stepPeriod, Math.ceil((1-nextStepDistance)*stepPeriod)); // time to the next pixel but at least something
                setTimeout(stepper,shortStepPeriod); // come back later and less often
                return;
              }
            } 
            let newMax = Math.ceil(lheight + nextStepDistance); // top of the next step
            accordion.style.maxHeight=newMax+'px';
      } else {  // we don't know the height of the wrapper, the data is not populated yet

          if( lmaxHeight <= lheight ){  // if maxheight is equal to (or somehow less) increment the maxHeight another step
            accordion.style.maxHeight = Math.max((lmaxHeight + that.stepSize), lheight + 1) + 'px';
          } 
      }
      setTimeout(stepper,stepPeriod); // continue the steps
    }
    setTimeout(stepper,stepPeriod);  // start the stepper
  }

 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  inClose='inactive';
  closeStart=null;
  smoothClose() {
    // set an interval to update scrollTop attribute every 25 ms
    if(!this.closeStart) this.closeStart= new Date().getTime();
    else return; // don't stutter close
    if(this.inClose=='active'){return;} //don't stutter the close
    this.inClose='active';
    if(this.inOpen!='inactive') { this.inOpen='abort';} //override the open with a close
    var duration = this.props.duration || 500;
    let accordion = this.refs.accordion;

    let height= accordion.clientHeight;
    accordion.style.maxHeight= Math.floor(height) + 'px';

    let minHeight = parseInt(accordion.style.minHeight,10) || 0;
    if(this.refs.accordionWrapper.children[0]) 
      minHeight= Math.max(minHeight, parseInt(this.refs.accordionWrapper.children[0].style.minHeight,10) || 0); // wrapper is a div which wraps around the innards may have a min-height set

    this.setState( { attr : 'collapsing' } );

    var stepPeriod=this.stepPeriod;
    var that=this;
    var stepper= ()=>{
      if(that.inClose==='abort'){ that.closeStart=null; that.inClose='inactive'; return; }
      let now=new Date().getTime();
      if( (now-that.closeStart >duration)
        ||(lmaxHeight < lheight)
        ||(lheight <= minHeight)) {
        that.inClose='inactive';
        that.closeStart=null;
        var nextFunc= that.props.onComplete ? ()=>that.props.onComplete(false) : null;
        that.setState({ attr : 'collapsed' }, nextFunc);
        accordion.style.maxHeight=null;
        return;
      }
      let lmaxHeight = parseInt(accordion.style.maxHeight,10) || 0;
      let lheight= Math.floor(accordion.clientHeight);

      let timeRemaining = duration - (now - that.closeStart);
      let stepsRemaining = Math.max(1, Math.round(timeRemaining / stepPeriod)); // less than one step is one step
      let distanceRemaining = Math.max(lheight - minHeight, 1); // distance to go, but not negative
      let nextStepDistance=distanceRemaining/stepsRemaining;
      if(nextStepDistance<1 && nextStepDistance>0) { // steps are less than 1 pixel at this rate
        stepPeriod=Math.ceil(timeRemaining/distanceRemaining); // time between pixels
        var shortStepPeriod=stepPeriod;
        if(nextStepDistance<0.5) {
          shortStepPeriod=Math.max(that.stepPeriod, Math.ceil((1-nextStepDistance)*stepPeriod)); // time to the next pixel but at least something
          setTimeout(stepper,shortStepPeriod); // come back later and less often
          return;
        }
      }
      let newMax = Math.floor(lheight - nextStepDistance); // top of the next step
      accordion.style.maxHeight=newMax+'px'; // set the new height
      setTimeout(stepper,stepPeriod);
    }
    setTimeout(stepper, stepPeriod) // kick off the stepper
  }

  render () {
    var classes = ClassNames( 
            this.props.className, 
            'accordion',
            {   
              'text': this.props.text,
            },
            this.state.attr
    );
    return (
      <section className={ classes } ref='accordion' style={ this.props.style } onClick={this.props.onClick} >
        <div ref='accordionWrapper' >
          { this.props.children }
        </div>
      </section>
    );
  }
}

export default Accordion;
