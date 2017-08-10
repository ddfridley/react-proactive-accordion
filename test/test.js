'use strict'


import React from 'react';
import ReactDOM from 'react-dom';
import should from 'should';

var sleep = (delay)=> {
    return new Promise(resolve => setTimeout(_ => resolve("theValue"), delay));
}

var perror = (error)=>{
    message(error.message)
    window.returnValue=error;
}

var log = document.getElementById('log');
var message = (text)=>{
    log.innerHTML=text+"<br/>"+log.innerHTML;
}

// this is relative from dist/test/es5
import Accordion from '../../react-proactive-accordion';

var active=true;
var onCompleteReturned = {};

var start ={now: new Date().getTime()};
const App=()=>(
    <Accordion active={active} onComplete={(a)=>{onCompleteReturned.result=a; onCompleteReturned.period=new Date().getTime(); message("period "+(onCompleteReturned.period-start.now))}}>
        <div style={{padding: '10em', backgroundColor: 'green'}}>This a div with text in it.\n\nAnd two lines of text.</div>
    </Accordion>
);

var target;

var rerender=()=>{
    ReactDOM.render(
    <App ref={(app)=>{target=app}}/>,
    document.getElementById('root')
    );
}

rerender();

const wrapper = document.getElementsByClassName('accordion expanding');

wrapper.length.should.be.exactly(1);

const accordion=wrapper[0];

accordion.className.should.be.exactly('accordion expanding');
onCompleteReturned.should.not.have.property('result');

sleep(600).then(()=>{
    accordion.className.should.be.exactly('accordion expanded');
    onCompleteReturned.result.should.be.exactly(true);
    active=false;
    start.now =new Date().getTime();
    rerender();
    accordion.className.should.be.exactly('accordion collapsing');
    sleep(450).then(()=>{
        accordion.className.should.be.exactly('accordion collapsing');
        sleep(200).then(()=>{
            accordion.className.should.be.exactly('accordion collapsed');
            onCompleteReturned.result.should.be.exactly(false);
            message("success!");
            window.ReturnValue=0;
            window.close(1);
        })
        .catch(perror);
    })
    .catch(perror);
})
.catch(perror);
