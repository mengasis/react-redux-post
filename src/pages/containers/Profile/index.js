import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import actions from '../../../actions'

class Profile extends Component {

	constructor(props){
		super(props)
		this.state = {
			loading: true
		}
	}
    
	async componentDidMount() {

		document.title = 'Profile Detail'				
		await this.props.actions.loadUser(this.props.match.params.id)
		
		this.setState({loading: false})
	}


	render() {

		const { user } = this.props
		console.log(user)
		return (
			<div>
				<div>
					<h1>Profile: {user.get('name')}</h1>
					<h2></h2>
					<fieldset>
						<legend><strong>Informacion Basica</strong></legend>
						<p><strong>Usuario: </strong>{user.get('username')}</p>
						<p><strong>Email: </strong>{user.get('email')}</p>
						<p><strong>Telefono: </strong>{user.get('phone')}</p>
						<p><strong>Sitio: </strong>{user.get('website')}</p>
					</fieldset>

					{user.get('address') && ( 
						<fieldset>
							<legend><strong>Dirección</strong></legend>
							<p><strong>Calle: </strong>{user.get('address').street}</p>
							<p><strong>Suite: </strong>{user.get('address').suite}</p>
							<p><strong>Ciudad: </strong>{user.get('address').city}</p>
							<p><strong>Codigo Postal: </strong>{user.get('address').zipcode}</p>
							<p><strong>Geolocalizacion: </strong>{`${user.get('address').geo.lat} , ${user.get('address').geo.lng}`}</p>
						</fieldset>
					)}
				</div>
				<Link to="/"><h3>{'<- Go Back'}</h3></Link>
			</div>
		)
	}
}

Profile.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		size: PropTypes.number,
		get: PropTypes.func
	}),
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string
		})
	}),
	actions: PropTypes.objectOf(PropTypes.func)
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.get('users').get(Number(ownProps.match.params.id))
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)