import * as actions from '../actions/types';
import _ from 'lodash';

const initialState = {
  savedData: [],
  individualSave: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.SAVED_DATA_LOADING:
      return {
        ...state,
        loading: true
      };

    case actions.GET_ALL_SAVED_DATA:
      return {
        ...state,
        savedData: action.payload,
        loading: false
      };

    case actions.ADD_SAVE_DATA:
      return {
        ...state,
        savedData: [action.payload, ...state.savedData]
      };

    default:
      return state;
  }
}

export const fetchTheSavedData = state => state.saved.savedData;
export const checkIfLoading = state => state.saved.loading;
