import * as React from 'react'
import './login.scss'
import { Form, Icon, Input, Button } from 'antd'
import { Redirect } from 'react-router'
import { dologin } from '../../api/login'
import md5 from 'js-md5'
import { message } from 'antd'
interface State {
	loginSuccess: any
	codeimg: any
}
interface Props {
	form: any
}
type IProps = Readonly<{
	form: any
	formList: any
	h1title: any
	formSubmit: any
}>
class NormalLoginForm extends React.Component<Props, State> {
	handleSubmit = (e: any) => {
		e.preventDefault()
		this.props.form.validateFields((err: any, values: any) => {
			if (!err) {
				values.password = md5(values.password)
				dologin(values)
					.then((res: any) => {
						if (res.status === 1) {
							message.success(res.message)
							sessionStorage.setItem('role_id', res.data.role_id)
							sessionStorage.setItem('userName', res.data.userName)
							this.setState({
								loginSuccess: true
							})
						} else {
							this.svgcode()
							message.error(res.message)
						}
					})
					.catch((err: any) => {
						this.svgcode()
					})
			}
		})
	}
	svgcode = () => {
		this.setState({
			codeimg: 'captchacode?' + new Date().getTime()
		})
	}
	componentDidMount() {
		this.svgcode()
	}
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

const WrappedNormalLoginForm = Form.create<IProps>()(NormalLoginForm)
export default WrappedNormalLoginForm
