import React, { Component } from 'react'
//引入路由
import { Switch } from 'react-router-dom'
import PrivateRoute from '../tool/privateRoute'
import AsyncComponent from './AsyncComponent'
const Access = AsyncComponent(() => import(/* webpackChunkName: "Access" */ '../views/access/index'))
const AddAccess = AsyncComponent(() => import(/* webpackChunkName: "AddAccess" */ '../views/access/AddAccess'))
const Manager = AsyncComponent(() => import(/* webpackChunkName: "Manager" */ '../views/manager/index'))
const AddManager = AsyncComponent(() => import(/* webpackChunkName: "AddManager" */ '../views/manager/AddManager'))
const Role = AsyncComponent(() => import(/* webpackChunkName: "Role" */ '../views/role/index'))
const AddRole = AsyncComponent(() => import(/* webpackChunkName: "AddRole" */ '../views/role/AddRole'))
const Auth = AsyncComponent(() => import(/* webpackChunkName: "Auth" */ '../views/auth'))
const NoAccess = AsyncComponent(() => import(/* webpackChunkName: "NoAccess" */ '../views/auth/noaccess'))
const Banner = AsyncComponent(() => import(/* webpackChunkName: "Banner" */ '../views/banner'))
const AddBanner = AsyncComponent(() => import(/* webpackChunkName: "AddBanner" */ '../views/banner/AddBanner'))
const GoodsTypeList = AsyncComponent(() =>
	import(/* webpackChunkName: "GoodsTypeList" */ '../views/goods/GoodsTypeList')
)
const AddGoodsType = AsyncComponent(() => import(/* webpackChunkName: "GoodsTypeList" */ '../views/goods/AddGoodsType'))
const GoodsTypeAttribute = AsyncComponent(() =>
	import(/* webpackChunkName: "GoodsTypeAttribute" */ '../views/goods/GoodsTypeAttribute')
)
const AddGoodsTypeAttribute = AsyncComponent(() =>
	import(/* webpackChunkName: "AddGoodsTypeAttribute" */ '../views/goods/AddGoodsTypeAttribute')
)
const GoodsCate = AsyncComponent(() => import(/* webpackChunkName: "GoodsCate" */ '../views/goods/GoodsCate'))
const AddGoodsCate = AsyncComponent(() => import(/* webpackChunkName: "AddGoodsCate" */ '../views/goods/AddGoodsCate'))
const Goods = AsyncComponent(() => import(/* webpackChunkName: "Goods" */ '../views/goods'))
const AddGoods = AsyncComponent(() => import(/* webpackChunkName: "AddGoods" */ '../views/goods/AddGoods'))
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
					<PrivateRoute exact path="/goodstypelist" component={GoodsTypeList} />
					<PrivateRoute exact path="/addgoodstype" component={AddGoodsType} />
					<PrivateRoute exact path="/goodstypeattribute" component={GoodsTypeAttribute} />
					<PrivateRoute exact path="/addgoodstypeattribute" component={AddGoodsTypeAttribute} />
					<PrivateRoute exact path="/addgoodscate" component={AddGoodsCate} />
					<PrivateRoute exact path="/goodscate" component={GoodsCate} />
					<PrivateRoute exact path="/goods" component={Goods} />
					<PrivateRoute exact path="/addgoods" component={AddGoods} />
					
				</Switch>
			</div>
		)
	}
}

export default ContentMain
