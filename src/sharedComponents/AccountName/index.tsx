import * as React from 'react';
import { formatHerotag } from 'helpers';
import { AssetType } from 'helpers/types';
import { Trim, Overlay } from 'sharedComponents';
import { ReactComponent as IdentityLogo } from 'assets/images/logos/identity.svg';

const AccountName = ({
  address,
  assets,
  dataTestId,
  color,
}: {
  address: string;
  assets?: AssetType;
  dataTestId?: string;
  color?: 'muted' | 'secondary';
}) => {
  if (assets && assets.name) {
    const cleanName = assets.name.replaceAll(/[^\p{L}\p{N}\p{P}\p{Z}\n]/gu, '');
    const name = formatHerotag(cleanName);
    const description = `${cleanName} (${address})`;

    return (
      <>
        {cleanName.endsWith('.elrond') && (
          <Overlay title="Herotag" className="herotag" tooltipClassName="account-name">
            <IdentityLogo className="herotag-logo" />
          </Overlay>
        )}
        <Overlay title={description} tooltipClassName="account-name">
          <div
            className={`text-truncate ${color ? `text-${color}` : ''}`}
            {...(dataTestId
              ? {
                  datatestid: dataTestId,
                }
              : {})}
          >
            {name}
          </div>
        </Overlay>
      </>
    );
  }

  return (
    <Trim
      text={address}
      color={color}
      {...(dataTestId
        ? {
            dataTestId,
          }
        : {})}
    />
  );
};

export default AccountName;