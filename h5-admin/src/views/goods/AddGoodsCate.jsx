/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 商品
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-16 11:47:49
 */
import React, { Component } from 'react'
import { addgoodscate, editgoodscate, goodstypelist, goodscatelist } from '../../api/goods'
import getUrlParam from '../../tool/getUrlParam'
import { Form, Input, Button, message, Select, Icon, Upload } from 'antd'
const Option = Select.Option
const { TextArea } = Input
const Dragger = Upload.Dragger
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
			console.log('values: ', values)
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
		const props = {
			name: 'file',
			action: '/admin/uploadimg',
			onChange(info) {
				const status = info.file.status
				if (status !== 'uploading') {
					console.log(info.file, info.fileList)
				}
				if (status === 'done') {
					message.success(`${info.file.name} file uploaded successfully.`)
				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`)
				}
			}
		}
		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<h1>{this.state.title}商品属性</h1>
				<Form.Item label="分类名称">
					{getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: 'Please input your title!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="上级分类">
					{getFieldDecorator('pid', {
						rules: [
							{
								required: true,
								message: 'Please input your title!'
							}
						]
					})(<Select>{this.renderOptions()}</Select>)}
				</Form.Item>
				<Form.Item label="分类图片">
					{getFieldDecorator('cate_img', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<Icon type="inbox" />
							</p>
							<p className="ant-upload-text">Click or drag file to this area to upload</p>
							<p className="ant-upload-hint">
								Support for a single or bulk upload. Strictly prohibit from uploading company data or
								other band files
							</p>
						</Dragger>
					)}
				</Form.Item>
				<Form.Item label="筛选属性">
					{getFieldDecorator('filter_attr', {
						rules: [
							{
								required: true,
								message: 'Please input your title!'
							}
						]
					})(<Select>{this.renderOptions()}</Select>)}
				</Form.Item>
				<Form.Item label="跳转地址">
					{getFieldDecorator('link', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="分类模版">
					{getFieldDecorator('template', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<Input placeholder="空为默认模版" />)}
				</Form.Item>
				<Form.Item label="seo标题">
					{getFieldDecorator('sub_title', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<TextArea placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="seo描述">
					{getFieldDecorator('description', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<TextArea placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="seo关键字">
					{getFieldDecorator('keywords', {
						rules: [
							{
								required: true,
								message: 'Please input your description!'
							}
						]
					})(<TextArea placeholder="请输入" />)}
				</Form.Item>
				<Form.Item label="排序 ">
					{getFieldDecorator('sort', {
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
const goods = Form.create({ name: 'register' })(WrappedRegistrationForm)
export default goods
