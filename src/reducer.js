import types from './actionTypes'
import {combineReducers} from 'redux'

const initialState = {
	posts: {
		page: 1,
		entities: [],
	},
	comments: [],
	users: {},
}

function postPageReducer(state = initialState.posts.page, action = {}){
	switch (action.type) {
	case types.SET_POST:
		return state + 1
	default:
		return state
	}
}

function postEntitiesReducer(state = initialState.posts.entities, action = {}){
	switch (action.type) {
	case types.SET_POST:
		return state.concat(action.payload)
	default:
		return state
	}
}

function commentsReducer(state = initialState.comments, action = {}){
	switch (action.type) {
	case types.SET_COMMENTS:
		return state.concat(action.payload)
	default:
		return state
	}
}

function usersReducer(state = initialState.users, action = {}){
	switch (action.type) {
	case types.SET_USER:	
		return Object.assign({}, state, {
			[action.payload.id]: action.payload
		})
	default:
		return state
	}
}

const postsReducer = combineReducers({
	page: postPageReducer,
	entities: postEntitiesReducer
})

const reducer = combineReducers({
	posts: postsReducer,
	comments: commentsReducer,
	users: usersReducer
})

export default reducer

