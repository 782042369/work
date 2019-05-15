/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-15 13:38:43
 */
import React, { Component } from 'react'
import { addbanner, editbanner, bannerlist } from '../../api/banner'
import getUrlParam from '../../tool/getUrlParam'
import { Upload, message, Icon, Form, Input, Button, Select } from 'antd'
const Option = Select.Option
const Dragger = Upload.Dragger
class WrappedRegistrationForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmDirty: false,
			title: '',
			editimgsrc: '',
			autoCompleteResult: []
		}
	}
	flatten(arr) {
		while (arr.some((item) => Array.isArray(item))) {
			arr = [].concat(...arr)
		}
		return arr
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if (getUrlParam('id')) {
					let arr = { id: getUrlParam('id') }
					editbanner(Object.assign(values, arr))
						.then((res) => {
							console.log(res)
							message.success(res.message)
						})
						.catch((err) => {
							message.error(err.message)
							console.log(err)
						})
				} else {
					addbanner(values)
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
			console.log(getUrlParam('id'))
			bannerlist({
				id: getUrlParam('id')
			})
				.then((res) => {
					let { title, description, sort, focus_img, type, link } = res.data[0]
					this.props.form.setFieldsValue({
						title,
						description,
						sort,
						focus_img,
						type
					})
					this.setState({
						editimgsrc: link
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
		const props = {
			name: 'file',
			action: '/admin/uploadimg',
			multiple: true,
			headers: {
				authorization: 'authorization-text'
			},
			onChange(info) {
				const status = info.file.status
				if (status === 'done') {
					message.success(`${info.file.name} file uploaded successfully.`)
				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`)
				}
			}
		}
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
		let editimg = ''
		let editrequired = ''
		if (this.state.editimgsrc !== '') {
			editimg = (
				<Form.Item label="原图">
					<img
						alt=""
						style={{ maxWidth: '10vw', maxHeight: '10vw' }}
						src={`http://127.0.0.1:7001${this.state.editimgsrc}`}
					/>
				</Form.Item>
			)
			editrequired = false
		} else {
			editrequired = true
		}
		return (
			<div>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<h1>{this.state.title}轮播图</h1>
					<Form.Item label="轮播图名称">
						{getFieldDecorator('title', {
							rules: [
								{
									required: true,
									message: 'Please input your title!'
								}
							]
						})(<Input  placeholder='请输入' />)}
					</Form.Item>

					<Form.Item label="图片所属">
						{getFieldDecorator('type', {
							rules: [
								{
									required: true,
									message: 'Please input your type!'
								}
							]
						})(
							//1、网站 2、app 3、小程序
							<Select onChange={this.handleChange}>
								<Option key={1} value={1}>
									网站
								</Option>
								<Option key={2} value={2}>
									app
								</Option>
								<Option key={3} value={3}>
									小程序
								</Option>
							</Select>
						)}
					</Form.Item>
					<Form.Item label="点击地址">
						{getFieldDecorator('focus_img', {
							rules: [
								{
									required: true,
									message: 'Please input your focus_img!'
								}
							]
						})(<Input  placeholder='请输入' />)}
					</Form.Item>
					<Form.Item label="排序">
						{getFieldDecorator('sort', {
							rules: [
								{
									required: true,
									message: 'Please input your sort!'
								}
							]
						})(<Input  placeholder='请输入' />)}
					</Form.Item>
					{editimg}
					<Form.Item label="上传图片">
						{getFieldDecorator('banner', {
							rules: [
								{
									required: editrequired,
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
									Support for a single or bulk upload. Strictly prohibit from uploading company data
									or other band files
								</p>
							</Dragger>
						)}
					</Form.Item>
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
const banner = Form.create({ name: 'register' })(WrappedRegistrationForm)

export default banner
