/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 菜单树
 * @Date: 2019-05-05 16:10:06
 * @LastEditTime: 2019-05-30 14:25:12
 */
import * as React from 'react'

// import menus from '../router/routers'
import { Menu, Icon } from 'antd'
import { authlist } from '../api/role'
import { Link } from 'react-router-dom'
import mergefieldtojson from '../tool/mergefieldtojson'
// import { withRouter } from 'react-router-dom'
interface IProps {}
interface IState {
	list: any
	openurl: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			list: [],
			openurl: [] // 打开第一个路由
		}
	}
	getlist() {
		authlist({
			role_id: sessionStorage.getItem('role_id')
		})
			.then((res: any) => {
				if (res.status === 1) {
					let openurl = []
					if (res.data.length > 0) {
						openurl.push('/noaccess')
					} else {
						openurl.push('/noaccess')
					}

					this.setState({
						list: mergefieldtojson(res.data, 'pid', 'parent_id'),
						openurl
					})
				}
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getlist()
	}
	renderSubMenu = ({ url, module_name, items }: any) => {
		return (
			<Menu.SubMenu
				key={url + module_name}
				title={
					<span>
						<Icon type="user" />
						<span>{module_name}</span>
					</span>
				}
			>
				{items &&
					items.map((item: any) => {
						return item.items && item.items.length > 0
							? this.renderSubMenu(item)
							: this.renderMenuItem(item)
					})}
			</Menu.SubMenu>
		)
	}
	renderMenuItem = ({ url, module_name }: any) => {
		return (
			<Menu.Item key={url}>
				<Link to={url}>
					<span>{module_name}</span>
				</Link>
			</Menu.Item>
		)
	}
	render() {
		return (
			<Menu mode="inline" defaultOpenKeys={[ '商品管理' ]}>
				{this.state.list.map((item: any) => {
					return item.items && item.items.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
				})}
			</Menu>
		)
	}
}

export default index
