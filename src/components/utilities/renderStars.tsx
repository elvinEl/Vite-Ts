import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-500 flex" />);
  }

  if (halfStars) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 flex" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="text-yellow-500 flex" />
    );
  }
  return stars;
};
