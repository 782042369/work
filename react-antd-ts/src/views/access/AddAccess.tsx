/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:39
 * @LastEditTime: 2019-06-12 18:49:00
 */
import * as React from 'react'

import { addaccess, editaccess, accesslist } from '../../api/access'
import getUrlParam from '../../tool/getUrlParam'
import { message } from 'antd'
import BashForm from '../../components/Form'
interface IState {
	title: string
	h1title: string
	accessdata: string
	module_name: string
	type: any
	action_name: string
	url: string
	module_id: string
	description: string
	list: any
	sort: any
	status: any
}
interface IProps {}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			title: '',
			h1title: '',
			accessdata: '',
			module_name: '',
			type: '',
			action_name: '',
			url: '',
			module_id: '',
			description: '',
			list: [],
			sort: '',
			status: ''
		}
	}
	handleSubmit = (values: any) => {
		values.sort = Number(values.sort)
		if (getUrlParam('id')) {
			let arr = { id: getUrlParam('id') }
			editaccess(Object.assign(values, arr))
				.then((res: any) => {
					console.log(res)
					message.success(res.message)
				})
				.catch((err: any) => {
					message.error(err.message)
					console.log(err)
				})
		} else {
			addaccess(values)
				.then((res: any) => {
					console.log(res)
					message.success(res.message)
				})
				.catch((err: any) => {
					console.log(err)
					message.error(err.message)
				})
		}
	}
	getlist() {
		accesslist({ module_id: 0 })
			.then((res: any) => {
				if (res.status === 1) {
					let list: any = [ { id: 0, name: '顶级模块' } ]
					res.data.forEach((element: any) => {
						list.push({
							id: element._id,
							name: element.module_name
						})
					})
					this.setState({
						list
					})
				}
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getlist()
		if (getUrlParam('id')) {
			this.setState({
				h1title: '修改权限'
			})
			accesslist({
				_id: getUrlParam('id')
			})
				.then((res: any) => {
					console.log(res.data[0].module_id)
					this.setState({
						...res.data[0]
					})
				})
				.catch((err: any) => {
					console.log('err: ', err)
				})
		} else {
			this.setState({
				h1title: '增加权限'
			})
		}
	}
	public render() {
		const formList = [
			{
				type: 'input',
				lable: '模块名称',
				setValue: this.state.module_name,
				placeholder: '请输入',
				field: 'module_name',
				required: true,
				message: 'Please input your module_name!'
			},
			{
				type: 'select',
				lable: '节点名称',
				setValue: this.state.type,
				placeholder: '请输入',
				field: 'type',
				required: true,
				message: 'Please input your type!',
				list: [ { id: 1, name: '模块' }, { id: 2, name: '菜单' }, { id: 3, name: '操作' } ] // 1、模块 2、菜单 3、操作
			},
			{
				type: 'input',
				lable: '节点名称',
				setValue: this.state.action_name,
				placeholder: '请输入',
				field: 'action_name',
				required: false,
				message: 'Please input your action_name!'
			},
			{
				type: 'input',
				lable: '操作地址',
				setValue: this.state.url,
				placeholder: '请输入',
				field: 'url',
				required: false,
				message: 'Please input your url!'
			},
			{
				type: 'select',
				lable: '所属模块',
				setValue: this.state.module_id,
				placeholder: '请输入',
				field: 'module_id',
				required: true,
				list: this.state.list, // 0、顶级模块 其他菜单
				message: 'Please input your module_id!'
			},
			{
				type: 'input',
				lable: '排序',
				setValue: this.state.sort,
				placeholder: '请输入',
				field: 'sort',
				required: true,
				message: 'Please input your sort!'
			},
			{
				type: 'input',
				lable: '描述',
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
export default index
