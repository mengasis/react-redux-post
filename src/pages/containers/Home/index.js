import React, { Component } from 'react'

import api from '../../../../lib/originalApi'
import Post from '../../../shared/components/Post'
import Loading from '../../../shared/components/Loading'

import styles from './Home.css'

class Home extends Component {

	constructor(props){
		super(props)
		
		this.state = {
			page: 1,
			posts: [],
			loading: true,
		}

		this.handleScroll = this.handleScroll.bind(this)
	}

	async componentDidMount() {
		const posts = await api.posts.getList(this.state.page)

		this.setState({
			posts,
			loading: false,
			page: this.state.page + 1	//Se pasara a la pagina dos para no considerar la primera pagina ya cargada.
		})

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
					const posts = await api.posts.getList(this.state.page)

					this.setState({
						posts: this.state.posts.concat(posts),
						page: this.state.page + 1, //Al cargar la siguiente pagina, se agrega al contador.
						loading: false
					})

				} catch (error) {
					console.error(error)
					this.setState({loading: false})
				}
			}
		)
	}

	render() {

		const { loading, posts } = this.state

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

export default Home