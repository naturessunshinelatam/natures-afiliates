import "./StarRating.scss";

export const StarRating = ({
  rating = 0,
  maxRating = 5,
  readOnly = true,
  onRate = null,
  size = "md",
  showLabel = false,
}) => {
  return (
    <div className={`star-rating star-rating--${size}`}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const isFilled = i < Math.floor(rating);
        const isHalf = i < rating && !Number.isInteger(rating);
        return (
          <button
            key={i}
            className={`star ${isFilled ? "star--filled" : ""} ${
              isHalf ? "star--half" : ""
            }`}
            onClick={() => !readOnly && onRate?.(i + 1)}
            disabled={readOnly}
            aria-label={`${i + 1} de ${maxRating} estrellas`}
            tabIndex={readOnly ? -1 : 0}
          >
            ★
          </button>
        );
      })}
      {showLabel && (
        <span className="star-rating__label">
          {rating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};
