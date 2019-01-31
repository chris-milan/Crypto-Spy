import axios from 'axios';
import * as actions from './types';

export const getCoinData = () => dispatch => {
  dispatch({
    type: actions.COIN_DATA_REQUEST
  });
  return axios
    .get('/api/coins')
    .then(res =>
      dispatch({
        type: actions.COIN_DATA_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actions.COIN_DATA_FAILED,
        error: err.response.data
      })
    );
};

export const setClickedCoin = click => {
  localStorage.setItem('cbuzz_ID_clicked', click);
  return {
    type: actions.SET_COIN_CLICKED,
    payload: click
  };
};
