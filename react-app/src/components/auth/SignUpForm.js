import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { signUp, login } from '../../store/session';

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [haveErrors, setHaveErrors] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		const userData = {
			first_name: firstName,
			last_name: lastName,
			email,
			password
		};
		if (password !== confirmPassword) {
			setHaveErrors(true);
			setErrors({ comfirmPassword: 'Passwords do not match!' });
			return;
		}
		const data = await dispatch(signUp(userData));
		if (data) {
			setHaveErrors(true);
			setErrors(data);
		}
	};

	console.log(errors);
	const loginDemo = async (e) => {
		await dispatch(login('demo@aa.io', 'password'));
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};
	const switchToLogin = () => {
		history.push('/login');
	};
	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-page-wrapper center">
			<div className="top-red-bar-redirect center">
				<NavLink className="nav-link logo-name" to="/">
					FLUM
				</NavLink>
			</div>
			{haveErrors && (
				<div className="error-box center">
					{Object.values(errors).length > 0 && (
						<div className="login-form-error">
							<span className="unable-to-login">
								{errors.comfirmPassword
									? errors.comfirmPassword
									: errors['first_name']
									? errors['first_name']
									: errors['last_name']
									? errors['last_name']
									: errors.email
									? errors.email
									: errors.password}
							</span>
						</div>
					)}
					<p
						className="close-form-error-message"
						onClick={() => setHaveErrors(false)}
					>
						X
					</p>
				</div>
			)}
			<div className="center login-page-inner-wrapper">
				<div className="login-page-left-col center">
					<div className="login-form-wrapper">
						<div className="text-above-form">
							<div className="form-title">Sign Up for Flum</div>
							<div className="switch-form">
								<p id="p1">Already on Flum? </p>{' '}
								<p id="p2" onClick={switchToLogin}>
									{' '}
									Log in
								</p>
							</div>
						</div>
						<button className="form-button login-demo" onClick={loginDemo}>
							Continue with Demo
						</button>
						<div className="login-separator">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
						<form onSubmit={onSignUp}>
							<div>
								<input
									type="text"
									name="firstName"
									onChange={(e) => setFirstName(e.target.value)}
									value={firstName}
									placeholder="First Name"
									className="input-boxes"
								></input>
							</div>
							<div>
								<input
									type="text"
									name="lastName"
									onChange={(e) => setLastName(e.target.value)}
									value={lastName}
									placeholder="Last Name"
									className="input-boxes"
								></input>
							</div>
							<div>
								<input
									type="text"
									name="email"
									onChange={updateEmail}
									value={email}
									placeholder="Email"
									className="input-boxes"
								></input>
							</div>
							<div>
								<input
									type="password"
									name="password"
									onChange={updatePassword}
									value={password}
									placeholder="Password"
									className="input-boxes"
								></input>
							</div>
							<div>
								<input
									type="password"
									name="confirm-password"
									onChange={updateConfirmPassword}
									value={confirmPassword}
									placeholder="Confirm Password"
									className="input-boxes"
								></input>
							</div>

							<button type="submit" className="form-button">
								Sign Up
							</button>
						</form>
						<div className="switch-form-bottom">
							<p id="p1-bottom">Already on Flum? </p>{' '}
							<p id="p2" onClick={switchToLogin}>
								{' '}
								Log in
							</p>
						</div>
					</div>
				</div>
				<div className="login-page-right-col">
					<img
						style={{ height: '250px', width: '350px' }}
						src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"
					/>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
