import css from "./FilterPanel.module.css";
import Icon from "../../../public/icons/Icon";
import { useState, useCallback } from "react";
import { categories, vehicleTypes } from "../../data/vehicleData";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  location: Yup.string()
    .matches(
      /^[a-zA-Z\s]*$/,
      "Location can only contain Latin letters and spaces."
    )
    .max(20, "Location name cannot exceed 20 characters."),
});

const FilterPanel = ({
  filters,
  setFilters,
  onFilterChange,
  onSearchClick,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const defaultFilters = ["AC", "transmission", "kitchen", "TV", "bathroom"];

  const handleCategoryClick = useCallback(
    (categoryName) => {
      let newFilters = { ...localFilters };
      if (categoryName === "transmission") {
        newFilters[categoryName] =
          localFilters[categoryName] === "automatic" ? null : "automatic";
      } else {
        newFilters[categoryName] = !localFilters[categoryName];
      }
      setLocalFilters(newFilters);
    },
    [localFilters]
  );

  const handleVehicleTypeClick = useCallback(
    (vehicleTypeName) => {
      let newFilters = { ...localFilters };
      newFilters.form =
        newFilters.form === vehicleTypeName ? null : vehicleTypeName;
      setLocalFilters(newFilters);
    },
    [localFilters]
  );

  const handleSearchClick = async (values, { setSubmitting }) => {
    const updatedFilters = { ...localFilters, location: values.location };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    onSearchClick();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        location: localFilters.location || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSearchClick}
    >
      {({ isValid, isSubmitting }) => (
        <Form className={css.wrapper}>
          <div className={css.inputContainer}>
            <label className={css.inputLabel}>Location</label>
            <div className={css.inputField}>
              <Icon name="icon-map" width={20} height={20} fill="#6C717B" />
              <Field
                name="location"
                type="text"
                placeholder="City"
                className={css.input}
              />
            </div>
            <ErrorMessage
              name="location"
              component="div"
              className={css.errorMessage}
            />
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

          <button
            type="submit"
            className={css.searchBtn}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Searching..." : "Search"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterPanel;
