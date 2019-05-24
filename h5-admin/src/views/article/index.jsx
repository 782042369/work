/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 导航
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-24 11:47:12
 */
import React, { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import { articlelist, deletearticle } from '../../api/article'
import datefilter from '../../tool/datefilter'
import { statusfilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'

class article extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	getlist() {
		articlelist()
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
	deletearticle(id) {
		deletearticle({
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
		{ title: '文章名称', dataIndex: 'title' },
		{
			title: '文章图片',
			dataIndex: 'article_img',
			render: (text) => (
				<img alt="" style={{ maxWidth: '4vw', maxHeight: '4vw' }} src={`http://127.0.0.1:7001${text}`} />
			)
		},
		{ title: '所属分类', dataIndex: 'cate_id' },
		{ title: '排序', dataIndex: 'sort' },
		{
			title: '状态',
			dataIndex: 'status',
			render: (text) => <div>{statusfilter(text)}</div>
		},
		{
			title: '时间',
			key: 'add_time',
			dataIndex: 'add_time',
			render: (text) => <div>{datefilter(text)}</div>
		},
		{
			title: '操作',
			dataIndex: '_id',
			key: '_id',
			render: (text) => (
				<span>
					<Link to={'/addarticle?id=' + text}>
						<Button type="primary">修改</Button>
					</Link>
					<Divider type="vertical" />
					<Button type="danger" onClick={this.deletearticle.bind(this, text)}>
						删除
					</Button>
				</span>
			)
		}
	]
	render() {
		return (
			<div>
				<Table rowKey={(record) => record._id} columns={this.columns} dataSource={this.state.data} />
			</div>
		)
	}
}

export default article
