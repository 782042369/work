import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../assets/css/home.css'
class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			api: 'http://a.itying.com/',
			list: []
		}
	}
	getData = () => {
		axios
			.get(this.state.api + 'api/productlist')
			.then((res) => {
				this.setState({
					list: res.data.result
				})
				console.log('res.data.result: ', res.data.result)
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
				<div>
					{this.state.list.map((value, key) => {
						return (
							<div>
								<h4>{value.title}</h4>
								<ul key={key} className="box" data-flex="warp:warp cross:justify">
									{value.list.map((list, keyid) => {
										return (
											<li key={keyid} className="list">
												<img src={`${this.state.api}${list.img_url}`} />
												<p>
													<Link to={`/Homecontent/${list.cate_id}`}>lin{list.title}</Link>
												</p>
												<p>¥{list.price}</p>
											</li>
										)
									})}
								</ul>
							</div>
						)
					})}
					<li />
				</div>
			</div>
		)
	}
}

export default Home
