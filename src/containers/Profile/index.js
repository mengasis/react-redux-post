import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../../api/originalApi'

class Profile extends Component {

	constructor(props){
		super(props)
		this.state = {
			loading: true,
			user: {}
		}
	}
    
	async componentDidMount() {
		const [
			user
		] = await Promise.all([
			api.users.getUser(this.props.match.params.id)
		])
		this.setState({
			user,
			loading: false,
		})
	}


	render() {

		const { user } = this.state
		console.log(this.state.user)
		//console.log(user.address.city)

		return (
			<div>
				<h1>Profile: {user.name}</h1>
				<h2></h2>
				<fieldset>
					<legend>Informacion Basica</legend>
					<p><strong>Usuario: </strong>{user.username}</p>
					<p><strong>Email: </strong>{user.email}</p>
					<p><strong>Telefono: </strong>{user.phone}</p>
					<p><strong>Sitio: </strong>{user.website}</p>
				</fieldset>

				{user.address && (
					<fieldset>
						<legend>Direccion</legend>
						<p><strong>Suite: </strong>{user.address.street}</p>
						<p><strong>Suite: </strong>{user.address.suite}</p>
						<p><strong>Ciudad: </strong>{user.address.city}</p>
						<p><strong>Codigo Postal: </strong>{user.address.zipcode}</p>
						<p><strong>Geolocalizacion: </strong>`${user.address.geo.lat} , ${user.address.geo.lng}`</p>
					</fieldset>	
				)}
			
			</div>
		)
	}
}

Profile.propTypes = {
	user: PropTypes.object,
	match: PropTypes.object
}

export default Profile