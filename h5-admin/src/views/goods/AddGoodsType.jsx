/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 商品
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-21 15:05:10
 */
import React, { Component } from 'react'
import { addgoods, editgoods, goodstypelist } from '../../api/goods'
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
			editgoods(Object.assign(values, arr))
				.then((res) => {
					console.log(res)
					message.success(res.message)
				})
				.catch((err) => {
					message.error(err.message)
					console.log(err)
				})
		} else {
			addgoods(values)
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
		const formList = [
			{
				type: 'input',
				lable: '角色名称',
				setValue: this.state.title,
				placeholder: '请输入',
				field: 'title',
				required: true,
				message: 'Please input your title!'
			},
			{
				type: 'textarea',
				lable: '角色描述',
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
