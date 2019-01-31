import { combineReducers } from 'redux';
import authReducer from './authReducer';
import coinReducer from './coinReducer';
import errorReducer from './errorReducer';
import coinCickedReducer from './coinClickedReducer';
import saveDataReducer from './saveDataReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  coin: coinReducer,
  clicked: coinCickedReducer,
  saved: saveDataReducer
});
