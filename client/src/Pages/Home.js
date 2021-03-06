import React, { Component } from 'react';
import '../styles/mystyle.css';
import MultipleChoice from '../components/MultipleChoice';
import Styler from '../components/Styler';
import Output from '../components/Output';
import Header from '../components/SiteHeader';


import mixpanel from '../helpers/mixpanel'


  





class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            styler: {
                type: "radio",
                layout: "rows",
                language: "enUs",
                textDirection: "ltr",
                primaryColor: "#e0758e",
                inverted: false,
                fontFamily: "Segoe UI"
            },
            showOutput: false,
            fileName: ''
        };
    } 
   
    onStyleChange(e, style) {
        let target = e.target;
        let val;
        let newStyler = {...this.state.styler};
        //debugger;
        if (style === "language") {
            val = target.id;
            if (val === "enUs") {
                newStyler.textDirection = "ltr";
            } 
            else if (val === "heb") {
                newStyler.textDirection = "rtl";
            }
        }
        else if (style === "type") {
            val = target.id;
        }
        else if (style === "layout") {
            val = target.id;
        }
        else if (style === "primaryColor") {
            val = target.value;
            let elem = document.querySelector("body");
            elem.style.setProperty("--primary-color", val);
        }
        else if (style === "inverted") {
            val = target.checked;
            console.log('inverted');
            let elem = document.querySelector(".multiple-choice-box");
            elem.classList.toggle("inverted");
        }
        else if (style === "fontFamily") {
            val = target.value;
            let elem = document.querySelector("body");
            elem.style.setProperty("--primary-font", val);
        }
        newStyler[style] = val;
        this.setState({
            styler: newStyler
        })
        
    }
    
    setFilename(filename) {
        this.setState({fileName: filename})
    }

    showOutput() {
        this.setState({showOutput: true });
    }

    componentDidMount() {
        mixpanel.identify(this.props.user.userId);
        mixpanel.track('Successful login');
        mixpanel.people.set({
            "$name": this.props.user.username,
        });    
      }
      
    
  render() {

    return (
        
        [
        <Header onLogout={this.props.onLogout} user={this.props.user}></Header>,
        <div className="app-content">
            <Styler styler={this.state.styler} onStyleChange={(e, style)=>this.onStyleChange(e, style)}/>
            <MultipleChoice user={this.props.user} styler={this.state.styler} showOutput={(e) => this.showOutput(e)} setFilename={(e) => this.setFilename(e)}/>
            <Output user={this.props.user} styler={this.state.styler} fileName={this.state.fileName} showOutput={this.state.showOutput}/>
        </div>
        ]
        
        
    );
  }
}

export default Home;
