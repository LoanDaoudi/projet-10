import PropTypes from "prop-types";


import "./style.scss";

const EventCard = ({
  onClick,
  imageSrc,
  imageAlt,
  title,
  label,
  small = false,
  periode,
}) => {
  const month = periode.substring(periode.lastIndexOf(" ") + 1); // Récupérer le dernier mot de la chaîne

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{month}</div> {/* Utiliser le mois extrait */}
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  periode: PropTypes.string,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  periode: "",
};

export default EventCard;
