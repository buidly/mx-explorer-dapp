import React from 'react';
import { Denominate, NetworkLink, NftBadge } from 'sharedComponents';
import { urlBuilder } from 'helpers';
import { NftEnumType, TokenArgumentType } from 'helpers/types';

const TxActionNft = ({
  token,
  showBadge,
  noValue,
  showLastNonZeroDecimal,
}: {
  token: TokenArgumentType;
  showBadge?: boolean;
  noValue?: boolean;
  showLastNonZeroDecimal?: boolean;
}) => {
  const ref = React.useRef(null);

  return (
    <div ref={ref} className="nft-action-block">
      {token && token.identifier && (
        <>
          {showBadge && token.type !== NftEnumType.MetaESDT && (
            <NftBadge type={token.type} className="mr-1 my-auto" />
          )}
          {!noValue && token.value && token.type !== NftEnumType.NonFungibleESDT && (
            <div className="mr-1 text-truncate">
              {token.decimals !== undefined ? (
                <Denominate
                  value={token.value}
                  showLabel={false}
                  denomination={token.decimals}
                  showLastNonZeroDecimal={showLastNonZeroDecimal}
                />
              ) : (
                Number(token.value).toLocaleString('en')
              )}
            </div>
          )}
          <NetworkLink
            to={urlBuilder.nftDetails(token.identifier)}
            className={`${token.svgUrl ? 'd-flex token-link' : 'text-truncate'}`}
          >
            <div className="d-flex align-items-center symbol">
              {token.svgUrl && <img src={token.svgUrl} alt=" " className="token-icon mr-1" />}
              <span
                {...(token.ticker === token.collection ? { className: 'text-truncate mr-1' } : {})}
              >
                {token.ticker === token.collection ? token.identifier : token.ticker}
              </span>
            </div>
          </NetworkLink>
        </>
      )}
    </div>
  );
};

export default TxActionNft;