import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import SearchBar from './SearchBar';
import './TopNav.css';

const TopNav = ({ black }) => {
	const user = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
	const dispatch = useDispatch();

	const onLogout = async (e) => {
		await dispatch(logout());
	};

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
				<NavLink
					to="/"
					exact={true}
					className={`nav-link logo-name ${black ? 'black' : ''}`}
				>
					FLUM
				</NavLink>
			</div>
			<SearchBar />
			<div className="top-nav-navlink-wrapper">
				<NavLink
					to={`/${user ? 'new-business' : 'login'}`}
					className={`nav-link nav-link-redirect ${black ? 'black-color' : ''}`}
				>
					For businesses
				</NavLink>
				<NavLink
					to="/writeareview"
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
							<i class="fa-solid fa-circle-user users-icon"></i>
						</div>
						{showMenu && (
							<div className="nav-dropped-down">
								<div id="logout" onClick={onLogout}>
									<i class="fa-solid fa-arrow-right-from-bracket" />
									<div id="logout-div">Logout</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default TopNav;
