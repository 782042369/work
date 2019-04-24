import React, { Component } from 'react'
import axios from 'axios'
class Newscontent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			content: '', // list数据
			api: 'http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid='
		}
	}
	componentDidMount() {
		axios
			.get(this.state.api + this.props.match.params.aid)
			.then((res) => {
				this.setState({
					content: res.data.result[0].content
				})
			})
			.catch((res) => {
				console.log('res: ', res)
			})
	}
	createMarkup = () => {
		return { __html: this.state.content }
	}
	render() {
		return <div dangerouslySetInnerHTML={this.createMarkup()} />
	}
}

export default Newscontent
