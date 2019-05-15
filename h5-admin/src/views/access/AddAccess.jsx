/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:39
 * @LastEditTime: 2019-05-09 12:53:50
 */
import React, { Component } from 'react'
import { addaccess, editaccess, accesslist } from '../../api/access'
import getUrlParam from '../../tool/getUrlParam'
import { Form, Input, Button, message, Select } from 'antd'
const Option = Select.Option

class WrappedRegistrationForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			accessdata: [],
			roledata: []
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				values.sort = Number(values.sort)
				if (getUrlParam('id')) {
					let arr = { id: getUrlParam('id') }
					editaccess(Object.assign(values, arr))
						.then((res) => {
							console.log(res)
							message.success(res.message)
						})
						.catch((err) => {
							message.error(err.message)
							console.log(err)
						})
				} else {
					addaccess(values)
						.then((res) => {
							console.log(res)
							message.success(res.message)
						})
						.catch((err) => {
							console.log(err)
							message.error(err.message)
						})
				}
			}
		})
	}
	getlist() {
		accesslist({ module_id: 0 })
			.then((res) => {
				if (res.status === 1) {
					this.setState({
						accessdata: res.data
					})
					console.log('this.state.accessdata: ', this.state.accessdata)
				}
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getlist()
		if (getUrlParam('id')) {
			this.setState({
				title: '修改'
			})
			accesslist({
				id: getUrlParam('id')
			})
				.then((res) => {
					let { action_name, description, module_id, module_name, sort, status, type, url } = res.data[0]
					this.props.form.setFieldsValue({
						action_name,
						description,
						module_id,
						module_name,
						sort,
						status,
						type,
						url
					})
				})
				.catch((err) => {
					console.log('err: ', err)
				})
		} else {
			this.setState({
				title: '增加'
			})
		}
	}
	renderOptions = () => {
		console.log('this.state.accessdata: ', this.state.accessdata)
		return this.state.accessdata.map((element) => (
			<Option key={element._id} value={element._id}>
				{element.module_name}
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
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<h1>{this.state.title}权限</h1>
				<Form.Item label="模块名称">
					{getFieldDecorator('module_name', {
						rules: [
							{
								required: true,
								message: 'Please input your title!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="节点名称">
					{getFieldDecorator('type', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(
						//1、表示模块 2、表示菜单 3、操作
						<Select onChange={this.handleChange}>
							<Option key={1} value={1}>
								模块
							</Option>
							<Option key={2} value={2}>
								菜单
							</Option>
							<Option key={3} value={3}>
								操作
							</Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label="操作名称">{getFieldDecorator('action_name')(<Input placeholder="请输入" />)}</Form.Item>
				<Form.Item label="操作地址">{getFieldDecorator('url')(<Input placeholder="请输入" />)}</Form.Item>
				<Form.Item label="所属模块">
					{getFieldDecorator('module_id', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(
						<Select onChange={this.handleChange}>
							<Option key={0} value={0}>
								顶级模块
							</Option>
							{this.renderOptions()}
						</Select>
					)}
				</Form.Item>
				<Form.Item label="排序">
					{getFieldDecorator('sort', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="描述">
					{getFieldDecorator('description', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</Form.Item>
			</Form>
		)
	}
}
const manger = Form.create({ name: 'register' })(WrappedRegistrationForm)
export default manger
