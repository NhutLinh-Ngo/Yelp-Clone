function getColorForRating(rating) {
	if (rating < 2) return 'oneStar';
	if (rating < 3) return 'twoStars';
	if (rating < 4) return 'threeStars';
	if (rating < 5) return 'fourStars';
	else return 'fiveStars';
}

const ReviewStarsDisplay = ({ rating }) => {
	let color = getColorForRating(rating);
	return (
		<div className={color}>
			{[...Array(5)].map((star, i) => {
				if (i < Math.floor(rating)) return <i class="fa-solid fa-star" />;
				else if (rating % Math.floor(rating) >= 0.5) {
					rating = 0;
					return <i class="fa-regular fa-star-half-stroke" />;
				} else return <i class="fa-regular fa-star" />;
			})}
		</div>
	);
};

export default ReviewStarsDisplay;
