import React from 'react'
import { Select, Form, Radio, Checkbox, Button, Input, DatePicker, Upload, Icon, message } from 'antd'
import OptionList from './OptionList'
import RadioList from './RadioList'
import './index.scss'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const Dragger = Upload.Dragger
const FormItem = Form.Item
const { RangePicker } = DatePicker
const { TextArea } = Input
const RadioGroup = Radio.Group
export default {
	inputtype: (item) => {
		let {
			lable, //标题
			placeholder,
			width,
			type,
			list
		} = item
		list = item.list || [] //option
		switch (type) {
			case 'input':
				return <Input placeholder={placeholder} />
			case 'select':
				return (
					<Select style={{ width: width }} onChange={item.render} placeholder={placeholder}>
						{OptionList.OptionList(list)}
					</Select>
				)
			case 'checkbox':
				return <Checkbox>{lable}</Checkbox>
			case 'date':
				return <DatePicker showTime for-mat="YY-MM-DD HH:mm:ss" placeholder={placeholder} />
			case 'textarea':
				return <TextArea placeholder={placeholder} />
			case 'radio':
				return <RadioGroup onChange={item.render}>{RadioList.RadioList(list)}</RadioGroup>
			default:
				return <Input placeholder={placeholder} />
		}
	}
}
