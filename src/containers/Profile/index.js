import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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

		return (
			<div>
				<div>
					<h1>Profile: {user.name}</h1>
					<h2></h2>
					<fieldset>
						<legend><strong>Informacion Basica</strong></legend>
						<p><strong>Usuario: </strong>{user.username}</p>
						<p><strong>Email: </strong>{user.email}</p>
						<p><strong>Telefono: </strong>{user.phone}</p>
						<p><strong>Sitio: </strong>{user.website}</p>
					</fieldset>

					{user.address && ( 
						<fieldset>
							<legend><strong>Dirección</strong></legend>
							<p><strong>Calle: </strong>{user.address.street}</p>
							<p><strong>Suite: </strong>{user.address.suite}</p>
							<p><strong>Ciudad: </strong>{user.address.city}</p>
							<p><strong>Codigo Postal: </strong>{user.address.zipcode}</p>
							<p><strong>Geolocalizacion: </strong>{`${user.address.geo.lat} , ${user.address.geo.lng}`}</p>
						</fieldset>
					)}
				</div>
				<Link to="/"><h3>{'<- Go Back'}</h3></Link>
			</div>
		)
	}
}

Profile.propTypes = {
	user: PropTypes.object,
	match: PropTypes.object
}

export default Profile