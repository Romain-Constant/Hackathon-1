import React from "react";
import AppartmentCard from "../components/appartmentCard/AppartmentCard";
import { StyledEngineProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Home.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

function Home() {
  const [apppartment, setApppartment] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [massiveAppartments, setmassiveAppartments] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [searchBarre, setSearchBarre] = useState("");
  const [appartmentsFiltered, setAppartmentsFiltered] = useState([""]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUserInput(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchBarre(userInput.toLowerCase());
  };

  useEffect(() => {
    const fectchAllAppartment = async () => {
      try {
        const response = await axios.get("http://localhost:8800/");
        setApppartment(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fectchAllAppartment();

    const fectchAllRentals = async () => {
      try {
        const response = await axios.get("http://localhost:8800/myrentals");
        setRentals(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fectchAllRentals();
  }, []);

  useEffect(() => {
    setmassiveAppartments([...apppartment, ...rentals]);
  }, [apppartment]);

  useEffect(() => {
    setAppartmentsFiltered(
      massiveAppartments.filter(
        (appartment) => appartment.city.toLowerCase() === searchBarre
      )
    );
  }, [searchBarre]);

  console.log(massiveAppartments);

  return (
    <StyledEngineProvider>
      <div className={styles.home}>
        <div className={styles.searchBarreContainer}>
          <form className={styles.searchBarre} onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Search city..."
              className={styles.placeHolderSearch}
              value={userInput}
              onChange={handleInputChange}
              id="dkofhof"
            />
            {/* <button className={styles.buttonSearch} type="submit">
              Rechercher
            </button> */}
          </form>
        </div>
        <div className={styles.appartmentsContainer}>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {searchBarre !== ""
              ? appartmentsFiltered.map((appartment) => (
                  <SwiperSlide key={`id__${appartment.id}`}>
                    <AppartmentCard appartment={appartment} />
                  </SwiperSlide>
                ))
              : massiveAppartments.map((appartment) => (
                  <SwiperSlide key={`${appartment.title} - ${appartment.id}`}>
                    <AppartmentCard appartment={appartment} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </StyledEngineProvider>
  );
}

export default Home;
