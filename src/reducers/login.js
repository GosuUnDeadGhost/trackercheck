const initialState = {};

export default function login(state = initialState, action) {
  if (action.type === 'FETCH_ON_LOGIN_SUCCESS') {
    localStorage.setItem("login", JSON.stringify(action.payload));
    action.payload.isLogin = !!action.payload.isLogin;
    return action.payload;
    //return Object.assign({}, state, action.payload);
  } else if (action.type === 'FETCH_ON_LOGIN_ERROR') {
    action.payload.isLogin = !!action.payload.isLogin;
    return action.payload;
  } else if (action.type === 'FETCH_ON_LOGOUT_SUCCESS') {
    localStorage.removeItem("login");
    return initialState;
  } else if (action.type === 'FETCH_ON_LOGIN_START') {
    return action.payload;
  } else if (action.type === 'FETCH_ON_LOGIN_STOP') {
    return action.payload;
  }
  return state;
}
