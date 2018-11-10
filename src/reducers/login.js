const initialState = {};

export default function login(state = initialState, action) {
  if (action.type === 'FETCH_ON_LOGIN_SUCCESS') {
    action.payload.isLogin = !!action.payload.isLogin;
    return action.payload;
  } else if (action.type === 'FETCH_ON_LOGIN_ERROR') {
    action.payload.isLogin = !!action.payload.isLogin;
    return action.payload;
  } else if (action.type === 'FETCH_ON_LOGOUT_SUCCESS') {
    return initialState;
  }
  return state;
}
