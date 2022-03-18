import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

export const PrivateRoute: React.FC<any> = ({
  component: Component,
  ...rest
}): any => {
  const uid = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<any>) =>
        uid ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/user/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
