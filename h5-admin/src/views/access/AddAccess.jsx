/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:17
 * @LastEditTime: 2019-05-06 18:28:23
 */
import React, { Component } from 'react'
import { addaccess } from '../../api/access'
import { Form, Input, Button } from 'antd'
class WrappedRegistrationForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmDirty: false,
			autoCompleteResult: []
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				addaccess(values)
					.then((res) => {
						console.log(res)
					})
					.catch((err) => {
						console.log(err)
					})
			}
		})
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
						Register
					</Button>
				</Form.Item>
			</Form>
		)
	}
}
const access = Form.create({ name: 'register' })(WrappedRegistrationForm)
export default access
