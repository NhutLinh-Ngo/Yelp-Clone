import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginModalForm.css';

const LoginFormModal = ({ setShowLoginModal }) => {
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
		if (data) {
			setHaveErrors(true);
			setErrors(data);
		} else {
			setShowLoginModal(false);
		}
	};

	const loginDemo = async (e) => {
		e.preventDefault();

		const data = await dispatch(login('demo@aa.io', 'password'));
		setShowLoginModal(false);
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

	return (
		<div className="login-form-modal">
			<h3 style={{ color: 'gray', alignSelf: 'center' }}>
				You're almost done! <br /> Login and try again.
			</h3>
			<button className="form-button login-demo" onClick={loginDemo}>
				Continue with Demo
			</button>
			<div className="continue-with-demo-wrapper">
				<div className="single-line-wrapper-or">
					<p className="single-line-gray">or</p>
				</div>
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
				<div className="login-modal-errors">{errors.email}</div>
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
				<div className="login-modal-errors">{errors.password}</div>
				<button type="submit" className="form-button">
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginFormModal;
