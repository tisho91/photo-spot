import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const uid = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        uid ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/user/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}
