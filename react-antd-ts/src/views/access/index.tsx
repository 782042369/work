/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:17
 * @LastEditTime: 2019-05-30 17:57:08
 */
import * as React from 'react'

import { Table, Divider, Button, message } from 'antd'
import { findaccesslist, deleteaccess } from '../../api/access'
import datefilter from '../../tool/datefilter'
import { typefilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'
interface IProps {}
interface IState {
	accessdata: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			accessdata: []
		}
	}
	getlist() {
		findaccesslist()
			.then((res: any) => {
				if (res.status === 1) {
					this.setState({
						accessdata: res.data
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
	deleteaccess(id: any) {
		deleteaccess({
			id
		})
			.then((res: any) => {
				this.getlist()
				message.success(res.message)
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}
	columns = [
		{ title: '模块名称', dataIndex: 'module_name', key: 'module_name' },
		{
			title: '节点类型',
			dataIndex: 'type',
			key: 'type',
			render: (text: any) => <div>{typefilter(text)}</div>
		},
		{ title: '描述', dataIndex: 'description', key: 'description' },
		{ title: '排序', dataIndex: 'sort', key: 'sort' },
		{
			title: '时间',
			key: 'add_time',
			dataIndex: 'add_time',
			render: (text: any) => <div>{datefilter(text)}</div>
		},
		{
			title: '操作',
			dataIndex: '_id',
			key: '_id',
			render: (text: any) => (
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
	expandedRowRender = (record: any, index: any) => {
		let arr = [
			{ title: '模块名称', dataIndex: 'module_name', key: 'module_name' },
			{
				title: '节点类型',
				dataIndex: 'type',
				key: 'type',
				render: (text: any) => <div>{typefilter(text)}</div>
			},
			{ title: '描述', dataIndex: 'description', key: 'description' },
			{ title: '排序', dataIndex: 'sort', key: 'sort' },
			{
				title: '时间',
				key: 'add_time',
				dataIndex: 'add_time',
				render: (text: any) => <div>{datefilter(text)}</div>
			},
			{ title: '操作名称', dataIndex: 'action_name', key: 'action_name' },
			{ title: '操作地址', dataIndex: 'url', key: 'url' },
			{
				title: '操作',
				dataIndex: '_id',
				key: '_id',
				render: (text: any) => (
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
				rowKey={(record: { _id: any }) => record._id}
				columns={arr}
				dataSource={this.state.accessdata[index].items.sort((res: any, b: any) => {
					return res.sort - b.sort
				})}
				pagination={false}
			/>
		)
	}
	public render() {
		return (
			<div>
				<Table
					rowKey={(record: { _id: any }) => record._id}
					dataSource={this.state.accessdata}
					columns={this.columns}
					expandedRowRender={this.expandedRowRender}
				/>
			</div>
		)
	}
}

export default index
