import React from 'react';
import { faUser } from 'icons/regular';

import { PageState } from 'components';

export const FailedAccounts = () => {
  return (
    <PageState
      icon={faUser}
      title='Unable to load accounts'
      className='py-spacer my-auto'
      dataTestId='errorScreen'
    />
  );
};
