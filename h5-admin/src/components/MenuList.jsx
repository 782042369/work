/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 菜单树
 * @Date: 2019-05-05 16:10:06
 * @LastEditTime: 2019-05-10 18:10:10
 */
import React, { Component } from 'react'
import menus from '../router/routers'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { authlist } from '../api/role'
import Group from 'antd/lib/input/Group'
class menu extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	findkey(list) {
		let arr = []
		list.forEach((val) => val.pid === '' && arr.push(val))
		arr.forEach((res) => {
			list.map((val) => {
				if (val.pid === res.pid) {
					console.log('val: ', val)
				}
			})
		})
	}

	componentDidMount() {
		authlist({
			role_id: sessionStorage.getItem('role_id')
		}).then((res) => {
			this.findkey(res.data)
			// let map = {},
			// 	dest = []
			// for (let i = 0; i < res.data.length; i++) {
			// 	let ai = res.data[i]
			// 	if (!map[ai.pid] && ai.pid) {
			// 		dest.push({
			// 			pid: ai.pid,
			// 			data: [ ai ]
			// 		})
			// 		map[ai.pid] = ai
			// 	} else {
			// 		for (let j = 0; j < dest.length; j++) {
			// 			let dj = dest[j]
			// 			if (dj.pid && dj.pid == ai.pid) {
			// 				dj.data.push(ai)
			// 				break
			// 			}
			// 		}
			// 	}
			// }
		})
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
			<Menu defaultSelectedKeys={[ '/role' ]} defaultOpenKeys={[ '/role' ]} mode="inline">
				{menus.map((item) => {
					return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
				})}
			</Menu>
		)
	}
}

export default menu
