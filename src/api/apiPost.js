import api from './api'

export async function getAllPosts() {
	console.log('Entrando Post API')

	const response = await api.apiFetch('post')
	const data = await response.json()

	return data
}

export async function getPost(idPost = 1) {
	const response = await api.apiFetch(`post/${idPost}`)
	const data = await response.json()

	return data
}

export async function getComment(idPost = 1) {
	const response = await api.apiFetch(`post/${idPost}/comments`)
	const data = await response.json()

	return data
}


