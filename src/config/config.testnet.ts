import { NetworkType } from 'types/network.types';
import { allApps, schema } from './sharedConfig';
export * from './sharedConfig';

export const networks: NetworkType[] = [
  {
    default: true,
    id: 'midas-testnet',
    name: 'Midas-Testnet',
    chainId: 'MT',
    adapter: 'api',
    theme: 'testnet',
    egldLabel: 'OURO',
    walletAddress: 'https://testnet-wallet.multiversx.com',
    explorerAddress: 'https://explorer.internal.midaschain.ai',
    nftExplorerAddress: 'https://testnet.xspotlight.com',
    apiAddress: 'https://api.internal.midaschain.ai'
  }
];

export const multiversxApps = allApps([
  {
    id: 'wallet',
    url: 'https://testnet-wallet.multiversx.com'
  },
  {
    id: 'explorer',
    url: 'http://testnet-explorer.multiversx.com'
  },
  {
    id: 'xspotlight',
    url: 'https://testnet.xspotlight.com/'
  },
  {
    id: 'bridge',
    url: 'https://testnet-bridge.multiversx.com/'
  }
]);

networks.forEach((network) => {
  schema.validate(network, { strict: true }).catch(({ errors }) => {
    console.error(`Config invalid format for ${network.id}`, errors);
  });
});
