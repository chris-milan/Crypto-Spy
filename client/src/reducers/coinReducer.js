import _ from 'lodash';
import { COIN_DATA_FAILED, COIN_DATA_SUCCESS } from '../actions/types';

const initialState = {
  coinData: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COIN_DATA_SUCCESS:
      return {
        ...state,
        coinData: action.payload.data
      };
    case COIN_DATA_FAILED:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

/* Selectors */
export const fetchCoinData = state => _.get(state, ['coin', 'coinData'], []);
