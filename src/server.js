import http from 'http'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import AppRoutes from './pages'
import Layout from './pages/components/Layout'
import store from './store'

const requestHandler = (req, res) => {

	const context = {}
	const html = renderToString(
		<Provider store={store}>
			<StaticRouter locale={req.url} context={context}>
				<AppRoutes />
			</StaticRouter>
		</Provider>
	)

	if (context.url) {
		res.writeHead(301, {
			Location: context.url,
		})
		res.end()
	}
    
	res.write(
		renderToStaticMarkup(<Layout title="App" content={html}/>)
	)
	res.end()
}

const server = http.createServer(requestHandler)
server.listen(3000)