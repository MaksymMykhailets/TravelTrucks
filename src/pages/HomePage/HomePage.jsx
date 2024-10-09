import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <div className={css.thumb}></div>
      <div className={css.container}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.text}>
          You can find everything you want in our catalog
        </p>
      </div>
      <Link to="/catalog" className={css.link}>
        View Now
      </Link>
    </>
  );
};

export default HomePage;
