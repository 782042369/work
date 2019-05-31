/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 路由卫士
 * @Date: 2019-05-05 18:20:10
 * @LastEditTime: 2019-05-31 16:15:42
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
	key: any
}
class index extends React.Component<singerProps & RouteComponentProps<{}>, singerState> {
	constructor(props: any) {
		super(props)
		this.state = {
			isAuthenticated: User.userlogin
		}
	}

	componentWillMount() {
		console.log('this.state.isAuthenticated: ', this.state.isAuthenticated)
		if (!this.state.isAuthenticated) {
			const { history } = this.props
			setTimeout(() => {
				history.replace('/login')
			}, 1000)
		}
	}

	routerWillLeave(nextLocation: any): void {
		console.log('nextLocation: ', nextLocation)
	}
	render() {
		let { component: Component, ...rest } = this.props
		console.log('this.state.isAuthenticated: ', this.state.isAuthenticated)
		return this.state.isAuthenticated ? <Route {...rest} component={Component} /> : message.error('请登录...')
	}
}

export default withRouter(index)
