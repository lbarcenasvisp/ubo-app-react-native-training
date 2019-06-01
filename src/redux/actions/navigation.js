import * as types from './types';
import { api_login_user } from '../../api/Api';

const setLoggedInState = loggedInState => (
  {
    type: types.SET_LOGGED_IN_STATE,
    loggedInState,
  }
);

const setUserRole = userRole => (
  {
    type: types.SET_USER_ROLE,
    userRole
  }
)

const setUserToken = userToken => (
  {
    type: types.SET_USER_TOKEN,
    userToken
  }
)

const logIn = (username, password) => {
  const action = async(dispatch) => {
    let loginResult = await api_login_user({ username, password });
    if (loginResult.error==null) {
      dispatch(setLoggedInState(true));
      dispatch(setUserToken("xxxxxxxxxxxxx")); // TODO store token
      return true;
     }
     dispatch(setLoggedInState(false));
     return false;
  };
  return action;
};


export {
  logIn,
  setLoggedInState,
  setUserRole,
  setUserToken
};
