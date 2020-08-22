import axios from 'axios';
import { StateType, ConfigType } from './state';

export type ActionType =
  | { type: 'changeTestnet'; testnetId: string }
  | {
      type: 'updateTestnets';
      config: ConfigType;
    }
  | { type: 'setValidatorData'; validatorData: StateType['validatorData'] }
  | { type: 'setBrandData'; brandData: StateType['brandData'] }
  | { type: 'triggerNewRound'; intervalId: any }
  | { type: 'cancelAllRequests' }
  | {
      type: 'setNewRoundIntervalId';
      intervalId: ReturnType<typeof setInterval>;
      testnetId: string;
    };

export function globalReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'changeTestnet': {
      const newTestnet = state.config.testnets.find((testnet) => testnet.id === action.testnetId);
      const activeTestnet = newTestnet || state.defaultTestnet;
      // once activeTestnetId is populated, routes get prepended by testnetId

      return { ...state, activeTestnet, activeTestnetId: action.testnetId };
    }
    case 'updateTestnets': {
      return { ...state, config: action.config };
    }
    case 'triggerNewRound': {
      if (action.intervalId !== state.refresh.intervalId) {
        clearInterval(action.intervalId);
      }

      return {
        ...state,
        refresh: {
          ...state.refresh,
          timestamp: Date.now(),
        },
      };
    }
    case 'setNewRoundIntervalId': {
      const { intervalId, testnetId } = action;
      return {
        ...state,
        refresh: {
          ...state.refresh,
          intervalId,
          testnetId,
        },
      };
    }
    case 'setValidatorData': {
      const { validatorData } = action;
      return {
        ...state,
        validatorData,
      };
    }
    case 'setBrandData': {
      const { brandData } = action;
      return {
        ...state,
        brandData,
      };
    }
    case 'cancelAllRequests': {
      const cancelToken = axios.CancelToken.source();
      cancelToken.cancel();
      return {
        ...state,
        cancelToken,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
