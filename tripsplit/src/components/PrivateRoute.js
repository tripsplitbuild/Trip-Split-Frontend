import React from 'react';
import {Route, Redirect} from 'react-router';
import {ProfileHome} from './Profile/ProfileHome';
import {CreateTrip} from './Trip/CreateTrip';
import {ExpenseTrip} from './Trip/ExpenseTrip';
import {Trip} from './Trip/Trip';
import {withRouter} from 'react-router-dom';


//const CreateTrip = withRouter(props => <CreateTrip {...props}/>);

export const ProfileRoute = ({ component: ProfileHome, ...rest }) => {  
    return (
      <Route
        {...rest}
        render={() => {
          if (localStorage.getItem("token")) {
            console.log('authenticated from profile route')            
            return <ProfileHome />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
    );  
};

export const CreateTripRoute = ({ component: CreateTrip, ...rest }) => {  
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem("token")) {
          console.log('authenticated from createtrip route')            
          return <CreateTrip />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );  
};

export const ExpenseTripRoute = ({ component: ExpenseTrip, ...rest }) => {  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          console.log('authenticated from expense route')            
          return <ExpenseTrip {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );  
};

export const TripRoute = ({ component: TripRoute, ...rest }) => {  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          console.log('authenticated from trip route')            
          return <TripRoute {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );  
};

