/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理员
 * @Date: 2019-05-05 15:48:39
 * @LastEditTime: 2019-05-24 17:48:39
 */
import * as React from 'react'
import { addmanager, editmanager, managerlist } from '../../api/manager'
import { rolelist } from '../../api/role'
import getUrlParam from '../../tool/getUrlParam'
import { Form, Input, Button, message, Select } from 'antd'
import * as md5 from 'js-md5'
const Option = Select.Option

class WrappedRegistrationForm extends React.Component {
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
				values.password = md5(values.password)
				if (getUrlParam('id')) {
					let arr = { id: getUrlParam('id') }
					editmanager(Object.assign(values, arr))
						.then((res: any) => {
							console.log(res)
							message.success(res.message)
						})
						.catch((err: any) => {
							message.error(err.message)
							console.log(err)
						})
				} else {
					addmanager(values)
						.then((res: any) => {
							console.log(res)
							message.success(res.message)
						})
						.catch((err: any) => {
							console.log(err)
							message.error(err.message)
						})
				}
			}
		})
	}
	getlist() {
		rolelist()
			.then((res: any) => {
				this.setState({
					roledata: res.data
				})
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getlist()
		if (getUrlParam('id')) {
			this.setState({
				title: '修改'
			})
			managerlist({
				id: getUrlParam('id')
			})
				.then((res: any) => {
					let { password, email, userName, mobile, role_id } = res.data[0]
					this.props.form.setFieldsValue({
						password,
						email,
						userName,
						mobile,
						role_id
					})
				})
				.catch((err: any) => {
					console.log('err: ', err)
				})
		} else {
			this.setState({
				title: '增加'
			})
		}
	}
	renderOptions = () => {
		return this.state.roledata.map((element) => (
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
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<h1>{this.state.title}管理员</h1>
				<Form.Item label="管理员名称">
					{getFieldDecorator('userName', {
						rules: [
							{
								required: true,
								message: 'Please input your title!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="管理员密码">
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input placeholder="请输入" type="password" />)}
				</Form.Item>
				<Form.Item label="管理员手机号">
					{getFieldDecorator('mobile', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="管理员邮箱">
					{getFieldDecorator('email', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="管理员角色">
					{getFieldDecorator('role_id', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Select>{this.renderOptions()}</Select>)}
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
