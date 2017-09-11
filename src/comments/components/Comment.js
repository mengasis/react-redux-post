import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './Comment.css'

class Comment extends Component {
	render() {

		const { id, name, email, body } = this.props

		return (
			<article id={`comment-${id}`} className={styles.borderComment}>
				<div>
					<strong>Escrito por:</strong> <Link to={`mailto:${email}`}>{ `${name} (${email})` }</Link>
				</div>
                
				<p className={styles.body}>
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