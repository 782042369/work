/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-15 18:28:58
 */
import React, { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import { goodscatelist, deletegoodscate } from '../../api/goods'
import datefilter from '../../tool/datefilter'
import { typeattributeilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'
import getUrlParam from '../../tool/getUrlParam'

const { Column } = Table
class role extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	getlist() {
		goodscatelist({
			id: getUrlParam('id')
		})
			.then((res) => {
				if (res.status === 1) {
					this.setState({
						data: res.data
					})
				}
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		// this.getlist()
	}
	deletegoodscate(id) {
		deletegoodscate({
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
				<Link to={`/addgoodscate?id=${getUrlParam('id')}&type=0`}>
					<Button type="primary">增加商品分类</Button>
				</Link>
				<Table dataSource={this.state.data}>
					<Column
						title="商品类型"
						dataIndex="parent"
						key="cate_id"
						render={(text, record) => <div type="primary">{text[0].title}</div>}
					/>
					<Column title="属性名称" dataIndex="title" key="title" />
					<Column
						title="属性值的录入方式"
						dataIndex="attr_type"
						key="attr_type"
						render={(text, record) => <div type="primary">{typeattributeilter(text)}</div>}
					/>
					<Column title="可选值列表" dataIndex="attr_value" key="attr_value" />
					<Column
						title="时间"
						key="add_time"
						dataIndex="add_time"
						render={(text, record) => <div type="primary">{datefilter(text)}</div>}
					/>
					<Column
						title="操作"
						key="_id"
						dataIndex="_id"
						render={(text, record) => (
							<span>
								<Link to={`/addgoodscate?id=${text}&type=1`}>
									<Button type="primary">修改</Button>
								</Link>
								<Divider type="vertical" />
								<Button type="danger" onClick={this.deletegoodscate.bind(this, text)}>
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
