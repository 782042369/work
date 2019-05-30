/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 路由卫士
 * @Date: 2019-05-05 18:20:10
 * @LastEditTime: 2019-05-30 17:53:29
 */
import * as React from 'react'

import { Route, withRouter } from 'react-router-dom'
import { RouterProps, RouteProps } from 'react-router'
import { message } from 'antd'
import User from '../store/user'
interface singerState {
	isAuthenticated: any
}
interface singerProps {
	history: RouterProps['history']
	component: RouteProps['component']
	Component: React.Component
}
class index extends React.Component<singerProps, singerState> {
	constructor(props: any) {
		super(props)
		this.state = {
			isAuthenticated: User.userlogin
		}
	}

	componentWillMount() {
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
		return <div>1</div>
		// let { component: Component, ...rest } = this.props
		// return this.state.isAuthenticated ? (
		// 	<Route {...rest} render={(props) => <Component {...props} />} />
		// ) : (
		// 	message.error('请登录...')
		// )
	}
}

export default index
