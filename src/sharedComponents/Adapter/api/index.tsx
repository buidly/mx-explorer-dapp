import axios from 'axios';
import { ProviderType, ProviderPropsType } from '../helpers';

const api: ProviderType = ({ baseUrl, url, params, timeout }) => {
  return axios.get(`${baseUrl}${url}`, { params, timeout });
};

export default {
  provider: api,
  getStats: ({ baseUrl, timeout }: ProviderPropsType) => {
    return api({
      baseUrl,
      url: `/stats`,
      timeout,
    });
  },
  getNodes: api,
  getShards: ({ baseUrl, timeout }: ProviderPropsType) => {
    return api({
      baseUrl,
      url: `/shards`,
      timeout,
    });
  },
  getAccountDelegation: api,
  getAccountStake: api,
  getProviders: api,
  getProvider: api,
  getEconomics: api,
  getEgldPrice: (props: ProviderPropsType) => {
    const { timeout } = props;
    return axios.get(`https://data.elrond.com/latest/quotes/egld/price`, { timeout });
  },
  getEgldMarketCap: (props: ProviderPropsType) => {
    const { timeout } = props;
    return axios.get(`https://data.elrond.com/latest/quotes/egld/market_cap`, { timeout });
  },
  getEgldCirculatingSupply: (props: ProviderPropsType) => {
    const { timeout } = props;
    return axios.get(`https://data.elrond.com/latest/economics/economics/circulating_supply`, {
      timeout,
    });
  },
  getEgldTotalStaked: (props: ProviderPropsType) => {
    const { timeout } = props;
    return axios.get(`https://data.elrond.com/latest/economics/economics/staked`, {
      timeout,
    });
  },
};
