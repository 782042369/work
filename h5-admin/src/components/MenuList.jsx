/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 菜单树
 * @Date: 2019-05-05 16:10:06
 * @LastEditTime: 2019-05-13 17:39:56
 */
import React, { Component } from 'react'
// import menus from '../router/routers'
import { Menu, Icon } from 'antd'
import { authlist } from '../api/role'
import { Link } from 'react-router-dom'
class menu extends Component {
	constructor(props) {
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
			.then((res) => {
				if (res.status === 1) {
					let openurl = []
					if (res.data.length > 0) {
						openurl.push('/noaccess')
					} else {
						openurl.push('/noaccess')
					}
					const arr = res.data.filter((res) => res.pid === '')
					arr.map((val) => {
						val.items = []
						res.data.map((res) => {
							if (res.pid === val.parent_id) {
								val.items.push(res)
							}
						})
					})
					this.setState({
						list: arr,
						openurl
					})
				}
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getlist()
	}
	renderSubMenu = ({ url, icon, module_name, items }) => {
		return (
			<Menu.SubMenu
				key={url}
				title={
					<span>
						{/* {icon && <Icon type={icon} />} */}
						<Icon type="user" />
						<span>{module_name}</span>
					</span>
				}
			>
				{items &&
					items.map((item) => {
						return item.items && item.items.length > 0
							? this.renderSubMenu(item)
							: this.renderMenuItem(item)
					})}
			</Menu.SubMenu>
		)
	}
	renderMenuItem = ({ url, icon, module_name }) => {
		return (
			<Menu.Item key={url}>
				<Link to={url}>
					{/* {icon && <Icon type={icon} />} */}
					<span>{module_name}</span>
				</Link>
			</Menu.Item>
		)
	}
	render() {
		return (
			<Menu defaultSelectedKeys={[ '/noaccess' ]} defaultOpenKeys={[ '/noaccess' ]} mode="inline">
				{this.state.list.map((item) => {
					return item.items && item.items.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
				})}
			</Menu>
		)
	}
}

export default menu
