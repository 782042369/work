/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-21 15:48:44
 */
import React, { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import { goodscatelist, deletegoodscate } from '../../api/goods'
import datefilter from '../../tool/datefilter'
import { typeattributeilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'
import getUrlParam from '../../tool/getUrlParam'
import { typefilter } from '../../tool/statusfilter'

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
	combtn = (e) => {
		return (
			<span>
				<Link to={'/addgoodscate?id=' + e}>
					<Button type="primary">修改</Button>
				</Link>
				<Divider type="vertical" />
				<Button type="danger" onClick={this.deletegoodscate.bind(this, e)}>
					删除
				</Button>
			</span>
		)
	}
	columns = [
		{ title: '分类名称', dataIndex: 'title', key: 'title' },
		{
			title: '节点类型',
			dataIndex: 'type',
			key: 'type',
			render: (text) => <div type="primary">顶级节点</div>
		},
		{
			title: '缩略图',
			key: 'cate_img',
			dataIndex: 'cate_img',
			render: (text) => (
				<img alt="" style={{ maxWidth: '4vw', maxHeight: '4svw' }} src={`http://127.0.0.1:7001${text}`} />
			)
		},
		{ title: '描述', dataIndex: 'description', key: 'description' },
		{ title: '排序', dataIndex: 'sort', key: 'sort' },
		{
			title: '时间',
			key: 'add_time',
			dataIndex: 'add_time',
			render: (text) => <div type="primary">{datefilter(text)}</div>
		},
		{
			title: '操作',
			dataIndex: '_id',
			key: '_id',
			render: (text) => this.combtn(text)
		}
	]
	expandedRowRender = (record, index) => {
		let arr = [
			{ title: '分类名称', dataIndex: 'title', key: 'title' },
			{
				title: '缩略图',
				key: 'cate_img',
				dataIndex: 'cate_img',
				render: (text) => (
					<img alt="" style={{ maxWidth: '4vw', maxHeight: '4vw' }} src={`http://127.0.0.1:7001${text}`} />
				)
			},
			{ title: '描述', dataIndex: 'description', key: 'description' },
			{ title: '排序', dataIndex: 'sort', key: 'sort' },
			{
				title: '时间',
				key: 'add_time',
				dataIndex: 'add_time',
				render: (text) => <div type="primary">{datefilter(text)}</div>
			},
			{
				title: '操作',
				dataIndex: '_id',
				key: '_id',
				render: (text) => this.combtn(text)
			}
		]
		return (
			<Table
				rowKey={(record) => record._id}
				columns={arr}
				dataSource={this.state.data[index].items}
				pagination={false}
			/>
		)
	}
	render() {
		return (
			<div>
				<Link to={'/addgoodscate'}>
					<Button type="primary">增加商品分类</Button>
				</Link>
				<Table
					rowKey={(record) => record._id}
					dataSource={this.state.data}
					columns={this.columns}
					expandedRowRender={this.expandedRowRender}
				/>
			</div>
		)
	}
}

export default role
