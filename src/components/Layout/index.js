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