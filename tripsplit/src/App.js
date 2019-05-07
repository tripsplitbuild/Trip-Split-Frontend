import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import LoginPage from './components/Profile/LoginPage';
import ProfileHome from './components/Profile/ProfileHome';
import Trip from './components/Trip/Trip';
import ExpenseTrip from './components/Trip/ExpenseTrip';
import CreateTrip from './components/Trip/CreateTrip';
import './css/index.css';
import {ProfileRoute, CreateTripRoute, ExpenseTripRoute, TripRoute} from './components/PrivateRoute';


export default class App extends Component {
    render(){
      return(
        <Router>
          <Route exact={true} path="/" component={LoginPage} />
          <ProfileRoute exact={true} path="/profile" component={ProfileHome} />
          <TripRoute exact={true} path="/:profile/trip" component={Trip} />
          <CreateTripRoute exact={true} path="/profile/trip/create" component={CreateTrip} />
          <ExpenseTripRoute exact={true} path="/:profile/trip/expenses" component={ExpenseTrip} />          
        </Router>
      )
    }
    
  }



