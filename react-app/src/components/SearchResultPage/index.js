import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { getAllBusiness } from '../../store/business';
import './SearchResultPage.css';
import GoogleMapAllBusiness from '../GoogleMapMultipleBusinesses';
import ResultBusinessCard from './ResultBusinessCard';

const SearchResultPage = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const allBusinesses = useSelector((state) =>
		Object.values(state.business.allBusinesses)
	);
	const params = new URLSearchParams(location.search);
	const keyword = params.get('desc');
	const loc = params.get('loc');

	const [filteredBusinesses, setFilteredBusinesses] = useState([]);

	useEffect(() => {
		if (!allBusinesses.length) dispatch(getAllBusiness());
	}, []);

	useEffect(() => {
		if (allBusinesses.length) {
			let foundBusinessses = allBusinesses.filter((business) => {
				if (keyword) {
					if (
						business.name.toLowerCase().includes(keyword.toLowerCase()) ||
						business.business_type
							.toLowerCase()
							.includes(keyword.toLowerCase()) ||
						business.description.toLowerCase().includes(keyword.toLowerCase())
					)
						return business;
				} else if (loc) {
					if (
						loc.includes(business.city) ||
						loc.includes(business.state) ||
						loc.includes(business.zip)
					)
						return business;
				}
			});
			setFilteredBusinesses(foundBusinessses.slice(0, 10));
		}
	}, [allBusinesses.length, keyword, loc]);

	return (
		<div className="search-result-page-wrapper">
			<div className="search-result-left-col">
				<h1 className="search-result-page-title">
					{keyword ? `Best ${keyword}` : 'Places'} {loc ? 'near' : 'match'}{' '}
					{loc}
				</h1>
				<div className="search-result-found-wrapper">
					{filteredBusinesses.length == 0 ? (
						<h2>
							Looks like you did not enter any information for us to search,
							please enter some something {`:)`}
						</h2>
					) : null}
					{filteredBusinesses.map((business) => (
						<ResultBusinessCard business={business} loc={loc} />
					))}
				</div>
			</div>
			<div className="search-result-right-col">
				<GoogleMapAllBusiness businesses={filteredBusinesses} />
			</div>
		</div>
	);
};

export default SearchResultPage;
