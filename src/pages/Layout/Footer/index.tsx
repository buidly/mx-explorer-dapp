import React from 'react';
import { faHeart } from '@fortawesome/pro-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer = () => {
  const explorerVersion = process.env.REACT_APP_CACHE_BUST;

  return (
    <footer
      className={`footer d-flex flex-column align-items-center justify-content-center text-muted ${
        explorerVersion ? 'pt-2' : ''
      }`}
    >
      <div className='footer-inner'>
        <a
          rel='noopener noreferrer nofollow'
          target='_blank'
          className='d-flex align-items-center text-neutral-300'
          href='https://multiversx.com/'
        >
          Made with{' '}
          <FontAwesomeIcon icon={faHeart} className='text-danger mx-1' />
          by the MultiversX team
        </a>
      </div>
      {explorerVersion && (
        <small className='text-muted version mt-1'>
          Build {explorerVersion}
        </small>
      )}
    </footer>
  );
};
