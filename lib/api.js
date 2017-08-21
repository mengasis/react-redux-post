import fetch from 'isomorphic-fetch'

const baseUrl = 'https://jsonplaceholder.typicode.com'

export function apiFetch(endpoint, options = {}) {
	const getPromise = async () => {

		const fetchOptions = apiOptions(options)
		const response = await fetch(`${baseUrl}/${endpoint}`, fetchOptions)

		return response.json()
	}

	return getPromise()
}

export function apiOptions(options = {}) {
	const {
		method = 'GET',
		headers = {
			'Content-Type': 'application/json'
		},
		body = false
	} = options

	const newOptions = {
		method,
		headers,
		credentials: 'include'
	}

	if (body) {
		newOptions.body = body
	}

	return newOptions
}