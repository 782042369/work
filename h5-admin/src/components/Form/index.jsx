import React from 'react'
import { Select, Form, Radio, Checkbox, Button, Input, DatePicker } from 'antd'
import OptionList from './OptionList'
import './index.scss'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const FormItem = Form.Item
const { RangePicker } = DatePicker
class BaseForm extends React.Component {
	commit = (e) => {
		e.preventDefault()
		const { getFieldsValue } = this.props.form
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let date1 = getFieldsValue()
				this.props.formSubmit(date1) //最终输出
			}
		})
	}
	reset = () => {
		this.props.form.resetFields()
	}
	componentWillReceiveProps(nextProps) { // 组件初始化时不调用，组件接受新的props时调用。
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
				if (item.type === 'input') {
					const input = (
						<FormItem label={lable} key={field}>
							{getFieldDecorator(field, {
								rules: [
									{
										required,
										message
									}
								]
							})(<Input placeholder={placeholder} />)}
						</FormItem>
					)
					formItemList.push(input)
				} else if (item.type === 'select') {
					const select = (
						<FormItem label={lable} key={field}>
							{getFieldDecorator(field, {
								rules: [
									{
										required,
										message
									}
								]
							})(
								<Select style={{ width: width }} placeholder={placeholder}>
									{OptionList.OptionList(list)}
								</Select>
							)}
						</FormItem>
					)
					formItemList.push(select)
				} else if (item.type === 'checkbox') {
					const checkbox = (
						<FormItem label={lable} key={field}>
							{getFieldDecorator(field, {
								rules: [
									{
										required,
										message
									}
								]
							})(<Checkbox>{lable}</Checkbox>)}
						</FormItem>
					)
					formItemList.push(checkbox)
				} else if (item.type === 'date') {
					const dateComponent = (
						<FormItem label={lable} key={field}>
							{getFieldDecorator(field, {
								rules: [
									{
										required,
										message
									}
								]
							})(<DatePicker showTime for-mat="YY-MM-DD HH:mm:ss" placeholder={placeholder} />)}
						</FormItem>
					)
					formItemList.push(dateComponent)
				}
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
