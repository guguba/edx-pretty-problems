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

import mixpanel from '../helpers/mixpanel'

class HowTo extends Component {

  componentWillMount() {
    mixpanel.track('How to');
  }

  render() { 

    let loggedIn = this.props.loggedIn;
    if (loggedIn) return <Redirect to="/" />;
      
    return (
        
        [
            <Header onLogout={this.props.onLogout} user={this.props.user}></Header>,
          <div className="marketing-container">
            <div className="marketing-box top-section">
              <div className="top-description">
                <p className="back-button"><a href="/home">Back</a></p>
                <h2>How to add a designX problem to your course</h2>
                <ol className="how-to-list">
                    <li>In the designedX editor, select your design parameters. </li>
                    <li>Add your question and optional answers. </li>
                    <li>Pick one or more correct answers by clicking the circle (text questions) or on the corner triangle (in picture questions)</li>
                    <li>Click "Create" and copy the generated script</li>
                    <li>In your edX editor, add a Probelm > Advanced > Custom JavaScript Display and Grading</li>
                    <li>In the new problem, click "edit" and replace the text with the script you copied</li>
                </ol>
                <p>That's it!</p>
              </div>
              <div className="video-box"><iframe src="https://www.useloom.com/embed/e7de9c57ce804278a976a54413b793cf" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}></iframe></div>
            </div>
          </div>
        ]        
    );
  }
}

export default HowTo;
