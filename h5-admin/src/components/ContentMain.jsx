import React, { Component } from 'react'
//引入路由
import { Switch } from 'react-router-dom'
import PrivateRoute from '../tool/privateRoute'
import Access from '../views/Access'
import Manager from '../views/Manager'
import Role from '../views/Role'
class ContentMain extends Component {
	render() {
		return (
			<div>
				<Switch>
					<PrivateRoute exact path="/" component={Access} />
					<PrivateRoute exact path="/manager" component={Manager} />
					<PrivateRoute exact path="/role" component={Role} />
				</Switch>
			</div>
		)
	}
}

export default ContentMain
