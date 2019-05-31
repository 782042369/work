/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理后台页面
 * @Date: 2019-04-23 14:57:41
 * @LastEditTime: 2019-05-31 16:53:17
 */
import React from 'react'
import { Layout, Avatar } from 'antd'
import MenuList from '../components/MenuList'
import { withRouter, BrowserRouter } from 'react-router-dom'
import ContentMain from '../components/ContentMain'
import '../assets/css/index.scss'
import '../assets/css/index.scss'
import {} from 'react-router-dom'
import User from '../store/user'
const { Header, Content, Sider } = Layout
function index() {
	const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	const LeftSider = withRouter(({ history }) => {
		return <MenuList history={history} />
	})
	return (
		<BrowserRouter>
			<Layout>
				<Header className="header" data-flex=" cross:center">
					<Avatar size={40} icon="user" />
					<span className="name">欢迎光临，{User.username}</span>
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
}

export default index
