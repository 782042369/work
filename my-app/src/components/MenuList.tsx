/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 菜单树
 * @Date: 2019-05-05 16:10:06
 * @LastEditTime: 2019-05-24 17:38:13
 */
import * as React from 'react'
// import menus from '../router/routers'
import { Menu, Icon } from 'antd'
import { authlist } from '../api/role'
import { Link } from 'react-router-dom'
import mergefieldtojson from '../tool/mergefieldtojson'
// import { withRouter } from 'react-router-dom'
interface Props {
	title: string
	lineClampNum: number
	path: any
}
interface State {
	list: any
	openurl: any
}
const MenuSubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class menu extends React.Component<Props, State> {
	getlist() {
		authlist({
			role_id: sessionStorage.getItem('role_id')
		})
			.then((res: any) => {
				if (res.status === 1) {
					let openurl: any = []
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
			<MenuSubMenu
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
			</MenuSubMenu>
		)
	}
	renderMenuItem = ({ url, module_name }: any) => {
		return (
			<MenuItem key={url}>
				<Link to={url}>
					<span>{module_name}</span>
				</Link>
			</MenuItem>
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

export default menu
