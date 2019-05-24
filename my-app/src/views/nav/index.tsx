/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 导航
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-24 11:03:02
 */
import { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import { navlist, deletenav } from '../../api/nav'
import datefilter from '../../tool/datefilter'
import { positioncode, statusfilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'

class nav extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	getlist() {
		navlist()
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
	deletenav(id) {
		deletenav({
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
	columns = [
		{ title: '分类名称', dataIndex: 'title' },
		{
			title: '导航位置',
			dataIndex: 'position',
			render: (text) => <div>{positioncode(text)}</div>
		},
		{
			title: '关联商品',
			dataIndex: 'relation'
		},
		{
			title: '状态',
			dataIndex: 'status',
			render: (text) => <div>{statusfilter(text)}</div>
		},
		{ title: '排序', dataIndex: 'sort' },
		{ title: '跳转地址', dataIndex: 'link' },
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
					<Link to={'/addnav?id=' + text}>
						<Button type="primary">修改</Button>
					</Link>
					<Divider type="vertical" />
					<Button type="danger" onClick={this.deletenav.bind(this, text)}>
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

export default nav
