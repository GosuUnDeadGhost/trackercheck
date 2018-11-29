import Request from './request';

export const onLogin = (data) => dispatch => {
  if (data.isLogin){
    //Убрал так как не работает - Revert back to the working version v2.15.5 (For Chrome) - https://stackoverflow.com/questions/51503198/error-error-error-error-you-may-not-call-store-getstate-while-the-reducer
    //dispatch({ type: 'FETCH_ON_LOGIN_SUCCESS', payload: data});
    return;
  }

  dispatch({ type: 'FETCH_ON_LOGIN_START', payload: {loading: true}});

  // setTimeout( () => {
  //   dispatch({ type: 'FETCH_ON_LOGIN_STOP', payload: {loading: false}});
  // }, 5000);

  Request({
    action: "auth/login",
    method: "POST",
    body: data,
    cb: (data) => {
      //console.log(data);
      dispatch({ type: 'FETCH_ON_LOGIN_STOP', payload: {loading: false}});
      if (data.isLogin && data.isLogin === 1){
        dispatch({ type: 'FETCH_ON_LOGIN_SUCCESS', payload: data});
      } else
        dispatch({ type: 'FETCH_ON_LOGIN_ERROR', payload: data});
    }
  })
}
