import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Comment extends Component {
	render() {

		const { id, name, email, body } = this.props

		return (
			<article id={`comment-${id}`} >
				<div>
                    Escrito por: <Link to={`mailto:${email}`}>{ `${name} (${email})` }</Link>
				</div>
                
				<p>
					{body}
				</p>
			</article>
		)
	}
}

Comment.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string,
	email: PropTypes.string,
	body: PropTypes.string

}

export default Comment