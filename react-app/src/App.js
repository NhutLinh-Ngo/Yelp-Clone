import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import TopNav from './components/TopNav';
import FrontPage from './components/FrontPage';
import { authenticate } from './store/session';
import SingleBusinessDetailsPage from './components/SingleBusinessDetailsPage';
import ReviewFormPage from './components/ReviewFormPage';
import BusinessFormPage from './components/BusinessFormPage';
import EditBusinessFormPage from './components/EditBusinessForm';
import ReviewEditForm from './components/ReviewEditForm';
import CreditBar from './components/CreditPage';
import WriteAReview from './components/WriteAReview';
import MapPageA from './components/GoogleMapSingleBusiness';
import GoogleMapAllBusiness from './components/GoogleMapMultipleBusinesses';
import SearchResultPage from './components/SearchResultPage';

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
				<Route path="/search">
					<TopNav black={true} />
					<SearchResultPage />
				</Route>
				<Route path="/" exact={true}>
					<TopNav />
					<FrontPage />
				</Route>
				<Route path="/writeareview">
					<WriteAReview />
				</Route>
				<Route path="/new-business">
					<BusinessFormPage />
				</Route>
				<Route exact path="/:businessId">
					<TopNav black={true} />
					<SingleBusinessDetailsPage />
				</Route>
				<Route path="/:businessId/new-review">
					<ReviewFormPage />
				</Route>
				<Route path="/:businessId/edit">
					<EditBusinessFormPage />
				</Route>
				<Route path="/:businessId/reviews/:reviewId/edit">
					<ReviewEditForm />
				</Route>
			</Switch>
			<CreditBar />
		</BrowserRouter>
	);
}

export default App;
