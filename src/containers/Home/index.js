import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from '../../api/originalApi'
import Post from '../Post'

class Home extends Component {

	constructor(props){
		super(props)
		console.log('Constructor')

		this.state = {
			page: 1,
			posts: [],
			loading: true,
		}
	}

	async componentDidMount() {
		console.log('Cargando Post')
		const posts = await api.posts.getList()

		this.setState({
			posts,
			page: this.state.page + 1,
			loading: false,
		})
	}

	render() {
		return (
			<div>
				<section name="Home">
					<h1>Home</h1>
					<section>
						{this.state.loading && (
							<h2>loading posts...</h2>
						)}

						{this.state.posts
							.map(post => 
								<Post key={post.id} {...post} />
							)}

					</section>
					<Link to="/about"> Go to about </Link>
				</section>			
			</div>
		)
	}
}

export default Home