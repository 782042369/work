/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:17
 * @LastEditTime: 2019-05-08 14:09:26
 */
import React, { Component } from 'react'
import { Table, Divider, Button, message } from 'antd'
import { findaccesslist, deleteaccess } from '../../api/access'
import datefilter from '../../tool/datefilter'
import { typefilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'
const { Column } = Table
class access extends Component {
	constructor(props) {
		super(props)
		this.state = {
			accessdata: []
		}
	}

	getlist() {
		findaccesslist()
			.then((res) => {
				if (res.status === 1) {
					this.setState({
						accessdata: res.data
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
	deleteaccess(id) {
		deleteaccess({
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
		{ title: '模块名称', dataIndex: 'module_name', key: 'module_name' },
		{
			title: '节点类型',
			dataIndex: 'type',
			key: 'type',
			render: (text) => <div type="primary">{typefilter(text)}</div>
		},
		{ title: '操作名称', dataIndex: 'action_name', key: 'action_name' },
		{ title: '操作地址', dataIndex: 'url', key: 'url' },
		{ title: '描述', dataIndex: 'description', key: 'description' },
		{ title: '描述', dataIndex: 'sort', key: 'sort' },
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
		return <Table columns={this.columns} dataSource={this.state.accessdata[index].items} pagination={false} />
	}
	render() {
		return (
			<div>
				<Table
					dataSource={this.state.accessdata}
					columns={this.columns}
					expandedRowRender={this.expandedRowRender}
				/>
			</div>
		)
	}
}

export default access
