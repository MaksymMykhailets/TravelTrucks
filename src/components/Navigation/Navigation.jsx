import { Link } from "react-router-dom";
import Icon from "../../icons/Icon";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <div className={css.logoContainer}>
        <Icon name="icon-logo" width={136} height={16} className={css.logo} />
      </div>
      <div className={css.wrapper}>
        <Link className={css.link} to="/">
          Home
        </Link>
        <Link className={css.link} to="/catalog">
          Catalog
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
