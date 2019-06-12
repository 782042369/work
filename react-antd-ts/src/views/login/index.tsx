import * as React from 'react'
import './login.scss'
import { Form, Icon, Input, Button, message } from 'antd'
import { Redirect } from 'react-router'
import { dologin } from '../../api/login'
import { Md5 } from 'ts-md5/dist/md5'
import User from '../../store/user'
interface FormProps {
	form: any
}
interface IState {
	loginSuccess: any
	codeimg: string
}
interface IProps {
	form: any
}
class NormalLoginForm extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			loginSuccess: false,
			codeimg: './captchacode?' + new Date().getTime()
		}
	}
	handleSubmit = (e: any) => {
		e.preventDefault()
		this.props.form.validateFields((err: any, values: any) => {
			console.log('values: ', values)
			console.log('err: ', err)
			if (!err) {
				values.password = Md5.hashStr(values.password).toString()
				dologin(values)
					.then((res: any) => {
						if (res.status === 1) {
							message.success(res.message)
							sessionStorage.setItem('role_id', res.data.role_id)
							sessionStorage.setItem('userName', res.data.userName)
							User.userlogin = true
							setTimeout(() => {
								this.setState({
									loginSuccess: true
								})
							}, 1000)
						} else {
							this.svgcode()
							message.error(res.message)
						}
					})
					.catch((err: any) => {
						console.log('err: ', err)
						this.svgcode()
					})
			}
		})
	}
	svgcode = () => {
		this.setState({
			codeimg: './captchacode?' + new Date().getTime()
		})
	}
	componentDidMount() {}
	render() {
		const { getFieldDecorator } = this.props.form
		if (this.state.loginSuccess) {
			return <Redirect to="/access" />
		} else {
			return (
				<div className="login" id="login">
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Form.Item>
							{getFieldDecorator('userName', {
								rules: [ { required: true, message: 'Please input your username!' } ]
							})(
								<Input
									placeholder="请输入"
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								/>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('password', {
								rules: [ { required: true, message: 'Please input your Password!' } ]
							})(
								<Input
									placeholder="请输入"
									prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
								/>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('code', {
								rules: [ { required: true, message: 'Please input your code!' } ]
							})(
								<Input
									placeholder="请输入"
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								/>
							)}
							<img src={this.state.codeimg} alt="" onClick={this.svgcode} />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Log in
							</Button>
						</Form.Item>
					</Form>
				</div>
			)
		}
	}
}
const index = Form.create<FormProps>({ name: 'normal_login' })(NormalLoginForm)
export default index
