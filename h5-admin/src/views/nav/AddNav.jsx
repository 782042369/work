/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-24 11:25:06
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
			h1title: ''
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
				h1title: '修改导航'
			})
			navlist({
				_id: getUrlParam('id')
			})
				.then((res) => {
					this.setState({
						...res.data[0]
					})
				})
				.catch((err) => {
					console.log('err: ', err)
				})
		} else {
			this.setState({
				h1title: '增加导航'
			})
		}
	}

	render() {
		const formList = [
			{
				type: 'input',
				lable: '导航名称',
				setValue: this.state.title,
				placeholder: '请输入',
				field: 'title',
				required: true,
				message: 'Please input your title!'
			},

			{
				type: 'select',
				lable: '导航位置',
				setValue: this.state.position,
				placeholder: '请输入',
				field: 'position',
				required: true,
				list: [ { id: 1, name: '顶部' }, { id: 2, name: '导航菜单' }, { id: 3, name: '底部' } ],
				message: 'Please input your position!'
			},
			{
				type: 'input',
				lable: '关联商品',
				setValue: this.state.relation,
				placeholder: '请输入',
				field: 'relation',
				required: true,
				message: 'Please input your relation!'
			},
			{
				type: 'input',
				lable: '导航连接地址',
				setValue: this.state.link,
				placeholder: '请输入',
				field: 'link',
				required: true,
				message: 'Please input your link!'
			},
			{
				type: 'select',
				lable: '新窗口打开',
				setValue: this.state.is_opennew,
				placeholder: '请输入',
				field: 'is_opennew',
				required: true,
				list: [ { id: 1, name: '是' }, { id: 2, name: '否' } ],
				message: 'Please input your is_opennew!'
			},
			{
				type: 'radio',
				lable: '导航连接地址',
				setValue: this.state.status,
				placeholder: '请输入',
				field: 'status',
				required: true,
				list: [ { id: 1, name: '显示' }, { id: 0, name: '隐藏' } ],
				message: 'Please input your status!'
			}
		]
		return <BashForm formList={formList} h1title={this.state.h1title} formSubmit={this.handleSubmit} />
	}
}
export default nav
