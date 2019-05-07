/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-07 13:31:10
 */
import React, { Component } from 'react'
import { addrole, editrole, rolelist } from '../../api/role'
import getUrlParam from '../../tool/getUrlParam'
import { Form, Input, Button, message } from 'antd'
class WrappedRegistrationForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmDirty: false,
			title: '',
			autoCompleteResult: []
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if (getUrlParam('id')) {
					let arr = { id: getUrlParam('id') }
					editrole(Object.assign(values, arr))
						.then((res) => {
							console.log(res)
							message.success(res.message)
						})
						.catch((err) => {
							message.error(err.message)
							console.log(err)
						})
				} else {
					addrole(values)
						.then((res) => {
							console.log(res)
							if (res.status == 1) {
								message.success(res.message)
							} else {
								message.error(res.message)
							}
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
			rolelist({
				id: getUrlParam('id')
			})
				.then((res) => {
					this.props.form.setFieldsValue({
						title: res[0].title,
						description: res[0].description
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
				<h1>{this.state.title}角色</h1>
				<Form.Item label="角色名称">
					{getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: 'Please input your title!'
							}
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item label="角色描述">
					{getFieldDecorator('description', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input type="textarea" />)}
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
const role = Form.create({ name: 'register' })(WrappedRegistrationForm)
export default role
