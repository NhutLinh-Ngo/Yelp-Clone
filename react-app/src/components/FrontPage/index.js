import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { getAllBusiness } from '../../store/business';
import FrontPageReviews from '../FrontPageReviews';
import './FrontPage.css';

const FrontPage = () => {
	const allBusinesses = useSelector((state) => state.business.allBusinesses);
	const [selected, setSelected] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const get = async () => {
			let data = await dispatch(getAllBusiness());
			data = data.filter((business) => business.images.length > 0);
			// generate 3 random business to display on front page
			let shuffled = data.sort(function () {
				return 0.5 - Math.random();
			});
			setSelected(shuffled.slice(0, 3));
		};
		get();
	}, []);

	if (!Object.values(allBusinesses).length)
		return <div className="white-blank-page"></div>;
	return (
		<div className="front-page-wrapper">
			<div className="front-page-images-wrapper">
				{selected.map((each, i) => {
					const previewImage = each.images.filter(
						(image) => image.preview == true
					);
					return (
						<>
							<div className="front-page-preview-wrapper" key={i}>
								<img
									src={previewImage[0].url}
									className="front-page-images"
									onError={({ currentTarget }) => {
										currentTarget.onerror = null;
										currentTarget.src =
											'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
									}}
								/>
								<NavLink
									to={`/${each.id}`}
									className="nav-link preview-image-nav-link"
								>
									{each.name}
								</NavLink>
							</div>
						</>
					);
				})}
			</div>
			<FrontPageReviews />
		</div>
	);
};

export default FrontPage;
