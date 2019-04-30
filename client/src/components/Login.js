import React, { Component } from 'react';
import '../styles/mystyle.css';




class Login extends Component {
    
    constructor(props) {
        super(props);
    }

    onLogin() {
        let username = document.getElementById('userName').value;
        let password = document.getElementById('password').value;
        this.props.onLogin(username, password)
    }
    
  render() {
      
    return (
        [<div className="widget-external-box">
            <div className="widget-header">
                <h2>Log in</h2>
            </div>
            <div className="options-box">
                <input className="text-input" type="text" id="userName" placeholder="Organization name"/>
                <input className="text-input" type="password" id="password" placeholder="Password"/>
                <button className="login-button" onClick={()=>this.onLogin()}>Log in</button>
                <p className="validation login-validation">Wrong username or password. Try again.</p>

            </div>
        </div>,
        <p className="change-login">Want to start designing your courses? <a href="/signup">Sign up!</a></p>
        ]
    );
  }
}

export default Login;
