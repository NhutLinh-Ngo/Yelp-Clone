import React, { useState, useCallback, useEffect } from 'react';
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow
} from '@react-google-maps/api';
//This is of course not the raw key but either from getting it from the backend and storing it in redux or in your frontend .env
import Geocode from 'react-geocode';

const MapPageA = ({ business }) => {
	const [currentPosition, setCurrentPosition] = useState(null);

	Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);
	// set response language. Defaults to english.
	Geocode.setLanguage('en');

	Geocode.setLocationType('ROOFTOP');

	// Enable or disable logs. Its optional.
	Geocode.enableDebug();

	useEffect(() => {
		// Get latitude & longitude from address
		const makeMap = () => {
			Geocode.fromAddress(`${business.address}, ${business.city}`).then(
				(response) => {
					const { lat, lng } = response.results[0].geometry.location;
					setCurrentPosition({ lat, lng });
				},
				(error) => {
					console.error(error);
				}
			);
		};

		makeMap();
	}, []);

	//This sets the center of the map. This must be set BEFORE the map loads

	// This is the equivalent to a script tag
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
	});

	const containerStyle = {
		width: '315px',
		height: '254px'
	};

	const [map, setMap] = useState(null);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
		// Important! Always set the container height explicitly

		<div className="map_page__container">
			<div style={{ height: '254px', width: '315px' }}>
				{isLoaded && currentPosition ? (
					<GoogleMap
						mapContainerStyle={containerStyle}
						zoom={13}
						center={currentPosition}
						onUnmount={onUnmount}
					>
						<Marker
							position={currentPosition}
							title="red-marker"
							// icon={<i class="fa-solid fa-location-dot"></i>}
							streetView={false}
						/>
					</GoogleMap>
				) : null}
			</div>
		</div>
	);
};

export default MapPageA;
