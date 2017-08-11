import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import api from '../../api/originalApi'


class Post extends Component {
	constructor(props){
		super(props)

		this.state = {
			loading: true,
			user: props.user || null,
			comments: [],
		}
	}

	async componentDidMount() {

		const [
			user = '',
			comments,
		] = await Promise.all([
			!this.state.user ? api.users.getUser(this.props.userId) : Promise.resolve(null),
			api.posts.getComments(this.props.id)
		])
        
		this.setState({
			loading: false,
			user,
			comments,
		})
	}
    
	render() {

		const {id, title, body, userId } = this.props
		const { user, comments, loading } = this.state
        
		return(
			<article id={`post-${id}`}>
				<h2>{title}</h2>
				<p>{body}</p>
                
				{!loading && (
					<div>
						
						<Link to={`/user/${userId}`}>
							{user.name}
						</Link>
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