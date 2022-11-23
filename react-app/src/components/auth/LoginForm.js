import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './auth.css';

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
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
						<form onSubmit={onLogin}>
							<div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
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
						style={{ height: '200px', width: '250px' }}
						src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
