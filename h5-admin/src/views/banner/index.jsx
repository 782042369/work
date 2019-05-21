/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-21 15:48:02
 */
import React, { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import { bannerlist, deletebanner } from '../../api/banner'
import datefilter from '../../tool/datefilter'
import { statusfilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'

const { Column } = Table
class role extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			pagenum: 1
		}
	}
	getlist() {
		bannerlist()
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
	deletebanner(id) {
		deletebanner({
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
		{ title: '名称', dataIndex: 'title', rowKey: 'add_time' },
		{
			title: '状态',
			dataIndex: 'status',
			render: (text, record) => <div type="primary">{statusfilter(text)}</div>
		},
		{
			title: '图片',
			dataIndex: 'link',
			render: (text) => (
				<img alt="" style={{ maxWidth: '4vw', maxHeight: '4vw' }} src={`http://127.0.0.1:7001${text}`} />
			)
		},
		{ title: '点击跳转', dataIndex: 'focus_img', rowKey: 'add_time' },
		{
			title: '时间',
			dataIndex: 'add_time',
			render: (text) => <div type="primary">{datefilter(text)}</div>
		},
		{
			title: '操作',
			dataIndex: '_id',
			render: (text) => (
				<span>
					<Link to={'/addgoodscate?id=' + text}>
						<Button type="primary">修改</Button>
					</Link>
					<Divider type="vertical" />
					<Button type="danger" onClick={this.deletebanner.bind(this, text)}>
						删除
					</Button>
				</span>
			)
		}
	]
	render() {
		return (
			<div>
				<Table rowKey={(record) => record._id} columns={this.columns} dataSource={this.state.data.pagelist} />
			</div>
		)
	}
}

export default role
