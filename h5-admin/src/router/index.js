import AsyncComponent from '../components/AsyncComponent' // 异步引入
const Access = AsyncComponent(() => import( /* webpackChunkName: "Access" */ '../views/access/index'))
const AddAccess = AsyncComponent(() => import( /* webpackChunkName: "AddAccess" */ '../views/access/AddAccess'))
const Manager = AsyncComponent(() => import( /* webpackChunkName: "Manager" */ '../views/manager/index'))
const AddManager = AsyncComponent(() => import( /* webpackChunkName: "AddManager" */ '../views/manager/AddManager'))
const Role = AsyncComponent(() => import( /* webpackChunkName: "Role" */ '../views/role/index'))
const AddRole = AsyncComponent(() => import( /* webpackChunkName: "AddRole" */ '../views/role/AddRole'))
const Auth = AsyncComponent(() => import( /* webpackChunkName: "Auth" */ '../views/auth'))
const NoAccess = AsyncComponent(() => import( /* webpackChunkName: "NoAccess" */ '../views/auth/noaccess'))
const Banner = AsyncComponent(() => import( /* webpackChunkName: "Banner" */ '../views/banner'))
const AddBanner = AsyncComponent(() => import( /* webpackChunkName: "AddBanner" */ '../views/banner/AddBanner'))
const GoodsTypeList = AsyncComponent(() =>
	import( /* webpackChunkName: "GoodsTypeList" */ '../views/goods/GoodsTypeList')
)
const AddGoodsType = AsyncComponent(() => import( /* webpackChunkName: "GoodsTypeList" */ '../views/goods/AddGoodsType'))
const GoodsTypeAttribute = AsyncComponent(() =>
	import( /* webpackChunkName: "GoodsTypeAttribute" */ '../views/goods/GoodsTypeAttribute')
)
const AddGoodsTypeAttribute = AsyncComponent(() =>
	import( /* webpackChunkName: "AddGoodsTypeAttribute" */ '../views/goods/AddGoodsTypeAttribute')
)
const GoodsCate = AsyncComponent(() => import( /* webpackChunkName: "GoodsCate" */ '../views/goods/GoodsCate'))
const AddGoodsCate = AsyncComponent(() => import( /* webpackChunkName: "AddGoodsCate" */ '../views/goods/AddGoodsCate'))
const Goods = AsyncComponent(() => import( /* webpackChunkName: "Goods" */ '../views/goods'))
const AddGoods = AsyncComponent(() => import( /* webpackChunkName: "AddGoods" */ '../views/goods/AddGoods'))
const Nav = AsyncComponent(() => import( /* webpackChunkName: "nav" */ '../views/nav'))
const AddNav = AsyncComponent(() => import( /* webpackChunkName: "AddNav" */ '../views/nav/AddNav'))
let router = [{
		path: '/access',
		component: Access
	},
	{
		path: '/addaccess',
		component: AddAccess
	},
	{
		path: '/auth',
		component: Auth
	},
	{
		path: '/manager',
		component: Manager
	},
	{
		path: '/addmanager',
		component: AddManager
	},
	{
		path: '/role',
		component: Role
	},
	{
		path: '/addrole',
		component: AddRole
	},
	{
		path: '/banner',
		component: Banner
	},
	{
		path: '/addbanner',
		component: AddBanner
	},
	{
		path: '/goodstypelist',
		component: GoodsTypeList
	},
	{
		path: '/addgoodstype',
		component: AddGoodsType
	},
	{
		path: '/goodstypeattribute',
		component: GoodsTypeAttribute
	},
	{
		path: '/addgoodstypeattribute',
		component: AddGoodsTypeAttribute
	},
	{
		path: '/addgoodscate',
		component: AddGoodsCate
	},
	{
		path: '/goodscate',
		component: GoodsCate
	},
	{
		path: '/goods',
		component: Goods
	},
	{
		path: '/addgoods',
		component: AddGoods
	},
	{
		path: '/noaccess',
		component: NoAccess
	},
	{
		path: '/addnav',
		component: AddNav
	},
	{
		path: '/nav',
		component: Nav
	}
]
export default router
