import axios from 'axios';
import * as actions from './types';

// Add Save
export const addSave = saveData => dispatch => {
  axios
    .post('/api/dashboard', saveData)
    .then(res =>
      dispatch({
        type: actions.ADD_SAVE_DATA,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Saves
export const getSaves = () => dispatch => {
  dispatch(setSavesLoading());
  axios
    .get('/api/dashboard')
    .then(res =>
      dispatch({
        type: actions.GET_ALL_SAVED_DATA,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actions.GET_ALL_SAVED_DATA,
        payload: null
      })
    );
};

// Set loading state
export const setSavesLoading = () => {
  return {
    type: actions.SAVED_DATA_LOADING
  };
};
