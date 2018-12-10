[demo] (http://react-proactive-accordion.herokuapp.com)
# react-proactive-accordion
A React Component that will expand and collapse it's child over a duration of time.

Why do we need yet another React accordion? Many accordion's don't work when the child height is initially 0, such as when the child  is not ready yet because data has to be obtained from an external source such as a database or another server.  This Accordion is proactive and will try to expand anyway and will wait through the duration until the child get's it's data and a resulting height, then the according will expand around the child.

This accordion is also load adaptive.  If the system is slow to respond, times and distances will be recalculated. If there is a small distance to move, and lost of time, timers will be calculated not to cause unnecessary waste.

# Server side rendering
Note that when an accordion renders on the server side, it immediately renders as active or inactive without a transition time.

react-proactive-accordion uses react-jss to include css classes in the javascript source.  If you are rendering on the client side, there is worry, and no need to include a separate css file.  If you are rendering on the server side, you will need to follow the server side rendering guidelines from react-jss.

Namely:

    import {renderToString} from 'react-dom/server';
    import { JssProvider, SheetsRegistry } from 'react-jss'
    ...
        const sheets= new SheetsRegistry()
        const body = renderToString(
            <JssProvider registry={sheets}>
                <App {...props}/>
            </JssProvider>
        )

    ...
        res.send(
            `...
            <style type="text/css">
                ${sheets.toString()}
            </style>

            ...
            <div id="synapp">${body}</div>
            ...`
        )

## Demo
http://react-proactive-accordion.herokuapp.com

This demo allows you to expand and contract the accordion (active=true/false).  It also lets you change the duration of the expand/contract and the delay from the start until when the data is available. Note that the data is not available the first time the accordion is rendered, or the first time after you change the delay or duration variable. The active/not active check box will not cause the data to be removed.

The data for the Article is retrieved through ArticleStore, which gets it's data from an array, but represents the idea that data is obtaines from a database or external resource.  

Observer that if you make the delay larger than the duration, the onComplete message will appear, though nothing is shown, and later the data will appear.

If you git fork https://github.com/ddfridley/react-proactive-accordion you can open the file dist/demo/demo.html with your browser and it will work. (Tested on windows with edge and chrome). You can also run 

    node dist/server.js 

to fire up a server. http://localhost:5000

To install and run this on heroku, after you have an account and have installed the heroku tool belt:

    heroku create
    heroku config:set NPM_CONFIG_PRODUCTION=false
    git push heroku master

Now go to the URL they created for you when you ran heroku create.  
You have to set NPM_CONFIG_PRODUCTION to false, because other wise npm/heroku won't install the dev dependencies otherwise.

# Usage

    <Accordion duration={500} text onComplete={} active={true}>
        <child>
    </Accordion>

## active

true= Accordion is/will expand.

false= Accordion is/will collapse.

## duration
The time in mSec for the expand/collapse to take.

default: 500

## onComplete 

a function to call after the accordion has completed expanding or collapsing.  The function will be called with the value of active uppon completion.

## text
If true the text class is also applied to styling.  The reason for this is that overflow hidden does not work will for text when there are other object in the div, and so overflow-y is used.  But frankly, this isn't perfect either and I wish there was an overflow: hidden that just worked like you think it should for text. 

# Styling

See accordion.css.  CSS class names will be applied to the accordion class when it is 'expanding', 'expanded', 'contracting', 'contracted'.  The 'text' class is also applied if passed to the accordion. You can build on these classes if that helps.

# Test

These tests will run on chrome on windows. In some other environment you will have to edit test.sh and change the path.  Chrome will exit if the tests passed and you will get a message. (Othere browsers don't exit). In the future I will put this in selenium or phantomjs.  Jsdom is not sufficient because testing really requires components to be rendered (they need to have different heights).  Also, debugging the tests/src really requires being able to 'see' what's going on.  

__Note for browser developers__ it was surprisingly easy to build tests that run in the browser, but frustratingly difficult to communicate success/failure back to the shell.  I wish window.close(_result_) exited and returned _result_ to the shell. (If the process was started from a shell)

I'm also thinking about combining the demo and the test into one. Think of a button in the upper right corner [run] that lets you run the tests and reports on the status.

