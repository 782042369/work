import React, { Component } from 'react'
class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			msg: '头部'
		}
	}
	render() {
		return (
			<div>
				<span>{this.props.title}</span>
				<button onClick={this.props.run}>按钮</button>
				<button onClick={this.props.run}>按钮</button>
			</div>
		)
	}
}

export default Header
