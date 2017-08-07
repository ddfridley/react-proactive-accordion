'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Accordion from './react-proactive-accordion';

window.logger={};
logger.info=()=>console.info(...arguments);
logger.error=()=>{console.info("logger.error called", ...arguments)};
logger.trace=()=>{};

var demoData=[
    {   subject: "The Constitution of the United States",
        text: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.",
        parent: null,
        id: '1',
    },
    {   subject: "Article. I. [Congress of the United States]",
        text: "",
        parent: '1',
        id: '2'
    },
    {   subject: "Section. 1.",
        text: "All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.",
        parent: '2',
        id: '3'
    },
    {   subject: "Section. 2.",
        text: "The House of Representatives shall be composed of Members chosen every second Year by the People of the several States, and the Electors in each State shall have the Qualifications requisite for Electors of the most numerous Branch of the State Legislature.\n\nNo Person shall be a Representative who shall not have attained to the Age of twenty five Years, and been seven Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State in which he shall be chosen.\n\nRepresentatives and direct Taxes shall be apportioned among the several States which may be included within this Union, according to their respective Numbers, which shall be determined by adding to the whole Number of free Persons, including those bound to Service for a Term of Years, and excluding Indians not taxed, three fifths of all other Persons. The actual Enumeration shall be made within three Years after the first Meeting of the Congress of the United States, and within every subsequent Term of ten Years, in such Manner as they shall by Law direct. The Number of Representatives shall not exceed one for every thirty Thousand, but each State shall have at Least one Representative; and until such enumeration shall be made, the State of New Hampshire shall be entitled to chuse three, Massachusetts eight, Rhode-Island and Providence Plantations one, Connecticut five, New-York six, New Jersey four, Pennsylvania eight, Delaware one, Maryland six, Virginia ten, North Carolina five, South Carolina five, and Georgia three.\n\nWhen vacancies happen in the Representation from any State, the Executive Authority thereof shall issue Writs of Election to fill such Vacancies.\n\nThe House of Representatives shall chuse their Speaker and other Officers; and shall have the sole Power of Impeachment",
        parent: '2',
        id: '4'
    },
    {   subject: "Article. II. [President of the United States of America]",
        text: "",
        parent: '1',
        id: '5'
    },
    {   subject: "Section. 1.",
        text: 'The executive Power shall be vested in a President of the United States of America. He shall hold his Office during the Term of four Years, and, together with the Vice President, chosen for the same Term, be elected, as follows\n\nEach State shall appoint, in such Manner as the Legislature thereof may direct, a Number of Electors, equal to the whole Number of Senators and Representatives to which the State may be entitled in the Congress: but no Senator or Representative, or Person holding an Office of Trust or Profit under the United States, shall be appointed an Elector.\n\nThe Electors shall meet in their respective States, and vote by Ballot for two Persons, of whom one at least shall not be an Inhabitant of the same State with themselves. And they shall make a List of all the Persons voted for, and of the Number of Votes for each; which List they shall sign and certify, and transmit sealed to the Seat of the Government of the United States, directed to the President of the Senate. The President of the Senate shall, in the Presence of the Senate and House of Representatives, open all the Certificates, and the Votes shall then be counted. The Person having the greatest Number of Votes shall be the President, if such Number be a Majority of the whole Number of Electors appointed; and if there be more than one who have such Majority, and have an equal Number of Votes, then the House of Representatives shall immediately chuse by Ballot one of them for President; and if no Person have a Majority, then from the five highest on the List the said House shall in like Manner chuse the President. But in chusing the President, the Votes shall be taken by States, the Representation from each State having one Vote; A quorum for this Purpose shall consist of a Member or Members from two thirds of the States, and a Majority of all the States shall be necessary to a Choice. In every Case, after the Choice of the President, the Person having the greatest Number of Votes of the Electors shall be the Vice President. But if there should remain two or more who have equal Votes, the Senate shall chuse from them by Ballot the Vice President.\n\nThe Congress may determine the Time of chusing the Electors, and the Day on which they shall give their Votes; which Day shall be the same throughout the United States.\n\nNo Person except a natural born Citizen, or a Citizen of the United States, at the time of the Adoption of this Constitution, shall be eligible to the Office of President; neither shall any Person be eligible to that Office who shall not have attained to the Age of thirty five Years, and been fourteen Years a Resident within the United States.\n\nIn Case of the Removal of the President from Office, or of his Death, Resignation, or Inability to discharge the Powers and Duties of the said Office, the Same shall devolve on the Vice President, and the Congress may by Law provide for the Case of Removal, Death, Resignation or Inability, both of the President and Vice President, declaring what Officer shall then act as President, and such Officer shall act accordingly, until the Disability be removed, or a President shall be elected.\n\nThe President shall, at stated Times, receive for his Services, a Compensation, which shall neither be encreased nor diminished during the Period for which he shall have been elected, and he shall not receive within that Period any other Emolument from the United States, or any of them.\n\nBefore he enter on the Execution of his Office, he shall take the following Oath or Affirmation:—"I do solemnly swear (or affirm) that I will faithfully execute the Office of President of the United States, and will to the best of my Ability, preserve, protect and defend the Constitution of the United States."',
        parent: '5',
        id: '6'
    }
];

class Article extends React.Component {
    mounted=[];
    render() {
        if(!this.props.articles.length) return null;
        const {subject, text, id}=this.props.articles[0];

        return(
            <div className={'article'}>
                <div className={'subject'} >{subject}</div>
                <div className={'text'} ref='text'>{text}</div>
            </div>
        );
    }
}

class ArticleStore extends React.Component {
    constructor(props){
        super(props)
    }
    state={articles: []};

    renderChildren(){
        return React.Children.map(this.props.children, child =>{
            var newProps= Object.assign({}, 
                this.props,
                this.state 
            );
            delete newProps.children;
            return React.cloneElement(child, newProps, child.props.children)
        });
    }

    componentDidMount(){
        setTimeout(()=>{
            var articles=demoData.reduce((acc,dat)=>{
                if(dat.parent===this.props.parent) acc.push(dat);
                return acc;
            },[]);
            this.setState({articles})
        },this.props.delay || 100);
    }

    render(){
        return <section>{this.renderChildren()}</section>;
    }
}



class App extends React.Component {
    state={active: true, onComplete: null} // the key in the Accordion below causes React to render a new element when either value has changed
    duration=500;
    delay=100;
    render(){
        var oldNow=new Date().getTime();
        return (
            <div className="accordion-demo">
                <div>accordion active=<input type="checkbox" checked={this.state.active} onChange={(e)=>{this.setState({active: e.target.checked, onComplete: null})}} /></div>
                <div>accordion duration=<input type="text" defaultValue={this.duration} onKeyUp={(e)=>{this.duration=parseInt(e.target.value,10); if(e.keyCode===13) this.setState({onComplete: null})}} /></div>
                <div>content delay=<input type="text" defaultValue={this.delay} onKeyUp={(e)=>{this.delay=parseInt(e.target.value,10); if(e.keyCode===13) this.setState({onComplete: null})}} /></div>
                <div>onComplete{this.state.onComplete}</div>
                <Accordion duration={this.duration}
                           active={this.state.active}
                           onComplete={()=>{var newNow=new Date().getTime(); this.setState({onComplete: ' called after '+(newNow-oldNow)+'mSec'})}} 
                           key={this.duration+'-'+this.delay} >
                    <ArticleStore parent={'5'} delay={this.delay}>
                        <Article/>
                    </ArticleStore>
                </Accordion>
            </div>
        );
    }
}

ReactDOM.render(

  <App />,

  document.getElementById('root')
);


