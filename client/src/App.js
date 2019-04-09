// src/App.jsx
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import FullStory from 'react-fullstory';

import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import Marketing from './Pages/Marketing'

// Private Route HOC 
const PrivateRoute = ({ component, exact = false, path, authenticated }) => (
    <Route
       exact={exact}
       path={path}
       render={props =>
          authenticated 
          ? (React.createElement(component, props))
          : (
                <Redirect
                   key="login"
                   to={'/login'}
                />
             )
       }
    />
 );

class Routing extends Component {

   user = JSON.parse(localStorage.getItem('designedx-user'))

   state = { 
      loggedIn: this.user ? true : false,
      user: this.user ? this.user : ''
    }
   
   authenticate = async (username, email, password, action) => {
      let params = JSON.stringify({params: {
         username: username,
         email: email,
         password: password,
         action: action
      }})

      const authParams = {
         method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: params
      };
      const request = new Request('/api/auth', authParams);
      const response = await fetch(request);
      const body = await response.json();    
      return body;
   }

 
    handleLogin = (username, password) => {
       // sending login (email is left blank)
      this.authenticate(username, '', password, 'login')
         .then(res => {
            if (res.id) {
               let user = {
                  username: username,
                  userId: res.id
               };
               localStorage.setItem('designedx-user', JSON.stringify(user));
               this.setState({ loggedIn: true, user: user })
            }
            else if (res.error) {
               // the [0] is because getElementsByClassName gives an array
               document.getElementsByClassName('login-validation')[0].style.visibility = 'visible';
            }
         })
         .catch(err => console.log(err));
    }

    handleSignup = (username, email, password) => {
      if (username && email && password) {
         this.authenticate(username, email, password, 'signup')
         .then(res => {
            if (res.id) {
               let user = {
                  username: username,
                  userId: res.id
               };
               localStorage.setItem('designedx-user', JSON.stringify(user));
               this.setState({ loggedIn: true, user: user })
            }
            else if (res.error) {
               // the [0] is because getElementsByClassName gives an array
               document.getElementsByClassName('login-validation')[0].innerHTML = 'Username already exists. Please choose another one';
               document.getElementsByClassName('login-validation')[0].style.visibility = 'visible';
            }
         })
         .catch(err => console.log(err));
      } 
      else {
         document.getElementsByClassName('login-validation')[0].innerHTML = 'Please fill all fields';
         document.getElementsByClassName('login-validation')[0].style.visibility = 'visible';
      }
    }

    onLogout() {
      localStorage.removeItem('designedx-user');
      this.setState({ loggedIn: false, user: null })
    }

 
    routes() {
       let { loggedIn } = this.state
       const routeArr = [
          <Route
             exact
             path="/"
             component={() =>
                loggedIn 
                ? (<Redirect to="/home" />) 
                : (<Redirect to="/marketing" />)}
          />,
          <PrivateRoute
             authenticated={loggedIn}
             key="main"
             path="/home"
             component={() => <Home onLogout={()=>this.onLogout()} loggedIn={loggedIn} user={this.state.user}/>}
          />,
          <Route key="login" exact path="/login" component={() => <LoginPage loggedIn={loggedIn} onLogin={this.handleLogin} />} />,
          <Route key="signup" exact path="/signup" component={() => <SignupPage loggedIn={loggedIn} onSignup={this.handleSignup} />} />,
          <Route key="marketing" exact path="/marketing" component={() => <Marketing loggedIn={loggedIn} />} />,
       ];
 
       if (!loggedIn) {
          routeArr.push(<Redirect key="loginRedirect" to="/login" />);
       }
 
       return routeArr;
    }
 
    render() {
       return (
          <Router>
             <Switch>{this.routes()}</Switch>
          </Router>
       )
    }
 }
 
 const App = () => (
    <div>
        <FullStory org="K3EEH" />
        <div className="container">
            <Routing />
        </div>
    </div>
 )
 
export default App