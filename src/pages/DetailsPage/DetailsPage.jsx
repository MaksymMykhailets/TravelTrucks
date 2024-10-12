import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperDetails } from "../../redux/campers/operations";
import {
  selectCamperDetails,
  selectCamperDetailsStatus,
} from "../../redux/campers/selectors";
import Gallery from "../../components/Gallery/Gallery";
import Reviews from "../../components/Reviews/Reviews";
import BookingForm from "../../components/BookingForm/BookingForm";
import Features from "../../components/Features/Features";
import LocationFormatter from "../../components/LocationFormatter/LocationFormatter";
import Icon from "../../../public/icons/Icon";
import css from "./DetailsPage.module.css";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCamperDetails);
  const status = useSelector(selectCamperDetailsStatus);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperDetails(id));
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading camper details.</p>;

  if (!camper) return null;

  return (
    <div className={css.detailsPage}>
      <div className={css.camperHeader}>
        <h2 className={css.camperName}>{camper.name}</h2>
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
        <p className={css.camperPrice}>€{camper.price}</p>
      </div>

      <div className={css.camperInfo}>
        <div className={css.galleryWrapper}>
          {camper.gallery && <Gallery images={camper.gallery} />}
        </div>
        <p className={css.desc}>{camper.description}</p>
      </div>

      <div className={css.tabsWrapper}>
        <button
          className={activeTab === "features" ? css.activeTab : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "reviews" ? css.activeTab : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={css.detailsContent}>
        <div
          className={
            activeTab === "features"
              ? css.tabContentWithBackground
              : css.tabContentWithoutBackground
          }
        >
          {activeTab === "features" && <Features camper={camper} />}
          {activeTab === "reviews" && <Reviews reviews={camper.reviews} />}
        </div>

        <div className={css.bookingFormWrapper}>
          <BookingForm camperId={id} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
