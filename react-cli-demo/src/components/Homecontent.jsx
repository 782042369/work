import React, { Component } from 'react'
import axios from 'axios'
class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			api: 'http://a.itying.com/'
		}
	}
	getData = () => {
		axios
			.get(this.state.api + 'api/productcontent?id=' + this.props.match.params.id)
			.then((res) => {
				console.log('res: ', res.data.result)
				this.setState({
					list: res.data.result
				})
			})
			.catch((res) => {
				console.log('res: ', res)
			})
	}
	componentDidMount() {
		this.getData()
	}
	render() {
		return (
			<div>
				<h1>商品详情页</h1>
			</div>
		)
	}
}

export default Home
