import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import AppRoutes from './pages'

render(
	<Router>
		<AppRoutes />
	</Router>,
	document.getElementById('root')
)