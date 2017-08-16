import React, { Component } from 'react'
import Loading from '../../shared/components/Loading'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import api from '../../api/originalApi'
import Post from '../../containers/Post'

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

		const { loading, user, comments } = this.state

		if(loading){
			return <Loading />
		}

		return (
			<section name="post">
				<Post 
					{...this.state.post}
					user={user}
					comments={comments}
				/>
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