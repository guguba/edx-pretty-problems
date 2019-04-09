import React, { Component } from 'react';
import '../styles/mystyle.css';
import Header from '../components/SiteHeader';
import Signup from '../components/Signup';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'






class SignupPage extends Component {
    

  render() {

    let loggedIn = this.props.loggedIn;
    if (loggedIn) return <Redirect to="/" />;
      
    return (
        
        [
        <Header></Header>,
        <Signup onSignup={this.props.onSignup}></Signup>
        ]
        
        
    );
  }
}

export default SignupPage;
