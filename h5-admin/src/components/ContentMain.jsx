import React, { Component } from 'react'
//引入路由
import { Route, Switch } from 'react-router-dom'
import access from '../views/access'
import manager from '../views/manager'
import role from '../views/role'
class ContentMain extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={access} />
					<Route exact path="/manager" component={manager} />
					<Route exact path="/role" component={role} />
				</Switch>
			</div>
		)
	}
}

export default ContentMain
