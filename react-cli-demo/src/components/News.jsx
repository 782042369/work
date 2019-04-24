import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
class News extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [], // list数据
			api: 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1'
		}
	}
	componentDidMount() {
		axios
			.get(this.state.api)
			.then((res) => {
				this.setState({
					list: res.data.result
				})
			})
			.catch((res) => {
				console.log('res: ', res)
			})
	}
	render() {
		console.log('render: ')
		return (
			<div>
				<h1>新闻</h1>
				<ul>
					{this.state.list.map((value, key) => {
						return (
							<li key={key}>
								<Link to={`/Newscontent/${value.aid}`}>{value.title}</Link>
							</li>
						)
					})}
					<li />
				</ul>
			</div>
		)
	}
}

export default News
