import * as React from 'react'
//引入路由
import { Switch } from 'react-router-dom'
import PrivateRoute from '../tool/privateRoute'
import router from '../router'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../router/loading'
const Login = Loadable({
	loader: () => import(/* webpackChunkName: "Login" */ '../views/login/index'),
	loading: Loading
})
function roterdominit() {
	let dom: any = []
	router.forEach((res: any) => {
		dom.push(<PrivateRoute exact path={res.path} key={res.path} component={res.component} />)
	})
	return dom
}
interface IProps {}
interface IState {}
class index extends React.Component<IProps, IState> {
	render() {
		console.log(1)
		return (
			<Switch>
				{roterdominit()}
				<Route exact path="/login" component={Login} />
			</Switch>
		)
	}
}

export default index
