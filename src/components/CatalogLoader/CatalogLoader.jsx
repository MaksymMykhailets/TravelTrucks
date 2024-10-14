import { ClipLoader } from "react-spinners";
import css from "./CatalogLoader.module.css";

const CatalogLoader = () => {
  return (
    <div className={css.loader}>
      <ClipLoader color="grey" loading={true} size={40} />
    </div>
  );
};

export default CatalogLoader;
