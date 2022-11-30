import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllBusiness } from '../../store/business';

const SearchBar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const [search, setSearch] = useState('');
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const allBusinesses = useSelector((state) =>
		Object.values(state.business.allBusinesses)
	);

	useEffect(() => {
		if (!allBusinesses.length) dispatch(getAllBusiness());
	}, []);

	useEffect(() => {
		if (search.length > 0) {
			let matches = [];
			function handleSearch(search) {
				for (let i = 0; i < allBusinesses.length; i++) {
					const data = allBusinesses[i];
					if (data.name.toLowerCase().includes(search)) {
						matches.push(data);
					}
				}
				setSearchResults(matches);
			}
			handleSearch(search);
		} else {
			setSearchResults([]);
		}
	}, [search]);

	useEffect(() => {
		if (!searchOpen) return;

		const closeMenu = () => {
			setSearchOpen(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [searchOpen]);

	return (
		<div className="nav-bar-center">
			<>
				<div className="search-bar-div">
					<div className="search-bar search-bar-type">
						<input
							id="type-search"
							placeholder="food, drinks"
							className="search-bar-input search-bar-input-left"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							autoComplete="off"
							onClick={(e) => {
								e.stopPropagation();
								setSearchOpen(true);
							}}
						/>
					</div>
					{searchOpen && searchResults.length > 0 && (
						<div className="search-results-wrapper">
							{searchResults.map((result, i) => (
								<div
									className="search-results"
									key={i}
									onClick={() => {
										setSearch('');
										setSearchResults([]);
										setSearchOpen(false);
										history.push(`/${result.id}`);
									}}
								>
									{result.images[0] && (
										<img
											src={result.images[0].url}
											className="search-result-image"
										/>
									)}
									<div id="search-result-name">
										{result.name ? result.name : result}
										<div id="search-result-address">
											{result.address}, {result.city}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
					<div className="search-bar-divider"></div>
					<div className="search-bar search-bar-location">
						<input
							id="type-search"
							placeholder="address, city, state or zip (WILL BE IMPLEMENTED LATER)"
							className="search-bar-input"
						/>
					</div>
					<button className="magnifying-glasses-submit-button">
						<i className="fa-solid fa-magnifying-glass" id="magnifying-glass" />
					</button>
				</div>
			</>
		</div>
	);
};

export default SearchBar;
