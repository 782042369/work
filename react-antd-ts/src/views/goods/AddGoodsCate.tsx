/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 商品
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-06-11 19:33:45
 */
import * as React from 'react'

import { addgoodscate, editgoodscate, goodscatelist } from '../../api/goods'
import getUrlParam from '../../tool/getUrlParam'
import { Form, Input, Button, message, Select, Icon, Upload } from 'antd'
const Option = Select.Option
const { TextArea } = Input
const Dragger = Upload.Dragger
interface IProps {
	form: any
	taps: any
}
interface IState {
	confirmDirty: any
	goodscatetype: any
	editimgsrc: any
	radiovalue: any
	distextarea: any // 可选列表禁用
	title: any
}
interface FormProps {
	form: any
	taps: any
}
class WrappedRegistrationForm extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			confirmDirty: '',
			goodscatetype: [],
			editimgsrc: '',
			radiovalue: '',
			distextarea: '', // 可选列表禁用
			title: ''
		}
	}
	handleSubmit = (e: any) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err: any, values: any) => {
			if (!err) {
				if (getUrlParam('id')) {
					let arr = { id: getUrlParam('id') }
					editgoodscate(Object.assign(values, arr))
						.then((res: any) => {
							console.log(res)
							message.success(res.message)
						})
						.catch((err: any) => {
							message.error(err.message)
							console.log(err)
						})
				} else {
					addgoodscate(values)
						.then((res: any) => {
							if (res.status === 1) {
								message.success(res.message)
							} else {
								message.error(res.message)
							}
						})
						.catch((err: any) => {
							console.log(err)
							message.error(err.message)
						})
				}
			}
		})
	}
	// 获取类型
	goodscatelist(arr: any) {
		goodscatelist(arr)
			.then((res: any) => {
				if (arr.pid === 0) {
					this.setState({
						goodscatetype: res.data
					})
				} else {
					const {
						cate_img,
						description,
						filter_attr,
						keywords,
						link,
						pid,
						sub_title,
						template,
						title,
						sort
					} = res.data[0]
					this.props.form.setFieldsValue({
						description,
						filter_attr,
						keywords,
						link,
						pid: pid === '0' ? Number(pid) : pid,
						sub_title,
						template,
						title,
						sort
					})
					this.setState({
						editimgsrc: cate_img
					})
				}
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}

	renderOptions = () => {
		return this.state.goodscatetype.map((element: any) => (
			<Option key={element._id} value={element._id}>
				{element.title}
			</Option>
		))
	}
	componentDidMount() {
		this.goodscatelist({
			pid: 0
		})
		if (getUrlParam('id')) {
			this.setState({
				title: '修改'
			})
			this.goodscatelist({
				_id: getUrlParam('id')
			})
		} else {
			this.setState({
				title: '增加'
			})
		}
	}
	public render() {
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
		let editimg: any = ''
		let editrequired: any = ''
		if (this.state.editimgsrc !== '') {
			editimg = (
				<Form.Item label="原图">
					<img
						alt=""
						style={{ maxWidth: '10vw', maxHeight: '10vw' }}
						src={`http://39.97.165.4:7001${this.state.editimgsrc}`}
					/>
				</Form.Item>
			)
			editrequired = false
		} else {
			editrequired = true
		}
		const props = {
			name: 'file',
			action: '/admin/uploadimg',
			onChange(info: any) {
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
					})(
						<Select>
							<Option key={0} value={0}>
								顶级模块
							</Option>
							{this.renderOptions()}
						</Select>
					)}
				</Form.Item>
				{editimg}

				<Form.Item label="分类图片">
					{getFieldDecorator('cate_img', {
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
					})(
						<Select>
							<Option key={0} value={0}>
								顶级模块
							</Option>
							{this.renderOptions()}
						</Select>
					)}
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
				<Form.Item label="分类模版">{getFieldDecorator('template')(<Input placeholder="空为默认模版" />)}</Form.Item>
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
const index = Form.create<FormProps>({ name: 'register' })(WrappedRegistrationForm)
export default index
