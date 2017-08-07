import api from './api'

export async function getUser(userId) {
	const response = await api.apiFetch(`users/${userId}`)
	const data = await response.json()

	return data
}