/*
 * @Author: 杨宏旋
 * @Date: 2019-05-21 16:13:12
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2019-06-12 18:57:07
 * @Description: 传统
 */
import React from 'react'
import { Form, Button, Upload, Icon, message, Select } from 'antd'
import { InputType } from './InputType'
import './index.scss'
import Darft from '../../components/Darft'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { OptionList } from './OptionList'

moment.locale('zh-cn')
const Dragger = Upload.Dragger
const FormItem = Form.Item
interface IState {}
interface IProps {
	form: any
	formSubmit: any
	formList: any
	h1title: any
}
interface FormProps {
	form: any
	formList: any
	h1title: any
	formSubmit: any
}

class index extends React.Component<IProps, IState> {
	commit = (e: any) => {
		e.preventDefault()
		const { getFieldsValue } = this.props.form
		this.props.form.validateFieldsAndScroll((err: any, values: any) => {
			if (!err) {
				let date1 = getFieldsValue()
				this.props.formSubmit(date1) // 最终输出
			}
		})
	}
	reset = () => {
		this.props.form.resetFields()
	}
	componentWillReceiveProps(nextProps: any) {
		// 组件初始化时不调用，组件接受新的props时调用。
		if (this.props.formList !== nextProps.formList) {
			this.formsetval(nextProps.formList)
		}
	}
	formsetval(formList: any) {
		const { setFieldsValue } = this.props.form
		formList.forEach((res: any) => {
			if (res.setValue !== '' && res.type !== 'dart') {
				let field = res.field
				let arr: any = {}
				arr[field] = res.setValue
				setTimeout(() => {
					setFieldsValue(arr)
				}, 0)
			}
		})
	}

	initFormList = () => {
		const { getFieldDecorator } = this.props.form
		const formList = this.props.formList
		let formItemList: any = []
		formList &&
			formList.length > 0 &&
			formList.forEach((item: any, index: any) => {
				let {
					lable, // 标题
					field, // 字段key
					required, // 必填
					type,
					setValue,
					placeholder
				} = item
				let rulemessages = item.message || '请输入当前输入框内容亲爱的宝贝0.0' // 校验回调信息
				let imgpath = item.imgpath || '' // 图片路径
				let inputitem: any = ''
				let list = item.list || [] // option
				inputitem = InputType(item)
				if (type === 'dart') {
					formItemList.push(
						<FormItem label={lable} key={field}>
							<Darft editorState={formList[0].render} val={formList[0].setValue} key={formList} />
						</FormItem>
					)
				} else if (type === 'imgselect') {
					formItemList.push(
						<div key={field} data-flex="main:center cross:center">
							<img src={imgpath} alt="" style={{ maxWidth: '10vw', maxHeight: '10vw' }} />
							<FormItem label={lable} key={field} style={{ margin: '0', flex: '1' }}>
								{getFieldDecorator(field, {
									rules: [
										{
											required,
											message: rulemessages
										}
									]
								})(<Select placeholder={placeholder}>{OptionList(list)}</Select>)}
							</FormItem>
							{item.render()}
						</div>
					)
				} else {
					if (type === 'upload') {
						const props = {
							name: 'file',
							action: '/admin/uploadimg',
							multiple: true,
							headers: {
								authorization: 'authorization-text'
							},
							onChange(info: any) {
								const status = info.file.status
								if (status === 'done') {
									message.success(`${info.file.name} file uploaded successfully.`)
								} else if (status === 'error') {
									message.error(`${info.file.name} file upload failed.`)
								}
							}
						}
						if (setValue) {
							let editimg = (
								<Form.Item label="原图" key="editimg">
									<img
										alt="这是一张图片"
										style={{ maxWidth: '10vw', maxHeight: '10vw' }}
										src={`./${setValue}`}
									/>
								</Form.Item>
							)
							formItemList.push(editimg)
							required = false
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
										message: rulemessages
									}
								]
							})(inputitem)}
						</FormItem>
					)
					formItemList.push(fromitem)
				}
			})
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

export default Form.create<FormProps>()(index)
