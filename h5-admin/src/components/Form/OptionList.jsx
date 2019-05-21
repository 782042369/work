import React from 'react'
import { Select, Radio } from 'antd'
const Option = Select.Option
export const OptionList = (data) => {
	if (!data) {
		return []
	}
	let OptionMap = []
	data.forEach((item, index) => {
		OptionMap.push(
			<Option value={item.id} key={item.id}>
				{item.name}
			</Option>
		)
	})
	return OptionMap
}
export const RadioList = (data) => {
	if (!data) {
		return []
	}
	let OptionMap = []
	data.forEach((item, index) => {
		OptionMap.push(<Radio key={item.id}>{item.name}</Radio>)
	})
	return OptionMap
}
