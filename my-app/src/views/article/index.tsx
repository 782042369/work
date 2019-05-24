/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 导航
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-24 18:26:19
 */
import * as React from 'react'
import { Table, Divider, Button, message } from 'antd'
import { articlelist, deletearticle } from '../../api/article'
import datefilter from '../../tool/datefilter'
import { statusfilter } from '../../tool/statusfilter'
import { Link } from 'react-router-dom'

interface State {
	data: any
}
interface Props {}
class index extends React.Component<Props, State> {
	getlist() {
		articlelist()
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
	deletearticlec(id: any) {
		deletearticle({
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
		{ title: '文章名称', dataIndex: 'title' },
		{
			title: '文章图片',
			dataIndex: 'article_img',
			render: (text: any) => (
				<img alt="" style={{ maxWidth: '4vw', maxHeight: '4vw' }} src={`http://127.0.0.1:7001${text}`} />
			)
		},
		{ title: '所属分类', dataIndex: 'cate_id' },
		{ title: '排序', dataIndex: 'sort' },
		{
			title: '状态',
			dataIndex: 'status',
			render: (text: any) => <div>{statusfilter(text)}</div>
		},
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
					<Link to={'/addarticle?id=' + text}>
						<Button type="primary">修改</Button>
					</Link>
					<Divider type="vertical" />
					<Button type="danger" onClick={deletearticle.bind(this, text)}>
						删除
					</Button>
				</span>
			)
		}
	]
	render() {
		return (
			<div>
				<Table columns={this.columns} dataSource={this.state.data} />
			</div>
		)
	}
}

export default index
