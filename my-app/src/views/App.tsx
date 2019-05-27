/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理后台页面
 * @Date: 2019-04-23 14:57:41
 * @LastEditTime: 2019-05-27 15:58:37
 */
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Layout, Avatar } from 'antd'
const { Header, Content, Sider } = Layout

class App extends React.Component {
	public render() {
		const screenHeight: number =
			window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		return (
			<BrowserRouter>
				<Layout>
					<Header className="header">
						<Avatar size={40} icon="user" />
						<span className="name">欢迎光临，{window.sessionStorage.getItem('userName')}</span>
					</Header>
					<Layout>
						<Sider width={200} style={{ background: '#fff' }}>
							{/* <LeftSider /> */}
						</Sider>
						<Layout>
							<Content
								className="App-contentMain"
								style={{
									background: '#fff',
									height: screenHeight,
									margin: 25,
									padding: 25
								}}
							>
								{/* <ContentMain /> */}
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</BrowserRouter>
		)
	}
}

export default App
