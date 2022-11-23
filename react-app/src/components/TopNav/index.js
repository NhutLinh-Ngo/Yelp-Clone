import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './TopNav.css';

const TopNav = () => {
	return (
		<div className="top-nav-wrapper">
			<div className="top-nav-navlink-logo center">
				<NavLink to="/" exact={true} className="nav-link">
					Home
				</NavLink>
			</div>
			<div className="top-nav-navlink-wrapper">
				<NavLink
					to="/login"
					exact={true}
					className="nav-link top-nav-navlink-button login-button center"
				>
					Log In
				</NavLink>
				<NavLink
					to="/sign-up"
					exact={true}
					className="nav-link top-nav-navlink-button signup-button center"
				>
					Sign Up
				</NavLink>
			</div>
		</div>
	);
};

export default TopNav;
