import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './Post.css'
import actions from '../../../actions'

class Post extends Component {
	constructor(props){
		super(props)

		this.state = {
			loading: true
		}
	}

	async componentDidMount() {

		// Si vienen los datos (si es que fueron pasados por props) se detendra el fetch
		if(this.props.user && !!this.props.comments.size > 0)
			return this.setState({ loading: false})

		await Promise.all([
			this.props.actions.loadUser(this.props.userId),
			this.props.actions.loadCommentsForPost(this.props.post.id)
		])

		this.setState({loading: false})
	}
    
	render() {

		const { user, post, comments } = this.props
		const { loading } = this.state
		
		return(
			<article id={`post-${post.get('id')}`} className={styles.post}>
				<h2 className={styles.title}>
					<Link to={`/posts/${post.get('id')}`}>{post.get('title')}</Link>
				</h2>
				<p className={styles.body}>{post.get('body')}</p>
                
				{!loading && (
					<div className={styles.meta}>
						
						<Link to={`/user/${user.get('id')}`} className={styles.user}>
							{user.get('name')}
						</Link>
						<span className={styles.comments}>Hay {comments.size} comentarios</span>
					</div>
				)}
			</article>
		)
	}
}

Post.propTypes= {
	//Props pasados anteriormente

	post: PropTypes.shape({
		id: PropTypes.number,
		userId: PropTypes.number,
		title: PropTypes.string,
		body: PropTypes.string,
	}),
	//Props del Store
	user: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		size: PropTypes.number,
		get: PropTypes.func
	}),
	comments: PropTypes.shape({
		size: PropTypes.number,
		get: PropTypes.func,
		map: PropTypes.func
	}),
	actions: PropTypes.objectOf(PropTypes.func)
}

const mapStateToProps = (state) => {

	let post = state
		.get('posts')
		.get('entities')
		.get(state.get('currentPost'))

	return {
		post: post,
		user: state
			.get('users')
			.get(post.get('userId')),
		comments: state
			.get('comments')
			.filter(comment => comment.get('postId') === post.get('id')),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)