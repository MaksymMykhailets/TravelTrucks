import Icon from "../../../public/icons/Icon";
import { categories } from "../../data/vehicleData";
import css from "./Features.module.css";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Features = ({ camper }) => {
  const defaultFeaturesOrder = [
    "transmission",
    "AC",
    "engine",
    "kitchen",
    "radio",
    "refrigerator",
    "water",
  ];

  const features = defaultFeaturesOrder
    .map((featureName) =>
      categories.find((category) => category.name === featureName)
    )
    .filter((category) => category && camper[category.name])
    .map((category) => ({
      icon: category.icon,
      label: category.label,
    }));

  return (
    <div className={css.featuresWrapper}>
      <div className={css.equipment}>
        {features.map((feature, index) => (
          <div key={index} className={css.featureItem}>
            <Icon name={feature.icon} width={20} height={20} />
            {feature.label}
          </div>
        ))}
      </div>

      <div className={css.vehicleDetails}>
        <h3>Vehicle details</h3>
        <hr className={css.hr} />
        <ul>
          <li>
            <span>Form</span>
            <span>{capitalizeFirstLetter(camper.form)}</span>
          </li>
          <li>
            <span>Length</span>
            <span>{camper.length}</span>
          </li>
          <li>
            <span>Width</span>
            <span>{camper.width}</span>
          </li>
          <li>
            <span>Height</span>
            <span>{camper.height}</span>
          </li>
          <li>
            <span>Tank</span>
            <span>{camper.tank}</span>
          </li>
          <li>
            <span>Consumption</span>
            <span>{camper.consumption}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
