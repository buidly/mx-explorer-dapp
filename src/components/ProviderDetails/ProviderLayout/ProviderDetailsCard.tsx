import * as React from 'react';
import { types, urlBuilder } from 'helpers';
import {
  CardItem,
  CopyButton,
  Denominate,
  LockedAmountTooltip,
  NetworkLink,
} from 'sharedComponents';
import { useGlobalState } from 'context';
import {
  faServer,
  faLock,
  faArrowToTop,
  faCoins,
  faChartPieAlt,
  faReceipt,
  faLeaf,
  faUserFriends,
} from '@fortawesome/pro-solid-svg-icons';
import DelegationCap from 'sharedComponents/ProvidersTable/DelegationCap';
import PercentageFilled from 'sharedComponents/ProvidersTable/PercentageFilled';
import { hasDelegationCap } from 'sharedComponents/ProvidersTable/PercentageFilled';

const ProviderDetailsCard = ({ provider }: { provider: types.ProviderType | undefined }) => {
  const {
    activeNetwork: { walletAddress },
  } = useGlobalState();

  return provider !== undefined ? (
    <div className="provider-details-card card">
      <div className="card-header">
        <div className="card-header-item d-flex justify-content-between align-items-center">
          <h6 data-testid="title">Contract Details</h6>
          <a
            className="btn btn-sm btn-primary-light"
            target={`_blank`}
            rel={`noreferrer nofollow`}
            href={walletAddress}
          >
            Stake now
          </a>
        </div>
        <div className="card-header-item compact d-flex">
          <span className="text-secondary flex-shrink-0">Address:</span>
          <div className="d-flex align-items-center text-break-all ml-2">
            <NetworkLink to={urlBuilder.accountDetails(provider.provider)} data-testid="address">
              {provider.provider}
            </NetworkLink>
            <CopyButton text={provider.provider} />
          </div>
        </div>
      </div>

      <div className="card-body card-item-container mx-spacing">
        <CardItem title="Number of nodes" icon={faServer}>
          {provider.numNodes !== undefined ? (
            <>
              {provider.numNodes} node{provider.numNodes !== 1 ? 's' : ''}
            </>
          ) : (
            <>N/A</>
          )}
        </CardItem>

        <CardItem title="Computed APR" icon={faLeaf}>
          {provider.apr ? (
            <>
              {provider.apr}
              {provider.apr !== 'N/A' ? '%' : ''}
            </>
          ) : (
            <>N/A</>
          )}
        </CardItem>

        <CardItem title="Service fee" icon={faReceipt}>
          {provider.serviceFee ? <>{(provider.serviceFee * 100).toFixed(2)}%</> : <>N/A</>}
        </CardItem>

        <CardItem title="Locked" icon={faLock}>
          {provider.locked ? (
            <div className="d-flex align-items-center">
              <span className="mr-2">
                <Denominate value={provider.locked} />
              </span>

              <LockedAmountTooltip
                small
                lockedDetails={[
                  { label: 'Stake', value: <Denominate value={provider.stake} /> },
                  {
                    label: 'Topup',
                    value: <Denominate value={provider.topUp} />,
                  },
                ]}
              />
            </div>
          ) : (
            <>N/A</>
          )}
        </CardItem>

        <CardItem title="Delegators" icon={faUserFriends}>
          {provider.numUsers ? <>{provider.numUsers}</> : <>N/A</>}
        </CardItem>

        <CardItem title="Cumulated Rewards" icon={faCoins}>
          {provider.cumulatedRewards ? <Denominate value={provider.cumulatedRewards} /> : <>0</>}
        </CardItem>

        <CardItem title="Delegation Cap" icon={faArrowToTop}>
          {provider.delegationCap ? (
            <DelegationCap delegationCap={provider.delegationCap} />
          ) : (
            <>N/A</>
          )}
        </CardItem>

        {hasDelegationCap(provider.delegationCap) && (
          <CardItem title="Filled" icon={faChartPieAlt}>
            <PercentageFilled locked={provider.locked} delegationCap={provider.delegationCap} />
          </CardItem>
        )}
      </div>
    </div>
  ) : null;
};

export default ProviderDetailsCard;