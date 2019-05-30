/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-30 15:31:09
 */
import * as React from 'react'

import { Table, Divider, Button, message } from 'antd'
import { goodstypelist, deletegoodstype } from '../../api/goods'
import datefilter from '../../tool/datefilter'
import { statusfilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'

const { Column } = Table
interface IProps {}
interface IState {
	data: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			data: []
		}
	}
	getlist() {
		goodstypelist()
			.then((res: any) => {
				if (res.status === 1) {
					this.setState({
						data: res.data
					})
				}
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getlist()
	}
	deletegoodstype(id: any) {
		deletegoodstype({
			id
		})
			.then((res: any) => {
				console.log('res: ', res)
				this.getlist()
				message.success(res.message)
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}
	render() {
		return (
			<div>
				<Link to={'/addgoodstype'}>
					<Button type="primary">增加商品类型</Button>
				</Link>
				<Table rowKey={(record: { _id: any }) => record._id} dataSource={this.state.data}>
					<Column title="名称" dataIndex="title" key="title" />
					<Column
						title="状态"
						dataIndex="status"
						key="status"
						render={(text: any) => <div>{statusfilter(text)}</div>}
					/>

					<Column title="描述" dataIndex="description" key="description" />
					<Column
						title="时间"
						key="add_time"
						dataIndex="add_time"
						render={(text: any) => <div>{datefilter(text)}</div>}
					/>
					<Column
						title="操作"
						key="_id"
						dataIndex="_id"
						render={(text: any) => (
							<span>
								<Link to={'/goodstypeattribute?id=' + text}>
									<Button type="primary">属性列表</Button>
								</Link>
								<Divider type="vertical" />
								<Link to={'/addgoodstype?id=' + text}>
									<Button type="primary">修改</Button>
								</Link>
								<Divider type="vertical" />
								<Button type="danger" onClick={this.deletegoodstype.bind(this, text)}>
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

export default index
