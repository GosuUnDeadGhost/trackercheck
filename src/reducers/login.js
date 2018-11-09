const initialState = false;

export default function login(state = initialState, action) {
  if (action.type === 'FETCH_ON_LOGIN_SUCCESS') {
    return action.payload;
  } else if (action.type === 'FETCH_ON_LOGOUT_SUCCESS') {
    return initialState;
  }
  return state;
}
