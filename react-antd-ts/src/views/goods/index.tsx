/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-06-12 18:56:37
 */
import * as React from 'react'

import { Table, Divider, Button, message } from 'antd'
import { goodslist, deletegoods } from '../../api/goods'
import { Link } from 'react-router-dom'

interface IProps {}
interface IState {
	data: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			data: []
		}
	}
	getlist() {
		goodslist()
			.then((res: any) => {
				console.log('res: ', res)
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
	deletegoods(id: any) {
		deletegoods({
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
			render: (text: any) => (
				<span>
					<Link to={'/addgoods?id=' + text}>
						<Button type="primary">修改</Button>
					</Link>
					<Divider type="vertical" />
					<Link to={'/goodsphotolist?id=' + text}>
						<Button type="primary">管理商品相册</Button>
					</Link>
					<Divider type="vertical" />
					<Button type="danger" onClick={this.deletegoods.bind(this, text)}>
						删除
					</Button>
				</span>
			)
		}
	]
	public render() {
		return (
			<div>
				<Link to={'/addgoods'}>
					<Button type="primary">增加商品</Button>
				</Link>
				<Table
					rowKey={(record: { _id: any }) => record._id}
					dataSource={this.state.data}
					columns={this.columns}
				/>
			</div>
		)
	}
}

export default index
