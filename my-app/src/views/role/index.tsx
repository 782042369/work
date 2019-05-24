/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-21 15:48:39
 */
import * as React from 'react';
import { Table, Divider, Button, message } from 'antd'
import { rolelist, deleterole } from '../../api/role'
import datefilter from '../../tool/datefilter'
import { statusfilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'

const { Column } = Table
class role extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	getlist() {
		rolelist()
			.then((res:any) => {
				if (res.status === 1) {
					this.setState({
						data: res.data
					})
				}
			})
			.catch((err:any) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getlist()
	}
	deleterole(id) {
		deleterole({
			id
		})
			.then((res:any) => {
				console.log('res: ', res)
				this.getlist()
				message.success(res.message)
			})
			.catch((err:any) => {
				console.log('err: ', err)
			})
	}
	render() {
		return (
			<div>
				<Table rowKey={(record) => record._id} dataSource={this.state.data}>
					<Column title="名称" dataIndex="title" key="title" />
					<Column
						title="状态"
						dataIndex="status"
						key="status"
						render={(text, record) => <div>{statusfilter(text)}</div>}
					/>

					<Column title="描述" dataIndex="description" key="description" />
					<Column
						title="时间"
						key="add_time"
						dataIndex="add_time"
						render={(text, record) => <div>{datefilter(text)}</div>}
					/>
					<Column
						title="操作"
						key="_id"
						dataIndex="_id"
						render={(text, record) => (
							<span>
								<Link to={'/auth?id=' + text}>
									<Button type="primary">授权</Button>
								</Link>
								<Divider type="vertical" />
								<Link to={'/addrole?id=' + text}>
									<Button type="primary">修改</Button>
								</Link>
								<Divider type="vertical" />
								<Button type="danger" onClick={this.deleterole.bind(this, text)}>
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

export default role
