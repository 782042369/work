import React, { Component } from 'react'
import './login.scss'
import { Form, Icon, Input, Button } from 'antd'
import { dologin } from '../../api/login'
class NormalLoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			codeimg: 'http://127.0.0.1:7001/captchacode?' + new Date().getTime()
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			console.log('values: ', values)
			if (!err) {
				dologin(values)
					.then((res) => {
						console.log('res: ', res)
					})
					.catch((err) => {
						console.log('err: ', err)
					})
			}
		})
	}
	svgcode = () => {
		this.setState({
			codeimg: 'http://127.0.0.1:7001/captchacode?' + new Date().getTime()
		})
	}
	componentDidMount() {}
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<div className="login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator('userName', {
							rules: [ { required: true, message: 'Please input your username!' } ]
						})(
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Username"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [ { required: true, message: 'Please input your Password!' } ]
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Password"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('code', {
							rules: [ { required: true, message: 'Please input your code!' } ]
						})(
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="code"
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)
export default WrappedNormalLoginForm
