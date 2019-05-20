import React from 'react';
import { Select, Form, Radio, Checkbox, Button, Input, DatePicker, Upload, Icon, message } from 'antd';
import OptionList from './OptionList';
import './index.scss';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class BaseForm extends React.Component {
	commit = (e) => {
		e.preventDefault();
		const { getFieldsValue } = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			console.log('values: ', values);
			if (!err) {
				let date1 = getFieldsValue();
				this.props.formSubmit(date1); //最终输出
			}
		});
	}
	reset = () => {
		this.props.form.resetFields();
	}
	componentWillReceiveProps(nextProps) {
		// 组件初始化时不调用，组件接受新的props时调用。
		if (this.props.formList !== nextProps.formList) {
			this.formsetval(nextProps.formList);
		}
	}
	formsetval(formList) {
		const { setFieldsValue } = this.props.form;
		formList.map((res) => {
			let field = res.field;
			let arr = {};
			arr[field] = res.setValue;
			res.setValue !== '' && setFieldsValue(arr);
		});
	}
	inputtype = (item) => {
		let {
			lable, //标题
			placeholder,
			width,
			type,
			list
		} = item;
		list = item.list || []; //option
		let inputitem = '';
		switch (type) {
		case 'input':
			inputitem = <Input placeholder={placeholder} />;
			break;
		case 'select':
			inputitem = (
				<Select style={{ width: width }} placeholder={placeholder}>
					{OptionList.OptionList(list)}
				</Select>
			);
			break;
		case 'checkbox':
			inputitem = <Checkbox>{lable}</Checkbox>;
			break;
		case 'date':
			inputitem = <DatePicker showTime for-mat="YY-MM-DD HH:mm:ss" placeholder={placeholder} />;
			break;
		case 'textarea':
			inputitem = <TextArea placeholder={placeholder} />;
			break;
		default:
			inputitem = <Input placeholder={placeholder} />;
		}
		return inputitem;
	}
	initFormList = () => {
		const { getFieldDecorator } = this.props.form;
		const formList = this.props.formList;
		let formItemList = [];
		formList &&
			formList.length > 0 &&
			formList.forEach((item, index) => {
				let {
					lable, //标题
					field, // 字段key
					required, // 必填
					type,
					setValue
				} = item;
				let rulemessages = item.message || '请输入当前输入框内容亲爱的宝贝0.0'; // 校验回调信息
				let inputitem = '';
				inputitem = this.inputtype(item);
				if (type === 'upload') {
					const props = {
						name: 'file',
						action: '/admin/uploadimg',
						multiple: true,
						headers: {
							authorization: 'authorization-text'
						},
						onChange(info) {
							const status = info.file.status;
							if (status === 'done') {
								message.success(`${info.file.name} file uploaded successfully.`);
							} else if (status === 'error') {
								message.error(`${info.file.name} file upload failed.`);
							}
						}
					};
					if (setValue) {
						let editimg = (
							<Form.Item label="原图" key="editimg">
								<img
									alt="这是一张图片"
									style={{ maxWidth: '10vw', maxHeight: '10vw' }}
									src={`http://127.0.0.1:7001${setValue}`}
								/>
							</Form.Item>
						);
						formItemList.push(editimg);
						required = false;
					} else {
						required = true;
					}
					inputitem = (
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<Icon type="inbox" />
							</p>
							<p className="ant-upload-text">点击上传</p>
							<p className="ant-upload-hint">请选择你需要上传的图片</p>
						</Dragger>
					);
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
				);
				formItemList.push(fromitem);
			});
		return formItemList;
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
		};
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
		};
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
		);
	}
}

export default Form.create()(BaseForm);
