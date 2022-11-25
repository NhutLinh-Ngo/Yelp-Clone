import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllBusiness } from '../../store/business';
import FrontPageReviews from '../FrontPageReviews';
import './FrontPage.css';

const FrontPage = () => {
	const allBusinesses = useSelector((state) => state.business.allBusinesses);
	const [selected, setSelected] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const get = async () => {
			const data = await dispatch(getAllBusiness());

			// generate 3 random business to display on front page
			let shuffled = data.sort(function () {
				return 0.5 - Math.random();
			});
			setSelected(shuffled.slice(0, 3));
		};
		get();
	}, []);

	if (!Object.values(allBusinesses).length) return null;
	return (
		<div className="front-page-wrapper">
			<div className="front-page-images-wrapper">
				{selected.map((each) => {
					const previewImage = each.images.filter(
						(image) => image.preview == true
					);
					return (
						<>
							<div className="front-page-preview-wrapper">
								<img src={previewImage[0].url} className="front-page-images" />
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
