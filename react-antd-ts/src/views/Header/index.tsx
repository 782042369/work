import React from 'react'
import { Layout, Icon, Avatar, message } from 'antd'
import { loginout } from '../../api/login'
import User from '../../store/user'
const { Header } = Layout

interface IProps {}
interface IState {}
class index extends React.Component<IProps, IState> {
	loginout() {
		window.sessionStorage.removeItem('role_id')
		window.sessionStorage.removeItem('userName')
		loginout().then((res: any) => {
			message.success(res.message)
			setTimeout(() => {
				window.location.href = '/login'
			}, 1000)
		})
	}
	public render() {
		return (
			<Header className="header" data-flex=" cross:center">
				<Avatar size={40} icon="user" />
				<span className="name">欢迎光临，{User.username}</span>
				<span className="loginout" onClick={this.loginout}>
					退出
					<Icon type="logout" />
				</span>
			</Header>
		)
	}
}

export default index
