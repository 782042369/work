import React, { Component } from 'react'
//引入路由
import {  Switch } from 'react-router-dom'
import PrivateRoute from '../tool/privateRoute'
import AsyncComponent from './AsyncComponent'
const Access = AsyncComponent(() => import(/* webpackChunkName: "Home" */ '../views/access/index'))
const AddAccess = AsyncComponent(() => import(/* webpackChunkName: "AddAccess" */ '../views/access/AddAccess'))
const Manager = AsyncComponent(() => import(/* webpackChunkName: "Manager" */ '../views/manager/index'))
const AddManager = AsyncComponent(() => import(/* webpackChunkName: "AddManager" */ '../views/manager/AddManager'))
const Role = AsyncComponent(() => import(/* webpackChunkName: "Role" */ '../views/role/index'))
const AddRole = AsyncComponent(() => import(/* webpackChunkName: "AddRole" */ '../views/role/AddRole'))
class ContentMain extends Component {
	render() {
		return (
			<div>
				<Switch>
					<PrivateRoute exact path="/" component={Access} />
					<PrivateRoute exact path="/addaccess" component={AddAccess} />
					<PrivateRoute exact path="/manager" component={Manager} />
					<PrivateRoute exact path="/addmanager" component={AddManager} />
					<PrivateRoute exact path="/role" component={Role} />
					<PrivateRoute exact path="/addrole" component={AddRole} />
				</Switch>
			</div>
		)
	}
}

export default ContentMain
