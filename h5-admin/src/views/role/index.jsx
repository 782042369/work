/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-06 18:08:47
 */
import React, { Component } from 'react'
import { Table, Divider, Button } from 'antd'
import { rolelist } from '../../api/role'
import datefilter from '../../tool/datefilter'
import statusfilter from '../../tool/statusfilter'
const { Column } = Table
class role extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		rolelist()
			.then((res) => {
				console.log('res: ', res)
				this.setState({
					data: res
				})
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}
	render() {
		return (
			<div>
				<Button type="primary">增加角色</Button>
				<Table dataSource={this.state.data}>
					<Column title="名称" dataIndex="title" key="title" />
					<Column
						title="状态"
						dataIndex="status"
						key="status"
						render={(text, record) => <div type="primary">{statusfilter(text)}</div>}
					/>

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
						render={(text, record) => (
							<span>
								<Button type="primary">查看</Button>
								<Divider type="vertical" />
								<Button type="primary">修改</Button>
								<Divider type="vertical" />
								<Button type="danger">删除</Button>
							</span>
						)}
					/>
				</Table>
			</div>
		)
	}
}

export default role
