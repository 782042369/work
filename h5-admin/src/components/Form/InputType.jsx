import React from 'react'
import { Select, Radio, Checkbox, Input, DatePicker } from 'antd'
import { RadioList, OptionList } from './OptionList'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const { TextArea } = Input
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
export const InputType = (item) => {
	let { placeholder, type, field } = item
	let list = item.list || [] //option

	switch (type) {
		case 'input':
			return <Input placeholder={placeholder} />
		case 'select':
			return (
				<Select onChange={item.render} placeholder={placeholder}>
					{OptionList(list)}
				</Select>
			)
		case 'checkbox':
			return <CheckboxGroup options={list} />
		case 'date':
			return <DatePicker showTime for-mat="YY-MM-DD HH:mm:ss" placeholder={placeholder} />
		case 'textarea':
			return <TextArea placeholder={placeholder} />
		case 'radio':
			return <RadioGroup onChange={item.render}>{RadioList(list)}</RadioGroup>
		default:
			return <Input placeholder={placeholder} />
	}
}
