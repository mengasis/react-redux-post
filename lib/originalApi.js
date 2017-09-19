import fetch from 'isomorphic-fetch'


const baseUrl = 'http://jsonplaceholder.typicode.com'


const api = {
	posts: {
		async getList(page = 1) {
			const response = await fetch(`${baseUrl}/posts?_page=${page}`)
			const data = await response.json()
			return data
		},
		async getAll() {
			const response = await fetch(`${baseUrl}/posts`)
			const data = await response.json()
			return data
		},
		async getPost(id = 1) {
			const response = await fetch(`${baseUrl}/posts/${id}`)
			const data = await response.json()
			return data
		},
		async getComments(id = 1) {
			const response = await fetch(`${baseUrl}/posts/${id}/comments`)
			const data = await response.json()
			return data
		},
	},
	users: {
		//Obtiene un usuario
		async getUser(idUser = 1) {
			const response = await fetch(`${baseUrl}/users/${idUser}`)
			const data = await response.json()
			return data
		},
		//Obtiene los post de un usuario
		async getPosts(idUser = 1){
			const response = await fetch(`${baseUrl}/users/${idUser}/posts`)
			const data = await response.json()
			return data
		},
		async getAlbums(idUser = 1){
			const response = await fetch(`${baseUrl}/users/${idUser}/albums`)
			const data = await response.json()
			return data
		}
	},
	gallery: {
		async getPage(number = 1){

			const options = { 
				method: 'GET',
				mode: 'cors',				
				'Content-Type': 'image/svg+xml',
				header:{
					'Access-Control-Allow-Origin':'http://localhost:3000',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Methods': '*'
				}			}

			const response = await fetch(`${baseUrl}/photos?_page=${number}`, options)
			const data = await response.json()
			return data
		}
	}
}


export default api