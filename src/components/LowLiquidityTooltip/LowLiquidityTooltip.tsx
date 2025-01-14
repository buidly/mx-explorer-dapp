import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Overlay } from 'components';
import { faInfoCircle } from 'icons/regular';
import { WithClassnameType } from 'types';

export interface LowLiquidityTooltipUIType extends WithClassnameType {
  details?: React.ReactNode;
}

export const LowLiquidityTooltip = ({
  details,
  className
}: LowLiquidityTooltipUIType) => {
  return (
    <Overlay
      title={
        <>
          Less than 0.5% of total Token Supply captured in xExchange Liquidity
          Pools. {details}
        </>
      }
      className={classNames('cursor-context', className)}
    >
      <FontAwesomeIcon icon={faInfoCircle} className='text-warning' />
    </Overlay>
  );
};
