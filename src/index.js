import http from 'http'
import React from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import AppRoutes from './containers/AppRoutes'

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
    
	res.write(html)
	res.end()
}

const server = http.createServer(requestHandler)
server.listen(3000)