import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BigNumber from 'bignumber.js';

import {
  ELLIPSIS,
  LOW_LIQUIDITY_MARKET_CAP_DISPLAY_TRESHOLD
} from 'appConstants';
import { NetworkLink, Denominate, Sort, LowLiquidityTooltip } from 'components';
import { urlBuilder, amountWithoutRounding } from 'helpers';
import { useGetSort } from 'hooks';
import { faDiamond } from 'icons/regular';
import { TokenType, TokenSortEnum, SortOrderEnum } from 'types';
import { EgldRow } from './EgldRow';

export const TokensTable = ({
  tokens,
  totalTokens
}: {
  tokens: TokenType[];
  totalTokens: typeof ELLIPSIS | number;
}) => {
  const { order } = useGetSort();

  return (
    <div className='table-wrapper tokens-table'>
      <table className='table mb-0'>
        <thead>
          <tr>
            <th>Token</th>
            <th>Name</th>
            <th data-testid={TokenSortEnum.price}>
              <Sort id={TokenSortEnum.price} field='Price' />
            </th>
            <th>Circulating Supply</th>
            <th data-testid={TokenSortEnum.marketCap}>
              <Sort id={TokenSortEnum.marketCap} field='Market Cap' />
            </th>
            <th data-testid={TokenSortEnum.accounts}>
              <Sort id={TokenSortEnum.accounts} field='Holders' />
            </th>
            <th data-testid={TokenSortEnum.transactions}>
              <Sort id={TokenSortEnum.transactions} field='Transactions' />
            </th>
          </tr>
        </thead>
        <tbody data-testid='tokensTable'>
          {tokens.map((token, i) => (
            <Fragment key={token.identifier}>
              {typeof totalTokens === 'number' &&
                (order ? order === SortOrderEnum.desc : true) && (
                  <EgldRow
                    tokens={tokens}
                    index={i}
                    totalTokens={totalTokens}
                  />
                )}
              <tr>
                <td>
                  <div className='token-identity d-flex flex-row'>
                    <div className='d-flex align-items-center me-3'>
                      <NetworkLink
                        to={urlBuilder.tokenDetails(token.identifier)}
                        data-testid={`tokensLink${i}`}
                        className='side-link'
                      >
                        {token.assets && token.assets.svgUrl ? (
                          <img
                            src={token.assets.svgUrl}
                            alt={token.name}
                            className='side-icon'
                          />
                        ) : (
                          <div className=' side-icon d-flex align-items-center justify-content-center'>
                            <FontAwesomeIcon icon={faDiamond} />
                          </div>
                        )}
                      </NetworkLink>
                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                      <span className='d-flex align-items-center gap-2'>
                        <NetworkLink
                          to={urlBuilder.tokenDetails(token.identifier)}
                          data-testid={`tokensLink${i}`}
                          className='d-block token-ticker'
                        >
                          {token.ticker}
                        </NetworkLink>
                        {token.isLowLiquidity && (
                          <LowLiquidityTooltip
                            {...(token.totalLiquidity
                              ? {
                                  details: (
                                    <>
                                      ($
                                      {new BigNumber(
                                        token.totalLiquidity
                                      ).toFormat(2)}
                                      )
                                    </>
                                  )
                                }
                              : {})}
                          />
                        )}
                      </span>
                      {token.assets && token.assets.description && (
                        <div
                          className='token-description text-wrap text-neutral-400 small d-none d-md-block'
                          title={token.assets.description}
                        >
                          {token.assets.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>{token.name}</td>
                <td>
                  {token.price && (
                    <>${amountWithoutRounding(token.price.toString(), 2)}</>
                  )}
                </td>
                <td>
                  {token.circulatingSupply && (
                    <Denominate
                      showLabel={false}
                      value={
                        token.circulatingSupply
                          ? String(token.circulatingSupply)
                          : '0'
                      }
                      denomination={token.decimals}
                      decimals={0}
                    />
                  )}
                </td>
                <td>
                  {token.marketCap &&
                    (!token.isLowLiquidity ||
                      new BigNumber(token.marketCap).isLessThan(
                        LOW_LIQUIDITY_MARKET_CAP_DISPLAY_TRESHOLD
                      )) && <>${new BigNumber(token.marketCap).toFormat(0)}</>}
                </td>
                <td>
                  {token.accounts
                    ? new BigNumber(token.accounts).toFormat()
                    : 0}
                </td>
                <td>
                  {token.transactions
                    ? new BigNumber(token.transactions).toFormat()
                    : 0}
                </td>
              </tr>
              {typeof totalTokens === 'number' &&
                order === SortOrderEnum.asc &&
                i !== 0 && (
                  <EgldRow
                    tokens={tokens}
                    index={i}
                    totalTokens={totalTokens}
                  />
                )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
