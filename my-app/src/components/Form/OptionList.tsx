import * as React from 'react'
import { Select, Radio } from 'antd'
const Option = Select.Option
export const OptionList = (data: any) => {
	if (!data) {
		return []
	}
	let OptionMap: any = []
	data.forEach((item: any) => {
		OptionMap.push(
			<Option value={item.value || item.id} key={item.value || item.id}>
				{item.name || item.label}
			</Option>
		)
	})
	return OptionMap
}
export const RadioList = (data: any) => {
	if (!data) {
		return []
	}
	let OptionMap: any = []
	data.forEach((item: any) => {
		OptionMap.push(
			<Radio key={item.id} value={item.id}>
				{item.name}
			</Radio>
		)
	})
	return OptionMap
}
