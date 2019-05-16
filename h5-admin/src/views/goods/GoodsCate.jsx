/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-16 12:57:51
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
		goodscatelist()
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
		this.getlist()
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
				<Link to={`/addgoodscate`}>
					<Button type="primary">增加商品分类</Button>
				</Link>
				<Table dataSource={this.state.data}>
					<Column title="分类名称" dataIndex="title" key="title" />
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
