import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Icon from "../../../public/icons/Icon";
import { categories } from "../../data/vehicleData";
import LocationFormatter from "../../components/LocationFormatter/LocationFormatter";
import { toggleFavorite } from "../../redux/campers/slice";
import { selectFavorites } from "../../redux/campers/selectors";
import css from "./VehicleCard.module.css";

const VehicleCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(camper.id);

  const defaultFeaturesOrder = ["transmission", "engine", "kitchen", "AC"];

  const features = defaultFeaturesOrder
    .map((featureName) =>
      categories.find((category) => category.name === featureName)
    )
    .filter((category) => category && camper[category.name])
    .map((category) => ({
      icon: category.icon,
      label: category.label,
    }));

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper.id));
  };

  return (
    <div className={css.vehicleCard}>
      <div className={css.imgWrapper}>
        <img
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          className={css.vehicleImage}
        />
      </div>

      <div className={css.cardInfo}>
        <div className={css.cardTitle}>
          <h2 className={css.vehicleName}>{camper.name}</h2>
          <p className={css.vehiclePrice}>
            €{Number(camper.price).toFixed(2)}
          </p>
          <div
            className={`${css.likeIcon} ${isFavorite ? css.active : ""}`}
            onClick={handleFavoriteClick}
          >
            <Icon name="icon-heart" width={24} height={24} />
          </div>
        </div>

        <div className={css.additionalInfo}>
          <div className={css.ratingLocation}>
            <div className={css.ratingWrapper}>
              <Icon name="icon-star" width={16} height={16} fill="#FFC531" />
              <span>
                {camper.rating} ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>

            <div className={css.locationWrapper}>
              <Icon name="icon-map" width={16} height={16} />
              <LocationFormatter location={camper.location} />
            </div>
          </div>
          <p className={css.description}>{camper.description}</p>
        </div>

        <div className={css.featuresList}>
          {features.map((feature, index) => (
            <div key={index} className={css.featureItem}>
              <Icon name={feature.icon} width={20} height={20} />
              {feature.label}
            </div>
          ))}
        </div>
        <Link to={`/catalog/${camper.id}`} className={css.showMoreBtn}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
