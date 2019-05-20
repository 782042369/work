/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 路由卫士
 * @Date: 2019-05-05 18:20:10
 * @LastEditTime: 2019-05-20 20:50:13
 */
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
			isAuthenticated: window.sessionStorage.getItem('role_id') ? true : false
		};
	}

	componentWillMount() {
		if (!this.state.isAuthenticated) {
			const {
				history
			} = this.props;
			setTimeout(() => {
				history.replace('/');
			}, 1000);
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
			));
	}
}

export default withRouter(PrivateRoute);
