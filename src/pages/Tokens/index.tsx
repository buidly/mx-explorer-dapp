import * as React from 'react';
import BigNumber from 'bignumber.js';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { PAGE_SIZE } from 'appConstants';
import { Loader, useAdapter, NetworkLink, Pager } from 'components';
import { useGetFilters, useURLSearchParams, useActiveRoute } from 'hooks';
import { economicsSelector } from 'redux/selectors';
import { tokensRoutes } from 'routes';

import { TokenType } from 'types';

import { FailedTokens } from './FailedTokens';
import { Filters } from './Filters';
import { NoTokens } from './NoTokens';
import { TokensTable } from './TokensTable';

export const Tokens = () => {
  const ref = React.useRef(null);

  const activeRoute = useActiveRoute();
  const { page } = useURLSearchParams();
  const { search } = useLocation();
  const { getQueryObject, size } = useGetFilters();
  const { getTokens, getTokensCount } = useAdapter();

  const { ecosystemMarketCap } = useSelector(economicsSelector);

  const [tokens, setTokens] = React.useState<TokenType[]>([]);
  const [dataReady, setDataReady] = React.useState<boolean | undefined>();
  const [totalTokens, setTotalTokens] = React.useState<number | '...'>('...');

  const fetchTokens = () => {
    const queryObject = getQueryObject();

    Promise.all([
      getTokens({ ...queryObject, size }),
      getTokensCount(queryObject)
    ]).then(([tokensData, count]) => {
      if (ref.current !== null) {
        if (tokensData.success) {
          setTokens(tokensData.data);
          setTotalTokens(Math.min(count.data, 10000));
        }
        setDataReady(tokensData.success && count.success);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fetchTokens, [search]);

  return (
    <>
      {dataReady === undefined && <Loader />}
      {dataReady === false && <FailedTokens />}

      <div ref={ref}>
        {dataReady === true && (
          <div className='tokens container page-content'>
            <div className='row'>
              <div className='col-12'>
                <div className='card'>
                  <div className='card-header'>
                    <div className='card-header-item d-flex align-items-center justify-content-between mb-3'>
                      <div className='d-flex flex-wrap w-100 align-items-center justify-content-between'>
                        <h5
                          data-testid='title'
                          className='mb-0 d-flex align-items-center'
                        >
                          Tokens
                        </h5>
                        <span>
                          {totalTokens}{' '}
                          <span className='text-neutral-400 pe-2 border-end me-2'>
                            Tokens
                          </span>{' '}
                          <span className='text-neutral-400'>
                            Ecosystem Market Cap:
                          </span>{' '}
                          {ecosystemMarketCap}
                        </span>
                      </div>
                    </div>
                    <div className='card-header-item table-card-header d-flex justify-content-between align-items-center flex-wrap gap-3'>
                      <div className='filters d-flex align-items-start align-items-md-center justify-content-md-between flex-column flex-md-row gap-3'>
                        <ul className='list-inline m-0 d-flex flex-wrap gap-2'>
                          <li className='list-inline-item me-0'>
                            <NetworkLink
                              to={tokensRoutes.tokens}
                              className={`badge py-2 px-3 br-lg ${
                                activeRoute(tokensRoutes.tokens)
                                  ? 'badge-grey'
                                  : 'badge-outline badge-outline-grey'
                              }`}
                            >
                              Tokens
                            </NetworkLink>
                          </li>
                          <li className='list-inline-item me-0'>
                            <NetworkLink
                              to={tokensRoutes.tokensMetaEsdt}
                              className={`badge py-2 px-3 br-lg ${
                                activeRoute(tokensRoutes.tokensMetaEsdt)
                                  ? 'badge-grey'
                                  : 'badge-outline badge-outline-grey'
                              }`}
                            >
                              Meta-ESDT
                            </NetworkLink>
                          </li>
                        </ul>
                        <Filters />
                      </div>
                      {tokens && tokens.length > 0 && (
                        <div className='d-none d-sm-flex'>
                          <Pager
                            page={String(page)}
                            total={
                              totalTokens !== '...'
                                ? Math.min(totalTokens, 10000)
                                : totalTokens
                            }
                            itemsPerPage={PAGE_SIZE}
                            show={tokens.length > 0}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {tokens && tokens.length > 0 ? (
                    <>
                      <div className='card-body'>
                        <TokensTable
                          tokens={tokens}
                          totalTokens={totalTokens}
                        />
                      </div>

                      <div className='card-footer d-flex justify-content-center justify-content-sm-end'>
                        <Pager
                          page={String(page)}
                          total={
                            totalTokens !== '...'
                              ? Math.min(totalTokens, 10000)
                              : totalTokens
                          }
                          itemsPerPage={PAGE_SIZE}
                          show={tokens.length > 0}
                        />
                      </div>
                    </>
                  ) : (
                    <NoTokens />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
