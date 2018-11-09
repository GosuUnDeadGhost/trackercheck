import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from "react-router-dom";

class PrivateRoute extends Component{

  constructor(props) {
    super(props);
    const {Component, ...rest} = props;

    return (
      <Route
        {...rest}
        render={props =>
          true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

  }

  PrivateRoute = ({ component: Component, ...rest }) => {

    console.log(Component, ...rest);
    return (
      <div>
      </div>
    )
    const isLogin = this.props.isLogin;
    // return (
    //   <Route
    //     {...rest}
    //     render={props =>
    //       isLogin ? (
    //         <Component {...props} />
    //       ) : (
    //         <Redirect
    //           to={{
    //             pathname: "/login",
    //             state: { from: props.location }
    //           }}
    //         />
    //       )
    //     }
    //   />
    // );
  }


}

export default connect(
  state => ({
    isLogin: state.isLogin
  })
)(PrivateRoute);
