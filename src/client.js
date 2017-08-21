import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import AppRoutes from './pages'
import store from './store'

render(

	<Provider store={store}>	
		<Router>
			<AppRoutes />
		</Router>
	</Provider>,
	document.getElementById('root')
)