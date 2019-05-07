/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:17
 * @LastEditTime: 2019-05-07 12:57:18
 */
import React, { Component } from 'react'
import { Table, Divider, Button } from 'antd'
import { accesslist } from '../../api/access'
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
		this.state = {}
	}
	getlist() {
		accesslist()
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
	deleterole(id) {
		// deleterole({
		// 	id
		// })
		// 	.then((res) => {
		// 		console.log('res: ', res)
		// 		this.getlist()
		// 		message.success(res.message)
		// 	})
		// 	.catch((err) => {
		// 		console.log('err: ', err)
		// 	})
	}
	render() {
		return (
			<div>
				{/* <Link to={'/addaccess'}>
					<Button type="primary">增加权限</Button>
				</Link> */}
				<Table dataSource={data}>
					<Column title="年龄" dataIndex="age" key="age" />
					<Column title="名称" dataIndex="address" key="address" />
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
								<Button type="danger" onClick={this.deleterole(text)}>
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
