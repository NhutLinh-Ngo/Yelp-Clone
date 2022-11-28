import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './TopNav.css';

const TopNav = ({ black }) => {
	const user = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	return (
		<div className="top-nav-wrapper">
			<div className="top-nav-navlink-logo center">
				<NavLink to="/" exact={true} className="nav-link">
					Home
				</NavLink>
			</div>
			<div className="top-nav-navlink-wrapper">
				<NavLink
					to={`/${user ? 'new-business' : 'login'}`}
					className={`nav-link nav-link-redirect ${black ? 'black-color' : ''}`}
				>
					For businesses
				</NavLink>
				<NavLink
					to="/login"
					className={`nav-link nav-link-redirect ${black ? 'black-color' : ''}`}
				>
					write a review
				</NavLink>
				{!user && (
					<>
						<NavLink
							to="/login"
							exact={true}
							className={`nav-link top-nav-navlink-button login-button center ${
								black ? 'black-color' : ''
							}`}
						>
							Log In
						</NavLink>
						<NavLink
							to="/signup"
							exact={true}
							className="nav-link top-nav-navlink-button signup-button center"
						>
							Sign Up
						</NavLink>
					</>
				)}
				{user && (
					<>
						<div className="user-profile" onClick={openMenu}>
							<i class="fa-solid fa-circle-user"></i>
						</div>
						{showMenu && (
							<div className="nav-dropped-down center">
								<LogoutButton />
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default TopNav;
