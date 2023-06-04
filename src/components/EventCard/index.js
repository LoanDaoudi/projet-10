import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  onClick,
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  onSelectCategory,
  ...props
}) => {
  const handleCategorySelect = () => {
    if (onSelectCategory) {
      onSelectCategory(label);
    }
  };

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      onClick={handleCategorySelect}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCategorySelect();
        }
      }}
      role="button"
      tabIndex={0}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  onSelectCategory: () => {},
};

export default EventCard;
