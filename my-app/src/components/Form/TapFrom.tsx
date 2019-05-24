/*
 * @Author: 杨宏旋
 * @Date: 2019-05-21 16:13:12
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2019-05-24 18:28:52
 * @Description: 选项卡式表单提交
 */
import * as React from 'react'
import { Form, Button, Upload, Icon, Tabs } from 'antd'
import { InputType } from './InputType'
// import moment from 'moment'
import 'moment/locale/zh-cn'
import './TapFrom.scss'
// import Darft from '../../components/Darft'
// moment.locale('zh-cn')
const Dragger = Upload.Dragger
const FormItem = Form.Item
const TabPane = Tabs.TabPane
type IProps = Readonly<{
	form: any
	h1title: any
	taps: any
	formSubmit: any
}>
interface Props {
	form: any
	h1title: any
	taps: any
	formSubmit: any
	render: (
		point: {
			x: number | null
			y: number | null
		}
	) => React.ReactElement<HTMLDivElement>
}

interface MOusePointState {}
class BaseForm extends React.Component<Props, MOusePointState> {
	commit = (e: any) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err: any, value: any) => {
			if (!err) {
				this.props.formSubmit(value) //最终输出
			}
		})
	}
	reset = () => {
		this.props.form.resetFields()
	}
	componentWillReceiveProps(nextProps: any) {
		// 组件初始化时不调用，组件接受新的props时调用。
		nextProps.taps.forEach((res: any, index: any) => {
			if (this.props.taps[index][1].formlist !== res[1].formlist) {
				this.formsetval(res[1].formlist)
			}
		})
	}
	formsetval(formList: any) {
		const { setFieldsValue } = this.props.form
		formList.forEach((res: any) => {
			let field = res.field
			let arr = {}
			arr[field] = res.setValue
			setTimeout(() => {
				res.setValue && setFieldsValue(arr)
			}, 0)
		})
	}
	initFormList = (formList: any) => {
		const { getFieldDecorator } = this.props.form
		let formItemList: any = []
		if (formList[0].type === 'dart') {
			// formItemList.push(<Darft editorState={formList[0].render} key={formList} />)
		} else {
			formList.forEach((item: any) => {
				let {
					lable, //标题
					field, // 字段key
					required, // 必填
					type,
					render,
					setValue
				} = item
				let rulemessages = item.message || '请输入当前输入框内容亲爱的宝贝0.0' // 校验回调信息
				let inputitem: any = null
				inputitem = InputType(item)
				if (type === 'upload') {
					const props = {
						name: 'file',
						action: '/admin/uploadimg',
						multiple: true,
						headers: {
							authorization: 'authorization-text'
						},
						onChange: render
					}
					if (setValue) {
						let editimg = (
							<Form.Item label="原图" key="editimg">
								<img
									alt="这是一张图片"
									style={{ maxWidth: '10vw', maxHeight: '10vw' }}
									src={`http://127.0.0.1:7001${setValue}`}
								/>
							</Form.Item>
						)
						formItemList.push(editimg)
						required = false
					}
					inputitem = (
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<Icon type="inbox" />
							</p>
							<p className="ant-upload-text">点击上传</p>
							<p className="ant-upload-hint">请选择你需要上传的图片</p>
						</Dragger>
					)
				}
				const fromitem = (
					<FormItem label={lable} key={field}>
						{getFieldDecorator(field, {
							rules: [
								{
									required,
									message: rulemessages
								}
							]
						})(inputitem)}
					</FormItem>
				)
				formItemList.push(fromitem)
			})
		}
		return formItemList
	}
	tabsinit() {
		let Tabshtml: any = []
		let card: any
		this.props.taps.forEach((item: any) => {
			card = (
				<TabPane tab={item[0].tap} key={item[0].key}>
					{this.initFormList(item[1].formlist)}
				</TabPane>
			)
			Tabshtml.push(card)
		})
		return Tabshtml
	}
	render() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		}
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		}
		return (
			<Form {...formItemLayout} onSubmit={this.commit}>
				<h1>{this.props.h1title}</h1>
				<Tabs type="card">{this.tabsinit()}</Tabs>
				<FormItem {...tailFormItemLayout}>
					<Button htmlType="submit" type="primary">
						提交
					</Button>
				</FormItem>
			</Form>
		)
	}
}
export default Form.create<IProps>()(BaseForm)
