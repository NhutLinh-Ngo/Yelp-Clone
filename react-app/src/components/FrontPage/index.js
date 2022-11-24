import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllBusiness } from '../../store/business';
import './FrontPage.css';

const FrontPage = () => {
	const allBusinesses = useSelector((state) => state.business.allBusinesses);
	const [selected, setSelected] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const get = async () => {
			const data = await dispatch(getAllBusiness());
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
								<img src={previewImage[0].url} />
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
			<h1>Front Page</h1>
		</div>
	);
};

export default FrontPage;
