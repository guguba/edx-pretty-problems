import React, { Component } from 'react';
import '../styles/mystyle.css';




class Signup extends Component {
    
    constructor(props) {
        super(props);
    }

    onSignup() {
        let username = document.getElementById('userName').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        this.props.onSignup(username, email, password);
    }
    
  render() {
      
    return (
        [<div className="widget-external-box">
            <div className="widget-header">
                <h2>Sign up</h2>
            </div>
            <div className="options-box">
                <input className="text-input" type="text" id="userName" placeholder="Organization name"/>
                <input className="text-input" type="text" id="email" placeholder="Contact email"/>
                <input className="text-input" type="password" id="password" placeholder="Password"/>
                <button className="login-button" onClick={()=>this.onSignup()}>Sign up</button>
                <p className="validation login-validation">username already exists. please choose another one</p>
            </div>
        </div>,
        <p className="change-login">Already have an account? <a href="/">Log in</a></p>
        ]
    );
  }
}

export default Signup;
