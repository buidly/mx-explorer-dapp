import React from 'react';
import { faCoins } from '@fortawesome/pro-solid-svg-icons/faCoins';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAdapter,
  DetailItem,
  Loader,
  Pager,
  PageState,
  Denominate,
  NetworkLink
} from 'components';

import {
  urlBuilder,
  useGetFilters,
  useNetworkRoute,
  amountWithoutRounding
} from 'helpers';
import { activeNetworkSelector, accountSelector } from 'redux/selectors';
import { TokenType, NftType } from 'types';
import { AccountTabs } from './AccountLayout/AccountTabs';

export const AccountTokens = () => {
  const ref = React.useRef(null);
  const navigate = useNavigate();

  const { adapter, id: activeNetworkId } = useSelector(activeNetworkSelector);
  const { txCount } = useSelector(accountSelector);
  const { size } = useGetFilters();
  const networkRoute = useNetworkRoute();

  const {
    getAccountTokens,
    getAccountTokensCount,
    getAccountNfts,
    getAccountNftsCount
  } = useAdapter();

  const { hash: address } = useParams() as any;
  const tokensActive = adapter === 'api';

  const [dataReady, setDataReady] = React.useState<boolean | undefined>();
  const [accountTokens, setAccountTokens] = React.useState<TokenType[]>([]);
  const [accountTokensCount, setAccountTokensCount] = React.useState(0);
  const [accountNfts, setAccountNfts] = React.useState<NftType[]>([]);
  const [accountNftsCount, setAccountNftsCount] = React.useState(0);

  const fetchAccountTokens = () => {
    if (tokensActive) {
      const type = 'MetaESDT';
      Promise.all([
        getAccountTokens({
          size,
          address
        }),
        getAccountTokensCount(address),
        getAccountNfts({
          size,
          address,
          type
        }),
        getAccountNftsCount({ address, type })
      ]).then(
        ([
          accountTokensData,
          accountTokensCountData,
          accountNftsData,
          accountNftsCountData
        ]) => {
          if (ref.current !== null) {
            if (
              accountTokensData.success &&
              accountTokensCountData.success &&
              accountNftsData.success &&
              accountNftsCountData.success
            ) {
              setAccountTokens(accountTokensData.data);
              setAccountTokensCount(accountTokensCountData.data);
              setAccountNfts(accountNftsData.data);
              setAccountNftsCount(accountNftsCountData.data);
            }
            setDataReady(
              accountTokensData.success &&
                accountTokensCountData.success &&
                accountNftsData.success &&
                accountNftsCountData.success
            );
          }
        }
      );
    }
  };

  React.useEffect(() => {
    fetchAccountTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txCount, activeNetworkId, address, size]);

  return !tokensActive ? (
    navigate(networkRoute(urlBuilder.accountDetails(address)))
  ) : (
    <div className='card' ref={ref}>
      <div className='card-header'>
        <div className='card-header-item table-card-header d-flex justify-content-between align-items-center flex-wrap'>
          <AccountTabs />
          {dataReady === true &&
            (accountTokens.length > 0 || accountNfts.length > 0) && (
              <Pager
                itemsPerPage={25}
                page={String(size)}
                total={Math.max(accountTokensCount, accountNftsCount)}
                show={accountTokens.length > 0 || accountNfts.length > 0}
                className='d-flex ms-auto me-auto me-sm-0'
              />
            )}
        </div>
      </div>
      <div className='card-body pt-0 px-lg-spacer py-lg-4'>
        <div className='container-fluid'>
          {dataReady === undefined && <Loader dataTestId='tokensLoader' />}
          {dataReady === false && (
            <PageState
              icon={faCoins}
              title='Unable to load tokens'
              className='py-spacer my-auto'
              dataTestId='errorScreen'
            />
          )}
          {dataReady === true &&
            accountTokens.length === 0 &&
            accountNfts.length === 0 && (
              <PageState
                icon={faCoins}
                title='No tokens'
                className='py-spacer my-auto'
              />
            )}

          {dataReady === true &&
            (accountTokens.length > 0 || accountNfts.length > 0) && (
              <>
                {accountNfts.map(
                  ({ name, identifier, decimals, balance, assets, ticker }) => {
                    return (
                      <DetailItem title={name} key={identifier}>
                        <div className='d-flex align-items-center'>
                          <div className='me-1'>
                            <Denominate
                              showLabel={false}
                              value={balance ? balance : '0'}
                              denomination={decimals}
                              showLastNonZeroDecimal
                            />
                          </div>

                          <NetworkLink
                            to={urlBuilder.nftDetails(identifier)}
                            className={`d-flex text-truncate ${
                              assets?.svgUrl ? 'side-link' : ''
                            }`}
                          >
                            <div className='d-flex align-items-center symbol text-truncate'>
                              {assets ? (
                                <>
                                  {assets.svgUrl && (
                                    <img
                                      src={assets.svgUrl}
                                      alt={name}
                                      className='side-icon me-1'
                                    />
                                  )}
                                  <div className='text-truncate'>
                                    {ticker ? ticker : name} ({identifier})
                                  </div>
                                </>
                              ) : (
                                <div className='text-truncate'>
                                  {name} ({identifier})
                                </div>
                              )}
                            </div>
                          </NetworkLink>
                        </div>
                      </DetailItem>
                    );
                  }
                )}
                {accountTokens.map(
                  ({
                    identifier,
                    name,
                    balance,
                    decimals,
                    assets,
                    ticker,
                    valueUsd
                  }) => {
                    return (
                      <DetailItem title={name} key={identifier}>
                        <div className='d-flex align-items-center'>
                          <div className='me-1'>
                            <Denominate
                              showLabel={false}
                              value={balance ? balance : '0'}
                              denomination={decimals}
                              showLastNonZeroDecimal
                            />
                          </div>
                          {valueUsd && (
                            <span className='text-neutral-400 me-1'>
                              (${amountWithoutRounding(valueUsd.toString())})
                            </span>
                          )}

                          <NetworkLink
                            to={urlBuilder.tokenDetails(identifier)}
                            className={`d-flex text-truncate ${
                              assets?.svgUrl ? 'side-link' : ''
                            }`}
                          >
                            <div className='d-flex align-items-center symbol text-truncate'>
                              {assets ? (
                                <>
                                  {assets?.svgUrl && (
                                    <img
                                      src={assets.svgUrl}
                                      alt={name}
                                      className='side-icon me-1'
                                    />
                                  )}
                                  <div className='text-truncate'>
                                    {ticker ? ticker : name}
                                  </div>
                                </>
                              ) : (
                                <div className='text-truncate'>
                                  {identifier}
                                </div>
                              )}
                            </div>
                          </NetworkLink>
                        </div>
                      </DetailItem>
                    );
                  }
                )}
              </>
            )}
        </div>
      </div>

      {dataReady === true &&
        (accountTokens.length > 0 || accountNfts.length > 0) && (
          <div className='card-footer px-1 px-sm-spacer d-flex justify-content-center justify-content-sm-end'>
            <Pager
              itemsPerPage={25}
              page={String(size)}
              total={Math.max(accountTokensCount, accountNftsCount)}
              show={accountTokens.length > 0 || accountNfts.length > 0}
            />
          </div>
        )}
    </div>
  );
};
