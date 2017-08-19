import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.css'

class Header extends Component {
	render() {
		return (
			<header className={styles.header}>
				<h1 className={styles.title}>
App Post React Redux
				</h1>
      
				<nav role="navigation" className={styles.navigation}>
					<Link to="/" className={styles.link}>
                Home
					</Link>
					<a
						className={styles.link}
						href="https://github.com/mengasis/react-redux-post"
						target="_blank">
                Github
					</a>
				</nav>
			</header>
		)
	}
}

export default Header