import React from 'react';

import { faCircleBolt } from '@fortawesome/pro-solid-svg-icons/faCircleBolt';
import { faCirclePlus } from '@fortawesome/pro-solid-svg-icons/faCirclePlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import { Search, Particles, ValidatorsStatus } from 'components';
import { multiversxApps } from 'config';

import { useFetchGrowthHero } from 'hooks';
import { growthHeroSelector, statsSelector } from 'redux/selectors';

export const HeroCard = () => {
  const explorerApp = multiversxApps.find((app) => app.id === 'explorer');
  const explorerTitle = explorerApp ? explorerApp.name : 'Explorer';

  const {
    totalTransactions,
    totalTransactionsToday,
    totalAccounts,
    activeAccountsToday
  } = useSelector(growthHeroSelector);
  const { blocks } = useSelector(statsSelector);

  useFetchGrowthHero();

  return (
    <div className='hero-card card card-lg card-black'>
      <Particles />
      <div className='card-body d-flex flex-column justify-content-between'>
        <div className='col-lg-6 pt-lg-4 ps-lg-4 '>
          <h1 className='h2 mb-spacer'>
            MultiversX Blockchain {explorerTitle}
          </h1>
          <Search />
        </div>

        <div className='d-flex flex-column gap-4'>
          <div className='d-flex'>
            <div className='card card-black'>
              <div className='card-body'>
                <p className='text-neutral-400 mb-0'>Block Height</p>
                <h3 className='mb-0'>{blocks}</h3>
              </div>
            </div>
          </div>
          <div className='d-flex flex-row gap-4'>
            <div className='card card-black'>
              <div className='card-body'>
                <p className='text-neutral-400 mb-0'>Total Transactions</p>
                <h3 className='card-value'>{totalTransactions}</h3>
                <p className='mb-0 text-primary-200'>
                  <FontAwesomeIcon icon={faCirclePlus} className='me-2' />
                  {totalTransactionsToday} today
                </p>
              </div>
            </div>
            <div className='card card-black'>
              <div className='card-body'>
                <p className='text-neutral-400 mb-0'>Total Accounts</p>
                <h3 className='card-value'>{totalAccounts}</h3>
                <p className='mb-0 text-primary-200'>
                  <FontAwesomeIcon icon={faCircleBolt} className='me-2' />
                  {activeAccountsToday} active today
                </p>
              </div>
            </div>
            <ValidatorsStatus isSmall />
          </div>
        </div>
      </div>
    </div>
  );
};
