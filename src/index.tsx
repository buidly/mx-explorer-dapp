import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Wallet from 'WALLET';
import App from './App';
import './assets/sass/theme.scss';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
  whyDidYouRender(React);
}

if (process.env.REACT_APP_WALLET) {
  ReactDOM.render(<Wallet />, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
