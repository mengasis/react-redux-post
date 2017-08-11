import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../Home'
import Page404 from '../../components/Page404'
import Profile from '../Profile'

const AppRoutes = () =>
	<Switch>			
		<Route exact path="/" component={Home} />
		<Route path="/user/:id" component={Profile} />
		<Route component={Page404}/>
	</Switch>


export default AppRoutes