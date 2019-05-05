/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理后台页面
 * @Date: 2019-04-23 14:57:41
 * @LastEditTime: 2019-05-05 18:49:53
 */
import React from 'react'
import { Layout } from 'antd'
import '../assets/css/index.scss'
import MenuList from '../components/MenuList'
import AsyncComponent from '../components/AsyncComponent'

import { Route, Switch } from 'react-router-dom'
import ContentMain from '../components/ContentMain'
import { BrowserRouter } from 'react-router-dom'
const Login = AsyncComponent(() => import(/* webpackChunkName: "Login" */ '../views/login/index'))
const { Header, Content, Sider } = Layout
function App() {
	const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
			</Switch>
			<Layout>
				<Header className="header">
					<div className="logo" />
				</Header>
				<Layout>
					<Sider width={200} style={{ background: '#fff' }}>
						<MenuList />
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
}

export default App
