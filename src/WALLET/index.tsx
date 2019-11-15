import React from 'react';
import { hot } from 'react-hot-loader/root';
import { GlobalProvider } from 'context';
import { WalletProvider } from './context';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from 'components/Layout';
import { Routes } from '../App';
import routes from './routes';
import Navbar from './Navbar';

export const App: React.FC = () => {
  return (
    <GlobalProvider>
      <WalletProvider>
        <Layout navbar={<Navbar />}>
          <Routes routes={routes} />
        </Layout>
      </WalletProvider>
    </GlobalProvider>
  );
};

const RoutedApp = () => (
  <Router>
    <App />
  </Router>
);

export default hot(RoutedApp);
