import { Link } from "react-router-dom";
import css from "./VehicleCard.module.css";

const VehicleCard = ({ camper }) => {
  return (
    <div className={css.vehicleCard}>
      <img
        src={camper.gallery[0]?.thumb}
        alt={camper.name}
        className={css.vehicleImage}
      />
      <h3 className={css.vehicleName}>{camper.name}</h3>
      <p className={css.vehiclePrice}>€{camper.price.toFixed(2)}</p>
      <Link to={`/catalog/${camper.id}`} className={css.showMoreButton}>
        Show more
      </Link>
    </div>
  );
};

export default VehicleCard;
