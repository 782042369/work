import React, {
  Component
} from 'react';
import {
  Route,
  withRouter
} from 'react-router-dom';
import {
  message
} from 'antd';
class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: window.sessionStorage.getItem("userId") ? true : false
    }
  }

  componentWillMount() {
    if (!this.state.isAuthenticated) {
      const {
        history
      } = this.props;
      setTimeout(() => {
        history.replace("/login");
      }, 1000)
    }
  }

  render() {
    let {
      component: Component,
      ...rest
    } = this.props;
    return this.state.isAuthenticated ?
      ( < Route {
          ...rest
        }
        render = {
          (props) => ( < Component {
              ...props
            }
            /> 
          )
        }
        /> ) : (message.error(
        '请登录...'
      ))

}
}

export default withRouter(PrivateRoute);
