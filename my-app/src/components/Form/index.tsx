/*
 * @Author: 杨宏旋
 * @Date: 2019-05-21 16:13:12
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2019-05-24 16:55:17
 * @Description: 传统
 */
import * as React from 'react'
import { Form, Button, Upload, Icon, message } from 'antd'
import { InputType } from './InputType'
import './index.scss'
// import Darft from '../../components/Darft'
// import moment from 'moment'
import 'moment/locale/zh-cn'
// moment.locale('zh-cn')
const Dragger = Upload.Dragger
const FormItem = Form.Item
//3.定义props
type IProps = Readonly<{
	form: any
	formList: any
	h1title: any
}>
interface MousePointProps {
	form: any
	formList: any
	h1title: any
	formSubmit: any
	render: (
		point: {
			x: number | null
			y: number | null
		}
	) => React.ReactElement<HTMLDivElement>
}

interface MOusePointState {
	x: number | null
}
class BaseForm extends React.Component<MousePointProps, MOusePointState> {
	super(props: any) {}
	commit = (e: any) => {
		e.preventDefault()
		const { getFieldsValue } = this.props.form
		this.props.form.validateFieldsAndScroll((err: any) => {
			if (!err) {
				let date1 = getFieldsValue()
				this.props.formSubmit(date1) //最终输出
			}
		})
	}
	componentWillReceiveProps(nextProps: any) {
		// 组件初始化时不调用，组件接受新的props时调用。
		if (this.props.formList !== nextProps.formList) {
			this.formsetval(nextProps.formList)
		}
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

	initFormList = (): any => {
		const { getFieldDecorator } = this.props.form
		const formList = this.props.formList
		let formItemList: any = []
		formList &&
			formList.length > 0 &&
			formList.forEach((item: any) => {
				let {
					lable, //标题
					field, // 字段key
					required, // 必填
					type,
					setValue
				} = item
				let rulemessages = item.message || '请输入当前输入框内容亲爱的宝贝0.0' // 校验回调信息
				let inputitem: any = ''
				inputitem = InputType(item)
				if (type === 'dart') {
					formItemList.push(
						<FormItem label={lable} key={field}>
							{/* <Darft editorState={formList[0].render} key={formList} /> */}
						</FormItem>
					)
				} else {
					if (type === 'upload') {
						const props = {
							name: 'file',
							action: '/admin/uploadimg',
							multiple: true,
							headers: {
								authorization: 'authorization-text'
							},
							onChange(info: any) {
								const status = info.file.status
								if (status === 'done') {
									message.success(`${info.file.name} file uploaded successfully.`)
								} else if (status === 'error') {
									message.error(`${info.file.name} file upload failed.`)
								}
							}
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
				}
			})
		return formItemList
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
				{this.initFormList()}
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
