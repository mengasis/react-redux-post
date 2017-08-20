import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../Home'
import Page404 from '../../components/Page404'
import Profile from '../Profile'
import Post from '../../components/PostPage'
import Header from '../../shared/components/Header'

const AppRoutes = () =>
	<div>
		<Header />	
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/user/:id" component={Profile} />
			<Route path="/posts/:id" component={Post} />
			<Route component={Page404}/>
		</Switch>
	</div>


export default AppRoutes