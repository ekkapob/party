import React from 'react';
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...props }) {
  console.log('------------------');
  console.log(props);

  const authenticated = true;

  return (
    <Route
      {...props}

      render={
        ({ location }) => (
          authenticated ?
            children :
            <Redirect to={{
              pathname: '/signin',
              state: { from: location },
            }}/>
        )
      }

    />
  );
}

export default PrivateRoute;
