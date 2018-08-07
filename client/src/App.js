import React, { Component } from 'react';


import Login from './components/Login';
import Register from './components/Register';
import {connect} from 'react-redux';
import './App.css';
import { Switch,BrowserRouter, Route } from 'react-router-dom';
import setAuthorizationToken from './utils/setAuthorizationToken';

import {loginUser} from './actions/userAction';

class App extends Component {
  componentWillMount(){

    if(localStorage.getItem('jwtToken')){
       setAuthorizationToken( localStorage.getItem('jwtToken'));
     
    }
 
   }
  render() {
 
    let isLoggedIn= this.props.user.isAuthenticated;
   
    const renderLoggedin=(
      <Switch>
      <Route exact path="/" component={Login }/>
      <Route path="/register" component={Register}/>
    
      </Switch>
    );

    const renderLoggedout=(
      <Switch>
      <Route exact path="/" component={Login }/>
      <Route path="/register" component={Register}/>
     
      </Switch>

    );
    return (
      
      <div className="App">
      <BrowserRouter>
       {isLoggedIn?renderLoggedin:renderLoggedout}
        </BrowserRouter>
      </div>
     
    );
  }
}

const mapStateToProps=state=>({
 
  user:state.users
});
export default connect(mapStateToProps,{loginUser})(App);
