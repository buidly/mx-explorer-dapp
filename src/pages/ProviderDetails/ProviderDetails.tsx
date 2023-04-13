import React, { useEffect, useRef, useState } from 'react';
import { faCogs } from '@fortawesome/pro-regular-svg-icons/faCogs';
import { useLocation, useParams } from 'react-router-dom';

import { Loader, Pager, PageState, NodesTable } from 'components';
import { useAdapter, useGetNodeURLFilters, useGetPage } from 'hooks';
import { ProviderTabs } from 'pages/ProviderDetails/ProviderLayout/ProviderTabs';
import { NodeType } from 'types';

export const ProviderDetails = () => {
  const ref = useRef(null);
  const { hash: address } = useParams() as any;
  const { search } = useLocation();
  const { getNodes, getNodesCount } = useAdapter();
  const { getQueryObject } = useGetNodeURLFilters();
  const { page } = useGetPage();
  const [dataReady, setDataReady] = useState<boolean | undefined>();
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [totalNodes, setTotalNodes] = useState<number | '...'>('...');

  const fetchNodes = () => {
    const queryObject = getQueryObject();

    setDataReady(undefined);

    Promise.all([
      getNodes({ ...queryObject, provider: address, page }),
      getNodesCount({ ...queryObject, provider: address })
    ]).then(([nodesData, count]) => {
      setNodes(nodesData.data);
      setTotalNodes(count.data);

      if (ref.current !== null) {
        setDataReady(nodesData.success && count.success);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchNodes, [search]);

  return (
    <div className='card' ref={ref}>
      <div className='card-header'>
        <div className='card-header-item table-card-header d-flex justify-content-between align-items-center flex-wrap gap-3'>
          <ProviderTabs />
          {dataReady === true && (
            <Pager
              total={totalNodes}
              className='d-flex ms-auto me-auto me-sm-0'
              show
            />
          )}
        </div>
      </div>

      {dataReady === undefined && <Loader />}
      {dataReady === false && (
        <PageState
          icon={faCogs}
          title='Unable to load nodes'
          className='py-spacer my-auto'
          dataTestId='errorScreen'
        />
      )}

      {dataReady === true && (
        <>
          <div className='card-body'>
            <NodesTable>
              <NodesTable.Body nodes={nodes} />
            </NodesTable>
          </div>
          <div className='card-footer d-flex justify-content-center justify-content-sm-end'>
            <Pager total={totalNodes} show />
          </div>
        </>
      )}
    </div>
  );
};
