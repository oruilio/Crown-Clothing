import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

//higher order component
const WithSpinner = WrappedComponent => {
  //ordinary component: spinner component
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;