import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './auth.css';

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [haveErrors, setHaveErrors] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		console.log(data);
		if (data) {
			setHaveErrors(true);
			setErrors(data);
		}
	};

	const loginDemo = async (e) => {
		await dispatch(login('demo@aa.io', 'password'));
	};

	const switchToSignUp = () => {
		history.push('/signup');
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-page-wrapper center">
			<div className="top-red-bar-redirect center">
				<NavLink className="nav-link" to="/">
					LOGOs GOES HERE /auth/loginForm
				</NavLink>
			</div>
			{haveErrors && (
				<div className="error-box center">
					{Object.values(errors).length > 0 && (
						<div className="login-form-error">
							<span className="unable-to-login">
								{errors.email ? errors.email : errors.password}
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
							<div className="form-title">Log in to Flum</div>
							<div className="switch-form">
								<p id="p1">new to Flum? </p>{' '}
								<p id="p2" onClick={switchToSignUp}>
									{' '}
									Sign up
								</p>
							</div>
						</div>
						<button className="form-button login-demo" onClick={loginDemo}>
							Continue with Demo
						</button>
						<div className="login-separator">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
						<form onSubmit={onLogin}>
							<div>
								<input
									name="email"
									type="text"
									placeholder="Email"
									value={email}
									onChange={updateEmail}
									className="input-boxes"
								/>
							</div>
							<div>
								<input
									name="password"
									type="password"
									placeholder="Password"
									value={password}
									onChange={updatePassword}
									className="input-boxes"
								/>
							</div>
							<button type="submit" className="form-button">
								Login
							</button>
						</form>
						<div className="switch-form-bottom">
							<p id="p1-bottom">new to Flum? </p>{' '}
							<p id="p2" onClick={switchToSignUp}>
								{' '}
								Sign up
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

export default LoginForm;
