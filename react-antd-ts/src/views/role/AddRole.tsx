/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 导航
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-28 16:54:58
 */
import * as React from 'react'

import { addrole, editrole, rolelist } from '../../api/role'
import getUrlParam from '../../tool/getUrlParam'
import BashForm from '../../components/Form'
import { message } from 'antd'
interface IProps {}
interface IState {
	h1title: string
	title: any
	description: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			title: '',
			h1title: '',
			description: ''
		}
	}

	handleSubmit = (values: any) => {
		console.log('e: ', values)
		if (getUrlParam('id')) {
			let arr = { id: getUrlParam('id') }
			editrole(Object.assign(values, arr))
				.then((res: any) => {
					console.log(res)
					message.success(res.message)
				})
				.catch((err: any) => {
					message.error(err.message)
					console.log(err)
				})
		} else {
			addrole(values)
				.then((res: any) => {
					if (res.status === 1) {
						message.success(res.message)
					} else {
						message.error(res.message)
					}
				})
				.catch((err: any) => {
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
			rolelist({
				_id: getUrlParam('id')
			})
				.then((res: any) => {
					let { title, description } = res.data[0]
					this.setState({
						title,
						description
					})
				})
				.catch((err: any) => {
					console.log('err: ', err)
				})
		} else {
			this.setState({
				h1title: '增加导航'
			})
		}
	}

	public render() {
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
				type: 'input',
				lable: '导航描述',
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
