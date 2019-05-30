/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-30 15:18:33
 */
import * as React from 'react'

import { Table, Divider, Button, message } from 'antd'
import { bannerlist, deletebanner } from '../../api/banner'
import datefilter from '../../tool/datefilter'
import { statusfilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'

interface IProps {}
interface IState {
	data: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			data: ''
		}
	}
	getlist() {
		bannerlist()
			.then((res: any) => {
				if (res.status === 1) {
					this.setState({
						data: res.data
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
	deletebanner(id: any) {
		deletebanner({
			id
		})
			.then((res: any) => {
				console.log('res: ', res)
				this.getlist()
				message.success(res.message)
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}
	columns = [
		{ title: '名称', dataIndex: 'title', rowKey: 'add_time' },
		{
			title: '状态',
			dataIndex: 'status',
			render: (text: any) => <div>{statusfilter(text)}</div>
		},
		{
			title: '图片',
			dataIndex: 'link',
			render: (text: any) => (
				<img alt="" style={{ maxWidth: '4vw', maxHeight: '4vw' }} src={`http://127.0.0.1:7001${text}`} />
			)
		},
		{ title: '点击跳转', dataIndex: 'focus_img', rowKey: 'add_time' },
		{
			title: '时间',
			dataIndex: 'add_time',
			render: (text: any) => <div>{datefilter(text)}</div>
		},
		{
			title: '操作',
			dataIndex: '_id',
			render: (text: any) => (
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
				<Table
					rowKey={(record: { _id: any }) => record._id}
					columns={this.columns}
					dataSource={this.state.data.pagelist}
				/>
			</div>
		)
	}
}

export default index
