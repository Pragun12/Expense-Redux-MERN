import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../actions/userAction';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
          email: '',
          pwd: '',
          formErrors: {email: '', password: ''},
     
          emailValid:true,
          passwordValid:true
        
        }
      }


      handleSubmit(e){
        e.preventDefault();

        let email=this.state.email;
        let password=this.state.pwd;
        let re=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      // let re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( !re.test(String(email).toLowerCase())){
          this.setState({
            formErrors:{
              email:'Email is invalid'
            },
            emailValid:false,
            passwordValid:true
    
          })
        }
        else if( !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
          this.setState({
            formErrors:{
              password:'Password should have at least one numeric digit, one uppercase and one lowercase letter'
            }
            ,
            emailValid:true,
            passwordValid:false
          })
        
    
        }
         else{
          const postData={
           
            email: this.state.email,
            password: this.state.pwd
            
          }
          this.props.loginUser(postData)
          .then(res=>{
            //if response successful redirect to dashborad else display error message.

            //But when I run the app, dislays error "this.props.loginUser() is undefined"

            //How do I redirect to Dashboard after login
          }

          );
    
       
        }
       
       
          
        
    
    
      }
      
    handleUserInput (e) {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
       
      }
    
  render() {
    return (
        
        <div id="sign-in" >
        <div className="container row">
        <div className="col-sm-4 well login-box">
        <div className="content-wrapper">
        <h3>Expense Manager</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
           <span className="error">{this.state.emailValid?'':`${this.state.formErrors.email}`}</span>
            <input type="email" className="form-control" id="email" placeholder="Email Address" onChange={this.handleUserInput.bind(this)}  name="email"/>
          </div>
          <div className="form-group">
          <span className="error">{this.state.passwordValid?'':`${this.state.formErrors.password}`}</span>
            <input type="password" className="form-control" id="pwd" placeholder="Password" onChange={this.handleUserInput.bind(this)}  name="pwd"/>
          </div>
          <div className="checkbox">
            <label><input type="checkbox" name="remember"/> Remember me</label>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <span> OR </span>
          <Link to="/register" className="btn btn-success">Sign up</Link>
        </form>
  
      
        </div>
        </div>
        </div>
  
        </div>
    );
  }
}

const mapStateToProps=state=>({
 
  user:state.users
});

export default connect(mapStateToProps,{loginUser})(Login);
