import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

type RoundType = {
  key: string;
  value: string;
};

const Rounds = ({ rounds, roundsFetched }: { rounds: RoundType[]; roundsFetched: boolean }) => {
  return (
    <div className="col-md-5">
      <div className="mt-4">
        <h4>Last Rounds</h4>
      </div>
      {roundsFetched ? (
        <div className="card" style={{ height: 'auto' }}>
          <div className="card-body">
            {rounds.length === 0 ? (
              <div
                style={{ minHeight: '95px' }}
                className="d-flex justify-content-center"
                ng-show="rounds.length == 0"
              >
                <div className="lds-ellipsis align-self-center">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            ) : (
              <div className="squares">
                {rounds.length &&
                  rounds.map((round: any) => (
                    <OverlayTrigger
                      key={round.key}
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={(props: any) => (
                        <Tooltip id={round.key} {...props}>
                          {round.key.indexOf('_') > 0 ? round.key.split('_').pop() : round.key}
                        </Tooltip>
                      )}
                    >
                      <div className={round.value ? 'full square-block' : 'square-block'}></div>
                    </OverlayTrigger>
                  ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card" style={{ height: 'auto' }}>
          <div className="card-body card-details" data-testid="errorScreen">
            <div className="empty">
              <FontAwesomeIcon icon={faCogs} className="empty-icon" />
              <span className="h4 empty-heading">Unable to load rounds</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rounds;
