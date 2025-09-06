import Review from "./Review";

const ReviewList = ({ reviews }) => {
  return (
    <ul id="reviews" className="space-y-11">
      {reviews.map((el, index) => (
        <Review key={index} {...el} />
      ))}
    </ul>
  );
};

export default ReviewList;
