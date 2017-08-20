import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Layout extends Component {

	constructor(props){
		super(props)
	}

	render() {

		const {title, content } = this.props
		
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<title>{title}</title>
					<meta 
						name="viewport"
						content="width=device.width, initial-scale=1.0, minimum-scale=1.0"
					/>
					<link 
						rel="stylesheet" 
						href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css" />
					<link 
						rel="stylesheet" 
						href="http://localhost:3001/styles.css" />
				</head>
				<body>
					<div
						id="root"
						dangerouslySetInnerHTML={{
							__html: content,
						}}
					/>
					<script src="http://localhost:3001/app.js" />
				</body>
			</html>
		)
	}
}

Layout.propTypes = {
	title: PropTypes.string,
	content: PropTypes.string
}

export default Layout