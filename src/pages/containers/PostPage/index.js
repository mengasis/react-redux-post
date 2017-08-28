import React, { Component } from 'react'
import Loading from '../../../shared/components/Loading'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import api from '../../../../lib/originalApi'
import Post from '../../../posts/containers/Post'
import Comment from '../../../comments/components/Comment'

class PostPage extends Component {

	constructor(props){
		super(props)

		this.state = {
			loading: true,
			user: {},
			post: {},
			comments: []
		}
	}

	async componentDidMount() {
		const [ post, comments ] = await Promise.all([
			api.posts.getPost(this.props.match.params.id),
			api.posts.getComments(this.props.match.params.id)
		])

		const user = await api.users.getUser(post.userId)

		this.setState({
			loading: false,
			user,
			post,
			comments
		})
	}

	render() {

		const { loading, user, comments, post } = this.state

		if(loading){
			return <Loading />
		}

		return (
			<section name="post">
				<Post 
					{...post}
					user={user}
					comments={comments}
				/>

				<section name="comments">

					{comments
						.map(comment => (
							<Comment key={comment.id} {...comment} />
						))}

				</section>

				<Link to="/"><h3>{'<- Go Back'}</h3></Link>
			</section>
		)
	}
}

PostPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		})
	})
}

export default PostPage