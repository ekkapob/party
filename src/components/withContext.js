import React from 'react';

import { CredentialContextProvider } from './../context/credential';

function withContext(WrappedComponent) {
  return props => {
    return (
      <CredentialContextProvider>

        <WrappedComponent {...props}/>

      </CredentialContextProvider>
    );
  };
}

export default withContext;
