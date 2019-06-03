/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 路由卫士
 * @Date: 2019-05-05 18:20:10
 * @LastEditTime: 2019-06-03 19:45:40
 */
import * as React from 'react'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'
import { RouterProps, RouteProps } from 'react-router'
import { message } from 'antd'
import User from '../store/user'
interface singerState {
	isAuthenticated: any
}
interface singerProps {
	history: RouterProps['history']
	component: RouteProps['component']
	exact: any
	path: any
	key?: any
}
class index extends React.Component<singerProps & RouteComponentProps<{}>, singerState> {
	constructor(props: any) {
		super(props)
		this.state = {
			isAuthenticated: User.userlogin
		}
	}
	componentWillMount() {
		if (!this.state.isAuthenticated && this.props.path !== '/login') {
			const { history } = this.props
			setTimeout(() => {
				history.replace('/login')
			}, 1000)
		}
	}
	render() {
		let { component: Component, ...rest } = this.props
		if (this.state.isAuthenticated || this.props.path === '/login') {
			return <Route {...rest} component={Component} />
		} else {
			return message.error('请登录...')
		}
	}
}

export default withRouter(index)
