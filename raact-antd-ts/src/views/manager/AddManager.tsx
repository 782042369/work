/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理员
 * @Date: 2019-05-05 15:48:39
 * @LastEditTime: 2019-05-30 18:21:23
 */
import * as React from 'react'

import { addmanager, editmanager, managerlist } from '../../api/manager'
import { rolelist } from '../../api/role'
import getUrlParam from '../../tool/getUrlParam'
import { Form, Input, Button, message, Select } from 'antd'
import { Md5 } from 'ts-md5/dist/md5'
const Option = Select.Option
interface IState {
	title: any
	roledata: any
}
interface IProps {
	form: any
}
interface FormProps {
	form: any
}

class WrappedRegistrationForm extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			title: '',
			roledata: []
		}
	}
	handleSubmit = (e: any) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err: any, values: any) => {
			if (!err) {
				values.password = Md5.hashStr(values.password).toString()
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
		return this.state.roledata.map((element: any) => (
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
const index = Form.create<FormProps>({ name: 'register' })(WrappedRegistrationForm)
export default index
