/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:39
 * @LastEditTime: 2019-05-08 10:02:25
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
	componentDidMount() {
		if (getUrlParam('id')) {
			this.setState({
				title: '修改'
			})
			accesslist({
				id: getUrlParam('id')
			})
				.then((res) => {
					this.props.form.setFieldsValue({
						password: res.data[0].password,
						email: res.data[0].email,
						userName: res.data[0].userName,
						mobile: res.data[0].mobile,
						role_id: res.data[0].role_id
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
					})(<Input />)}
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
				<Form.Item label="操作名称">{getFieldDecorator('action_name')(<Input />)}</Form.Item>
				<Form.Item label="操作地址">{getFieldDecorator('url')(<Input />)}</Form.Item>
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
				<Form.Item label="排序">
					{getFieldDecorator('sort', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item label="描述">
					{getFieldDecorator('description', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						Register
					</Button>
				</Form.Item>
			</Form>
		)
	}
}
const manger = Form.create({ name: 'register' })(WrappedRegistrationForm)
export default manger
