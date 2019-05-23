/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-23 10:52:46
 */
import React, { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import { goodslist, deletegoods } from '../../api/goods'
import datefilter from '../../tool/datefilter'
import { Link } from 'react-router-dom'
class role extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	getlist() {
		goodslist()
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
	deletegoods(id) {
		deletegoods({
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
	columns = [
		{ title: '商品名称', dataIndex: 'title' },
		{ title: '价格', dataIndex: 'shop_price' },
		{ title: '点击量', dataIndex: 'click_count' },
		{ title: '商品状态', dataIndex: 'status' },
		{ title: '推荐状态', dataIndex: 'sort' },
		// { title: '推荐排序', dataIndex: 'sort' },
		{ title: '库存', dataIndex: 'goods_number' },
		{
			title: '操作',
			dataIndex: '_id',
			render: (text) => (
				<span>
					<Link to={'/addgoods?id=' + text}>
						<Button type="primary">修改</Button>
					</Link>
					<Divider type="vertical" />
					<Button type="danger" onClick={this.deletegoods.bind(this, text)}>
						删除
					</Button>
				</span>
			)
		}
	]
	render() {
		return (
			<div>
				<Link to={'/addgoods'}>
					<Button type="primary">增加商品</Button>
				</Link>
				<Table rowKey={(record) => record._id} dataSource={this.state.data} columns={this.columns} />
			</div>
		)
	}
}

export default role
