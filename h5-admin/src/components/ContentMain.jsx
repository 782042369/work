import React, { Component } from 'react'
//引入路由
import { Switch } from 'react-router-dom'
import PrivateRoute from '../tool/privateRoute'
import AsyncComponent from './AsyncComponent'
const Access = AsyncComponent(() => import(/* webpackChunkName: "Home" */ '../views/access/index'))
const AddAccess = AsyncComponent(() => import(/* webpackChunkName: "AddAccess" */ '../views/access/AddAccess'))
const Manager = AsyncComponent(() => import(/* webpackChunkName: "Manager" */ '../views/manager/index'))
const AddManager = AsyncComponent(() => import(/* webpackChunkName: "AddManager" */ '../views/manager/AddManager'))
const Role = AsyncComponent(() => import(/* webpackChunkName: "Role" */ '../views/role/index'))
const AddRole = AsyncComponent(() => import(/* webpackChunkName: "AddRole" */ '../views/role/AddRole'))
const Auth = AsyncComponent(() => import(/* webpackChunkName: "Auth" */ '../views/auth'))
const NoAccess = AsyncComponent(() => import(/* webpackChunkName: "Auth" */ '../views/auth/noaccess'))
const Banner = AsyncComponent(() => import(/* webpackChunkName: "Auth" */ '../views/banner'))
const AddBanner = AsyncComponent(() => import(/* webpackChunkName: "Auth" */ '../views/banner/AddBanner'))

class ContentMain extends Component {
	render() {
		return (
			<div>
				<Switch>
					<PrivateRoute exact path="/access" component={Access} />
					<PrivateRoute exact path="/auth" component={Auth} />
					<PrivateRoute exact path="/addaccess" component={AddAccess} />
					<PrivateRoute exact path="/manager" component={Manager} />
					<PrivateRoute exact path="/addmanager" component={AddManager} />
					<PrivateRoute exact path="/role" component={Role} />
					<PrivateRoute exact path="/addrole" component={AddRole} />
					<PrivateRoute exact path="/noaccess" component={NoAccess} />
					<PrivateRoute exact path="/banner" component={Banner} />
					<PrivateRoute exact path="/addbanner" component={AddBanner} />
				</Switch>
			</div>
		)
	}
}

export default ContentMain
