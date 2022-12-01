import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import stateOptions from '../../utils/state';
import './BusinessFormPage.css';
import { createNewBusiness } from '../../store/business';
import AddBusinessImages from './AddBusinessImages';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function formatPhoneNumber(value) {
	// if input value is falsy eg if the user deletes the input, then just return
	if (!value) return value;

	// clean the input for any non-digit values.
	const phoneNumber = value.replace(/[^\d]/g, '');

	// phoneNumberLength is used to know when to apply our formatting for the phone number
	const phoneNumberLength = phoneNumber.length;

	// we need to return the value with no formatting if its less than four digits
	// this is to avoid weird behavior that occurs if you  format the area code too early
	if (phoneNumberLength < 4) return phoneNumber;

	// if phoneNumberLength is greater than 4 and less the 7 we start to return
	// the formatted number
	if (phoneNumberLength < 7) {
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
	}

	// finally, if the phoneNumberLength is greater then seven, we add the last
	// bit of formatting and return it.
	return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
		3,
		6
	)}-${phoneNumber.slice(6, 10)}`;
}

const BusinessFormPage = () => {
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('USA');
	const [state, setState] = useState('Alaska');
	const [zip, setZip] = useState('');
	const [description, setDescription] = useState('');
	const [phone_number, setPhoneNumber] = useState('');
	const [business_type, setBusinessType] = useState('');
	const [business_web_page, setBusinessWebPage] = useState('');
	const [operation_hours, setOperationHours] = useState([]);
	const [price, setPrice] = useState(0);
	const [day, setDay] = useState('Mon');
	const [openHour, setOpenHour] = useState('');
	const [closeHour, setCloseHour] = useState('');
	const [hourError, setHourError] = useState('');
	const [displayHours, setDisplayHours] = useState([]);
	const [errors, setErrors] = useState([]);
	const [showImagesForm, setShowImagesForm] = useState(false);
	const [businessId, setBusinessId] = useState('');
	const user = useSelector((state) => state.session.user);

	const dispatch = useDispatch();
	const history = useHistory();

	const addHours = (e) => {
		e.preventDefault();
		if (!openHour || !closeHour)
			return setHourError('Please enter enter operation hours.');

		const hour = `${day}-${openHour}-${closeHour}`;
		const OpHours = operation_hours;
		OpHours.push(hour);
		setOperationHours(OpHours);
		let operating = OpHours.map((eachDay) => {
			eachDay = eachDay.split('-');
			if (eachDay[1] !== 'Closed') {
				const openHour = eachDay[1].split(':'); //  ['11', '30']
				const closeHour = eachDay[2].split(':'); // ['21', '30']
				openHour[1] =
					Number(openHour[0]) > 11 ? openHour[1] + ' PM' : openHour[1] + ' AM';
				closeHour[1] =
					Number(closeHour[0]) > 11
						? closeHour[1] + ' PM'
						: closeHour[1] + ' AM';
				openHour[0] = ((Number(openHour[0]) + 11) % 12) + 1;
				closeHour[0] = ((Number(closeHour[0]) + 11) % 12) + 1;
				eachDay[1] = openHour.join(':') + ' - ' + closeHour.join(':');
				return eachDay.slice(0, 2);
			}
			return eachDay;
		});
		setDisplayHours(operating);
	};

	const removeHour = (i) => {
		const hours = displayHours.filter((e, index) => index !== i);
		const opHours = operation_hours.filter((e, index) => index !== i);
		setDisplayHours(hours);
		setOperationHours(opHours);
	};

	const handleBusinessFormSubmit = async (e) => {
		e.preventDefault();
		let res_opHours = operation_hours;
		let closedDays = days.filter(
			(day) => !operation_hours.join(',').includes(day)
		);
		closedDays = closedDays.map((day) => day + '-Closed');
		res_opHours = res_opHours.concat(closedDays);

		const businessData = {
			owner_id: user.id,
			name,
			address,
			city,
			state,
			country,
			zip,
			phone_number,
			description,
			business_type,
			price: Number(price),
			operation_hours: res_opHours.join(',')
		};
		if (business_web_page) {
			businessData.business_web_page = business_web_page;
		}

		const newBusiness = await dispatch(createNewBusiness(businessData));

		if (newBusiness.errors) {
			setErrors(newBusiness.errors);
		} else {
			setBusinessId(newBusiness.id);
			setShowImagesForm(true);
		}
	};

	return (
		<>
			<div className="top-red-bar-redirect center">
				<NavLink className="nav-link logo-name" to="/">
					FLUM
				</NavLink>
			</div>
			<div className="business-form-container">
				<div className="business-form-left-col">
					{!showImagesForm && (
						<form className="business-form" onSubmit={handleBusinessFormSubmit}>
							<div className="business-form-title">
								Provide Business details.
							</div>
							<div style={{ color: 'red', marginBottom: '10px' }}>
								* fields are required.
							</div>
							{/* ---------------------name------------------------------------------------------------------------------ */}
							<label className="business-form-label">Business Name*</label>
							<input
								className="business-input-field"
								type="text"
								name="name"
								value={name}
								placeholder="Dylan's bakery"
								onChange={(e) => setName(e.target.value)}
							/>
							<div className="business-form-error">{errors.name}</div>
							{/* ---------------------address------------------------------------------------------------------------------ */}
							<label className="business-form-label">Address*</label>
							<input
								className="business-input-field"
								type="text"
								name="address"
								value={address}
								placeholder="123 Coke St"
								onChange={(e) => setAddress(e.target.value)}
							/>
							<div className="business-form-error">{errors.address}</div>
							{/* ----------------------city------------------------------------------------------------------------------- */}
							<label className="business-form-label">City*</label>
							<input
								className="business-input-field"
								type="text"
								name="city"
								value={city}
								placeholder="San Francisco"
								onChange={(e) => setCity(e.target.value)}
							/>
							<div className="business-form-error">{errors.city}</div>
							{/* ----------------------state------------------------------------------------------------------------------- */}
							<label className="business-form-label">State*</label>
							<select
								className="business-input-field"
								type="text"
								name="state"
								value={state}
								onChange={(e) => setState(e.target.value)}
							>
								{stateOptions.map((state) => (
									<option value={state}>{state}</option>
								))}
							</select>
							<div className="business-form-error">{errors.state}</div>
							{/* -------------------------zip---------------------------------------------------------------------------- */}
							<label className="business-form-label">Zip*</label>
							<input
								className="business-input-field"
								type="text"
								name="zip"
								value={zip}
								placeholder="91705"
								onChange={(e) => setZip(e.target.value)}
							/>
							<div className="business-form-error">{errors.zip}</div>
							{/* ----------------------------phone_number------------------------------------------------------------------------- */}
							<label className="business-form-label">Phone*</label>
							<input
								className="business-input-field"
								type="text"
								name="phone"
								value={phone_number}
								placeholder="(555) 555-5555"
								onChange={(e) =>
									setPhoneNumber(formatPhoneNumber(e.target.value))
								}
							/>
							<div className="business-form-error">{errors.phone_number}</div>
							{/* ------------------------web----------------------------------------------------------------------------- */}
							<label className="business-form-label">Web Address</label>
							<input
								className="business-input-field"
								type="text"
								name="web_address"
								value={business_web_page}
								placeholder="https://www.companyaddress.com"
								onChange={(e) => setBusinessWebPage(e.target.value)}
							/>
							<div className="business-form-error">{errors.web}</div>
							{/* -----------------------business_type------------------------------------------------------------------------------ */}
							<label className="business-form-label">Categories*</label>
							<input
								type="text"
								className="business-input-field"
								name="business_type"
								value={business_type}
								placeholder="Hot Pot, Barbeque, Italian, ..."
								onChange={(e) => setBusinessType(e.target.value)}
							/>
							<div className="business-form-error">{errors.business_type}</div>
							{/* ------------------------------operation_hours----------------------------------------------------------------------- */}
							<label className="business-form-label">
								Hours (dont add hours for closed days.)*
							</label>
							<div className="business-form-error">{hourError}</div>
							<div className="display-hours-container">
								{displayHours.map((each, i) => (
									<div className="display-single-hour">
										<div>{each[0]}</div>
										<div>{each[1]}</div>
										<div
											className="remove-display-hour"
											onClick={() => removeHour(i)}
										>
											remove
										</div>
									</div>
								))}
							</div>
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
									type="time"
									value={openHour}
									name="openHour"
									pattern="[0-9]{2}:[0-9]{2}"
									onChange={(e) => setOpenHour(e.target.value)}
								/>
								<input
									className="business-input-field-hour"
									type="time"
									value={closeHour}
									name="closeHour"
									pattern="[0-9]{2}:[0-9]{2}"
									minLength={5}
									maxLength={5}
									onChange={(e) => setCloseHour(e.target.value)}
								/>
								<button type="add-hour" onClick={addHours}>
									Add Hours
								</button>
							</div>
							<div className="business-form-error">
								{errors.operation_hours}
							</div>
							{/* ---------------------------------price-------------------------------------------------------------------- */}
							<label className="business-form-label">
								How much does each customer typically spend at your
								establishment.*
							</label>
							<input
								className="business-input-field"
								type="number"
								min={1}
								name="price"
								placeholder="$24"
								onChange={(e) => setPrice(e.target.value)}
							/>
							<div className="business-form-error">{errors.price}</div>
							{/* ---------------------------------description-------------------------------------------------------------------- */}
							<label className="business-form-label">
								Please Provide some details about your business*
							</label>
							<textarea
								name="description"
								onChange={(e) => setDescription(e.target.value)}
								className="business-form-textarea"
							/>
							<div className="business-form-error">{errors.description}</div>
							<button type="submit" className="submit-business-form">
								Next
							</button>
						</form>
					)}
					{showImagesForm && <AddBusinessImages businessId={businessId} />}
				</div>
				<div className="business-form-right-col"></div>
			</div>
		</>
	);
};

export default BusinessFormPage;
