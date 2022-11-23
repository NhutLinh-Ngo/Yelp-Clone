import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
	return (
		<div>
			<div>
				<NavLink to="/" exact={true} activeClassName="active">
					Home
				</NavLink>
			</div>
			<div>
				<NavLink to="/login" exact={true} activeClassName="active">
					Login
				</NavLink>
			</div>
			<div>
				<NavLink to="/sign-up" exact={true} activeClassName="active">
					Sign Up
				</NavLink>
			</div>
			<li>
				<LogoutButton />
			</li>
		</div>
	);
};

export default NavBar;
