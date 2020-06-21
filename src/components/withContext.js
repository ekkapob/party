import React from 'react';

import { UserProfileContextProvider } from './../context/userProfile';

function withContext(WrappedComponent) {
  return props => {
    return (
      <UserProfileContextProvider>

        <WrappedComponent {...props}/>

      </UserProfileContextProvider>
    );
  };
}

export default withContext;
