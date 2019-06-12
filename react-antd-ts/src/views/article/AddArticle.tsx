/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-30 18:01:54
 */
import * as React from 'react'

import { addarticle, editarticle, articlelist } from '../../api/article'
import getUrlParam from '../../tool/getUrlParam'
import BashForm from '../../components/Form'
import { message } from 'antd'

interface IProps {}
interface IState {
	keywords: any
	article_img: any
	h1title: any
	sort: any
	link: any
	title: any
	status: any
	cate_id: any
	description: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			keywords: '',
			article_img: '',
			h1title: '',
			sort: '',
			link: '',
			title: '',
			status: '',
			cate_id: '',
			description: ''
		}
	}
	handleSubmit = (values: any) => {
		console.log('e: ', values)
		if (getUrlParam('id')) {
			let arr = { id: getUrlParam('id') }
			editarticle(Object.assign(values, arr))
				.then((res: any) => {
					console.log(res)
					message.success(res.message)
				})
				.catch((err: any) => {
					message.error(err.message)
					console.log(err)
				})
		} else {
			addarticle(values)
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
				h1title: '修改文章'
			})
			articlelist({
				_id: getUrlParam('id')
			})
				.then((res: any) => {
					this.setState({
						...res.data[0]
					})
				})
				.catch((err: any) => {
					console.log('err: ', err)
				})
		} else {
			this.setState({
				h1title: '增加文章'
			})
		}
	}

	public render() {
		const formList = [
			{
				type: 'input',
				lable: '文章标题',
				setValue: this.state.title,
				placeholder: '请输入',
				field: 'title',
				required: true,
				message: 'Please input your title!'
			},

			{
				type: 'select',
				lable: '所属分类',
				setValue: this.state.cate_id,
				field: 'cate_id',
				required: true,
				list: [ { id: 1, name: '顶部' }, { id: 2, name: '文章菜单' }, { id: 3, name: '底部' } ],
				message: 'Please input your cate_id!'
			},
			{
				type: 'upload',
				lable: '封面图片',
				setValue: this.state.article_img,
				placeholder: '请输入',
				field: 'article_img',
				required: true,
				message: 'Please input your article_img!'
			},
			{
				type: 'input',
				lable: '跳转地址',
				setValue: this.state.link,
				placeholder: '请输入',
				field: 'link',
				required: true,
				message: 'Please input your link!'
			},
			{
				type: 'input',
				lable: 'Seo关键词',
				setValue: this.state.keywords,
				placeholder: '请输入',
				field: 'keywords',
				required: true,
				message: 'Please input your keywords!'
			},
			{
				type: 'input',
				lable: 'Seo描述',
				setValue: this.state.description,
				placeholder: '请输入',
				field: 'description',
				required: true,
				message: 'Please input your description!'
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
				type: 'radio',
				lable: '状态',
				setValue: this.state.status,
				placeholder: '请输入',
				field: 'status',
				required: true,
				list: [ { id: 1, name: '显示' }, { id: 0, name: '隐藏' } ],
				message: 'Please input your status!'
			},
			{
				type: 'dart',
				lable: '文章内容',
				field: 'content'
			}
		]
		return <BashForm formList={formList} h1title={this.state.h1title} formSubmit={this.handleSubmit} />
	}
}
export default index
