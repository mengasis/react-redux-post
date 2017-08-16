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
			comments: props.comments || null,
		}
	}

	async componentDidMount() {

		// Si vienen los datos (si es que fueron pasados por props) se detendra el fetch
		if(!!this.state.user && !!this.state.comments){
			return this.setState({ loading: false})
		}

		const [
			user = '',
			comments,
		] = await Promise.all([
			!this.state.user ? api.users.getUser(this.props.userId) : Promise.resolve(null),
			!this.state.comments ? api.posts.getComments(this.props.id) : Promise.resolve(null)
		])
		
		// En caso de que la api no traiga datos, tomara los que ya vienen en el state
		this.setState({
			loading: false,
			'user': user || this.state.user,
			comments: comments || this.state.comments,
		})
	}
    
	render() {

		const {id, title, body, userId } = this.props
		const { user, comments, loading } = this.state
        
		return(
			<article id={`post-${id}`}>
				<Link to={`/posts/${id}`}><h2>{title}</h2></Link>
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
	user: PropTypes.object,
	comments: PropTypes.object
}

export default Post