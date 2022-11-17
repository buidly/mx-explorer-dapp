import React from 'react';
import { faChartPie } from '@fortawesome/pro-solid-svg-icons/faChartPie';

import AccountTabs from '../AccountLayout/AccountTabs';
import AccountDelegation from './AccountDelegation';
import AccountLegacyDelegation from './AccountLegacyDelegation';
import AccountStake from './AccountStake';
import DonutChart from './DonutChart';

import { useGlobalState } from 'context';
import { Loader, PageState } from 'sharedComponents';

const AccountStaking = () => {
  const { accountStakingDetails } = useGlobalState();

  const {
    providerDataReady,
    stakingDataReady,
    delegation,
    delegationProviders,
    stake,
    delegationLegacy,
    delegationLegacyIdentity,
    showDelegation,
    showDelegationLegacy,
    showStake,
  } = accountStakingDetails;

  const displayDelegation = delegation
    ? delegation.filter(
        (delegation) =>
          delegation.userActiveStake !== '0' ||
          delegation.claimableRewards !== '0' ||
          (delegation.userUndelegatedList && delegation.userUndelegatedList?.length > 0)
      )
    : [];

  const hasStaking = showDelegation || showDelegationLegacy || showStake;
  const isReady = providerDataReady && stakingDataReady;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-item d-flex justify-content-between align-items-center">
          <AccountTabs />
        </div>
      </div>
      <div className="account-staking card-body p-0">
        {isReady ? (
          <div className="row">
            {hasStaking ? (
              <>
                <div className="col-lg-7 pr-lg-0 border-right">
                  {displayDelegation.length > 0 && (
                    <div className="account-delegation">
                      <div className="px-spacer py-3 border-bottom bg-light">Staking List</div>
                      {displayDelegation.map((delegation, i) => {
                        const provider = delegationProviders?.find(
                          ({ provider }) => delegation.contract === provider
                        );
                        return provider ? (
                          <AccountDelegation delegation={delegation} provider={provider} key={i} />
                        ) : null;
                      })}
                    </div>
                  )}
                  {delegationLegacy && showDelegationLegacy && (
                    <div
                      className={`account-legacy-delegation ${
                        displayDelegation.length > 0 ? 'border-top' : ''
                      }`}
                    >
                      <div className="px-spacer py-3 border-bottom bg-light">Legacy Delegation</div>

                      <AccountLegacyDelegation
                        delegationLegacy={delegationLegacy}
                        identity={delegationLegacyIdentity}
                      />
                    </div>
                  )}
                  {stake && showStake && (
                    <div className="account-legacy-delegation">
                      <div className="px-spacer py-3 border-bottom bg-light">
                        Stake <span className="text-secondary">(Validation)</span>
                      </div>
                      <AccountStake stake={stake} />
                    </div>
                  )}
                </div>
                <div className="col-lg-5 pl-0 d-flex flex-column">
                  <div className="px-spacer py-3 border-bottom bg-light staking-chart-title">
                    Staking Chart
                  </div>
                  <div className="staking-chart-holder">
                    <DonutChart
                      stakingDetails={accountStakingDetails}
                      providers={delegationProviders}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="col-12">
                <PageState
                  icon={faChartPie}
                  title="No Staking"
                  className="py-spacer my-auto"
                  dataTestId="errorScreen"
                />
              </div>
            )}
          </div>
        ) : (
          <Loader dataTestId="stakingLoader" />
        )}
      </div>
    </div>
  );
};

export default AccountStaking;