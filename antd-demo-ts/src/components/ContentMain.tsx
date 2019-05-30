import * as React from 'react'

//引入路由
import { Switch } from 'react-router-dom'
import PrivateRoute from '../tool/privateRoute'
import router from '../router'
import { Route } from 'react-router-dom'

function roterdominit() {
	let dom: any = []
	router.forEach((res: any) => {
		dom.push(<Route exact path={res.path} key={res.path} component={res.component} />)
	})
	return dom
}
interface IProps {}
interface IState {}
class index extends React.Component<IProps, IState> {
	render() {
		return <Switch>{roterdominit()}</Switch>
	}
}

export default index
