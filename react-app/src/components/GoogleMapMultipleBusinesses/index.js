import React, { useState, useCallback, useEffect } from 'react';
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow
} from '@react-google-maps/api';
//This is of course not the raw key but either from getting it from the backend and storing it in redux or in your frontend .env
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusiness } from '../../store/business';

async function getLocation(address) {
	return Geocode.fromAddress(address).then(
		(response) => {
			const { lat, lng } = response.results[0].geometry.location;
			return { lat, lng };
		},
		(error) => {
			console.error(error);
		}
	);
}

const GoogleMapAllBusiness = ({ businesses }) => {
	console.log('hellooooooooo');
	const [currentPosition, setCurrentPosition] = useState([]);
	const dispatch = useDispatch();
	Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);
	// set response language. Defaults to english.
	Geocode.setLanguage('en');

	Geocode.setLocationType('ROOFTOP');

	// Enable or disable logs. Its optional.
	Geocode.enableDebug();

	useEffect(() => {
		// Get latitude & longitude from address
		const makeMap = async () => {
			let allLocation = [];
			for (let i = 0; i < businesses.length; i++) {
				let business = businesses[i];
				const location = await getLocation(
					`${business.address}, ${business.city}`
				);
				allLocation.push(location);
			}
			setCurrentPosition(allLocation);
		};
		makeMap();
	}, [businesses]);

	//This sets the center of the map. This must be set BEFORE the map loads

	// This is the equivalent to a script tag
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
	});

	const containerStyle = {
		width: '100%',
		height: '100%'
	};

	const [map, setMap] = useState(null);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	console.log(currentPosition);
	return (
		// Important! Always set the container height explicitly

		<>
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					zoom={12}
					center={currentPosition[0]}
					onUnmount={onUnmount}
				>
					{currentPosition.map((position) => (
						<Marker position={position} title="red-marker" streetView={false} />
					))}
				</GoogleMap>
			)}
		</>
	);
};

export default GoogleMapAllBusiness;
