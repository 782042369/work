/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理员
 * @Date: 2019-05-05 15:48:39
 * @LastEditTime: 2019-05-21 15:48:36
 */
import { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import datefilter from '../../tool/datefilter'
import { managerlist, deletemanager } from '../../api/manager'
import { Link } from 'react-router-dom'
import LineWrap from '../../components/LineWrap'
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
			.then((res:any) => {
				console.log('res: ', res)
				if (res.status === 1) {
					this.setState({
						managerdata: res.data
					})
				}
				// console.log(this.state.managerdata)
			})
			.catch((err:any) => {
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
				<Table rowKey={(record) => record._id} dataSource={this.state.managerdata}>
					<Column
						title="名称"
						dataIndex="userName"
						key="userName"
						width="200px"
						render={(text) => <LineWrap title={text} lineClampNum={2} />}
					/>
					<Column
						title="手机"
						dataIndex="mobile"
						key="mobile"
						render={(text) => <LineWrap title={text} lineClampNum={2} />}
					/>
					<Column
						title="邮箱"
						dataIndex="email"
						key="email"
						render={(text) => <LineWrap title={text} lineClampNum={2} />}
					/>
					<Column
						title="角色名称"
						dataIndex="role[0].title"
						key="role[0].title"
						render={(text, record) => <LineWrap title={text} lineClampNum={2} />}
					/>
					<Column
						title="时间"
						key="add_time"
						dataIndex="add_time"
						render={(text, record) => <div>{datefilter(text)}</div>}
					/>
					<Column
						title="操作"
						key="action"
						dataIndex="_id"
						width="200px"
						render={(text, record) => (
							<span>
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
