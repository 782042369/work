import React, { Component } from 'react'
import { editsetting, getsetting } from '../../api/setting'
import { message } from 'antd'
import BashForm from '../../components/Form'
class index extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	handleSubmit = (values) => {
		let arr = { _id: this.state._id }
		editsetting(Object.assign(values, arr))
			.then((res) => {
				console.log(res)
				message.success(res.message)
			})
			.catch((err) => {
				message.error(err.message)
				console.log(err)
			})
	}
	componentDidMount() {
		getsetting()
			.then((res) => {
				console.log(res)
				this.setState({
					...res.data[0]
				})
			})
			.catch((err) => {
				message.error(err.message)
				console.log(err)
			})
	}
	render() {
		const formList = [
			{
				type: 'input',
				lable: '网站标题',
				setValue: this.state.site_title,
				placeholder: '请输入',
				field: 'site_title',
				required: true,
				message: 'Please input your site_title!'
			},
			{
				type: 'upload',
				lable: '网站logo',
				setValue: this.state.site_logo,
				placeholder: '请输入',
				field: 'site_logo',
				required: true,
				message: 'Please input your site_logo!'
			},
			{
				type: 'input',
				lable: '网站关键词',
				setValue: this.state.site_keywords,
				placeholder: '请输入',
				field: 'site_keywords',
				required: true,
				message: 'Please input your site_keywords!'
			},
			{
				type: 'textarea',
				lable: '网站描述',
				setValue: this.state.site_description,
				placeholder: '请输入',
				field: 'site_description',
				required: true,
				message: 'Please input your site_description!'
			},
			// {
			// 	type: 'upload',
			// 	lable: '商品默认图片',
			// 	setValue: this.state.no_picture,
			// 	placeholder: '请输入',
			// 	field: 'no_picture',
			// 	required: true,
			// 	message: 'Please input your no_picture!'
			// },
			{
				type: 'input',
				lable: '备案信息',
				setValue: this.state.site_icp,
				placeholder: '请输入',
				field: 'site_icp',
				required: true,
				message: 'Please input your site_icp!'
			},
			{
				type: 'input',
				lable: '搜索关键词',
				setValue: this.state.search_keywords,
				placeholder: '请输入',
				field: 'search_keywords',
				required: true,
				message: 'Please input your search_keywords!'
			},
			{
				type: 'input',
				lable: '统计代码',
				setValue: this.state.tongji_code,
				placeholder: '请输入',
				field: 'tongji_code',
				required: true,
				message: 'Please input your tongji_code!'
			}
		]
		return <BashForm formList={formList} h1title={this.state.h1title} formSubmit={this.handleSubmit} />
	}
}

export default index
