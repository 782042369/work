import React, { Component } from 'react'
import {
	addgoodscate,
	editgoodscate,
	goodscatelist,
	goodscolorlist,
	goodstypelist,
	goodstypeattributelist
} from '../../api/goods'
import getUrlParam from '../../tool/getUrlParam'
import { Form, Input, Button, message, Select, Icon, Upload, Tabs, Checkbox } from 'antd'
import Darft from '../../components/Darft'
const TabPane = Tabs.TabPane
const Option = Select.Option
const { TextArea } = Input
const Dragger = Upload.Dragger
const CheckboxGroup = Checkbox.Group
class index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			plainOptions: [],
			seletcoptions: []
		}
	}
	callback(key) {
		console.log(key)
	}
	goodscolorlist() {
		goodscolorlist().then((res) => {
			let arr = []
			res.data.forEach((element) => {
				arr.push({
					label: element.color_name,
					value: element._id
				})
			})
			this.setState({
				plainOptions: arr
			})
		})
	}
	goodstypelist() {
		goodstypelist().then((res) => {
			this.setState({
				seletcoptions: res.data
			})
		})
	}
	handleSelectChange = (e) => {
		goodstypeattributelist({ id: e }).then((res) => {
			console.log('res: ', res)
			// let arr = []
			// res.data.forEach((element) => {
			// 	arr.push(element.title)
			// })
			// this.setState({
			// 	seletcoptions: arr
			// })
		})
	}
	editorState = (txt) => {
		console.log('富文本编辑器内容是-->', txt)
	}
	componentDidMount() {
		this.goodscolorlist()
		this.goodstypelist()
		if (getUrlParam('id')) {
			this.setState({
				title: '修改'
			})
		} else {
			this.setState({
				title: '增加'
			})
		}
	}
	renderOptions = () => {
		return this.state.seletcoptions.map((element) => (
			<Option key={element._id} value={element._id}>
				{element.title}
			</Option>
		))
	}
	render() {
		const { getFieldDecorator } = this.props.form
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		}
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		}
		return (
			<div>
				<h1>{this.state.title}商品</h1>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Tabs onChange={this.callback} type="card">
						<TabPane tab="通用信息" key="1">
							<Form.Item label="商品颜色">
								{getFieldDecorator('title', {
									rules: [
										{
											required: true,
											message: 'Please input your title!'
										}
									]
								})(<CheckboxGroup options={this.state.plainOptions} />)}
							</Form.Item>
							<Form.Item label="商品名称">
								{getFieldDecorator('title', {
									rules: [
										{
											required: true,
											message: 'Please input your title!'
										}
									]
								})(<Input placeholder="请输入" />)}
							</Form.Item>
						</TabPane>
						<TabPane tab="详细描述" key="2">
							<Darft editorState={this.editorState.bind(this)} />
						</TabPane>
						<TabPane tab="商品属性" key="3">
							Content of Tab Pane 3
						</TabPane>
						<TabPane tab="规格包装" key="4">
							<Form {...formItemLayout} onSubmit={this.handleSubmit}>
								<Form.Item label="商品颜色">
									{getFieldDecorator('seletetitle', {
										rules: [
											{
												required: true,
												message: 'Please input your title!'
											}
										]
									})(<Select onChange={this.handleSelectChange}>{this.renderOptions()}</Select>)}
								</Form.Item>
							</Form>
						</TabPane>
						<TabPane tab="商品相册" key="5">
							Content of Tab Pane 5
						</TabPane>
					</Tabs>
					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}
const addgoods = Form.create({ name: 'register' })(index)
export default addgoods
