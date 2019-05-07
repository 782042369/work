/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理员
 * @Date: 2019-05-05 15:48:39
 * @LastEditTime: 2019-05-07 12:56:29
 */
import React, { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import datefilter from '../../tool/datefilter'
import { managerlist, deletemanager } from '../../api/manager'
import { Link } from 'react-router-dom'

const { Column } = Table
class manager extends Component {
	constructor(props) {
		super(props)
		this.state = {
			managerdata: []
		}
	}
	getlist() {
		managerlist()
			.then((res) => {
				if (res.status === 1) {
					this.setState({
						managerdata: res.data
					})
				}
				console.log(this.state.managerdata)
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getlist()
	}
	deletemanager(id) {
		deletemanager({
			id
		})
			.then((res) => {
				console.log('res: ', res)
				this.getlist()
				message.success(res.message)
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}
	render() {
		return (
			<div>
				<Table dataSource={this.state.managerdata}>
					<Column title="名称" dataIndex="userName" key="userName" />
					<Column title="手机" dataIndex="mobile" key="mobile" />
					<Column title="邮箱" dataIndex="email" key="email" />
					<Column title="角色名称" dataIndex="role" key="role" />
					<Column
						title="时间"
						key="add_time"
						dataIndex="add_time"
						render={(text, record) => <div type="primary">{datefilter(text)}</div>}
					/>
					<Column
						title="操作"
						key="action"
						dataIndex="_id"
						render={(text, record) => (
							<span>
								<Button type="primary">查看</Button>
								<Divider type="vertical" />
								<Link to={'/addmanager?id=' + text}>
									<Button type="primary">修改</Button>
								</Link>
								<Divider type="vertical" />
								<Button type="danger" onClick={this.deletemanager.bind(this, text)}>
									删除
								</Button>
							</span>
						)}
					/>
				</Table>
			</div>
		)
	}
}

export default manager
