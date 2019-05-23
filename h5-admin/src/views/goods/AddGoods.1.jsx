import React, { Component } from 'react'
import {
	addgoods,
	editgoods,
	goodscatelist,
	goodscolorlist,
	goodstypelist,
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
					value: element.color_value
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
		if (getUrlParam('id')) {
			let arr = { id: getUrlParam('id') }
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
			let arr = []
			let type = [ 'input', 'textarea', 'checkbox' ] // 1 input 2 textarea 3 checkbox
			res.data.forEach((ele, index) => {
				arr.push({
					type: type[ele.attr_type - 1],
					lable: ele.title,
					setValue: this.state._id,
					placeholder: '请输入',
					field: 'selecttypeoptions-' + ele._id,
					required: false,
					message: `Please input your ${ele.title}!`
				})
				if (ele.attr_type === '3') {
					let CheckboxGroup = []
					ele.attr_value.split('\n').forEach((element) => {
						CheckboxGroup.push({ label: element, value: element })
					})
					arr[index].list = CheckboxGroup
				}
			})
			arr.unshift({
				type: 'select',
				lable: '商品类型',
				setValue: this.state.goods_type_id,
				placeholder: '请输入',
				field: 'goods_type_id',
				required: false,
				list: this.state.selecttypeoptions,
				message: 'Please input your goods_type_id!',
				render: (e) => this.handleSelectChange(e)
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
							required: false,
							message: 'Please input your title!'
						},
						{
							type: 'input',
							lable: '附属标题',
							setValue: this.state.sub_title,
							placeholder: '请输入',
							field: 'sub_title',
							required: false,
							message: 'Please input your sub_title!'
						},
						{
							type: 'input',
							lable: '商品版本',
							setValue: this.state.goods_version,
							placeholder: '请输入',
							field: 'goods_version',
							required: false,
							message: 'Please input your goods_version!'
						},
						{
							type: 'select',
							lable: '所属分类',
							setValue: this.state.cate_id,
							placeholder: '请输入',
							field: 'cate_id',
							required: false,
							list: this.state.goodscate,
							message: 'Please input your cate_id!'
						},
						{
							type: 'upload',
							lable: '商品图片',
							setValue: this.state.pic,
							placeholder: '请输入',
							field: 'pic',
							required: false,
							message: 'Please input your pic!'
						},
						{
							type: 'input',
							lable: '商品价格',
							setValue: this.state.price,
							placeholder: '请输入',
							field: 'price',
							required: false,
							message: 'Please input your price!'
						},
						{
							type: 'input',
							lable: '商品原价',
							setValue: this.state.old_price,
							placeholder: '请输入',
							field: 'old_price',
							required: false,
							message: 'Please input your old_price!'
						},
						{
							type: 'radio',
							lable: '商品状态',
							setValue: this.state.status,
							placeholder: '请输入',
							field: 'status',
							required: false,
							list: [ { id: 1, name: '显示' }, { id: 2, name: '隐藏' } ],
							message: 'Please input your status!'
						},
						{
							type: 'radio',
							lable: '加入推荐',
							setValue: this.state.recommend,
							placeholder: '请输入',
							field: 'recommend',
							required: false,
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
							type: 'checkbox',
							lable: '商品颜色',
							setValue: this.state.goods_color,
							field: 'goods_color',
							required: false,
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
							setValue: this.state.goods_attr,
							placeholder: '格式:  颜色:红色,白色,黄色 | 尺寸:41,42,43',
							field: 'goods_attr',
							required: false,
							message: 'Please input your goods_attr!'
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
										required: false,
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
							required: false,
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
