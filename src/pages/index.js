import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './containers/Home'
import Page404 from './components/Page404'
import Profile from './containers/Profile'
import PostPage from './containers/PostPage'
import Header from '../shared/components/Header'

const AppRoutes = () =>
	<div>
		<Header />	
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/user/:id" component={Profile} />
			<Route path="/posts/:id" component={PostPage} />
			<Route component={Page404}/>
		</Switch>
	</div>


export default AppRoutes