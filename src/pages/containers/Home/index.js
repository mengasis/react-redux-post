import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import api from '../../../../lib/originalApi'
import Post from '../../../shared/components/Post'
import Loading from '../../../shared/components/Loading'

import actions from '../../../actions'

import styles from './Home.css'

class Home extends Component {

	constructor(props){
		super(props)
		
		this.state = { loading: true }

		this.handleScroll = this.handleScroll.bind(this)
	}

	async componentDidMount() {
		const posts = await api.posts.getList(this.props.page)

		this.props.dispatch(actions.addPost(posts))

		this.setState({ loading: false })

		window.addEventListener('scroll', this.handleScroll)
	}

	// Se dejaran de escuchar los eventos que estan pendientes antes de que se desmonte el componente.
	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll(){
		// Si ya se estan cargando posts, retornara null para evitar hacer multiples request.
		if(this.state.loading) return null

		const scrolled = window.scrollY					//scrolleado por el usuario.
		const viewportHeight = window.innerHeight		//alturna interna de la ventana del navegador.
		const fullHeight = document.body.clientHeight	//altura de la pagina

		//Si el usuario esta en los ultimos 300 pixeles de la pagina, se cargara otra pagina de posts. De lo contrario no carga nada.
		if(!(scrolled + viewportHeight + 300 >= fullHeight)){
			return null
		}

		this.setState({ loading: true},
			async () => {
				try {
					const posts = await api.posts.getList(this.props.page)

					this.props.dispatch(actions.addPost(posts))					

					this.setState({ loading: false })

				} catch (error) {
					console.error(error)
					this.setState({loading: false})
				}
			}
		)
	}

	render() {

		const { loading } = this.state
		const { posts } = this.props

		return (
			<div>
				<section name="Home" className={styles.section}>
					<section className={styles.list}>
						{posts
							.map(post => 
								<Post key={post.id} {...post} />
							)}

					</section>

					{loading && (
						<Loading />
					)}
				</section>			
			</div>
		)
	}
}

Home.propTypes = {
	page: PropTypes.number,
	posts: PropTypes.arrayOf(PropTypes.object),
	dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		posts: state.posts.entities,
		page: state.posts.page
	}
}

export default connect(mapStateToProps)(Home)