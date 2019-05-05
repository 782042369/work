/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:17
 * @LastEditTime: 2019-05-05 16:53:16
 */
import React, { Component } from 'react'
import { Table, Divider, Tag, Button } from 'antd'

const { Column } = Table
const data = [
	{
		key: '1',
		firstName: 'John',
		lastName: 'Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: [ 'nice', 'developer' ]
	},
	{
		key: '2',
		firstName: 'Jim',
		lastName: 'Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: [ 'loser' ]
	},
	{
		key: '3',
		firstName: 'Joe',
		lastName: 'Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: [ 'cool', 'teacher' ]
	}
]
class access extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div>
				<Button type="primary">增加</Button>
				<Table dataSource={data}>
					<Column title="年龄" dataIndex="age" key="age" />
					<Column title="名称" dataIndex="address" key="address" />
					{/* <Column
						title="Tags"
						dataIndex="tags"
						key="tags"
						render={(tags) => (
							<span>
								{tags.map((tag) => (
									<Tag color="blue" key={tag}>
										{tag}
									</Tag>
								))}
							</span>
						)}
					/> */}
					<Column title="时间" dataIndex="address" key="address" />
					<Column
						title="操作"
						key="action"
						render={(text, record) => (
							<span>
								<Button type="primary">查看</Button>
								<Divider type="vertical" />
								<Button type="primary">修改</Button>
								<Divider type="vertical" />
								<Button type="danger">删除</Button>
							</span>
						)}
					/>
				</Table>
			</div>
		)
	}
}

export default access