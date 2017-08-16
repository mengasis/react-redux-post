import React, { Component } from 'react'

import api from '../../api/originalApi'
import Post from '../Post'
import Loading from '../../shared/components/Loading'

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
		const posts = await api.posts.getAll()

		this.setState({
			posts,
			loading: false,
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

	}

	render() {

		const { loading, posts } = this.state

		return (
			<div>
				<section name="Home">
					<h1>Home</h1>
					<section>
						{loading && (
							<Loading />
						)}

						{posts
							.map(post => 
								<Post key={post.id} {...post} />
							)}

					</section>
				</section>			
			</div>
		)
	}
}

export default Home