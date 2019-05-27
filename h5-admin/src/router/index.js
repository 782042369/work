import Loadable from 'react-loadable'
import Loading from './loading'
const Access = Loadable({
	loader: () => import( /* webpackChunkName: "Access" */ '../views/access/index'),
	loading: Loading,
});
const AddAccess = Loadable({
	loader: () => import( /* webpackChunkName: "AddAccess" */ '../views/access/AddAccess'),
	loading: Loading
})
const Manager = Loadable({
	loader: () => import( /* webpackChunkName: "Manager" */ '../views/manager/index'),
	loading: Loading
})
const AddManager = Loadable({
	loader: () => import( /* webpackChunkName: "AddManager" */ '../views/manager/AddManager'),
	loading: Loading
})
const Role = Loadable({
	loader: () => import( /* webpackChunkName: "Role" */ '../views/role/index'),
	loading: Loading
})
const AddRole = Loadable({
	loader: () => import( /* webpackChunkName: "AddRole" */ '../views/role/AddRole'),
	loading: Loading
})
const Auth = Loadable({
	loader: () => import( /* webpackChunkName: "Auth" */ '../views/auth'),
	loading: Loading
})
const NoAccess = Loadable({
	loader: () => import( /* webpackChunkName: "NoAccess" */ '../views/auth/noaccess'),
	loading: Loading
})
const Banner = Loadable({
	loader: () => import( /* webpackChunkName: "Banner" */ '../views/banner'),
	loading: Loading
})
const AddBanner = Loadable({
	loader: () => import( /* webpackChunkName: "AddBanner" */ '../views/banner/AddBanner'),
	loading: Loading
})
const GoodsTypeList = Loadable({
	loader: () => import( /* webpackChunkName: "GoodsTypeList" */ '../views/goods/GoodsTypeList'),
	loading: Loading
})
const AddGoodsType = Loadable({
	loader: () => import( /* webpackChunkName: "GoodsTypeList" */ '../views/goods/AddGoodsType'),
	loading: Loading
})
const GoodsTypeAttribute = Loadable({
	loader: () => import( /* webpackChunkName: "GoodsTypeAttribute" */ '../views/goods/GoodsTypeAttribute'),
	loading: Loading
})
const AddGoodsTypeAttribute = Loadable({
	loader: () => import( /* webpackChunkName: "AddGoodsTypeAttribute" */ '../views/goods/AddGoodsTypeAttribute'),
	loading: Loading
})
const GoodsCate = Loadable({
	loader: () => import( /* webpackChunkName: "GoodsCate" */ '../views/goods/GoodsCate'),
	loading: Loading
})
const AddGoodsCate = Loadable({
	loader: () => import( /* webpackChunkName: "AddGoodsCate" */ '../views/goods/AddGoodsCate'),
	loading: Loading
})
const Goods = Loadable({
	loader: () => import( /* webpackChunkName: "Goods" */ '../views/goods'),
	loading: Loading
})
const AddGoods = Loadable({
	loader: () => import( /* webpackChunkName: "AddGoods" */ '../views/goods/AddGoods'),
	loading: Loading
})
const Nav = Loadable({
	loader: () => import( /* webpackChunkName: "nav" */ '../views/nav'),
	loading: Loading
})
const AddNav = Loadable({
	loader: () => import( /* webpackChunkName: "AddNav" */ '../views/nav/AddNav'),
	loading: Loading
})
const Home = Loadable({
	loader: () => import( /* webpackChunkName: "Home" */ '../views/home'),
	loading: Loading
})
const Article = Loadable({
	loader: () => import( /* webpackChunkName: "Article" */ '../views/article'),
	loading: Loading
})
const AddArticle = Loadable({
	loader: () => import( /* webpackChunkName: "AddArticle" */ '../views/article/AddArticle'),
	loading: Loading
})
const GoodsPhotoList = Loadable({
	loader: () => import( /* webpackChunkName: "GoodsPhotoList" */ '../views/goods/GoodsPhotoList'),
	loading: Loading
})

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
	},
	{
		path: '/',
		component: Home
	},
	{
		path: '/article',
		component: Article
	},
	{
		path: '/addarticle',
		component: AddArticle
	},
	{
		path: '/goodsphotolist',
		component: GoodsPhotoList
	},
	
]
export default router
