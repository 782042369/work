/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:17
 * @LastEditTime: 2019-05-24 15:23:05
 */
import { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import { findaccesslist, deleteaccess } from '../../api/access'
import datefilter from '../../tool/datefilter'
import { typefilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'
class access extends Component {
	constructor(props) {
		super(props)
		this.state = {
			accessdata: []
		}
	}

	getlist() {
		findaccesslist()
			.then((res:any) => {
				if (res.status === 1) {
					this.setState({
						accessdata: res.data
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
	deleteaccess(id) {
		deleteaccess({
			id
		})
			.then((res:any) => {
				this.getlist()
				message.success(res.message)
			})
			.catch((err:any) => {
				console.log('err: ', err)
			})
	}
	columns = [
		{ title: '模块名称', dataIndex: 'module_name', key: 'module_name' },
		{
			title: '节点类型',
			dataIndex: 'type',
			key: 'type',
			render: (text) => <div>{typefilter(text)}</div>
		},
		{ title: '描述', dataIndex: 'description', key: 'description' },
		{ title: '排序', dataIndex: 'sort', key: 'sort' },
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
					<Link to={'/addaccess?id=' + text}>
						<Button type="primary">修改</Button>
					</Link>
					<Divider type="vertical" />
					<Button type="danger" onClick={this.deleteaccess.bind(this, text)}>
						删除
					</Button>
				</span>
			)
		}
	]
	expandedRowRender = (record, index) => {
		let arr = [
			{ title: '模块名称', dataIndex: 'module_name', key: 'module_name' },
			{
				title: '节点类型',
				dataIndex: 'type',
				key: 'type',
				render: (text) => <div>{typefilter(text)}</div>
			},
			{ title: '描述', dataIndex: 'description', key: 'description' },
			{ title: '排序', dataIndex: 'sort', key: 'sort' },
			{
				title: '时间',
				key: 'add_time',
				dataIndex: 'add_time',
				render: (text) => <div>{datefilter(text)}</div>
			},
			{ title: '操作名称', dataIndex: 'action_name', key: 'action_name' },
			{ title: '操作地址', dataIndex: 'url', key: 'url' },
			{
				title: '操作',
				dataIndex: '_id',
				key: '_id',
				render: (text) => (
					<span>
						<Link to={'/addaccess?id=' + text}>
							<Button type="primary">修改</Button>
						</Link>
						<Divider type="vertical" />
						<Button type="danger" onClick={this.deleteaccess.bind(this, text)}>
							删除
						</Button>
					</span>
				)
			}
		]
		return (
			<Table
				rowKey={(record) => record._id}
				columns={arr}
				dataSource={this.state.accessdata[index].items.sort((res, b) => {
					return res.sort - b.sort
				})}
				pagination={false}
			/>
		)
	}
	render() {
		return (
			<div>
				<Table
					rowKey={(record) => record._id}
					dataSource={this.state.accessdata}
					columns={this.columns}
					expandedRowRender={this.expandedRowRender}
				/>
			</div>
		)
	}
}

export default access
