import React, { Component } from 'react'
import {
	addgoodscate,
	editgoodscate,
	goodscatelist,
	goodscolorlist,
	goodstypelist,
	goodstypeattributelist
} from '../../api/goods'
import getUrlParam from '../../tool/getUrlParam'
import { message } from 'antd'
import TapFrom from '../../components/Form/TapFrom'
import { object } from 'prop-types'
class addgoods extends Component {
	constructor(props) {
		super(props)
		this.state = {
			plainOptions: [],
			specification: [], // 规格包装
			selecttypeoptions: []
		}
	}
	callback(key) {
		console.log(key)
	}
	goodscolorlist() {
		goodscolorlist().then((res) => {
			let arr = []
			res.data.forEach((element) => {
				arr.push({
					label: element.color_name,
					value: element._id
				})
			})
			this.setState({
				plainOptions: arr
			})
		})
	}
	// 商品分类
	goodscatelist() {
		goodscatelist().then((res) => {
			let arr = []
			res.data.forEach((element) => {
				arr.push({
					name: element.title,
					id: element._id
				})
			})
			this.setState({
				goodscate: arr
			})
		})
	}
	handleSubmit = (values) => {
		console.log('values: ', values);
		if (getUrlParam('id')) {
			let arr = { id: getUrlParam('id') }
			editgoodscate(Object.assign(values, arr))
				.then((res) => {
					message.success(res.message)
				})
				.catch((err) => {
					message.error(err.message)
					console.log(err)
				})
		} else {
			addgoodscate(values)
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
	goodstypelist() {
		goodstypelist().then((res) => {
			let arr = []
			res.data.forEach((element) => {
				arr.push({
					name: element.title,
					id: element._id
				})
			})
			this.setState({
				selecttypeoptions: arr
			})
		})
	}
	handleSelectChange = (id) => {
		// 规格包装
		goodstypeattributelist({ id }).then((res) => {
			let arr = [
				{
					type: 'select',
					lable: '商品类型',
					setValue: this.state.goods_type_id,
					placeholder: '请输入',
					field: 'goods_type_id',
					required: true,
					list: this.state.selecttypeoptions,
					message: 'Please input your goods_type_id!',
					render: (e) => this.handleSelectChange(e)
				}
			]
			let type = [ 'input', 'textarea', 'checkbox' ] // 1 input 2 textarea 3 checkbox
			res.data.forEach((ele) => {
				if (ele.attr_type === '3') {
					let CheckboxGroup = []
					ele.attr_value.split('\n').forEach((element) => {
						CheckboxGroup.push({ label: element, value: element })
					})
					arr.push({
						type: type[ele.attr_type - 1],
						lable: ele.title,
						setValue: '',
						placeholder: '请输入',
						field: ele.title,
						required: false,
						message: `Please input your ${ele.title}!`,
						list: CheckboxGroup
					})
				} else {
					arr.push({
						type: type[ele.attr_type - 1],
						lable: ele.title,
						setValue: '',
						placeholder: '请输入',
						field: ele.title,
						required: false,
						message: `Please input your ${ele.title}!`
					})
				}
			})

			this.setState({
				specification: arr
			})
		})
	}
	editorState = (txt) => {
		console.log('富文本编辑器内容是-->', txt)
	}
	componentDidMount() {
		this.goodscolorlist()
		this.goodscatelist()
		this.goodstypelist()
		if (getUrlParam('id')) {
			this.setState({
				h1title: '修改商品'
			})
		} else {
			this.setState({
				h1title: '增加商品'
			})
		}
	}
	render() {
		const taps = [
			[
				{
					tap: '通用信息',
					key: '1'
				},
				{
					formlist: [
						{
							type: 'input',
							lable: '商品标题',
							setValue: this.state.title,
							placeholder: '请输入',
							field: 'title',
							required: true,
							message: 'Please input your title!'
						},
						{
							type: 'input',
							lable: '附属标题',
							setValue: this.state.sub_title,
							placeholder: '请输入',
							field: 'sub_title',
							required: true,
							message: 'Please input your sub_title!'
						},
						{
							type: 'input',
							lable: '商品版本',
							setValue: this.state.goods_version,
							placeholder: '请输入',
							field: 'goods_version',
							required: true,
							message: 'Please input your goods_version!'
						},
						{
							type: 'select',
							lable: '所属分类',
							setValue: this.state.cate_id,
							placeholder: '请输入',
							field: 'cate_id',
							required: true,
							message: 'Please input your cate_id!'
						},
						{
							type: 'upload',
							lable: '所属分类',
							setValue: this.state.pic,
							placeholder: '请输入',
							field: 'pic',
							required: true,
							message: 'Please input your pic!'
						},
						{
							type: 'input',
							lable: '商品价格',
							setValue: this.state.price,
							placeholder: '请输入',
							field: 'price',
							required: true,
							message: 'Please input your price!'
						},
						{
							type: 'radio',
							lable: '商品状态',
							setValue: this.state.status,
							placeholder: '请输入',
							field: 'status',
							required: true,
							list: [ { id: 1, name: '显示' }, { id: 2, name: '隐藏' } ],
							message: 'Please input your status!'
						},
						{
							type: 'radio',
							lable: '加入推荐',
							setValue: this.state.recommend,
							placeholder: '请输入',
							field: 'recommend',
							required: true,
							list: [
								{ id: 'is_best', name: '精品' },
								{ id: 'is_hot', name: '热销' },
								{ id: 'is_new', name: '新品' }
							],
							message: 'Please input your recommend!'
						}
					]
				}
			],
			[
				{
					tap: '详细描述',
					key: '2'
				},
				{
					formlist: 'dart' // 富文本
				}
			],
			[
				{
					tap: '商品属性',
					key: '3'
				},
				{
					formlist: [
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
				}
			],
			[
				{
					tap: '规格包装',
					key: '4'
				},
				{
					formlist:
						this.state.specification.length !== 0
							? this.state.specification
							: [
									{
										type: 'select',
										lable: '商品类型',
										setValue: this.state.goods_type_id,
										placeholder: '请输入',
										field: 'goods_type_id',
										required: true,
										list: this.state.selecttypeoptions,
										message: 'Please input your goods_type_id!',
										render: (e) => this.handleSelectChange(e)
									}
								]
				}
			],
			[
				{
					tap: '商品相册',
					key: '5'
				},
				{
					formlist: [
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
				}
			]
		]
		return <TapFrom taps={taps} h1title={this.state.h1title} formSubmit={this.handleSubmit} />
	}
}
export default addgoods
