/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 商品
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-30 18:05:30
 */
import * as React from 'react'

import { addgoodstype, editgoodstype, goodstypelist } from '../../api/goods'
import getUrlParam from '../../tool/getUrlParam'
import { message } from 'antd'
import BashForm from '../../components/Form'
interface IProps {}
interface IState {
	title: string
	h1title: string
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
		if (getUrlParam('id')) {
			let arr = { id: getUrlParam('id') }
			editgoodstype(Object.assign(values, arr))
				.then((res: any) => {
					console.log(res)
					message.success(res.message)
				})
				.catch((err: any) => {
					message.error(err.message)
					console.log(err)
				})
		} else {
			addgoodstype(values)
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
				h1title: '修改商品类型'
			})
			goodstypelist({
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
				h1title: '增加商品类型'
			})
		}
	}

	public render() {
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
export default index
