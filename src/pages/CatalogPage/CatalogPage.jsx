import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { setFilters } from "../../redux/campers/slice";
import {
  selectCampers,
  selectFilters,
  selectCampersStatus,
} from "../../redux/campers/selectors";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const filters = useSelector(selectFilters);
  const status = useSelector(selectCampersStatus);

  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  return (
    <div className={css.catalogPage}>
      <div className={css.filterContainer}>
        <FilterPanel
          filters={filters}
          setFilters={handleFilterChange}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className={css.catalogContainer}>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error loading campers.</p>}
        {status === "succeeded" && campers && campers.length > 0 ? (
          campers.map((camper) => (
            <VehicleCard key={camper.id} camper={camper} />
          ))
        ) : (
          <p>No campers found.</p>
        )}
        <button className={css.loadMoreButton}>Load More</button>
      </div>
    </div>
  );
};

export default CatalogPage;
