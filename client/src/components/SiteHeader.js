import React, { Component } from 'react';
import '../styles/mystyle.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from 'react-router-dom'
  




class Header extends Component {
    
    constructor(props) {
        super(props);
    }

    onLogout() {
        this.props.onLogout()
        return <Redirect to="/" />
    }
    
  render() {

    let username = this.props.user ? this.props.user.username : '';
    let isUserConnected = (this.props.user !== undefined);
      
    return (
        <div className="header">
            <div className="logo-box">
                <h1 className="logo">designedX</h1>
                <h2 className="logo-description">A problem design tool for edX courses</h2>
            </div>
            {isUserConnected && <div className="my-profile" >
                <p>Hello, {username}</p>
                <p id="logout" onClick={()=>this.onLogout()}>Log out</p>
            </div>}
            {!isUserConnected && <div className="my-profile" >
                <p><a href="/marketing">homepage</a></p>
                <p><a href="/signup">Sign up</a></p>
                <p><a href="/login">login</a></p>
            </div>}
        </div>
    );
  }
}

export default Header;
