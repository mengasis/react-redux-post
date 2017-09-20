import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Image from 'react-lazy-image'

import actions from '../../../actions'
import styles from './Gallery.css'
import Loading from '../../../shared/components/Loading'


class Gallery extends Component {

	constructor(props){
		super(props)
		
		this.state = { loading: true }

		this.handleScroll = this.handleScroll.bind(this)
	}

	async componentDidMount() {
		await this.props.actions.loadNextGallery()							
		this.setState({ loading: false })

		document.title = 'Gallery'		

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
					await this.props.actions.loadNextGallery()				
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
		const { images } = this.props
		console.log(images)
		return (
			<div>
				<section name="Home" className={styles.section}>
					<h1>Gallery</h1>
                    
					<section>
						{images
							.valueSeq()
							.map(image =>
								<img key={image.get('id')} src={image.get('url')} />
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

Gallery.propTypes = {
	page: PropTypes.number,
	images: PropTypes.shape({
		'albumId': PropTypes.number,
		'id': PropTypes.number,
		'title': PropTypes.string,
		'url': PropTypes.string,
		'thumbnailUrl': PropTypes.string
	}),
	actions: PropTypes.objectOf(PropTypes.func)
}

const mapStateToProps = (state) => {
	return {
		page: state.get('gallery').get('page'),
		images: state.get('gallery').get('images')
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)