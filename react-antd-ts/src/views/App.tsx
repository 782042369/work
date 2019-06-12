/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理后台页面
 * @Date: 2019-04-23 14:57:41
 * @LastEditTime: 2019-06-12 16:22:47
 */
import React from 'react'
import { Layout } from 'antd'
import { withRouter, BrowserRouter, Switch } from 'react-router-dom'
import ContentMain from '../components/ContentMain'
import '../assets/css/index.scss'
import Loadable from 'react-loadable'
import Loading from '../router/loading'
import PrivateRoute from '../tool/privateRoute'
import Header from '../views/Header'
const { Content, Sider } = Layout
const Login = Loadable({
	loader: () => import(/* webpackChunkName: "Login" */ '../views/login/index'),
	loading: Loading
})
const MenuList = Loadable({
	loader: () => import(/* webpackChunkName: "MenuList" */ '../components/MenuList'),
	loading: Loading
})
function index() {
	const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	const LeftSider = withRouter(({ history }) => {
		return <MenuList history={history} />
	})
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute exact path="/login" component={Login} />
				<Layout>
					<Header />
					<Layout>
						<Sider width={200} style={{ background: '#fff' }}>
							<LeftSider />
						</Sider>
						<Layout>
							<Content
								className="App-contentMain"
								style={{
									background: '#fff',
									margin: 25,
									height: screenHeight,
									padding: 25
								}}
							>
								<ContentMain />
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</Switch>
		</BrowserRouter>
	)
}

export default index
