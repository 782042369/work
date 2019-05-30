import React, { Component } from 'react'
import {
	addgoods,
	editgoods,
	goodscatelist,
	goodscolorlist,
	goodstypelist,
	goodslist,
	goodstypeattributelist
} from '../../api/goods'
import getUrlParam from '../../tool/getUrlParam'
import { message } from 'antd'
import TapFrom from '../../components/Form/TapFrom'
class index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			colorOptions: [],
			specification: [], // 规格包装
			selecttypeoptions: [],
			goods_desc: '' //商品描述
		}
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
				colorOptions: arr
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
		let selecttypeoptionsarr = [] // 商品属性 包裹成数组传递
		for (let i in values) {
			if (i.includes('selecttypeoptions-')) {
				selecttypeoptionsarr.push({
					key: i.split('selecttypeoptions-')[1],
					value: values[i]
				})
				delete values[i]
			}
		}
		values.selecttypeoptions = selecttypeoptionsarr
		values.goods_desc = this.state.goods_desc
		if (getUrlParam('id')) {
			let arr = { _id: getUrlParam('id') }
			editgoods(Object.assign(values, arr))
				.then((res) => {
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
			// 规格包装dom
			this.selecttypeoptionsdom(res.data)
		})
	}
	selecttypeoptionsdom(res) {
		let arr = []
		let type = [ 'input', 'textarea', 'radio' ] // 1 input 2 textarea 3 checkbox
		res.forEach((ele, index) => {
			arr.push({
				type: type[ele.attr_type - 1],
				lable: ele.title,
				setValue: this.state['selecttypeoptions-' + ele._id],
				placeholder: '请输入',
				field: 'selecttypeoptions-' + ele._id,
				required: false,
				message: `Please input your ${ele.title}!`
			})
			if (ele.attr_type === '3') {
				let radioGroup = []
				ele.attr_value.split('\n').forEach((element) => {
					console.log('element: ', element)
					radioGroup.push({ id: element, name: element })
				})
				arr[index].list = radioGroup
				console.log('radioGroup: ', radioGroup)
			}
		})
		arr.unshift({
			type: 'select',
			lable: '商品类型',
			setValue: this.state.goods_type_id,
			placeholder: '请输入',
			field: 'goods_type_id',
			required: true,
			list: this.state.selecttypeoptions,
			message: 'Please input your goods_type_id!',
			render: (e) => this.handleSelectChange(e)
		})
		this.setState({
			specification: arr
		})
	}
	editorState = (txt) => {
		this.setState({
			goods_desc: txt
		})
	}
	componentDidMount() {
		this.goodscolorlist()
		this.goodscatelist()
		this.goodstypelist()
		if (getUrlParam('id')) {
			this.setState({
				h1title: '修改商品'
			})
			goodslist({
				_id: getUrlParam('id')
			})
				.then((res) => {
					const { goods_color, goods_type_id } = res.data.goods
					this.handleSelectChange(goods_type_id)
					// photoList selecttypeoptions
					let selecttypeoptionsarr = {}
					res.data.selecttypeoptions.forEach((res) => {
						if (res.attribute_value !== '') {
							let key = 'selecttypeoptions-' + res.attribute_id
							selecttypeoptionsarr[key] = res.attribute_value
						}
					})
					const obj = {}
					let arr = [
						'title',
						'sub_title',
						'cate_id',
						'goods_version',
						'market_price',
						'shop_price',
						'goods_img',
						'status',
						'relation_goods',
						'goods_gift',
						'goods_attrs',
						'recommend',
						'goods_fitting'
					]

					arr.forEach((v, i) => {
						obj[v] = res.data.goods[v]
					})
					console.log('...selecttypeoptionsarr: ', { ...selecttypeoptionsarr })
					this.setState({
						...obj,
						...selecttypeoptionsarr,
						goods_color: goods_color.split(','),
						goods_type_id
					})
				})
				.catch((err) => {
					console.log('err: ', err)
				})
		} else {
			this.setState({
				h1title: '增加商品'
			})
		}
	}
	handlephotoChange = (info) => {
		console.log('info: ', info)
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
							list: this.state.goodscate,
							message: 'Please input your cate_id!'
						},
						{
							type: 'upload',
							lable: '商品图片',
							setValue: this.state.goods_img,
							placeholder: '请输入',
							field: 'goods_img',
							required: true,
							message: 'Please input your goods_img!'
						},
						{
							type: 'input',
							lable: '商品价格',
							setValue: this.state.shop_price,
							placeholder: '请输入',
							field: 'shop_price',
							required: true,
							message: 'Please input your shop_price!'
						},
						{
							type: 'input',
							lable: '商品原价',
							setValue: this.state.market_price,
							placeholder: '请输入',
							field: 'market_price',
							required: true,
							message: 'Please input your market_price!'
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
								// 0 精品 1  热销 2 新品
								{ id: '0', name: '精品' },
								{ id: '1', name: '热销' },
								{ id: '2', name: '新品' }
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
					formlist: [
						{
							type: 'dart', // 富文本
							render: (e) => this.editorState(e)
						}
					]
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
							type: 'checkbox',
							lable: '商品颜色',
							setValue: this.state.goods_color,
							field: 'goods_color',
							required: true,
							list: this.state.colorOptions,
							message: 'Please input your goods_color!'
						},
						{
							type: 'textarea',
							lable: '关联商品',
							setValue: this.state.relation_goods,
							placeholder: '填写关联商品的id 多个以逗号隔开 格式：23,24,39',
							field: 'relation_goods',
							required: false,
							message: 'Please input your relation_goods!'
						},
						{
							type: 'textarea',
							lable: '关联赠品',
							setValue: this.state.goods_gift,
							placeholder: '可为空 格式：23-2,39-5 说明：例如23-2 中的23表示商品id,2表示商品数量',
							field: 'goods_gift',
							required: false,
							message: 'Please input your goods_gift!'
						},
						{
							type: 'textarea',
							lable: '关联配件',
							setValue: this.state.goods_fitting,
							placeholder: '可为空 格式：23-2,39-5 说明：例如23-2 中的23表示商品id,2表示商品数量',
							field: 'goods_fitting',
							required: false,
							message: 'Please input your goods_fitting!'
						},
						{
							type: 'textarea',
							lable: '更多属性',
							setValue: this.state.goods_attrs,
							placeholder: '格式:  颜色:红色,白色,黄色 | 尺寸:41,42,43',
							field: 'goods_attrs',
							required: false,
							message: 'Please input your goods_attrs!'
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
							type: 'upload',
							lable: '商品相册',
							setValue: this.state.photoList,
							placeholder: '请输入',
							field: 'photoList',
							noupload: 1,
							required: true,
							render: (e) => this.handlephotoChange(e),
							message: 'Please input your photoList!'
						}
					]
				}
			]
		]
		return <TapFrom taps={taps} h1title={this.state.h1title} formSubmit={this.handleSubmit} />
	}
}
export default index
