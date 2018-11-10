import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLogin, ...rest }) => (
  <Route {...rest} render={props => (
    isLogin ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
        }}
      />
    )
  )} />
);

export default PrivateRoute;
