/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理后台页面
 * @Date: 2019-04-23 14:57:41
 * @LastEditTime: 2019-05-24 15:17:27
 */
import * as React from 'react'
import { Layout, Avatar } from 'antd'
import MenuList from '../components/MenuList'
import AsyncComponent from '../components/AsyncComponent'
import { Route, Switch, withRouter } from 'react-router-dom'
import ContentMain from '../components/ContentMain'
import '../assets/css/index.scss'
import { BrowserRouter } from 'react-router-dom'
const Login = AsyncComponent(() => import(/* webpackChunkName: "Login" */ './login/index'))
const { Header, Content, Sider } = Layout
function App() {
	const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	const LeftSider = withRouter(({ history }) => {
		return <MenuList path={history.location.pathname} />
	})
	if (window.sessionStorage.getItem('role_id')) {
		return (
			<BrowserRouter>
				<Layout>
					<Header className="header">
						<Avatar size={40} icon="user" />
						<span className="name">欢迎光临，{window.sessionStorage.getItem('userName')}</span>
					</Header>
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
			</BrowserRouter>
		)
	} else {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={Login} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App
