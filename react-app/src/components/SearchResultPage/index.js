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
	const [foundBusinesses, setFoundBusinesses] = useState([]);
	const [selectedBusiness, setSelectedBusiness] = useState(0);
	const [page, setPage] = useState(0);
	const [numPage, setNumPage] = useState([]);

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
			let numPage = Math.ceil(foundBusinessses.length / 4);
			setNumPage(new Array(numPage).fill(null));
			setFilteredBusinesses(foundBusinessses.slice(0, 4));
			setFoundBusinesses(foundBusinessses);
		}
	}, [allBusinesses.length, keyword, loc]);

	useEffect(() => {
		setFilteredBusinesses(foundBusinesses.slice(page, page + 4));
	}, [page]);

	return (
		<div className="search-result-page-wrapper">
			<div className="search-result-left-col">
				<div>
					<h1 className="search-result-page-title">
						{keyword ? `Best ${keyword}` : 'Places'} {loc ? 'near' : 'match'}{' '}
						{loc}
					</h1>
					<div className="search-result-found-wrapper">
						{filteredBusinesses.length == 0 ? (
							<div className="search-result-error">
								<img src="https://static.vecteezy.com/system/resources/previews/005/520/150/original/cartoon-drawing-of-a-construction-worker-vector.jpg" />
								Looks like we could not understand your search keyword(s),
								please try again{`:)`}
							</div>
						) : null}
						{filteredBusinesses.map((business) => (
							<ResultBusinessCard
								business={business}
								loc={loc}
								setSelectedBusiness={setSelectedBusiness}
							/>
						))}
					</div>
					<div className="result-page-pagination-wrapper">
						<div className="result-page-pagination-number">
							<div
								className={`page-select ${page / 4 == 0 ? 'disable' : ''}`}
								onClick={() => {
									if (page / 4 !== 0) setPage(page - 4);
								}}
							>{`<`}</div>
							{numPage.map((x, i) => (
								<div
									onClick={() => setPage(i)}
									className={`pagination-num ${
										page / 4 == i ? 'pagination-selected' : ''
									}`}
								>
									{i + 1}
								</div>
							))}
							<div
								className={`page-select ${
									page / 4 == numPage.length - 1 ? 'disable' : ''
								}`}
								onClick={() => {
									if (page / 4 !== numPage.length - 1) setPage(page + 4);
								}}
							>{`>`}</div>
						</div>
						<div className="result-page-pagination-num0fpage">
							{' '}
							{page / 4 + 1} of {numPage.length}
						</div>
					</div>
				</div>
			</div>
			<div className="search-result-right-col">
				<GoogleMapAllBusiness
					businesses={filteredBusinesses}
					selectedBusiness={selectedBusiness}
				/>
			</div>
		</div>
	);
};

export default SearchResultPage;
