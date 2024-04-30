import React from "react";
import styles from "./Header.module.scss";
import WeatherIcon from "./WeatherIcon";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <WeatherIcon width={50} height={50}/>
    </header>
  );
};

export default Header;
