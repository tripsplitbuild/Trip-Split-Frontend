import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import LoginPage from './components/Profile/LoginPage';
import ProfileHome from './components/Profile/ProfileHome';
import Trip from './components/Trip/Trip';
import ExpenseTrip from './components/Trip/ExpenseTrip';


import './css/index.css';


export default class App extends Component {
    render(){
      return(
        <Router>
          <Route exact={true} path="/" component={LoginPage}/>
          <Route exact={true} path="/profile" component={ProfileHome}></Route>
          <Route exact={true} path="/profile/trip" component={Trip}></Route>
          <Route exact={true} path="/profile/trip/expenses" component={ExpenseTrip}></Route>
        </Router>
      )
    }
    
  }



