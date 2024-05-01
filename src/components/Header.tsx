import React from "react";
import styles from "./Header.module.scss";
import WeatherIcon from "./WeatherIcon";
import { Link } from "next-view-transitions";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <WeatherIcon width={50} height={50} />
      </Link>
    </header>
  );
};

export default Header;
