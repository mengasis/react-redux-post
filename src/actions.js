import types from './actionTypes'
import api from '../lib/originalApi'

function setPost(post) {

	return {
		type: types.SET_POST,
		payload: post,
	}
}

function setComments(comments) {
	return {
		type: types.SET_COMMENTS,
		payload: comments
	}
}

function setUser(user) {
	return {
		type: types.SET_USER,
		payload: user
	}
}

//Acción para pasar a la siguiente pagina en los post
function postNextPage(){
	return async (dispatch, getState) => {
		
		const state = getState()
		const currentPage = state.get('posts').get('page')

		const posts = await api.posts.getList(currentPage)

		dispatch(setPost(posts))

		return posts
	}
}

//Trae el usuario
function loadUser(userId) {
	return async (dispatch) => {
		const user = await api.users.getUser(userId)
		dispatch(setUser(user))

		return user
	}
}

//Trae el post segun id
function loadPost(postId){
	return async (dispatch) => {
		const post = await api.posts.getPost(postId)
		
		dispatch(setPost(post))

		return post
	}
}

//Trae los comentarios de un Post
function loadCommentsForPost(postId) {
	return async (dispatch) => {
		const comments = await api.posts.getComments(postId)

		dispatch(setComments(comments))

		return comments
	}
}

export default {
	setPost,
	setComments,
	setUser,

	//Acciones Asincronas
	postNextPage,
	loadUser,
	loadPost,
	loadCommentsForPost
}