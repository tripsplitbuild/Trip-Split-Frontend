import React, {Component} from 'react';
import './css/index.css';
import {Route} from 'react-router-dom';
import {showLogin, hideLogin} from './components/Motions/motions';


function App() {
  
    return(
      <div>
        <div className="content">
          <h1 id='h1'>Trip Split!</h1>
          <div className='action-buttons'>
            <button type="button" name="login" id="login" onClick={showLogin}>Log In!</button>
            <button type="button" name="sign-up" id="sign-up">Sign Up!</button>
          </div>
          <div className='login-form'>
            <form>
              <input type='text' name='username' id='username' placeholder='Username'/>
              <input type='password' name='password' id='password' placeholder='Password'/>
              <div className='form-buttons'>
              <button type='submit' name='submitbutton' id='submitbutton'>Log In</button>
              <button type='button' name='cancel' id='cancel' onClick={hideLogin}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  
}

export default App;
