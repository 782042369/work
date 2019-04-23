import React, { Component } from 'react'
class News extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '张三',
			title: '1242',
			color: 'red'
		}
	}
	render() {
		return (
			<div>
				<h1 title="title" className={this.state.color}>
					新闻
				</h1>
			</div>
		)
	}
}

export default News
