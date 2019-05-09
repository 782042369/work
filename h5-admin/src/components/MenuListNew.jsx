/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 菜单树
 * @Date: 2019-05-05 16:10:06
 * @LastEditTime: 2019-05-09 17:02:35
 */
import React, { Component } from 'react'
// import menus from '../router/routers'
import { Menu, Icon } from 'antd'
import { FindAccessTree } from '../api/access'
import { Link } from 'react-router-dom'
class menu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
	}
	getlist() {
		FindAccessTree()
			.then((res) => {
				if (res.status === 1) {
					this.setState({
						list: res.data
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
			<Menu defaultSelectedKeys={[ '/role' ]} defaultOpenKeys={[ '/role' ]} mode="inline">
				{this.state.list.map((item) => {
					return item.items && item.items.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
				})}
			</Menu>
		)
	}
}

export default menu
