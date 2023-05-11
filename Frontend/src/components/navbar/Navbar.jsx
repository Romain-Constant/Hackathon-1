import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.linksContainerLeft}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.menuActive : styles.navbarLink
          }
        >
          Home
          <div className={styles.underline} />
        </NavLink>
      </div>
      <div className={styles.logoAndNameContainer}>
        <div className={styles.logoContainer}>
          <img
            src="https://i.postimg.cc/QtVgwW9d/scooter.png"
            alt="logo-image"
          ></img>
        </div>
        <h1 className={styles.websiteNameContainer}>Affita Casa</h1>
      </div>
      <div className={styles.linksContainerRight}>
        <NavLink
          to="/myrentals"
          className={({ isActive }) =>
            isActive ? styles.menuActive : styles.navbarLink
          }
        >
          My Rentals
          <div className={styles.underline} />
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
