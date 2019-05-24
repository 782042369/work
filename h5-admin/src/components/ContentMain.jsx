import React, { Component } from 'react'
//引入路由
import { Switch } from 'react-router-dom'
import PrivateRoute from '../tool/privateRoute'
import router from '../router'
function roterdominit() {
	let dom = []
	router.forEach((res) => {
		dom.push(<PrivateRoute exact path={res.path} key={res.path} component={res.component} />)
	})
	console.log('dom: ', dom)
	return dom
}
class ContentMain extends Component {
	render() {
		return <Switch>{roterdominit()}</Switch>
	}
}

export default ContentMain
