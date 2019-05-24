/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-24 10:25:10
 */
import React, { Component } from 'react'
import { addnav, editnav, navlist } from '../../api/nav'
import getUrlParam from '../../tool/getUrlParam'
import BashForm from '../../components/Form'
import { message } from 'antd'

class nav extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			h1title: '',
			description: ''
		}
	}

	handleSubmit = (values) => {
		console.log('e: ', values)
		if (getUrlParam('id')) {
			let arr = { id: getUrlParam('id') }
			editnav(Object.assign(values, arr))
				.then((res) => {
					console.log(res)
					message.success(res.message)
				})
				.catch((err) => {
					message.error(err.message)
					console.log(err)
				})
		} else {
			addnav(values)
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
				h1title: '修改角色'
			})
			navlist({
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
				h1title: '增加角色'
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
				type: 'input',
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
export default nav
