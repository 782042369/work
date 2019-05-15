/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 商品
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-15 18:21:08
 */
import React, { Component } from 'react'
import { addgoodscate, editgoodscate, goodstypelist, goodscatelist } from '../../api/goods'
import getUrlParam from '../../tool/getUrlParam'
import { Form, Input, Button, message, Select, Radio } from 'antd'
const Option = Select.Option
const RadioGroup = Radio.Group
const { TextArea } = Input
class WrappedRegistrationForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmDirty: false,
			goodstype: [],
			radiovalue: null,
			distextarea: true // 可选列表禁用
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if (getUrlParam('type') === '1') {
					let arr = { id: getUrlParam('id') }
					editgoodscate(Object.assign(values, arr))
						.then((res) => {
							console.log(res)
							message.success(res.message)
						})
						.catch((err) => {
							message.error(err.message)
							console.log(err)
						})
				} else {
					addgoodscate(values)
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
	// 获取类型
	goodstypelist() {
		goodstypelist()
			.then((res) => {
				console.log('res: ', res)
				this.setState({
					goodstype: res.data
				})
				if (getUrlParam('type') !== '1') {
					this.props.form.setFieldsValue({
						cate_id: getUrlParam('id')
					})
				}
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}
	goodscatelist() {
		goodscatelist({
			_id: getUrlParam('id')
		})
			.then((res) => {
				console.log('res.data[0].attr_type: ', res.data[0].attr_type)
				this.props.form.setFieldsValue({
					cate_id: res.data[0].cate_id,
					title: res.data[0].title,
					attr_type: Number(res.data[0].attr_type)
				})
				if (Number(res.data[0].attr_type) === 3) {
					this.props.form.setFieldsValue({
						attr_value: res.data[0].attr_value
					})
					this.setState({
						distextarea: false
					})
				}
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}

	renderOptions = () => {
		return this.state.goodstype.map((element) => (
			<Option key={element._id} value={element._id}>
				{element.title}
			</Option>
		))
	}
	componentDidMount() {
		this.goodstypelist()
		if (getUrlParam('type') === '1') {
			this.setState({
				title: '修改'
			})
			this.goodscatelist()
		} else {
			this.setState({
				title: '增加'
			})
		}
	}
	radiochange = (e) => {
		// 单选框
		this.setState({
			distextarea: e.target.value !== 3 ? true : false
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
				<h1>{this.state.title}商品属性</h1>
				<Form.Item label="属性名称">
					{getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: 'Please input your title!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="所属类型">
					{getFieldDecorator('cate_id', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Select>{this.renderOptions()}</Select>)}
				</Form.Item>
				<Form.Item label="录入方式">
					{getFieldDecorator('attr_type', {
						rules: [
							{
								required: true,
								message: 'Please input your title!'
							}
						]
					})(
						<RadioGroup name="radiogroup" onChange={this.radiochange} value={this.state.radiovalue}>
							<Radio value={1}>单行录入</Radio>
							<Radio value={2}>多行录入</Radio>
							<Radio value={3}>从下面选择录入</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				<Form.Item label="可选值列表">
					{getFieldDecorator('attr_value', {
						rules: [
							{
								required: !this.state.distextarea,
								message: 'Please input your description!'
							}
						]
					})(<TextArea placeholder="请输入" disabled={this.state.distextarea} />)}
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
