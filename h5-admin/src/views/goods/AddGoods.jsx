/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 商品
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-15 15:48:42
 */
import React, { Component } from 'react'
import { addgoods, editgoods, goodstypelist } from '../../api/goods'
import getUrlParam from '../../tool/getUrlParam'
import { Form, Input, Button, message } from 'antd'
const { TextArea } = Input

class WrappedRegistrationForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmDirty: false,
			title: ''
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if (getUrlParam('id')) {
					let arr = { id: getUrlParam('id') }
					editgoods(Object.assign(values, arr))
						.then((res) => {
							console.log(res)
							message.success(res.message)
						})
						.catch((err) => {
							message.error(err.message)
							console.log(err)
						})
				} else {
					addgoods(values)
						.then((res) => {
							if (res.status === 1) {
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
			goodstypelist({
				id: getUrlParam('id')
			})
				.then((res) => {
					let { title, description } = res.data[0]
					this.props.form.setFieldsValue({
						title,
						description
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
				<h1>{this.state.title}商品类型</h1>
				<Form.Item label="商品类型">
					{getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: 'Please input your title!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="商品类型描述">
					{getFieldDecorator('description', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<TextArea placeholder="请输入" />)}
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
const goods = Form.create({ name: 'register' })(WrappedRegistrationForm)
export default goods
