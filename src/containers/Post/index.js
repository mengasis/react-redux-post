import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../../api/originalApi'


class Post extends Component {
	constructor(props){
		super(props)

		this.state = {
			loading: true,
			user: {},
			comments: [],
		}
	}

	async componentDidMount() {

		const [
			user = '',
			comments,
		] = await Promise.all([
			api.users.getSingle(this.props.userId),
			api.posts.getComments(this.props.id)
		])
        
		this.setState({
			loading: false,
			user,
			comments,
		})
	}
    
	render() {

		const {id, title, body } = this.props
		const { user, comments, loading } = this.state
        
		return(
			<article id={`post-${id}`}>
				<h2>{title}</h2>
				<p>{body}</p>
                
				{!loading && (
					<div>
						<a href={`//${user.website}`} target="_black" rel="nofollow">
							{user.name} 
						</a>
						<span> - Hay {comments.length} comentarios</span>
					</div>
				)}
			</article>
		)
	}
}

Post.propTypes= {
	id: PropTypes.number,
	userId: PropTypes.number,
	title: PropTypes.string,
	body: PropTypes.string,
}

export default Post