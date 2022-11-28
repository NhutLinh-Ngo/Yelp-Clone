import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import stateOptions from '../../utils/state';
import './BusinessFormPage.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const BusinessFormPage = () => {
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [state, setState] = useState('Alaska');
	const [zip, setZip] = useState('');
	const [description, setDescription] = useState('');
	const [phone_number, setPhoneNumber] = useState('');
	const [business_type, setBusinessType] = useState('');
	const [business_web_page, setBusinessWebPage] = useState('');
	const [operation_hours, setOperationHours] = useState('');
	const [price, setPrice] = useState(0);
	const [day, setDay] = useState('Mon');
	const [openHour, setOpenHour] = useState('');
	const [closeHour, setCloseHour] = useState('');

	const addHours = (e) => {
		e.preventDefault();
		console.log(day, openHour, closeHour);
	};
	return (
		<div className="business-form-container">
			<div className="business-form-left-col">
				<form className="business-form">
					<label className="business-form-label">Business Name</label>
					<input
						className="business-input-field"
						type="text"
						name="name"
						value={name}
						placeholder="Dylan's bakery"
						onChange={(e) => setName(e.target.value)}
					/>
					<label className="business-form-label">Address</label>
					<input
						className="business-input-field"
						type="text"
						name="address"
						value={address}
						placeholder="123 Coke St"
						onChange={(e) => setAddress(e.target.value)}
					/>
					<label className="business-form-label">City</label>
					<input
						className="business-input-field"
						type="text"
						name="city"
						value={city}
						placeholder="San Francisco"
						onChange={(e) => setCity(e.target.value)}
					/>
					<label className="business-form-label">State</label>
					<select
						type="text"
						name="state"
						value={state}
						onChange={(e) => setState(e.target.value)}
					>
						{stateOptions.map((state) => (
							<option value={state}>{state}</option>
						))}
					</select>
					<label className="business-form-label">ZIP</label>
					<input
						className="business-input-field"
						type="text"
						name="zip"
						value={zip}
						placeholder="91705"
						onChange={(e) => setZip(e.target.value)}
					/>
					<label className="business-form-label">Phone</label>
					<input
						className="business-input-field"
						type="text"
						name="phone"
						value={phone_number}
						placeholder="(555) 555-5555"
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<label className="business-form-label">Web Address</label>
					<input
						className="business-input-field"
						type="text"
						name="web_address"
						value={business_web_page}
						placeholder="https://www.companyaddress.com"
						onChange={(e) => setBusinessWebPage(e.target.value)}
					/>
					<label className="business-form-label">Categories</label>
					<input
						type="text"
						name="business_type"
						value={business_type}
						placeholder="Hot Pot, Barbeque, Italian, ..."
						onChange={(e) => setBusinessType(e.target.value)}
					/>
					<label className="business-form-label">
						Hours (24h format, dont add hours for closed days.)
					</label>
					<div className="add-hours-wrapper">
						<select
							type="text"
							name="day"
							value={day}
							onChange={(e) => setDay(e.target.value)}
						>
							{' '}
							{days.map((day) => (
								<option value={day}>{day}</option>
							))}
						</select>
						<input
							className="business-input-field-hour"
							type="text"
							value={openHour}
							name="openHour"
							placeholder="09:00"
							onChange={(e) => setOpenHour(e.target.value)}
						/>
						<input
							className="business-input-field-hour"
							type="text"
							value={closeHour}
							name="closeHour"
							placeholder="21:30"
							onChange={(e) => setCloseHour(e.target.value)}
						/>
						<button type="add-hour" onClick={addHours}>
							Add Hours
						</button>
					</div>
					<label className="business-form-label">
						How much does each customer typically spend at your establishment.
					</label>
					<input
						className="business-input-field"
						type="number"
						min={1}
						name="price"
						onChange={(e) => setPrice(e.target.value)}
					/>
					<label className="business-form-label">
						Please Provide some details about your business
					</label>
					<textarea
						name="description"
						onChange={(e) => setDescription(e.target.value)}
						className="business-form-textarea"
					/>
				</form>
			</div>
			<div className="business-form-right-col"></div>
		</div>
	);
};

export default BusinessFormPage;
