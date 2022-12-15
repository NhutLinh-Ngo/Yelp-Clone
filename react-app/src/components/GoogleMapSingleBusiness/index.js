import React, { useState, useCallback } from 'react';
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow
} from '@react-google-maps/api';

const MapPageA = () => {
	//This sets the center of the map. This must be set BEFORE the map loads

	const [currentPosition, setCurrentPosition] = useState({
		lat: 34.085285,
		lng: -117.960899
	});

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
			<div style={{ height: '900px', width: '900px' }}>
				{isLoaded && (
					<GoogleMap
						mapContainerStyle={containerStyle}
						zoom={13}
						center={currentPosition}
						onUnmount={onUnmount}
					>
						<Marker
							position={currentPosition}
							title="red-marker"
							icon={<i class="fa-solid fa-location-dot"></i>}
							streetView={true}
						/>
					</GoogleMap>
				)}
			</div>
		</div>
	);
};

export default MapPageA;
