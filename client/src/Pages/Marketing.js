import React, { Component } from 'react';
import '../styles/mystyle.css';
import '../styles/marketing.css';

import Header from '../components/SiteHeader';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'






class Marketing extends Component {

  render() {

    let loggedIn = this.props.loggedIn;
    if (loggedIn) return <Redirect to="/" />;
      
    return (
        
        [
          <Header/>,
          <div className="marketing-container">
            <div className="marketing-box top-section">
              <div className="top-description">
                <div><h2>Create quicker, better looking problems for edX and Open edX</h2>
                <p>
                - First ever visual problem editing tool for edX<br/>
                - Control colors, fonts and more  <br/>
                - Uses edX's custom JavaScript abilities to connect to your course's grading system  <br/>
                - More problem types comming soon - image questions, matching questions, and more!
                </p></div>
                <a className="button" href="/signup">Sign up!</a>
              </div>
              <div className="video-box"><iframe src="https://www.useloom.com/embed/e7de9c57ce804278a976a54413b793cf" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}></iframe></div>
            </div>
          <div className="marketing-box pricing">
            <h2>Sign up for free and try it yourself! </h2>
            <div className="pricing-details">
              <div className="price-box">
                <h2>Free Trial</h2>
                <p>Try for free until your courses become live!</p>
                <h2>Free</h2>
              </div>
              <div className="price-box">
                <h2>Live Courses</h2>
                <p>Use in as many courses as you'd like</p>
                <h2>$500/y</h2>
              </div>
              <div className="price-box">
                <h2>Custom Components</h2>
                <ul>
                  <li>Use in as many courses as you'd like</li>
                  <li>Development of custom features and 
                  components to suit your unique needs</li>
                </ul>
                <h2>Email me :)</h2>
              </div>
            </div>
            <h2 className="contact">Any questions? Contact me at guybarner1@gmail.com</h2>
          </div>
          <div className="marketing-box about">
            <h2 className="contact">About designedX:</h2>
            <p>
              designedX was built by Guy Barner, a developer and Ed-Tech professional specializing in edX and Open edX.<br/>
              I've seen many course developer struggling with the non-intuitive and non-customizable course editing interface that comes built-in with the edX platform.<br/>
              This tool was built for all of you course makers - I welcome you to use it and to contact me to help improve it so it can help you create even better courses. </p>
          </div>
          </div>
        ]
        
        
    );
  }
}

export default Marketing;
