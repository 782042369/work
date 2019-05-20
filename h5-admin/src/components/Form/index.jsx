import React from 'react'
import { Select, Form, Radio, Checkbox, Button, Input, DatePicker, Upload, Icon, message } from 'antd'
import OptionList from './OptionList'
import './index.scss'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const Dragger = Upload.Dragger
const FormItem = Form.Item
const { RangePicker } = DatePicker
class BaseForm extends React.Component {
	commit = (e) => {
		e.preventDefault()
		const { getFieldsValue } = this.props.form
		this.props.form.validateFieldsAndScroll((err, values) => {
			console.log('values: ', values)
			if (!err) {
				let date1 = getFieldsValue()
				this.props.formSubmit(date1) //最终输出
			}
		})
	}
	reset = () => {
		this.props.form.resetFields()
	}
	componentWillReceiveProps(nextProps) {
		// 组件初始化时不调用，组件接受新的props时调用。
		if (this.props.formList !== nextProps.formList) {
			this.formsetval(nextProps.formList)
		}
	}
	formsetval(formList) {
		const { setFieldsValue } = this.props.form
		formList.map((res) => {
			let field = res.field
			let arr = {}
			arr[field] = res.setValue
			res.setValue !== '' && setFieldsValue(arr)
		})
	}
	initFormList = () => {
		const { getFieldDecorator } = this.props.form
		const formList = this.props.formList
		let formItemList = []
		if (formList && formList.length > 0) {
			formList.map((item, index) => {
				let {
					lable, //标题
					placeholder,
					field, // 字段key
					width,
					list,
					required, // 必填
					message
				} = item
				list = item.list || [] //option
				message = item.message || '请输入当前输入框内容亲爱的宝贝0.0' // 校验回调信息
				let inputitem = ''
				if (item.type === 'input') {
					inputitem = <Input placeholder={placeholder} />
				} else if (item.type === 'select') {
					inputitem = (
						<Select style={{ width: width }} placeholder={placeholder}>
							{OptionList.OptionList(list)}
						</Select>
					)
				} else if (item.type === 'checkbox') {
					inputitem = <Checkbox>{lable}</Checkbox>
				} else if (item.type === 'date') {
					inputitem = <DatePicker showTime for-mat="YY-MM-DD HH:mm:ss" placeholder={placeholder} />
				} else if (item.type === 'upload') {
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
					if (item.setValue) {
						let editimg = (
							<Form.Item label="原图" key="editimg">
								<img
									alt="这是一张图片"
									style={{ maxWidth: '10vw', maxHeight: '10vw' }}
									src={`http://127.0.0.1:7001${item.setValue}`}
								/>
							</Form.Item>
						)
						formItemList.push(editimg)
						required = false
					} else {
						required = true
					}
					inputitem = (
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<Icon type="inbox" />
							</p>
							<p className="ant-upload-text">点击上传</p>
							<p className="ant-upload-hint">请选择你需要上传的图片</p>
						</Dragger>
					)
				}
				const fromitem = (
					<FormItem label={lable} key={field}>
						{getFieldDecorator(field, {
							rules: [
								{
									required,
									message
								}
							]
						})(inputitem)}
					</FormItem>
				)
				formItemList.push(fromitem)
			})
		}
		return formItemList
	}

	render() {
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
			<Form {...formItemLayout} onSubmit={this.commit}>
				<h1>{this.props.h1title}</h1>
				{this.initFormList()}
				<FormItem {...tailFormItemLayout}>
					<Button htmlType="submit" type="primary">
						提交
					</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Form.create()(BaseForm)
