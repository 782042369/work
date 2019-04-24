import React, { Component } from 'react'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			msg: 'msg更新前' // 输入框数据
		}
		console.log('constructor-构造函数')
	}
	componentWillMount() {
		console.log('componentWillMount-组件挂载之前')
	}
	componentDidMount() {
		// 请求数据 dom操作放入这里
		console.log('componentDidMount-组件挂载完成')
	}
	shouldComponentUpdate(nextProps, nextstate) {
		console.log('nextprops: ', nextProps)
		console.log('nextstate: ', nextstate)
		console.log('shouldComponentUpdate-将要更新数据')
		return true
	}
	componentWillUpdate() {
		console.log('componentWillUpdate-更新数据前')
	}
	componentDidUpdate() {
		console.log('componentDidUpdate-更新数据后')
	}
	componentWillUnmount() {
		console.log('componentWillUnmount-组件销毁前')
	}

	// 更新数据
	handleUpdateMsg = () => {
		this.setState({
			msg: 'msg更新后'
		})
	}
	render() {
		console.log('render-组件渲染')
		return (
			<div>
				<h1 title="title">msg{this.state.msg}</h1>
				<button onClick={this.handleUpdateMsg}>更新数据</button>
			</div>
		)
	}
}

export default Home
