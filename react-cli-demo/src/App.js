import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './assets/css/App.css'
import Home from './components/Home'
import News from './components/News'
import Todolist from './components/Todolist'
import Newscontent from './components/Newscontent'
import Homecontent from './components/Homecontent'

function App() {
	return (
		<div className="App">
			<Router>
				<ul>
					{/* <li>
						<Link to="/"> 首页 </Link>
					</li> */}
					{/* <li>
						<Link to="/News/"> 新闻 </Link>
					</li> */}
				</ul>
				<Route path="/" exact component={Home} />
				<Route path="/Homecontent/:id" exact component={Homecontent} />
				<Route path="/News/" component={News} />
				<Route path="/Newscontent/:aid" component={Newscontent} />
				<Route path="/Todolist/" component={Todolist} />
			</Router>
		</div>
	)
}

export default App
