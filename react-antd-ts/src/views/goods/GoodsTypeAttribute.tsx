/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-30 15:30:58
 */
import * as React from 'react'

import { Table, Divider, Button, message } from 'antd'
import { goodstypeattributelist, deletegoodstypeattribute } from '../../api/goods'
import datefilter from '../../tool/datefilter'
import { typeattributeilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'
import getUrlParam from '../../tool/getUrlParam'

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
		goodstypeattributelist({
			id: getUrlParam('id')
		})
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
	deletegoodstypeattribute(id: any) {
		deletegoodstypeattribute({
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
	public render() {
		return (
			<div>
				<Link to={`/addgoodstypeattribute?id=${getUrlParam('id')}&type=0`}>
					<Button type="primary">增加商品属性</Button>
				</Link>
				<Table rowKey={(record: { _id: any }) => record._id} dataSource={this.state.data}>
					<Column
						title="商品类型"
						dataIndex="parent"
						key="cate_id"
						render={(text: any) => <div>{text[0].title}</div>}
					/>
					<Column title="属性名称" dataIndex="title" key="title" />
					<Column
						title="属性值的录入方式"
						dataIndex="attr_type"
						key="attr_type"
						render={(text: any) => <div>{typeattributeilter(text)}</div>}
					/>
					<Column title="可选值列表" dataIndex="attr_value" key="attr_value" />
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
								<Link to={`/addgoodstypeattribute?id=${text}&type=1`}>
									<Button type="primary">修改</Button>
								</Link>
								<Divider type="vertical" />
								<Button type="danger" onClick={this.deletegoodstypeattribute.bind(this, text)}>
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
