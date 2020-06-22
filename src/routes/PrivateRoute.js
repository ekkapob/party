import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { CredentialContext } from './../context/credential';

function PrivateRoute({ children, ...props }) {
  const [credential] = useContext(CredentialContext);

  return (
    <Route
      {...props}

      render={
        ({ location }) => (
          credential.email !== '' ?
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
