import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllBusiness } from '../../store/business';

const SearchBar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [search, setSearch] = useState('');
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	const [searchLocation, setSearchLocation] = useState('');
	const [searchLocationOpen, setsearchLocationOpen] = useState(false);
	const [searchLocationResult, setsearchLocationResult] = useState([]);

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

		if (searchLocation.length > 0) {
			let matches = [];
			function handleSearchLocation(searchword) {
				for (let i = 0; i < allBusinesses.length; i++) {
					const data = allBusinesses[i];
					const location = data.city + data.state;

					if (location.toLowerCase().includes(searchword)) {
						matches.push(data);
					}
				}
				setsearchLocationResult(matches);
			}
			handleSearchLocation(searchLocation);
		} else {
			setsearchLocationResult([]);
		}
	}, [search, searchLocation]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setSearch('');
		setSearchLocation('');
		return history.push(`/search/?desc=${search}&loc=${searchLocation}`);
	};
	// click event listener for search bar
	useEffect(() => {
		if (!searchOpen) return;

		const closeMenu = () => {
			setSearchOpen(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [searchOpen]);
	// click event listener for location search bar
	useEffect(() => {
		if (!searchLocationOpen) return;

		const closeMenu = () => {
			setsearchLocationOpen(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [searchLocationOpen]);

	return (
		<div className="nav-bar-center">
			<>
				<form className="search-bar-div" onSubmit={handleSearchSubmit}>
					<div className="search-bar search-bar-type">
						<input
							id="type-search"
							placeholder="YinTang, Quan Ngon..."
							className="search-bar-input search-bar-input-left"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							autoComplete="off"
							onClick={(e) => {
								e.stopPropagation();
								setSearchOpen(true);
								setsearchLocationOpen(false);
							}}
						/>
					</div>

					<div className="search-bar-divider"></div>
					<div className="search-bar search-bar-location">
						<input
							id="type-search"
							placeholder="address, city, state or zip"
							className="search-bar-input"
							value={searchLocation}
							onChange={(e) => {
								setSearchLocation(e.target.value);
							}}
							autoComplete="off"
							onClick={(e) => {
								e.stopPropagation();
								setsearchLocationOpen(true);
								setSearchOpen(false);
							}}
						/>
					</div>
					<button className="magnifying-glasses-submit-button">
						<i className="fa-solid fa-magnifying-glass" id="magnifying-glass" />
					</button>
				</form>
				<div className="search-result-wrapper">
					<div className="search-result-keyword">
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
												onError={({ currentTarget }) => {
													currentTarget.onerror = null;
													currentTarget.src =
														'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
												}}
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
					</div>
					<div className="search-result-keyword">
						{searchLocationOpen && searchLocationResult.length > 0 && (
							<div className="search-results-wrapper">
								{searchLocationResult.map((result, i) => {
									const cityState = `${result.city}, ${result.state}`;
									return (
										<div
											className="search-results"
											key={i}
											onClick={() => setSearchLocation(cityState)}
										>
											{result.city}, {result.state}
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</>
		</div>
	);
};

export default SearchBar;
