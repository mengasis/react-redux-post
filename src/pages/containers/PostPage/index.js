import React, { Component } from 'react'
import Loading from '../../../shared/components/Loading'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Post from '../../../posts/containers/Post'
import Comment from '../../../comments/components/Comment'
import actions from '../../../actions'


class PostPage extends Component {

	constructor(props){
		super(props)

		this.state = {
			loading: true
		}
	}

	async componentDidMount() {

		document.title = 'Post Detail'
		const post = await this.props.actions.loadPost(this.props.match.params.id)
		await this.props.actions.loadCommentsForPost(post.id)
		await this.props.actions.loadUser(post.userId)

		this.setState({ loading: false })
	}

	render() {

		const { user, comments, post } = this.props
		const { loading } = this.state

		if(loading){
			return <Loading />
		}


		return (
			<section name="post">
				<Post 
					{...post.toJS()}
				/>

				<section name="comments">
					<h3>Comments</h3>
					{comments
						.valueSeq()
						.map(comment => (
							<Comment key={comment.get('id')} {...comment.toJS()} />
						))}

				</section>

				<Link to="/"><h3>{'<- Go Back'}</h3></Link>
			</section>
		)
	}
}

PostPage.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		size: PropTypes.number,
		get: PropTypes.func
	}),
	post: PropTypes.shape({
		id: PropTypes.number,
		userId: PropTypes.number,
		title: PropTypes.string,
		body: PropTypes.string,
	}),	
	comments: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		postId: PropTypes.number
	}),
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		})
	}),
	actions: PropTypes.objectOf(PropTypes.func)
}

const mapStateToProps = (state, ownProps) => {

	return {
		post: state
			.get('posts')
			.get('entities')
			.get(Number(ownProps.match.params.id)),
		user: state
			.get('users')
			.get(Number(ownProps.match.params.id)),
		comments: state
			.get('comments')
			
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)