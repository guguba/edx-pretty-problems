import React, { Component } from 'react';
import '../styles/mystyle.css';
import Header from '../components/SiteHeader';
import Login from '../components/Login';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'






class LoginPage extends Component {

  render() {

    let loggedIn = this.props.loggedIn;
    if (loggedIn) return <Redirect to="/" />;
      
    return (
        
        [
        <Header></Header>,
        <Login onLogin={this.props.onLogin}></Login>
        ]
        
        
    );
  }
}

export default LoginPage;
