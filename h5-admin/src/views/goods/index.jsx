import React, { Component } from 'react'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane
class index extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	callback(key) {
		console.log(key)
	}
	render() {
		return (
			<Tabs onChange={this.callback} type="card">
				<TabPane tab="通用信息" key="1">
					Content of Tab Pane 1
				</TabPane>
				<TabPane tab="详细描述" key="2">
					Content of Tab Pane 2
				</TabPane>
				<TabPane tab="商品属性" key="3">
					Content of Tab Pane 3
				</TabPane>
				<TabPane tab="规格包装" key="4">
					Content of Tab Pane 4
				</TabPane>
				<TabPane tab="商品相册" key="5">
					Content of Tab Pane 5
				</TabPane>
			</Tabs>
		)
	}
}
export default index
