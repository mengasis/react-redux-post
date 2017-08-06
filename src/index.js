import http from 'http'
import React, {Component} from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

const requestHandler = (req, res) => {

	const html = renderToString(React.DOM.h1(null, 'hola'))
    
	res.write(html)
	res.end()
}

const server = http.createServer(requestHandler)
server.listen(3000)