import Icon from "../../../public/icons/Icon";
import css from "./Reviews.module.css";

const Reviews = ({ reviews }) => {
  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const starsArray = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
        starsArray.push(
          <Icon
            key={i}
            name="icon-star"
            width={16}
            height={16}
            fill="#FFC531"
          />
        );
      } else {
        starsArray.push(
          <Icon
            key={i}
            name="icon-star"
            width={16}
            height={16}
            fill="#CCCCCC"
          />
        );
      }
    }

    return starsArray;
  };

  return (
    <div className={css.reviewsContainer}>
      {reviews.map((review, index) => (
        <div key={index} className={css.reviewItem}>
          <div className={css.reviewHeader}>
            <div className={css.avatar}>{getInitial(review.reviewer_name)}</div>
            <div className={css.reviewerInfo}>
              <span className={css.reviewerName}>{review.reviewer_name}</span>
              <div className={css.starsWrapper}>
                {renderStars(review.reviewer_rating)}
              </div>
            </div>
          </div>
          <p className={css.reviewComment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
