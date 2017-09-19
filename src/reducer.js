import types from './actionTypes'
import { combineReducers } from 'redux-immutable'
import { fromJS, Map as map } from 'immutable'

const initialState = fromJS({
	posts: {
		page: 1,
		entities: {},
	},
	gallery: {
		page: 1,
		images: {},
	},
	comments: {},
	users: {},
	currentPost: null
})

function postPageReducer(state = initialState.get('posts').get('page'), action = {}){
	switch (action.type) {
	case types.SET_POST:
		return state + 1
	default:
		return state
	}
}

function postEntitiesReducer(state = initialState.get('posts').get('entities'), action = {}){
	switch (action.type) {
	case types.SET_POST:
		return action.payload
			.reduce(
				(posts, post) => posts.set(post.id, map(post)),
				state
			)

	case types.SET_SINGLE_POST:
		return state.set(action.payload.id, map(action.payload))

	default:
		return state
	}
}

function currentPostReducer(state = initialState.get('currentPost'), action = {}){
	switch (action.type) {
	case types.SET_SINGLE_POST:
		return action.payload.id
	
	default:
		return state
	}
}

function commentsReducer(state = initialState.get('comments'), action = {}){
	switch (action.type) {
	case types.SET_COMMENTS:
		return action.payload
			.reduce((comments, comment) => comments.set(comment.id, map(comment)),
				state
			)
	default:
		return state
	}
}

function usersReducer(state = initialState.get('users'), action = {}){
	switch (action.type) {
	case types.SET_USER:
		return state.set(action.payload.id, map(action.payload))	
	default:
		return state
	}
}

function galleryPageReducer(state = initialState.get('gallery').get('page'), action = {}){
	switch (action.type) {
	case types.SET_IMAGE:
		return state + 1
	default:
		return state
	}
}

function galleryImagesReducer(state = initialState.get('gallery').get('images'), action = {}){
	switch (action.type) {
	case types.SET_IMAGE:
		return action.payload.reduce(
			(images, image) => images.set(image.id, map(image)),
			state
		)
	default:
		return state
	}
}

const galleryReducer = combineReducers({
	page: galleryPageReducer,
	images: galleryImagesReducer
})

const postsReducer = combineReducers({
	page: postPageReducer,
	entities: postEntitiesReducer
})

const reducer = combineReducers({
	posts: postsReducer,
	comments: commentsReducer,
	users: usersReducer,
	currentPost: currentPostReducer,
	gallery: galleryReducer
})

export default reducer

