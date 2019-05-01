import React from 'react';
import {Route, Redirect} from 'react-router';
import {ProfileHome} from './Profile/ProfileHome';

const PrivateRoute = ({ component: ProfileHome, ...rest }) => {
  console.log(...rest)
    return (
      <Route
        {...rest}
        render={() => {
          if (localStorage.getItem("token")) {
            return <ProfileHome />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
    );  
};      

export default PrivateRoute;