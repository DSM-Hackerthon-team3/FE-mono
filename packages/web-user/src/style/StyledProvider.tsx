import { GlobalStyle } from '@packages/design-token';
import React from 'react';

export const StyledProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      {children}
    </React.Fragment>
  )
}