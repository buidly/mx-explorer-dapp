import React from 'react';
import BigNumber from 'bignumber.js';

import { NetworkLink, ScAddressIcon, AccountName } from 'components';
import { urlBuilder } from 'helpers';
import { AssetType } from 'types';
import { MostUsedApplicationsType } from 'types/growthWidgets';

export const MostUsedContracts = ({
  data
}: {
  data: MostUsedApplicationsType[];
}) => {
  return (
    <div className='card card-black h-100'>
      <div className='card-header'>
        <div className='card-header-item table-card-header d-flex justify-content-between align-items-center flex-wrap'>
          <h5 className='table-title d-flex align-items-center'>
            Daily most used applications
          </h5>
        </div>
      </div>

      <div className='card-body'>
        <div className='table-wrapper animated-list'>
          <table className='table mb-0'>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Smart Contract</th>
                <th>Total Txn</th>
              </tr>
            </thead>
            <tbody data-testid='contractsTable'>
              {data.map((contract, i) => (
                <tr key={contract.rank} className='text-lh-24'>
                  <td>{contract.rank}</td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <ScAddressIcon initiator={contract.key} />
                      <NetworkLink
                        to={urlBuilder.accountDetails(contract.key)}
                        className='trim text-primary-200'
                      >
                        <AccountName
                          address={contract.key}
                          assets={contract?.extraInfo?.assets as AssetType}
                          dataTestId={`constractLink${i}`}
                        />
                      </NetworkLink>
                    </div>
                  </td>
                  <td>{new BigNumber(contract.value).toFormat()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
