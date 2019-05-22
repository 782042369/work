/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 商品
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-22 10:17:31
 */
import React, { Component } from 'react'
import { addgoodstype, editgoodstype, goodstypelist } from '../../api/goods'
import getUrlParam from '../../tool/getUrlParam'
import { message } from 'antd'
import BashForm from '../../components/Form'
class goodstype extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmDirty: false,
			title: ''
		}
	}

	handleSubmit = (values) => {
		if (getUrlParam('id')) {
			let arr = { id: getUrlParam('id') }
			editgoodstype(Object.assign(values, arr))
				.then((res) => {
					console.log(res)
					message.success(res.message)
				})
				.catch((err) => {
					message.error(err.message)
					console.log(err)
				})
		} else {
			addgoodstype(values)
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
	componentDidMount() {
		if (getUrlParam('id')) {
			this.setState({
				h1title: '修改商品类型'
			})
			goodstypelist({
				_id: getUrlParam('id')
			})
				.then((res) => {
					let { title, description } = res.data[0]
					this.setState({
						title,
						description
					})
				})
				.catch((err) => {
					console.log('err: ', err)
				})
		} else {
			this.setState({
				h1title: '增加商品类型'
			})
		}
	}

	render() {
		// <Form.Item label="商品类型">
		// 			{getFieldDecorator('title', {
		// 				rules: [
		// 					{
		// 						required: true,
		// 						message: 'Please input your title!'
		// 					}
		// 				]
		// 			})(<Input placeholder="请输入" />)}
		// 		</Form.Item>
		// 		<Form.Item label="商品类型描述">
		// 			{getFieldDecorator('description', {
		// 				rules: [
		// 					{
		// 						required: true,
		// 						message: 'Please input your description!'
		// 					}
		// 				]
		// 			})(<TextArea placeholder="请输入" />)}
		// 		</Form.Item>
		const formList = [
			{
				type: 'input',
				lable: '商品类型',
				setValue: this.state.title,
				placeholder: '请输入',
				field: 'title',
				required: true,
				message: 'Please input your title!'
			},
			{
				type: 'textarea',
				lable: '商品类型描述',
				setValue: this.state.description,
				placeholder: '请输入',
				field: 'description',
				required: true,
				message: 'Please input your description!'
			}
		]
		return <BashForm formList={formList} h1title={this.state.h1title} formSubmit={this.handleSubmit} />
	}
}
export default goodstype
