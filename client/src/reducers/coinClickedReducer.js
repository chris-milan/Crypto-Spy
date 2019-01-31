import { SET_COIN_CLICKED } from '../actions/types';

const initialState = {
  isClicked: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_COIN_CLICKED:
      return {
        ...state,
        isClicked: action.payload
      };
    default:
      return state;
  }
}
