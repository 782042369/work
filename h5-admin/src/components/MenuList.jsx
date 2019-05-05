/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 菜单树
 * @Date: 2019-05-05 16:10:06
 * @LastEditTime: 2019-05-05 16:32:54
 */
import React, { Component } from 'react'
import menus from '../router/routers'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
console.log('menus: ', menus)
class menu extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	renderSubMenu = ({ key, icon, title, subs }) => {
		return (
			<Menu.SubMenu
				key={key}
				title={
					<span>
						{icon && <Icon type={icon} />}
						<span>{title}</span>
					</span>
				}
			>
				{subs &&
					subs.map((item) => {
						return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
					})}
			</Menu.SubMenu>
		)
	}
	renderMenuItem = ({ key, icon, title }) => {
		return (
			<Menu.Item key={key}>
				<Link to={key}>
					{icon && <Icon type={icon} />}
					<span>{title}</span>
				</Link>
			</Menu.Item>
		)
	}
	render() {
		return (
			<Menu defaultSelectedKeys={[ '/' ]} defaultOpenKeys={[ '/' ]} mode="inline">
				{menus.map((item) => {
					return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
				})}
			</Menu>
		)
	}
}

export default menu
