import React, { Component } from 'react'
class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '张三',
			title: '1242'
		}
	}
	render() {
		return (
			<div>
				<h1 title="title">你好</h1>
				<p>你好{this.state.name}</p>
				<p>你好{this.state.name}</p>
			</div>
		)
	}
}

export default Home
