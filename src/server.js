import http from 'http'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import AppRoutes from './pages'
import Layout from './pages/components/Layout'

const requestHandler = (req, res) => {

	const context = {}
	const html = renderToString(
		<StaticRouter locale={req.url} context={context}>
			<AppRoutes />
		</StaticRouter>
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