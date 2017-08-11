import React, { Component } from 'react'

import api from '../../api/originalApi'
import Post from '../Post'

class Home extends Component {

	constructor(props){
		super(props)
		
		this.state = {
			page: 1,
			posts: [],
			loading: true,
		}
	}

	async componentDidMount() {
		const posts = await api.posts.getAll()

		this.setState({
			posts,
			loading: false,
		})
	}

	render() {

		const { loading, posts } = this.state

		return (
			<div>
				<section name="Home">
					<h1>Home</h1>
					<section>
						{loading && (
							<h2>Loading posts...</h2>
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