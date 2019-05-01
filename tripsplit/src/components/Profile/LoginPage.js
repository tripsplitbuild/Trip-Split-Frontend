import React, {Component} from 'react';
import {showLogin, hideLogin, showRegister, hideRegister,background} from '../Motions/motions';
import ProfileHome from './ProfileHome';
import {Link, Route} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import title from  '../../img/title.png'
import { connect } from 'react-redux';
import {register, login} from '../Actions/index';


class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            credentials:{
                username: '',
                password: ''
            },
            registration:{
                first_name:'',
                last_name:'',
                gender: '',
                avatar: '',
                username:'',
                password: ''
            }
        }
    } 

    handleRegChange = e =>{
      e.preventDefault();
      this.setState({
        registration: {
          ...this.state.registration,
        [e.target.name]: e.target.value
        }
      });
      console.log(this.state.registration)      
    };


    handleRegister = e =>{
      e.preventDefault();

      let newUser = {
        first_name: this.state.registration.first_name,
        last_name: this.state.registration.last_name,
        gender: this.state.registration.gender,
        avatar: this.state.registration.avatar,
        username: this.state.registration.username,
        password: this.state.registration.password
      };
      console.log(newUser)
      this.props.register(newUser).then(() => this.props.history.push('/profile'))  
    }

    handleLogChange = e =>{
      e.preventDefault();
      this.setState({
        credentials:{
          ...this.state.credentials,
          [e.target.name]: e.target.value
        },
        
      });
      
    }

    handleLogin = e =>{
      e.preventDefault();

      let credentials = {
        username: this.state.credentials.username,
        password: this.state.credentials.password
      }
      console.log(credentials);
      console.log(this.props)
      this.props.login(credentials).then(()=>this.props.history.push('/profile/7'))
    }

    componentDidMount(){
      background(); 
           
    }
    render(){
        return(           
            <div>
            <div className="content">
            <span className="header">
                <img src={title} id='title'/>            
                <div className='action-buttons'>
                  <button type="button" name="login" id="login" onClick={showLogin}>Log In</button>
                  <button type="button" name="sign-up" id="sign-up"onClick={showRegister}>Sign Up</button>
                </div>
              </span>
              <span className='content-area'>
              <div className="carousel">
              </div>
              <div className='form-area'>
                <div className='login-form'>
                  <form onSubmit={this.handleLogin}>
                    <input type='text' name='username' id='username' placeholder='Username' onChange={this.handleLogChange}/>
                    <input type='password' name='password' id='password' placeholder='Password' onChange={this.handleLogChange}/>
                    <div className='form-buttons'>
                    <button type='submit' name='submitbutton' id='submitbutton'>Log In</button>
                    <button type='button' name='cancel' id='cancel' onClick={hideLogin}>Cancel</button>
                    </div>
                  </form>
                </div>
                <div className='registration-form'>
                  <form onSubmit={this.handleRegister}>
                    <input type='text' name='first_name' id='first-name' placeholder='First Name' onChange={this.handleRegChange}/>
                    <input type='text' name='last_name' id='last-name' placeholder='Last Name' onChange={this.handleRegChange}/>                    
                    <input type="text" name="username" id="password" placeholder="Username" onChange={this.handleRegChange}/>
                    <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleRegChange}/>
                    <div className="mid-form">
                      <div id="gender-select">
                        <select id="gender">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Rather Not Say">Rather Not Say</option>
                        </select>
                        <p>(optional)</p>
                      </div>
                      <div id="select-avatar">
                        <img id="avatar" src='' alt=""/>
                        <div id='button-area'>
                          <button id="selectAva">Avatar</button>
                          <p>(optional)</p>
                        </div>
                      </div>
                    </div>
                    <div className='registration-buttons'>
                    <button type="submit" id="register">Submit</button>
                    <button type="button" id="cancel" onClick={hideRegister}>Cancel</button>
                  </div>
                  </form>                  
                </div>
                </div>
                </span>
            </div>
          </div>
        )
    }
}

const mapStateToProps = state =>{
  return{
    isRegistering: state.isRegistering,
    isLoggedIn: state.isLoggedIn,
    credentials: state.credentials
  };
};

export default connect(
  mapStateToProps,
  {register, login}
)(LoginPage);

 

