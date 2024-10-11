import css from "./FilterPanel.module.css";
import Icon from "../../../public/icons/Icon";
import { useState } from "react";
import { categories, vehicleTypes } from "../../data/vehicleData";

const FilterPanel = ({ filters, setFilters, onFilterChange }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const defaultFilters = ["AC", "transmission", "kitchen", "TV", "bathroom"];

  const handleCategoryClick = (categoryName) => {
    let newFilters = { ...localFilters };
    if (categoryName === "transmission") {
      newFilters[categoryName] =
        localFilters[categoryName] === "automatic" ? null : "automatic";
    } else {
      newFilters[categoryName] = !localFilters[categoryName];
    }
    setLocalFilters(newFilters);
  };

  const handleVehicleTypeClick = (vehicleTypeName) => {
    let newFilters = { ...localFilters };

    newFilters.form =
      newFilters.form === vehicleTypeName ? null : vehicleTypeName;

    setLocalFilters(newFilters);
  };

  const handleLocationChange = (e) => {
    const newFilters = { ...localFilters, location: e.target.value };
    setLocalFilters(newFilters);
    setIsInputActive(e.target.value !== "");
  };

  const handleSearchClick = () => {
    setFilters(localFilters);
    onFilterChange(localFilters);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.inputContainer}>
        <label className={css.inputLabel}>Location</label>
        <div className={css.inputField}>
          <Icon
            name="icon-map"
            width={20}
            height={20}
            fill={isInputActive ? "currentColor" : "#6C717B"}
          />
          <input
            type="text"
            placeholder="City"
            value={localFilters.location || ""}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      <div className={css.categoryWrapper}>
        <label className={css.inputFil}>Filters</label>
        <h3 className={css.sectionTitle}>Vehicle equipment</h3>
        <hr className={css.hr} />

        <div className={css.categoryContainer}>
          {categories
            .filter((category) => defaultFilters.includes(category.name))
            .map((category) => (
              <div
                key={category.name}
                className={`${css.category} ${
                  localFilters[category.name] ? css.active : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <Icon name={category.icon} />
                <span>{category.label}</span>
              </div>
            ))}
        </div>
      </div>

      <div className={css.categoryWrapper}>
        <h3 className={css.sectionTitle}>Vehicle type</h3>
        <hr className={css.hr} />

        <div className={css.categoryContainer}>
          {vehicleTypes.map((type) => (
            <div
              key={type.name}
              className={`${css.category} ${
                localFilters.form === type.name ? css.active : ""
              }`}
              onClick={() => handleVehicleTypeClick(type.name)}
            >
              <Icon name={type.icon} />
              <span>{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button className={css.searchBtn} onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default FilterPanel;
