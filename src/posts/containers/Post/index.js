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
		if(!!this.props.user && !!this.props.comments)
			return this.setState({ loading: false})

		await Promise.all([
			this.props.actions.loadUser(this.props.userId),
			this.props.actions.loadCommentsForPost(this.props.id)
		])

		this.setState({loading: false})
	}
    
	render() {

		const { id, title, body, user, comments } = this.props
		const { loading } = this.state
        
		return(
			<article id={`post-${id}`} className={styles.post}>
				<h2 className={styles.title}>
					<Link to={`/posts/${id}`}>{title}</Link>
				</h2>
				<p className={styles.body}>{body}</p>
                
				{!loading && (
					<div className={styles.meta}>
						
						<Link to={`/user/${user.id}`} className={styles.user}>
							{user.name}
						</Link>
						<span className={styles.comments}>Hay {comments.length} comentarios</span>
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
	user: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string
	}),
	comments: PropTypes.arrayOf(PropTypes.object),
	actions: PropTypes.objectOf(PropTypes.func)
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.users[ownProps.userId], //Se necesita solo el usuario del Post
		comments: state.comments.filter(comment => comment.postId === ownProps.id) //Solo es necesario los comentarios del Post
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)