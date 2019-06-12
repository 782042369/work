/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 15:48:17
 * @LastEditTime: 2019-06-11 19:48:56
 */
import * as React from 'react'

import { Checkbox, message, Form, Button } from 'antd'
import { findaccesslist } from '../../api/access'
import { auth, authlist } from '../../api/role'
import getUrlParam from '../../tool/getUrlParam'
import mergefieldtojson from '../../tool/mergefieldtojson'
const CheckboxGroup = Checkbox.Group
interface IState {
	checkedList: any // 选中box
	boxList: any // 后台获取到到数据 分离出来到 checkbox
	indeterminate: any // 全选样式控制
	checkAll: any // 是否全选
	plainOptions: any // 后台获取到到数据
	title: any
}
interface IProps {
	form: any
}
interface FormProps {
	form: any
}
class WrappedNormalLoginForm extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			checkedList: '', // 选中box
			boxList: '', // 后台获取到到数据 分离出来到 checkbox
			indeterminate: '', // 全选样式控制
			checkAll: '', // 是否全选
			plainOptions: '', // 后台获取到到数据
			title: ''
		}
	}
	/**
 * 
 * @param {*} index 下标
 * @param {*} List 选中数组
 */
	onChange = (index: any, List: any) => {
		let { checkAll, checkedList, indeterminate, boxList } = this.state
		let options = boxList[index]
		checkedList[index] = List
		indeterminate[index] = !!checkedList[index].length && checkedList[index].length < options.length
		checkAll[index] = checkedList[index].length === options.length
		this.setState({
			checkedList,
			indeterminate,
			checkAll
		})
	}
	/**
 * 
 * @param {*} index 下标
 * @param {*} e 原始参数
 */
	onCheckAllChange(index: any, e: any) {
		let { checkAll, checkedList, indeterminate, boxList } = this.state
		checkedList[index] = e.target.checked ? boxList[index].map((ele: any) => ele.value) : [] // 过滤全选 只需要 value
		indeterminate[index] = false // 全选状态
		checkAll[index] = e.target.checked // 全选 yes or no
		this.setState({
			checkedList,
			indeterminate,
			checkAll
		})
	}

	getlist() {
		findaccesslist()
			.then((res: any) => {
				if (res.status === 1) {
					this.Checkboxarr(res)
				} else {
					message.error(res)
				}
			})
			.catch((err: any) => {
				console.log('err: ', err)
				message.error(err)
			})
	}
	/**
   * 提交
   */
	handleSubmit = (e: any) => {
		e.preventDefault()
		this.props.form.validateFields((err: any, values: any) => {
			if (!err) {
				let { checkedList } = this.state
				let access_node: any = []
				this.state.plainOptions.forEach((res: any, index: any) => {
					if (checkedList[index].length > 0) {
						access_node.push({
							key: res._id,
							checkedList: checkedList[index]
						})
					}
				})
				auth({
					role_id: getUrlParam('id'),
					access_node: access_node
				})
					.then((res: any) => {
						console.log('res: ', res)
						message.success(res.message)
					})
					.catch((err: any) => {
						console.log('err: ', err)
					})
			}
		})
	}
	/**
   * 
   * @param {*} res 接口获取到数据 生成需要到数组
   */
	componentWillMount() {
		this.getlist()
		authlist({
			role_id: getUrlParam('id')
		})
			.then((res: any) => {
				if (res.data.length > 0) {
					let { checkAll, checkedList, indeterminate, boxList } = this.state
					mergefieldtojson(res.data, 'pid', 'parent_id').forEach((element: any) => {
						this.state.plainOptions.forEach((val: any, index: any) => {
							if (val._id === element.parent_id) {
								let arr: any = []
								element.items.map((res: any) => arr.push(res.access_id))
								checkedList[index] = arr
								checkAll[index] = checkedList[index].length === boxList[index].length
								indeterminate[index] =
									!!checkedList[index].length && checkedList[index].length < boxList[index].length
							}
						})
					})
					this.setState({
						title: '修改',
						checkedList,
						indeterminate,
						checkAll
					})
				} else {
					this.setState({
						title: '增加'
					})
				}
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}
	Checkboxarr(res: any) {
		let boxList: any = []
		res.data.forEach((element: any, index: any) => {
			boxList[index] = []
			element.items.forEach((ele: any) => {
				boxList[index].push({
					label: ele.module_name,
					value: ele._id
				})
			})
		})
		let indeterminate = Array.from({ length: res.data.length }, () => false)
		let checkedList = Array.from({ length: res.data.length }, () => [])
		let checkAll = Array.from({ length: res.data.length }, () => false)
		if (res.status === 1) {
			this.setState({
				plainOptions: res.data,
				checkedList,
				indeterminate,
				checkAll,
				boxList
			})
		}
	}
	Checkboxinit() {
		const { getFieldDecorator } = this.props.form
		return this.state.plainOptions.map((res: any, index: any) => (
			<Form.Item key={res._id}>
				{getFieldDecorator(`${index + res._id}`, {
					valuePropName: 'checked',
					initialValue: []
				})(
					<div className="checkbox">
						<div
							style={{
								borderBottom: '1px solid #E9E9E9',
								borderTop: '1px solid #E9E9E9',
								padding: '10px 0'
							}}
						>
							<Checkbox
								indeterminate={this.state.indeterminate[index]}
								onChange={this.onCheckAllChange.bind(this, index)}
								checked={this.state.checkAll[index]}
							>
								{res.module_name}
							</Checkbox>
						</div>
						<CheckboxGroup
							options={this.state.boxList[index]}
							value={this.state.checkedList[index]}
							onChange={this.onChange.bind(this, index)}
						/>
					</div>
				)}
			</Form.Item>
		))
	}
	public render() {
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<h1>{this.state.title}角色</h1>
				{this.Checkboxinit()}
				<Button type="primary" htmlType="submit" className="login-form-button">
					提交
				</Button>
			</Form>
		)
	}
}
const index = Form.create<FormProps>()(WrappedNormalLoginForm)
export default index
