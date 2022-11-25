import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import TopNav from './components/TopNav';
import FrontPage from './components/FrontPage';
import { authenticate } from './store/session';
import SingleBusinessDetailsPage from './components/SingleBusinessDetailsPage';

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/signup" exact={true}>
					<SignUpForm />
				</Route>
				<Route path="/" exact={true}>
					<TopNav />
					<FrontPage />
				</Route>
				<Route path="/:businessId">
					<TopNav black={true} />
					<SingleBusinessDetailsPage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
