import React, { Component } from 'react'
import app from '../model/Storage'
class Todolist extends Component {
	constructor(props) {
		super(props)
		this.state = {
			val: '', // 输入框数据
			list: [] // list数据
		}
	}
	// input 数据绑定
	handlChangeVal = (e) => {
		this.setState({
			val: e.target.value
		})
	}

	// 增加按钮
	handlGetVal = (e) => {
		const todolist = this.state.list
		todolist.push({
			title: this.state.val,
			checked: false
		})
		this.setState({
			list: todolist, // 绑定list
			val: '' // 清空input
		})
		this.setStorageItem(todolist)
	}
	// 回车增加按钮
	handleAddVal = (e) => {
		if (e.keyCode === 13) {
			this.handlGetVal()
		}
	}
	// 删除按钮
	handlDelteVal(key) {
		const todolist = this.state.list
		todolist.splice(key, 1)
		this.setState({
			list: todolist // 绑定list
		})
		this.setStorageItem(todolist)
	}
	handlChangeValChecked = (key) => {
		const todolist = this.state.list
		todolist[key].checked = !todolist[key].checked
		this.setState({
			list: todolist // 修改选中
		})
		this.setStorageItem(todolist)
	}
	setStorageItem(todolist) {
		app.set('todolist', todolist)
	}
	// 页面加载触发
	componentDidMount() {
		const todolist = app.get('todolist')
		if (todolist) {
			this.setState({
				list: todolist
			})
		}
	}
	render() {
		return (
			<div>
				<h1>ToDoList</h1>
				<input type="text" value={this.state.val} onChange={this.handlChangeVal} onKeyUp={this.handleAddVal} />
				<button onClick={this.handlGetVal}>增加</button>
				<hr />
				<br />
				<h1>代办</h1>
				<hr />
				<ul>
					{this.state.list.map((value, key) => {
						if (!value.checked) {
							return (
								<li key={key}>
									<input
										type="checkbox"
										checked={value.checked}
										onChange={this.handlChangeValChecked.bind(this, key)}
									/>
									{value.title}
									<button onClick={this.handlDelteVal.bind(this, key)}>删除</button>
								</li>
							)
						}
					})}
				</ul>
				<h1>已完成</h1>
				<hr />
				{
					<ul>
						{this.state.list.map((value, key) => {
							if (value.checked) {
								return (
									<li key={key}>
										<input
											type="checkbox"
											checked={value.checked}
											onChange={this.handlChangeValChecked.bind(this, key)}
										/>
										{value.title}
										<button onClick={this.handlDelteVal.bind(this, key)}>删除</button>
									</li>
								)
							}
						})}
					</ul>
				}
			</div>
		)
	}
}

export default Todolist
