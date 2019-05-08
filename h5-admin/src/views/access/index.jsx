/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:17
 * @LastEditTime: 2019-05-07 18:59:14
 */
import React, { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import { accesslist, deleteaccess } from '../../api/access'
import datefilter from '../../tool/datefilter'
import { Link } from 'react-router-dom'
const { Column } = Table

const data = [
	{
		key: '1',
		firstName: 'John',
		lastName: 'Brown',
		age: 32,
		address: 'New York No. 1 Lake Park1',
		tags: [ 'nice', 'developer' ]
	}
]
class access extends Component {
	constructor(props) {
		super(props)
		this.state = {
			accessdata: []
		}
	}
	getlist() {
		accesslist()
			.then((res) => {
				console.log('res: ', res)
				if (res.status === 1) {
					this.setState({
						accessdata: res.data
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
	deleteaccess(id) {
		deleteaccess({
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
				<Table dataSource={this.state.accessdata}>
					<Column title="模块名称" dataIndex="module_name" key="module_name" />
					<Column title="描述" dataIndex="description" key="description" />
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
								<Button type="primary">修改</Button>
								<Divider type="vertical" />
								<Button type="danger" onClick={this.deleteaccess.bind(this, text)}>
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

export default access
