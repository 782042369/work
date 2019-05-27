import React, { Component } from 'react'
import { Spin } from 'antd'

class loading extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return <Spin tip="Loading..." />
	}
}

export default loading
