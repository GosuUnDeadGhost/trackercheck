import Request from './request';

export const onLogin = (data) => dispatch => {
  Request({
    action: "auth/login",
    method: "POST",
    body: data,
    cb: (data) => {
      console.log(data);
      if (data.isLogin && data.isLogin === 1)
        dispatch({ type: 'FETCH_ON_LOGIN_SUCCESS', payload: data});
      else
        dispatch({ type: 'FETCH_ON_LOGOUT_SUCCESS'});
    }
  })
}
